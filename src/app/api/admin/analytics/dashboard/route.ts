import { NextRequest, NextResponse } from 'next/server';
import { requireAuthenticatedAdmin } from '@/lib/auth';
import {
  memoryCache,
} from '@/server/db/client';
import {
  getOrders,
  getQuotes,
  getProducts,
  getProjects,
  getEnquiries,
  getAuditLogs,
} from '@/lib/db';

export const dynamic = 'force-dynamic';

const DASHBOARD_CACHE_TTL_MS = 30 * 1000; // 30 seconds

export async function GET(req: NextRequest) {
  const auth = await requireAuthenticatedAdmin(req);
  if ('response' in auth) return auth.response;

  const { searchParams } = new URL(req.url);
  const timeRange = searchParams.get('range') || '30D';
  const forceRefresh = searchParams.get('refresh') === 'true';

  // 1. Check in-memory dashboard cache
  const cacheKey = `dashboard_${timeRange}`;
  const now = Date.now();
  const cached = memoryCache.dashboardAnalytics.get(cacheKey);
  if (!forceRefresh && cached && now - cached.timestamp < DASHBOARD_CACHE_TTL_MS) {
    return NextResponse.json({
      success: true,
      data: cached.data,
      cached: true,
    });
  }

  try {
    const [orders, quotes, products, allProjects, allEnquiries, auditLogs] =
      await Promise.all([
        getOrders().catch(() => []),
        getQuotes().catch(() => []),
        getProducts().catch(() => []),
        getProjects().catch(() => []),
        getEnquiries().catch(() => []),
        getAuditLogs(6).catch(() => []),
      ]);

    const activeProjectsCount = allProjects.length;
    const enquiriesCount = allEnquiries.length;

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

    // Monthly Sales Graph (Last 6 intervals, timezone and year-boundary accurate)
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const nowRef = new Date();
    const intervals: Array<{ key: string; label: string; year: number; month: number; val: number }> = [];
    for (let i = 5; i >= 0; i--) {
      const date = new Date(nowRef.getFullYear(), nowRef.getMonth() - i, 1);
      const y = date.getFullYear();
      const m = date.getMonth();
      intervals.push({
        key: `${y}-${m}`,
        label: months[m],
        year: y,
        month: m,
        val: 0,
      });
    }

    const intervalMap = new Map(intervals.map((it) => [it.key, it]));

    orders.forEach((o) => {
      const od = new Date(o.createdAt);
      const key = `${od.getFullYear()}-${od.getMonth()}`;
      const item = intervalMap.get(key);
      if (item) {
        item.val += o.totalAmount || 0;
      }
    });

    const maxVal = Math.max(...intervals.map((it) => it.val), 100000);
    const salesGraphData = intervals.map((it) => ({
      label: it.label,
      val: it.val,
      heightPercent: Math.max(12, Math.round((it.val / maxVal) * 100)),
    }));

    // Category Sales Breakdown
    const catMap: { [key: string]: number } = {};
    orders.forEach((o) => {
      (o.items || []).forEach((it: any) => {
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

    const responseData = {
      kpis: {
        periodRevenue,
        thisMonthRevenue,
        periodOrdersCount: filteredOrders.length,
        activeOrdersCount,
        pendingQuotesCount,
        totalQuotesCount: quotes.length,
        totalQuotesValuation,
        activeProjectsCount,
        lowStockCount: lowStockProductsCount,
        totalProductsCount: products.length,
        totalInventoryValuation,
        averageOrderValue,
        enquiriesCount,
      },
      salesGraphData,
      categoryBreakdown,
      recentOrders,
      recentActivity: auditLogs,
    };

    memoryCache.dashboardAnalytics.set(cacheKey, {
      data: responseData,
      timestamp: now,
    });

    return NextResponse.json({
      success: true,
      data: responseData,
    });
  } catch (err: any) {
    console.error('Dashboard analytics error:', err);
    return NextResponse.json({ success: false, error: 'Failed to compute dashboard analytics' }, { status: 500 });
  }
}
