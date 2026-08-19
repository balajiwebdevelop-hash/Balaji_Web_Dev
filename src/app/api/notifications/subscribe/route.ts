import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminToken } from '@/lib/auth';
import { savePushSubscription } from '@/lib/push';

export async function POST(req: NextRequest) {
  try {
    const cookieToken = req.cookies.get('balaji_admin_session')?.value;
    const authHeader = req.headers.get('authorization')?.replace('Bearer ', '');
    const token = cookieToken || authHeader;
    const admin = token ? verifyAdminToken(token) : null;

    if (!admin) {
      return NextResponse.json({ success: false, error: 'Unauthorized admin session' }, { status: 401 });
    }

    const { subscription } = await req.json();
    if (!subscription || !subscription.endpoint || !subscription.keys) {
      return NextResponse.json({ success: false, error: 'Invalid subscription object' }, { status: 400 });
    }

    const userAgent = req.headers.get('user-agent') || undefined;

    const result = await savePushSubscription({
      endpoint: subscription.endpoint,
      keys: subscription.keys,
      adminId: admin.id,
      userAgent,
    });

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Push notification subscription registered in Supabase' });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
