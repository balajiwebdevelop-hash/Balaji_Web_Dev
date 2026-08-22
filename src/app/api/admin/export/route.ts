import { NextRequest, NextResponse } from 'next/server';
import { requireAuthenticatedAdmin } from '@/lib/auth';
import { getOrders, getProducts, getQuotes, getCustomers, getEnquiries, getProjects } from '@/lib/db';

export const dynamic = 'force-dynamic';

function escapeCsv(value: any): string {
  if (value === null || value === undefined) return '""';
  const str = String(value).replace(/"/g, '""');
  return `"${str}"`;
}

export async function GET(req: NextRequest) {
  const authResult = await requireAuthenticatedAdmin(req);
  if ('response' in authResult) {
    return authResult.response;
  }

  const type = req.nextUrl.searchParams.get('type') || 'orders';

  try {
    let csvData = '';
    let filename = `balaji_${type}_${new Date().toISOString().slice(0, 10)}.csv`;

    if (type === 'orders') {
      const orders = await getOrders();
      const headers = ['Order Number', 'Date', 'Customer Name', 'Customer Email', 'Phone', 'Total Amount', 'Status', 'Payment Method', 'Payment Status', 'Items Count'];
      const rows = orders.map((o) => [
        escapeCsv(o.orderNumber),
        escapeCsv(new Date(o.createdAt).toISOString()),
        escapeCsv(o.customerName),
        escapeCsv(o.customerEmail),
        escapeCsv(o.customerPhone),
        escapeCsv(o.totalAmount),
        escapeCsv(o.orderStatus),
        escapeCsv(o.paymentMethod || 'Manual/UPI'),
        escapeCsv(o.paymentStatus),
        escapeCsv(o.items?.length || 0),
      ]);
      csvData = [headers.join(','), ...rows.map((r: any[]) => r.join(','))].join('\n');
    } else if (type === 'products' || type === 'inventory') {
      const products = await getProducts();
      const headers = ['SKU', 'Name', 'Category', 'Price (INR)', 'Unit', 'Stock', 'MOQ', 'Purchase Mode', 'Published', 'Updated At'];
      const rows = products.map((p) => [
        escapeCsv(p.sku),
        escapeCsv(p.name),
        escapeCsv(p.subcategory || p.categorySlug || 'Material'),
        escapeCsv(p.price),
        escapeCsv(p.unit),
        escapeCsv(p.stock),
        escapeCsv(p.moq),
        escapeCsv(p.purchaseMode),
        escapeCsv(p.published ? 'Yes' : 'No'),
        escapeCsv(new Date(p.updatedAt).toISOString()),
      ]);
      csvData = [headers.join(','), ...rows.map((r: any[]) => r.join(','))].join('\n');
    } else if (type === 'quotes') {
      const quotes = await getQuotes();
      const headers = ['Quote Number', 'Date', 'Client Name', 'Email', 'Phone', 'Project Type', 'Estimated Budget', 'Status', 'Location'];
      const rows = quotes.map((q) => [
        escapeCsv(q.quoteNumber || 'QT'),
        escapeCsv(new Date(q.createdAt).toISOString()),
        escapeCsv(q.customerName),
        escapeCsv(q.customerEmail),
        escapeCsv(q.customerPhone),
        escapeCsv(q.projectType || 'Interior & Architecture'),
        escapeCsv(q.budgetRange || (q.totalQuotedAmount ? `₹${q.totalQuotedAmount}` : 'Custom')),
        escapeCsv(q.status),
        escapeCsv(q.projectLocation || 'Guwahati'),
      ]);
      csvData = [headers.join(','), ...rows.map((r: any[]) => r.join(','))].join('\n');
    } else if (type === 'customers') {
      const customers = await getCustomers();
      const headers = ['Customer ID', 'Full Name', 'Email', 'Phone', 'Created At'];
      const rows = customers.map((c: any) => [
        escapeCsv(c.id),
        escapeCsv(c.fullName),
        escapeCsv(c.email),
        escapeCsv(c.phone || ''),
        escapeCsv(new Date(c.createdAt).toISOString()),
      ]);
      csvData = [headers.join(','), ...rows.map((r: any[]) => r.join(','))].join('\n');
    } else if (type === 'enquiries') {
      const enquiries = await getEnquiries();
      const headers = ['ID', 'Date', 'Name', 'Email', 'Phone', 'Subject', 'Status', 'Message'];
      const rows = enquiries.map((e) => [
        escapeCsv(e.id),
        escapeCsv(new Date(e.createdAt).toISOString()),
        escapeCsv(e.name),
        escapeCsv(e.email),
        escapeCsv(e.phone || ''),
        escapeCsv(e.subject),
        escapeCsv(e.status),
        escapeCsv(e.message),
      ]);
      csvData = [headers.join(','), ...rows.map((r: any[]) => r.join(','))].join('\n');
    } else if (type === 'projects') {
      const projects = await getProjects();
      const headers = ['Title', 'Slug', 'Project Type', 'Location', 'Year', 'Area', 'Published'];
      const rows = projects.map((pr) => [
        escapeCsv(pr.title),
        escapeCsv(pr.slug),
        escapeCsv(pr.projectType),
        escapeCsv(pr.location),
        escapeCsv(pr.year),
        escapeCsv(pr.area),
        escapeCsv(pr.isPublished ? 'Published' : 'Draft'),
      ]);
      csvData = [headers.join(','), ...rows.map((r: any[]) => r.join(','))].join('\n');
    } else {
      return NextResponse.json({ success: false, error: 'Unsupported export type' }, { status: 400 });
    }

    return new NextResponse(csvData, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: 'Export generation failed' }, { status: 500 });
  }
}
