import fs from 'fs';
import path from 'path';
import { NextRequest } from 'next/server';

const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf8').split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const idx = trimmed.indexOf('=');
      if (idx !== -1) {
        const k = trimmed.substring(0, idx).trim();
        const v = trimmed.substring(idx + 1).trim();
        if (!process.env[k]) process.env[k] = v;
      }
    }
  });
}
(process.env as any).NODE_ENV = 'production';

async function runEndToEndTests() {
  console.log('\n===============================================================');
  console.log('🧪 TESTING END-TO-END ADMIN AUTHENTICATION IN PRODUCTION MODE');
  console.log('===============================================================\n');

  const { POST: loginHandler } = await import('../src/app/api/auth/login/route');
  const { GET: meHandler } = await import('../src/app/api/auth/me/route');

  // Test 1: Admin Login with admin123
  console.log('1. Testing Login with vicks@balaji.com / admin123...');
  let req = new NextRequest('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email: 'vicks@balaji.com', password: 'admin123', isAdminLogin: true })
  });
  let res = await loginHandler(req);
  let data = await res.json();
  console.log(`Status: ${res.status}, Success: ${data.success}, Role: ${data.role}`);
  if (res.status !== 200 || !data.success || data.role !== 'owner') {
    throw new Error(`Test 1 Failed: ${JSON.stringify(data)}`);
  }
  const sessionCookie = res.cookies.get('balaji_admin_session')?.value;
  if (!sessionCookie) throw new Error('Test 1 Failed: balaji_admin_session cookie missing');
  console.log('✅ Test 1 Passed: Super admin logged in successfully!');

  // Test 2: Admin Login with Vicks@54321
  console.log('\n2. Testing Login with vicks@balaji.com / Vicks@54321...');
  req = new NextRequest('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email: 'vicks@balaji.com', password: 'Vicks@54321', isAdminLogin: true })
  });
  res = await loginHandler(req);
  data = await res.json();
  console.log(`Status: ${res.status}, Success: ${data.success}, Role: ${data.role}`);
  if (res.status !== 200 || !data.success || data.role !== 'owner') {
    throw new Error(`Test 2 Failed: ${JSON.stringify(data)}`);
  }
  console.log('✅ Test 2 Passed: Super admin logged in with Vicks@54321 successfully!');

  // Test 3: Admin Login with whitespace in email
  console.log('\n3. Testing Login with whitespace in email ("  vicks@balaji.com  ")...');
  req = new NextRequest('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email: '  vicks@balaji.com  ', password: 'admin123', isAdminLogin: true })
  });
  res = await loginHandler(req);
  data = await res.json();
  console.log(`Status: ${res.status}, Success: ${data.success}, Role: ${data.role}`);
  if (res.status !== 200 || !data.success) {
    throw new Error(`Test 3 Failed: ${JSON.stringify(data)}`);
  }
  console.log('✅ Test 3 Passed: Email trimming works perfectly!');

  // Test 4: Check /api/auth/me with session cookie
  console.log('\n4. Testing /api/auth/me session resolution with cookie...');
  const meReq = new NextRequest('http://localhost:3000/api/auth/me', {
    method: 'GET',
    headers: {
      cookie: `balaji_admin_session=${sessionCookie}`
    }
  });
  const meRes = await meHandler(meReq);
  const meData = await meRes.json();
  console.log('Me endpoint data:', meData.admin?.email, meData.admin?.role);
  if (!meData.admin || meData.admin.email !== 'vicks@balaji.com') {
    throw new Error(`Test 4 Failed: ${JSON.stringify(meData)}`);
  }
  console.log('✅ Test 4 Passed: Admin session verified successfully by /api/auth/me!');

  // Test 5: Wrong password produces clean 401 error (NOT 500)
  console.log('\n5. Testing wrong password handling...');
  req = new NextRequest('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email: 'vicks@balaji.com', password: 'completely_wrong_pass', isAdminLogin: true })
  });
  res = await loginHandler(req);
  data = await res.json();
  console.log(`Status: ${res.status}, Error: ${data.error}, Code: ${data.code}`);
  if (res.status !== 401 || data.code !== 'INVALID_CREDENTIALS') {
    throw new Error(`Test 5 Failed: Expected 401 but got ${res.status}`);
  }
  console.log('✅ Test 5 Passed: Clean 401 INVALID_CREDENTIALS returned, zero 500 exceptions!');

  // Test 6: Resilient JWT Secret handling if env var missing
  console.log('\n6. Testing login resilience without JWT_SECRET in env...');
  const savedJwt = process.env.JWT_SECRET;
  delete process.env.JWT_SECRET;
  req = new NextRequest('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email: 'vicks@balaji.com', password: 'admin123', isAdminLogin: true })
  });
  res = await loginHandler(req);
  data = await res.json();
  console.log(`Status without JWT_SECRET: ${res.status}, Success: ${data.success}`);
  if (res.status !== 200 || !data.success) {
    throw new Error(`Test 6 Failed: ${JSON.stringify(data)}`);
  }
  process.env.JWT_SECRET = savedJwt;
  console.log('✅ Test 6 Passed: Resilient server fallback secret prevented any 500 crash!');

  console.log('\n===============================================================');
  console.log('🎉 ALL ADMIN LOGIN TESTS PASSED 100% WITH ZERO EXCEPTIONS!');
  console.log('===============================================================\n');
  process.exit(0);
}

runEndToEndTests().catch(err => {
  console.error('\n❌ AUTH TEST SUITE FAILED:', err);
  process.exit(1);
});
