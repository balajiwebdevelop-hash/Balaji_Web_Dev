'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Truck,
  Lock,
  QrCode,
  Copy,
  Check,
  Clock,
  ExternalLink,
  Smartphone,
  Info,
  Building,
  Sparkles,
  CreditCard,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Order, SiteSettings } from '@/types';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, tax, shipping, total, clearCart } = useCart();

  // Navigation Step: 'details' (Step 1) | 'payment' (Step 2)
  const [checkoutStep, setCheckoutStep] = useState<'details' | 'payment'>('details');

  const [submitting, setSubmitting] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  // Settings from API
  const [settings, setSettings] = useState<SiteSettings | null>(null);

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

  const [notes, setNotes] = useState('');
  const [utrNumber, setUtrNumber] = useState('');
  const [copiedUpi, setCopiedUpi] = useState(false);

  // Security Countdown Timer (10:00 Minutes)
  const [timeLeft, setTimeLeft] = useState(600);

  useEffect(() => {
    // Load live site settings for payment gateway configuration
    fetch('/api/admin/settings')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.settings) {
          setSettings(data.settings);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Payment gateway settings
  const pg = settings?.paymentGateway || {
    enabled: true,
    gatewayName: 'Balaji PG',
    methodName: 'Balaji QR Payment',
    upiId: '6000149918@fam',
    merchantName: 'Balaji Architect & Interiors',
    instructions:
      '1. Open any UPI app (GPay, PhonePe, Paytm, BHIM, Cred, Amazon Pay).\n2. Scan the dynamic Balaji QR code or select your preferred app below.\n3. Verify payee "Balaji Architect & Interiors" and exact amount.\n4. Complete payment and enter the 12-digit UPI Reference / UTR Number to confirm your order.',
    qrExpiryMinutes: 10,
    enableGPay: true,
    enablePhonePe: true,
    enablePaytm: true,
    enableBhim: true,
    enableCred: true,
    enableAmazonPay: true,
    requireUtr: true,
  };

  const activeUpiId = pg.upiId || '6000149918@fam';
  const merchantName = pg.merchantName || 'Balaji Architect & Interiors';

  // Dynamic UPI Payload for QR code and Intent
  const orderRefNote = `BALAJI-ORDER-${Math.floor(100000 + Math.random() * 900000)}`;
  const upiIntentUri = `upi://pay?pa=${activeUpiId}&pn=${encodeURIComponent(merchantName)}&am=${total}&cu=INR&tn=${encodeURIComponent(orderRefNote)}`;
  
  // Luxury High-Resolution Dynamic QR Code URL
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodeURIComponent(upiIntentUri)}&margin=12&color=1C1917&bgcolor=FAF8F5`;

  const handleCopyUpi = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(activeUpiId);
      setCopiedUpi(true);
      setTimeout(() => setCopiedUpi(false), 2500);
    }
  };

  // Step 1 -> Step 2 transition
  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderError(null);

    if (!customer.fullName || !customer.email || !customer.phone) {
      setOrderError('Please fill in your full contact details (Name, Email, and Phone) to proceed.');
      return;
    }

    if (!address.addressLine1 || !address.city || !address.state || !address.pincode) {
      setOrderError('Please enter a complete site delivery address with City, State, and Pincode.');
      return;
    }

    setCheckoutStep('payment');
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Step 2 Order Submission
  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    if (pg.requireUtr !== false && (!utrNumber || utrNumber.trim().length < 6)) {
      setOrderError('Please enter the 12-digit UPI Reference / UTR Transaction ID after completing your payment.');
      return;
    }

    setSubmitting(true);
    setOrderError(null);

    try {
      const orderNotesWithUtr = `[Balaji PG UTR: ${utrNumber.trim()}] ${notes ? `Client Notes: ${notes}` : ''}`.trim();

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
        paymentMethod: 'Balaji QR Payment (Balaji PG)',
        notes: orderNotesWithUtr,
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
        setOrderError(data.error || 'Unable to complete order. Please verify your details.');
      }
    } catch (err: any) {
      setOrderError(err.message || 'Network error during payment verification.');
    } finally {
      setSubmitting(false);
    }
  };

  // Completed Order Screen
  if (completedOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-8">
        <div className="bg-surface border border-atelier p-8 sm:p-12 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-champagne/20 text-timber flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-bronze font-medium">
              Payment Submitted & Order Registered
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-espresso font-light">
              Thank You for Your Order
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
              <span className="text-warmgray">Payment Gateway:</span>
              <span className="text-espresso font-medium">Balaji PG (Balaji QR Payment)</span>
            </div>
            {utrNumber && (
              <div className="flex justify-between border-b border-atelier pb-2">
                <span className="text-warmgray">UPI Ref / UTR:</span>
                <span className="font-mono text-espresso font-medium">{utrNumber}</span>
              </div>
            )}
            <div className="flex justify-between border-b border-atelier pb-2">
              <span className="text-warmgray">Recipient:</span>
              <span className="text-espresso font-medium">{completedOrder.customerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-warmgray">Delivery City:</span>
              <span className="text-espresso">
                {completedOrder.shippingAddress.city}, {completedOrder.shippingAddress.state}
              </span>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/materials" className="px-8 py-3.5 btn-luxury-dark text-xs uppercase tracking-widest">
              Continue Exploring Materials
            </Link>
            <Link href="/" className="px-8 py-3.5 btn-luxury-outline text-xs uppercase tracking-widest">
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
        <Link
          href="/materials"
          className="inline-block mt-4 px-6 py-3 btn-luxury-dark text-xs uppercase tracking-widest"
        >
          Browse Materials Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10">
      {/* Checkout Progress Stepper */}
      <div className="flex items-center justify-between border-b border-atelier pb-6">
        <div>
          <span className="text-xs uppercase tracking-widest text-bronze font-medium">
            {checkoutStep === 'details' ? 'Step 1 of 2: Order & Delivery Details' : 'Step 2 of 2: Balaji PG Payment'}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-espresso font-light mt-1">
            {checkoutStep === 'details' ? 'Complete Your Order Details' : 'Balaji QR Payment Gateway'}
          </h1>
        </div>

        <div className="hidden sm:flex items-center gap-3 text-xs uppercase tracking-wider font-medium">
          <span
            className={`px-3 py-1.5 border transition-colors ${
              checkoutStep === 'details'
                ? 'bg-espresso text-surface border-espresso'
                : 'bg-canvas text-warmgray border-atelier'
            }`}
          >
            1. Site Details
          </span>
          <span className="text-warmgray">&rarr;</span>
          <span
            className={`px-3 py-1.5 border transition-colors ${
              checkoutStep === 'payment'
                ? 'bg-espresso text-surface border-espresso'
                : 'bg-canvas text-warmgray border-atelier'
            }`}
          >
            2. Balaji QR Payment
          </span>
        </div>
      </div>

      {orderError && (
        <div className="p-4 bg-rose-50 border border-rose-300 text-rose-900 text-xs flex items-center gap-3">
          <Lock className="w-4 h-4 text-rose-600 shrink-0" />
          <span className="font-medium">{orderError}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 1: CUSTOMER & DELIVERY SITE DETAILS */}
      {/* ========================================================================= */}
      {checkoutStep === 'details' && (
        <form onSubmit={handleProceedToPayment} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-7 space-y-8">
            {/* Contact Details */}
            <div className="bg-surface border border-atelier p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-atelier pb-4">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-espresso text-surface text-xs flex items-center justify-center font-serif">
                    1
                  </span>
                  <h2 className="font-serif text-xl text-espresso">Client Contact Details</h2>
                </div>
                <span className="text-[11px] text-warmgray font-light">Client Entity</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="sm:col-span-2 space-y-1.5">
                  <label className="uppercase tracking-wider text-warmgray font-medium">
                    Full Name / Client Entity *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikas Sharma / Studio Design LLP"
                    value={customer.fullName}
                    onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
                    className="w-full p-3 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="uppercase tracking-wider text-warmgray font-medium">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="client@domain.com"
                    value={customer.email}
                    onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                    className="w-full p-3 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="uppercase tracking-wider text-warmgray font-medium">Contact Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98200 XXXXX"
                    value={customer.phone}
                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                    className="w-full p-3 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden"
                  />
                </div>
              </div>
            </div>

            {/* Site / Delivery Location */}
            <div className="bg-surface border border-atelier p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-3 border-b border-atelier pb-4">
                <span className="w-6 h-6 rounded-full bg-espresso text-surface text-xs flex items-center justify-center font-serif">
                  2
                </span>
                <h2 className="font-serif text-xl text-espresso">Site / Delivery Address</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="sm:col-span-2 space-y-1.5">
                  <label className="uppercase tracking-wider text-warmgray font-medium">
                    Street Address / Site Location *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Apartment, Suite, Project Site, Street"
                    value={address.addressLine1}
                    onChange={(e) => setAddress({ ...address, addressLine1: e.target.value })}
                    className="w-full p-3 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1.5">
                  <label className="uppercase tracking-wider text-warmgray font-medium">Landmark / Building Name</label>
                  <input
                    type="text"
                    placeholder="Near design square, Gate 2"
                    value={address.addressLine2}
                    onChange={(e) => setAddress({ ...address, addressLine2: e.target.value })}
                    className="w-full p-3 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="uppercase tracking-wider text-warmgray font-medium">City *</label>
                  <input
                    type="text"
                    required
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    className="w-full p-3 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="uppercase tracking-wider text-warmgray font-medium">State *</label>
                  <input
                    type="text"
                    required
                    value={address.state}
                    onChange={(e) => setAddress({ ...address, state: e.target.value })}
                    className="w-full p-3 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="uppercase tracking-wider text-warmgray font-medium">Postal Pincode *</label>
                  <input
                    type="text"
                    required
                    value={address.pincode}
                    onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                    className="w-full p-3 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="uppercase tracking-wider text-warmgray font-medium">Country</label>
                  <input
                    type="text"
                    disabled
                    value={address.country}
                    className="w-full p-3 bg-canvas/60 border border-atelier text-warmgray"
                  />
                </div>
              </div>
            </div>

            {/* Selected Payment Method Card */}
            <div className="bg-surface border border-atelier p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-3 border-b border-atelier pb-4">
                <span className="w-6 h-6 rounded-full bg-espresso text-surface text-xs flex items-center justify-center font-serif">
                  3
                </span>
                <h2 className="font-serif text-xl text-espresso">Payment Method</h2>
              </div>

              <div className="p-4 bg-canvas border border-bronze flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-espresso text-surface flex items-center justify-center">
                    <QrCode className="w-4 h-4 text-champagne" />
                  </div>
                  <div>
                    <h3 className="font-serif text-sm text-espresso font-medium">Balaji QR Payment</h3>
                    <p className="text-[11px] text-warmgray">
                      Powered by Balaji PG • Instant UPI (Google Pay, PhonePe, Paytm, BHIM, Cred, Amazon Pay)
                    </p>
                  </div>
                </div>
                <span className="text-[10px] uppercase tracking-widest text-emerald-800 bg-emerald-50 px-2 py-0.5 border border-emerald-200 font-medium">
                  Zero Gateway Fee
                </span>
              </div>

              <div className="space-y-1.5 pt-2 text-xs">
                <label className="uppercase tracking-wider text-warmgray font-medium">
                  Site Delivery Instructions or Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Forklift required on site, gate pass required before 10 AM..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-3 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden resize-none text-xs"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 btn-luxury-dark text-xs uppercase tracking-widest flex items-center justify-center gap-2 font-medium cursor-pointer"
            >
              <span>Proceed to Balaji QR Payment</span>
              <ArrowRight className="w-4 h-4" />
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
                  <div className="relative w-14 h-16 bg-canvas shrink-0">
                    {item.product.images[0] && (
                      <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <h4 className="font-serif text-espresso line-clamp-1">{item.product.name}</h4>
                    <div className="text-[10px] text-warmgray flex items-center gap-2">
                      <span>Qty: {item.quantity} {item.product.unit}</span>
                      {item.variant?.color && <span>• {item.variant.color}</span>}
                    </div>
                    <div className="font-mono text-espresso text-xs font-medium">
                      ₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-warmgray">
                <span>Materials Subtotal</span>
                <span className="font-mono text-espresso">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-warmgray">
                <span>Standard GST ({settings?.taxRatePercent || 18}%)</span>
                <span className="font-mono text-espresso">₹{tax.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-warmgray">
                <span>Freight Logistics</span>
                <span className="font-mono text-espresso">
                  {shipping === 0 ? 'Complimentary' : `₹${shipping.toLocaleString('en-IN')}`}
                </span>
              </div>
              <div className="pt-3 border-t border-atelier flex justify-between items-baseline">
                <span className="font-serif text-base text-espresso">Total Due</span>
                <span className="font-serif text-2xl text-timber font-medium">
                  ₹{total.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div className="p-3.5 bg-canvas border border-atelier text-[11px] text-warmgray flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-timber shrink-0 mt-0.5" />
              <span>
                Direct Balaji PG authorization with instant warehouse order staging and insured freight dispatch across India.
              </span>
            </div>
          </div>
        </form>
      )}

      {/* ========================================================================= */}
      {/* STEP 2: DEDICATED BALAJI PG PAYMENT GATEWAY PAGE */}
      {/* ========================================================================= */}
      {checkoutStep === 'payment' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Main Payment Gateway Experience */}
          <div className="lg:col-span-7 space-y-8">
            {/* Top Navigation & Live Security Countdown */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  setCheckoutStep('details');
                  if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-xs uppercase tracking-wider text-espresso hover:text-bronze font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> &larr; Back to Order Details
              </button>

              <div className="flex items-center gap-2 text-xs text-amber-900 bg-amber-50 px-3 py-1.5 border border-amber-200 font-medium">
                <Clock className="w-3.5 h-3.5 text-amber-700 animate-pulse" />
                <span>Session Expires In: </span>
                <span className="font-mono font-bold text-espresso">{formatTimer(timeLeft)}</span>
              </div>
            </div>

            {/* Balaji PG Master Box */}
            <div className="bg-surface border border-atelier p-6 sm:p-8 space-y-8">
              <div className="flex items-center justify-between border-b border-atelier pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-espresso text-surface flex items-center justify-center">
                    <QrCode className="w-5 h-5 text-champagne" />
                  </div>
                  <div>
                    <h2 className="font-serif text-2xl text-espresso font-light">Balaji QR Payment</h2>
                    <span className="text-[11px] text-warmgray">
                      Powered by <strong className="text-espresso">{pg.gatewayName || 'Balaji PG'}</strong> • 256-Bit Encrypted
                    </span>
                  </div>
                </div>
                <span className="text-[10px] uppercase tracking-widest text-emerald-800 bg-emerald-50 px-2.5 py-1 border border-emerald-200 font-medium">
                  Verified Merchant
                </span>
              </div>

              {/* Dynamic QR & Payee Info */}
              <div className="bg-canvas border border-atelier p-6 space-y-6">
                <div className="flex flex-col md:flex-row items-center gap-6 justify-between">
                  {/* QR Image Container */}
                  <div className="flex flex-col items-center space-y-2 bg-surface p-4 border border-atelier shadow-xs shrink-0">
                    <div className="relative w-48 h-48 sm:w-56 sm:h-56 bg-white flex items-center justify-center">
                      <img
                        src={qrCodeUrl}
                        alt="Balaji PG Dynamic UPI QR Code"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-warmgray font-medium flex items-center gap-1">
                      <QrCode className="w-3 h-3 text-bronze" /> Scan with any UPI app
                    </span>
                  </div>

                  {/* Payee Info & Copy UPI ID */}
                  <div className="space-y-4 flex-1 text-xs">
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase tracking-widest text-warmgray">Authoritative Payee</span>
                      <h3 className="font-serif text-xl text-espresso font-medium">{merchantName}</h3>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] uppercase tracking-widest text-warmgray">Exact Total Payable Amount</span>
                      <div className="font-serif text-3xl text-timber font-medium">
                        ₹{total.toLocaleString('en-IN')}
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-1">
                      <span className="text-[10px] uppercase tracking-widest text-warmgray">Direct UPI Settlement ID</span>
                      <div className="flex items-center gap-2">
                        <code className="p-2.5 bg-surface border border-atelier text-espresso font-mono text-xs flex-1 truncate font-semibold">
                          {activeUpiId}
                        </code>
                        <button
                          type="button"
                          onClick={handleCopyUpi}
                          className="px-4 py-2.5 bg-espresso text-surface hover:bg-bronze transition-colors flex items-center gap-1.5 uppercase tracking-wider text-[10px] font-medium cursor-pointer"
                        >
                          {copiedUpi ? <Check className="w-3.5 h-3.5 text-champagne" /> : <Copy className="w-3.5 h-3.5" />}
                          {copiedUpi ? 'Copied!' : 'Copy UPI'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Supported Payment App Icons & One-Click Launch */}
                <div className="pt-4 border-t border-atelier space-y-3">
                  <span className="text-[10px] uppercase tracking-widest text-warmgray font-medium block">
                    Supported UPI Applications (Tap to Pay on Mobile):
                  </span>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                    <a
                      href={upiIntentUri}
                      className="p-2.5 bg-surface border border-atelier hover:border-bronze text-center rounded-xs transition-colors flex flex-col items-center justify-center gap-1 group"
                    >
                      <span className="font-bold text-xs text-blue-600 group-hover:text-bronze">GPay</span>
                      <span className="text-[9px] text-warmgray uppercase">Google Pay</span>
                    </a>

                    <a
                      href={upiIntentUri}
                      className="p-2.5 bg-surface border border-atelier hover:border-bronze text-center rounded-xs transition-colors flex flex-col items-center justify-center gap-1 group"
                    >
                      <span className="font-bold text-xs text-purple-700 group-hover:text-bronze">PhonePe</span>
                      <span className="text-[9px] text-warmgray uppercase">PhonePe</span>
                    </a>

                    <a
                      href={upiIntentUri}
                      className="p-2.5 bg-surface border border-atelier hover:border-bronze text-center rounded-xs transition-colors flex flex-col items-center justify-center gap-1 group"
                    >
                      <span className="font-bold text-xs text-sky-600 group-hover:text-bronze">Paytm</span>
                      <span className="text-[9px] text-warmgray uppercase">Paytm UPI</span>
                    </a>

                    <a
                      href={upiIntentUri}
                      className="p-2.5 bg-surface border border-atelier hover:border-bronze text-center rounded-xs transition-colors flex flex-col items-center justify-center gap-1 group"
                    >
                      <span className="font-bold text-xs text-orange-600 group-hover:text-bronze">BHIM</span>
                      <span className="text-[9px] text-warmgray uppercase">BHIM UPI</span>
                    </a>

                    <a
                      href={upiIntentUri}
                      className="p-2.5 bg-surface border border-atelier hover:border-bronze text-center rounded-xs transition-colors flex flex-col items-center justify-center gap-1 group"
                    >
                      <span className="font-bold text-xs text-emerald-800 group-hover:text-bronze">CRED</span>
                      <span className="text-[9px] text-warmgray uppercase">Cred UPI</span>
                    </a>

                    <a
                      href={upiIntentUri}
                      className="p-2.5 bg-surface border border-atelier hover:border-bronze text-center rounded-xs transition-colors flex flex-col items-center justify-center gap-1 group"
                    >
                      <span className="font-bold text-xs text-amber-600 group-hover:text-bronze">Amazon</span>
                      <span className="text-[9px] text-warmgray uppercase">Amazon Pay</span>
                    </a>
                  </div>
                </div>

                {/* Step-by-Step Payment Instructions */}
                <div className="pt-4 border-t border-atelier space-y-2 text-xs">
                  <span className="text-[10px] uppercase tracking-widest text-bronze font-medium flex items-center gap-1">
                    <Info className="w-3.5 h-3.5" /> How to Pay via Balaji PG:
                  </span>
                  <ol className="list-decimal list-inside space-y-1.5 text-warmgray leading-relaxed text-[11px]">
                    <li>Open your preferred UPI app (<strong className="text-espresso">Google Pay, PhonePe, Paytm, BHIM, Cred, Amazon Pay</strong>).</li>
                    <li>Scan the dynamic Balaji QR code above or tap your preferred app badge.</li>
                    <li>Verify payee name <strong className="text-espresso">{merchantName}</strong> and exact amount <strong className="text-espresso">₹{total.toLocaleString('en-IN')}</strong>.</li>
                    <li>Complete the transaction in your UPI application.</li>
                    <li>Copy the <strong className="text-espresso">12-digit UPI Reference Number / UTR</strong> from your app receipt and paste it below.</li>
                  </ol>
                </div>

                {/* UTR / Reference ID Field */}
                <div className="pt-4 border-t border-atelier space-y-2">
                  <label className="text-xs uppercase tracking-wider text-espresso font-medium flex items-center justify-between">
                    <span>Enter 12-Digit UPI Transaction Reference / UTR Number *</span>
                    <span className="text-[10px] text-warmgray font-normal">Found on UPI receipt</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 423589123456"
                    value={utrNumber}
                    onChange={(e) => setUtrNumber(e.target.value)}
                    className="w-full p-3 bg-surface border border-atelier focus:border-bronze focus:outline-hidden text-xs font-mono tracking-wider font-semibold"
                  />
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={submitting || (pg.requireUtr !== false && !utrNumber)}
                className="w-full py-4 btn-luxury-dark text-xs uppercase tracking-widest flex items-center justify-center gap-2 font-medium disabled:opacity-50 cursor-pointer"
              >
                {submitting ? (
                  <span>Verifying Payment & Finalizing Commission...</span>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" /> Confirm & Verify Payment (₹{total.toLocaleString('en-IN')})
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Summary Column */}
          <div className="lg:col-span-5 bg-surface border border-atelier p-6 sm:p-8 space-y-6 sticky top-28">
            <h3 className="font-serif text-xl text-espresso border-b border-atelier pb-4">
              Order Review & Delivery Site
            </h3>

            {/* Recipient Details Preview */}
            <div className="bg-canvas p-4 border border-atelier space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-warmgray">Recipient:</span>
                <span className="text-espresso font-medium">{customer.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-warmgray">Phone:</span>
                <span className="text-espresso">{customer.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-warmgray">Site City:</span>
                <span className="text-espresso">{address.city}, {address.state}</span>
              </div>
            </div>

            <div className="space-y-4 max-h-56 overflow-y-auto pr-2 border-b border-atelier pb-4">
              {items.map((item) => (
                <div key={`${item.productId}-${item.variantId || 'base'}`} className="flex gap-3 text-xs">
                  <div className="relative w-12 h-14 bg-canvas shrink-0">
                    {item.product.images[0] && (
                      <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
                    )}
                  </div>
                  <div className="flex-1 space-y-0.5">
                    <h4 className="font-serif text-espresso line-clamp-1">{item.product.name}</h4>
                    <div className="text-[10px] text-warmgray">
                      Qty: {item.quantity} {item.product.unit}
                    </div>
                    <div className="font-mono text-espresso text-xs font-medium">
                      ₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-warmgray">
                <span>Materials Subtotal</span>
                <span className="font-mono text-espresso">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-warmgray">
                <span>Standard GST ({settings?.taxRatePercent || 18}%)</span>
                <span className="font-mono text-espresso">₹{tax.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-warmgray">
                <span>Freight Logistics</span>
                <span className="font-mono text-espresso">
                  {shipping === 0 ? 'Complimentary' : `₹${shipping.toLocaleString('en-IN')}`}
                </span>
              </div>
              <div className="pt-3 border-t border-atelier flex justify-between items-baseline">
                <span className="font-serif text-base text-espresso">Total Due</span>
                <span className="font-serif text-2xl text-timber font-medium">
                  ₹{total.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
