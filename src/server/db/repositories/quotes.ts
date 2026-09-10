import crypto from 'crypto';
import { Quote, QuoteStatus } from '@/types';
import { getDb, saveDb } from '../client';
import { mapSupabaseQuote } from '../mappers';
import { isMySQLConfigured, query, queryOne, execute } from '../mysql';

export async function createQuote(quoteData: {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  projectType: string;
  projectLocation: string;
  estimatedTimeline: string;
  budgetRange: string;
  notes: string;
  items?: {
    productId?: string;
    productName: string;
    dimensions?: string;
    quantity: number;
    unit: any;
    notes?: string;
  }[];
}): Promise<Quote> {
  const quoteNumber = `QT-${new Date().getFullYear()}-${Date.now().toString(36).toUpperCase()}-${crypto.randomBytes(2).toString('hex').toUpperCase()}`;

  // 1. Hostinger MySQL Primary Layer
  if (isMySQLConfigured()) {
    try {
      const quoteId = `quote-${crypto.randomUUID()}`;
      await execute(
        `INSERT INTO quotes (
          id, quote_number, customer_name, customer_email, customer_phone,
          project_type, project_location, estimated_timeline, budget_range,
          notes, status, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pending', NOW(), NOW())`,
        [
          quoteId,
          quoteNumber,
          quoteData.customerName,
          quoteData.customerEmail,
          quoteData.customerPhone,
          quoteData.projectType,
          quoteData.projectLocation,
          quoteData.estimatedTimeline,
          quoteData.budgetRange,
          quoteData.notes || '',
        ]
      );

      if (quoteData.items && quoteData.items.length > 0) {
        for (const it of quoteData.items) {
          await execute(
            `INSERT INTO quote_items (
              id, quote_id, product_id, product_name, dimensions, quantity, unit, notes, created_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
            [
              crypto.randomUUID(),
              quoteId,
              it.productId || null,
              it.productName,
              it.dimensions || null,
              it.quantity,
              it.unit,
              it.notes || null,
            ]
          );
        }
      }

      const inserted = await queryOne('SELECT * FROM quotes WHERE id = ?', [quoteId]);
      if (inserted) {
        const items = await query('SELECT * FROM quote_items WHERE quote_id = ?', [quoteId]);
        return mapSupabaseQuote({ ...inserted, items });
      }
    } catch (mysqlErr) {
      console.warn('Hostinger MySQL createQuote failed, falling back:', mysqlErr);
    }
  }

  // 2. Unit Test / Local Fallback
  const db = getDb();
  const newQuote: Quote = {
    id: `qt-${Date.now()}`,
    quoteNumber,
    customerName: quoteData.customerName,
    customerEmail: quoteData.customerEmail,
    customerPhone: quoteData.customerPhone,
    projectType: quoteData.projectType,
    projectLocation: quoteData.projectLocation,
    estimatedTimeline: quoteData.estimatedTimeline,
    budgetRange: quoteData.budgetRange,
    notes: quoteData.notes,
    items: (quoteData.items || []).map((it) => ({
      ...it,
      id: crypto.randomUUID(),
      quoteId: `qt-${Date.now()}`,
    })),
    status: 'Pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  db.quotes.unshift(newQuote);
  saveDb(db);
  return newQuote;
}

export async function getQuotes(options?: {
  limit?: number;
  offset?: number;
  status?: QuoteStatus;
}): Promise<Quote[]> {
  // 1. Hostinger MySQL Primary Layer
  if (isMySQLConfigured()) {
    try {
      let sql = 'SELECT * FROM quotes WHERE 1=1';
      const params: any[] = [];
      if (options?.status) {
        sql += ' AND status = ?';
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
      const quotes = await query(sql, params);
      if (quotes.length > 0) {
        const quoteIds = quotes.map((q) => q.id);
        const placeholders = quoteIds.map(() => '?').join(',');
        const items = await query(`SELECT * FROM quote_items WHERE quote_id IN (${placeholders})`, quoteIds);
        const itemsByQuote = new Map<string, any[]>();
        items.forEach((it) => {
          const list = itemsByQuote.get(it.quote_id) || [];
          list.push(it);
          itemsByQuote.set(it.quote_id, list);
        });
        return quotes.map((q) => mapSupabaseQuote({ ...q, items: itemsByQuote.get(q.id) || q.items || [] }));
      }
      return [];
    } catch (mysqlErr) {
      console.warn('Hostinger MySQL getQuotes failed, falling back:', mysqlErr);
    }
  }

  // 2. Unit Test / Local Fallback
  const db = getDb();
  let list = [...db.quotes];
  if (options?.status) {
    list = list.filter((q) => q.status === options.status);
  }
  if (options?.offset) {
    list = list.slice(options.offset);
  }
  if (options?.limit) {
    list = list.slice(0, options.limit);
  }
  return list;
}

export async function getQuoteById(id: string): Promise<Quote | null> {
  // 1. Hostinger MySQL Primary Layer
  if (isMySQLConfigured()) {
    try {
      const quote = await queryOne('SELECT * FROM quotes WHERE id = ? LIMIT 1', [id]);
      if (quote) {
        const items = await query('SELECT * FROM quote_items WHERE quote_id = ?', [id]);
        return mapSupabaseQuote({ ...quote, items });
      }
    } catch (mysqlErr) {
      console.warn('Hostinger MySQL getQuoteById failed, falling back:', mysqlErr);
    }
  }

  // 2. Unit Test / Local Fallback
  const db = getDb();
  return db.quotes.find((q) => q.id === id) || null;
}

export async function updateQuoteStatus(
  id: string,
  status: QuoteStatus,
  param3?: string | number,
  param4?: string | number
): Promise<Quote | null> {
  let adminNotes: string | undefined;
  let totalQuotedAmount: number | undefined;

  if (typeof param3 === 'number') {
    totalQuotedAmount = param3;
    if (typeof param4 === 'string') adminNotes = param4;
  } else if (typeof param3 === 'string') {
    adminNotes = param3;
    if (typeof param4 === 'number') totalQuotedAmount = param4;
  } else if (typeof param4 === 'number') {
    totalQuotedAmount = param4;
  } else if (typeof param4 === 'string') {
    adminNotes = param4;
  }

  // 1. Hostinger MySQL Primary Layer
  if (isMySQLConfigured()) {
    try {
      const updates: string[] = ['status = ?', 'updated_at = NOW()'];
      const params: any[] = [status];
      if (adminNotes !== undefined) {
        updates.push('admin_notes = ?');
        params.push(adminNotes);
      }
      if (totalQuotedAmount !== undefined) {
        updates.push('total_quoted_amount = ?');
        params.push(totalQuotedAmount);
      }
      params.push(id);
      await execute(`UPDATE quotes SET ${updates.join(', ')} WHERE id = ?`, params);

      const quote = await queryOne('SELECT * FROM quotes WHERE id = ?', [id]);
      if (quote) {
        const items = await query('SELECT * FROM quote_items WHERE quote_id = ?', [id]);
        return mapSupabaseQuote({ ...quote, items });
      }
      return null;
    } catch (mysqlErr: any) {
      console.error('Hostinger MySQL updateQuoteStatus failed:', mysqlErr);
      throw mysqlErr;
    }
  }

  // 2. Unit Test / Local Fallback
  const db = getDb();
  const quote = db.quotes.find((q) => q.id === id);
  if (!quote) return null;
  quote.status = status;
  if (adminNotes !== undefined) quote.adminNotes = adminNotes;
  if (totalQuotedAmount !== undefined) quote.totalQuotedAmount = totalQuotedAmount;
  quote.updatedAt = new Date().toISOString();
  saveDb(db);
  return quote;
}

export async function deleteQuote(id: string): Promise<boolean> {
  // 1. Hostinger MySQL Primary Layer
  if (isMySQLConfigured()) {
    try {
      await execute('DELETE FROM quote_items WHERE quote_id = ?', [id]);
      const res = await execute('DELETE FROM quotes WHERE id = ?', [id]);
      return res.affectedRows > 0;
    } catch (mysqlErr: any) {
      console.error('Hostinger MySQL deleteQuote failed:', mysqlErr);
      throw mysqlErr;
    }
  }

  // 2. Unit Test / Local Fallback
  const db = getDb();
  const initialLength = db.quotes.length;
  db.quotes = db.quotes.filter((q) => q.id !== id);
  if (db.quotes.length < initialLength) {
    saveDb(db);
    return true;
  }
  return false;
}
