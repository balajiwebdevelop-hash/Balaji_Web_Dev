import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { getCategoryBySlug, getProducts, getCategories } from '@/lib/db';
import { Reveal } from '@/components/Reveal';

export const revalidate = 60;

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const cat = await getCategoryBySlug(params.slug);
  if (!cat) return { title: 'Category Not Found — Balaji Atelier' };
  return {
    title: `${cat.name} — Architectural Materials | Balaji Atelier`,
    description: cat.description || `Browse luxury ${cat.name} curated by Balaji Atelier.`,
  };
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const [category, products, allCategories] = await Promise.all([
    getCategoryBySlug(params.slug),
    getProducts({ categorySlug: params.slug, publishedOnly: true }),
    getCategories(),
  ]);

  if (!category) {
    notFound();
  }

  return (
    <div className="space-y-16 pb-24">
      {/* Top Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link
          href="/materials"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-warmgray hover:text-espresso transition-colors font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to All Materials
        </Link>
      </div>

      {/* Category Hero Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-espresso text-surface p-8 sm:p-16 border border-atelier-dark space-y-4 relative overflow-hidden">
          {category.imageUrl && (
            <div className="absolute inset-0 z-0 opacity-20">
              <Image src={category.imageUrl} alt={category.name} fill className="object-cover" />
            </div>
          )}
          <div className="relative z-10 space-y-3 max-w-3xl">
            <span className="text-xs uppercase tracking-widest text-champagne font-medium">Category Collection</span>
            <h1 className="font-serif text-3xl sm:text-5xl text-surface font-light">{category.name}</h1>
            {category.description && (
              <p className="text-sm sm:text-base text-surface/80 font-light leading-relaxed">
                {category.description}
              </p>
            )}
            <p className="text-xs text-champagne pt-1 font-medium">{products.length} Materials Available</p>
          </div>
        </div>
      </section>

      {/* Category Sibling Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-4 border-b border-atelier no-scrollbar">
          <Link
            href="/materials"
            className="px-4 py-2 text-xs uppercase tracking-widest whitespace-nowrap text-warmgray hover:text-espresso border border-transparent hover:border-atelier"
          >
            All Materials
          </Link>
          {allCategories.map((c) => {
            const isActive = c.slug === category.slug;
            return (
              <Link
                key={c.id}
                href={`/category/${c.slug}`}
                className={`px-4 py-2 text-xs uppercase tracking-widest whitespace-nowrap transition-colors font-medium ${
                  isActive
                    ? 'bg-espresso text-surface border border-espresso'
                    : 'text-warmgray hover:text-espresso border border-transparent hover:border-atelier'
                }`}
              >
                {c.name}
              </Link>
            );
          })}
        </div>

        {/* Product Grid */}
        <div className="pt-8">
          {products.length === 0 ? (
            <div className="py-24 text-center space-y-4">
              <p className="font-serif text-2xl text-espresso">No materials in this collection at the moment.</p>
              <Link
                href="/materials"
                className="inline-block px-6 py-2.5 btn-luxury-dark text-xs uppercase tracking-widest"
              >
                Explore All Materials
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((product, idx) => (
                <Reveal key={product.id} delay={idx * 50}>
                  <Link
                    href={`/material/${product.slug}`}
                    className="group block bg-surface border border-atelier p-4 hover:border-bronze transition-all duration-300 space-y-3"
                  >
                    <div className="relative aspect-[4/5] bg-canvas overflow-hidden">
                      {product.images[0] && (
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-104 transition-transform duration-700 ease-out"
                        />
                      )}
                      {product.purchaseMode === 'REQUEST_QUOTE' && (
                        <span className="absolute top-2 left-2 bg-espresso/90 backdrop-blur-xs text-surface text-[9px] px-2 py-0.5 uppercase tracking-wider font-medium">
                          Quote Required
                        </span>
                      )}
                    </div>

                    <div className="space-y-1.5 pt-1">
                      <div className="flex justify-between text-[11px] text-warmgray">
                        <span className="uppercase tracking-wider font-medium text-bronze">
                          {product.subcategory || category.name}
                        </span>
                        <span>MOQ: {product.moq} {product.unit}</span>
                      </div>

                      <h3 className="font-serif text-lg text-espresso group-hover:text-bronze transition-colors font-medium leading-snug line-clamp-1">
                        {product.name}
                      </h3>

                      <div className="flex items-baseline justify-between pt-2 border-t border-atelier/60">
                        <div>
                          <span className="text-sm font-medium text-timber">
                            ₹{(product.salePrice || product.price).toLocaleString('en-IN')}
                          </span>
                          <span className="text-xs text-warmgray font-light"> / {product.unit}</span>
                        </div>
                        <span className="text-[10px] uppercase tracking-widest text-espresso group-hover:translate-x-0.5 transition-transform flex items-center gap-1 font-medium">
                          View Details <ArrowRight className="w-3 h-3" />
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
