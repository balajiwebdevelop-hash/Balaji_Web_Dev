import crypto from 'crypto';
import { AuditLog } from '@/types';
import {
  isSupabaseConfigured,
  isSupabaseAvailable,
  getServiceSupabase,
  isUUID,
  getDb,
  saveDb,
} from '../client';
import { sanitizeAuditDetails } from '../../security/sanitization';

export async function addAuditLog(entry: Omit<AuditLog, 'id' | 'createdAt'>): Promise<AuditLog> {
  const now = new Date().toISOString();
  const safeDetails = entry.details ? sanitizeAuditDetails(entry.details) : null;

  if (await isSupabaseAvailable()) {
    try {
      const supabase = getServiceSupabase();
      const adminIdToUse = entry.adminId && isUUID(entry.adminId) ? entry.adminId : null;

      const { data, error } = await supabase
        .from('audit_logs')
        .insert({
          admin_id: adminIdToUse,
          admin_email: entry.adminEmail,
          action: entry.action,
          entity: entry.entity,
          entity_id: entry.entityId,
          details: safeDetails,
          created_at: now,
        })
        .select()
        .single();

      if (!error && data) {
        return {
          id: data.id,
          adminId: data.admin_id || 'system',
          adminEmail: data.admin_email,
          action: data.action,
          entity: data.entity,
          entityId: data.entity_id,
          details: data.details,
          createdAt: data.created_at,
        };
      }
    } catch (err) {
      console.warn('Supabase addAuditLog notice:', err);
    }
  }

  const db = getDb();
  const log: AuditLog = {
    ...entry,
    details: safeDetails,
    id: crypto.randomUUID(),
    createdAt: now,
  };
  db.auditLogs.unshift(log);
  if (db.auditLogs.length > 500) db.auditLogs.pop();
  saveDb(db);
  return log;
}

export async function getAuditLogs(limit = 100, offset = 0): Promise<AuditLog[]> {
  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    let query = supabase
      .from('audit_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    const { data, error } = await query;
    if (error) throw new Error(`Failed to load audit logs: ${error.message}`);
    return (data || []).map((l: any) => ({
      id: l.id,
      adminId: l.admin_id || 'system',
      adminEmail: l.admin_email,
      action: l.action,
      entity: l.entity,
      entityId: l.entity_id,
      details: l.details,
      createdAt: l.created_at,
    }));
  }

  const db = getDb();
  return db.auditLogs.slice(offset, offset + limit);
}
