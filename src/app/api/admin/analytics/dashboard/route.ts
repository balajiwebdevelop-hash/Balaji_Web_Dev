import { NextRequest, NextResponse } from 'next/server';
import { requireAuthenticatedAdmin } from '@/lib/auth';
import {
  isSupabaseConfigured,
  isSupabaseAvailable,
  getServiceSupabase,
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

  const timeRange = req.nextUrl.searchParams.get('timeRange') || '30D';
  const forceRefresh = req.nextUrl.searchParams.get('refresh') === 'true';

  // 1. Check in-memory dashboard cache
  const cacheKey = `dashboard_${timeRange}`;
  const now = Date.now();
  const cached = memoryCache.dashboardAnalytics.get(cacheKey);
  if (cached && now - cached.timestamp < DASHBOARD_CACHE_TTL_MS && !forceRefresh) {
    return NextResponse.json({
      success: true,
      data: cached.data,
      cached: true,
    });
  }

  try {
    let orders: any[] = [];
    let quotes: any[] = [];
    let products: any[] = [];
    let activeProjectsCount = 0;
    let enquiriesCount = 0;
    let auditLogs: any[] = [];

    let supabaseSuccess = false;
    if (await isSupabaseAvailable()) {
      try {
        const supabase = getServiceSupabase();

        // Query database with selective projections to minimize memory and network overhead
        const [ordersRes, quotesRes, productsRes, projectsRes, enquiriesRes, logsRes] =
          await Promise.all([
            supabase
              .from('orders')
              .select(
                'id, order_number, customer_name, total_amount, order_status, payment_status, created_at, items:order_items(product_name, subtotal)'
              )
              .order('created_at', { ascending: false }),
            supabase
              .from('quotes')
              .select('id, status, total_quoted_amount'),
            supabase
              .from('products')
              .select('id, price, stock, moq'),
            supabase
              .from('projects')
              .select('id', { count: 'exact', head: true }),
            supabase
              .from('enquiries')
              .select('id', { count: 'exact', head: true }),
            getAuditLogs(6).catch(() => []),
          ]);

        if (!ordersRes.error && !quotesRes.error && !productsRes.error) {
          orders = (ordersRes.data || []).map((o: any) => ({
            id: o.id,
            orderNumber: o.order_number,
            customerName: o.customer_name,
            totalAmount: Number(o.total_amount) || 0,
            orderStatus: o.order_status,
            paymentStatus: o.payment_status,
            createdAt: o.created_at,
            items: (o.items || []).map((it: any) => ({
              productName: it.product_name || '',
              subtotal: Number(it.subtotal) || 0,
            })),
          }));

          quotes = (quotesRes.data || []).map((q: any) => ({
            id: q.id,
            status: q.status,
            totalQuotedAmount: Number(q.total_quoted_amount) || 0,
          }));

          products = (productsRes.data || []).map((p: any) => ({
            id: p.id,
            price: Number(p.price) || 0,
            stock: Number(p.stock) || 0,
            moq: Number(p.moq) || 1,
          }));

          activeProjectsCount = projectsRes.count || 0;
          enquiriesCount = enquiriesRes.count || 0;
          auditLogs = logsRes;
          supabaseSuccess = true;
        }
      } catch (err) {
        console.warn('Dashboard Supabase fetch error, falling back to local DB:', err);
      }
    }

    if (!supabaseSuccess) {
      const [allOrders, allQuotes, allProducts, allProjects, allEnquiries, allLogs] =
        await Promise.all([
          getOrders().catch(() => []),
          getQuotes().catch(() => []),
          getProducts().catch(() => []),
          getProjects().catch(() => []),
          getEnquiries().catch(() => []),
          getAuditLogs(6).catch(() => []),
        ]);

      orders = allOrders;
      quotes = allQuotes;
      products = allProducts;
      activeProjectsCount = allProjects.length;
      enquiriesCount = allEnquiries.length;
      auditLogs = allLogs;
    }

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
