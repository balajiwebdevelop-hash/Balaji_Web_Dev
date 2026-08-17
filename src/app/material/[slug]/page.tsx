import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { getProductBySlug, getProducts } from '@/lib/db';
import { ProductDetailClient } from '@/components/ProductDetailClient';

export const revalidate = 60;

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);
  if (!product) return { title: 'Material Not Found — Balaji Atelier' };
  return {
    title: `${product.name} — ${product.categoryName} | Balaji Atelier`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);

  if (!product || !product.published) {
    notFound();
  }

  const related = await getProducts({
    categoryId: product.categoryId,
    publishedOnly: true,
  });

  const filteredRelated = related.filter((p) => p.id !== product.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Top Breadcrumb */}
      <div>
        <Link
          href="/materials"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-warmgray hover:text-espresso transition-colors font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Materials Library
        </Link>
      </div>

      <ProductDetailClient product={product} relatedProducts={filteredRelated} />
    </div>
  );
}
