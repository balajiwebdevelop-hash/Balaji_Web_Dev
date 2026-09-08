import { NextResponse } from 'next/server';

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly details?: any;

  constructor(message: string, statusCode = 500, code = 'INTERNAL_ERROR', details?: any) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Authentication required to access this atelier resource', details?: any) {
    super(message, 401, 'UNAUTHORIZED', details);
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'You do not have the required administrative permissions for this action', details?: any) {
    super(message, 403, 'FORBIDDEN', details);
  }
}

export class NotFoundError extends AppError {
  constructor(entity = 'Resource', details?: any) {
    super(`${entity} not found`, 404, 'NOT_FOUND', details);
  }
}

export class ConflictError extends AppError {
  constructor(message: string, details?: any) {
    super(message, 409, 'CONFLICT', details);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: any) {
    super(message, 422, 'VALIDATION_ERROR', details);
  }
}

export class RateLimitError extends AppError {
  constructor(message = 'Too many requests. Please try again later.', details?: any) {
    super(message, 429, 'RATE_LIMITED', details);
  }
}

export class DatabaseUnavailableError extends AppError {
  constructor(message = 'The primary database service is temporarily unavailable. Please retry shortly.', details?: any) {
    super(message, 503, 'DATABASE_UNAVAILABLE', details);
  }
}

export interface StandardErrorResponse {
  success: false;
  error: string;
  code: string;
  statusCode: number;
  requestId?: string;
  details?: any;
}

export function formatErrorResponse(err: unknown, requestId?: string): NextResponse<StandardErrorResponse> {
  if (err instanceof AppError) {
    return NextResponse.json(
      {
        success: false,
        error: err.message,
        code: err.code,
        statusCode: err.statusCode,
        requestId,
        ...(err.details ? { details: err.details } : {}),
      },
      { status: err.statusCode }
    );
  }

  const message = err instanceof Error ? err.message : 'An unexpected error occurred';
  console.error('[Unhandled Server Error]', { requestId, error: err });

  // In production, do not leak raw SQL / internal error stack
  const isProd = process.env.NODE_ENV === 'production';
  const safeMessage = isProd ? 'An unexpected server error occurred. Please contact studio administration.' : message;

  return NextResponse.json(
    {
      success: false,
      error: safeMessage,
      code: 'INTERNAL_SERVER_ERROR',
      statusCode: 500,
      requestId,
    },
    { status: 500 }
  );
}
