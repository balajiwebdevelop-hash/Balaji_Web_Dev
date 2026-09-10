import crypto from 'crypto';
import { Order, OrderStatus, PaymentStatus } from '@/types';
import {
  isProduction,
  invalidateMemoryCache,
  isUUID,
  getDb,
  saveDb,
} from '../client';
import { mapSupabaseOrder } from '../mappers';
import { isMySQLConfigured, getConnection, query, queryOne, execute } from '../mysql';

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
 * Runs atomically on Hostinger MySQL with full ACID rollback on error.
 */
export async function createOrderAtomic(
  orderData: CreateOrderData
): Promise<{ success: boolean; order?: Order; error?: string }> {
  // 1. Hostinger MySQL Transaction Path
  if (isMySQLConfigured()) {
    const conn = await getConnection();
    try {
      // Check Idempotency Key
      if (orderData.idempotencyKey) {
        const [existingOrders]: any = await conn.execute(
          'SELECT * FROM orders WHERE idempotency_key = ? LIMIT 1',
          [orderData.idempotencyKey]
        );
        if (existingOrders.length > 0) {
          const ord = existingOrders[0];
          const [items]: any = await conn.execute('SELECT * FROM order_items WHERE order_id = ?', [ord.id]);
          conn.release();
          return { success: true, order: mapSupabaseOrder({ ...ord, items }) };
        }
      }

      await conn.beginTransaction();

      const orderItems: any[] = [];
      let subtotal = 0;

      // Validate products & stock
      for (const item of orderData.items) {
        const [prodRows]: any = await conn.execute(
          'SELECT * FROM products WHERE id = ? FOR UPDATE',
          [item.productId]
        );
        if (!prodRows || prodRows.length === 0) {
          await conn.rollback();
          conn.release();
          return { success: false, error: `Product not found: ${item.productId}` };
        }
        const prod = prodRows[0];
        const stockAvailable = prod.stock ?? 0;
        if (stockAvailable < item.quantity) {
          await conn.rollback();
          conn.release();
          return {
            success: false,
            error: `Insufficient stock for ${prod.name}. Requested: ${item.quantity}, Available: ${stockAvailable}`,
          };
        }

        const unitPrice = prod.sale_price ?? prod.price;
        const itemSubtotal = unitPrice * item.quantity;
        subtotal += itemSubtotal;

        let prodImages = [];
        try {
          prodImages = typeof prod.images === 'string' ? JSON.parse(prod.images) : prod.images || [];
        } catch {
          prodImages = [];
        }

        orderItems.push({
          id: crypto.randomUUID(),
          productId: prod.id,
          productName: prod.name,
          sku: prod.sku || '',
          unit: prod.unit || 'sq ft',
          quantity: item.quantity,
          unitPrice,
          subtotal: itemSubtotal,
          imageUrl: prodImages[0] || '',
          selectedColor: item.selectedColor || null,
          selectedFinish: item.selectedFinish || null,
        });

        // Decrement stock in Hostinger MySQL
        await conn.execute('UPDATE products SET stock = stock - ? WHERE id = ?', [
          item.quantity,
          prod.id,
        ]);
      }

      const tax = Math.round(subtotal * 0.18);
      const totalAmount = subtotal + tax;
      const orderNumber = `BAL-${Date.now().toString(36).toUpperCase()}-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
      const orderId = crypto.randomUUID();
      const nowStr = new Date().toISOString().slice(0, 19).replace('T', ' ');

      // Insert Order into orders table
      await conn.execute(
        `INSERT INTO orders (
          id, order_number, customer_name, customer_email, customer_phone,
          shipping_address, billing_address, subtotal, tax, shipping_fee,
          discount, total_amount, order_status, payment_status, payment_method,
          notes, utr_number, transaction_id, idempotency_key, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          orderId,
          orderNumber,
          orderData.customerName,
          orderData.customerEmail,
          orderData.customerPhone,
          JSON.stringify(orderData.shippingAddress),
          JSON.stringify(orderData.billingAddress || orderData.shippingAddress),
          subtotal,
          tax,
          0,
          0,
          totalAmount,
          'Confirmed',
          'Submitted',
          orderData.paymentMethod || 'Balaji QR Payment (Balaji PG)',
          orderData.notes || null,
          orderData.utrNumber || null,
          orderData.transactionId || null,
          orderData.idempotencyKey || null,
          nowStr,
          nowStr,
        ]
      );

      // Insert Order Items into order_items table
      for (const it of orderItems) {
        await conn.execute(
          `INSERT INTO order_items (
            id, order_id, product_id, product_name, product_sku,
            unit, quantity, unit_price, subtotal, image_url,
            selected_color, selected_finish
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            it.id,
            orderId,
            it.productId,
            it.productName,
            it.sku,
            it.unit,
            it.quantity,
            it.unitPrice,
            it.subtotal,
            it.imageUrl,
            it.selectedColor,
            it.selectedFinish,
          ]
        );
      }

      await conn.commit();
      conn.release();

      invalidateMemoryCache('products');
      invalidateMemoryCache('orders');

      const fullOrder: Order = {
        id: orderId,
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

      return { success: true, order: fullOrder };
    } catch (txErr: any) {
      await conn.rollback();
      conn.release();
      console.error('MySQL createOrderAtomic transaction failed:', txErr);
      return { success: false, error: txErr.message || 'Failed to place order in database.' };
    }
  }

  // 2. Unit Test / Local Fallback
  const db = getDb();
  if (orderData.idempotencyKey) {
    const existing = db.orders.find((o) => o.idempotencyKey === orderData.idempotencyKey);
    if (existing) {
      return { success: true, order: existing };
    }
  }

  const orderItems: any[] = [];
  let subtotal = 0;

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

/**
 * Executes an order cancellation transaction.
 * Restores inventory stock cleanly.
 */
export async function cancelOrderAtomic(
  orderId: string,
  options?: { actorEmail?: string; note?: string }
): Promise<Order | null> {
  if (isMySQLConfigured()) {
    const conn = await getConnection();
    try {
      await conn.beginTransaction();

      const [orders]: any = await conn.execute('SELECT * FROM orders WHERE id = ? FOR UPDATE', [orderId]);
      if (!orders || orders.length === 0) {
        await conn.rollback();
        conn.release();
        return null;
      }
      const ord = orders[0];

      if (ord.order_status !== 'Cancelled') {
        const [items]: any = await conn.execute('SELECT * FROM order_items WHERE order_id = ?', [orderId]);
        for (const it of items) {
          if (it.product_id) {
            await conn.execute('UPDATE products SET stock = stock + ? WHERE id = ?', [it.quantity, it.product_id]);
          }
        }
        await conn.execute(
          'UPDATE orders SET order_status = ?, updated_at = NOW() WHERE id = ?',
          ['Cancelled', orderId]
        );
      }

      await conn.commit();
      conn.release();
      invalidateMemoryCache('products');
      invalidateMemoryCache('orders');

      const updated = await queryOne('SELECT * FROM orders WHERE id = ?', [orderId]);
      const items = await query('SELECT * FROM order_items WHERE order_id = ?', [orderId]);
      return mapSupabaseOrder({ ...updated, items });
    } catch (err) {
      await conn.rollback();
      conn.release();
      console.error('MySQL cancelOrderAtomic error:', err);
      throw err;
    }
  }

  const db = getDb();
  const ord = db.orders.find((o) => o.id === orderId);
  if (!ord) return null;
  ord.orderStatus = 'Cancelled';
  ord.updatedAt = new Date().toISOString();
  saveDb(db);
  return ord;
}
