import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json().catch(() => ({}));

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ success: false, error: 'Email is required' }, { status: 400 });
    }

    // Security practice: Never disclose whether an email exists or not to prevent user enumeration
    return NextResponse.json({
      success: true,
      message: 'If an account exists with this email address, password reset instructions have been dispatched.',
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: 'Request could not be processed. Please try again.' }, { status: 500 });
  }
}
