import { NextRequest, NextResponse } from 'next/server';
import { getMediaFile } from '@/server/db/repositories/media';

export const dynamic = 'force-dynamic';

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string[] } }
) {
  try {
    const filename = (params.slug || []).join('/');
    if (!filename) {
      return new NextResponse('File not found', { status: 404 });
    }

    const media = await getMediaFile(filename);

    return new NextResponse(new Uint8Array(media.buffer), {
      status: 200,
      headers: {
        'Content-Type': media.mimeType,
        'Content-Length': media.buffer.length.toString(),
        'Cache-Control': media.isFallback
          ? 'public, max-age=60, s-maxage=60'
          : 'public, max-age=31536000, immutable',
        ETag: `"${filename}"`,
      },
    });
  } catch (err: any) {
    console.error('Error in /uploads route:', err);
    return new NextResponse('Internal server error loading image', { status: 500 });
  }
}
