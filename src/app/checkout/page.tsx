'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck,
  CreditCard,
  Building,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Truck,
  Lock,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Order } from '@/types';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, tax, shipping, total, clearCart } = useCart();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [submitting, setSubmitting] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  // Form State
  const [customer, setCustomer] = useState({
    fullName: '',
    email: '',
    phone: '',
  });

  const [address, setAddress] = useState({
    addressLine1: '',
    addressLine2: '',
    city: 'Guwahati',
    state: 'Assam',
    pincode: '781040',
    country: 'India',
  });

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'wire' | 'invoice'>('card');
  const [notes, setNotes] = useState('');

  // Handle Order Submission
  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setSubmitting(true);
    setOrderError(null);

    try {
      const payload = {
        customerName: customer.fullName,
        customerEmail: customer.email,
        customerPhone: customer.phone,
        shippingAddress: {
          ...address,
          fullName: customer.fullName,
          phone: customer.phone,
        },
        billingAddress: {
          ...address,
          fullName: customer.fullName,
          phone: customer.phone,
        },
        items: items.map((it) => ({
          productId: it.productId,
          variantId: it.variantId,
          quantity: it.quantity,
          selectedColor: it.variant?.color,
          selectedFinish: it.variant?.finish,
        })),
        paymentMethod:
          paymentMethod === 'card'
            ? 'Encrypted Card Processing'
            : paymentMethod === 'wire'
            ? 'NEFT / RTGS Architectural Wire Transfer'
            : 'Atelier Corporate Purchase Invoice',
        notes,
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setCompletedOrder(data.order);
        clearCart();
      } else {
        setOrderError(data.error || 'Unable to place order. Please try again.');
      }
    } catch (err: any) {
      setOrderError(err.message || 'Network error during checkout.');
    } finally {
      setSubmitting(false);
    }
  };

  // If order was successfully completed, show luxury confirmation
  if (completedOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-8">
        <div className="bg-surface border border-atelier p-8 sm:p-12 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-champagne/20 text-timber flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-bronze font-medium">
              Order Confirmed & Staged
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-espresso font-light">
              Thank You for Your Commission
            </h1>
            <p className="text-xs sm:text-sm text-warmgray font-light max-w-md mx-auto">
              Your architectural order has been received and registered directly with our logistics team.
            </p>
          </div>

          <div className="bg-canvas p-6 border border-atelier max-w-md mx-auto text-left space-y-3 text-xs">
            <div className="flex justify-between border-b border-atelier pb-2">
              <span className="text-warmgray">Order Number:</span>
              <span className="font-mono font-medium text-espresso">{completedOrder.orderNumber}</span>
            </div>
            <div className="flex justify-between border-b border-atelier pb-2">
              <span className="text-warmgray">Total Billed:</span>
              <span className="font-serif text-base text-timber font-medium">
                ₹{completedOrder.totalAmount.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="flex justify-between border-b border-atelier pb-2">
              <span className="text-warmgray">Recipient:</span>
              <span className="text-espresso font-medium">{completedOrder.customerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-warmgray">Dispatch City:</span>
              <span className="text-espresso">{completedOrder.shippingAddress.city}, {completedOrder.shippingAddress.state}</span>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/materials"
              className="px-8 py-3.5 btn-luxury-dark text-xs uppercase tracking-widest"
            >
              Continue Exploring Materials
            </Link>
            <Link
              href="/"
              className="px-8 py-3.5 btn-luxury-outline text-xs uppercase tracking-widest"
            >
              Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center space-y-4">
        <h1 className="font-serif text-3xl text-espresso">Your bag is currently empty</h1>
        <p className="text-xs text-warmgray">Please select materials or furnishings before proceeding to checkout.</p>
        <Link href="/materials" className="inline-block mt-4 px-6 py-3 btn-luxury-dark text-xs uppercase tracking-widest">
          Browse Materials Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* Header */}
      <div className="space-y-2 border-b border-atelier pb-6">
        <span className="text-xs uppercase tracking-widest text-bronze font-medium">Encrypted Checkout</span>
        <h1 className="font-serif text-3xl sm:text-4xl text-espresso font-light">
          Complete Your Material Order
        </h1>
      </div>

      {orderError && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-3">
          <Lock className="w-4 h-4 text-red-600 flex-shrink-0" />
          <span>{orderError}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Form: Multi-Step Checkout */}
        <div className="lg:col-span-7 space-y-8">
          {/* Step 1: Customer Info */}
          <div className="bg-surface border border-atelier p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-atelier pb-4">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-espresso text-surface text-xs flex items-center justify-center font-serif">
                  1
                </span>
                <h2 className="font-serif text-xl text-espresso">Customer Contact Details</h2>
              </div>
              <span className="text-[11px] text-warmgray font-light">Guest Checkout Supported</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-warmgray font-medium">
                  Full Name / Client Entity *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikas Sharma / Studio Design LLP"
                  value={customer.fullName}
                  onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
                  className="w-full p-3 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-warmgray font-medium">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="client@domain.com"
                  value={customer.email}
                  onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                  className="w-full p-3 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-warmgray font-medium">
                  Contact Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98200 XXXXX"
                  value={customer.phone}
                  onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                  className="w-full p-3 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden text-xs"
                />
              </div>
            </div>
          </div>

          {/* Step 2: Shipping & Site Delivery Address */}
          <div className="bg-surface border border-atelier p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3 border-b border-atelier pb-4">
              <span className="w-6 h-6 rounded-full bg-espresso text-surface text-xs flex items-center justify-center font-serif">
                2
              </span>
              <h2 className="font-serif text-xl text-espresso">Site / Delivery Address</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-warmgray font-medium">
                  Street Address / Site Location *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Apartment, Suite, Project Site, Street"
                  value={address.addressLine1}
                  onChange={(e) => setAddress({ ...address, addressLine1: e.target.value })}
                  className="w-full p-3 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden text-xs"
                />
              </div>

              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-warmgray font-medium">
                  Landmark / Building Name
                </label>
                <input
                  type="text"
                  placeholder="Near design square, Gate 2"
                  value={address.addressLine2}
                  onChange={(e) => setAddress({ ...address, addressLine2: e.target.value })}
                  className="w-full p-3 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-warmgray font-medium">
                  City *
                </label>
                <input
                  type="text"
                  required
                  value={address.city}
                  onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  className="w-full p-3 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-warmgray font-medium">
                  State *
                </label>
                <input
                  type="text"
                  required
                  value={address.state}
                  onChange={(e) => setAddress({ ...address, state: e.target.value })}
                  className="w-full p-3 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-warmgray font-medium">
                  Postal Pincode *
                </label>
                <input
                  type="text"
                  required
                  value={address.pincode}
                  onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                  className="w-full p-3 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-warmgray font-medium">
                  Country
                </label>
                <input
                  type="text"
                  disabled
                  value={address.country}
                  className="w-full p-3 bg-canvas/60 border border-atelier text-xs text-warmgray"
                />
              </div>
            </div>
          </div>

          {/* Step 3: Payment Method */}
          <div className="bg-surface border border-atelier p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3 border-b border-atelier pb-4">
              <span className="w-6 h-6 rounded-full bg-espresso text-surface text-xs flex items-center justify-center font-serif">
                3
              </span>
              <h2 className="font-serif text-xl text-espresso">Payment Method</h2>
            </div>

            <div className="space-y-3">
              <label
                className={`p-4 border block cursor-pointer transition-all ${
                  paymentMethod === 'card' ? 'border-espresso bg-canvas ring-1 ring-espresso' : 'border-atelier hover:border-bronze'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="accent-espresso"
                    />
                    <span className="text-xs font-medium text-espresso">Credit / Debit Card (256-bit SSL Encrypted)</span>
                  </div>
                  <CreditCard className="w-4 h-4 text-warmgray" />
                </div>
                {paymentMethod === 'card' && (
                  <p className="text-[11px] text-warmgray mt-2 pl-6">
                    Processed securely via direct banking gateway. Instant staging for warehouse crate preparation.
                  </p>
                )}
              </label>

              <label
                className={`p-4 border block cursor-pointer transition-all ${
                  paymentMethod === 'wire' ? 'border-espresso bg-canvas ring-1 ring-espresso' : 'border-atelier hover:border-bronze'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'wire'}
                      onChange={() => setPaymentMethod('wire')}
                      className="accent-espresso"
                    />
                    <span className="text-xs font-medium text-espresso">RTGS / NEFT Architectural Wire Transfer</span>
                  </div>
                  <Building className="w-4 h-4 text-warmgray" />
                </div>
                {paymentMethod === 'wire' && (
                  <p className="text-[11px] text-warmgray mt-2 pl-6">
                    Our studio banking IFSC and proforma invoice will be dispatched immediately for institutional transfer.
                  </p>
                )}
              </label>
            </div>

            <div className="space-y-1.5 pt-2">
              <label className="text-xs uppercase tracking-wider text-warmgray font-medium">
                Site Delivery Instructions or Notes (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Unloading crane required on site, gate passes required before 9am..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-3 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden text-xs"
              />
            </div>
          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={submitting || !customer.fullName || !customer.email || !customer.phone || !address.addressLine1}
            className="w-full py-4 btn-luxury-dark text-xs uppercase tracking-widest flex items-center justify-center gap-2 font-medium disabled:opacity-50"
          >
            {submitting ? (
              <span>Validating & Decrementing Inventory...</span>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" /> Place Order (₹{total.toLocaleString('en-IN')})
              </>
            )}
          </button>
        </div>

        {/* Right Summary Column */}
        <div className="lg:col-span-5 bg-surface border border-atelier p-6 sm:p-8 space-y-6 sticky top-28">
          <h3 className="font-serif text-xl text-espresso border-b border-atelier pb-4">
            Order Review ({items.length} materials)
          </h3>

          <div className="space-y-4 max-h-72 overflow-y-auto pr-2 border-b border-atelier pb-4">
            {items.map((item) => (
              <div key={`${item.productId}-${item.variantId || 'base'}`} className="flex gap-3 text-xs">
                <div className="relative w-14 h-16 bg-canvas flex-shrink-0">
                  {item.product.images[0] && (
                    <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-serif text-sm text-espresso font-medium line-clamp-1">{item.product.name}</h4>
                  <p className="text-[11px] text-warmgray">
                    {item.quantity} {item.product.unit} • ₹{item.unitPrice.toLocaleString('en-IN')}/{item.product.unit}
                  </p>
                  <p className="text-xs font-medium text-timber mt-0.5">
                    ₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-2 text-xs text-warmgray">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="text-espresso font-medium">₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span>GST (18%)</span>
              <span className="text-espresso font-medium">₹{tax.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span>Architectural Freight</span>
              <span className="text-espresso font-medium">{shipping === 0 ? 'Complimentary' : `₹${shipping.toLocaleString('en-IN')}`}</span>
            </div>
            <div className="flex justify-between pt-3 border-t border-atelier text-sm font-medium text-espresso">
              <span>Final Total</span>
              <span className="font-serif text-xl text-timber">₹{total.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="pt-2 text-[11px] text-warmgray space-y-1">
            <p className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-bronze" /> 256-bit encrypted checkout
            </p>
            <p className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-bronze" /> Insured freight tracking provided via SMS
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
