import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { getProducts } from '@/lib/db';
import { Reveal } from '@/components/Reveal';

export const metadata = {
  title: 'Studio Shop — Curated Lighting, Objects & Furnishings | Balaji Architect & Interiors',
  description: 'Limited-edition architectural objects, travertine monolithic tables, cast bronze hardware, and studio design pieces.',
};

export const revalidate = 60;

export default async function ShopPage() {
  const allProducts = await getProducts({ publishedOnly: true });
  // Filter products that can be directly bought online
  const purchasable = allProducts.filter((p) => p.purchaseMode === 'BUY_NOW' || p.purchaseMode === 'BOTH');

  return (
    <div className="space-y-16 pb-24">
      {/* Header Banner */}
      <section className="bg-espresso text-surface py-20 sm:py-28 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <Reveal>
            <span className="text-xs uppercase tracking-widest-plus text-champagne font-medium">
              Curated Shop
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl text-surface font-light leading-tight mt-1 max-w-3xl">
              Atelier Furnishings & Architectural Objects
            </h1>
          </Reveal>
          <Reveal delay={100}>
            <p className="max-w-2xl text-sm sm:text-base text-surface/80 font-light leading-relaxed">
              Limited-edition travertine coffee tables, unlacquered bronze chandeliers, knurled architectural door hardware, and engineered hardwood flooring available for immediate procurement.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center pb-6 border-b border-atelier text-xs text-warmgray">
          <span>Displaying {purchasable.length} Available Creations</span>
          <Link href="/quote" className="text-bronze hover:underline uppercase tracking-wider">
            Need custom fabrication? Request Quote →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pt-8">
          {purchasable.map((product, idx) => (
            <Reveal key={product.id} delay={idx * 50}>
              <Link
                href={`/material/${product.slug}`}
                className="group block bg-surface border border-atelier p-4 hover:border-bronze transition-all space-y-3"
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
                  {product.isNew && (
                    <span className="absolute top-2 left-2 bg-espresso text-surface text-[9px] px-2 py-0.5 uppercase tracking-wider font-semibold">
                      New Release
                    </span>
                  )}
                </div>

                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between text-[11px] text-warmgray">
                    <span className="uppercase tracking-wider font-medium text-bronze">
                      {product.categoryName}
                    </span>
                    <span>In Stock: {product.stock}</span>
                  </div>

                  <h3 className="font-serif text-lg text-espresso group-hover:text-bronze transition-colors font-medium leading-snug line-clamp-1">
                    {product.name}
                  </h3>

                  <div className="flex items-baseline justify-between pt-2 border-t border-atelier/60">
                    <div>
                      <span className="text-base font-medium text-timber">
                        ₹{(product.salePrice || product.price).toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-warmgray font-light"> / {product.unit}</span>
                    </div>
                    <span className="text-[11px] uppercase tracking-widest text-espresso group-hover:translate-x-0.5 transition-transform flex items-center gap-1 font-medium">
                      Shop Now <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
