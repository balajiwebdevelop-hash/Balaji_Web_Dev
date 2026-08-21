'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Plus, Edit2, Trash2, Check, X, Compass, Eye, EyeOff } from 'lucide-react';
import { AdminLayout } from '@/components/AdminLayout';
import { ImageUploader } from '@/components/ImageUploader';
import { Service } from '@/types';

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [fullDesc, setFullDesc] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [deliverables, setDeliverables] = useState<string[]>([]);
  const [deliverableInput, setDeliverableInput] = useState('');
  const [sortOrder, setSortOrder] = useState(0);
  const [isPublished, setIsPublished] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const loadServices = async () => {
    try {
      const res = await fetch('/api/services?all=true');
      if (res.ok) {
        const d = await res.json();
        setServices(d.services || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const openCreateModal = () => {
    setEditingService(null);
    setTitle('');
    setSlug('');
    setShortDesc('');
    setFullDesc('');
    setImageUrl('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80');
    setDeliverables(['Concept Moodboards', 'Spatial CAD Layouts', 'Material Procurement Schedule']);
    setSortOrder(services.length + 1);
    setIsPublished(true);
    setFormError(null);
    setIsModalOpen(true);
  };

  const openEditModal = (s: Service) => {
    setEditingService(s);
    setTitle(s.title);
    setSlug(s.slug);
    setShortDesc(s.shortDesc);
    setFullDesc(s.fullDesc);
    setImageUrl(s.imageUrl || '');
    setDeliverables(s.deliverables || []);
    setSortOrder(s.sortOrder);
    setIsPublished(s.isPublished);
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleTogglePublish = async (s: Service) => {
    try {
      const res = await fetch(`/api/services/${s.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPublished: !s.isPublished }),
      });
      if (res.ok) {
        setServices(services.map((item) => (item.id === s.id ? { ...item, isPublished: !s.isPublished } : item)));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this architectural service?')) return;
    try {
      const res = await fetch(`/api/services/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setServices((prev) => prev.filter((s) => s.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError(null);

    const payload = {
      title,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      shortDesc,
      fullDesc,
      iconName: 'Compass',
      imageUrl,
      deliverables,
      sortOrder: Number(sortOrder),
      isPublished,
    };

    try {
      const url = editingService ? `/api/services/${editingService.id}` : '/api/services';
      const method = editingService ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success && data.service) {
        setIsModalOpen(false);
        if (editingService) {
          setServices((prev) => prev.map((s) => (s.id === data.service.id ? data.service : s)));
        } else {
          setServices((prev) => [...prev, data.service]);
        }
      } else {
        setFormError(data.error || 'Failed to save service');
      }
    } catch (err: any) {
      setFormError(err.message || 'Error occurred');
    } finally {
      setFormLoading(false);
    }
  };

  const addDeliverable = () => {
    if (deliverableInput.trim()) {
      setDeliverables([...deliverables, deliverableInput.trim()]);
      setDeliverableInput('');
    }
  };

  const removeDeliverable = (idx: number) => {
    setDeliverables(deliverables.filter((_, i) => i !== idx));
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-atelier pb-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-bronze font-medium">Practice Offerings</span>
            <h1 className="font-serif text-3xl sm:text-4xl text-espresso font-light">Architectural Services</h1>
          </div>
          <button
            onClick={openCreateModal}
            className="px-5 py-2.5 btn-luxury-dark text-xs uppercase tracking-widest flex items-center gap-2 font-medium"
          >
            <Plus className="w-4 h-4" /> Add Service Offering
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((srv) => (
            <div
              key={srv.id}
              className="bg-surface border border-atelier p-5 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="relative aspect-[16/10] bg-canvas overflow-hidden border border-atelier">
                  {srv.imageUrl && <Image src={srv.imageUrl} alt={srv.title} fill className="object-cover" />}
                </div>

                <div>
                  <h3 className="font-serif text-xl text-espresso font-medium">{srv.title}</h3>
                  <p className="text-xs text-warmgray font-light mt-1.5 line-clamp-2">{srv.shortDesc}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-atelier flex items-center justify-between">
                <button
                  onClick={() => handleTogglePublish(srv)}
                  className={`px-2 py-1 text-[10px] uppercase tracking-wider font-medium flex items-center gap-1 border ${
                    srv.isPublished
                      ? 'bg-green-50 text-green-800 border-green-200'
                      : 'bg-warmgray/10 text-warmgray border-warmgray/30'
                  }`}
                >
                  {srv.isPublished ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                  <span>{srv.isPublished ? 'Live' : 'Hidden'}</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(srv)}
                    className="p-1.5 bg-canvas border border-atelier hover:border-bronze text-espresso text-xs"
                    title="Edit"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(srv.id)}
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

      {/* Service Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-espresso/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-xl bg-surface border border-atelier p-6 sm:p-8 space-y-6 shadow-2xl my-8">
            <div className="flex justify-between items-center border-b border-atelier pb-4">
              <h2 className="font-serif text-2xl text-espresso">
                {editingService ? `Edit Service` : 'New Architectural Service'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-warmgray hover:text-espresso">
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-800 text-xs">{formError}</div>
            )}

            <form onSubmit={handleSave} className="space-y-4 text-xs max-h-[70vh] overflow-y-auto pr-2">
              <div className="space-y-1">
                <label className="uppercase tracking-wider text-warmgray font-medium">Service Name *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2.5 bg-canvas border border-atelier text-xs"
                />
              </div>

              <div className="border-t border-atelier pt-3">
                <ImageUploader
                  bucket="services"
                  images={imageUrl ? [imageUrl] : []}
                  onChange={(imgs) => setImageUrl(imgs[0] || '')}
                  multiple={false}
                  label="Service Cover Photo (Upload from Device)"
                />
              </div>

              <div className="space-y-1">
                <label className="uppercase tracking-wider text-warmgray font-medium">Short Summary</label>
                <textarea
                  rows={2}
                  value={shortDesc}
                  onChange={(e) => setShortDesc(e.target.value)}
                  className="w-full p-2.5 bg-canvas border border-atelier text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="uppercase tracking-wider text-warmgray font-medium">Detailed Scope Description</label>
                <textarea
                  rows={4}
                  value={fullDesc}
                  onChange={(e) => setFullDesc(e.target.value)}
                  className="w-full p-2.5 bg-canvas border border-atelier text-xs"
                />
              </div>

              {/* Deliverables */}
              <div className="space-y-2 border-t border-atelier pt-3">
                <label className="uppercase tracking-wider text-warmgray font-medium block">
                  Key Deliverables
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. 3D Volumetric BIM Models"
                    value={deliverableInput}
                    onChange={(e) => setDeliverableInput(e.target.value)}
                    className="flex-1 p-2 bg-canvas border border-atelier text-xs"
                  />
                  <button
                    type="button"
                    onClick={addDeliverable}
                    className="px-4 py-2 bg-espresso text-surface text-xs"
                  >
                    Add
                  </button>
                </div>

                <ul className="space-y-1 pt-1">
                  {deliverables.map((item, idx) => (
                    <li key={idx} className="flex justify-between items-center p-2 bg-canvas border border-atelier text-xs">
                      <span>• {item}</span>
                      <button type="button" onClick={() => removeDeliverable(idx)} className="text-red-700">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </li>
                  ))}
                </ul>
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
                  disabled={formLoading}
                  className="px-8 py-2.5 btn-luxury-dark text-xs uppercase tracking-widest font-medium"
                >
                  {formLoading ? 'Saving...' : editingService ? 'Update Service' : 'Create Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
