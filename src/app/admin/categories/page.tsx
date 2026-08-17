'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Plus, Edit2, Trash2, Check, X, FolderTree, ExternalLink } from 'lucide-react';
import { AdminLayout } from '@/components/AdminLayout';
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
  const [formError, setFormError] = useState<string | null>(null);

  const loadCategories = async () => {
    try {
      const res = await fetch('/api/categories?admin=true');
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
      if (res.ok && data.success) {
        setIsModalOpen(false);
        loadCategories();
      } else {
        setFormError(data.error || 'Failed to save category');
      }
    } catch (err: any) {
      setFormError(err.message || 'Server error');
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-atelier pb-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-bronze font-medium">Structure</span>
            <h1 className="font-serif text-3xl sm:text-4xl text-espresso font-light">Material Categories</h1>
          </div>
          <button
            onClick={openCreateModal}
            className="px-5 py-2.5 btn-luxury-dark text-xs uppercase tracking-widest flex items-center gap-2 font-medium"
          >
            <Plus className="w-4 h-4" /> Create Category
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="bg-surface border border-atelier p-5 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="relative aspect-[16/9] bg-canvas overflow-hidden border border-atelier">
                  {cat.imageUrl && (
                    <Image src={cat.imageUrl} alt={cat.name} fill className="object-cover" />
                  )}
                  <span className="absolute top-2 right-2 px-2 py-0.5 bg-espresso text-surface text-[10px] uppercase font-mono">
                    Order: {cat.sortOrder}
                  </span>
                </div>

                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="font-serif text-xl text-espresso font-medium">{cat.name}</h3>
                    <span className="text-xs text-bronze font-medium">{cat.productCount || 0} Materials</span>
                  </div>
                  <p className="text-[11px] font-mono text-warmgray mt-0.5">/category/{cat.slug}</p>
                  {cat.description && (
                    <p className="text-xs text-warmgray font-light mt-2 line-clamp-2">{cat.description}</p>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-atelier flex items-center justify-between">
                <span
                  className={`text-[10px] uppercase tracking-wider px-2 py-0.5 ${
                    cat.isActive ? 'bg-green-100 text-green-800' : 'bg-warmgray/20 text-warmgray'
                  }`}
                >
                  {cat.isActive ? 'Active' : 'Disabled'}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(cat)}
                    className="p-1.5 bg-canvas border border-atelier hover:border-bronze text-espresso text-xs"
                    title="Edit"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(cat.id)}
                    className="p-1.5 bg-canvas border border-atelier hover:text-red-700 text-warmgray text-xs"
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
        <div className="fixed inset-0 z-50 bg-espresso/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-surface border border-atelier p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex justify-between items-center border-b border-atelier pb-4">
              <h2 className="font-serif text-2xl text-espresso">
                {editingCategory ? 'Edit Category' : 'New Category'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-warmgray hover:text-espresso">
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-800 text-xs">{formError}</div>
            )}

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="uppercase tracking-wider text-warmgray font-medium">Category Title *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 bg-canvas border border-atelier text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="uppercase tracking-wider text-warmgray font-medium">Slug URL (Optional)</label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="e.g. natural-stone-marble"
                  className="w-full p-2.5 bg-canvas border border-atelier text-xs font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="uppercase tracking-wider text-warmgray font-medium">Cover Image URL</label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full p-2.5 bg-canvas border border-atelier text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="uppercase tracking-wider text-warmgray font-medium">Sort Order</label>
                  <input
                    type="number"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(Number(e.target.value))}
                    className="w-full p-2.5 bg-canvas border border-atelier text-xs"
                  />
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="accent-espresso"
                  />
                  <label htmlFor="isActive" className="uppercase tracking-wider text-espresso font-medium cursor-pointer">
                    Active in Navbar
                  </label>
                </div>
              </div>

              <div className="space-y-1">
                <label className="uppercase tracking-wider text-warmgray font-medium">Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2.5 bg-canvas border border-atelier text-xs"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-atelier">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2.5 border border-atelier text-xs uppercase tracking-widest text-warmgray"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-8 py-2.5 btn-luxury-dark text-xs uppercase tracking-widest font-medium"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
