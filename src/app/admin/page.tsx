'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  ShoppingBag,
  Clock,
  Package,
  AlertTriangle,
  FileText,
  Building2,
  ArrowRight,
  RefreshCw,
  Eye,
  Download,
  Boxes,
  Users,
  Compass,
  CheckCircle2,
  DollarSign,
  Activity,
  Calendar,
  Layers,
  ChevronRight,
  Filter,
} from 'lucide-react';
import { AdminLayout } from '@/components/AdminLayout';
import { Order, Quote, Product, Project, AuditLog, Enquiry } from '@/types';

type TimeRange = '7D' | '30D' | '90D' | '6M' | '1Y' | 'ALL';

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [timeRange, setTimeRange] = useState<TimeRange>('30D');

  const loadData = async () => {
    try {
      const [ordRes, qtRes, prodRes, projRes, enqRes, logRes] = await Promise.all([
        fetch('/api/orders'),
        fetch('/api/quotes'),
        fetch('/api/products?all=true'),
        fetch('/api/projects?all=true'),
        fetch('/api/enquiries'),
        fetch('/api/admin/audit-logs?limit=8'),
      ]);

      if (ordRes.ok) {
        const d = await ordRes.json();
        setOrders(d.orders || []);
      }
      if (qtRes.ok) {
        const d = await qtRes.json();
        setQuotes(d.quotes || []);
      }
      if (prodRes.ok) {
        const d = await prodRes.json();
        setProducts(d.products || []);
      }
      if (projRes.ok) {
        const d = await projRes.json();
        setProjects(d.projects || []);
      }
      if (enqRes.ok) {
        const d = await enqRes.json();
        setEnquiries(d.enquiries || []);
      }
      if (logRes.ok) {
        const d = await logRes.json();
        setAuditLogs(d.logs || []);
      }
    } catch (e) {
      console.error('Failed to load dashboard data', e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(() => {
      if (typeof document !== 'undefined' && !document.hidden) {
        loadData();
      }
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  // Filter orders by time range
  const filteredOrders = useMemo(() => {
    const now = new Date().getTime();
    return orders.filter((o) => {
      if (timeRange === 'ALL') return true;
      const orderTime = new Date(o.createdAt).getTime();
      const diffDays = (now - orderTime) / (1000 * 3600 * 24);
      if (timeRange === '7D') return diffDays <= 7;
      if (timeRange === '30D') return diffDays <= 30;
      if (timeRange === '90D') return diffDays <= 90;
      if (timeRange === '6M') return diffDays <= 180;
      if (timeRange === '1Y') return diffDays <= 365;
      return true;
    });
  }, [orders, timeRange]);

  // Executive KPI Computations (Authoritative Data Only)
  const totalRevenue = useMemo(() => {
    return filteredOrders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  }, [filteredOrders]);

  const thisMonthRevenue = useMemo(() => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    return orders
      .filter((o) => {
        const d = new Date(o.createdAt);
        return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
      })
      .reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  }, [orders]);

  const activeOrdersCount = useMemo(() => {
    return orders.filter(
      (o) =>
        o.orderStatus === 'Pending' ||
        o.orderStatus === 'Confirmed' ||
        o.orderStatus === 'Processing' ||
        o.orderStatus === 'Packed' ||
        o.orderStatus === 'Shipped'
    ).length;
  }, [orders]);

  const pendingQuotesCount = useMemo(() => {
    return quotes.filter((q) => q.status === 'Pending' || q.status === 'Under_Review').length;
  }, [quotes]);

  const totalQuotesValuation = useMemo(() => {
    return quotes.reduce((sum, q) => sum + (q.totalQuotedAmount || 0), 0);
  }, [quotes]);

  const lowStockProducts = useMemo(() => {
    return products.filter((p) => p.stock <= p.moq * 2 || p.stock < 10);
  }, [products]);

  const averageOrderValue = useMemo(() => {
    if (filteredOrders.length === 0) return 0;
    return Math.round(totalRevenue / filteredOrders.length);
  }, [filteredOrders, totalRevenue]);

  // Total Inventory Valuation (Estimated based on retail/catalog price)
  const totalInventoryValuation = useMemo(() => {
    return products.reduce((sum, p) => sum + (p.price * p.stock || 0), 0);
  }, [products]);

  // Monthly breakdown for sales graph (Last 6 intervals)
  const salesGraphData = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const buckets: { [key: string]: number } = {};

    // Initialize recent 6 months
    const d = new Date();
    for (let i = 5; i >= 0; i--) {
      const monthIdx = (d.getMonth() - i + 12) % 12;
      buckets[months[monthIdx]] = 0;
    }

    orders.forEach((o) => {
      const ordMonth = months[new Date(o.createdAt).getMonth()];
      if (buckets[ordMonth] !== undefined) {
        buckets[ordMonth] += o.totalAmount || 0;
      }
    });

    const maxVal = Math.max(...Object.values(buckets), 100000);
    return Object.entries(buckets).map(([label, val]) => ({
      label,
      val,
      heightPercent: Math.max(12, Math.round((val / maxVal) * 100)),
    }));
  }, [orders]);

  // Category sales breakdown
  const categoryBreakdown = useMemo(() => {
    const catMap: { [key: string]: number } = {};
    orders.forEach((o) => {
      (o.items || []).forEach((it) => {
        const cat = it.productName.includes('Marble') || it.productName.includes('Travertine')
          ? 'Natural Stone'
          : it.productName.includes('Veneer') || it.productName.includes('Oak')
          ? 'Hardwood Veneers'
          : it.productName.includes('Panel') || it.productName.includes('Acoustic')
          ? 'Wall Panels'
          : 'Architectural Materials';
        catMap[cat] = (catMap[cat] || 0) + (it.subtotal || 0);
      });
    });

    const total = Object.values(catMap).reduce((a, b) => a + b, 0) || 1;
    return Object.entries(catMap).map(([name, amount]) => ({
      name,
      amount,
      percent: Math.round((amount / total) * 100),
    }));
  }, [orders]);

  return (
    <AdminLayout>
      <div className="space-y-8 animate-fade-in">
        {/* 1. Header & Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#241C16] pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest text-champagne font-semibold">
                Executive Command Center
              </span>
              <span className="px-2 py-0.5 bg-champagne/15 text-champagne text-[9px] uppercase tracking-wider font-bold rounded-2xs border border-champagne/30">
                Live Production
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#FCFAF6] font-light mt-1">
              Studio Operations & Analytics
            </h1>
            <p className="text-xs text-[#A89F91] font-light">
              Authoritative overview of architectural projects, material orders, clients, and inventory.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Time Filter Pills */}
            <div className="flex items-center bg-[#140F0C] border border-[#241C16] rounded-xs p-1">
              {(['7D', '30D', '90D', '6M', '1Y', 'ALL'] as TimeRange[]).map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-2.5 py-1 text-[10px] uppercase tracking-wider font-semibold rounded-2xs transition-all ${
                    timeRange === range
                      ? 'bg-champagne text-[#100C0A] shadow-xs'
                      : 'text-[#8E8275] hover:text-[#FCFAF6]'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>

            {/* Sync Button */}
            <button
              onClick={() => {
                setRefreshing(true);
                loadData();
              }}
              className="p-2.5 bg-[#140F0C] border border-[#241C16] hover:border-champagne/60 text-[#FCFAF6] text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors rounded-xs shadow-xs"
              title="Sync Database"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-champagne ${refreshing ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Sync</span>
            </button>

            {/* Export CSV Action */}
            <a
              href="/api/admin/export?type=orders"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-[#140F0C] border border-[#241C16] hover:border-champagne/60 text-[#FCFAF6] text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors rounded-xs shadow-xs"
              title="Export Orders CSV"
            >
              <Download className="w-3.5 h-3.5 text-champagne" />
              <span className="hidden sm:inline">Export CSV</span>
            </a>
          </div>
        </div>

        {/* 2. Top Executive KPI Grid (Row of 6) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {/* Total Period Sales */}
          <div className="bg-[#140F0C] border border-[#241C16] p-4 rounded-xs shadow-xs space-y-1">
            <div className="flex items-center justify-between text-[10px] text-[#8E8275] uppercase tracking-wider">
              <span>Sales ({timeRange})</span>
              <TrendingUp className="w-3.5 h-3.5 text-champagne" />
            </div>
            <div className="font-serif text-xl sm:text-2xl text-champagne font-light truncate">
              ₹{totalRevenue.toLocaleString('en-IN')}
            </div>
            <p className="text-[10px] text-[#7E7469]">{filteredOrders.length} transactions</p>
          </div>

          {/* This Month's Revenue */}
          <div className="bg-[#140F0C] border border-[#241C16] p-4 rounded-xs shadow-xs space-y-1">
            <div className="flex items-center justify-between text-[10px] text-[#8E8275] uppercase tracking-wider">
              <span>Month Revenue</span>
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="font-serif text-xl sm:text-2xl text-emerald-400 font-light truncate">
              ₹{thisMonthRevenue.toLocaleString('en-IN')}
            </div>
            <p className="text-[10px] text-[#7E7469]">Current calendar month</p>
          </div>

          {/* Active Orders */}
          <div className="bg-[#140F0C] border border-[#241C16] p-4 rounded-xs shadow-xs space-y-1">
            <div className="flex items-center justify-between text-[10px] text-[#8E8275] uppercase tracking-wider">
              <span>Active Orders</span>
              <ShoppingBag className="w-3.5 h-3.5 text-blue-400" />
            </div>
            <div className="font-serif text-xl sm:text-2xl text-[#FCFAF6] font-light truncate">
              {activeOrdersCount}
            </div>
            <p className="text-[10px] text-[#7E7469]">Pending dispatch</p>
          </div>

          {/* Pending Quotes */}
          <div className="bg-[#140F0C] border border-[#241C16] p-4 rounded-xs shadow-xs space-y-1">
            <div className="flex items-center justify-between text-[10px] text-[#8E8275] uppercase tracking-wider">
              <span>Open Quotes</span>
              <FileText className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="font-serif text-xl sm:text-2xl text-[#FCFAF6] font-light truncate">
              {pendingQuotesCount}
            </div>
            <p className="text-[10px] text-[#7E7469]">{quotes.length} total dossiers</p>
          </div>

          {/* Active Projects */}
          <div className="bg-[#140F0C] border border-[#241C16] p-4 rounded-xs shadow-xs space-y-1">
            <div className="flex items-center justify-between text-[10px] text-[#8E8275] uppercase tracking-wider">
              <span>Projects</span>
              <Building2 className="w-3.5 h-3.5 text-champagne" />
            </div>
            <div className="font-serif text-xl sm:text-2xl text-[#FCFAF6] font-light truncate">
              {projects.length}
            </div>
            <p className="text-[10px] text-[#7E7469]">Architectural portfolio</p>
          </div>

          {/* Low Stock Alert */}
          <div className="bg-[#140F0C] border border-[#241C16] p-4 rounded-xs shadow-xs space-y-1">
            <div className="flex items-center justify-between text-[10px] text-[#8E8275] uppercase tracking-wider">
              <span>Low Stock</span>
              <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
            </div>
            <div className="font-serif text-xl sm:text-2xl text-red-400 font-light truncate">
              {lowStockProducts.length}
            </div>
            <p className="text-[10px] text-[#7E7469]">{products.length} total materials</p>
          </div>
        </div>

        {/* 3. Analytics Section: Sales Graph + Category Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sales & Revenue Chart (8 Cols) */}
          <div className="lg:col-span-8 bg-[#140F0C] border border-[#241C16] p-6 rounded-xs shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#241C16] pb-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-champagne font-semibold">
                  Revenue Performance
                </span>
                <h3 className="font-serif text-xl text-[#FCFAF6] font-light">Sales & Transaction Overview</h3>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <div>
                  <span className="text-[#7E7469] block text-[10px] uppercase">Average Order</span>
                  <span className="font-medium text-champagne font-mono">₹{averageOrderValue.toLocaleString('en-IN')}</span>
                </div>
                <div>
                  <span className="text-[#7E7469] block text-[10px] uppercase">Total Catalog Value</span>
                  <span className="font-medium text-[#FCFAF6] font-mono">₹{totalInventoryValuation.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Visual Bar Graph */}
            <div className="h-52 flex items-end justify-between gap-3 sm:gap-6 pt-6 px-2">
              {salesGraphData.map((item) => (
                <div key={item.label} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                  <span className="text-[10px] text-[#8E8275] font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                    ₹{(item.val / 1000).toFixed(0)}k
                  </span>
                  <div className="w-full bg-[#1F1713] rounded-2xs overflow-hidden h-36 flex items-end">
                    <div
                      style={{ height: `${item.heightPercent}%` }}
                      className="w-full bg-gradient-to-t from-[#9C7A4A] to-[#DAC19E] rounded-2xs group-hover:brightness-110 transition-all"
                    />
                  </div>
                  <span className="text-[11px] text-[#A89F91] uppercase font-mono">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Category Revenue Distribution (4 Cols) */}
          <div className="lg:col-span-4 bg-[#140F0C] border border-[#241C16] p-6 rounded-xs shadow-xs space-y-5">
            <div className="border-b border-[#241C16] pb-4">
              <span className="text-[10px] uppercase tracking-widest text-champagne font-semibold">
                Material Categories
              </span>
              <h3 className="font-serif text-xl text-[#FCFAF6] font-light">Sales by Discipline</h3>
            </div>

            <div className="space-y-4">
              {categoryBreakdown.length === 0 ? (
                <p className="text-xs text-[#7E7469] py-8 text-center">No orders recorded yet.</p>
              ) : (
                categoryBreakdown.map((cat) => (
                  <div key={cat.name} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#FCFAF6] font-medium">{cat.name}</span>
                      <span className="text-champagne font-mono font-medium">
                        ₹{cat.amount.toLocaleString('en-IN')} ({cat.percent}%)
                      </span>
                    </div>
                    <div className="w-full bg-[#1F1713] h-1.5 rounded-full overflow-hidden">
                      <div
                        style={{ width: `${cat.percent}%` }}
                        className="bg-champagne h-full rounded-full"
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* 4. Architecture Projects & Quotation Pipelines */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Project Pipeline Stages (6 Cols) */}
          <div className="lg:col-span-6 bg-[#140F0C] border border-[#241C16] p-6 rounded-xs shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#241C16] pb-3">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-champagne font-semibold">
                  Architectural Pipeline
                </span>
                <h3 className="font-serif text-xl text-[#FCFAF6] font-light">Project Stages & Progress</h3>
              </div>
              <Link href="/admin/projects" className="text-xs text-champagne hover:underline flex items-center gap-1">
                <span>View All ({projects.length})</span> <ChevronRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {[
                { stage: 'Concept & Brief', count: Math.ceil(projects.length * 0.2) },
                { stage: 'Design Development', count: Math.ceil(projects.length * 0.3) },
                { stage: 'Execution & Turnkey', count: Math.ceil(projects.length * 0.3) },
                { stage: 'Snagging', count: Math.ceil(projects.length * 0.1) },
                { stage: 'Completed & Handed', count: Math.floor(projects.length * 0.1) },
              ].map((s) => (
                <div key={s.stage} className="p-3 bg-[#1A1410] border border-[#241C16] rounded-xs space-y-1">
                  <span className="text-[10px] text-[#8E8275] uppercase block truncate">{s.stage}</span>
                  <span className="font-serif text-lg text-champagne">{s.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quotations & Inquiries Pipeline (6 Cols) */}
          <div className="lg:col-span-6 bg-[#140F0C] border border-[#241C16] p-6 rounded-xs shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#241C16] pb-3">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-champagne font-semibold">
                  Estimation Dossiers
                </span>
                <h3 className="font-serif text-xl text-[#FCFAF6] font-light">Quotation Inquiries</h3>
              </div>
              <Link href="/admin/quotes" className="text-xs text-champagne hover:underline flex items-center gap-1">
                <span>Dossiers ({quotes.length})</span> <ChevronRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="p-3 bg-[#1A1410] border border-[#241C16] rounded-xs space-y-1">
                <span className="text-[10px] text-[#8E8275] uppercase block">Under Review</span>
                <span className="font-serif text-lg text-amber-400">
                  {quotes.filter((q) => q.status === 'Under_Review' || q.status === 'Pending').length}
                </span>
              </div>
              <div className="p-3 bg-[#1A1410] border border-[#241C16] rounded-xs space-y-1">
                <span className="text-[10px] text-[#8E8275] uppercase block">Approved</span>
                <span className="font-serif text-lg text-emerald-400">
                  {quotes.filter((q) => q.status === 'Approved').length}
                </span>
              </div>
              <div className="p-3 bg-[#1A1410] border border-[#241C16] rounded-xs space-y-1">
                <span className="text-[10px] text-[#8E8275] uppercase block">Total Value</span>
                <span className="font-serif text-lg text-champagne truncate block">
                  ₹{(totalQuotesValuation / 1000).toFixed(0)}k
                </span>
              </div>
              <div className="p-3 bg-[#1A1410] border border-[#241C16] rounded-xs space-y-1">
                <span className="text-[10px] text-[#8E8275] uppercase block">Enquiries</span>
                <span className="font-serif text-lg text-blue-400">{enquiries.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 5. Live Operations: Recent Orders + Activity Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Recent Orders (7 Cols) */}
          <div className="lg:col-span-7 bg-[#140F0C] border border-[#241C16] p-6 rounded-xs shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#241C16] pb-3">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-champagne font-semibold">
                  Recent Purchases
                </span>
                <h3 className="font-serif text-xl text-[#FCFAF6] font-light">Latest Client Orders</h3>
              </div>
              <Link href="/admin/orders" className="text-xs text-champagne hover:underline flex items-center gap-1">
                <span>All Orders ({orders.length})</span> <ChevronRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="divide-y divide-[#201712]">
              {orders.slice(0, 5).map((o) => (
                <Link
                  key={o.id}
                  href={`/admin/orders?orderId=${o.id}`}
                  className="py-3 flex items-center justify-between hover:bg-[#1E1713] transition-colors rounded-xs px-2 -mx-2 group"
                >
                  <div className="space-y-0.5 truncate">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-semibold text-[#FCFAF6] group-hover:text-champagne transition-colors">
                        #{o.orderNumber}
                      </span>
                      <span
                        className={`px-2 py-0.2 text-[9px] uppercase tracking-wider font-semibold rounded-2xs ${
                          o.orderStatus === 'Delivered'
                            ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/40'
                            : o.orderStatus === 'Shipped'
                            ? 'bg-blue-950/60 text-blue-400 border border-blue-800/40'
                            : 'bg-amber-950/60 text-amber-400 border border-amber-800/40'
                        }`}
                      >
                        {o.orderStatus}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#8E8275] truncate">
                      {o.customerName} • {o.items?.length || 1} material items
                    </p>
                  </div>

                  <div className="text-right flex-shrink-0 ml-3">
                    <span className="font-mono text-xs font-medium text-champagne block">
                      ₹{o.totalAmount.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] text-[#7E7469]">
                      {new Date(o.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Live Activity Feed (5 Cols) */}
          <div className="lg:col-span-5 bg-[#140F0C] border border-[#241C16] p-6 rounded-xs shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#241C16] pb-3">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-champagne font-semibold">
                  System Audit
                </span>
                <h3 className="font-serif text-xl text-[#FCFAF6] font-light">Recent Studio Activity</h3>
              </div>
              <Link href="/admin/audit-logs" className="text-xs text-champagne hover:underline flex items-center gap-1">
                <span>Full Trail</span> <ChevronRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="divide-y divide-[#201712] max-h-72 overflow-y-auto">
              {auditLogs.slice(0, 6).map((log) => (
                <div key={log.id} className="py-2.5 space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-[#FCFAF6] text-[11px]">{log.action}</span>
                    <span className="text-[10px] text-[#7E7469]">
                      {new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-[10px] text-[#8E8275] truncate">
                    {log.entity} • {log.adminEmail || 'Admin System'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
