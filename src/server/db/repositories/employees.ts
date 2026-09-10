import crypto from 'crypto';
import { AdminUser } from '@/types';
import { isUUID, getDb, saveDb } from '../client';
import { mapAdminUser } from '../mappers';
import { protectOwnerFromModification } from '../../auth/rbac';
import { revokeAllSessionsForAdmin } from '../../auth/tokens';
import { isMySQLConfigured, query, queryOne, execute } from '../mysql';

export async function getAdmins(): Promise<AdminUser[]> {
  // 1. Hostinger MySQL Primary Layer
  if (isMySQLConfigured()) {
    try {
      const rows = await query('SELECT * FROM admins ORDER BY created_at DESC');
      if (rows && rows.length > 0) {
        return rows.map((adm: any) => {
          const { passwordHash: _, ...safe } = mapAdminUser(adm);
          return safe;
        });
      }
    } catch (err) {
      console.warn('Hostinger MySQL getAdmins failed, falling back:', err);
    }
  }

  // 2. Unit Test / Local Fallback
  const db = getDb();
  return db.admins.map((adm) => {
    const { passwordHash: _, ...safe } = adm;
    return safe;
  });
}

export async function getAdminById(id: string): Promise<(AdminUser & { passwordHash: string }) | null> {
  // 1. Hostinger MySQL Primary Layer
  if (isMySQLConfigured()) {
    try {
      const row = await queryOne('SELECT * FROM admins WHERE id = ? LIMIT 1', [id]);
      if (row) {
        const mapped = mapAdminUser(row);
        if (!mapped.status) mapped.status = 'active';
        return mapped;
      }
    } catch (err) {
      console.warn('Hostinger MySQL getAdminById failed, falling back:', err);
    }
  }

  // 2. Unit Test / Local Fallback
  const db = getDb();
  const found = db.admins.find((a) => a.id === id);
  if (!found) return null;
  return {
    ...found,
    status: found.status || 'active',
    mustChangePassword: Boolean(found.mustChangePassword),
  };
}

export async function getAdminByEmail(email: string): Promise<(AdminUser & { passwordHash: string }) | null> {
  const normalizedEmail = email.trim().toLowerCase();

  // 1. Hostinger MySQL Primary Layer
  if (isMySQLConfigured()) {
    try {
      const row = await queryOne('SELECT * FROM admins WHERE LOWER(email) = LOWER(?) LIMIT 1', [normalizedEmail]);
      if (row) {
        const mapped = mapAdminUser(row);
        if (!mapped.status) mapped.status = 'active';
        return mapped;
      }
    } catch (err) {
      console.warn('Hostinger MySQL getAdminByEmail failed, falling back:', err);
    }
  }

  // 2. Unit Test / Local Fallback
  const db = getDb();
  const found = db.admins.find((a) => a.email.toLowerCase() === normalizedEmail);
  if (!found) return null;
  return {
    ...found,
    status: found.status || 'active',
    mustChangePassword: Boolean(found.mustChangePassword),
  };
}

export async function createEmployeeAdmin(
  employeeData: {
    email: string;
    name: string;
    passwordHash?: string;
    role?: 'employee' | 'editor';
    temporaryPassword?: string;
    mustChangePassword?: boolean;
  },
  actor?: { id: string; email: string }
): Promise<AdminUser> {
  const normalizedEmail = employeeData.email.trim().toLowerCase();
  const now = new Date().toISOString();

  const existing = await getAdminByEmail(normalizedEmail);
  if (existing) {
    throw new Error('An account with this email address already exists in the system.');
  }

  const derivedHash =
    employeeData.passwordHash ||
    (employeeData.temporaryPassword ? hashBootstrapPassword(employeeData.temporaryPassword) : hashBootstrapPassword('Default#2026!'));

  // 1. Hostinger MySQL Primary Layer
  if (isMySQLConfigured()) {
    try {
      const admId = `admin-${crypto.randomUUID()}`;
      await execute(
        `INSERT INTO admins (id, email, name, password_hash, role, status, must_change_password, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, 'active', ?, NOW(), NOW())`,
        [
          admId,
          normalizedEmail,
          employeeData.name,
          derivedHash,
          employeeData.role || 'employee',
          employeeData.mustChangePassword !== false ? 1 : 0,
        ]
      );

      const inserted = await queryOne('SELECT * FROM admins WHERE id = ?', [admId]);
      if (inserted) {
        const { passwordHash: _, ...safeAdmin } = mapAdminUser(inserted);
        return safeAdmin;
      }
      throw new Error(`Failed to retrieve newly created admin ${admId}`);
    } catch (mysqlErr: any) {
      console.error('Hostinger MySQL createEmployeeAdmin failed:', mysqlErr);
      throw mysqlErr;
    }
  }

  // 2. Unit Test / Local Fallback
  const db = getDb();
  const newAdmin: AdminUser & { passwordHash: string } = {
    id: `admin-${Date.now()}-${crypto.randomBytes(3).toString('hex')}`,
    email: normalizedEmail,
    name: employeeData.name,
    passwordHash: derivedHash,
    role: employeeData.role || 'employee',
    status: 'active',
    mustChangePassword: employeeData.mustChangePassword !== undefined ? employeeData.mustChangePassword : true,
    createdAt: now,
    updatedAt: now,
  };

  db.admins.push(newAdmin);
  saveDb(db);
  const { passwordHash: _, ...safeAdmin } = newAdmin;
  return safeAdmin;
}

