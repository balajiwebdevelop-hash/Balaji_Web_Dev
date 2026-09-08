import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';
import { getAdminByEmail } from './db';
import { AdminUser, AdminRole } from '@/types';
import { Permission, hasPermission, isOwner } from '@/server/auth/rbac';
import {
  signSessionToken,
  verifySessionToken,
  revokeAllSessionsForAdmin,
  rotateSessionToken,
  SessionTokenPayload,
} from '@/server/auth/tokens';

export {
  signSessionToken,
  verifySessionToken,
  revokeAllSessionsForAdmin,
  rotateSessionToken,
};

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('Critical Security Error: Missing JWT_SECRET environment variable.');
    }
    return 'development_only_jwt_secret_do_not_use_in_production_key';
  }
  return secret;
}

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
 * Verifies a plaintext password against a stored "salt:hash" string using timing-safe comparison.
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

/**
 * Strong password policy validator:
 * Minimum 8 characters, requires at least one letter and one number or special symbol.
 */
export function isStrongPassword(password: string): { valid: boolean; reason?: string } {
  if (!password || typeof password !== 'string') {
    return { valid: false, reason: 'Password is required' };
  }
  if (password.length < 8) {
    return { valid: false, reason: 'Password must be at least 8 characters long' };
  }
  if (!/[a-zA-Z]/.test(password)) {
    return { valid: false, reason: 'Password must contain at least one letter' };
  }
  if (!/[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    return { valid: false, reason: 'Password must contain at least one number or symbol' };
  }
  return { valid: true };
}

/**
 * Generates a cryptographically random, secure temporary password
 */
export function generateSecureTemporaryPassword(prefix = 'Balaji'): string {
  const randomChars = crypto.randomBytes(6).toString('base64').replace(/[^a-zA-Z0-9]/g, 'X');
  return `${prefix}#${randomChars}!`;
}

export interface AdminTokenPayload {
  id: string;
  email: string;
  name: string;
  role: string;
  mustChangePassword: boolean;
}

/**
 * Signs an admin JWT session token (backward compatibility wrapper around signSessionToken)
 */
export function signAdminToken(payload: AdminTokenPayload): string {
  return signSessionToken({
    id: payload.id,
    email: payload.email,
    name: payload.name,
    role: payload.role as AdminRole,
    mustChangePassword: payload.mustChangePassword,
  });
}

/**
 * Verifies and decodes an admin JWT token, supporting all valid admin roles
 */
export function verifyAdminToken(token: string): AdminTokenPayload | null {
  const session = verifySessionToken(token);
  if (!session) return null;

  const validRoles: AdminRole[] = ['owner', 'super_admin', 'employee', 'editor', 'viewer'];
  if (validRoles.includes(session.role)) {
    return {
      id: session.id,
      email: session.email,
      name: session.name,
      role: session.role,
      mustChangePassword: session.mustChangePassword,
    };
  }
  return null;
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
 * Enforces active admin session (any authorized admin role)
 */
export async function requireAuthenticatedAdmin(
  req: NextRequest
): Promise<{ admin: AdminUser } | { response: NextResponse }> {
  const admin = await getAuthenticatedAdmin(req);
  if (!admin) {
    return {
      response: NextResponse.json(
        { success: false, error: 'Authentication required. Please sign in to the studio portal.', code: 'UNAUTHORIZED' },
        { status: 401 }
      ),
    };
  }
  return { admin };
}

/**
 * Enforces granular server-side RBAC permission
 */
export async function requirePermission(
  req: NextRequest,
  permission: Permission
): Promise<{ admin: AdminUser } | { response: NextResponse }> {
  const auth = await requireAuthenticatedAdmin(req);
  if ('response' in auth) return auth;

  const allowed = hasPermission(auth.admin.role, permission);
  if (!allowed) {
    return {
      response: NextResponse.json(
        {
          success: false,
          error: `Access Denied: Your account role (${auth.admin.role}) lacks the required '${permission}' permission.`,
          code: 'FORBIDDEN',
        },
        { status: 403 }
      ),
    };
  }

  return { admin: auth.admin };
}

/**
 * Enforces Owner / Super Admin access only
 */
export async function requireOwner(
  req: NextRequest
): Promise<{ admin: AdminUser } | { response: NextResponse }> {
  const auth = await requireAuthenticatedAdmin(req);
  if ('response' in auth) return auth;

  if (!isOwner(auth.admin)) {
    return {
      response: NextResponse.json(
        { success: false, error: 'Access Denied: Only studio owners can perform this action.', code: 'FORBIDDEN' },
        { status: 403 }
      ),
    };
  }

  return { admin: auth.admin };
}

/**
 * Authorizes Owner, Super Admin, Employee, or Editor roles (blocks read-only viewers)
 */
export async function requireOwnerOrEmployee(
  req: NextRequest
): Promise<{ admin: AdminUser } | { response: NextResponse }> {
  const auth = await requireAuthenticatedAdmin(req);
  if ('response' in auth) return auth;

  if (auth.admin.role === 'viewer') {
    return {
      response: NextResponse.json(
        { success: false, error: 'Access Denied: Read-only accounts cannot perform mutations.', code: 'FORBIDDEN' },
        { status: 403 }
      ),
    };
  }

  return { admin: auth.admin };
}

export async function requireRole(
  req: NextRequest,
  allowedRoles: AdminRole[]
): Promise<{ admin: AdminUser } | { response: NextResponse }> {
  const auth = await requireAuthenticatedAdmin(req);
  if ('response' in auth) return auth;

  if (!allowedRoles.includes(auth.admin.role)) {
    return {
      response: NextResponse.json(
        { success: false, error: 'Access Denied: Insufficient permissions.', code: 'FORBIDDEN' },
        { status: 403 }
      ),
    };
  }

  return { admin: auth.admin };
}

// Customer Authentication Utilities
export function getCustomerTokenFromRequest(req: NextRequest): string | null {
  const cookieToken = req.cookies.get('balaji_customer_token')?.value || req.cookies.get('balaji_token')?.value;
  const authHeader = req.headers.get('authorization')?.replace('Bearer ', '');
  return cookieToken || authHeader || null;
}

export function signCustomerToken(payload: { id: string; email: string; name: string; role: 'customer'; provider?: string }): string {
  return jwt.sign(payload, getJwtSecret(), { expiresIn: '30d' });
}

export function verifyCustomerToken(token: string): { id: string; email: string; name: string; role: string; provider?: string } | null {
  try {
    const decoded = jwt.verify(token, getJwtSecret()) as any;
    if (decoded && decoded.role === 'customer') {
      return decoded;
    }
    return null;
  } catch {
    return null;
  }
}
