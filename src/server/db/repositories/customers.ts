import crypto from 'crypto';
import {
  isSupabaseConfigured,
  getServiceSupabase,
  getDb,
} from '../client';

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

  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    const { data: existing } = await supabase
      .from('customers')
      .select('*')
      .eq('email', normalizedEmail)
      .maybeSingle();

    if (existing) {
      const updates: any = { updated_at: now };
      if (input.fullName && (!existing.full_name || existing.full_name === 'Client')) {
        updates.full_name = input.fullName;
      }
      if (input.phone && !existing.phone) {
        updates.phone = input.phone;
      }
      if (input.isGuest === false && existing.is_guest) {
        updates.is_guest = false;
      }

      const { data: updated } = await supabase
        .from('customers')
        .update(updates)
        .eq('id', existing.id)
        .select()
        .single();

      const res = updated || existing;
      return {
        id: res.id,
        email: res.email,
        fullName: res.full_name,
        phone: res.phone,
        isGuest: res.is_guest,
        createdAt: res.created_at,
        updatedAt: res.updated_at,
      };
    }

    const { data: inserted, error } = await supabase
      .from('customers')
      .insert({
        email: normalizedEmail,
        full_name: input.fullName || 'Client',
        phone: input.phone || null,
        is_guest: input.isGuest !== undefined ? input.isGuest : false,
        created_at: now,
        updated_at: now,
      })
      .select()
      .single();

    if (error || !inserted) {
      return {
        id: crypto.randomUUID(),
        email: normalizedEmail,
        fullName: input.fullName || 'Client',
        phone: input.phone,
        isGuest: input.isGuest || false,
        createdAt: now,
        updatedAt: now,
      };
    }

    return {
      id: inserted.id,
      email: inserted.email,
      fullName: inserted.full_name,
      phone: inserted.phone,
      isGuest: inserted.is_guest,
      createdAt: inserted.created_at,
      updatedAt: inserted.updated_at,
    };
  }

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
  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error('Failed to fetch customers:', error.message);
      return [];
    }
    return (data || []).map((c: any) => ({
      id: c.id,
      email: c.email,
      fullName: c.full_name,
      phone: c.phone || '',
      isGuest: c.is_guest || false,
      createdAt: c.created_at,
      updatedAt: c.updated_at,
    }));
  }

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

  // Derive unique customer list from orders if not standalone
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
