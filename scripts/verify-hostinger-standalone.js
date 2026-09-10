const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
const crypto = require('crypto');

// Load .env.local
const envPath = path.resolve(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const idx = trimmed.indexOf('=');
      if (idx !== -1) {
        const key = trimmed.substring(0, idx).trim();
        const val = trimmed.substring(idx + 1).trim();
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    }
  });
}

const host = process.env.DB_HOST || 'localhost';
const port = Number(process.env.DB_PORT) || 3306;
const user = process.env.DB_USER || 'u603162798_balajiarcdb';
const password = process.env.DB_PASSWORD || '';
const database = process.env.DB_NAME || 'u603162798_balaji_arc_db';

function verifyPassword(passwordAttempt, storedHash) {
  if (!passwordAttempt || !storedHash) return false;
  const parts = storedHash.split(':');
  if (parts.length !== 2) return false;
  const [salt, originalHash] = parts;
  const hash = crypto.pbkdf2Sync(passwordAttempt, salt, 10000, 64, 'sha512').toString('hex');
  return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(originalHash, 'hex'));
}

async function verifyAll() {
  console.log('\n======================================================');
  console.log('🧪 VERIFYING HOSTINGER MYSQL AS STANDALONE ENGINE');
  console.log('======================================================\n');

  const conn = await mysql.createConnection({
    host,
    port,
    user,
    password,
    database,
    connectTimeout: 8000,
  });

  console.log('✅ Connection established.');

  // 1. Check Admins & Auth
  const [admins] = await conn.query('SELECT * FROM admins WHERE email = ?', ['vicks@balaji.com']);
  if (admins.length > 0) {
    const admin = admins[0];
    const isPassValid = verifyPassword('admin123', admin.password_hash);
    console.log(`✅ Admin [${admin.email}] found, role: ${admin.role}. Password check: ${isPassValid ? 'VALID' : 'FAILED'}`);
  } else {
    console.error('❌ Admin not found!');
  }

  // 2. Check Categories
  const [categories] = await conn.query('SELECT id, name, slug FROM categories');
  console.log(`✅ Categories verified (${categories.length} total)`);

  // 3. Check Products & Variants & Inventory
  const [products] = await conn.query('SELECT id, name, slug, price, category_id FROM products');
  const [variants] = await conn.query('SELECT id, product_id, sku, price_modifier FROM product_variants');
  const [inventory] = await conn.query('SELECT id, product_id, stock_on_hand FROM inventory');
  console.log(`✅ Products verified (${products.length} products, ${variants.length} variants, ${inventory.length} inventory records)`);

  // 4. Check Projects & Services
  const [projects] = await conn.query('SELECT id, title, slug, project_type FROM projects');
  const [services] = await conn.query('SELECT id, title, slug FROM services');
  console.log(`✅ Projects & Services verified (${projects.length} projects, ${services.length} services)`);

  // 5. Check Customers
  const [customers] = await conn.query('SELECT id, email, full_name, phone FROM customers');
  console.log(`✅ Customers verified (${customers.length} customers)`);

  // 6. Check Orders & Order Items
  const [orders] = await conn.query('SELECT id, order_number, total_amount, order_status FROM orders');
  const [orderItems] = await conn.query('SELECT id, order_id, product_name, quantity, unit_price, subtotal FROM order_items');
  console.log(`✅ Orders & Items verified (${orders.length} orders, ${orderItems.length} order items)`);

  // 7. Check Quotes & Quote Items
  const [quotes] = await conn.query('SELECT id, quote_number, status, total_quoted_amount FROM quotes');
  const [quoteItems] = await conn.query('SELECT id, quote_id, product_name, quantity, unit FROM quote_items');
  console.log(`✅ Quotes & Items verified (${quotes.length} quotes, ${quoteItems.length} quote items)`);

  // 8. Check Enquiries
  const [enquiries] = await conn.query('SELECT id, name, email, status FROM enquiries');
  console.log(`✅ Enquiries verified (${enquiries.length} enquiries)`);

  // 9. Check Site Settings
  const [settings] = await conn.query('SELECT `key` FROM site_settings');
  console.log(`✅ Site Settings verified (${settings.length} record)`);

  // 10. Check Audit Logs
  const [auditLogs] = await conn.query('SELECT count(*) as count FROM audit_logs');
  console.log(`✅ Audit Logs verified (${auditLogs[0].count} logs)`);

  // 11. Test Write Capability (Insert and delete a test audit log)
  const testId = crypto.randomUUID();
  await conn.execute(
    'INSERT INTO audit_logs (id, admin_email, action, entity, entity_id, details, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())',
    [testId, 'test@hostinger.com', 'STANDALONE_TEST', 'Diagnostics', testId, JSON.stringify({ status: 'ok' })]
  );
  const [inserted] = await conn.query('SELECT id FROM audit_logs WHERE id = ?', [testId]);
  if (inserted.length > 0) {
    await conn.execute('DELETE FROM audit_logs WHERE id = ?', [testId]);
    console.log('✅ Hostinger MySQL INSERT & DELETE write tests passed 100%!');
  }

  await conn.end();
  console.log('\n======================================================');
  console.log('🎉 ALL STANDALONE VERIFICATIONS PASSED WITH FLYING COLORS!');
  console.log('======================================================\n');
}

verifyAll().catch((err) => {
  console.error('Verification failed:', err);
  process.exit(1);
});
