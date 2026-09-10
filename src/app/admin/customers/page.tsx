'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Users,
  Search,
  ShoppingBag,
  Mail,
  Phone,
  MapPin,
  FileText,
  Building2,
  ChevronRight,
  X,
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  CreditCard,
  Briefcase,
  Calendar,
} from 'lucide-react';
import { AdminLayout } from '@/components/AdminLayout';
import { Order, Quote } from '@/types';

interface AggregatedCustomer {
  email: string;
  name: string;
  phone: string;
  city: string;
  state?: string;
  orders: Order[];
  quotes: Quote[];
  orderCount: number;
  quoteCount: number;
  totalSpend: number;
  totalQuoteValue: number;
  lastActivityDate: string;
  clientType: 'Architectural Practice' | 'Interior Studio' | 'Property Developer' | 'Commercial Entity' | 'Private Client';
}

function AdminCustomersContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams?.get('search') || searchParams?.get('id') || '';

  const [customers, setCustomers] = useState<AggregatedCustomer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState<'ALL' | 'BUYERS' | 'QUOTES' | 'HIGH_VALUE'>('ALL');
  const [selectedCustomer, setSelectedCustomer] = useState<AggregatedCustomer | null>(null);

  useEffect(() => {
    if (initialQuery) {
      setSearch(initialQuery);
    }
  }, [initialQuery]);

  useEffect(() => {
    async function loadCustomers() {
      try {
        const [ordersRes, quotesRes] = await Promise.all([
          fetch('/api/orders', { cache: 'no-store' }).catch(() => null),
          fetch('/api/quotes', { cache: 'no-store' }).catch(() => null),
        ]);

        let orders: Order[] = [];
        let quotes: Quote[] = [];

        if (ordersRes && ordersRes.ok) {
          const d = await ordersRes.json();
          orders = d.orders || [];
        }

        if (quotesRes && quotesRes.ok) {
          const qd = await quotesRes.json();
          quotes = qd.quotes || [];
        }

        const map = new Map<string, AggregatedCustomer>();

        // 1. Process Orders
        orders.forEach((o) => {
          const key = (o.customerEmail || '').toLowerCase().trim();
          if (!key) return;

          const existing = map.get(key);
          const orderDate = o.createdAt;

          if (!existing) {
            // Infer client typology
            let clientType: AggregatedCustomer['clientType'] = 'Private Client';
            const lowerName = (o.customerName || '').toLowerCase();
            if (lowerName.includes('ar.') || lowerName.includes('architect') || lowerName.includes('atelier')) {
              clientType = 'Architectural Practice';
            } else if (lowerName.includes('studio') || lowerName.includes('interior') || lowerName.includes('design')) {
              clientType = 'Interior Studio';
            } else if (lowerName.includes('developer') || lowerName.includes('estates') || lowerName.includes('habitat')) {
              clientType = 'Property Developer';
            } else if (lowerName.includes('resort') || lowerName.includes('hotel') || lowerName.includes('cafe')) {
              clientType = 'Commercial Entity';
            }

            map.set(key, {
              email: o.customerEmail,
              name: o.customerName,
              phone: o.customerPhone || 'N/A',
              city: o.shippingAddress?.city || 'Guwahati',
              state: o.shippingAddress?.state || 'Assam',
              orders: [o],
              quotes: [],
              orderCount: 1,
              quoteCount: 0,
              totalSpend: o.totalAmount || 0,
              totalQuoteValue: 0,
              lastActivityDate: orderDate,
              clientType,
            });
          } else {
            existing.orders.push(o);
            existing.orderCount += 1;
            existing.totalSpend += o.totalAmount || 0;
            if (new Date(orderDate) > new Date(existing.lastActivityDate)) {
              existing.lastActivityDate = orderDate;
            }
            if (o.shippingAddress?.city && (!existing.city || existing.city === 'Guwahati')) {
              existing.city = o.shippingAddress.city;
            }
          }
        });

        // 2. Process Quotes
        quotes.forEach((q) => {
          const key = (q.customerEmail || '').toLowerCase().trim();
          if (!key) return;

          const existing = map.get(key);
          const quoteDate = q.createdAt;

          if (!existing) {
            let clientType: AggregatedCustomer['clientType'] = 'Private Client';
            const lowerName = (q.customerName || '').toLowerCase();
            const lowerType = (q.projectType || '').toLowerCase();

            if (lowerName.includes('ar.') || lowerName.includes('architect') || lowerType.includes('architecture')) {
              clientType = 'Architectural Practice';
            } else if (lowerName.includes('studio') || lowerType.includes('interior')) {
              clientType = 'Interior Studio';
            } else if (lowerType.includes('hospitality') || lowerName.includes('resort')) {
              clientType = 'Commercial Entity';
            } else if (lowerType.includes('villa') || lowerType.includes('estate')) {
              clientType = 'Property Developer';
            }

            map.set(key, {
              email: q.customerEmail,
              name: q.customerName,
              phone: q.customerPhone || 'N/A',
              city: q.projectLocation ? q.projectLocation.split(',')[0].trim() : 'Guwahati',
              state: 'Assam',
              orders: [],
              quotes: [q],
              orderCount: 0,
              quoteCount: 1,
              totalSpend: 0,
              totalQuoteValue: q.totalQuotedAmount || 0,
              lastActivityDate: quoteDate,
              clientType,
            });
          } else {
            existing.quotes.push(q);
            existing.quoteCount += 1;
            existing.totalQuoteValue += q.totalQuotedAmount || 0;
            if (new Date(quoteDate) > new Date(existing.lastActivityDate)) {
              existing.lastActivityDate = quoteDate;
            }
          }
        });

        // Sort by total spend descending, then by last activity
        const sorted = Array.from(map.values()).sort((a, b) => {
          if (b.totalSpend !== a.totalSpend) return b.totalSpend - a.totalSpend;
          return new Date(b.lastActivityDate).getTime() - new Date(a.lastActivityDate).getTime();
        });

        setCustomers(sorted);
      } catch (e) {
        console.error('Error loading customers:', e);
      } finally {
        setLoading(false);
      }
    }

    loadCustomers();
  }, []);

  const filtered = customers.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.city.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.toLowerCase().includes(search.toLowerCase()) ||
      c.clientType.toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;

    if (activeTab === 'BUYERS') return c.orderCount > 0;
    if (activeTab === 'QUOTES') return c.quoteCount > 0;
    if (activeTab === 'HIGH_VALUE') return c.totalSpend >= 100000;

    return true;
  });

  const totalSpendSum = customers.reduce((acc, c) => acc + c.totalSpend, 0);
  const activeBuyersCount = customers.filter((c) => c.orderCount > 0).length;
  const quotingClientsCount = customers.filter((c) => c.quoteCount > 0).length;

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#281F19] pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest text-champagne font-semibold">
                Client Relationship Management
              </span>
              <span className="px-2 py-0.5 bg-champagne/15 text-champagne text-[9px] uppercase tracking-wider font-bold rounded-2xs border border-champagne/30">
                Verified Directory
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#FCFAF6] font-light mt-1">
              Client & Patron Directory
            </h1>
            <p className="text-xs text-[#A89F91] font-light">
              Architectural practices, interior studios, developers, and private estate patrons across India.
            </p>
          </div>

          <div className="text-xs text-[#A89F91] flex items-center gap-2 self-start sm:self-auto">
            <span>Total Directory Entities:</span>
            <strong className="text-champagne font-serif text-base">{customers.length}</strong>
          </div>
        </div>

        {/* Executive Client KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-[#140F0C] border border-[#241C16] p-4 rounded-xs shadow-xs space-y-1">
            <div className="flex items-center justify-between text-[10px] text-[#8E8275] uppercase tracking-wider">
              <span>Total Clients</span>
              <Users className="w-3.5 h-3.5 text-champagne" />
            </div>
            <div className="font-serif text-2xl text-[#FCFAF6] font-light">{customers.length}</div>
            <p className="text-[10px] text-[#7E7469]">Registered corporate & private accounts</p>
          </div>

          <div className="bg-[#140F0C] border border-[#241C16] p-4 rounded-xs shadow-xs space-y-1">
            <div className="flex items-center justify-between text-[10px] text-[#8E8275] uppercase tracking-wider">
              <span>Active Buyers</span>
              <ShoppingBag className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="font-serif text-2xl text-emerald-400 font-light">{activeBuyersCount}</div>
            <p className="text-[10px] text-[#7E7469]">With confirmed material orders</p>
          </div>

          <div className="bg-[#140F0C] border border-[#241C16] p-4 rounded-xs space-y-1">
            <div className="flex items-center justify-between text-[10px] text-[#8E8275] uppercase tracking-wider">
              <span>Inquiry Dossiers</span>
              <FileText className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="font-serif text-2xl text-amber-400 font-light">{quotingClientsCount}</div>
            <p className="text-[10px] text-[#7E7469]">Active custom architectural quotes</p>
          </div>

          <div className="bg-[#140F0C] border border-[#241C16] p-4 rounded-xs shadow-xs space-y-1">
            <div className="flex items-center justify-between text-[10px] text-[#8E8275] uppercase tracking-wider">
              <span>Cumulative Lifetime Spend</span>
              <TrendingUp className="w-3.5 h-3.5 text-champagne" />
            </div>
            <div className="font-serif text-2xl text-champagne font-light truncate">
              ₹{totalSpendSum.toLocaleString('en-IN')}
            </div>
            <p className="text-[10px] text-[#7E7469]">Across all material orders</p>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search by client name, email, city, or typology..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-2.5 pl-9 bg-[#1D1714] border border-[#332821] text-xs text-[#FCFAF6] placeholder-[#7E7469] focus:border-champagne focus:ring-1 focus:ring-champagne/40 focus:outline-hidden rounded-xs shadow-xs"
            />
            <Search className="w-4 h-4 text-champagne/60 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center bg-[#140F0C] border border-[#241C16] rounded-xs p-1 self-start sm:self-auto overflow-x-auto max-w-full">
            <button
              onClick={() => setActiveTab('ALL')}
              className={`px-3 py-1 text-[10px] uppercase tracking-wider font-semibold rounded-2xs transition-all whitespace-nowrap ${
                activeTab === 'ALL'
                  ? 'bg-champagne text-[#100C0A] shadow-xs'
                  : 'text-[#8E8275] hover:text-[#FCFAF6]'
              }`}
            >
              All Clients ({customers.length})
            </button>
            <button
              onClick={() => setActiveTab('BUYERS')}
              className={`px-3 py-1 text-[10px] uppercase tracking-wider font-semibold rounded-2xs transition-all whitespace-nowrap ${
                activeTab === 'BUYERS'
                  ? 'bg-champagne text-[#100C0A] shadow-xs'
                  : 'text-[#8E8275] hover:text-[#FCFAF6]'
              }`}
            >
              Buyers ({activeBuyersCount})
            </button>
            <button
              onClick={() => setActiveTab('QUOTES')}
              className={`px-3 py-1 text-[10px] uppercase tracking-wider font-semibold rounded-2xs transition-all whitespace-nowrap ${
                activeTab === 'QUOTES'
                  ? 'bg-champagne text-[#100C0A] shadow-xs'
                  : 'text-[#8E8275] hover:text-[#FCFAF6]'
              }`}
            >
              Quotes ({quotingClientsCount})
            </button>
            <button
              onClick={() => setActiveTab('HIGH_VALUE')}
              className={`px-3 py-1 text-[10px] uppercase tracking-wider font-semibold rounded-2xs transition-all whitespace-nowrap ${
                activeTab === 'HIGH_VALUE'
                  ? 'bg-champagne text-[#100C0A] shadow-xs'
                  : 'text-[#8E8275] hover:text-[#FCFAF6]'
              }`}
            >
              High Value (&gt; ₹1L)
            </button>
          </div>
        </div>

        {/* Mobile Cards View (< md) */}
        <div className="md:hidden space-y-3">
          {loading ? (
            <div className="p-8 bg-[#1D1714] border border-[#332821] text-center text-[#A89F91] rounded-xs text-xs">
              Loading client records...
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-8 bg-[#1D1714] border border-[#332821] text-center text-[#7E7469] rounded-xs text-xs">
              No client records matching filter.
            </div>
          ) : (
            filtered.map((c) => (
              <div
                key={c.email}
                onClick={() => setSelectedCustomer(c)}
                className="p-4 bg-[#140F0C] border border-[#241C16] hover:border-champagne/40 rounded-xs space-y-3 shadow-xs cursor-pointer transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-[#FCFAF6] text-sm">{c.name}</span>
                    </div>
                    <span className="text-[10px] text-champagne/80 font-medium block">
                      {c.clientType}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 bg-[#1F1713] border border-[#332821] text-[10px] text-[#A89F91] rounded-2xs flex items-center gap-1">
                    <MapPin className="w-2.5 h-2.5 text-champagne" /> {c.city}
                  </span>
                </div>

                <div className="text-[11px] text-[#A89F91] space-y-0.5">
                  <div className="flex items-center gap-1.5 truncate">
                    <Mail className="w-3 h-3 text-champagne/70 flex-shrink-0" />
                    <span className="truncate">{c.email}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3 h-3 text-champagne/70 flex-shrink-0" />
                    <span>{c.phone}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#201712] text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-[#7E7469]">
                      Orders: <strong className="text-[#FCFAF6] font-mono">{c.orderCount}</strong>
                    </span>
                    <span className="text-[10px] text-[#7E7469]">•</span>
                    <span className="text-[10px] text-[#7E7469]">
                      Quotes: <strong className="text-[#FCFAF6] font-mono">{c.quoteCount}</strong>
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-serif text-sm font-semibold text-champagne">
                      ₹{c.totalSpend.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Desktop Customers Table (hidden md:block) */}
        <div className="hidden md:block bg-[#1D1714] border border-[#332821] overflow-hidden rounded-xs shadow-xs">
          <table className="w-full text-left text-xs text-[#FCFAF6] border-collapse">
            <thead>
              <tr className="bg-[#16110E] border-b border-[#281F19] text-[10px] uppercase tracking-widest text-champagne/90 font-medium">
                <th className="p-4">Client Entity</th>
                <th className="p-4">Typology</th>
                <th className="p-4">Direct Contact</th>
                <th className="p-4">Base Location</th>
                <th className="p-4 text-center">Orders</th>
                <th className="p-4 text-center">Quotes</th>
                <th className="p-4">Lifetime Spend</th>
                <th className="p-4 text-right">Dossier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#281F19]">
              {loading ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-[#A89F91]">
                    Loading client records...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-[#7E7469]">
                    No client records found.
                  </td>
                </tr>
              ) : (
                filtered.map((c) => (
                  <tr
                    key={c.email}
                    onClick={() => setSelectedCustomer(c)}
                    className="hover:bg-[#251E1A]/60 transition-colors cursor-pointer group"
                  >
                    <td className="p-4">
                      <div className="font-medium text-[#FCFAF6] group-hover:text-champagne transition-colors">
                        {c.name}
                      </div>
                      <div className="text-[10px] text-[#7E7469] truncate">{c.email}</div>
                    </td>

                    <td className="p-4">
                      <span className="px-2 py-0.5 bg-[#140F0C] border border-[#2B211A] text-[9px] uppercase tracking-wider text-[#D8CEBF] rounded-2xs font-medium">
                        {c.clientType}
                      </span>
                    </td>

                    <td className="p-4">
                      <div className="space-y-0.5 text-[11px] text-[#A89F91]">
                        <span className="flex items-center gap-1.5 font-mono">
                          <Phone className="w-3 h-3 text-champagne/70" /> {c.phone}
                        </span>
                      </div>
                    </td>

                    <td className="p-4">
                      <span className="flex items-center gap-1.5 text-[#D8CEBF]">
                        <MapPin className="w-3 h-3 text-champagne/60" /> {c.city}, {c.state || 'Assam'}
                      </span>
                    </td>

                    <td className="p-4 text-center">
                      <span className="px-2 py-0.5 bg-[#14100D] border border-[#332821] text-[10px] font-mono text-champagne rounded-2xs">
                        {c.orderCount}
                      </span>
                    </td>

                    <td className="p-4 text-center">
                      <span className="px-2 py-0.5 bg-[#14100D] border border-[#332821] text-[10px] font-mono text-[#D8CEBF] rounded-2xs">
                        {c.quoteCount}
                      </span>
                    </td>

                    <td className="p-4 font-serif text-sm font-medium text-champagne">
                      ₹{c.totalSpend.toLocaleString('en-IN')}
                    </td>

                    <td className="p-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCustomer(c);
                        }}
                        className="px-2.5 py-1 bg-[#251E1A] border border-[#3D3027] hover:border-champagne text-[#FCFAF6] rounded-xs text-[11px] flex items-center gap-1 ml-auto transition-colors"
                      >
                        <span>View</span>
                        <ChevronRight className="w-3 h-3 text-champagne" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Detail Drawer / Dossier Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-3xl bg-[#1D1714] border border-champagne/30 p-6 sm:p-8 space-y-6 shadow-2xl my-8 rounded-sm animate-fade-in">
            {/* Modal Header */}
            <div className="flex justify-between items-start border-b border-[#281F19] pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-widest text-champagne font-semibold">
                    Client Relationship Dossier
                  </span>
                  <span className="px-2 py-0.5 bg-champagne/15 text-champagne text-[9px] uppercase tracking-wider font-bold rounded-2xs border border-champagne/30">
                    {selectedCustomer.clientType}
                  </span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#FCFAF6] font-light mt-1">
                  {selectedCustomer.name}
                </h2>
                <div className="flex flex-wrap items-center gap-3 text-xs text-[#A89F91] mt-1">
                  <span className="flex items-center gap-1">
                    <Mail className="w-3 h-3 text-champagne" /> {selectedCustomer.email}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Phone className="w-3 h-3 text-champagne" /> {selectedCustomer.phone}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-champagne" /> {selectedCustomer.city}, {selectedCustomer.state || 'Assam'}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="p-1.5 text-[#A89F91] hover:text-[#FCFAF6] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Financial & Engagement Summary Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-[#140F0C] border border-[#241C16] rounded-xs space-y-1">
                <span className="text-[10px] text-[#8E8275] uppercase block">Lifetime Spend</span>
                <span className="font-serif text-lg text-champagne font-medium">
                  ₹{selectedCustomer.totalSpend.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="p-3 bg-[#140F0C] border border-[#241C16] rounded-xs space-y-1">
                <span className="text-[10px] text-[#8E8275] uppercase block">Orders Placed</span>
                <span className="font-serif text-lg text-[#FCFAF6] font-medium">
                  {selectedCustomer.orderCount}
                </span>
              </div>

              <div className="p-3 bg-[#140F0C] border border-[#241C16] rounded-xs space-y-1">
                <span className="text-[10px] text-[#8E8275] uppercase block">Quote Inquiries</span>
                <span className="font-serif text-lg text-[#FCFAF6] font-medium">
                  {selectedCustomer.quoteCount}
                </span>
              </div>

              <div className="p-3 bg-[#140F0C] border border-[#241C16] rounded-xs space-y-1">
                <span className="text-[10px] text-[#8E8275] uppercase block">Pipeline Valuation</span>
                <span className="font-serif text-lg text-amber-400 font-medium">
                  ₹{selectedCustomer.totalQuoteValue.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Linked Orders Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-[#241C16] pb-2">
                <h3 className="text-xs uppercase tracking-wider text-champagne font-semibold flex items-center gap-1.5">
                  <ShoppingBag className="w-3.5 h-3.5 text-champagne" />
                  <span>Material Orders ({selectedCustomer.orders.length})</span>
                </h3>
              </div>

              {selectedCustomer.orders.length === 0 ? (
                <p className="text-xs text-[#7E7469] py-3 italic">No direct material orders placed yet.</p>
              ) : (
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {selectedCustomer.orders.map((ord) => (
                    <div
                      key={ord.id}
                      className="p-3 bg-[#140F0C] border border-[#281F19] rounded-xs flex items-center justify-between text-xs"
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-semibold text-[#FCFAF6]">#{ord.orderNumber}</span>
                          <span
                            className={`px-1.5 py-0.2 text-[9px] uppercase tracking-wider font-semibold rounded-2xs border ${
                              ord.orderStatus === 'Delivered'
                                ? 'bg-emerald-950/60 text-emerald-400 border-emerald-800/40'
                                : ord.orderStatus === 'Shipped'
                                ? 'bg-blue-950/60 text-blue-400 border-blue-800/40'
                                : 'bg-amber-950/60 text-amber-400 border-amber-800/40'
                            }`}
                          >
                            {ord.orderStatus}
                          </span>
                          <span
                            className={`px-1.5 py-0.2 text-[9px] uppercase tracking-wider font-semibold rounded-2xs border ${
                              ord.paymentStatus === 'Paid'
                                ? 'bg-emerald-950/40 text-emerald-300 border-emerald-800/40'
                                : 'bg-amber-950/40 text-amber-300 border-amber-800/40'
                            }`}
                          >
                            {ord.paymentStatus}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#8E8275]">
                          {new Date(ord.createdAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}{' '}
                          • {ord.items.length} material items
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="font-serif font-medium text-champagne text-sm">
                          ₹{ord.totalAmount.toLocaleString('en-IN')}
                        </span>
                        <Link
                          href={`/admin/orders?id=${ord.id}`}
                          className="p-1 bg-[#251E1A] hover:border-champagne border border-[#382D25] text-champagne rounded-xs"
                          title="Open Order in Logistics"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Linked Quotes Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-[#241C16] pb-2">
                <h3 className="text-xs uppercase tracking-wider text-champagne font-semibold flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-champagne" />
                  <span>Architectural Quotations ({selectedCustomer.quotes.length})</span>
                </h3>
              </div>

              {selectedCustomer.quotes.length === 0 ? (
                <p className="text-xs text-[#7E7469] py-3 italic">No architectural estimation dossiers recorded.</p>
              ) : (
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {selectedCustomer.quotes.map((qt) => (
                    <div
                      key={qt.id}
                      className="p-3 bg-[#140F0C] border border-[#281F19] rounded-xs flex items-center justify-between text-xs"
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-semibold text-[#FCFAF6]">{qt.quoteNumber}</span>
                          <span
                            className={`px-1.5 py-0.2 text-[9px] uppercase tracking-wider font-semibold rounded-2xs border ${
                              qt.status === 'Approved' || qt.status === 'Converted_To_Order'
                                ? 'bg-emerald-950/60 text-emerald-400 border-emerald-800/40'
                                : qt.status === 'Quotation_Sent'
                                ? 'bg-blue-950/60 text-blue-400 border-blue-800/40'
                                : 'bg-amber-950/60 text-amber-400 border-amber-800/40'
                            }`}
                          >
                            {qt.status.replace(/_/g, ' ')}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#8E8275]">
                          {qt.projectType} • Site: {qt.projectLocation} • Budget: {qt.budgetRange}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="font-serif font-medium text-champagne text-sm">
                          {qt.totalQuotedAmount ? `₹${qt.totalQuotedAmount.toLocaleString('en-IN')}` : 'Evaluating'}
                        </span>
                        <Link
                          href={`/admin/quotes?id=${qt.id}`}
                          className="p-1 bg-[#251E1A] hover:border-champagne border border-[#382D25] text-champagne rounded-xs"
                          title="Open Quote in Dossiers"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="flex justify-end pt-2 border-t border-[#281F19]">
              <button
                onClick={() => setSelectedCustomer(null)}
                className="px-5 py-2 bg-[#251E1A] hover:bg-[#332821] text-[#FCFAF6] text-xs uppercase tracking-wider font-medium rounded-xs border border-[#3D3027] transition-colors"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

export default function AdminCustomersPage() {
  return (
    <Suspense fallback={<div className="p-16 text-center text-champagne text-xs">Loading client directory...</div>}>
      <AdminCustomersContent />
    </Suspense>
  );
}
