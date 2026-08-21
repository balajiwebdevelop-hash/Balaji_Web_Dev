'use client';

import React, { useEffect, useState } from 'react';
import { FileText, Eye, Check, X, RefreshCw, Send, DollarSign, Clock } from 'lucide-react';
import { AdminLayout } from '@/components/AdminLayout';
import { Quote, QuoteStatus } from '@/types';

export default function AdminQuotesPage() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [quotedAmountInput, setQuotedAmountInput] = useState<number | ''>('');
  const [adminNotesInput, setAdminNotesInput] = useState('');
  const [updating, setUpdating] = useState(false);

  const loadQuotes = async () => {
    try {
      const res = await fetch('/api/quotes', { cache: 'no-store' });
      if (res.ok) {
        const d = await res.json();
        setQuotes(d.quotes || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQuotes();
  }, []);

  const openQuoteModal = (q: Quote) => {
    setSelectedQuote(q);
    setQuotedAmountInput(q.totalQuotedAmount || '');
    setAdminNotesInput(q.adminNotes || '');
  };

  const handleUpdateQuote = async (status: QuoteStatus) => {
    if (!selectedQuote) return;
    setUpdating(true);

    try {
      const res = await fetch(`/api/quotes/${selectedQuote.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status,
          totalQuotedAmount: quotedAmountInput !== '' ? Number(quotedAmountInput) : undefined,
          adminNotes: adminNotesInput,
        }),
      });

      if (res.ok) {
        const d = await res.json();
        if (d.quote) {
          setQuotes(quotes.map((item) => (item.id === selectedQuote.id ? d.quote : item)));
          setSelectedQuote(d.quote);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-atelier pb-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-bronze font-medium">Inquiries & Estimation</span>
            <h1 className="font-serif text-3xl sm:text-4xl text-espresso font-light">Architectural Quotes</h1>
          </div>
          <button
            onClick={loadQuotes}
            className="p-2.5 bg-surface border border-atelier hover:border-bronze text-espresso text-xs uppercase tracking-wider flex items-center gap-1.5 self-start"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Sync Quotes
          </button>
        </div>

        <div className="bg-surface border border-atelier overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-espresso border-collapse">
              <thead>
                <tr className="bg-canvas border-b border-atelier text-[10px] uppercase tracking-widest text-warmgray font-medium">
                  <th className="p-4">Quote Ref</th>
                  <th className="p-4">Client Entity</th>
                  <th className="p-4">Project Typology</th>
                  <th className="p-4">Location</th>
                  <th className="p-4">Target Budget</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-atelier/60">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-warmgray">
                      Loading quote inbox...
                    </td>
                  </tr>
                ) : quotes.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-warmgray">
                      No quote requests in record.
                    </td>
                  </tr>
                ) : (
                  quotes.map((q) => (
                    <tr key={q.id} className="hover:bg-canvas/50 transition-colors">
                      <td className="p-4 font-mono font-medium text-espresso">{q.quoteNumber}</td>
                      <td className="p-4">
                        <span className="font-medium text-espresso block">{q.customerName}</span>
                        <span className="text-[10px] text-warmgray">{q.customerEmail}</span>
                      </td>
                      <td className="p-4 font-serif text-sm">{q.projectType}</td>
                      <td className="p-4 text-warmgray">{q.projectLocation}</td>
                      <td className="p-4 text-timber font-medium">{q.budgetRange}</td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-0.5 text-[10px] uppercase tracking-wider font-medium border ${
                            q.status === 'Approved' || q.status === 'Converted_To_Order'
                              ? 'bg-green-50 text-green-800 border-green-200'
                              : q.status === 'Quotation_Sent'
                              ? 'bg-blue-50 text-blue-800 border-blue-200'
                              : 'bg-amber-50 text-amber-800 border-amber-200'
                          }`}
                        >
                          {q.status.replace(/_/g, ' ')}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => openQuoteModal(q)}
                          className="p-1.5 bg-canvas border border-atelier hover:border-bronze text-espresso"
                          title="Review & Price Quote"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Quote Review Drawer / Modal */}
      {selectedQuote && (
        <div className="fixed inset-0 z-50 bg-espresso/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-surface border border-atelier p-6 sm:p-8 space-y-6 shadow-2xl my-8">
            <div className="flex justify-between items-start border-b border-atelier pb-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-bronze font-medium">Estimate Dossier</span>
                <h2 className="font-serif text-2xl text-espresso font-normal">
                  Quote #{selectedQuote.quoteNumber}
                </h2>
                <p className="text-xs text-warmgray">Received on {new Date(selectedQuote.createdAt).toLocaleString('en-IN')}</p>
              </div>
              <button onClick={() => setSelectedQuote(null)} className="p-1.5 text-warmgray hover:text-espresso">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 p-4 bg-canvas border border-atelier text-xs">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-warmgray font-medium block">
                  Client Details
                </span>
                <p className="font-medium text-espresso">{selectedQuote.customerName}</p>
                <p className="text-warmgray">{selectedQuote.customerEmail}</p>
                <p className="text-warmgray">{selectedQuote.customerPhone}</p>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-warmgray font-medium block">
                  Project Scope
                </span>
                <p className="text-espresso font-medium">{selectedQuote.projectType}</p>
                <p className="text-warmgray">Site: {selectedQuote.projectLocation}</p>
                <p className="text-warmgray">Timeline: {selectedQuote.estimatedTimeline}</p>
              </div>
            </div>

            {/* Line Items */}
            <div className="space-y-3">
              <h3 className="text-xs uppercase tracking-wider text-espresso font-medium">
                Materials & Sizing Requested ({selectedQuote.items.length})
              </h3>
              <div className="border border-atelier divide-y divide-atelier/60 text-xs">
                {selectedQuote.items.map((item, idx) => (
                  <div key={idx} className="p-3 space-y-1">
                    <div className="flex justify-between">
                      <span className="font-serif text-sm font-medium text-espresso">{item.productName}</span>
                      <span className="font-mono text-timber">{item.quantity} {item.unit}</span>
                    </div>
                    {item.dimensions && <p className="text-[11px] text-warmgray">Dimensions: {item.dimensions}</p>}
                    {item.notes && <p className="text-[11px] text-warmgray italic">&ldquo;{item.notes}&rdquo;</p>}
                  </div>
                ))}
              </div>
            </div>

            {selectedQuote.notes && (
              <div className="p-3 bg-canvas border border-atelier text-xs space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-warmgray font-medium block">
                  Client Design Notes:
                </span>
                <p className="text-warmgray leading-relaxed">{selectedQuote.notes}</p>
              </div>
            )}

            {/* Estimation Action Controls */}
            <div className="space-y-4 pt-2 border-t border-atelier text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="uppercase tracking-wider text-warmgray font-medium block">
                    Calculated Quotation Amount (₹)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 450000"
                    value={quotedAmountInput}
                    onChange={(e) => setQuotedAmountInput(e.target.value ? Number(e.target.value) : '')}
                    className="w-full p-2.5 bg-canvas border border-atelier text-xs font-serif text-timber text-base font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="uppercase tracking-wider text-warmgray font-medium block">
                    Update Quote Workflow Status
                  </label>
                  <select
                    value={selectedQuote.status}
                    onChange={(e) => handleUpdateQuote(e.target.value as QuoteStatus)}
                    disabled={updating}
                    className="w-full p-2.5 bg-canvas border border-atelier text-xs font-medium"
                  >
                    <option value="Pending">Pending Review</option>
                    <option value="Under_Review">Under Technical Review</option>
                    <option value="Quotation_Sent">Quotation Dispatched to Client</option>
                    <option value="Approved">Client Approved</option>
                    <option value="Converted_To_Order">Converted to Confirmed Order</option>
                    <option value="Rejected">Rejected / Infeasible</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="uppercase tracking-wider text-warmgray font-medium block">
                  Studio Internal Notes & Quarry Coordination
                </label>
                <textarea
                  rows={2}
                  value={adminNotesInput}
                  onChange={(e) => setAdminNotesInput(e.target.value)}
                  placeholder="e.g. Quarry block #42 reserved in Verona. 3 week shipping timeline."
                  className="w-full p-2.5 bg-canvas border border-atelier text-xs"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => handleUpdateQuote(selectedQuote.status)}
                  disabled={updating}
                  className="px-6 py-2.5 btn-luxury-dark text-xs uppercase tracking-widest font-medium"
                >
                  {updating ? 'Saving...' : 'Save Estimate & Notes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
