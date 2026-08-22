import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getServices, createService, addAuditLog } from '@/lib/db';
import { requireOwnerOrEmployee } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const publishedOnly = searchParams.get('all') === 'true' ? false : true;
    const services = await getServices(publishedOnly);
    return NextResponse.json(
      { services },
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
