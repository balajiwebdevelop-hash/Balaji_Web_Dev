import { NextRequest, NextResponse } from 'next/server';
import { getSiteSettings, updateSiteSettings, addAuditLog } from '@/lib/db';
import { verifyAdminToken } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const settings = await getSiteSettings();
    return NextResponse.json({ success: true, settings });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const token = req.cookies.get('balaji_admin_session')?.value;
    const admin = token ? verifyAdminToken(token) : null;
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Unauthorized admin access' }, { status: 401 });
    }

    const partialData = await req.json();
    const updated = await updateSiteSettings(partialData);

    await addAuditLog({
      adminId: admin.id,
      adminEmail: admin.email,
      action: 'SITE_SETTINGS_UPDATED',
      entity: 'SiteSettings',
      details: { modifiedKeys: Object.keys(partialData) },
    });

    return NextResponse.json({ success: true, settings: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
