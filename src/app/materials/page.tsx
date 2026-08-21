import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Filter, Search, ArrowRight, Check } from 'lucide-react';
import { getCategories, getProducts } from '@/lib/db';
import { Reveal } from '@/components/Reveal';

export const metadata = {
  title: 'Materials Marketplace & Surfaces — Balaji Architect & Interiors',
  description: 'Procure authentic Italian travertines, fluted acoustic walnut, Calacatta porcelain slabs, and architectural hardware.',
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function MaterialsPage({
  searchParams,
}: {
  searchParams?: { category?: string; sort?: string; q?: string };
}) {
  const [categories, allProducts] = await Promise.all([
    getCategories(),
    getProducts({ publishedOnly: true }),
  ]);

  const selectedCategorySlug = searchParams?.category;
  const searchQuery = searchParams?.q?.toLowerCase();
  const sortOption = searchParams?.sort;

  let filtered = [...allProducts];

  if (selectedCategorySlug && selectedCategorySlug !== 'all') {
    filtered = filtered.filter((p) => p.categorySlug === selectedCategorySlug);
  }

  if (searchQuery) {
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(searchQuery) ||
        p.sku.toLowerCase().includes(searchQuery) ||
        p.material?.toLowerCase().includes(searchQuery) ||
        p.finish?.toLowerCase().includes(searchQuery) ||
        p.tags.some((t) => t.toLowerCase().includes(searchQuery))
    );
  }

  if (sortOption === 'price-asc') {
    filtered.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
  } else if (sortOption === 'price-desc') {
    filtered.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
  }

  return (
    <div className="space-y-16 pb-24">
      {/* Header Banner */}
      <section className="bg-espresso text-surface py-20 sm:py-28 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <Reveal>
            <span className="text-xs uppercase tracking-widest-plus text-champagne font-medium">
              Materials Library
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl text-surface font-light leading-tight mt-1 max-w-3xl">
              Architectural Materials & Surfaces
            </h1>
          </Reveal>
          <Reveal delay={100}>
            <p className="max-w-2xl text-sm sm:text-base text-surface/80 font-light leading-relaxed">
              Explore our physical library of quarried Italian marbles, smoked French oaks, acoustic wall systems, and large format sintered porcelain slabs.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Main Catalog Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Horizontal Filter Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 border-b border-atelier no-scrollbar">
          <Link
            href="/materials"
            className={`px-4 py-2 text-xs uppercase tracking-widest whitespace-nowrap transition-colors font-medium ${
              !selectedCategorySlug || selectedCategorySlug === 'all'
                ? 'bg-espresso text-surface border border-espresso'
                : 'text-warmgray hover:text-espresso border border-transparent hover:border-atelier'
            }`}
          >
            All Materials ({allProducts.length})
          </Link>
          {categories.map((cat) => {
            const isActive = selectedCategorySlug === cat.slug;
            return (
              <Link
                key={cat.id}
                href={`/materials?category=${cat.slug}`}
                className={`px-4 py-2 text-xs uppercase tracking-widest whitespace-nowrap transition-colors font-medium ${
                  isActive
                    ? 'bg-espresso text-surface border border-espresso'
                    : 'text-warmgray hover:text-espresso border border-transparent hover:border-atelier'
                }`}
              >
                {cat.name} ({cat.productCount || 0})
              </Link>
            );
          })}
        </div>

        {/* Product Grid */}
        <div className="pt-8">
          {filtered.length === 0 ? (
            <div className="py-24 text-center space-y-4">
              <p className="font-serif text-2xl text-espresso">No materials found in this category.</p>
              <p className="text-xs text-warmgray">Try selecting another category or clear search terms.</p>
              <Link
                href="/materials"
                className="inline-block px-6 py-2.5 btn-luxury-dark text-xs uppercase tracking-widest"
              >
                View All Materials
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
              {filtered.map((product, idx) => (
                <Reveal key={product.id} delay={idx * 50}>
                  <Link
                    href={`/material/${product.slug}`}
                    className="group block bg-surface border border-atelier p-2.5 sm:p-4 hover:border-bronze transition-all duration-300 space-y-2 sm:space-y-3"
                  >
                    <div className="relative aspect-[4/5] bg-canvas overflow-hidden">
                      {product.images[0] && (
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                          className="object-cover group-hover:scale-104 transition-transform duration-700 ease-out"
                        />
                      )}
                      {product.purchaseMode === 'REQUEST_QUOTE' && (
                        <span className="absolute top-1.5 left-1.5 bg-espresso/90 backdrop-blur-xs text-surface text-[8px] sm:text-[9px] px-1.5 sm:px-2 py-0.5 uppercase tracking-wider font-medium">
                          Quote
                        </span>
                      )}
                      {product.stock <= 0 && (
                        <span className="absolute top-1.5 right-1.5 bg-warmgray/90 backdrop-blur-xs text-surface text-[8px] sm:text-[9px] px-1.5 sm:px-2 py-0.5 uppercase tracking-wider font-medium">
                          Custom
                        </span>
                      )}
                    </div>

                    <div className="space-y-1 sm:space-y-1.5 pt-0.5 sm:pt-1">
                      <div className="flex justify-between text-[9px] sm:text-[11px] text-warmgray">
                        <span className="uppercase tracking-wider font-medium text-bronze line-clamp-1">
                          {product.categoryName || 'Material'}
                        </span>
                      </div>

                      <h3 className="font-serif text-xs sm:text-lg text-espresso group-hover:text-bronze transition-colors font-medium leading-snug line-clamp-1">
                        {product.name}
                      </h3>

                      <div className="flex items-baseline justify-between pt-1 sm:pt-2 border-t border-atelier/60">
                        <div>
                          <span className="text-xs sm:text-sm font-medium text-timber">
                            ₹{(product.salePrice || product.price).toLocaleString('en-IN')}
                          </span>
                          <span className="text-[10px] sm:text-xs text-warmgray font-light"> / {product.unit}</span>
                        </div>
                        <span className="hidden sm:flex text-[10px] uppercase tracking-widest text-espresso group-hover:translate-x-0.5 transition-transform items-center gap-1 font-medium">
                          Details <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
