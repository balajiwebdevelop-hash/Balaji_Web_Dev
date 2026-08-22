import { NextRequest, NextResponse } from 'next/server';
import { requireOwner } from '@/lib/auth';
import { sendTestPushToAdmin } from '@/lib/push';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const auth = await requireOwner(req);
  if ('response' in auth) return auth.response;

  try {
    const result = await sendTestPushToAdmin(auth.admin.id);
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
