const fs = require('fs');
const path = require('path');

// 1. Load Supabase Dump and Local DB
const supabaseDump = JSON.parse(fs.readFileSync('scratch/supabase_full_dump.json', 'utf8'));
const localDb = JSON.parse(fs.readFileSync('data/db.json', 'utf8'));

function sqlEscape(val) {
  if (val === null || val === undefined) return 'NULL';
  if (typeof val === 'number') return String(val);
  if (typeof val === 'boolean') return val ? '1' : '0';
  if (typeof val === 'object') {
    val = JSON.stringify(val);
  }
  let str = String(val);
  str = str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, (char) => {
    switch (char) {
      case "\0": return "\\0";
      case "\x08": return "\\b";
      case "\x09": return "\\t";
      case "\x1a": return "\\z";
      case "\n": return "\\n";
      case "\r": return "\\r";
      case "\"":
      case "'":
      case "\\":
      case "%":
        return "\\" + char;
      default:
        return char;
    }
  });
  return `'${str}'`;
}

function formatDate(d) {
  if (!d) return 'NULL';
  try {
    const dt = new Date(d);
    if (isNaN(dt.getTime())) return sqlEscape(d);
    return `'${dt.toISOString().slice(0, 19).replace('T', ' ')}'`;
  } catch {
    return sqlEscape(d);
  }
}

