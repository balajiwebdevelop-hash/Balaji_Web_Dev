import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { createOrderAtomic, getOrders } from '@/lib/db';
import { verifyAdminToken } from '@/lib/auth';

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
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.customerName || !body.customerEmail || !body.customerPhone) {
      return NextResponse.json(
        { success: false, error: 'Customer name, email, and phone are required.' },
        { status: 400 }
      );
    }

    if (!body.shippingAddress || !body.shippingAddress.addressLine1) {
      return NextResponse.json(
        { success: false, error: 'Valid delivery address is required.' },
        { status: 400 }
      );
    }

    if (!Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Order must contain at least one material/product.' },
        { status: 400 }
      );
    }

    // Process order with Server-Authoritative Price & Atomic Inventory Lock
    const result = await createOrderAtomic({
      customerName: body.customerName,
      customerEmail: body.customerEmail,
      customerPhone: body.customerPhone,
      shippingAddress: body.shippingAddress,
      billingAddress: body.billingAddress,
      items: body.items,
      paymentMethod: body.paymentMethod || 'Balaji QR Payment (Balaji PG)',
      notes: body.notes,
    });

    if (!result.success || !result.order) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 });
    }

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

    return NextResponse.json({ success: true, order: result.order });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message || 'Server error' }, { status: 500 });
  }
}
