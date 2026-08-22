'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
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
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Forgot password modal
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotStatus, setForgotStatus] = useState<string | null>(null);

  // ============================================================
  // GOOGLE AUTHENTICATION
  // ============================================================
  const handleGoogleSignIn = async () => {
    setError(null);
    setGoogleLoading(true);
    try {
      if (!supabase) {
        throw new Error('Authentication service currently initializing. Please try email sign in.');
      }

      const origin = typeof window !== 'undefined' ? window.location.origin : 'https://balaji-atelier.com';
      const redirectTo = `${origin}/auth/callback`;

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) {
        throw error;
      }
    } catch (err: any) {
      console.error('Google OAuth error:', err);
      setError(err.message || 'Unable to connect to Google. Please use email access.');
      setGoogleLoading(false);
    }
  };

  // ============================================================
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
      window.location.href = destination;
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
        <Link href="/" className="inline-flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-xl overflow-hidden bg-[#1A1614] shadow-md flex items-center justify-center border border-[#C5A880]/40">
            <img src="/logo.png" alt="Balaji Emblem" className="w-full h-full object-cover" />
          </div>
        </Link>
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

          {/* 1. Google OAuth Button */}
          <div>
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={googleLoading || loading}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-[#D5CDC2] rounded-sm bg-white text-xs font-medium text-[#1A1614] hover:bg-[#F9F7F4] hover:border-[#9C7A4A] transition-all shadow-xs disabled:opacity-50"
            >
              {googleLoading ? (
                <div className="w-4 h-4 border-2 border-[#9C7A4A] border-t-transparent rounded-full animate-spin" />
              ) : (
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
              )}
              <span>Continue with Google</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#E8E2D9]" />
            </div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-widest text-[#7E7469]">
              <span className="bg-white px-3">or continue with email</span>
            </div>
          </div>

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
              disabled={loading || googleLoading}
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
