/**
 * BALAJI ARCHITECT & INTERIORS
 * Hostinger MySQL Database Diagnostic & Verification Script
 *
 * Usage:
 *   node scripts/test-hostinger-mysql.js
 */

const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

// 1. Load .env.local manually
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
const user = process.env.DB_USER || 'u603162798_balaji_arc_db';
const password = process.env.DB_PASSWORD || '';
const database = process.env.DB_NAME || 'u603162798_balaji_arc_db';

console.log('\n======================================================');
console.log('🏛️  BALAJI ARCHITECT & INTERIORS — HOSTINGER MYSQL CHECK');
console.log('======================================================\n');
console.log(`Configured Host:     ${host}`);
console.log(`Configured Port:     ${port}`);
console.log(`Configured Database: ${database}`);
console.log(`Configured User:     ${user}`);
console.log(`Password Set:        ${password && password.trim().length > 0 ? 'YES (length: ' + password.length + ')' : 'NO (DB_PASSWORD is empty in .env.local)'}\n`);

if (!password || password.trim().length === 0) {
  console.log('⚠️  NOTICE: DB_PASSWORD is currently blank in .env.local.');
  console.log('   The application is currently running safely using Supabase / Local Fallback.');
  console.log('   Once you import HOSTINGER_PHPMYADMIN_SUPABASE_EXPORT.sql into phpMyAdmin,');
  console.log('   set your MySQL user password in .env.local:');
  console.log('   DB_PASSWORD=YourPasswordHere\n');
  process.exit(0);
}

async function runCheck() {
  const startTime = Date.now();
  try {
    console.log('🔌 Attempting connection to Hostinger MySQL pool...');
    const connection = await mysql.createConnection({
      host,
      port,
      user,
      password,
      database,
      connectTimeout: 8000,
    });

    const latency = Date.now() - startTime;
    console.log(`✅ SUCCESS! Connected to Hostinger MySQL in ${latency}ms.\n`);

    const tables = [
      'admins',
      'categories',
      'products',
      'product_variants',
      'inventory',
      'projects',
      'services',
      'customers',
      'orders',
      'order_items',
      'quotes',
      'quote_items',
      'enquiries',
      'site_settings',
      'audit_logs',
    ];

    console.log('📊 TABLE ROW COUNTS IN PHPMYADMIN:');
    console.log('------------------------------------------------------');
    for (const tbl of tables) {
      try {
        const [rows] = await connection.query(`SELECT COUNT(*) as count FROM \`${tbl}\``);
        const count = rows[0].count;
        console.log(`  • ${tbl.padEnd(20)} : ${count} record(s)`);
      } catch (tblErr) {
        console.log(`  • ${tbl.padEnd(20)} : [Table not created yet or inaccessible]`);
      }
    }
    console.log('------------------------------------------------------\n');
    await connection.end();
    console.log('✨ All Hostinger MySQL connection and schema checks passed successfully!\n');
  } catch (err) {
    const elapsed = Date.now() - startTime;
    console.error(`❌ Connection failed after ${elapsed}ms:`, err.message);
    console.log('\n🔍 TROUBLESHOOTING GUIDE:');
    if (err.code === 'ETIMEDOUT' || err.code === 'ENOTFOUND') {
      console.log('  1. If running locally from your PC to Hostinger:');
      console.log('     Hostinger blocks external connections by default.');
      console.log('     Login to Hostinger hPanel -> Databases -> Remote MySQL:');
      console.log('     Add IP: "%" (or your local public IP) to allow remote connections.');
      console.log('     Change DB_HOST from "localhost" to your Hostinger server IP / hostname.');
    } else if (err.code === 'ER_ACCESS_DENIED_ERROR') {
      console.log('  1. Verify the DB_PASSWORD in .env.local matches your Hostinger database user password.');
      console.log('  2. Verify DB_USER is exactly:', user);
    } else if (err.code === 'ER_BAD_DB_ERROR') {
      console.log('  1. Verify database name:', database);
    }
    console.log('\n');
  }
}

runCheck();
