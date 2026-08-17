import { NextRequest, NextResponse } from 'next/server';
import { updateService, deleteService, addAuditLog } from '@/lib/db';
import { verifyAdminToken } from '@/lib/auth';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = req.cookies.get('balaji_admin_session')?.value;
    const admin = token ? verifyAdminToken(token) : null;
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Unauthorized admin access' }, { status: 401 });
    }

    const partialData = await req.json();
    const updated = await updateService(params.id, partialData);

    if (!updated) {
      return NextResponse.json({ success: false, error: 'Service not found' }, { status: 404 });
    }

    await addAuditLog({
      adminId: admin.id,
      adminEmail: admin.email,
      action: 'SERVICE_UPDATED',
      entity: 'Service',
      entityId: params.id,
      details: { modifiedKeys: Object.keys(partialData) },
    });

    return NextResponse.json({ success: true, service: updated });
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

    const success = await deleteService(params.id);
    if (!success) {
      return NextResponse.json({ success: false, error: 'Service not found' }, { status: 404 });
    }

    await addAuditLog({
      adminId: admin.id,
      adminEmail: admin.email,
      action: 'SERVICE_DELETED',
      entity: 'Service',
      entityId: params.id,
    });

    return NextResponse.json({ success: true, message: 'Service deleted successfully' });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
