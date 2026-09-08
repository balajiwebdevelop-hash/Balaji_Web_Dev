import { NextRequest, NextResponse } from 'next/server';

function decodeJwtPayload(token: string): any {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = Buffer.from(base64, 'base64').toString('utf8');
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1. Skip public auth routes and assets
  if (
    pathname === '/admin/login' ||
    pathname.startsWith('/api/auth') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api/health') ||
    pathname === '/favicon.ico' ||
    pathname === '/logo.png'
  ) {
    return NextResponse.next();
  }

  // 2. Protect Admin Studio UI pages (/admin/*)
  if (pathname.startsWith('/admin')) {
    const adminToken = req.cookies.get('balaji_admin_session')?.value;
    if (!adminToken) {
      const loginUrl = new URL('/admin/login', req.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }

    const payload = decodeJwtPayload(adminToken);
    if (!payload || !payload.role || payload.role === 'customer') {
      const loginUrl = new URL('/admin/login', req.url);
      return NextResponse.redirect(loginUrl);
    }

    // Check expiry if exp claim exists
    if (payload.exp && payload.exp * 1000 < Date.now()) {
      const loginUrl = new URL('/admin/login', req.url);
      loginUrl.searchParams.set('expired', 'true');
      return NextResponse.redirect(loginUrl);
    }

    // Owner-only route protection at middleware boundary
    if (pathname.startsWith('/admin/employees') || pathname.startsWith('/admin/settings')) {
      const isOwner = payload.role === 'owner' || payload.role === 'super_admin';
      if (!isOwner) {
        return NextResponse.redirect(new URL('/admin', req.url));
      }
    }

    return NextResponse.next();
  }

  // 3. Protect Admin API endpoints (/api/admin/*)
  if (pathname.startsWith('/api/admin')) {
    const adminToken =
      req.cookies.get('balaji_admin_session')?.value ||
      req.headers.get('authorization')?.replace('Bearer ', '');

    if (!adminToken) {
      return NextResponse.json(
        { success: false, error: 'Authentication required for administrative access.', code: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }

    const payload = decodeJwtPayload(adminToken);
    if (!payload || !payload.role || payload.role === 'customer') {
      return NextResponse.json(
        { success: false, error: 'Invalid administrative session credentials.', code: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }

    if (payload.exp && payload.exp * 1000 < Date.now()) {
      return NextResponse.json(
        { success: false, error: 'Administrative session has expired. Please sign in again.', code: 'SESSION_EXPIRED' },
        { status: 401 }
      );
    }

    // Owner-only API route protection
    if (pathname.startsWith('/api/admin/employees') || pathname.startsWith('/api/admin/settings')) {
      const isOwner = payload.role === 'owner' || payload.role === 'super_admin';
      if (!isOwner) {
        return NextResponse.json(
          { success: false, error: 'Access Denied: Only studio owners are permitted.', code: 'FORBIDDEN' },
          { status: 403 }
        );
      }
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
