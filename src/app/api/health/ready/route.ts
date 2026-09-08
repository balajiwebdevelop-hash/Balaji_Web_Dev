import { NextResponse } from 'next/server';
import { isSupabaseConfigured, getServiceSupabase } from '@/server/db/client';

export const dynamic = 'force-dynamic';

export async function GET() {
  const timestamp = new Date().toISOString();

  if (!isSupabaseConfigured()) {
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        {
          status: 'not_ready',
          timestamp,
          database: {
            configured: false,
            connected: false,
            error: 'SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY missing in production environment.',
          },
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      {
        status: 'ready',
        timestamp,
        mode: 'development_fallback',
        database: {
          configured: false,
          connected: true,
          provider: 'local_fixture',
        },
      },
      { status: 200 }
    );
  }

  try {
    const supabase = getServiceSupabase();
    const { error } = await supabase.from('site_settings').select('key').limit(1);

    if (error) {
      return NextResponse.json(
        {
          status: 'not_ready',
          timestamp,
          database: {
            configured: true,
            connected: false,
            error: error.message,
          },
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      {
        status: 'ready',
        timestamp,
        mode: 'production',
        database: {
          configured: true,
          connected: true,
          provider: 'supabase_postgres',
        },
      },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      {
        status: 'not_ready',
        timestamp,
        database: {
          configured: true,
          connected: false,
          error: err.message || 'Unknown probe error',
        },
      },
      { status: 503 }
    );
  }
}
