'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Heart,
  ShoppingBag,
  FileText,
  Minus,
  Plus,
  ShieldCheck,
  Truck,
  Layers,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { Product, ProductVariant } from '@/types';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

export function ProductDetailClient({
  product,
  relatedProducts,
}: {
  product: Product;
  relatedProducts: Product[];
}) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product.variants && product.variants.length > 0 ? product.variants[0] : undefined
  );
  const [quantity, setQuantity] = useState(product.moq || 1);
  const [openAccordion, setOpenAccordion] = useState<string | null>('specs');
  const [addedToast, setAddedToast] = useState(false);

  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const isFavorited = isInWishlist(product.id);

  const basePrice = product.salePrice && product.salePrice > 0 ? product.salePrice : product.price;
  const currentPrice = basePrice + (selectedVariant?.priceModifier || 0);

  const handleAddToCart = () => {
    addItem(product, quantity, selectedVariant);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 3000);
  };

  const toggleSection = (section: string) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  return (
    <div className="space-y-16 sm:space-y-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left: Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[4/3] sm:aspect-[16/11] bg-canvas overflow-hidden border border-atelier">
            {product.images[selectedImage] && (
              <Image
                src={product.images[selectedImage]}
                alt={`${product.name} - View ${selectedImage + 1}`}
                fill
                priority
                className="object-cover"
              />
            )}
            {product.purchaseMode === 'REQUEST_QUOTE' && (
              <span className="absolute top-4 left-4 bg-espresso text-surface text-[10px] px-3 py-1 uppercase tracking-widest font-medium">
                Quote Only
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative w-20 h-20 bg-canvas flex-shrink-0 border transition-all ${
                    selectedImage === idx ? 'border-bronze opacity-100 ring-1 ring-bronze' : 'border-atelier opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Spec & Purchase Column */}
        <div className="lg:col-span-5 space-y-6">
          {/* Category & Series */}
          <div className="space-y-1.5 border-b border-atelier pb-4">
            <div className="flex items-center justify-between text-xs text-warmgray">
              <Link
                href={`/category/${product.categorySlug}`}
                className="uppercase tracking-widest text-bronze hover:text-espresso font-medium transition-colors"
              >
                {product.categoryName}
              </Link>
              <span className="text-[11px] font-mono">SKU: {selectedVariant?.sku || product.sku}</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-espresso font-normal leading-snug">
              {product.name}
            </h1>
            <p className="text-xs text-warmgray uppercase tracking-wider">{product.brand}</p>
          </div>

          {/* Pricing & Unit */}
          <div className="flex items-baseline gap-3">
            <span className="font-serif text-3xl sm:text-4xl text-timber font-light">
              ₹{currentPrice.toLocaleString('en-IN')}
            </span>
            <span className="text-sm text-warmgray font-light">/ {product.unit}</span>
            {product.salePrice && product.salePrice > 0 && (
              <span className="text-sm text-warmgray line-through ml-2">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          <p className="text-sm text-warmgray font-light leading-relaxed">
            {product.description}
          </p>

          {/* Variants Selector */}
          {product.variants && product.variants.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-atelier">
              <span className="text-xs uppercase tracking-widest text-espresso font-medium block">
                Available Option / Finish:
              </span>
              <div className="grid grid-cols-2 gap-2">
                {product.variants.map((v) => {
                  const isSelected = selectedVariant?.id === v.id;
                  return (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v)}
                      className={`p-3 text-left border transition-all text-xs ${
                        isSelected
                          ? 'border-espresso bg-surface text-espresso font-medium ring-1 ring-espresso'
                          : 'border-atelier bg-canvas text-warmgray hover:border-bronze'
                      }`}
                    >
                      <span className="block font-medium">{v.name}</span>
                      {v.priceModifier !== 0 && (
                        <span className="text-[10px] text-bronze">
                          {v.priceModifier > 0 ? `+₹${v.priceModifier}` : `-₹${Math.abs(v.priceModifier)}`}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity & MOQ */}
          <div className="space-y-2 pt-2 border-t border-atelier">
            <div className="flex justify-between items-center text-xs">
              <span className="uppercase tracking-widest text-espresso font-medium">Quantity ({product.unit}):</span>
              <span className="text-warmgray">MOQ: {product.moq} {product.unit}</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center border border-atelier bg-surface">
                <button
                  onClick={() => setQuantity(Math.max(product.moq, quantity - (product.unit === 'sq ft' ? 50 : 1)))}
                  className="p-3 text-espresso hover:text-bronze"
                  disabled={quantity <= product.moq}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 text-sm font-medium text-espresso min-w-[3.5rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + (product.unit === 'sq ft' ? 50 : 1))}
                  className="p-3 text-espresso hover:text-bronze"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <div className="text-xs text-warmgray">
                Total for this item: <strong className="text-espresso font-medium">₹{(currentPrice * quantity).toLocaleString('en-IN')}</strong>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4">
            {(product.purchaseMode === 'BUY_NOW' || product.purchaseMode === 'BOTH') && (
              <button
                onClick={handleAddToCart}
                className="w-full py-4 btn-luxury-dark text-xs uppercase tracking-widest flex items-center justify-center gap-2 font-medium"
              >
                <ShoppingBag className="w-4 h-4" /> Add {quantity} {product.unit} to Bag
              </button>
            )}

            {(product.purchaseMode === 'REQUEST_QUOTE' || product.purchaseMode === 'BOTH') && (
              <Link
                href={`/quote?product=${product.id}&qty=${quantity}`}
                className="w-full py-4 btn-luxury-outline text-xs uppercase tracking-widest flex items-center justify-center gap-2 font-medium"
              >
                <FileText className="w-4 h-4" /> Request Project / Custom Quote
              </Link>
            )}

            <button
              onClick={() => toggleWishlist(product.id)}
              className="w-full py-3 border border-atelier text-xs uppercase tracking-widest text-espresso hover:bg-canvas transition-colors flex items-center justify-center gap-2"
            >
              <Heart className={`w-4 h-4 ${isFavorited ? 'fill-bronze text-bronze' : ''}`} />
              {isFavorited ? 'Saved to Wishlist' : 'Add to Wishlist'}
            </button>
          </div>

          {/* Toast Notification */}
          {addedToast && (
            <div className="p-3 bg-espresso text-surface text-xs flex items-center gap-2 border border-bronze animate-fade-in">
              <CheckCircle2 className="w-4 h-4 text-champagne" />
              <span>Added to your shopping bag.</span>
              <Link href="/cart" className="underline ml-auto text-champagne">
                View Bag
              </Link>
            </div>
          )}

          {/* Delivery & Assurance Details */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-atelier text-xs text-warmgray">
            <div className="flex items-start gap-2">
              <Truck className="w-4 h-4 text-bronze mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-medium text-espresso block">Lead Time</span>
                <span>{product.leadTime}</span>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-bronze mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-medium text-espresso block">Direct Provenance</span>
                <span>100% Certified Sourcing</span>
              </div>
            </div>
          </div>

          {/* Accordion Specs */}
          <div className="pt-4 border-t border-atelier space-y-2">
            {/* Architectural Specifications */}
            <div className="border border-atelier bg-surface">
              <button
                onClick={() => toggleSection('specs')}
                className="w-full p-4 text-left flex justify-between items-center text-xs uppercase tracking-widest text-espresso font-medium"
              >
                <span>Architectural Specifications</span>
                {openAccordion === 'specs' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openAccordion === 'specs' && (
                <div className="p-4 pt-0 border-t border-atelier/40 text-xs text-warmgray space-y-2">
                  <div className="grid grid-cols-2 gap-2 py-1 border-b border-atelier/40">
                    <span className="font-medium text-espresso">Material</span>
                    <span>{product.material || 'Natural Mineral'}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 py-1 border-b border-atelier/40">
                    <span className="font-medium text-espresso">Finish</span>
                    <span>{product.finish || 'Honed Matte'}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 py-1 border-b border-atelier/40">
                    <span className="font-medium text-espresso">Standard Dimensions</span>
                    <span>{product.dimensions || 'Custom Sizing Available'}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 py-1 border-b border-atelier/40">
                    <span className="font-medium text-espresso">Thickness</span>
                    <span>{product.thickness || 'Standard Gauge'}</span>
                  </div>
                  {product.specifications &&
                    Object.entries(product.specifications).map(([key, val]) => (
                      <div key={key} className="grid grid-cols-2 gap-2 py-1 border-b border-atelier/40 last:border-0">
                        <span className="font-medium text-espresso">{key}</span>
                        <span>{val}</span>
                      </div>
                    ))}
                </div>
              )}
            </div>

            {/* Freight & Handling */}
            <div className="border border-atelier bg-surface">
              <button
                onClick={() => toggleSection('shipping')}
                className="w-full p-4 text-left flex justify-between items-center text-xs uppercase tracking-widest text-espresso font-medium"
              >
                <span>Freight & Handling Terms</span>
                {openAccordion === 'shipping' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openAccordion === 'shipping' && (
                <div className="p-4 pt-0 border-t border-atelier/40 text-xs text-warmgray space-y-2">
                  <p>
                    All stone slabs, wood planks, and acoustic wall systems are dispatched in reinforced export-grade wooden crates with corner foam cushioning.
                  </p>
                  <p>
                    Complimentary insured freight on orders above ₹50,000 across major Indian metropolitan hubs. Crane unloading coordination available on request.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Materials */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6 pt-8 sm:pt-12 border-t border-atelier">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-widest text-bronze font-medium">Complementary Finishes</span>
            <h2 className="font-serif text-2xl sm:text-3xl text-espresso font-light">Related Architectural Materials</h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {relatedProducts.slice(0, 4).map((rel) => (
              <Link
                key={rel.id}
                href={`/material/${rel.slug}`}
                className="group block bg-surface border border-atelier p-2.5 sm:p-4 hover:border-bronze transition-colors space-y-1.5 sm:space-y-2"
              >
                <div className="relative aspect-[4/5] bg-canvas overflow-hidden">
                  {rel.images[0] && (
                    <Image src={rel.images[0]} alt={rel.name} fill className="object-cover group-hover:scale-103 transition-transform duration-500" />
                  )}
                </div>
                <h4 className="font-serif text-xs sm:text-sm text-espresso group-hover:text-bronze transition-colors font-medium truncate">
                  {rel.name}
                </h4>
                <div className="text-xs text-timber font-medium">
                  ₹{(rel.salePrice || rel.price).toLocaleString('en-IN')} / {rel.unit}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Mobile Sticky Bottom Floating Action Bar */}
      <div className="md:hidden fixed bottom-14 left-0 right-0 z-30 bg-surface/98 backdrop-blur-md border-t border-atelier p-3 shadow-2xl flex items-center justify-between gap-3 safe-area-bottom">
        <div className="flex flex-col">
          <span className="text-[10px] text-warmgray uppercase tracking-wider">Total Est.</span>
          <span className="font-serif text-base text-timber font-medium leading-tight">
            ₹{(currentPrice * quantity).toLocaleString('en-IN')}
          </span>
        </div>

        <div className="flex items-center gap-2 flex-1 justify-end">
          <a
            href={`https://wa.me/917002948484?text=Hi%20Balaji%20Architect%20%26%20Interiors%2C%20I%20am%20interested%20in%20${encodeURIComponent(
              product.name
            )}%20(SKU%3A%20${product.sku})`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-green-700 text-white rounded text-xs font-medium flex items-center justify-center"
            title="Chat on WhatsApp"
          >
            WhatsApp
          </a>

          {(product.purchaseMode === 'BUY_NOW' || product.purchaseMode === 'BOTH') ? (
            <button
              onClick={handleAddToCart}
              className="flex-1 py-3 px-4 btn-luxury-dark text-xs uppercase tracking-wider font-medium flex items-center justify-center gap-1.5"
            >
              <ShoppingBag className="w-3.5 h-3.5" /> Add to Bag
            </button>
          ) : (
            <Link
              href={`/quote?product=${product.id}&qty=${quantity}`}
              className="flex-1 py-3 px-4 btn-luxury-outline text-xs uppercase tracking-wider font-medium flex items-center justify-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5" /> Get Quote
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
