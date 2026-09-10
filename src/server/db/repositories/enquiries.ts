import crypto from 'crypto';
import { Enquiry } from '@/types';
import { getDb, saveDb } from '../client';
import { mapSupabaseEnquiry } from '../mappers';
import { isMySQLConfigured, query, queryOne, execute } from '../mysql';

export async function createEnquiry(
  data: Omit<Enquiry, 'id' | 'createdAt' | 'status'>
): Promise<Enquiry> {
  const now = new Date().toISOString();

  // 1. Hostinger MySQL Primary Layer
  if (isMySQLConfigured()) {
    try {
      const enqId = `enq-${crypto.randomUUID()}`;
      await execute(
        `INSERT INTO enquiries (id, name, email, phone, subject, message, source, status, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, 'New', NOW())`,
        [
          enqId,
          data.name,
          data.email,
          data.phone,
          data.subject,
          data.message,
          data.source || 'Contact Form',
        ]
      );

      const inserted = await queryOne('SELECT * FROM enquiries WHERE id = ?', [enqId]);
      if (inserted) return mapSupabaseEnquiry(inserted);
      throw new Error(`Failed to retrieve newly created enquiry ${enqId}`);
    } catch (mysqlErr: any) {
      console.error('Hostinger MySQL createEnquiry failed:', mysqlErr);
      throw mysqlErr;
    }
  }

  // 2. Unit Test / Local Fallback
  const db = getDb();
  const newEnq: Enquiry = {
    ...data,
    id: `enq-${Date.now()}-${crypto.randomBytes(2).toString('hex')}`,
    status: 'New',
    createdAt: now,
  };
  db.enquiries.unshift(newEnq);
  saveDb(db);
  return newEnq;
}

export async function getEnquiries(options?: {
  limit?: number;
  offset?: number;
}): Promise<Enquiry[]> {
  // 1. Hostinger MySQL Primary Layer
  if (isMySQLConfigured()) {
    try {
      let sql = 'SELECT * FROM enquiries ORDER BY created_at DESC';
      const params: any[] = [];
      if (options?.limit) {
        sql += ' LIMIT ?';
        params.push(Number(options.limit));
        if (options?.offset) {
          sql += ' OFFSET ?';
          params.push(Number(options.offset));
        }
      }
      const rows = await query(sql, params);
      return rows.map(mapSupabaseEnquiry);
    } catch (mysqlErr) {
      console.warn('Hostinger MySQL getEnquiries failed, falling back:', mysqlErr);
    }
  }

  // 2. Unit Test / Local Fallback
  const db = getDb();
  let list = [...db.enquiries];
  if (options?.offset) {
    list = list.slice(options.offset);
  }
  if (options?.limit) {
    list = list.slice(0, options.limit);
  }
  return list;
}

export async function updateEnquiryStatus(
  id: string,
  status: Enquiry['status']
): Promise<Enquiry | null> {
  // 1. Hostinger MySQL Primary Layer
  if (isMySQLConfigured()) {
    try {
      await execute('UPDATE enquiries SET status = ? WHERE id = ?', [status, id]);
      const row = await queryOne('SELECT * FROM enquiries WHERE id = ?', [id]);
      return row ? mapSupabaseEnquiry(row) : null;
    } catch (mysqlErr: any) {
      console.error('Hostinger MySQL updateEnquiryStatus failed:', mysqlErr);
      throw mysqlErr;
    }
  }

  // 2. Unit Test / Local Fallback
  const db = getDb();
  const enq = db.enquiries.find((e) => e.id === id);
  if (!enq) return null;
  enq.status = status;
  saveDb(db);
  return enq;
}
