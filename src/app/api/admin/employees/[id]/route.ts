import { NextRequest, NextResponse } from 'next/server';
import { getAdminById, updateEmployeeAdmin, deleteEmployeeAdmin, resetEmployeePassword } from '@/lib/db';
import { requireOwner } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireOwner(req);
  if ('response' in auth) return auth.response;

  try {
    const admin = await getAdminById(params.id);
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Employee not found' }, { status: 404 });
    }

    const { passwordHash: _, ...safeAdmin } = admin;
    return NextResponse.json(
      { success: true, employee: safeAdmin },
      { headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate' } }
    );
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message || 'Server error' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireOwner(req);
  if ('response' in auth) return auth.response;

  try {
    const body = await req.json().catch(() => ({}));
    const { action, name, email, role, status, newPassword } = body;

    // Handle Password Reset by Owner
    if (action === 'reset_password' || newPassword) {
      const resetPass = newPassword || 'employee@123';
      await resetEmployeePassword(params.id, resetPass, auth.admin);
      return NextResponse.json({
        success: true,
        message: 'Employee password reset successfully. Password change required on next login.',
      });
    }

    // Handle Profile / Role / Status Updates
    const updated = await updateEmployeeAdmin(
      params.id,
      {
        name,
        email,
        role,
        status,
      },
      auth.admin
    );

    return NextResponse.json({
      success: true,
      employee: updated,
      message: 'Employee details updated successfully.',
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message || 'Failed to update employee' }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireOwner(req);
  if ('response' in auth) return auth.response;

  try {
    await deleteEmployeeAdmin(params.id, auth.admin);
    return NextResponse.json({
      success: true,
      message: 'Employee account deleted successfully.',
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message || 'Failed to delete employee' }, { status: 400 });
  }
}