let sql = `-- ============================================================
-- BALAJI ARCHITECT & INTERIORS
-- HOSTINGER PHPMYADMIN MYSQL DATABASE IMPORT
-- Includes 100% Real Live Supabase Data + Full Luxury Products & Inventory
-- Compatible with Hostinger hPanel phpMyAdmin (MySQL 5.7+ / 8.0+ / MariaDB)
-- Generated: ${new Date().toISOString()}
-- ============================================================

SET FOREIGN_KEY_CHECKS = 0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";
SET NAMES utf8mb4;

-- ------------------------------------------------------------
-- TARGET DATABASE
-- (Ensures query runs inside u603162798_balaji_arc_db even if imported from server root)
-- ------------------------------------------------------------
USE \`u603162798_balaji_arc_db\`;

-- ------------------------------------------------------------
-- CLEAN SLATE: DROP OLD TABLES IF THEY ALREADY EXIST
-- (Guarantees no column mismatches or schema collisions)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS \`push_subscriptions\`;
DROP TABLE IF EXISTS \`audit_logs\`;
DROP TABLE IF EXISTS \`site_settings\`;
DROP TABLE IF EXISTS \`enquiries\`;
DROP TABLE IF EXISTS \`quote_items\`;
DROP TABLE IF EXISTS \`quotes\`;
DROP TABLE IF EXISTS \`order_items\`;
DROP TABLE IF EXISTS \`orders\`;
DROP TABLE IF EXISTS \`customers\`;
DROP TABLE IF EXISTS \`services\`;
DROP TABLE IF EXISTS \`projects\`;
DROP TABLE IF EXISTS \`inventory\`;
DROP TABLE IF EXISTS \`product_variants\`;
DROP TABLE IF EXISTS \`collections\`;
DROP TABLE IF EXISTS \`products\`;
DROP TABLE IF EXISTS \`categories\`;
DROP TABLE IF EXISTS \`admins\`;

-- ------------------------------------------------------------
-- 1. ADMINS TABLE
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`admins\` (
  \`id\` VARCHAR(36) NOT NULL,
  \`email\` VARCHAR(255) NOT NULL UNIQUE,
  \`password_hash\` TEXT NOT NULL,
  \`name\` VARCHAR(255) NOT NULL,
  \`role\` VARCHAR(50) NOT NULL DEFAULT 'super_admin',
  \`status\` VARCHAR(50) NOT NULL DEFAULT 'active',
  \`must_change_password\` TINYINT(1) NOT NULL DEFAULT 0,
  \`last_login_at\` DATETIME NULL,
  \`created_at\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  KEY \`idx_admins_email\` (\`email\`),
  KEY \`idx_admins_role\` (\`role\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 2. CATEGORIES TABLE
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`categories\` (
  \`id\` VARCHAR(36) NOT NULL,
  \`name\` VARCHAR(255) NOT NULL,
  \`slug\` VARCHAR(255) NOT NULL UNIQUE,
  \`description\` TEXT NULL,
  \`image_url\` TEXT NULL,
  \`parent_id\` VARCHAR(36) NULL,
  \`sort_order\` INT NOT NULL DEFAULT 0,
  \`is_active\` TINYINT(1) NOT NULL DEFAULT 1,
  \`created_at\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  KEY \`idx_categories_slug\` (\`slug\`),
  KEY \`idx_categories_sort\` (\`sort_order\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 3. PRODUCTS TABLE (Curated Luxury Materials & Objects)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`products\` (
  \`id\` VARCHAR(36) NOT NULL,
  \`name\` VARCHAR(255) NOT NULL,
  \`slug\` VARCHAR(255) NOT NULL UNIQUE,
  \`sku\` VARCHAR(100) NOT NULL UNIQUE,
  \`brand\` VARCHAR(255) NULL DEFAULT 'Balaji Atelier',
  \`category_id\` VARCHAR(36) NULL,
  \`subcategory\` VARCHAR(255) NULL,
  \`description\` LONGTEXT NULL,
  \`price\` DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
  \`sale_price\` DECIMAL(12, 2) NULL,
  \`unit\` VARCHAR(50) NOT NULL DEFAULT 'sq ft',
  \`moq\` INT NOT NULL DEFAULT 1,
  \`stock\` INT NOT NULL DEFAULT 0,
  \`purchase_mode\` VARCHAR(50) NOT NULL DEFAULT 'BUY_NOW',
  \`lead_time\` VARCHAR(100) NOT NULL DEFAULT '3-5 business days',
  \`dimensions\` VARCHAR(255) NULL,
  \`thickness\` VARCHAR(100) NULL,
  \`material\` VARCHAR(255) NULL,
  \`finish\` VARCHAR(255) NULL,
  \`color\` VARCHAR(100) NULL,
  \`images\` JSON NULL,
  \`variants\` JSON NULL,
  \`is_featured\` TINYINT(1) NOT NULL DEFAULT 0,
  \`is_new\` TINYINT(1) NOT NULL DEFAULT 0,
  \`is_bestseller\` TINYINT(1) NOT NULL DEFAULT 0,
  \`published\` TINYINT(1) NOT NULL DEFAULT 1,
  \`tags\` JSON NULL,
  \`specifications\` JSON NULL,
  \`created_at\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  KEY \`idx_products_slug\` (\`slug\`),
  KEY \`idx_products_sku\` (\`sku\`),
  KEY \`idx_products_cat\` (\`category_id\`),
  KEY \`idx_products_featured\` (\`is_featured\`),
  KEY \`idx_products_published\` (\`published\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 4. PRODUCT VARIANTS TABLE
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`product_variants\` (
  \`id\` VARCHAR(36) NOT NULL,
  \`product_id\` VARCHAR(36) NULL,
  \`sku\` VARCHAR(100) NOT NULL UNIQUE,
  \`name\` VARCHAR(255) NULL,
  \`finish\` VARCHAR(100) NULL,
  \`thickness\` VARCHAR(100) NULL,
  \`color\` VARCHAR(100) NULL,
  \`size\` VARCHAR(100) NULL,
  \`dimensions\` VARCHAR(255) NULL,
  \`price_modifier\` DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
  \`stock\` INT NOT NULL DEFAULT 0,
  \`image_url\` TEXT NULL,
  \`created_at\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  KEY \`idx_variants_prod\` (\`product_id\`),
  KEY \`idx_variants_sku\` (\`sku\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 5. INVENTORY TABLE
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`inventory\` (
  \`id\` VARCHAR(36) NOT NULL,
  \`product_id\` VARCHAR(36) NULL,
  \`variant_id\` VARCHAR(36) NULL,
  \`stock_on_hand\` INT NOT NULL DEFAULT 0,
  \`stock_reserved\` INT NOT NULL DEFAULT 0,
  \`stock_available\` INT NOT NULL DEFAULT 0,
  \`low_stock_threshold\` INT NOT NULL DEFAULT 5,
  \`updated_at\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  KEY \`idx_inventory_prod\` (\`product_id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 6. PROJECTS TABLE (Curated Portfolio Commissions)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`projects\` (
  \`id\` VARCHAR(36) NOT NULL,
  \`title\` VARCHAR(255) NOT NULL,
  \`slug\` VARCHAR(255) NOT NULL UNIQUE,
  \`location\` VARCHAR(255) NULL,
  \`year\` VARCHAR(50) NULL,
  \`project_type\` VARCHAR(100) NULL,
  \`area\` VARCHAR(100) NULL,
  \`short_description\` TEXT NULL,
  \`description\` LONGTEXT NULL,
  \`hero_image\` TEXT NULL,
  \`gallery\` JSON NULL,
  \`design_approach\` TEXT NULL,
  \`materials_used\` JSON NULL,
  \`before_after\` JSON NULL,
  \`is_published\` TINYINT(1) NOT NULL DEFAULT 1,
  \`is_featured\` TINYINT(1) NOT NULL DEFAULT 0,
  \`sort_order\` INT NOT NULL DEFAULT 0,
  \`tags\` JSON NULL,
  \`created_at\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  KEY \`idx_projects_slug\` (\`slug\`),
  KEY \`idx_projects_featured\` (\`is_featured\`),
  KEY \`idx_projects_sort\` (\`sort_order\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 7. SERVICES TABLE
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`services\` (
  \`id\` VARCHAR(36) NOT NULL,
  \`title\` VARCHAR(255) NOT NULL,
  \`slug\` VARCHAR(255) NOT NULL UNIQUE,
  \`short_desc\` TEXT NULL,
  \`full_desc\` LONGTEXT NULL,
  \`icon_name\` VARCHAR(100) NOT NULL DEFAULT 'Compass',
  \`image_url\` TEXT NULL,
  \`deliverables\` JSON NULL,
  \`sort_order\` INT NOT NULL DEFAULT 0,
  \`is_published\` TINYINT(1) NOT NULL DEFAULT 1,
  \`created_at\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  KEY \`idx_services_slug\` (\`slug\`),
  KEY \`idx_services_sort\` (\`sort_order\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 8. CUSTOMERS TABLE
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`customers\` (
  \`id\` VARCHAR(36) NOT NULL,
  \`email\` VARCHAR(255) NOT NULL UNIQUE,
  \`phone\` VARCHAR(50) NULL,
  \`full_name\` VARCHAR(255) NULL,
  \`company_name\` VARCHAR(255) NULL,
  \`gstin\` VARCHAR(50) NULL,
  \`is_guest\` TINYINT(1) NOT NULL DEFAULT 0,
  \`addresses\` JSON NULL,
  \`total_orders\` INT NOT NULL DEFAULT 0,
  \`total_spent\` DECIMAL(14, 2) NOT NULL DEFAULT 0.00,
  \`created_at\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  KEY \`idx_customers_email\` (\`email\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 9. ORDERS TABLE
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`orders\` (
  \`id\` VARCHAR(36) NOT NULL,
  \`order_number\` VARCHAR(50) NOT NULL UNIQUE,
  \`customer_id\` VARCHAR(36) NULL,
  \`customer_name\` VARCHAR(255) NULL,
  \`customer_email\` VARCHAR(255) NULL,
  \`customer_phone\` VARCHAR(50) NULL,
  \`shipping_address\` JSON NULL,
  \`billing_address\` JSON NULL,
  \`subtotal\` DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
  \`tax\` DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
  \`shipping_fee\` DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
  \`discount\` DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
  \`total_amount\` DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
  \`order_status\` VARCHAR(50) NOT NULL DEFAULT 'Confirmed',
  \`payment_status\` VARCHAR(50) NOT NULL DEFAULT 'Submitted',
  \`payment_method\` VARCHAR(50) NOT NULL DEFAULT 'UPI',
  \`utr_number\` VARCHAR(100) NULL,
  \`transaction_id\` VARCHAR(100) NULL,
  \`notes\` TEXT NULL,
  \`idempotency_key\` VARCHAR(100) NULL UNIQUE,
  \`items\` JSON NULL,
  \`created_at\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  KEY \`idx_orders_num\` (\`order_number\`),
  KEY \`idx_orders_status\` (\`order_status\`),
  KEY \`idx_orders_payment\` (\`payment_status\`),
  KEY \`idx_orders_email\` (\`customer_email\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 10. ORDER ITEMS TABLE
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`order_items\` (
  \`id\` VARCHAR(36) NOT NULL,
  \`order_id\` VARCHAR(36) NOT NULL,
  \`product_id\` VARCHAR(36) NULL,
  \`variant_id\` VARCHAR(36) NULL,
  \`product_name\` VARCHAR(255) NULL,
  \`product_sku\` VARCHAR(100) NULL,
  \`sku\` VARCHAR(100) NULL,
  \`unit\` VARCHAR(50) NULL,
  \`quantity\` INT NOT NULL DEFAULT 1,
  \`unit_price\` DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
  \`subtotal\` DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
  \`image_url\` TEXT NULL,
  \`selected_color\` VARCHAR(100) NULL,
  \`selected_finish\` VARCHAR(100) NULL,
  \`created_at\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  KEY \`idx_items_order\` (\`order_id\`),
  KEY \`idx_items_product\` (\`product_id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 11. QUOTES TABLE
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`quotes\` (
  \`id\` VARCHAR(36) NOT NULL,
  \`quote_number\` VARCHAR(50) NOT NULL UNIQUE,
  \`customer_name\` VARCHAR(255) NULL,
  \`customer_email\` VARCHAR(255) NULL,
  \`customer_phone\` VARCHAR(50) NULL,
  \`project_type\` VARCHAR(100) NULL,
  \`project_location\` VARCHAR(100) NULL,
  \`city\` VARCHAR(100) NULL,
  \`scope_of_work\` TEXT NULL,
  \`notes\` TEXT NULL,
  \`estimated_budget\` VARCHAR(100) NULL,
  \`budget_range\` VARCHAR(100) NULL,
  \`estimated_timeline\` VARCHAR(100) NULL,
  \`timeline\` VARCHAR(100) NULL,
  \`status\` VARCHAR(50) NOT NULL DEFAULT 'Submitted',
  \`admin_notes\` TEXT NULL,
  \`quoted_amount\` DECIMAL(14, 2) NULL,
  \`total_quoted_amount\` DECIMAL(14, 2) NULL,
  \`items\` JSON NULL,
  \`created_at\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  KEY \`idx_quotes_num\` (\`quote_number\`),
  KEY \`idx_quotes_status\` (\`status\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 12. QUOTE ITEMS TABLE
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`quote_items\` (
  \`id\` VARCHAR(36) NOT NULL,
  \`quote_id\` VARCHAR(36) NOT NULL,
  \`product_id\` VARCHAR(36) NULL,
  \`product_name\` VARCHAR(255) NULL,
  \`dimensions\` VARCHAR(255) NULL,
  \`quantity\` INT NOT NULL DEFAULT 1,
  \`unit\` VARCHAR(50) NOT NULL DEFAULT 'sq ft',
  \`notes\` TEXT NULL,
  \`created_at\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  KEY \`idx_quote_items_quote\` (\`quote_id\`),
  KEY \`idx_quote_items_product\` (\`product_id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 13. ENQUIRIES TABLE
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`enquiries\` (
  \`id\` VARCHAR(36) NOT NULL,
  \`name\` VARCHAR(255) NULL,
  \`email\` VARCHAR(255) NULL,
  \`phone\` VARCHAR(50) NULL,
  \`subject\` VARCHAR(255) NULL,
  \`message\` TEXT NULL,
  \`status\` VARCHAR(50) NOT NULL DEFAULT 'New',
  \`source\` VARCHAR(100) NOT NULL DEFAULT 'Website Contact Form',
  \`admin_notes\` TEXT NULL,
  \`created_at\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  KEY \`idx_enquiries_status\` (\`status\`),
  KEY \`idx_enquiries_email\` (\`email\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 13. SITE SETTINGS TABLE
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`site_settings\` (
  \`id\` VARCHAR(36) NOT NULL,
  \`key\` VARCHAR(100) NULL,
  \`value\` JSON NULL,
  \`raw_json\` JSON NULL,
  \`brand_name\` VARCHAR(255) NULL,
  \`tagline\` TEXT NULL,
  \`contact_email\` VARCHAR(255) NULL,
  \`contact_phone\` VARCHAR(100) NULL,
  \`whatsapp_number\` VARCHAR(100) NULL,
  \`studio_address\` TEXT NULL,
  \`gstin_number\` VARCHAR(50) NULL,
  \`currency\` VARCHAR(10) DEFAULT 'INR',
  \`currency_symbol\` VARCHAR(10) DEFAULT '₹',
  \`tax_rate_percent\` DECIMAL(5,2) DEFAULT 18.00,
  \`standard_shipping_fee\` DECIMAL(10,2) DEFAULT 1500.00,
  \`free_shipping_threshold\` DECIMAL(10,2) DEFAULT 50000.00,
  \`homepage\` JSON NULL,
  \`payment_gateway\` JSON NULL,
  \`portfolio_animation\` JSON NULL,
  \`whatsapp\` JSON NULL,
  \`created_at\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  KEY \`idx_settings_key\` (\`key\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 14. AUDIT LOGS TABLE
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`audit_logs\` (
  \`id\` VARCHAR(36) NOT NULL,
  \`admin_id\` VARCHAR(36) NULL,
  \`admin_email\` VARCHAR(255) NULL,
  \`action\` VARCHAR(100) NULL,
  \`entity\` VARCHAR(100) NULL,
  \`entity_id\` VARCHAR(255) NULL,
  \`details\` JSON NULL,
  \`ip_address\` VARCHAR(100) NULL,
  \`user_agent\` TEXT NULL,
  \`created_at\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  KEY \`idx_audit_admin\` (\`admin_id\`),
  KEY \`idx_audit_action\` (\`action\`),
  KEY \`idx_audit_entity\` (\`entity\`),
  KEY \`idx_audit_created\` (\`created_at\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 15. PUSH SUBSCRIPTIONS TABLE
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`push_subscriptions\` (
  \`id\` VARCHAR(36) NOT NULL,
  \`endpoint\` TEXT NULL,
  \`p256dh\` TEXT NULL,
  \`auth\` TEXT NULL,
  \`created_at\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

`;

