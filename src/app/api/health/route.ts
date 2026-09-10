import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import { isMySQLConfigured, isProduction } from '@/server/db/client';
import { getSiteSettings } from '@/server/db/repositories/settings';
import { DEFAULT_VAPID_PUBLIC_KEY } from '@/lib/push-client';

export const dynamic = 'force-dynamic';

export async function GET() {
  const timestamp = new Date().toISOString();
  const checks: {
    database: { status: 'healthy' | 'degraded' | 'unhealthy'; type: string; latencyMs?: number; message?: string };
    storage: { status: 'healthy' | 'degraded' | 'unhealthy'; provider: string; message?: string };
    pushNotifications: { status: 'healthy' | 'degraded' | 'unhealthy'; configured: boolean; message?: string };
  } = {
    database: { status: 'unhealthy', type: 'unknown' },
    storage: { status: 'unhealthy', provider: 'unknown' },
    pushNotifications: { status: 'unhealthy', configured: false },
  };

  // 1. Database Check (Hostinger MySQL)
  const dbStart = Date.now();
  try {
    if (isMySQLConfigured()) {
      checks.database.type = 'hostinger_mysql';
      await getSiteSettings();
      checks.database.latencyMs = Date.now() - dbStart;
      checks.database.status = 'healthy';
    } else {
      checks.database.type = isProduction() ? 'unconfigured' : 'local_fixture';
      if (isProduction()) {
        checks.database.status = 'unhealthy';
        checks.database.message = 'Hostinger MySQL credentials missing in production';
      } else {
        await getSiteSettings();
        checks.database.latencyMs = Date.now() - dbStart;
        checks.database.status = 'healthy';
      }
    }
  } catch (dbErr: any) {
    checks.database.status = 'unhealthy';
    checks.database.latencyMs = Date.now() - dbStart;
    checks.database.message = dbErr.message || 'Database connection error';
  }

  // 2. Storage Check (Filesystem / Public uploads)
  try {
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    checks.storage.provider = 'local_filesystem';
    checks.storage.status = 'healthy';
  } catch (storageErr: any) {
    checks.storage.provider = 'local_filesystem';
    checks.storage.status = isProduction() ? 'degraded' : 'healthy';
    checks.storage.message = storageErr.message || 'Storage check error';
  }

  // 3. Push Notifications Check (VAPID status without exposing secrets)
  try {
    const vapidPublicKey =
      process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY ||
      process.env.VAPID_PUBLIC_KEY ||
      DEFAULT_VAPID_PUBLIC_KEY;
    const vapidPrivateKey = process.env.VAPID_PRIVATE_KEY;
    const isPushConfigured = Boolean(vapidPublicKey && (vapidPrivateKey || !isProduction()));
    checks.pushNotifications = {
      status: isPushConfigured ? 'healthy' : 'degraded',
      configured: isPushConfigured,
      message: isPushConfigured ? 'Web Push VAPID active' : 'VAPID private key not set in environment',
    };
  } catch (pushErr: any) {
    checks.pushNotifications = {
      status: 'degraded',
      configured: false,
      message: 'Push check error',
    };
  }

  // Determine overall system status
  let overallStatus: 'healthy' | 'degraded' | 'unhealthy' = 'healthy';
  if (checks.database.status !== 'healthy') {
    overallStatus = 'unhealthy';
  } else if (
    checks.storage.status !== 'healthy' ||
    checks.pushNotifications.status !== 'healthy'
  ) {
    overallStatus = 'degraded';
  }

  const httpStatus = overallStatus === 'unhealthy' ? 503 : 200;

  return NextResponse.json(
    {
      status: overallStatus,
      timestamp,
      checks,
    },
    { status: httpStatus }
  );
}
