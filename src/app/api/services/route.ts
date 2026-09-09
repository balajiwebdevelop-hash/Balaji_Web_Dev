import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getServices, createService, addAuditLog } from '@/lib/db';
import { requirePermission } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const isAll = searchParams.get('all') === 'true';
    const publishedOnly = !isAll;
    const services = await getServices(publishedOnly);
    return NextResponse.json(
      { services },
      {
        headers: {
          'Cache-Control': isAll
            ? 'no-store, no-cache, must-revalidate'
            : 'public, max-age=30, s-maxage=60, stale-while-revalidate=300',
        },
      }
    );
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const auth = await requirePermission(req, 'services.create');
  if ('response' in auth) return auth.response;

  try {
    const body = await req.json();
    if (!body.title) {
      return NextResponse.json({ success: false, error: 'Service title is required' }, { status: 400 });
    }

    const slug =
      body.slug ||
      body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

    const newService = await createService({
      title: body.title,
      slug,
      shortDesc: body.shortDesc || '',
      fullDesc: body.fullDesc || '',
      iconName: body.iconName || 'Compass',
      imageUrl: body.imageUrl || '',
      deliverables: Array.isArray(body.deliverables) ? body.deliverables : [],
      sortOrder: Number(body.sortOrder) || 0,
      isPublished: body.isPublished !== false,
    });

    await addAuditLog({
      adminId: auth.admin.id,
      adminEmail: auth.admin.email,
      action: 'SERVICE_CREATED',
      entity: 'Service',
      entityId: newService.id,
      details: { title: newService.title },
    });

    // Invalidate customer-facing caches immediately
    try {
      revalidatePath('/', 'layout');
      revalidatePath('/services');
    } catch (revErr) {
      console.warn('Revalidation notice:', revErr);
    }

    return NextResponse.json({ success: true, service: newService });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
