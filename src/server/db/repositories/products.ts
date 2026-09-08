import crypto from 'crypto';
import { Product } from '@/types';
import {
  isSupabaseConfigured,
  getServiceSupabase,
  memoryCache,
  invalidateMemoryCache,
  CACHE_TTL_MS,
  getDb,
  saveDb,
} from '../client';
import { mapSupabaseProduct } from '../mappers';
import { ConflictError, ValidationError } from '../../errors';

export async function getProducts(options?: {
  categoryId?: string;
  categorySlug?: string;
  publishedOnly?: boolean;
  featuredOnly?: boolean;
  search?: string;
  limit?: number;
  offset?: number;
}): Promise<Product[]> {
  const cacheKey = JSON.stringify(options || {});
  const now = Date.now();
  const cached = memoryCache.products.get(cacheKey);
  if (cached && now - cached.timestamp < CACHE_TTL_MS) {
    return cached.data;
  }

  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();

    let query = supabase
      .from('products')
      .select('*, categories(name, slug)')
      .order('created_at', { ascending: false });

    if (options?.publishedOnly) {
      query = query.eq('published', true);
    }
    if (options?.featuredOnly) {
      query = query.eq('is_featured', true);
    }
    if (options?.categoryId) {
      query = query.eq('category_id', options.categoryId);
    }
    if (options?.categorySlug) {
      // Resolve category ID by slug or filter via join
      const { data: cat } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', options.categorySlug)
        .maybeSingle();
      if (cat?.id) {
        query = query.eq('category_id', cat.id);
      }
    }
    if (options?.search) {
      const term = `%${options.search}%`;
      query = query.or(`name.ilike.${term},sku.ilike.${term},material.ilike.${term},description.ilike.${term}`);
    }
    if (options?.limit) {
      query = query.limit(options.limit);
    }
    if (options?.offset) {
      query = query.range(options.offset, options.offset + (options.limit || 50) - 1);
    }

    const { data, error } = await query;
    if (error) {
      console.error('Supabase getProducts error:', error);
      if (
        process.env.NEXT_PHASE === 'phase-production-build' ||
        error.message?.includes('fetch failed') ||
        error.message?.includes('ENOTFOUND')
      ) {
        console.warn('Supabase host unreachable. Serving static catalog fixture.');
      } else {
        throw new Error(`Failed to load products from database: ${error.message}`);
      }
    } else {
      const products = (data || []).map((row) => mapSupabaseProduct(row));
      memoryCache.products.set(cacheKey, { data: products, timestamp: now });
      return products;
    }
  }

  // Development / Test Local Fallback
  const db = getDb();
  let result = [...db.products];

  if (options?.publishedOnly) {
    result = result.filter((p) => p.published);
  }
  if (options?.featuredOnly) {
    result = result.filter((p) => p.isFeatured);
  }
  if (options?.categoryId) {
    result = result.filter((p) => p.categoryId === options.categoryId);
  }
  if (options?.categorySlug) {
    const targetCat = db.categories.find((c) => c.slug === options.categorySlug);
    if (targetCat) {
      result = result.filter((p) => p.categoryId === targetCat.id);
    }
  }
  if (options?.search) {
    const term = options.search.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.sku.toLowerCase().includes(term) ||
        p.material?.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term)
    );
  }
  if (options?.offset) {
    result = result.slice(options.offset);
  }
  if (options?.limit) {
    result = result.slice(0, options.limit);
  }

  memoryCache.products.set(cacheKey, { data: result, timestamp: now });
  return result;
}

export async function getProductById(id: string): Promise<Product | null> {
  const now = Date.now();
  const cached = memoryCache.productByIdOrSlug.get(`id:${id}`);
  if (cached && now - cached.timestamp < CACHE_TTL_MS) {
    return cached.data;
  }

  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    const { data, error } = await supabase
      .from('products')
      .select('*, categories(name, slug)')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      console.error('Supabase getProductById error:', error);
      if (
        process.env.NEXT_PHASE === 'phase-production-build' ||
        error.message?.includes('fetch failed') ||
        error.message?.includes('ENOTFOUND')
      ) {
        console.warn(`Supabase unreachable. Falling back to fixture for product ${id}.`);
      } else {
        throw new Error(`Database error retrieving product ${id}: ${error.message}`);
      }
    } else {
      const product = data ? mapSupabaseProduct(data) : null;
      memoryCache.productByIdOrSlug.set(`id:${id}`, { data: product, timestamp: now });
      if (product) {
        memoryCache.productByIdOrSlug.set(`slug:${product.slug}`, { data: product, timestamp: now });
      }
      return product;
    }
  }

  const db = getDb();
  const product = db.products.find((p) => p.id === id) || null;
  memoryCache.productByIdOrSlug.set(`id:${id}`, { data: product, timestamp: now });
  return product;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const now = Date.now();
  const cached = memoryCache.productByIdOrSlug.get(`slug:${slug}`);
  if (cached && now - cached.timestamp < CACHE_TTL_MS) {
    return cached.data;
  }

  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    const { data, error } = await supabase
      .from('products')
      .select('*, categories(name, slug)')
      .eq('slug', slug)
      .maybeSingle();

    if (error) {
      console.error('Supabase getProductBySlug error:', error);
      if (
        process.env.NEXT_PHASE === 'phase-production-build' ||
        error.message?.includes('fetch failed') ||
        error.message?.includes('ENOTFOUND')
      ) {
        console.warn(`Supabase unreachable. Falling back to fixture for product slug ${slug}.`);
      } else {
        throw new Error(`Database error retrieving product slug ${slug}: ${error.message}`);
      }
    } else {
      const product = data ? mapSupabaseProduct(data) : null;
      memoryCache.productByIdOrSlug.set(`slug:${slug}`, { data: product, timestamp: now });
      if (product) {
        memoryCache.productByIdOrSlug.set(`id:${product.id}`, { data: product, timestamp: now });
      }
      return product;
    }
  }

  const db = getDb();
  const product = db.products.find((p) => p.slug === slug) || null;
  memoryCache.productByIdOrSlug.set(`slug:${slug}`, { data: product, timestamp: now });
  return product;
}

