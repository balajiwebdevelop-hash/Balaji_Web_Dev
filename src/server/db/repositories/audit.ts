import crypto from 'crypto';
import { AuditLog } from '@/types';
import { isUUID, getDb, saveDb } from '../client';
import { sanitizeAuditDetails } from '../../security/sanitization';
import { isMySQLConfigured, query, execute } from '../mysql';

export async function addAuditLog(entry: Omit<AuditLog, 'id' | 'createdAt'>): Promise<AuditLog> {
  const now = new Date().toISOString();
  const safeDetails = entry.details ? sanitizeAuditDetails(entry.details) : null;
  const logId = crypto.randomUUID();
  const adminIdToUse = entry.adminId && isUUID(entry.adminId) ? entry.adminId : null;

  // 1. Hostinger MySQL Primary Layer
  if (isMySQLConfigured()) {
    try {
      await execute(
        `INSERT INTO audit_logs (id, admin_id, admin_email, action, entity, entity_id, details, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`,
        [
          logId,
          adminIdToUse,
          entry.adminEmail,
          entry.action,
          entry.entity,
          entry.entityId,
          safeDetails ? JSON.stringify(safeDetails) : null,
        ]
      );

      return {
        id: logId,
        adminId: entry.adminId || 'system',
        adminEmail: entry.adminEmail,
        action: entry.action,
        entity: entry.entity,
        entityId: entry.entityId,
        details: safeDetails,
        createdAt: now,
      };
    } catch (mysqlErr) {
      console.warn('Hostinger MySQL addAuditLog failed, falling back:', mysqlErr);
    }
  }

  // 2. Unit Test / Local Fallback
  const db = getDb();
  const log: AuditLog = {
    ...entry,
    details: safeDetails,
    id: logId,
    createdAt: now,
  };
  db.auditLogs.unshift(log);
  if (db.auditLogs.length > 500) db.auditLogs.pop();
  saveDb(db);
  return log;
}

export async function getAuditLogs(limit = 100, offset = 0): Promise<AuditLog[]> {
  // 1. Hostinger MySQL Primary Layer
  if (isMySQLConfigured()) {
    try {
      const rows = await query(
        'SELECT * FROM audit_logs ORDER BY created_at DESC LIMIT ? OFFSET ?',
        [Number(limit), Number(offset)]
      );
      if (rows && rows.length > 0) {
        return rows.map((l: any) => {
          let parsedDetails = l.details;
          if (typeof parsedDetails === 'string') {
            try { parsedDetails = JSON.parse(parsedDetails); } catch {}
          }
          return {
            id: l.id,
            adminId: l.admin_id || 'system',
            adminEmail: l.admin_email,
            action: l.action,
            entity: l.entity,
            entityId: l.entity_id,
            details: parsedDetails,
            createdAt: l.created_at instanceof Date ? l.created_at.toISOString() : l.created_at,
          };
        });
      }
      return [];
    } catch (mysqlErr) {
      console.warn('Hostinger MySQL getAuditLogs failed, falling back:', mysqlErr);
    }
  }

  // 2. Unit Test / Local Fallback
  const db = getDb();
  return db.auditLogs.slice(offset, offset + limit);
}
