import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { ImageReveal } from '@/components/ImageReveal';

export const metadata = {
  title: 'About The Studio — Balaji Atelier',
  description: 'Learn about Balaji Atelier, our architectural philosophy, craftsmanship pedigree, and material sourcing excellence.',
};

export default function AboutPage() {
  const principles = [
    {
      title: 'Material Authenticity',
      desc: 'We never disguise or simulate materials. Stone reveals its true geology, timber breathes its natural grain, and metals celebrate organic patinas.',
    },
    {
      title: 'Architectural Rigor',
      desc: 'Every millwork joint, ceiling reveal, and floor transition is calculated with millimeter precision, creating spaces of profound quietude.',
    },
    {
      title: 'Direct Sourcing Provenance',
      desc: 'By procuring blocks directly from Italian, Greek, and Portuguese quarries and collaborating with certified master mills, we ensure ethical stewardship and unmatched quality.',
    },
    {
      title: 'Turnkey Stewardship',
      desc: 'We oversee the complete lifecycle of a project—from conceptual architectural drawings through master artisan craftsmanship to final spatial styling.',
    },
  ];

  return (
    <div className="space-y-24 sm:space-y-32 pb-24">
      {/* Header Banner */}
      <section className="bg-espresso text-surface py-24 sm:py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <Reveal>
            <span className="text-xs uppercase tracking-widest-plus text-champagne font-medium">
              About Balaji Atelier
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-surface font-light leading-tight mt-2 max-w-4xl">
              Architecture rooted in material honesty and spatial calm.
            </h1>
          </Reveal>
          <Reveal delay={150}>
            <p className="max-w-2xl text-base sm:text-lg text-surface/80 font-light leading-relaxed">
              Established in Mumbai, Balaji Atelier unites high-end residential architecture, turnkey interior design, and an exclusive supply network of raw and refined architectural materials.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Studio Story & Photography */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 space-y-6">
            <Reveal>
              <span className="text-xs uppercase tracking-widest text-bronze font-medium">Our Heritage</span>
              <h2 className="font-serif text-3xl sm:text-4xl text-espresso font-light leading-tight mt-1">
                From artisan workshop to full-service architectural studio.
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="text-sm sm:text-base text-warmgray font-light leading-relaxed">
                Balaji Atelier began with a focused obsession: master woodworking and stone joinery. Over more than a decade of executing bespoke penthouses, private coastal villas, and landmark commercial spaces, our practice evolved into a holistic architectural studio.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <p className="text-sm sm:text-base text-warmgray font-light leading-relaxed">
                Today, we operate a multidisciplinary studio comprising architects, interior spatial planners, site engineers, and material specialists. We control the entire creative and physical supply chain, ensuring that what is envisioned on paper translates flawlessly into lived reality.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <div className="pt-4">
                <Link
                  href="/projects"
                  className="px-6 py-3.5 btn-luxury-dark text-xs uppercase tracking-widest inline-flex items-center gap-2"
                >
                  Explore Completed Portfolio <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <Reveal delay={200}>
              <ImageReveal
                src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=80"
                alt="Balaji Atelier Architectural Master Suite"
                aspectRatio="aspect-[4/3]"
                className="shadow-lg"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* 4 Guiding Principles */}
      <section className="bg-surface py-24 border-y border-atelier">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-widest text-bronze font-medium">Core Tenets</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-espresso font-light">
              Principles of our Architectural Practice
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {principles.map((item, idx) => (
              <Reveal key={item.title} delay={idx * 100}>
                <div className="bg-canvas p-8 border border-atelier h-full space-y-4">
                  <span className="font-serif text-3xl text-bronze font-light">0{idx + 1}</span>
                  <h3 className="font-serif text-xl text-espresso font-medium">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-warmgray font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Materials Sourcing Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <Reveal>
              <ImageReveal
                src="https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1400&q=80"
                alt="Direct Italian Quarry Sourcing"
                aspectRatio="aspect-[4/3]"
              />
            </Reveal>
          </div>
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
            <Reveal>
              <span className="text-xs uppercase tracking-widest text-bronze font-medium">Supply Ecosystem</span>
              <h2 className="font-serif text-3xl sm:text-4xl text-espresso font-light leading-tight mt-1">
                Direct global quarry & millwork integration.
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="text-sm sm:text-base text-warmgray font-light leading-relaxed">
                Rather than relying on intermediaries, Balaji Atelier imports blocks directly from certified quarries in Tuscany, Verona, and Drama, slicing and finishing them to custom architectural dimensions in our advanced surface facility.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <ul className="space-y-3 pt-2 text-xs sm:text-sm text-espresso">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-bronze flex-shrink-0" />
                  <span>Vein-matched continuous slabs up to 3.2 meters</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-bronze flex-shrink-0" />
                  <span>FSC-certified European white oak and French walnut</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-bronze flex-shrink-0" />
                  <span>Acoustic NRC 0.85+ high-density ribbed wall panels</span>
                </li>
              </ul>
            </Reveal>
            <Reveal delay={300}>
              <div className="pt-2">
                <Link
                  href="/materials"
                  className="px-6 py-3.5 btn-luxury-outline text-xs uppercase tracking-widest inline-flex items-center gap-2"
                >
                  Explore Materials Catalog <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Consultation CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 pt-12">
        <Reveal>
          <span className="text-xs uppercase tracking-widest text-bronze font-medium">Engage the Studio</span>
          <h2 className="font-serif text-3xl sm:text-4xl text-espresso font-light mt-2">
            Schedule a Private Architecture & Material Consultation
          </h2>
          <p className="text-sm sm:text-base text-warmgray max-w-xl mx-auto mt-2 font-light">
            Visit our Mumbai design studio or request a preliminary spatial review with our senior architects.
          </p>
          <div className="pt-6 flex justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-4 btn-luxury-dark text-xs uppercase tracking-widest"
            >
              Contact Studio
            </Link>
            <Link
              href="/quote"
              className="px-8 py-4 btn-luxury-outline text-xs uppercase tracking-widest"
            >
              Request Project Estimate
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
