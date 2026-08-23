import { NextRequest, NextResponse } from 'next/server';
import { requireAuthenticatedAdmin } from '@/lib/auth';
import { getOrders, getQuotes, getProducts, getProjects, getEnquiries, getAuditLogs } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const auth = await requireAuthenticatedAdmin(req);
  if ('response' in auth) return auth.response;

  const timeRange = req.nextUrl.searchParams.get('timeRange') || '30D';

  try {
    const [orders, quotes, products, projects, enquiries, auditLogs] = await Promise.all([
      getOrders().catch(() => []),
      getQuotes().catch(() => []),
      getProducts().catch(() => []),
      getProjects().catch(() => []),
      getEnquiries().catch(() => []),
      getAuditLogs(6).catch(() => []),
    ]);

    const now = Date.now();

    // Filter orders by time range
    const filteredOrders = orders.filter((o) => {
      if (timeRange === 'ALL') return true;
      const orderTime = new Date(o.createdAt).getTime();
      const diffDays = (now - orderTime) / (1000 * 3600 * 24);
      if (timeRange === '7D') return diffDays <= 7;
      if (timeRange === '30D') return diffDays <= 30;
      if (timeRange === '90D') return diffDays <= 90;
      if (timeRange === '6M') return diffDays <= 180;
      if (timeRange === '1Y') return diffDays <= 365;
      return true;
    });

    // Executive KPIs
    const periodRevenue = filteredOrders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const thisMonthRevenue = orders
      .filter((o) => {
        const d = new Date(o.createdAt);
        return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
      })
      .reduce((sum, o) => sum + (o.totalAmount || 0), 0);

    const activeOrdersCount = orders.filter(
      (o) =>
        o.orderStatus === 'Pending' ||
        o.orderStatus === 'Confirmed' ||
        o.orderStatus === 'Processing' ||
        o.orderStatus === 'Packed' ||
        o.orderStatus === 'Shipped'
    ).length;

    const pendingQuotesCount = quotes.filter((q) => q.status === 'Pending' || q.status === 'Under_Review').length;
    const totalQuotesValuation = quotes.reduce((sum, q) => sum + (q.totalQuotedAmount || 0), 0);
    const lowStockProductsCount = products.filter((p) => p.stock <= p.moq * 2 || p.stock < 10).length;
    const totalInventoryValuation = products.reduce((sum, p) => sum + (p.price * p.stock || 0), 0);
    const averageOrderValue = filteredOrders.length > 0 ? Math.round(periodRevenue / filteredOrders.length) : 0;

    // Monthly Sales Graph (Last 6 intervals)
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const buckets: { [key: string]: number } = {};
    const d = new Date();
    for (let i = 5; i >= 0; i--) {
      const monthIdx = (d.getMonth() - i + 12) % 12;
      buckets[months[monthIdx]] = 0;
    }

    orders.forEach((o) => {
      const ordMonth = months[new Date(o.createdAt).getMonth()];
      if (buckets[ordMonth] !== undefined) {
        buckets[ordMonth] += o.totalAmount || 0;
      }
    });

    const maxVal = Math.max(...Object.values(buckets), 100000);
    const salesGraphData = Object.entries(buckets).map(([label, val]) => ({
      label,
      val,
      heightPercent: Math.max(12, Math.round((val / maxVal) * 100)),
    }));

    // Category Sales Breakdown
    const catMap: { [key: string]: number } = {};
    orders.forEach((o) => {
      (o.items || []).forEach((it) => {
        const cat = it.productName.includes('Marble') || it.productName.includes('Travertine')
          ? 'Natural Stone'
          : it.productName.includes('Veneer') || it.productName.includes('Oak')
          ? 'Hardwood Veneers'
          : it.productName.includes('Panel') || it.productName.includes('Acoustic')
          ? 'Wall Panels'
          : 'Architectural Materials';
        catMap[cat] = (catMap[cat] || 0) + (it.subtotal || 0);
      });
    });

    const totalCatSales = Object.values(catMap).reduce((a, b) => a + b, 0) || 1;
    const categoryBreakdown = Object.entries(catMap).map(([name, amount]) => ({
      name,
      amount,
      percent: Math.round((amount / totalCatSales) * 100),
    }));

    // Recent 5 orders and recent 6 activity logs
    const recentOrders = orders.slice(0, 5).map((o) => ({
      id: o.id,
      orderNumber: o.orderNumber,
      customerName: o.customerName,
      totalAmount: o.totalAmount,
      orderStatus: o.orderStatus,
      paymentStatus: o.paymentStatus,
      itemsCount: o.items?.length || 1,
      createdAt: o.createdAt,
    }));

    return NextResponse.json({
      success: true,
      data: {
        kpis: {
          periodRevenue,
          thisMonthRevenue,
          periodOrdersCount: filteredOrders.length,
          activeOrdersCount,
          pendingQuotesCount,
          totalQuotesCount: quotes.length,
          totalQuotesValuation,
          activeProjectsCount: projects.length,
          lowStockCount: lowStockProductsCount,
          totalProductsCount: products.length,
          totalInventoryValuation,
          averageOrderValue,
          enquiriesCount: enquiries.length,
        },
        salesGraphData,
        categoryBreakdown,
        recentOrders,
        recentActivity: auditLogs,
      },
    });
  } catch (err: any) {
    console.error('Dashboard analytics error:', err);
    return NextResponse.json({ success: false, error: 'Failed to compute dashboard analytics' }, { status: 500 });
  }
}
