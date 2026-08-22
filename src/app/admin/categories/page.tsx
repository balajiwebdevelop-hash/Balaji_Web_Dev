'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Plus, Edit2, Trash2, Check, X, FolderTree, ExternalLink } from 'lucide-react';
import { AdminLayout } from '@/components/AdminLayout';
import { ImageUploader } from '@/components/ImageUploader';
import { Category } from '@/types';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [sortOrder, setSortOrder] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const loadCategories = async () => {
    try {
      const res = await fetch('/api/categories?admin=true', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setCategories(data.categories || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const openCreateModal = () => {
    setEditingCategory(null);
    setName('');
    setSlug('');
    setDescription('');
    setImageUrl('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80');
    setSortOrder(categories.length + 1);
    setIsActive(true);
    setFormError(null);
    setIsModalOpen(true);
  };

  const openEditModal = (c: Category) => {
    setEditingCategory(c);
    setName(c.name);
    setSlug(c.slug);
    setDescription(c.description || '');
    setImageUrl(c.imageUrl || '');
    setSortOrder(c.sortOrder);
    setIsActive(c.isActive);
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError(null);

    const payload = {
      name,
      slug: slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description,
      imageUrl,
      sortOrder: Number(sortOrder),
      isActive,
    };

    try {
      const url = editingCategory ? `/api/categories/${editingCategory.id}` : '/api/categories';
      const method = editingCategory ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success && data.category) {
        setIsModalOpen(false);
        if (editingCategory) {
          setCategories((prev) => prev.map((c) => (c.id === data.category.id ? data.category : c)));
        } else {
          setCategories((prev) => [...prev, data.category]);
        }
      } else {
        setFormError(data.error || 'Failed to save category');
      }
    } catch (err: any) {
      setFormError(err.message || 'Server error');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return;
    try {
      const res = await fetch(`/api/categories/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setCategories(categories.filter((c) => c.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#281F19] pb-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-champagne font-medium">Structure</span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#FCFAF6] font-light">Material Categories</h1>
          </div>
          <button
            onClick={openCreateModal}
            className="px-5 py-2.5 bg-champagne text-[#100C0A] hover:bg-[#DAC19E] border border-champagne text-xs uppercase tracking-widest flex items-center gap-2 font-medium transition-all rounded-xs shadow-xs"
          >
            <Plus className="w-4 h-4" /> Create Category
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="bg-[#1D1714] border border-[#332821] p-5 space-y-4 flex flex-col justify-between rounded-xs shadow-xs"
            >
              <div className="space-y-3">
                <div className="relative aspect-[16/9] bg-[#14100D] overflow-hidden border border-[#332821] rounded-xs">
                  {cat.imageUrl && (
                    <Image src={cat.imageUrl} alt={cat.name} fill className="object-cover" />
                  )}
                  <span className="absolute top-2 right-2 px-2 py-0.5 bg-black/80 text-champagne text-[10px] uppercase font-mono border border-champagne/30 rounded-2xs">
                    Order: {cat.sortOrder}
                  </span>
                </div>

                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="font-serif text-xl text-[#FCFAF6] font-medium">{cat.name}</h3>
                    <span className="text-xs text-champagne font-medium">{cat.productCount || 0} Materials</span>
                  </div>
                  <p className="text-[11px] font-mono text-champagne/70 mt-0.5">/category/{cat.slug}</p>
                  {cat.description && (
                    <p className="text-xs text-[#A89F91] font-light mt-2 line-clamp-2">{cat.description}</p>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-[#281F19] flex items-center justify-between">
                <span
                  className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-2xs font-medium ${
                    cat.isActive ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-800/50' : 'bg-white/5 text-[#A89F91] border border-[#382D25]'
                  }`}
                >
                  {cat.isActive ? 'Active' : 'Disabled'}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(cat)}
                    className="p-1.5 bg-[#251E1A] border border-[#3D3027] hover:border-champagne text-[#FCFAF6] text-xs rounded-xs transition-colors"
                    title="Edit"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(cat.id)}
                    className="p-1.5 bg-[#251E1A] border border-[#3D3027] hover:border-red-500 hover:text-red-400 text-[#A89F91] text-xs rounded-xs transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#1D1714] border border-champagne/30 p-6 sm:p-8 space-y-6 shadow-2xl rounded-sm">
            <div className="flex justify-between items-center border-b border-[#281F19] pb-4">
              <h2 className="font-serif text-2xl text-[#FCFAF6]">
                {editingCategory ? 'Edit Category' : 'New Category'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-[#A89F91] hover:text-[#FCFAF6] transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="p-3 bg-red-950/40 border border-red-800/50 text-red-300 text-xs rounded-xs">{formError}</div>
            )}

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="uppercase tracking-wider text-champagne/90 font-medium">Category Title *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 bg-[#14100D] border border-[#382D25] text-xs text-[#FCFAF6] focus:border-champagne focus:outline-hidden rounded-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="uppercase tracking-wider text-champagne/90 font-medium">Slug URL (Optional)</label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="e.g. natural-stone-marble"
                  className="w-full p-2.5 bg-[#14100D] border border-[#382D25] text-xs text-[#FCFAF6] placeholder-[#7E7469] font-mono focus:border-champagne focus:outline-hidden rounded-xs"
                />
              </div>

              <div className="border-t border-[#281F19] pt-3">
                <ImageUploader
                  bucket="products"
                  images={imageUrl ? [imageUrl] : []}
                  onChange={(imgs) => setImageUrl(imgs[0] || '')}
                  multiple={false}
                  label="Category Cover Photo (Upload from Device)"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="uppercase tracking-wider text-champagne/90 font-medium">Sort Order</label>
                  <input
                    type="number"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(Number(e.target.value))}
                    className="w-full p-2.5 bg-[#14100D] border border-[#382D25] text-xs text-[#FCFAF6] focus:border-champagne focus:outline-hidden rounded-xs"
                  />
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="accent-champagne"
                  />
                  <label htmlFor="isActive" className="uppercase tracking-wider text-[#FCFAF6] font-medium cursor-pointer">
                    Active in Navbar
                  </label>
                </div>
              </div>

              <div className="space-y-1">
                <label className="uppercase tracking-wider text-champagne/90 font-medium">Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2.5 bg-[#14100D] border border-[#382D25] text-xs text-[#FCFAF6] focus:border-champagne focus:outline-hidden rounded-xs"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-[#281F19]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2.5 border border-[#382D25] text-xs uppercase tracking-widest text-[#A89F91] hover:text-[#FCFAF6] hover:border-champagne/40 transition-colors rounded-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="px-8 py-2.5 bg-champagne text-[#100C0A] hover:bg-[#DAC19E] border border-champagne text-xs uppercase tracking-widest font-medium transition-all rounded-xs shadow-xs"
                >
                  {formLoading ? 'Saving...' : editingCategory ? 'Update Category' : 'Create Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
