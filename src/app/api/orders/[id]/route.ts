import { NextRequest, NextResponse } from 'next/server';
import { getOrderById } from '@/lib/db';
import { requireAuthenticatedAdmin, requirePermission } from '@/lib/auth';
import { OrderService } from '@/server/services';
import { formatErrorResponse } from '@/server/errors';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireAuthenticatedAdmin(req);
  if ('response' in auth) return auth.response;

  try {
    const order = await getOrderById(params.id);
    if (!order) {
      return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, order });
  } catch (err: any) {
    return formatErrorResponse(err);
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requirePermission(req, 'orders.update_status');
  if ('response' in auth) return auth.response;

  try {
    const body = await req.json();
    const { orderStatus, paymentStatus, action, utrNumber, note } = body;

    const updated = await OrderService.updateOrderStatusAndPayment(params.id, {
      orderStatus,
      paymentStatus,
      action,
      utrNumber,
      note,
      actor: { id: auth.admin.id, email: auth.admin.email },
    });

    return NextResponse.json({ success: true, order: updated });
  } catch (err: any) {
    return formatErrorResponse(err);
  }
}
