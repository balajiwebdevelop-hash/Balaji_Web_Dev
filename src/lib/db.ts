import fs from 'fs';
import path from 'path';
import {
  AdminUser,
  AuditLog,
  Category,
  Enquiry,
  Order,
  Product,
  Project,
  Quote,
  Service,
  SiteSettings,
} from '@/types';
import {
  getInitialAdminSeed,
  initialCategories,
  initialProducts,
  initialProjects,
  initialServices,
  initialSiteSettings,
} from './seedData';
import { getServiceSupabase } from './supabase';
import { sendNewOrderPush } from './push';

export interface DatabaseState {
  admins: AdminUser[];
  categories: Category[];
  products: Product[];
  projects: Project[];
  services: Service[];
  orders: Order[];
  quotes: Quote[];
  enquiries: Enquiry[];
  siteSettings: SiteSettings;
  pushSubscriptions: {
    id: string;
    endpoint: string;
    keys: { p256dh: string; auth: string };
    adminId?: string;
    createdAt: string;
  }[];
  auditLogs: AuditLog[];
}

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

let dbCache: DatabaseState | null = null;

function isSupabaseConfigured(): boolean {
  return process.env.NODE_ENV !== 'test';
}

function ensureDbFile(): DatabaseState {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(DB_FILE)) {
    const initialState: DatabaseState = {
      admins: [getInitialAdminSeed() as any],
      categories: initialCategories,
      products: initialProducts,
      projects: initialProjects,
      services: initialServices,
      orders: [],
      quotes: [],
      enquiries: [],
      siteSettings: initialSiteSettings,
      pushSubscriptions: [],
      auditLogs: [],
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialState, null, 2), 'utf-8');
    dbCache = initialState;
    return initialState;
  }

  try {
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    const parsed = JSON.parse(data);
    dbCache = parsed;
    return parsed;
  } catch (err) {
    console.error('Error reading db.json, repairing...', err);
    const initialState: DatabaseState = {
      admins: [getInitialAdminSeed() as any],
      categories: initialCategories,
      products: initialProducts,
      projects: initialProjects,
      services: initialServices,
      orders: [],
      quotes: [],
      enquiries: [],
      siteSettings: initialSiteSettings,
      pushSubscriptions: [],
      auditLogs: [],
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialState, null, 2), 'utf-8');
    dbCache = initialState;
    return initialState;
  }
}

export function getDb(): DatabaseState {
  if (dbCache) return dbCache;
  return ensureDbFile();
}

export function resetDbCache(): void {
  dbCache = null;
}

function saveDb(state: DatabaseState): void {
  dbCache = state;
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    const tempFile = `${DB_FILE}.tmp.${Date.now()}`;
    fs.writeFileSync(tempFile, JSON.stringify(state, null, 2), 'utf-8');
    fs.renameSync(tempFile, DB_FILE);
  } catch (err) {
    console.error('Error saving db.json:', err);
  }
}

// =============================================================
// ENTITY MAPPERS (SUPABASE POSTGRESQL <-> TYPESCRIPT)
// =============================================================

