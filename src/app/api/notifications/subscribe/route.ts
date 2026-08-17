import { NextRequest, NextResponse } from 'next/server';
import { addPushSubscription } from '@/lib/db';
import { verifyAdminToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('balaji_admin_session')?.value;
    const admin = token ? verifyAdminToken(token) : null;

    const { subscription } = await req.json();
    if (!subscription || !subscription.endpoint || !subscription.keys) {
      return NextResponse.json({ success: false, error: 'Invalid subscription object' }, { status: 400 });
    }

    await addPushSubscription({
      endpoint: subscription.endpoint,
      keys: subscription.keys,
      adminId: admin?.id,
    });

    return NextResponse.json({ success: true, message: 'Push notification subscription registered' });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
