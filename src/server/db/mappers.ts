import {
  Product,
  Category,
  Project,
  Service,
  Order,
  Quote,
  Enquiry,
  AdminUser,
} from '@/types';

// =============================================================
// ROW MAPPERS (Database snake_case -> Domain camelCase)
// Works seamlessly for both Hostinger MySQL and Supabase
// =============================================================

function safeJSON<T = any>(val: any, fallback: T): T {
  if (val === null || val === undefined) return fallback;
  if (typeof val === 'string') {
    try {
      return JSON.parse(val);
    } catch {
      try {
        // Strip invalid MySQL escape slashes like \% or \'
        const sanitized = val.replace(/\\([^"\\/bfnrtu])/g, '$1');
        return JSON.parse(sanitized);
      } catch {
        return fallback;
      }
    }
  }
  return val as T;
}

function toISOString(val: any, fallback?: string): string {
  if (val instanceof Date) return val.toISOString();
  if (typeof val === 'string' && val.length > 0) return val;
  return fallback || new Date().toISOString();
}

export function mapSupabaseProduct(
  row: any,
  categoryMap?: Map<string, { name: string; slug: string }>
): Product {
  const cat = categoryMap?.get(row.category_id);
  const images = safeJSON(row.images, []);
  const variants = safeJSON(row.variants, []);
  const tags = safeJSON(row.tags, []);
  const specifications = safeJSON(row.specifications, {});

  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    sku: row.sku || '',
    brand: row.brand || 'Balaji Architect & Interiors',
    categoryId: row.category_id || '',
    categoryName: cat?.name || row.category_name || row.categories?.name,
    categorySlug: cat?.slug || row.category_slug || row.categories?.slug,
    subcategory: row.subcategory || '',
    description: row.description || '',
    price: Number(row.price || 0),
    salePrice: row.sale_price !== null && row.sale_price !== undefined ? Number(row.sale_price) : undefined,
    unit: row.unit || 'sq ft',
    moq: Number(row.moq || 1),
    stock: Number(row.stock || 0),
    purchaseMode: row.purchase_mode || 'BOTH',
    leadTime: row.lead_time || '2-3 Weeks',
    dimensions: row.dimensions || '',
    thickness: row.thickness || '',
    material: row.material || '',
    finish: row.finish || '',
    color: row.color || '',
    images: Array.isArray(images) ? images : [],
    variants: Array.isArray(variants) ? variants : [],
    isFeatured: Boolean(row.is_featured),
    isNew: Boolean(row.is_new),
    isBestseller: Boolean(row.is_bestseller),
    published: Boolean(row.published !== false && row.published !== 0),
    tags: Array.isArray(tags) ? tags : [],
    specifications: (typeof specifications === 'object' && specifications !== null ? specifications : {}) as Record<string, string>,
    createdAt: toISOString(row.created_at),
    updatedAt: toISOString(row.updated_at),
  };
}

export function mapSupabaseCategory(row: any): Category {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description || '',
    imageUrl: row.image_url || '',
    sortOrder: Number(row.sort_order || 0),
    isActive: Boolean(row.is_active !== false && row.is_active !== 0),
    createdAt: toISOString(row.created_at),
    updatedAt: toISOString(row.updated_at),
  };
}

export function mapSupabaseProject(row: any): Project {
  const gallery = safeJSON(row.gallery, []);
  const materialsUsed = safeJSON(row.materials_used, []);
  const tags = safeJSON(row.tags, []);

  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    location: row.location || '',
    year: row.year || String(new Date().getFullYear()),
    area: row.area || '',
    projectType: row.project_type || 'Residential Interiors',
    shortDescription: row.short_description || '',
    description: row.description || '',
    heroImage: row.hero_image || '',
    gallery: Array.isArray(gallery) ? gallery : [],
    designApproach: row.design_approach || '',
    materialsUsed: Array.isArray(materialsUsed) ? materialsUsed : [],
    isFeatured: Boolean(row.is_featured),
    isPublished: Boolean(row.is_published !== false && row.is_published !== 0),
    sortOrder: Number(row.sort_order || 0),
    tags: Array.isArray(tags) ? tags : [],
    createdAt: toISOString(row.created_at),
    updatedAt: toISOString(row.updated_at),
  };
}

