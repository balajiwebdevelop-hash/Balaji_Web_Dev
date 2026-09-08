import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { getAdminByEmail, addAuditLog } from '@/lib/db';

export const dynamic = 'force-dynamic';

// Memory store for single-use password reset tokens (hashedToken -> { email, expiresAt })
const resetTokenStore = new Map<string, { email: string; expiresAt: number; consumed: boolean }>();

function verifyAndConsumeResetToken(rawToken: string): { valid: boolean; email?: string } {
  const hashed = crypto.createHash('sha256').update(rawToken).digest('hex');
  const record = resetTokenStore.get(hashed);
  if (!record) return { valid: false };

  if (record.consumed || Date.now() > record.expiresAt) {
    resetTokenStore.delete(hashed);
    return { valid: false };
  }

  record.consumed = true;
  resetTokenStore.delete(hashed);
  return { valid: true, email: record.email };
}

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json().catch(() => ({}));

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Email is required', code: 'MISSING_EMAIL' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    const admin = await getAdminByEmail(normalizedEmail);

    if (admin && admin.status !== 'disabled') {
      // 1. Generate single-use random 32-byte cryptographic token
      const rawToken = crypto.randomBytes(32).toString('hex');
      const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex');
      const expiresAt = Date.now() + 60 * 60 * 1000; // 1 hour validity

      // 2. Store hashed token with expiry
      resetTokenStore.set(hashedToken, { email: normalizedEmail, expiresAt, consumed: false });

      // 3. Security Audit Log
      await addAuditLog({
        adminId: admin.id,
        adminEmail: admin.email,
        action: 'PASSWORD_RESET_REQUESTED',
        entity: 'Auth',
        entityId: admin.id,
        details: { expiresAt: new Date(expiresAt).toISOString() },
      });
    }

    // Security practice: Never disclose whether an email exists or not to prevent user enumeration
    return NextResponse.json({
      success: true,
      message: 'If an administrative account exists with this email, password reset instructions have been recorded.',
    });
  } catch (err: any) {
    console.error('[Forgot Password Error]', err);
    return NextResponse.json(
      { success: false, error: 'Request could not be processed. Please try again later.', code: 'SERVER_ERROR' },
      { status: 500 }
    );
  }
}
