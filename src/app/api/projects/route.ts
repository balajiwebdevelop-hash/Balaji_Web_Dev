import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getProjects, createProject, addAuditLog } from '@/lib/db';
import { requireOwnerOrEmployee } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const featuredOnly = searchParams.get('featured') === 'true';
    const publishedOnly = searchParams.get('all') === 'true' ? false : true;

    const projects = await getProjects({ featuredOnly, publishedOnly });
    return NextResponse.json(
      { projects },
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
    if (!body.title || !body.heroImage) {
      return NextResponse.json(
        { success: false, error: 'Project title and hero image are required' },
        { status: 400 }
      );
    }

    const slug =
      body.slug ||
      body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

    const newProject = await createProject({
      title: body.title,
      slug,
      location: body.location || 'Mumbai',
      year: body.year || new Date().getFullYear().toString(),
      projectType: body.projectType || 'Residential Interiors',
      area: body.area || '',
      shortDescription: body.shortDescription || '',
      description: body.description || '',
      heroImage: body.heroImage,
      gallery: Array.isArray(body.gallery) ? body.gallery : [],
      designApproach: body.designApproach || '',
      materialsUsed: Array.isArray(body.materialsUsed) ? body.materialsUsed : [],
      beforeAfter: body.beforeAfter,
      isPublished: body.isPublished !== false,
      isFeatured: Boolean(body.isFeatured),
      sortOrder: Number(body.sortOrder) || 0,
      tags: Array.isArray(body.tags) ? body.tags : [],
    });

    await addAuditLog({
      adminId: auth.admin.id,
      adminEmail: auth.admin.email,
      action: 'PROJECT_CREATED',
      entity: 'Project',
      entityId: newProject.id,
      details: { title: newProject.title, slug: newProject.slug },
    });

    // Invalidate customer-facing caches immediately
    try {
      revalidatePath('/', 'layout');
      revalidatePath('/projects');
      revalidatePath('/projects/[slug]', 'page');
    } catch (revErr) {
      console.warn('Revalidation notice:', revErr);
    }

    return NextResponse.json({ success: true, project: newProject });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
