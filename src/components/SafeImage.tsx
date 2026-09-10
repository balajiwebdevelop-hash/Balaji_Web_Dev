'use client';

import React, { useState } from 'react';
import Image, { ImageProps, StaticImageData } from 'next/image';

interface SafeImageProps extends Omit<ImageProps, 'onError' | 'src'> {
  src?: string | StaticImageData | null;
  fallbackSrc?: string;
  fallbackLabel?: string;
}

const DEFAULT_FALLBACK_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="800" height="1000">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#181310" />
      <stop offset="50%" stop-color="#120E0C" />
      <stop offset="100%" stop-color="#0A0807" />
    </linearGradient>
    <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F3E5AB" />
      <stop offset="50%" stop-color="#D4AF37" />
      <stop offset="100%" stop-color="#AA771C" />
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)" />
  <rect x="20" y="20" width="760" height="960" fill="none" stroke="#2B211A" stroke-width="1.5" />
  <rect x="26" y="26" width="748" height="948" fill="none" stroke="#D4AF37" stroke-width="0.6" opacity="0.3" />
  <g transform="translate(400, 470)">
    <polygon points="0,-60 60,0 0,60 -60,0" fill="#1C1613" stroke="url(#gold)" stroke-width="1.2" />
    <text x="0" y="14" font-family="'Cinzel', serif" font-size="36" font-weight="600" fill="url(#gold)" text-anchor="middle">B</text>
  </g>
  <text x="400" y="580" font-family="'Cinzel', serif" font-size="13" font-weight="600" fill="#D4AF37" text-anchor="middle" letter-spacing="5">BALAJI ATELIER</text>
  <text x="400" y="612" font-family="'Helvetica Neue', sans-serif" font-size="14" font-weight="400" fill="#8E8275" text-anchor="middle" letter-spacing="2">ARCHITECTURAL SURFACES</text>
</svg>
`)}`;

export function SafeImage({
  src,
  alt,
  fallbackSrc = DEFAULT_FALLBACK_SVG,
  fallbackLabel,
  className = '',
  fill,
  width,
  height,
  ...props
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Normalize source
  const effectiveSrc = hasError || !src || (typeof src === 'string' && src.trim() === '')
    ? fallbackSrc
    : src;

  return (
    <Image
      {...props}
      src={effectiveSrc}
      alt={alt || 'Balaji Atelier Architectural Product'}
      fill={fill}
      width={fill ? undefined : width || 800}
      height={fill ? undefined : height || 1000}
      className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-90'} transition-opacity duration-300`}
      onLoad={() => setIsLoaded(true)}
      onError={() => {
        if (!hasError) {
          setHasError(true);
        }
      }}
    />
  );
}

export default SafeImage;
