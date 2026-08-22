'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/studio');
  }, [router]);

  return (
    <div className="min-h-screen bg-[#110E0C] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-8 h-8 border-2 border-[#C5A880] border-t-transparent rounded-full animate-spin mb-4" />
      <p className="text-xs uppercase tracking-widest text-[#A89F91]">Redirecting to Studio Gateway...</p>
    </div>
  );
}
