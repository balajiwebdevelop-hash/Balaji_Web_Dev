import { AdminRole, AdminUser } from '@/types';

// =============================================================
// CENTRALIZED PERMISSIONS & ROLE-BASED ACCESS CONTROL (RBAC)
// =============================================================

export type Permission =
  | 'products.read'
  | 'products.write'
  | 'inventory.write'
  | 'orders.read'
  | 'orders.write'
  | 'quotes.read'
  | 'quotes.write'
  | 'projects.write'
  | 'services.write'
  | 'customers.read'
  | 'owner.settings'
  | 'owner.payment'
  | 'owner.employee_management'
  | 'owner.audit_logs';

const ALL_PERMISSIONS: Permission[] = [
  'products.read',
  'products.write',
  'inventory.write',
  'orders.read',
  'orders.write',
  'quotes.read',
  'quotes.write',
  'projects.write',
  'services.write',
  'customers.read',
  'owner.settings',
  'owner.payment',
  'owner.employee_management',
  'owner.audit_logs',
];

const EMPLOYEE_PERMISSIONS: Permission[] = [
  'products.read',
  'products.write',
  'inventory.write',
  'orders.read',
  'orders.write',
  'quotes.read',
  'quotes.write',
  'projects.write',
  'services.write',
  'customers.read',
];

export const ROLE_PERMISSIONS: Record<AdminRole, Permission[]> = {
  owner: ALL_PERMISSIONS,
  super_admin: ALL_PERMISSIONS,
  employee: EMPLOYEE_PERMISSIONS,
  editor: EMPLOYEE_PERMISSIONS,
  viewer: ['products.read', 'orders.read', 'quotes.read', 'customers.read'],
};

export function hasPermission(role: AdminRole, permission: Permission): boolean {
  const permissions = ROLE_PERMISSIONS[role] || [];
  return permissions.includes(permission);
}

export function isOwner(admin: AdminUser): boolean {
  return admin.role === 'owner' || admin.role === 'super_admin';
}

export function canManageSettings(admin: AdminUser): boolean {
  return hasPermission(admin.role, 'owner.settings');
}

export function canManageEmployees(admin: AdminUser): boolean {
  return hasPermission(admin.role, 'owner.employee_management');
}

export function canManageOrders(admin: AdminUser): boolean {
  return hasPermission(admin.role, 'orders.write');
}