function mapSupabaseProduct(row: any, categoryMap?: Map<string, { name: string; slug: string }>): Product {
  const catInfo = categoryMap?.get(row.category_id);
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    sku: row.sku,
    brand: row.brand || 'Balaji Architect & Interiors',
    categoryId: row.category_id || '',
    categoryName: catInfo?.name || row.category_name || 'General',
    categorySlug: catInfo?.slug || row.category_slug || '',
    subcategory: row.subcategory || undefined,
    description: row.description || '',
    price: Number(row.price),
    salePrice: row.sale_price ? Number(row.sale_price) : undefined,
    unit: row.unit || 'sq ft',
    moq: Number(row.moq || 1),
    stock: Number(row.stock || 0),
    purchaseMode: row.purchase_mode || 'BOTH',
    leadTime: row.lead_time || undefined,
    dimensions: row.dimensions || undefined,
    thickness: row.thickness || undefined,
    material: row.material || undefined,
    finish: row.finish || undefined,
    color: row.color || undefined,
    images: Array.isArray(row.images) ? row.images : [],
    isFeatured: Boolean(row.is_featured),
    isNew: Boolean(row.is_new),
    isBestseller: Boolean(row.is_bestseller),
    published: Boolean(row.published),
    tags: Array.isArray(row.tags) ? row.tags : [],
    specifications: typeof row.specifications === 'object' && row.specifications !== null ? row.specifications : {},
    variants: Array.isArray(row.variants) ? row.variants : [],
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapSupabaseCategory(row: any): Category {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description || '',
    imageUrl: row.cover_image || row.image_url || '',
    parentId: row.parent_id || null,
    sortOrder: Number(row.sort_order || 0),
    isActive: Boolean(row.is_active),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapSupabaseProject(row: any): Project {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    location: row.location || '',
    year: String(row.year || new Date().getFullYear()),
    area: row.area || '',
    projectType: row.project_type || 'Residential Interiors',
    shortDescription: row.short_description || '',
    description: row.description || row.short_description || '',
    heroImage: row.hero_image || '',
    gallery: Array.isArray(row.gallery) ? row.gallery : [],
    designApproach: row.design_approach || '',
    materialsUsed: Array.isArray(row.materials_used) ? row.materials_used : [],
    isFeatured: Boolean(row.is_featured),
    isPublished: Boolean(row.is_published !== false && row.published !== false),
    sortOrder: Number(row.sort_order || 0),
    tags: Array.isArray(row.tags) ? row.tags : [],
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapSupabaseService(row: any): Service {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    shortDesc: row.tagline || row.short_desc || '',
    fullDesc: row.description || row.full_desc || '',
    iconName: row.icon_name || 'Home',
    imageUrl: row.hero_image || row.image_url || '',
    deliverables: Array.isArray(row.deliverables) ? row.deliverables : [],
    sortOrder: Number(row.sort_order || 0),
    isPublished: Boolean(row.is_active !== false && row.is_published !== false),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapSupabaseOrder(row: any): Order {
  return {
    id: row.id,
    orderNumber: row.order_number,
    customerName: row.customer_name,
    customerEmail: row.customer_email,
    customerPhone: row.customer_phone,
    shippingAddress: row.shipping_address,
    billingAddress: row.billing_address || row.shipping_address,
    subtotal: Number(row.subtotal),
    tax: Number(row.tax),
    shippingFee: Number(row.shipping_fee),
    discount: Number(row.discount || 0),
    totalAmount: Number(row.total_amount),
    orderStatus: row.order_status,
    paymentStatus: row.payment_status,
    paymentMethod: row.payment_method,
    notes: row.notes || undefined,
    items: (row.items || []).map((it: any) => ({
      id: it.id,
      orderId: it.order_id,
      productId: it.product_id || '',
      variantId: it.variant_id || undefined,
      productName: it.product_name,
      productSku: it.product_sku,
      unit: it.unit,
      unitPrice: Number(it.unit_price),
      quantity: Number(it.quantity),
      subtotal: Number(it.subtotal),
      imageUrl: it.image_url || '',
      selectedColor: it.selected_color || undefined,
      selectedFinish: it.selected_finish || undefined,
    })),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapSupabaseQuote(row: any): Quote {
  return {
    id: row.id,
    quoteNumber: row.quote_number,
    customerName: row.customer_name,
    customerEmail: row.customer_email,
    customerPhone: row.customer_phone,
    projectType: row.project_type,
    projectLocation: row.project_location,
    estimatedTimeline: row.estimated_timeline,
    budgetRange: row.budget_range,
    notes: row.notes || '',
    status: row.status,
    totalQuotedAmount: row.total_quoted_amount ? Number(row.total_quoted_amount) : undefined,
    adminNotes: row.admin_notes || undefined,
    items: (row.items || []).map((it: any) => ({
      id: it.id,
      quoteId: it.quote_id,
      productId: it.product_id || undefined,
      productName: it.product_name,
      dimensions: it.dimensions || undefined,
      quantity: Number(it.quantity || 1),
      unit: it.unit || 'sq ft',
      estimatedUnitPrice: it.estimated_unit_price ? Number(it.estimated_unit_price) : undefined,
      notes: it.notes || undefined,
    })),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapSupabaseEnquiry(row: any): Enquiry {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    subject: row.subject,
    message: row.message,
    source: row.source || 'Contact Page',
    status: row.status || 'New',
    createdAt: row.created_at,
  };
}

// =============================================================
// PRODUCTS
// =============================================================
export async function getProducts(options?: {
  categoryId?: string;
  categorySlug?: string;
  featuredOnly?: boolean;
  publishedOnly?: boolean;
  search?: string;
}): Promise<Product[]> {
  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    let query = supabase.from('products').select('*').order('created_at', { ascending: false });

    if (options?.publishedOnly !== false) {
      query = query.eq('published', true);
    }
    if (options?.categoryId) {
      query = query.eq('category_id', options.categoryId);
    }
    if (options?.featuredOnly) {
      query = query.eq('is_featured', true);
    }

    const { data: prods, error } = await query;
    if (error) {
      console.error('Supabase getProducts error:', error);
      throw new Error(`Failed to fetch materials from database: ${error.message}`);
    }

    const { data: cats } = await supabase.from('categories').select('id, name, slug');
    const catMap = new Map<string, { name: string; slug: string }>();
    (cats || []).forEach((c: any) => catMap.set(c.id, { name: c.name, slug: c.slug }));

    let list = (prods || []).map((p: any) => mapSupabaseProduct(p, catMap));

    if (options?.categorySlug) {
      list = list.filter((p) => p.categorySlug === options.categorySlug);
    }

    if (options?.search) {
      const q = options.search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.material?.toLowerCase().includes(q) ||
          p.finish?.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    return list;
  }

  // Isolated Unit Test Fallback
  const db = getDb();
  let list = [...db.products];
  if (options?.publishedOnly !== false) list = list.filter((p) => p.published);
  if (options?.categoryId) list = list.filter((p) => p.categoryId === options.categoryId);
  if (options?.featuredOnly) list = list.filter((p) => p.isFeatured);
  return list;
}

function isUUID(str: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(str);
}

export async function getProductById(id: string): Promise<Product | null> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = getServiceSupabase();
      let query = supabase.from('products').select('*');
      if (isUUID(id)) {
        query = query.eq('id', id);
      } else {
        query = query.or(`slug.eq.${id},sku.eq.${id}`);
      }

      const { data, error } = await query.maybeSingle();
      if (!error && data) {
        const { data: cat } = await supabase.from('categories').select('name, slug').eq('id', data.category_id).maybeSingle();
        const catMap = cat ? new Map([[data.category_id, cat]]) : undefined;
        return mapSupabaseProduct(data, catMap);
      }
    } catch (e) {}
  }

  const db = getDb();
  return db.products.find((p) => p.id === id || p.slug === id || p.sku === id) || null;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = getServiceSupabase();
      const { data, error } = await supabase.from('products').select('*').eq('slug', slug).maybeSingle();
      if (!error && data) {
        const { data: cat } = await supabase.from('categories').select('name, slug').eq('id', data.category_id).maybeSingle();
        const catMap = cat ? new Map([[data.category_id, cat]]) : undefined;
        return mapSupabaseProduct(data, catMap);
      }
    } catch (e) {}
  }

  const db = getDb();
  return db.products.find((p) => p.slug === slug || p.id === slug) || null;
}

export async function createProduct(data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    const slug = data.slug || data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    // 1. Enforce SKU uniqueness
    if (data.sku) {
      const { data: existingSku } = await supabase.from('products').select('id, name').eq('sku', data.sku).maybeSingle();
      if (existingSku) {
        throw new Error(`A product with SKU "${data.sku}" already exists (${existingSku.name}).`);
      }
    }

    // 2. Enforce Slug uniqueness
    const { data: existingSlug } = await supabase.from('products').select('id, name').eq('slug', slug).maybeSingle();
    if (existingSlug) {
      throw new Error(`A product with slug "${slug}" already exists (${existingSlug.name}).`);
    }

    const row = {
      name: data.name,
      slug,
      sku: data.sku,
      brand: data.brand || 'Balaji Architect & Interiors',
      category_id: data.categoryId || null,
      subcategory: data.subcategory || '',
      description: data.description,
      price: data.price,
      sale_price: data.salePrice || null,
      unit: data.unit || 'sq ft',
      moq: data.moq || 1,
      stock: data.stock || 0,
      purchase_mode: data.purchaseMode || 'BOTH',
      lead_time: data.leadTime || '2-3 Weeks',
      dimensions: data.dimensions || '',
      thickness: data.thickness || '',
      material: data.material || '',
      finish: data.finish || '',
      color: data.color || '',
      images: data.images || [],
      is_featured: Boolean(data.isFeatured),
      is_new: Boolean(data.isNew),
      is_bestseller: Boolean(data.isBestseller),
      published: Boolean(data.published),
      tags: data.tags || [],
      specifications: data.specifications || {},
    };

    const { data: inserted, error } = await supabase.from('products').insert(row).select().single();
    if (error || !inserted) {
      console.error('Supabase createProduct error:', error);
      throw new Error(`Failed to create product in database: ${error?.message}`);
    }

    return mapSupabaseProduct(inserted);
  }

  const db = getDb();
  const newProduct: Product = {
    ...data,
    id: `prod-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  db.products.unshift(newProduct);
  saveDb(db);
  return newProduct;
}

export async function updateProduct(id: string, partialData: Partial<Product>): Promise<Product | null> {
  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    const updates: any = { updated_at: new Date().toISOString() };

    if (partialData.name !== undefined) updates.name = partialData.name;
    if (partialData.slug !== undefined) updates.slug = partialData.slug;
    if (partialData.sku !== undefined) updates.sku = partialData.sku;
    if (partialData.brand !== undefined) updates.brand = partialData.brand;
    if (partialData.categoryId !== undefined) updates.category_id = partialData.categoryId;
    if (partialData.subcategory !== undefined) updates.subcategory = partialData.subcategory;
    if (partialData.description !== undefined) updates.description = partialData.description;
    if (partialData.price !== undefined) updates.price = partialData.price;
    if (partialData.salePrice !== undefined) updates.sale_price = partialData.salePrice;
    if (partialData.unit !== undefined) updates.unit = partialData.unit;
    if (partialData.moq !== undefined) updates.moq = partialData.moq;
    if (partialData.stock !== undefined) updates.stock = partialData.stock;
    if (partialData.purchaseMode !== undefined) updates.purchase_mode = partialData.purchaseMode;
    if (partialData.leadTime !== undefined) updates.lead_time = partialData.leadTime;
    if (partialData.dimensions !== undefined) updates.dimensions = partialData.dimensions;
    if (partialData.thickness !== undefined) updates.thickness = partialData.thickness;
    if (partialData.material !== undefined) updates.material = partialData.material;
    if (partialData.finish !== undefined) updates.finish = partialData.finish;
    if (partialData.color !== undefined) updates.color = partialData.color;
    if (partialData.images !== undefined) updates.images = partialData.images;
    if (partialData.isFeatured !== undefined) updates.is_featured = partialData.isFeatured;
    if (partialData.isNew !== undefined) updates.is_new = partialData.isNew;
    if (partialData.isBestseller !== undefined) updates.is_bestseller = partialData.isBestseller;
    if (partialData.published !== undefined) updates.published = partialData.published;
    if (partialData.tags !== undefined) updates.tags = partialData.tags;
    if (partialData.specifications !== undefined) updates.specifications = partialData.specifications;

    let query = supabase.from('products').update(updates);
    if (isUUID(id)) {
      query = query.eq('id', id);
    } else {
      query = query.eq('slug', id);
    }

    const { data, error } = await query.select().maybeSingle();

    if (error || !data) {
      console.error('Supabase updateProduct error:', error);
      throw new Error(`Failed to update product in database: ${error?.message || 'Product not found'}`);
    }

    return mapSupabaseProduct(data);
  }

  const db = getDb();
  const index = db.products.findIndex((p) => p.id === id || p.slug === id);
  if (index === -1) return null;
  const existing = db.products[index];
  const updated: Product = { ...existing, ...partialData, id: existing.id, updatedAt: new Date().toISOString() };
  db.products[index] = updated;
  saveDb(db);
  return updated;
}

export async function deleteProduct(id: string): Promise<boolean> {
  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    let query = supabase.from('products').delete();
    if (isUUID(id)) {
      query = query.eq('id', id);
    } else {
      query = query.eq('slug', id);
    }
    const { error } = await query;
    if (error) {
      console.error('Supabase deleteProduct error:', error);
      return false;
    }
    return true;
  }

  const db = getDb();
  const index = db.products.findIndex((p) => p.id === id || p.slug === id);
  if (index === -1) return false;
  db.products.splice(index, 1);
  saveDb(db);
  return true;
}

// =============================================================
// CATEGORIES
// =============================================================
export async function getCategories(): Promise<Category[]> {
  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    const { data: cats, error } = await supabase.from('categories').select('*').order('sort_order', { ascending: true });
    if (error) {
      console.error('Supabase getCategories error:', error);
      throw new Error(`Failed to load categories: ${error.message}`);
    }

    const { data: prods } = await supabase.from('products').select('category_id, published');
    const prodCounts = new Map<string, number>();
    (prods || []).forEach((p: any) => {
      if (p.published && p.category_id) {
        prodCounts.set(p.category_id, (prodCounts.get(p.category_id) || 0) + 1);
      }
    });

    return (cats || [])
      .filter((c: any) => c.is_active !== false)
      .map((c: any) => ({
        ...mapSupabaseCategory(c),
        productCount: prodCounts.get(c.id) || 0,
      }));
  }

  const db = getDb();
  return db.categories.filter((c) => c.isActive).sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getAllCategoriesAdmin(): Promise<Category[]> {
  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    const { data: cats, error } = await supabase.from('categories').select('*').order('sort_order', { ascending: true });
    if (error) throw new Error(error.message);

    const { data: prods } = await supabase.from('products').select('category_id');
    const prodCounts = new Map<string, number>();
    (prods || []).forEach((p: any) => {
      if (p.category_id) {
        prodCounts.set(p.category_id, (prodCounts.get(p.category_id) || 0) + 1);
      }
    });

    return (cats || []).map((c: any) => ({
      ...mapSupabaseCategory(c),
      productCount: prodCounts.get(c.id) || 0,
    }));
  }

  const db = getDb();
  return db.categories.sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    const { data, error } = await supabase.from('categories').select('*').eq('slug', slug).single();
    if (error || !data) return null;
    return mapSupabaseCategory(data);
  }

  const db = getDb();
  return db.categories.find((c) => c.slug === slug) || null;
}

export async function createCategory(data: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>): Promise<Category> {
  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    const slug = data.slug || data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const { data: existingCat } = await supabase.from('categories').select('id, name').eq('slug', slug).maybeSingle();
    if (existingCat) {
      throw new Error(`A category with slug "${slug}" already exists (${existingCat.name}).`);
    }

    const { data: inserted, error } = await supabase
      .from('categories')
      .insert({
        name: data.name,
        slug,
        description: data.description || '',
        image_url: data.imageUrl || '',
        sort_order: data.sortOrder || 0,
        is_active: data.isActive !== false,
      })
      .select()
      .single();

    if (error || !inserted) throw new Error(`Failed to create category: ${error?.message}`);
    return mapSupabaseCategory(inserted);
  }

  const db = getDb();
  const newCat: Category = {
    ...data,
    id: `cat-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  db.categories.push(newCat);
  saveDb(db);
  return newCat;
}

export async function updateCategory(id: string, partial: Partial<Category>): Promise<Category | null> {
  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    const updates: any = { updated_at: new Date().toISOString() };
    if (partial.name !== undefined) updates.name = partial.name;
    if (partial.slug !== undefined) updates.slug = partial.slug;
    if (partial.description !== undefined) updates.description = partial.description;
    if (partial.imageUrl !== undefined) updates.image_url = partial.imageUrl;
    if (partial.sortOrder !== undefined) updates.sort_order = partial.sortOrder;
    if (partial.isActive !== undefined) updates.is_active = partial.isActive;

    let query = supabase.from('categories').update(updates);
    if (isUUID(id)) {
      query = query.eq('id', id);
    } else {
      query = query.eq('slug', id);
    }

    const { data, error } = await query.select().maybeSingle();
    if (error || !data) return null;
    return mapSupabaseCategory(data);
  }

  const db = getDb();
  const idx = db.categories.findIndex((c) => c.id === id || c.slug === id);
  if (idx === -1) return null;
  const existing = db.categories[idx];
  const updated: Category = { ...existing, ...partial, id: existing.id, updatedAt: new Date().toISOString() };
  db.categories[idx] = updated;
  saveDb(db);
  return updated;
}

export async function deleteCategory(id: string): Promise<boolean> {
  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    let query = supabase.from('categories').delete();
    if (isUUID(id)) {
      query = query.eq('id', id);
    } else {
      query = query.eq('slug', id);
    }
    const { error } = await query;
    return !error;
  }

  const db = getDb();
  const idx = db.categories.findIndex((c) => c.id === id || c.slug === id);
  if (idx === -1) return false;
  db.categories.splice(idx, 1);
  saveDb(db);
  return true;
}

