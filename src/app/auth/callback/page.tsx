'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/studio');
  }, [router]);

  return (
    <div className="min-h-screen bg-[#FCFAF6] flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-sm w-full bg-white border border-[#E8E2D9] p-8 rounded-lg shadow-sm space-y-4">
        <div className="w-8 h-8 mx-auto border-2 border-[#C5A880] border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-[#7E7469] tracking-wider uppercase">Redirecting to Studio Gateway...</p>
      </div>
    </div>
  );
}
