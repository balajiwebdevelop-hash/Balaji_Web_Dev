import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { requireOwnerOrEmployee } from '@/lib/auth';
import { getServiceSupabase, isSupabaseConfigured, isProduction } from '@/server/db/client';

const ALLOWED_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif', '.svg']);
const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/avif',
  'image/svg+xml',
]);
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB

export const dynamic = 'force-dynamic';

function validateImageMagicBytes(buffer: Buffer, extension: string): boolean {
  if (buffer.length < 4) return false;

  // SVG inspection (text XML or <svg)
  if (extension === '.svg') {
    const textStart = buffer.slice(0, 100).toString('utf8').trim().toLowerCase();
    return textStart.includes('<svg') || textStart.includes('<?xml');
  }

  // JPEG: FF D8 FF
  if (extension === '.jpg' || extension === '.jpeg') {
    return buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
  }

  // PNG: 89 50 4E 47
  if (extension === '.png') {
    return buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47;
  }

  // GIF: GIF87a or GIF89a
  if (extension === '.gif') {
    const header = buffer.slice(0, 4).toString('ascii');
    return header === 'GIF8';
  }

  // WebP: RIFF ... WEBP
  if (extension === '.webp') {
    const riff = buffer.slice(0, 4).toString('ascii');
    const webp = buffer.slice(8, 12).toString('ascii');
    return riff === 'RIFF' && webp === 'WEBP';
  }

  // AVIF: contains ftypavif in first 20 bytes
  if (extension === '.avif') {
    return buffer.slice(4, 16).toString('ascii').includes('ftyp');
  }

  return true;
}

export async function POST(req: NextRequest) {
  const auth = await requireOwnerOrEmployee(req);
  if ('response' in auth) return auth.response;

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const bucket = (formData.get('bucket') as string) || 'products';

    if (!file) {
      return NextResponse.json({ success: false, error: 'No image file provided' }, { status: 400 });
    }

    const rawExtension = path.extname(file.name) || '.jpg';
    const extension = rawExtension.toLowerCase();

    if (!ALLOWED_EXTENSIONS.has(extension)) {
      return NextResponse.json(
        { success: false, error: `Unsupported file extension (${extension}). Allowed: JPG, PNG, WebP, GIF, AVIF, SVG.` },
        { status: 400 }
      );
    }

    if (file.type && !ALLOWED_MIME_TYPES.has(file.type.toLowerCase())) {
      return NextResponse.json(
        { success: false, error: `Invalid MIME type (${file.type}). Allowed: images only.` },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    if (buffer.length > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        { success: false, error: 'File exceeds maximum upload size of 10MB.' },
        { status: 400 }
      );
    }

    // Validate actual file content header (magic bytes)
    if (!validateImageMagicBytes(buffer, extension)) {
      return NextResponse.json(
        { success: false, error: 'File content does not match the specified image format header.' },
        { status: 400 }
      );
    }

    const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `${bucket}-${Date.now()}-${cleanFileName}`;

    // 1. Authoritative Production Persistent Object Storage
    if (isSupabaseConfigured()) {
      try {
        const supabase = getServiceSupabase();

        await supabase.storage.createBucket(bucket, { public: true }).catch(() => {});

        const { data, error } = await supabase.storage.from(bucket).upload(filename, buffer, {
          contentType: file.type || 'image/jpeg',
          upsert: true,
        });

        if (!error && data) {
          const { data: publicUrlData } = supabase.storage.from(bucket).getPublicUrl(filename);
          if (publicUrlData && publicUrlData.publicUrl) {
            return NextResponse.json({
              success: true,
              url: publicUrlData.publicUrl,
              filename,
              storage: 'supabase',
            });
          }
        }

        if (error) {
          console.error('Supabase storage upload error:', error.message);
          if (isProduction()) {
            return NextResponse.json(
              { success: false, error: `Persistent storage upload failed: ${error.message}` },
              { status: 500 }
            );
          }
        }
      } catch (sbErr: any) {
        console.error('Supabase storage exception:', sbErr.message);
        if (isProduction()) {
          return NextResponse.json(
            { success: false, error: 'Storage service temporarily unavailable. Please retry.' },
            { status: 500 }
          );
        }
      }
    } else if (isProduction()) {
      return NextResponse.json(
        { success: false, error: 'Production object storage is not configured.' },
        { status: 500 }
      );
    }

    // 2. Local Server Storage (ALLOWED ONLY IN DEVELOPMENT / LOCAL TEST)
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, filename);
    fs.writeFileSync(filePath, buffer);

    const publicUrl = `/uploads/${filename}`;
    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename,
      storage: 'local',
    });
  } catch (err: any) {
    console.error('Upload route error:', err);
    return NextResponse.json({ success: false, error: err.message || 'Server upload error' }, { status: 500 });
  }
}
