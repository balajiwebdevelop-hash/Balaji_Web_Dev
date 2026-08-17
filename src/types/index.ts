export type UnitType =
  | 'sq ft'
  | 'sq m'
  | 'sheet'
  | 'piece'
  | 'box'
  | 'meter'
  | 'running foot'
  | 'roll'
  | 'set'
  | 'unit';

export type PurchaseMode = 'BUY_NOW' | 'REQUEST_QUOTE' | 'BOTH' | 'UNAVAILABLE';

export interface ProductVariant {
  id: string;
  productId: string;
  sku: string;
  name: string;
  color?: string;
  finish?: string;
  thickness?: string;
  size?: string;
  priceModifier: number; // e.g. +150
  stock: number;
  imageUrl?: string;
  createdAt?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  brand: string;
  categoryId: string;
  categoryName?: string;
  categorySlug?: string;
  subcategory?: string;
  description: string;
  price: number;
  salePrice?: number;
  unit: UnitType;
  moq: number; // Minimum Order Quantity
  stock: number;
  purchaseMode: PurchaseMode;
  leadTime: string; // e.g. "3-5 business days" or "Made to order (2-3 weeks)"
  dimensions?: string;
  thickness?: string;
  material?: string;
  finish?: string;
  color?: string;
  images: string[];
  variants?: ProductVariant[];
  isFeatured: boolean;
  isNew: boolean;
  isBestseller: boolean;
  published: boolean;
  tags: string[];
  specifications: Record<string, string>;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  parentId?: string | null;
  sortOrder: number;
  isActive: boolean;
  productCount?: number;
  createdAt: string;
  updatedAt: string;
}

export type ProjectType =
  | 'Residential Interiors'
  | 'Architecture & Villa'
  | 'Commercial & Studio'
  | 'Hospitality & Luxury Dining'
  | 'Penthouse & Estate'
  | 'Custom Spatial Design';

export interface ProjectMaterialRef {
  materialId?: string;
  materialName: string;
  category: string;
  imageUrl?: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  location: string;
  year: string;
  projectType: ProjectType;
  area: string; // e.g. "6,500 sq ft"
  shortDescription: string;
  description: string;
  heroImage: string;
  gallery: string[];
  designApproach: string;
  materialsUsed: ProjectMaterialRef[];
  beforeAfter?: {
    beforeImage?: string;
    afterImage?: string;
    description?: string;
  };
  isPublished: boolean;
  isFeatured: boolean;
  sortOrder: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  imageUrl: string;
  deliverables: string[];
  sortOrder: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Customer {
  id: string;
  email: string;
  phone: string;
  fullName: string;
  isGuest: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  id: string;
  customerId?: string;
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  isDefault?: boolean;
}

export type OrderStatus =
  | 'Pending'
  | 'Confirmed'
  | 'Processing'
  | 'Packed'
  | 'Shipped'
  | 'Delivered'
  | 'Cancelled';

export type PaymentStatus =
  | 'Pending'
  | 'Submitted'
  | 'Paid'
  | 'Failed'
  | 'Refunded';

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  variantId?: string;
  productName: string;
  productSku: string;
  unit: UnitType;
  unitPrice: number;
  quantity: number;
  subtotal: number;
  imageUrl?: string;
  selectedColor?: string;
  selectedFinish?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: Address;
  billingAddress?: Address;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shippingFee: number;
  discount: number;
  totalAmount: number;
  orderStatus: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export type QuoteStatus =
  | 'Pending'
  | 'Under_Review'
  | 'Quotation_Sent'
  | 'Approved'
  | 'Rejected'
  | 'Converted_To_Order';

export interface QuoteItem {
  id: string;
  quoteId: string;
  productId?: string;
  productName: string;
  dimensions?: string;
  quantity: number;
  unit: UnitType;
  estimatedUnitPrice?: number;
  notes?: string;
}

export interface Quote {
  id: string;
  quoteNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  projectType: string;
  projectLocation: string;
  estimatedTimeline: string;
  budgetRange: string;
  notes: string;
  items: QuoteItem[];
  status: QuoteStatus;
  totalQuotedAmount?: number;
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  source: string; // e.g. "Contact Page", "Project Case Study", "Footer"
  status: 'New' | 'Read' | 'Followed_Up' | 'Archived';
  createdAt: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'super_admin' | 'editor' | 'viewer';
  mustChangePassword: boolean;
  lastLoginAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SiteSettings {
  brandName: string;
  tagline: string;
  logoUrl?: string;
  contactEmail: string;
  contactPhone: string;
  studioAddress: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  currency: string;
  currencySymbol: string;
  taxRatePercent: number;
  standardShippingFee: number;
  freeShippingThreshold: number;
  socialInstagram: string;
  socialPinterest: string;
  socialLinkedin: string;
  announcementBanner?: {
    enabled: boolean;
    text: string;
    linkUrl?: string;
  };
}

export interface AuditLog {
  id: string;
  adminId: string;
  adminEmail: string;
  action: string;
  entity: string;
  entityId?: string;
  details?: Record<string, any>;
  ipAddress?: string;
  createdAt: string;
}

export interface CartItem {
  productId: string;
  variantId?: string;
  product: Product;
  variant?: ProductVariant;
  quantity: number;
  unitPrice: number;
}
