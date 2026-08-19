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

// In-memory cache with disk synchronization
let dbCache: DatabaseState | null = null;

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
      auditLogs: [
        {
          id: 'log-init',
          adminId: 'system',
          adminEmail: 'system@balaji.com',
          action: 'DATABASE_INITIALIZED',
          entity: 'System',
          details: { message: 'Balaji Atelier Production Database successfully initialized with editorial seed.' },
          createdAt: new Date().toISOString(),
        },
      ],
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

// -------------------------------------------------------------
// PRODUCTS
// -------------------------------------------------------------
export async function getProducts(options?: {
  categoryId?: string;
  categorySlug?: string;
  featuredOnly?: boolean;
  publishedOnly?: boolean;
  search?: string;
}): Promise<Product[]> {
  const db = getDb();
  let list = [...db.products];

  if (options?.publishedOnly !== false) {
    list = list.filter((p) => p.published);
  }

  if (options?.categoryId) {
    list = list.filter((p) => p.categoryId === options.categoryId);
  }

  if (options?.categorySlug) {
    const cat = db.categories.find((c) => c.slug === options.categorySlug);
    if (cat) {
      list = list.filter((p) => p.categoryId === cat.id);
    } else {
      return [];
    }
  }

  if (options?.featuredOnly) {
    list = list.filter((p) => p.isFeatured);
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

  // Populate category info
  return list.map((p) => {
    const cat = db.categories.find((c) => c.id === p.categoryId);
    return {
      ...p,
      categoryName: cat?.name || p.categoryName || 'General',
      categorySlug: cat?.slug || p.categorySlug || '',
    };
  });
}

export async function getProductById(id: string): Promise<Product | null> {
  const db = getDb();
  const product = db.products.find((p) => p.id === id);
  if (!product) return null;
  const cat = db.categories.find((c) => c.id === product.categoryId);
  return {
    ...product,
    categoryName: cat?.name || product.categoryName,
    categorySlug: cat?.slug || product.categorySlug,
  };
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const db = getDb();
  const product = db.products.find((p) => p.slug === slug);
  if (!product) return null;
  const cat = db.categories.find((c) => c.id === product.categoryId);
  return {
    ...product,
    categoryName: cat?.name || product.categoryName,
    categorySlug: cat?.slug || product.categorySlug,
  };
}

export async function createProduct(data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
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
  const db = getDb();
  const index = db.products.findIndex((p) => p.id === id);
  if (index === -1) return null;

  const existing = db.products[index];
  const updated: Product = {
    ...existing,
    ...partialData,
    id: existing.id, // Immutable ID
    updatedAt: new Date().toISOString(),
  };

  db.products[index] = updated;
  saveDb(db);
  return updated;
}

export async function deleteProduct(id: string): Promise<boolean> {
  const db = getDb();
  const index = db.products.findIndex((p) => p.id === id);
  if (index === -1) return false;
  db.products.splice(index, 1);
  saveDb(db);
  return true;
}

// -------------------------------------------------------------
// CATEGORIES
// -------------------------------------------------------------
export async function getCategories(): Promise<Category[]> {
  const db = getDb();
  const products = db.products;
  return db.categories
    .filter((c) => c.isActive)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((cat) => ({
      ...cat,
      productCount: products.filter((p) => p.categoryId === cat.id && p.published).length,
    }));
}

export async function getAllCategoriesAdmin(): Promise<Category[]> {
  const db = getDb();
  const products = db.products;
  return db.categories
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((cat) => ({
      ...cat,
      productCount: products.filter((p) => p.categoryId === cat.id).length,
    }));
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const db = getDb();
  const cat = db.categories.find((c) => c.slug === slug);
  if (!cat) return null;
  const products = db.products;
  return {
    ...cat,
    productCount: products.filter((p) => p.categoryId === cat.id && p.published).length,
  };
}

export async function createCategory(data: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>): Promise<Category> {
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
  const db = getDb();
  const idx = db.categories.findIndex((c) => c.id === id);
  if (idx === -1) return null;
  const existing = db.categories[idx];
  const updated: Category = {
    ...existing,
    ...partial,
    id: existing.id,
    updatedAt: new Date().toISOString(),
  };
  db.categories[idx] = updated;
  saveDb(db);
  return updated;
}

export async function deleteCategory(id: string): Promise<boolean> {
  const db = getDb();
  const idx = db.categories.findIndex((c) => c.id === id);
  if (idx === -1) return false;
  db.categories.splice(idx, 1);
  saveDb(db);
  return true;
}

// -------------------------------------------------------------
// PROJECTS (PORTFOLIO)
// -------------------------------------------------------------
export async function getProjects(options?: { publishedOnly?: boolean; featuredOnly?: boolean }): Promise<Project[]> {
  const db = getDb();
  let list = [...db.projects];
  if (options?.publishedOnly !== false) {
    list = list.filter((p) => p.isPublished);
  }
  if (options?.featuredOnly) {
    list = list.filter((p) => p.isFeatured);
  }
  return list.sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const db = getDb();
  return db.projects.find((p) => p.slug === slug) || null;
}

export async function getProjectById(id: string): Promise<Project | null> {
  const db = getDb();
  return db.projects.find((p) => p.id === id) || null;
}

export async function createProject(data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> {
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
  const db = getDb();
  const idx = db.projects.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  const existing = db.projects[idx];
  const updated: Project = {
    ...existing,
    ...partial,
    id: existing.id,
    updatedAt: new Date().toISOString(),
  };
  db.projects[idx] = updated;
  saveDb(db);
  return updated;
}

export async function deleteProject(id: string): Promise<boolean> {
  const db = getDb();
  const idx = db.projects.findIndex((p) => p.id === id);
  if (idx === -1) return false;
  db.projects.splice(idx, 1);
  saveDb(db);
  return true;
}

// -------------------------------------------------------------
// SERVICES
// -------------------------------------------------------------
export async function getServices(publishedOnly = true): Promise<Service[]> {
  const db = getDb();
  let list = [...db.services];
  if (publishedOnly) {
    list = list.filter((s) => s.isPublished);
  }
  return list.sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const db = getDb();
  return db.services.find((s) => s.slug === slug) || null;
}

export async function createService(data: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>): Promise<Service> {
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
  const db = getDb();
  const idx = db.services.findIndex((s) => s.id === id);
  if (idx === -1) return null;
  const existing = db.services[idx];
  const updated: Service = {
    ...existing,
    ...partial,
    id: existing.id,
    updatedAt: new Date().toISOString(),
  };
  db.services[idx] = updated;
  saveDb(db);
  return updated;
}

export async function deleteService(id: string): Promise<boolean> {
  const db = getDb();
  const idx = db.services.findIndex((s) => s.id === id);
  if (idx === -1) return false;
  db.services.splice(idx, 1);
  saveDb(db);
  return true;
}

// Helper to map Supabase order with joined items
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

// -------------------------------------------------------------
// ORDERS & ATOMIC STOCK DECREMENT
// -------------------------------------------------------------
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
  const db = getDb();
  const validatedItems: any[] = [];
  let calculatedSubtotal = 0;

  // 1. Verify availability and fetch authoritative prices
  for (const item of orderData.items) {
    let product = db.products.find((p) => p.id === item.productId || p.slug === item.productId);

    if (!product && process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const supabase = getServiceSupabase();
        const { data: sbProd } = await supabase
          .from('products')
          .select('*')
          .or(`id.eq.${item.productId},slug.eq.${item.productId}`)
          .single();

        if (sbProd) {
          product = {
            id: sbProd.id,
            name: sbProd.name,
            slug: sbProd.slug,
            sku: sbProd.sku,
            brand: sbProd.brand,
            categoryId: sbProd.category_id,
            subcategory: sbProd.subcategory,
            description: sbProd.description,
            price: Number(sbProd.price),
            salePrice: sbProd.sale_price ? Number(sbProd.sale_price) : undefined,
            unit: sbProd.unit,
            moq: Number(sbProd.moq),
            stock: Number(sbProd.stock),
            purchaseMode: sbProd.purchase_mode,
            leadTime: sbProd.lead_time,
            dimensions: sbProd.dimensions,
            thickness: sbProd.thickness,
            material: sbProd.material,
            finish: sbProd.finish,
            color: sbProd.color,
            images: sbProd.images || [],
            isFeatured: sbProd.is_featured,
            isNew: sbProd.is_new,
            isBestseller: sbProd.is_bestseller,
            published: sbProd.published,
            tags: sbProd.tags || [],
            specifications: sbProd.specifications || {},
            createdAt: sbProd.created_at,
            updatedAt: sbProd.updated_at,
          };
        }
      } catch (err) {}
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

  // 2. Perform Atomic Stock Decrement locally & in Supabase
  for (const item of orderData.items) {
    const p = db.products.find((prod) => prod.id === item.productId || prod.slug === item.productId);
    if (p) {
      p.stock -= item.quantity;
      if (item.variantId && p.variants) {
        const v = p.variants.find((vr) => vr.id === item.variantId);
        if (v) v.stock -= item.quantity;
      }
      p.updatedAt = new Date().toISOString();
    }

    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const supabase = getServiceSupabase();
        // Atomic stock decrement in Supabase
        const targetId = p ? p.id : item.productId;
        const { error: rpcErr } = await supabase.rpc('decrement_stock_atomic', { p_id: targetId, p_qty: item.quantity });
        if (rpcErr && p) {
          await supabase.from('products').update({ stock: p.stock }).or(`id.eq.${p.id},slug.eq.${p.slug}`);
        }
      } catch (err) {}
    }
  }

  const taxRate = db.siteSettings.taxRatePercent / 100;
  const tax = Math.round(calculatedSubtotal * taxRate);
  const shippingFee =
    calculatedSubtotal >= db.siteSettings.freeShippingThreshold ? 0 : db.siteSettings.standardShippingFee;
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

  validatedItems.forEach((it) => (it.orderId = newOrder.id));

  // 3. Persist to Supabase if configured
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
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
          await supabase
            .from('audit_logs')
            .insert({
              admin_id: 'system',
              admin_email: 'checkout@balaji.com',
              action: 'ORDER_PLACED',
              entity: 'Order',
              entity_id: orderRow.id,
              details: { orderNumber: newOrder.orderNumber, total: newOrder.totalAmount, itemsCount: newOrder.items.length },
            });
        } catch (auditErr) {}
      } else if (orderErr) {
        console.warn('Supabase order insert warning:', orderErr.message);
      }
    } catch (sbErr: any) {
      console.warn('Supabase order creation exception, continuing with local persistence:', sbErr.message);
    }
  }

  // 4. Save to local database
  db.orders.unshift(newOrder);
  db.auditLogs.unshift({
    id: `log-${Date.now()}`,
    adminId: 'system',
    adminEmail: 'checkout@balaji.com',
    action: 'ORDER_PLACED',
    entity: 'Order',
    entityId: newOrder.id,
    details: { orderNumber: newOrder.orderNumber, total: newOrder.totalAmount, itemsCount: newOrder.items.length },
    createdAt: new Date().toISOString(),
  });

  saveDb(db);
  return { success: true, order: newOrder };
}