export async function getProductBySku(sku: string): Promise<Product | null> {
  const normalized = sku.trim();
  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    const { data, error } = await supabase
      .from('products')
      .select('*, categories(name, slug)')
      .eq('sku', normalized)
      .maybeSingle();

    if (!error && data) {
      return mapSupabaseProduct(data);
    }
  }

  const db = getDb();
  return db.products.find((p) => p.sku.toLowerCase() === normalized.toLowerCase()) || null;
}

export async function createProduct(
  data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Product> {
  const now = new Date().toISOString();

  // Enforce unique SKU
  if (data.sku) {
    const existing = await getProductBySku(data.sku);
    if (existing) {
      throw new ConflictError(`A product with SKU '${data.sku}' already exists in the catalog.`);
    }
  }

  // Enforce non-negative stock
  if (data.stock !== undefined && (data.stock < 0 || isNaN(Number(data.stock)))) {
    throw new ValidationError('Stock quantity cannot be negative.');
  }

  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();

    const dbPayload: any = {
      name: data.name,
      slug: data.slug,
      sku: data.sku,
      brand: data.brand || 'Balaji Architect & Interiors',
      category_id: data.categoryId || null,
      subcategory: data.subcategory || null,
      description: data.description || '',
      price: data.price,
      sale_price: data.salePrice !== undefined ? data.salePrice : null,
      unit: data.unit,
      moq: data.moq || 1,
      stock: data.stock !== undefined ? data.stock : 0,
      purchase_mode: data.purchaseMode || 'BOTH',
      lead_time: data.leadTime || '2-3 Weeks',
      dimensions: data.dimensions || null,
      thickness: data.thickness || null,
      material: data.material || null,
      finish: data.finish || null,
      color: data.color || null,
      images: data.images || [],
      variants: data.variants || [],
      is_featured: Boolean(data.isFeatured),
      is_new: Boolean(data.isNew),
      is_bestseller: Boolean(data.isBestseller),
      published: data.published !== false,
      tags: data.tags || [],
      specifications: data.specifications || {},
      created_at: now,
      updated_at: now,
    };

    const { data: inserted, error } = await supabase
      .from('products')
      .insert(dbPayload)
      .select('*, categories(name, slug)')
      .single();

    if (error || !inserted) {
      console.error('Supabase createProduct error:', error);
      throw new Error(`Failed to create product in database: ${error?.message || 'Unknown database error'}`);
    }

    invalidateMemoryCache('products');
    return mapSupabaseProduct(inserted);
  }

  // Development / Test Local Fallback
  const db = getDb();
  const newProduct: Product = {
    ...data,
    id: `prod-${Date.now()}-${crypto.randomBytes(3).toString('hex')}`,
    createdAt: now,
    updatedAt: now,
  };

  db.products.unshift(newProduct);
  saveDb(db);
  invalidateMemoryCache('products');
  return newProduct;
}

