'use client';

import React from 'react';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
}

export function Reveal({
  children,
  className = '',
}: RevealProps) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}
