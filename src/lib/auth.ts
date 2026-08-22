import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';
import { getAdminByEmail } from './db';
import { AdminUser } from '@/types';

const JWT_SECRET = process.env.JWT_SECRET || 'balaji_atelier_secure_jwt_secret_production_2026_key';
const SALT_ROUNDS = 10000;
const KEY_LEN = 64;
const DIGEST = 'sha512';

/**
 * Hashes a plaintext password using PBKDF2 with a random cryptographic salt.
 * Returns format: "salt:hash"
 */
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const derivedKey = crypto.pbkdf2Sync(password, salt, SALT_ROUNDS, KEY_LEN, DIGEST);
  return `${salt}:${derivedKey.toString('hex')}`;
}

/**
 * Verifies a plaintext password against a stored "salt:hash" string.
 */
export function verifyPassword(password: string, storedHash: string): boolean {
  try {
    const [salt, key] = storedHash.split(':');
    if (!salt || !key) return false;
    const derivedKey = crypto.pbkdf2Sync(password, salt, SALT_ROUNDS, KEY_LEN, DIGEST);
    return crypto.timingSafeEqual(Buffer.from(key, 'hex'), derivedKey);
  } catch {
    return false;
  }
}

export interface AdminTokenPayload {
  id: string;
  email: string;
  name: string;
  role: string;
  mustChangePassword: boolean;
}

/**
 * Signs an admin JWT session token
 */
export function signAdminToken(payload: AdminTokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

/**
 * Verifies and decodes an admin JWT token
 */
export function verifyAdminToken(token: string): AdminTokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AdminTokenPayload;
  } catch {
    return null;
  }
}

/**
 * Extracts session token from cookie or Authorization header
 */
export function getAdminTokenFromRequest(req: NextRequest): string | null {
  const cookieToken = req.cookies.get('balaji_admin_session')?.value;
  const authHeader = req.headers.get('authorization')?.replace('Bearer ', '');
  return cookieToken || authHeader || null;
}

/**
 * Authoritatively retrieves authenticated active admin from database
 */
export async function getAuthenticatedAdmin(req: NextRequest): Promise<AdminUser | null> {
  const token = getAdminTokenFromRequest(req);
  if (!token) return null;
  const payload = verifyAdminToken(token);
  if (!payload) return null;

  try {
    const admin = await getAdminByEmail(payload.email);
    if (!admin) return null;
    if (admin.status === 'disabled') return null;

    const { passwordHash: _, ...safeAdmin } = admin;
    return safeAdmin;
  } catch {
    return null;
  }
}

/**
 * Enforces active admin session (Owner or Employee)
 */
export async function requireAuthenticatedAdmin(
  req: NextRequest
): Promise<{ admin: AdminUser } | { response: NextResponse }> {
  const token = getAdminTokenFromRequest(req);
  if (!token) {
    return {
      response: NextResponse.json(
        { success: false, error: 'Authentication required. Please sign in to the studio portal.' },
        { status: 401 }
      ),
    };
  }

  const payload = verifyAdminToken(token);
  if (!payload) {
    return {
      response: NextResponse.json(
        { success: false, error: 'Invalid or expired session. Please sign in again.' },
        { status: 401 }
      ),
    };
  }

  try {
    const admin = await getAdminByEmail(payload.email);
    if (!admin) {
      return {
        response: NextResponse.json(
          { success: false, error: 'Admin account not found.' },
          { status: 401 }
        ),
      };
    }

    if (admin.status === 'disabled') {
      return {
        response: NextResponse.json(
          { success: false, error: 'Your account has been disabled. Please contact the studio owner.' },
          { status: 403 }
        ),
      };
    }

    const { passwordHash: _, ...safeAdmin } = admin;
    return { admin: safeAdmin };
  } catch (err: any) {
    return {
      response: NextResponse.json(
        { success: false, error: err.message || 'Authorization failed' },
        { status: 500 }
      ),
    };
  }
}

/**
 * Enforces OWNER-ONLY privileges (403 for employee, 401 for unauthenticated)
 */
export async function requireOwner(
  req: NextRequest
): Promise<{ admin: AdminUser } | { response: NextResponse }> {
  const authResult = await requireAuthenticatedAdmin(req);
  if ('response' in authResult) {
    return authResult;
  }

  const { admin } = authResult;
  if (admin.role !== 'owner' && admin.role !== 'super_admin') {
    return {
      response: NextResponse.json(
        { success: false, error: 'Forbidden: Studio Owner privileges required.' },
        { status: 403 }
      ),
    };
  }

  return { admin };
}

/**
 * Enforces Owner or Employee access for operational features
 */
export async function requireOwnerOrEmployee(
  req: NextRequest
): Promise<{ admin: AdminUser } | { response: NextResponse }> {
  return requireAuthenticatedAdmin(req);
}

/**
 * Enforces active admin verification
 */
export async function requireActiveAdmin(
  req: NextRequest
): Promise<{ admin: AdminUser } | { response: NextResponse }> {
  return requireAuthenticatedAdmin(req);
}
