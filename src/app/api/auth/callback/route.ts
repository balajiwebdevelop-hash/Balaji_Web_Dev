import { NextRequest, NextResponse } from 'next/server';
import { getAdminByEmail, recordAdminLogin, addAuditLog, upsertCustomer } from '@/lib/db';
import { signAdminToken, signCustomerToken } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { email, name, avatarUrl, provider = 'google' } = body;

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ success: false, error: 'Valid email identity required' }, { status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // ============================================================
    // CRITICAL SECURITY RULE: AUTHORITATIVE ROLE RESOLUTION
    // A Google email MUST NEVER automatically become admin unless
    // an active, valid record already exists in the `admins` table.
    // ============================================================
    const existingAdmin = await getAdminByEmail(normalizedEmail);

    if (existingAdmin) {
      if (existingAdmin.status === 'disabled') {
        return NextResponse.json(
          { success: false, error: 'Your account has been disabled. Please contact the studio owner.' },
          { status: 403 }
        );
      }

      await recordAdminLogin(existingAdmin.id);

      const adminToken = signAdminToken({
        id: existingAdmin.id,
        email: existingAdmin.email,
        name: existingAdmin.name,
        role: existingAdmin.role,
        mustChangePassword: existingAdmin.mustChangePassword,
      });

      const auditAction =
        existingAdmin.role === 'owner' || existingAdmin.role === 'super_admin'
          ? 'ADMIN_GOOGLE_LOGIN'
          : 'EMPLOYEE_GOOGLE_LOGIN';

      await addAuditLog({
        adminId: existingAdmin.id,
        adminEmail: existingAdmin.email,
        action: auditAction,
        entity: 'Auth',
        entityId: existingAdmin.id,
        details: { role: existingAdmin.role, provider: 'google' },
      });

      const response = NextResponse.json({
        success: true,
        role: existingAdmin.role,
        redirectUrl: '/admin',
        user: {
          id: existingAdmin.id,
          email: existingAdmin.email,
          name: existingAdmin.name,
          role: existingAdmin.role,
          status: existingAdmin.status,
        },
      });

      response.cookies.set('balaji_admin_session', adminToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      });

      return response;
    }

    // ============================================================
    // STANDARD CUSTOMER ACCOUNT (Google User)
    // ============================================================
    const customer = await upsertCustomer({
      email: normalizedEmail,
      fullName: name || normalizedEmail.split('@')[0],
      isGuest: false,
    });

    const customerToken = signCustomerToken({
      id: customer.id,
      email: customer.email,
      name: customer.fullName,
      role: 'customer',
      provider: 'google',
    });

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
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    return response;
  } catch (err: any) {
    return NextResponse.json({ success: false, error: 'Authentication failed. Please try again.' }, { status: 500 });
  }
}
