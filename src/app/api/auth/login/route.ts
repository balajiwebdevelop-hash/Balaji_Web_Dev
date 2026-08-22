import { NextRequest, NextResponse } from 'next/server';
import { getAdminByEmail, recordAdminLogin, addAuditLog } from '@/lib/db';
import { verifyPassword, signAdminToken } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ success: false, error: 'Email and password required' }, { status: 400 });
    }

    const admin = await getAdminByEmail(email);
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
    }

    if (admin.status === 'disabled') {
      return NextResponse.json(
        { success: false, error: 'Your account has been disabled. Please contact the studio owner.' },
        { status: 403 }
      );
    }

    const isMatch = verifyPassword(password, admin.passwordHash);
    if (!isMatch) {
      return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
    }

    await recordAdminLogin(admin.id);

    const token = signAdminToken({
      id: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
      mustChangePassword: admin.mustChangePassword,
    });

    await addAuditLog({
      adminId: admin.id,
      adminEmail: admin.email,
      action: 'ADMIN_LOGIN_SUCCESS',
      entity: 'Auth',
      entityId: admin.id,
      details: { role: admin.role, mustChangePassword: admin.mustChangePassword },
    });

    const response = NextResponse.json({
      success: true,
      admin: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
        status: admin.status,
        mustChangePassword: admin.mustChangePassword,
      },
    });

    // Set secure HTTP-only cookie
    response.cookies.set('balaji_admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message || 'Server error' }, { status: 500 });
  }
}