// =============================================================
// PROJECTS (PORTFOLIO)
// =============================================================
export async function getProjects(options?: { publishedOnly?: boolean; featuredOnly?: boolean }): Promise<Project[]> {
  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    let query = supabase.from('projects').select('*').order('sort_order', { ascending: true });

    if (options?.publishedOnly !== false) {
      query = query.eq('is_published', true);
    }
    if (options?.featuredOnly) {
      query = query.eq('is_featured', true);
    }

    const { data, error } = await query;
    if (error) throw new Error(`Failed to load projects: ${error.message}`);
    return (data || []).map(mapSupabaseProject);
  }

  const db = getDb();
  let list = [...db.projects];
  if (options?.publishedOnly !== false) list = list.filter((p) => p.isPublished);
  if (options?.featuredOnly) list = list.filter((p) => p.isFeatured);
  return list.sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    const { data, error } = await supabase.from('projects').select('*').eq('slug', slug).single();
    if (error || !data) return null;
    return mapSupabaseProject(data);
  }

  const db = getDb();
  return db.projects.find((p) => p.slug === slug) || null;
}

export async function getProjectById(id: string): Promise<Project | null> {
  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    const { data, error } = await supabase.from('projects').select('*').eq('id', id).single();
    if (error || !data) return null;
    return mapSupabaseProject(data);
  }

  const db = getDb();
  return db.projects.find((p) => p.id === id) || null;
}