export function mapSupabaseService(row: any): Service {
  const deliverables = safeJSON(row.deliverables, []);

  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    shortDesc: row.short_desc || '',
    fullDesc: row.full_desc || '',
    iconName: row.icon_name || 'Home',
    imageUrl: row.image_url || '',
    deliverables: Array.isArray(deliverables) ? deliverables : [],
    sortOrder: Number(row.sort_order || 0),
    isPublished: Boolean(row.is_published !== false && row.is_published !== 0),
    createdAt: toISOString(row.created_at),
    updatedAt: toISOString(row.updated_at),
  };
}

export function mapSupabaseOrder(row: any): Order {
  const rawItems = row.items || row.order_items || [];
  const parsedItems = safeJSON(rawItems, []);
  const items = (Array.isArray(parsedItems) ? parsedItems : []).map((it: any) => ({
    id: it.id,
    orderId: it.order_id || row.id,
    productId: it.product_id || '',
    variantId: it.variant_id,
    productName: it.product_name,
    productSku: it.product_sku || '',
    unit: it.unit || 'sq ft',
    unitPrice: Number(it.unit_price || 0),
    quantity: Number(it.quantity || 1),
    subtotal: Number(it.subtotal || 0),
    imageUrl: it.image_url || '',
    selectedColor: it.selected_color,
    selectedFinish: it.selected_finish,
  }));

  const shippingAddress: any = safeJSON(row.shipping_address, row.shipping_address || {});
  const billingAddress: any = row.billing_address ? safeJSON(row.billing_address, row.billing_address) : shippingAddress;

  return {
    id: row.id,
    orderNumber: row.order_number,
    customerId: row.customer_id,
    customerName: row.customer_name,
    customerEmail: row.customer_email,
    customerPhone: row.customer_phone,
    shippingAddress,
    billingAddress,
    items,
    subtotal: Number(row.subtotal || 0),
    tax: Number(row.tax || 0),
    shippingFee: Number(row.shipping_fee || 0),
    discount: Number(row.discount || 0),
    totalAmount: Number(row.total_amount || 0),
    orderStatus: row.order_status,
    paymentStatus: row.payment_status,
    paymentMethod: row.payment_method || 'Balaji QR Payment (Balaji PG)',
    transactionId: row.transaction_id,
    utrNumber: row.utr_number,
    notes: row.notes,
    idempotencyKey: row.idempotency_key,
    createdAt: toISOString(row.created_at),
    updatedAt: toISOString(row.updated_at),
  };
}

export function mapSupabaseQuote(row: any): Quote {
  const rawItems = row.items || row.quote_items || [];
  const parsedItems = safeJSON(rawItems, []);
  const items = (Array.isArray(parsedItems) ? parsedItems : []).map((it: any) => ({
    id: it.id,
    quoteId: it.quote_id || row.id,
    productId: it.product_id,
    productName: it.product_name,
    dimensions: it.dimensions,
    quantity: Number(it.quantity || 1),
    unit: it.unit || 'sq ft',
    estimatedUnitPrice: it.estimated_unit_price ? Number(it.estimated_unit_price) : undefined,
    notes: it.notes,
  }));

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
    items,
    status: row.status || 'Pending',
    totalQuotedAmount: row.total_quoted_amount ? Number(row.total_quoted_amount) : undefined,
    adminNotes: row.admin_notes,
    createdAt: toISOString(row.created_at),
    updatedAt: toISOString(row.updated_at),
  };
}

export function mapSupabaseEnquiry(row: any): Enquiry {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    subject: row.subject,
    message: row.message,
    source: row.source || 'Contact Form',
    status: row.status || 'New',
    createdAt: toISOString(row.created_at),
  };
}

export function mapAdminUser(data: any): AdminUser & { passwordHash: string } {
  return {
    id: data.id,
    email: data.email,
    name: data.name,
    role: data.role || 'employee',
    status: data.status || 'active',
    mustChangePassword: Boolean(data.must_change_password !== false && data.must_change_password !== 0),
    passwordHash: data.password_hash || data.passwordHash || '',
    lastLoginAt: data.last_login_at ? toISOString(data.last_login_at) : (data.lastLoginAt || undefined),
    createdAt: toISOString(data.created_at || data.createdAt),
    updatedAt: toISOString(data.updated_at || data.updatedAt),
  };
}
