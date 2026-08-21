'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search as SearchIcon, ArrowRight, X, Layers } from 'lucide-react';
import { Product, Project } from '@/types';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setProducts([]);
      setProjects([]);
      setLoading(false);
      return;
    }

    const abortController = new AbortController();

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const [prodRes, projRes] = await Promise.all([
          fetch(`/api/products?search=${encodeURIComponent(query)}`, {
            signal: abortController.signal,
            headers: { 'Cache-Control': 'no-cache' },
          }),
          fetch(`/api/projects`, {
            signal: abortController.signal,
            headers: { 'Cache-Control': 'no-cache' },
          }),
        ]);

        if (abortController.signal.aborted) return;

        if (prodRes.ok) {
          const prodData = await prodRes.json();
          if (!abortController.signal.aborted) {
            setProducts(prodData.products || []);
          }
        }

        if (projRes.ok) {
          const projData = await projRes.json();
          if (!abortController.signal.aborted) {
            const q = query.toLowerCase();
            const filteredProj = (projData.projects || []).filter(
              (p: Project) =>
                p.title.toLowerCase().includes(q) ||
                p.location.toLowerCase().includes(q) ||
                p.projectType.toLowerCase().includes(q) ||
                p.shortDescription.toLowerCase().includes(q)
            );
            setProjects(filteredProj);
          }
        }
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          console.error('Search fetch error', err);
        }
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      }
    }, 200);

    return () => {
      clearTimeout(timer);
      abortController.abort();
    };
  }, [query]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12 min-h-[70vh]">
      {/* Search Bar Input */}
      <div className="max-w-3xl mx-auto space-y-4 text-center">
        <span className="text-xs uppercase tracking-widest text-bronze font-medium">Catalog Index</span>
        <h1 className="font-serif text-3xl sm:text-4xl text-espresso font-light">
          Search Materials & Architectural Works
        </h1>
        <div className="relative mt-6">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by material, stone, wood, finish, SKU (e.g. Travertine, Oak, Fluted, MAT-STN-001)..."
            className="w-full px-6 py-4 pl-12 pr-12 bg-surface border border-atelier focus:border-bronze focus:outline-hidden text-espresso text-sm transition-colors"
            autoFocus
          />
          <SearchIcon className="w-5 h-5 text-warmgray absolute left-4 top-1/2 -translate-y-1/2" />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-warmgray hover:text-espresso"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Results View */}
      {loading ? (
        <div className="text-center py-16 text-warmgray font-light text-sm animate-pulse">
          Querying atelier catalog index...
        </div>
      ) : query.trim() === '' ? (
        <div className="text-center py-16 space-y-4">
          <p className="text-xs uppercase tracking-widest text-warmgray font-medium">Popular Inquiries</p>
          <div className="flex flex-wrap justify-center gap-2 max-w-xl mx-auto">
            {['Romano Travertine', 'Smoked European Oak', 'Acoustic Walnut', 'Porcelain Slab', 'Linear Bronze', 'Door Hardware'].map((term) => (
              <button
                key={term}
                onClick={() => setQuery(term)}
                className="px-3.5 py-1.5 bg-surface border border-atelier hover:border-bronze text-xs text-espresso transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-16">
          {/* Materials Match */}
          <div className="space-y-6">
            <div className="flex justify-between items-baseline border-b border-atelier pb-3">
              <h2 className="font-serif text-2xl text-espresso">
                Materials & Products ({products.length})
              </h2>
            </div>

            {products.length === 0 ? (
              <p className="text-xs text-warmgray">No material records found for &ldquo;{query}&rdquo;.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((p) => (
                  <Link
                    key={p.id}
                    href={`/material/${p.slug}`}
                    className="group block bg-surface border border-atelier p-4 hover:border-bronze transition-colors space-y-2"
                  >
                    <div className="relative aspect-[4/5] bg-canvas overflow-hidden">
                      {p.images[0] && (
                        <Image src={p.images[0]} alt={p.name} fill className="object-cover group-hover:scale-104 transition-transform duration-500" />
                      )}
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-bronze font-medium block">
                      {p.categoryName}
                    </span>
                    <h4 className="font-serif text-base text-espresso group-hover:text-bronze transition-colors truncate">
                      {p.name}
                    </h4>
                    <div className="text-xs font-medium text-timber">
                      ₹{(p.salePrice || p.price).toLocaleString('en-IN')} / {p.unit}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Projects Match */}
          {projects.length > 0 && (
            <div className="space-y-6">
              <div className="flex justify-between items-baseline border-b border-atelier pb-3">
                <h2 className="font-serif text-2xl text-espresso">
                  Architectural Projects ({projects.length})
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.map((proj) => (
                  <Link
                    key={proj.id}
                    href={`/projects/${proj.slug}`}
                    className="group block bg-surface border border-atelier p-4 hover:border-bronze transition-colors space-y-3"
                  >
                    <div className="relative aspect-[16/10] bg-canvas overflow-hidden">
                      <Image src={proj.heroImage} alt={proj.title} fill className="object-cover group-hover:scale-103 transition-transform duration-500" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-bronze font-medium block">
                        {proj.projectType} • {proj.location}
                      </span>
                      <h4 className="font-serif text-xl text-espresso group-hover:text-bronze transition-colors font-medium">
                        {proj.title}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
