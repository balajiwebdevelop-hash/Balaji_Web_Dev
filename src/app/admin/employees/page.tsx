'use client';

import React, { useEffect, useState } from 'react';
import {
  UserCheck,
  Plus,
  Shield,
  Edit2,
  Trash2,
  KeyRound,
  Ban,
  CheckCircle,
  AlertTriangle,
  Search,
  RefreshCw,
  X,
  Lock,
  Mail,
  User,
  ShieldAlert,
} from 'lucide-react';
import { AdminLayout } from '@/components/AdminLayout';
import { AdminUser } from '@/types';
import { useAdminAuth } from '@/context/AdminAuthContext';

export default function EmployeeManagementPage() {
  const { admin } = useAdminAuth();
  const isOwner = admin?.role === 'owner' || admin?.role === 'super_admin';

  const [employees, setEmployees] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<AdminUser | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'employee'>('employee');
  const [status, setStatus] = useState<'active' | 'disabled'>('active');
  const [tempPassword, setTempPassword] = useState('employee@123');
  const [newPassword, setNewPassword] = useState('');

  // Status feedback
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const loadEmployees = async () => {
    try {
      const res = await fetch('/api/admin/employees', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setEmployees(data.employees || []);
      }
    } catch (e) {
      console.error('Failed to load employees', e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (isOwner) {
      loadEmployees();
    }
  }, [isOwner]);

  const showSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(null), 3500);
  };

  const handleOpenAdd = () => {
    setName('');
    setEmail('');
    setRole('employee');
    setTempPassword('employee@123');
    setFormError(null);
    setIsAddModalOpen(true);
  };

  const handleGeneratePassword = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%';
    let generated = '';
    for (let i = 0; i < 10; i++) {
      generated += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setTempPassword(generated);
  };

  const handleCreateEmployee = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError(null);

    try {
      const res = await fetch('/api/admin/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          role: 'employee',
          temporaryPassword: tempPassword,
          mustChangePassword: true,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success && data.employee) {
        setEmployees((prev) => [...prev, data.employee]);
        setIsAddModalOpen(false);
        showSuccess('Employee account created successfully.');
      } else {
        setFormError(data.error || 'Failed to create employee');
      }
    } catch (err: any) {
      setFormError(err.message || 'Network error');
    } finally {
      setFormLoading(false);
    }
  };

  const handleOpenEdit = (emp: AdminUser) => {
    setSelectedEmployee(emp);
    setName(emp.name);
    setEmail(emp.email);
    setRole(emp.role === 'owner' ? 'employee' : 'employee');
    setStatus(emp.status);
    setFormError(null);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEmployee) return;
    setFormLoading(true);
    setFormError(null);

    try {
      const res = await fetch(`/api/admin/employees/${selectedEmployee.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          role,
          status,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success && data.employee) {
        setEmployees((prev) => prev.map((item) => (item.id === selectedEmployee.id ? data.employee : item)));
        setIsEditModalOpen(false);
        showSuccess('Employee updated successfully.');
      } else {
        setFormError(data.error || 'Failed to update employee');
      }
    } catch (err: any) {
      setFormError(err.message || 'Network error');
    } finally {
      setFormLoading(false);
    }
  };

  const handleToggleStatus = async (emp: AdminUser) => {
    const nextStatus = emp.status === 'active' ? 'disabled' : 'active';
    const actionLabel = nextStatus === 'disabled' ? 'disable' : 'enable';
    if (!confirm(`Are you sure you want to ${actionLabel} ${emp.name}'s account?`)) return;

    try {
      const res = await fetch(`/api/admin/employees/${emp.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus }),
      });

      const data = await res.json();
      if (res.ok && data.success && data.employee) {
        setEmployees((prev) => prev.map((item) => (item.id === emp.id ? data.employee : item)));
        showSuccess(`Account ${nextStatus === 'disabled' ? 'disabled' : 'enabled'} successfully.`);
      } else {
        alert(data.error || 'Failed to change account status');
      }
    } catch (e: any) {
      alert(e.message || 'Error occurred');
    }
  };

  const handleOpenResetPassword = (emp: AdminUser) => {
    setSelectedEmployee(emp);
    setNewPassword('employee@123');
    setFormError(null);
    setIsResetPasswordModalOpen(true);
  };

  const handleResetPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEmployee) return;
    setFormLoading(true);
    setFormError(null);

    try {
      const res = await fetch(`/api/admin/employees/${selectedEmployee.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'reset_password',
          newPassword,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsResetPasswordModalOpen(false);
        showSuccess('Password reset successfully. Employee must change password on next login.');
      } else {
        setFormError(data.error || 'Failed to reset password');
      }
    } catch (err: any) {
      setFormError(err.message || 'Network error');
    } finally {
      setFormLoading(false);
    }
  };

  const handleOpenDelete = (emp: AdminUser) => {
    setSelectedEmployee(emp);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteSubmit = async () => {
    if (!selectedEmployee) return;
    setFormLoading(true);

    try {
      const res = await fetch(`/api/admin/employees/${selectedEmployee.id}`, {
        method: 'DELETE',
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setEmployees((prev) => prev.filter((item) => item.id !== selectedEmployee.id));
        setIsDeleteModalOpen(false);
        showSuccess('Employee account removed successfully.');
      } else {
        alert(data.error || 'Failed to delete employee');
      }
    } catch (err: any) {
      alert(err.message || 'Network error');
    } finally {
      setFormLoading(false);
    }
  };

  if (!isOwner) {
    return (
      <AdminLayout>
        <div className="bg-red-50 border border-red-200 p-8 text-center space-y-4 max-w-lg mx-auto mt-12">
          <ShieldAlert className="w-12 h-12 text-red-600 mx-auto" />
          <h2 className="font-serif text-2xl text-red-900">Access Restricted</h2>
          <p className="text-xs text-red-700 leading-relaxed">
            Employee Management is strictly restricted to the Studio Owner. If you believe this is an error, please contact Vikas Sir (Principal Architect).
          </p>
        </div>
      </AdminLayout>
    );
  }

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header and Add Action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-atelier pb-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-bronze font-medium">Administration & Roles</span>
            <h1 className="font-serif text-3xl sm:text-4xl text-espresso font-light">Employee Management</h1>
            <p className="text-xs text-warmgray mt-1">
              Manage operational staff permissions, active sessions, and credential resets.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setRefreshing(true);
                loadEmployees();
              }}
              className="p-2.5 bg-canvas hover:bg-surface border border-atelier text-espresso text-xs flex items-center gap-1.5 transition-colors"
              title="Refresh Employees"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={handleOpenAdd}
              className="px-5 py-2.5 btn-luxury-dark text-xs uppercase tracking-widest flex items-center gap-2 font-medium"
            >
              <Plus className="w-4 h-4" /> Add Employee
            </button>
          </div>
        </div>

        {/* Global Feedback Banner */}
        {successMessage && (
          <div className="p-3.5 bg-green-50 border border-green-200 text-green-800 text-xs flex items-center gap-2 animate-fade-in">
            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Search Bar */}
        <div className="flex items-center justify-between gap-4 bg-surface p-4 border border-atelier">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-warmgray absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or email..."
              className="w-full pl-9 pr-4 py-2 bg-canvas border border-atelier text-xs text-espresso focus:outline-hidden focus:border-bronze"
            />
          </div>
          <span className="text-xs text-warmgray font-mono">
            {filteredEmployees.length} {filteredEmployees.length === 1 ? 'Account' : 'Accounts'}
          </span>
        </div>

        {/* Employee Table */}
        <div className="bg-surface border border-atelier overflow-x-auto shadow-xs">
          {loading ? (
            <div className="p-12 text-center text-xs text-warmgray">Loading staff accounts...</div>
          ) : filteredEmployees.length === 0 ? (
            <div className="p-12 text-center text-xs text-warmgray">No employees match your search.</div>
          ) : (
            <table className="w-full text-left text-xs">
              <thead className="bg-canvas border-b border-atelier text-[10px] uppercase tracking-widest text-warmgray font-medium">
                <tr>
                  <th className="py-3.5 px-4 sm:px-6">Employee</th>
                  <th className="py-3.5 px-4">Role</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 hidden md:table-cell">Created</th>
                  <th className="py-3.5 px-4 hidden lg:table-cell">Last Login</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-atelier/60">
                {filteredEmployees.map((emp) => {
                  const isThisOwner = emp.role === 'owner' || emp.email === 'vicks@balaji.com';
                  return (
                    <tr key={emp.id} className="hover:bg-canvas/50 transition-colors">
                      <td className="py-4 px-4 sm:px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-espresso text-champagne flex items-center justify-center font-serif text-sm">
                            {emp.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-medium text-espresso flex items-center gap-1.5">
                              <span>{emp.name}</span>
                              {isThisOwner && (
                                <span className="text-[9px] bg-champagne/20 text-bronze px-1.5 py-0.2 font-semibold tracking-wider">
                                  PROTECTED OWNER
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] text-warmgray font-mono">{emp.email}</span>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] uppercase tracking-wider font-semibold ${
                            emp.role === 'owner'
                              ? 'bg-champagne/20 text-bronze border border-champagne/40'
                              : 'bg-canvas text-espresso border border-atelier'
                          }`}
                        >
                          <Shield className="w-3 h-3" />
                          {emp.role === 'owner' ? 'OWNER' : 'EMPLOYEE'}
                        </span>
                      </td>

                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] uppercase tracking-wider font-semibold ${
                            emp.status === 'active'
                              ? 'bg-green-50 text-green-800 border border-green-200'
                              : 'bg-red-50 text-red-800 border border-red-200'
                          }`}
                        >
                          {emp.status === 'active' ? (
                            <>
                              <CheckCircle className="w-3 h-3 text-green-600" /> Active
                            </>
                          ) : (
                            <>
                              <Ban className="w-3 h-3 text-red-600" /> Disabled
                            </>
                          )}
                        </span>
                      </td>

                      <td className="py-4 px-4 hidden md:table-cell text-warmgray text-[11px]">
                        {new Date(emp.createdAt).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </td>

                      <td className="py-4 px-4 hidden lg:table-cell text-warmgray text-[11px]">
                        {emp.lastLoginAt
                          ? new Date(emp.lastLoginAt).toLocaleString('en-IN', {
                              day: '2-digit',
                              month: 'short',
                              hour: '2-digit',
                              minute: '2-digit',
                            })
                          : 'Never logged in'}
                      </td>

                      <td className="py-4 px-4 text-right space-x-1">
                        {!isThisOwner ? (
                          <>
                            <button
                              onClick={() => handleOpenEdit(emp)}
                              className="p-1.5 text-espresso/70 hover:text-espresso hover:bg-canvas transition-colors"
                              title="Edit Employee"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleOpenResetPassword(emp)}
                              className="p-1.5 text-espresso/70 hover:text-bronze hover:bg-canvas transition-colors"
                              title="Reset Password"
                            >
                              <KeyRound className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleToggleStatus(emp)}
                              className={`p-1.5 transition-colors ${
                                emp.status === 'active'
                                  ? 'text-amber-700 hover:text-amber-900 hover:bg-amber-50'
                                  : 'text-green-700 hover:text-green-900 hover:bg-green-50'
                              }`}
                              title={emp.status === 'active' ? 'Disable Account' : 'Enable Account'}
                            >
                              {emp.status === 'active' ? <Ban className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                            </button>
                            <button
                              onClick={() => handleOpenDelete(emp)}
                              className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 transition-colors"
                              title="Delete Employee"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </>
                        ) : (
                          <span className="text-[10px] text-warmgray italic pr-2">Full Permissions</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Modal: Add Employee */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-espresso/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-surface border border-atelier p-6 sm:p-8 space-y-6 shadow-2xl animate-fade-up">
            <div className="flex items-center justify-between border-b border-atelier pb-4">
              <div className="flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-bronze" />
                <h2 className="font-serif text-xl text-espresso">Add Studio Employee</h2>
              </div>
              <button onClick={() => setIsAddModalOpen(false)} className="p-1 text-warmgray hover:text-espresso">
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleCreateEmployee} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="uppercase tracking-wider text-warmgray font-medium block">Full Name</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ananya Sharma"
                    className="w-full p-2.5 pl-9 bg-canvas border border-atelier text-espresso focus:outline-hidden focus:border-bronze"
                  />
                  <User className="w-4 h-4 text-warmgray absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="uppercase tracking-wider text-warmgray font-medium block">Email Address</label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. ananya@balaji.com"
                    className="w-full p-2.5 pl-9 bg-canvas border border-atelier text-espresso focus:outline-hidden focus:border-bronze"
                  />
                  <Mail className="w-4 h-4 text-warmgray absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="uppercase tracking-wider text-warmgray font-medium block">Role Permission</label>
                <select
                  disabled
                  value={role}
                  className="w-full p-2.5 bg-canvas border border-atelier text-espresso focus:outline-hidden"
                >
                  <option value="employee">EMPLOYEE (Operational Management)</option>
                </select>
                <span className="text-[10px] text-warmgray">
                  Employees have operational access to Products, Inventory, Orders, Projects, Services, and Quotes.
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="uppercase tracking-wider text-warmgray font-medium">Initial Temporary Password</label>
                  <button
                    type="button"
                    onClick={handleGeneratePassword}
                    className="text-[10px] text-bronze hover:underline font-medium"
                  >
                    Generate Random
                  </button>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={tempPassword}
                    onChange={(e) => setTempPassword(e.target.value)}
                    className="w-full p-2.5 pl-9 bg-canvas border border-atelier text-espresso font-mono focus:outline-hidden focus:border-bronze"
                  />
                  <Lock className="w-4 h-4 text-warmgray absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
                <p className="text-[10px] text-warmgray">
                  Employee will be required to change this password upon first logging in.
                </p>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-atelier">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 bg-canvas hover:bg-surface border border-atelier text-espresso uppercase tracking-wider text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="px-6 py-2.5 btn-luxury-dark uppercase tracking-widest text-xs font-medium"
                >
                  {formLoading ? 'Creating...' : 'Create Employee'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit Employee */}
      {isEditModalOpen && selectedEmployee && (
        <div className="fixed inset-0 z-50 bg-espresso/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-surface border border-atelier p-6 sm:p-8 space-y-6 shadow-2xl animate-fade-up">
            <div className="flex items-center justify-between border-b border-atelier pb-4">
              <div className="flex items-center gap-2">
                <Edit2 className="w-5 h-5 text-bronze" />
                <h2 className="font-serif text-xl text-espresso">Edit Employee Details</h2>
              </div>
              <button onClick={() => setIsEditModalOpen(false)} className="p-1 text-warmgray hover:text-espresso">
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="uppercase tracking-wider text-warmgray font-medium block">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 bg-canvas border border-atelier text-espresso focus:outline-hidden focus:border-bronze"
                />
              </div>

              <div className="space-y-1">
                <label className="uppercase tracking-wider text-warmgray font-medium block">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2.5 bg-canvas border border-atelier text-espresso focus:outline-hidden focus:border-bronze"
                />
              </div>

              <div className="space-y-1">
                <label className="uppercase tracking-wider text-warmgray font-medium block">Account Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="w-full p-2.5 bg-canvas border border-atelier text-espresso focus:outline-hidden"
                >
                  <option value="active">Active (Access Allowed)</option>
                  <option value="disabled">Disabled (Access Blocked)</option>
                </select>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-atelier">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2.5 bg-canvas hover:bg-surface border border-atelier text-espresso uppercase tracking-wider text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="px-6 py-2.5 btn-luxury-dark uppercase tracking-widest text-xs font-medium"
                >
                  {formLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Reset Password */}
      {isResetPasswordModalOpen && selectedEmployee && (
        <div className="fixed inset-0 z-50 bg-espresso/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-surface border border-atelier p-6 sm:p-8 space-y-6 shadow-2xl animate-fade-up">
            <div className="flex items-center justify-between border-b border-atelier pb-4">
              <div className="flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-bronze" />
                <h2 className="font-serif text-xl text-espresso">Reset Password</h2>
              </div>
              <button onClick={() => setIsResetPasswordModalOpen(false)} className="p-1 text-warmgray hover:text-espresso">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-warmgray leading-relaxed">
              Set a temporary password for <span className="font-medium text-espresso">{selectedEmployee.name}</span> ({selectedEmployee.email}). The employee will be required to change it upon their next login.
            </p>

            {formError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleResetPasswordSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="uppercase tracking-wider text-warmgray font-medium block">New Temporary Password</label>
                <input
                  type="text"
                  required
                  minLength={6}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Min 6 characters"
                  className="w-full p-2.5 bg-canvas border border-atelier text-espresso font-mono focus:outline-hidden focus:border-bronze"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-atelier">
                <button
                  type="button"
                  onClick={() => setIsResetPasswordModalOpen(false)}
                  className="px-4 py-2.5 bg-canvas hover:bg-surface border border-atelier text-espresso uppercase tracking-wider text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="px-6 py-2.5 btn-luxury-dark uppercase tracking-widest text-xs font-medium"
                >
                  {formLoading ? 'Resetting...' : 'Confirm Reset'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Delete Confirmation */}
      {isDeleteModalOpen && selectedEmployee && (
        <div className="fixed inset-0 z-50 bg-espresso/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-surface border border-atelier p-6 sm:p-8 space-y-6 shadow-2xl animate-fade-up">
            <div className="flex items-center gap-3 text-red-600">
              <AlertTriangle className="w-6 h-6 flex-shrink-0" />
              <h2 className="font-serif text-xl text-espresso">Delete Employee Account?</h2>
            </div>

            <div className="text-xs text-warmgray space-y-2 leading-relaxed">
              <p>
                Are you sure you want to permanently delete the account for <strong className="text-espresso">{selectedEmployee.name}</strong> ({selectedEmployee.email})?
              </p>
              <p className="p-3 bg-amber-50 border border-amber-200 text-amber-800 text-[11px]">
                Note: All products, orders, projects, and quotes previously handled by this employee will remain completely safe and intact in the database.
              </p>
            </div>

            <div className="pt-4 flex items-center justify-end gap-3 border-t border-atelier">
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2.5 bg-canvas hover:bg-surface border border-atelier text-espresso uppercase tracking-wider text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteSubmit}
                disabled={formLoading}
                className="px-6 py-2.5 bg-red-700 hover:bg-red-800 text-white uppercase tracking-widest text-xs font-medium"
              >
                {formLoading ? 'Deleting...' : 'Delete Account'}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
