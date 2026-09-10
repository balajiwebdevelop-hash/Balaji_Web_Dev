import mysql from 'mysql2/promise';

/**
 * BALAJI ARCHITECT & INTERIORS — HOSTINGER MYSQL CLIENT & CONNECTION POOL
 *
 * Dedicated database pool for Hostinger phpMyAdmin MySQL databases.
 * Provides resilient pooling, automatic keepalive, parameterized querying,
 * and seamless fallback capability.
 */

let pool: mysql.Pool | null = null;

let mysqlReachability: { available: boolean; lastChecked: number; latencyMs: number; error?: string } = {
  available: false,
  lastChecked: 0,
  latencyMs: 0,
};

export function isMySQLConfigured(): boolean {
  if (process.env.NODE_ENV === 'test') {
    return false;
  }
  const user = process.env.DB_USER;
  const host = process.env.DB_HOST;
  const db = process.env.DB_NAME;
  const password = process.env.DB_PASSWORD;

  // Active if host, user, database, and non-empty password are provided
  if (user && host && db && password && password.trim().length > 0) {
    return true;
  }

  // Also check DATABASE_URL with non-empty password
  if (process.env.DATABASE_URL && process.env.DATABASE_URL.startsWith('mysql://')) {
    try {
      const parsed = new URL(process.env.DATABASE_URL);
      if (parsed.password && parsed.password.trim().length > 0) {
        return true;
      }
    } catch {
      // Invalid URL format
    }
  }

  return false;
}

function resilientTypeCast(field: any, next: () => any) {
  if (field.type === 'JSON') {
    const raw = field.string();
    if (raw === null || raw === undefined) return null;
    try {
      return JSON.parse(raw);
    } catch {
      try {
        const sanitized = raw.replace(/\\([^"\\/bfnrtu])/g, '$1');
        return JSON.parse(sanitized);
      } catch {
        return raw;
      }
    }
  }
  return next();
}

export function getMySQLPool(): mysql.Pool {
  if (pool) return pool;

  if (process.env.DATABASE_URL && process.env.DATABASE_URL.startsWith('mysql://')) {
    try {
      const parsed = new URL(process.env.DATABASE_URL);
      if (parsed.password && parsed.password.trim().length > 0) {
        pool = mysql.createPool({
          uri: process.env.DATABASE_URL,
          waitForConnections: true,
          connectionLimit: 10,
          queueLimit: 0,
          connectTimeout: 7000,
          charset: 'utf8mb4',
          typeCast: resilientTypeCast,
        });
        return pool;
      }
    } catch {}
  }

  const host = process.env.DB_HOST || 'localhost';
  const port = Number(process.env.DB_PORT) || 3306;
  const user = process.env.DB_USER || 'u603162798_balaji_arc_db';
  const password = process.env.DB_PASSWORD || '';
  const database = process.env.DB_NAME || 'u603162798_balaji_arc_db';

  pool = mysql.createPool({
    host,
    port,
    user,
    password,
    database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 7000,
    charset: 'utf8mb4',
    typeCast: resilientTypeCast,
  });

  return pool;
}

/**
 * Tests the MySQL connection and measures ping latency.
 * Cached for 15 seconds to avoid unnecessary socket handshakes.
 */
export async function testMySQLConnection(): Promise<{
  success: boolean;
  latencyMs: number;
  error?: string;
}> {
  if (!isMySQLConfigured()) {
    return { success: false, latencyMs: 0, error: 'MySQL not configured or DB_PASSWORD missing' };
  }

  const now = Date.now();
  if (now - mysqlReachability.lastChecked < 15000 && mysqlReachability.lastChecked > 0) {
    return {
      success: mysqlReachability.available,
      latencyMs: mysqlReachability.latencyMs,
      error: mysqlReachability.error,
    };
  }

  const start = Date.now();
  try {
    const p = getMySQLPool();
    const conn = await p.getConnection();
    await conn.ping();
    conn.release();

    const latencyMs = Date.now() - start;
    mysqlReachability = {
      available: true,
      lastChecked: now,
      latencyMs,
    };
    return { success: true, latencyMs };
  } catch (err: any) {
    const latencyMs = Date.now() - start;
    mysqlReachability = {
      available: false,
      lastChecked: now,
      latencyMs,
      error: err.message || 'Failed to connect to MySQL database',
    };
    return { success: false, latencyMs, error: err.message };
  }
}

/**
 * Executes a parameterized SELECT query returning an array of rows.
 */
export async function query<T = any>(sql: string, params: any[] = []): Promise<T[]> {
  const p = getMySQLPool();
  const [rows] = await p.query(sql, params);
  return rows as T[];
}

/**
 * Executes a parameterized SELECT query returning a single row or null.
 */
export async function queryOne<T = any>(sql: string, params: any[] = []): Promise<T | null> {
  const rows = await query<T>(sql, params);
  return rows.length > 0 ? rows[0] : null;
}

/**
 * Executes an INSERT, UPDATE, or DELETE statement.
 */
export async function execute(sql: string, params: any[] = []): Promise<mysql.ResultSetHeader> {
  const p = getMySQLPool();
  const [result] = await p.execute(sql, params);
  return result as mysql.ResultSetHeader;
}

/**
 * Retrieves a direct connection from the MySQL pool for multi-statement atomic transactions.
 */
export async function getConnection(): Promise<mysql.PoolConnection> {
  const p = getMySQLPool();
  return await p.getConnection();
}
