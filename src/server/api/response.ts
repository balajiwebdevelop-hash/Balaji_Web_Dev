import { NextResponse } from 'next/server';

// =============================================================
// STANDARDIZED API RESPONSE ENVELOPE
// =============================================================

export interface ApiSuccessEnvelope<T = any> {
  success: true;
  data?: T;
  [key: string]: any;
}

export interface ApiErrorEnvelope {
  success: false;
  error: string;
  code?: string;
}

export function apiSuccess<T = any>(
  payload?: T,
  status = 200,
  extraHeaders: Record<string, string> = {}
): NextResponse {
  const body: any = { success: true };
  if (payload !== undefined) {
    if (typeof payload === 'object' && payload !== null && !Array.isArray(payload)) {
      Object.assign(body, payload);
    } else {
      body.data = payload;
    }
  }

  return NextResponse.json(body, {
    status,
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      ...extraHeaders,
    },
  });
}

export function apiError(
  error: string,
  status = 400,
  code?: string,
  extraHeaders: Record<string, string> = {}
): NextResponse {
  // Prevent leaking internal database driver or system paths
  let sanitizedError = error;
  if (error.includes('PGRST') || error.includes('ENOTFOUND') || error.includes('connection refused')) {
    sanitizedError = 'Database service is currently unavailable. Please try again shortly.';
  }

  const body: ApiErrorEnvelope = {
    success: false,
    error: sanitizedError,
  };

  if (code) {
    body.code = code;
  }

  return NextResponse.json(body, {
    status,
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      ...extraHeaders,
    },
  });
}
