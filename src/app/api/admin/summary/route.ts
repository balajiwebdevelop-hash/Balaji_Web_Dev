import { NextRequest, NextResponse } from 'next/server';
import { requireAuthenticatedAdmin } from '@/lib/auth';
import { isSupabaseConfigured, getServiceSupabase } from '@/server/db/client';
import { getOrders, getQuotes, getProducts } from '@/lib/db';

export const dynamic = 'force-dynamic';

interface SummaryData {
  pendingOrders: number;
  pendingQuotes: number;
  lowStock: number;
  recentActivity: number;
}

let cachedSummary: { data: SummaryData; timestamp: number } | null = null;
const SUMMARY_CACHE_TTL_MS = 15 * 1000; // 15 seconds

export async function GET(req: NextRequest) {
  const auth = await requireAuthenticatedAdmin(req);
  if ('response' in auth) return auth.response;

  const forceRefresh = req.nextUrl.searchParams.get('refresh') === 'true';
  const now = Date.now();

  if (!forceRefresh && cachedSummary && now - cachedSummary.timestamp < SUMMARY_CACHE_TTL_MS) {
    return NextResponse.json({
      success: true,
      ...cachedSummary.data,
      cached: true,
    });
  }

  try {
    let pendingOrders = 0;
    let pendingQuotes = 0;
    let lowStock = 0;

    if (isSupabaseConfigured()) {
      const supabase = getServiceSupabase();

      const [ordRes, qtRes, prodRes] = await Promise.all([
        supabase
          .from('orders')
          .select('id', { count: 'exact', head: true })
          .in('order_status', ['Pending', 'Confirmed']),
        supabase
          .from('quotes')
          .select('id', { count: 'exact', head: true })
          .in('status', ['Pending', 'Under_Review']),
        supabase
          .from('products')
          .select('stock, moq'),
      ]);

      pendingOrders = ordRes.count ?? 0;
      pendingQuotes = qtRes.count ?? 0;

      if (prodRes.data) {
        lowStock = prodRes.data.filter(
          (p: any) => (p.stock ?? 0) <= ((p.moq ?? 1) * 2) || (p.stock ?? 0) < 10
        ).length;
      }
    } else {
      const [orders, quotes, products] = await Promise.all([
        getOrders().catch(() => []),
        getQuotes().catch(() => []),
        getProducts().catch(() => []),
      ]);

      pendingOrders = orders.filter((o: any) => o.orderStatus === 'Pending' || o.orderStatus === 'Confirmed').length;
      pendingQuotes = quotes.filter((q: any) => q.status === 'Pending' || q.status === 'Under_Review').length;
      lowStock = products.filter((p: any) => p.stock <= (p.moq * 2) || p.stock < 10).length;
    }

    const recentActivity = pendingOrders + pendingQuotes + lowStock;

    const data: SummaryData = {
      pendingOrders,
      pendingQuotes,
      lowStock,
      recentActivity,
    };

    cachedSummary = { data, timestamp: now };

    return NextResponse.json({
      success: true,
      ...data,
      cached: false,
    });
  } catch (err: any) {
    console.error('Failed to compute admin summary:', err);
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve admin summary' },
      { status: 500 }
    );
  }
}
