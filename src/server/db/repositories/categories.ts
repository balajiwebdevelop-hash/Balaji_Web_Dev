import crypto from 'crypto';
import { Category } from '@/types';
import {
  memoryCache,
  invalidateMemoryCache,
  CACHE_TTL_MS,
  getDb,
  saveDb,
} from '../client';
import { mapSupabaseCategory } from '../mappers';
import { ConflictError } from '../../errors';
import { isMySQLConfigured, query, queryOne, execute } from '../mysql';

export async function getCategories(): Promise<Category[]> {
  const now = Date.now();
  if (memoryCache.categories && now - memoryCache.categories.timestamp < CACHE_TTL_MS) {
    return memoryCache.categories.data;
  }

  // 1. Hostinger MySQL Primary Layer
  if (isMySQLConfigured()) {
    try {
      const [catsRes, prodsRes] = await Promise.all([
        query('SELECT * FROM categories WHERE is_active = 1 ORDER BY sort_order ASC'),
        query('SELECT category_id FROM products WHERE published = 1'),
      ]);
      const prodCounts = new Map<string, number>();
      (prodsRes || []).forEach((p: any) => {
        if (p.category_id) {
          prodCounts.set(p.category_id, (prodCounts.get(p.category_id) || 0) + 1);
        }
      });

      const categories = (catsRes || []).map((c: any) => ({
        ...mapSupabaseCategory(c),
        productCount: prodCounts.get(c.id) || 0,
      }));

      memoryCache.categories = { data: categories, timestamp: now };
      return categories;
    } catch (mysqlErr) {
      console.warn('Hostinger MySQL getCategories failed, falling back:', mysqlErr);
    }
  }

  // 2. Unit Test / Local Fallback
  const db = getDb();
  const cats = db.categories
    .filter((c) => c.isActive)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((c) => ({
      ...c,
      productCount: db.products.filter((p) => p.categoryId === c.id && p.published).length,
    }));
  memoryCache.categories = { data: cats, timestamp: now };
  return cats;
}

export const getAllCategoriesAdmin = getCategoriesAdmin;

export async function getCategoriesAdmin(): Promise<Category[]> {
  const now = Date.now();
  if (memoryCache.categoriesAdmin && now - memoryCache.categoriesAdmin.timestamp < CACHE_TTL_MS) {
    return memoryCache.categoriesAdmin.data;
  }

  // 1. Hostinger MySQL Primary Layer
  if (isMySQLConfigured()) {
    try {
      const [catsRes, prodsRes] = await Promise.all([
        query('SELECT * FROM categories ORDER BY sort_order ASC'),
        query('SELECT category_id FROM products'),
      ]);
      const prodCounts = new Map<string, number>();
      (prodsRes || []).forEach((p: any) => {
        if (p.category_id) {
          prodCounts.set(p.category_id, (prodCounts.get(p.category_id) || 0) + 1);
        }
      });

      const categories = (catsRes || []).map((c: any) => ({
        ...mapSupabaseCategory(c),
        productCount: prodCounts.get(c.id) || 0,
      }));

      memoryCache.categoriesAdmin = { data: categories, timestamp: now };
      return categories;
    } catch (mysqlErr) {
      console.warn('Hostinger MySQL getCategoriesAdmin failed, falling back:', mysqlErr);
    }
  }

  // 2. Unit Test / Local Fallback
  const db = getDb();
  const cats = [...db.categories]
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((c) => ({
      ...c,
      productCount: db.products.filter((p) => p.categoryId === c.id).length,
    }));
  memoryCache.categoriesAdmin = { data: cats, timestamp: now };
  return cats;
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  // 1. Hostinger MySQL Primary Layer
  if (isMySQLConfigured()) {
    try {
      const row = await queryOne('SELECT * FROM categories WHERE slug = ? LIMIT 1', [slug]);
      if (row) {
        const countRes = await queryOne<{ count: number }>(
          'SELECT COUNT(*) as count FROM products WHERE category_id = ? AND published = 1',
          [row.id]
        );
        return {
          ...mapSupabaseCategory(row),
          productCount: countRes?.count || 0,
        };
      }
    } catch (mysqlErr) {
      console.warn('Hostinger MySQL getCategoryBySlug failed, falling back:', mysqlErr);
    }
  }

  // 2. Unit Test / Local Fallback
  const db = getDb();
  const cat = db.categories.find((c) => c.slug === slug);
  if (!cat) return null;
  return {
    ...cat,
    productCount: db.products.filter((p) => p.categoryId === cat.id && p.published).length,
  };
}

export async function getCategoryById(id: string): Promise<Category | null> {
  // 1. Hostinger MySQL Primary Layer
  if (isMySQLConfigured()) {
    try {
      const row = await queryOne('SELECT * FROM categories WHERE id = ? LIMIT 1', [id]);
      if (row) {
        const countRes = await queryOne<{ count: number }>(
          'SELECT COUNT(*) as count FROM products WHERE category_id = ? AND published = 1',
          [row.id]
        );
        return {
          ...mapSupabaseCategory(row),
          productCount: countRes?.count || 0,
        };
      }
    } catch (mysqlErr) {
      console.warn('Hostinger MySQL getCategoryById failed, falling back:', mysqlErr);
    }
  }

  // 2. Unit Test / Local Fallback
  const db = getDb();
  const cat = db.categories.find((c) => c.id === id);
  if (!cat) return null;
  return {
    ...cat,
    productCount: db.products.filter((p) => p.categoryId === cat.id && p.published).length,
  };
}

