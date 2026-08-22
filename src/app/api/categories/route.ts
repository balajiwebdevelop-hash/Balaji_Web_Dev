import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getCategories, getAllCategoriesAdmin, createCategory, addAuditLog } from '@/lib/db';
import { requireOwnerOrEmployee } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const isAdmin = searchParams.get('admin') === 'true';

    const categories = isAdmin ? await getAllCategoriesAdmin() : await getCategories();
    return NextResponse.json(
      { categories },
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

export async function POST(req: NextRequest) {
  const auth = await requireOwnerOrEmployee(req);
  if ('response' in auth) return auth.response;

  try {
    const body = await req.json();
    if (!body.name) {
      return NextResponse.json({ success: false, error: 'Category name is required' }, { status: 400 });
    }

    const slug =
      body.slug ||
      body.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

    const newCategory = await createCategory({
      name: body.name,
      slug,
      description: body.description || '',
      imageUrl: body.imageUrl || '',
      parentId: body.parentId || null,
      sortOrder: Number(body.sortOrder) || 0,
      isActive: body.isActive !== false,
    });

    await addAuditLog({
      adminId: auth.admin.id,
      adminEmail: auth.admin.email,
      action: 'CATEGORY_CREATED',
      entity: 'Category',
      entityId: newCategory.id,
      details: { name: newCategory.name, slug: newCategory.slug },
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

    return NextResponse.json({ success: true, category: newCategory });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
