import crypto from 'crypto';
import { Product } from '@/types';
import {
  memoryCache,
  invalidateMemoryCache,
  CACHE_TTL_MS,
  getDb,
  saveDb,
} from '../client';
import { mapSupabaseProduct } from '../mappers';
import { ConflictError, ValidationError } from '../../errors';
import { isMySQLConfigured, query, queryOne, execute } from '../mysql';

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

  // 1. Hostinger MySQL Primary Layer
  if (isMySQLConfigured()) {
    try {
      let sql = `
        SELECT p.*, c.name AS category_name, c.slug AS category_slug
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        WHERE 1=1
      `;
      const params: any[] = [];
      if (options?.publishedOnly) {
        sql += ' AND p.published = 1';
      }
      if (options?.featuredOnly) {
        sql += ' AND p.is_featured = 1';
      }
      if (options?.categoryId) {
        sql += ' AND p.category_id = ?';
        params.push(options.categoryId);
      }
      if (options?.categorySlug) {
        sql += ' AND c.slug = ?';
        params.push(options.categorySlug);
      }
      if (options?.search) {
        const term = `%${options.search}%`;
        sql += ' AND (p.name LIKE ? OR p.sku LIKE ? OR p.material LIKE ? OR p.description LIKE ?)';
        params.push(term, term, term, term);
      }
      sql += ' ORDER BY p.created_at DESC';
      if (options?.limit) {
        sql += ' LIMIT ?';
        params.push(Number(options.limit));
        if (options?.offset) {
          sql += ' OFFSET ?';
          params.push(Number(options.offset));
        }
      }
      const rows = await query(sql, params);
      const products = rows.map((row) => mapSupabaseProduct(row));
      memoryCache.products.set(cacheKey, { data: products, timestamp: now });
      return products;
    } catch (mysqlErr) {
      console.warn('Hostinger MySQL getProducts failed, falling back:', mysqlErr);
    }
  }

  // 2. Unit Test / Local Fallback
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

  // 1. Hostinger MySQL Primary Layer
  if (isMySQLConfigured()) {
    try {
      const row = await queryOne(
        `SELECT p.*, c.name AS category_name, c.slug AS category_slug
         FROM products p
         LEFT JOIN categories c ON p.category_id = c.id
         WHERE p.id = ? LIMIT 1`,
        [id]
      );
      if (row) {
        const product = mapSupabaseProduct(row);
        memoryCache.productByIdOrSlug.set(`id:${id}`, { data: product, timestamp: now });
        memoryCache.productByIdOrSlug.set(`slug:${product.slug}`, { data: product, timestamp: now });
        return product;
      }
    } catch (mysqlErr) {
      console.warn('Hostinger MySQL getProductById failed, falling back:', mysqlErr);
    }
  }

  // 2. Unit Test / Local Fallback
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

  // 1. Hostinger MySQL Primary Layer
  if (isMySQLConfigured()) {
    try {
      const row = await queryOne(
        `SELECT p.*, c.name AS category_name, c.slug AS category_slug
         FROM products p
         LEFT JOIN categories c ON p.category_id = c.id
         WHERE p.slug = ? LIMIT 1`,
        [slug]
      );
      if (row) {
        const product = mapSupabaseProduct(row);
        memoryCache.productByIdOrSlug.set(`slug:${slug}`, { data: product, timestamp: now });
        memoryCache.productByIdOrSlug.set(`id:${product.id}`, { data: product, timestamp: now });
        return product;
      }
    } catch (mysqlErr) {
      console.warn('Hostinger MySQL getProductBySlug failed, falling back:', mysqlErr);
    }
  }

  // 2. Unit Test / Local Fallback
  const db = getDb();
  const product = db.products.find((p) => p.slug === slug) || null;
  memoryCache.productByIdOrSlug.set(`slug:${slug}`, { data: product, timestamp: now });
  return product;
}

