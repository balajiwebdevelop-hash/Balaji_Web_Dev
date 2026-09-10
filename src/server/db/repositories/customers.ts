import crypto from 'crypto';
import { getDb } from '../client';
import { isMySQLConfigured, query, queryOne, execute } from '../mysql';

export interface CustomerRecord {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  isGuest: boolean;
  createdAt: string;
  updatedAt: string;
}

export async function upsertCustomer(input: {
  email: string;
  fullName: string;
  phone?: string;
  isGuest?: boolean;
}): Promise<CustomerRecord> {
  const normalizedEmail = input.email.trim().toLowerCase();
  const now = new Date().toISOString();

  // 1. Hostinger MySQL Primary Layer
  if (isMySQLConfigured()) {
    try {
      const existing = await queryOne('SELECT * FROM customers WHERE LOWER(email) = LOWER(?) LIMIT 1', [normalizedEmail]);
      if (existing) {
        const updates: string[] = ['updated_at = NOW()'];
        const params: any[] = [];
        if (input.fullName && (!existing.full_name || existing.full_name === 'Client')) {
          updates.push('full_name = ?');
          params.push(input.fullName);
        }
        if (input.phone && !existing.phone) {
          updates.push('phone = ?');
          params.push(input.phone);
        }
        if (input.isGuest === false && existing.is_guest) {
          updates.push('is_guest = 0');
        }
        params.push(existing.id);
        await execute(`UPDATE customers SET ${updates.join(', ')} WHERE id = ?`, params);

        const updated = await queryOne('SELECT * FROM customers WHERE id = ?', [existing.id]);
        const res = updated || existing;
        return {
          id: res.id,
          email: res.email,
          fullName: res.full_name,
          phone: res.phone,
          isGuest: Boolean(res.is_guest),
          createdAt: res.created_at instanceof Date ? res.created_at.toISOString() : res.created_at,
          updatedAt: res.updated_at instanceof Date ? res.updated_at.toISOString() : res.updated_at,
        };
      } else {
        const custId = `cust-${crypto.randomUUID()}`;
        await execute(
          `INSERT INTO customers (id, email, full_name, phone, is_guest, created_at, updated_at)
           VALUES (?, ?, ?, ?, ?, NOW(), NOW())`,
          [
            custId,
            normalizedEmail,
            input.fullName || 'Client',
            input.phone || null,
            input.isGuest ? 1 : 0,
          ]
        );
        return {
          id: custId,
          email: normalizedEmail,
          fullName: input.fullName || 'Client',
          phone: input.phone,
          isGuest: Boolean(input.isGuest),
          createdAt: now,
          updatedAt: now,
        };
      }
    } catch (mysqlErr) {
      console.warn('Hostinger MySQL upsertCustomer failed, falling back:', mysqlErr);
    }
  }

  // 2. Unit Test / Local Fallback
  return {
    id: `cust-${Date.now()}`,
    email: normalizedEmail,
    fullName: input.fullName || 'Client',
    phone: input.phone,
    isGuest: input.isGuest || false,
    createdAt: now,
    updatedAt: now,
  };
}

export async function getCustomers(limit = 100, offset = 0): Promise<CustomerRecord[]> {
  // 1. Hostinger MySQL Primary Layer
  if (isMySQLConfigured()) {
    try {
      const rows = await query(
        'SELECT * FROM customers ORDER BY created_at DESC LIMIT ? OFFSET ?',
        [Number(limit), Number(offset)]
      );
      if (rows && rows.length > 0) {
        return rows.map((c: any) => ({
          id: c.id,
          email: c.email,
          fullName: c.full_name,
          phone: c.phone || '',
          isGuest: Boolean(c.is_guest),
          createdAt: c.created_at instanceof Date ? c.created_at.toISOString() : c.created_at,
          updatedAt: c.updated_at instanceof Date ? c.updated_at.toISOString() : c.updated_at,
        }));
      }
      return [];
    } catch (mysqlErr) {
      console.warn('Hostinger MySQL getCustomers failed, falling back:', mysqlErr);
    }
  }

  // 2. Unit Test / Local Fallback
  const db = getDb();
  const rawCustomers = (db as any).customers || [];
  if (rawCustomers.length > 0) {
    return rawCustomers.slice(offset, offset + limit).map((c: any) => ({
      id: c.id,
      email: c.email,
      fullName: c.fullName || c.full_name || 'Client',
      phone: c.phone || '',
      isGuest: c.isGuest || false,
      createdAt: c.createdAt || new Date().toISOString(),
      updatedAt: c.updatedAt || new Date().toISOString(),
    }));
  }

  const customerMap = new Map<string, CustomerRecord>();
  db.orders.forEach((o) => {
    if (o.customerEmail && !customerMap.has(o.customerEmail.toLowerCase())) {
      customerMap.set(o.customerEmail.toLowerCase(), {
        id: `cust-${o.id}`,
        email: o.customerEmail,
        fullName: o.customerName,
        phone: o.customerPhone,
        isGuest: false,
        createdAt: o.createdAt,
        updatedAt: o.updatedAt || o.createdAt,
      });
    }
  });
  return Array.from(customerMap.values()).slice(offset, offset + limit);
}
