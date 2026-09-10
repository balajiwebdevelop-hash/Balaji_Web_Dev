'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  FileText,
  Eye,
  Check,
  X,
  RefreshCw,
  Send,
  DollarSign,
  Clock,
  Search,
  Building2,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Calendar,
  Layers,
} from 'lucide-react';
import { AdminLayout } from '@/components/AdminLayout';
import { Quote, QuoteStatus } from '@/types';

function AdminQuotesContent() {
  const searchParams = useSearchParams();
  const highlightId = searchParams?.get('id') || searchParams?.get('quoteId') || null;

  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [quotedAmountInput, setQuotedAmountInput] = useState<number | ''>('');
  const [adminNotesInput, setAdminNotesInput] = useState('');
  const [updating, setUpdating] = useState(false);

  const openQuoteModal = (q: Quote) => {
    setSelectedQuote(q);
    setQuotedAmountInput(q.totalQuotedAmount || '');
    setAdminNotesInput(q.adminNotes || '');
  };

  const loadQuotes = async () => {
    try {
      const res = await fetch('/api/quotes', { cache: 'no-store' });
      if (res.ok) {
        const d = await res.json();
        const qts: Quote[] = d.quotes || [];
        setQuotes(qts);

        if (highlightId) {
          const match = qts.find((q) => q.id === highlightId || q.quoteNumber === highlightId);
          if (match) {
            openQuoteModal(match);
          }
        }
      }
    } catch (e) {
      console.error('Error loading quotes:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQuotes();
  }, [highlightId]);

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
          setQuotes((prev) => prev.map((item) => (item.id === selectedQuote.id ? d.quote : item)));
          setSelectedQuote(d.quote);
        }
      }
    } catch (e) {
      console.error('Error updating quote:', e);
    } finally {
      setUpdating(false);
    }
  };

  const filteredQuotes = quotes.filter((q) => {
    const matchesSearch =
      q.quoteNumber.toLowerCase().includes(search.toLowerCase()) ||
      q.customerName.toLowerCase().includes(search.toLowerCase()) ||
      q.customerEmail.toLowerCase().includes(search.toLowerCase()) ||
      q.projectType.toLowerCase().includes(search.toLowerCase()) ||
      q.projectLocation.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !statusFilter || q.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalQuotesValuation = quotes.reduce((sum, q) => sum + (q.totalQuotedAmount || 0), 0);
  const pendingOrReviewCount = quotes.filter((q) => q.status === 'Pending' || q.status === 'Under_Review').length;
  const approvedOrConvertedCount = quotes.filter(
    (q) => q.status === 'Approved' || q.status === 'Converted_To_Order'
  ).length;

  const getQuoteStatusBadgeClass = (status: QuoteStatus) => {
    switch (status) {
      case 'Approved':
      case 'Converted_To_Order':
        return 'bg-emerald-950/60 text-emerald-300 border-emerald-800/50';
      case 'Quotation_Sent':
        return 'bg-blue-950/60 text-blue-300 border-blue-800/50';
      case 'Under_Review':
        return 'bg-amber-950/60 text-amber-300 border-amber-800/50';
      case 'Rejected':
        return 'bg-red-950/60 text-red-300 border-red-800/50';
      default:
        return 'bg-[#201814] text-[#D8CEBF] border-[#3D3027]';
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#281F19] pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest text-champagne font-semibold">
                Inquiries & Estimation
              </span>
              <span className="px-2 py-0.5 bg-champagne/15 text-champagne text-[9px] uppercase tracking-wider font-bold rounded-2xs border border-champagne/30">
                Architectural Dossiers
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#FCFAF6] font-light mt-1">
              Architectural Quotes & Project Estimation
            </h1>
            <p className="text-xs text-[#A89F91] font-light">
              Custom spatial briefs, material bill-of-quantities, and price negotiation dossiers.
            </p>
          </div>
          <button
            onClick={loadQuotes}
            className="p-2.5 bg-[#1D1714] border border-[#332821] hover:border-champagne/60 text-[#FCFAF6] text-xs uppercase tracking-wider flex items-center gap-1.5 self-start rounded-xs transition-colors shadow-xs"
          >
            <RefreshCw className="w-3.5 h-3.5 text-champagne" /> Sync Quotes
          </button>
        </div>

        {/* Quotes KPI Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-[#140F0C] border border-[#241C16] p-4 rounded-xs shadow-xs space-y-1">
            <div className="flex items-center justify-between text-[10px] text-[#8E8275] uppercase tracking-wider">
              <span>Total Dossiers</span>
              <FileText className="w-3.5 h-3.5 text-champagne" />
            </div>
            <div className="font-serif text-2xl text-[#FCFAF6] font-light">{quotes.length}</div>
            <p className="text-[10px] text-[#7E7469]">Custom spatial inquiries</p>
          </div>

          <div className="bg-[#140F0C] border border-[#241C16] p-4 rounded-xs shadow-xs space-y-1">
            <div className="flex items-center justify-between text-[10px] text-[#8E8275] uppercase tracking-wider">
              <span>Under Review / Open</span>
              <Clock className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="font-serif text-2xl text-amber-400 font-light">{pendingOrReviewCount}</div>
            <p className="text-[10px] text-[#7E7469]">Awaiting estimation or pricing</p>
          </div>

          <div className="bg-[#140F0C] border border-[#241C16] p-4 rounded-xs shadow-xs space-y-1">
            <div className="flex items-center justify-between text-[10px] text-[#8E8275] uppercase tracking-wider">
              <span>Approved / Converted</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="font-serif text-2xl text-emerald-400 font-light">{approvedOrConvertedCount}</div>
            <p className="text-[10px] text-[#7E7469]">Ready for execution / converted</p>
          </div>

          <div className="bg-[#140F0C] border border-[#241C16] p-4 rounded-xs shadow-xs space-y-1">
            <div className="flex items-center justify-between text-[10px] text-[#8E8275] uppercase tracking-wider">
              <span>Pipeline Valuation</span>
              <DollarSign className="w-3.5 h-3.5 text-champagne" />
            </div>
            <div className="font-serif text-2xl text-champagne font-light truncate">
              ₹{totalQuotesValuation.toLocaleString('en-IN')}
            </div>
            <p className="text-[10px] text-[#7E7469]">Estimated quote volume</p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#1D1714] border border-[#332821] p-4 rounded-xs shadow-xs">
          <div className="sm:col-span-2 relative">
            <input
              type="text"
              placeholder="Search by quote #, client entity, location, or typology..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-2.5 pl-9 bg-[#14100D] border border-[#382D25] text-xs text-[#FCFAF6] placeholder-[#7E7469] focus:border-champagne focus:ring-1 focus:ring-champagne/40 focus:outline-hidden rounded-xs"
            />
            <Search className="w-4 h-4 text-champagne/60 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full p-2.5 bg-[#14100D] border border-[#382D25] text-xs text-[#FCFAF6] focus:border-champagne focus:ring-1 focus:ring-champagne/40 focus:outline-hidden rounded-xs"
            >
              <option value="">All Workflow Statuses ({quotes.length})</option>
              <option value="Pending">Pending Review</option>
              <option value="Under_Review">Under Technical Review</option>
              <option value="Quotation_Sent">Quotation Dispatched</option>
              <option value="Approved">Client Approved</option>
              <option value="Converted_To_Order">Converted to Order</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Mobile Quote Cards View (< md) */}
        <div className="md:hidden space-y-3">
          {loading ? (
            <div className="p-8 bg-[#1D1714] border border-[#332821] text-center text-[#A89F91] rounded-xs text-xs">
              Loading quote inbox...
            </div>
          ) : filteredQuotes.length === 0 ? (
            <div className="p-8 bg-[#1D1714] border border-[#332821] text-center text-[#7E7469] rounded-xs text-xs">
              No quote requests matching filter.
            </div>
          ) : (
            filteredQuotes.map((q) => (
              <div
                key={q.id}
                className="p-4 bg-[#140F0C] border border-[#241C16] hover:border-champagne/40 rounded-xs space-y-3 shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-mono font-semibold text-xs text-[#FCFAF6] block">{q.quoteNumber}</span>
                    <span className="text-[10px] text-[#7E7469]">{q.projectLocation}</span>
                  </div>
                  <span
                    className={`px-2 py-0.5 text-[9px] uppercase tracking-wider font-semibold border rounded-2xs ${getQuoteStatusBadgeClass(
                      q.status
                    )}`}
                  >
                    {q.status.replace(/_/g, ' ')}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs pt-1 border-t border-[#201712]">
                  <div className="truncate">
                    <span className="font-medium text-[#FCFAF6] block truncate">{q.customerName}</span>
                    <span className="text-[10px] text-[#8E8275]">
                      {q.projectType} • {q.items.length} items
                    </span>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="text-[10px] text-[#7E7469] block">Target Budget</span>
                    <span className="text-xs font-semibold text-champagne block">{q.budgetRange}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#201712] flex items-center justify-between">
                  <span className="font-serif text-sm font-medium text-champagne">
                    {q.totalQuotedAmount ? `₹${q.totalQuotedAmount.toLocaleString('en-IN')}` : 'Pending Estimate'}
                  </span>
                  <button
                    onClick={() => openQuoteModal(q)}
                    className="px-3 py-1.5 bg-[#251E1A] border border-[#3D3027] hover:border-champagne text-[#FCFAF6] rounded-xs text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5 text-champagne" />
                    <span>Review & Estimate</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Desktop Quotes Table (hidden md:block) */}
        <div className="hidden md:block bg-[#1D1714] border border-[#332821] overflow-hidden rounded-xs shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#FCFAF6] border-collapse">
              <thead>
                <tr className="bg-[#16110E] border-b border-[#281F19] text-[10px] uppercase tracking-widest text-champagne/90 font-medium">
                  <th className="p-4">Quote Ref</th>
                  <th className="p-4">Client Entity</th>
                  <th className="p-4">Project Typology</th>
                  <th className="p-4">Site Location</th>
                  <th className="p-4">Target Budget</th>
                  <th className="p-4">Quoted Amount</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#281F19]">
                {loading ? (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-[#A89F91]">
                      Loading quote inbox...
                    </td>
                  </tr>
                ) : filteredQuotes.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-[#7E7469]">
                      No quote requests matching filter.
                    </td>
                  </tr>
                ) : (
                  filteredQuotes.map((q) => (
                    <tr key={q.id} className="hover:bg-[#251E1A]/60 transition-colors">
                      <td className="p-4 font-mono font-medium text-[#FCFAF6]">{q.quoteNumber}</td>
                      <td className="p-4">
                        <span className="font-medium text-[#FCFAF6] block">{q.customerName}</span>
                        <span className="text-[10px] text-[#A89F91]">{q.customerEmail}</span>
                      </td>
                      <td className="p-4 font-serif text-sm text-[#D8CEBF]">{q.projectType}</td>
                      <td className="p-4 text-[#A89F91]">{q.projectLocation}</td>
                      <td className="p-4 text-[#D8CEBF] font-medium">{q.budgetRange}</td>
                      <td className="p-4 font-serif text-sm font-medium text-champagne">
                        {q.totalQuotedAmount ? `₹${q.totalQuotedAmount.toLocaleString('en-IN')}` : 'Evaluating'}
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-0.5 text-[10px] uppercase tracking-wider font-semibold border rounded-2xs ${getQuoteStatusBadgeClass(
                            q.status
                          )}`}
                        >
                          {q.status.replace(/_/g, ' ')}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => openQuoteModal(q)}
                          className="p-1.5 bg-[#251E1A] border border-[#3D3027] hover:border-champagne text-[#FCFAF6] rounded-xs transition-colors"
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
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-[#1D1714] border border-champagne/30 p-6 sm:p-8 space-y-6 shadow-2xl my-8 rounded-sm">
            <div className="flex justify-between items-start border-b border-[#281F19] pb-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-champagne font-medium">Estimate Dossier</span>
                <h2 className="font-serif text-2xl text-[#FCFAF6] font-normal">
                  Quote #{selectedQuote.quoteNumber}
                </h2>
                <p className="text-xs text-[#A89F91]">Received on {new Date(selectedQuote.createdAt).toLocaleString('en-IN')}</p>
              </div>
              <button onClick={() => setSelectedQuote(null)} className="p-1.5 text-[#A89F91] hover:text-[#FCFAF6] transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 p-4 bg-[#14100D] border border-[#332821] text-xs rounded-xs">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-champagne font-medium block">
                  Client Details
                </span>
                <p className="font-medium text-[#FCFAF6]">{selectedQuote.customerName}</p>
                <p className="text-[#A89F91]">{selectedQuote.customerEmail}</p>
                <p className="text-[#A89F91]">{selectedQuote.customerPhone}</p>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-champagne font-medium block">
                  Project Scope
                </span>
                <p className="text-[#FCFAF6] font-medium">{selectedQuote.projectType}</p>
                <p className="text-[#A89F91]">Site: {selectedQuote.projectLocation}</p>
                <p className="text-[#A89F91]">Timeline: {selectedQuote.estimatedTimeline}</p>
              </div>
            </div>

            {/* Line Items */}
            <div className="space-y-3">
              <h3 className="text-xs uppercase tracking-wider text-champagne font-medium">
                Materials & Sizing Requested ({selectedQuote.items.length})
              </h3>
              <div className="border border-[#332821] divide-y divide-[#281F19] text-xs rounded-xs">
                {selectedQuote.items.map((item, idx) => (
                  <div key={idx} className="p-3 space-y-1 bg-[#16110E]">
                    <div className="flex justify-between">
                      <span className="font-serif text-sm font-medium text-[#FCFAF6]">{item.productName}</span>
                      <span className="font-mono text-champagne">{item.quantity} {item.unit}</span>
                    </div>
                    {item.dimensions && <p className="text-[11px] text-[#A89F91]">Dimensions: {item.dimensions}</p>}
                    {item.notes && <p className="text-[11px] text-[#A89F91] italic">&ldquo;{item.notes}&rdquo;</p>}
                  </div>
                ))}
              </div>
            </div>

            {selectedQuote.notes && (
              <div className="p-3 bg-[#14100D] border border-[#332821] text-xs space-y-1 rounded-xs">
                <span className="text-[10px] uppercase tracking-wider text-champagne font-medium block">
                  Client Design Notes:
                </span>
                <p className="text-[#A89F91] leading-relaxed">{selectedQuote.notes}</p>
              </div>
            )}

            {/* Estimation Action Controls */}
            <div className="space-y-4 pt-2 border-t border-[#281F19] text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="uppercase tracking-wider text-champagne/90 font-medium block">
                    Calculated Quotation Amount (₹)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 450000"
                    value={quotedAmountInput}
                    onChange={(e) => setQuotedAmountInput(e.target.value ? Number(e.target.value) : '')}
                    className="w-full p-2.5 bg-[#14100D] border border-[#382D25] text-xs font-serif text-champagne text-base font-medium focus:border-champagne focus:outline-hidden rounded-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="uppercase tracking-wider text-champagne/90 font-medium block">
                    Update Quote Workflow Status
                  </label>
                  <select
                    value={selectedQuote.status}
                    onChange={(e) => handleUpdateQuote(e.target.value as QuoteStatus)}
                    disabled={updating}
                    className="w-full p-2.5 bg-[#14100D] border border-[#382D25] text-xs text-[#FCFAF6] font-medium focus:border-champagne focus:outline-hidden rounded-xs"
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
                <label className="uppercase tracking-wider text-champagne/90 font-medium block">
                  Studio Internal Notes & Quarry Coordination
                </label>
                <textarea
                  rows={2}
                  value={adminNotesInput}
                  onChange={(e) => setAdminNotesInput(e.target.value)}
                  placeholder="e.g. Quarry block #42 reserved in Verona. 3 week shipping timeline."
                  className="w-full p-2.5 bg-[#14100D] border border-[#382D25] text-xs text-[#FCFAF6] focus:border-champagne focus:outline-hidden rounded-xs"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => handleUpdateQuote(selectedQuote.status)}
                  disabled={updating}
                  className="px-6 py-2.5 bg-champagne text-[#100C0A] hover:bg-[#DAC19E] border border-champagne text-xs uppercase tracking-widest font-medium transition-all rounded-xs shadow-xs"
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

export default function AdminQuotesPage() {
  return (
    <Suspense fallback={<div className="p-16 text-center text-champagne text-xs">Loading quote dossiers...</div>}>
      <AdminQuotesContent />
    </Suspense>
  );
}