export async function getProductBySku(sku: string): Promise<Product | null> {
  const normalized = sku.trim();

  // 1. Hostinger MySQL Primary Layer
  if (isMySQLConfigured()) {
    try {
      const row = await queryOne(
        `SELECT p.*, c.name AS category_name, c.slug AS category_slug
         FROM products p
         LEFT JOIN categories c ON p.category_id = c.id
         WHERE LOWER(p.sku) = LOWER(?) LIMIT 1`,
        [normalized]
      );
      if (row) {
        return mapSupabaseProduct(row);
      }
    } catch (mysqlErr) {
      console.warn('Hostinger MySQL getProductBySku failed, falling back:', mysqlErr);
    }
  }

  // 2. Unit Test / Local Fallback
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

  // 1. Hostinger MySQL Primary Layer
  if (isMySQLConfigured()) {
    try {
      const prodId = `prod-${crypto.randomUUID()}`;
      await execute(
        `INSERT INTO products (
          id, name, slug, sku, brand, category_id, subcategory, description, price, sale_price,
          unit, moq, stock, purchase_mode, lead_time, dimensions, thickness, material,
          finish, color, images, variants, is_featured, is_new, is_bestseller, published,
          tags, specifications, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
        [
          prodId,
          data.name,
          data.slug,
          data.sku,
          data.brand || 'Balaji Atelier',
          data.categoryId || null,
          data.subcategory || null,
          data.description || '',
          data.price,
          data.salePrice !== undefined ? data.salePrice : null,
          data.unit || 'sq ft',
          data.moq || 1,
          data.stock !== undefined ? data.stock : 0,
          data.purchaseMode || 'BUY_NOW',
          data.leadTime || '3-5 business days',
          data.dimensions || null,
          data.thickness || null,
          data.material || null,
          data.finish || null,
          data.color || null,
          JSON.stringify(data.images || []),
          JSON.stringify(data.variants || []),
          data.isFeatured ? 1 : 0,
          data.isNew ? 1 : 0,
          data.isBestseller ? 1 : 0,
          data.published !== false ? 1 : 0,
          JSON.stringify(data.tags || []),
          JSON.stringify(data.specifications || {}),
        ]
      );
      invalidateMemoryCache('products');

      const inserted = await queryOne(
        `SELECT p.*, c.name AS category_name, c.slug AS category_slug
         FROM products p
         LEFT JOIN categories c ON p.category_id = c.id
         WHERE p.id = ? LIMIT 1`,
        [prodId]
      );
      if (inserted) return mapSupabaseProduct(inserted);
      throw new Error(`Failed to retrieve newly created product ${prodId}`);
    } catch (mysqlErr: any) {
      if (mysqlErr instanceof ConflictError) throw mysqlErr;
      console.error('Hostinger MySQL createProduct failed:', mysqlErr);
      throw mysqlErr;
    }
  }

  // 2. Unit Test / Local Fallback
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
  if (expectedUpdatedAt && isMySQLConfigured()) {
    try {
      const current = await queryOne('SELECT updated_at FROM products WHERE id = ? LIMIT 1', [id]);
      if (!current) return null;
      const currentIso = current.updated_at instanceof Date ? current.updated_at.toISOString() : current.updated_at;
      if (currentIso && expectedUpdatedAt !== currentIso) {
        throw new ConflictError(
          'Concurrent Modification Conflict: This item has been updated by another administrator. Please refresh before saving.'
        );
      }
    } catch (mysqlErr: any) {
      if (mysqlErr instanceof ConflictError) throw mysqlErr;
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

  // 1. Hostinger MySQL Primary Layer
  if (isMySQLConfigured()) {
    try {
      const updates: string[] = ['updated_at = NOW()'];
      const params: any[] = [];
      if (dataToUpdate.name !== undefined) { updates.push('name = ?'); params.push(dataToUpdate.name); }
      if (dataToUpdate.slug !== undefined) { updates.push('slug = ?'); params.push(dataToUpdate.slug); }
      if (dataToUpdate.sku !== undefined) { updates.push('sku = ?'); params.push(dataToUpdate.sku); }
      if (dataToUpdate.brand !== undefined) { updates.push('brand = ?'); params.push(dataToUpdate.brand); }
      if (dataToUpdate.categoryId !== undefined) { updates.push('category_id = ?'); params.push(dataToUpdate.categoryId || null); }
      if (dataToUpdate.subcategory !== undefined) { updates.push('subcategory = ?'); params.push(dataToUpdate.subcategory); }
      if (dataToUpdate.description !== undefined) { updates.push('description = ?'); params.push(dataToUpdate.description); }
      if (dataToUpdate.price !== undefined) { updates.push('price = ?'); params.push(dataToUpdate.price); }
      if (dataToUpdate.salePrice !== undefined) { updates.push('sale_price = ?'); params.push(dataToUpdate.salePrice); }
      if (dataToUpdate.unit !== undefined) { updates.push('unit = ?'); params.push(dataToUpdate.unit); }
      if (dataToUpdate.moq !== undefined) { updates.push('moq = ?'); params.push(dataToUpdate.moq); }
      if (dataToUpdate.stock !== undefined) { updates.push('stock = ?'); params.push(dataToUpdate.stock); }
      if (dataToUpdate.purchaseMode !== undefined) { updates.push('purchase_mode = ?'); params.push(dataToUpdate.purchaseMode); }
      if (dataToUpdate.leadTime !== undefined) { updates.push('lead_time = ?'); params.push(dataToUpdate.leadTime); }
      if (dataToUpdate.dimensions !== undefined) { updates.push('dimensions = ?'); params.push(dataToUpdate.dimensions); }
      if (dataToUpdate.thickness !== undefined) { updates.push('thickness = ?'); params.push(dataToUpdate.thickness); }
      if (dataToUpdate.material !== undefined) { updates.push('material = ?'); params.push(dataToUpdate.material); }
      if (dataToUpdate.finish !== undefined) { updates.push('finish = ?'); params.push(dataToUpdate.finish); }
      if (dataToUpdate.color !== undefined) { updates.push('color = ?'); params.push(dataToUpdate.color); }
      if (dataToUpdate.images !== undefined) { updates.push('images = ?'); params.push(JSON.stringify(dataToUpdate.images)); }
      if (dataToUpdate.variants !== undefined) { updates.push('variants = ?'); params.push(JSON.stringify(dataToUpdate.variants)); }
      if (dataToUpdate.isFeatured !== undefined) { updates.push('is_featured = ?'); params.push(dataToUpdate.isFeatured ? 1 : 0); }
      if (dataToUpdate.isNew !== undefined) { updates.push('is_new = ?'); params.push(dataToUpdate.isNew ? 1 : 0); }
      if (dataToUpdate.isBestseller !== undefined) { updates.push('is_bestseller = ?'); params.push(dataToUpdate.isBestseller ? 1 : 0); }
      if (dataToUpdate.published !== undefined) { updates.push('published = ?'); params.push(dataToUpdate.published ? 1 : 0); }
      if (dataToUpdate.tags !== undefined) { updates.push('tags = ?'); params.push(JSON.stringify(dataToUpdate.tags)); }
      if (dataToUpdate.specifications !== undefined) { updates.push('specifications = ?'); params.push(JSON.stringify(dataToUpdate.specifications)); }

      params.push(id);
      await execute(`UPDATE products SET ${updates.join(', ')} WHERE id = ?`, params);
      invalidateMemoryCache('products');

      const updated = await queryOne(
        `SELECT p.*, c.name AS category_name, c.slug AS category_slug
         FROM products p
         LEFT JOIN categories c ON p.category_id = c.id
         WHERE p.id = ? LIMIT 1`,
        [id]
      );
      return updated ? mapSupabaseProduct(updated) : null;
    } catch (mysqlErr: any) {
      if (mysqlErr instanceof ConflictError || mysqlErr instanceof ValidationError) throw mysqlErr;
      console.error('Hostinger MySQL updateProduct failed:', mysqlErr);
      throw mysqlErr;
    }
  }

  // 2. Unit Test / Local Fallback
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
  // 1. Hostinger MySQL Primary Layer
  if (isMySQLConfigured()) {
    try {
      await execute('DELETE FROM inventory WHERE product_id = ?', [id]);
      await execute('DELETE FROM product_variants WHERE product_id = ?', [id]);
      const res = await execute('DELETE FROM products WHERE id = ?', [id]);
      invalidateMemoryCache('products');
      return res.affectedRows > 0;
    } catch (mysqlErr: any) {
      console.error('Hostinger MySQL deleteProduct failed:', mysqlErr);
      throw mysqlErr;
    }
  }

  // 2. Unit Test / Local Fallback
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

