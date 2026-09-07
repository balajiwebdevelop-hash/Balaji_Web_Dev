/**
 * BALAJI ARCHITECT & INTERIORS — AUTHORITATIVE DATABASE ACCESS FACADE
 *
 * This module re-exports domain repositories, single-transaction atomic RPCs,
 * and database client utilities from `@/server/db`.
 *
 * Preserves 100% backward compatibility for all pages and components while
 * enforcing separation of concerns, single source of truth, and zero silent
 * local file fallbacks in production.
 */

export * from '@/server/db';
