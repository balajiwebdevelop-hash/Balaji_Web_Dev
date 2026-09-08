'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Boxes, AlertTriangle, Check, Search, Save, RefreshCw } from 'lucide-react';
import { AdminLayout } from '@/components/AdminLayout';
import { Product } from '@/types';

function AdminInventoryContent() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams?.get('search') || searchParams?.get('id') || '';

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [stockChanges, setStockChanges] = useState<Record<string, number>>({});
  const [savingId, setSavingId] = useState<string | null>(null);
  const [saveSuccessId, setSaveSuccessId] = useState<string | null>(null);
  const [filterLowOnly, setFilterLowOnly] = useState(false);
  const [search, setSearch] = useState(initialSearch);

  useEffect(() => {
    if (initialSearch) {
      setSearch(initialSearch);
    }
  }, [initialSearch]);

  const loadProducts = async () => {
    try {
      const res = await fetch('/api/products?all=true', { cache: 'no-store' });
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
    const sanitized = isNaN(val) ? 0 : Math.max(0, Math.floor(val));
    setStockChanges({
      ...stockChanges,
      [productId]: sanitized,
    });
  };

  const handleSaveStock = async (product: Product) => {
    const rawStock = stockChanges[product.id] !== undefined ? stockChanges[product.id] : product.stock;
    const numStock = Number(rawStock);

    if (isNaN(numStock) || numStock < 0 || !Number.isInteger(numStock)) {
      alert('Stock quantity must be a non-negative whole integer.');
      return;
    }

    setSavingId(product.id);

    try {
      const res = await fetch(`/api/products/${product.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stock: numStock }),
      });

      const data = await res.json().catch(() => ({}));
      if (res.ok && data.product) {
        setProducts((prev) => prev.map((p) => (p.id === product.id ? data.product : p)));
        setSaveSuccessId(product.id);
        setTimeout(() => setSaveSuccessId(null), 2500);
      } else {
        alert(`Failed to update stock: ${data.error || 'Server error'}`);
      }
    } catch (e: any) {
      console.error('Failed to update stock', e);
      alert(`Network error updating stock: ${e.message}`);
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#281F19] pb-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-champagne font-medium">Warehouse & Logistics</span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#FCFAF6] font-light">Inventory Control</h1>
          </div>
          <button
            onClick={loadProducts}
            className="p-2.5 bg-[#1D1714] border border-[#332821] hover:border-champagne/60 text-[#FCFAF6] text-xs uppercase tracking-wider flex items-center gap-1.5 self-start rounded-xs transition-colors shadow-xs"
          >
            <RefreshCw className="w-3.5 h-3.5 text-champagne" /> Sync Stock
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 bg-[#1D1714] border border-[#332821] p-4 items-center justify-between rounded-xs shadow-xs">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="Search material or SKU..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-2.5 pl-9 bg-[#14100D] border border-[#382D25] text-xs text-[#FCFAF6] placeholder-[#7E7469] focus:border-champagne focus:ring-1 focus:ring-champagne/40 focus:outline-hidden rounded-xs"
            />
            <Search className="w-4 h-4 text-champagne/60 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          <label className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#FCFAF6] cursor-pointer self-start sm:self-center">
            <input
              type="checkbox"
              checked={filterLowOnly}
              onChange={(e) => setFilterLowOnly(e.target.checked)}
              className="accent-champagne"
            />
            <span className="flex items-center gap-1 text-amber-400 font-medium">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" /> Show Low-Stock Lots Only
            </span>
          </label>
        </div>

        {/* Mobile Inventory Cards View (< md) */}
        <div className="md:hidden space-y-3">
          {loading ? (
            <div className="p-8 bg-[#1D1714] border border-[#332821] text-center text-[#A89F91] rounded-xs text-xs">
              Loading inventory records...
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-8 bg-[#1D1714] border border-[#332821] text-center text-[#7E7469] rounded-xs text-xs">
              No material records found.
            </div>
          ) : (
            filtered.map((p) => {
              const currentInputStock =
                stockChanges[p.id] !== undefined ? stockChanges[p.id] : p.stock;
              const isModified = stockChanges[p.id] !== undefined && stockChanges[p.id] !== p.stock;
              const isLow = p.stock <= p.moq;

              return (
                <div
                  key={p.id}
                  className="p-4 bg-[#140F0C] border border-[#241C16] hover:border-champagne/40 rounded-xs space-y-3 shadow-xs"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-serif text-sm font-medium text-[#FCFAF6] block">{p.name}</span>
                      <span className="text-[10px] font-mono text-[#A89F91]">SKU: {p.sku} • {p.categoryName || 'General'}</span>
                    </div>
                    <span
                      className={`text-[9px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-2xs border ${
                        isLow
                          ? 'bg-red-950/40 text-red-300 border-red-800/50'
                          : 'bg-[#1A1410] text-[#A89F91] border-[#332821]'
                      }`}
                    >
                      {isLow ? 'Low Stock' : 'In Stock'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1 border-t border-[#201712]">
                    <div>
                      <span className="text-[10px] text-[#8E8275] block">Current Stock</span>
                      <span className="font-medium text-[#FCFAF6] text-xs">
                        {p.stock} {p.unit} <span className="text-[10px] text-[#7E7469]">(MOQ: {p.moq})</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleStockInputChange(p.id, Math.max(0, currentInputStock - 1))}
                        className="w-8 h-8 bg-[#1F1814] border border-[#382D25] text-[#FCFAF6] hover:border-champagne rounded-xs flex items-center justify-center font-bold text-sm"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="0"
                        value={currentInputStock}
                        onChange={(e) => handleStockInputChange(p.id, Number(e.target.value))}
                        className="w-16 h-8 text-center bg-[#14100D] border border-[#382D25] text-xs text-champagne font-semibold focus:border-champagne focus:outline-hidden rounded-xs"
                      />
                      <button
                        type="button"
                        onClick={() => handleStockInputChange(p.id, currentInputStock + 1)}
                        className="w-8 h-8 bg-[#1F1814] border border-[#382D25] text-[#FCFAF6] hover:border-champagne rounded-xs flex items-center justify-center font-bold text-sm"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#201712]">
                    <button
                      onClick={() => handleSaveStock(p)}
                      disabled={savingId === p.id || !isModified}
                      className={`w-full py-2 text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-1.5 rounded-xs transition-all ${
                        saveSuccessId === p.id
                          ? 'bg-emerald-700 text-white shadow-xs'
                          : isModified
                          ? 'bg-champagne text-[#100C0A] hover:bg-[#DAC19E] cursor-pointer shadow-xs'
                          : 'opacity-40 bg-[#14100D] text-[#7E7469] cursor-not-allowed border border-[#332821]'
                      }`}
                    >
                      {saveSuccessId === p.id ? (
                        <>
                          <Check className="w-3.5 h-3.5" /> Saved Successfully
                        </>
                      ) : (
                        <>
                          <Save className="w-3.5 h-3.5" /> Save Stock Update
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Desktop Table (hidden md:block - 100% UNTOUCHED) */}
        <div className="hidden md:block bg-[#1D1714] border border-[#332821] overflow-hidden rounded-xs shadow-xs">
          <table className="w-full text-left text-xs text-[#FCFAF6] border-collapse">
            <thead>
              <tr className="bg-[#16110E] border-b border-[#281F19] text-[10px] uppercase tracking-widest text-champagne/90 font-medium">
                <th className="p-4">Material / SKU</th>
                <th className="p-4">Category</th>
                <th className="p-4">Unit of Measure</th>
                <th className="p-4">MOQ</th>
                <th className="p-4">Stock on Hand</th>
                <th className="p-4">Quick Adjust</th>
                <th className="p-4 text-right">Save</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#281F19]">
              {loading ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-[#A89F91]">
                    Loading inventory records...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-[#7E7469]">
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
                    <tr key={p.id} className="hover:bg-[#251E1A]/60 transition-colors">
                      <td className="p-4">
                        <span className="font-serif text-sm font-medium text-[#FCFAF6] block">{p.name}</span>
                        <span className="text-[10px] font-mono text-[#A89F91]">SKU: {p.sku}</span>
                      </td>
                      <td className="p-4 text-[#D8CEBF]">{p.categoryName}</td>
                      <td className="p-4 uppercase font-medium text-champagne">{p.unit}</td>
                      <td className="p-4 text-[#A89F91]">{p.moq}</td>
                      <td className="p-4">
                        <span
                          className={`font-medium px-2 py-1 rounded-2xs ${
                            isLow
                              ? 'bg-red-950/40 text-red-300 border border-red-800/50'
                              : 'bg-[#14100D] text-[#FCFAF6] border border-[#332821]'
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
                          className="w-24 p-1.5 bg-[#14100D] border border-[#382D25] text-xs text-[#FCFAF6] font-medium focus:border-champagne focus:outline-hidden rounded-xs"
                        />
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleSaveStock(p)}
                          disabled={savingId === p.id || !isModified}
                          className={`px-3.5 py-1.5 text-xs uppercase tracking-wider font-medium inline-flex items-center gap-1 rounded-xs transition-all ${
                            saveSuccessId === p.id
                              ? 'bg-emerald-700 text-white shadow-xs'
                              : isModified
                              ? 'bg-champagne text-[#100C0A] hover:bg-[#DAC19E] cursor-pointer shadow-xs font-semibold'
                              : 'opacity-40 bg-[#14100D] text-[#7E7469] cursor-not-allowed border border-[#332821]'
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

export default function AdminInventoryPage() {
  return (
    <Suspense fallback={<div className="p-16 text-center text-champagne text-xs">Loading inventory records...</div>}>
      <AdminInventoryContent />
    </Suspense>
  );
}
