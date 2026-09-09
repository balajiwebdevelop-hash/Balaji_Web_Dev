'use client';

import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronLeft, ChevronRight, Compass } from 'lucide-react';
import { Project, PortfolioAnimationSettings } from '@/types';

interface DesktopScrollPortfolioProps {
  projects: Project[];
  settings?: PortfolioAnimationSettings;
}

export function DesktopScrollPortfolio({ projects, settings }: DesktopScrollPortfolioProps) {
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

  // Desktop scroll distance multiplier
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

  // Z-depth & scaling parameters for Desktop 3D engine
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

  // Desktop hydrodynamic physics refs
  const physicsRef = useRef({
    target: 0,
    current: 0,
    last: 0,
    velocity: 0,
    isAnimating: false,
    inView: true,
  });
  const lastTimeRef = useRef<number>(0);

  // Desktop Card Styler (100% Frozen & Preserved Desktop 3D Perspective)
  const applyDesktopCardStyles = useCallback((currentProgress: number, vel: number) => {
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

  // Desktop Viscous fluid damping loop (Watery Smooth Hydrodynamic Physics)
  useEffect(() => {
    if (totalCards <= 1) return;
    if (typeof window !== 'undefined' && window.innerWidth < 768) return;

    let isMounted = true;

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
      const lambda = speed === 'fast' ? 8.5 : speed === 'cinematic' ? 4.8 : 6.8;
      const dampFactor = 1 - Math.exp(-lambda * dt);

      if (Math.abs(diff) > 0.00005) {
        p.current += diff * dampFactor;
        const currentVel = (p.current - p.last) / (dt * 60);
        p.velocity = currentVel;
        p.last = p.current;

        applyDesktopCardStyles(p.current, currentVel);

        const newIndex = Math.max(0, Math.min(totalCards - 1, Math.round(p.current)));
        if (newIndex !== activeIndexRef.current) {
          activeIndexRef.current = newIndex;
          setActiveIndex(newIndex);
        }

        rafId.current = requestAnimationFrame(updateLoop);
      } else {
        p.current = p.target;
        p.velocity = 0;
        p.last = p.target;
        applyDesktopCardStyles(p.current, 0);

        const newIndex = Math.max(0, Math.min(totalCards - 1, Math.round(p.current)));
        if (newIndex !== activeIndexRef.current) {
          activeIndexRef.current = newIndex;
          setActiveIndex(newIndex);
        }

        p.isAnimating = false;
        rafId.current = null;
      }
    };

    let scrollTicking = false;
    const onScrollOrResize = () => {
      if (!scrollTicking) {
        scrollTicking = true;
        requestAnimationFrame(() => {
          scrollTicking = false;
          if (!containerRef.current) return;
          const rect = containerRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight || 800;

          const inView = rect.top < windowHeight && rect.bottom > 0;
          physicsRef.current.inView = inView;
          if (!inView) {
            if (rafId.current) cancelAnimationFrame(rafId.current);
            physicsRef.current.isAnimating = false;
            return;
          }

          const totalScrollableDistance = rect.height - windowHeight;
          if (totalScrollableDistance <= 0) return;

          const progress = Math.max(0, Math.min(1, -rect.top / totalScrollableDistance));
          physicsRef.current.target = progress * (totalCards - 1);
          startLoop();
        });
      }
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

    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });

    // Initial mount card styling
    applyDesktopCardStyles(0, 0);
    onScrollOrResize();

    return () => {
      isMounted = false;
      if (rafId.current) cancelAnimationFrame(rafId.current);
      if (observer) observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, [totalCards, speed, applyDesktopCardStyles]);

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
        applyDesktopCardStyles(index, 0);
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
    [totalCards, applyDesktopCardStyles]
  );

  if (totalCards === 0) return null;
  const activeProject = safeProjects[activeIndex] || safeProjects[0];
  const totalContainerHeightVh = Math.max(120, 100 + (totalCards - 1) * scrollDistanceMultiplier);

  return (
    <section
      ref={containerRef}
      style={{ height: `${totalContainerHeightVh}vh` }}
      className="relative w-full bg-canvas text-espresso selection:bg-champagne selection:text-espresso"
    >
      {/* Pinned Sticky Viewport Stage with Luminous Transparent Glass Aesthetics */}
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col justify-between py-6 md:py-8 px-8 lg:px-12 z-10">
        {/* Seamless Soft Edge Ambient Dissolves */}
        <div className="pointer-events-none absolute top-0 left-0 right-0 h-36 bg-gradient-to-b from-canvas via-canvas/80 to-transparent backdrop-blur-xs z-30" />
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-canvas via-canvas/80 to-transparent backdrop-blur-xs z-30" />

        {/* Left & Right Soft Edge Vignettes */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-canvas/80 to-transparent z-25" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-canvas/80 to-transparent z-25" />

        {/* Luminous Light Glass Atmospheric Backdrop */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none">
          <div
            key={`bg-ambient-${activeProject.id}`}
            className="absolute -inset-20 transition-opacity duration-700 ease-out will-change-transform opacity-12"
          >
            <Image
              src={activeProject.heroImage}
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-center filter blur-3xl scale-125 saturate-120"
            />
          </div>
          <div className="absolute inset-0 bg-canvas/60 backdrop-blur-xl" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.85)_0%,rgba(246,242,234,0.3)_60%,transparent_100%)]" />
          <div className="absolute -top-32 left-1/4 w-[36rem] h-[36rem] bg-champagne/15 rounded-full blur-[140px]" />
          <div className="absolute -bottom-32 right-1/4 w-[36rem] h-[36rem] bg-bronze/10 rounded-full blur-[160px]" />
        </div>

        {/* 2. MAIN 3D PERSPECTIVE STAGE */}
        <div
          ref={stageRef}
          className="relative z-10 my-auto flex-1 w-full max-w-6xl mx-auto flex items-center justify-center py-2 pointer-events-none"
          style={{
            perspective: '1200px',
            perspectiveOrigin: '50% 48%',
          }}
        >
          <div
            className="relative w-full max-w-5xl aspect-[16/10] md:aspect-[21/10] max-h-[58vh] pointer-events-none"
            style={{ transformStyle: 'preserve-3d' }}
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
                  className="absolute inset-0 rounded-3xl overflow-hidden border border-white/90 will-change-transform bg-white/40 backdrop-blur-xl"
                  style={{
                    transformStyle: 'preserve-3d',
                    boxShadow:
                      idx === 0
                        ? '0 30px 80px -15px rgba(90, 67, 53, 0.18), 0 10px 30px rgba(0, 0, 0, 0.06), inset 0 1.5px 2px rgba(255, 255, 255, 0.95), 0 0 35px rgba(197, 168, 128, 0.15)'
                        : '0 15px 45px -10px rgba(90, 67, 53, 0.12), inset 0 1px 1.5px rgba(255, 255, 255, 0.8)',
                  }}
                >
                  {/* Top Hairline Gold Glint */}
                  <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#C5A880]/80 to-transparent z-20 pointer-events-none" />

                  {/* High Quality Hero Photography */}
                  <div
                    ref={(el) => {
                      imgRefs.current[idx] = el;
                    }}
                    className="relative w-full h-full overflow-hidden will-change-transform"
                  >
                    <Image
                      src={project.heroImage}
                      alt={project.title}
                      fill
                      priority={idx === 0}
                      sizes="(max-width: 1280px) 80vw, 1100px"
                      className="object-cover object-center select-none"
                    />
                  </div>

                  {/* Crystal Glass Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent pointer-events-none" />

                  {/* Card Editorial Info Overlay */}
                  <div className="absolute inset-0 p-7 md:p-10 flex flex-col justify-between z-10 pointer-events-none">
                    {/* Top Tag & Location Badge */}
                    <div
                      ref={(el) => {
                        textTopRefs.current[idx] = el;
                      }}
                      className="flex items-center justify-between pointer-events-auto"
                    >
                      <div className="flex items-center gap-1.5 bg-white/85 backdrop-blur-xl px-3.5 py-1.5 border border-white/90 text-xs uppercase tracking-wider text-espresso rounded-2xs shadow-md font-medium">
                        <Compass className="w-3.5 h-3.5 text-bronze" />
                        <span>{project.location}</span>
                      </div>
                      <span className="bg-white/85 backdrop-blur-xl px-3.5 py-1.5 border border-white/90 text-xs font-mono text-espresso font-medium rounded-2xs shadow-md">
                        {project.year}
                      </span>
                    </div>

                    {/* Bottom Title & Action Button */}
                    <div
                      ref={(el) => {
                        textBottomRefs.current[idx] = el;
                      }}
                      className="space-y-3.5 max-w-2xl pointer-events-auto"
                    >
                      <span className="text-xs uppercase tracking-widest text-champagne font-medium">
                        {project.projectType}
                      </span>
                      <h3 className="font-serif text-3xl md:text-5xl text-[#FCFAF6] font-light leading-snug drop-shadow-md line-clamp-2">
                        {project.title}
                      </h3>
                      <p className="text-sm text-[#FCFAF6]/80 line-clamp-2 leading-relaxed font-light hidden sm:block">
                        {project.shortDescription}
                      </p>

                      <div className="pt-4 flex items-center gap-4">
                        <Link
                          href={`/projects/${project.slug}`}
                          className="inline-flex items-center gap-2 px-7 py-3.5 bg-champagne text-[#100C0A] hover:bg-[#DAC19E] font-medium text-xs uppercase tracking-widest transition-all duration-300 rounded-2xs shadow-lg hover:shadow-champagne/30 cursor-pointer"
                        >
                          <span>Explore Project</span> <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                        <span className="text-[11px] text-[#FCFAF6]/75 uppercase tracking-wider hidden md:inline font-light">
                          {project.area || 'Turnkey Atelier Commission'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Hairline Gold Glint */}
                  <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C5A880]/60 to-transparent z-20 pointer-events-none" />
                </div>
              );
            })}
          </div>

          {/* Left / Right Navigation Chevrons */}
          {activeIndex > 0 && (
            <button
              onClick={() => jumpToIndex(activeIndex - 1)}
              className="pointer-events-auto absolute left-4 z-30 p-3.5 bg-surface/90 hover:bg-white text-espresso border border-atelier rounded-full backdrop-blur-md transition-all cursor-pointer shadow-xl hidden sm:flex items-center justify-center hover:scale-105"
              aria-label="Previous project"
            >
              <ChevronLeft className="w-4 h-4 text-espresso" />
            </button>
          )}

          {activeIndex < totalCards - 1 && (
            <button
              onClick={() => jumpToIndex(activeIndex + 1)}
              className="pointer-events-auto absolute right-4 z-30 p-3.5 bg-surface/90 hover:bg-white text-espresso border border-atelier rounded-full backdrop-blur-md transition-all cursor-pointer shadow-xl hidden sm:flex items-center justify-center hover:scale-105"
              aria-label="Next project"
            >
              <ChevronRight className="w-4 h-4 text-espresso" />
            </button>
          )}
        </div>

        {/* 3. BOTTOM TIMELINE & LIQUID STICK CONTROLS */}
        <div className="relative z-20 border-t border-atelier pt-4 space-y-3 pb-[max(0.25rem,env(safe-area-inset-bottom))]">
          <div className="flex items-center justify-between gap-2.5">
            {safeProjects.map((proj, idx) => {
              const isSelected = idx === activeIndex;
              const isPassed = idx < activeIndex;

              return (
                <button
                  key={proj.id}
                  onClick={() => jumpToIndex(idx)}
                  className="group flex-1 flex flex-col items-center gap-1 py-1 cursor-pointer focus:outline-hidden"
                  aria-label={`Jump to project ${idx + 1}: ${proj.title}`}
                >
                  <div
                    className={`h-1.5 rounded-full transition-all duration-400 ease-out ${
                      isSelected
                        ? 'w-full bg-gradient-to-r from-bronze via-champagne to-bronze shadow-[0_0_12px_rgba(140,106,69,0.45)]'
                        : isPassed
                        ? 'w-full bg-bronze/40 group-hover:bg-bronze/60'
                        : 'w-full bg-[#E5DDCF] group-hover:bg-[#D8CEBE]'
                    }`}
                  />
                  <span
                    className={`inline-block font-mono text-xs transition-colors duration-200 ${
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

          <div className="flex items-center justify-between text-xs uppercase tracking-widest text-warmgray">
            <div className="flex items-center gap-3">
              <span className="text-espresso font-medium">
                {activeProject.location}
              </span>
              <span className="text-atelier">•</span>
              <span className="text-espresso font-serif">
                {activeProject.title}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-warmgray hidden md:inline">
                Scroll to glide through works ↓
              </span>
              <Link
                href="/projects"
                className="text-bronze hover:text-espresso font-medium flex items-center gap-1 transition-colors"
              >
                <span>All Projects ({projects.length})</span> <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DesktopScrollPortfolio;
