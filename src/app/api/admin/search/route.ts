import { NextRequest, NextResponse } from 'next/server';
import { requireAuthenticatedAdmin } from '@/lib/auth';
import { getProducts, getOrders, getQuotes, getProjects, getServices, getCustomers, getEnquiries } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const authResult = await requireAuthenticatedAdmin(req);
  if ('response' in authResult) {
    return authResult.response;
  }

  const query = req.nextUrl.searchParams.get('q')?.trim().toLowerCase() || '';
  if (!query || query.length < 2) {
    return NextResponse.json({ success: true, results: [] });
  }

  try {
    const [products, orders, quotes, projects, services, customers, enquiries] = await Promise.all([
      getProducts().catch(() => []),
      getOrders().catch(() => []),
      getQuotes().catch(() => []),
      getProjects().catch(() => []),
      getServices(false).catch(() => []),
      getCustomers().catch(() => []),
      getEnquiries().catch(() => []),
    ]);

    const results: Array<{
      id: string;
      title: string;
      subtitle: string;
      type: 'product' | 'order' | 'quote' | 'customer' | 'project' | 'service' | 'enquiry';
      href: string;
      badge?: string;
    }> = [];

    // 1. Products / Materials
    for (const p of products) {
      if (
        p.name.toLowerCase().includes(query) ||
        (p.sku && p.sku.toLowerCase().includes(query)) ||
        (p.material && p.material.toLowerCase().includes(query)) ||
        (p.brand && p.brand.toLowerCase().includes(query))
      ) {
        results.push({
          id: p.id,
          title: p.name,
          subtitle: `SKU: ${p.sku} • ₹${p.price.toLocaleString('en-IN')}/${p.unit} • Stock: ${p.stock}`,
          type: 'product',
          href: `/admin/products?highlight=${p.id}`,
          badge: `${p.stock} in stock`,
        });
        if (results.length >= 25) break;
      }
    }

    // 2. Orders
    for (const o of orders) {
      if (
        o.orderNumber.toLowerCase().includes(query) ||
        o.customerName.toLowerCase().includes(query) ||
        o.customerEmail.toLowerCase().includes(query) ||
        o.customerPhone.includes(query)
      ) {
        results.push({
          id: o.id,
          title: `Order #${o.orderNumber}`,
          subtitle: `${o.customerName} • ₹${o.totalAmount.toLocaleString('en-IN')} • ${o.orderStatus}`,
          type: 'order',
          href: `/admin/orders?orderId=${o.id}`,
          badge: o.orderStatus,
        });
        if (results.length >= 25) break;
      }
    }

    // 3. Quotes
    for (const q of quotes) {
      if (
        (q.quoteNumber && q.quoteNumber.toLowerCase().includes(query)) ||
        q.customerName.toLowerCase().includes(query) ||
        q.customerEmail.toLowerCase().includes(query) ||
        (q.projectType && q.projectType.toLowerCase().includes(query))
      ) {
        results.push({
          id: q.id,
          title: `Quote #${q.quoteNumber || 'QT'} — ${q.customerName}`,
          subtitle: `${q.projectType || 'Architecture'} • ${q.projectLocation || 'Guwahati'} • ${q.status}`,
          type: 'quote',
          href: `/admin/quotes?quoteId=${q.id}`,
          badge: q.status,
        });
        if (results.length >= 25) break;
      }
    }

    // 4. Customers
    for (const c of customers) {
      if (
        c.fullName.toLowerCase().includes(query) ||
        c.email.toLowerCase().includes(query) ||
        (c.phone && c.phone.includes(query))
      ) {
        results.push({
          id: c.id,
          title: c.fullName,
          subtitle: `${c.email} • ${c.phone || 'No phone'}`,
          type: 'customer',
          href: `/admin/customers?search=${encodeURIComponent(c.email)}`,
          badge: 'Client',
        });
        if (results.length >= 25) break;
      }
    }

    // 5. Projects
    for (const pr of projects) {
      if (
        pr.title.toLowerCase().includes(query) ||
        pr.location.toLowerCase().includes(query) ||
        pr.projectType.toLowerCase().includes(query)
      ) {
        results.push({
          id: pr.id,
          title: pr.title,
          subtitle: `${pr.projectType} • ${pr.location} (${pr.year})`,
          type: 'project',
          href: `/admin/projects?projectId=${pr.id}`,
          badge: pr.isPublished ? 'Published' : 'Draft',
        });
        if (results.length >= 25) break;
      }
    }

    // 6. Enquiries
    for (const e of enquiries) {
      if (
        e.name.toLowerCase().includes(query) ||
        e.email.toLowerCase().includes(query) ||
        e.subject.toLowerCase().includes(query)
      ) {
        results.push({
          id: e.id,
          title: `Enquiry: ${e.name}`,
          subtitle: `${e.subject} • ${e.email}`,
          type: 'enquiry',
          href: `/admin/quotes`,
          badge: e.status,
        });
        if (results.length >= 25) break;
      }
    }

    return NextResponse.json({ success: true, results: results.slice(0, 20) });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: 'Search failed' }, { status: 500 });
  }
}