export async function createProject(data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> {
  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    const { data: inserted, error } = await supabase
      .from('projects')
      .insert({
        title: data.title,
        slug: data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        location: data.location || 'Guwahati, Assam',
        year: String(data.year || new Date().getFullYear()),
        area: data.area || 'Architectural Space',
        project_type: data.projectType || 'Residential Interiors',
        short_description: data.shortDescription || '',
        description: data.description || data.shortDescription || '',
        hero_image: data.heroImage || '',
        gallery: data.gallery || [],
        design_approach: data.designApproach || '',
        materials_used: data.materialsUsed || [],
        is_featured: Boolean(data.isFeatured),
        is_published: Boolean(data.isPublished !== false),
        sort_order: data.sortOrder || 0,
      })
      .select()
      .single();

    if (error || !inserted) throw new Error(`Failed to create project: ${error?.message}`);
    return mapSupabaseProject(inserted);
  }

  const db = getDb();
  const newProj: Project = {
    ...data,
    id: `proj-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  db.projects.push(newProj);
  saveDb(db);
  return newProj;
}

export async function updateProject(id: string, partial: Partial<Project>): Promise<Project | null> {
  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    const updates: any = { updated_at: new Date().toISOString() };
    if (partial.title !== undefined) updates.title = partial.title;
    if (partial.slug !== undefined) updates.slug = partial.slug;
    if (partial.location !== undefined) updates.location = partial.location;
    if (partial.year !== undefined) updates.year = String(partial.year);
    if (partial.area !== undefined) updates.area = partial.area;
    if (partial.projectType !== undefined) updates.project_type = partial.projectType;
    if (partial.shortDescription !== undefined) updates.short_description = partial.shortDescription;
    if (partial.description !== undefined) updates.description = partial.description;
    if (partial.heroImage !== undefined) updates.hero_image = partial.heroImage;
    if (partial.gallery !== undefined) updates.gallery = partial.gallery;
    if (partial.designApproach !== undefined) updates.design_approach = partial.designApproach;
    if (partial.materialsUsed !== undefined) updates.materials_used = partial.materialsUsed;
    if (partial.isFeatured !== undefined) updates.is_featured = partial.isFeatured;
    if (partial.isPublished !== undefined) updates.is_published = partial.isPublished;
    if (partial.sortOrder !== undefined) updates.sort_order = partial.sortOrder;

    const { data, error } = await supabase.from('projects').update(updates).eq('id', id).select().single();
    if (error || !data) return null;
    return mapSupabaseProject(data);
  }

  const db = getDb();
  const idx = db.projects.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  const existing = db.projects[idx];
  const updated: Project = { ...existing, ...partial, id: existing.id, updatedAt: new Date().toISOString() };
  db.projects[idx] = updated;
  saveDb(db);
  return updated;
}

export async function deleteProject(id: string): Promise<boolean> {
  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    const { error } = await supabase.from('projects').delete().eq('id', id);
    return !error;
  }

  const db = getDb();
  const idx = db.projects.findIndex((p) => p.id === id);
  if (idx === -1) return false;
  db.projects.splice(idx, 1);
  saveDb(db);
  return true;
}

// =============================================================
// SERVICES
// =============================================================
export async function getServices(publishedOnly = true): Promise<Service[]> {
  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    let query = supabase.from('services').select('*').order('sort_order', { ascending: true });
    if (publishedOnly) query = query.eq('is_published', true);

    const { data, error } = await query;
    if (error) throw new Error(`Failed to load services: ${error.message}`);
    return (data || []).map(mapSupabaseService);
  }

  const db = getDb();
  let list = [...db.services];
  if (publishedOnly) list = list.filter((s) => s.isPublished);
  return list.sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    const { data, error } = await supabase.from('services').select('*').eq('slug', slug).single();
    if (error || !data) return null;
    return mapSupabaseService(data);
  }

  const db = getDb();
  return db.services.find((s) => s.slug === slug) || null;
}

export async function createService(data: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>): Promise<Service> {
  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    const { data: inserted, error } = await supabase
      .from('services')
      .insert({
        title: data.title,
        slug: data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        short_desc: data.shortDesc || '',
        full_desc: data.fullDesc || '',
        icon_name: data.iconName || 'Home',
        image_url: data.imageUrl || '',
        deliverables: data.deliverables || [],
        sort_order: data.sortOrder || 0,
        is_published: Boolean(data.isPublished !== false),
      })
      .select()
      .single();

    if (error || !inserted) throw new Error(`Failed to create service: ${error?.message}`);
    return mapSupabaseService(inserted);
  }

  const db = getDb();
  const newSrv: Service = {
    ...data,
    id: `srv-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  db.services.push(newSrv);
  saveDb(db);
  return newSrv;
}

export async function updateService(id: string, partial: Partial<Service>): Promise<Service | null> {
  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    const updates: any = { updated_at: new Date().toISOString() };
    if (partial.title !== undefined) updates.title = partial.title;
    if (partial.slug !== undefined) updates.slug = partial.slug;
    if (partial.shortDesc !== undefined) updates.short_desc = partial.shortDesc;
    if (partial.fullDesc !== undefined) updates.full_desc = partial.fullDesc;
    if (partial.iconName !== undefined) updates.icon_name = partial.iconName;
    if (partial.deliverables !== undefined) updates.deliverables = partial.deliverables;
    if (partial.imageUrl !== undefined) updates.image_url = partial.imageUrl;
    if (partial.sortOrder !== undefined) updates.sort_order = partial.sortOrder;
    if (partial.isPublished !== undefined) updates.is_published = partial.isPublished;

    const { data, error } = await supabase.from('services').update(updates).eq('id', id).select().single();
    if (error || !data) return null;
    return mapSupabaseService(data);
  }

  const db = getDb();
  const idx = db.services.findIndex((s) => s.id === id);
  if (idx === -1) return null;
  const existing = db.services[idx];
  const updated: Service = { ...existing, ...partial, id: existing.id, updatedAt: new Date().toISOString() };
  db.services[idx] = updated;
  saveDb(db);
  return updated;
}

