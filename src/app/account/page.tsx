'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, ShoppingBag, Package, CheckCircle2, ArrowRight } from 'lucide-react';
import { Order } from '@/types';

export default function AccountPage() {
  const [lookupEmail, setLookupEmail] = useState('');
  const [orders, setOrders] = useState<Order[]>([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lookupEmail.trim()) return;

    setLoading(true);
    setSearched(true);

    try {
      const res = await fetch('/api/orders');
      if (res.ok) {
        const data = await res.json();
        const matched = (data.orders || []).filter(
          (o: Order) => o.customerEmail.toLowerCase().trim() === lookupEmail.toLowerCase().trim()
        );
        setOrders(matched);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-12 min-h-[65vh]">
      <div className="space-y-3 border-b border-atelier pb-6 text-center">
        <span className="text-xs uppercase tracking-widest text-bronze font-medium">Customer Portal</span>
        <h1 className="font-serif text-3xl sm:text-4xl text-espresso font-light">
          Track Your Architectural Orders
        </h1>
        <p className="text-xs sm:text-sm text-warmgray font-light max-w-md mx-auto">
          Enter the email address used during checkout to view dispatch status, tracking information, and invoices.
        </p>
      </div>

      <form onSubmit={handleLookup} className="max-w-md mx-auto flex gap-2">
        <input
          type="email"
          required
          placeholder="Enter client email address..."
          value={lookupEmail}
          onChange={(e) => setLookupEmail(e.target.value)}
          className="flex-1 p-3 bg-surface border border-atelier text-xs focus:border-bronze focus:outline-hidden"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 btn-luxury-dark text-xs uppercase tracking-widest font-medium"
        >
          {loading ? 'Searching...' : 'Find Orders'}
        </button>
      </form>

      {searched && (
        <div className="space-y-6">
          {orders.length === 0 ? (
            <div className="bg-surface border border-atelier p-8 text-center space-y-3">
              <p className="font-serif text-xl text-espresso">No active orders found for &ldquo;{lookupEmail}&rdquo;</p>
              <p className="text-xs text-warmgray">Please check for typographical errors or verify the email used at checkout.</p>
            </div>
          ) : (
            <div className="space-y-6">
              <h2 className="font-serif text-2xl text-espresso">
                Past Orders ({orders.length})
              </h2>

              <div className="space-y-4">
                {orders.map((ord) => (
                  <div key={ord.id} className="bg-surface border border-atelier p-6 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-atelier pb-4 gap-2 text-xs">
                      <div>
                        <span className="font-mono font-medium text-espresso block text-sm">
                          Order #{ord.orderNumber}
                        </span>
                        <span className="text-warmgray">
                          Placed on {new Date(ord.createdAt).toLocaleDateString('en-IN')}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="px-2.5 py-1 bg-espresso text-surface text-[10px] uppercase tracking-wider">
                          Status: {ord.orderStatus}
                        </span>
                        <span className="font-serif text-base font-medium text-timber">
                          ₹{ord.totalAmount.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>

                    {/* Items List */}
                    <div className="divide-y divide-atelier/60 text-xs">
                      {ord.items.map((item) => (
                        <div key={item.id} className="py-2 flex justify-between items-center">
                          <div>
                            <span className="font-medium text-espresso">{item.productName}</span>
                            <span className="text-warmgray block text-[11px]">
                              Qty: {item.quantity} {item.unit} • ₹{item.unitPrice.toLocaleString('en-IN')}/{item.unit}
                            </span>
                          </div>
                          <span className="font-medium text-timber">₹{item.subtotal.toLocaleString('en-IN')}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-atelier flex justify-between items-center text-xs text-warmgray">
                      <span>Dispatch Site: {ord.shippingAddress.city}, {ord.shippingAddress.state}</span>
                      <span className="text-bronze font-medium">Payment: {ord.paymentStatus}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
