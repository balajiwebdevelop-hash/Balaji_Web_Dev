'use client';

import React from 'react';
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
  aspectRatio?: string;
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
  return (
    <div className={`overflow-hidden relative bg-canvas-subtle ${aspectRatio} ${className}`}>
      {fill ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
          className={`object-cover ${imageClassName}`}
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          width={width || 800}
          height={height || 600}
          priority={priority}
          className={`object-cover ${imageClassName}`}
        />
      )}
    </div>
  );
}
