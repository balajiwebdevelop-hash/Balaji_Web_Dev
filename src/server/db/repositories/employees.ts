import crypto from 'crypto';
import { AdminUser } from '@/types';
import {
  isSupabaseConfigured,
  getServiceSupabase,
  isUUID,
  getDb,
  saveDb,
} from '../client';
import { mapAdminUser } from '../mappers';

export async function getAdmins(): Promise<AdminUser[]> {
  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    const { data, error } = await supabase.from('admins').select('*').order('created_at', { ascending: false });
    if (error) {
      console.error('Supabase getAdmins error:', error);
      throw new Error(`Failed to load admin users: ${error.message}`);
    }
    return (data || []).map((adm) => {
      const { passwordHash: _, ...safe } = mapAdminUser(adm);
      return safe;
    });
  }

  const db = getDb();
  return db.admins.map((adm) => {
    const { passwordHash: _, ...safe } = adm;
    return safe;
  });
}

export async function getAdminById(id: string): Promise<(AdminUser & { passwordHash: string }) | null> {
  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    const { data, error } = await supabase.from('admins').select('*').eq('id', id).maybeSingle();
    if (error || !data) return null;
    return mapAdminUser(data);
  }

  const db = getDb();
  return db.admins.find((a) => a.id === id) || null;
}

export async function getAdminByEmail(email: string): Promise<(AdminUser & { passwordHash: string }) | null> {
  const normalizedEmail = email.trim().toLowerCase();
  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    const { data, error } = await supabase.from('admins').select('*').eq('email', normalizedEmail).maybeSingle();
    if (error || !data) return null;
    return mapAdminUser(data);
  }

  const db = getDb();
  return db.admins.find((a) => a.email.toLowerCase() === normalizedEmail) || null;
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

  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    const { data: inserted, error } = await supabase
      .from('admins')
      .insert({
        email: normalizedEmail,
        name: employeeData.name,
        password_hash: derivedHash,
        role: employeeData.role || 'employee',
        status: 'active',
        must_change_password: employeeData.mustChangePassword !== undefined ? employeeData.mustChangePassword : true,
        created_at: now,
        updated_at: now,
      })
      .select()
      .single();

    if (error || !inserted) {
      throw new Error(`Failed to create employee account: ${error?.message || 'Database error'}`);
    }

    const mapped = mapAdminUser(inserted);
    const { passwordHash: _, ...safeAdmin } = mapped;
    return safeAdmin;
  }

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
  actor?: { id: string; email: string }
): Promise<AdminUser | null> {
  const current = await getAdminById(id);
  if (!current) return null;

  if (current.role === 'owner' || current.role === 'super_admin') {
    if (partialData.status === 'disabled') {
      throw new Error('Cannot disable the master studio owner account.');
    }
  }

  const now = new Date().toISOString();

  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    const updates: any = { updated_at: now };
    if (partialData.email !== undefined) updates.email = partialData.email.trim().toLowerCase();
    if (partialData.name !== undefined) updates.name = partialData.name;
    if (partialData.role !== undefined) updates.role = partialData.role;
    if (partialData.status !== undefined) updates.status = partialData.status;
    if (partialData.mustChangePassword !== undefined) updates.must_change_password = partialData.mustChangePassword;

    const { data: updated, error } = await supabase
      .from('admins')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Failed to update account: ${error.message}`);
    const { passwordHash: _, ...safeAdmin } = mapAdminUser(updated);
    return safeAdmin;
  }

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
  actor?: { id: string; email: string }
): Promise<boolean> {
  const target = await getAdminById(id);
  if (!target) return false;

  if (target.role === 'owner' || target.role === 'super_admin') {
    throw new Error('Cannot delete the master studio owner account.');
  }

  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    const { error } = await supabase.from('admins').delete().eq('id', id);
    if (error) throw new Error(`Failed to delete employee account: ${error.message}`);
    return true;
  }

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
  temporaryPasswordHash: string,
  actor?: { id: string; email: string }
): Promise<boolean> {
  const target = await getAdminById(id);
  if (!target) return false;

  const now = new Date().toISOString();

  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    const { error } = await supabase
      .from('admins')
      .update({
        password_hash: temporaryPasswordHash,
        must_change_password: true,
        updated_at: now,
      })
      .eq('id', id);

    if (error) throw new Error(`Failed to reset password: ${error.message}`);
    return true;
  }

  const db = getDb();
  const adm = db.admins.find((a) => a.id === id);
  if (adm) {
    adm.passwordHash = temporaryPasswordHash;
    adm.mustChangePassword = true;
    adm.updatedAt = now;
    saveDb(db);
    return true;
  }
  return false;
}

export async function updateAdminPassword(
  adminId: string,
  newPasswordHash: string
): Promise<boolean> {
  const now = new Date().toISOString();

  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    let query = supabase.from('admins').update({
      password_hash: newPasswordHash,
      must_change_password: false,
      updated_at: now,
    });

    if (isUUID(adminId)) {
      query = query.eq('id', adminId);
    } else {
      query = query.eq('email', adminId.trim().toLowerCase());
    }

    const { error } = await query;
    if (error) throw new Error(`Failed to update password: ${error.message}`);
    return true;
  }

  const db = getDb();
  const admin = db.admins.find(
    (a) => a.id === adminId || a.email.toLowerCase() === adminId.trim().toLowerCase()
  );
  if (admin) {
    admin.passwordHash = newPasswordHash;
    admin.mustChangePassword = false;
    admin.updatedAt = now;
    saveDb(db);
    return true;
  }
  return false;
}

export async function recordAdminLogin(adminId: string): Promise<void> {
  const now = new Date().toISOString();
  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    let query = supabase.from('admins').update({ last_login_at: now, updated_at: now });
    if (isUUID(adminId)) {
      query = query.eq('id', adminId);
    } else {
      query = query.eq('email', adminId);
    }
    await query;
    return;
  }

  const db = getDb();
  const adm = db.admins.find((a) => a.id === adminId || a.email === adminId);
  if (adm) {
    adm.lastLoginAt = now;
    saveDb(db);
  }
}

function hashBootstrapPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const derivedKey = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512');
  return `${salt}:${derivedKey.toString('hex')}`;
}

export async function bootstrapInitialEmployee(): Promise<void> {
  const existing = await getAdminByEmail('employee@balaji.com');
  if (!existing) {
    if (isSupabaseConfigured()) {
      const supabase = getServiceSupabase();
      const initialTempPass = `Temp#${crypto.randomBytes(4).toString('hex')}!`;
      const hash = hashBootstrapPassword(initialTempPass);
      await supabase.from('admins').insert({
        email: 'employee@balaji.com',
        name: 'Balaji Studio Associate',
        password_hash: hash,
        role: 'employee',
        must_change_password: true,
      });
    }
  }
}

