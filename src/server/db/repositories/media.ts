import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { execute, queryOne, isMySQLConfigured } from '../mysql';

export interface MediaFile {
  id: string;
  filename: string;
  mimeType: string;
  size: number;
  buffer: Buffer;
  createdAt?: string;
}

const MEMORY_CACHE = new Map<string, { mimeType: string; buffer: Buffer; cachedAt: number }>();
const CACHE_TTL_MS = 1000 * 60 * 60 * 24; // 24 hours in memory

/**
 * Returns a sleek, luxury architectural SVG placeholder if a requested image cannot be found.
 */
export function getLuxuryFallbackSvg(label: string = 'Balaji Atelier'): { mimeType: string; buffer: Buffer } {
  const safeLabel = label.replace(/[<>&"']/g, '').trim().toUpperCase() || 'ARCHITECTURAL MATERIAL';
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="800" height="1000">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#181310" />
      <stop offset="50%" stop-color="#120E0C" />
      <stop offset="100%" stop-color="#0A0807" />
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F3E5AB" />
      <stop offset="50%" stop-color="#D4AF37" />
      <stop offset="100%" stop-color="#AA771C" />
    </linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#261E19" stroke-width="0.8" opacity="0.6" />
    </pattern>
  </defs>

  <!-- Background -->
  <rect width="100%" height="100%" fill="url(#bgGrad)" />
  <rect width="100%" height="100%" fill="url(#grid)" />

  <!-- Outer Architectural Border -->
  <rect x="30" y="30" width="740" height="940" fill="none" stroke="#362920" stroke-width="1.5" />
  <rect x="36" y="36" width="728" height="928" fill="none" stroke="#D4AF37" stroke-width="0.7" opacity="0.4" />

  <!-- Corner Accents -->
  <path d="M 24 45 L 24 24 L 45 24" fill="none" stroke="url(#goldGrad)" stroke-width="2" />
  <path d="M 776 45 L 776 24 L 755 24" fill="none" stroke="url(#goldGrad)" stroke-width="2" />
  <path d="M 24 955 L 24 976 L 45 976" fill="none" stroke="url(#goldGrad)" stroke-width="2" />
  <path d="M 776 955 L 776 976 L 755 976" fill="none" stroke="url(#goldGrad)" stroke-width="2" />

  <!-- Central Diamond Crest -->
  <g transform="translate(400, 440)">
    <polygon points="0,-70 70,0 0,70 -70,0" fill="none" stroke="url(#goldGrad)" stroke-width="1.5" opacity="0.8" />
    <polygon points="0,-55 55,0 0,55 -55,0" fill="#1E1713" stroke="#523F32" stroke-width="1" />
    
    <!-- Stylized 'B' Monogram -->
    <text x="0" y="16" font-family="'Cinzel', 'Times New Roman', serif" font-size="44" font-weight="600" fill="url(#goldGrad)" text-anchor="middle" letter-spacing="2">B</text>
  </g>

  <!-- Label & Brand -->
  <text x="400" y="570" font-family="'Cinzel', 'Times New Roman', serif" font-size="14" font-weight="600" fill="#D4AF37" text-anchor="middle" letter-spacing="6">BALAJI ATELIER</text>
  <text x="400" y="605" font-family="'Cinzel', 'Helvetica Neue', sans-serif" font-size="18" font-weight="500" fill="#FCFAF6" text-anchor="middle" letter-spacing="3">${safeLabel}</text>
  <text x="400" y="635" font-family="'Cinzel', 'Helvetica Neue', sans-serif" font-size="11" font-weight="400" fill="#8E8275" text-anchor="middle" letter-spacing="4">ARCHITECTURAL SURFACES &amp; HARDWARE</text>

  <!-- Subtle Bottom Watermark -->
  <line x1="280" y1="670" x2="520" y2="670" stroke="#3A2E26" stroke-width="1" />
</svg>`;

  return {
    mimeType: 'image/svg+xml',
    buffer: Buffer.from(svg, 'utf8'),
  };
}

/**
 * Saves a media file permanently in Hostinger MySQL and local cache.
 */
export async function saveMediaFile({
  filename,
  mimeType,
  buffer,
}: {
  filename: string;
  mimeType: string;
  buffer: Buffer;
}): Promise<{ id: string; filename: string; url: string }> {
  const id = `media-${crypto.randomUUID()}`;
  const size = buffer.length;

  // 1. Persist to Hostinger MySQL
  if (isMySQLConfigured()) {
    try {
      await execute(
        `INSERT INTO media_storage (id, filename, mime_type, size, data, created_at)
         VALUES (?, ?, ?, ?, ?, NOW())
         ON DUPLICATE KEY UPDATE
           mime_type = VALUES(mime_type),
           size = VALUES(size),
           data = VALUES(data),
           created_at = NOW()`,
        [id, filename, mimeType, size, buffer]
      );
    } catch (mysqlErr) {
      console.error('[Media Storage] Failed to write to Hostinger MySQL:', mysqlErr);
      throw mysqlErr;
    }
  }

  // 2. Cache in memory
  MEMORY_CACHE.set(filename, {
    mimeType,
    buffer,
    cachedAt: Date.now(),
  });

  // 3. Best-effort write to local filesystem
  try {
    const uploadDirs = [
      path.join(process.cwd(), 'public', 'uploads'),
      path.join('/tmp', 'balaji-uploads'),
    ];

    for (const dir of uploadDirs) {
      try {
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(path.join(dir, filename), buffer);
      } catch {}
    }
  } catch {}

  return {
    id,
    filename,
    url: `/uploads/${filename}`,
  };
}

/**
 * Retrieves a media file by its filename.
 * Checks memory cache -> local disk -> Hostinger MySQL -> fallback luxury SVG.
 */
export async function getMediaFile(
  filename: string
): Promise<{ mimeType: string; buffer: Buffer; isFallback?: boolean }> {
  // Strip any leading slashes or paths
  const cleanFilename = path.basename(filename);

  // 1. Check in-memory cache
  const cached = MEMORY_CACHE.get(cleanFilename);
  if (cached && Date.now() - cached.cachedAt < CACHE_TTL_MS) {
    return { mimeType: cached.mimeType, buffer: cached.buffer };
  }

  // 2. Check local disk locations
  const potentialPaths = [
    path.join(process.cwd(), 'public', 'uploads', cleanFilename),
    path.join('/tmp', 'balaji-uploads', cleanFilename),
  ];

  for (const diskPath of potentialPaths) {
    try {
      if (fs.existsSync(diskPath)) {
        const stats = fs.statSync(diskPath);
        if (stats.isFile() && stats.size > 0) {
          const buffer = fs.readFileSync(diskPath);
          const ext = path.extname(cleanFilename).toLowerCase();
          const mimeType = getMimeTypeFromExt(ext);

          MEMORY_CACHE.set(cleanFilename, { mimeType, buffer, cachedAt: Date.now() });
          return { mimeType, buffer };
        }
      }
    } catch {}
  }

  // 3. Query Hostinger MySQL media_storage
  if (isMySQLConfigured()) {
    try {
      const row = await queryOne(
        'SELECT mime_type, data FROM media_storage WHERE filename = ? LIMIT 1',
        [cleanFilename]
      );

      if (row && row.data) {
        const buffer = Buffer.isBuffer(row.data) ? row.data : Buffer.from(row.data);
        const mimeType = row.mime_type || 'image/jpeg';

        // Cache for subsequent fast responses
        MEMORY_CACHE.set(cleanFilename, { mimeType, buffer, cachedAt: Date.now() });

        // Best-effort write to /tmp for fast disk cache
        try {
          const tmpDir = path.join('/tmp', 'balaji-uploads');
          if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });
          fs.writeFileSync(path.join(tmpDir, cleanFilename), buffer);
        } catch {}

        return { mimeType, buffer };
      }
    } catch (mysqlErr) {
      console.error('[Media Storage] MySQL fetch failed:', mysqlErr);
    }
  }

  // 4. If not found, return our luxury architectural fallback SVG
  const fallback = getLuxuryFallbackSvg(cleanFilename.replace(/[-_]/g, ' '));
  return { ...fallback, isFallback: true };
}

function getMimeTypeFromExt(ext: string): string {
  switch (ext) {
    case '.png':
      return 'image/png';
    case '.webp':
      return 'image/webp';
    case '.gif':
      return 'image/gif';
    case '.svg':
      return 'image/svg+xml';
    case '.avif':
      return 'image/avif';
    case '.jpg':
    case '.jpeg':
    default:
      return 'image/jpeg';
  }
}
