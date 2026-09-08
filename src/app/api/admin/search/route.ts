import { NextRequest, NextResponse } from 'next/server';
import { requireAuthenticatedAdmin } from '@/lib/auth';
import { getServiceSupabase, isSupabaseConfigured } from '@/lib/supabase';
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
    const results: Array<{
      id: string;
      title: string;
      subtitle: string;
      type: 'product' | 'order' | 'quote' | 'customer' | 'project' | 'service' | 'enquiry';
      href: string;
      badge?: string;
    }> = [];

    if (isSupabaseConfigured()) {
      const supabase = getServiceSupabase();
      const pattern = `%${query}%`;

      const [prodRes, ordRes, qtRes, custRes, projRes, enqRes] = await Promise.all([
        supabase
          .from('products')
          .select('id, name, sku, price, unit, stock')
          .or(`name.ilike.${pattern},sku.ilike.${pattern},material.ilike.${pattern},brand.ilike.${pattern}`)
          .limit(5),
        supabase
          .from('orders')
          .select('id, order_number, customer_name, total_amount, order_status')
          .or(`order_number.ilike.${pattern},customer_name.ilike.${pattern},customer_email.ilike.${pattern},customer_phone.ilike.${pattern}`)
          .limit(5),
        supabase
          .from('quotes')
          .select('id, quote_number, customer_name, project_type, project_location, status')
          .or(`quote_number.ilike.${pattern},customer_name.ilike.${pattern},customer_email.ilike.${pattern},project_type.ilike.${pattern}`)
          .limit(5),
        supabase
          .from('customers')
          .select('id, full_name, email, phone')
          .or(`full_name.ilike.${pattern},email.ilike.${pattern},phone.ilike.${pattern}`)
          .limit(5),
        supabase
          .from('projects')
          .select('id, title, project_type, location, year, is_published')
          .or(`title.ilike.${pattern},location.ilike.${pattern},project_type.ilike.${pattern}`)
          .limit(5),
        supabase
          .from('enquiries')
          .select('id, name, email, subject, status')
          .or(`name.ilike.${pattern},email.ilike.${pattern},subject.ilike.${pattern}`)
          .limit(5),
      ]);

      // Map Products
      (prodRes.data || []).forEach((p: any) => {
        results.push({
          id: p.id,
          title: p.name,
          subtitle: `SKU: ${p.sku} • ₹${Number(p.price).toLocaleString('en-IN')}/${p.unit} • Stock: ${p.stock}`,
          type: 'product',
          href: `/admin/products?id=${p.id}`,
          badge: `${p.stock} in stock`,
        });
      });

      // Map Orders
      (ordRes.data || []).forEach((o: any) => {
        results.push({
          id: o.id,
          title: `Order #${o.order_number}`,
          subtitle: `${o.customer_name} • ₹${Number(o.total_amount).toLocaleString('en-IN')} • ${o.order_status}`,
          type: 'order',
          href: `/admin/orders?id=${o.id}`,
          badge: o.order_status,
        });
      });

      // Map Quotes
      (qtRes.data || []).forEach((q: any) => {
        results.push({
          id: q.id,
          title: `Quote #${q.quote_number || 'QT'} — ${q.customer_name}`,
          subtitle: `${q.project_type || 'Architecture'} • ${q.project_location || 'Guwahati'} • ${q.status}`,
          type: 'quote',
          href: `/admin/quotes?id=${q.id}`,
          badge: q.status,
        });
      });

      // Map Customers
      (custRes.data || []).forEach((c: any) => {
        results.push({
          id: c.id,
          title: c.full_name,
          subtitle: `${c.email} • ${c.phone || 'No phone'}`,
          type: 'customer',
          href: `/admin/customers?id=${c.id}`,
          badge: 'Client',
        });
      });

      // Map Projects
      (projRes.data || []).forEach((pr: any) => {
        results.push({
          id: pr.id,
          title: pr.title,
          subtitle: `${pr.project_type} • ${pr.location} (${pr.year})`,
          type: 'project',
          href: `/admin/projects?id=${pr.id}`,
          badge: pr.is_published ? 'Published' : 'Draft',
        });
      });

      // Map Enquiries
      (enqRes.data || []).forEach((e: any) => {
        results.push({
          id: e.id,
          title: `Enquiry: ${e.name}`,
          subtitle: `${e.subject} • ${e.email}`,
          type: 'enquiry',
          href: `/admin/quotes`,
          badge: e.status,
        });
      });

      return NextResponse.json({ success: true, results: results.slice(0, 20) });
    }

    // JSON / Memory Fallback
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

    return NextResponse.json({ success: true, results: results.slice(0, 20) });
  } catch (err: any) {
    console.error('Search query error:', err);
    return NextResponse.json({ success: false, error: 'Search failed' }, { status: 500 });
  }
}
