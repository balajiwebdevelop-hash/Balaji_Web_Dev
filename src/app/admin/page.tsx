'use client';

import React, { useEffect, useState } from 'react';
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
} from 'lucide-react';
import { AdminLayout } from '@/components/AdminLayout';
import { Order, Quote, Product } from '@/types';

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    try {
      const [ordRes, qtRes, prodRes] = await Promise.all([
        fetch('/api/orders'),
        fetch('/api/quotes'),
        fetch('/api/products?all=true'),
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
    } catch (e) {
      console.error('Failed to load dashboard data', e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
    // Realtime polling / event fallback
    const interval = setInterval(loadData, 10000);
    return () => clearInterval(interval);
  }, []);

  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const pendingOrders = orders.filter((o) => o.orderStatus === 'Pending' || o.orderStatus === 'Confirmed');
  const pendingQuotes = quotes.filter((q) => q.status === 'Pending' || q.status === 'Under_Review');
  const lowStockProducts = products.filter((p) => p.stock <= (p.moq * 2) || p.stock < 10);

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Top Title & Refresh */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-atelier pb-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-bronze font-medium">Studio Overview</span>
            <h1 className="font-serif text-3xl sm:text-4xl text-espresso font-light">Management Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setRefreshing(true);
                loadData();
              }}
              className="p-2.5 bg-surface border border-atelier hover:border-bronze text-espresso text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
              <span>Sync Realtime</span>
            </button>
            <Link
              href="/admin/products"
              className="px-4 py-2.5 btn-luxury-dark text-xs uppercase tracking-widest font-medium"
            >
              + New Material
            </Link>
          </div>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Revenue */}
          <div className="bg-surface border border-atelier p-6 space-y-2">
            <div className="flex items-center justify-between text-xs text-warmgray">
              <span className="uppercase tracking-wider">Total Sales Billed</span>
              <TrendingUp className="w-4 h-4 text-bronze" />
            </div>
            <div className="font-serif text-2xl sm:text-3xl text-timber font-light">
              ₹{totalRevenue.toLocaleString('en-IN')}
            </div>
            <p className="text-[11px] text-warmgray">{orders.length} total client transactions</p>
          </div>

          {/* Pending Orders */}
          <div className="bg-surface border border-atelier p-6 space-y-2">
            <div className="flex items-center justify-between text-xs text-warmgray">
              <span className="uppercase tracking-wider">Active Orders</span>
              <ShoppingBag className="w-4 h-4 text-bronze" />
            </div>
            <div className="font-serif text-2xl sm:text-3xl text-espresso font-light">
              {pendingOrders.length}
            </div>
            <p className="text-[11px] text-warmgray">{orders.length - pendingOrders.length} fulfilled & delivered</p>
          </div>

          {/* Pending Quotes */}
          <div className="bg-surface border border-atelier p-6 space-y-2">
            <div className="flex items-center justify-between text-xs text-warmgray">
              <span className="uppercase tracking-wider">Quote Requests</span>
              <FileText className="w-4 h-4 text-bronze" />
            </div>
            <div className="font-serif text-2xl sm:text-3xl text-espresso font-light">
              {pendingQuotes.length}
            </div>
            <p className="text-[11px] text-warmgray">{quotes.length} total architectural requests</p>
          </div>

          {/* Low Stock Warning */}
          <div className="bg-surface border border-atelier p-6 space-y-2">
            <div className="flex items-center justify-between text-xs text-warmgray">
              <span className="uppercase tracking-wider">Low Stock Lots</span>
              <AlertTriangle className="w-4 h-4 text-amber-600" />
            </div>
            <div className="font-serif text-2xl sm:text-3xl text-espresso font-light">
              {lowStockProducts.length}
            </div>
            <p className="text-[11px] text-warmgray">Out of {products.length} catalog items</p>
          </div>
        </div>

        {/* Orders & Quotes Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Recent Orders */}
          <div className="lg:col-span-7 bg-surface border border-atelier p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-atelier pb-4">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-bronze" />
                <h2 className="font-serif text-xl text-espresso font-light">Recent Orders (Realtime)</h2>
              </div>
              <Link href="/admin/orders" className="text-xs uppercase tracking-wider text-bronze hover:underline">
                View All →
              </Link>
            </div>

            {orders.length === 0 ? (
              <div className="text-center py-12 text-xs text-warmgray">No orders placed yet.</div>
            ) : (
              <div className="space-y-3 overflow-x-auto">
                {orders.slice(0, 5).map((ord) => (
                  <div
                    key={ord.id}
                    className="p-3.5 bg-canvas border border-atelier/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-medium text-espresso">{ord.orderNumber}</span>
                        <span className="px-2 py-0.5 bg-espresso text-surface text-[10px] uppercase tracking-wider">
                          {ord.orderStatus}
                        </span>
                      </div>
                      <p className="text-warmgray mt-0.5">
                        {ord.customerName} • {ord.items.length} materials
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-serif text-sm font-medium text-timber">
                        ₹{ord.totalAmount.toLocaleString('en-IN')}
                      </span>
                      <Link
                        href={`/admin/orders?id=${ord.id}`}
                        className="p-1.5 bg-surface border border-atelier hover:border-bronze text-espresso"
                        title="View order details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pending Project Quotes */}
          <div className="lg:col-span-5 bg-surface border border-atelier p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-atelier pb-4">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-bronze" />
                <h2 className="font-serif text-xl text-espresso font-light">Quote Requests</h2>
              </div>
              <Link href="/admin/quotes" className="text-xs uppercase tracking-wider text-bronze hover:underline">
                View All →
              </Link>
            </div>

            {quotes.length === 0 ? (
              <div className="text-center py-12 text-xs text-warmgray">No quote requests in queue.</div>
            ) : (
              <div className="space-y-3">
                {quotes.slice(0, 5).map((q) => (
                  <div
                    key={q.id}
                    className="p-3.5 bg-canvas border border-atelier/80 space-y-1 text-xs"
                  >
                    <div className="flex justify-between items-start">
                      <span className="font-mono font-medium text-espresso">{q.quoteNumber}</span>
                      <span className="px-2 py-0.5 bg-champagne/30 text-espresso text-[10px] uppercase tracking-wider font-medium">
                        {q.status}
                      </span>
                    </div>
                    <p className="font-medium text-espresso">{q.customerName}</p>
                    <p className="text-warmgray text-[11px] truncate">{q.projectType} • {q.projectLocation}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