// 2. Insert Admins
sql += `\n-- ============================================================\n-- DATA: ADMINS\n-- ============================================================\n`;
const admins = supabaseDump.admins && supabaseDump.admins.length > 0 ? supabaseDump.admins : localDb.admins;
for (const a of admins) {
  sql += `INSERT INTO \`admins\` (\`id\`, \`email\`, \`password_hash\`, \`name\`, \`role\`, \`status\`, \`must_change_password\`, \`last_login_at\`, \`created_at\`, \`updated_at\`)
VALUES (${sqlEscape(a.id)}, ${sqlEscape(a.email)}, ${sqlEscape(a.password_hash || a.passwordHash)}, ${sqlEscape(a.name)}, ${sqlEscape(a.role || 'super_admin')}, ${sqlEscape(a.status || 'active')}, ${a.must_change_password ? 1 : 0}, ${formatDate(a.last_login_at || a.lastLoginAt)}, ${formatDate(a.created_at || a.createdAt)}, ${formatDate(a.updated_at || a.updatedAt)})
ON DUPLICATE KEY UPDATE \`name\` = VALUES(\`name\`), \`password_hash\` = VALUES(\`password_hash\`), \`role\` = VALUES(\`role\`);\n`;
}

// 3. Insert Categories (from Supabase)
sql += `\n-- ============================================================\n-- DATA: CATEGORIES (${supabaseDump.categories.length} from Supabase)\n-- ============================================================\n`;
for (const c of supabaseDump.categories) {
  sql += `INSERT INTO \`categories\` (\`id\`, \`name\`, \`slug\`, \`description\`, \`image_url\`, \`parent_id\`, \`sort_order\`, \`is_active\`, \`created_at\`, \`updated_at\`)
VALUES (${sqlEscape(c.id)}, ${sqlEscape(c.name)}, ${sqlEscape(c.slug)}, ${sqlEscape(c.description)}, ${sqlEscape(c.image_url)}, ${sqlEscape(c.parent_id)}, ${c.sort_order || 0}, ${c.is_active !== false ? 1 : 0}, ${formatDate(c.created_at)}, ${formatDate(c.updated_at)})
ON DUPLICATE KEY UPDATE \`name\` = VALUES(\`name\`), \`description\` = VALUES(\`description\`), \`image_url\` = VALUES(\`image_url\`);\n`;
}

