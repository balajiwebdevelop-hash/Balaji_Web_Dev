import crypto from 'crypto';
import { Service } from '@/types';
import {
  memoryCache,
  invalidateMemoryCache,
  CACHE_TTL_MS,
  getDb,
  saveDb,
} from '../client';
import { mapSupabaseService } from '../mappers';
import { ConflictError } from '../../errors';
import { isMySQLConfigured, query, queryOne, execute } from '../mysql';

export async function getServices(publishedOnly = true): Promise<Service[]> {
  const cacheKey = `pub:${publishedOnly}`;
  const now = Date.now();
  const cached = memoryCache.services.get(cacheKey);
  if (cached && now - cached.timestamp < CACHE_TTL_MS) {
    return cached.data;
  }

  // 1. Hostinger MySQL Primary Layer
  if (isMySQLConfigured()) {
    try {
      let sql = 'SELECT * FROM services';
      if (publishedOnly) {
        sql += ' WHERE is_published = 1';
      }
      sql += ' ORDER BY sort_order ASC';
      const rows = await query(sql);
      const services = (rows || []).map(mapSupabaseService);
      memoryCache.services.set(cacheKey, { data: services, timestamp: now });
      return services;
    } catch (mysqlErr) {
      console.warn('Hostinger MySQL getServices failed, falling back:', mysqlErr);
    }
  }

  // 2. Unit Test / Local Fallback
  const db = getDb();
  const result = publishedOnly ? db.services.filter((s) => s.isPublished !== false) : db.services;
  memoryCache.services.set(cacheKey, { data: result, timestamp: now });
  return result;
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  // 1. Hostinger MySQL Primary Layer
  if (isMySQLConfigured()) {
    try {
      const row = await queryOne('SELECT * FROM services WHERE slug = ? LIMIT 1', [slug]);
      if (row) return mapSupabaseService(row);
    } catch (mysqlErr) {
      console.warn('Hostinger MySQL getServiceBySlug failed, falling back:', mysqlErr);
    }
  }

  const services = await getServices(false);
  return services.find((s) => s.slug === slug) || null;
}

export async function createService(
  data: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Service> {
  const now = new Date().toISOString();

  // 1. Hostinger MySQL Primary Layer
  if (isMySQLConfigured()) {
    try {
      const srvId = `srv-${crypto.randomUUID()}`;
      await execute(
        `INSERT INTO services (
          id, title, slug, short_desc, full_desc, icon_name, image_url, deliverables,
          sort_order, is_published, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
        [
          srvId,
          data.title,
          data.slug,
          data.shortDesc || '',
          data.fullDesc || '',
          data.iconName || 'Home',
          data.imageUrl || '',
          JSON.stringify(data.deliverables || []),
          data.sortOrder || 0,
          data.isPublished !== false ? 1 : 0,
        ]
      );
      invalidateMemoryCache('services');

      const inserted = await queryOne('SELECT * FROM services WHERE id = ?', [srvId]);
      if (inserted) return mapSupabaseService(inserted);
      throw new Error(`Failed to retrieve newly created service ${srvId}`);
    } catch (mysqlErr: any) {
      if (mysqlErr instanceof ConflictError) throw mysqlErr;
      console.error('Hostinger MySQL createService failed:', mysqlErr);
      throw mysqlErr;
    }
  }

  // 2. Unit Test / Local Fallback
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

  // 1. Hostinger MySQL Primary Layer
  if (isMySQLConfigured()) {
    try {
      const updates: string[] = ['updated_at = NOW()'];
      const params: any[] = [];
      if (partial.title !== undefined) { updates.push('title = ?'); params.push(partial.title); }
      if (partial.slug !== undefined) { updates.push('slug = ?'); params.push(partial.slug); }
      if (partial.shortDesc !== undefined) { updates.push('short_desc = ?'); params.push(partial.shortDesc); }
      if (partial.fullDesc !== undefined) { updates.push('full_desc = ?'); params.push(partial.fullDesc); }
      if (partial.iconName !== undefined) { updates.push('icon_name = ?'); params.push(partial.iconName); }
      if (partial.imageUrl !== undefined) { updates.push('image_url = ?'); params.push(partial.imageUrl); }
      if (partial.deliverables !== undefined) { updates.push('deliverables = ?'); params.push(JSON.stringify(partial.deliverables)); }
      if (partial.sortOrder !== undefined) { updates.push('sort_order = ?'); params.push(partial.sortOrder); }
      if (partial.isPublished !== undefined) { updates.push('is_published = ?'); params.push(partial.isPublished ? 1 : 0); }

      params.push(id);
      await execute(`UPDATE services SET ${updates.join(', ')} WHERE id = ?`, params);
      invalidateMemoryCache('services');

      const updated = await queryOne('SELECT * FROM services WHERE id = ?', [id]);
      return updated ? mapSupabaseService(updated) : null;
    } catch (mysqlErr: any) {
      if (mysqlErr instanceof ConflictError) throw mysqlErr;
      console.error('Hostinger MySQL updateService failed:', mysqlErr);
      throw mysqlErr;
    }
  }

  // 2. Unit Test / Local Fallback
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
  // 1. Hostinger MySQL Primary Layer
  if (isMySQLConfigured()) {
    try {
      const res = await execute('DELETE FROM services WHERE id = ?', [id]);
      invalidateMemoryCache('services');
      return res.affectedRows > 0;
    } catch (mysqlErr: any) {
      console.error('Hostinger MySQL deleteService failed:', mysqlErr);
      throw mysqlErr;
    }
  }

  // 2. Unit Test / Local Fallback
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
