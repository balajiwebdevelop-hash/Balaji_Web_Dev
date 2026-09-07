import crypto from 'crypto';
import { Service } from '@/types';
import {
  isSupabaseConfigured,
  getServiceSupabase,
  memoryCache,
  invalidateMemoryCache,
  CACHE_TTL_MS,
  getDb,
  saveDb,
} from '../client';
import { mapSupabaseService } from '../mappers';

export async function getServices(publishedOnly = true): Promise<Service[]> {
  const cacheKey = `pub:${publishedOnly}`;
  const now = Date.now();
  const cached = memoryCache.services.get(cacheKey);
  if (cached && now - cached.timestamp < CACHE_TTL_MS) {
    return cached.data;
  }

  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    let query = supabase.from('services').select('*').order('sort_order', { ascending: true });
    if (publishedOnly) {
      query = query.eq('is_published', true);
    }
    const { data, error } = await query;
    if (error) {
      console.error('Supabase getServices error:', error);
      if (
        process.env.NEXT_PHASE === 'phase-production-build' ||
        error.message?.includes('fetch failed') ||
        error.message?.includes('ENOTFOUND')
      ) {
        console.warn('Supabase unreachable. Falling back to services fixture.');
      } else {
        throw new Error(`Database error loading services: ${error.message}`);
      }
    } else {
      const services = (data || []).map(mapSupabaseService);
      memoryCache.services.set(cacheKey, { data: services, timestamp: now });
      return services;
    }
  }

  const db = getDb();
  const result = publishedOnly ? db.services.filter((s) => s.isPublished !== false) : db.services;
  memoryCache.services.set(cacheKey, { data: result, timestamp: now });
  return result;
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const services = await getServices(false);
  return services.find((s) => s.slug === slug) || null;
}

export async function createService(
  data: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Service> {
  const now = new Date().toISOString();

  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    const { data: inserted, error } = await supabase
      .from('services')
      .insert({
        title: data.title,
        slug: data.slug,
        short_desc: data.shortDesc || '',
        full_desc: data.fullDesc || '',
        icon_name: data.iconName || 'Home',
        image_url: data.imageUrl || '',
        deliverables: data.deliverables || [],
        sort_order: data.sortOrder || 0,
        is_published: data.isPublished !== false,
        created_at: now,
        updated_at: now,
      })
      .select()
      .single();

    if (error || !inserted) {
      console.error('Supabase createService error:', error);
      throw new Error(`Failed to create architectural service: ${error?.message}`);
    }

    invalidateMemoryCache('services');
    return mapSupabaseService(inserted);
  }

  const db = getDb();
  const newSrv: Service = {
    ...data,
    id: `srv-${Date.now()}-${crypto.randomBytes(2).toString('hex')}`,
    createdAt: now,
    updatedAt: now,
  };
  db.services.push(newSrv);
  saveDb(db);
  invalidateMemoryCache('services');
  return newSrv;
}

export async function updateService(
  id: string,
  partial: Partial<Service>
): Promise<Service | null> {
  const now = new Date().toISOString();

  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    const updates: any = { updated_at: now };
    if (partial.title !== undefined) updates.title = partial.title;
    if (partial.slug !== undefined) updates.slug = partial.slug;
    if (partial.shortDesc !== undefined) updates.short_desc = partial.shortDesc;
    if (partial.fullDesc !== undefined) updates.full_desc = partial.fullDesc;
    if (partial.iconName !== undefined) updates.icon_name = partial.iconName;
    if (partial.imageUrl !== undefined) updates.image_url = partial.imageUrl;
    if (partial.deliverables !== undefined) updates.deliverables = partial.deliverables;
    if (partial.sortOrder !== undefined) updates.sort_order = partial.sortOrder;
    if (partial.isPublished !== undefined) updates.is_published = partial.isPublished;

    const { data: updated, error } = await supabase
      .from('services')
      .update(updates)
      .eq('id', id)
      .select()
      .maybeSingle();

    if (error) {
      console.error('Supabase updateService error:', error);
      throw new Error(`Failed to update service ${id}: ${error.message}`);
    }

    invalidateMemoryCache('services');
    return updated ? mapSupabaseService(updated) : null;
  }

  const db = getDb();
  const index = db.services.findIndex((s) => s.id === id);
  if (index === -1) return null;

  db.services[index] = {
    ...db.services[index],
    ...partial,
    updatedAt: now,
  };
  saveDb(db);
  invalidateMemoryCache('services');
  return db.services[index];
}

export async function deleteService(id: string): Promise<boolean> {
  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    const { error } = await supabase.from('services').delete().eq('id', id);
    if (error) {
      console.error('Supabase deleteService error:', error);
      throw new Error(`Failed to delete service ${id}: ${error.message}`);
    }
    invalidateMemoryCache('services');
    return true;
  }

  const db = getDb();
  const initialLength = db.services.length;
  db.services = db.services.filter((s) => s.id !== id);
  if (db.services.length < initialLength) {
    saveDb(db);
    invalidateMemoryCache('services');
    return true;
  }
  return false;
}