export async function updateEmployeeAdmin(
  id: string,
  partialData: {
    email?: string;
    name?: string;
    role?: 'employee' | 'editor';
    status?: 'active' | 'disabled';
    mustChangePassword?: boolean;
  },
  actor?: { id: string; email: string; role?: any }
): Promise<AdminUser | null> {
  const current = await getAdminById(id);
  if (!current) return null;

  if (actor) {
    protectOwnerFromModification(
      current as any,
      actor as any,
      partialData.status === 'disabled' ? 'disable' : 'downgrade'
    );
  }

  // If status is being disabled, immediately revoke all active sessions
  if (partialData.status === 'disabled') {
    revokeAllSessionsForAdmin(id);
  }

  const now = new Date().toISOString();

  // 1. Hostinger MySQL Primary Layer
  if (isMySQLConfigured()) {
    try {
      const updates: string[] = ['updated_at = NOW()'];
      const params: any[] = [];
      if (partialData.email !== undefined) { updates.push('email = ?'); params.push(partialData.email.trim().toLowerCase()); }
      if (partialData.name !== undefined) { updates.push('name = ?'); params.push(partialData.name); }
      if (partialData.role !== undefined) { updates.push('role = ?'); params.push(partialData.role); }
      if (partialData.status !== undefined) { updates.push('status = ?'); params.push(partialData.status); }
      if (partialData.mustChangePassword !== undefined) { updates.push('must_change_password = ?'); params.push(partialData.mustChangePassword ? 1 : 0); }

      params.push(id);
      await execute(`UPDATE admins SET ${updates.join(', ')} WHERE id = ?`, params);

      const updated = await queryOne('SELECT * FROM admins WHERE id = ?', [id]);
      if (updated) {
        const { passwordHash: _, ...safeAdmin } = mapAdminUser(updated);
        return safeAdmin;
      }
      return null;
    } catch (mysqlErr: any) {
      console.error('Hostinger MySQL updateEmployeeAdmin failed:', mysqlErr);
      throw mysqlErr;
    }
  }

  // 2. Unit Test / Local Fallback
  const db = getDb();
  const index = db.admins.findIndex((a) => a.id === id);
  if (index === -1) return null;

  db.admins[index] = {
    ...db.admins[index],
    ...partialData,
    updatedAt: now,
  };
  saveDb(db);
  const { passwordHash: _, ...safeAdmin } = db.admins[index];
  return safeAdmin;
}

export async function deleteEmployeeAdmin(
  id: string,
  actor?: { id: string; email: string; role?: any }
): Promise<boolean> {
  const target = await getAdminById(id);
  if (!target) return false;

  if (actor) {
    protectOwnerFromModification(target as any, actor as any, 'delete');
  }

  revokeAllSessionsForAdmin(id);

  // 1. Hostinger MySQL Primary Layer
  if (isMySQLConfigured()) {
    try {
      const res = await execute('DELETE FROM admins WHERE id = ?', [id]);
      return res.affectedRows > 0;
    } catch (mysqlErr: any) {
      console.error('Hostinger MySQL deleteEmployeeAdmin failed:', mysqlErr);
      throw mysqlErr;
    }
  }

  // 2. Unit Test / Local Fallback
  const db = getDb();
  const initialLength = db.admins.length;
  db.admins = db.admins.filter((a) => a.id !== id);
  if (db.admins.length < initialLength) {
    saveDb(db);
    return true;
  }
  return false;
}

