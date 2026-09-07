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
// SUPABASE ROW MAPPERS (Database snake_case -> Domain camelCase)
// =============================================================

export function mapSupabaseProduct(
  row: any,
  categoryMap?: Map<string, { name: string; slug: string }>
): Product {
  const cat = categoryMap?.get(row.category_id);
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    sku: row.sku || '',
    brand: row.brand || 'Balaji Architect & Interiors',
    categoryId: row.category_id || '',
    categoryName: cat?.name || row.categories?.name,
    categorySlug: cat?.slug || row.categories?.slug,
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
    images: Array.isArray(row.images) ? row.images : [],
    variants: Array.isArray(row.variants) ? row.variants : [],
    isFeatured: Boolean(row.is_featured),
    isNew: Boolean(row.is_new),
    isBestseller: Boolean(row.is_bestseller),
    published: Boolean(row.published !== false),
    tags: Array.isArray(row.tags) ? row.tags : [],
    specifications: row.specifications || {},
    createdAt: row.created_at || new Date().toISOString(),
    updatedAt: row.updated_at || new Date().toISOString(),
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
    isActive: Boolean(row.is_active !== false),
    createdAt: row.created_at || new Date().toISOString(),
    updatedAt: row.updated_at || new Date().toISOString(),
  };
}

export function mapSupabaseProject(row: any): Project {
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
    gallery: Array.isArray(row.gallery) ? row.gallery : [],
    designApproach: row.design_approach || '',
    materialsUsed: Array.isArray(row.materials_used) ? row.materials_used : [],
    isFeatured: Boolean(row.is_featured),
    isPublished: Boolean(row.is_published !== false),
    sortOrder: Number(row.sort_order || 0),
    tags: Array.isArray(row.tags) ? row.tags : [],
    createdAt: row.created_at || new Date().toISOString(),
    updatedAt: row.updated_at || new Date().toISOString(),
  };
}

export function mapSupabaseService(row: any): Service {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    shortDesc: row.short_desc || '',
    fullDesc: row.full_desc || '',
    iconName: row.icon_name || 'Home',
    imageUrl: row.image_url || '',
    deliverables: Array.isArray(row.deliverables) ? row.deliverables : [],
    sortOrder: Number(row.sort_order || 0),
    isPublished: Boolean(row.is_published !== false),
    createdAt: row.created_at || new Date().toISOString(),
    updatedAt: row.updated_at || new Date().toISOString(),
  };
}

export function mapSupabaseOrder(row: any): Order {
  const items = (row.items || row.order_items || []).map((it: any) => ({
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

  return {
    id: row.id,
    orderNumber: row.order_number,
    customerId: row.customer_id,
    customerName: row.customer_name,
    customerEmail: row.customer_email,
    customerPhone: row.customer_phone,
    shippingAddress: row.shipping_address,
    billingAddress: row.billing_address || row.shipping_address,
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
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function mapSupabaseQuote(row: any): Quote {
  const items = (row.items || row.quote_items || []).map((it: any) => ({
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
    createdAt: row.created_at,
    updatedAt: row.updated_at,
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
    createdAt: row.created_at,
  };
}

export function mapAdminUser(data: any): AdminUser & { passwordHash: string } {
  return {
    id: data.id,
    email: data.email,
    name: data.name,
    role: data.role || 'employee',
    status: data.status || 'active',
    mustChangePassword: data.must_change_password !== false,
    passwordHash: data.password_hash || data.passwordHash || '',
    lastLoginAt: data.last_login_at || data.lastLoginAt,
    createdAt: data.created_at || data.createdAt || new Date().toISOString(),
    updatedAt: data.updated_at || data.updatedAt || new Date().toISOString(),
  };
}
