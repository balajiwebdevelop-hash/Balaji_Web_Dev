'use client';

import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronLeft, ChevronRight, Compass } from 'lucide-react';
import { Project, PortfolioAnimationSettings } from '@/types';

interface ScrollPortfolioProps {
  projects: Project[];
  settings?: PortfolioAnimationSettings;
}

export function ScrollPortfolio({ projects, settings }: ScrollPortfolioProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const rafId = useRef<number | null>(null);

  // Discrete active index state (updated ONLY when active project genuinely changes)
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);

  // Fallback if projects is empty
  const safeProjects = useMemo(() => {
    if (!projects || projects.length === 0) return [];
    const limit = settings?.maxProjects || 6;
    return projects.slice(0, limit);
  }, [projects, settings?.maxProjects]);

  const totalCards = safeProjects.length;

  // Configuration presets
  const speed = settings?.speedPreset || 'fast';
  const intensity = settings?.parallaxIntensity || 'medium';

  // Section height multiplier:
  // Compact, responsive scroll travel so the user glides effortlessly
  const scrollDistanceMultiplier = useMemo(() => {
    switch (speed) {
      case 'fast':
        return 42;
      case 'cinematic':
        return 75;
      case 'normal':
      default:
        return 55;
    }
  }, [speed]);

  // Z-depth & scaling parameters
  const depthConfig = useMemo(() => {
    switch (intensity) {
      case 'subtle':
        return { zStep: 100, yStep: 9, scaleStep: 0.055 };
      case 'high':
        return { zStep: 180, yStep: 15, scaleStep: 0.09 };
      case 'medium':
      default:
        return { zStep: 140, yStep: 12, scaleStep: 0.07 };
    }
  }, [intensity]);

  // Direct DOM Element Refs for High-Performance Animation (Zero React VDOM allocations)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textTopRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textBottomRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Target and current interpolated progress refs
  const physicsRef = useRef({
    target: 0,
    current: 0,
    last: 0,
    velocity: 0,
    isAnimating: false,
    inView: true,
  });
  const lastTimeRef = useRef<number>(0);

  // Dedicated responsive mobile flag ref (avoids SSR hydration mismatches)
  const isMobileRef = useRef<boolean>(false);

  // High-performance direct DOM transform applier (runs directly against DOM, zero React re-renders)
  const applyCardStyles = useCallback((currentProgress: number, vel: number) => {
    const isMobile = isMobileRef.current;

    if (isMobile) {
      // DEDICATED LIGHTWEIGHT 2D MOBILE RENDERING ENGINE
      // ZERO rotateX / rotateZ, ZERO translateZ, ZERO animated filters, ZERO forced layout toggles
      for (let idx = 0; idx < totalCards; idx++) {
        const card = cardRefs.current[idx];
        if (!card) continue;

        const delta = idx - currentProgress;
        const isCurrent = Math.abs(delta) < 0.5;

        // Mobile Prune: composite ONLY Active + Next + Immediate Previous cards
        if (delta < -0.70 || delta > 1.60) {
          if (card.style.visibility !== 'hidden') card.style.visibility = 'hidden';
          if (card.style.opacity !== '0') card.style.opacity = '0';
          if (card.style.pointerEvents !== 'none') card.style.pointerEvents = 'none';
          continue;
        }
        if (card.style.visibility !== 'visible') card.style.visibility = 'visible';

        let translateYPercent: number;
        let scale: number;
        let opacity: number;
        let textOpacity: number;

        if (delta < 0) {
          // Card exiting smoothly towards top
          const absDelta = -delta;
          translateYPercent = delta * 24;
          scale = Math.min(1.05, 1 + absDelta * 0.04);
          if (absDelta <= 0.20) {
            opacity = 1;
            textOpacity = 1;
          } else if (absDelta <= 0.55) {
            const t = (absDelta - 0.20) / 0.35;
            const smooth = t * t * (3 - 2 * t);
            opacity = Math.max(0, 1 - smooth);
            textOpacity = Math.max(0, 1 - t * 1.3);
          } else {
            opacity = 0;
            textOpacity = 0;
          }
        } else {
          // Card entering from lower stack
          translateYPercent = delta * 14;
          scale = Math.max(0.88, 1 - delta * 0.07);
          if (delta <= 0.25) {
            opacity = 1;
            textOpacity = 1;
          } else if (delta <= 0.75) {
            const enterT = (0.75 - delta) / 0.50;
            const smoothEnter = enterT * enterT * (3 - 2 * enterT);
            opacity = 0.40 + 0.60 * smoothEnter;
            textOpacity = Math.max(0, (smoothEnter - 0.2) / 0.8);
          } else {
            opacity = Math.max(0, 0.40 - (delta - 0.75) * 0.5);
            textOpacity = 0;
          }
        }

        const zIndex = totalCards - Math.abs(Math.round(delta));

        // 2D GPU translation and scale — instantaneous rendering on mobile GPUs
        card.style.transform = `translate3d(0, ${translateYPercent.toFixed(2)}%, 0) scale(${scale.toFixed(4)})`;
        card.style.opacity = opacity.toFixed(3);
        if (card.style.filter !== 'none') card.style.filter = 'none';
        card.style.zIndex = `${zIndex}`;
        card.style.pointerEvents = isCurrent ? 'auto' : 'none';

        const textTop = textTopRefs.current[idx];
        if (textTop) textTop.style.opacity = textOpacity.toFixed(3);

        const textBottom = textBottomRefs.current[idx];
        if (textBottom) textBottom.style.opacity = textOpacity.toFixed(3);

        const imgEl = imgRefs.current[idx];
        if (imgEl && imgEl.style.transform !== 'none') imgEl.style.transform = 'none';
      }
      return;
    }

    // DESKTOP RENDERING PATH (100% PRESERVED, UNTOUCHED 3D PERSPECTIVE & EFFECTS)
    const dynamicTiltX = Math.max(-3.5, Math.min(3.5, vel * 40));
    const dynamicTiltZ = Math.max(-1.2, Math.min(1.2, -vel * 16));

    for (let idx = 0; idx < totalCards; idx++) {
      const card = cardRefs.current[idx];
      if (!card) continue;
      if (card.style.visibility !== 'visible') card.style.visibility = 'visible';

      const delta = idx - currentProgress;
      const isCurrent = Math.abs(delta) < 0.5;

      // Prune invisible / far cards from active compositing for 120fps performance
      if (Math.abs(delta) > 3.5 || delta < -0.60) {
        card.style.display = 'none';
        continue;
      }
      card.style.display = '';

      let translateZ: number;
      let translateYPercent: number;
      let scale: number;
      let opacity: number;
      let blurPx: number;
      let brightness: number;
      let textOpacity: number;

      if (delta < 0) {
        const absDelta = -delta;
        if (absDelta <= 0.30) {
          opacity = 1;
          textOpacity = 1;
          blurPx = 0;
          brightness = 1;
        } else if (absDelta <= 0.60) {
          const exitT = (absDelta - 0.30) / 0.30;
          const smoothExit = exitT * exitT * (3 - 2 * exitT);
          opacity = Math.max(0, 1 - smoothExit);
          textOpacity = Math.max(0, 1 - Math.min(1, exitT * 1.35));
          blurPx = Math.min(6, exitT * 4);
          brightness = Math.max(0.4, 1 - exitT * 0.4);
        } else {
          opacity = 0;
          textOpacity = 0;
          blurPx = 6;
          brightness = 0.4;
        }
        translateZ = delta * (depthConfig.zStep * 0.45);
        translateYPercent = delta * (depthConfig.yStep * 2.5);
        scale = Math.min(1.12, 1 + absDelta * 0.05);
      } else {
        if (delta <= 0.30) {
          opacity = 1;
          textOpacity = 1;
          blurPx = 0;
          brightness = 1;
        } else if (delta <= 0.60) {
          const enterT = (0.60 - delta) / 0.30;
          const smoothEnter = enterT * enterT * (3 - 2 * enterT);
          opacity = 0.38 + 0.62 * smoothEnter;
          textOpacity = Math.max(0, (smoothEnter - 0.2) / 0.8);
          blurPx = Math.max(0, (1 - smoothEnter) * 3.5);
          brightness = 0.65 + 0.35 * smoothEnter;
        } else {
          opacity = Math.max(0, 0.38 - (delta - 0.60) * 0.14);
          textOpacity = 0;
          blurPx = Math.min(8, 2.5 + (delta - 0.60) * 2.2);
          brightness = Math.max(0.35, 0.65 - (delta - 0.60) * 0.18);
        }
        translateZ = -delta * depthConfig.zStep;
        translateYPercent = delta * depthConfig.yStep;
        scale = Math.max(0.65, 1 - delta * depthConfig.scaleStep);
      }

      const zIndex = totalCards - Math.abs(Math.round(delta));
      const imgScale = Math.max(1.02, 1.10 - Math.abs(delta) * 0.04);

      card.style.transform = `translate3d(0, ${translateYPercent.toFixed(2)}%, ${translateZ.toFixed(1)}px) scale(${scale.toFixed(4)}) rotateX(${dynamicTiltX.toFixed(2)}deg) rotateZ(${dynamicTiltZ.toFixed(2)}deg)`;
      card.style.opacity = opacity.toFixed(3);
      card.style.filter = blurPx > 0.1 ? `blur(${blurPx.toFixed(1)}px) brightness(${brightness.toFixed(2)})` : `brightness(${brightness.toFixed(2)})`;
      card.style.zIndex = `${zIndex}`;
      card.style.pointerEvents = isCurrent ? 'auto' : 'none';

      const textTop = textTopRefs.current[idx];
      if (textTop) textTop.style.opacity = textOpacity.toFixed(3);

      const textBottom = textBottomRefs.current[idx];
      if (textBottom) textBottom.style.opacity = textOpacity.toFixed(3);

      const imgEl = imgRefs.current[idx];
      if (imgEl) imgEl.style.transform = `scale(${imgScale.toFixed(3)})`;
    }
  }, [totalCards, depthConfig]);

  // Viscous fluid damping loop (Watery Smooth / Buttery Smooth Hydrodynamic Physics)
  useEffect(() => {
    if (totalCards <= 1) return;

    let isMounted = true;

    // Responsive Mobile detection with change listener
    const mq = window.matchMedia('(max-width: 767px)');
    isMobileRef.current = mq.matches;
    const handleMqChange = (e: MediaQueryListEvent) => {
      isMobileRef.current = e.matches;
      for (let idx = 0; idx < totalCards; idx++) {
        const card = cardRefs.current[idx];
        if (card) {
          card.style.display = '';
          card.style.visibility = 'visible';
          card.style.filter = '';
        }
      }
      onScrollOrResize();
    };
    if (mq.addEventListener) {
      mq.addEventListener('change', handleMqChange);
    } else {
      mq.addListener(handleMqChange);
    }

    const startLoop = () => {
      if (physicsRef.current.isAnimating) return;
      if (!physicsRef.current.inView || (typeof document !== 'undefined' && document.hidden)) return;
      physicsRef.current.isAnimating = true;
      lastTimeRef.current = 0;
      rafId.current = requestAnimationFrame(updateLoop);
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

      const isMobile = isMobileRef.current;
      // Hydrodynamic viscosity factor calibrated for liquid buttery glide:
      // Mobile: 14.0 (instant direct tracking with finger, immediate response, buttery ease-out)
      // Desktop: Fast = 8.5 (snappy yet buttery), Normal = 6.8 (silky water), Cinematic = 4.8 (luxurious slow glide)
      const lambda = isMobile ? 14.0 : speed === 'fast' ? 8.5 : speed === 'cinematic' ? 4.8 : 6.8;
      const dampFactor = 1 - Math.exp(-lambda * dt);
      const settleThreshold = isMobile ? 0.0001 : 0.00005;

      if (Math.abs(diff) > settleThreshold) {
        // High-precision hydrodynamic asymptotic glide
        p.current += diff * dampFactor;
        const currentVel = (p.current - p.last) / (dt * 60);
        p.velocity = currentVel;
        p.last = p.current;

        applyCardStyles(p.current, currentVel);

        // Discrete active index change only when project changes
        const newIndex = Math.max(0, Math.min(totalCards - 1, Math.round(p.current)));
        if (newIndex !== activeIndexRef.current) {
          activeIndexRef.current = newIndex;
          setActiveIndex(newIndex);
        }

        rafId.current = requestAnimationFrame(updateLoop);
      } else {
        // Settled: perform final position snap and sleep the RAF loop to save CPU & GPU
        p.current = p.target;
        p.velocity = 0;
        p.last = p.target;
        applyCardStyles(p.current, 0);

        const newIndex = Math.max(0, Math.min(totalCards - 1, Math.round(p.current)));
        if (newIndex !== activeIndexRef.current) {
          activeIndexRef.current = newIndex;
          setActiveIndex(newIndex);
        }

        p.isAnimating = false;
        rafId.current = null;
      }
    };

    // Cached container layout coordinates to eliminate forced synchronous reflows on scroll
    const containerGeo = { top: 0, height: 0, windowHeight: 800 };
    const measureGeometry = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollY = window.scrollY || window.pageYOffset || 0;
      containerGeo.top = rect.top + scrollY;
      containerGeo.height = rect.height;
      containerGeo.windowHeight = window.innerHeight || 800;
    };

    let scrollTicking = false;
    const onScroll = () => {
      if (!scrollTicking) {
        scrollTicking = true;
        requestAnimationFrame(() => {
          scrollTicking = false;
          if (!containerRef.current) return;
          const scrollY = window.scrollY || window.pageYOffset || 0;
          const windowHeight = containerGeo.windowHeight || window.innerHeight || 800;
          const rectTop = containerGeo.top - scrollY;
          const rectBottom = rectTop + containerGeo.height;

          // Check if container is in viewport
          const inView = rectTop < windowHeight && rectBottom > 0;
          physicsRef.current.inView = inView;
          if (!inView) {
            if (rafId.current) cancelAnimationFrame(rafId.current);
            physicsRef.current.isAnimating = false;
            return;
          }

          const totalScrollableDistance = containerGeo.height - windowHeight;
          if (totalScrollableDistance <= 0) return;

          // Fraction from 0 to 1
          const progress = Math.max(0, Math.min(1, -rectTop / totalScrollableDistance));
          physicsRef.current.target = progress * (totalCards - 1);
          startLoop();
        });
      }
    };

    const onScrollOrResize = () => {
      measureGeometry();
      onScroll();
    };

    // Sleep when offscreen via IntersectionObserver
    let observer: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== 'undefined' && containerRef.current) {
      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          const inView = entry ? entry.isIntersecting : true;
          physicsRef.current.inView = inView;
          if (inView) {
            onScrollOrResize();
          } else {
            if (rafId.current) cancelAnimationFrame(rafId.current);
            physicsRef.current.isAnimating = false;
          }
        },
        { rootMargin: '100px 0px 100px 0px' }
      );
      observer.observe(containerRef.current);
    }

    // Sleep in background tab via document.visibilityState
    const onVisibilityChange = () => {
      if (document.hidden) {
        if (rafId.current) cancelAnimationFrame(rafId.current);
        physicsRef.current.isAnimating = false;
      } else if (physicsRef.current.inView) {
        onScrollOrResize();
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });
    window.addEventListener('orientationchange', onScrollOrResize, { passive: true });

    // Initial mount card styling & measurement
    measureGeometry();
    applyCardStyles(0, 0);
    onScroll();

    return () => {
      isMounted = false;
      if (rafId.current) cancelAnimationFrame(rafId.current);
      if (observer) observer.disconnect();
      if (mq.removeEventListener) {
        mq.removeEventListener('change', handleMqChange);
      } else {
        mq.removeListener(handleMqChange);
      }
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScrollOrResize);
      window.removeEventListener('orientationchange', onScrollOrResize);
    };
  }, [totalCards, speed, applyCardStyles]);

  // Jump to specific card by smoothly scrolling the viewport
  const jumpToIndex = useCallback(
    (index: number) => {
      if (!containerRef.current || totalCards <= 1) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight || 800;
      const totalScrollableDistance = rect.height - windowHeight;

      if (totalScrollableDistance <= 0) {
        physicsRef.current.target = index;
        if (activeIndexRef.current !== index) {
          activeIndexRef.current = index;
          setActiveIndex(index);
        }
        applyCardStyles(index, 0);
        return;
      }

      const fraction = index / (totalCards - 1);
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const targetScrollY = scrollY + rect.top + fraction * totalScrollableDistance;

      window.scrollTo({
        top: targetScrollY,
        behavior: 'smooth',
      });
    },
    [totalCards, applyCardStyles]
  );

  // Mobile Touch Swipe Handling with kinetic momentum
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        time: Date.now(),
      };
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current || e.changedTouches.length === 0) return;
    const deltaX = e.changedTouches[0].clientX - touchStartRef.current.x;
    const deltaY = e.changedTouches[0].clientY - touchStartRef.current.y;
    touchStartRef.current = null;

    // Horizontal swipe detection: strictly require horizontal dominance so vertical scroll remains unhindered
    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 2) {
      if (deltaX < 0 && activeIndexRef.current < totalCards - 1) {
        jumpToIndex(activeIndexRef.current + 1);
      } else if (deltaX > 0 && activeIndexRef.current > 0) {
        jumpToIndex(activeIndexRef.current - 1);
      }
    }
  };

  if (totalCards === 0) return null;

  const activeProject = safeProjects[activeIndex] || safeProjects[0];

  // Section height: Compact total travel so user never feels trapped
  const totalContainerHeightVh = Math.max(120, 100 + (totalCards - 1) * scrollDistanceMultiplier);

  return (
    <section
      ref={containerRef}
      style={{ height: `${totalContainerHeightVh}vh` }}
      className="relative w-full bg-canvas text-espresso selection:bg-champagne selection:text-espresso"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Pinned Sticky Viewport Stage with Luminous Transparent Glass Aesthetics */}
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col justify-between py-3 sm:py-6 md:py-8 px-3 sm:px-8 lg:px-12 z-10">
        {/* Seamless Soft Edge Ambient Dissolves in Balaji Web Canvas */}
        <div className="pointer-events-none absolute top-0 left-0 right-0 h-28 sm:h-36 bg-gradient-to-b from-canvas via-canvas/80 to-transparent backdrop-blur-xs z-30" />
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-28 sm:h-36 bg-gradient-to-t from-canvas via-canvas/80 to-transparent backdrop-blur-xs z-30" />

        {/* Left & Right Soft Edge Vignettes */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-16 bg-gradient-to-r from-canvas/80 to-transparent z-25" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-16 bg-gradient-to-l from-canvas/80 to-transparent z-25" />

        {/* Luminous Light Glass Atmospheric Backdrop (Single Active Layer — High GPU Efficiency) */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none">
          {/* Heavy blur background image enabled strictly on desktop to save mobile compositor GPU */}
          <div
            key={`bg-ambient-${activeProject.id}`}
            className="hidden md:block absolute -inset-20 transition-opacity duration-700 ease-out will-change-transform opacity-12"
          >
            <Image
              src={activeProject.heroImage}
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-center filter blur-3xl scale-125 saturate-120"
            />
          </div>
          {/* Transparent Frosted Glass Texture & Pure Architectural Canvas Glow */}
          <div className="absolute inset-0 bg-canvas/60 md:backdrop-blur-xl" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.85)_0%,rgba(246,242,234,0.3)_60%,transparent_100%)]" />
          {/* Soft Diffused Warmth Lighting */}
          <div className="absolute -top-32 left-1/4 w-[24rem] sm:w-[36rem] h-[24rem] sm:h-[36rem] bg-champagne/15 rounded-full blur-[90px] sm:blur-[140px]" />
          <div className="absolute -bottom-32 right-1/4 w-[24rem] sm:w-[36rem] h-[24rem] sm:h-[36rem] bg-bronze/10 rounded-full blur-[100px] sm:blur-[160px]" />
        </div>

        {/* 2. MAIN 3D PERSPECTIVE STAGE */}
        <div
          ref={stageRef}
          className="relative z-10 my-auto flex-1 w-full max-w-6xl mx-auto flex items-center justify-center py-1 sm:py-2 pointer-events-none md:[perspective:1200px] md:[perspective-origin:50%_48%]"
        >
          <div
            className="relative w-full max-w-5xl aspect-[4/4.5] sm:aspect-[16/10] md:aspect-[21/10] max-h-[54dvh] sm:max-h-[58vh] pointer-events-none md:[transform-style:preserve-3d]"
          >
            {safeProjects.map((project, idx) => {
              return (
                <div
                  key={project.id}
                  ref={(el) => {
                    cardRefs.current[idx] = el;
                  }}
                  data-portfolio-card="true"
                  data-theme="dark"
                  className="absolute inset-0 rounded-2xl sm:rounded-3xl overflow-hidden border border-white/90 will-change-transform bg-white/40 md:backdrop-blur-xl md:[transform-style:preserve-3d]"
                  style={{
                    boxShadow:
                      idx === 0
                        ? '0 30px 80px -15px rgba(90, 67, 53, 0.18), 0 10px 30px rgba(0, 0, 0, 0.06), inset 0 1.5px 2px rgba(255, 255, 255, 0.95), 0 0 35px rgba(197, 168, 128, 0.15)'
                        : '0 15px 45px -10px rgba(90, 67, 53, 0.12), inset 0 1px 1.5px rgba(255, 255, 255, 0.8)',
                  }}
                >
                  {/* Tricky Premium Top Hairline Gold Glint */}
                  <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#C5A880]/80 to-transparent z-20 pointer-events-none" />

                  {/* High Quality Hero Architectural Photography */}
                  <div
                    ref={(el) => {
                      imgRefs.current[idx] = el;
                    }}
                    className="relative w-full h-full overflow-hidden md:will-change-transform"
                  >
                    <Image
                      src={project.heroImage}
                      alt={project.title}
                      fill
                      priority={idx === 0}
                      loading={idx <= 1 ? 'eager' : 'lazy'}
                      sizes="(max-width: 767px) 92vw, (max-width: 1280px) 80vw, 1100px"
                      className="object-cover object-center select-none"
                    />
                  </div>

                  {/* High-Contrast Crystal Glass Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent pointer-events-none" />

                  {/* Card Editorial Info Overlay */}
                  <div className="absolute inset-0 p-3.5 sm:p-7 md:p-10 flex flex-col justify-between z-10 pointer-events-none">
                    {/* Top Tag & Location Badge (Frosted Crystal Glass) */}
                    <div
                      ref={(el) => {
                        textTopRefs.current[idx] = el;
                      }}
                      className="flex items-center justify-between pointer-events-auto"
                    >
                      <div className="flex items-center gap-1.5 bg-white/90 md:bg-white/85 backdrop-blur-md md:backdrop-blur-xl px-2.5 py-1 sm:px-3.5 sm:py-1.5 border border-white/90 text-[9px] sm:text-xs uppercase tracking-wider text-espresso rounded-2xs shadow-md">
                        <Compass className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-bronze" />
                        <span className="font-medium">{project.location}</span>
                      </div>
                      <span className="bg-white/90 md:bg-white/85 backdrop-blur-md md:backdrop-blur-xl px-2.5 py-1 sm:px-3.5 sm:py-1.5 border border-white/90 text-[9px] sm:text-xs font-mono text-espresso font-medium rounded-2xs shadow-md">
                        {project.year}
                      </span>
                    </div>

                    {/* Bottom Title & Action Button */}
                    <div
                      ref={(el) => {
                        textBottomRefs.current[idx] = el;
                      }}
                      className="space-y-1.5 sm:space-y-3.5 max-w-2xl pointer-events-auto"
                    >
                      <span className="text-[9px] sm:text-xs uppercase tracking-widest text-champagne font-medium">
                        {project.projectType}
                      </span>
                      <h3 className="font-serif text-xl sm:text-3xl md:text-5xl text-[#FCFAF6] font-light leading-snug drop-shadow-md line-clamp-1 sm:line-clamp-2">
                        {project.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#FCFAF6]/80 line-clamp-2 leading-relaxed font-light hidden sm:block">
                        {project.shortDescription}
                      </p>

                      <div className="pt-1.5 sm:pt-4 flex items-center gap-3 sm:gap-4">
                        <Link
                          href={`/projects/${project.slug}`}
                          className="inline-flex items-center gap-1.5 sm:gap-2 px-4 py-2 sm:px-7 sm:py-3.5 bg-champagne text-[#100C0A] hover:bg-[#DAC19E] font-medium text-[10px] sm:text-xs uppercase tracking-widest transition-all duration-300 rounded-2xs shadow-lg hover:shadow-champagne/30 cursor-pointer"
                        >
                          <span>Explore Project</span> <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        </Link>
                        <span className="text-[10px] sm:text-[11px] text-[#FCFAF6]/75 uppercase tracking-wider hidden md:inline font-light">
                          {project.area || 'Turnkey Atelier Commission'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Tricky Premium Bottom Hairline Gold Glint */}
                  <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C5A880]/60 to-transparent z-20 pointer-events-none" />
                </div>
              );
            })}
          </div>

          {/* Left / Right Quick Click Navigation Chevrons */}
          {activeIndex > 0 && (
            <button
              onClick={() => jumpToIndex(activeIndex - 1)}
              className="pointer-events-auto absolute left-2 sm:left-4 z-30 p-2.5 sm:p-3.5 bg-surface/90 hover:bg-white text-espresso border border-atelier rounded-full backdrop-blur-md transition-all cursor-pointer shadow-xl hidden sm:flex items-center justify-center hover:scale-105"
              aria-label="Previous project"
            >
              <ChevronLeft className="w-4 h-4 text-espresso" />
            </button>
          )}

          {activeIndex < totalCards - 1 && (
            <button
              onClick={() => jumpToIndex(activeIndex + 1)}
              className="pointer-events-auto absolute right-2 sm:right-4 z-30 p-2.5 sm:p-3.5 bg-surface/90 hover:bg-white text-espresso border border-atelier rounded-full backdrop-blur-md transition-all cursor-pointer shadow-xl hidden sm:flex items-center justify-center hover:scale-105"
              aria-label="Next project"
            >
              <ChevronRight className="w-4 h-4 text-espresso" />
            </button>
          )}
        </div>

        {/* 3. BOTTOM TIMELINE & LIQUID STICK CONTROLS */}
        <div className="relative z-20 border-t border-atelier pt-2 sm:pt-4 space-y-2 sm:space-y-3 pb-[max(0.25rem,env(safe-area-inset-bottom))]">
          {/* Liquid Dynamic Stick Progress Indicator */}
          <div className="flex items-center justify-between gap-1 sm:gap-2.5">
            {safeProjects.map((proj, idx) => {
              const isSelected = idx === activeIndex;
              const isPassed = idx < activeIndex;

              return (
                <button
                  key={proj.id}
                  onClick={() => jumpToIndex(idx)}
                  className="group flex-1 flex flex-col items-center gap-1 py-0.5 sm:py-1 cursor-pointer focus:outline-hidden"
                  aria-label={`Jump to project ${idx + 1}: ${proj.title}`}
                >
                  {/* Dynamic Morphing Liquid Stick */}
                  <div
                    className={`h-1 sm:h-1.5 rounded-full transition-all duration-400 ease-out ${
                      isSelected
                        ? 'w-full bg-gradient-to-r from-bronze via-champagne to-bronze shadow-[0_0_12px_rgba(140,106,69,0.45)]'
                        : isPassed
                        ? 'w-full bg-bronze/40 group-hover:bg-bronze/60'
                        : 'w-full bg-[#E5DDCF] group-hover:bg-[#D8CEBE]'
                    }`}
                  />

                  {/* Monospace Bracket Number [01] */}
                  <span
                    className={`hidden sm:inline-block font-mono text-[9px] sm:text-xs transition-colors duration-200 ${
                      isSelected
                        ? 'text-espresso font-bold'
                        : 'text-warmgray group-hover:text-espresso'
                    }`}
                  >
                    [{String(idx + 1).padStart(2, '0')}]
                  </span>
                </button>
              );
            })}
          </div>

          {/* Footer Metadata & Global View All Link */}
          <div className="flex items-center justify-between text-[9px] sm:text-xs uppercase tracking-widest text-warmgray">
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="font-mono text-bronze font-bold sm:hidden">
                [{String(activeIndex + 1).padStart(2, '0')}/{String(totalCards).padStart(2, '0')}]
              </span>
              <span className="text-espresso font-medium truncate max-w-[120px] sm:max-w-none">
                {activeProject.location}
              </span>
              <span className="hidden sm:inline text-atelier">•</span>
              <span className="hidden sm:inline text-espresso">
                {activeProject.title}
              </span>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              <span className="text-warmgray hidden md:inline">
                Scroll to glide through works ↓
              </span>
              <Link
                href="/projects"
                className="text-bronze hover:text-espresso font-medium flex items-center gap-1 transition-colors"
              >
                <span>All Projects ({projects.length})</span> <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ScrollPortfolio;
