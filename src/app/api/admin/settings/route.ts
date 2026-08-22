import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getSiteSettings, updateSiteSettings, addAuditLog } from '@/lib/db';
import { requireOwner } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const auth = await requireOwner(req);
  if ('response' in auth) return auth.response;

  try {
    const settings = await getSiteSettings();
    return NextResponse.json(
      { success: true, settings },
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

export async function PATCH(req: NextRequest) {
  const auth = await requireOwner(req);
  if ('response' in auth) return auth.response;

  try {
    const partialData = await req.json();
    if (!partialData || typeof partialData !== 'object') {
      return NextResponse.json({ success: false, error: 'Invalid settings payload' }, { status: 400 });
    }

    const updated = await updateSiteSettings(partialData);

    try {
      await addAuditLog({
        adminId: auth.admin.id,
        adminEmail: auth.admin.email,
        action: 'SITE_SETTINGS_UPDATED',
        entity: 'SiteSettings',
        details: {
          modifiedKeys: Object.keys(partialData),
          brandName: updated.brandName,
        },
      });
    } catch (auditErr) {
      console.warn('Audit log write notice:', auditErr);
    }

    // Invalidate customer-facing pages immediately
    try {
      revalidatePath('/', 'layout');
      revalidatePath('/materials');
      revalidatePath('/checkout');
      revalidatePath('/quote');
      revalidatePath('/about');
      revalidatePath('/contact');
    } catch (revErr) {
      console.warn('Revalidation notice:', revErr);
    }

    return NextResponse.json(
      { success: true, settings: updated },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        },
      }
    );
  } catch (err: any) {
    console.error('Settings update error:', err);
    return NextResponse.json({ success: false, error: err.message || 'Failed to update settings' }, { status: 500 });
  }
}