export async function updateProduct(
  id: string,
  partialData: Partial<Product> & { expectedUpdatedAt?: string }
): Promise<Product | null> {
  const now = new Date().toISOString();
  const { expectedUpdatedAt, ...dataToUpdate } = (partialData || {}) as any;

  // Optimistic Concurrency Control Check
  if (expectedUpdatedAt) {
    if (isSupabaseConfigured()) {
      const supabase = getServiceSupabase();
      const { data: current, error: fetchErr } = await supabase
        .from('products')
        .select('updated_at')
        .eq('id', id)
        .maybeSingle();

      if (fetchErr) {
        throw new Error(`Database error verifying product concurrency: ${fetchErr.message}`);
      }
      if (!current) return null;
      if (current.updated_at && expectedUpdatedAt !== current.updated_at) {
        throw new ConflictError(
          'Concurrent Modification Conflict: This item has been updated by another administrator. Please refresh before saving.'
        );
      }
    } else {
      const db = getDb();
      const current = db.products.find((p) => p.id === id);
      if (!current) return null;
      if (current.updatedAt && expectedUpdatedAt !== current.updatedAt) {
        throw new ConflictError(
          'Concurrent Modification Conflict: This item has been updated by another administrator. Please refresh before saving.'
        );
      }
    }
  }

  // Enforce unique SKU if modified
  if (dataToUpdate.sku) {
    const existing = await getProductBySku(dataToUpdate.sku);
    if (existing && existing.id !== id) {
      throw new ConflictError(`A product with SKU '${dataToUpdate.sku}' already exists in the catalog.`);
    }
  }

  // Enforce non-negative stock if modified
  if (dataToUpdate.stock !== undefined && (dataToUpdate.stock < 0 || isNaN(Number(dataToUpdate.stock)))) {
    throw new ValidationError('Stock quantity cannot be negative.');
  }

  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();

    const updates: any = { updated_at: now };
    if (dataToUpdate.name !== undefined) updates.name = dataToUpdate.name;
    if (dataToUpdate.slug !== undefined) updates.slug = dataToUpdate.slug;
    if (dataToUpdate.sku !== undefined) updates.sku = dataToUpdate.sku;
    if (dataToUpdate.brand !== undefined) updates.brand = dataToUpdate.brand;
    if (dataToUpdate.categoryId !== undefined) updates.category_id = dataToUpdate.categoryId || null;
    if (dataToUpdate.subcategory !== undefined) updates.subcategory = dataToUpdate.subcategory;
    if (dataToUpdate.description !== undefined) updates.description = dataToUpdate.description;
    if (dataToUpdate.price !== undefined) updates.price = dataToUpdate.price;
    if (dataToUpdate.salePrice !== undefined) updates.sale_price = dataToUpdate.salePrice;
    if (dataToUpdate.unit !== undefined) updates.unit = dataToUpdate.unit;
    if (dataToUpdate.moq !== undefined) updates.moq = dataToUpdate.moq;
    if (dataToUpdate.stock !== undefined) updates.stock = dataToUpdate.stock;
    if (dataToUpdate.purchaseMode !== undefined) updates.purchase_mode = dataToUpdate.purchaseMode;
    if (dataToUpdate.leadTime !== undefined) updates.lead_time = dataToUpdate.leadTime;
    if (dataToUpdate.dimensions !== undefined) updates.dimensions = dataToUpdate.dimensions;
    if (dataToUpdate.thickness !== undefined) updates.thickness = dataToUpdate.thickness;
    if (dataToUpdate.material !== undefined) updates.material = dataToUpdate.material;
    if (dataToUpdate.finish !== undefined) updates.finish = dataToUpdate.finish;
    if (dataToUpdate.color !== undefined) updates.color = dataToUpdate.color;
    if (dataToUpdate.images !== undefined) updates.images = dataToUpdate.images;
    if (dataToUpdate.variants !== undefined) updates.variants = dataToUpdate.variants;
    if (dataToUpdate.isFeatured !== undefined) updates.is_featured = dataToUpdate.isFeatured;
    if (dataToUpdate.isNew !== undefined) updates.is_new = dataToUpdate.isNew;
    if (dataToUpdate.isBestseller !== undefined) updates.is_bestseller = dataToUpdate.isBestseller;
    if (dataToUpdate.published !== undefined) updates.published = dataToUpdate.published;
    if (dataToUpdate.tags !== undefined) updates.tags = dataToUpdate.tags;
    if (dataToUpdate.specifications !== undefined) updates.specifications = dataToUpdate.specifications;

    const { data: updated, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)
      .select('*, categories(name, slug)')
      .maybeSingle();

    if (error) {
      console.error('Supabase updateProduct error:', error);
      throw new Error(`Failed to update product ${id}: ${error.message}`);
    }

    invalidateMemoryCache('products');
    return updated ? mapSupabaseProduct(updated) : null;
  }

  // Development / Test Local Fallback
  const db = getDb();
  const index = db.products.findIndex((p) => p.id === id);
  if (index === -1) return null;

  db.products[index] = {
    ...db.products[index],
    ...dataToUpdate,
    updatedAt: now,
  };
  saveDb(db);
  invalidateMemoryCache('products');
  return db.products[index];
}

export async function deleteProduct(id: string): Promise<boolean> {
  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) {
      console.error('Supabase deleteProduct error:', error);
      throw new Error(`Failed to delete product ${id}: ${error.message}`);
    }
    invalidateMemoryCache('products');
    return true;
  }

  const db = getDb();
  const initialLength = db.products.length;
  db.products = db.products.filter((p) => p.id !== id);
  if (db.products.length < initialLength) {
    saveDb(db);
    invalidateMemoryCache('products');
    return true;
  }
  return false;
}
