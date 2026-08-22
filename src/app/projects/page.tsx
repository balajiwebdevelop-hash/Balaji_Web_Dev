import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MapPin, Calendar, Maximize2 } from 'lucide-react';
import { getProjects } from '@/lib/db';
import { Reveal } from '@/components/Reveal';
import { ImageReveal } from '@/components/ImageReveal';

export const metadata = {
  title: 'Architectural Portfolio & Case Studies — Balaji Architect & Interiors',
  description: 'Explore signature residential villas, sky penthouses, and bespoke commercial spaces crafted by Balaji Architect & Interiors.',
};

export const revalidate = 60;

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams?: { type?: string };
}) {
  const allProjects = await getProjects({ publishedOnly: true });
  const selectedType = searchParams?.type;

  const projectTypes = [
    'All',
    'Residential Interiors',
    'Architecture & Villa',
    'Penthouse & Estate',
    'Commercial & Studio',
    'Hospitality & Luxury Dining',
  ];

  const filteredProjects = selectedType && selectedType !== 'All'
    ? allProjects.filter((p) => p.projectType.toLowerCase() === selectedType.toLowerCase())
    : allProjects;

  return (
    <div className="space-y-16 sm:space-y-24 pb-24">
      {/* Header Banner */}
      <section className="bg-espresso text-surface py-20 sm:py-28 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <Reveal>
            <span className="text-xs uppercase tracking-widest-plus text-champagne font-medium">
              Portfolio
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl text-surface font-light leading-tight mt-1 max-w-3xl">
              Selected Architectural Works
            </h1>
          </Reveal>
          <Reveal delay={100}>
            <p className="max-w-2xl text-sm sm:text-base text-surface/80 font-light leading-relaxed">
              A curated monograph of residential villas, sky estates, and bespoke hospitality spaces designed with material restraint and construction honesty.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Filter Tabs & Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Type Filter Buttons */}
        <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto pb-2 border-b border-atelier no-scrollbar">
          {projectTypes.map((type) => {
            const isActive = (!selectedType && type === 'All') || selectedType === type;
            const href = type === 'All' ? '/projects' : `/projects?type=${encodeURIComponent(type)}`;
            return (
              <Link
                key={type}
                href={href}
                className={`px-4 py-2 text-xs uppercase tracking-widest whitespace-nowrap transition-colors font-medium ${
                  isActive
                    ? 'bg-espresso text-surface border border-espresso'
                    : 'text-warmgray hover:text-espresso border border-transparent hover:border-atelier'
                }`}
              >
                {type}
              </Link>
            );
          })}
        </div>

        {/* Portfolio Magazine Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
          {filteredProjects.map((project, idx) => (
            <Reveal key={project.id} delay={idx * 100}>
              <Link href={`/projects/${project.slug}`} className="group block space-y-4">
                <ImageReveal
                  src={project.heroImage}
                  alt={project.title}
                  aspectRatio="aspect-[16/11]"
                  className="bg-canvas-subtle"
                />

                <div className="space-y-2 pt-2">
                  <div className="flex flex-wrap items-center gap-4 text-xs text-warmgray">
                    <span className="uppercase tracking-wider text-bronze font-medium">
                      {project.projectType}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" /> {project.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> {project.year}
                    </span>
                    {project.area && (
                      <span className="flex items-center gap-1">
                        <Maximize2 className="w-3.5 h-3.5" /> {project.area}
                      </span>
                    )}
                  </div>

                  <h2 className="font-serif text-2xl sm:text-3xl text-espresso group-hover:text-bronze transition-colors font-normal">
                    {project.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-warmgray font-light leading-relaxed line-clamp-3">
                    {project.shortDescription}
                  </p>

                  <div className="pt-2 text-xs uppercase tracking-widest text-espresso font-medium group-hover:translate-x-1 transition-transform flex items-center gap-1.5">
                    View Case Study & Materials <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
