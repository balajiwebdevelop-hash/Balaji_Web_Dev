import { NextRequest, NextResponse } from 'next/server';
import { getProducts, getProjects, getServices } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const query = (req.nextUrl.searchParams.get('q') || req.nextUrl.searchParams.get('query') || '').trim();

  if (!query) {
    return NextResponse.json({
      success: true,
      products: [],
      projects: [],
      services: [],
    });
  }

  try {
    const [products, projects, allServices] = await Promise.all([
      getProducts({ search: query, publishedOnly: true, limit: 20 }),
      getProjects({ search: query, publishedOnly: true, limit: 12 }),
      getServices(true),
    ]);

    const qLower = query.toLowerCase();
    const filteredServices = allServices.filter(
      (s) =>
        s.title.toLowerCase().includes(qLower) ||
        s.shortDesc.toLowerCase().includes(qLower) ||
        s.fullDesc.toLowerCase().includes(qLower)
    );

    return NextResponse.json(
      {
        success: true,
        products,
        projects,
        services: filteredServices,
      },
      {
        headers: {
          'Cache-Control': 'public, max-age=30, stale-while-revalidate=120',
        },
      }
    );
  } catch (err: any) {
    console.error('Search API error:', err);
    return NextResponse.json(
      { success: false, error: 'Failed to process search query' },
      { status: 500 }
    );
  }
}
