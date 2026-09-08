import crypto from 'crypto';
import { Category } from '@/types';
import {
  isSupabaseConfigured,
  getServiceSupabase,
  memoryCache,
  invalidateMemoryCache,
  CACHE_TTL_MS,
  getDb,
  saveDb,
} from '../client';
import { mapSupabaseCategory } from '../mappers';
import { ConflictError } from '../../errors';

export async function getCategories(): Promise<Category[]> {
  const now = Date.now();
  if (memoryCache.categories && now - memoryCache.categories.timestamp < CACHE_TTL_MS) {
    return memoryCache.categories.data;
  }

  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    const [catsRes, prodsRes] = await Promise.all([
      supabase.from('categories').select('*').order('sort_order', { ascending: true }),
      supabase.from('products').select('category_id, published'),
    ]);

    if (catsRes.error) {
      console.error('Supabase getCategories error:', catsRes.error);
      if (
        process.env.NEXT_PHASE === 'phase-production-build' ||
        catsRes.error.message?.includes('fetch failed') ||
        catsRes.error.message?.includes('ENOTFOUND')
      ) {
        console.warn('Supabase unreachable. Falling back to categories fixture.');
      } else {
        throw new Error(`Database error retrieving categories: ${catsRes.error.message}`);
      }
    } else {
      const prodCounts = new Map<string, number>();
      (prodsRes.data || []).forEach((p: any) => {
        if (p.published && p.category_id) {
          prodCounts.set(p.category_id, (prodCounts.get(p.category_id) || 0) + 1);
        }
      });

      const categories = (catsRes.data || [])
        .filter((c: any) => c.is_active !== false)
        .map((c: any) => ({
          ...mapSupabaseCategory(c),
          productCount: prodCounts.get(c.id) || 0,
        }));

      memoryCache.categories = { data: categories, timestamp: now };
      return categories;
    }
  }

  const db = getDb();
  const prodCounts = new Map<string, number>();
  (db.products || []).forEach((p) => {
    if (p.published && p.categoryId) {
      prodCounts.set(p.categoryId, (prodCounts.get(p.categoryId) || 0) + 1);
    }
  });

  const active = db.categories
    .filter((c) => c.isActive !== false)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((c) => ({
      ...c,
      productCount: prodCounts.get(c.id) || 0,
    }));

  memoryCache.categories = { data: active, timestamp: now };
  return active;
}

export async function getAllCategoriesAdmin(): Promise<Category[]> {
  const now = Date.now();
  if (memoryCache.categoriesAdmin && now - memoryCache.categoriesAdmin.timestamp < CACHE_TTL_MS) {
    return memoryCache.categoriesAdmin.data;
  }

  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    const [catsRes, prodsRes] = await Promise.all([
      supabase.from('categories').select('*').order('sort_order', { ascending: true }),
      supabase.from('products').select('category_id'),
    ]);

    if (catsRes.error) {
      console.error('Supabase getAllCategoriesAdmin error:', catsRes.error);
      if (
        process.env.NEXT_PHASE === 'phase-production-build' ||
        catsRes.error.message?.includes('fetch failed') ||
        catsRes.error.message?.includes('ENOTFOUND')
      ) {
        console.warn('Supabase unreachable. Falling back to admin categories fixture.');
      } else {
        throw new Error(`Database error loading admin categories: ${catsRes.error.message}`);
      }
    } else {
      const prodCounts = new Map<string, number>();
      (prodsRes.data || []).forEach((p: any) => {
        if (p.category_id) {
          prodCounts.set(p.category_id, (prodCounts.get(p.category_id) || 0) + 1);
        }
      });

      const categories = (catsRes.data || []).map((c: any) => ({
        ...mapSupabaseCategory(c),
        productCount: prodCounts.get(c.id) || 0,
      }));

      memoryCache.categoriesAdmin = { data: categories, timestamp: now };
      return categories;
    }
  }

  const db = getDb();
  const prodCounts = new Map<string, number>();
  (db.products || []).forEach((p) => {
    if (p.categoryId) {
      prodCounts.set(p.categoryId, (prodCounts.get(p.categoryId) || 0) + 1);
    }
  });

  const categories = db.categories
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((c) => ({
      ...c,
      productCount: prodCounts.get(c.id) || 0,
    }));

  memoryCache.categoriesAdmin = { data: categories, timestamp: now };
  return categories;
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const categories = await getCategories();
  return categories.find((c) => c.slug === slug) || null;
}

export async function createCategory(
  data: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Category> {
  const now = new Date().toISOString();

  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    const { data: inserted, error } = await supabase
      .from('categories')
      .insert({
        name: data.name,
        slug: data.slug,
        description: data.description || '',
        image_url: data.imageUrl || '',
        sort_order: data.sortOrder || 0,
        is_active: data.isActive !== false,
        created_at: now,
        updated_at: now,
      })
      .select()
      .single();

    if (error || !inserted) {
      console.error('Supabase createCategory error:', error);
      throw new Error(`Failed to create category: ${error?.message || 'Database error'}`);
    }

    invalidateMemoryCache('categories');
    return mapSupabaseCategory(inserted);
  }

  const db = getDb();
  const newCat: Category = {
    ...data,
    id: `cat-${Date.now()}-${crypto.randomBytes(2).toString('hex')}`,
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

  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    const updates: any = { updated_at: now };
    if (partial.name !== undefined) updates.name = partial.name;
    if (partial.slug !== undefined) updates.slug = partial.slug;
    if (partial.description !== undefined) updates.description = partial.description;
    if (partial.imageUrl !== undefined) updates.image_url = partial.imageUrl;
    if (partial.sortOrder !== undefined) updates.sort_order = partial.sortOrder;
    if (partial.isActive !== undefined) updates.is_active = partial.isActive;

    const { data: updated, error } = await supabase
      .from('categories')
      .update(updates)
      .eq('id', id)
      .select()
      .maybeSingle();

    if (error) {
      console.error('Supabase updateCategory error:', error);
      throw new Error(`Failed to update category ${id}: ${error.message}`);
    }

    invalidateMemoryCache('categories');
    return updated ? mapSupabaseCategory(updated) : null;
  }

  const db = getDb();
  const index = db.categories.findIndex((c) => c.id === id);
  if (index === -1) return null;

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
  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();

    // Prevent deletion if products depend on this category
    const { count, error: countErr } = await supabase
      .from('products')
      .select('id', { count: 'exact', head: true })
      .eq('category_id', id);

    if (!countErr && (count || 0) > 0) {
      throw new ConflictError(`Cannot delete category: There are ${count} active material/product item(s) assigned to this category. Please reassign or delete them first.`);
    }

    const { error } = await supabase.from('categories').delete().eq('id', id);
    if (error) {
      console.error('Supabase deleteCategory error:', error);
      throw new Error(`Failed to delete category ${id}: ${error.message}`);
    }
    invalidateMemoryCache('categories');
    return true;
  }

  const db = getDb();
  const prodCount = db.products.filter((p) => p.categoryId === id).length;
  if (prodCount > 0) {
    throw new ConflictError(`Cannot delete category: There are ${prodCount} active material/product item(s) assigned to this category. Please reassign or delete them first.`);
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
