import { NextRequest, NextResponse } from 'next/server';
import { getOrderById, updateOrderStatus, addAuditLog } from '@/lib/db';
import { requireOwnerOrEmployee } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const order = await getOrderById(params.id);
    if (!order) {
      return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, order });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireOwnerOrEmployee(req);
  if ('response' in auth) return auth.response;

  try {
    const { orderStatus, paymentStatus } = await req.json();
    const updated = await updateOrderStatus(params.id, orderStatus, paymentStatus);

    if (!updated) {
      return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });
    }

    await addAuditLog({
      adminId: auth.admin.id,
      adminEmail: auth.admin.email,
      action: 'ORDER_STATUS_UPDATED',
      entity: 'Order',
      entityId: params.id,
      details: { orderStatus, paymentStatus },
    });

    return NextResponse.json({ success: true, order: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
