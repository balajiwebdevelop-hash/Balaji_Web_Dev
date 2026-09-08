import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getOrders } from '@/lib/db';
import { verifyAdminToken } from '@/lib/auth';
import { OrderService } from '@/server/services';
import { validateUtrNumber } from '@/server/validation/schemas';
import { formatErrorResponse } from '@/server/errors';

export async function GET(req: NextRequest) {
  try {
    const cookieToken = req.cookies.get('balaji_admin_session')?.value;
    const authHeader = req.headers.get('authorization')?.replace('Bearer ', '');
    const token = cookieToken || authHeader;

    const admin = token ? verifyAdminToken(token) : null;
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Unauthorized admin access' }, { status: 401 });
    }

    const orders = await getOrders();
    return NextResponse.json(
      { success: true, orders },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        },
      }
    );
  } catch (err: any) {
    return formatErrorResponse(err);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const sanitizedUtr = validateUtrNumber(body.utrNumber);

    const order = await OrderService.placeOrder({
      customerName: body.customerName,
      customerEmail: body.customerEmail,
      customerPhone: body.customerPhone,
      shippingAddress: body.shippingAddress,
      billingAddress: body.billingAddress,
      items: body.items,
      paymentMethod: body.paymentMethod || 'Balaji QR Payment (Balaji PG)',
      notes: body.notes,
      utrNumber: sanitizedUtr,
      transactionId: body.transactionId,
      idempotencyKey: body.idempotencyKey,
    });

    // Invalidate customer-facing stock & product caches immediately
    try {
      revalidatePath('/', 'layout');
      revalidatePath('/materials');
      revalidatePath('/material/[slug]', 'page');
      revalidatePath('/category/[slug]', 'page');
      revalidatePath('/shop');
    } catch (revErr) {
      console.warn('Revalidation notice:', revErr);
    }

    return NextResponse.json({ success: true, order });
  } catch (err: any) {
    return formatErrorResponse(err);
  }
}
