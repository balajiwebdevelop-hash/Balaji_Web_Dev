import crypto from 'crypto';
import { Order, OrderStatus, PaymentStatus } from '@/types';
import {
  invalidateMemoryCache,
  getDb,
  saveDb,
} from '../client';
import { mapSupabaseOrder } from '../mappers';
import { cancelOrderAtomic } from '../transactions/orders';
import { validateOrderStatusTransition } from '../../validation/schemas';
import { isMySQLConfigured, query, queryOne, execute } from '../mysql';

export async function getOrders(options?: {
  limit?: number;
  offset?: number;
  status?: OrderStatus;
}): Promise<Order[]> {
  // 1. Hostinger MySQL Primary Layer
  if (isMySQLConfigured()) {
    try {
      let sql = 'SELECT * FROM orders WHERE 1=1';
      const params: any[] = [];
      if (options?.status) {
        sql += ' AND order_status = ?';
        params.push(options.status);
      }
      sql += ' ORDER BY created_at DESC';
      if (options?.limit) {
        sql += ' LIMIT ?';
        params.push(Number(options.limit));
        if (options?.offset) {
          sql += ' OFFSET ?';
          params.push(Number(options.offset));
        }
      }
      const orders = await query(sql, params);
      if (orders.length > 0) {
        const orderIds = orders.map((o) => o.id);
        const placeholders = orderIds.map(() => '?').join(',');
        const items = await query(`SELECT * FROM order_items WHERE order_id IN (${placeholders})`, orderIds);
        const itemsByOrder = new Map<string, any[]>();
        items.forEach((it) => {
          const list = itemsByOrder.get(it.order_id) || [];
          list.push(it);
          itemsByOrder.set(it.order_id, list);
        });
        return orders.map((o) => mapSupabaseOrder({ ...o, items: itemsByOrder.get(o.id) || o.items || [] }));
      }
      return [];
    } catch (mysqlErr) {
      console.warn('Hostinger MySQL getOrders failed, falling back:', mysqlErr);
    }
  }

  // 2. Unit Test / Local Fallback
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
  // 1. Hostinger MySQL Primary Layer
  if (isMySQLConfigured()) {
    try {
      const order = await queryOne('SELECT * FROM orders WHERE id = ? LIMIT 1', [id]);
      if (order) {
        const items = await query('SELECT * FROM order_items WHERE order_id = ?', [id]);
        return mapSupabaseOrder({ ...order, items });
      }
    } catch (mysqlErr) {
      console.warn('Hostinger MySQL getOrderById failed, falling back:', mysqlErr);
    }
  }

  // 2. Unit Test / Local Fallback
  const db = getDb();
  return db.orders.find((o) => o.id === id) || null;
}

export async function getOrderByNumber(orderNumber: string): Promise<Order | null> {
  // 1. Hostinger MySQL Primary Layer
  if (isMySQLConfigured()) {
    try {
      const order = await queryOne('SELECT * FROM orders WHERE order_number = ? LIMIT 1', [orderNumber]);
      if (order) {
        const items = await query('SELECT * FROM order_items WHERE order_id = ?', [order.id]);
        return mapSupabaseOrder({ ...order, items });
      }
    } catch (mysqlErr) {
      console.warn('Hostinger MySQL getOrderByNumber failed, falling back:', mysqlErr);
    }
  }

  // 2. Unit Test / Local Fallback
  const db = getDb();
  return db.orders.find((o) => o.orderNumber === orderNumber) || null;
}

