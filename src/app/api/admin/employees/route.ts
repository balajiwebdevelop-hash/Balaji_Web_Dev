import { NextRequest, NextResponse } from 'next/server';
import { getAdmins, createEmployeeAdmin } from '@/lib/db';
import { requireOwner } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const auth = await requireOwner(req);
  if ('response' in auth) return auth.response;

  try {
    const admins = await getAdmins();
    return NextResponse.json(
      { success: true, employees: admins },
      { headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate' } }
    );
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message || 'Failed to fetch employees' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const auth = await requireOwner(req);
  if ('response' in auth) return auth.response;

  try {
    const body = await req.json().catch(() => ({}));
    const { name, email, role, temporaryPassword, mustChangePassword } = body;

    if (!name || !email) {
      return NextResponse.json({ success: false, error: 'Full name and email are required' }, { status: 400 });
    }

    if (role && role !== 'employee') {
      return NextResponse.json(
        { success: false, error: 'Only employee role can be created' },
        { status: 400 }
      );
    }

    const newEmployee = await createEmployeeAdmin(
      {
        name,
        email,
        role: 'employee',
        temporaryPassword: temporaryPassword || 'employee@123',
        mustChangePassword: mustChangePassword !== undefined ? mustChangePassword : true,
      },
      auth.admin
    );

    return NextResponse.json({
      success: true,
      employee: newEmployee,
      message: 'Employee account created successfully.',
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message || 'Failed to create employee' }, { status: 400 });
  }
}