export async function deleteService(id: string): Promise<boolean> {
  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    const { error } = await supabase.from('services').delete().eq('id', id);
    return !error;
  }

  const db = getDb();
  const idx = db.services.findIndex((c) => c.id === id);
  if (idx === -1) return false;
  db.services.splice(idx, 1);
  saveDb(db);
  return true;
}

// =============================================================
// ORDERS & ATOMIC STOCK DECREMENT (SUPABASE IS SOURCE OF TRUTH)
// =============================================================
export async function createOrderAtomic(orderData: {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: any;
  billingAddress?: any;
  items: {
    productId: string;
    variantId?: string;
    quantity: number;
    selectedColor?: string;
    selectedFinish?: string;
  }[];
  paymentMethod: string;
  notes?: string;
}): Promise<{ success: boolean; order?: Order; error?: string }> {
  const validatedItems: any[] = [];
  let calculatedSubtotal = 0;

  // 1. Verify availability and fetch authoritative prices
  for (const item of orderData.items) {
    let product: Product | null = null;

    if (isSupabaseConfigured()) {
      product = await getProductById(item.productId);
    } else {
      const db = getDb();
      product = db.products.find((p) => p.id === item.productId || p.slug === item.productId || p.sku === item.productId) || null;
    }

    if (!product) {
      return { success: false, error: `Material/Product with ID ${item.productId} not found.` };
    }

    if (!product.published) {
      return { success: false, error: `${product.name} is currently not available.` };
    }

    if (product.stock < item.quantity) {
      return {
        success: false,
        error: `Insufficient stock for "${product.name}". Available: ${product.stock} ${product.unit}, Requested: ${item.quantity} ${product.unit}.`,
      };
    }

    let unitPrice = product.salePrice && product.salePrice > 0 ? product.salePrice : product.price;

    if (item.variantId && product.variants) {
      const variant = product.variants.find((v) => v.id === item.variantId);
      if (variant) {
        unitPrice += variant.priceModifier || 0;
        if (variant.stock < item.quantity) {
          return {
            success: false,
            error: `Variant "${variant.name}" for "${product.name}" has only ${variant.stock} units available.`,
          };
        }
      }
    }

    const itemSubtotal = unitPrice * item.quantity;
    calculatedSubtotal += itemSubtotal;

    validatedItems.push({
      id: `oi-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      orderId: '',
      productId: product.id,
      variantId: item.variantId,
      productName: product.name,
      productSku: product.sku,
      unit: product.unit,
      unitPrice,
      quantity: item.quantity,
      subtotal: itemSubtotal,
      imageUrl: product.images[0] || '',
      selectedColor: item.selectedColor || product.color,
      selectedFinish: item.selectedFinish || product.finish,
    });
  }

  // 2. Perform Atomic Stock Decrement in Supabase
  for (const item of orderData.items) {
    if (isSupabaseConfigured()) {
      const supabase = getServiceSupabase();
      const { error: rpcErr } = await supabase.rpc('decrement_stock_atomic', { p_id: item.productId, p_qty: item.quantity });
      if (rpcErr) {
        // Fallback to direct decrement if RPC not installed
        const currentProd = await getProductById(item.productId);
        if (currentProd) {
          const newStock = Math.max(0, currentProd.stock - item.quantity);
          await supabase.from('products').update({ stock: newStock }).eq('id', currentProd.id);
        }
      }
    }
  }

  const taxRate = 0.18;
  const tax = Math.round(calculatedSubtotal * taxRate);
  const shippingFee = calculatedSubtotal >= 50000 ? 0 : 1500;
  const totalAmount = calculatedSubtotal + tax + shippingFee;
  const orderNumber = `BAL-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;

  const newOrder: Order = {
    id: `ord-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    orderNumber,
    customerName: orderData.customerName,
    customerEmail: orderData.customerEmail,
    customerPhone: orderData.customerPhone,
    shippingAddress: orderData.shippingAddress,
    billingAddress: orderData.billingAddress || orderData.shippingAddress,
    items: validatedItems,
    subtotal: calculatedSubtotal,
    tax,
    shippingFee,
    discount: 0,
    totalAmount,
    orderStatus: 'Confirmed',
    paymentStatus: 'Submitted',
    paymentMethod: orderData.paymentMethod || 'Credit Card / Wire Transfer',
    notes: orderData.notes,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  // 3. Persist to Supabase (Authoritative Production Source of Truth)
  // 3. Persist to Supabase (Authoritative Production Source of Truth)
  try {
    const supabase = getServiceSupabase();
    const { data: orderRow, error: orderErr } = await supabase
      .from('orders')
      .insert({
        order_number: newOrder.orderNumber,
        customer_name: newOrder.customerName,
        customer_email: newOrder.customerEmail,
        customer_phone: newOrder.customerPhone,
        shipping_address: newOrder.shippingAddress,
        billing_address: newOrder.billingAddress,
        subtotal: newOrder.subtotal,
        tax: newOrder.tax,
        shipping_fee: newOrder.shippingFee,
        discount: newOrder.discount,
        total_amount: newOrder.totalAmount,
        order_status: newOrder.orderStatus,
        payment_status: newOrder.paymentStatus,
        payment_method: newOrder.paymentMethod,
        notes: newOrder.notes,
      })
      .select()
      .single();

    if (!orderErr && orderRow) {
      newOrder.id = orderRow.id;
      const itemRows = validatedItems.map((it) => ({
        order_id: orderRow.id,
        product_name: it.productName,
        product_sku: it.productSku,
        unit: it.unit,
        unit_price: it.unitPrice,
        quantity: it.quantity,
        subtotal: it.subtotal,
        image_url: it.imageUrl,
        selected_color: it.selectedColor,
        selected_finish: it.selectedFinish,
      }));

      const { data: insertedItems } = await supabase.from('order_items').insert(itemRows).select();
      if (insertedItems && insertedItems.length > 0) {
        newOrder.items = insertedItems.map((it: any) => ({
          id: it.id,
          orderId: it.order_id,
          productId: it.product_id || '',
          variantId: it.variant_id,
          productName: it.product_name,
          productSku: it.product_sku,
          unit: it.unit,
          unitPrice: Number(it.unit_price),
          quantity: Number(it.quantity),
          subtotal: Number(it.subtotal),
          imageUrl: it.image_url,
          selectedColor: it.selected_color,
          selectedFinish: it.selected_finish,
        }));
      }

      // Add audit log to Supabase
      try {
        await supabase.from('audit_logs').insert({
          admin_id: null,
          admin_email: 'checkout@balaji.com',
          action: 'ORDER_PLACED',
          entity: 'Order',
          entity_id: orderRow.id,
          details: { orderNumber: newOrder.orderNumber, total: newOrder.totalAmount, itemsCount: newOrder.items.length },
        });
      } catch (auditErr) {}

      // Dispatch real server-side Web Push notification to registered admin devices
      try {
        await sendNewOrderPush(newOrder);
      } catch (pushErr) {
        console.warn('Push notification dispatch error:', pushErr);
      }

      return { success: true, order: newOrder };
    } else if (orderErr) {
      console.warn('Supabase order insert warning, saving locally:', orderErr.message);
    }
  } catch (err: any) {
    console.warn('Supabase exception during order creation, saving locally:', err.message);
  }

  // Resilient fallback storage: ensures no customer order is ever dropped
  const db = getDb();
  db.orders.unshift(newOrder);
  saveDb(db);
  return { success: true, order: newOrder };
}

export async function getOrders(): Promise<Order[]> {
  try {
    const supabase = getServiceSupabase();
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        items:order_items(*)
      `)
      .order('created_at', { ascending: false });

    if (!error && data) {
      return data.map(mapSupabaseOrder);
    }
  } catch (err) {
    console.warn('Supabase getOrders query error, loading fallback:', err);
  }

  const db = getDb();
  return [...db.orders].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getOrderById(id: string): Promise<Order | null> {
  try {
    const supabase = getServiceSupabase();
    let query = supabase.from('orders').select(`
      *,
      items:order_items(*)
    `);

    if (isUUID(id)) {
      query = query.eq('id', id);
    } else {
      query = query.eq('order_number', id);
    }

    const { data, error } = await query.maybeSingle();
    if (!error && data) {
      return mapSupabaseOrder(data);
    }
  } catch (err) {}

  const db = getDb();
  return db.orders.find((o) => o.id === id || o.orderNumber === id) || null;
}

export async function updateOrderStatus(
  id: string,
  orderStatus?: Order['orderStatus'],
  paymentStatus?: Order['paymentStatus']
): Promise<Order | null> {
  try {
    const supabase = getServiceSupabase();
    const updates: any = { updated_at: new Date().toISOString() };
    if (orderStatus) updates.order_status = orderStatus;
    if (paymentStatus) updates.payment_status = paymentStatus;

    let query = supabase.from('orders').update(updates);
    if (isUUID(id)) {
      query = query.eq('id', id);
    } else {
      query = query.eq('order_number', id);
    }

    const { data, error } = await query.select(`*, items:order_items(*)`).maybeSingle();
    if (!error && data) {
      return mapSupabaseOrder(data);
    }
  } catch (err) {}

  const db = getDb();
  const order = db.orders.find((o) => o.id === id || o.orderNumber === id);
  if (order) {
    if (orderStatus) order.orderStatus = orderStatus;
    if (paymentStatus) order.paymentStatus = paymentStatus;
    order.updatedAt = new Date().toISOString();
    saveDb(db);
  }
  return order || null;
}

// =============================================================
// QUOTES
// =============================================================
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
  const quoteNumber = `QT-${new Date().getFullYear()}-${Date.now().toString().slice(-5)}`;

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
        notes: quoteData.notes,
        status: 'Pending',
      })
      .select()
      .single();

    if (error || !quoteRow) throw new Error(`Failed to create quote: ${error?.message}`);

    if (quoteData.items && quoteData.items.length > 0) {
      const qItems = quoteData.items.map((it) => ({
        quote_id: quoteRow.id,
        product_id: it.productId || null,
        product_name: it.productName,
        dimensions: it.dimensions || null,
        quantity: it.quantity,
        unit: it.unit || 'sq ft',
        notes: it.notes || null,
      }));
      await supabase.from('quote_items').insert(qItems);
    }

    const { data: fullQuote } = await supabase.from('quotes').select('*, items:quote_items(*)').eq('id', quoteRow.id).single();
    return mapSupabaseQuote(fullQuote);
  }

  const db = getDb();
  const quoteId = `qt-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
  const quoteItems = (quoteData.items || []).map((it) => ({
    id: `qti-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
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