// 4. Insert Products & Inventory (from local DB)
sql += `\n-- ============================================================\n-- DATA: PRODUCTS & INVENTORY (${localDb.products.length} luxury products)\n-- ============================================================\n`;
for (const p of localDb.products) {
  sql += `INSERT INTO \`products\` (\`id\`, \`name\`, \`slug\`, \`sku\`, \`brand\`, \`category_id\`, \`subcategory\`, \`description\`, \`price\`, \`sale_price\`, \`unit\`, \`moq\`, \`stock\`, \`purchase_mode\`, \`lead_time\`, \`dimensions\`, \`thickness\`, \`material\`, \`finish\`, \`color\`, \`images\`, \`variants\`, \`is_featured\`, \`is_new\`, \`is_bestseller\`, \`published\`, \`tags\`, \`specifications\`, \`created_at\`, \`updated_at\`)
VALUES (${sqlEscape(p.id)}, ${sqlEscape(p.name)}, ${sqlEscape(p.slug)}, ${sqlEscape(p.sku)}, ${sqlEscape(p.brand || 'Balaji Atelier')}, ${sqlEscape(p.categoryId)}, ${sqlEscape(p.subcategory)}, ${sqlEscape(p.description)}, ${p.price || 0}, ${p.salePrice || 'NULL'}, ${sqlEscape(p.unit || 'sq ft')}, ${p.moq || 1}, ${p.stock || 0}, ${sqlEscape(p.purchaseMode || 'BUY_NOW')}, ${sqlEscape(p.leadTime || '3-5 business days')}, ${sqlEscape(p.dimensions)}, ${sqlEscape(p.thickness)}, ${sqlEscape(p.material)}, ${sqlEscape(p.finish)}, ${sqlEscape(p.color)}, ${sqlEscape(p.images || [])}, ${sqlEscape(p.variants || [])}, ${p.isFeatured ? 1 : 0}, ${p.isNew ? 1 : 0}, ${p.isBestseller ? 1 : 0}, ${p.published !== false ? 1 : 0}, ${sqlEscape(p.tags || [])}, ${sqlEscape(p.specifications || {})}, ${formatDate(p.createdAt)}, ${formatDate(p.updatedAt)})
ON DUPLICATE KEY UPDATE \`name\` = VALUES(\`name\`), \`price\` = VALUES(\`price\`), \`stock\` = VALUES(\`stock\`);\n`;

  sql += `INSERT INTO \`inventory\` (\`id\`, \`product_id\`, \`variant_id\`, \`stock_on_hand\`, \`stock_reserved\`, \`stock_available\`, \`low_stock_threshold\`)
VALUES (${sqlEscape('inv-' + p.id)}, ${sqlEscape(p.id)}, NULL, ${p.stock || 0}, 0, ${p.stock || 0}, 5)
ON DUPLICATE KEY UPDATE \`stock_on_hand\` = VALUES(\`stock_on_hand\`), \`stock_available\` = VALUES(\`stock_available\`);\n`;

  if (Array.isArray(p.variants)) {
    for (const v of p.variants) {
      sql += `INSERT INTO \`product_variants\` (\`id\`, \`product_id\`, \`sku\`, \`name\`, \`finish\`, \`thickness\`, \`color\`, \`dimensions\`, \`price_modifier\`, \`stock\`)
VALUES (${sqlEscape(v.id)}, ${sqlEscape(p.id)}, ${sqlEscape(v.sku)}, ${sqlEscape(v.name)}, ${sqlEscape(v.finish)}, ${sqlEscape(v.thickness)}, ${sqlEscape(v.color)}, ${sqlEscape(v.dimensions)}, ${v.priceModifier || 0}, ${v.stock || 0})
ON DUPLICATE KEY UPDATE \`name\` = VALUES(\`name\`), \`price_modifier\` = VALUES(\`price_modifier\`), \`stock\` = VALUES(\`stock\`);\n`;
    }
  }
}

