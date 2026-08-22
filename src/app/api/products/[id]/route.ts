import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getProductById, updateProduct, deleteProduct, addAuditLog } from '@/lib/db';
import { requireOwnerOrEmployee } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const product = await getProductById(params.id);
    if (!product) {
      return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json(
      { success: true, product },
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
    const updated = await updateProduct(params.id, partialData);

    if (!updated) {
      return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
    }

    await addAuditLog({
      adminId: auth.admin.id,
      adminEmail: auth.admin.email,
      action: 'PRODUCT_UPDATED',
      entity: 'Product',
      entityId: params.id,
      details: { modifiedKeys: Object.keys(partialData) },
    });

    // Invalidate customer-facing caches immediately
    try {
      revalidatePath('/', 'layout');
      revalidatePath('/materials');
      revalidatePath('/material/[slug]', 'page');
      revalidatePath('/category/[slug]', 'page');
      revalidatePath('/shop');
      revalidatePath('/search');
    } catch (revErr) {
      console.warn('Revalidation notice:', revErr);
    }

    return NextResponse.json(
      { success: true, product: updated },
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
    const success = await deleteProduct(params.id);
    if (!success) {
      return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
    }

    await addAuditLog({
      adminId: auth.admin.id,
      adminEmail: auth.admin.email,
      action: 'PRODUCT_DELETED',
      entity: 'Product',
      entityId: params.id,
    });

    // Invalidate customer-facing caches immediately
    try {
      revalidatePath('/', 'layout');
      revalidatePath('/materials');
      revalidatePath('/material/[slug]', 'page');
      revalidatePath('/category/[slug]', 'page');
      revalidatePath('/shop');
      revalidatePath('/search');
    } catch (revErr) {
      console.warn('Revalidation notice:', revErr);
    }

    return NextResponse.json(
      { success: true, message: 'Product deleted successfully' },
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
