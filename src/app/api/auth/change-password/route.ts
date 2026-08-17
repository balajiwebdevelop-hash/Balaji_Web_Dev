import { NextRequest, NextResponse } from 'next/server';
import { getAdminByEmail, updateAdminPassword, addAuditLog } from '@/lib/db';
import { hashPassword, verifyAdminToken, verifyPassword, signAdminToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('balaji_admin_session')?.value;
    if (!token) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const payload = verifyAdminToken(token);
    if (!payload) {
      return NextResponse.json({ success: false, error: 'Session expired' }, { status: 401 });
    }

    const { currentPassword, newPassword } = await req.json();
    if (!newPassword || newPassword.length < 6) {
      return NextResponse.json(
        { success: false, error: 'New password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    const admin = await getAdminByEmail(payload.email);
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Admin account not found' }, { status: 404 });
    }

    // Verify current password if supplied
    if (currentPassword) {
      const isMatch = verifyPassword(currentPassword, admin.passwordHash);
      if (!isMatch) {
        return NextResponse.json({ success: false, error: 'Current password incorrect' }, { status: 400 });
      }
    }

    const newHash = hashPassword(newPassword);
    await updateAdminPassword(admin.id, newHash);

    const updatedToken = signAdminToken({
      id: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
      mustChangePassword: false,
    });

    const response = NextResponse.json({
      success: true,
      message: 'Password updated successfully. Bootstrap password has been permanently invalidated.',
    });

    response.cookies.set('balaji_admin_session', updatedToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message || 'Server error' }, { status: 500 });
  }
}
