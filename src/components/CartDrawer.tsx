'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Minus, Plus, Trash2, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export function CartDrawer() {
  const { items, removeItem, updateQuantity, isCartOpen, setIsCartOpen, subtotal, tax, shipping, total, itemCount } =
    useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-espresso/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-surface border-l border-atelier shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-atelier flex items-center justify-between">
            <div>
              <span className="text-xs uppercase tracking-widest text-warmgray font-medium">Your Selection</span>
              <h2 className="font-serif text-2xl text-espresso font-normal">Shopping Bag ({itemCount})</h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-espresso hover:text-bronze transition-colors"
              aria-label="Close bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className="w-16 h-16 rounded-full bg-canvas flex items-center justify-center text-warmgray">
                  <ShieldCheck className="w-8 h-8 stroke-1" />
                </div>
                <p className="text-espresso font-serif text-xl">Your bag is currently empty</p>
                <p className="text-sm text-warmgray max-w-xs">
                  Explore our curated architectural materials and limited-edition atelier furnishings.
                </p>
                <Link
                  href="/materials"
                  onClick={() => setIsCartOpen(false)}
                  className="mt-4 px-6 py-2.5 btn-luxury-dark text-xs uppercase tracking-widest"
                >
                  Explore Materials
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={`${item.productId}-${item.variantId || 'base'}`}
                  className="flex gap-4 pb-6 border-b border-atelier/60"
                >
                  <div className="relative w-20 h-24 bg-canvas flex-shrink-0 overflow-hidden">
                    {item.product.images?.[0] && (
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-serif text-base text-espresso leading-snug">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeItem(item.productId, item.variantId)}
                          className="text-warmgray hover:text-red-700 transition-colors p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-warmgray mt-0.5">
                        {item.variant?.name || item.product.subcategory || item.product.unit}
                      </p>
                      <p className="text-xs text-bronze mt-1 font-medium">
                        ₹{item.unitPrice.toLocaleString('en-IN')} / {item.product.unit}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-atelier bg-canvas">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1, item.variantId)}
                          className="p-1.5 text-espresso hover:text-bronze"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 text-xs font-medium text-espresso min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1, item.variantId)}
                          className="p-1.5 text-espresso hover:text-bronze"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-sm font-medium text-espresso">
                        ₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary */}
          {items.length > 0 && (
            <div className="p-6 border-t border-atelier bg-surface space-y-4">
              <div className="space-y-1.5 text-xs text-warmgray">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-espresso font-medium">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated GST (18%)</span>
                  <span className="text-espresso font-medium">₹{tax.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping (Architectural freight)</span>
                  <span className="text-espresso font-medium">
                    {shipping === 0 ? 'Complimentary' : `₹${shipping.toLocaleString('en-IN')}`}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-atelier text-sm font-medium text-espresso">
                  <span>Total Due</span>
                  <span className="font-serif text-lg text-timber">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <Link
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full py-3.5 btn-luxury-dark text-xs uppercase tracking-widest flex items-center justify-center gap-2 font-medium"
                >
                  Proceed to Checkout <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/quote"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full py-2.5 text-center block text-xs uppercase tracking-widest text-warmgray hover:text-espresso transition-colors"
                >
                  Request Bulk / Project Quote Instead
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
