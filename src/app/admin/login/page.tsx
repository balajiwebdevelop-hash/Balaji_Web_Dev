'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Shield, Lock, Mail, ArrowRight, CheckCircle2, AlertTriangle } from 'lucide-react';
import { useAdminAuth } from '@/context/AdminAuthContext';

export default function AdminLoginPage() {
  const router = useRouter();
  const { login, changePassword } = useAdminAuth();

  const [email, setEmail] = useState('vicks@balaji.com');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Forced Password Change State
  const [showForcePasswordModal, setShowForcePasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordChanging, setPasswordChanging] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      if (res.mustChangePassword) {
        setShowForcePasswordModal(true);
      } else {
        router.push('/admin');
      }
    } else {
      setError(res.error || 'Invalid credentials');
    }
  };

  const handleForcePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setPasswordChanging(true);
    setError(null);

    const res = await changePassword(password, newPassword);
    setPasswordChanging(false);

    if (res.success) {
      setPasswordSuccess(true);
      setTimeout(() => {
        router.push('/admin');
      }, 1500);
    } else {
      setError(res.error || 'Failed to update password');
    }
  };

  return (
    <div className="min-h-screen bg-espresso flex items-center justify-center p-4 sm:p-6">
      {/* Background Graphic Texture */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none bg-[radial-gradient(#C5A880_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="w-full max-w-md bg-surface border border-atelier shadow-2xl p-8 sm:p-10 space-y-8 relative z-10">
        {/* Studio Branding */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-espresso text-champagne rounded-full flex items-center justify-center mx-auto mb-3">
            <Shield className="w-6 h-6 stroke-[1.5]" />
          </div>
          <span className="text-[10px] uppercase tracking-widest-plus text-bronze font-medium">
            Studio Administration
          </span>
          <h1 className="font-serif text-3xl text-espresso font-light">Balaji Atelier</h1>
          <p className="text-xs text-warmgray font-light">
            Authorized Architect & Studio Management Access
          </p>
        </div>

        {error && (
          <div className="p-3.5 bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs uppercase tracking-wider text-espresso font-medium block">
              Admin Email
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vicks@balaji.com"
                className="w-full p-3 pl-10 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden text-xs text-espresso"
              />
              <Mail className="w-4 h-4 text-warmgray absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs uppercase tracking-wider text-espresso font-medium block">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full p-3 pl-10 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden text-xs text-espresso"
              />
              <Lock className="w-4 h-4 text-warmgray absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 btn-luxury-dark text-xs uppercase tracking-widest flex items-center justify-center gap-2 font-medium"
          >
            {loading ? 'Authenticating...' : 'Sign In to Portal'} <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-atelier text-center text-xs text-warmgray">
          <Link href="/" className="hover:text-espresso underline">
            ← Return to Public Atelier Website
          </Link>
        </div>
      </div>

      {/* Forced First-Time Password Change Modal */}
      {showForcePasswordModal && (
        <div className="fixed inset-0 z-50 bg-espresso/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-surface border border-atelier p-8 space-y-6 shadow-2xl animate-fade-up">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-champagne/20 text-timber flex items-center justify-center mx-auto">
                <Lock className="w-6 h-6" />
              </div>
              <h2 className="font-serif text-2xl text-espresso">Establish Permanent Password</h2>
              <p className="text-xs text-warmgray leading-relaxed">
                As a security policy for Balaji Atelier, the initial bootstrap credential must now be replaced with your permanent custom password.
              </p>
            </div>

            {passwordSuccess ? (
              <div className="p-4 bg-green-50 border border-green-200 text-green-800 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span>Password updated! Redirecting to dashboard...</span>
              </div>
            ) : (
              <form onSubmit={handleForcePasswordChange} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-warmgray font-medium">
                    New Secure Password
                  </label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Min 6 characters"
                    className="w-full p-3 bg-canvas border border-atelier text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-warmgray font-medium">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat password"
                    className="w-full p-3 bg-canvas border border-atelier text-xs"
                  />
                </div>

                <button
                  type="submit"
                  disabled={passwordChanging}
                  className="w-full py-3.5 btn-luxury-dark text-xs uppercase tracking-widest font-medium"
                >
                  {passwordChanging ? 'Securing Account...' : 'Save & Enter Admin Panel'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
