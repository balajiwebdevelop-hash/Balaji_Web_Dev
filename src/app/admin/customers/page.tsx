'use client';

import React, { useEffect, useState } from 'react';
import { Users, Search, ShoppingBag, Mail, Phone, MapPin } from 'lucide-react';
import { AdminLayout } from '@/components/AdminLayout';
import { Order } from '@/types';

interface AggregatedCustomer {
  email: string;
  name: string;
  phone: string;
  city: string;
  orderCount: number;
  totalSpend: number;
  lastOrderDate: string;
}

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<AggregatedCustomer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function loadCustomers() {
      try {
        const res = await fetch('/api/orders');
        if (res.ok) {
          const data = await res.json();
          const orders: Order[] = data.orders || [];

          const map = new Map<string, AggregatedCustomer>();

          orders.forEach((o) => {
            const key = o.customerEmail.toLowerCase().trim();
            if (!map.has(key)) {
              map.set(key, {
                email: o.customerEmail,
                name: o.customerName,
                phone: o.customerPhone,
                city: o.shippingAddress.city || 'Mumbai',
                orderCount: 1,
                totalSpend: o.totalAmount,
                lastOrderDate: o.createdAt,
              });
            } else {
              const cur = map.get(key)!;
              cur.orderCount += 1;
              cur.totalSpend += o.totalAmount;
              if (new Date(o.createdAt) > new Date(cur.lastOrderDate)) {
                cur.lastOrderDate = o.createdAt;
              }
            }
          });

          setCustomers(Array.from(map.values()));
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadCustomers();
  }, []);

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-atelier pb-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-bronze font-medium">Client Directory</span>
            <h1 className="font-serif text-3xl sm:text-4xl text-espresso font-light">Client Portfolio</h1>
          </div>
          <div className="text-xs text-warmgray">
            Total Unique Clients: <strong className="text-espresso">{customers.length}</strong>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Search by client name, email, or city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2.5 pl-9 bg-surface border border-atelier text-xs focus:border-bronze focus:outline-hidden"
          />
          <Search className="w-4 h-4 text-warmgray absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        {/* Customers Table */}
        <div className="bg-surface border border-atelier overflow-hidden">
          <table className="w-full text-left text-xs text-espresso border-collapse">
            <thead>
              <tr className="bg-canvas border-b border-atelier text-[10px] uppercase tracking-widest text-warmgray font-medium">
                <th className="p-4">Client Entity</th>
                <th className="p-4">Contact</th>
                <th className="p-4">Primary Location</th>
                <th className="p-4">Orders Placed</th>
                <th className="p-4">Lifetime Value</th>
                <th className="p-4 text-right">Last Transaction</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-atelier/60">
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-warmgray">
                    Loading client records...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-warmgray">
                    No client records found.
                  </td>
                </tr>
              ) : (
                filtered.map((c) => (
                  <tr key={c.email} className="hover:bg-canvas/50 transition-colors">
                    <td className="p-4 font-medium text-espresso">{c.name}</td>
                    <td className="p-4">
                      <div className="space-y-0.5 text-[11px] text-warmgray">
                        <span className="flex items-center gap-1.5"><Mail className="w-3 h-3 text-bronze" /> {c.email}</span>
                        <span className="flex items-center gap-1.5"><Phone className="w-3 h-3 text-bronze" /> {c.phone}</span>
                      </div>
                    </td>
                    <td className="p-4 text-warmgray">{c.city}</td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 bg-canvas border border-atelier text-[10px] font-mono">
                        {c.orderCount}
                      </span>
                    </td>
                    <td className="p-4 font-serif text-sm font-medium text-timber">
                      ₹{c.totalSpend.toLocaleString('en-IN')}
                    </td>
                    <td className="p-4 text-right text-warmgray">
                      {new Date(c.lastOrderDate).toLocaleDateString('en-IN')}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
