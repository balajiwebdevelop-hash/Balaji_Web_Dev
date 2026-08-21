'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Plus, Edit2, Trash2, Check, X, Building2, Eye, EyeOff } from 'lucide-react';
import { AdminLayout } from '@/components/AdminLayout';
import { ImageUploader } from '@/components/ImageUploader';
import { Project, ProjectType } from '@/types';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Fields
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [location, setLocation] = useState('Mumbai');
  const [year, setYear] = useState('2025');
  const [projectType, setProjectType] = useState<ProjectType>('Residential Interiors');
  const [area, setArea] = useState('6,500 sq ft');
  const [shortDescription, setShortDescription] = useState('');
  const [description, setDescription] = useState('');
  const [heroImage, setHeroImage] = useState('');
  const [gallery, setGallery] = useState<string[]>([]);
  const [galleryInput, setGalleryInput] = useState('');
  const [designApproach, setDesignApproach] = useState('');
  const [isPublished, setIsPublished] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);

  const loadProjects = async () => {
    try {
      const res = await fetch('/api/projects?all=true', { cache: 'no-store' });
      if (res.ok) {
        const d = await res.json();
        setProjects(d.projects || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const openCreateModal = () => {
    setEditingProject(null);
    setTitle('');
    setSlug('');
    setLocation('Mumbai');
    setYear('2025');
    setProjectType('Residential Interiors');
    setArea('5,000 sq ft');
    setShortDescription('');
    setDescription('');
    setHeroImage('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85');
    setGallery([]);
    setDesignApproach('');
    setIsPublished(true);
    setIsFeatured(false);
    setFormError(null);
    setIsModalOpen(true);
  };

  const openEditModal = (p: Project) => {
    setEditingProject(p);
    setTitle(p.title);
    setSlug(p.slug);
    setLocation(p.location);
    setYear(p.year);
    setProjectType(p.projectType);
    setArea(p.area);
    setShortDescription(p.shortDescription);
    setDescription(p.description);
    setHeroImage(p.heroImage);
    setGallery(p.gallery || []);
    setDesignApproach(p.designApproach);
    setIsPublished(p.isPublished);
    setIsFeatured(p.isFeatured);
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleTogglePublish = async (p: Project) => {
    try {
      const res = await fetch(`/api/projects/${p.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPublished: !p.isPublished }),
      });
      if (res.ok) {
        setProjects(projects.map((item) => (item.id === p.id ? { ...item, isPublished: !p.isPublished } : item)));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project monograph?')) return;
    try {
      const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProjects(projects.filter((p) => p.id !== id));
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
      location,
      year,
      projectType,
      area,
      shortDescription,
      description,
      heroImage,
      gallery,
      designApproach,
      isPublished,
      isFeatured,
    };

    try {
      const url = editingProject ? `/api/projects/${editingProject.id}` : '/api/projects';
      const method = editingProject ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success && data.project) {
        setIsModalOpen(false);
        if (editingProject) {
          setProjects((prev) => prev.map((p) => (p.id === data.project.id ? data.project : p)));
        } else {
          setProjects((prev) => [data.project, ...prev]);
        }
      } else {
        setFormError(data.error || 'Failed to save project');
      }
    } catch (err: any) {
      setFormError(err.message || 'Error saving');
    } finally {
      setFormLoading(false);
    }
  };

  const addGalleryImage = () => {
    if (galleryInput.trim()) {
      setGallery([...gallery, galleryInput.trim()]);
      setGalleryInput('');
    }
  };

  const removeGalleryImage = (idx: number) => {
    setGallery(gallery.filter((_, i) => i !== idx));
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-atelier pb-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-bronze font-medium">Monographs</span>
            <h1 className="font-serif text-3xl sm:text-4xl text-espresso font-light">Architectural Projects</h1>
          </div>
          <button
            onClick={openCreateModal}
            className="px-5 py-2.5 btn-luxury-dark text-xs uppercase tracking-widest flex items-center gap-2 font-medium"
          >
            <Plus className="w-4 h-4" /> Add Project Case Study
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="bg-surface border border-atelier p-5 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="relative aspect-[16/10] bg-canvas overflow-hidden border border-atelier">
                  <Image src={proj.heroImage} alt={proj.title} fill className="object-cover" />
                  <span className="absolute top-2 left-2 px-2 py-0.5 bg-espresso text-surface text-[10px] uppercase tracking-wider font-medium">
                    {proj.projectType}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif text-xl text-espresso font-medium">{proj.title}</h3>
                  <p className="text-xs text-warmgray mt-0.5">
                    {proj.location} • {proj.year} • {proj.area}
                  </p>
                  <p className="text-xs text-warmgray font-light mt-2 line-clamp-2">{proj.shortDescription}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-atelier flex items-center justify-between">
                <button
                  onClick={() => handleTogglePublish(proj)}
                  className={`px-2 py-1 text-[10px] uppercase tracking-wider font-medium flex items-center gap-1 border ${
                    proj.isPublished
                      ? 'bg-green-50 text-green-800 border-green-200'
                      : 'bg-warmgray/10 text-warmgray border-warmgray/30'
                  }`}
                >
                  {proj.isPublished ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                  <span>{proj.isPublished ? 'Live' : 'Draft'}</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(proj)}
                    className="p-1.5 bg-canvas border border-atelier hover:border-bronze text-espresso text-xs"
                    title="Edit"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(proj.id)}
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

      {/* Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-espresso/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-3xl bg-surface border border-atelier p-6 sm:p-8 space-y-6 shadow-2xl my-8">
            <div className="flex justify-between items-center border-b border-atelier pb-4">
              <h2 className="font-serif text-2xl text-espresso">
                {editingProject ? `Edit "${editingProject.title}"` : 'New Architectural Case Study'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-warmgray hover:text-espresso">
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-800 text-xs">{formError}</div>
            )}

            <form onSubmit={handleSave} className="space-y-4 text-xs max-h-[70vh] overflow-y-auto pr-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="uppercase tracking-wider text-warmgray font-medium">Project Title *</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2.5 bg-canvas border border-atelier text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="uppercase tracking-wider text-warmgray font-medium">Typology *</label>
                  <select
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value as ProjectType)}
                    className="w-full p-2.5 bg-canvas border border-atelier text-xs"
                  >
                    <option>Residential Interiors</option>
                    <option>Architecture & Villa</option>
                    <option>Penthouse & Estate</option>
                    <option>Commercial & Studio</option>
                    <option>Hospitality & Luxury Dining</option>
                    <option>Custom Spatial Design</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="uppercase tracking-wider text-warmgray font-medium">Site Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full p-2.5 bg-canvas border border-atelier text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="uppercase tracking-wider text-warmgray font-medium">Year Completed</label>
                  <input
                    type="text"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full p-2.5 bg-canvas border border-atelier text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="uppercase tracking-wider text-warmgray font-medium">Built Area (sq ft)</label>
                  <input
                    type="text"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="w-full p-2.5 bg-canvas border border-atelier text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="uppercase tracking-wider text-warmgray font-medium">Hero Image URL *</label>
                  <input
                    type="url"
                    required
                    value={heroImage}
                    onChange={(e) => setHeroImage(e.target.value)}
                    className="w-full p-2.5 bg-canvas border border-atelier text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="uppercase tracking-wider text-warmgray font-medium">Short Monograph Synopsis</label>
                <textarea
                  rows={2}
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  className="w-full p-2.5 bg-canvas border border-atelier text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="uppercase tracking-wider text-warmgray font-medium">Full Architectural Narrative</label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2.5 bg-canvas border border-atelier text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="uppercase tracking-wider text-warmgray font-medium">Design Approach & Material Integration</label>
                <textarea
                  rows={3}
                  value={designApproach}
                  onChange={(e) => setDesignApproach(e.target.value)}
                  className="w-full p-2.5 bg-canvas border border-atelier text-xs"
                />
              </div>

              {/* Hero Image Uploader */}
              <div className="border-t border-atelier pt-3">
                <ImageUploader
                  bucket="projects"
                  images={heroImage ? [heroImage] : []}
                  onChange={(imgs) => setHeroImage(imgs[0] || '')}
                  multiple={false}
                  label="Architectural Hero Photo (Upload from Device) *"
                />
              </div>

              {/* Gallery Plates Uploader */}
              <div className="border-t border-atelier pt-3">
                <ImageUploader
                  bucket="projects"
                  images={gallery}
                  onChange={setGallery}
                  multiple={true}
                  label="Project Gallery Plates (Upload Multiple from Device)"
                />
              </div>

              <div className="flex items-center gap-6 border-t border-atelier pt-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isPublished}
                    onChange={(e) => setIsPublished(e.target.checked)}
                    className="accent-espresso"
                  />
                  <span>Published in Portfolio</span>
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
                  className="px-6 py-2.5 border border-atelier text-xs uppercase tracking-widest text-warmgray"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="px-8 py-2.5 btn-luxury-dark text-xs uppercase tracking-widest font-medium"
                >
                  {formLoading ? 'Saving...' : 'Save Case Study'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
