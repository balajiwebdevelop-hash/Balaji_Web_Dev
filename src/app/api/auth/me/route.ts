import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminToken, verifyCustomerToken } from '@/lib/auth';
import { getAdminByEmail } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    // 1. Check Admin Session
    const adminToken = req.cookies.get('balaji_admin_session')?.value;
    if (adminToken) {
      const payload = verifyAdminToken(adminToken);
      if (payload) {
        const currentAdmin = await getAdminByEmail(payload.email);
        if (currentAdmin && currentAdmin.status !== 'disabled') {
          return NextResponse.json({
            admin: {
              id: currentAdmin.id,
              email: currentAdmin.email,
              name: currentAdmin.name,
              role: currentAdmin.role,
              status: currentAdmin.status,
              mustChangePassword: currentAdmin.mustChangePassword,
            },
            user: {
              id: currentAdmin.id,
              email: currentAdmin.email,
              name: currentAdmin.name,
              role: currentAdmin.role,
              status: currentAdmin.status,
              mustChangePassword: currentAdmin.mustChangePassword,
            },
          });
        }
      }
    }

    // 2. Check Customer Session
    const customerToken = req.cookies.get('balaji_customer_session')?.value;
    if (customerToken) {
      const customerPayload = verifyCustomerToken(customerToken);
      if (customerPayload) {
        return NextResponse.json({
          admin: null,
          user: {
            id: customerPayload.id,
            email: customerPayload.email,
            name: customerPayload.name,
            role: 'customer',
            provider: customerPayload.provider || 'email',
          },
        });
      }
    }

    return NextResponse.json({ admin: null, user: null });
  } catch {
    return NextResponse.json({ admin: null, user: null });
  }
}
