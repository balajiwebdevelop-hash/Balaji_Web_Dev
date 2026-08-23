'use client';

import React, { useEffect, useState, useCallback } from 'react';
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

type TimeRange = '7D' | '30D' | '90D' | '6M' | '1Y' | 'ALL';

export default function AdminDashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [timeRange, setTimeRange] = useState<TimeRange>('30D');

  const loadData = useCallback(async () => {
    try {
      const res = await fetch(`/api/admin/analytics/dashboard?timeRange=${timeRange}`);
      if (res.ok) {
        const json = await res.json();
        if (json.success) {
          setData(json.data);
        }
      }
    } catch (e) {
      console.error('Failed to load dashboard aggregates', e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [timeRange]);

  useEffect(() => {
    loadData();
    const interval = setInterval(() => {
      if (typeof document !== 'undefined' && !document.hidden) {
        loadData();
      }
    }, 30000);
    return () => clearInterval(interval);
  }, [loadData]);

  const kpis = data?.kpis || {
    periodRevenue: 0,
    thisMonthRevenue: 0,
    periodOrdersCount: 0,
    activeOrdersCount: 0,
    pendingQuotesCount: 0,
    totalQuotesCount: 0,
    totalQuotesValuation: 0,
    activeProjectsCount: 0,
    lowStockCount: 0,
    totalProductsCount: 0,
    totalInventoryValuation: 0,
    averageOrderValue: 0,
    enquiriesCount: 0,
  };

  const salesGraphData = data?.salesGraphData || [];
  const categoryBreakdown = data?.categoryBreakdown || [];
  const recentOrders = data?.recentOrders || [];
  const recentActivity = data?.recentActivity || [];

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
              ₹{kpis.periodRevenue.toLocaleString('en-IN')}
            </div>
            <p className="text-[10px] text-[#7E7469]">{kpis.periodOrdersCount} transactions</p>
          </div>

          {/* This Month's Revenue */}
          <div className="bg-[#140F0C] border border-[#241C16] p-4 rounded-xs shadow-xs space-y-1">
            <div className="flex items-center justify-between text-[10px] text-[#8E8275] uppercase tracking-wider">
              <span>Month Revenue</span>
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="font-serif text-xl sm:text-2xl text-emerald-400 font-light truncate">
              ₹{kpis.thisMonthRevenue.toLocaleString('en-IN')}
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
              {kpis.activeOrdersCount}
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
              {kpis.pendingQuotesCount}
            </div>
            <p className="text-[10px] text-[#7E7469]">{kpis.totalQuotesCount} total dossiers</p>
          </div>

          {/* Active Projects */}
          <div className="bg-[#140F0C] border border-[#241C16] p-4 rounded-xs shadow-xs space-y-1">
            <div className="flex items-center justify-between text-[10px] text-[#8E8275] uppercase tracking-wider">
              <span>Projects</span>
              <Building2 className="w-3.5 h-3.5 text-champagne" />
            </div>
            <div className="font-serif text-xl sm:text-2xl text-[#FCFAF6] font-light truncate">
              {kpis.activeProjectsCount}
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
              {kpis.lowStockCount}
            </div>
            <p className="text-[10px] text-[#7E7469]">{kpis.totalProductsCount} total materials</p>
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
                  <span className="font-medium text-champagne font-mono">₹{kpis.averageOrderValue.toLocaleString('en-IN')}</span>
                </div>
                <div>
                  <span className="text-[#7E7469] block text-[10px] uppercase">Total Catalog Value</span>
                  <span className="font-medium text-[#FCFAF6] font-mono">₹{kpis.totalInventoryValuation.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Visual Bar Graph */}
            <div className="h-52 flex items-end justify-between gap-3 sm:gap-6 pt-6 px-2">
              {salesGraphData.length === 0 ? (
                <p className="text-xs text-[#7E7469] py-16 text-center w-full">No sales transactions in selected period.</p>
              ) : (
                salesGraphData.map((item: any) => (
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
                ))
              )}
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
                categoryBreakdown.map((cat: any) => (
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
                <span>View All ({kpis.activeProjectsCount})</span> <ChevronRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {[
                { stage: 'Concept & Brief', count: Math.ceil(kpis.activeProjectsCount * 0.2) },
                { stage: 'Design Development', count: Math.ceil(kpis.activeProjectsCount * 0.3) },
                { stage: 'Execution & Turnkey', count: Math.ceil(kpis.activeProjectsCount * 0.3) },
                { stage: 'Snagging', count: Math.ceil(kpis.activeProjectsCount * 0.1) },
                { stage: 'Completed & Handed', count: Math.floor(kpis.activeProjectsCount * 0.1) },
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
                <span>Dossiers ({kpis.totalQuotesCount})</span> <ChevronRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="p-3 bg-[#1A1410] border border-[#241C16] rounded-xs space-y-1">
                <span className="text-[10px] text-[#8E8275] uppercase block">Under Review</span>
                <span className="font-serif text-lg text-amber-400">
                  {kpis.pendingQuotesCount}
                </span>
              </div>
              <div className="p-3 bg-[#1A1410] border border-[#241C16] rounded-xs space-y-1">
                <span className="text-[10px] text-[#8E8275] uppercase block">Active Projects</span>
                <span className="font-serif text-lg text-emerald-400">
                  {kpis.activeProjectsCount}
                </span>
              </div>
              <div className="p-3 bg-[#1A1410] border border-[#241C16] rounded-xs space-y-1">
                <span className="text-[10px] text-[#8E8275] uppercase block">Pipeline Value</span>
                <span className="font-serif text-lg text-champagne truncate block">
                  ₹{(kpis.totalQuotesValuation / 1000).toFixed(0)}k
                </span>
              </div>
              <div className="p-3 bg-[#1A1410] border border-[#241C16] rounded-xs space-y-1">
                <span className="text-[10px] text-[#8E8275] uppercase block">Enquiries</span>
                <span className="font-serif text-lg text-blue-400">{kpis.enquiriesCount}</span>
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
                <span>All Orders ({kpis.periodOrdersCount})</span> <ChevronRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="divide-y divide-[#201712]">
              {recentOrders.length === 0 ? (
                <p className="text-xs text-[#7E7469] py-8 text-center">No orders recorded in this period.</p>
              ) : (
                recentOrders.map((o: any) => (
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
                        {o.customerName} • {o.itemsCount} material items
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
                ))
              )}
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
              {recentActivity.length === 0 ? (
                <p className="text-xs text-[#7E7469] py-8 text-center">No recent activity.</p>
              ) : (
                recentActivity.map((log: any) => (
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
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