export async function getCustomerOrders(email: string): Promise<Order[]> {
  // 1. Hostinger MySQL Primary Layer
  if (isMySQLConfigured()) {
    try {
      const orders = await query(
        'SELECT * FROM orders WHERE customer_email = ? ORDER BY created_at DESC',
        [email]
      );
      if (orders.length > 0) {
        const orderIds = orders.map((o) => o.id);
        const placeholders = orderIds.map(() => '?').join(',');
        const items = await query(`SELECT * FROM order_items WHERE order_id IN (${placeholders})`, orderIds);
        const itemsByOrder = new Map<string, any[]>();
        items.forEach((it) => {
          const list = itemsByOrder.get(it.order_id) || [];
          list.push(it);
          itemsByOrder.set(it.order_id, list);
        });
        return orders.map((o) => mapSupabaseOrder({ ...o, items: itemsByOrder.get(o.id) || o.items || [] }));
      }
      return [];
    } catch (mysqlErr) {
      console.warn('Hostinger MySQL getCustomerOrders failed, falling back:', mysqlErr);
    }
  }

  // 2. Unit Test / Local Fallback
  const db = getDb();
  return db.orders
    .filter((o) => o.customerEmail.toLowerCase() === email.toLowerCase())
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function updateOrderStatus(
  id: string,
  newStatus: OrderStatus,
  paymentStatusOrOptions?: PaymentStatus | { actorEmail?: string; note?: string; utrNumber?: string; transactionId?: string },
  maybeOptions?: { actorEmail?: string; note?: string; utrNumber?: string; transactionId?: string }
): Promise<Order | null> {
  let paymentStatus: PaymentStatus | undefined;
  let options: { actorEmail?: string; note?: string; utrNumber?: string; transactionId?: string } | undefined;

  if (typeof paymentStatusOrOptions === 'string') {
    paymentStatus = paymentStatusOrOptions as PaymentStatus;
    options = maybeOptions;
  } else if (typeof paymentStatusOrOptions === 'object') {
    options = paymentStatusOrOptions;
  }

  if (newStatus === 'Cancelled') {
    return cancelOrderAtomic(id, options);
  }

  const current = await getOrderById(id);
  if (!current) return null;

  validateOrderStatusTransition(current.orderStatus, newStatus);

  // 1. Hostinger MySQL Primary Layer
  if (isMySQLConfigured()) {
    try {
      const updates = ['order_status = ?', 'updated_at = NOW()'];
      const params: any[] = [newStatus];
      if (paymentStatus) {
        updates.push('payment_status = ?');
        params.push(paymentStatus);
      }
      if (options?.utrNumber) {
        updates.push('utr_number = ?');
        params.push(options.utrNumber);
      }
      if (options?.transactionId) {
        updates.push('transaction_id = ?');
        params.push(options.transactionId);
      }
      params.push(id);
      await execute(`UPDATE orders SET ${updates.join(', ')} WHERE id = ?`, params);
      invalidateMemoryCache('orders');
      const updated = await queryOne('SELECT * FROM orders WHERE id = ?', [id]);
      if (updated) {
        const items = await query('SELECT * FROM order_items WHERE order_id = ?', [id]);
        return mapSupabaseOrder({ ...updated, items });
      }
      return null;
    } catch (mysqlErr: any) {
      console.error('Hostinger MySQL updateOrderStatus failed:', mysqlErr);
      throw mysqlErr;
    }
  }

  // 2. Unit Test / Local Fallback
  const db = getDb();
  const ord = db.orders.find((o) => o.id === id);
  if (!ord) return null;
  ord.orderStatus = newStatus;
  if (paymentStatus) ord.paymentStatus = paymentStatus;
  if (options?.utrNumber) ord.utrNumber = options.utrNumber;
  if (options?.transactionId) ord.transactionId = options.transactionId;
  ord.updatedAt = new Date().toISOString();
  saveDb(db);
  invalidateMemoryCache('orders');
  return ord;
}

export async function updatePaymentStatus(
  id: string,
  paymentStatus: PaymentStatus,
  options?: { transactionId?: string; utrNumber?: string }
): Promise<Order | null> {
  // 1. Hostinger MySQL Primary Layer
  if (isMySQLConfigured()) {
    try {
      const updates = ['payment_status = ?', 'updated_at = NOW()'];
      const params: any[] = [paymentStatus];
      if (options?.transactionId) {
        updates.push('transaction_id = ?');
        params.push(options.transactionId);
      }
      if (options?.utrNumber) {
        updates.push('utr_number = ?');
        params.push(options.utrNumber);
      }
      params.push(id);
      await execute(`UPDATE orders SET ${updates.join(', ')} WHERE id = ?`, params);
      invalidateMemoryCache('orders');
      const updated = await queryOne('SELECT * FROM orders WHERE id = ?', [id]);
      if (updated) {
        const items = await query('SELECT * FROM order_items WHERE order_id = ?', [id]);
        return mapSupabaseOrder({ ...updated, items });
      }
      return null;
    } catch (mysqlErr: any) {
      console.error('Hostinger MySQL updatePaymentStatus failed:', mysqlErr);
      throw mysqlErr;
    }
  }

  // 2. Unit Test / Local Fallback
  const db = getDb();
  const ord = db.orders.find((o) => o.id === id);
  if (!ord) return null;
  ord.paymentStatus = paymentStatus;
  if (options?.transactionId) ord.transactionId = options.transactionId;
  if (options?.utrNumber) ord.utrNumber = options.utrNumber;
  ord.updatedAt = new Date().toISOString();
  saveDb(db);
  invalidateMemoryCache('orders');
  return ord;
}

export async function deleteOrder(id: string): Promise<boolean> {
  // 1. Hostinger MySQL Primary Layer
  if (isMySQLConfigured()) {
    try {
      await execute('DELETE FROM order_items WHERE order_id = ?', [id]);
      const res = await execute('DELETE FROM orders WHERE id = ?', [id]);
      invalidateMemoryCache('orders');
      return res.affectedRows > 0;
    } catch (mysqlErr: any) {
      console.error('Hostinger MySQL deleteOrder failed:', mysqlErr);
      throw mysqlErr;
    }
  }

  // 2. Unit Test / Local Fallback
  const db = getDb();
  const initialLength = db.orders.length;
  db.orders = db.orders.filter((o) => o.id !== id);
  if (db.orders.length < initialLength) {
    saveDb(db);
    invalidateMemoryCache('orders');
    return true;
  }
  return false;
}
