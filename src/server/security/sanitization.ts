/**
 * Security & Sanitization Utilities for Balaji Atelier
 */

const REDACTED_KEYS = new Set([
  'password',
  'passwordhash',
  'password_hash',
  'token',
  'sessiontoken',
  'session_token',
  'jwt',
  'secret',
  'jwtsecret',
  'jwt_secret',
  'key',
  'vapidprivatekey',
  'vapid_private_key',
  'service_role_key',
  'servicerolekey',
]);

/**
 * Recursively sanitizes data before writing to audit logs or public responses,
 * scrubbing any credentials, tokens, or private secrets.
 */
export function sanitizeAuditDetails(data: any, depth = 0): any {
  if (depth > 5 || data === null || data === undefined) return data;

  if (typeof data !== 'object') {
    return data;
  }

  if (Array.isArray(data)) {
    return data.map((item) => sanitizeAuditDetails(item, depth + 1));
  }

  const sanitized: Record<string, any> = {};
  for (const [key, value] of Object.entries(data)) {
    const lowerKey = key.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (REDACTED_KEYS.has(lowerKey)) {
      sanitized[key] = '[REDACTED]';
    } else if (typeof value === 'object' && value !== null) {
      sanitized[key] = sanitizeAuditDetails(value, depth + 1);
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized;
}

/**
 * Inspects SVG string content to ensure no executable script tags, event handlers,
 * or unsafe protocols are embedded.
 */
export function isSafeSvg(content: string): boolean {
  if (!content || typeof content !== 'string') return false;
  const lower = content.toLowerCase();

  const isSvg = lower.includes('<svg') || lower.includes('<?xml');
  if (!isSvg) return false;

  const dangerousPatterns = [
    '<script',
    'onload=',
    'onerror=',
    'onclick=',
    'onmouseover=',
    'onfocus=',
    'javascript:',
    'data:text/html',
    'xlink:href="javascript',
  ];

  for (const pattern of dangerousPatterns) {
    if (lower.includes(pattern)) {
      return false;
    }
  }

  return true;
}
