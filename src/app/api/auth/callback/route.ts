import { NextRequest, NextResponse } from 'next/server';
import { getServiceSupabase } from '@/lib/supabase';
import { getAdminByEmail, recordAdminLogin, addAuditLog, upsertCustomer } from '@/lib/db';
import { signAdminToken, signCustomerToken } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { accessToken, token, code, provider = 'google' } = body;

    const authToken = accessToken || token;

    // ============================================================
    // CRITICAL SECURITY RULE: INDEPENDENT CRYPTOGRAPHIC VERIFICATION
    // The server MUST verify the token with Supabase Auth.
    // Client-provided email strings in request body are NEVER trusted.
    // ============================================================
    let verifiedEmail: string | null = null;
    let verifiedName: string | null = null;

    const supabase = getServiceSupabase();

    if (authToken && typeof authToken === 'string') {
      const { data: userData, error: userError } = await supabase.auth.getUser(authToken);
      if (userError || !userData?.user) {
        return NextResponse.json(
          { success: false, error: 'Cryptographic authentication verification failed. Invalid or expired token.' },
          { status: 401 }
        );
      }
      verifiedEmail = userData.user.email?.trim().toLowerCase() || null;
      verifiedName =
        userData.user.user_metadata?.full_name ||
        userData.user.user_metadata?.name ||
        verifiedEmail?.split('@')[0] ||
        'User';
    } else if (code && typeof code === 'string') {
      const { data: sessionData, error: sessionError } = await supabase.auth.exchangeCodeForSession(code);
      if (sessionError || !sessionData?.user) {
        return NextResponse.json(
          { success: false, error: 'Failed to exchange authorization code for verified session.' },
          { status: 401 }
        );
      }
      verifiedEmail = sessionData.user.email?.trim().toLowerCase() || null;
      verifiedName =
        sessionData.user.user_metadata?.full_name ||
        sessionData.user.user_metadata?.name ||
        verifiedEmail?.split('@')[0] ||
        'User';
    } else {
      return NextResponse.json(
        { success: false, error: 'Supabase OAuth access token or authorization code required for verification.' },
        { status: 401 }
      );
    }

    if (!verifiedEmail) {
      return NextResponse.json(
        { success: false, error: 'No verified email associated with authenticated account.' },
        { status: 400 }
      );
    }

    const normalizedEmail = verifiedEmail.trim().toLowerCase();

    // ============================================================
    // CRITICAL SECURITY RULE: AUTHORITATIVE ROLE RESOLUTION
    // A Google email MUST NEVER automatically become admin unless
    // an active, valid record already exists in the authoritative `admins` table.
    // ============================================================
    const existingAdmin = await getAdminByEmail(normalizedEmail);

    if (existingAdmin) {
      if (existingAdmin.status === 'disabled') {
        return NextResponse.json(
          { success: false, error: 'Your account has been disabled. Please contact the studio owner.' },
          { status: 403 }
        );
      }

      await recordAdminLogin(existingAdmin.id);

      const adminToken = signAdminToken({
        id: existingAdmin.id,
        email: existingAdmin.email,
        name: existingAdmin.name,
        role: existingAdmin.role,
        mustChangePassword: existingAdmin.mustChangePassword,
      });

      const auditAction =
        existingAdmin.role === 'owner' || existingAdmin.role === 'super_admin'
          ? 'ADMIN_GOOGLE_LOGIN'
          : 'EMPLOYEE_GOOGLE_LOGIN';

      await addAuditLog({
        adminId: existingAdmin.id,
        adminEmail: existingAdmin.email,
        action: auditAction,
        entity: 'Auth',
        entityId: existingAdmin.id,
        details: { role: existingAdmin.role, provider: 'google', verified: true },
      });

      const response = NextResponse.json({
        success: true,
        role: existingAdmin.role,
        redirectUrl: '/admin',
        user: {
          id: existingAdmin.id,
          email: existingAdmin.email,
          name: existingAdmin.name,
          role: existingAdmin.role,
          status: existingAdmin.status,
        },
      });

      response.cookies.set('balaji_admin_session', adminToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      });

      return response;
    }

    // ============================================================
    // STANDARD CUSTOMER ACCOUNT (Verified Google User)
    // ============================================================
    const customer = await upsertCustomer({
      email: normalizedEmail,
      fullName: verifiedName || normalizedEmail.split('@')[0],
      isGuest: false,
    });

    const customerToken = signCustomerToken({
      id: customer.id,
      email: customer.email,
      name: customer.fullName,
      role: 'customer',
      provider: 'google',
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
      maxAge: 60 * 60 * 24 * 30,
    });

    return response;
  } catch (err: any) {
    console.error('Cryptographic auth callback error:', err);
    return NextResponse.json({ success: false, error: 'Authentication verification failed.' }, { status: 500 });
  }
}
