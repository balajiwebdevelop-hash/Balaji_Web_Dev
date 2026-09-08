import { isProduction } from '../db/client';
import { AppError } from '../errors';

export interface ProductionConfigStatus {
  valid: boolean;
  isProduction: boolean;
  issues: string[];
}

/**
 * Validates critical production configuration at runtime.
 * Throws AppError in production if critical secrets or variables are missing.
 */
export function validateProductionConfig(): ProductionConfigStatus {
  const isProd = isProduction();
  const issues: string[] = [];

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  if (!supabaseUrl) {
    issues.push('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_URL');
  }

  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseServiceKey) {
    issues.push('Missing SUPABASE_SERVICE_ROLE_KEY');
  }

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    issues.push('Missing JWT_SECRET');
  }

  if (isProd && issues.length > 0) {
    throw new AppError(
      `Critical Production Security Error: Incomplete configuration. Issues: ${issues.join(', ')}`,
      500,
      'CRITICAL_CONFIG_ERROR',
      { issues }
    );
  }

  return {
    valid: issues.length === 0,
    isProduction: isProd,
    issues,
  };
}
