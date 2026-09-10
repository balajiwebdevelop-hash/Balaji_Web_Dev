import { NextRequest, NextResponse } from 'next/server';
import { requireAuthenticatedAdmin } from '@/lib/auth';
import { savePushSubscription, DEFAULT_VAPID_PUBLIC_KEY } from '@/lib/push';

export async function GET() {
  const vapidPublicKey =
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY ||
    process.env.VAPID_PUBLIC_KEY ||
    DEFAULT_VAPID_PUBLIC_KEY;
  return NextResponse.json({
    success: true,
    vapidPublicKey,
  });
}

export async function POST(req: NextRequest) {
  try {
    const authResult = await requireAuthenticatedAdmin(req);
    if ('response' in authResult) {
      return authResult.response;
    }
    const admin = authResult.admin;

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

    return NextResponse.json({ success: true, message: 'Push notification subscription registered successfully' });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
