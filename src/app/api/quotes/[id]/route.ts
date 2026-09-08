import { NextRequest, NextResponse } from 'next/server';
import { getQuoteById } from '@/lib/db';
import { requirePermission } from '@/lib/auth';
import { QuoteService } from '@/server/services';
import { formatErrorResponse } from '@/server/errors';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const quote = await getQuoteById(params.id);
    if (!quote) {
      return NextResponse.json({ success: false, error: 'Quote not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, quote });
  } catch (err: any) {
    return formatErrorResponse(err);
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requirePermission(req, 'quotes.update');
  if ('response' in auth) return auth.response;

  try {
    const { status, totalQuotedAmount, adminNotes } = await req.json();
    const updated = await QuoteService.updateEstimation(params.id, {
      status,
      totalQuotedAmount,
      adminNotes,
      actor: { id: auth.admin.id, email: auth.admin.email },
    });

    return NextResponse.json({ success: true, quote: updated });
  } catch (err: any) {
    return formatErrorResponse(err);
  }
}
