import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminToken } from '@/lib/auth';
import { sendTestPushToAdmin } from '@/lib/push';

export async function POST(req: NextRequest) {
  try {
    const cookieToken = req.cookies.get('balaji_admin_session')?.value;
    const authHeader = req.headers.get('authorization')?.replace('Bearer ', '');
    const token = cookieToken || authHeader;
    const admin = token ? verifyAdminToken(token) : null;

    if (!admin) {
      return NextResponse.json({ success: false, error: 'Unauthorized admin access' }, { status: 401 });
    }

    const result = await sendTestPushToAdmin(admin.id);
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
