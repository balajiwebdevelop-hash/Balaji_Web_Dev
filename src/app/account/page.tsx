'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShoppingBag,
  Package,
  CheckCircle2,
  Clock,
  Truck,
  ArrowRight,
  User,
  LogOut,
  Mail,
  ShieldCheck,
  Search,
} from 'lucide-react';
import { Order } from '@/types';

export default function AccountPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const [lookupEmail, setLookupEmail] = useState('');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [searched, setSearched] = useState(false);

  // Check authenticated session
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          if (data.user) {
            setCurrentUser(data.user);
            loadCustomerOrders(data.user.email);
          }
        }
      } catch (err) {
        console.error('Session check notice:', err);
      } finally {
        setLoadingUser(false);
      }
    }
    checkAuth();
  }, []);

  const loadCustomerOrders = async (email: string) => {
    setLoadingOrders(true);
    setSearched(true);
    try {
      const res = await fetch(`/api/orders/customer?email=${encodeURIComponent(email)}`);
      if (res.ok) {
        const data = await res.json();
        setOrders(data.orders || []);
      }
    } catch (e) {
      console.error('Error loading customer orders:', e);
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lookupEmail.trim()) return;
    loadCustomerOrders(lookupEmail.trim());
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setCurrentUser(null);
      setOrders([]);
      router.push('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-10 min-h-[70vh]">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-atelier pb-6">
        <div>
          <span className="text-xs uppercase tracking-widest text-bronze font-medium">Customer Portal</span>
          <h1 className="font-serif text-3xl sm:text-4xl text-espresso font-light mt-1">
            {currentUser ? `Welcome, ${currentUser.name}` : 'Client & Orders Dossier'}
          </h1>
        </div>

        {currentUser ? (
          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-xs font-medium text-espresso block">{currentUser.email}</span>
              <span className="text-[10px] uppercase tracking-wider text-warmgray flex items-center gap-1 justify-end">
                <ShieldCheck className="w-3 h-3 text-bronze" />
                {currentUser.provider === 'google' ? 'Google Verified Client' : 'Active Account'}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="p-2.5 bg-surface border border-atelier hover:border-espresso text-espresso text-xs flex items-center gap-1.5 transition-colors rounded-sm"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              href="/studio"
              className="px-5 py-2.5 bg-espresso text-surface text-xs uppercase tracking-widest font-medium hover:bg-espresso-light transition-all rounded-sm shadow-xs flex items-center gap-2"
            >
              <User className="w-3.5 h-3.5" />
              <span>Sign In with Studio</span>
            </Link>
          </div>
        )}
      </div>

      {/* Lookup Form (If not logged in) */}
      {!currentUser && !loadingUser && (
        <div className="bg-surface border border-atelier p-6 sm:p-8 rounded-sm space-y-4 max-w-xl mx-auto shadow-xs">
          <div className="space-y-1 text-center">
            <h2 className="font-serif text-xl text-espresso">Track Order by Email</h2>
            <p className="text-xs text-warmgray font-light">
              Enter the client email address used during checkout to view dispatch status and tracking.
            </p>
          </div>

          <form onSubmit={handleLookup} className="flex gap-2 pt-2">
            <input
              type="email"
              required
              placeholder="Enter client email address..."
              value={lookupEmail}
              onChange={(e) => setLookupEmail(e.target.value)}
              className="flex-1 p-3 bg-canvas border border-atelier text-xs focus:border-bronze focus:outline-hidden rounded-sm"
            />
            <button
              type="submit"
              disabled={loadingOrders}
              className="px-6 py-3 bg-espresso text-surface text-xs uppercase tracking-widest font-medium hover:bg-espresso-light transition-colors rounded-sm"
            >
              {loadingOrders ? 'Searching...' : 'Find'}
            </button>
          </form>
        </div>
      )}

      {/* Orders List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl text-espresso font-light flex items-center gap-2">
            <Package className="w-5 h-5 text-bronze" />
            <span>Orders & Architectural Commissions</span>
          </h2>
          {orders.length > 0 && (
            <span className="text-xs text-warmgray font-medium">
              {orders.length} {orders.length === 1 ? 'Order' : 'Orders'}
            </span>
          )}
        </div>

        {loadingOrders ? (
          <div className="p-12 text-center space-y-3">
            <div className="w-6 h-6 border-2 border-bronze border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs uppercase tracking-wider text-warmgray">Loading order records...</p>
          </div>
        ) : orders.length === 0 ? (
          searched ? (
            <div className="bg-surface border border-atelier p-10 text-center space-y-3 rounded-sm">
              <Package className="w-8 h-8 text-warmgray mx-auto stroke-1" />
              <p className="font-serif text-xl text-espresso">No active orders found</p>
              <p className="text-xs text-warmgray max-w-sm mx-auto">
                No orders match this client email address. If you placed an order recently, please ensure the email matches your checkout receipt.
              </p>
            </div>
          ) : null
        ) : (
          <div className="space-y-4">
            {orders.map((ord) => (
              <div key={ord.id} className="bg-surface border border-atelier p-6 space-y-4 rounded-sm shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-atelier pb-4 gap-2 text-xs">
                  <div>
                    <span className="font-mono font-medium text-espresso block text-sm">
                      Order #{ord.orderNumber}
                    </span>
                    <span className="text-warmgray">
                      Placed on {new Date(ord.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1 text-[10px] uppercase tracking-wider font-medium rounded-xs ${
                        ord.orderStatus === 'Delivered'
                          ? 'bg-emerald-100 text-emerald-900'
                          : ord.orderStatus === 'Shipped'
                          ? 'bg-blue-100 text-blue-900'
                          : ord.orderStatus === 'Packed'
                          ? 'bg-purple-100 text-purple-900'
                          : 'bg-amber-100 text-amber-900'
                      }`}
                    >
                      {ord.orderStatus}
                    </span>
                    <span className="font-serif text-lg font-medium text-espresso">
                      ₹{ord.totalAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-3">
                  {ord.items.map((it, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs py-1.5">
                      <div className="flex items-center gap-3">
                        {it.imageUrl && (
                          <div className="w-10 h-10 rounded-sm overflow-hidden bg-canvas border border-atelier flex-shrink-0">
                            <img src={it.imageUrl} alt={it.productName} className="w-full h-full object-cover" />
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-espresso">{it.productName}</p>
                          <p className="text-[11px] text-warmgray">
                            Qty: {it.quantity} {it.unit || 'sq ft'} {it.selectedFinish ? `• ${it.selectedFinish}` : ''}
                          </p>
                        </div>
                      </div>
                      <span className="font-mono text-espresso font-medium">₹{it.subtotal.toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>

                {/* Shipping info */}
                <div className="pt-2 border-t border-atelier/60 flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-warmgray gap-1">
                  <span>
                    Delivery to: {ord.shippingAddress?.addressLine1}, {ord.shippingAddress?.city}, {ord.shippingAddress?.state} {(ord.shippingAddress as any)?.postalCode || (ord.shippingAddress as any)?.pincode || ''}
                  </span>
                  <span>Payment: {ord.paymentMethod || 'Balaji PG'} ({ord.paymentStatus})</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
