import crypto from 'crypto';
import { Enquiry } from '@/types';
import {
  isSupabaseConfigured,
  getServiceSupabase,
  isUUID,
  getDb,
  saveDb,
} from '../client';
import { mapSupabaseEnquiry } from '../mappers';

export async function createEnquiry(
  data: Omit<Enquiry, 'id' | 'createdAt' | 'status'>
): Promise<Enquiry> {
  const now = new Date().toISOString();

  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    const { data: inserted, error } = await supabase
      .from('enquiries')
      .insert({
        name: data.name,
        email: data.email,
        phone: data.phone,
        subject: data.subject,
        message: data.message,
        source: data.source || 'Contact Form',
        status: 'New',
        created_at: now,
      })
      .select()
      .single();

    if (error || !inserted) {
      console.error('Supabase createEnquiry error:', error);
      throw new Error(`Failed to submit enquiry: ${error?.message || 'Database error'}`);
    }

    return mapSupabaseEnquiry(inserted);
  }

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
  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    let query = supabase.from('enquiries').select('*').order('created_at', { ascending: false });
    if (options?.limit) {
      query = query.limit(options.limit);
    }
    if (options?.offset) {
      query = query.range(options.offset, options.offset + (options.limit || 50) - 1);
    }
    const { data, error } = await query;
    if (error) throw new Error(`Failed to load enquiries: ${error.message}`);
    return (data || []).map(mapSupabaseEnquiry);
  }

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
  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    let query = supabase.from('enquiries').update({ status }).select();
    if (isUUID(id)) {
      query = query.eq('id', id);
    } else {
      query = query.eq('id', id);
    }
    const { data, error } = await query.maybeSingle();
    if (error) throw new Error(`Failed to update enquiry status: ${error.message}`);
    if (!data) return null;
    return mapSupabaseEnquiry(data);
  }

  const db = getDb();
  const enq = db.enquiries.find((e) => e.id === id);
  if (!enq) return null;
  enq.status = status;
  saveDb(db);
  return enq;
}
