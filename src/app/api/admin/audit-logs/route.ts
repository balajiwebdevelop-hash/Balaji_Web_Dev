import { NextRequest, NextResponse } from 'next/server';
import { getAuditLogs } from '@/lib/db';
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

    const { searchParams } = new URL(req.url);
    const limit = Number(searchParams.get('limit') || 200);
    const entity = searchParams.get('entity');
    const search = searchParams.get('search')?.toLowerCase();

    let logs = await getAuditLogs(limit);

    if (entity && entity !== 'ALL') {
      logs = logs.filter((l) => l.entity.toLowerCase() === entity.toLowerCase());
    }

    if (search) {
      logs = logs.filter(
        (l) =>
          l.action.toLowerCase().includes(search) ||
          l.adminEmail.toLowerCase().includes(search) ||
          (l.entity && l.entity.toLowerCase().includes(search)) ||
          (l.details && JSON.stringify(l.details).toLowerCase().includes(search))
      );
    }

    return NextResponse.json(
      { success: true, logs },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        },
      }
    );
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message || 'Failed to fetch audit logs' }, { status: 500 });
  }
}