export async function createCategory(
  data: Omit<Category, 'id' | 'createdAt' | 'updatedAt' | 'productCount'>
): Promise<Category> {
  const now = new Date().toISOString();

  // 1. Hostinger MySQL Primary Layer
  if (isMySQLConfigured()) {
    try {
      const existing = await queryOne('SELECT id FROM categories WHERE slug = ? LIMIT 1', [data.slug]);
      if (existing) {
        throw new ConflictError(`A category with slug "${data.slug}" already exists`);
      }

      const catId = `cat-${crypto.randomUUID()}`;
      await execute(
        `INSERT INTO categories (
          id, name, slug, description, image_url, sort_order, is_active, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
        [
          catId,
          data.name,
          data.slug,
          data.description || '',
          data.imageUrl || '',
          data.sortOrder || 0,
          data.isActive !== false ? 1 : 0,
        ]
      );
      invalidateMemoryCache('categories');

      const inserted = await queryOne('SELECT * FROM categories WHERE id = ?', [catId]);
      if (inserted) {
        return { ...mapSupabaseCategory(inserted), productCount: 0 };
      }
      throw new Error(`Failed to retrieve newly created category ${catId}`);
    } catch (mysqlErr: any) {
      if (mysqlErr instanceof ConflictError) throw mysqlErr;
      console.error('Hostinger MySQL createCategory failed:', mysqlErr);
      throw mysqlErr;
    }
  }

  // 2. Unit Test / Local Fallback
  const db = getDb();
  if (db.categories.some((c) => c.slug === data.slug)) {
    throw new ConflictError(`A category with slug "${data.slug}" already exists`);
  }
  const newCat: Category = {
    ...data,
    id: `cat-${Date.now()}-${crypto.randomBytes(2).toString('hex')}`,
    productCount: 0,
    createdAt: now,
    updatedAt: now,
  };
  db.categories.push(newCat);
  saveDb(db);
  invalidateMemoryCache('categories');
  return newCat;
}

export async function updateCategory(
  id: string,
  partial: Partial<Category>
): Promise<Category | null> {
  const now = new Date().toISOString();

  // 1. Hostinger MySQL Primary Layer
  if (isMySQLConfigured()) {
    try {
      if (partial.slug) {
        const conflict = await queryOne('SELECT id FROM categories WHERE slug = ? AND id != ? LIMIT 1', [partial.slug, id]);
        if (conflict) {
          throw new ConflictError(`A category with slug "${partial.slug}" already exists`);
        }
      }

      const updates: string[] = ['updated_at = NOW()'];
      const params: any[] = [];
      if (partial.name !== undefined) { updates.push('name = ?'); params.push(partial.name); }
      if (partial.slug !== undefined) { updates.push('slug = ?'); params.push(partial.slug); }
      if (partial.description !== undefined) { updates.push('description = ?'); params.push(partial.description); }
      if (partial.imageUrl !== undefined) { updates.push('image_url = ?'); params.push(partial.imageUrl); }
      if (partial.sortOrder !== undefined) { updates.push('sort_order = ?'); params.push(partial.sortOrder); }
      if (partial.isActive !== undefined) { updates.push('is_active = ?'); params.push(partial.isActive ? 1 : 0); }

      params.push(id);
      await execute(`UPDATE categories SET ${updates.join(', ')} WHERE id = ?`, params);
      invalidateMemoryCache('categories');

      const updated = await queryOne('SELECT * FROM categories WHERE id = ?', [id]);
      if (updated) {
        const countRes = await queryOne<{ count: number }>(
          'SELECT COUNT(*) as count FROM products WHERE category_id = ? AND published = 1',
          [id]
        );
        return {
          ...mapSupabaseCategory(updated),
          productCount: countRes?.count || 0,
        };
      }
      return null;
    } catch (mysqlErr: any) {
      if (mysqlErr instanceof ConflictError) throw mysqlErr;
      console.error('Hostinger MySQL updateCategory failed:', mysqlErr);
      throw mysqlErr;
    }
  }

  // 2. Unit Test / Local Fallback
  const db = getDb();
  const index = db.categories.findIndex((c) => c.id === id);
  if (index === -1) return null;

  if (partial.slug && db.categories.some((c) => c.slug === partial.slug && c.id !== id)) {
    throw new ConflictError(`A category with slug "${partial.slug}" already exists`);
  }

  db.categories[index] = {
    ...db.categories[index],
    ...partial,
    updatedAt: now,
  };
  saveDb(db);
  invalidateMemoryCache('categories');
  return db.categories[index];
}

export async function deleteCategory(id: string): Promise<boolean> {
  // 1. Hostinger MySQL Primary Layer
  if (isMySQLConfigured()) {
    try {
      const prodRes = await queryOne<{ count: number }>(
        'SELECT COUNT(*) as count FROM products WHERE category_id = ? LIMIT 1',
        [id]
      );
      if (prodRes && prodRes.count > 0) {
        throw new ConflictError('Cannot delete category: products are assigned to it.');
      }

      const res = await execute('DELETE FROM categories WHERE id = ?', [id]);
      invalidateMemoryCache('categories');
      return res.affectedRows > 0;
    } catch (mysqlErr: any) {
      if (mysqlErr instanceof ConflictError) throw mysqlErr;
      console.error('Hostinger MySQL deleteCategory failed:', mysqlErr);
      throw mysqlErr;
    }
  }

  // 2. Unit Test / Local Fallback
  const db = getDb();
  if (db.products.some((p) => p.categoryId === id)) {
    throw new ConflictError('Cannot delete category: products are assigned to it.');
  }

  const initialLength = db.categories.length;
  db.categories = db.categories.filter((c) => c.id !== id);
  if (db.categories.length < initialLength) {
    saveDb(db);
    invalidateMemoryCache('categories');
    return true;
  }
  return false;
}
