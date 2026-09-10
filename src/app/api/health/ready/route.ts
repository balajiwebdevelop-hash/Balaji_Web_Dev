import { NextResponse } from 'next/server';
import { isMySQLConfigured, testMySQLConnection, isProduction } from '@/server/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const timestamp = new Date().toISOString();

  // 1. Hostinger MySQL Primary Probe
  if (isMySQLConfigured()) {
    const mysqlCheck = await testMySQLConnection();
    if (mysqlCheck.success) {
      return NextResponse.json(
        {
          status: 'ready',
          timestamp,
          mode: 'production',
          database: {
            configured: true,
            connected: true,
            provider: 'hostinger_mysql',
            user: process.env.DB_USER || 'u603162798_balajiarcdb',
            database: process.env.DB_NAME || 'u603162798_balaji_arc_db',
            host: process.env.DB_HOST || 'localhost',
            latencyMs: mysqlCheck.latencyMs,
          },
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          status: 'not_ready',
          timestamp,
          database: {
            configured: true,
            connected: false,
            provider: 'hostinger_mysql',
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            error: mysqlCheck.error || 'Failed to connect to Hostinger MySQL database.',
          },
        },
        { status: 503 }
      );
    }
  }

  // 2. Development / Fallback mode
  if (isProduction()) {
    return NextResponse.json(
      {
        status: 'not_ready',
        timestamp,
        database: {
          configured: false,
          connected: false,
          error: 'Hostinger MySQL database configuration missing in production environment.',
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

