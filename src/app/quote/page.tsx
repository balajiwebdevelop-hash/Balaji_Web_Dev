'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  FileText,
  Plus,
  Trash2,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Building2,
  Layers,
} from 'lucide-react';
import { QuoteItem, UnitType } from '@/types';

function QuoteForm() {
  const searchParams = useSearchParams();
  const preselectedService = searchParams?.get('service') || '';
  const preselectedProduct = searchParams?.get('product') || '';

  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [projectType, setProjectType] = useState('Residential Interiors & Villa');
  const [projectLocation, setProjectLocation] = useState('Mumbai / Alibaug');
  const [estimatedTimeline, setEstimatedTimeline] = useState('Immediate (1-3 Months)');
  const [budgetRange, setBudgetRange] = useState('₹50 Lakhs - ₹1.5 Cr');
  const [notes, setNotes] = useState('');

  const [items, setItems] = useState<
    {
      productName: string;
      dimensions: string;
      quantity: number;
      unit: UnitType;
      notes: string;
    }[]
  >([
    {
      productName: 'Vein-Cut Travertine / Custom Slabs',
      dimensions: 'Custom living area cut-to-size',
      quantity: 500,
      unit: 'sq ft',
      notes: 'Honed finish for main salon',
    },
  ]);

  const [submitting, setSubmitting] = useState(false);
  const [submittedQuote, setSubmittedQuote] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const addItemRow = () => {
    setItems([
      ...items,
      {
        productName: '',
        dimensions: '',
        quantity: 100,
        unit: 'sq ft',
        notes: '',
      },
    ]);
  };

  const removeItemRow = (idx: number) => {
    setItems(items.filter((_, i) => i !== idx));
  };

  const updateItem = (idx: number, field: string, value: any) => {
    const next = [...items];
    (next[idx] as any)[field] = value;
    setItems(next);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerEmail || !customerPhone) {
      setError('Please complete your name, email, and phone number.');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const payload = {
        customerName,
        customerEmail,
        customerPhone,
        projectType,
        projectLocation,
        estimatedTimeline,
        budgetRange,
        notes,
        items,
      };

      const res = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmittedQuote(data.quote);
      } else {
        setError(data.error || 'Failed to submit quote request. Please try again.');
      }
    } catch (err: any) {
      setError(err.message || 'Network error.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submittedQuote) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-8">
        <div className="bg-surface border border-atelier p-8 sm:p-12 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-champagne/20 text-timber flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-bronze font-medium">
              Quotation Request Received
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-espresso font-light">
              Formal Estimate Dispatched to Review
            </h1>
            <p className="text-xs sm:text-sm text-warmgray font-light max-w-md mx-auto">
              Your inquiry has been assigned to our senior architectural estimation desk. A comprehensive material specification and pricing schedule will be shared within 24 hours.
            </p>
          </div>

          <div className="bg-canvas p-6 border border-atelier max-w-md mx-auto text-left space-y-3 text-xs">
            <div className="flex justify-between border-b border-atelier pb-2">
              <span className="text-warmgray">Quote Reference:</span>
              <span className="font-mono font-medium text-espresso">{submittedQuote.quoteNumber}</span>
            </div>
            <div className="flex justify-between border-b border-atelier pb-2">
              <span className="text-warmgray">Project Classification:</span>
              <span className="text-espresso font-medium">{submittedQuote.projectType}</span>
            </div>
            <div className="flex justify-between border-b border-atelier pb-2">
              <span className="text-warmgray">Client Contact:</span>
              <span className="text-espresso">{submittedQuote.customerName} ({submittedQuote.customerPhone})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-warmgray">Status:</span>
              <span className="text-bronze font-medium">Pending Studio Review</span>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/materials"
              className="px-8 py-3.5 btn-luxury-dark text-xs uppercase tracking-widest"
            >
              Explore Materials Library
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

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      <div className="space-y-3 border-b border-atelier pb-6">
        <span className="text-xs uppercase tracking-widest text-bronze font-medium">Custom Projects & Wholesale</span>
        <h1 className="font-serif text-3xl sm:text-5xl text-espresso font-light">
          Architectural Quote & Material Estimation
        </h1>
        <p className="text-sm text-warmgray font-light max-w-2xl">
          For large-scale residences, turnkey interior projects, or custom cut-to-size travertine and veneer batches, submit your project specifications below.
        </p>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-800 text-xs">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-10">
        {/* Client & Project Core Info */}
        <div className="bg-surface border border-atelier p-6 sm:p-8 space-y-6">
          <h2 className="font-serif text-2xl text-espresso border-b border-atelier pb-4">
            1. Project & Client Profile
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-warmgray font-medium">
                Client / Architecture Firm *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Vikas Sharma / Studio Design"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full p-3 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-warmgray font-medium">
                Official Email Address *
              </label>
              <input
                type="email"
                required
                placeholder="client@studio.com"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="w-full p-3 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-warmgray font-medium">
                Direct Phone / WhatsApp *
              </label>
              <input
                type="tel"
                required
                placeholder="+91 98200 XXXXX"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full p-3 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-warmgray font-medium">
                Project Classification
              </label>
              <select
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
                className="w-full p-3 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden text-xs"
              >
                <option>Residential Interiors & Villa</option>
                <option>Penthouse & Sky Estate</option>
                <option>Commercial Headquarters & Studio</option>
                <option>Hospitality & Fine Dining</option>
                <option>Material Sourcing Only (Direct Quarry)</option>
                <option>Bespoke Millwork & Joinery</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-warmgray font-medium">
                Site Location (City / Region)
              </label>
              <input
                type="text"
                placeholder="e.g. Worli Seaface, Mumbai"
                value={projectLocation}
                onChange={(e) => setProjectLocation(e.target.value)}
                className="w-full p-3 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-warmgray font-medium">
                Target Timeline
              </label>
              <select
                value={estimatedTimeline}
                onChange={(e) => setEstimatedTimeline(e.target.value)}
                className="w-full p-3 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden text-xs"
              >
                <option>Immediate (1-3 Months)</option>
                <option>Q3/Q4 2026</option>
                <option>Planning Phase (6+ Months)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Specified Materials List */}
        <div className="bg-surface border border-atelier p-6 sm:p-8 space-y-6">
          <div className="flex justify-between items-center border-b border-atelier pb-4">
            <div>
              <h2 className="font-serif text-2xl text-espresso">2. Material & Scope Specifications</h2>
              <p className="text-xs text-warmgray font-light">Add estimated areas, finishes, or custom requirements.</p>
            </div>
            <button
              type="button"
              onClick={addItemRow}
              className="px-4 py-2 border border-atelier hover:border-bronze text-xs uppercase tracking-widest text-espresso inline-flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" /> Add Material Line
            </button>
          </div>

          <div className="space-y-4">
            {items.map((item, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 sm:grid-cols-12 gap-3 p-4 bg-canvas border border-atelier items-center"
              >
                <div className="sm:col-span-4 space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-warmgray font-medium">
                    Material / Product Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Romano Classico Travertine"
                    value={item.productName}
                    onChange={(e) => updateItem(idx, 'productName', e.target.value)}
                    className="w-full p-2 bg-surface border border-atelier text-xs"
                  />
                </div>

                <div className="sm:col-span-3 space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-warmgray font-medium">
                    Dimensions / Cut Spec
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 20mm Honed / 1200x600"
                    value={item.dimensions}
                    onChange={(e) => updateItem(idx, 'dimensions', e.target.value)}
                    className="w-full p-2 bg-surface border border-atelier text-xs"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-warmgray font-medium">
                    Est. Quantity
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateItem(idx, 'quantity', parseInt(e.target.value) || 1)}
                    className="w-full p-2 bg-surface border border-atelier text-xs"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-warmgray font-medium">
                    Unit
                  </label>
                  <select
                    value={item.unit}
                    onChange={(e) => updateItem(idx, 'unit', e.target.value)}
                    className="w-full p-2 bg-surface border border-atelier text-xs"
                  >
                    <option>sq ft</option>
                    <option>sq m</option>
                    <option>sheet</option>
                    <option>piece</option>
                    <option>box</option>
                    <option>meter</option>
                    <option>roll</option>
                    <option>set</option>
                  </select>
                </div>

                <div className="sm:col-span-1 flex justify-end pt-4 sm:pt-0">
                  {items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItemRow(idx)}
                      className="p-2 text-warmgray hover:text-red-700"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-1.5 pt-2">
            <label className="text-xs uppercase tracking-wider text-warmgray font-medium">
              Architectural Drawings, BIM Notes, or Site Details
            </label>
            <textarea
              rows={4}
              placeholder="Provide context regarding slab bookmatching, site elevator constraints, floor-to-ceiling heights, or specific European quarry block preferences..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-3 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden text-xs leading-relaxed"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full py-4 btn-luxury-dark text-xs uppercase tracking-widest flex items-center justify-center gap-2 font-medium"
        >
          {submitting ? 'Transmitting to Estimation Desk...' : 'Submit Architectural Quote Request'}
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}

export default function QuotePage() {
  return (
    <Suspense fallback={<div className="p-16 text-center text-warmgray text-xs">Loading quote module...</div>}>
      <QuoteForm />
    </Suspense>
  );
}
