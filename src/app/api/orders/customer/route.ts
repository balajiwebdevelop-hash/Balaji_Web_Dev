import { NextRequest, NextResponse } from 'next/server';
import {
  getCustomerTokenFromRequest,
  verifyCustomerToken,
  getAdminTokenFromRequest,
  verifyAdminToken,
} from '@/lib/auth';
import { getCustomerOrders, getAdminById } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    let customerEmail: string | null = null;
    let isAdmin = false;

    // 1. Verify Customer Session Token
    const customerToken = getCustomerTokenFromRequest(req);
    if (customerToken) {
      const payload = verifyCustomerToken(customerToken);
      if (payload?.email) {
        customerEmail = payload.email.trim().toLowerCase();
      }
    }

    // 2. Verify Admin Session Token (Owner or Employee)
    if (!customerEmail) {
      const adminToken = getAdminTokenFromRequest(req);
      if (adminToken) {
        const payload = verifyAdminToken(adminToken);
        if (payload?.id) {
          const adminRecord = await getAdminById(payload.id);
          if (adminRecord && adminRecord.status === 'active') {
            isAdmin = true;
            customerEmail = payload.email.trim().toLowerCase();
          }
        }
      }
    }

    // 3. Reject Unauthenticated Access Immediately
    if (!customerEmail && !isAdmin) {
      return NextResponse.json(
        { success: false, error: 'Authentication required. Please sign in to access order history.' },
        { status: 401 }
      );
    }

    // 4. Handle query parameter ?email= securely
    const queryEmail = req.nextUrl.searchParams.get('email')?.trim().toLowerCase();

    if (queryEmail) {
      if (!isAdmin) {
        // Customer session is NOT allowed to inspect another email's orders
        if (queryEmail !== customerEmail) {
          return NextResponse.json(
            { success: false, error: 'Access forbidden. You may only view orders associated with your verified account.' },
            { status: 403 }
          );
        }
      } else {
        // Admin is authorized to lookup specific customer's orders
        customerEmail = queryEmail;
      }
    }

    if (!customerEmail) {
      return NextResponse.json({ success: false, error: 'Valid customer email required' }, { status: 400 });
    }

    const orders = await getCustomerOrders(customerEmail);
    return NextResponse.json({ success: true, orders });
  } catch (err: any) {
    console.error('Customer order lookup error:', err);
    return NextResponse.json({ success: false, error: 'Failed to retrieve orders.' }, { status: 500 });
  }
}