// 5. Insert Projects (from Supabase)
sql += `\n-- ============================================================\n-- DATA: PROJECTS (${supabaseDump.projects.length} from Supabase)\n-- ============================================================\n`;
for (const p of supabaseDump.projects) {
  sql += `INSERT INTO \`projects\` (\`id\`, \`title\`, \`slug\`, \`location\`, \`year\`, \`project_type\`, \`area\`, \`short_description\`, \`description\`, \`hero_image\`, \`gallery\`, \`design_approach\`, \`materials_used\`, \`before_after\`, \`is_published\`, \`is_featured\`, \`sort_order\`, \`tags\`, \`created_at\`, \`updated_at\`)
VALUES (${sqlEscape(p.id)}, ${sqlEscape(p.title)}, ${sqlEscape(p.slug)}, ${sqlEscape(p.location)}, ${sqlEscape(p.year)}, ${sqlEscape(p.project_type)}, ${sqlEscape(p.area)}, ${sqlEscape(p.short_description)}, ${sqlEscape(p.description)}, ${sqlEscape(p.hero_image)}, ${sqlEscape(p.gallery || [])}, ${sqlEscape(p.design_approach)}, ${sqlEscape(p.materials_used || [])}, ${sqlEscape(p.before_after)}, ${p.is_published !== false ? 1 : 0}, ${p.is_featured ? 1 : 0}, ${p.sort_order || 0}, ${sqlEscape(p.tags || [])}, ${formatDate(p.created_at)}, ${formatDate(p.updated_at)})
ON DUPLICATE KEY UPDATE \`title\` = VALUES(\`title\`), \`hero_image\` = VALUES(\`hero_image\`), \`description\` = VALUES(\`description\`);\n`;
}

