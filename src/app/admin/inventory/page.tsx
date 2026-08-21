'use client';

import React, { useEffect, useState } from 'react';
import { Boxes, AlertTriangle, Check, Search, Save, RefreshCw } from 'lucide-react';
import { AdminLayout } from '@/components/AdminLayout';
import { Product } from '@/types';

export default function AdminInventoryPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [stockChanges, setStockChanges] = useState<Record<string, number>>({});
  const [savingId, setSavingId] = useState<string | null>(null);
  const [saveSuccessId, setSaveSuccessId] = useState<string | null>(null);
  const [filterLowOnly, setFilterLowOnly] = useState(false);
  const [search, setSearch] = useState('');

  const loadProducts = async () => {
    try {
      const res = await fetch('/api/products?all=true');
      if (res.ok) {
        const d = await res.json();
        setProducts(d.products || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleStockInputChange = (productId: string, val: number) => {
    setStockChanges({
      ...stockChanges,
      [productId]: val,
    });
  };

  const handleSaveStock = async (product: Product) => {
    const newStock = stockChanges[product.id] !== undefined ? stockChanges[product.id] : product.stock;
    setSavingId(product.id);

    try {
      const res = await fetch(`/api/products/${product.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stock: Number(newStock) }),
      });

      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success && data.product) {
        setProducts((prev) => prev.map((p) => (p.id === product.id ? data.product : p)));
        setSaveSuccessId(product.id);
        setTimeout(() => setSaveSuccessId(null), 2500);
      } else if (res.ok) {
        setProducts((prev) => prev.map((p) => (p.id === product.id ? { ...p, stock: Number(newStock) } : p)));
        setSaveSuccessId(product.id);
        setTimeout(() => setSaveSuccessId(null), 2500);
      }
    } catch (e) {
      console.error('Failed to update stock', e);
    } finally {
      setSavingId(null);
    }
  };

  const filtered = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase());
    const isLow = p.stock <= (p.moq * 2) || p.stock < 10;
    if (filterLowOnly) return matchesSearch && isLow;
    return matchesSearch;
  });

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-atelier pb-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-bronze font-medium">Warehouse & Logistics</span>
            <h1 className="font-serif text-3xl sm:text-4xl text-espresso font-light">Inventory Control</h1>
          </div>
          <button
            onClick={loadProducts}
            className="p-2.5 bg-surface border border-atelier hover:border-bronze text-espresso text-xs uppercase tracking-wider flex items-center gap-1.5 self-start"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Sync Stock
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 bg-surface border border-atelier p-4 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="Search material or SKU..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-2.5 pl-9 bg-canvas border border-atelier text-xs focus:border-bronze focus:outline-hidden"
            />
            <Search className="w-4 h-4 text-warmgray absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          <label className="flex items-center gap-2 text-xs uppercase tracking-wider text-espresso cursor-pointer self-start sm:self-center">
            <input
              type="checkbox"
              checked={filterLowOnly}
              onChange={(e) => setFilterLowOnly(e.target.checked)}
              className="accent-espresso"
            />
            <span className="flex items-center gap-1 text-amber-700 font-medium">
              <AlertTriangle className="w-3.5 h-3.5" /> Show Low-Stock Lots Only
            </span>
          </label>
        </div>

        {/* Table */}
        <div className="bg-surface border border-atelier overflow-hidden">
          <table className="w-full text-left text-xs text-espresso border-collapse">
            <thead>
              <tr className="bg-canvas border-b border-atelier text-[10px] uppercase tracking-widest text-warmgray font-medium">
                <th className="p-4">Material / SKU</th>
                <th className="p-4">Category</th>
                <th className="p-4">Unit of Measure</th>
                <th className="p-4">MOQ</th>
                <th className="p-4">Stock on Hand</th>
                <th className="p-4">Quick Adjust</th>
                <th className="p-4 text-right">Save</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-atelier/60">
              {loading ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-warmgray">
                    Loading inventory records...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-warmgray">
                    No material records found.
                  </td>
                </tr>
              ) : (
                filtered.map((p) => {
                  const currentInputStock =
                    stockChanges[p.id] !== undefined ? stockChanges[p.id] : p.stock;
                  const isModified = stockChanges[p.id] !== undefined && stockChanges[p.id] !== p.stock;
                  const isLow = p.stock <= p.moq;

                  return (
                    <tr key={p.id} className="hover:bg-canvas/50 transition-colors">
                      <td className="p-4">
                        <span className="font-serif text-sm font-medium text-espresso block">{p.name}</span>
                        <span className="text-[10px] font-mono text-warmgray">SKU: {p.sku}</span>
                      </td>
                      <td className="p-4 text-warmgray">{p.categoryName}</td>
                      <td className="p-4 uppercase font-medium">{p.unit}</td>
                      <td className="p-4 text-warmgray">{p.moq}</td>
                      <td className="p-4">
                        <span
                          className={`font-medium px-2 py-1 ${
                            isLow
                              ? 'bg-red-50 text-red-800 border border-red-200'
                              : 'bg-canvas text-espresso'
                          }`}
                        >
                          {p.stock} {p.unit}
                        </span>
                      </td>
                      <td className="p-4">
                        <input
                          type="number"
                          min="0"
                          value={currentInputStock}
                          onChange={(e) => handleStockInputChange(p.id, Number(e.target.value))}
                          className="w-24 p-1.5 bg-canvas border border-atelier text-xs text-espresso font-medium focus:border-bronze focus:outline-hidden"
                        />
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleSaveStock(p)}
                          disabled={savingId === p.id || !isModified}
                          className={`px-3 py-1.5 text-xs uppercase tracking-wider font-medium inline-flex items-center gap-1 ${
                            saveSuccessId === p.id
                              ? 'bg-green-700 text-white'
                              : isModified
                              ? 'btn-luxury-dark cursor-pointer'
                              : 'opacity-40 bg-canvas text-warmgray cursor-not-allowed border border-atelier'
                          }`}
                        >
                          {saveSuccessId === p.id ? (
                            <>
                              <Check className="w-3.5 h-3.5" /> Saved
                            </>
                          ) : (
                            <>
                              <Save className="w-3.5 h-3.5" /> Update
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
