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
    <div className="min-h-screen bg-[#100C0A] flex items-center justify-center p-4 sm:p-6 antialiased">
      {/* Background Graphic Texture */}
      <div className="absolute inset-0 z-0 opacity-15 pointer-events-none bg-[radial-gradient(#C5A880_1px,transparent_1px)] [background-size:18px_18px]" />

      <div className="w-full max-w-md bg-[#1D1714] border border-champagne/25 shadow-2xl p-8 sm:p-10 space-y-8 relative z-10 rounded-sm">
        {/* Studio Branding */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-2xl overflow-hidden bg-[#16110E] shadow-xl mx-auto mb-3 border border-champagne/50">
            <img src="/logo.png" alt="Balaji Logo" className="w-full h-full object-cover" />
          </div>
          <span className="text-[10px] uppercase tracking-widest-plus text-champagne font-medium">
            Studio Administration
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl text-[#FCFAF6] font-light">Balaji Architect & Interiors</h1>
          <p className="text-xs text-[#A89F91] font-light">
            Authorized Architect & Studio Management Access
          </p>
        </div>

        {error && (
          <div className="p-3.5 bg-red-950/40 border border-red-800/50 text-red-300 text-xs flex items-center gap-2 rounded-xs">
            <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs uppercase tracking-wider text-champagne/90 font-medium block">
              Admin Email
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vicks@balaji.com"
                className="w-full p-3 pl-10 bg-[#14100D] border border-[#382D25] focus:border-champagne focus:ring-1 focus:ring-champagne/50 focus:outline-hidden text-xs text-[#FCFAF6] placeholder-[#7E7469] rounded-xs"
              />
              <Mail className="w-4 h-4 text-champagne/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs uppercase tracking-wider text-champagne/90 font-medium block">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full p-3 pl-10 bg-[#14100D] border border-[#382D25] focus:border-champagne focus:ring-1 focus:ring-champagne/50 focus:outline-hidden text-xs text-[#FCFAF6] placeholder-[#7E7469] rounded-xs"
              />
              <Lock className="w-4 h-4 text-champagne/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-champagne text-[#100C0A] hover:bg-[#DAC19E] border border-champagne text-xs uppercase tracking-widest flex items-center justify-center gap-2 font-medium transition-all shadow-md rounded-xs"
          >
            {loading ? 'Authenticating...' : 'Sign In to Portal'} <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-[#332821] text-center text-xs text-[#A89F91]">
          <Link href="/" className="hover:text-champagne transition-colors underline">
            ← Return to Public Atelier Website
          </Link>
        </div>
      </div>

      {/* Forced First-Time Password Change Modal */}
      {showForcePasswordModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#1D1714] border border-champagne/30 p-8 space-y-6 shadow-2xl animate-fade-up rounded-sm">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-champagne/15 text-champagne flex items-center justify-center mx-auto border border-champagne/30">
                <Lock className="w-6 h-6" />
              </div>
              <h2 className="font-serif text-2xl text-[#FCFAF6]">Establish Permanent Password</h2>
              <p className="text-xs text-[#A89F91] leading-relaxed">
                As a security policy for Balaji Architect & Interiors, the initial bootstrap credential must now be replaced with your permanent custom password.
              </p>
            </div>

            {passwordSuccess ? (
              <div className="p-4 bg-emerald-950/40 border border-emerald-800/50 text-emerald-300 text-xs flex items-center gap-2 rounded-xs">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Password updated! Redirecting to dashboard...</span>
              </div>
            ) : (
              <form onSubmit={handleForcePasswordChange} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-champagne/90 font-medium">
                    New Secure Password
                  </label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Min 6 characters"
                    className="w-full p-3 bg-[#14100D] border border-[#382D25] focus:border-champagne focus:outline-hidden text-xs text-[#FCFAF6] rounded-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-champagne/90 font-medium">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat password"
                    className="w-full p-3 bg-[#14100D] border border-[#382D25] focus:border-champagne focus:outline-hidden text-xs text-[#FCFAF6] rounded-xs"
                  />
                </div>

                <button
                  type="submit"
                  disabled={passwordChanging}
                  className="w-full py-3.5 bg-champagne text-[#100C0A] hover:bg-[#DAC19E] border border-champagne text-xs uppercase tracking-widest font-medium transition-all rounded-xs"
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