export async function getOrders(): Promise<Order[]> {
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    try {
      const supabase = getServiceSupabase();
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          items:order_items(*)
        `)
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        return data.map(mapSupabaseOrder);
      }
    } catch (sbErr) {
      console.warn('Supabase getOrders warning, falling back to local store:', sbErr);
    }
  }

  const db = getDb();
  return [...db.orders].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getOrderById(id: string): Promise<Order | null> {
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    try {
      const supabase = getServiceSupabase();
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          items:order_items(*)
        `)
        .or(`id.eq.${id},order_number.eq.${id}`)
        .single();

      if (!error && data) {
        return mapSupabaseOrder(data);
      }
    } catch (sbErr) {
      console.warn('Supabase getOrderById warning, falling back to local store:', sbErr);
    }
  }

  const db = getDb();
  return db.orders.find((o) => o.id === id || o.orderNumber === id) || null;
}

export async function updateOrderStatus(
  id: string,
  orderStatus?: Order['orderStatus'],
  paymentStatus?: Order['paymentStatus']
): Promise<Order | null> {
  const db = getDb();
  const order = db.orders.find((o) => o.id === id || o.orderNumber === id);
  if (order) {
    if (orderStatus) order.orderStatus = orderStatus;
    if (paymentStatus) order.paymentStatus = paymentStatus;
    order.updatedAt = new Date().toISOString();
    saveDb(db);
  }

  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    try {
      const supabase = getServiceSupabase();
      const updates: any = { updated_at: new Date().toISOString() };
      if (orderStatus) updates.order_status = orderStatus;
      if (paymentStatus) updates.payment_status = paymentStatus;

      const { data, error } = await supabase
        .from('orders')
        .update(updates)
        .or(`id.eq.${id},order_number.eq.${id}`)
        .select(`*, items:order_items(*)`)
        .single();

      if (!error && data) {
        return mapSupabaseOrder(data);
      }
    } catch (sbErr) {
      console.warn('Supabase updateOrderStatus warning:', sbErr);
    }
  }

  return order || null;
}

