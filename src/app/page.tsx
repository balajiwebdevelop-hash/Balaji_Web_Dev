import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Compass, Layers, ShieldCheck, Armchair } from 'lucide-react';
import { getProjects, getProducts, getCategories, getServices, getSiteSettings } from '@/lib/db';
import { Reveal } from '@/components/Reveal';
import { ImageReveal } from '@/components/ImageReveal';
import { ScrollPortfolio } from '@/components/ScrollPortfolio';
import { Hero3DTypography } from '@/components/Hero3DTypography';

export const revalidate = 60;

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
    <div className="space-y-10 sm:space-y-16 md:space-y-20 pb-16 sm:pb-24">
      {/* 1. 3D HERO KINETIC TYPOGRAPHY STAGE (Scroll-Driven 3D Perspective) */}
      <Hero3DTypography
        headingLine1={home.heroHeadingLine1 || 'INTERIORS.'}
        headingLine2={home.heroHeadingLine2 || 'ARCHITECTURE.'}
        headingLine3={home.heroHeadingLine3 || 'MATERIALS.'}
        eyebrow={home.heroEyebrow || 'Architecture • Interior Studio • Material Curation'}
        description={
          home.heroDescription ||
          'Crafted spaces and considered materials for timeless living. Uniting spatial architecture with a curated marketplace of authentic stones, woods, and architectural accents.'
        }
        primaryBtnText={home.heroPrimaryBtnText || 'Explore Projects'}
        primaryBtnLink={home.heroPrimaryBtnLink || '/projects'}
        secondaryBtnText={home.heroSecondaryBtnText || 'Explore Materials'}
        secondaryBtnLink={home.heroSecondaryBtnLink || '/materials'}
        heroImageUrl={
          home.heroImageUrl ||
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80'
        }
        brandName={settings.brandName || 'Balaji Architect & Interiors'}
        trustBadge1={home.trustBadge1 || settings.googleRating || '★ 5.0 (22 Google Reviews)'}
        trustBadge2={home.trustBadge2 || `${settings.city || 'Guwahati'} Studio Office`}
        trustBadge3={home.trustBadge3 || 'Turnkey Architecture'}
        trustBadge4={home.trustBadge4 || 'Pan-India Material Logistics'}
        phoneNumber="+91-6003869588"
      />

      {/* 2. STUDIO INTRODUCTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5 space-y-4 sm:space-y-6">
            <Reveal>
              <span className="text-[10px] sm:text-xs uppercase tracking-widest text-bronze font-medium">
                {home.introEyebrow || 'The Atelier Philosophy'}
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl text-espresso font-light leading-snug sm:leading-tight mt-1 sm:mt-2">
                {home.introHeading || 'Restraint is the ultimate form of luxury.'}
              </h2>
            </Reveal>

            <Reveal delay={150}>
              <p className="text-xs sm:text-base text-warmgray font-light leading-relaxed">
                {home.introParagraph1 ||
                  `Founded on the belief that genuine luxury emerges from architectural precision, raw material integrity, and spatial calm, ${settings.brandName || 'Balaji Architect & Interiors'} crafts environments that elevate the human experience.`}
              </p>
            </Reveal>

            <Reveal delay={250}>
              <p className="text-xs sm:text-base text-warmgray font-light leading-relaxed">
                {home.introParagraph2 ||
                  'Beyond architectural commissions, we maintain direct partnerships with heritage European quarries and timber ateliers, making authentic vein-cut travertines, smoked French oaks, and acoustic wall systems directly available to discerning architects and homeowners.'}
              </p>
            </Reveal>

            <Reveal delay={350}>
              <div className="pt-2 flex items-center justify-between sm:justify-start gap-4 sm:gap-8 border-t border-atelier">
                <div>
                  <span className="font-serif text-2xl sm:text-3xl text-espresso">{home.stat1Value || '14+'}</span>
                  <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-warmgray mt-0.5">
                    {home.stat1Label || 'Years Practice'}
                  </p>
                </div>
                <div>
                  <span className="font-serif text-2xl sm:text-3xl text-espresso">{home.stat2Value || '180+'}</span>
                  <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-warmgray mt-0.5">
                    {home.stat2Label || 'Signatures'}
                  </p>
                </div>
                <div>
                  <span className="font-serif text-2xl sm:text-3xl text-espresso">{home.stat3Value || '100%'}</span>
                  <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-warmgray mt-0.5">
                    {home.stat3Label || 'Provenance'}
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

      {/* 3. FEATURED ARCHITECTURAL PROJECTS (Scroll Storytelling or Static Grid) */}
      <div className="!mt-0 !mb-0 relative">
        {settings?.portfolioAnimation?.enabled !== false ? (
          <ScrollPortfolio
            projects={featuredProjects}
            settings={settings?.portfolioAnimation}
          />
        ) : (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-4 sm:pb-6 border-b border-atelier gap-2">
              <div>
                <span className="text-[10px] sm:text-xs uppercase tracking-widest text-bronze font-medium">
                  {settings?.portfolioAnimation?.sectionHeading || 'Selected Works'}
                </span>
                <h2 className="font-serif text-2xl sm:text-4xl text-espresso font-light mt-0.5 sm:mt-1">
                  {settings?.portfolioAnimation?.sectionSubheading || 'Architectural Commissions'}
                </h2>
              </div>
              <Link
                href="/projects"
                className="text-[11px] sm:text-xs uppercase tracking-widest text-bronze hover:text-espresso font-medium flex items-center gap-1.5 transition-colors"
              >
                View All Projects <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {featuredProjects.slice(0, settings?.portfolioAnimation?.maxProjects || 3).map((project, idx) => (
                <Reveal key={project.id} delay={idx * 150}>
                  <Link href={`/projects/${project.slug}`} className="group block space-y-3 sm:space-y-4">
                    <ImageReveal
                      src={project.heroImage}
                      alt={project.title}
                      aspectRatio="aspect-[4/3]"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[10px] sm:text-xs text-warmgray uppercase tracking-widest">
                        <span>{project.projectType}</span>
                        <span>{project.year}</span>
                      </div>
                      <h3 className="font-serif text-lg sm:text-2xl text-espresso font-light group-hover:text-bronze transition-colors">
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
        )}
      </div>

      {/* 4. MATERIAL CATEGORIES DISCOVERY */}
      <section className="bg-canvas-subtle py-12 sm:py-24 border-y border-atelier !mt-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2 sm:space-y-3">
            <span className="text-[10px] sm:text-xs uppercase tracking-widest text-bronze font-medium">Curated Elements</span>
            <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl text-espresso font-light">
              Master Material Library
            </h2>
            <p className="text-xs sm:text-sm text-warmgray font-light max-w-md mx-auto">
              Directly quarried natural stones, smoked French oaks, bespoke hardware, and architectural luminescences.
            </p>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-4">
            {categories.map((cat, idx) => (
              <Reveal key={cat.id} delay={idx * 80}>
                <Link
                  href={`/materials?category=${cat.slug}`}
                  className="group block p-2.5 sm:p-4 bg-surface border border-atelier hover:border-bronze transition-all text-center space-y-2 sm:space-y-3"
                >
                  <div className="relative aspect-square w-full overflow-hidden bg-canvas">
                    <Image
                      src={cat.imageUrl || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c'}
                      alt={cat.name}
                      fill
                      sizes="(max-width: 640px) 33vw, (max-width: 1024px) 16vw, 150px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div>
                    <h3 className="font-serif text-[11px] sm:text-sm text-espresso group-hover:text-bronze transition-colors font-medium truncate">
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-4 sm:pb-6 border-b border-atelier gap-2">
          <div>
            <span className="text-[10px] sm:text-xs uppercase tracking-widest text-bronze font-medium">Direct Sourcing</span>
            <h2 className="font-serif text-2xl sm:text-4xl text-espresso font-light mt-0.5 sm:mt-1">
              Curated Materials & Objects
            </h2>
          </div>
          <Link
            href="/materials"
            className="text-[11px] sm:text-xs uppercase tracking-widest text-bronze hover:text-espresso font-medium flex items-center gap-1.5 transition-colors"
          >
            Explore Full Catalog <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {featuredProducts.slice(0, 4).map((product, idx) => (
            <Reveal key={product.id} delay={idx * 100}>
              <Link href={`/material/${product.slug}`} className="group block space-y-2 sm:space-y-3">
                <div className="relative aspect-square overflow-hidden bg-surface border border-atelier">
                  <Image
                    src={product.images[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c'}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 300px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.isNew && (
                    <span className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 bg-espresso text-surface text-[9px] sm:text-[10px] uppercase tracking-wider px-1.5 py-0.5 sm:px-2">
                      New
                    </span>
                  )}
                </div>
                <div className="space-y-0.5 sm:space-y-1">
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-warmgray block truncate">
                    {product.categoryName}
                  </span>
                  <h3 className="font-serif text-xs sm:text-base text-espresso group-hover:text-bronze transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                  <div className="flex items-baseline gap-1 sm:gap-2 pt-0.5 sm:pt-1">
                    <span className="font-mono text-xs sm:text-sm text-espresso font-medium">
                      {settings.currencySymbol || '₹'}
                      {product.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[9px] sm:text-[10px] text-warmgray">/ {product.unit}</span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 6. REQUEST A QUOTE / COMMISSION CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="bg-canvas-subtle border border-atelier p-6 sm:p-14 lg:p-20 relative overflow-hidden">
          <div className="max-w-2xl space-y-4 sm:space-y-6 relative z-10">
            <span className="text-[10px] sm:text-xs uppercase tracking-widest text-bronze font-medium">Commence a Project</span>
            <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl text-espresso font-light leading-snug sm:leading-tight">
              {home.ctaHeading || 'Ready to craft your next architectural space?'}
            </h2>
            <p className="text-xs sm:text-base text-warmgray font-light leading-relaxed">
              {home.ctaDescription ||
                'Whether you are designing a private estate, specifying large format stone slabs for a culinary island, or requesting a custom interior turnkey estimate, our design partners are ready to collaborate.'}
            </p>
            <div className="pt-2 flex flex-col sm:flex-row gap-2.5 sm:gap-4">
              <Link
                href={home.ctaBtnLink || '/quote'}
                className="w-full sm:w-auto px-6 py-3.5 sm:px-8 sm:py-4 btn-luxury-dark text-[11px] sm:text-xs uppercase tracking-widest font-medium flex items-center justify-center gap-2"
              >
                {home.ctaBtnText || 'Request Custom Quote'} <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto px-6 py-3.5 sm:px-8 sm:py-4 btn-luxury-outline text-[11px] sm:text-xs uppercase tracking-widest font-medium flex items-center justify-center"
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
