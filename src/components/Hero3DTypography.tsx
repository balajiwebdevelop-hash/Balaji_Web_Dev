'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Phone } from 'lucide-react';

interface Hero3DTypographyProps {
  headingLine1?: string;
  headingLine2?: string;
  headingLine3?: string;
  eyebrow?: string;
  description?: string;
  primaryBtnText?: string;
  primaryBtnLink?: string;
  secondaryBtnText?: string;
  secondaryBtnLink?: string;
  heroImageUrl?: string;
  brandName?: string;
  trustBadge1?: string;
  trustBadge2?: string;
  trustBadge3?: string;
  trustBadge4?: string;
  phoneNumber?: string;
}

export function Hero3DTypography({
  headingLine1 = 'INTERIORS.',
  headingLine2 = 'ARCHITECTURE.',
  headingLine3 = 'MATERIALS.',
  eyebrow = 'Architecture • Interior Studio • Material Curation',
  description = 'Crafted spaces and considered materials for timeless living. Uniting spatial architecture with a curated marketplace of authentic stones, woods, and architectural accents.',
  primaryBtnText = 'Explore Projects',
  primaryBtnLink = '/projects',
  secondaryBtnText = 'Explore Materials',
  secondaryBtnLink = '/materials',
  heroImageUrl = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80',
  brandName = 'Balaji Architect & Interiors',
  trustBadge1 = '★ 5.0 (22 Google Reviews)',
  trustBadge2 = 'Guwahati Studio Office',
  trustBadge3 = 'Turnkey Architecture',
  trustBadge4 = 'Pan-India Material Logistics',
  phoneNumber = '+91-6003869588',
}: Hero3DTypographyProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const rafId = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  // Direct DOM Refs to eliminate React per-frame rendering
  const bgImageRef = useRef<HTMLDivElement | null>(null);
  const backlightRef = useRef<HTMLDivElement | null>(null);
  const subElementsRef1 = useRef<HTMLDivElement | null>(null);
  const subElementsRef2 = useRef<HTMLParagraphElement | null>(null);
  const subElementsRef3 = useRef<HTMLDivElement | null>(null);
  const line1Ref = useRef<HTMLDivElement | null>(null);
  const line2Ref = useRef<HTMLDivElement | null>(null);
  const line3Ref = useRef<HTMLDivElement | null>(null);

  const physicsRef = useRef({
    target: 0,
    current: 0,
    isAnimating: false,
    inView: true,
  });

  useEffect(() => {
    let isMounted = true;

    // High-performance direct DOM transform applier (Zero React VDOM allocations)
    const applyHeroStyles = (s: number) => {
      // 1. Cinematic Background Photography counter-zoom
      if (bgImageRef.current) {
        const bgScale = 1.04 + s * 0.06;
        const bgTranslateY = s * 10;
        bgImageRef.current.style.transform = `scale(${bgScale.toFixed(3)}) translateY(${bgTranslateY.toFixed(2)}%)`;
      }

      // 2. Subtle Diffused Ambient Backlight Aperture
      if (backlightRef.current) {
        backlightRef.current.style.opacity = Math.max(0, 1 - s * 1.5).toFixed(3);
      }

      // 3. Sub-elements fade out cleanly on initial scroll
      const subOpacity = Math.max(0, 1 - s * 2.8).toFixed(3);
      if (subElementsRef1.current) subElementsRef1.current.style.opacity = subOpacity;
      if (subElementsRef2.current) subElementsRef2.current.style.opacity = subOpacity;
      if (subElementsRef3.current) subElementsRef3.current.style.opacity = subOpacity;

      // 4. Line 1: INTERIORS. (Alabaster Chiaroscuro)
      if (line1Ref.current) {
        const line1TranslateY = -s * 58;
        const line1Scale = Math.max(0.95, 1 - s * 0.025);
        const line1Opacity = Math.max(0, 1 - Math.pow(s, 1.25) * 1.15);
        const line1Blur = Math.max(0, (s - 0.28) * 2.4);
        line1Ref.current.style.transform = `translate3d(0, ${line1TranslateY.toFixed(1)}px, 0) scale(${line1Scale.toFixed(4)})`;
        line1Ref.current.style.opacity = line1Opacity.toFixed(3);
        line1Ref.current.style.filter = line1Blur > 0.1 ? `blur(${line1Blur.toFixed(1)}px)` : 'none';
      }

      // 5. Line 2: ARCHITECTURE. (Monumental Center Anchor — Specular Champagne Contrast)
      if (line2Ref.current) {
        const line2TranslateY = -s * 26;
        const line2Scale = Math.max(0.97, 1 - s * 0.015);
        const line2Opacity = Math.max(0, 1 - Math.pow(s, 1.35) * 1.05);
        const line2Blur = Math.max(0, (s - 0.35) * 2.0);
        line2Ref.current.style.transform = `translate3d(0, ${line2TranslateY.toFixed(1)}px, 0) scale(${line2Scale.toFixed(4)})`;
        line2Ref.current.style.opacity = line2Opacity.toFixed(3);
        line2Ref.current.style.filter = line2Blur > 0.1 ? `blur(${line2Blur.toFixed(1)}px)` : 'none';
      }

      // 6. Line 3: MATERIALS. (Honed Limestone Tactility)
      if (line3Ref.current) {
        const line3TranslateY = -s * 82;
        const line3Scale = Math.max(0.93, 1 - s * 0.045);
        const line3Opacity = Math.max(0, 1 - Math.pow(s, 1.15) * 1.25);
        const line3Blur = Math.max(0, (s - 0.22) * 2.6);
        line3Ref.current.style.transform = `translate3d(0, ${line3TranslateY.toFixed(1)}px, 0) scale(${line3Scale.toFixed(4)})`;
        line3Ref.current.style.opacity = line3Opacity.toFixed(3);
        line3Ref.current.style.filter = line3Blur > 0.1 ? `blur(${line3Blur.toFixed(1)}px)` : 'none';
      }
    };

    const updateLoop = (timestamp: number) => {
      if (!isMounted) return;
      const p = physicsRef.current;

      // Stop loop if offscreen or tab hidden
      if (!p.inView || (typeof document !== 'undefined' && document.hidden)) {
        p.isAnimating = false;
        rafId.current = null;
        return;
      }

      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const dt = Math.min(0.04, Math.max(0.008, (timestamp - lastTimeRef.current) / 1000));
      lastTimeRef.current = timestamp;

      const diff = p.target - p.current;

      // High-end viscous hydrodynamic damping (watery, buttery smooth, frame-rate independent)
      if (Math.abs(diff) > 0.0001) {
        const factor = 1 - Math.exp(-7.2 * dt);
        p.current += diff * factor;
        applyHeroStyles(p.current);
        rafId.current = requestAnimationFrame(updateLoop);
      } else {
        // Settled: perform final snap and sleep the RAF loop to save CPU & GPU
        p.current = p.target;
        applyHeroStyles(p.current);
        p.isAnimating = false;
        rafId.current = null;
      }
    };

    const startLoop = () => {
      if (physicsRef.current.isAnimating) return;
      if (!physicsRef.current.inView || (typeof document !== 'undefined' && document.hidden)) return;
      physicsRef.current.isAnimating = true;
      lastTimeRef.current = 0;
      rafId.current = requestAnimationFrame(updateLoop);
    };

    let scrollTicking = false;
    const onScroll = () => {
      if (!scrollTicking) {
        scrollTicking = true;
        requestAnimationFrame(() => {
          scrollTicking = false;
          if (!sectionRef.current) return;
          const rect = sectionRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight || 800;
          // Normalized progress 0 -> 1 as hero scrolls out
          const progress = Math.max(0, Math.min(1.2, -rect.top / (rect.height * 0.8 || windowHeight)));
          physicsRef.current.target = progress;
          startLoop();
        });
      }
    };

    // Sleep when offscreen via IntersectionObserver
    let observer: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== 'undefined' && sectionRef.current) {
      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          const inView = entry ? entry.isIntersecting : true;
          physicsRef.current.inView = inView;
          if (inView) {
            onScroll();
          } else {
            if (rafId.current) cancelAnimationFrame(rafId.current);
            physicsRef.current.isAnimating = false;
          }
        },
        { rootMargin: '100px 0px 100px 0px' }
      );
      observer.observe(sectionRef.current);
    }

    // Sleep in background tab via document.visibilityState
    const onVisibilityChange = () => {
      if (document.hidden) {
        if (rafId.current) cancelAnimationFrame(rafId.current);
        physicsRef.current.isAnimating = false;
      } else if (physicsRef.current.inView) {
        onScroll();
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    // Initial mount setup
    applyHeroStyles(0);
    onScroll();

    return () => {
      isMounted = false;
      if (rafId.current) cancelAnimationFrame(rafId.current);
      if (observer) observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero-section"
      data-navbar-theme="dark"
      className="relative min-h-[92vh] sm:min-h-[100vh] flex items-center justify-center overflow-hidden bg-[#100C0A] text-surface selection:bg-champagne selection:text-[#100C0A] pt-24 sm:pt-28 pb-16 sm:pb-20"
    >
      {/* 1. CINEMATIC BACKGROUND PHOTOGRAPHY */}
      <div
        ref={bgImageRef}
        className="absolute inset-0 z-0 will-change-transform pointer-events-none"
        style={{
          transform: 'scale(1.04) translateY(0%)',
        }}
      >
        <Image
          src={heroImageUrl}
          alt={`${brandName} Hero Space`}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-40"
        />
        {/* Obsidian Architectural Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#100C0A] via-[#100C0A]/60 to-[#100C0A]/40" />
      </div>

      {/* 2. HERO CONTENT */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8 sm:pt-12 pb-16 sm:pb-20 flex flex-col items-center">
        {/* Clean Eyebrow Text */}
        <div
          ref={subElementsRef1}
          className="mb-4 sm:mb-6 transition-opacity duration-200"
          style={{ opacity: 1 }}
        >
          <span className="text-[10px] sm:text-xs md:text-sm uppercase tracking-widest-plus text-champagne font-medium">
            {eyebrow}
          </span>
        </div>

        {/* MONUMENTAL ARCHITECTURAL TYPOGRAPHY (Cormorant Garamond — Chiaroscuro Material Contrast) */}
        <div className="relative w-full flex flex-col items-center select-none py-1 sm:py-2">
          {/* Subtle Diffused Ambient Backlight Aperture */}
          <div
            ref={backlightRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-4xl h-[70vh] bg-[radial-gradient(ellipse_at_center,rgba(218,193,158,0.07)_0%,rgba(197,168,128,0.03)_45%,rgba(16,12,10,0)_75%)] pointer-events-none -z-10 transition-opacity duration-300"
            style={{ opacity: 1 }}
          />

          {/* LINE 1: INTERIORS. (Alabaster Chiaroscuro) */}
          <div
            ref={line1Ref}
            className="will-change-transform"
            style={{
              transform: 'translate3d(0, 0px, 0) scale(1)',
              opacity: 1,
            }}
          >
            <h1 className="font-serif text-chiaroscuro-ivory text-4xl sm:text-7xl md:text-8xl lg:text-[7.5rem] xl:text-[8.5rem] font-light leading-[1.04] tracking-[0.035em] sm:tracking-[0.05em] drop-shadow-[0_4px_24px_rgba(0,0,0,0.65)]">
              {headingLine1}
            </h1>
          </div>

          {/* LINE 2: ARCHITECTURE. (Monumental Center Anchor — Specular Champagne Contrast) */}
          <div
            ref={line2Ref}
            className="will-change-transform my-1 sm:my-2"
            style={{
              transform: 'translate3d(0, 0px, 0) scale(1)',
              opacity: 1,
            }}
          >
            <h1 className="font-serif text-chiaroscuro-champagne text-4xl sm:text-7xl md:text-8xl lg:text-[7.5rem] xl:text-[8.5rem] font-light leading-[1.04] tracking-[0.035em] sm:tracking-[0.05em] drop-shadow-[0_6px_32px_rgba(0,0,0,0.75)]">
              {headingLine2}
            </h1>
          </div>

          {/* LINE 3: MATERIALS. (Honed Limestone Tactility) */}
          <div
            ref={line3Ref}
            className="will-change-transform"
            style={{
              transform: 'translate3d(0, 0px, 0) scale(1)',
              opacity: 1,
            }}
          >
            <h1 className="font-serif text-chiaroscuro-limestone text-4xl sm:text-7xl md:text-8xl lg:text-[7.5rem] xl:text-[8.5rem] font-light leading-[1.04] tracking-[0.035em] sm:tracking-[0.05em] drop-shadow-[0_4px_24px_rgba(0,0,0,0.65)]">
              {headingLine3}
            </h1>
          </div>
        </div>

        {/* Subtitle Description */}
        <p
          ref={subElementsRef2}
          className="max-w-2xl mx-auto text-xs sm:text-base md:text-lg text-surface/80 font-light leading-relaxed px-4 sm:px-0 mt-4 sm:mt-6 transition-opacity"
          style={{ opacity: 1 }}
        >
          {description}
        </p>

        {/* Action Buttons */}
        <div
          ref={subElementsRef3}
          className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 w-full sm:w-auto transition-opacity"
          style={{ opacity: 1 }}
        >
          <Link
            href={primaryBtnLink}
            className="w-full sm:w-auto px-7 py-3.5 sm:px-9 sm:py-4 bg-champagne text-[#100C0A] hover:bg-[#DAC19E] font-medium text-[11px] sm:text-xs uppercase tracking-widest transition-all duration-300 rounded-2xs shadow-xl hover:shadow-champagne/25 flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>{primaryBtnText}</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href={secondaryBtnLink}
            className="w-full sm:w-auto px-7 py-3.5 sm:px-9 sm:py-4 border border-surface/40 text-surface hover:bg-surface/10 font-medium text-[11px] sm:text-xs uppercase tracking-widest transition-all duration-300 rounded-2xs flex items-center justify-center gap-2 cursor-pointer"
          >
            {secondaryBtnText}
          </Link>
        </div>
      </div>

      {/* 3. ATELIER TRUST FOOTER BAR (Slowly Swiping Seamless Infinite Marquee) */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-[#140E0A]/92 backdrop-blur-md border-t border-[#2A1F18] py-2.5 sm:py-3.5 overflow-hidden select-none [mask-image:linear-gradient(to_right,transparent_0%,black_4%,black_96%,transparent_100%)]">
        <div className="animate-marquee-slow flex items-center shrink-0">
          {[0, 1].map((loopIndex) => (
            <div
              key={loopIndex}
              className="flex items-center gap-6 sm:gap-10 shrink-0 pr-6 sm:pr-10 text-[9.5px] sm:text-xs uppercase tracking-wider text-surface/90"
              aria-hidden={loopIndex === 1 ? 'true' : undefined}
            >
              <span className="flex items-center gap-1.5 font-medium text-champagne shrink-0">
                {trustBadge1}
              </span>
              <span className="text-surface/25 shrink-0">•</span>

              <span className="font-light text-surface/85 shrink-0">
                {trustBadge2}
              </span>
              <span className="text-surface/25 shrink-0">•</span>

              {/* Direct Studio Phone Call Requested by User */}
              <a
                href={`tel:${phoneNumber.replace(/[^+\d]/g, '')}`}
                className="flex items-center gap-1.5 font-medium text-champagne hover:text-white transition-colors shrink-0 group cursor-pointer"
                title="Direct Studio Phone Line"
              >
                <Phone className="w-3 h-3 text-champagne group-hover:scale-110 transition-transform" />
                <span>DIRECT: {phoneNumber}</span>
              </a>
              <span className="text-surface/25 shrink-0">•</span>

              <span className="font-light text-surface/85 shrink-0">
                {trustBadge3}
              </span>
              <span className="text-surface/25 shrink-0">•</span>

              <span className="font-light text-surface/85 shrink-0">
                {trustBadge4}
              </span>
              <span className="text-surface/25 shrink-0">•</span>

              <span className="font-light text-surface/75 tracking-widest shrink-0">
                BESPOKE ARCHITECTURAL & INTERIOR COMMISSIONS
              </span>
              <span className="text-surface/25 shrink-0">•</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero3DTypography;