// -------------------------------------------------------------
// QUOTES
// -------------------------------------------------------------
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
  const db = getDb();
  const quoteNumber = `QT-${new Date().getFullYear()}-${Date.now().toString().slice(-5)}`;
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
  const db = getDb();
  return [...db.quotes].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getQuoteById(id: string): Promise<Quote | null> {
  const db = getDb();
  return db.quotes.find((q) => q.id === id || q.quoteNumber === id) || null;
}

export async function updateQuoteStatus(
  id: string,
  status: Quote['status'],
  totalQuotedAmount?: number,
  adminNotes?: string
): Promise<Quote | null> {
  const db = getDb();
  const quote = db.quotes.find((q) => q.id === id);
  if (!quote) return null;

  quote.status = status;
  if (totalQuotedAmount !== undefined) quote.totalQuotedAmount = totalQuotedAmount;
  if (adminNotes !== undefined) quote.adminNotes = adminNotes;
  quote.updatedAt = new Date().toISOString();

  saveDb(db);
  return quote;
}

// -------------------------------------------------------------
// ENQUIRIES / CONTACT
// -------------------------------------------------------------
export async function createEnquiry(data: Omit<Enquiry, 'id' | 'createdAt' | 'status'>): Promise<Enquiry> {
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
  const db = getDb();
  return [...db.enquiries].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function updateEnquiryStatus(id: string, status: Enquiry['status']): Promise<Enquiry | null> {
  const db = getDb();
  const enq = db.enquiries.find((e) => e.id === id);
  if (!enq) return null;
  enq.status = status;
  saveDb(db);
  return enq;
}

// -------------------------------------------------------------
// ADMIN AUTH & CREDENTIALS
// -------------------------------------------------------------
export async function getAdminByEmail(email: string): Promise<(AdminUser & { passwordHash: string }) | null> {
  const db = getDb();
  const admin = db.admins.find((a) => a.email.toLowerCase() === email.toLowerCase());
  return (admin as any) || null;
}

export async function updateAdminPassword(adminId: string, newPasswordHash: string): Promise<boolean> {
  const db = getDb();
  const admin = db.admins.find((a) => a.id === adminId);
  if (!admin) return false;

  (admin as any).passwordHash = newPasswordHash;
  admin.mustChangePassword = false;
  admin.updatedAt = new Date().toISOString();

  db.auditLogs.unshift({
    id: `log-${Date.now()}`,
    adminId: admin.id,
    adminEmail: admin.email,
    action: 'ADMIN_PASSWORD_CHANGED',
    entity: 'Admin',
    entityId: admin.id,
    details: { message: 'Initial bootstrap password replaced with permanent custom password.' },
    createdAt: new Date().toISOString(),
  });

  saveDb(db);
  return true;
}

export async function recordAdminLogin(adminId: string): Promise<void> {
  const db = getDb();
  const admin = db.admins.find((a) => a.id === adminId);
  if (admin) {
    admin.lastLoginAt = new Date().toISOString();
    saveDb(db);
  }
}

// -------------------------------------------------------------
// SITE SETTINGS
// -------------------------------------------------------------
export async function getSiteSettings(): Promise<SiteSettings> {
  const db = getDb();
  return db.siteSettings;
}

export async function updateSiteSettings(partial: Partial<SiteSettings>): Promise<SiteSettings> {
  const db = getDb();
  db.siteSettings = {
    ...db.siteSettings,
    ...partial,
  };
  saveDb(db);
  return db.siteSettings;
}

// -------------------------------------------------------------
// AUDIT LOGS
// -------------------------------------------------------------
export async function addAuditLog(entry: Omit<AuditLog, 'id' | 'createdAt'>): Promise<AuditLog> {
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
  const db = getDb();
  return [...db.auditLogs].slice(0, 100);
}

// -------------------------------------------------------------
// PUSH SUBSCRIPTIONS
// -------------------------------------------------------------
export async function addPushSubscription(sub: {
  endpoint: string;
  keys: { p256dh: string; auth: string };
  adminId?: string;
}): Promise<void> {
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
  const db = getDb();
  return db.pushSubscriptions;
}
