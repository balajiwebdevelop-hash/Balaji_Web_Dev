import fs from 'fs';
import path from 'path';
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
import { DatabaseUnavailableError } from '../errors';
import { isMySQLConfigured, getMySQLPool } from './mysql';

export { isMySQLConfigured, getMySQLPool };

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

/**
 * Enforces that in production environments, Hostinger MySQL MUST be configured.
 * Prevents silent fallback to ephemeral or local files in production.
 */
export function ensureAuthoritativeDb(): void {
  if (isProduction() && !isMySQLConfigured()) {
    throw new Error(
      'Fatal Production Configuration Error: Primary database connection (Hostinger MySQL) is required in production mode.'
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
  if (isProduction()) {
    throw new DatabaseUnavailableError(
      'Critical Safety Violation: Attempted to write to local db.json in production mode. Primary database connection is required.'
    );
  }
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
