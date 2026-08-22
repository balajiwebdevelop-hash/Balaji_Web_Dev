import { NextRequest, NextResponse } from 'next/server';
import { getAdminByEmail, upsertCustomer } from '@/lib/db';
import { signCustomerToken } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { email, name, password } = await req.json().catch(() => ({}));

    if (!email || !name) {
      return NextResponse.json({ success: false, error: 'Name and email are required' }, { status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check if email already belongs to an Admin account
    const existingAdmin = await getAdminByEmail(normalizedEmail);
    if (existingAdmin) {
      return NextResponse.json(
        { success: false, error: 'An account with this email already exists. Please sign in directly.' },
        { status: 400 }
      );
    }

    const customer = await upsertCustomer({
      email: normalizedEmail,
      fullName: name.trim(),
      isGuest: false,
    });

    const customerToken = signCustomerToken({
      id: customer.id,
      email: customer.email,
      name: customer.fullName,
      role: 'customer',
      provider: 'email',
    });

    const response = NextResponse.json({
      success: true,
      role: 'customer',
      redirectUrl: '/account',
      user: {
        id: customer.id,
        email: customer.email,
        name: customer.fullName,
        role: 'customer',
      },
    });

    response.cookies.set('balaji_customer_session', customerToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    return response;
  } catch (err: any) {
    return NextResponse.json({ success: false, error: 'Failed to create account. Please try again.' }, { status: 500 });
  }
}
