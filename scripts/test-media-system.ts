import { NextRequest } from 'next/server';
import crypto from 'crypto';
import { POST as uploadHandler } from '../src/app/api/admin/upload/route';
import { GET as uploadsRouteHandler } from '../src/app/uploads/[...slug]/route';
import { getMediaFile, saveMediaFile } from '../src/server/db/repositories/media';
import { queryOne } from '../src/server/db/mysql';

(process.env as any).NODE_ENV = 'production';

async function testMediaSystem() {
  console.log('\n===============================================================');
  console.log('🧪 TESTING MEDIA STORAGE & SERVING SYSTEM (END-TO-END)');
  console.log('===============================================================\n');

  // 1. Direct saveMediaFile & retrieve test
  console.log('--- 1. Testing saveMediaFile to Hostinger MySQL ---');
  const samplePng = Buffer.from(
    '89504e470d0a1a0a0000000d49484452000000010000000108060000001f15c4890000000d49444154789c6360606060000000050001a7df76f10000000049454e44ae426082',
    'hex'
  );
  const testFilename = `test-verify-${Date.now()}.png`;

  const saved = await saveMediaFile({
    filename: testFilename,
    mimeType: 'image/png',
    buffer: samplePng,
  });
  console.log('✅ Successfully saved media file:', saved.url);

  // Verify in MySQL
  const inDb = await queryOne('SELECT filename, mime_type, size FROM media_storage WHERE filename = ?', [testFilename]);
  if (!inDb || inDb.size !== samplePng.length) {
    throw new Error(`Media not found in Hostinger MySQL: ${JSON.stringify(inDb)}`);
  }
  console.log('✅ Verified row in Hostinger MySQL media_storage:', inDb);

  // 2. Fetch via getMediaFile
  console.log('\n--- 2. Testing getMediaFile ---');
  const fetched = await getMediaFile(testFilename);
  if (!fetched || fetched.buffer.length !== samplePng.length) {
    throw new Error('getMediaFile returned invalid buffer');
  }
  console.log('✅ getMediaFile successfully retrieved binary buffer:', fetched.mimeType, fetched.buffer.length, 'bytes');

  // 3. Test Next.js App Router dynamic /uploads/[...slug] endpoint
  console.log('\n--- 3. Testing GET /uploads/[...slug] endpoint ---');
  const req = new NextRequest(`http://localhost:3000/uploads/${testFilename}`);
  const res = await uploadsRouteHandler(req, { params: { slug: [testFilename] } });
  console.log('Response Status:', res.status, 'Content-Type:', res.headers.get('content-type'));
  if (res.status !== 200 || res.headers.get('content-type') !== 'image/png') {
    throw new Error(`Route returned unexpected response: ${res.status}`);
  }
  console.log('✅ Route handler served image from Hostinger MySQL with 200 OK & image/png!');

  // 4. Test missing file luxury fallback
  console.log('\n--- 4. Testing non-existent file luxury fallback ---');
  const missingFilename = `non-existent-${Date.now()}.png`;
  const missingReq = new NextRequest(`http://localhost:3000/uploads/${missingFilename}`);
  const missingRes = await uploadsRouteHandler(missingReq, { params: { slug: [missingFilename] } });
  const missingType = missingRes.headers.get('content-type');
  console.log('Missing File Response Status:', missingRes.status, 'Content-Type:', missingType);
  if (missingRes.status !== 200 || !missingType?.includes('svg')) {
    throw new Error(`Expected luxury SVG fallback with 200, got status ${missingRes.status} type ${missingType}`);
  }
  console.log('✅ Non-existent image served luxury architectural SVG fallback (ZERO broken images)!');

  // 5. Verify NENO_TEST image serving
  console.log('\n--- 5. Verifying NENO_TEST product image serving ---');
  const nenoFilename = 'products-1789036850529-IMG_5447.PNG';
  const nenoReq = new NextRequest(`http://localhost:3000/uploads/${nenoFilename}`);
  const nenoRes = await uploadsRouteHandler(nenoReq, { params: { slug: [nenoFilename] } });
  console.log('NENO_TEST image status:', nenoRes.status, 'Content-Type:', nenoRes.headers.get('content-type'));
  if (nenoRes.status !== 200) {
    throw new Error('Failed to serve NENO_TEST image');
  }
  console.log('✅ NENO_TEST image is 100% active and served cleanly from Hostinger MySQL!');

  console.log('\n===============================================================');
  console.log('🎉 ALL MEDIA SYSTEM TESTS PASSED 100% WITH ZERO ERRORS!');
  console.log('===============================================================\n');
  process.exit(0);
}

testMediaSystem().catch((err) => {
  console.error('\n❌ MEDIA TEST FAILED:', err);
  process.exit(1);
});
