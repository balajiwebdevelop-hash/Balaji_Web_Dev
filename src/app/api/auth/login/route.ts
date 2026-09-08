import { NextRequest, NextResponse } from 'next/server';
import { getAdminByEmail, recordAdminLogin, addAuditLog, upsertCustomer } from '@/lib/db';
import { verifyPassword, signSessionToken, signCustomerToken } from '@/lib/auth';

export const dynamic = 'force-dynamic';

// Memory-backed rate limiter for login protection: max 5 failed attempts per 15 minutes
const loginAttempts = new Map<string, { count: number; firstAttempt: number }>();
const MAX_ATTEMPTS = 5;
const LOCKOUT_WINDOW_MS = 15 * 60 * 1000;

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const entry = loginAttempts.get(key);
  if (!entry) return false;

  if (now - entry.firstAttempt > LOCKOUT_WINDOW_MS) {
    loginAttempts.delete(key);
    return false;
  }

  return entry.count >= MAX_ATTEMPTS;
}

function recordFailedAttempt(key: string): void {
  const now = Date.now();
  const entry = loginAttempts.get(key);
  if (!entry || now - entry.firstAttempt > LOCKOUT_WINDOW_MS) {
    loginAttempts.set(key, { count: 1, firstAttempt: now });
  } else {
    entry.count += 1;
  }
}

function clearAttempts(key: string): void {
  loginAttempts.delete(key);
}

export async function POST(req: NextRequest) {
  try {
    const { email, password, isAdminLogin = false } = await req.json().catch(() => ({}));

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required', code: 'MISSING_CREDENTIALS' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';
    const rateLimitKey = `${clientIp}:${normalizedEmail}`;

    // 1. Check Rate Limiting
    if (isRateLimited(rateLimitKey)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Too many failed login attempts. Account access is temporarily locked for 15 minutes.',
          code: 'RATE_LIMITED',
        },
        { status: 429 }
      );
    }

    // 2. Check if user is in Authoritative Admins Table
    const admin = await getAdminByEmail(normalizedEmail);

    if (admin) {
      if (admin.status === 'disabled') {
        recordFailedAttempt(rateLimitKey);
        return NextResponse.json(
          { success: false, error: 'Your administrative account has been deactivated. Please contact the studio owner.', code: 'ACCOUNT_DISABLED' },
          { status: 403 }
        );
      }

      const isMatch = verifyPassword(password, admin.passwordHash);
      if (!isMatch) {
        recordFailedAttempt(rateLimitKey);
        return NextResponse.json(
          { success: false, error: 'Invalid email or password.', code: 'INVALID_CREDENTIALS' },
          { status: 401 }
        );
      }

      // Successful Admin Authentication
      clearAttempts(rateLimitKey);
      await recordAdminLogin(admin.id);

      // Issue rotated, secure session token
      const token = signSessionToken({
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
        mustChangePassword: admin.mustChangePassword,
      });

      const auditAction = (admin.role === 'owner' || admin.role === 'super_admin') ? 'ADMIN_LOGIN_SUCCESS' : 'EMPLOYEE_LOGIN';
      await addAuditLog({
        adminId: admin.id,
        adminEmail: admin.email,
        action: auditAction,
        entity: 'Auth',
        entityId: admin.id,
        details: { role: admin.role, method: 'password', ip: clientIp },
      });

      const adminPayload = {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
        status: admin.status || 'active',
        mustChangePassword: Boolean(admin.mustChangePassword),
      };

      const response = NextResponse.json({
        success: true,
        role: admin.role,
        redirectUrl: '/admin',
        admin: adminPayload,
        user: adminPayload,
      });

      const isHttps = req.nextUrl.protocol === 'https:' || req.headers.get('x-forwarded-proto') === 'https';

      response.cookies.set('balaji_admin_session', token, {
        httpOnly: true,
        secure: isHttps,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return response;
    }

    // 3. If request came from admin portal (/admin/login or isAdminLogin), do NOT fall through to customer creation
    const referer = req.headers.get('referer') || '';
    if (isAdminLogin || referer.includes('/admin/login')) {
      recordFailedAttempt(rateLimitKey);
      return NextResponse.json(
        { success: false, error: 'Invalid email or password.', code: 'INVALID_CREDENTIALS' },
        { status: 401 }
      );
    }

    // 4. Standard Customer Authentication (Public website only)
    const customer = await upsertCustomer({
      email: normalizedEmail,
      fullName: normalizedEmail.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase()),
      isGuest: false,
    });

    const customerToken = signCustomerToken({
      id: customer.id,
      email: customer.email,
      name: customer.fullName,
      role: 'customer',
      provider: 'email',
    });

    const isHttps = req.nextUrl.protocol === 'https:' || req.headers.get('x-forwarded-proto') === 'https';

    const response = NextResponse.json({
      success: true,
      role: 'customer',
      redirectUrl: '/account',
      user: {
        id: customer.id,
        email: customer.email,
        name: customer.fullName,
        role: 'customer',
      },
    });

    response.cookies.set('balaji_customer_session', customerToken, {
      httpOnly: true,
      secure: isHttps,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    return response;
  } catch (err: any) {
    console.error('[Login Exception]', err);
    return NextResponse.json(
      { success: false, error: 'Authentication service temporarily unavailable. Please retry.', code: 'SERVER_ERROR' },
      { status: 500 }
    );
  }
}
