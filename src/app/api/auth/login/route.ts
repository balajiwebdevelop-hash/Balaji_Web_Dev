import { NextRequest, NextResponse } from 'next/server';
import { getAdminByEmail, recordAdminLogin, addAuditLog, upsertCustomer } from '@/lib/db';
import { verifyPassword, signAdminToken, signCustomerToken } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ success: false, error: 'Email and password required' }, { status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // 1. Check if user is in Authoritative Admins Table
    const admin = await getAdminByEmail(normalizedEmail);
    if (admin) {
      if (admin.status === 'disabled') {
        return NextResponse.json(
          { success: false, error: 'Your account has been disabled. Please contact the studio owner.' },
          { status: 403 }
        );
      }

      const isMatch = verifyPassword(password, admin.passwordHash);
      if (!isMatch) {
        return NextResponse.json({ success: false, error: 'Invalid email or password.' }, { status: 401 });
      }

      await recordAdminLogin(admin.id);

      const token = signAdminToken({
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
        details: { role: admin.role, method: 'password', mustChangePassword: admin.mustChangePassword },
      });

      const response = NextResponse.json({
        success: true,
        role: admin.role,
        redirectUrl: '/admin',
        user: {
          id: admin.id,
          email: admin.email,
          name: admin.name,
          role: admin.role,
          status: admin.status,
          mustChangePassword: admin.mustChangePassword,
        },
      });

      response.cookies.set('balaji_admin_session', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return response;
    }

    // 2. Standard Customer Authentication
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
