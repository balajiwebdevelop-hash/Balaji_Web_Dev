'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitionStage, setTransitionStage] = useState<'fadeIn' | 'fadeOut'>('fadeIn');

  useEffect(() => {
    setDisplayChildren(children);
    setTransitionStage('fadeIn');
  }, [pathname, children]);

  return (
    <div
      key={pathname}
      className={`min-h-[calc(100vh-80px)] transition-opacity duration-300 ease-out ${
        transitionStage === 'fadeIn' ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {displayChildren}
    </div>
  );
}