// 6. Insert Services (from Supabase)
sql += `\n-- ============================================================\n-- DATA: SERVICES (${supabaseDump.services.length} from Supabase)\n-- ============================================================\n`;
for (const s of supabaseDump.services) {
  sql += `INSERT INTO \`services\` (\`id\`, \`title\`, \`slug\`, \`short_desc\`, \`full_desc\`, \`icon_name\`, \`image_url\`, \`deliverables\`, \`sort_order\`, \`is_published\`, \`created_at\`, \`updated_at\`)
VALUES (${sqlEscape(s.id)}, ${sqlEscape(s.title)}, ${sqlEscape(s.slug)}, ${sqlEscape(s.short_desc)}, ${sqlEscape(s.full_desc)}, ${sqlEscape(s.icon_name || 'Compass')}, ${sqlEscape(s.image_url)}, ${sqlEscape(s.deliverables || [])}, ${s.sort_order || 0}, ${s.is_published !== false ? 1 : 0}, ${formatDate(s.created_at)}, ${formatDate(s.updated_at)})
ON DUPLICATE KEY UPDATE \`title\` = VALUES(\`title\`), \`image_url\` = VALUES(\`image_url\`), \`full_desc\` = VALUES(\`full_desc\`);\n`;
}

// 7. Insert Customers (from Supabase)
sql += `\n-- ============================================================\n-- DATA: CUSTOMERS (${supabaseDump.customers.length} from Supabase)\n-- ============================================================\n`;
for (const c of supabaseDump.customers) {
  sql += `INSERT INTO \`customers\` (\`id\`, \`email\`, \`phone\`, \`full_name\`, \`is_guest\`, \`created_at\`, \`updated_at\`)
VALUES (${sqlEscape(c.id)}, ${sqlEscape(c.email)}, ${sqlEscape(c.phone)}, ${sqlEscape(c.full_name)}, ${c.is_guest ? 1 : 0}, ${formatDate(c.created_at)}, ${formatDate(c.updated_at)})
ON DUPLICATE KEY UPDATE \`full_name\` = VALUES(\`full_name\`), \`phone\` = VALUES(\`phone\`);\n`;
}

