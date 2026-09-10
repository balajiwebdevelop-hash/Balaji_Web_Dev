import { isProduction, isMySQLConfigured } from '../db/client';
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

  if (!isMySQLConfigured()) {
    issues.push('Missing or incomplete Hostinger MySQL database configuration (DB_HOST, DB_USER, DB_PASSWORD, DB_NAME)');
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
