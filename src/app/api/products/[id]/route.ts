import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getProductById, updateProduct, deleteProduct, addAuditLog } from '@/lib/db';
import { requirePermission, requireAuthenticatedAdmin } from '@/lib/auth';
import { validateProductInput } from '@/server/validation/schemas';
import { formatErrorResponse } from '@/server/errors';

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
    return formatErrorResponse(err);
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requirePermission(req, 'products.update');
  if ('response' in auth) return auth.response;

  try {
    const partialData = await req.json();
    validateProductInput(partialData, true);
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
    return formatErrorResponse(err);
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requirePermission(req, 'products.delete');
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
    return formatErrorResponse(err);
  }
}
