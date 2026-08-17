import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, MapPin, Calendar, Maximize2, Layers } from 'lucide-react';
import { getProjectBySlug, getProjects } from '@/lib/db';
import { Reveal } from '@/components/Reveal';
import { ImageReveal } from '@/components/ImageReveal';

export const revalidate = 60;

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug);
  if (!project) return { title: 'Project Not Found — Balaji Architect & Interiors' };
  return {
    title: `${project.title} — Architectural Case Study | Balaji Architect & Interiors`,
    description: project.shortDescription,
  };
}

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug);

  if (!project || !project.isPublished) {
    notFound();
  }

  return (
    <div className="space-y-16 sm:space-y-24 pb-24">
      {/* Top Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-warmgray hover:text-espresso transition-colors font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Portfolio
        </Link>
      </div>

      {/* Project Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-4 max-w-4xl">
          <span className="text-xs uppercase tracking-widest text-bronze font-medium">
            {project.projectType}
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-espresso font-light leading-[1.1]">
            {project.title}
          </h1>
          <p className="text-base sm:text-lg text-warmgray font-light leading-relaxed">
            {project.shortDescription}
          </p>
        </div>

        {/* Specs Metadata Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-6 border-y border-atelier text-xs">
          <div>
            <span className="uppercase tracking-widest text-warmgray block">Location</span>
            <span className="font-serif text-lg text-espresso mt-1 block">{project.location}</span>
          </div>
          <div>
            <span className="uppercase tracking-widest text-warmgray block">Completion</span>
            <span className="font-serif text-lg text-espresso mt-1 block">{project.year}</span>
          </div>
          <div>
            <span className="uppercase tracking-widest text-warmgray block">Built Area</span>
            <span className="font-serif text-lg text-espresso mt-1 block">{project.area || 'Custom Spatial'}</span>
          </div>
          <div>
            <span className="uppercase tracking-widest text-warmgray block">Execution</span>
            <span className="font-serif text-lg text-bronze mt-1 block">Full Turnkey Atelier</span>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-canvas-subtle">
          <Image
            src={project.heroImage}
            alt={project.title}
            fill
            priority
            className="object-cover"
          />
        </div>
      </section>

      {/* Narrative & Design Approach */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-7 space-y-6">
            <Reveal>
              <h2 className="font-serif text-3xl sm:text-4xl text-espresso font-light">
                Spatial Conception & Architecture
              </h2>
              <div className="text-sm sm:text-base text-warmgray font-light leading-relaxed space-y-4 pt-4">
                <p>{project.description}</p>
              </div>
            </Reveal>

            {project.designApproach && (
              <Reveal delay={100}>
                <div className="bg-surface p-8 border border-atelier space-y-3 mt-8">
                  <span className="text-xs uppercase tracking-widest text-bronze font-medium">Design Approach</span>
                  <h3 className="font-serif text-2xl text-espresso font-normal">Material Integration</h3>
                  <p className="text-sm text-warmgray font-light leading-relaxed">
                    {project.designApproach}
                  </p>
                </div>
              </Reveal>
            )}
          </div>

          {/* Materials Used in this Project */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-surface p-8 border border-atelier space-y-6 sticky top-28">
              <div className="space-y-1 border-b border-atelier pb-4">
                <span className="text-xs uppercase tracking-widest text-bronze font-medium flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" /> Materiality Palette
                </span>
                <h3 className="font-serif text-2xl text-espresso font-light">Materials Specified</h3>
              </div>

              {project.materialsUsed && project.materialsUsed.length > 0 ? (
                <div className="space-y-4">
                  {project.materialsUsed.map((mat, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-4 pb-4 border-b border-atelier/60 last:border-0"
                    >
                      {mat.imageUrl ? (
                        <div className="relative w-14 h-14 bg-canvas flex-shrink-0 overflow-hidden">
                          <Image src={mat.imageUrl} alt={mat.materialName} fill className="object-cover" />
                        </div>
                      ) : (
                        <div className="w-14 h-14 bg-canvas flex items-center justify-center text-warmgray flex-shrink-0">
                          <Layers className="w-6 h-6 stroke-1" />
                        </div>
                      )}
                      <div className="flex-1">
                        <span className="text-[10px] uppercase tracking-wider text-warmgray block">
                          {mat.category}
                        </span>
                        <h4 className="font-serif text-base text-espresso font-medium leading-snug">
                          {mat.materialName}
                        </h4>
                        {mat.materialId && (
                          <Link
                            href={`/material/${mat.materialId}`}
                            className="text-[11px] uppercase tracking-widest text-bronze hover:text-espresso font-medium inline-flex items-center gap-1 mt-1"
                          >
                            View Material Specs <ArrowRight className="w-3 h-3" />
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-warmgray">Custom architectural materials and bespoke finishes formulated on-site.</p>
              )}

              <div className="pt-2">
                <Link
                  href={`/quote?project=${project.slug}`}
                  className="w-full py-3.5 btn-luxury-dark text-xs uppercase tracking-widest flex items-center justify-center gap-2 font-medium"
                >
                  Discuss Your Project <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-widest text-bronze font-medium">Monograph</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-espresso font-light">
              Visual Documentation
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {project.gallery.map((imgUrl, gIdx) => (
              <Reveal key={gIdx} delay={gIdx * 100}>
                <ImageReveal
                  src={imgUrl}
                  alt={`${project.title} - Plate ${gIdx + 1}`}
                  aspectRatio="aspect-[4/3]"
                  className="shadow-sm"
                />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 pt-12">
        <Reveal>
          <span className="text-xs uppercase tracking-widest text-bronze font-medium">Start A Dialogue</span>
          <h2 className="font-serif text-3xl sm:text-4xl text-espresso font-light mt-2">
            Interested in a similar architectural execution?
          </h2>
          <p className="text-sm sm:text-base text-warmgray max-w-xl mx-auto font-light">
            Our principal architects consult with clients worldwide to craft spaces of enduring distinction.
          </p>
          <div className="pt-6 flex justify-center gap-4">
            <Link
              href="/quote"
              className="px-8 py-4 btn-luxury-dark text-xs uppercase tracking-widest font-medium"
            >
              Request Project Estimation
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 btn-luxury-outline text-xs uppercase tracking-widest font-medium"
            >
              Contact Studio
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
