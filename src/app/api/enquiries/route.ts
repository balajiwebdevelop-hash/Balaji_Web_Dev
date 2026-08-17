import { NextRequest, NextResponse } from 'next/server';
import { createEnquiry, getEnquiries, addAuditLog } from '@/lib/db';
import { verifyAdminToken } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('balaji_admin_session')?.value;
    const admin = token ? verifyAdminToken(token) : null;
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Unauthorized admin access' }, { status: 401 });
    }

    const enquiries = await getEnquiries();
    return NextResponse.json({ success: true, enquiries });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.name || !body.email || !body.phone || !body.message) {
      return NextResponse.json(
        { success: false, error: 'Name, email, phone, and message are required.' },
        { status: 400 }
      );
    }

    const newEnquiry = await createEnquiry({
      name: body.name,
      email: body.email,
      phone: body.phone,
      subject: body.subject || 'Studio Consultation',
      message: body.message,
      source: body.source || 'Contact Form',
    });

    return NextResponse.json({ success: true, enquiry: newEnquiry });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
