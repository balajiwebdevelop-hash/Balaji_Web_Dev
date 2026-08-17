'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2, Minus, Plus, ArrowRight, ArrowLeft, ShieldCheck, Truck } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, subtotal, tax, shipping, total, itemCount } = useCart();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12 min-h-[70vh]">
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-atelier pb-6 gap-2">
        <div>
          <span className="text-xs uppercase tracking-widest text-bronze font-medium">Order Staging</span>
          <h1 className="font-serif text-3xl sm:text-4xl text-espresso font-light">
            Shopping Bag ({itemCount} {itemCount === 1 ? 'item' : 'items'})
          </h1>
        </div>
        {items.length > 0 && (
          <button
            onClick={clearCart}
            className="text-xs uppercase tracking-wider text-warmgray hover:text-red-700 transition-colors self-start"
          >
            Clear Entire Bag
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20 space-y-4 max-w-md mx-auto">
          <p className="font-serif text-2xl text-espresso">Your bag is empty.</p>
          <p className="text-xs sm:text-sm text-warmgray font-light">
            Browse our catalog of quarried stones, fluted wall panels, and bespoke furnishings to add materials to your cart.
          </p>
          <div className="pt-4">
            <Link href="/materials" className="px-8 py-3.5 btn-luxury-dark text-xs uppercase tracking-widest inline-block">
              Explore Materials Library
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Items Table */}
          <div className="lg:col-span-8 space-y-6">
            {items.map((item) => (
              <div
                key={`${item.productId}-${item.variantId || 'base'}`}
                className="bg-surface border border-atelier p-4 sm:p-6 flex flex-col sm:flex-row gap-6 items-start justify-between"
              >
                <div className="flex gap-4 sm:gap-6 flex-1">
                  <div className="relative w-24 h-28 sm:w-28 sm:h-32 bg-canvas overflow-hidden flex-shrink-0">
                    {item.product.images[0] && (
                      <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
                    )}
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <span className="text-[10px] uppercase tracking-wider text-bronze font-medium">
                      {item.product.categoryName}
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl text-espresso leading-snug">
                      <Link href={`/material/${item.product.slug}`} className="hover:text-bronze transition-colors">
                        {item.product.name}
                      </Link>
                    </h3>
                    {item.variant && (
                      <p className="text-xs text-warmgray">Option: {item.variant.name}</p>
                    )}
                    <p className="text-xs text-timber font-medium pt-1">
                      ₹{item.unitPrice.toLocaleString('en-IN')} <span className="text-warmgray font-light">/ {item.product.unit}</span>
                    </p>
                    <p className="text-[11px] text-warmgray">Lead time: {item.product.leadTime}</p>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-4 pt-4 sm:pt-0 border-t sm:border-t-0 border-atelier/60">
                  <div className="flex items-center border border-atelier bg-canvas">
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1, item.variantId)}
                      className="p-2 text-espresso hover:text-bronze"
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-medium text-espresso min-w-[2.5rem] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1, item.variantId)}
                      className="p-2 text-espresso hover:text-bronze"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-right">
                    <span className="font-serif text-lg text-espresso block">
                      ₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}
                    </span>
                    <button
                      onClick={() => removeItem(item.productId, item.variantId)}
                      className="text-[11px] text-warmgray hover:text-red-700 transition-colors inline-flex items-center gap-1 mt-1"
                    >
                      <Trash2 className="w-3 h-3" /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="pt-2">
              <Link
                href="/materials"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-warmgray hover:text-espresso font-medium transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Continue Material Selection
              </Link>
            </div>
          </div>

          {/* Summary Column */}
          <div className="lg:col-span-4 bg-surface border border-atelier p-6 sm:p-8 space-y-6 sticky top-28">
            <h2 className="font-serif text-2xl text-espresso font-light border-b border-atelier pb-4">
              Summary
            </h2>

            <div className="space-y-3 text-xs text-warmgray">
              <div className="flex justify-between">
                <span>Materials Subtotal</span>
                <span className="text-espresso font-medium">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Architectural GST (18%)</span>
                <span className="text-espresso font-medium">₹{tax.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Insured Freight & Logistics</span>
                <span className="text-espresso font-medium">
                  {shipping === 0 ? 'Complimentary' : `₹${shipping.toLocaleString('en-IN')}`}
                </span>
              </div>
              {shipping === 0 && (
                <p className="text-[10px] text-bronze">
                  * Eligible for complimentary architectural freight over ₹50,000.
                </p>
              )}
              <div className="flex justify-between pt-3 border-t border-atelier text-sm font-medium text-espresso">
                <span>Total Amount</span>
                <span className="font-serif text-xl text-timber">₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <Link
                href="/checkout"
                className="w-full py-4 btn-luxury-dark text-xs uppercase tracking-widest flex items-center justify-center gap-2 font-medium"
              >
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/quote"
                className="w-full py-3 text-center block text-xs uppercase tracking-widest text-warmgray hover:text-espresso border border-atelier transition-colors"
              >
                Request Custom Bulk Quote
              </Link>
            </div>

            <div className="pt-4 border-t border-atelier/60 space-y-2 text-[11px] text-warmgray">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-bronze" />
                <span>Verified Direct Quarry & Millwork Provenance</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-bronze" />
                <span>Crated and foam-buffered architectural dispatch</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
