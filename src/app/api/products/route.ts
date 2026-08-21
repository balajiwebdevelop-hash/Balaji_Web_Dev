import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getProducts, createProduct, addAuditLog } from '@/lib/db';
import { verifyAdminToken } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get('categoryId') || undefined;
    const categorySlug = searchParams.get('category') || undefined;
    const featuredOnly = searchParams.get('featured') === 'true';
    const search = searchParams.get('search') || undefined;
    const publishedOnly = searchParams.get('all') === 'true' ? false : true;

    const products = await getProducts({
      categoryId,
      categorySlug,
      featuredOnly,
      search,
      publishedOnly,
    });

    return NextResponse.json(
      { products },
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
  try {
    const cookieToken = req.cookies.get('balaji_admin_session')?.value;
    const authHeader = req.headers.get('authorization')?.replace('Bearer ', '');
    const token = cookieToken || authHeader;

    const admin = token ? verifyAdminToken(token) : null;
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Unauthorized admin access' }, { status: 401 });
    }

    const body = await req.json();
    if (!body.name || !body.sku || !body.price || !body.categoryId) {
      return NextResponse.json(
        { success: false, error: 'Missing required product fields (name, sku, price, categoryId)' },
        { status: 400 }
      );
    }

    // Auto-generate slug if not provided
    const slug =
      body.slug ||
      body.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

    const newProduct = await createProduct({
      name: body.name,
      slug,
      sku: body.sku,
      brand: body.brand || 'Balaji Architect & Interiors',
      categoryId: body.categoryId,
      subcategory: body.subcategory || '',
      description: body.description || '',
      price: Number(body.price),
      salePrice: body.salePrice ? Number(body.salePrice) : undefined,
      unit: body.unit || 'sq ft',
      moq: Number(body.moq) || 1,
      stock: Number(body.stock) || 0,
      purchaseMode: body.purchaseMode || 'BUY_NOW',
      leadTime: body.leadTime || '3-5 business days',
      dimensions: body.dimensions || '',
      thickness: body.thickness || '',
      material: body.material || '',
      finish: body.finish || '',
      color: body.color || '',
      images: Array.isArray(body.images) ? body.images : [],
      variants: Array.isArray(body.variants) ? body.variants : [],
      isFeatured: Boolean(body.isFeatured),
      isNew: Boolean(body.isNew),
      isBestseller: Boolean(body.isBestseller),
      published: body.published !== false,
      tags: Array.isArray(body.tags) ? body.tags : [],
      specifications: body.specifications || {},
    });

    await addAuditLog({
      adminId: admin.id,
      adminEmail: admin.email,
      action: 'PRODUCT_CREATED',
      entity: 'Product',
      entityId: newProduct.id,
      details: { name: newProduct.name, sku: newProduct.sku, price: newProduct.price },
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

    return NextResponse.json({ success: true, product: newProduct });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
