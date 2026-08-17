'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface ImageRevealProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  aspectRatio?: string; // e.g. "aspect-[4/3]"
}

export function ImageReveal({
  src,
  alt,
  fill = false,
  width,
  height,
  className = '',
  imageClassName = '',
  priority = false,
  aspectRatio = 'aspect-[16/10]',
}: ImageRevealProps) {
  const [loaded, setLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden relative bg-canvas-subtle ${aspectRatio} ${className}`}
    >
      {fill ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
          onLoad={() => setLoaded(true)}
          className={`object-cover transition-all duration-1000 ease-out ${
            loaded && isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          } ${imageClassName}`}
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          width={width || 800}
          height={height || 600}
          priority={priority}
          onLoad={() => setLoaded(true)}
          className={`object-cover transition-all duration-1000 ease-out ${
            loaded && isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          } ${imageClassName}`}
        />
      )}
    </div>
  );
}
