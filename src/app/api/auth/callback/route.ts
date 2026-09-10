import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  return NextResponse.json(
    {
      success: false,
      error: 'OAuth provider has been migrated. Please sign in with your email and password at /studio.',
      redirectUrl: '/studio',
    },
    { status: 400 }
  );
}
