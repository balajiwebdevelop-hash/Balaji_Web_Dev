'use client';

import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, CheckCircle2, ArrowRight } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Studio Consultation');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          subject,
          message,
          source: 'Studio Contact Page',
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSent(true);
      } else {
        setError(data.error || 'Failed to submit inquiry.');
      }
    } catch (err: any) {
      setError(err.message || 'Network error.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      <div className="space-y-3 border-b border-atelier pb-6 max-w-3xl">
        <span className="text-xs uppercase tracking-widest text-bronze font-medium">Studio Engagement</span>
        <h1 className="font-serif text-4xl sm:text-5xl text-espresso font-light">
          Contact Balaji Atelier
        </h1>
        <p className="text-sm text-warmgray font-light leading-relaxed">
          Schedule a private material viewing at our Mumbai design gallery or discuss turnkey architectural commissions with our principal team.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left: Contact Form */}
        <div className="lg:col-span-7 bg-surface border border-atelier p-6 sm:p-10 space-y-6">
          {sent ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-14 h-14 rounded-full bg-champagne/20 text-timber flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl text-espresso">Inquiry Received</h3>
              <p className="text-xs sm:text-sm text-warmgray font-light max-w-sm mx-auto">
                Thank you for contacting Balaji Atelier. Our studio concierge will contact you within 24 hours.
              </p>
              <button
                onClick={() => setSent(false)}
                className="mt-4 px-6 py-2 btn-luxury-dark text-xs uppercase tracking-widest"
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h2 className="font-serif text-2xl text-espresso">Send a Direct Note</h2>

              {error && (
                <div className="p-3 bg-red-50 text-red-800 text-xs border border-red-200">{error}</div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-warmgray font-medium">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Vikas Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-warmgray font-medium">
                    Phone / Mobile *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98200 XXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-3 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-warmgray font-medium">
                    Subject / Area of Interest
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full p-3 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden text-xs"
                  >
                    <option>Studio Consultation</option>
                    <option>Turnkey Interior Project</option>
                    <option>Direct Quarry Stone Sourcing</option>
                    <option>Bespoke Millwork & Lighting</option>
                    <option>Press & Monograph Inquiries</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-warmgray font-medium">
                  Message / Project Scope *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Share details regarding your site location, square footage, design ambitions, or required material lots..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-3 bg-canvas border border-atelier focus:border-bronze focus:outline-hidden text-xs leading-relaxed"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 btn-luxury-dark text-xs uppercase tracking-widest flex items-center justify-center gap-2 font-medium"
              >
                {submitting ? 'Transmitting Note...' : 'Dispatch Message'} <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>

        {/* Right: Studio Location & Logistics */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-surface border border-atelier p-6 sm:p-8 space-y-6">
            <h3 className="font-serif text-2xl text-espresso border-b border-atelier pb-4">
              Studio & Material Gallery
            </h3>

            <div className="space-y-5 text-xs text-warmgray">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-bronze mt-0.5 flex-shrink-0" />
                <div className="space-y-0.5">
                  <span className="font-medium text-espresso block">Principal Gallery</span>
                  <p>Studio 04, The Design Quarter, Senapati Bapat Marg</p>
                  <p>Lower Parel, Mumbai, Maharashtra 400013</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-bronze mt-0.5 flex-shrink-0" />
                <div className="space-y-0.5">
                  <span className="font-medium text-espresso block">Direct Line</span>
                  <p>+91 (022) 8490-2100</p>
                  <p>+91 98200 44551 (WhatsApp Business)</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-bronze mt-0.5 flex-shrink-0" />
                <div className="space-y-0.5">
                  <span className="font-medium text-espresso block">Electronic Correspondence</span>
                  <p>atelier@balaji-interior.com</p>
                  <p>materials@balaji-interior.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-bronze mt-0.5 flex-shrink-0" />
                <div className="space-y-0.5">
                  <span className="font-medium text-espresso block">Gallery Hours</span>
                  <p>Monday – Saturday: 10:00 AM – 7:30 PM</p>
                  <p>Sunday: By Private Prior Appointment Only</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
