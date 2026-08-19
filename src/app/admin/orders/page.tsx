'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  ShoppingBag,
  RefreshCw,
  Search,
  Eye,
  CheckCircle2,
  Clock,
  Truck,
  PackageCheck,
  X,
  Printer,
  Radio,
} from 'lucide-react';
import { AdminLayout } from '@/components/AdminLayout';
import { Order, OrderStatus, PaymentStatus } from '@/types';
import { supabase } from '@/lib/supabase';

function AdminOrdersContent() {
  const searchParams = useSearchParams();
  const highlightId = searchParams?.get('id') || null;

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [isLiveConnected, setIsLiveConnected] = useState(false);

  const loadOrders = async () => {
    try {
      const res = await fetch('/api/orders', {
        headers: { 'Cache-Control': 'no-cache' },
      });
      if (res.ok) {
        const d = await res.json();
        const ords: Order[] = d.orders || [];
        setOrders(ords);

        if (highlightId && !selectedOrder) {
          const match = ords.find((o) => o.id === highlightId || o.orderNumber === highlightId);
          if (match) setSelectedOrder(match);
        }
      }
    } catch (e) {
      console.error('Error loading orders:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();

    // 1. Setup Supabase Realtime Channel
    const channel = supabase
      .channel('admin-orders-realtime-stream')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'orders' },
        (payload) => {
          // Immediately reload orders on any new order insertion or status update
          loadOrders();

          // If browser notifications are permitted, display order alert
          if (payload.eventType === 'INSERT' && 'Notification' in window && Notification.permission === 'granted') {
            const newRecord = payload.new as any;
            new Notification('New Order Placed — Balaji Architect & Interiors', {
              body: `Order #${newRecord.order_number || 'New'} received from ${newRecord.customer_name || 'Customer'}.`,
              icon: '/favicon.ico',
            });
          }
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          setIsLiveConnected(true);
        }
      });

    // 2. Periodic sync fallback (every 8 seconds)
    const interval = setInterval(loadOrders, 8000);

    return () => {
      supabase.removeChannel(channel);
      clearInterval(interval);
    };
  }, []);

  const handleUpdateStatus = async (orderId: string, orderStatus: OrderStatus, paymentStatus?: PaymentStatus) => {
    setUpdatingId(orderId);
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderStatus, paymentStatus }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.order) {
          setOrders(orders.map((o) => (o.id === orderId ? data.order : o)));
          if (selectedOrder && selectedOrder.id === orderId) {
            setSelectedOrder(data.order);
          }
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName.toLowerCase().includes(search.toLowerCase()) ||
      o.customerEmail.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !statusFilter || o.orderStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-atelier pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest text-bronze font-medium">Logistics & Orders</span>
              <span className="flex items-center gap-1 text-[10px] text-green-500 font-medium">
                <Radio className="w-3 h-3 animate-pulse" /> Live Stream
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-espresso font-light">Client Orders</h1>
          </div>
          <button
            onClick={loadOrders}
            className="p-2.5 bg-surface border border-atelier hover:border-bronze text-espresso text-xs uppercase tracking-wider flex items-center gap-1.5 self-start"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Sync Orders
          </button>
        </div>

        {/* Filter Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-surface border border-atelier p-4">
          <div className="sm:col-span-2 relative">
            <input
              type="text"
              placeholder="Search by order #, client name, or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-2.5 pl-9 bg-canvas border border-atelier text-xs focus:border-bronze focus:outline-hidden"
            />
            <Search className="w-4 h-4 text-warmgray absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full p-2.5 bg-canvas border border-atelier text-xs focus:border-bronze focus:outline-hidden"
            >
              <option value="">All Statuses ({orders.length})</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Processing">Processing</option>
              <option value="Packed">Packed</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-surface border border-atelier overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-espresso border-collapse">
              <thead>
                <tr className="bg-canvas border-b border-atelier text-[10px] uppercase tracking-widest text-warmgray font-medium">
                  <th className="p-4">Order Ref</th>
                  <th className="p-4">Client</th>
                  <th className="p-4">Date Placed</th>
                  <th className="p-4">Total Amount</th>
                  <th className="p-4">Payment</th>
                  <th className="p-4">Order Status</th>
                  <th className="p-4 text-right">Review</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-atelier/60">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-warmgray">
                      Loading incoming order logs...
                    </td>
                  </tr>
                ) : filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-warmgray">
                      No order records matching filter.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-canvas/50 transition-colors">
                      <td className="p-4">
                        <span className="font-mono font-medium text-espresso block">{ord.orderNumber}</span>
                        <span className="text-[10px] text-warmgray">{ord.items.length} materials</span>
                      </td>
                      <td className="p-4">
                        <span className="font-medium text-espresso block">{ord.customerName}</span>
                        <span className="text-[10px] text-warmgray">{ord.customerEmail}</span>
                      </td>
                      <td className="p-4 text-warmgray">
                        {new Date(ord.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </td>
                      <td className="p-4 font-serif text-sm font-medium text-timber">
                        ₹{ord.totalAmount.toLocaleString('en-IN')}
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-0.5 text-[10px] uppercase tracking-wider font-medium border ${
                            ord.paymentStatus === 'Paid'
                              ? 'bg-green-50 text-green-800 border-green-200'
                              : 'bg-amber-50 text-amber-800 border-amber-200'
                          }`}
                        >
                          {ord.paymentStatus}
                        </span>
                      </td>
                      <td className="p-4">
                        <select
                          value={ord.orderStatus}
                          onChange={(e) => handleUpdateStatus(ord.id, e.target.value as OrderStatus)}
                          disabled={updatingId === ord.id}
                          className="p-1 bg-canvas border border-atelier text-xs font-medium focus:border-bronze focus:outline-hidden"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Processing">Processing</option>
                          <option value="Packed">Packed</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => setSelectedOrder(ord)}
                          className="p-1.5 bg-canvas border border-atelier hover:border-bronze text-espresso"
                          title="View Slip"
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

      {/* Order Detail Modal / Packing Slip */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-espresso/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-surface border border-atelier p-6 sm:p-8 space-y-6 shadow-2xl my-8">
            <div className="flex justify-between items-start border-b border-atelier pb-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-bronze font-medium">Order Slip</span>
                <h2 className="font-serif text-2xl text-espresso font-normal">
                  Order #{selectedOrder.orderNumber}
                </h2>
                <span className="text-xs text-warmgray">
                  Placed on {new Date(selectedOrder.createdAt).toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="p-1.5 bg-canvas border border-atelier hover:border-bronze text-espresso"
                  title="Print Packing Slip"
                >
                  <Printer className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-1.5 text-warmgray hover:text-espresso"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Client & Address Info */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-canvas border border-atelier text-xs">
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-warmgray font-medium block">
                  Customer Information
                </span>
                <p className="font-medium text-espresso">{selectedOrder.customerName}</p>
                <p className="text-warmgray">{selectedOrder.customerEmail}</p>
                <p className="text-warmgray">{selectedOrder.customerPhone}</p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-warmgray font-medium block">
                  Delivery Site
                </span>
                <p className="text-espresso">{selectedOrder.shippingAddress.addressLine1}</p>
                {selectedOrder.shippingAddress.addressLine2 && (
                  <p className="text-espresso">{selectedOrder.shippingAddress.addressLine2}</p>
                )}
                <p className="text-warmgray">
                  {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} -{' '}
                  {selectedOrder.shippingAddress.pincode}
                </p>
              </div>
            </div>

            {/* Line Items */}
            <div className="space-y-3">
              <h3 className="text-xs uppercase tracking-wider text-espresso font-medium">
                Materials in this Crate ({selectedOrder.items.length})
              </h3>
              <div className="border border-atelier divide-y divide-atelier/60 text-xs">
                {selectedOrder.items.map((item) => (
                  <div key={item.id} className="p-3 flex justify-between items-center">
                    <div>
                      <p className="font-serif text-sm font-medium text-espresso">{item.productName}</p>
                      <p className="text-[11px] text-warmgray">
                        SKU: {item.productSku} • Qty: {item.quantity} {item.unit} @ ₹{item.unitPrice.toLocaleString('en-IN')}/{item.unit}
                      </p>
                    </div>
                    <span className="font-medium text-timber">
                      ₹{item.subtotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Financial Summary */}
            <div className="p-4 bg-canvas border border-atelier space-y-1.5 text-xs text-warmgray">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-espresso font-medium">₹{selectedOrder.subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>GST (18%)</span>
                <span className="text-espresso font-medium">₹{selectedOrder.tax.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Freight Fee</span>
                <span className="text-espresso font-medium">₹{selectedOrder.shippingFee.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-atelier text-sm font-medium text-espresso">
                <span>Total Due / Paid</span>
                <span className="font-serif text-lg text-timber">₹{selectedOrder.totalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Status Controls */}
            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-atelier text-xs">
              <div className="space-y-1">
                <label className="uppercase tracking-wider text-warmgray font-medium block">
                  Update Order Status
                </label>
                <select
                  value={selectedOrder.orderStatus}
                  onChange={(e) => handleUpdateStatus(selectedOrder.id, e.target.value as OrderStatus)}
                  className="w-full p-2.5 bg-canvas border border-atelier font-medium"
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Processing">Processing</option>
                  <option value="Packed">Packed</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="uppercase tracking-wider text-warmgray font-medium block">
                  Update Payment Status
                </label>
                <select
                  value={selectedOrder.paymentStatus}
                  onChange={(e) =>
                    handleUpdateStatus(selectedOrder.id, selectedOrder.orderStatus, e.target.value as PaymentStatus)
                  }
                  className="w-full p-2.5 bg-canvas border border-atelier font-medium"
                >
                  <option value="Pending">Pending</option>
                  <option value="Submitted">Submitted</option>
                  <option value="Paid">Paid</option>
                  <option value="Failed">Failed</option>
                  <option value="Refunded">Refunded</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

export default function AdminOrdersPage() {
  return (
    <Suspense fallback={<div className="p-16 text-center text-warmgray text-xs">Loading orders module...</div>}>
      <AdminOrdersContent />
    </Suspense>
  );
}
