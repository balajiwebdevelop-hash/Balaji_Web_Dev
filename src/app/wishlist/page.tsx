'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types';

export default function WishlistPage() {
  const { wishlistIds, toggleWishlist } = useWishlist();
  const { addItem } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWishlistProducts() {
      if (wishlistIds.length === 0) {
        setProducts([]);
        setLoading(false);
        return;
      }
      try {
        const res = await fetch('/api/products');
        if (res.ok) {
          const data = await res.json();
          const matched = (data.products || []).filter((p: Product) => wishlistIds.includes(p.id));
          setProducts(matched);
        }
      } catch (err) {
        console.error('Error fetching wishlist products', err);
      } finally {
        setLoading(false);
      }
    }
    loadWishlistProducts();
  }, [wishlistIds]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12 min-h-[65vh]">
      <div className="space-y-2 border-b border-atelier pb-6">
        <span className="text-xs uppercase tracking-widest text-bronze font-medium">Saved Selection</span>
        <h1 className="font-serif text-3xl sm:text-4xl text-espresso font-light">
          Your Material Wishlist ({wishlistIds.length})
        </h1>
        <p className="text-xs sm:text-sm text-warmgray font-light">
          Save considered finishes, slab options, and architectural fixtures for project specification.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-20 text-warmgray animate-pulse text-sm">
          Loading saved collection...
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-24 space-y-4 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-surface border border-atelier flex items-center justify-center mx-auto text-warmgray">
            <Heart className="w-8 h-8 stroke-1" />
          </div>
          <h3 className="font-serif text-2xl text-espresso">Your wishlist is empty</h3>
          <p className="text-xs sm:text-sm text-warmgray font-light">
            Click the heart icon on any material or architectural piece to bookmark it for your project palette.
          </p>
          <div className="pt-4">
            <Link href="/materials" className="px-6 py-3 btn-luxury-dark text-xs uppercase tracking-widest inline-block">
              Explore Materials
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-surface border border-atelier p-4 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="relative aspect-[4/5] bg-canvas overflow-hidden">
                  {product.images[0] && (
                    <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                  )}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-2 right-2 p-1.5 bg-surface/90 text-espresso hover:text-red-700 transition-colors"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-wider text-bronze font-medium block">
                    {product.categoryName}
                  </span>
                  <Link
                    href={`/material/${product.slug}`}
                    className="font-serif text-base text-espresso hover:text-bronze transition-colors font-medium line-clamp-1"
                  >
                    {product.name}
                  </Link>
                  <div className="text-xs text-timber font-medium mt-1">
                    ₹{(product.salePrice || product.price).toLocaleString('en-IN')} / {product.unit}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-atelier/60 space-y-2">
                <button
                  onClick={() => addItem(product, product.moq || 1)}
                  className="w-full py-2.5 btn-luxury-dark text-xs uppercase tracking-widest flex items-center justify-center gap-1.5"
                >
                  <ShoppingBag className="w-3.5 h-3.5" /> Add to Bag
                </button>
                <Link
                  href={`/material/${product.slug}`}
                  className="w-full py-2 text-center block text-[10px] uppercase tracking-widest text-warmgray hover:text-espresso"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
