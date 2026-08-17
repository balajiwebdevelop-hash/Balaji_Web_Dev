import { NextRequest, NextResponse } from 'next/server';
import { updateCategory, deleteCategory, addAuditLog } from '@/lib/db';
import { verifyAdminToken } from '@/lib/auth';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = req.cookies.get('balaji_admin_session')?.value;
    const admin = token ? verifyAdminToken(token) : null;
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Unauthorized admin access' }, { status: 401 });
    }

    const partialData = await req.json();
    const updated = await updateCategory(params.id, partialData);

    if (!updated) {
      return NextResponse.json({ success: false, error: 'Category not found' }, { status: 404 });
    }

    await addAuditLog({
      adminId: admin.id,
      adminEmail: admin.email,
      action: 'CATEGORY_UPDATED',
      entity: 'Category',
      entityId: params.id,
      details: { modifiedKeys: Object.keys(partialData) },
    });

    return NextResponse.json({ success: true, category: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = req.cookies.get('balaji_admin_session')?.value;
    const admin = token ? verifyAdminToken(token) : null;
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Unauthorized admin access' }, { status: 401 });
    }

    const success = await deleteCategory(params.id);
    if (!success) {
      return NextResponse.json({ success: false, error: 'Category not found' }, { status: 404 });
    }

    await addAuditLog({
      adminId: admin.id,
      adminEmail: admin.email,
      action: 'CATEGORY_DELETED',
      entity: 'Category',
      entityId: params.id,
    });

    return NextResponse.json({ success: true, message: 'Category deleted successfully' });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
