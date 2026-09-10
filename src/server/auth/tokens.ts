import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { AdminRole } from '@/types';

// In-memory revocation tracking: maps adminId -> timestamp of revocation
// Any token issued BEFORE this timestamp is rejected
const revokedBeforeMap = new Map<string, number>();

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      const fallback = process.env.DB_PASSWORD
        ? `balaji_prod_${process.env.DB_PASSWORD}_secret_key_2026`
        : 'balaji_atelier_secure_jwt_secret_production_2026_key';
      console.warn('Warning: Missing JWT_SECRET environment variable. Using resilient server fallback secret.');
      return fallback;
    }
    return 'development_only_jwt_secret_do_not_use_in_production_key';
  }
  return secret;
}

export interface SessionTokenPayload {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
  mustChangePassword: boolean;
  sessionId: string;
  iat?: number;
  exp?: number;
}

/**
 * Signs an authoritative admin session token with cryptographic session ID
 */
export function signSessionToken(data: {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
  mustChangePassword?: boolean;
}): string {
  const sessionId = crypto.randomBytes(16).toString('hex');
  const payload: SessionTokenPayload = {
    id: data.id,
    email: data.email.toLowerCase().trim(),
    name: data.name,
    role: data.role,
    mustChangePassword: Boolean(data.mustChangePassword),
    sessionId,
  };

  return jwt.sign(payload, getJwtSecret(), {
    expiresIn: '7d',
    algorithm: 'HS256',
  });
}

/**
 * Cryptographically verifies and validates session token, checking revocation
 */
export function verifySessionToken(token: string): SessionTokenPayload | null {
  try {
    const decoded = jwt.verify(token, getJwtSecret(), { algorithms: ['HS256'] }) as SessionTokenPayload;
    if (!decoded || !decoded.id || !decoded.email || !decoded.role) {
      return null;
    }

    // Check if session was revoked for this admin
    const revokedTimestamp = revokedBeforeMap.get(decoded.id);
    if (revokedTimestamp && decoded.iat && decoded.iat * 1000 < revokedTimestamp) {
      return null; // Token was revoked
    }

    return decoded;
  } catch {
    return null;
  }
}

/**
 * Revokes all active sessions for an admin (e.g. password reset, employee disabled, account deleted)
 */
export function revokeAllSessionsForAdmin(adminId: string): void {
  revokedBeforeMap.set(adminId, Date.now());
}

/**
 * Checks if a session issued at `iatSeconds` has been revoked
 */
export function isSessionRevoked(adminId: string, iatSeconds?: number): boolean {
  const revokedTimestamp = revokedBeforeMap.get(adminId);
  if (!revokedTimestamp || !iatSeconds) return false;
  return iatSeconds * 1000 < revokedTimestamp;
}

/**
 * Rotates a session token (issues a new sessionId while preserving identity)
 */
export function rotateSessionToken(token: string): string | null {
  const current = verifySessionToken(token);
  if (!current) return null;

  return signSessionToken({
    id: current.id,
    email: current.email,
    name: current.name,
    role: current.role,
    mustChangePassword: current.mustChangePassword,
  });
}
