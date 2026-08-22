import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getProjectById, updateProject, deleteProject, addAuditLog } from '@/lib/db';
import { requireOwnerOrEmployee } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const project = await getProjectById(params.id);
    if (!project) {
      return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
    }
    return NextResponse.json(
      { success: true, project },
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

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireOwnerOrEmployee(req);
  if ('response' in auth) return auth.response;

  try {
    const partialData = await req.json();
    const updated = await updateProject(params.id, partialData);

    if (!updated) {
      return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
    }

    await addAuditLog({
      adminId: auth.admin.id,
      adminEmail: auth.admin.email,
      action: 'PROJECT_UPDATED',
      entity: 'Project',
      entityId: params.id,
      details: { modifiedKeys: Object.keys(partialData) },
    });

    // Invalidate customer-facing caches immediately
    try {
      revalidatePath('/', 'layout');
      revalidatePath('/projects');
      revalidatePath('/projects/[slug]', 'page');
    } catch (revErr) {
      console.warn('Revalidation notice:', revErr);
    }

    return NextResponse.json(
      { success: true, project: updated },
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
    const success = await deleteProject(params.id);
    if (!success) {
      return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
    }

    await addAuditLog({
      adminId: auth.admin.id,
      adminEmail: auth.admin.email,
      action: 'PROJECT_DELETED',
      entity: 'Project',
      entityId: params.id,
    });

    // Invalidate customer-facing caches immediately
    try {
      revalidatePath('/', 'layout');
      revalidatePath('/projects');
      revalidatePath('/projects/[slug]', 'page');
    } catch (revErr) {
      console.warn('Revalidation notice:', revErr);
    }

    return NextResponse.json(
      { success: true, message: 'Project deleted successfully' },
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
