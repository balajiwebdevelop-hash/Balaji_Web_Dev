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
  if (supabaseReachability.lastChecked > 0 && !supabaseReachability.available) {
    return false;
  }
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return Boolean(url && key);
}

let supabaseReachability: { available: boolean; lastChecked: number } = { available: false, lastChecked: 0 };

export async function isSupabaseAvailable(): Promise<boolean> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return false;
  if (process.env.NODE_ENV === 'test') return false;

  const now = Date.now();
  if (now - supabaseReachability.lastChecked < 30000) {
    return supabaseReachability.available;
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 600);
    const res = await fetch(url, { method: 'HEAD', signal: controller.signal }).catch(() => null);
    clearTimeout(timeout);
    const available = !!res;
    supabaseReachability = { available, lastChecked: now };
    return available;
  } catch {
    supabaseReachability = { available: false, lastChecked: now };
    return false;
  }
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
    global: {
      fetch: (input, init) => {
        return fetch(input, {
          ...init,
          signal: init?.signal || AbortSignal.timeout(3000),
        });
      },
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
  if (dbCache) return dbCache;

  if (fs.existsSync(DB_FILE)) {
    try {
      const data = fs.readFileSync(DB_FILE, 'utf-8');
      const parsed = JSON.parse(data);
      dbCache = parsed;
      return parsed;
    } catch (err) {
      console.error('Error reading local db.json fixture:', err);
    }
  }

  const initialState: DatabaseState = {
    admins: [
      {
        id: '2bd20632-00dd-4f48-84b4-6e526543c8d8',
        email: 'vicks@balaji.com',
        passwordHash:
          '3903a96046ec99bc94100f812cfee1b2:e72fa457ba6ab3be8353defbdf61b4c243714f27acb2cbc20fd2232dc36e184bd6564345d66103f433154a166821c36b5e0a0b162aeddf378182678a830c7f5b',
        name: 'Vikas Sir (Principal Architect)',
        role: 'super_admin',
        status: 'active',
        mustChangePassword: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
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

  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(initialState, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to write local db.json fixture:', err);
  }

  dbCache = initialState;
  return initialState;
}

export function resetDbCache(): void {
  dbCache = null;
}

export function getDb(): DatabaseState {
  if (dbCache) return dbCache;
  return ensureDbFile();
}

export function saveDb(state: DatabaseState): void {
  dbCache = state;
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(state, null, 2), 'utf-8');
  } catch (err) {
    console.warn('Notice writing to local db.json fixture:', err);
  }
}
