import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { updateService, deleteService, addAuditLog } from '@/lib/db';
import { requireOwnerOrEmployee } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireOwnerOrEmployee(req);
  if ('response' in auth) return auth.response;

  try {
    const partialData = await req.json();
    const updated = await updateService(params.id, partialData);

    if (!updated) {
      return NextResponse.json({ success: false, error: 'Service not found' }, { status: 404 });
    }

    await addAuditLog({
      adminId: auth.admin.id,
      adminEmail: auth.admin.email,
      action: 'SERVICE_UPDATED',
      entity: 'Service',
      entityId: params.id,
      details: { modifiedKeys: Object.keys(partialData) },
    });

    // Invalidate customer-facing caches immediately
    try {
      revalidatePath('/', 'layout');
      revalidatePath('/services');
    } catch (revErr) {
      console.warn('Revalidation notice:', revErr);
    }

    return NextResponse.json(
      { success: true, service: updated },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        },
      }
    );
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireOwnerOrEmployee(req);
  if ('response' in auth) return auth.response;

  try {
    const success = await deleteService(params.id);
    if (!success) {
      return NextResponse.json({ success: false, error: 'Service not found' }, { status: 404 });
    }

    await addAuditLog({
      adminId: auth.admin.id,
      adminEmail: auth.admin.email,
      action: 'SERVICE_DELETED',
      entity: 'Service',
      entityId: params.id,
    });

    // Invalidate customer-facing caches immediately
    try {
      revalidatePath('/', 'layout');
      revalidatePath('/services');
    } catch (revErr) {
      console.warn('Revalidation notice:', revErr);
    }

    return NextResponse.json(
      { success: true, message: 'Service deleted successfully' },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        },
      }
    );
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
