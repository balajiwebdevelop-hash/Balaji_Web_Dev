import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Compass, Layers, ShieldCheck, Armchair, Sparkles } from 'lucide-react';
import { getProjects, getProducts, getCategories, getServices, getSiteSettings } from '@/lib/db';
import { Reveal } from '@/components/Reveal';
import { ImageReveal } from '@/components/ImageReveal';

export const revalidate = 60; // SSR with caching

export default async function HomePage() {
  const [featuredProjects, featuredProducts, categories, services, settings] = await Promise.all([
    getProjects({ featuredOnly: true, publishedOnly: true }),
    getProducts({ featuredOnly: true, publishedOnly: true }),
    getCategories(),
    getServices(true),
    getSiteSettings(),
  ]);

  const home = settings?.homepage || {};

  return (
    <div className="space-y-24 sm:space-y-32 pb-24">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-espresso text-surface">
        {/* Editorial Background Image with Dark Vignette */}
        <div className="absolute inset-0 z-0">
          <Image
            src={
              home.heroImageUrl ||
              'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=90'
            }
            alt={`${settings.brandName || 'Balaji Architect & Interiors'} Architectural Living Space`}
            fill
            priority
            className="object-cover object-center opacity-40 scale-105 transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/50 to-espresso/30" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 pt-12">
          <Reveal delay={100}>
            <span className="text-xs sm:text-sm uppercase tracking-widest-plus text-champagne font-medium">
              {home.heroEyebrow || 'Architecture • Interior Studio • Material Curation'}
            </span>
          </Reveal>

          <Reveal delay={250}>
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-surface font-light leading-[1.08]">
              {home.heroHeadingLine1 || 'INTERIORS.'}
              <br />
              {home.heroHeadingLine2 || 'ARCHITECTURE.'}
              <br />
              {home.heroHeadingLine3 || 'MATERIALS.'}
            </h1>
          </Reveal>

          <Reveal delay={400}>
            <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-surface/80 font-light leading-relaxed">
              {home.heroDescription ||
                'Crafted spaces and considered materials for timeless living. Uniting spatial architecture with a curated marketplace of authentic stones, woods, and architectural accents.'}
            </p>
          </Reveal>

          <Reveal delay={550}>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
              <Link
                href={home.heroPrimaryBtnLink || '/projects'}
                className="w-full sm:w-auto px-8 py-4 bg-surface text-espresso hover:bg-champagne hover:text-espresso font-medium text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2"
              >
                {home.heroPrimaryBtnText || 'Explore Projects'} <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={home.heroSecondaryBtnLink || '/materials'}
                className="w-full sm:w-auto px-8 py-4 border border-surface/40 text-surface hover:bg-surface/10 font-medium text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2"
              >
                {home.heroSecondaryBtnText || 'Explore Materials'}
              </Link>
            </div>
          </Reveal>
        </div>

        {/* Mobile & Desktop Trust Banner */}
        <div className="absolute bottom-0 left-0 right-0 z-20 bg-espresso-dark/90 backdrop-blur-md border-t border-espresso-light py-3 px-4">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-around gap-y-2 text-[10px] sm:text-xs uppercase tracking-wider text-surface/90">
            <span className="flex items-center gap-1.5 font-medium text-champagne">
              {home.trustBadge1 || settings.googleRating || '★ 5.0 (22 Google Reviews)'}
            </span>
            <span className="hidden sm:inline text-surface/30">•</span>
            <span className="font-light">{home.trustBadge2 || `${settings.city || 'Guwahati'} Studio Office`}</span>
            <span className="hidden sm:inline text-surface/30">•</span>
            <span className="font-light">{home.trustBadge3 || 'Turnkey Architecture'}</span>
            <span className="hidden sm:inline text-surface/30">•</span>
            <span className="font-light">{home.trustBadge4 || 'Pan-India Material Logistics'}</span>
          </div>
        </div>
      </section>

      {/* 2. STUDIO INTRODUCTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5 space-y-6">
            <Reveal>
              <span className="text-xs uppercase tracking-widest text-bronze font-medium">
                {home.introEyebrow || 'The Atelier Philosophy'}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-espresso font-light leading-tight mt-2">
                {home.introHeading || 'Restraint is the ultimate form of luxury.'}
              </h2>
            </Reveal>

            <Reveal delay={150}>
              <p className="text-sm sm:text-base text-warmgray font-light leading-relaxed">
                {home.introParagraph1 ||
                  `Founded on the belief that genuine luxury emerges from architectural precision, raw material integrity, and spatial calm, ${settings.brandName || 'Balaji Architect & Interiors'} crafts environments that elevate the human experience.`}
              </p>
            </Reveal>

            <Reveal delay={250}>
              <p className="text-sm sm:text-base text-warmgray font-light leading-relaxed">
                {home.introParagraph2 ||
                  'Beyond architectural commissions, we maintain direct partnerships with heritage European quarries and timber ateliers, making authentic vein-cut travertines, smoked French oaks, and acoustic wall systems directly available to discerning architects and homeowners.'}
              </p>
            </Reveal>

            <Reveal delay={350}>
              <div className="pt-2 flex items-center gap-8 border-t border-atelier">
                <div>
                  <span className="font-serif text-3xl text-espresso">{home.stat1Value || '14+'}</span>
                  <p className="text-[11px] uppercase tracking-wider text-warmgray mt-0.5">
                    {home.stat1Label || 'Years of Practice'}
                  </p>
                </div>
                <div>
                  <span className="font-serif text-3xl text-espresso">{home.stat2Value || '180+'}</span>
                  <p className="text-[11px] uppercase tracking-wider text-warmgray mt-0.5">
                    {home.stat2Label || 'Signature Spaces'}
                  </p>
                </div>
                <div>
                  <span className="font-serif text-3xl text-espresso">{home.stat3Value || '100%'}</span>
                  <p className="text-[11px] uppercase tracking-wider text-warmgray mt-0.5">
                    {home.stat3Label || 'Direct Provenance'}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={200}>
              <ImageReveal
                src={
                  home.introImageUrl ||
                  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85'
                }
                alt={`${settings.brandName || 'Balaji Atelier'} Living Pavilion`}
                aspectRatio="aspect-[4/3]"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* 3. FEATURED ARCHITECTURAL PROJECTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-atelier">
          <div>
            <span className="text-xs uppercase tracking-widest text-bronze font-medium">Selected Works</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-espresso font-light mt-1">
              Architectural Commissions
            </h2>
          </div>
          <Link
            href="/projects"
            className="mt-4 md:mt-0 text-xs uppercase tracking-widest text-bronze hover:text-espresso font-medium flex items-center gap-1.5 transition-colors"
          >
            View All Projects <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.slice(0, 3).map((project, idx) => (
            <Reveal key={project.id} delay={idx * 150}>
              <Link href={`/projects/${project.slug}`} className="group block space-y-4">
                <ImageReveal
                  src={project.heroImage}
                  alt={project.title}
                  aspectRatio="aspect-[4/3]"
                />
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs text-warmgray uppercase tracking-widest">
                    <span>{project.projectType}</span>
                    <span>{project.year}</span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl text-espresso font-light group-hover:text-bronze transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-warmgray line-clamp-2 leading-relaxed">
                    {project.shortDescription}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 4. MATERIAL CATEGORIES DISCOVERY */}
      <section className="bg-canvas-subtle py-24 border-y border-atelier">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-widest text-bronze font-medium">Curated Elements</span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-espresso font-light">
              Master Material Library
            </h2>
            <p className="text-sm text-warmgray font-light">
              Directly quarried natural stones, smoked French oaks, bespoke hardware, and architectural luminescences.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat, idx) => (
              <Reveal key={cat.id} delay={idx * 80}>
                <Link
                  href={`/materials?category=${cat.slug}`}
                  className="group block p-4 bg-surface border border-atelier hover:border-bronze transition-all text-center space-y-3"
                >
                  <div className="relative aspect-square w-full overflow-hidden bg-canvas">
                    <Image
                      src={cat.imageUrl || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c'}
                      alt={cat.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div>
                    <h3 className="font-serif text-xs sm:text-sm text-espresso group-hover:text-bronze transition-colors font-medium">
                      {cat.name}
                    </h3>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FEATURED MATERIALS / E-COMMERCE PRODUCTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-atelier">
          <div>
            <span className="text-xs uppercase tracking-widest text-bronze font-medium">Direct Sourcing</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-espresso font-light mt-1">
              Curated Materials & Objects
            </h2>
          </div>
          <Link
            href="/materials"
            className="mt-4 md:mt-0 text-xs uppercase tracking-widest text-bronze hover:text-espresso font-medium flex items-center gap-1.5 transition-colors"
          >
            Explore Full Catalog <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.slice(0, 4).map((product, idx) => (
            <Reveal key={product.id} delay={idx * 100}>
              <Link href={`/material/${product.slug}`} className="group block space-y-3">
                <div className="relative aspect-square overflow-hidden bg-surface border border-atelier">
                  <Image
                    src={product.images[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c'}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.isNew && (
                    <span className="absolute top-2 left-2 bg-espresso text-surface text-[10px] uppercase tracking-wider px-2 py-0.5">
                      New Arrival
                    </span>
                  )}
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-widest text-warmgray">
                    {product.categoryName}
                  </span>
                  <h3 className="font-serif text-sm sm:text-base text-espresso group-hover:text-bronze transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                  <div className="flex items-baseline gap-2 pt-1">
                    <span className="font-mono text-sm text-espresso">
                      {settings.currencySymbol || '₹'}
                      {product.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] text-warmgray">/ {product.unit}</span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 6. DESIGN PRACTICE & SERVICES */}
      <section className="bg-espresso text-surface py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-atelier-dark">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-champagne font-medium">Design Practice</span>
              <h2 className="font-serif text-3xl sm:text-4xl text-surface font-light">
                Comprehensive Architectural Services
              </h2>
            </div>
            <Link
              href="/services"
              className="mt-4 md:mt-0 text-xs uppercase tracking-widest text-champagne hover:text-surface font-medium flex items-center gap-1.5 transition-colors"
            >
              Explore All Services <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.slice(0, 4).map((srv, idx) => (
              <Reveal key={srv.id} delay={idx * 100}>
                <div className="bg-espresso-light/60 p-8 border border-atelier-dark space-y-5 h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="w-10 h-10 rounded-full bg-champagne/10 text-champagne flex items-center justify-center">
                      {idx === 0 && <Compass className="w-5 h-5 stroke-[1.5]" />}
                      {idx === 1 && <ShieldCheck className="w-5 h-5 stroke-[1.5]" />}
                      {idx === 2 && <Layers className="w-5 h-5 stroke-[1.5]" />}
                      {idx === 3 && <Armchair className="w-5 h-5 stroke-[1.5]" />}
                    </div>
                    <h3 className="font-serif text-xl text-surface font-normal leading-snug">
                      {srv.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-surface/70 font-light leading-relaxed">
                      {srv.shortDesc}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-atelier-dark">
                    <Link
                      href="/quote"
                      className="text-xs uppercase tracking-widest text-champagne hover:text-surface font-medium flex items-center gap-1"
                    >
                      Inquire Service <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CRAFTSMANSHIP & MATERIAL STATEMENT */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 py-12">
        <Reveal>
          <span className="text-xs uppercase tracking-widest text-bronze font-medium">Studio Credo</span>
          <blockquote className="font-serif text-2xl sm:text-3xl md:text-4xl text-espresso font-light leading-snug mt-3 italic">
            &ldquo;Materials must not imitate one another. Travertine must express its volcanic geology; oak must celebrate its slow growth rings; bronze must accept the patina of living touch.&rdquo;
          </blockquote>
          <p className="text-xs uppercase tracking-widest text-warmgray font-medium mt-4">
            — {settings.architectName || 'Vikas Sir, Principal Architect'}, {settings.brandName || 'Balaji Architect & Interiors'}
          </p>
        </Reveal>
      </section>

      {/* 8. REQUEST A QUOTE / COMMISSION CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-canvas-subtle border border-atelier p-8 sm:p-14 lg:p-20 relative overflow-hidden">
          <div className="max-w-2xl space-y-6 relative z-10">
            <span className="text-xs uppercase tracking-widest text-bronze font-medium">Commence a Project</span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-espresso font-light leading-tight">
              {home.ctaHeading || 'Ready to craft your next architectural space?'}
            </h2>
            <p className="text-sm sm:text-base text-warmgray font-light leading-relaxed">
              {home.ctaDescription ||
                'Whether you are designing a private estate, specifying large format stone slabs for a culinary island, or requesting a custom interior turnkey estimate, our design partners are ready to collaborate.'}
            </p>
            <div className="pt-2 flex flex-col sm:flex-row gap-4">
              <Link
                href={home.ctaBtnLink || '/quote'}
                className="px-8 py-4 btn-luxury-dark text-xs uppercase tracking-widest font-medium flex items-center justify-center gap-2"
              >
                {home.ctaBtnText || 'Request Custom Quote'} <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 btn-luxury-outline text-xs uppercase tracking-widest font-medium flex items-center justify-center"
              >
                Schedule Studio Visit
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
