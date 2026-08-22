import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { updateCategory, deleteCategory, addAuditLog } from '@/lib/db';
import { requireOwnerOrEmployee } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireOwnerOrEmployee(req);
  if ('response' in auth) return auth.response;

  try {
    const partialData = await req.json();
    const updated = await updateCategory(params.id, partialData);

    if (!updated) {
      return NextResponse.json({ success: false, error: 'Category not found' }, { status: 404 });
    }

    await addAuditLog({
      adminId: auth.admin.id,
      adminEmail: auth.admin.email,
      action: 'CATEGORY_UPDATED',
      entity: 'Category',
      entityId: params.id,
      details: { modifiedKeys: Object.keys(partialData) },
    });

    // Invalidate customer-facing caches immediately
    try {
      revalidatePath('/', 'layout');
      revalidatePath('/materials');
      revalidatePath('/category/[slug]', 'page');
      revalidatePath('/material/[slug]', 'page');
      revalidatePath('/shop');
    } catch (revErr) {
      console.warn('Revalidation notice:', revErr);
    }

    return NextResponse.json(
      { success: true, category: updated },
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
    const success = await deleteCategory(params.id);
    if (!success) {
      return NextResponse.json({ success: false, error: 'Category not found' }, { status: 404 });
    }

    await addAuditLog({
      adminId: auth.admin.id,
      adminEmail: auth.admin.email,
      action: 'CATEGORY_DELETED',
      entity: 'Category',
      entityId: params.id,
    });

    // Invalidate customer-facing caches immediately
    try {
      revalidatePath('/', 'layout');
      revalidatePath('/materials');
      revalidatePath('/category/[slug]', 'page');
      revalidatePath('/material/[slug]', 'page');
      revalidatePath('/shop');
    } catch (revErr) {
      console.warn('Revalidation notice:', revErr);
    }

    return NextResponse.json(
      { success: true, message: 'Category deleted successfully' },
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
