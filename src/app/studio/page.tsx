'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Shield, ArrowRight, Eye, EyeOff, CheckCircle2, AlertCircle, X, Mail } from 'lucide-react';

export default function StudioAuthPage() {
  const router = useRouter();

  // Mode: 'signin' | 'register'
  const [authMode, setAuthMode] = useState<'signin' | 'register'>('signin');

  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // States
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Forgot password modal
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotStatus, setForgotStatus] = useState<string | null>(null);

  // Stealth Admin Quick Access Trigger (Ctrl+Shift+A or Cmd+Shift+A)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'a' || e.key === 'A')) {
        e.preventDefault();
        router.push('/admin/login');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router]);

  // Stealth Logo Emblem Triple Click Trigger
  const [emblemClicks, setEmblemClicks] = useState(0);
  const handleEmblemClick = () => {
    setEmblemClicks((prev) => {
      const next = prev + 1;
      if (next >= 3) {
        router.push('/admin/login');
        return 0;
      }
      setTimeout(() => setEmblemClicks(0), 1200);
      return next;
    });
  };

  // Email / Password authentication state
  // EMAIL / PASSWORD AUTHENTICATION
  // ============================================================
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setLoading(true);

    try {
      const endpoint = authMode === 'signin' ? '/api/auth/login' : '/api/auth/register';
      const payload = authMode === 'signin' ? { email, password } : { email, name, password };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Authentication failed. Please check your credentials.');
      }

      // Seamless role routing
      const destination = data.redirectUrl || (data.role === 'customer' ? '/account' : '/admin');
      router.push(destination);
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Sign in request could not be completed.');
      setLoading(false);
    }
  };

  // ============================================================
  // FORGOT PASSWORD
  // ============================================================
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail.trim()) return;

    setForgotLoading(true);
    setForgotStatus(null);

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotEmail }),
      });

      const data = await res.json();
      setForgotStatus(data.message || 'Password reset request dispatched.');
    } catch {
      setForgotStatus('If an account exists with this email address, password reset instructions have been dispatched.');
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] bg-[#FCFAF6] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3">
        <div className="inline-flex items-center gap-3 group">
          <button
            type="button"
            onClick={handleEmblemClick}
            aria-label="Balaji Atelier"
            className="w-11 h-11 rounded-xl overflow-hidden bg-[#1A1614] shadow-md flex items-center justify-center border border-[#C5A880]/40 cursor-pointer focus:outline-none"
          >
            <Image src="/logo.png" alt="Balaji Emblem" width={44} height={44} className="w-full h-full object-cover" priority />
          </button>
        </div>
        <div>
          <span className="text-[10px] uppercase tracking-widest text-[#9C7A4A] font-semibold">
            Studio Gateway
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#1A1614] font-light mt-1">
            Balaji Atelier
          </h1>
          <p className="text-xs text-[#7E7469] font-light mt-1 tracking-wide">
            Client & Architectural Practice Access
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 sm:px-10 border border-[#E8E2D9] rounded-lg shadow-sm space-y-6">
          {/* Error Message */}
          {error && (
            <div className="p-3.5 bg-red-50/80 border border-red-200 text-red-700 text-xs flex items-center gap-2 rounded-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Success Message */}
          {successMsg && (
            <div className="p-3.5 bg-emerald-50/80 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 rounded-sm">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Mode Switcher Tabs */}
          <div className="flex border-b border-[#E8E2D9]">
            <button
              type="button"
              onClick={() => {
                setAuthMode('signin');
                setError(null);
              }}
              className={`flex-1 py-2 text-xs uppercase tracking-widest font-medium transition-colors border-b-2 -mb-px ${
                authMode === 'signin'
                  ? 'border-[#9C7A4A] text-[#1A1614]'
                  : 'border-transparent text-[#7E7469] hover:text-[#1A1614]'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthMode('register');
                setError(null);
              }}
              className={`flex-1 py-2 text-xs uppercase tracking-widest font-medium transition-colors border-b-2 -mb-px ${
                authMode === 'register'
                  ? 'border-[#9C7A4A] text-[#1A1614]'
                  : 'border-transparent text-[#7E7469] hover:text-[#1A1614]'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Email / Password Form */}
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            {authMode === 'register' && (
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#1A1614] font-medium mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Singhania"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 bg-[#FCFAF6] border border-[#D5CDC2] text-xs text-[#1A1614] placeholder-[#A89F91] focus:border-[#9C7A4A] focus:outline-hidden rounded-sm"
                />
              </div>
            )}

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#1A1614] font-medium mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="name@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2.5 bg-[#FCFAF6] border border-[#D5CDC2] text-xs text-[#1A1614] placeholder-[#A89F91] focus:border-[#9C7A4A] focus:outline-hidden rounded-sm"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-[11px] uppercase tracking-wider text-[#1A1614] font-medium">
                  Password
                </label>
                {authMode === 'signin' && (
                  <button
                    type="button"
                    onClick={() => {
                      setForgotEmail(email);
                      setForgotStatus(null);
                      setForgotModalOpen(true);
                    }}
                    className="text-[11px] text-[#9C7A4A] hover:underline"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2.5 pr-10 bg-[#FCFAF6] border border-[#D5CDC2] text-xs text-[#1A1614] placeholder-[#A89F91] focus:border-[#9C7A4A] focus:outline-hidden rounded-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7E7469] hover:text-[#1A1614]"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#1A1614] text-[#FCFAF6] text-xs uppercase tracking-widest font-medium hover:bg-[#2A2420] transition-colors flex items-center justify-center gap-2 rounded-sm shadow-xs disabled:opacity-50"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>{authMode === 'signin' ? 'Sign In' : 'Create Client Account'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          {/* Privacy Note */}
          <div className="pt-2 text-center text-[10px] text-[#7E7469] leading-relaxed">
            By continuing, you agree to Balaji Atelier&apos;s Terms of Service and Privacy Policy. Protected by 256-bit encryption.
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {forgotModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-sm w-full p-6 border border-[#E8E2D9] rounded-lg shadow-xl space-y-4 relative">
            <button
              onClick={() => setForgotModalOpen(false)}
              className="absolute top-4 right-4 text-[#7E7469] hover:text-[#1A1614]"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-widest text-[#9C7A4A] font-semibold">
                Account Recovery
              </span>
              <h3 className="font-serif text-xl text-[#1A1614]">Reset Password</h3>
              <p className="text-xs text-[#7E7469]">
                Enter your registered email to receive access instructions.
              </p>
            </div>

            {forgotStatus ? (
              <div className="p-3.5 bg-[#F9F7F4] border border-[#E8E2D9] text-xs text-[#1A1614] space-y-3 rounded-sm">
                <p>{forgotStatus}</p>
                <button
                  onClick={() => setForgotModalOpen(false)}
                  className="w-full py-2 bg-[#1A1614] text-white text-xs uppercase tracking-wider rounded-sm"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotPassword} className="space-y-3">
                <input
                  type="email"
                  required
                  placeholder="Enter email address..."
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className="w-full p-2.5 bg-[#FCFAF6] border border-[#D5CDC2] text-xs focus:border-[#9C7A4A] focus:outline-hidden rounded-sm"
                />
                <button
                  type="submit"
                  disabled={forgotLoading}
                  className="w-full py-2.5 bg-[#1A1614] text-white text-xs uppercase tracking-widest font-medium hover:bg-[#2A2420] transition-colors rounded-sm flex items-center justify-center gap-2"
                >
                  {forgotLoading ? (
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <span>Send Reset Instructions</span>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
