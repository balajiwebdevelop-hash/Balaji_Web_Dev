'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { ShieldCheck, AlertCircle } from 'lucide-react';

export default function AuthCallbackPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [statusText, setStatusText] = useState('Verifying Studio Credentials...');

  useEffect(() => {
    async function handleAuth() {
      try {
        if (!supabase) {
          throw new Error('Authentication client unavailable');
        }

        // 1. Retrieve session from Supabase Client
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          throw new Error(sessionError.message);
        }

        let user = sessionData?.session?.user;

        // If not immediately present in session, wait for onAuthStateChange
        if (!user) {
          const { data: authListener } = supabase.auth.onAuthStateChange(async (event: any, session: any) => {
            if (session?.user) {
              await processServerSession(session.user);
            }
          });
          return () => {
            authListener?.subscription.unsubscribe();
          };
        } else {
          await processServerSession(user);
        }
      } catch (err: any) {
        console.error('Auth callback error:', err);
        setError(err.message || 'Authentication failed. Please return to studio gateway.');
      }
    }

    async function processServerSession(user: any) {
      try {
        setStatusText('Authorizing Studio Access...');
        const email = user.email;
        const name = user.user_metadata?.full_name || user.user_metadata?.name || email?.split('@')[0];
        const avatarUrl = user.user_metadata?.avatar_url || user.user_metadata?.picture;

        // Call authoritative server-side role resolution endpoint
        const res = await fetch('/api/auth/callback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            name,
            avatarUrl,
            provider: 'google',
          }),
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
          throw new Error(data.error || 'Server authorization failed');
        }

        // Authoritative redirect determined strictly by server
        const destination = data.redirectUrl || (data.role === 'customer' ? '/account' : '/admin');
        window.location.href = destination;
      } catch (err: any) {
        console.error('Server role processing error:', err);
        setError(err.message || 'Authorization failed.');
      }
    }

    handleAuth();
  }, [router]);

  return (
    <div className="min-h-screen bg-[#FCFAF6] flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-sm w-full bg-white border border-[#E8E2D9] p-8 rounded-lg shadow-sm space-y-6">
        <div className="w-12 h-12 mx-auto rounded-xl overflow-hidden bg-[#1A1614] shadow-xs flex items-center justify-center border border-[#C5A880]/40">
          <img src="/logo.png" alt="Balaji Logo" className="w-full h-full object-cover" />
        </div>

        {error ? (
          <div className="space-y-4">
            <div className="w-10 h-10 mx-auto rounded-full bg-red-50 flex items-center justify-center text-red-600">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif text-lg text-[#1A1614]">Authentication Notice</h3>
              <p className="text-xs text-[#7E7469]">{error}</p>
            </div>
            <button
              onClick={() => (window.location.href = '/studio')}
              className="w-full py-2.5 bg-[#1A1614] text-[#FCFAF6] text-xs uppercase tracking-widest hover:bg-[#2A2420] transition-colors rounded-sm"
            >
              Return to Studio Gateway
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="w-8 h-8 mx-auto border-2 border-[#C5A880] border-t-transparent rounded-full animate-spin" />
            <div className="space-y-1">
              <h3 className="font-serif text-lg text-[#1A1614]">Balaji Atelier</h3>
              <p className="text-xs text-[#7E7469] tracking-wider uppercase">{statusText}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
