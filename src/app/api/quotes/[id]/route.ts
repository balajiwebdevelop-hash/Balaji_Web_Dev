import { NextRequest, NextResponse } from 'next/server';
import { getQuoteById, updateQuoteStatus, addAuditLog } from '@/lib/db';
import { requireOwnerOrEmployee } from '@/lib/auth';

export const dynamic = 'force-dynamic';

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
  const auth = await requireOwnerOrEmployee(req);
  if ('response' in auth) return auth.response;

  try {
    const { status, totalQuotedAmount, adminNotes } = await req.json();
    const updated = await updateQuoteStatus(params.id, status, totalQuotedAmount, adminNotes);

    if (!updated) {
      return NextResponse.json({ success: false, error: 'Quote not found' }, { status: 404 });
    }

    await addAuditLog({
      adminId: auth.admin.id,
      adminEmail: auth.admin.email,
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
