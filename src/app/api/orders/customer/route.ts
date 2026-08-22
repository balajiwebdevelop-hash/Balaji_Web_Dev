import { NextRequest, NextResponse } from 'next/server';
import { getCustomerTokenFromRequest, verifyCustomerToken, getAdminTokenFromRequest, verifyAdminToken } from '@/lib/auth';
import { getCustomerOrders } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    let email: string | null = null;

    // Check Customer Session
    const customerToken = getCustomerTokenFromRequest(req);
    if (customerToken) {
      const payload = verifyCustomerToken(customerToken);
      if (payload) email = payload.email;
    }

    // Check Admin Session fallback
    if (!email) {
      const adminToken = getAdminTokenFromRequest(req);
      if (adminToken) {
        const payload = verifyAdminToken(adminToken);
        if (payload) email = payload.email;
      }
    }

    // Allow query parameter lookup if email provided
    const queryEmail = req.nextUrl.searchParams.get('email');
    if (queryEmail && !email) {
      email = queryEmail.trim().toLowerCase();
    }

    if (!email) {
      return NextResponse.json({ success: false, error: 'Email parameter or active session required' }, { status: 400 });
    }

    const orders = await getCustomerOrders(email);
    return NextResponse.json({ success: true, orders });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: 'Failed to retrieve orders.' }, { status: 500 });
  }
}
