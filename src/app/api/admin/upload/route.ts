import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { verifyAdminToken } from '@/lib/auth';
import { getServiceSupabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    // 1. Authenticate admin
    const cookieToken = req.cookies.get('balaji_admin_session')?.value;
    const authHeader = req.headers.get('authorization')?.replace('Bearer ', '');
    const token = cookieToken || authHeader;

    const admin = token ? verifyAdminToken(token) : null;
    if (!admin) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized admin access. Please log in.' },
        { status: 401 }
      );
    }

    // 2. Parse file from FormData
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const bucket = (formData.get('bucket') as string) || 'products';

    if (!file) {
      return NextResponse.json({ success: false, error: 'No image file provided' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const rawExtension = path.extname(file.name) || '.jpg';
    const extension = rawExtension.toLowerCase();
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `${bucket}-${Date.now()}-${cleanFileName}`;

    // 3. Primary: Try Supabase Cloud Storage
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const supabase = getServiceSupabase();

        // Ensure bucket exists
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
        } else if (error) {
          console.warn('Supabase upload notice:', error.message);
        }
      } catch (sbErr: any) {
        console.warn('Supabase storage exception, using local fallback:', sbErr.message);
      }
    }

    // 4. Fallback: Local Server Storage (/public/uploads)
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
