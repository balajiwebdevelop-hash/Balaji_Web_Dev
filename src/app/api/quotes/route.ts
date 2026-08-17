import { NextRequest, NextResponse } from 'next/server';
import { createQuote, getQuotes, addAuditLog } from '@/lib/db';
import { verifyAdminToken } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('balaji_admin_session')?.value;
    const admin = token ? verifyAdminToken(token) : null;
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Unauthorized admin access' }, { status: 401 });
    }

    const quotes = await getQuotes();
    return NextResponse.json({ success: true, quotes });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.customerName || !body.customerEmail || !body.customerPhone) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and phone are required for quotation generation.' },
        { status: 400 }
      );
    }

    const newQuote = await createQuote({
      customerName: body.customerName,
      customerEmail: body.customerEmail,
      customerPhone: body.customerPhone,
      projectType: body.projectType || 'General Architectural Commission',
      projectLocation: body.projectLocation || 'Unspecified',
      estimatedTimeline: body.estimatedTimeline || 'Planning',
      budgetRange: body.budgetRange || 'Flexible',
      notes: body.notes || '',
      items: Array.isArray(body.items) ? body.items : [],
    });

    await addAuditLog({
      adminId: 'system',
      adminEmail: 'quote@balaji.com',
      action: 'QUOTE_SUBMITTED',
      entity: 'Quote',
      entityId: newQuote.id,
      details: { quoteNumber: newQuote.quoteNumber, customer: newQuote.customerName },
    });

    return NextResponse.json({ success: true, quote: newQuote });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
