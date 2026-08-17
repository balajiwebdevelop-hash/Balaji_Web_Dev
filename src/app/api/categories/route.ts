import { NextRequest, NextResponse } from 'next/server';
import { getCategories, getAllCategoriesAdmin, createCategory, addAuditLog } from '@/lib/db';
import { verifyAdminToken } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const isAdmin = searchParams.get('admin') === 'true';

    const categories = isAdmin ? await getAllCategoriesAdmin() : await getCategories();
    return NextResponse.json({ categories });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('balaji_admin_session')?.value;
    const admin = token ? verifyAdminToken(token) : null;
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Unauthorized admin access' }, { status: 401 });
    }

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
      adminId: admin.id,
      adminEmail: admin.email,
      action: 'CATEGORY_CREATED',
      entity: 'Category',
      entityId: newCategory.id,
      details: { name: newCategory.name, slug: newCategory.slug },
    });

    return NextResponse.json({ success: true, category: newCategory });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
