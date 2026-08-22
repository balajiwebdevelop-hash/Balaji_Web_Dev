import { NextRequest, NextResponse } from 'next/server';
import { updateEnquiryStatus } from '@/lib/db';
import { requireOwnerOrEmployee } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireOwnerOrEmployee(req);
  if ('response' in auth) return auth.response;

  try {
    const { status } = await req.json();
    const updated = await updateEnquiryStatus(params.id, status);

    if (!updated) {
      return NextResponse.json({ success: false, error: 'Enquiry not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, enquiry: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
