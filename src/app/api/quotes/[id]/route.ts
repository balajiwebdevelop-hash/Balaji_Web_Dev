import { NextRequest, NextResponse } from 'next/server';
import { getQuoteById, updateQuoteStatus, addAuditLog } from '@/lib/db';
import { verifyAdminToken } from '@/lib/auth';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const quote = await getQuoteById(params.id);
    if (!quote) {
      return NextResponse.json({ success: false, error: 'Quote not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, quote });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = req.cookies.get('balaji_admin_session')?.value;
    const admin = token ? verifyAdminToken(token) : null;
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Unauthorized admin access' }, { status: 401 });
    }

    const { status, totalQuotedAmount, adminNotes } = await req.json();
    const updated = await updateQuoteStatus(params.id, status, totalQuotedAmount, adminNotes);

    if (!updated) {
      return NextResponse.json({ success: false, error: 'Quote not found' }, { status: 404 });
    }

    await addAuditLog({
      adminId: admin.id,
      adminEmail: admin.email,
      action: 'QUOTE_STATUS_UPDATED',
      entity: 'Quote',
      entityId: params.id,
      details: { status, totalQuotedAmount },
    });

    return NextResponse.json({ success: true, quote: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
