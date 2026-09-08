import { AdminRole, AdminUser } from '@/types';
import { ForbiddenError } from '../errors';

// =============================================================
// CENTRALIZED PERMISSIONS & ROLE-BASED ACCESS CONTROL (RBAC)
// =============================================================

export type Permission =
  // Products
  | 'products.read'
  | 'products.create'
  | 'products.update'
  | 'products.delete'
  | 'products.publish'
  | 'products.write' // backward-compat alias
  // Categories
  | 'categories.read'
  | 'categories.create'
  | 'categories.update'
  | 'categories.delete'
  // Inventory
  | 'inventory.read'
  | 'inventory.adjust'
  | 'inventory.write' // backward-compat alias
  // Orders
  | 'orders.read'
  | 'orders.update_status'
  | 'orders.cancel'
  | 'orders.export'
  | 'orders.write' // backward-compat alias
  // Quotes
  | 'quotes.read'
  | 'quotes.update'
  | 'quotes.convert'
  | 'quotes.write' // backward-compat alias
  // Projects
  | 'projects.read'
  | 'projects.create'
  | 'projects.update'
  | 'projects.delete'
  | 'projects.publish'
  | 'projects.write' // backward-compat alias
  // Services
  | 'services.read'
  | 'services.create'
  | 'services.update'
  | 'services.delete'
  | 'services.write' // backward-compat alias
  // Customers
  | 'customers.read'
  // Employees (Owner / Super Admin only)
  | 'employees.read'
  | 'employees.create'
  | 'employees.update'
  | 'employees.disable'
  | 'employees.reset_password'
  | 'employees.delete'
  | 'employees.write'
  | 'owner.employee_management' // backward-compat alias
  // Settings & CMS (Owner / Super Admin only)
  | 'settings.read'
  | 'settings.write'
  | 'owner.settings' // backward-compat alias
  // Payments (Owner / Super Admin only)
  | 'payments.read'
  | 'payments.write'
  | 'owner.payment' // backward-compat alias
  // Audit Logs (Owner / Super Admin only)
  | 'audit.read'
  | 'audit.export'
  | 'owner.audit_logs' // backward-compat alias
  // Analytics
  | 'analytics.read'
  // Notifications
  | 'notifications.manage';

const ALL_PERMISSIONS: Permission[] = [
  'products.read',
  'products.create',
  'products.update',
  'products.delete',
  'products.publish',
  'products.write',
  'categories.read',
  'categories.create',
  'categories.update',
  'categories.delete',
  'inventory.read',
  'inventory.adjust',
  'inventory.write',
  'orders.read',
  'orders.update_status',
  'orders.cancel',
  'orders.export',
  'orders.write',
  'quotes.read',
  'quotes.update',
  'quotes.convert',
  'quotes.write',
  'projects.read',
  'projects.create',
  'projects.update',
  'projects.delete',
  'projects.publish',
  'projects.write',
  'services.read',
  'services.create',
  'services.update',
  'services.delete',
  'services.write',
  'customers.read',
  'employees.read',
  'employees.create',
  'employees.update',
  'employees.disable',
  'employees.reset_password',
  'employees.delete',
  'employees.write',
  'owner.employee_management',
  'settings.read',
  'settings.write',
  'owner.settings',
  'payments.read',
  'payments.write',
  'owner.payment',
  'audit.read',
  'audit.export',
  'owner.audit_logs',
  'analytics.read',
  'notifications.manage',
];

const EMPLOYEE_PERMISSIONS: Permission[] = [
  'products.read',
  'products.create',
  'products.update',
  'products.publish',
  'products.write',
  'categories.read',
  'inventory.read',
  'inventory.adjust',
  'inventory.write',
  'orders.read',
  'orders.update_status',
  'orders.cancel',
  'orders.export',
  'orders.write',
  'quotes.read',
  'quotes.update',
  'quotes.convert',
  'quotes.write',
  'projects.read',
  'projects.create',
  'projects.update',
  'projects.publish',
  'projects.write',
  'services.read',
  'services.create',
  'services.update',
  'services.write',
  'customers.read',
  'analytics.read',
];

const EDITOR_PERMISSIONS: Permission[] = [
  'products.read',
  'products.create',
  'products.update',
  'products.publish',
  'products.write',
  'categories.read',
  'categories.create',
  'categories.update',
  'projects.read',
  'projects.create',
  'projects.update',
  'projects.publish',
  'projects.write',
  'services.read',
  'services.create',
  'services.update',
  'services.write',
];

const VIEWER_PERMISSIONS: Permission[] = [
  'products.read',
  'categories.read',
  'inventory.read',
  'orders.read',
  'quotes.read',
  'projects.read',
  'services.read',
  'customers.read',
  'analytics.read',
];

export const ROLE_PERMISSIONS: Record<AdminRole, Permission[]> = {
  owner: ALL_PERMISSIONS,
  super_admin: ALL_PERMISSIONS,
  employee: EMPLOYEE_PERMISSIONS,
  editor: EDITOR_PERMISSIONS,
  viewer: VIEWER_PERMISSIONS,
};

export function hasPermission(role: AdminRole, permission: Permission): boolean {
  const permissions = ROLE_PERMISSIONS[role] || [];
  if (permissions.includes(permission)) return true;

  // Backward compatibility alias checks
  if (permission === 'products.write') {
    return permissions.includes('products.create') || permissions.includes('products.update');
  }
  if (permission === 'orders.write') {
    return permissions.includes('orders.update_status') || permissions.includes('orders.cancel');
  }
  if (permission === 'quotes.write') {
    return permissions.includes('quotes.update') || permissions.includes('quotes.convert');
  }
  if (permission === 'owner.settings') {
    return permissions.includes('settings.write');
  }
  if (permission === 'owner.payment') {
    return permissions.includes('payments.write');
  }
  if (permission === 'owner.employee_management') {
    return permissions.includes('employees.create') || permissions.includes('employees.update');
  }
  if (permission === 'owner.audit_logs') {
    return permissions.includes('audit.read');
  }

  return false;
}

export function isOwner(admin: AdminUser): boolean {
  return admin.role === 'owner' || admin.role === 'super_admin';
}

export function canManageSettings(admin: AdminUser): boolean {
  return hasPermission(admin.role, 'settings.write');
}

export function canManageEmployees(admin: AdminUser): boolean {
  return hasPermission(admin.role, 'employees.create');
}

export function canManageOrders(admin: AdminUser): boolean {
  return hasPermission(admin.role, 'orders.update_status');
}

/**
 * Protects Owner / Super Admin accounts from self-deletion, disabling, or downgrade.
 */
export function protectOwnerFromModification(
  target: { id: string; role: AdminRole; email: string },
  actor: { id: string; role: AdminRole; email: string },
  action: 'delete' | 'disable' | 'downgrade' | 'reset_password'
): void {
  // Prevent any modification of super_admin/owner by non-owners
  if ((target.role === 'owner' || target.role === 'super_admin') && !isOwner(actor as any)) {
    throw new ForbiddenError('Only studio owners can manage owner or super_admin accounts');
  }

  // Prevent self-deletion or self-disabling
  if (target.id === actor.id && (action === 'delete' || action === 'disable')) {
    throw new ForbiddenError('Safety Protection: Studio owners cannot self-delete or disable their own account');
  }

  // Prevent primary principal architect Vikas Sir from ever being deleted or disabled
  if (target.email.toLowerCase().includes('vicks@balaji.com') && (action === 'delete' || action === 'disable')) {
    throw new ForbiddenError('Immutable Protection: The primary principal architect account cannot be disabled or deleted');
  }
}
