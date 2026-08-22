import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminToken } from '@/lib/auth';
import { getAdminByEmail } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('balaji_admin_session')?.value;
    if (!token) {
      return NextResponse.json({ admin: null });
    }

    const payload = verifyAdminToken(token);
    if (!payload) {
      return NextResponse.json({ admin: null });
    }

    const currentAdmin = await getAdminByEmail(payload.email);
    if (!currentAdmin || currentAdmin.status === 'disabled') {
      return NextResponse.json({ admin: null });
    }

    return NextResponse.json({
      admin: {
        id: currentAdmin.id,
        email: currentAdmin.email,
        name: currentAdmin.name,
        role: currentAdmin.role,
        status: currentAdmin.status,
        mustChangePassword: currentAdmin.mustChangePassword,
      },
    });
  } catch {
    return NextResponse.json({ admin: null });
  }
}
