import fs from 'fs';
import path from 'path';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import {
  Product,
  Category,
  Project,
  Service,
  Order,
  Quote,
  Enquiry,
  SiteSettings,
  AuditLog,
  AdminUser,
} from '@/types';
import {
  initialCategories,
  initialProducts,
  initialProjects,
  initialServices,
  initialSiteSettings,
  getInitialAdminSeed,
} from '@/lib/seedData';

// =============================================================
// DATABASE STATE & FIXTURE INTERFACES (DEVELOPMENT / TEST ONLY)
// =============================================================

export interface DatabaseState {
  admins: (AdminUser & { passwordHash: string })[];
  categories: Category[];
  products: Product[];
  projects: Project[];
  services: Service[];
  orders: Order[];
  quotes: Quote[];
  enquiries: Enquiry[];
  siteSettings: SiteSettings;
  pushSubscriptions: any[];
  auditLogs: AuditLog[];
  customers?: any[];
}

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

let dbCache: DatabaseState | null = null;

// =============================================================
// ENVIRONMENT DETECTION & AUTHORITATIVE CONFIGURATION
// =============================================================

export function isProduction(): boolean {
  return process.env.NODE_ENV === 'production' && process.env.NEXT_PHASE !== 'phase-production-build';
}

export function isSupabaseConfigured(): boolean {
  if (process.env.NODE_ENV === 'test') {
    return false;
  }
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return Boolean(url && key);
}

export function getServiceSupabase(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '';
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

  if (!url || !key) {
    throw new Error(
      'Critical Database Error: Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.'
    );
  }

  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

/**
 * Enforces that in production environments, the database MUST be Supabase.
 * Prevents silent fallback to ephemeral or local files in production.
 */
export function ensureAuthoritativeDb(): void {
  if (isProduction() && !isSupabaseConfigured()) {
    throw new Error(
      'Fatal Production Configuration Error: Supabase connection is required in production mode.'
    );
  }
}

export function isUUID(str: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(str);
}

// =============================================================
// HIGH-PERFORMANCE IN-MEMORY CACHE (WITH PURGE CONTROLS)
// =============================================================

export const CACHE_TTL_MS = 60 * 1000; // 60s TTL

export interface MemoryCacheEntry<T> {
  data: T;
  timestamp: number;
}

export const memoryCache = {
  settings: null as MemoryCacheEntry<SiteSettings> | null,
  categories: null as MemoryCacheEntry<Category[]> | null,
  categoriesAdmin: null as MemoryCacheEntry<Category[]> | null,
  products: new Map<string, MemoryCacheEntry<Product[]>>(),
  productByIdOrSlug: new Map<string, MemoryCacheEntry<Product | null>>(),
  projects: new Map<string, MemoryCacheEntry<Project[]>>(),
  projectByIdOrSlug: new Map<string, MemoryCacheEntry<Project | null>>(),
  services: new Map<string, MemoryCacheEntry<Service[]>>(),
  dashboardAnalytics: new Map<string, MemoryCacheEntry<any>>(),
};

export function invalidateMemoryCache(
  scope: 'all' | 'products' | 'categories' | 'projects' | 'services' | 'settings' | 'orders' | 'quotes' | 'dashboard' = 'all'
) {
  if (scope === 'all' || scope === 'settings') {
    memoryCache.settings = null;
  }
  if (scope === 'all' || scope === 'categories') {
    memoryCache.categories = null;
    memoryCache.categoriesAdmin = null;
  }
  if (scope === 'all' || scope === 'products') {
    memoryCache.products.clear();
    memoryCache.productByIdOrSlug.clear();
    memoryCache.categories = null;
    memoryCache.categoriesAdmin = null;
  }
  if (scope === 'all' || scope === 'projects') {
    memoryCache.projects.clear();
    memoryCache.projectByIdOrSlug.clear();
  }
  if (scope === 'all' || scope === 'services') {
    memoryCache.services.clear();
  }
  if (scope === 'all' || scope === 'orders' || scope === 'quotes' || scope === 'dashboard') {
    memoryCache.dashboardAnalytics.clear();
  }
}

// =============================================================
// DEVELOPMENT / TEST LOCAL FIXTURE STORE
// =============================================================

function ensureDbFile(): DatabaseState {
  if (isProduction()) {
    return {
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
  }

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
    console.error('Error reading local db.json fixture, reinitializing...', err);
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

export function resetDbCache(): void {
  dbCache = null;
}

export function getDb(): DatabaseState {
  if (dbCache) return dbCache;
  return ensureDbFile();
}

export function saveDb(state: DatabaseState): void {
  if (isProduction()) {
    throw new Error('Critical Safety Violation: Attempted to write to local db.json in production mode.');
  }
  dbCache = state;
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(state, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to write to local db.json fixture:', err);
  }
}
