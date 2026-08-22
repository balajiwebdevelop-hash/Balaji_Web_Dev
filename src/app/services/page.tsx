import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Compass, ShieldCheck, Layers, Armchair, Check } from 'lucide-react';
import { getServices } from '@/lib/db';
import { Reveal } from '@/components/Reveal';
import { ImageReveal } from '@/components/ImageReveal';

export const metadata = {
  title: 'Architectural & Interior Services — Balaji Architect & Interiors',
  description: 'Explore our turnkey interior design, residential architecture, bespoke millwork, and material advisory capabilities.',
};

export const revalidate = 60;

export default async function ServicesPage() {
  const services = await getServices(true);

  return (
    <div className="space-y-24 sm:space-y-32 pb-24">
      {/* Header Banner */}
      <section className="bg-espresso text-surface py-24 sm:py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <Reveal>
            <span className="text-xs uppercase tracking-widest-plus text-champagne font-medium">
              Practice Offerings
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-surface font-light leading-tight mt-2 max-w-4xl">
              Turnkey architectural execution & spatial design.
            </h1>
          </Reveal>
          <Reveal delay={150}>
            <p className="max-w-2xl text-base sm:text-lg text-surface/80 font-light leading-relaxed">
              From bare-shell spatial reconfiguration to master artisan supervision, Balaji Architect & Interiors delivers uncompromising turnkey execution for residences, penthouses, and commercial venues.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Services List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {services.map((service, idx) => {
          const isEven = idx % 2 === 1;
          return (
            <div
              key={service.id}
              id={service.slug}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center border-b border-atelier pb-24 last:border-0"
            >
              <div className={`lg:col-span-6 ${isEven ? 'lg:order-2' : 'lg:order-1'} space-y-6`}>
                <Reveal>
                  <div className="flex items-center gap-3">
                    <span className="font-serif text-3xl text-bronze font-light">0{idx + 1}</span>
                    <div className="h-px bg-atelier flex-1 max-w-[60px]" />
                  </div>
                  <h2 className="font-serif text-3xl sm:text-4xl text-espresso font-light leading-tight mt-2">
                    {service.title}
                  </h2>
                </Reveal>

                <Reveal delay={100}>
                  <p className="text-sm sm:text-base text-warmgray font-light leading-relaxed">
                    {service.fullDesc}
                  </p>
                </Reveal>

                <Reveal delay={200}>
                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs uppercase tracking-widest text-espresso font-medium">Key Deliverables</h4>
                    <ul className="space-y-2.5 text-xs sm:text-sm text-warmgray">
                      {service.deliverables.map((item, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-bronze mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>

                <Reveal delay={300}>
                  <div className="pt-4 flex items-center gap-4">
                    <Link
                      href={`/quote?service=${service.slug}`}
                      className="px-6 py-3 btn-luxury-dark text-xs uppercase tracking-widest inline-flex items-center gap-2 font-medium"
                    >
                      Request Quote for this Service <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </Reveal>
              </div>

              <div className={`lg:col-span-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                <Reveal delay={150}>
                  <ImageReveal
                    src={service.imageUrl}
                    alt={service.title}
                    aspectRatio="aspect-[4/3]"
                    className="shadow-md"
                  />
                </Reveal>
              </div>
            </div>
          );
        })}
      </section>

      {/* Turnkey Process Workflow */}
      <section className="bg-surface py-24 border-y border-atelier">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-widest text-bronze font-medium">Methodology</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-espresso font-light">
              Our Turnkey Execution Sequence
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-canvas p-6 border border-atelier space-y-3">
              <span className="font-serif text-2xl text-bronze">Phase 01</span>
              <h3 className="font-serif text-lg text-espresso font-medium">Spatial Discovery & Volumetric BIM</h3>
              <p className="text-xs text-warmgray leading-relaxed font-light">
                Laser site surveys, natural light orientation analysis, and 3D architectural volumetric planning.
              </p>
            </div>

            <div className="bg-canvas p-6 border border-atelier space-y-3">
              <span className="font-serif text-2xl text-bronze">Phase 02</span>
              <h3 className="font-serif text-lg text-espresso font-medium">Material Curation & Sourcing</h3>
              <p className="text-xs text-warmgray leading-relaxed font-light">
                Direct quarry slab matching, timber moisture stabilization, and custom bronze sample prototypes.
              </p>
            </div>

            <div className="bg-canvas p-6 border border-atelier space-y-3">
              <span className="font-serif text-2xl text-bronze">Phase 03</span>
              <h3 className="font-serif text-lg text-espresso font-medium">On-Site Master Craftsmanship</h3>
              <p className="text-xs text-warmgray leading-relaxed font-light">
                Dedicated on-site site engineers, daily photo logs, and millimeter-level joinery supervision.
              </p>
            </div>

            <div className="bg-canvas p-6 border border-atelier space-y-3">
              <span className="font-serif text-2xl text-bronze">Phase 04</span>
              <h3 className="font-serif text-lg text-espresso font-medium">Handover & Maintenance Portfolio</h3>
              <p className="text-xs text-warmgray leading-relaxed font-light">
                Curated spatial styling, comprehensive material warranty documentation, and lifetime studio support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Banner */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <Reveal>
          <span className="text-xs uppercase tracking-widest text-bronze font-medium">Commission Studio</span>
          <h2 className="font-serif text-3xl sm:text-4xl text-espresso font-light mt-2">
            Discuss Your Architectural Commission
          </h2>
          <p className="text-sm sm:text-base text-warmgray max-w-xl mx-auto font-light">
            Contact our project management team to receive a tailored estimate and timeline breakdown.
          </p>
          <div className="pt-6 flex justify-center gap-4">
            <Link
              href="/quote"
              className="px-8 py-4 btn-luxury-dark text-xs uppercase tracking-widest"
            >
              Start Project Estimate
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 btn-luxury-outline text-xs uppercase tracking-widest"
            >
              Schedule Studio Meeting
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