export async function getQuotes(): Promise<Quote[]> {
  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    const { data, error } = await supabase.from('quotes').select('*, items:quote_items(*)').order('created_at', { ascending: false });
    if (error) throw new Error(`Failed to load quotes: ${error.message}`);
    return (data || []).map(mapSupabaseQuote);
  }

  const db = getDb();
  return [...db.quotes].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
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
    if (error || !data) return null;
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
    if (error || !data) return null;
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

// =============================================================
// ENQUIRIES / CONTACT
// =============================================================
export async function createEnquiry(data: Omit<Enquiry, 'id' | 'createdAt' | 'status'>): Promise<Enquiry> {
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
        source: data.source || 'Contact Page',
        status: 'New',
      })
      .select()
      .single();

    if (error || !inserted) throw new Error(`Failed to save enquiry: ${error?.message}`);
    return mapSupabaseEnquiry(inserted);
  }

  const db = getDb();
  const newEnq: Enquiry = {
    ...data,
    id: `enq-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    status: 'New',
    createdAt: new Date().toISOString(),
  };
  db.enquiries.unshift(newEnq);
  saveDb(db);
  return newEnq;
}

export async function getEnquiries(): Promise<Enquiry[]> {
  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    const { data, error } = await supabase.from('enquiries').select('*').order('created_at', { ascending: false });
    if (error) throw new Error(`Failed to load enquiries: ${error.message}`);
    return (data || []).map(mapSupabaseEnquiry);
  }

  const db = getDb();
  return [...db.enquiries].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function updateEnquiryStatus(id: string, status: Enquiry['status']): Promise<Enquiry | null> {
  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    const { data, error } = await supabase.from('enquiries').update({ status }).eq('id', id).select().single();
    if (error || !data) return null;
    return mapSupabaseEnquiry(data);
  }

  const db = getDb();
  const enq = db.enquiries.find((e) => e.id === id);
  if (!enq) return null;
  enq.status = status;
  saveDb(db);
  return enq;
}

// =============================================================
// ADMIN AUTH & CREDENTIALS
// =============================================================
export async function getAdminByEmail(email: string): Promise<(AdminUser & { passwordHash: string }) | null> {
  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    const { data, error } = await supabase.from('admins').select('*').ilike('email', email).single();
    if (!error && data) {
      return {
        id: data.id,
        email: data.email,
        passwordHash: data.password_hash,
        name: data.name,
        role: data.role || 'Principal Architect',
        mustChangePassword: Boolean(data.must_change_password),
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      };
    }
  }

  const db = getDb();
  const admin = db.admins.find((a) => a.email.toLowerCase() === email.toLowerCase());
  return (admin as any) || null;
}

export async function updateAdminPassword(adminId: string, newPasswordHash: string): Promise<boolean> {
  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    const { error } = await supabase
      .from('admins')
      .update({
        password_hash: newPasswordHash,
        must_change_password: false,
        updated_at: new Date().toISOString(),
      })
      .eq('id', adminId);

    if (error) {
      console.error('Supabase password update error:', error);
      return false;
    }

    try {
      await supabase.from('audit_logs').insert({
        admin_id: adminId,
        admin_email: 'vicks@balaji.com',
        action: 'ADMIN_PASSWORD_CHANGED',
        entity: 'Admin',
        entity_id: adminId,
        details: { message: 'Password updated and verified in Supabase' },
      });
    } catch (e) {}

    return true;
  }

  const db = getDb();
  const admin = db.admins.find((a) => a.id === adminId);
  if (!admin) return false;

  (admin as any).passwordHash = newPasswordHash;
  admin.mustChangePassword = false;
  admin.updatedAt = new Date().toISOString();
  saveDb(db);
  return true;
}

export async function recordAdminLogin(adminId: string): Promise<void> {
  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    await supabase.from('admins').update({ updated_at: new Date().toISOString() }).eq('id', adminId);
    return;
  }

  const db = getDb();
  const admin = db.admins.find((a) => a.id === adminId);
  if (admin) {
    admin.updatedAt = new Date().toISOString();
    saveDb(db);
  }
}

// =============================================================
// SITE SETTINGS
// =============================================================
export async function getSiteSettings(): Promise<SiteSettings> {
  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    const { data } = await supabase.from('site_settings').select('*').eq('key', 'general').single();
    if (data && data.value) {
      const v = data.value;
      return {
        ...initialSiteSettings,
        ...v,
        studioName: v.studioName || v.brandName || 'Balaji Architect & Interiors',
        brandName: v.brandName || v.studioName || 'Balaji Architect & Interiors',
        supportEmail: v.supportEmail || v.contactEmail || 'atelier@balaji-interior.com',
        contactEmail: v.contactEmail || v.supportEmail || 'atelier@balaji-interior.com',
        supportPhone: v.supportPhone || v.contactPhone || '+91 70029 48484',
        contactPhone: v.contactPhone || v.supportPhone || '+91 70029 48484',
        studioAddress: v.studioAddress || 'Door No. 306, DN TOWER, Floor No. 03, Beltola Tiniali, Guwahati, Assam 781040',
        taxRatePercent: Number(v.taxRatePercent || 18),
        freeShippingThreshold: Number(v.freeShippingThreshold || 50000),
        standardShippingFee: Number(v.standardShippingFee || 1500),
        currencySymbol: v.currencySymbol || '₹',
        updatedAt: data.updated_at || new Date().toISOString(),
      };
    }
  }

  const db = getDb();
  return db.siteSettings;
}

export async function updateSiteSettings(partial: Partial<SiteSettings>): Promise<SiteSettings> {
  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    const current = await getSiteSettings();
    const merged = { ...current, ...partial, updatedAt: new Date().toISOString() };

    await supabase
      .from('site_settings')
      .upsert({
        key: 'general',
        value: merged,
        updated_at: new Date().toISOString(),
      });

    return merged;
  }

  const db = getDb();
  db.siteSettings = { ...db.siteSettings, ...partial };
  saveDb(db);
  return db.siteSettings;
}

// =============================================================
// AUDIT LOGS
// =============================================================
export async function addAuditLog(entry: Omit<AuditLog, 'id' | 'createdAt'>): Promise<AuditLog> {
  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    const { data, error } = await supabase
      .from('audit_logs')
      .insert({
        admin_id: entry.adminId !== 'system' ? entry.adminId : null,
        admin_email: entry.adminEmail,
        action: entry.action,
        entity: entry.entity,
        entity_id: entry.entityId,
        details: entry.details || null,
      })
      .select()
      .single();

    if (!error && data) {
      return {
        id: data.id,
        adminId: data.admin_id || 'system',
        adminEmail: data.admin_email,
        action: data.action,
        entity: data.entity,
        entityId: data.entity_id,
        details: data.details,
        createdAt: data.created_at,
      };
    }
  }

  const db = getDb();
  const newLog: AuditLog = {
    ...entry,
    id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    createdAt: new Date().toISOString(),
  };
  db.auditLogs.unshift(newLog);
  if (db.auditLogs.length > 500) db.auditLogs.length = 500;
  saveDb(db);
  return newLog;
}

export async function getAuditLogs(): Promise<AuditLog[]> {
  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    const { data, error } = await supabase.from('audit_logs').select('*').order('created_at', { ascending: false }).limit(100);
    if (!error && data) {
      return data.map((d: any) => ({
        id: d.id,
        adminId: d.admin_id || 'system',
        adminEmail: d.admin_email,
        action: d.action,
        entity: d.entity,
        entityId: d.entity_id,
        details: d.details,
        createdAt: d.created_at,
      }));
    }
  }

  const db = getDb();
  return [...db.auditLogs].slice(0, 100);
}

// =============================================================
// CUSTOMERS DIRECTORY (AGGREGATED FROM REAL ORDERS & QUOTES)
// =============================================================
export async function getCustomers(): Promise<{
  id: string;
  name: string;
  email: string;
  phone: string;
  ordersCount: number;
  totalSpent: number;
  lastOrderDate: string;
  city?: string;
}[]> {
  const orders = await getOrders();
  const customerMap = new Map<string, {
    id: string;
    name: string;
    email: string;
    phone: string;
    ordersCount: number;
    totalSpent: number;
    lastOrderDate: string;
    city?: string;
  }>();

  for (const ord of orders) {
    const key = ord.customerEmail.toLowerCase();
    const existing = customerMap.get(key);
    if (existing) {
      existing.ordersCount += 1;
      existing.totalSpent += ord.totalAmount;
      if (new Date(ord.createdAt) > new Date(existing.lastOrderDate)) {
        existing.lastOrderDate = ord.createdAt;
      }
    } else {
      customerMap.set(key, {
        id: `cust-${key.replace(/[^a-z0-9]/g, '')}`,
        name: ord.customerName,
        email: ord.customerEmail,
        phone: ord.customerPhone,
        ordersCount: 1,
        totalSpent: ord.totalAmount,
        lastOrderDate: ord.createdAt,
        city: ord.shippingAddress?.city,
      });
    }
  }

  return Array.from(customerMap.values()).sort((a, b) => new Date(b.lastOrderDate).getTime() - new Date(a.lastOrderDate).getTime());
}

// =============================================================
// PUSH SUBSCRIPTIONS
// =============================================================
export async function addPushSubscription(sub: {
  endpoint: string;
  keys: { p256dh: string; auth: string };
  adminId?: string;
}): Promise<void> {
  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    await supabase.from('notification_subscriptions').upsert(
      {
        endpoint: sub.endpoint,
        keys: sub.keys,
        admin_id: sub.adminId || null,
        created_at: new Date().toISOString(),
      },
      { onConflict: 'endpoint' }
    );
    return;
  }

  const db = getDb();
  const existingIdx = db.pushSubscriptions.findIndex((s) => s.endpoint === sub.endpoint);
  const entry = {
    id: `sub-${Date.now()}`,
    endpoint: sub.endpoint,
    keys: sub.keys,
    adminId: sub.adminId,
    createdAt: new Date().toISOString(),
  };
  if (existingIdx >= 0) {
    db.pushSubscriptions[existingIdx] = entry;
  } else {
    db.pushSubscriptions.push(entry);
  }
  saveDb(db);
}

export async function getPushSubscriptions() {
  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    const { data } = await supabase.from('notification_subscriptions').select('*');
    return data || [];
  }

  const db = getDb();
  return db.pushSubscriptions;
}
