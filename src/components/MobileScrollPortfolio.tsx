'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Compass } from 'lucide-react';
import { Project, PortfolioAnimationSettings } from '@/types';

interface MobileScrollPortfolioProps {
  projects: Project[];
  settings?: PortfolioAnimationSettings;
}

export function MobileScrollPortfolio({ projects, settings }: MobileScrollPortfolioProps) {
  const safeProjects = useMemo(() => {
    if (!projects || projects.length === 0) return [];
    const limit = settings?.maxProjects || 6;
    return projects.slice(0, limit);
  }, [projects, settings?.maxProjects]);

  const totalCards = safeProjects.length;
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // IntersectionObserver for native-scroll card activation
  // ZERO scroll event listeners, ZERO requestAnimationFrame loops, ZERO physics simulation
  useEffect(() => {
    if (totalCards === 0) return;

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        const target = entry.target as HTMLElement;
        const indexStr = target.getAttribute('data-index');
        if (indexStr === null) return;
        const idx = parseInt(indexStr, 10);

        if (entry.isIntersecting && entry.intersectionRatio >= 0.45) {
          target.setAttribute('data-inview', 'true');
          setActiveProjectIdx((prev) => (prev !== idx ? idx : prev));
        } else if (entry.intersectionRatio < 0.25) {
          target.setAttribute('data-inview', 'false');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: [0.25, 0.45, 0.70],
      rootMargin: '-5% 0px -10% 0px',
    });

    cardRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [totalCards]);

  const scrollToCard = (index: number) => {
    const el = cardRefs.current[index];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  if (totalCards === 0) return null;
  const activeProject = safeProjects[activeProjectIdx] || safeProjects[0];

  return (
    <section className="w-full bg-canvas text-espresso py-6 px-3.5 sm:px-6 relative select-none">
      {/* 1. STICKY TOP PROGRESS CONTROLLER (Lightweight, zero RAF, updates only on card change) */}
      <div className="sticky top-14 sm:top-16 z-20 bg-canvas/95 py-2.5 px-3 rounded-xl border border-atelier/40 shadow-sm mb-6 flex flex-col gap-2">
        <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-warmgray">
          <div className="flex items-center gap-2">
            <span className="font-mono text-bronze font-bold">
              [{String(activeProjectIdx + 1).padStart(2, '0')}/{String(totalCards).padStart(2, '0')}]
            </span>
            <span className="text-espresso font-medium truncate max-w-[140px]">
              {activeProject.location}
            </span>
            <span className="text-atelier">•</span>
            <span className="text-espresso font-serif truncate max-w-[120px]">
              {activeProject.title}
            </span>
          </div>

          <Link
            href="/projects"
            className="text-bronze hover:text-espresso font-medium flex items-center gap-1 transition-colors"
          >
            <span>All ({projects.length})</span> <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Minimal Progress Sticks */}
        <div className="flex items-center gap-1.5 w-full">
          {safeProjects.map((proj, idx) => {
            const isSelected = idx === activeProjectIdx;
            const isPassed = idx < activeProjectIdx;

            return (
              <button
                key={proj.id}
                onClick={() => scrollToCard(idx)}
                className="flex-1 py-1 cursor-pointer focus:outline-hidden"
                aria-label={`Jump to project ${idx + 1}: ${proj.title}`}
              >
                <div
                  className={`h-1 rounded-full transition-all duration-300 ease-out ${
                    isSelected
                      ? 'w-full bg-gradient-to-r from-bronze via-champagne to-bronze shadow-[0_0_8px_rgba(140,106,69,0.35)]'
                      : isPassed
                      ? 'w-full bg-bronze/40'
                      : 'w-full bg-[#E5DDCF]'
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. VERTICAL CARDS IN NORMAL DOCUMENT FLOW (Native Mobile Scrolling) */}
      <div className="space-y-10 sm:space-y-14 max-w-lg mx-auto pb-10">
        {safeProjects.map((project, idx) => {
          const isFirst = idx === 0;

          return (
            <div
              key={project.id}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              data-index={idx}
              data-inview={isFirst ? 'true' : 'false'}
              data-portfolio-card="true"
              className="relative w-full aspect-[4/4.8] sm:aspect-[4/4.5] max-h-[74vh] rounded-2xl overflow-hidden border border-white/90 bg-[#161311] shadow-lg transition-[transform,opacity] duration-500 ease-out motion-reduce:transform-none motion-reduce:transition-none data-[inview=false]:opacity-80 data-[inview=false]:scale-[0.97] data-[inview=false]:translate-y-3 data-[inview=true]:opacity-100 data-[inview=true]:scale-100 data-[inview=true]:translate-y-0"
            >
              {/* Premium Top Gold Glint */}
              <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#C5A880]/80 to-transparent z-20 pointer-events-none" />

              {/* High-Quality Hero Photography (Progressive Mobile Loading, sizes=92vw) */}
              <div className="relative w-full h-full overflow-hidden select-none">
                <Image
                  src={project.heroImage}
                  alt={project.title}
                  fill
                  priority={isFirst}
                  loading={idx <= 1 ? 'eager' : 'lazy'}
                  sizes="92vw"
                  className="object-cover object-center"
                />
              </div>

              {/* High-Contrast Static Readability Scrim (Zero GPU Blur Filters) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent pointer-events-none" />

              {/* Card Editorial Info Overlay */}
              <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-between z-10 pointer-events-none">
                {/* Top Location & Year Badges (Static Translucent, No Backdrop Filter) */}
                <div className="flex items-center justify-between pointer-events-auto">
                  <div className="flex items-center gap-1.5 bg-white/95 px-2.5 py-1 border border-white/90 text-[10px] uppercase tracking-wider text-espresso rounded-2xs shadow-sm font-medium">
                    <Compass className="w-3 h-3 text-bronze" />
                    <span>{project.location}</span>
                  </div>
                  <span className="bg-white/95 px-2.5 py-1 border border-white/90 text-[10px] font-mono text-espresso font-medium rounded-2xs shadow-sm">
                    {project.year}
                  </span>
                </div>

                {/* Bottom Title & Action Button */}
                <div className="space-y-2 pointer-events-auto">
                  <span className="text-[10px] uppercase tracking-widest text-champagne font-medium">
                    {project.projectType}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#FCFAF6] font-light leading-snug drop-shadow-sm line-clamp-2">
                    {project.title}
                  </h3>

                  <div className="pt-2 flex items-center gap-3">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-champagne text-[#100C0A] hover:bg-[#DAC19E] font-medium text-[11px] uppercase tracking-widest transition-colors duration-200 rounded-2xs shadow-md cursor-pointer"
                    >
                      <span>Explore Project</span> <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <span className="text-[10px] text-[#FCFAF6]/75 uppercase tracking-wider font-light">
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
    </section>
  );
}

export default MobileScrollPortfolio;
