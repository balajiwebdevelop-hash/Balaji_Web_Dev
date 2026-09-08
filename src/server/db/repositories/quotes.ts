import crypto from 'crypto';
import { Quote, QuoteStatus } from '@/types';
import {
  isSupabaseConfigured,
  getServiceSupabase,
  isUUID,
  getDb,
  saveDb,
} from '../client';
import { mapSupabaseQuote } from '../mappers';

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

  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    const { data: quoteRow, error } = await supabase
      .from('quotes')
      .insert({
        quote_number: quoteNumber,
        customer_name: quoteData.customerName,
        customer_email: quoteData.customerEmail,
        customer_phone: quoteData.customerPhone,
        project_type: quoteData.projectType,
        project_location: quoteData.projectLocation,
        estimated_timeline: quoteData.estimatedTimeline,
        budget_range: quoteData.budgetRange,
        notes: quoteData.notes || '',
        status: 'Pending',
      })
      .select()
      .single();

    if (error || !quoteRow) throw new Error(`Failed to create quote: ${error?.message}`);

    if (quoteData.items && quoteData.items.length > 0) {
      const qItems = quoteData.items.map((it) => ({
        quote_id: quoteRow.id,
        product_id: it.productId && isUUID(it.productId) ? it.productId : null,
        product_name: it.productName,
        dimensions: it.dimensions || null,
        quantity: it.quantity,
        unit: it.unit || 'sq ft',
        notes: it.notes || null,
      }));
      const { error: itemsErr } = await supabase.from('quote_items').insert(qItems);
      if (itemsErr) {
        await supabase.from('quotes').delete().eq('id', quoteRow.id);
        throw new Error(`Failed to save quote items: ${itemsErr.message}`);
      }
    }

    const { data: fullQuote } = await supabase
      .from('quotes')
      .select('*, items:quote_items(*)')
      .eq('id', quoteRow.id)
      .single();

    return mapSupabaseQuote(fullQuote);
  }

  const db = getDb();
  const quoteId = crypto.randomUUID();
  const quoteItems = (quoteData.items || []).map((it) => ({
    id: crypto.randomUUID(),
    quoteId,
    productId: it.productId,
    productName: it.productName,
    dimensions: it.dimensions,
    quantity: it.quantity,
    unit: it.unit,
    notes: it.notes,
  }));

  const newQuote: Quote = {
    id: quoteId,
    quoteNumber,
    customerName: quoteData.customerName,
    customerEmail: quoteData.customerEmail,
    customerPhone: quoteData.customerPhone,
    projectType: quoteData.projectType,
    projectLocation: quoteData.projectLocation,
    estimatedTimeline: quoteData.estimatedTimeline,
    budgetRange: quoteData.budgetRange,
    notes: quoteData.notes,
    items: quoteItems,
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
  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    let query = supabase
      .from('quotes')
      .select('*, items:quote_items(*)')
      .order('created_at', { ascending: false });

    if (options?.status) {
      query = query.eq('status', options.status);
    }
    if (options?.limit) {
      query = query.limit(options.limit);
    }
    if (options?.offset) {
      query = query.range(options.offset, options.offset + (options.limit || 50) - 1);
    }

    const { data, error } = await query;
    if (error) throw new Error(`Failed to load quotes: ${error.message}`);
    return (data || []).map(mapSupabaseQuote);
  }

  const db = getDb();
  let list = [...db.quotes].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
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
  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    let query = supabase.from('quotes').select('*, items:quote_items(*)');
    if (isUUID(id)) {
      query = query.eq('id', id);
    } else {
      query = query.eq('quote_number', id);
    }
    const { data, error } = await query.maybeSingle();
    if (error) throw new Error(error.message);
    if (!data) return null;
    return mapSupabaseQuote(data);
  }

  const db = getDb();
  return db.quotes.find((q) => q.id === id || q.quoteNumber === id) || null;
}

export async function updateQuoteStatus(
  id: string,
  status: Quote['status'],
  totalQuotedAmount?: number,
  adminNotes?: string
): Promise<Quote | null> {
  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    const updates: any = { status, updated_at: new Date().toISOString() };
    if (totalQuotedAmount !== undefined) updates.total_quoted_amount = totalQuotedAmount;
    if (adminNotes !== undefined) updates.admin_notes = adminNotes;

    let query = supabase.from('quotes').update(updates);
    if (isUUID(id)) {
      query = query.eq('id', id);
    } else {
      query = query.eq('quote_number', id);
    }

    const { data, error } = await query.select('*, items:quote_items(*)').maybeSingle();
    if (error) throw new Error(`Failed to update quote status: ${error.message}`);
    if (!data) return null;
    return mapSupabaseQuote(data);
  }

  const db = getDb();
  const quote = db.quotes.find((q) => q.id === id || q.quoteNumber === id);
  if (!quote) return null;
  quote.status = status;
  if (totalQuotedAmount !== undefined) quote.totalQuotedAmount = totalQuotedAmount;
  if (adminNotes !== undefined) quote.adminNotes = adminNotes;
  quote.updatedAt = new Date().toISOString();
  saveDb(db);
  return quote;
}
