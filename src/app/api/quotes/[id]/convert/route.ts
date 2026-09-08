import { NextRequest, NextResponse } from 'next/server';
import { requirePermission } from '@/lib/auth';
import { QuoteService } from '@/server/services';
import { formatErrorResponse } from '@/server/errors';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requirePermission(req, 'quotes.convert');
  if ('response' in auth) return auth.response;

  try {
    const result = await QuoteService.convertQuoteToOrder(params.id, {
      id: auth.admin.id,
      email: auth.admin.email,
    });

    return NextResponse.json({
      success: true,
      order: result.order,
      message: `Quote #${result.quote.quoteNumber} successfully converted to Order #${result.order.orderNumber}`,
    });
  } catch (err: any) {
    console.error('Quote conversion error:', err);
    return formatErrorResponse(err);
  }
}
