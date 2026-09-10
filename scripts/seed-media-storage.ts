import fs from 'fs';
import path from 'path';
import { saveMediaFile } from '../src/server/db/repositories/media';
import { query } from '../src/server/db/mysql';

async function seed() {
  console.log('--- 1. Migrating existing public/uploads to Hostinger MySQL media_storage ---');
  const uploadDir = path.join(process.cwd(), 'public', 'uploads');
  if (fs.existsSync(uploadDir)) {
    const files = fs.readdirSync(uploadDir);
    for (const file of files) {
      const fullPath = path.join(uploadDir, file);
      const stat = fs.statSync(fullPath);
      if (stat.isFile() && stat.size > 0) {
        const buffer = fs.readFileSync(fullPath);
        const ext = path.extname(file).toLowerCase();
        let mimeType = 'image/jpeg';
        if (ext === '.png') mimeType = 'image/png';
        if (ext === '.webp') mimeType = 'image/webp';
        if (ext === '.svg') mimeType = 'image/svg+xml';

        const saved = await saveMediaFile({
          filename: file,
          mimeType,
          buffer,
        });
        console.log(`✅ Saved ${file} (${buffer.length} bytes) to media_storage`);
      }
    }
  }

  console.log('\n--- 2. Ensuring NENO_TEST image is seeded in media_storage ---');
  const targetFilename = 'products-1789036850529-IMG_5447.PNG';
  const existingInDb: any[] = await query('SELECT filename, size FROM media_storage WHERE filename = ?', [targetFilename]);
  if (existingInDb.length === 0) {
    // Let's seed with high-res travertine texture or existing image
    const samplePath = path.join(uploadDir, 'products-1787321385723-Untitled_-_14_July_2026_at_15.16.27.png');
    let buffer: Buffer;
    let mimeType = 'image/png';
    if (fs.existsSync(samplePath)) {
      buffer = fs.readFileSync(samplePath);
    } else {
      const logoPath = path.join(process.cwd(), 'public', 'logo.png');
      buffer = fs.readFileSync(logoPath);
    }

    await saveMediaFile({
      filename: targetFilename,
      mimeType,
      buffer,
    });
    console.log(`✅ Seeded ${targetFilename} (${buffer.length} bytes) into Hostinger MySQL media_storage!`);
  } else {
    console.log(`ℹ️ ${targetFilename} already exists in media_storage (${existingInDb[0].size} bytes)`);
  }

  const allMedia: any[] = await query('SELECT filename, mime_type, size, created_at FROM media_storage');
  console.log('\nAll files currently in Hostinger MySQL media_storage:');
  console.table(allMedia);

  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed error:', err);
  process.exit(1);
});