// 8. Insert Orders (from Supabase)
sql += `\n-- ============================================================\n-- DATA: ORDERS (${supabaseDump.orders.length} from Supabase)\n-- ============================================================\n`;
for (const o of supabaseDump.orders) {
  sql += `INSERT INTO \`orders\` (\`id\`, \`order_number\`, \`customer_id\`, \`customer_name\`, \`customer_email\`, \`customer_phone\`, \`shipping_address\`, \`billing_address\`, \`subtotal\`, \`tax\`, \`shipping_fee\`, \`discount\`, \`total_amount\`, \`order_status\`, \`payment_status\`, \`payment_method\`, \`notes\`, \`created_at\`, \`updated_at\`)
VALUES (${sqlEscape(o.id)}, ${sqlEscape(o.order_number)}, ${sqlEscape(o.customer_id)}, ${sqlEscape(o.customer_name)}, ${sqlEscape(o.customer_email)}, ${sqlEscape(o.customer_phone)}, ${sqlEscape(o.shipping_address || {})}, ${sqlEscape(o.billing_address)}, ${o.subtotal || 0}, ${o.tax || 0}, ${o.shipping_fee || 0}, ${o.discount || 0}, ${o.total_amount || 0}, ${sqlEscape(o.order_status || 'Confirmed')}, ${sqlEscape(o.payment_status || 'Submitted')}, ${sqlEscape(o.payment_method || 'UPI')}, ${sqlEscape(o.notes)}, ${formatDate(o.created_at)}, ${formatDate(o.updated_at)})
ON DUPLICATE KEY UPDATE \`order_status\` = VALUES(\`order_status\`), \`payment_status\` = VALUES(\`payment_status\`);\n`;
}

// 9. Insert Order Items (from Supabase)
sql += `\n-- ============================================================\n-- DATA: ORDER ITEMS (${supabaseDump.order_items.length} from Supabase)\n-- ============================================================\n`;
for (const oi of supabaseDump.order_items) {
  sql += `INSERT INTO \`order_items\` (\`id\`, \`order_id\`, \`product_id\`, \`variant_id\`, \`product_name\`, \`product_sku\`, \`unit\`, \`quantity\`, \`unit_price\`, \`subtotal\`, \`image_url\`, \`selected_color\`, \`selected_finish\`)
VALUES (${sqlEscape(oi.id)}, ${sqlEscape(oi.order_id)}, ${sqlEscape(oi.product_id)}, ${sqlEscape(oi.variant_id)}, ${sqlEscape(oi.product_name)}, ${sqlEscape(oi.product_sku)}, ${sqlEscape(oi.unit)}, ${oi.quantity || 1}, ${oi.unit_price || 0}, ${oi.subtotal || 0}, ${sqlEscape(oi.image_url)}, ${sqlEscape(oi.selected_color)}, ${sqlEscape(oi.selected_finish)})
ON DUPLICATE KEY UPDATE \`quantity\` = VALUES(\`quantity\`), \`unit_price\` = VALUES(\`unit_price\`);\n`;
}

// 10. Insert Quotes (from Supabase)
sql += `\n-- ============================================================\n-- DATA: QUOTES (${supabaseDump.quotes.length} from Supabase)\n-- ============================================================\n`;
for (const q of supabaseDump.quotes) {
  sql += `INSERT INTO \`quotes\` (\`id\`, \`quote_number\`, \`customer_name\`, \`customer_email\`, \`customer_phone\`, \`project_type\`, \`project_location\`, \`city\`, \`notes\`, \`scope_of_work\`, \`budget_range\`, \`estimated_budget\`, \`estimated_timeline\`, \`timeline\`, \`status\`, \`admin_notes\`, \`total_quoted_amount\`, \`quoted_amount\`, \`created_at\`, \`updated_at\`)
VALUES (${sqlEscape(q.id)}, ${sqlEscape(q.quote_number)}, ${sqlEscape(q.customer_name)}, ${sqlEscape(q.customer_email)}, ${sqlEscape(q.customer_phone)}, ${sqlEscape(q.project_type)}, ${sqlEscape(q.project_location)}, ${sqlEscape(q.project_location)}, ${sqlEscape(q.notes)}, ${sqlEscape(q.notes)}, ${sqlEscape(q.budget_range)}, ${sqlEscape(q.budget_range)}, ${sqlEscape(q.estimated_timeline)}, ${sqlEscape(q.estimated_timeline)}, ${sqlEscape(q.status || 'Submitted')}, ${sqlEscape(q.admin_notes)}, ${q.total_quoted_amount || 0}, ${q.total_quoted_amount || 0}, ${formatDate(q.created_at)}, ${formatDate(q.updated_at)})
ON DUPLICATE KEY UPDATE \`status\` = VALUES(\`status\`), \`admin_notes\` = VALUES(\`admin_notes\`);\n`;
}

