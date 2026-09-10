import { NextRequest, NextResponse } from 'next/server';
import { requireAuthenticatedAdmin } from '@/lib/auth';
import { getProducts, getOrders, getQuotes, getProjects, getServices, getCustomers, getEnquiries } from '@/lib/db';

export const dynamic = 'force-dynamic';

const searchCache = new Map<string, { results: any[]; timestamp: number }>();
const SEARCH_CACHE_TTL_MS = 15000;

export async function GET(req: NextRequest) {
  const authResult = await requireAuthenticatedAdmin(req);
  if ('response' in authResult) {
    return authResult.response;
  }

  const query = req.nextUrl.searchParams.get('q')?.trim().toLowerCase() || '';
  if (!query || query.length < 2) {
    return NextResponse.json({ success: true, results: [] });
  }

  const now = Date.now();
  const cached = searchCache.get(query);
  if (cached && now - cached.timestamp < SEARCH_CACHE_TTL_MS) {
    return NextResponse.json({ success: true, results: cached.results, cached: true });
  }

  try {
    const results: Array<{
      id: string;
      title: string;
      subtitle: string;
      type: 'product' | 'order' | 'quote' | 'customer' | 'project' | 'service' | 'enquiry';
      href: string;
      badge?: string;
    }> = [];

    // Search across Hostinger MySQL repositories
    const [products, orders, quotes, projects, customers, enquiries] = await Promise.all([
      getProducts().catch(() => []),
      getOrders().catch(() => []),
      getQuotes().catch(() => []),
      getProjects().catch(() => []),
      getCustomers().catch(() => []),
      getEnquiries().catch(() => []),
    ]);

    for (const p of products) {
      if (p.name.toLowerCase().includes(query) || p.sku.toLowerCase().includes(query)) {
        results.push({
          id: p.id,
          title: p.name,
          subtitle: `SKU: ${p.sku} • ₹${p.price.toLocaleString('en-IN')}/${p.unit}`,
          type: 'product',
          href: `/admin/products?id=${p.id}`,
          badge: `${p.stock} in stock`,
        });
      }
    }

    for (const o of orders) {
      if (
        (o.orderNumber && o.orderNumber.toLowerCase().includes(query)) ||
        (o.customerName && o.customerName.toLowerCase().includes(query)) ||
        (o.customerEmail && o.customerEmail.toLowerCase().includes(query))
      ) {
        results.push({
          id: o.id,
          title: `Order #${o.orderNumber}`,
          subtitle: `${o.customerName} • ₹${o.totalAmount.toLocaleString('en-IN')} • ${o.orderStatus}`,
          type: 'order',
          href: `/admin/orders?id=${o.id}`,
          badge: o.orderStatus,
        });
      }
    }

    for (const q of quotes) {
      if (
        (q.quoteNumber && q.quoteNumber.toLowerCase().includes(query)) ||
        (q.customerName && q.customerName.toLowerCase().includes(query)) ||
        (q.customerEmail && q.customerEmail.toLowerCase().includes(query))
      ) {
        results.push({
          id: q.id,
          title: `Quote #${q.quoteNumber || 'QT'} — ${q.customerName}`,
          subtitle: `${q.projectType || 'Architecture'} • ${q.status}`,
          type: 'quote',
          href: `/admin/quotes?id=${q.id}`,
          badge: q.status,
        });
      }
    }

    for (const c of customers) {
      if (
        (c.fullName && c.fullName.toLowerCase().includes(query)) ||
        (c.email && c.email.toLowerCase().includes(query))
      ) {
        results.push({
          id: c.id,
          title: c.fullName,
          subtitle: `${c.email} • ${c.phone || 'No phone'}`,
          type: 'customer',
          href: `/admin/customers?id=${c.id}`,
          badge: 'Client',
        });
      }
    }

    for (const pr of projects) {
      if (
        (pr.title && pr.title.toLowerCase().includes(query)) ||
        (pr.location && pr.location.toLowerCase().includes(query))
      ) {
        results.push({
          id: pr.id,
          title: pr.title,
          subtitle: `${pr.projectType} • ${pr.location}`,
          type: 'project',
          href: `/admin/projects?id=${pr.id}`,
          badge: pr.isPublished ? 'Published' : 'Draft',
        });
      }
    }
    const finalResults = results.slice(0, 20);
    searchCache.set(query, { results: finalResults, timestamp: now });
    return NextResponse.json({ success: true, results: finalResults });
  } catch (err: any) {
    console.error('Search query error:', err);
    return NextResponse.json({ success: false, error: 'Search failed' }, { status: 500 });
  }
}
