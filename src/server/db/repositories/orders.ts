import crypto from 'crypto';
import { Order, OrderStatus, PaymentStatus } from '@/types';
import {
  isSupabaseConfigured,
  getServiceSupabase,
  isUUID,
  invalidateMemoryCache,
  getDb,
  saveDb,
} from '../client';
import { mapSupabaseOrder } from '../mappers';
import { cancelOrderAtomic } from '../transactions/orders';

export async function getOrders(options?: {
  limit?: number;
  offset?: number;
  status?: OrderStatus;
}): Promise<Order[]> {
  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    let query = supabase
      .from('orders')
      .select('*, items:order_items(*)')
      .order('created_at', { ascending: false });

    if (options?.status) {
      query = query.eq('order_status', options.status);
    }
    if (options?.limit) {
      query = query.limit(options.limit);
    }
    if (options?.offset) {
      query = query.range(options.offset, options.offset + (options.limit || 50) - 1);
    }

    const { data, error } = await query;
    if (error) {
      console.error('Supabase getOrders error:', error);
      throw new Error(`Failed to load orders from database: ${error.message}`);
    }

    return (data || []).map(mapSupabaseOrder);
  }

  const db = getDb();
  let list = [...db.orders];
  if (options?.status) {
    list = list.filter((o) => o.orderStatus === options.status);
  }
  if (options?.offset) {
    list = list.slice(options.offset);
  }
  if (options?.limit) {
    list = list.slice(0, options.limit);
  }
  return list;
}

export async function getOrderById(id: string): Promise<Order | null> {
  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    let query = supabase.from('orders').select('*, items:order_items(*)');

    if (isUUID(id)) {
      query = query.eq('id', id);
    } else {
      query = query.eq('order_number', id);
    }

    const { data, error } = await query.maybeSingle();
    if (error) {
      console.error('Supabase getOrderById error:', error);
      throw new Error(`Database error loading order ${id}: ${error.message}`);
    }
    return data ? mapSupabaseOrder(data) : null;
  }

  const db = getDb();
  return db.orders.find((o) => o.id === id || o.orderNumber === id) || null;
}

export async function getCustomerOrders(email: string): Promise<Order[]> {
  const normalizedEmail = email.trim().toLowerCase();
  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    const { data: orders, error } = await supabase
      .from('orders')
      .select('*, items:order_items(*)')
      .ilike('customer_email', normalizedEmail)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Failed to load customer orders:', error.message);
      return [];
    }
    return (orders || []).map(mapSupabaseOrder);
  }

  const db = getDb();
  return db.orders.filter(
    (o) => o.customerEmail.toLowerCase().trim() === normalizedEmail
  );
}

export async function updateOrderStatus(
  id: string,
  orderStatus?: Order['orderStatus'],
  paymentStatus?: Order['paymentStatus'],
  options?: {
    actorEmail?: string;
    note?: string;
    utrNumber?: string;
  }
): Promise<Order | null> {
  const currentOrder = await getOrderById(id);
  if (!currentOrder) return null;

  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();

    // If transitioning to Cancelled, use single-transaction atomic cancellation
    if (orderStatus === 'Cancelled') {
      return cancelOrderAtomic(currentOrder.id, options);
    }

    const updates: any = { updated_at: new Date().toISOString() };
    if (orderStatus) updates.order_status = orderStatus;
    if (paymentStatus) updates.payment_status = paymentStatus;
    if (options?.utrNumber || options?.note) {
      const existingNotes = currentOrder.notes || '';
      const utrTag = options.utrNumber ? `[UTR:${options.utrNumber}]` : '';
      const noteTag = options.note ? `[NOTE:${options.note}]` : '';
      updates.notes = [existingNotes, utrTag, noteTag].filter(Boolean).join('\n');
    }

    let query = supabase.from('orders').update(updates);
    if (isUUID(id)) {
      query = query.eq('id', id);
    } else {
      query = query.eq('order_number', id);
    }

    const { data, error } = await query.select('*, items:order_items(*)').maybeSingle();
    if (error) {
      console.error('Supabase updateOrderStatus error:', error);
      throw new Error(`Failed to update order status: ${error.message}`);
    }
    if (!data) return null;

    if (orderStatus && orderStatus !== currentOrder.orderStatus) {
      try {
        await supabase.from('order_status_history').insert({
          order_id: data.id,
          from_status: currentOrder.orderStatus,
          to_status: orderStatus,
          actor_email: options?.actorEmail || 'system',
          note: options?.note || null,
        });
      } catch (histErr) {
        console.warn('Status history insert notice:', histErr);
      }
    }

    return mapSupabaseOrder(data);
  }

  // Development / Test Local Fallback
  const db = getDb();
  const index = db.orders.findIndex((o) => o.id === id || o.orderNumber === id);
  if (index === -1) return null;

  const ord = db.orders[index];
  if (orderStatus) ord.orderStatus = orderStatus;
  if (paymentStatus) ord.paymentStatus = paymentStatus;
  if (options?.utrNumber) {
    ord.utrNumber = options.utrNumber;
  }
  ord.updatedAt = new Date().toISOString();
  saveDb(db);
  return ord;
}

export async function createOrder(
  order: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt'>
): Promise<Order> {
  const now = new Date().toISOString();
  const orderNumber = `BAL-${Date.now().toString(36).toUpperCase()}-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;

  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();

    const { data: ord, error: ordErr } = await supabase
      .from('orders')
      .insert({
        order_number: orderNumber,
        customer_name: order.customerName,
        customer_email: order.customerEmail,
        customer_phone: order.customerPhone,
        shipping_address: order.shippingAddress,
        billing_address: order.billingAddress || order.shippingAddress,
        subtotal: order.subtotal,
        tax: order.tax,
        shipping_fee: order.shippingFee,
        discount: order.discount,
        total_amount: order.totalAmount,
        order_status: order.orderStatus || 'Confirmed',
        payment_status: order.paymentStatus || 'Submitted',
        payment_method: order.paymentMethod,
        notes: order.notes,
        created_at: now,
        updated_at: now,
      })
      .select()
      .single();

    if (ordErr || !ord) {
      throw new Error(`Failed to create order: ${ordErr?.message || 'Database error'}`);
    }

    if (order.items && order.items.length > 0) {
      const itemsPayload = order.items.map((it) => ({
        order_id: ord.id,
        product_id: it.productId,
        variant_id: it.variantId || null,
        product_name: it.productName,
        product_sku: it.productSku,
        unit: it.unit,
        unit_price: it.unitPrice,
        quantity: it.quantity,
        subtotal: it.subtotal,
        image_url: it.imageUrl || null,
        selected_color: it.selectedColor || null,
        selected_finish: it.selectedFinish || null,
      }));

      await supabase.from('order_items').insert(itemsPayload);
    }

    const { data: fullOrder } = await supabase
      .from('orders')
      .select('*, items:order_items(*)')
      .eq('id', ord.id)
      .single();

    invalidateMemoryCache('products');
    return mapSupabaseOrder(fullOrder || ord);
  }

  const db = getDb();
  const newOrder: Order = {
    ...order,
    id: `ord-${Date.now()}`,
    orderNumber,
    createdAt: now,
    updatedAt: now,
  };
  db.orders.unshift(newOrder);
  saveDb(db);
  return newOrder;
}