export async function resetEmployeePassword(
  id: string,
  temporaryPasswordOrHash: string,
  actor?: { id: string; email: string; role?: any }
): Promise<boolean> {
  const target = await getAdminById(id);
  if (!target) return false;

  if (actor) {
    protectOwnerFromModification(target as any, actor as any, 'reset_password');
  }

  const derivedHash = temporaryPasswordOrHash.includes(':')
    ? temporaryPasswordOrHash
    : hashBootstrapPassword(temporaryPasswordOrHash);

  revokeAllSessionsForAdmin(id);

  // 1. Hostinger MySQL Primary Layer
  if (isMySQLConfigured()) {
    try {
      await execute('UPDATE admins SET password_hash = ?, must_change_password = 1, updated_at = NOW() WHERE id = ?', [derivedHash, id]);
      return true;
    } catch (mysqlErr: any) {
      console.error('Hostinger MySQL resetEmployeePassword failed:', mysqlErr);
      throw mysqlErr;
    }
  }

  // 2. Unit Test / Local Fallback
  const db = getDb();
  const adm = db.admins.find((a) => a.id === id);
  if (adm) {
    adm.passwordHash = derivedHash;
    adm.mustChangePassword = true;
    adm.updatedAt = new Date().toISOString();
    saveDb(db);
    return true;
  }
  return false;
}

export async function updateAdminPassword(
  adminId: string,
  newPasswordHash: string
): Promise<boolean> {
  // 1. Hostinger MySQL Primary Layer
  if (isMySQLConfigured()) {
    try {
      await execute('UPDATE admins SET password_hash = ?, must_change_password = 0, updated_at = NOW() WHERE id = ? OR LOWER(email) = LOWER(?)', [newPasswordHash, adminId, adminId]);
      return true;
    } catch (mysqlErr: any) {
      console.error('Hostinger MySQL updateAdminPassword failed:', mysqlErr);
      throw mysqlErr;
    }
  }

  // 2. Unit Test / Local Fallback
  const db = getDb();
  const admin = db.admins.find(
    (a) => a.id === adminId || a.email.toLowerCase() === adminId.trim().toLowerCase()
  );
  if (admin) {
    admin.passwordHash = newPasswordHash;
    admin.mustChangePassword = false;
    admin.updatedAt = new Date().toISOString();
    saveDb(db);
    return true;
  }
  return false;
}

export async function recordAdminLogin(adminId: string): Promise<void> {
  // 1. Hostinger MySQL Primary Layer
  if (isMySQLConfigured()) {
    try {
      await execute('UPDATE admins SET last_login_at = NOW(), updated_at = NOW() WHERE id = ? OR LOWER(email) = LOWER(?)', [adminId, adminId]);
      return;
    } catch (mysqlErr) {
      console.warn('Hostinger MySQL recordAdminLogin failed:', mysqlErr);
      return;
    }
  }

  // 2. Unit Test / Local Fallback (Only in non-production environments)
  if (process.env.NODE_ENV !== 'production') {
    try {
      const db = getDb();
      const adm = db.admins.find((a) => a.id === adminId || a.email === adminId);
      if (adm) {
        adm.lastLoginAt = new Date().toISOString();
        saveDb(db);
      }
    } catch (fallbackErr) {
      console.warn('Local fallback recordAdminLogin failed:', fallbackErr);
    }
  }
}

function hashBootstrapPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const derivedKey = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512');
  return `${salt}:${derivedKey.toString('hex')}`;
}

export async function bootstrapInitialEmployee(): Promise<void> {
  const existing = await getAdminByEmail('employee@balaji.com');
  if (!existing && isMySQLConfigured()) {
    const initialTempPass = `Temp#${crypto.randomBytes(4).toString('hex')}!`;
    const hash = hashBootstrapPassword(initialTempPass);
    await execute(
      `INSERT INTO admins (id, email, name, password_hash, role, status, must_change_password, created_at, updated_at)
       VALUES (?, 'employee@balaji.com', 'Balaji Studio Associate', ?, 'employee', 'active', 1, NOW(), NOW())`,
      [`admin-${crypto.randomUUID()}`, hash]
    );
  }
}
