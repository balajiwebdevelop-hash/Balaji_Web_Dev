'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Check,
  X,
  Upload,
  Layers,
  ArrowUpDown,
  Eye,
  EyeOff,
} from 'lucide-react';
import { AdminLayout } from '@/components/AdminLayout';
import { ImageUploader } from '@/components/ImageUploader';
import { Product, Category, UnitType, PurchaseMode } from '@/types';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Form Fields
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [brand, setBrand] = useState('Balaji Architect & Interiors');
  const [categoryId, setCategoryId] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number>(1000);
  const [salePrice, setSalePrice] = useState<number | undefined>(undefined);
  const [unit, setUnit] = useState<UnitType>('sq ft');
  const [moq, setMoq] = useState<number>(1);
  const [stock, setStock] = useState<number>(100);
  const [purchaseMode, setPurchaseMode] = useState<PurchaseMode>('BUY_NOW');
  const [leadTime, setLeadTime] = useState('3-5 business days');
  const [dimensions, setDimensions] = useState('');
  const [thickness, setThickness] = useState('');
  const [material, setMaterial] = useState('');
  const [finish, setFinish] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [published, setPublished] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);

  const loadData = async () => {
    try {
      const [prodRes, catRes] = await Promise.all([
        fetch('/api/products?all=true', { cache: 'no-store' }),
        fetch('/api/categories?admin=true', { cache: 'no-store' }),
      ]);
      if (prodRes.ok) {
        const d = await prodRes.json();
        setProducts(d.products || []);
      }
      if (catRes.ok) {
        const c = await catRes.json();
        setCategories(c.categories || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const openCreateModal = () => {
    setEditingProduct(null);
    setName('');
    setSku(`MAT-${Math.floor(100 + Math.random() * 900)}`);
    setBrand('Balaji Architect & Interiors');
    setCategoryId(categories[0]?.id || '');
    setSubcategory('');
    setDescription('');
    setPrice(850);
    setSalePrice(undefined);
    setUnit('sq ft');
    setMoq(50);
    setStock(500);
    setPurchaseMode('BUY_NOW');
    setLeadTime('3-5 business days');
    setDimensions('');
    setThickness('');
    setMaterial('');
    setFinish('');
    setImages(['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80']);
    setPublished(true);
    setIsFeatured(false);
    setFormError(null);
    setIsModalOpen(true);
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setName(p.name);
    setSku(p.sku);
    setBrand(p.brand);
    setCategoryId(p.categoryId);
    setSubcategory(p.subcategory || '');
    setDescription(p.description);
    setPrice(p.price);
    setSalePrice(p.salePrice);
    setUnit(p.unit);
    setMoq(p.moq);
    setStock(p.stock);
    setPurchaseMode(p.purchaseMode);
    setLeadTime(p.leadTime);
    setDimensions(p.dimensions || '');
    setThickness(p.thickness || '');
    setMaterial(p.material || '');
    setFinish(p.finish || '');
    setImages(p.images || []);
    setPublished(p.published);
    setIsFeatured(p.isFeatured);
    setFormError(null);
    setIsModalOpen(true);
  };

  // Targeted Partial Update (Stock / Published toggle)
  const handleTogglePublish = async (p: Product) => {
    try {
      const res = await fetch(`/api/products/${p.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: !p.published }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success && data.product) {
        setProducts((prev) => prev.map((item) => (item.id === p.id ? data.product : item)));
      } else if (res.ok) {
        setProducts((prev) => prev.map((item) => (item.id === p.id ? { ...item, published: !p.published } : item)));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this material?')) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError(null);

    const payload = {
      name,
      sku,
      brand,
      categoryId,
      subcategory,
      description,
      price: Number(price),
      salePrice: salePrice ? Number(salePrice) : undefined,
      unit,
      moq: Number(moq),
      stock: Number(stock),
      purchaseMode,
      leadTime,
      dimensions,
      thickness,
      material,
      finish,
      images,
      published,
      isFeatured,
    };

    try {
      const url = editingProduct ? `/api/products/${editingProduct.id}` : '/api/products';
      const method = editingProduct ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success && data.product) {
        setIsModalOpen(false);
        if (editingProduct) {
          setProducts((prev) => prev.map((item) => (item.id === data.product.id ? data.product : item)));
        } else {
          setProducts((prev) => [data.product, ...prev]);
        }
      } else {
        setFormError(data.error || 'Failed to save product');
      }
    } catch (err: any) {
      setFormError(err.message || 'Error occurred');
    } finally {
      setFormLoading(false);
    }
  };

  const addImageUrl = () => {
    if (imageUrlInput.trim()) {
      setImages([...images, imageUrlInput.trim()]);
      setImageUrlInput('');
    }
  };

  const removeImage = (idx: number) => {
    setImages(images.filter((_, i) => i !== idx));
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase()) ||
      p.material?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !categoryFilter || p.categoryId === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-atelier pb-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-bronze font-medium">Catalog Management</span>
            <h1 className="font-serif text-3xl sm:text-4xl text-espresso font-light">Products & Materials</h1>
          </div>
          <button
            onClick={openCreateModal}
            className="px-5 py-2.5 btn-luxury-dark text-xs uppercase tracking-widest flex items-center gap-2 font-medium"
          >
            <Plus className="w-4 h-4" /> Add New Material
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-surface border border-atelier p-4">
          <div className="sm:col-span-2 relative">
            <input
              type="text"
              placeholder="Search by material name, SKU, or finish..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-2.5 pl-9 bg-canvas border border-atelier text-xs focus:border-bronze focus:outline-hidden"
            />
            <Search className="w-4 h-4 text-warmgray absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          <div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full p-2.5 bg-canvas border border-atelier text-xs focus:border-bronze focus:outline-hidden"
            >
              <option value="">All Categories ({categories.length})</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-surface border border-atelier overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-espresso border-collapse">
              <thead>
                <tr className="bg-canvas border-b border-atelier text-[10px] uppercase tracking-widest text-warmgray font-medium">
                  <th className="p-4">Material / Item</th>
                  <th className="p-4">SKU</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Price / Unit</th>
                  <th className="p-4">Stock on Hand</th>
                  <th className="p-4">Mode</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-atelier/60">
                {loading ? (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-warmgray">
                      Loading catalog materials...
                    </td>
                  </tr>
                ) : filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-warmgray">
                      No materials matching your criteria.
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-canvas/50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-10 h-10 bg-canvas flex-shrink-0 overflow-hidden border border-atelier">
                            {p.images[0] && (
                              <Image src={p.images[0]} alt={p.name} fill className="object-cover" />
                            )}
                          </div>
                          <div>
                            <span className="font-serif text-sm font-medium text-espresso block">{p.name}</span>
                            <span className="text-[10px] text-warmgray">{p.brand}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 font-mono text-[11px] text-warmgray">{p.sku}</td>
                      <td className="p-4">{p.categoryName || 'General'}</td>
                      <td className="p-4 font-medium text-timber">
                        ₹{(p.salePrice || p.price).toLocaleString('en-IN')}{' '}
                        <span className="text-[10px] text-warmgray font-light">/ {p.unit}</span>
                      </td>
                      <td className="p-4">
                        <span
                          className={`font-medium ${
                            p.stock <= p.moq ? 'text-red-700 font-bold' : 'text-espresso'
                          }`}
                        >
                          {p.stock} {p.unit}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 bg-canvas border border-atelier">
                          {p.purchaseMode}
                        </span>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => handleTogglePublish(p)}
                          className={`px-2 py-1 text-[10px] uppercase tracking-wider font-medium flex items-center gap-1 border ${
                            p.published
                              ? 'bg-green-50 text-green-800 border-green-200'
                              : 'bg-warmgray/10 text-warmgray border-warmgray/30'
                          }`}
                        >
                          {p.published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                          <span>{p.published ? 'Live' : 'Hidden'}</span>
                        </button>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEditModal(p)}
                            className="p-1.5 bg-canvas border border-atelier hover:border-bronze text-espresso"
                            title="Edit Material"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(p.id)}
                            className="p-1.5 bg-canvas border border-atelier hover:text-red-700 text-warmgray"
                            title="Delete Material"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-espresso/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-3xl bg-surface border border-atelier p-6 sm:p-8 space-y-6 shadow-2xl my-8">
            <div className="flex justify-between items-center border-b border-atelier pb-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-bronze font-medium">Product Matrix</span>
                <h2 className="font-serif text-2xl text-espresso">
                  {editingProduct ? `Edit "${editingProduct.name}"` : 'Add New Material'}
                </h2>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-warmgray hover:text-espresso">
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-800 text-xs">{formError}</div>
            )}

            <form onSubmit={handleSaveProduct} className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <label className="uppercase tracking-wider text-warmgray font-medium">Material Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2.5 bg-canvas border border-atelier"
                  />
                </div>

                <div className="space-y-1">
                  <label className="uppercase tracking-wider text-warmgray font-medium">SKU Code *</label>
                  <input
                    type="text"
                    required
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    className="w-full p-2.5 bg-canvas border border-atelier font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="uppercase tracking-wider text-warmgray font-medium">Category *</label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full p-2.5 bg-canvas border border-atelier"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="uppercase tracking-wider text-warmgray font-medium">Subcategory / Series</label>
                  <input
                    type="text"
                    value={subcategory}
                    onChange={(e) => setSubcategory(e.target.value)}
                    placeholder="e.g. Honed Travertine"
                    className="w-full p-2.5 bg-canvas border border-atelier"
                  />
                </div>

                <div className="space-y-1">
                  <label className="uppercase tracking-wider text-warmgray font-medium">Unit of Sale *</label>
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value as UnitType)}
                    className="w-full p-2.5 bg-canvas border border-atelier"
                  >
                    <option>sq ft</option>
                    <option>sq m</option>
                    <option>sheet</option>
                    <option>piece</option>
                    <option>box</option>
                    <option>meter</option>
                    <option>roll</option>
                    <option>set</option>
                    <option>unit</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="uppercase tracking-wider text-warmgray font-medium">Standard Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full p-2.5 bg-canvas border border-atelier"
                  />
                </div>

                <div className="space-y-1">
                  <label className="uppercase tracking-wider text-warmgray font-medium">Sale Price (₹ Optional)</label>
                  <input
                    type="number"
                    value={salePrice || ''}
                    onChange={(e) => setSalePrice(e.target.value ? Number(e.target.value) : undefined)}
                    className="w-full p-2.5 bg-canvas border border-atelier"
                  />
                </div>

                <div className="space-y-1">
                  <label className="uppercase tracking-wider text-warmgray font-medium">Stock On Hand *</label>
                  <input
                    type="number"
                    required
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                    className="w-full p-2.5 bg-canvas border border-atelier"
                  />
                </div>

                <div className="space-y-1">
                  <label className="uppercase tracking-wider text-warmgray font-medium">Minimum Order Qty (MOQ)</label>
                  <input
                    type="number"
                    value={moq}
                    onChange={(e) => setMoq(Number(e.target.value))}
                    className="w-full p-2.5 bg-canvas border border-atelier"
                  />
                </div>

                <div className="space-y-1">
                  <label className="uppercase tracking-wider text-warmgray font-medium">Purchase Mode</label>
                  <select
                    value={purchaseMode}
                    onChange={(e) => setPurchaseMode(e.target.value as PurchaseMode)}
                    className="w-full p-2.5 bg-canvas border border-atelier"
                  >
                    <option value="BUY_NOW">BUY_NOW (Instant Checkout)</option>
                    <option value="REQUEST_QUOTE">REQUEST_QUOTE (Quote Only)</option>
                    <option value="BOTH">BOTH (Buy or Request Quote)</option>
                    <option value="UNAVAILABLE">UNAVAILABLE</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <label className="uppercase tracking-wider text-warmgray font-medium">Material Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2.5 bg-canvas border border-atelier"
                />
              </div>

              {/* Device Image Uploader */}
              <div className="border-t border-atelier pt-4">
                <ImageUploader
                  bucket="products"
                  images={images}
                  onChange={setImages}
                  multiple={true}
                  label="Material High-Res Photos (Upload from Device)"
                />
              </div>

              <div className="flex items-center gap-6 border-t border-atelier pt-4 text-xs">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={published}
                    onChange={(e) => setPublished(e.target.checked)}
                    className="accent-espresso"
                  />
                  <span>Published on Storefront</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="accent-espresso"
                  />
                  <span>Feature on Homepage</span>
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-atelier">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2.5 border border-atelier text-xs uppercase tracking-widest text-warmgray hover:text-espresso"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="px-8 py-2.5 btn-luxury-dark text-xs uppercase tracking-widest font-medium"
                >
                  {formLoading ? 'Saving...' : editingProduct ? 'Update Product' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
