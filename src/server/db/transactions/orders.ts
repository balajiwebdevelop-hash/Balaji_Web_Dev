import crypto from 'crypto';
import { Order, OrderStatus, PaymentStatus } from '@/types';
import {
  isSupabaseConfigured,
  isProduction,
  getServiceSupabase,
  invalidateMemoryCache,
  isUUID,
  getDb,
  saveDb,
} from '../client';
import { mapSupabaseOrder } from '../mappers';

export interface CreateOrderData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: any;
  billingAddress?: any;
  items: {
    productId: string;
    variantId?: string;
    quantity: number;
    selectedColor?: string;
    selectedFinish?: string;
  }[];
  paymentMethod: string;
  notes?: string;
  utrNumber?: string;
  transactionId?: string;
  idempotencyKey?: string;
}

/**
 * Executes a single-transaction atomic checkout.
 * Enforces PostgreSQL create_order_atomic RPC as the sole production path.
 * Strict database idempotency on orders.idempotency_key.
 */
export async function createOrderAtomic(
  orderData: CreateOrderData
): Promise<{ success: boolean; order?: Order; error?: string }> {
  if (!isSupabaseConfigured()) {
    if (isProduction()) {
      return {
        success: false,
        error: 'Critical Database Error: Supabase connection required for production orders.',
      };
    }
    // Isolated unit test execution
    const db = getDb();

    // Test idempotency check
    if (orderData.idempotencyKey) {
      const existing = db.orders.find((o) => o.idempotencyKey === orderData.idempotencyKey);
      if (existing) {
        return { success: true, order: existing };
      }
    }

    const orderItems: any[] = [];
    let subtotal = 0;

    // Validate products and stock
    for (const item of orderData.items) {
      const product = db.products.find((p) => p.id === item.productId);
      if (!product) {
        return { success: false, error: `Product not found: ${item.productId}` };
      }
      if (product.stock < item.quantity) {
        return {
          success: false,
          error: `Insufficient stock for ${product.name}. Requested: ${item.quantity}, Available: ${product.stock}`,
        };
      }
      const unitPrice = product.salePrice ?? product.price;
      const itemSubtotal = unitPrice * item.quantity;
      subtotal += itemSubtotal;
      orderItems.push({
        id: crypto.randomUUID(),
        productId: product.id,
        productName: product.name,
        sku: product.sku,
        quantity: item.quantity,
        unitPrice,
        subtotal: itemSubtotal,
        imageUrl: product.images?.[0] || '',
        selectedColor: item.selectedColor,
        selectedFinish: item.selectedFinish,
      });
    }

    // Decrement stock in test store
    for (const item of orderData.items) {
      const product = db.products.find((p) => p.id === item.productId);
      if (product) {
        product.stock -= item.quantity;
      }
    }

    const tax = Math.round(subtotal * 0.18);
    const totalAmount = subtotal + tax;
    const orderNumber = `BAL-${Date.now().toString(36).toUpperCase()}-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      customerName: orderData.customerName,
      customerEmail: orderData.customerEmail,
      customerPhone: orderData.customerPhone,
      shippingAddress: orderData.shippingAddress,
      billingAddress: orderData.billingAddress || orderData.shippingAddress,
      items: orderItems,
      subtotal,
      tax,
      shippingFee: 0,
      discount: 0,
      totalAmount,
      orderStatus: 'Confirmed',
      paymentStatus: 'Submitted',
      paymentMethod: orderData.paymentMethod,
      notes: orderData.notes,
      utrNumber: orderData.utrNumber,
      transactionId: orderData.transactionId,
      idempotencyKey: orderData.idempotencyKey,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    db.orders.unshift(newOrder);
    saveDb(db);
    invalidateMemoryCache('products');
    invalidateMemoryCache('orders');
    return { success: true, order: newOrder };
  }

  const supabase = getServiceSupabase();

  // 1. Authoritative Database Idempotency Check on orders.idempotency_key
  if (orderData.idempotencyKey) {
    try {
      const { data: existingOrder, error: idemErr } = await supabase
        .from('orders')
        .select('*, items:order_items(*)')
        .eq('idempotency_key', orderData.idempotencyKey)
        .maybeSingle();

      if (!idemErr && existingOrder) {
        return { success: true, order: mapSupabaseOrder(existingOrder) };
      }
    } catch (idemQueryErr) {
      console.warn('Idempotency query notice:', idemQueryErr);
    }
  }

  // 2. Authoritative Single-Transaction Database RPC
  try {
    const { data: rpcOrder, error: rpcError } = await supabase.rpc('create_order_atomic', {
      p_order_data: {
        customerName: orderData.customerName,
        customerEmail: orderData.customerEmail,
        customerPhone: orderData.customerPhone,
        shippingAddress: orderData.shippingAddress,
        billingAddress: orderData.billingAddress || orderData.shippingAddress,
        items: orderData.items,
        paymentMethod: orderData.paymentMethod || 'Balaji QR Payment (Balaji PG)',
        notes: orderData.notes || '',
        utrNumber: orderData.utrNumber || null,
        transactionId: orderData.transactionId || null,
        idempotencyKey: orderData.idempotencyKey || null,
      },
    });

    if (!rpcError && rpcOrder) {
      invalidateMemoryCache('products');
      return {
        success: true,
        order: mapSupabaseOrder(rpcOrder),
      };
    }

    if (rpcError) {
      console.error('Database create_order_atomic RPC error:', rpcError);
      return {
        success: false,
        error: rpcError.message || 'Failed to place order due to inventory or database conflict.',
      };
    }
  } catch (err: any) {
    console.error('create_order_atomic RPC exception:', err?.message);
    return {
      success: false,
      error: 'Checkout is temporarily unavailable. Please try again.',
    };
  }

  return {
    success: false,
    error: 'Checkout is temporarily unavailable. Please try again.',
  };
}

/**
 * Executes a single-transaction cancellation RPC.
 * Prevents double stock restoration and logs audit history.
 */
export async function cancelOrderAtomic(
  orderId: string,
  options?: { actorEmail?: string; note?: string }
): Promise<Order | null> {
  if (!isSupabaseConfigured()) {
    const db = getDb();
    const ord = db.orders.find((o) => o.id === orderId);
    if (!ord) return null;
    ord.orderStatus = 'Cancelled';
    ord.updatedAt = new Date().toISOString();
    saveDb(db);
    return ord;
  }

  const supabase = getServiceSupabase();

  try {
    const { data: cancelledOrder, error: cancelErr } = await supabase.rpc('cancel_order_atomic', {
      p_order_id: orderId,
      p_actor_email: options?.actorEmail || 'system',
      p_note: options?.note || 'Order cancelled',
    });

    if (!cancelErr && cancelledOrder) {
      invalidateMemoryCache('products');
      return mapSupabaseOrder(cancelledOrder);
    }

    if (cancelErr) {
      console.error('cancel_order_atomic RPC error:', cancelErr);
      throw new Error(`Failed to cancel order atomically: ${cancelErr.message}`);
    }
  } catch (err: any) {
    console.error('cancel_order_atomic execution notice:', err.message);
    throw err;
  }

  return null;
}