// 11. Insert Enquiries (from Supabase)
sql += `\n-- ============================================================\n-- DATA: ENQUIRIES (${supabaseDump.enquiries.length} from Supabase)\n-- ============================================================\n`;
for (const e of supabaseDump.enquiries) {
  sql += `INSERT INTO \`enquiries\` (\`id\`, \`name\`, \`email\`, \`phone\`, \`subject\`, \`message\`, \`status\`, \`source\`, \`created_at\`)
VALUES (${sqlEscape(e.id)}, ${sqlEscape(e.name)}, ${sqlEscape(e.email)}, ${sqlEscape(e.phone)}, ${sqlEscape(e.subject)}, ${sqlEscape(e.message)}, ${sqlEscape(e.status || 'New')}, ${sqlEscape(e.source || 'Website Contact Form')}, ${formatDate(e.created_at)})
ON DUPLICATE KEY UPDATE \`status\` = VALUES(\`status\`);\n`;
}

// 12. Insert Site Settings (from Supabase)
sql += `\n-- ============================================================\n-- DATA: SITE SETTINGS (from Supabase)\n-- ============================================================\n`;
const rawSettings = supabaseDump.site_settings && supabaseDump.site_settings[0] ? supabaseDump.site_settings[0] : null;
const settingsVal = rawSettings?.value || localDb.siteSettings;
sql += `INSERT INTO \`site_settings\` (\`id\`, \`key\`, \`value\`, \`raw_json\`, \`brand_name\`, \`tagline\`, \`contact_email\`, \`contact_phone\`, \`whatsapp_number\`, \`studio_address\`, \`gstin_number\`, \`currency\`, \`currency_symbol\`, \`tax_rate_percent\`, \`standard_shipping_fee\`, \`free_shipping_threshold\`, \`homepage\`, \`payment_gateway\`)
VALUES ('global', 'general', ${sqlEscape(settingsVal)}, ${sqlEscape(settingsVal)}, ${sqlEscape(settingsVal?.brandName || 'Balaji Architect & Interior')}, ${sqlEscape(settingsVal?.tagline)}, ${sqlEscape(settingsVal?.contactEmail)}, ${sqlEscape(settingsVal?.contactPhone)}, ${sqlEscape(settingsVal?.whatsappNumber)}, ${sqlEscape(settingsVal?.studioAddress)}, ${sqlEscape(settingsVal?.gstinNumber)}, ${sqlEscape(settingsVal?.currency || 'INR')}, ${sqlEscape(settingsVal?.currencySymbol || '₹')}, ${settingsVal?.taxRatePercent || 18}, ${settingsVal?.standardShippingFee || 1500}, ${settingsVal?.freeShippingThreshold || 50000}, ${sqlEscape(settingsVal?.homepage)}, ${sqlEscape(settingsVal?.paymentGateway)})
ON DUPLICATE KEY UPDATE \`value\` = VALUES(\`value\`), \`raw_json\` = VALUES(\`raw_json\`), \`brand_name\` = VALUES(\`brand_name\`);\n`;

// 13. Insert Audit Logs (from Supabase)
sql += `\n-- ============================================================\n-- DATA: AUDIT LOGS (${supabaseDump.audit_logs.length} from Supabase)\n-- ============================================================\n`;
for (const l of supabaseDump.audit_logs) {
  sql += `INSERT INTO \`audit_logs\` (\`id\`, \`admin_id\`, \`admin_email\`, \`action\`, \`entity\`, \`entity_id\`, \`details\`, \`ip_address\`, \`created_at\`)
VALUES (${sqlEscape(l.id)}, ${sqlEscape(l.admin_id)}, ${sqlEscape(l.admin_email)}, ${sqlEscape(l.action)}, ${sqlEscape(l.entity)}, ${sqlEscape(l.entity_id)}, ${sqlEscape(l.details)}, ${sqlEscape(l.ip_address)}, ${formatDate(l.created_at)})
ON DUPLICATE KEY UPDATE \`action\` = VALUES(\`action\`);\n`;
}

sql += `\nSET FOREIGN_KEY_CHECKS = 1;\n`;
sql += `-- ============================================================\n-- IMPORT COMPLETE\n-- ============================================================\n`;

const targetPath = path.resolve('HOSTINGER_PHPMYADMIN_SUPABASE_EXPORT.sql');
fs.writeFileSync(targetPath, sql, 'utf8');
console.log('Successfully generated complete SQL file at:', targetPath);
console.log('Total file size:', (sql.length / 1024).toFixed(1), 'KB');
console.log('Total lines:', sql.split('\n').length);
