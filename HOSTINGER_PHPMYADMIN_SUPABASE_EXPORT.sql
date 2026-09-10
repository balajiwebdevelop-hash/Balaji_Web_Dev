-- ============================================================
-- BALAJI ARCHITECT & INTERIORS
-- HOSTINGER PHPMYADMIN MYSQL DATABASE IMPORT
-- Includes 100% Real Live Supabase Data + Full Luxury Products & Inventory
-- Compatible with Hostinger hPanel phpMyAdmin (MySQL 5.7+ / 8.0+ / MariaDB)
-- Generated: 2026-09-10T08:03:45.033Z
-- ============================================================

SET FOREIGN_KEY_CHECKS = 0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";
SET NAMES utf8mb4;

-- ------------------------------------------------------------
-- TARGET DATABASE
-- (Ensures query runs inside u603162798_balaji_arc_db even if imported from server root)
-- ------------------------------------------------------------
USE `u603162798_balaji_arc_db`;

-- ------------------------------------------------------------
-- CLEAN SLATE: DROP OLD TABLES IF THEY ALREADY EXIST
-- (Guarantees no column mismatches or schema collisions)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS `push_subscriptions`;
DROP TABLE IF EXISTS `audit_logs`;
DROP TABLE IF EXISTS `site_settings`;
DROP TABLE IF EXISTS `enquiries`;
DROP TABLE IF EXISTS `quote_items`;
DROP TABLE IF EXISTS `quotes`;
DROP TABLE IF EXISTS `order_items`;
DROP TABLE IF EXISTS `orders`;
DROP TABLE IF EXISTS `customers`;
DROP TABLE IF EXISTS `services`;
DROP TABLE IF EXISTS `projects`;
DROP TABLE IF EXISTS `inventory`;
DROP TABLE IF EXISTS `product_variants`;
DROP TABLE IF EXISTS `collections`;
DROP TABLE IF EXISTS `products`;
DROP TABLE IF EXISTS `categories`;
DROP TABLE IF EXISTS `admins`;

-- ------------------------------------------------------------
-- 1. ADMINS TABLE
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `admins` (
  `id` VARCHAR(36) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password_hash` TEXT NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `role` VARCHAR(50) NOT NULL DEFAULT 'super_admin',
  `status` VARCHAR(50) NOT NULL DEFAULT 'active',
  `must_change_password` TINYINT(1) NOT NULL DEFAULT 0,
  `last_login_at` DATETIME NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_admins_email` (`email`),
  KEY `idx_admins_role` (`role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 2. CATEGORIES TABLE
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `categories` (
  `id` VARCHAR(36) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL UNIQUE,
  `description` TEXT NULL,
  `image_url` TEXT NULL,
  `parent_id` VARCHAR(36) NULL,
  `sort_order` INT NOT NULL DEFAULT 0,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_categories_slug` (`slug`),
  KEY `idx_categories_sort` (`sort_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 3. PRODUCTS TABLE (Curated Luxury Materials & Objects)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `products` (
  `id` VARCHAR(36) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL UNIQUE,
  `sku` VARCHAR(100) NOT NULL UNIQUE,
  `brand` VARCHAR(255) NULL DEFAULT 'Balaji Atelier',
  `category_id` VARCHAR(36) NULL,
  `subcategory` VARCHAR(255) NULL,
  `description` LONGTEXT NULL,
  `price` DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
  `sale_price` DECIMAL(12, 2) NULL,
  `unit` VARCHAR(50) NOT NULL DEFAULT 'sq ft',
  `moq` INT NOT NULL DEFAULT 1,
  `stock` INT NOT NULL DEFAULT 0,
  `purchase_mode` VARCHAR(50) NOT NULL DEFAULT 'BUY_NOW',
  `lead_time` VARCHAR(100) NOT NULL DEFAULT '3-5 business days',
  `dimensions` VARCHAR(255) NULL,
  `thickness` VARCHAR(100) NULL,
  `material` VARCHAR(255) NULL,
  `finish` VARCHAR(255) NULL,
  `color` VARCHAR(100) NULL,
  `images` JSON NULL,
  `variants` JSON NULL,
  `is_featured` TINYINT(1) NOT NULL DEFAULT 0,
  `is_new` TINYINT(1) NOT NULL DEFAULT 0,
  `is_bestseller` TINYINT(1) NOT NULL DEFAULT 0,
  `published` TINYINT(1) NOT NULL DEFAULT 1,
  `tags` JSON NULL,
  `specifications` JSON NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_products_slug` (`slug`),
  KEY `idx_products_sku` (`sku`),
  KEY `idx_products_cat` (`category_id`),
  KEY `idx_products_featured` (`is_featured`),
  KEY `idx_products_published` (`published`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 4. PRODUCT VARIANTS TABLE
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `product_variants` (
  `id` VARCHAR(36) NOT NULL,
  `product_id` VARCHAR(36) NULL,
  `sku` VARCHAR(100) NOT NULL UNIQUE,
  `name` VARCHAR(255) NULL,
  `finish` VARCHAR(100) NULL,
  `thickness` VARCHAR(100) NULL,
  `color` VARCHAR(100) NULL,
  `size` VARCHAR(100) NULL,
  `dimensions` VARCHAR(255) NULL,
  `price_modifier` DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
  `stock` INT NOT NULL DEFAULT 0,
  `image_url` TEXT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_variants_prod` (`product_id`),
  KEY `idx_variants_sku` (`sku`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 5. INVENTORY TABLE
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `inventory` (
  `id` VARCHAR(36) NOT NULL,
  `product_id` VARCHAR(36) NULL,
  `variant_id` VARCHAR(36) NULL,
  `stock_on_hand` INT NOT NULL DEFAULT 0,
  `stock_reserved` INT NOT NULL DEFAULT 0,
  `stock_available` INT NOT NULL DEFAULT 0,
  `low_stock_threshold` INT NOT NULL DEFAULT 5,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_inventory_prod` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 6. PROJECTS TABLE (Curated Portfolio Commissions)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `projects` (
  `id` VARCHAR(36) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL UNIQUE,
  `location` VARCHAR(255) NULL,
  `year` VARCHAR(50) NULL,
  `project_type` VARCHAR(100) NULL,
  `area` VARCHAR(100) NULL,
  `short_description` TEXT NULL,
  `description` LONGTEXT NULL,
  `hero_image` TEXT NULL,
  `gallery` JSON NULL,
  `design_approach` TEXT NULL,
  `materials_used` JSON NULL,
  `before_after` JSON NULL,
  `is_published` TINYINT(1) NOT NULL DEFAULT 1,
  `is_featured` TINYINT(1) NOT NULL DEFAULT 0,
  `sort_order` INT NOT NULL DEFAULT 0,
  `tags` JSON NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_projects_slug` (`slug`),
  KEY `idx_projects_featured` (`is_featured`),
  KEY `idx_projects_sort` (`sort_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 7. SERVICES TABLE
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `services` (
  `id` VARCHAR(36) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL UNIQUE,
  `short_desc` TEXT NULL,
  `full_desc` LONGTEXT NULL,
  `icon_name` VARCHAR(100) NOT NULL DEFAULT 'Compass',
  `image_url` TEXT NULL,
  `deliverables` JSON NULL,
  `sort_order` INT NOT NULL DEFAULT 0,
  `is_published` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_services_slug` (`slug`),
  KEY `idx_services_sort` (`sort_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 8. CUSTOMERS TABLE
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `customers` (
  `id` VARCHAR(36) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `phone` VARCHAR(50) NULL,
  `full_name` VARCHAR(255) NULL,
  `company_name` VARCHAR(255) NULL,
  `gstin` VARCHAR(50) NULL,
  `is_guest` TINYINT(1) NOT NULL DEFAULT 0,
  `addresses` JSON NULL,
  `total_orders` INT NOT NULL DEFAULT 0,
  `total_spent` DECIMAL(14, 2) NOT NULL DEFAULT 0.00,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_customers_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 9. ORDERS TABLE
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `orders` (
  `id` VARCHAR(36) NOT NULL,
  `order_number` VARCHAR(50) NOT NULL UNIQUE,
  `customer_id` VARCHAR(36) NULL,
  `customer_name` VARCHAR(255) NULL,
  `customer_email` VARCHAR(255) NULL,
  `customer_phone` VARCHAR(50) NULL,
  `shipping_address` JSON NULL,
  `billing_address` JSON NULL,
  `subtotal` DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
  `tax` DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
  `shipping_fee` DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
  `discount` DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
  `total_amount` DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
  `order_status` VARCHAR(50) NOT NULL DEFAULT 'Confirmed',
  `payment_status` VARCHAR(50) NOT NULL DEFAULT 'Submitted',
  `payment_method` VARCHAR(50) NOT NULL DEFAULT 'UPI',
  `utr_number` VARCHAR(100) NULL,
  `transaction_id` VARCHAR(100) NULL,
  `notes` TEXT NULL,
  `idempotency_key` VARCHAR(100) NULL UNIQUE,
  `items` JSON NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_orders_num` (`order_number`),
  KEY `idx_orders_status` (`order_status`),
  KEY `idx_orders_payment` (`payment_status`),
  KEY `idx_orders_email` (`customer_email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 10. ORDER ITEMS TABLE
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `order_items` (
  `id` VARCHAR(36) NOT NULL,
  `order_id` VARCHAR(36) NOT NULL,
  `product_id` VARCHAR(36) NULL,
  `variant_id` VARCHAR(36) NULL,
  `product_name` VARCHAR(255) NULL,
  `product_sku` VARCHAR(100) NULL,
  `sku` VARCHAR(100) NULL,
  `unit` VARCHAR(50) NULL,
  `quantity` INT NOT NULL DEFAULT 1,
  `unit_price` DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
  `subtotal` DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
  `image_url` TEXT NULL,
  `selected_color` VARCHAR(100) NULL,
  `selected_finish` VARCHAR(100) NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_items_order` (`order_id`),
  KEY `idx_items_product` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 11. QUOTES TABLE
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `quotes` (
  `id` VARCHAR(36) NOT NULL,
  `quote_number` VARCHAR(50) NOT NULL UNIQUE,
  `customer_name` VARCHAR(255) NULL,
  `customer_email` VARCHAR(255) NULL,
  `customer_phone` VARCHAR(50) NULL,
  `project_type` VARCHAR(100) NULL,
  `project_location` VARCHAR(100) NULL,
  `city` VARCHAR(100) NULL,
  `scope_of_work` TEXT NULL,
  `notes` TEXT NULL,
  `estimated_budget` VARCHAR(100) NULL,
  `budget_range` VARCHAR(100) NULL,
  `estimated_timeline` VARCHAR(100) NULL,
  `timeline` VARCHAR(100) NULL,
  `status` VARCHAR(50) NOT NULL DEFAULT 'Submitted',
  `admin_notes` TEXT NULL,
  `quoted_amount` DECIMAL(14, 2) NULL,
  `total_quoted_amount` DECIMAL(14, 2) NULL,
  `items` JSON NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_quotes_num` (`quote_number`),
  KEY `idx_quotes_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 12. QUOTE ITEMS TABLE
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `quote_items` (
  `id` VARCHAR(36) NOT NULL,
  `quote_id` VARCHAR(36) NOT NULL,
  `product_id` VARCHAR(36) NULL,
  `product_name` VARCHAR(255) NULL,
  `dimensions` VARCHAR(255) NULL,
  `quantity` INT NOT NULL DEFAULT 1,
  `unit` VARCHAR(50) NOT NULL DEFAULT 'sq ft',
  `notes` TEXT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_quote_items_quote` (`quote_id`),
  KEY `idx_quote_items_product` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 13. ENQUIRIES TABLE
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `enquiries` (
  `id` VARCHAR(36) NOT NULL,
  `name` VARCHAR(255) NULL,
  `email` VARCHAR(255) NULL,
  `phone` VARCHAR(50) NULL,
  `subject` VARCHAR(255) NULL,
  `message` TEXT NULL,
  `status` VARCHAR(50) NOT NULL DEFAULT 'New',
  `source` VARCHAR(100) NOT NULL DEFAULT 'Website Contact Form',
  `admin_notes` TEXT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_enquiries_status` (`status`),
  KEY `idx_enquiries_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 13. SITE SETTINGS TABLE
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `site_settings` (
  `id` VARCHAR(36) NOT NULL,
  `key` VARCHAR(100) NULL,
  `value` JSON NULL,
  `raw_json` JSON NULL,
  `brand_name` VARCHAR(255) NULL,
  `tagline` TEXT NULL,
  `contact_email` VARCHAR(255) NULL,
  `contact_phone` VARCHAR(100) NULL,
  `whatsapp_number` VARCHAR(100) NULL,
  `studio_address` TEXT NULL,
  `gstin_number` VARCHAR(50) NULL,
  `currency` VARCHAR(10) DEFAULT 'INR',
  `currency_symbol` VARCHAR(10) DEFAULT '₹',
  `tax_rate_percent` DECIMAL(5,2) DEFAULT 18.00,
  `standard_shipping_fee` DECIMAL(10,2) DEFAULT 1500.00,
  `free_shipping_threshold` DECIMAL(10,2) DEFAULT 50000.00,
  `homepage` JSON NULL,
  `payment_gateway` JSON NULL,
  `portfolio_animation` JSON NULL,
  `whatsapp` JSON NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_settings_key` (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 14. AUDIT LOGS TABLE
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `audit_logs` (
  `id` VARCHAR(36) NOT NULL,
  `admin_id` VARCHAR(36) NULL,
  `admin_email` VARCHAR(255) NULL,
  `action` VARCHAR(100) NULL,
  `entity` VARCHAR(100) NULL,
  `entity_id` VARCHAR(255) NULL,
  `details` JSON NULL,
  `ip_address` VARCHAR(100) NULL,
  `user_agent` TEXT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_audit_admin` (`admin_id`),
  KEY `idx_audit_action` (`action`),
  KEY `idx_audit_entity` (`entity`),
  KEY `idx_audit_created` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 15. PUSH SUBSCRIPTIONS TABLE
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `push_subscriptions` (
  `id` VARCHAR(36) NOT NULL,
  `endpoint` TEXT NULL,
  `p256dh` TEXT NULL,
  `auth` TEXT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- DATA: ADMINS
-- ============================================================
INSERT INTO `admins` (`id`, `email`, `password_hash`, `name`, `role`, `status`, `must_change_password`, `last_login_at`, `created_at`, `updated_at`)
VALUES ('2bd20632-00dd-4f48-84b4-6e526543c8d8', 'vicks@balaji.com', '3903a96046ec99bc94100f812cfee1b2:e72fa457ba6ab3be8353defbdf61b4c243714f27acb2cbc20fd2232dc36e184bd6564345d66103f433154a166821c36b5e0a0b162aeddf378182678a830c7f5b', 'Vikas Sir (Principal Architect)', 'owner', 'active', 0, '2026-09-09 13:00:15', '2026-08-17 16:37:19', '2026-09-09 13:00:15')
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `password_hash` = VALUES(`password_hash`), `role` = VALUES(`role`);

-- ============================================================
-- DATA: CATEGORIES (10 from Supabase)
-- ============================================================
INSERT INTO `categories` (`id`, `name`, `slug`, `description`, `image_url`, `parent_id`, `sort_order`, `is_active`, `created_at`, `updated_at`)
VALUES ('04cfbece-9471-428c-9356-a4d569377592', 'Natural Stone & Marble', 'natural-stone-marble', 'Quarried Italian marbles, honed travertines, and architectural granites with bespoke cut-to-size options.', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80', NULL, 1, 1, '2026-08-17 16:37:19', '2026-08-17 16:37:19')
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `description` = VALUES(`description`), `image_url` = VALUES(`image_url`);
INSERT INTO `categories` (`id`, `name`, `slug`, `description`, `image_url`, `parent_id`, `sort_order`, `is_active`, `created_at`, `updated_at`)
VALUES ('46510b90-870a-4020-92f3-a193733a709e', 'Hardwood & Architectural Veneers', 'hardwood-veneers', 'Sustainably harvested smoked oaks, European walnuts, and natural fluted timber panels.', 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80', NULL, 2, 1, '2026-08-17 16:37:20', '2026-08-17 16:37:20')
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `description` = VALUES(`description`), `image_url` = VALUES(`image_url`);
INSERT INTO `categories` (`id`, `name`, `slug`, `description`, `image_url`, `parent_id`, `sort_order`, `is_active`, `created_at`, `updated_at`)
VALUES ('37b61c08-82d3-4d08-91ec-230e56249ac6', 'Wall Panels & Acoustic Surfaces', 'wall-panels-acoustic', 'Linear slatted wall systems, architectural micro-cement claddings, and acoustic linen textures.', 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80', NULL, 3, 1, '2026-08-17 16:37:20', '2026-08-17 16:37:20')
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `description` = VALUES(`description`), `image_url` = VALUES(`image_url`);
INSERT INTO `categories` (`id`, `name`, `slug`, `description`, `image_url`, `parent_id`, `sort_order`, `is_active`, `created_at`, `updated_at`)
VALUES ('b7a6b9ef-6353-4eb5-ad84-6e7672f37863', 'Large Format Porcelain Slabs', 'porcelain-slabs', 'Monolithic sintered stone slabs for luxury countertops, bookmatched feature walls, and seamless floors.', 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80', NULL, 4, 1, '2026-08-17 16:37:20', '2026-08-17 16:37:20')
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `description` = VALUES(`description`), `image_url` = VALUES(`image_url`);
INSERT INTO `categories` (`id`, `name`, `slug`, `description`, `image_url`, `parent_id`, `sort_order`, `is_active`, `created_at`, `updated_at`)
VALUES ('f80122a1-b4b6-42c3-b4e0-a34ebfb07011', 'Architectural Lighting', 'architectural-lighting', 'Sculptural unlacquered brass pendants, minimal linear sconces, and recessed gallery luminescence.', 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=80', NULL, 5, 1, '2026-08-17 16:37:20', '2026-08-17 16:37:20')
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `description` = VALUES(`description`), `image_url` = VALUES(`image_url`);
INSERT INTO `categories` (`id`, `name`, `slug`, `description`, `image_url`, `parent_id`, `sort_order`, `is_active`, `created_at`, `updated_at`)
VALUES ('9f1fb2e1-7531-4601-b56a-86786966a3f8', 'Bespoke Hardware & Pulls', 'bespoke-hardware', 'Solid forged bronze handles, knurled cabinet pulls, and precision-engineered architectural pivots.', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80', NULL, 6, 1, '2026-08-17 16:37:21', '2026-08-17 16:37:21')
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `description` = VALUES(`description`), `image_url` = VALUES(`image_url`);
INSERT INTO `categories` (`id`, `name`, `slug`, `description`, `image_url`, `parent_id`, `sort_order`, `is_active`, `created_at`, `updated_at`)
VALUES ('d0fd0a38-5645-4aee-b2c2-dd754229f423', 'Atelier Furniture & Objects', 'atelier-furniture', 'Limited edition travertine monoliths, solid oak dining tables, and tailored bouclé seating.', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80', NULL, 7, 1, '2026-08-17 16:37:21', '2026-08-17 16:37:21')
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `description` = VALUES(`description`), `image_url` = VALUES(`image_url`);
INSERT INTO `categories` (`id`, `name`, `slug`, `description`, `image_url`, `parent_id`, `sort_order`, `is_active`, `created_at`, `updated_at`)
VALUES ('efe96fd8-77b7-467d-876c-9e76adb518a0', 'Acoustic Architectural Fabrics', 'test-category-1787490647092', 'Sound-dampening bespoke woven textiles for high-end cinema and auditorium interiors.', '/categories/test-acoustic.jpg', NULL, 10, 0, '2026-08-23 13:10:40', '2026-08-23 13:10:47')
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `description` = VALUES(`description`), `image_url` = VALUES(`image_url`);
INSERT INTO `categories` (`id`, `name`, `slug`, `description`, `image_url`, `parent_id`, `sort_order`, `is_active`, `created_at`, `updated_at`)
VALUES ('07ff723f-80e2-4278-b0fa-0e6b087447d4', 'Acoustic Architectural Fabrics', 'test-category-1787490685756', 'Sound-dampening bespoke woven textiles for high-end cinema and auditorium interiors.', '/categories/test-acoustic.jpg', NULL, 10, 0, '2026-08-23 13:11:18', '2026-08-23 13:11:26')
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `description` = VALUES(`description`), `image_url` = VALUES(`image_url`);
INSERT INTO `categories` (`id`, `name`, `slug`, `description`, `image_url`, `parent_id`, `sort_order`, `is_active`, `created_at`, `updated_at`)
VALUES ('eac0edeb-5843-46ce-9574-712ff7c79d48', 'Acoustic Architectural Fabrics', 'test-category-1787490711903', 'Sound-dampening bespoke woven textiles for high-end cinema and auditorium interiors.', '/categories/test-acoustic.jpg', NULL, 10, 0, '2026-08-23 13:11:45', '2026-08-23 13:11:52')
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `description` = VALUES(`description`), `image_url` = VALUES(`image_url`);

-- ============================================================
-- DATA: PRODUCTS & INVENTORY (8 luxury products)
-- ============================================================
INSERT INTO `products` (`id`, `name`, `slug`, `sku`, `brand`, `category_id`, `subcategory`, `description`, `price`, `sale_price`, `unit`, `moq`, `stock`, `purchase_mode`, `lead_time`, `dimensions`, `thickness`, `material`, `finish`, `color`, `images`, `variants`, `is_featured`, `is_new`, `is_bestseller`, `published`, `tags`, `specifications`, `created_at`, `updated_at`)
VALUES ('prod-travertine-slab', 'Romano Classico Vein-Cut Travertine', 'romano-classico-travertine', 'MAT-STN-001', 'Balaji Architect & Interiors', 'cat-stone', 'Honed Travertine', 'Authentic Italian vein-cut travertine quarried in Tivoli. Honed to a velvety matte tactile finish with natural open pores lightly filled for lasting resilience in high-end living spaces and bath suites.', 850, 780, 'sq ft', 100, 2377, 'BOTH', '5-7 business days', '2400mm x 1200mm slab / custom tile sizes', '20mm', 'Natural Travertine', 'Honed Matte', 'Warm Ivory / Biscuit', '[\"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80\",\"https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80\",\"https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80\"]', '[{\"id\":\"var-trav-20mm\",\"productId\":\"prod-travertine-slab\",\"sku\":\"MAT-STN-001-20\",\"name\":\"20mm Slab - Honed\",\"finish\":\"Honed\",\"thickness\":\"20mm\",\"priceModifier\":0,\"stock\":1800},{\"id\":\"var-trav-30mm\",\"productId\":\"prod-travertine-slab\",\"sku\":\"MAT-STN-001-30\",\"name\":\"30mm Slab - Polished Matte\",\"finish\":\"Polished Matte\",\"thickness\":\"30mm\",\"priceModifier\":190,\"stock\":600}]', 1, 0, 1, 1, '[\"Stone\",\"Travertine\",\"Flooring\",\"Wall Cladding\",\"Luxury Bath\"]', '{\"Origin\":\"Tivoli, Italy\",\"Compressive Strength\":\"112 MPa\",\"Water Absorption\":\"< 0.8\%\",\"Application\":\"Indoor flooring, feature walls, bathroom surrounds\",\"Edge Detail\":\"Straight rectified / custom bullnose on request\"}', '2026-08-17 17:05:35', '2026-08-17 17:06:09')
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `price` = VALUES(`price`), `stock` = VALUES(`stock`);
INSERT INTO `inventory` (`id`, `product_id`, `variant_id`, `stock_on_hand`, `stock_reserved`, `stock_available`, `low_stock_threshold`)
VALUES ('inv-prod-travertine-slab', 'prod-travertine-slab', NULL, 2377, 0, 2377, 5)
ON DUPLICATE KEY UPDATE `stock_on_hand` = VALUES(`stock_on_hand`), `stock_available` = VALUES(`stock_available`);
INSERT INTO `product_variants` (`id`, `product_id`, `sku`, `name`, `finish`, `thickness`, `color`, `dimensions`, `price_modifier`, `stock`)
VALUES ('var-trav-20mm', 'prod-travertine-slab', 'MAT-STN-001-20', '20mm Slab - Honed', 'Honed', '20mm', NULL, NULL, 0, 1800)
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `price_modifier` = VALUES(`price_modifier`), `stock` = VALUES(`stock`);
INSERT INTO `product_variants` (`id`, `product_id`, `sku`, `name`, `finish`, `thickness`, `color`, `dimensions`, `price_modifier`, `stock`)
VALUES ('var-trav-30mm', 'prod-travertine-slab', 'MAT-STN-001-30', '30mm Slab - Polished Matte', 'Polished Matte', '30mm', NULL, NULL, 190, 600)
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `price_modifier` = VALUES(`price_modifier`), `stock` = VALUES(`stock`);
INSERT INTO `products` (`id`, `name`, `slug`, `sku`, `brand`, `category_id`, `subcategory`, `description`, `price`, `sale_price`, `unit`, `moq`, `stock`, `purchase_mode`, `lead_time`, `dimensions`, `thickness`, `material`, `finish`, `color`, `images`, `variants`, `is_featured`, `is_new`, `is_bestseller`, `published`, `tags`, `specifications`, `created_at`, `updated_at`)
VALUES ('prod-smoked-oak-flooring', 'Smoked European White Oak Wide Plank', 'smoked-european-oak-flooring', 'MAT-WOD-002', 'Balaji Architect & Interiors', 'cat-wood', 'Engineered Hardwood', 'Slow-smoked French white oak planks with a triple-brushed wire texture and invisible natural UV polyurethane oil finish. Engineered with a multi-layer birch ply core for dimensional stability in humid climates.', 620, NULL, 'sq ft', 150, 3500, 'BUY_NOW', '3-5 business days', '2200mm L x 220mm W', '15mm (4mm top wear layer)', 'European White Oak & Baltic Birch', 'Natural Ultra-Matte Oil', 'Muted Earth Brown', '[\"https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80\",\"https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=1200&q=80\"]', '[{\"id\":\"var-oak-smoked\",\"productId\":\"prod-smoked-oak-flooring\",\"sku\":\"MAT-WOD-002-SMK\",\"name\":\"Smoked Natural\",\"color\":\"Warm Umber\",\"finish\":\"Wire Brushed\",\"priceModifier\":0,\"stock\":2200},{\"id\":\"var-oak-raw\",\"productId\":\"prod-smoked-oak-flooring\",\"sku\":\"MAT-WOD-002-RAW\",\"name\":\"Raw Nordic Sand\",\"color\":\"Light Biscuit\",\"finish\":\"Smooth Matte\",\"priceModifier\":40,\"stock\":1300}]', 1, 1, 1, 1, '[\"Wood\",\"Flooring\",\"Oak\",\"Wide Plank\",\"Living Room\"]', '{\"Grade\":\"Select Architectural ABC\",\"Core\":\"11-ply Cross-Grain Baltic Birch\",\"Bevel\":\"Micro-bevel on 4 sides\",\"Installation\":\"Tongue & Groove / Glue-down or Floating\",\"Underfloor Heating Compatible\":\"Yes, up to 27°C\"}', '2026-08-17 17:05:35', '2026-08-17 17:05:35')
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `price` = VALUES(`price`), `stock` = VALUES(`stock`);
INSERT INTO `inventory` (`id`, `product_id`, `variant_id`, `stock_on_hand`, `stock_reserved`, `stock_available`, `low_stock_threshold`)
VALUES ('inv-prod-smoked-oak-flooring', 'prod-smoked-oak-flooring', NULL, 3500, 0, 3500, 5)
ON DUPLICATE KEY UPDATE `stock_on_hand` = VALUES(`stock_on_hand`), `stock_available` = VALUES(`stock_available`);
INSERT INTO `product_variants` (`id`, `product_id`, `sku`, `name`, `finish`, `thickness`, `color`, `dimensions`, `price_modifier`, `stock`)
VALUES ('var-oak-smoked', 'prod-smoked-oak-flooring', 'MAT-WOD-002-SMK', 'Smoked Natural', 'Wire Brushed', NULL, 'Warm Umber', NULL, 0, 2200)
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `price_modifier` = VALUES(`price_modifier`), `stock` = VALUES(`stock`);
INSERT INTO `product_variants` (`id`, `product_id`, `sku`, `name`, `finish`, `thickness`, `color`, `dimensions`, `price_modifier`, `stock`)
VALUES ('var-oak-raw', 'prod-smoked-oak-flooring', 'MAT-WOD-002-RAW', 'Raw Nordic Sand', 'Smooth Matte', NULL, 'Light Biscuit', NULL, 40, 1300)
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `price_modifier` = VALUES(`price_modifier`), `stock` = VALUES(`stock`);
INSERT INTO `products` (`id`, `name`, `slug`, `sku`, `brand`, `category_id`, `subcategory`, `description`, `price`, `sale_price`, `unit`, `moq`, `stock`, `purchase_mode`, `lead_time`, `dimensions`, `thickness`, `material`, `finish`, `color`, `images`, `variants`, `is_featured`, `is_new`, `is_bestseller`, `published`, `tags`, `specifications`, `created_at`, `updated_at`)
VALUES ('prod-fluted-acoustic-panel', 'Acoustic Fluted Walnut Wall Panel', 'acoustic-fluted-walnut-panel', 'MAT-PNL-003', 'Balaji Architect & Interiors', 'cat-panels', 'Acoustic Cladding', 'Precision-milled American walnut slats affixed to a recycled high-density acoustic PET felt backing. Elevates room acoustics while introducing warm architectural rhythm to master bedrooms and private cinema suites.', 14500, 13200, 'sheet', 2, 85, 'BUY_NOW', '3-4 business days', '2400mm H x 600mm W x 22mm D', '22mm', 'Natural American Walnut & Recycled Felt', 'Silky Natural Wax Oil', 'Deep Espresso Walnut', '[\"https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80\",\"https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80\"]', '[]', 1, 1, 0, 1, '[\"Acoustic\",\"Wall Panels\",\"Walnut\",\"Fluted\",\"Bedrooms\"]', '{\"NRC Rating\":\"0.85 Sound Absorption\",\"Fire Rating\":\"Class B-s1, d0 (Flame Retardant)\",\"Mounting\":\"Concealed screw or polyurethane construction adhesive\",\"Slat Spacing\":\"13mm width with 14mm felt reveals\"}', '2026-08-17 17:05:35', '2026-08-17 17:05:35')
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `price` = VALUES(`price`), `stock` = VALUES(`stock`);
INSERT INTO `inventory` (`id`, `product_id`, `variant_id`, `stock_on_hand`, `stock_reserved`, `stock_available`, `low_stock_threshold`)
VALUES ('inv-prod-fluted-acoustic-panel', 'prod-fluted-acoustic-panel', NULL, 85, 0, 85, 5)
ON DUPLICATE KEY UPDATE `stock_on_hand` = VALUES(`stock_on_hand`), `stock_available` = VALUES(`stock_available`);
INSERT INTO `products` (`id`, `name`, `slug`, `sku`, `brand`, `category_id`, `subcategory`, `description`, `price`, `sale_price`, `unit`, `moq`, `stock`, `purchase_mode`, `lead_time`, `dimensions`, `thickness`, `material`, `finish`, `color`, `images`, `variants`, `is_featured`, `is_new`, `is_bestseller`, `published`, `tags`, `specifications`, `created_at`, `updated_at`)
VALUES ('prod-calacatta-porcelain', 'Calacatta Vagli Sintered Porcelain Slab', 'calacatta-vagli-porcelain-slab', 'MAT-POR-004', 'Balaji Architect & Interiors', 'cat-porcelain', 'Continuous Bookmatched Slabs', 'Continuous vein-matched sintered ceramic slab with deep golden and slate veins on an ultra-clean warm white background. 100\% stain, heat, and scratch proof for demanding culinary islands and master vanities.', 1100, NULL, 'sq ft', 50, 1200, 'BOTH', '7-10 business days', '3200mm x 1600mm', '12mm / 20mm', 'Sintered Ceramic Porcelain', 'Silk Touch Satin', 'Pure White with Gold & Charcoal Veining', '[\"https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80\",\"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80\"]', '[]', 0, 0, 1, 1, '[\"Kitchen Countertop\",\"Porcelain Slab\",\"Bookmatched\",\"Island Counter\"]', '{\"Porosity\":\"0.01\% (Zero Porosity)\",\"Thermal Shock\":\"Resistant to direct pans up to 400°C\",\"UV Stability\":\"Fade proof for indoor and outdoor loggias\"}', '2026-08-17 17:05:35', '2026-08-17 17:05:35')
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `price` = VALUES(`price`), `stock` = VALUES(`stock`);
INSERT INTO `inventory` (`id`, `product_id`, `variant_id`, `stock_on_hand`, `stock_reserved`, `stock_available`, `low_stock_threshold`)
VALUES ('inv-prod-calacatta-porcelain', 'prod-calacatta-porcelain', NULL, 1200, 0, 1200, 5)
ON DUPLICATE KEY UPDATE `stock_on_hand` = VALUES(`stock_on_hand`), `stock_available` = VALUES(`stock_available`);
INSERT INTO `products` (`id`, `name`, `slug`, `sku`, `brand`, `category_id`, `subcategory`, `description`, `price`, `sale_price`, `unit`, `moq`, `stock`, `purchase_mode`, `lead_time`, `dimensions`, `thickness`, `material`, `finish`, `color`, `images`, `variants`, `is_featured`, `is_new`, `is_bestseller`, `published`, `tags`, `specifications`, `created_at`, `updated_at`)
VALUES ('prod-monolith-coffee-table', 'Brutalist Travertine Monolith Coffee Table', 'brutalist-travertine-coffee-table', 'FUR-TBL-005', 'Balaji Architect & Interiors', 'cat-furniture', 'Sculptural Tables', 'Sculpted from a single block of Tuscan Romano travertine. Defined by raw chiseled edges contrasting with a silky hand-honed flat surface. Each table is an individual architectural sculpture numbered by the studio.', 185000, NULL, 'piece', 1, 4, 'BUY_NOW', 'Made to order (2-3 weeks)', '1400mm L x 800mm W x 360mm H', '120mm solid block perimeter', 'Solid Honed Travertine Stone', 'Natural Matte Wax Sealed', 'Ivory Travertine', '[\"https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80\",\"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80\"]', '[]', 1, 1, 0, 1, '[\"Furniture\",\"Coffee Table\",\"Travertine\",\"Sculptural\",\"Living Room\"]', '{\"Weight\":\"115 kg\",\"Craftsmanship\":\"Hand-chiseled perimeter with CNC planar accuracy\",\"Care\":\"Wipe with damp cloth and pH neutral stone cleanser\"}', '2026-08-17 17:05:35', '2026-08-17 17:05:35')
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `price` = VALUES(`price`), `stock` = VALUES(`stock`);
INSERT INTO `inventory` (`id`, `product_id`, `variant_id`, `stock_on_hand`, `stock_reserved`, `stock_available`, `low_stock_threshold`)
VALUES ('inv-prod-monolith-coffee-table', 'prod-monolith-coffee-table', NULL, 4, 0, 4, 5)
ON DUPLICATE KEY UPDATE `stock_on_hand` = VALUES(`stock_on_hand`), `stock_available` = VALUES(`stock_available`);
INSERT INTO `products` (`id`, `name`, `slug`, `sku`, `brand`, `category_id`, `subcategory`, `description`, `price`, `sale_price`, `unit`, `moq`, `stock`, `purchase_mode`, `lead_time`, `dimensions`, `thickness`, `material`, `finish`, `color`, `images`, `variants`, `is_featured`, `is_new`, `is_bestseller`, `published`, `tags`, `specifications`, `created_at`, `updated_at`)
VALUES ('prod-linear-bronze-pendant', 'Kanso Linear Brushed Bronze Chandelier', 'kanso-linear-bronze-chandelier', 'LGT-PEN-006', 'Balaji Architect & Interiors', 'cat-lighting', 'Suspension Lighting', 'A monolithic 1.8-meter solid extruded bronze fixture housing warm 2700K museum-grade CRI 97+ LED arrays diffused through frosted Japanese alabaster glass. Dimmable via DALI and TRIAC protocols.', 88000, NULL, 'set', 1, 12, 'BUY_NOW', '5-7 business days', '1800mm L x 60mm W x 80mm H (Suspension up to 2500mm)', NULL, 'Solid Extruded Bronze & Cast Alabaster', 'Hand-Rubbed Aged Bronze', 'Antique Bronze', '[\"https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=80\",\"https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80\"]', '[]', 1, 0, 1, 1, '[\"Lighting\",\"Bronze\",\"Dining Table Chandelier\",\"Minimalist\"]', '{\"Luminous Flux\":\"4,200 Lumens\",\"Color Temperature\":\"2700K Warm Architectural Glow\",\"Color Rendering Index\":\"CRI 98\",\"Voltage\":\"220-240V AC 50/60Hz\"}', '2026-08-17 17:05:35', '2026-08-17 17:05:35')
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `price` = VALUES(`price`), `stock` = VALUES(`stock`);
INSERT INTO `inventory` (`id`, `product_id`, `variant_id`, `stock_on_hand`, `stock_reserved`, `stock_available`, `low_stock_threshold`)
VALUES ('inv-prod-linear-bronze-pendant', 'prod-linear-bronze-pendant', NULL, 12, 0, 12, 5)
ON DUPLICATE KEY UPDATE `stock_on_hand` = VALUES(`stock_on_hand`), `stock_available` = VALUES(`stock_available`);
INSERT INTO `products` (`id`, `name`, `slug`, `sku`, `brand`, `category_id`, `subcategory`, `description`, `price`, `sale_price`, `unit`, `moq`, `stock`, `purchase_mode`, `lead_time`, `dimensions`, `thickness`, `material`, `finish`, `color`, `images`, `variants`, `is_featured`, `is_new`, `is_bestseller`, `published`, `tags`, `specifications`, `created_at`, `updated_at`)
VALUES ('prod-knurled-bronze-hardware', 'Bespoke Knurled Bronze Door Lever & Escutcheon Set', 'bespoke-knurled-bronze-door-lever', 'HRD-LVR-007', 'Balaji Architect & Interiors', 'cat-hardware', 'Architectural Door Hardware', 'Machined from solid naval brass billets and finished with a dark antique bronze patina that deepens with use. Features a precision cross-hatch diamond knurled barrel for a reassuring tactile grip on heavy entrance doors.', 9500, 8600, 'set', 2, 65, 'BUY_NOW', '2-3 business days', '150mm Lever x 52mm Rose', NULL, 'Solid Forged Naval Brass', 'Unlacquered Living Bronze Patina', 'Dark Antique Bronze', '[\"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80\"]', '[]', 0, 1, 1, 1, '[\"Door Hardware\",\"Bronze Handles\",\"Knurled Brass\",\"Luxury Entrance\"]', '{\"Mechanism\":\"Heavy duty sprung return rose with ball-bearing hub\",\"Spindle\":\"8mm solid steel standard\",\"Door Thickness Fit\":\"38mm to 55mm solid timber doors\"}', '2026-08-17 17:05:35', '2026-08-17 17:05:35')
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `price` = VALUES(`price`), `stock` = VALUES(`stock`);
INSERT INTO `inventory` (`id`, `product_id`, `variant_id`, `stock_on_hand`, `stock_reserved`, `stock_available`, `low_stock_threshold`)
VALUES ('inv-prod-knurled-bronze-hardware', 'prod-knurled-bronze-hardware', NULL, 65, 0, 65, 5)
ON DUPLICATE KEY UPDATE `stock_on_hand` = VALUES(`stock_on_hand`), `stock_available` = VALUES(`stock_available`);
INSERT INTO `products` (`id`, `name`, `slug`, `sku`, `brand`, `category_id`, `subcategory`, `description`, `price`, `sale_price`, `unit`, `moq`, `stock`, `purchase_mode`, `lead_time`, `dimensions`, `thickness`, `material`, `finish`, `color`, `images`, `variants`, `is_featured`, `is_new`, `is_bestseller`, `published`, `tags`, `specifications`, `created_at`, `updated_at`)
VALUES ('prod-custom-millwork-veneer', 'Smoked Santos Rosewood Architectural Veneer', 'smoked-santos-rosewood-veneer', 'MAT-VNR-008', 'Balaji Architect & Interiors', 'cat-wood', 'Natural Wood Veneer', 'Sequenced architectural flitch veneer with rich espresso cathedrals and bronze undertones. Backed with non-woven fleece for seamless pressing onto curved cabinetry and bespoke wardrobes.', 320, NULL, 'sq ft', 200, 4200, 'REQUEST_QUOTE', '7-10 business days', '3050mm L x 1250mm W', '0.6mm', 'Natural Santos Rosewood', 'Raw Unfinished (Ready for matte polyurethane or hardwax)', 'Rich Espresso & Bronze Striations', '[\"https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=1200&q=80\"]', '[]', 0, 0, 0, 1, '[\"Veneer\",\"Rosewood\",\"Wardrobes\",\"Wall Paneling\",\"Joinery\"]', '{\"Cut\":\"Crown Cut & Quarter Cut Bookmatched\",\"Moisture Content\":\"8-12\%\",\"Sustainably Certified\":\"FSC 100\% Controlled Harvest\"}', '2026-08-17 17:05:35', '2026-08-17 17:05:35')
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `price` = VALUES(`price`), `stock` = VALUES(`stock`);
INSERT INTO `inventory` (`id`, `product_id`, `variant_id`, `stock_on_hand`, `stock_reserved`, `stock_available`, `low_stock_threshold`)
VALUES ('inv-prod-custom-millwork-veneer', 'prod-custom-millwork-veneer', NULL, 4200, 0, 4200, 5)
ON DUPLICATE KEY UPDATE `stock_on_hand` = VALUES(`stock_on_hand`), `stock_available` = VALUES(`stock_available`);

-- ============================================================
-- DATA: PROJECTS (6 from Supabase)
-- ============================================================
INSERT INTO `projects` (`id`, `title`, `slug`, `location`, `year`, `project_type`, `area`, `short_description`, `description`, `hero_image`, `gallery`, `design_approach`, `materials_used`, `before_after`, `is_published`, `is_featured`, `sort_order`, `tags`, `created_at`, `updated_at`)
VALUES ('882461f2-68e5-4a86-a085-29dd56e4701e', 'Maison Brutaliste', 'maison-brutaliste-delhi', 'Chhatarpur Farms, New Delhi', '2025', 'Residential Interiors', '11,000 sq ft', 'A bold sculptural private residence contrasting raw architectural board-formed concrete with refined brushed bronze and lush interior courtyard gardens.', 'Conceived as an inward-looking sanctuary shielded from urban noise, Maison Brutaliste features soaring 6-meter ceilings and rhythmic colonnades that capture changing light across the seasons.', 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85', '[\"https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=80\",\"https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1400&q=80\"]', 'The project demonstrates our philosophy of material honesty—every concrete pour, timber grain, and bronze joint is left exposed to celebrate true construction craftsmanship.', '[{\"category\":\"Stone\",\"materialId\":\"prod-travertine-slab\",\"materialName\":\"Romano Classico Vein-Cut Travertine\"},{\"category\":\"Hardware\",\"materialId\":\"prod-knurled-bronze-hardware\",\"materialName\":\"Bespoke Knurled Bronze Door Lever\"}]', '{}', 1, 1, 3, '[\"Brutalist\",\"Private Residence\",\"Delhi\",\"Concrete & Bronze\"]', '2026-08-17 16:37:23', '2026-08-17 16:37:23')
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `hero_image` = VALUES(`hero_image`), `description` = VALUES(`description`);
INSERT INTO `projects` (`id`, `title`, `slug`, `location`, `year`, `project_type`, `area`, `short_description`, `description`, `hero_image`, `gallery`, `design_approach`, `materials_used`, `before_after`, `is_published`, `is_featured`, `sort_order`, `tags`, `created_at`, `updated_at`)
VALUES ('9f7163a3-3a0c-45dc-b11d-b2bb7d99fc58', 'Kyoto Tea & Dine Atelier', 'kyoto-tea-dine-atelier', 'Pali Hill, Bandra West, Mumbai', '2024', 'Hospitality & Luxury Dining', '3,900 sq ft', 'An intimate omakase and artisanal tea lounge celebrated for its charred Shou Sugi Ban cedar walls and monolithic travertine bar.', 'Designed as a multisensory journey, guests transition through a tranquil rock garden into an ambient dining room anchored by an 8-meter solid stone counter illuminated by custom linear bronze fixtures.', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=85', '[\"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80\"]', 'Minimalist Japanese wabi-sabi principles interpreted through contemporary Indian stone craftsmanship.', '[{\"category\":\"Lighting\",\"materialId\":\"prod-linear-bronze-pendant\",\"materialName\":\"Kanso Linear Brushed Bronze Chandelier\"}]', '{}', 1, 0, 6, '[\"Hospitality\",\"Restaurant\",\"Bandra\",\"Dining\"]', '2026-08-17 16:37:24', '2026-08-17 16:37:24')
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `hero_image` = VALUES(`hero_image`), `description` = VALUES(`description`);
INSERT INTO `projects` (`id`, `title`, `slug`, `location`, `year`, `project_type`, `area`, `short_description`, `description`, `hero_image`, `gallery`, `design_approach`, `materials_used`, `before_after`, `is_published`, `is_featured`, `sort_order`, `tags`, `created_at`, `updated_at`)
VALUES ('8f03090b-adc6-4e61-b781-0f88b2562273', 'The Monolith Design Headquarters', 'the-monolith-design-headquarters', 'Indiranagar, Bengaluru', '2024', 'Commercial & Studio', '4,200 sq ft', 'A serene creative studio for an international fashion house featuring modular walnut workstations and monolithic stone meeting pods.', 'Balaji Architect & Interiors was commissioned to rethink modern creative workspace architecture. We crafted quiet acoustic alcoves and an open library of tactile material specimens to inspire daily design exploration.', 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85', '[\"https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80\"]', 'Focus on high acoustic performance and calm ambient illumination to support deep creative focus.', '[{\"category\":\"Acoustics\",\"materialId\":\"prod-fluted-acoustic-panel\",\"materialName\":\"Acoustic Fluted Walnut Wall Panel\"}]', '{}', 1, 0, 4, '[\"Studio\",\"Workplace\",\"Bengaluru\",\"Commercial\"]', '2026-08-17 16:37:23', '2026-08-17 16:37:23')
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `hero_image` = VALUES(`hero_image`), `description` = VALUES(`description`);
INSERT INTO `projects` (`id`, `title`, `slug`, `location`, `year`, `project_type`, `area`, `short_description`, `description`, `hero_image`, `gallery`, `design_approach`, `materials_used`, `before_after`, `is_published`, `is_featured`, `sort_order`, `tags`, `created_at`, `updated_at`)
VALUES ('4c0c47f3-fa15-4032-842a-f86c09ac8c3e', 'Aura Residence', 'aura-residence-hyderabad', 'Jubilee Hills, Hyderabad', '2025', 'Residential Interiors', '6,800 sq ft', 'An understated private residence balancing traditional Deccan courtyard typologies with razor-sharp modern detailing.', 'Every room in Aura Residence is composed around intimate landscaped lightwells. Custom unlacquered bronze partitions and vein-matched marble floors foster a feeling of continuous calm.', 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85', '[\"https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=80\"]', 'Integration of passive ventilation, natural daylight, and enduring local granite masonry.', '[]', '{}', 1, 1, 5, '[\"Courtyard House\",\"Hyderabad\",\"Luxury Interior\"]', '2026-08-17 16:37:24', '2026-08-17 16:37:24')
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `hero_image` = VALUES(`hero_image`), `description` = VALUES(`description`);
INSERT INTO `projects` (`id`, `title`, `slug`, `location`, `year`, `project_type`, `area`, `short_description`, `description`, `hero_image`, `gallery`, `design_approach`, `materials_used`, `before_after`, `is_published`, `is_featured`, `sort_order`, `tags`, `created_at`, `updated_at`)
VALUES ('fb5f3322-5cf0-47fb-8f55-7c5b0e8fb71e', 'The Sanctuary at Alibaug', 'the-sanctuary-at-alibaug', 'Awas Coast, Alibaug', '2025', 'Architecture & Villa', '8,200 sq ft', 'A monolithic coastal retreat grounded in honed Tivoli travertine, smoked French oak, and frameless pocketing glass walls connecting lush banyan groves.', 'Designed as a timeless multi-generational weekend villa, The Sanctuary is configured around a central reflecting pool framed by board-formed concrete and warm Italian travertine. Every interior element was custom designed and fabricated by Balaji Architect & Interiors, ensuring unbroken harmony between raw architectural mass and delicate tactile finishes.', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85', '[\"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80\",\"https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1400&q=80\",\"https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80\",\"https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=80\"]', 'Our approach balanced heavy thermal mass walls with delicate bronze joinery and natural woven linens, allowing sea breezes to filter through while maintaining deep shade and thermal comfort.', '[{\"category\":\"Natural Stone\",\"imageUrl\":\"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80\",\"materialId\":\"prod-travertine-slab\",\"materialName\":\"Romano Classico Vein-Cut Travertine\"},{\"category\":\"Timber\",\"imageUrl\":\"https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=400&q=80\",\"materialId\":\"prod-smoked-oak-flooring\",\"materialName\":\"Smoked European White Oak Wide Plank\"},{\"category\":\"Lighting\",\"imageUrl\":\"https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=400&q=80\",\"materialId\":\"prod-linear-bronze-pendant\",\"materialName\":\"Kanso Linear Brushed Bronze Chandelier\"}]', '{}', 1, 1, 1, '[\"Villa\",\"Coastal\",\"Travertine\",\"Minimalist Luxury\",\"Turnkey Execution\"]', '2026-08-17 16:37:23', '2026-08-17 16:37:23')
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `hero_image` = VALUES(`hero_image`), `description` = VALUES(`description`);
INSERT INTO `projects` (`id`, `title`, `slug`, `location`, `year`, `project_type`, `area`, `short_description`, `description`, `hero_image`, `gallery`, `design_approach`, `materials_used`, `before_after`, `is_published`, `is_featured`, `sort_order`, `tags`, `created_at`, `updated_at`)
VALUES ('3281844d-cb75-40e4-b5ed-c4e4de7a9f63', 'Pavilion of Light', 'pavilion-of-light-worli', 'Worli Seaface, Mumbai', '2024', 'Penthouse & Estate', '5,400 sq ft', 'An expansive sea-facing sky penthouse wrapped in acoustic fluted walnut paneling, Calacatta Vagli porcelain, and custom patinated bronze millwork.', 'Perched high above the Arabian Sea, this sky residence explores how sunlight behaves across contrasting textures. The public salon flows seamlessly from honed stone floors to floor-to-ceiling smoked walnut millwork housing a curated collection of modern sculpture.', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85', '[\"https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80\",\"https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=80\",\"https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1400&q=80\"]', 'We eradicated unnecessary visual clutter, replacing drywall partitions with sliding fluted acoustic timber screens that allow the living space to transform dynamically from open gallery to private entertaining salon.', '[{\"category\":\"Acoustic Cladding\",\"imageUrl\":\"https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=400&q=80\",\"materialId\":\"prod-fluted-acoustic-panel\",\"materialName\":\"Acoustic Fluted Walnut Wall Panel\"},{\"category\":\"Sintered Stone\",\"imageUrl\":\"https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=400&q=80\",\"materialId\":\"prod-calacatta-porcelain\",\"materialName\":\"Calacatta Vagli Sintered Porcelain Slab\"}]', '{}', 1, 1, 2, '[\"Penthouse\",\"Mumbai\",\"Walnut\",\"Sea View\",\"Interior Design\"]', '2026-08-17 16:37:23', '2026-08-17 16:37:23')
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `hero_image` = VALUES(`hero_image`), `description` = VALUES(`description`);

-- ============================================================
-- DATA: SERVICES (4 from Supabase)
-- ============================================================
INSERT INTO `services` (`id`, `title`, `slug`, `short_desc`, `full_desc`, `icon_name`, `image_url`, `deliverables`, `sort_order`, `is_published`, `created_at`, `updated_at`)
VALUES ('b411876d-39d8-45ac-88eb-0d9a1b77adc5', 'Interior Architecture & Space Planning', 'interior-architecture-space-planning', 'Comprehensive spatial reconfiguration, structural alignment, and architectural interior detailing for luxury residences and estates.', 'We re-engineer spatial flows from first principles, taking into account natural daylight vectors, sightlines, acoustics, and structural integration. Our drawings cover full architectural CAD & BIM sets, reflected ceiling plans, MEP coordination, and micro-detailed millwork joinery.', 'Compass', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80', '[\"Concept spatial diagrams & 3D volumetric studies\",\"Full architectural interior blueprint packages\",\"Reflected ceiling & architectural lighting plans\",\"Custom door, window, and wall assembly details\",\"Statutory & structural consultant coordination\"]', 1, 1, '2026-08-17 16:37:24', '2026-08-17 16:37:24')
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `image_url` = VALUES(`image_url`), `full_desc` = VALUES(`full_desc`);
INSERT INTO `services` (`id`, `title`, `slug`, `short_desc`, `full_desc`, `icon_name`, `image_url`, `deliverables`, `sort_order`, `is_published`, `created_at`, `updated_at`)
VALUES ('72ff8e49-b5e6-45cf-9f44-63f68d8aebd7', 'Material Curation & Sourcing Advisory', 'material-curation-sourcing', 'Global stone quarry selection, certified timber procurement, and bespoke surface formulation tailored to project climate.', 'Leveraging our direct relationships with European quarries and master timber mills, we curate bespoke material palettes that age gracefully. We conduct rigorous laboratory testing for water absorption, hardness, and thermal behavior.', 'Layers', 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80', '[\"Physical tactile sample trays & curated finish moodboards\",\"Direct quarry inspection and slab block selection\",\"Full technical specification sheets & maintenance protocols\",\"Contractor procurement schedules and MOQ optimization\"]', 3, 1, '2026-08-17 16:37:24', '2026-08-17 16:37:24')
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `image_url` = VALUES(`image_url`), `full_desc` = VALUES(`full_desc`);
INSERT INTO `services` (`id`, `title`, `slug`, `short_desc`, `full_desc`, `icon_name`, `image_url`, `deliverables`, `sort_order`, `is_published`, `created_at`, `updated_at`)
VALUES ('5d42e351-8032-4924-824e-86d03ee49972', 'Bespoke Furniture & Custom Millwork', 'bespoke-furniture-custom-millwork', 'Limited edition furniture, sculptural stone monoliths, and precision-engineered architectural cabinetry handcrafted in our studio.', 'Every piece is drafted specifically for its designated space, utilizing select hardwoods, hand-poured bronze castings, and monolithic natural stones.', 'Armchair', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80', '[\"1:1 scale ergonomic prototypes and timber mockups\",\"Hand-selected natural flitch veneer matching\",\"Integrated soft-close concealed hardware engineering\",\"Numbered certificate of atelier authenticity\"]', 4, 1, '2026-08-17 16:37:25', '2026-08-17 16:37:25')
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `image_url` = VALUES(`image_url`), `full_desc` = VALUES(`full_desc`);
INSERT INTO `services` (`id`, `title`, `slug`, `short_desc`, `full_desc`, `icon_name`, `image_url`, `deliverables`, `sort_order`, `is_published`, `created_at`, `updated_at`)
VALUES ('d0f2fbce-e155-4db4-87d3-66b5789977bd', 'Turnkey Luxury Execution', 'turnkey-luxury-execution', 'End-to-end master project management, artisan craftsmanship, and on-site engineering from bare shell to final handover.', 'Our dedicated site engineering and project management division oversees every phase of construction. We ensure absolute adherence to millimeter tolerances, material integrity, and promised delivery timelines.', 'ShieldCheck', 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80', '[\"Dedicated on-site architectural project manager\",\"Daily photographic progress tracking & Gantt charts\",\"Master artisan supervision (masonry, carpentry, stone finishing)\",\"Rigorous multi-stage QA and snag resolution\",\"Comprehensive maintenance manuals & warranty portfolio\"]', 2, 1, '2026-08-17 16:37:24', '2026-08-19 16:09:53')
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `image_url` = VALUES(`image_url`), `full_desc` = VALUES(`full_desc`);

-- ============================================================
-- DATA: CUSTOMERS (5 from Supabase)
-- ============================================================
INSERT INTO `customers` (`id`, `email`, `phone`, `full_name`, `is_guest`, `created_at`, `updated_at`)
VALUES ('fe12f292-b1c0-4b67-b2b5-6cd9ed778227', 'client.meera.1787417372916@gmail.com', NULL, 'Meera Deshmukh', 0, '2026-08-22 16:49:34', '2026-08-22 16:49:34')
ON DUPLICATE KEY UPDATE `full_name` = VALUES(`full_name`), `phone` = VALUES(`phone`);
INSERT INTO `customers` (`id`, `email`, `phone`, `full_name`, `is_guest`, `created_at`, `updated_at`)
VALUES ('a52d420f-db26-4a0f-870e-b0f0e367ef90', 'client.meera.1787417398242@gmail.com', NULL, 'Meera Deshmukh', 0, '2026-08-22 16:49:58', '2026-08-22 16:49:58')
ON DUPLICATE KEY UPDATE `full_name` = VALUES(`full_name`), `phone` = VALUES(`phone`);
INSERT INTO `customers` (`id`, `email`, `phone`, `full_name`, `is_guest`, `created_at`, `updated_at`)
VALUES ('d4e0c73e-3405-4d13-9392-e2577cb3455d', 'client.meera.1787417435214@gmail.com', NULL, 'Meera Deshmukh', 0, '2026-08-22 16:50:36', '2026-08-22 16:50:36')
ON DUPLICATE KEY UPDATE `full_name` = VALUES(`full_name`), `phone` = VALUES(`phone`);
INSERT INTO `customers` (`id`, `email`, `phone`, `full_name`, `is_guest`, `created_at`, `updated_at`)
VALUES ('14963582-ffa2-40ac-87cc-6bc9cf6f62a3', 'client.meera.1787418373870@gmail.com', NULL, 'Meera Deshmukh', 0, '2026-08-22 17:06:14', '2026-08-22 17:06:14')
ON DUPLICATE KEY UPDATE `full_name` = VALUES(`full_name`), `phone` = VALUES(`phone`);
INSERT INTO `customers` (`id`, `email`, `phone`, `full_name`, `is_guest`, `created_at`, `updated_at`)
VALUES ('94b43dba-65c9-4bc7-98a1-627ab9a2449f', 'flexnagaon@gmail.com', NULL, 'Flexnagaon', 0, '2026-08-23 15:35:12', '2026-08-23 15:35:12')
ON DUPLICATE KEY UPDATE `full_name` = VALUES(`full_name`), `phone` = VALUES(`phone`);

-- ============================================================
-- DATA: ORDERS (19 from Supabase)
-- ============================================================
INSERT INTO `orders` (`id`, `order_number`, `customer_id`, `customer_name`, `customer_email`, `customer_phone`, `shipping_address`, `billing_address`, `subtotal`, `tax`, `shipping_fee`, `discount`, `total_amount`, `order_status`, `payment_status`, `payment_method`, `notes`, `created_at`, `updated_at`)
VALUES ('180b8a13-4e12-497d-803f-aa49324f0ab9', 'BAL-MT5YW7TU-C3D507', NULL, 'The Dark Avengers', 'theavengercult05@gmail.com', '6000149918', '{\"city\":\"Guwahati\",\"phone\":\"6000149918\",\"state\":\"Assam\",\"country\":\"India\",\"pincode\":\"781040\",\"fullName\":\"The Dark Avengers\",\"addressLine1\":\"the\",\"addressLine2\":\"the\"}', '{\"city\":\"Guwahati\",\"phone\":\"6000149918\",\"state\":\"Assam\",\"country\":\"India\",\"pincode\":\"781040\",\"fullName\":\"The Dark Avengers\",\"addressLine1\":\"the\",\"addressLine2\":\"the\"}', 895000, 161100, 0, 0, 1056100, 'Confirmed', 'Submitted', 'Balaji QR Payment (Balaji PG)', '[Balaji PG UTR: 982886958898]\n[IDEM:chk-1787499209073-2jtbdcw]', '2026-08-23 15:33:59', '2026-08-23 15:33:59')
ON DUPLICATE KEY UPDATE `order_status` = VALUES(`order_status`), `payment_status` = VALUES(`payment_status`);
INSERT INTO `orders` (`id`, `order_number`, `customer_id`, `customer_name`, `customer_email`, `customer_phone`, `shipping_address`, `billing_address`, `subtotal`, `tax`, `shipping_fee`, `discount`, `total_amount`, `order_status`, `payment_status`, `payment_method`, `notes`, `created_at`, `updated_at`)
VALUES ('472524bc-2d6b-44b7-bdb8-eb118be7e0bd', 'BAL-MT5SPX0C-FA3704', NULL, 'Rahul Singhania', 'rahul.singhania@apexinfra.in', '+91 98200 12345', '{\"city\":\"Mumbai\",\"state\":\"Maharashtra\",\"country\":\"India\",\"postalCode\":\"400013\",\"addressLine1\":\"Penthouse A, Lodha World One\"}', '{\"city\":\"Mumbai\",\"state\":\"Maharashtra\",\"country\":\"India\",\"postalCode\":\"400013\",\"addressLine1\":\"Penthouse A, Lodha World One\"}', 179000, 32220, 0, 0, 211220, 'Delivered', 'Verified', 'Balaji PG (Dynamic UPI Intent)', 'Please inspect surface calibration prior to crate dispatch.', '2026-08-23 12:40:59', '2026-08-23 12:41:10')
ON DUPLICATE KEY UPDATE `order_status` = VALUES(`order_status`), `payment_status` = VALUES(`payment_status`);
INSERT INTO `orders` (`id`, `order_number`, `customer_id`, `customer_name`, `customer_email`, `customer_phone`, `shipping_address`, `billing_address`, `subtotal`, `tax`, `shipping_fee`, `discount`, `total_amount`, `order_status`, `payment_status`, `payment_method`, `notes`, `created_at`, `updated_at`)
VALUES ('569ea2ff-1178-4aed-b7fb-a497b45200b3', 'BAL-515459-176', NULL, 'Atif', 'gg@gmail.com', '6000149918', '{\"city\":\"Guwahati\",\"phone\":\"6000149918\",\"state\":\"Assam\",\"country\":\"India\",\"pincode\":\"781040\",\"fullName\":\"Atif\",\"addressLine1\":\"The \",\"addressLine2\":\"The \"}', '{\"city\":\"Guwahati\",\"phone\":\"6000149918\",\"state\":\"Assam\",\"country\":\"India\",\"pincode\":\"781040\",\"fullName\":\"Atif\",\"addressLine1\":\"The \",\"addressLine2\":\"The \"}', 78000, 14040, 0, 0, 92040, 'Cancelled', 'Submitted', 'Encrypted Card Processing', '', '2026-08-19 16:05:15', '2026-08-22 11:59:52')
ON DUPLICATE KEY UPDATE `order_status` = VALUES(`order_status`), `payment_status` = VALUES(`payment_status`);
INSERT INTO `orders` (`id`, `order_number`, `customer_id`, `customer_name`, `customer_email`, `customer_phone`, `shipping_address`, `billing_address`, `subtotal`, `tax`, `shipping_fee`, `discount`, `total_amount`, `order_status`, `payment_status`, `payment_method`, `notes`, `created_at`, `updated_at`)
VALUES ('f22e7bd4-5dd2-44b9-97e6-5be283f63f3b', 'BAL-251667-423', NULL, 'Test Architect Client', 'test.client@balaji-test.com', '+91 98765 43210', '{\"city\":\"Guwahati\",\"phone\":\"+91 98765 43210\",\"state\":\"Assam\",\"country\":\"India\",\"pincode\":\"781040\",\"fullName\":\"Test Architect Client\",\"addressLine1\":\"Suite 402, Design Pavilion\"}', '{\"city\":\"Guwahati\",\"phone\":\"+91 98765 43210\",\"state\":\"Assam\",\"country\":\"India\",\"pincode\":\"781040\",\"fullName\":\"Test Architect Client\",\"addressLine1\":\"Suite 402, Design Pavilion\"}', 320, 58, 1500, 0, 1878, 'Cancelled', 'Submitted', 'Balaji QR Payment (Balaji PG)', '[Balaji PG UTR: 423589123456] Urgent site handover delivery.', '2026-08-21 13:00:46', '2026-08-22 11:59:53')
ON DUPLICATE KEY UPDATE `order_status` = VALUES(`order_status`), `payment_status` = VALUES(`payment_status`);
INSERT INTO `orders` (`id`, `order_number`, `customer_id`, `customer_name`, `customer_email`, `customer_phone`, `shipping_address`, `billing_address`, `subtotal`, `tax`, `shipping_fee`, `discount`, `total_amount`, `order_status`, `payment_status`, `payment_method`, `notes`, `created_at`, `updated_at`)
VALUES ('74620bf6-41eb-44b0-a149-3cb3b3f4cf54', 'BAL-MT5T02T1-9F6BB8', NULL, 'Rahul Singhania', 'rahul.singhania@apexinfra.in', '+91 98200 12345', '{\"city\":\"Mumbai\",\"state\":\"Maharashtra\",\"country\":\"India\",\"postalCode\":\"400013\",\"addressLine1\":\"Penthouse A, Lodha World One\"}', '{\"city\":\"Mumbai\",\"state\":\"Maharashtra\",\"country\":\"India\",\"postalCode\":\"400013\",\"addressLine1\":\"Penthouse A, Lodha World One\"}', 179000, 32220, 0, 0, 211220, 'Delivered', 'Verified', 'Balaji PG (Dynamic UPI Intent)', 'Please inspect surface calibration prior to crate dispatch.', '2026-08-23 12:48:54', '2026-08-23 12:49:05')
ON DUPLICATE KEY UPDATE `order_status` = VALUES(`order_status`), `payment_status` = VALUES(`payment_status`);
INSERT INTO `orders` (`id`, `order_number`, `customer_id`, `customer_name`, `customer_email`, `customer_phone`, `shipping_address`, `billing_address`, `subtotal`, `tax`, `shipping_fee`, `discount`, `total_amount`, `order_status`, `payment_status`, `payment_method`, `notes`, `created_at`, `updated_at`)
VALUES ('c605aede-0212-413c-882b-0997808dcea9', 'BAL-001480-293', NULL, 'Rahul Singhania', 'rahul.singhania@apexinfra.in', '+91 98200 12345', '{\"city\":\"Mumbai\",\"state\":\"Maharashtra\",\"country\":\"India\",\"postalCode\":\"400013\",\"addressLine1\":\"Penthouse A, Lodha World One\"}', '{\"city\":\"Mumbai\",\"state\":\"Maharashtra\",\"country\":\"India\",\"postalCode\":\"400013\",\"addressLine1\":\"Penthouse A, Lodha World One\"}', 179000, 32220, 0, 0, 211220, 'Delivered', 'Verified', 'Balaji PG (Dynamic UPI Intent)', 'Please inspect surface calibration prior to crate dispatch.', '2026-08-22 16:26:34', '2026-08-22 16:26:44')
ON DUPLICATE KEY UPDATE `order_status` = VALUES(`order_status`), `payment_status` = VALUES(`payment_status`);
INSERT INTO `orders` (`id`, `order_number`, `customer_id`, `customer_name`, `customer_email`, `customer_phone`, `shipping_address`, `billing_address`, `subtotal`, `tax`, `shipping_fee`, `discount`, `total_amount`, `order_status`, `payment_status`, `payment_method`, `notes`, `created_at`, `updated_at`)
VALUES ('827f1bee-23a0-4f19-a7ad-bc5d4a17be8e', 'BAL-MT5TFVU6-867DF6', NULL, 'Cancel Test', 'cancel@test.com', '9999999999', '{\"city\":\"Guwahati\",\"phone\":\"9999999999\",\"state\":\"Assam\",\"pincode\":\"781040\",\"fullName\":\"Test\",\"addressLine1\":\"Test\"}', '{\"city\":\"Guwahati\",\"phone\":\"9999999999\",\"state\":\"Assam\",\"pincode\":\"781040\",\"fullName\":\"Test\",\"addressLine1\":\"Test\"}', 26400, 4752, 1800, 0, 32952, 'Confirmed', 'Submitted', 'Test Card', '', '2026-08-23 13:01:11', '2026-08-23 13:01:11')
ON DUPLICATE KEY UPDATE `order_status` = VALUES(`order_status`), `payment_status` = VALUES(`payment_status`);
INSERT INTO `orders` (`id`, `order_number`, `customer_id`, `customer_name`, `customer_email`, `customer_phone`, `shipping_address`, `billing_address`, `subtotal`, `tax`, `shipping_fee`, `discount`, `total_amount`, `order_status`, `payment_status`, `payment_method`, `notes`, `created_at`, `updated_at`)
VALUES ('58bb546b-619e-40e4-b5cc-52ea07916841', 'BAL-094621-431', NULL, 'Rahul Singhania', 'rahul.singhania@apexinfra.in', '+91 98200 12345', '{\"city\":\"Mumbai\",\"state\":\"Maharashtra\",\"country\":\"India\",\"postalCode\":\"400013\",\"addressLine1\":\"Penthouse A, Lodha World One\"}', '{\"city\":\"Mumbai\",\"state\":\"Maharashtra\",\"country\":\"India\",\"postalCode\":\"400013\",\"addressLine1\":\"Penthouse A, Lodha World One\"}', 179000, 32220, 0, 0, 211220, 'Delivered', 'Verified', 'Balaji PG (Dynamic UPI Intent)', 'Please inspect surface calibration prior to crate dispatch.', '2026-08-22 16:28:08', '2026-08-22 16:28:16')
ON DUPLICATE KEY UPDATE `order_status` = VALUES(`order_status`), `payment_status` = VALUES(`payment_status`);
INSERT INTO `orders` (`id`, `order_number`, `customer_id`, `customer_name`, `customer_email`, `customer_phone`, `shipping_address`, `billing_address`, `subtotal`, `tax`, `shipping_fee`, `discount`, `total_amount`, `order_status`, `payment_status`, `payment_method`, `notes`, `created_at`, `updated_at`)
VALUES ('d6eba678-3cc0-480b-ab0b-55a16ee992ec', 'BAL-460968-416', NULL, 'Rahul Singhania', 'rahul.singhania@apexinfra.in', '+91 98200 12345', '{\"city\":\"Mumbai\",\"state\":\"Maharashtra\",\"country\":\"India\",\"postalCode\":\"400013\",\"addressLine1\":\"Penthouse A, Lodha World One\"}', '{\"city\":\"Mumbai\",\"state\":\"Maharashtra\",\"country\":\"India\",\"postalCode\":\"400013\",\"addressLine1\":\"Penthouse A, Lodha World One\"}', 179000, 32220, 0, 0, 211220, 'Delivered', 'Verified', 'Balaji PG (Dynamic UPI Intent)', 'Please inspect surface calibration prior to crate dispatch.', '2026-08-22 16:50:54', '2026-08-22 16:51:03')
ON DUPLICATE KEY UPDATE `order_status` = VALUES(`order_status`), `payment_status` = VALUES(`payment_status`);
INSERT INTO `orders` (`id`, `order_number`, `customer_id`, `customer_name`, `customer_email`, `customer_phone`, `shipping_address`, `billing_address`, `subtotal`, `tax`, `shipping_fee`, `discount`, `total_amount`, `order_status`, `payment_status`, `payment_method`, `notes`, `created_at`, `updated_at`)
VALUES ('c0c63fb0-bc8c-4bb4-8020-baea7c43aad8', 'BAL-MT5THELB-933984', NULL, 'Rahul Singhania', 'rahul.singhania@apexinfra.in', '+91 98200 12345', '{\"city\":\"Mumbai\",\"state\":\"Maharashtra\",\"country\":\"India\",\"postalCode\":\"400013\",\"addressLine1\":\"Penthouse A, Lodha World One\"}', '{\"city\":\"Mumbai\",\"state\":\"Maharashtra\",\"country\":\"India\",\"postalCode\":\"400013\",\"addressLine1\":\"Penthouse A, Lodha World One\"}', 179000, 32220, 0, 0, 211220, 'Delivered', 'Verified', 'Balaji PG (Dynamic UPI Intent)', 'Please inspect surface calibration prior to crate dispatch.', '2026-08-23 13:02:22', '2026-08-23 13:02:32')
ON DUPLICATE KEY UPDATE `order_status` = VALUES(`order_status`), `payment_status` = VALUES(`payment_status`);
INSERT INTO `orders` (`id`, `order_number`, `customer_id`, `customer_name`, `customer_email`, `customer_phone`, `shipping_address`, `billing_address`, `subtotal`, `tax`, `shipping_fee`, `discount`, `total_amount`, `order_status`, `payment_status`, `payment_method`, `notes`, `created_at`, `updated_at`)
VALUES ('e2fa9af7-115f-43d5-84a4-409bc62385da', 'BAL-396756-254', NULL, 'Rahul Singhania', 'rahul.singhania@apexinfra.in', '+91 98200 12345', '{\"city\":\"Mumbai\",\"state\":\"Maharashtra\",\"country\":\"India\",\"postalCode\":\"400013\",\"addressLine1\":\"Penthouse A, Lodha World One\"}', '{\"city\":\"Mumbai\",\"state\":\"Maharashtra\",\"country\":\"India\",\"postalCode\":\"400013\",\"addressLine1\":\"Penthouse A, Lodha World One\"}', 179000, 32220, 0, 0, 211220, 'Delivered', 'Verified', 'Balaji PG (Dynamic UPI Intent)', 'Please inspect surface calibration prior to crate dispatch.', '2026-08-22 17:06:30', '2026-08-22 17:06:39')
ON DUPLICATE KEY UPDATE `order_status` = VALUES(`order_status`), `payment_status` = VALUES(`payment_status`);
INSERT INTO `orders` (`id`, `order_number`, `customer_id`, `customer_name`, `customer_email`, `customer_phone`, `shipping_address`, `billing_address`, `subtotal`, `tax`, `shipping_fee`, `discount`, `total_amount`, `order_status`, `payment_status`, `payment_method`, `notes`, `created_at`, `updated_at`)
VALUES ('6c9fd4d0-222e-4d4f-a746-4524ab14a048', 'BAL-TEST-PV-5850', NULL, 'Payment Test User', 'payment@test.com', '9876543210', '{\"city\":\"Guwahati\",\"state\":\"Assam\",\"pincode\":\"781040\",\"addressLine1\":\"123 Test St\"}', NULL, 5000, 0, 0, 0, 5900, 'Confirmed', 'Submitted', 'UPI', NULL, '2026-08-23 10:37:18', '2026-08-23 10:37:18')
ON DUPLICATE KEY UPDATE `order_status` = VALUES(`order_status`), `payment_status` = VALUES(`payment_status`);
INSERT INTO `orders` (`id`, `order_number`, `customer_id`, `customer_name`, `customer_email`, `customer_phone`, `shipping_address`, `billing_address`, `subtotal`, `tax`, `shipping_fee`, `discount`, `total_amount`, `order_status`, `payment_status`, `payment_method`, `notes`, `created_at`, `updated_at`)
VALUES ('f3299c84-a901-4586-8159-f5cb17f428a2', 'BAL-527306-647', NULL, 'Rahul Singhania', 'rahul.singhania@apexinfra.in', '+91 98200 12345', '{\"city\":\"Mumbai\",\"state\":\"Maharashtra\",\"country\":\"India\",\"postalCode\":\"400013\",\"addressLine1\":\"Penthouse A, Lodha World One\"}', '{\"city\":\"Mumbai\",\"state\":\"Maharashtra\",\"country\":\"India\",\"postalCode\":\"400013\",\"addressLine1\":\"Penthouse A, Lodha World One\"}', 179000, 32220, 0, 0, 211220, 'Delivered', 'Verified', 'Balaji PG (Dynamic UPI Intent)', 'Please inspect surface calibration prior to crate dispatch.', '2026-08-23 10:38:40', '2026-08-23 10:38:50')
ON DUPLICATE KEY UPDATE `order_status` = VALUES(`order_status`), `payment_status` = VALUES(`payment_status`);
INSERT INTO `orders` (`id`, `order_number`, `customer_id`, `customer_name`, `customer_email`, `customer_phone`, `shipping_address`, `billing_address`, `subtotal`, `tax`, `shipping_fee`, `discount`, `total_amount`, `order_status`, `payment_status`, `payment_method`, `notes`, `created_at`, `updated_at`)
VALUES ('e79c7ee8-476e-4aa0-80a1-387e8b5afc0a', 'BAL-MT5OXQMA-FCC951', NULL, 'Rahul Singhania', 'rahul.singhania@apexinfra.in', '+91 98200 12345', '{\"city\":\"Mumbai\",\"state\":\"Maharashtra\",\"country\":\"India\",\"postalCode\":\"400013\",\"addressLine1\":\"Penthouse A, Lodha World One\"}', '{\"city\":\"Mumbai\",\"state\":\"Maharashtra\",\"country\":\"India\",\"postalCode\":\"400013\",\"addressLine1\":\"Penthouse A, Lodha World One\"}', 179000, 32220, 0, 0, 211220, 'Delivered', 'Verified', 'Balaji PG (Dynamic UPI Intent)', 'Please inspect surface calibration prior to crate dispatch.', '2026-08-23 10:55:06', '2026-08-23 10:55:17')
ON DUPLICATE KEY UPDATE `order_status` = VALUES(`order_status`), `payment_status` = VALUES(`payment_status`);
INSERT INTO `orders` (`id`, `order_number`, `customer_id`, `customer_name`, `customer_email`, `customer_phone`, `shipping_address`, `billing_address`, `subtotal`, `tax`, `shipping_fee`, `discount`, `total_amount`, `order_status`, `payment_status`, `payment_method`, `notes`, `created_at`, `updated_at`)
VALUES ('30f720b0-faec-4101-b14d-fe652ff02964', 'BAL-ORD-STAT-3358', NULL, 'Status Test User', 'statustest@balaji.com', '+91 9876543210', '{\"city\":\"Guwahati\",\"state\":\"Assam\",\"pincode\":\"781040\",\"addressLine1\":\"Test St\"}', NULL, 10000, 0, 0, 0, 11800, 'Delivered', 'Verified', 'UPI', NULL, '2026-08-23 13:11:46', '2026-08-23 13:11:55')
ON DUPLICATE KEY UPDATE `order_status` = VALUES(`order_status`), `payment_status` = VALUES(`payment_status`);
INSERT INTO `orders` (`id`, `order_number`, `customer_id`, `customer_name`, `customer_email`, `customer_phone`, `shipping_address`, `billing_address`, `subtotal`, `tax`, `shipping_fee`, `discount`, `total_amount`, `order_status`, `payment_status`, `payment_method`, `notes`, `created_at`, `updated_at`)
VALUES ('37fa64fc-4d29-44e5-af1e-4bfab7695010', 'BAL-MT5XYU7U-E3B87E', NULL, 'Test Buyer', 'buyer@test.com', '9999999999', '{\"city\":\"Guwahati\",\"phone\":\"9999999999\",\"state\":\"Assam\",\"pincode\":\"781040\",\"fullName\":\"Test\",\"addressLine1\":\"Test\"}', '{\"city\":\"Guwahati\",\"phone\":\"9999999999\",\"state\":\"Assam\",\"pincode\":\"781040\",\"fullName\":\"Test\",\"addressLine1\":\"Test\"}', 1100, 198, 1800, 0, 3098, 'Confirmed', 'Submitted', 'Test Card', '[IDEM:idem-test-1787497677455]', '2026-08-23 15:07:54', '2026-08-23 15:07:54')
ON DUPLICATE KEY UPDATE `order_status` = VALUES(`order_status`), `payment_status` = VALUES(`payment_status`);
INSERT INTO `orders` (`id`, `order_number`, `customer_id`, `customer_name`, `customer_email`, `customer_phone`, `shipping_address`, `billing_address`, `subtotal`, `tax`, `shipping_fee`, `discount`, `total_amount`, `order_status`, `payment_status`, `payment_method`, `notes`, `created_at`, `updated_at`)
VALUES ('9fbdcf7a-6eb2-494f-9ab0-23b4b1e90d6a', 'BAL-MT5XZUE2-A6BC7B', NULL, 'Rahul Singhania', 'rahul.singhania@apexinfra.in', '+91 98200 12345', '{\"city\":\"Mumbai\",\"state\":\"Maharashtra\",\"country\":\"India\",\"postalCode\":\"400013\",\"addressLine1\":\"Penthouse A, Lodha World One\"}', '{\"city\":\"Mumbai\",\"state\":\"Maharashtra\",\"country\":\"India\",\"postalCode\":\"400013\",\"addressLine1\":\"Penthouse A, Lodha World One\"}', 179000, 32220, 0, 0, 211220, 'Delivered', 'Verified', 'Balaji PG (Dynamic UPI Intent)', 'Please inspect surface calibration prior to crate dispatch.', '2026-08-23 15:08:41', '2026-08-23 15:08:52')
ON DUPLICATE KEY UPDATE `order_status` = VALUES(`order_status`), `payment_status` = VALUES(`payment_status`);
INSERT INTO `orders` (`id`, `order_number`, `customer_id`, `customer_name`, `customer_email`, `customer_phone`, `shipping_address`, `billing_address`, `subtotal`, `tax`, `shipping_fee`, `discount`, `total_amount`, `order_status`, `payment_status`, `payment_method`, `notes`, `created_at`, `updated_at`)
VALUES ('a578cc11-c056-4eea-baf4-3bcd7a5c72b1', 'BAL-MT5Y32JP-1D7788', NULL, 'Atif', 'flexnagaon@gmail.com', '6000149918', '{\"city\":\"Guwahati\",\"phone\":\"6000149918\",\"state\":\"Assam\",\"country\":\"India\",\"pincode\":\"781040\",\"fullName\":\"Atif\",\"addressLine1\":\"The \",\"addressLine2\":\"The \"}', '{\"city\":\"Guwahati\",\"phone\":\"6000149918\",\"state\":\"Assam\",\"country\":\"India\",\"pincode\":\"781040\",\"fullName\":\"Atif\",\"addressLine1\":\"The \",\"addressLine2\":\"The \"}', 895000, 161100, 0, 0, 1056100, 'Pending', 'Submitted', 'Balaji QR Payment (Balaji PG)', '[Balaji PG UTR: 660029121788]\n[IDEM:chk-1787497462001-iaf03wa]', '2026-08-23 15:11:20', '2026-08-23 15:11:58')
ON DUPLICATE KEY UPDATE `order_status` = VALUES(`order_status`), `payment_status` = VALUES(`payment_status`);
INSERT INTO `orders` (`id`, `order_number`, `customer_id`, `customer_name`, `customer_email`, `customer_phone`, `shipping_address`, `billing_address`, `subtotal`, `tax`, `shipping_fee`, `discount`, `total_amount`, `order_status`, `payment_status`, `payment_method`, `notes`, `created_at`, `updated_at`)
VALUES ('62918250-a3e4-4bd8-8d2f-32ac2870f6be', 'BAL-MT5Y5K3S-4101FB', NULL, 'Atif', 'flexnagaon@gmail.com', '6000149918', '{\"city\":\"Guwahati\",\"phone\":\"6000149918\",\"state\":\"Assam\",\"country\":\"India\",\"pincode\":\"781040\",\"fullName\":\"Atif\",\"addressLine1\":\"The \",\"addressLine2\":\"The \"}', '{\"city\":\"Guwahati\",\"phone\":\"6000149918\",\"state\":\"Assam\",\"country\":\"India\",\"pincode\":\"781040\",\"fullName\":\"Atif\",\"addressLine1\":\"The \",\"addressLine2\":\"The \"}', 895000, 161100, 0, 0, 1056100, 'Confirmed', 'Submitted', 'Balaji QR Payment (Balaji PG)', '[Balaji PG UTR: 660029121788]\n[IDEM:chk-1787497972115-1qlzzrf]', '2026-08-23 15:13:15', '2026-08-23 15:13:15')
ON DUPLICATE KEY UPDATE `order_status` = VALUES(`order_status`), `payment_status` = VALUES(`payment_status`);

-- ============================================================
-- DATA: ORDER ITEMS (17 from Supabase)
-- ============================================================
INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `variant_id`, `product_name`, `product_sku`, `unit`, `quantity`, `unit_price`, `subtotal`, `image_url`, `selected_color`, `selected_finish`)
VALUES ('07e3bb37-bd3d-497a-9c69-f01579ff4b64', '569ea2ff-1178-4aed-b7fb-a497b45200b3', NULL, NULL, 'Romano Classico Vein-Cut Travertine', 'MAT-STN-001', 'sq ft', 100, 780, 78000, 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80', 'Warm Ivory / Biscuit', 'Honed')
ON DUPLICATE KEY UPDATE `quantity` = VALUES(`quantity`), `unit_price` = VALUES(`unit_price`);
INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `variant_id`, `product_name`, `product_sku`, `unit`, `quantity`, `unit_price`, `subtotal`, `image_url`, `selected_color`, `selected_finish`)
VALUES ('e60005e6-217a-4309-9d6e-82736f6326ea', 'c605aede-0212-413c-882b-0997808dcea9', NULL, NULL, 'Test Calacatta Gold Marble Slab', 'TEST-MAT-1787415997652', 'sq ft', 10, 17900, 179000, '/products/test-calacatta-1.jpg', 'Warm Gold / Ivory', 'Polished')
ON DUPLICATE KEY UPDATE `quantity` = VALUES(`quantity`), `unit_price` = VALUES(`unit_price`);
INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `variant_id`, `product_name`, `product_sku`, `unit`, `quantity`, `unit_price`, `subtotal`, `image_url`, `selected_color`, `selected_finish`)
VALUES ('1ab25274-0008-4e51-b3bc-51fa16eff26d', '58bb546b-619e-40e4-b5cc-52ea07916841', NULL, NULL, 'Test Calacatta Gold Marble Slab', 'TEST-MAT-1787416090539', 'sq ft', 10, 17900, 179000, '/products/test-calacatta-1.jpg', 'Warm Gold / Ivory', 'Polished')
ON DUPLICATE KEY UPDATE `quantity` = VALUES(`quantity`), `unit_price` = VALUES(`unit_price`);
INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `variant_id`, `product_name`, `product_sku`, `unit`, `quantity`, `unit_price`, `subtotal`, `image_url`, `selected_color`, `selected_finish`)
VALUES ('6fd2ff5d-8cf4-45e5-bcce-7dd19e4c72ab', 'd6eba678-3cc0-480b-ab0b-55a16ee992ec', NULL, NULL, 'Test Calacatta Gold Marble Slab', 'TEST-MAT-1787417456683', 'sq ft', 10, 17900, 179000, '/products/test-calacatta-1.jpg', 'Warm Gold / Ivory', 'Polished')
ON DUPLICATE KEY UPDATE `quantity` = VALUES(`quantity`), `unit_price` = VALUES(`unit_price`);
INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `variant_id`, `product_name`, `product_sku`, `unit`, `quantity`, `unit_price`, `subtotal`, `image_url`, `selected_color`, `selected_finish`)
VALUES ('5881ed15-171d-4a77-ad35-bcecc867b360', 'e2fa9af7-115f-43d5-84a4-409bc62385da', NULL, NULL, 'Test Calacatta Gold Marble Slab', 'TEST-MAT-1787418393154', 'sq ft', 10, 17900, 179000, '/products/test-calacatta-1.jpg', 'Warm Gold / Ivory', 'Polished')
ON DUPLICATE KEY UPDATE `quantity` = VALUES(`quantity`), `unit_price` = VALUES(`unit_price`);
INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `variant_id`, `product_name`, `product_sku`, `unit`, `quantity`, `unit_price`, `subtotal`, `image_url`, `selected_color`, `selected_finish`)
VALUES ('2d4404de-f3e4-4930-838a-d5f6de1c540d', 'f3299c84-a901-4586-8159-f5cb17f428a2', NULL, NULL, 'Test Calacatta Gold Marble Slab', 'TEST-MAT-1787481523020', 'sq ft', 10, 17900, 179000, '/products/test-calacatta-1.jpg', 'Warm Gold / Ivory', 'Polished')
ON DUPLICATE KEY UPDATE `quantity` = VALUES(`quantity`), `unit_price` = VALUES(`unit_price`);
INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `variant_id`, `product_name`, `product_sku`, `unit`, `quantity`, `unit_price`, `subtotal`, `image_url`, `selected_color`, `selected_finish`)
VALUES ('a84b152e-b2d1-4e20-a00d-7c5cd870c0b3', 'e79c7ee8-476e-4aa0-80a1-387e8b5afc0a', NULL, NULL, 'Test Calacatta Gold Marble Slab', 'TEST-MAT-1787482509675', 'sq ft', 10, 17900, 179000, '/products/test-calacatta-1.jpg', 'Warm Gold / Ivory', 'Polished')
ON DUPLICATE KEY UPDATE `quantity` = VALUES(`quantity`), `unit_price` = VALUES(`unit_price`);
INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `variant_id`, `product_name`, `product_sku`, `unit`, `quantity`, `unit_price`, `subtotal`, `image_url`, `selected_color`, `selected_finish`)
VALUES ('5606de36-a2a0-488c-8024-b90cc45d6494', '472524bc-2d6b-44b7-bdb8-eb118be7e0bd', NULL, NULL, 'Test Calacatta Gold Marble Slab', 'TEST-MAT-1787488862451', 'sq ft', 10, 17900, 179000, '/products/test-calacatta-1.jpg', 'Warm Gold / Ivory', 'Polished')
ON DUPLICATE KEY UPDATE `quantity` = VALUES(`quantity`), `unit_price` = VALUES(`unit_price`);
INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `variant_id`, `product_name`, `product_sku`, `unit`, `quantity`, `unit_price`, `subtotal`, `image_url`, `selected_color`, `selected_finish`)
VALUES ('8750cb35-1946-4469-996f-6c813fb9a6b1', '74620bf6-41eb-44b0-a149-3cb3b3f4cf54', NULL, NULL, 'Test Calacatta Gold Marble Slab', 'TEST-MAT-1787489337343', 'sq ft', 10, 17900, 179000, '/products/test-calacatta-1.jpg', 'Warm Gold / Ivory', 'Polished')
ON DUPLICATE KEY UPDATE `quantity` = VALUES(`quantity`), `unit_price` = VALUES(`unit_price`);
INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `variant_id`, `product_name`, `product_sku`, `unit`, `quantity`, `unit_price`, `subtotal`, `image_url`, `selected_color`, `selected_finish`)
VALUES ('30033996-b68f-4649-8e4a-5b2942606b85', 'c0c63fb0-bc8c-4bb4-8020-baea7c43aad8', NULL, NULL, 'Test Calacatta Gold Marble Slab', 'TEST-MAT-1787490145717', 'sq ft', 10, 17900, 179000, '/products/test-calacatta-1.jpg', 'Warm Gold / Ivory', 'Polished')
ON DUPLICATE KEY UPDATE `quantity` = VALUES(`quantity`), `unit_price` = VALUES(`unit_price`);
INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `variant_id`, `product_name`, `product_sku`, `unit`, `quantity`, `unit_price`, `subtotal`, `image_url`, `selected_color`, `selected_finish`)
VALUES ('de79300b-1c12-4b6d-9349-0dc5bd30004d', '9fbdcf7a-6eb2-494f-9ab0-23b4b1e90d6a', NULL, NULL, 'Test Calacatta Gold Marble Slab', 'TEST-MAT-1787497724049', 'sq ft', 10, 17900, 179000, '/products/test-calacatta-1.jpg', 'Warm Gold / Ivory', 'Polished')
ON DUPLICATE KEY UPDATE `quantity` = VALUES(`quantity`), `unit_price` = VALUES(`unit_price`);
INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `variant_id`, `product_name`, `product_sku`, `unit`, `quantity`, `unit_price`, `subtotal`, `image_url`, `selected_color`, `selected_finish`)
VALUES ('eae4d507-0e8e-4616-8e4a-5bcc2fd5a9d3', 'a578cc11-c056-4eea-baf4-3bcd7a5c72b1', NULL, NULL, 'Test Calacatta Gold Marble Slab', 'TEST-MAT-1787490709335', 'sq ft', 50, 17900, 895000, '/products/test-calacatta-1.jpg', 'Warm Gold / Ivory', 'Polished')
ON DUPLICATE KEY UPDATE `quantity` = VALUES(`quantity`), `unit_price` = VALUES(`unit_price`);
INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `variant_id`, `product_name`, `product_sku`, `unit`, `quantity`, `unit_price`, `subtotal`, `image_url`, `selected_color`, `selected_finish`)
VALUES ('1a2b931c-1cee-436a-8e46-67d61c38d994', '62918250-a3e4-4bd8-8d2f-32ac2870f6be', NULL, NULL, 'Test Calacatta Gold Marble Slab', 'TEST-MAT-1787490709335', 'sq ft', 50, 17900, 895000, '/products/test-calacatta-1.jpg', 'Warm Gold / Ivory', 'Polished')
ON DUPLICATE KEY UPDATE `quantity` = VALUES(`quantity`), `unit_price` = VALUES(`unit_price`);
INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `variant_id`, `product_name`, `product_sku`, `unit`, `quantity`, `unit_price`, `subtotal`, `image_url`, `selected_color`, `selected_finish`)
VALUES ('48a97fa9-7ce6-4241-b926-8d9da9432671', '180b8a13-4e12-497d-803f-aa49324f0ab9', NULL, NULL, 'Test Calacatta Gold Marble Slab', 'TEST-MAT-1787490709335', 'sq ft', 50, 17900, 895000, '/products/test-calacatta-1.jpg', 'Warm Gold / Ivory', 'Polished')
ON DUPLICATE KEY UPDATE `quantity` = VALUES(`quantity`), `unit_price` = VALUES(`unit_price`);
INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `variant_id`, `product_name`, `product_sku`, `unit`, `quantity`, `unit_price`, `subtotal`, `image_url`, `selected_color`, `selected_finish`)
VALUES ('9d5a652c-3396-4491-ac2d-12da1258f9af', 'f22e7bd4-5dd2-44b9-97e6-5be283f63f3b', NULL, NULL, 'Smoked Santos Rosewood Architectural Veneer', 'MAT-VNR-008', 'sq ft', 1, 320, 320, 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=1200&q=80', 'Rich Espresso & Bronze Striations', 'Raw Unfinished (Ready for matte polyurethane or hardwax)')
ON DUPLICATE KEY UPDATE `quantity` = VALUES(`quantity`), `unit_price` = VALUES(`unit_price`);
INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `variant_id`, `product_name`, `product_sku`, `unit`, `quantity`, `unit_price`, `subtotal`, `image_url`, `selected_color`, `selected_finish`)
VALUES ('d3884e30-af72-4932-833b-5a6a57d31799', '37fa64fc-4d29-44e5-af1e-4bfab7695010', NULL, NULL, 'Calacatta Vagli Sintered Porcelain Slab', 'MAT-POR-004', 'sq ft', 1, 1100, 1100, 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80', 'Pure White with Gold & Charcoal Veining', 'Silk Touch Satin')
ON DUPLICATE KEY UPDATE `quantity` = VALUES(`quantity`), `unit_price` = VALUES(`unit_price`);
INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `variant_id`, `product_name`, `product_sku`, `unit`, `quantity`, `unit_price`, `subtotal`, `image_url`, `selected_color`, `selected_finish`)
VALUES ('b21cdcd9-8b62-4b50-9555-ff663b528500', '827f1bee-23a0-4f19-a7ad-bc5d4a17be8e', NULL, NULL, 'Acoustic Fluted Walnut Wall Panel', 'MAT-PNL-003', 'sheet', 2, 13200, 26400, 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80', 'Deep Espresso Walnut', 'Silky Natural Wax Oil')
ON DUPLICATE KEY UPDATE `quantity` = VALUES(`quantity`), `unit_price` = VALUES(`unit_price`);

-- ============================================================
-- DATA: QUOTES (11 from Supabase)
-- ============================================================
INSERT INTO `quotes` (`id`, `quote_number`, `customer_name`, `customer_email`, `customer_phone`, `project_type`, `project_location`, `city`, `notes`, `scope_of_work`, `budget_range`, `estimated_budget`, `estimated_timeline`, `timeline`, `status`, `admin_notes`, `total_quoted_amount`, `quoted_amount`, `created_at`, `updated_at`)
VALUES ('be0ed91c-6c3e-4000-882e-71523c42432b', 'QT-2026-04323', 'Meera Deshmukh', 'meera.deshmukh@architects.in', '+91 98111 22334', 'Turnkey Luxury Villa Architecture', 'Alibaug, Maharashtra', 'Alibaug, Maharashtra', 'Bespoke travertine facade and full acoustic ceiling integration required.', 'Bespoke travertine facade and full acoustic ceiling integration required.', '₹1.5 Cr - ₹3 Cr', '₹1.5 Cr - ₹3 Cr', '6-9 Months', '6-9 Months', 'Under_Review', 'Specification reviewed with structural engineering team.', 2450000, 2450000, '2026-08-22 16:26:37', '2026-08-22 16:26:44')
ON DUPLICATE KEY UPDATE `status` = VALUES(`status`), `admin_notes` = VALUES(`admin_notes`);
INSERT INTO `quotes` (`id`, `quote_number`, `customer_name`, `customer_email`, `customer_phone`, `project_type`, `project_location`, `city`, `notes`, `scope_of_work`, `budget_range`, `estimated_budget`, `estimated_timeline`, `timeline`, `status`, `admin_notes`, `total_quoted_amount`, `quoted_amount`, `created_at`, `updated_at`)
VALUES ('3fdbff74-1bf9-40f5-b167-6cdfaace1905', 'QT-2026-97002', 'Meera Deshmukh', 'meera.deshmukh@architects.in', '+91 98111 22334', 'Turnkey Luxury Villa Architecture', 'Alibaug, Maharashtra', 'Alibaug, Maharashtra', 'Bespoke travertine facade and full acoustic ceiling integration required.', 'Bespoke travertine facade and full acoustic ceiling integration required.', '₹1.5 Cr - ₹3 Cr', '₹1.5 Cr - ₹3 Cr', '6-9 Months', '6-9 Months', 'Under_Review', 'Specification reviewed with structural engineering team.', 2450000, 2450000, '2026-08-22 16:28:10', '2026-08-22 16:28:17')
ON DUPLICATE KEY UPDATE `status` = VALUES(`status`), `admin_notes` = VALUES(`admin_notes`);
INSERT INTO `quotes` (`id`, `quote_number`, `customer_name`, `customer_email`, `customer_phone`, `project_type`, `project_location`, `city`, `notes`, `scope_of_work`, `budget_range`, `estimated_budget`, `estimated_timeline`, `timeline`, `status`, `admin_notes`, `total_quoted_amount`, `quoted_amount`, `created_at`, `updated_at`)
VALUES ('5661e77e-e83f-4744-967b-441adce6e844', 'QT-2026-63672', 'Meera Deshmukh', 'meera.deshmukh@architects.in', '+91 98111 22334', 'Turnkey Luxury Villa Architecture', 'Alibaug, Maharashtra', 'Alibaug, Maharashtra', 'Bespoke travertine facade and full acoustic ceiling integration required.', 'Bespoke travertine facade and full acoustic ceiling integration required.', '₹1.5 Cr - ₹3 Cr', '₹1.5 Cr - ₹3 Cr', '6-9 Months', '6-9 Months', 'Under_Review', 'Specification reviewed with structural engineering team.', 2450000, 2450000, '2026-08-22 16:50:57', '2026-08-22 16:51:04')
ON DUPLICATE KEY UPDATE `status` = VALUES(`status`), `admin_notes` = VALUES(`admin_notes`);
INSERT INTO `quotes` (`id`, `quote_number`, `customer_name`, `customer_email`, `customer_phone`, `project_type`, `project_location`, `city`, `notes`, `scope_of_work`, `budget_range`, `estimated_budget`, `estimated_timeline`, `timeline`, `status`, `admin_notes`, `total_quoted_amount`, `quoted_amount`, `created_at`, `updated_at`)
VALUES ('51f16d62-53c3-4d08-aad1-510a0f9f9ff4', 'QT-2026-99333', 'Meera Deshmukh', 'meera.deshmukh@architects.in', '+91 98111 22334', 'Turnkey Luxury Villa Architecture', 'Alibaug, Maharashtra', 'Alibaug, Maharashtra', 'Bespoke travertine facade and full acoustic ceiling integration required.', 'Bespoke travertine facade and full acoustic ceiling integration required.', '₹1.5 Cr - ₹3 Cr', '₹1.5 Cr - ₹3 Cr', '6-9 Months', '6-9 Months', 'Under_Review', 'Specification reviewed with structural engineering team.', 2450000, 2450000, '2026-08-22 17:06:32', '2026-08-22 17:06:39')
ON DUPLICATE KEY UPDATE `status` = VALUES(`status`), `admin_notes` = VALUES(`admin_notes`);
INSERT INTO `quotes` (`id`, `quote_number`, `customer_name`, `customer_email`, `customer_phone`, `project_type`, `project_location`, `city`, `notes`, `scope_of_work`, `budget_range`, `estimated_budget`, `estimated_timeline`, `timeline`, `status`, `admin_notes`, `total_quoted_amount`, `quoted_amount`, `created_at`, `updated_at`)
VALUES ('97c81a58-7ca7-46e8-8098-d480bccdf814', 'QT-2026-30686', 'Meera Deshmukh', 'meera.deshmukh@architects.in', '+91 98111 22334', 'Turnkey Luxury Villa Architecture', 'Alibaug, Maharashtra', 'Alibaug, Maharashtra', 'Bespoke travertine facade and full acoustic ceiling integration required.', 'Bespoke travertine facade and full acoustic ceiling integration required.', '₹1.5 Cr - ₹3 Cr', '₹1.5 Cr - ₹3 Cr', '6-9 Months', '6-9 Months', 'Under_Review', 'Specification reviewed with structural engineering team.', 2450000, 2450000, '2026-08-23 10:38:43', '2026-08-23 10:38:51')
ON DUPLICATE KEY UPDATE `status` = VALUES(`status`), `admin_notes` = VALUES(`admin_notes`);
INSERT INTO `quotes` (`id`, `quote_number`, `customer_name`, `customer_email`, `customer_phone`, `project_type`, `project_location`, `city`, `notes`, `scope_of_work`, `budget_range`, `estimated_budget`, `estimated_timeline`, `timeline`, `status`, `admin_notes`, `total_quoted_amount`, `quoted_amount`, `created_at`, `updated_at`)
VALUES ('5d666312-4f1b-48a0-91c5-7880aa5398e9', 'QT-2026-MT5OXU14-67D5', 'Meera Deshmukh', 'meera.deshmukh@architects.in', '+91 98111 22334', 'Turnkey Luxury Villa Architecture', 'Alibaug, Maharashtra', 'Alibaug, Maharashtra', 'Bespoke travertine facade and full acoustic ceiling integration required.', 'Bespoke travertine facade and full acoustic ceiling integration required.', '₹1.5 Cr - ₹3 Cr', '₹1.5 Cr - ₹3 Cr', '6-9 Months', '6-9 Months', 'Under_Review', 'Specification reviewed with structural engineering team.', 2450000, 2450000, '2026-08-23 10:55:10', '2026-08-23 10:55:18')
ON DUPLICATE KEY UPDATE `status` = VALUES(`status`), `admin_notes` = VALUES(`admin_notes`);
INSERT INTO `quotes` (`id`, `quote_number`, `customer_name`, `customer_email`, `customer_phone`, `project_type`, `project_location`, `city`, `notes`, `scope_of_work`, `budget_range`, `estimated_budget`, `estimated_timeline`, `timeline`, `status`, `admin_notes`, `total_quoted_amount`, `quoted_amount`, `created_at`, `updated_at`)
VALUES ('17a44447-8857-4f18-9446-dce851d24a5e', 'QT-2026-MT5SQ05M-D084', 'Meera Deshmukh', 'meera.deshmukh@architects.in', '+91 98111 22334', 'Turnkey Luxury Villa Architecture', 'Alibaug, Maharashtra', 'Alibaug, Maharashtra', 'Bespoke travertine facade and full acoustic ceiling integration required.', 'Bespoke travertine facade and full acoustic ceiling integration required.', '₹1.5 Cr - ₹3 Cr', '₹1.5 Cr - ₹3 Cr', '6-9 Months', '6-9 Months', 'Under_Review', 'Specification reviewed with structural engineering team.', 2450000, 2450000, '2026-08-23 12:41:04', '2026-08-23 12:41:11')
ON DUPLICATE KEY UPDATE `status` = VALUES(`status`), `admin_notes` = VALUES(`admin_notes`);
INSERT INTO `quotes` (`id`, `quote_number`, `customer_name`, `customer_email`, `customer_phone`, `project_type`, `project_location`, `city`, `notes`, `scope_of_work`, `budget_range`, `estimated_budget`, `estimated_timeline`, `timeline`, `status`, `admin_notes`, `total_quoted_amount`, `quoted_amount`, `created_at`, `updated_at`)
VALUES ('bd2b5670-5336-4f88-835d-d31d7a78ebd1', 'QT-2026-MT5T0684-2072', 'Meera Deshmukh', 'meera.deshmukh@architects.in', '+91 98111 22334', 'Turnkey Luxury Villa Architecture', 'Alibaug, Maharashtra', 'Alibaug, Maharashtra', 'Bespoke travertine facade and full acoustic ceiling integration required.', 'Bespoke travertine facade and full acoustic ceiling integration required.', '₹1.5 Cr - ₹3 Cr', '₹1.5 Cr - ₹3 Cr', '6-9 Months', '6-9 Months', 'Under_Review', 'Specification reviewed with structural engineering team.', 2450000, 2450000, '2026-08-23 12:48:58', '2026-08-23 12:49:06')
ON DUPLICATE KEY UPDATE `status` = VALUES(`status`), `admin_notes` = VALUES(`admin_notes`);
INSERT INTO `quotes` (`id`, `quote_number`, `customer_name`, `customer_email`, `customer_phone`, `project_type`, `project_location`, `city`, `notes`, `scope_of_work`, `budget_range`, `estimated_budget`, `estimated_timeline`, `timeline`, `status`, `admin_notes`, `total_quoted_amount`, `quoted_amount`, `created_at`, `updated_at`)
VALUES ('59d9ffd8-c91f-480c-92b4-f1cc13fcf177', 'QT-2026-MT5THHCQ-255A', 'Meera Deshmukh', 'meera.deshmukh@architects.in', '+91 98111 22334', 'Turnkey Luxury Villa Architecture', 'Alibaug, Maharashtra', 'Alibaug, Maharashtra', 'Bespoke travertine facade and full acoustic ceiling integration required.', 'Bespoke travertine facade and full acoustic ceiling integration required.', '₹1.5 Cr - ₹3 Cr', '₹1.5 Cr - ₹3 Cr', '6-9 Months', '6-9 Months', 'Under_Review', 'Specification reviewed with structural engineering team.', 2450000, 2450000, '2026-08-23 13:02:26', '2026-08-23 13:02:33')
ON DUPLICATE KEY UPDATE `status` = VALUES(`status`), `admin_notes` = VALUES(`admin_notes`);
INSERT INTO `quotes` (`id`, `quote_number`, `customer_name`, `customer_email`, `customer_phone`, `project_type`, `project_location`, `city`, `notes`, `scope_of_work`, `budget_range`, `estimated_budget`, `estimated_timeline`, `timeline`, `status`, `admin_notes`, `total_quoted_amount`, `quoted_amount`, `created_at`, `updated_at`)
VALUES ('b21ac6ee-04cc-47ea-a094-3c38566c6056', 'QT-2026-MT5TV6HA-316A', 'Meera Deshmukh', 'meera.deshmukh@architects.in', '+91 98111 22334', 'Turnkey Luxury Villa Architecture', 'Alibaug, Maharashtra', 'Alibaug, Maharashtra', 'Bespoke travertine facade and full acoustic ceiling integration required.', 'Bespoke travertine facade and full acoustic ceiling integration required.', '₹1.5 Cr - ₹3 Cr', '₹1.5 Cr - ₹3 Cr', '6-9 Months', '6-9 Months', 'Under_Review', 'Specification reviewed with structural engineering team.', 2450000, 2450000, '2026-08-23 13:13:05', '2026-08-23 13:13:13')
ON DUPLICATE KEY UPDATE `status` = VALUES(`status`), `admin_notes` = VALUES(`admin_notes`);
INSERT INTO `quotes` (`id`, `quote_number`, `customer_name`, `customer_email`, `customer_phone`, `project_type`, `project_location`, `city`, `notes`, `scope_of_work`, `budget_range`, `estimated_budget`, `estimated_timeline`, `timeline`, `status`, `admin_notes`, `total_quoted_amount`, `quoted_amount`, `created_at`, `updated_at`)
VALUES ('9f845313-da0c-4b5b-887e-8e996a7e1128', 'QT-2026-MT5XZY6B-2F86', 'Meera Deshmukh', 'meera.deshmukh@architects.in', '+91 98111 22334', 'Turnkey Luxury Villa Architecture', 'Alibaug, Maharashtra', 'Alibaug, Maharashtra', 'Bespoke travertine facade and full acoustic ceiling integration required.', 'Bespoke travertine facade and full acoustic ceiling integration required.', '₹1.5 Cr - ₹3 Cr', '₹1.5 Cr - ₹3 Cr', '6-9 Months', '6-9 Months', 'Under_Review', 'Specification reviewed with structural engineering team.', 2450000, 2450000, '2026-08-23 15:08:46', '2026-08-23 15:08:54')
ON DUPLICATE KEY UPDATE `status` = VALUES(`status`), `admin_notes` = VALUES(`admin_notes`);

-- ============================================================
-- DATA: ENQUIRIES (11 from Supabase)
-- ============================================================
INSERT INTO `enquiries` (`id`, `name`, `email`, `phone`, `subject`, `message`, `status`, `source`, `created_at`)
VALUES ('041d1db1-053c-486c-9ffd-940e03058f51', 'Aditya Birla Atelier Group', 'procurement@adityabirla.com', '+91 22 6600 0000', 'Hospitality Procurement Commission', 'Seeking specification deck for upcoming 5-star resort project in Shillong.', 'In_Progress', 'Contact Form', '2026-08-22 16:26:38')
ON DUPLICATE KEY UPDATE `status` = VALUES(`status`);
INSERT INTO `enquiries` (`id`, `name`, `email`, `phone`, `subject`, `message`, `status`, `source`, `created_at`)
VALUES ('792a28b0-8dc5-4b8a-a6e6-660852dab6ab', 'Aditya Birla Atelier Group', 'procurement@adityabirla.com', '+91 22 6600 0000', 'Hospitality Procurement Commission', 'Seeking specification deck for upcoming 5-star resort project in Shillong.', 'In_Progress', 'Contact Form', '2026-08-22 16:28:11')
ON DUPLICATE KEY UPDATE `status` = VALUES(`status`);
INSERT INTO `enquiries` (`id`, `name`, `email`, `phone`, `subject`, `message`, `status`, `source`, `created_at`)
VALUES ('712b8470-0370-4777-a6e9-6cfdf135c984', 'Aditya Birla Atelier Group', 'procurement@adityabirla.com', '+91 22 6600 0000', 'Hospitality Procurement Commission', 'Seeking specification deck for upcoming 5-star resort project in Shillong.', 'In_Progress', 'Contact Form', '2026-08-22 16:50:57')
ON DUPLICATE KEY UPDATE `status` = VALUES(`status`);
INSERT INTO `enquiries` (`id`, `name`, `email`, `phone`, `subject`, `message`, `status`, `source`, `created_at`)
VALUES ('35e74ae2-93b3-4142-94e4-d37aee853507', 'Aditya Birla Atelier Group', 'procurement@adityabirla.com', '+91 22 6600 0000', 'Hospitality Procurement Commission', 'Seeking specification deck for upcoming 5-star resort project in Shillong.', 'In_Progress', 'Contact Form', '2026-08-22 17:06:33')
ON DUPLICATE KEY UPDATE `status` = VALUES(`status`);
INSERT INTO `enquiries` (`id`, `name`, `email`, `phone`, `subject`, `message`, `status`, `source`, `created_at`)
VALUES ('7b72937d-6fb0-4c22-a129-06655a4eb3f3', 'Aditya Birla Atelier Group', 'procurement@adityabirla.com', '+91 22 6600 0000', 'Hospitality Procurement Commission', 'Seeking specification deck for upcoming 5-star resort project in Shillong.', 'In_Progress', 'Contact Form', '2026-08-23 10:38:44')
ON DUPLICATE KEY UPDATE `status` = VALUES(`status`);
INSERT INTO `enquiries` (`id`, `name`, `email`, `phone`, `subject`, `message`, `status`, `source`, `created_at`)
VALUES ('d793de2f-37f0-493c-b505-294e7ad10851', 'Aditya Birla Atelier Group', 'procurement@adityabirla.com', '+91 22 6600 0000', 'Hospitality Procurement Commission', 'Seeking specification deck for upcoming 5-star resort project in Shillong.', 'In_Progress', 'Contact Form', '2026-08-23 10:55:11')
ON DUPLICATE KEY UPDATE `status` = VALUES(`status`);
INSERT INTO `enquiries` (`id`, `name`, `email`, `phone`, `subject`, `message`, `status`, `source`, `created_at`)
VALUES ('445ba49a-44a7-491c-9a96-02f7a1feef37', 'Aditya Birla Atelier Group', 'procurement@adityabirla.com', '+91 22 6600 0000', 'Hospitality Procurement Commission', 'Seeking specification deck for upcoming 5-star resort project in Shillong.', 'In_Progress', 'Contact Form', '2026-08-23 12:41:05')
ON DUPLICATE KEY UPDATE `status` = VALUES(`status`);
INSERT INTO `enquiries` (`id`, `name`, `email`, `phone`, `subject`, `message`, `status`, `source`, `created_at`)
VALUES ('7f2fee7c-3f5e-4411-af18-87e0358445ad', 'Aditya Birla Atelier Group', 'procurement@adityabirla.com', '+91 22 6600 0000', 'Hospitality Procurement Commission', 'Seeking specification deck for upcoming 5-star resort project in Shillong.', 'In_Progress', 'Contact Form', '2026-08-23 12:48:59')
ON DUPLICATE KEY UPDATE `status` = VALUES(`status`);
INSERT INTO `enquiries` (`id`, `name`, `email`, `phone`, `subject`, `message`, `status`, `source`, `created_at`)
VALUES ('ba95e702-15bd-4693-b1c9-94f9786e4f1c', 'Aditya Birla Atelier Group', 'procurement@adityabirla.com', '+91 22 6600 0000', 'Hospitality Procurement Commission', 'Seeking specification deck for upcoming 5-star resort project in Shillong.', 'In_Progress', 'Contact Form', '2026-08-23 13:02:26')
ON DUPLICATE KEY UPDATE `status` = VALUES(`status`);
INSERT INTO `enquiries` (`id`, `name`, `email`, `phone`, `subject`, `message`, `status`, `source`, `created_at`)
VALUES ('bf4014a9-c74e-46f3-95cf-fc0928bb65b6', 'Aditya Birla Atelier Group', 'procurement@adityabirla.com', '+91 22 6600 0000', 'Hospitality Procurement Commission', 'Seeking specification deck for upcoming 5-star resort project in Shillong.', 'In_Progress', 'Contact Form', '2026-08-23 13:13:06')
ON DUPLICATE KEY UPDATE `status` = VALUES(`status`);
INSERT INTO `enquiries` (`id`, `name`, `email`, `phone`, `subject`, `message`, `status`, `source`, `created_at`)
VALUES ('f8f4e39c-fab2-40ac-9618-88ec1bed0781', 'Aditya Birla Atelier Group', 'procurement@adityabirla.com', '+91 22 6600 0000', 'Hospitality Procurement Commission', 'Seeking specification deck for upcoming 5-star resort project in Shillong.', 'In_Progress', 'Contact Form', '2026-08-23 15:08:47')
ON DUPLICATE KEY UPDATE `status` = VALUES(`status`);

-- ============================================================
-- DATA: SITE SETTINGS (from Supabase)
-- ============================================================
INSERT INTO `site_settings` (`id`, `key`, `value`, `raw_json`, `brand_name`, `tagline`, `contact_email`, `contact_phone`, `whatsapp_number`, `studio_address`, `gstin_number`, `currency`, `currency_symbol`, `tax_rate_percent`, `standard_shipping_fee`, `free_shipping_threshold`, `homepage`, `payment_gateway`)
VALUES ('global', 'general', '{\"city\":\"Guwahati\",\"state\":\"Assam\",\"country\":\"India\",\"logoUrl\":\"/logo.png\",\"pincode\":\"781040\",\"tagline\":\"Crafted spaces, luxury architecture, and considered materials for timeless living.\",\"currency\":\"INR\",\"homepage\":{\"ctaBtnLink\":\"/quote\",\"ctaBtnText\":\"Request Consultation & Quote\",\"ctaHeading\":\"Commission an Architectural Dialogue\",\"stat1Label\":\"Years of Practice\",\"stat1Value\":\"14+\",\"stat2Label\":\"Signature Spaces\",\"stat2Value\":\"180+\",\"stat3Label\":\"Direct Material Provenance\",\"stat3Value\":\"100\%\",\"heroEyebrow\":\"Architecture • Interior Studio • Material Curation\",\"trustBadge1\":\"★ 5.0 (22 Google Reviews)\",\"trustBadge2\":\"Guwahati Studio Office\",\"trustBadge3\":\"Turnkey Architecture\",\"trustBadge4\":\"Pan-India Material Logistics\",\"heroImageUrl\":\"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=90\",\"introEyebrow\":\"The Atelier Philosophy\",\"introHeading\":\"Restraint is the ultimate form of luxury.\",\"introImageUrl\":\"https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80\",\"ctaDescription\":\"Whether envisioning a private residential estate, bespoke commercial headquarters, or seeking curated architectural materials, our studio welcomes your consultation.\",\"heroDescription\":\"Crafted spaces and considered materials for timeless living. Uniting spatial architecture with a curated marketplace of authentic stones, woods, and architectural accents.\",\"introParagraph1\":\"Founded on the belief that genuine luxury emerges from architectural precision, raw material integrity, and spatial calm, Balaji Architect & Interiors crafts environments that elevate the human experience.\",\"introParagraph2\":\"Beyond architectural commissions, we maintain direct partnerships with heritage European quarries and timber ateliers, making authentic vein-cut travertines, smoked French oaks, and acoustic wall systems directly available to discerning architects and homeowners.\",\"heroHeadingLine1\":\"INTERIORS.\",\"heroHeadingLine2\":\"ARCHITECTURE.\",\"heroHeadingLine3\":\"MATERIALS.\",\"heroPrimaryBtnLink\":\"/projects\",\"heroPrimaryBtnText\":\"Explore Projects\",\"heroSecondaryBtnLink\":\"/materials\",\"heroSecondaryBtnText\":\"Explore Materials\"},\"whatsapp\":{\"enabled\":true,\"position\":\"bottom-right\",\"phoneNumber\":\"+91 6003869588\",\"tooltipText\":\"Chat with Atelier Vikas Sir\",\"showOnMobile\":true,\"showOnDesktop\":true,\"defaultMessage\":\"Hello Balaji Architect & Interiors, I would like to inquire about architectural and interior design services for my project.\",\"displayDelayMs\":800},\"brandName\":\"BALAJI\",\"updatedAt\":\"2026-08-23T15:42:52.104Z\",\"studioName\":\"Balaji Architect & Interior\",\"gstinNumber\":\"18AAECB4848F1ZX\",\"contactEmail\":\"atelier@balaji-interior.com\",\"contactPhone\":\"+91 70029 48484\",\"googleRating\":\"★ 5.0 (22 Google Reviews)\",\"supportEmail\":\"atelier@balaji-interior.com\",\"supportPhone\":\"+91 70029 48484\",\"architectName\":\"Vikas Sir (Principal Architect)\",\"brandSubtitle\":\"ARCHITECTURE • INTERIORS • MATERIALS\",\"businessHours\":\"Mon - Sat: 10:00 AM - 7:00 PM (IST)\",\"minOrderValue\":0,\"studioAddress\":\"Door No. 306, DN TOWER, Floor No. 03, Beltola Tiniali, Guwahati, Assam 781040\",\"currencySymbol\":\"₹\",\"paymentGateway\":{\"upiId\":\"9828869588@hdfc\",\"enabled\":true,\"enableBhim\":true,\"enableCred\":true,\"enableGPay\":true,\"methodName\":\"Balaji QR Payment\",\"requireUtr\":true,\"enablePaytm\":true,\"gatewayName\":\"Balaji PG\",\"instructions\":\"1. Open any UPI app (GPay, PhonePe, Paytm, BHIM, Cred, Amazon Pay).\\n2. Scan the dynamic Balaji QR code or select your preferred app below.\\n3. Verify payee \\\"Balaji Architect & Interiors\\\" and exact amount.\\n4. Complete payment and enter the 12-digit UPI Reference / UTR Number to confirm your order.\",\"merchantName\":\"Balaji Architect & Interiors\",\"enablePhonePe\":true,\"enableAmazonPay\":true,\"qrExpiryMinutes\":10},\"socialFacebook\":\"https://facebook.com/balajiarchitects\",\"socialLinkedin\":\"https://linkedin.com/company/balaji-atelier\",\"taxRatePercent\":18,\"whatsappNumber\":\"+91 6003869588\",\"establishedYear\":\"2014\",\"socialInstagram\":\"https://instagram.com/balajiatelier\",\"socialPinterest\":\"https://pinterest.com/balajiatelier\",\"announcementBanner\":{\"text\":\"Balaji Atelier: Curated Architectural Materials & Turnkey Solutions\",\"enabled\":true,\"linkUrl\":\"/materials\"},\"portfolioAnimation\":{\"enabled\":true,\"maxProjects\":6,\"speedPreset\":\"fast\",\"sectionHeading\":\"Selected Works\",\"parallaxIntensity\":\"medium\",\"sectionSubheading\":\"Architectural Signatures\"},\"standardShippingFee\":1800,\"freeShippingThreshold\":50000}', '{\"city\":\"Guwahati\",\"state\":\"Assam\",\"country\":\"India\",\"logoUrl\":\"/logo.png\",\"pincode\":\"781040\",\"tagline\":\"Crafted spaces, luxury architecture, and considered materials for timeless living.\",\"currency\":\"INR\",\"homepage\":{\"ctaBtnLink\":\"/quote\",\"ctaBtnText\":\"Request Consultation & Quote\",\"ctaHeading\":\"Commission an Architectural Dialogue\",\"stat1Label\":\"Years of Practice\",\"stat1Value\":\"14+\",\"stat2Label\":\"Signature Spaces\",\"stat2Value\":\"180+\",\"stat3Label\":\"Direct Material Provenance\",\"stat3Value\":\"100\%\",\"heroEyebrow\":\"Architecture • Interior Studio • Material Curation\",\"trustBadge1\":\"★ 5.0 (22 Google Reviews)\",\"trustBadge2\":\"Guwahati Studio Office\",\"trustBadge3\":\"Turnkey Architecture\",\"trustBadge4\":\"Pan-India Material Logistics\",\"heroImageUrl\":\"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=90\",\"introEyebrow\":\"The Atelier Philosophy\",\"introHeading\":\"Restraint is the ultimate form of luxury.\",\"introImageUrl\":\"https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80\",\"ctaDescription\":\"Whether envisioning a private residential estate, bespoke commercial headquarters, or seeking curated architectural materials, our studio welcomes your consultation.\",\"heroDescription\":\"Crafted spaces and considered materials for timeless living. Uniting spatial architecture with a curated marketplace of authentic stones, woods, and architectural accents.\",\"introParagraph1\":\"Founded on the belief that genuine luxury emerges from architectural precision, raw material integrity, and spatial calm, Balaji Architect & Interiors crafts environments that elevate the human experience.\",\"introParagraph2\":\"Beyond architectural commissions, we maintain direct partnerships with heritage European quarries and timber ateliers, making authentic vein-cut travertines, smoked French oaks, and acoustic wall systems directly available to discerning architects and homeowners.\",\"heroHeadingLine1\":\"INTERIORS.\",\"heroHeadingLine2\":\"ARCHITECTURE.\",\"heroHeadingLine3\":\"MATERIALS.\",\"heroPrimaryBtnLink\":\"/projects\",\"heroPrimaryBtnText\":\"Explore Projects\",\"heroSecondaryBtnLink\":\"/materials\",\"heroSecondaryBtnText\":\"Explore Materials\"},\"whatsapp\":{\"enabled\":true,\"position\":\"bottom-right\",\"phoneNumber\":\"+91 6003869588\",\"tooltipText\":\"Chat with Atelier Vikas Sir\",\"showOnMobile\":true,\"showOnDesktop\":true,\"defaultMessage\":\"Hello Balaji Architect & Interiors, I would like to inquire about architectural and interior design services for my project.\",\"displayDelayMs\":800},\"brandName\":\"BALAJI\",\"updatedAt\":\"2026-08-23T15:42:52.104Z\",\"studioName\":\"Balaji Architect & Interior\",\"gstinNumber\":\"18AAECB4848F1ZX\",\"contactEmail\":\"atelier@balaji-interior.com\",\"contactPhone\":\"+91 70029 48484\",\"googleRating\":\"★ 5.0 (22 Google Reviews)\",\"supportEmail\":\"atelier@balaji-interior.com\",\"supportPhone\":\"+91 70029 48484\",\"architectName\":\"Vikas Sir (Principal Architect)\",\"brandSubtitle\":\"ARCHITECTURE • INTERIORS • MATERIALS\",\"businessHours\":\"Mon - Sat: 10:00 AM - 7:00 PM (IST)\",\"minOrderValue\":0,\"studioAddress\":\"Door No. 306, DN TOWER, Floor No. 03, Beltola Tiniali, Guwahati, Assam 781040\",\"currencySymbol\":\"₹\",\"paymentGateway\":{\"upiId\":\"9828869588@hdfc\",\"enabled\":true,\"enableBhim\":true,\"enableCred\":true,\"enableGPay\":true,\"methodName\":\"Balaji QR Payment\",\"requireUtr\":true,\"enablePaytm\":true,\"gatewayName\":\"Balaji PG\",\"instructions\":\"1. Open any UPI app (GPay, PhonePe, Paytm, BHIM, Cred, Amazon Pay).\\n2. Scan the dynamic Balaji QR code or select your preferred app below.\\n3. Verify payee \\\"Balaji Architect & Interiors\\\" and exact amount.\\n4. Complete payment and enter the 12-digit UPI Reference / UTR Number to confirm your order.\",\"merchantName\":\"Balaji Architect & Interiors\",\"enablePhonePe\":true,\"enableAmazonPay\":true,\"qrExpiryMinutes\":10},\"socialFacebook\":\"https://facebook.com/balajiarchitects\",\"socialLinkedin\":\"https://linkedin.com/company/balaji-atelier\",\"taxRatePercent\":18,\"whatsappNumber\":\"+91 6003869588\",\"establishedYear\":\"2014\",\"socialInstagram\":\"https://instagram.com/balajiatelier\",\"socialPinterest\":\"https://pinterest.com/balajiatelier\",\"announcementBanner\":{\"text\":\"Balaji Atelier: Curated Architectural Materials & Turnkey Solutions\",\"enabled\":true,\"linkUrl\":\"/materials\"},\"portfolioAnimation\":{\"enabled\":true,\"maxProjects\":6,\"speedPreset\":\"fast\",\"sectionHeading\":\"Selected Works\",\"parallaxIntensity\":\"medium\",\"sectionSubheading\":\"Architectural Signatures\"},\"standardShippingFee\":1800,\"freeShippingThreshold\":50000}', 'BALAJI', 'Crafted spaces, luxury architecture, and considered materials for timeless living.', 'atelier@balaji-interior.com', '+91 70029 48484', '+91 6003869588', 'Door No. 306, DN TOWER, Floor No. 03, Beltola Tiniali, Guwahati, Assam 781040', '18AAECB4848F1ZX', 'INR', '₹', 18, 1800, 50000, '{\"ctaBtnLink\":\"/quote\",\"ctaBtnText\":\"Request Consultation & Quote\",\"ctaHeading\":\"Commission an Architectural Dialogue\",\"stat1Label\":\"Years of Practice\",\"stat1Value\":\"14+\",\"stat2Label\":\"Signature Spaces\",\"stat2Value\":\"180+\",\"stat3Label\":\"Direct Material Provenance\",\"stat3Value\":\"100\%\",\"heroEyebrow\":\"Architecture • Interior Studio • Material Curation\",\"trustBadge1\":\"★ 5.0 (22 Google Reviews)\",\"trustBadge2\":\"Guwahati Studio Office\",\"trustBadge3\":\"Turnkey Architecture\",\"trustBadge4\":\"Pan-India Material Logistics\",\"heroImageUrl\":\"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=90\",\"introEyebrow\":\"The Atelier Philosophy\",\"introHeading\":\"Restraint is the ultimate form of luxury.\",\"introImageUrl\":\"https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80\",\"ctaDescription\":\"Whether envisioning a private residential estate, bespoke commercial headquarters, or seeking curated architectural materials, our studio welcomes your consultation.\",\"heroDescription\":\"Crafted spaces and considered materials for timeless living. Uniting spatial architecture with a curated marketplace of authentic stones, woods, and architectural accents.\",\"introParagraph1\":\"Founded on the belief that genuine luxury emerges from architectural precision, raw material integrity, and spatial calm, Balaji Architect & Interiors crafts environments that elevate the human experience.\",\"introParagraph2\":\"Beyond architectural commissions, we maintain direct partnerships with heritage European quarries and timber ateliers, making authentic vein-cut travertines, smoked French oaks, and acoustic wall systems directly available to discerning architects and homeowners.\",\"heroHeadingLine1\":\"INTERIORS.\",\"heroHeadingLine2\":\"ARCHITECTURE.\",\"heroHeadingLine3\":\"MATERIALS.\",\"heroPrimaryBtnLink\":\"/projects\",\"heroPrimaryBtnText\":\"Explore Projects\",\"heroSecondaryBtnLink\":\"/materials\",\"heroSecondaryBtnText\":\"Explore Materials\"}', '{\"upiId\":\"9828869588@hdfc\",\"enabled\":true,\"enableBhim\":true,\"enableCred\":true,\"enableGPay\":true,\"methodName\":\"Balaji QR Payment\",\"requireUtr\":true,\"enablePaytm\":true,\"gatewayName\":\"Balaji PG\",\"instructions\":\"1. Open any UPI app (GPay, PhonePe, Paytm, BHIM, Cred, Amazon Pay).\\n2. Scan the dynamic Balaji QR code or select your preferred app below.\\n3. Verify payee \\\"Balaji Architect & Interiors\\\" and exact amount.\\n4. Complete payment and enter the 12-digit UPI Reference / UTR Number to confirm your order.\",\"merchantName\":\"Balaji Architect & Interiors\",\"enablePhonePe\":true,\"enableAmazonPay\":true,\"qrExpiryMinutes\":10}')
ON DUPLICATE KEY UPDATE `value` = VALUES(`value`), `raw_json` = VALUES(`raw_json`), `brand_name` = VALUES(`brand_name`);

-- ============================================================
-- DATA: AUDIT LOGS (165 from Supabase)
-- ============================================================
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('59cc8d02-e6ca-4630-9976-244ddbf0e7b0', NULL, 'checkout@balaji.com', 'ORDER_PLACED', 'Order', '517ba6f6-1709-4b7b-a180-f1187b5461c6', '{\"total\":3388,\"itemsCount\":1,\"orderNumber\":\"BAL-955168-952\"}', NULL, '2026-08-19 15:39:11')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('8aa0f30c-e409-40f0-bf40-7568182711cd', NULL, 'checkout@balaji.com', 'ORDER_PLACED', 'Order', 'c8bd89f0-248c-47a2-a843-74e6be7d8c3c', '{\"total\":2255,\"itemsCount\":1,\"orderNumber\":\"BAL-008709-599\"}', NULL, '2026-08-19 15:56:45')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('eeba89e6-23da-4448-9662-51e3fb71e08a', NULL, 'checkout@balaji.com', 'ORDER_PLACED', 'Order', '569ea2ff-1178-4aed-b7fb-a497b45200b3', '{\"total\":92040,\"itemsCount\":1,\"orderNumber\":\"BAL-515459-176\"}', NULL, '2026-08-19 16:05:16')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('6fc66c06-d015-4e61-9603-fe3154137012', NULL, 'checkout@balaji.com', 'ORDER_PLACED', 'Order', 'b9b82dd1-0c8e-4fd0-b298-63cecfd89b77', '{\"total\":2255,\"itemsCount\":1,\"orderNumber\":\"BAL-963198-252\"}', NULL, '2026-08-19 16:29:19')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('4b5500d4-c7a2-498a-bf29-f635f23c6adf', '2bd20632-00dd-4f48-84b4-6e526543c8d8', 'vicks@balaji.com', 'MASTER_VERIFICATION_COMPLETE', 'System', NULL, '{\"passedTests\":27}', NULL, '2026-08-19 16:29:23')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('1ac31c90-2814-4e44-a5ef-9d6cbba91bf0', NULL, 'checkout@balaji.com', 'ORDER_PLACED', 'Order', '72033b2f-a238-435b-ae62-38b93af792fd', '{\"total\":1878,\"itemsCount\":1,\"orderNumber\":\"BAL-753371-326\"}', NULL, '2026-08-19 16:42:29')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('b909fe59-5862-41c2-a953-0c8303a927e8', '2bd20632-00dd-4f48-84b4-6e526543c8d8', 'vicks@balaji.com', 'PRODUCTION_AUDIT_VERIFIED', 'System', NULL, '{\"timestamp\":\"2026-08-19T16:42:38.889Z\"}', NULL, '2026-08-19 16:42:34')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('47c9140f-818c-45e3-8e18-1cd4b5f3d18f', '2bd20632-00dd-4f48-84b4-6e526543c8d8', 'vicks@balaji.com', 'PRODUCTION_VERIFICATION_COMPLETE', 'System', NULL, '{\"passCount\":31}', NULL, '2026-08-19 16:50:18')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('66852ab2-23a9-407c-89f3-6f51d4b08155', NULL, 'vicks@balaji.com', 'SITE_SETTINGS_UPDATED', 'SiteSettings', NULL, '{\"modifiedKeys\":[\"brandName\",\"tagline\",\"logoUrl\",\"contactEmail\",\"contactPhone\",\"studioAddress\",\"city\",\"state\",\"country\",\"pincode\",\"currency\",\"currencySymbol\",\"taxRatePercent\",\"standardShippingFee\",\"freeShippingThreshold\",\"socialInstagram\",\"socialPinterest\",\"socialLinkedin\",\"announcementBanner\",\"updatedAt\",\"studioName\",\"supportEmail\",\"supportPhone\"]}', NULL, '2026-08-19 17:00:47')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('d67fed7a-7364-4350-b179-603eeb1d9711', '2bd20632-00dd-4f48-84b4-6e526543c8d8', 'vicks@balaji.com', 'ADMIN_LOGIN_SUCCESS', 'Auth', '2bd20632-00dd-4f48-84b4-6e526543c8d8', '{\"mustChangePassword\":false}', NULL, '2026-08-19 17:03:21')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('66b98a86-c407-4a80-9053-13eb66573e03', '2bd20632-00dd-4f48-84b4-6e526543c8d8', 'vicks@balaji.com', 'ADMIN_LOGIN_SUCCESS', 'Auth', '2bd20632-00dd-4f48-84b4-6e526543c8d8', '{\"mustChangePassword\":false}', NULL, '2026-08-21 12:07:51')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('de4b21f4-1b42-47ba-9880-852b1eee9e1e', '2bd20632-00dd-4f48-84b4-6e526543c8d8', 'vicks@balaji.com', 'SITE_SETTINGS_UPDATED', 'SiteSettings', NULL, '{\"modifiedKeys\":[\"brandName\",\"tagline\",\"logoUrl\",\"contactEmail\",\"contactPhone\",\"studioAddress\",\"city\",\"state\",\"country\",\"pincode\",\"currency\",\"currencySymbol\",\"taxRatePercent\",\"standardShippingFee\",\"freeShippingThreshold\",\"socialInstagram\",\"socialPinterest\",\"socialLinkedin\",\"announcementBanner\",\"updatedAt\",\"studioName\",\"supportEmail\",\"supportPhone\"]}', NULL, '2026-08-21 12:08:06')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('e2d47d27-41e2-4d92-a223-bfbb9e437d15', '2bd20632-00dd-4f48-84b4-6e526543c8d8', 'vicks@balaji.com', 'STUDIO_SETTINGS_TEST_1787314883668', 'SiteSettings', NULL, '{\"timestamp\":\"2026-08-21T12:21:23.668Z\",\"modifiedFields\":[\"brandName\",\"tagline\",\"architectName\",\"establishedYear\",\"googleRating\",\"contactEmail\",\"contactPhone\",\"whatsappNumber\",\"businessHours\",\"studioAddress\",\"city\",\"state\",\"country\",\"pincode\",\"currency\",\"currencySymbol\",\"taxRatePercent\",\"standardShippingFee\",\"freeShippingThreshold\",\"gstinNumber\",\"minOrderValue\",\"socialInstagram\",\"socialPinterest\",\"socialLinkedin\",\"socialFacebook\",\"announcementBanner\"]}', NULL, '2026-08-21 12:21:18')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('c3f7541b-f0d7-4dde-af1c-67725ce37ef0', '2bd20632-00dd-4f48-84b4-6e526543c8d8', 'vicks@balaji.com', 'SITE_SETTINGS_UPDATED', 'SiteSettings', NULL, '{\"brandName\":\"Balaji Architect\",\"modifiedKeys\":[\"brandName\",\"tagline\",\"architectName\",\"establishedYear\",\"googleRating\",\"logoUrl\",\"contactEmail\",\"contactPhone\",\"whatsappNumber\",\"businessHours\",\"studioAddress\",\"city\",\"state\",\"country\",\"pincode\",\"currency\",\"currencySymbol\",\"taxRatePercent\",\"standardShippingFee\",\"freeShippingThreshold\",\"gstinNumber\",\"minOrderValue\",\"socialInstagram\",\"socialPinterest\",\"socialLinkedin\",\"socialFacebook\",\"announcementBanner\",\"updatedAt\",\"studioName\",\"supportEmail\",\"supportPhone\"]}', NULL, '2026-08-21 12:25:12')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('a6adc2d9-5d43-49cc-ab61-7882a7abd7d9', '2bd20632-00dd-4f48-84b4-6e526543c8d8', 'vicks@balaji.com', 'SITE_SETTINGS_UPDATED', 'SiteSettings', NULL, '{\"brandName\":\"BALAJI ARCHITECT\",\"modifiedKeys\":[\"brandName\",\"brandSubtitle\",\"tagline\",\"architectName\",\"establishedYear\",\"googleRating\",\"logoUrl\",\"contactEmail\",\"contactPhone\",\"whatsappNumber\",\"businessHours\",\"studioAddress\",\"city\",\"state\",\"country\",\"pincode\",\"currency\",\"currencySymbol\",\"taxRatePercent\",\"standardShippingFee\",\"freeShippingThreshold\",\"gstinNumber\",\"minOrderValue\",\"socialInstagram\",\"socialPinterest\",\"socialLinkedin\",\"socialFacebook\",\"announcementBanner\",\"homepage\",\"paymentGateway\",\"updatedAt\",\"studioName\",\"supportEmail\",\"supportPhone\"]}', NULL, '2026-08-21 13:54:42')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('b138a618-55d8-45b6-be7f-067b033673c4', '2bd20632-00dd-4f48-84b4-6e526543c8d8', 'vicks@balaji.com', 'SITE_SETTINGS_UPDATED', 'SiteSettings', NULL, '{\"brandName\":\"BALAJI ARCHITECT\",\"modifiedKeys\":[\"brandName\",\"brandSubtitle\",\"tagline\",\"architectName\",\"establishedYear\",\"googleRating\",\"logoUrl\",\"contactEmail\",\"contactPhone\",\"whatsappNumber\",\"businessHours\",\"studioAddress\",\"city\",\"state\",\"country\",\"pincode\",\"currency\",\"currencySymbol\",\"taxRatePercent\",\"standardShippingFee\",\"freeShippingThreshold\",\"gstinNumber\",\"minOrderValue\",\"socialInstagram\",\"socialPinterest\",\"socialLinkedin\",\"socialFacebook\",\"announcementBanner\",\"homepage\",\"paymentGateway\",\"updatedAt\",\"studioName\",\"supportEmail\",\"supportPhone\"]}', NULL, '2026-08-21 14:00:54')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('e1e16892-220b-4da9-8b73-b2200b6b8efd', '2bd20632-00dd-4f48-84b4-6e526543c8d8', 'vicks@balaji.com', 'PRODUCT_UPDATED', 'Product', '11852dc1-cba7-4003-81be-cbd4c44b548e', '{\"modifiedKeys\":[\"name\",\"sku\",\"brand\",\"categoryId\",\"subcategory\",\"description\",\"price\",\"unit\",\"moq\",\"stock\",\"purchaseMode\",\"leadTime\",\"dimensions\",\"thickness\",\"material\",\"finish\",\"images\",\"published\",\"isFeatured\"]}', NULL, '2026-08-21 14:09:56')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('b9565f27-6ced-4cc7-babb-d5665c4044f9', '2bd20632-00dd-4f48-84b4-6e526543c8d8', 'vicks@balaji.com', 'PRODUCT_UPDATED', 'Product', '11852dc1-cba7-4003-81be-cbd4c44b548e', '{\"modifiedKeys\":[\"name\",\"sku\",\"brand\",\"categoryId\",\"subcategory\",\"description\",\"price\",\"unit\",\"moq\",\"stock\",\"purchaseMode\",\"leadTime\",\"dimensions\",\"thickness\",\"material\",\"finish\",\"images\",\"published\",\"isFeatured\"]}', NULL, '2026-08-21 14:10:32')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('74374f17-a4b5-4d22-a24a-7a8f948a3cfb', '2bd20632-00dd-4f48-84b4-6e526543c8d8', 'vicks@balaji.com', 'SITE_SETTINGS_UPDATED', 'SiteSettings', NULL, '{\"brandName\":\"BALAJI ARCHITECT\",\"modifiedKeys\":[\"brandName\",\"brandSubtitle\",\"tagline\",\"architectName\",\"establishedYear\",\"googleRating\",\"logoUrl\",\"contactEmail\",\"contactPhone\",\"whatsappNumber\",\"businessHours\",\"studioAddress\",\"city\",\"state\",\"country\",\"pincode\",\"currency\",\"currencySymbol\",\"taxRatePercent\",\"standardShippingFee\",\"freeShippingThreshold\",\"gstinNumber\",\"minOrderValue\",\"socialInstagram\",\"socialPinterest\",\"socialLinkedin\",\"socialFacebook\",\"announcementBanner\",\"homepage\",\"paymentGateway\",\"updatedAt\",\"studioName\",\"supportEmail\",\"supportPhone\"]}', NULL, '2026-08-21 14:27:58')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('4f3ce6e7-9a31-4a80-9026-a8f025f0d46d', '2bd20632-00dd-4f48-84b4-6e526543c8d8', 'vicks@balaji.com', 'SITE_SETTINGS_UPDATED', 'SiteSettings', NULL, '{\"brandName\":\"BALAJI\",\"modifiedKeys\":[\"brandName\",\"brandSubtitle\",\"tagline\",\"architectName\",\"establishedYear\",\"googleRating\",\"logoUrl\",\"contactEmail\",\"contactPhone\",\"whatsappNumber\",\"businessHours\",\"studioAddress\",\"city\",\"state\",\"country\",\"pincode\",\"currency\",\"currencySymbol\",\"taxRatePercent\",\"standardShippingFee\",\"freeShippingThreshold\",\"gstinNumber\",\"minOrderValue\",\"socialInstagram\",\"socialPinterest\",\"socialLinkedin\",\"socialFacebook\",\"announcementBanner\",\"homepage\",\"paymentGateway\",\"updatedAt\",\"studioName\",\"supportEmail\",\"supportPhone\"]}', NULL, '2026-08-21 14:33:38')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('b7aacc3c-2c68-4d71-a7fb-583a647a8f72', '2bd20632-00dd-4f48-84b4-6e526543c8d8', 'vicks@balaji.com', 'EMPLOYEE_CREATED', 'Admin', '88584227-5407-40cc-9093-a7c0b0651f35', '{\"name\":\"Rohan Talukdar\",\"role\":\"employee\",\"email\":\"staff-0654@balaji.com\"}', NULL, '2026-08-22 11:22:54')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('66ff7e43-52c0-4d3c-b54b-185c21273dcc', '2bd20632-00dd-4f48-84b4-6e526543c8d8', 'vicks@balaji.com', 'EMPLOYEE_UPDATED', 'Admin', '88584227-5407-40cc-9093-a7c0b0651f35', '{\"updates\":{\"name\":\"Rohan Talukdar (Senior Draftsman)\"},\"previousRole\":\"employee\",\"previousStatus\":\"active\"}', NULL, '2026-08-22 11:22:55')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('798f1891-9f73-4020-b051-6a9ea23ae429', '2bd20632-00dd-4f48-84b4-6e526543c8d8', 'vicks@balaji.com', 'EMPLOYEE_DISABLED', 'Admin', '88584227-5407-40cc-9093-a7c0b0651f35', '{\"updates\":{\"status\":\"disabled\"},\"previousRole\":\"employee\",\"previousStatus\":\"active\"}', NULL, '2026-08-22 11:22:55')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('22ad97ea-7845-48f1-b05f-31b8a50d217d', '2bd20632-00dd-4f48-84b4-6e526543c8d8', 'vicks@balaji.com', 'EMPLOYEE_ENABLED', 'Admin', '88584227-5407-40cc-9093-a7c0b0651f35', '{\"updates\":{\"status\":\"active\"},\"previousRole\":\"employee\",\"previousStatus\":\"disabled\"}', NULL, '2026-08-22 11:22:56')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('83e25683-da86-4720-91c2-4733fc72a9d6', '2bd20632-00dd-4f48-84b4-6e526543c8d8', 'vicks@balaji.com', 'EMPLOYEE_PASSWORD_RESET', 'Admin', '88584227-5407-40cc-9093-a7c0b0651f35', '{\"employeeName\":\"Rohan Talukdar (Senior Draftsman)\",\"employeeEmail\":\"staff-0654@balaji.com\"}', NULL, '2026-08-22 11:22:57')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('79347172-2d8d-45ab-bd0f-0aa10801b82f', '2bd20632-00dd-4f48-84b4-6e526543c8d8', 'vicks@balaji.com', 'EMPLOYEE_DELETED', 'Admin', '88584227-5407-40cc-9093-a7c0b0651f35', '{\"deletedName\":\"Rohan Talukdar (Senior Draftsman)\",\"deletedEmail\":\"staff-0654@balaji.com\"}', NULL, '2026-08-22 11:22:58')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('fb855ec1-4d26-4d48-be9b-c01afdf625da', '2bd20632-00dd-4f48-84b4-6e526543c8d8', 'vicks@balaji.com', 'EMPLOYEE_CREATED', 'Admin', '19cb22cc-3c75-4867-8878-acdb985c044b', '{\"name\":\"Rohan Talukdar\",\"role\":\"employee\",\"email\":\"staff-3615@balaji.com\"}', NULL, '2026-08-22 11:23:17')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('16bdb592-910d-490e-9b70-30812806477a', '2bd20632-00dd-4f48-84b4-6e526543c8d8', 'vicks@balaji.com', 'EMPLOYEE_UPDATED', 'Admin', '19cb22cc-3c75-4867-8878-acdb985c044b', '{\"updates\":{\"name\":\"Rohan Talukdar (Senior Draftsman)\"},\"previousRole\":\"employee\",\"previousStatus\":\"active\"}', NULL, '2026-08-22 11:23:18')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('f3674b65-7acc-4942-aec2-118be384698f', '2bd20632-00dd-4f48-84b4-6e526543c8d8', 'vicks@balaji.com', 'EMPLOYEE_DISABLED', 'Admin', '19cb22cc-3c75-4867-8878-acdb985c044b', '{\"updates\":{\"status\":\"disabled\"},\"previousRole\":\"employee\",\"previousStatus\":\"active\"}', NULL, '2026-08-22 11:23:19')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('1e1eff9c-eaea-4032-bfee-26608650a13f', '2bd20632-00dd-4f48-84b4-6e526543c8d8', 'vicks@balaji.com', 'EMPLOYEE_ENABLED', 'Admin', '19cb22cc-3c75-4867-8878-acdb985c044b', '{\"updates\":{\"status\":\"active\"},\"previousRole\":\"employee\",\"previousStatus\":\"disabled\"}', NULL, '2026-08-22 11:23:20')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('6eb15dd1-5473-4854-ba4a-9707c24566c3', '2bd20632-00dd-4f48-84b4-6e526543c8d8', 'vicks@balaji.com', 'EMPLOYEE_PASSWORD_RESET', 'Admin', '19cb22cc-3c75-4867-8878-acdb985c044b', '{\"employeeName\":\"Rohan Talukdar (Senior Draftsman)\",\"employeeEmail\":\"staff-3615@balaji.com\"}', NULL, '2026-08-22 11:23:20')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('478dc3e9-63dc-4d7b-8a21-8c13d0c54415', '2bd20632-00dd-4f48-84b4-6e526543c8d8', 'vicks@balaji.com', 'EMPLOYEE_DELETED', 'Admin', '19cb22cc-3c75-4867-8878-acdb985c044b', '{\"deletedName\":\"Rohan Talukdar (Senior Draftsman)\",\"deletedEmail\":\"staff-3615@balaji.com\"}', NULL, '2026-08-22 11:23:21')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('8f1cae6d-4797-44d6-9e38-d9d864032df7', '2bd20632-00dd-4f48-84b4-6e526543c8d8', 'vicks@balaji.com', 'ORDER_STATUS_UPDATED', 'Order', '569ea2ff-1178-4aed-b7fb-a497b45200b3', '{\"orderStatus\":\"Cancelled\"}', NULL, '2026-08-22 11:59:53')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('9f74a713-1f5d-422d-b8d8-9fe6c397a2cf', '2bd20632-00dd-4f48-84b4-6e526543c8d8', 'vicks@balaji.com', 'ORDER_STATUS_UPDATED', 'Order', 'f22e7bd4-5dd2-44b9-97e6-5be283f63f3b', '{\"orderStatus\":\"Cancelled\"}', NULL, '2026-08-22 11:59:54')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('d5b5aa67-86f5-40a1-a2c2-5633240a02f9', '2bd20632-00dd-4f48-84b4-6e526543c8d8', 'vicks@balaji.com', 'ADMIN_LOGIN_SUCCESS', 'Auth', '2bd20632-00dd-4f48-84b4-6e526543c8d8', '{\"role\":\"owner\",\"mustChangePassword\":false}', NULL, '2026-08-22 16:11:59')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('6ebf669e-f879-4b6f-8dc9-bb11e3bff762', NULL, 'vicks@balaji.com', 'EMPLOYEE_CREATED', 'Admin', 'f172f47b-89a9-431f-ba81-732c51879b00', '{\"name\":\"Arjun Verma\",\"role\":\"employee\",\"email\":\"test.employee.1787415993107@balaji-interior.com\"}', NULL, '2026-08-22 16:26:27')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('031cfbbe-c71c-4b21-b598-7c8a1b3d4d2b', NULL, 'vicks@balaji.com', 'EMPLOYEE_DISABLED', 'Admin', 'f172f47b-89a9-431f-ba81-732c51879b00', '{\"updates\":{\"status\":\"disabled\"},\"previousRole\":\"employee\",\"previousStatus\":\"active\"}', NULL, '2026-08-22 16:26:28')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('f3975ab9-ff04-4f67-8b51-96d7b7b7f076', NULL, 'vicks@balaji.com', 'EMPLOYEE_ENABLED', 'Admin', 'f172f47b-89a9-431f-ba81-732c51879b00', '{\"updates\":{\"status\":\"active\"},\"previousRole\":\"employee\",\"previousStatus\":\"disabled\"}', NULL, '2026-08-22 16:26:29')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('2c7f2cc8-9783-493b-b189-365b3b7a6a4c', NULL, 'vicks@balaji.com', 'EMPLOYEE_PASSWORD_RESET', 'Admin', 'f172f47b-89a9-431f-ba81-732c51879b00', '{\"employeeName\":\"Arjun Verma\",\"employeeEmail\":\"test.employee.1787415993107@balaji-interior.com\"}', NULL, '2026-08-22 16:26:30')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('bb3d8b59-bf6c-41cf-b989-a1b6b5fd063b', NULL, 'vicks@balaji.com', 'EMPLOYEE_DELETED', 'Admin', 'f172f47b-89a9-431f-ba81-732c51879b00', '{\"deletedName\":\"Arjun Verma\",\"deletedEmail\":\"test.employee.1787415993107@balaji-interior.com\"}', NULL, '2026-08-22 16:26:30')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('c8cd13ef-fc05-4eab-9d88-d5216a1a5fdb', NULL, 'vicks@balaji.com', 'PRODUCTION_VERIFICATION_TEST', 'System', 'test-handover-run', '{\"status\":\"SUCCESS\",\"timestamp\":\"2026-08-22T16:26:46.567Z\"}', NULL, '2026-08-22 16:26:40')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('640c5d34-a032-4f02-b26b-852cf3d35c17', NULL, 'vicks@balaji.com', 'EMPLOYEE_CREATED', 'Admin', '5a918419-1158-4a89-a3ea-42911d2fd31f', '{\"name\":\"Arjun Verma\",\"role\":\"employee\",\"email\":\"test.employee.1787416086078@balaji-interior.com\"}', NULL, '2026-08-22 16:28:00')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('ae1cc38e-d321-45b0-b880-39b75b79a16a', NULL, 'vicks@balaji.com', 'EMPLOYEE_DISABLED', 'Admin', '5a918419-1158-4a89-a3ea-42911d2fd31f', '{\"updates\":{\"status\":\"disabled\"},\"previousRole\":\"employee\",\"previousStatus\":\"active\"}', NULL, '2026-08-22 16:28:01')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('8edbb1eb-3b02-4082-8e98-c3304530ed77', NULL, 'vicks@balaji.com', 'EMPLOYEE_ENABLED', 'Admin', '5a918419-1158-4a89-a3ea-42911d2fd31f', '{\"updates\":{\"status\":\"active\"},\"previousRole\":\"employee\",\"previousStatus\":\"disabled\"}', NULL, '2026-08-22 16:28:01')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('cd25f627-3b68-4bc8-8a58-094661859553', NULL, 'vicks@balaji.com', 'EMPLOYEE_PASSWORD_RESET', 'Admin', '5a918419-1158-4a89-a3ea-42911d2fd31f', '{\"employeeName\":\"Arjun Verma\",\"employeeEmail\":\"test.employee.1787416086078@balaji-interior.com\"}', NULL, '2026-08-22 16:28:02')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('37b080b2-eacc-4c8a-880e-e3337dca9bab', NULL, 'vicks@balaji.com', 'EMPLOYEE_DELETED', 'Admin', '5a918419-1158-4a89-a3ea-42911d2fd31f', '{\"deletedName\":\"Arjun Verma\",\"deletedEmail\":\"test.employee.1787416086078@balaji-interior.com\"}', NULL, '2026-08-22 16:28:03')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('697b9cc0-b9aa-461d-a16e-4ce3b4c4b6b4', NULL, 'vicks@balaji.com', 'PRODUCTION_VERIFICATION_TEST', 'System', 'test-handover-run', '{\"status\":\"SUCCESS\",\"timestamp\":\"2026-08-22T16:28:19.409Z\"}', NULL, '2026-08-22 16:28:12')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('3b16c162-a395-453d-b2f8-480230af6c77', '2bd20632-00dd-4f48-84b4-6e526543c8d8', 'vicks@balaji.com', 'ADMIN_LOGIN_SUCCESS', 'Auth', '2bd20632-00dd-4f48-84b4-6e526543c8d8', '{\"role\":\"owner\",\"mustChangePassword\":false}', NULL, '2026-08-22 16:40:03')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('d9ce96e0-1285-40f0-a647-0b99068386dd', NULL, 'owner@balaji.com', 'EMPLOYEE_CREATED', 'Admin', '013ffa7d-08c7-4500-a469-a1dd27ef3329', '{\"name\":\"Rohan Sharma (Operations)\",\"role\":\"employee\",\"email\":\"test.employee.1787417398242@balaji-interior.com\"}', NULL, '2026-08-22 16:49:53')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('8632b141-5486-423b-917c-2839f6358290', NULL, 'owner@balaji.com', 'EMPLOYEE_CREATED', 'Admin', 'c709a2dd-d76c-4fd2-a117-c8752a3530f1', '{\"name\":\"Rohan Sharma (Operations)\",\"role\":\"employee\",\"email\":\"test.employee.1787417435214@balaji-interior.com\"}', NULL, '2026-08-22 16:50:30')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('9df19026-2e96-49a8-aed1-cb92446f2849', NULL, 'owner@balaji.com', 'EMPLOYEE_DISABLED', 'Admin', 'c709a2dd-d76c-4fd2-a117-c8752a3530f1', '{\"updates\":{\"status\":\"disabled\"},\"previousRole\":\"employee\",\"previousStatus\":\"active\"}', NULL, '2026-08-22 16:50:31')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('506449f8-5db5-4eb2-a2ec-6b9a366eee43', NULL, 'owner@balaji.com', 'EMPLOYEE_DELETED', 'Admin', 'c709a2dd-d76c-4fd2-a117-c8752a3530f1', '{\"deletedName\":\"Rohan Sharma (Operations)\",\"deletedEmail\":\"test.employee.1787417435214@balaji-interior.com\"}', NULL, '2026-08-22 16:50:32')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('e4cd1ba5-8a5a-4907-ae67-fe38b68a3e12', NULL, 'vicks@balaji.com', 'EMPLOYEE_CREATED', 'Admin', '02292869-41ec-44d1-9048-6e6f75d47b8a', '{\"name\":\"Arjun Verma\",\"role\":\"employee\",\"email\":\"test.employee.1787417452541@balaji-interior.com\"}', NULL, '2026-08-22 16:50:46')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('12e37372-d25d-4568-85d4-8ca8d57f3f59', NULL, 'vicks@balaji.com', 'EMPLOYEE_DISABLED', 'Admin', '02292869-41ec-44d1-9048-6e6f75d47b8a', '{\"updates\":{\"status\":\"disabled\"},\"previousRole\":\"employee\",\"previousStatus\":\"active\"}', NULL, '2026-08-22 16:50:47')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('6d515d8a-8484-4bac-9cb8-52c7e19bdb89', NULL, 'vicks@balaji.com', 'EMPLOYEE_ENABLED', 'Admin', '02292869-41ec-44d1-9048-6e6f75d47b8a', '{\"updates\":{\"status\":\"active\"},\"previousRole\":\"employee\",\"previousStatus\":\"disabled\"}', NULL, '2026-08-22 16:50:48')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('72ef6f2a-7170-44fd-b24b-f09be3993ffc', NULL, 'vicks@balaji.com', 'EMPLOYEE_PASSWORD_RESET', 'Admin', '02292869-41ec-44d1-9048-6e6f75d47b8a', '{\"employeeName\":\"Arjun Verma\",\"employeeEmail\":\"test.employee.1787417452541@balaji-interior.com\"}', NULL, '2026-08-22 16:50:49')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('2ae675e5-b46a-4a51-b8ac-6a870185c28a', NULL, 'vicks@balaji.com', 'EMPLOYEE_DELETED', 'Admin', '02292869-41ec-44d1-9048-6e6f75d47b8a', '{\"deletedName\":\"Arjun Verma\",\"deletedEmail\":\"test.employee.1787417452541@balaji-interior.com\"}', NULL, '2026-08-22 16:50:49')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('9ab333b7-6077-4ffe-9e5f-667424289604', NULL, 'vicks@balaji.com', 'PRODUCTION_VERIFICATION_TEST', 'System', 'test-handover-run', '{\"status\":\"SUCCESS\",\"timestamp\":\"2026-08-22T16:51:05.840Z\"}', NULL, '2026-08-22 16:50:59')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('74f2d164-bacf-40e7-9931-42cacccf4682', NULL, 'owner@balaji.com', 'EMPLOYEE_CREATED', 'Admin', '1f0aeb41-23d5-45b2-b2b4-8577fda055f6', '{\"name\":\"Rohan Sharma (Operations)\",\"role\":\"employee\",\"email\":\"test.employee.1787418373870@balaji-interior.com\"}', NULL, '2026-08-22 17:06:08')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('be83e540-d079-4b73-a46a-ff2d85a6dbba', NULL, 'owner@balaji.com', 'EMPLOYEE_DISABLED', 'Admin', '1f0aeb41-23d5-45b2-b2b4-8577fda055f6', '{\"updates\":{\"status\":\"disabled\"},\"previousRole\":\"employee\",\"previousStatus\":\"active\"}', NULL, '2026-08-22 17:06:10')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('90efd746-ddf9-4aef-b268-6dceb91edb2e', NULL, 'owner@balaji.com', 'EMPLOYEE_DELETED', 'Admin', '1f0aeb41-23d5-45b2-b2b4-8577fda055f6', '{\"deletedName\":\"Rohan Sharma (Operations)\",\"deletedEmail\":\"test.employee.1787418373870@balaji-interior.com\"}', NULL, '2026-08-22 17:06:11')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('c37495df-d011-492d-b013-68089af9fca5', NULL, 'vicks@balaji.com', 'EMPLOYEE_CREATED', 'Admin', '360d90eb-3b2b-4ab5-8883-7c814169f6c8', '{\"name\":\"Arjun Verma\",\"role\":\"employee\",\"email\":\"test.employee.1787418389245@balaji-interior.com\"}', NULL, '2026-08-22 17:06:23')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('4ccac5f3-6410-42c6-8854-29765e75997a', NULL, 'vicks@balaji.com', 'EMPLOYEE_DISABLED', 'Admin', '360d90eb-3b2b-4ab5-8883-7c814169f6c8', '{\"updates\":{\"status\":\"disabled\"},\"previousRole\":\"employee\",\"previousStatus\":\"active\"}', NULL, '2026-08-22 17:06:24')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('d888e6c0-6a04-4538-aae2-19b28e7b677c', NULL, 'vicks@balaji.com', 'EMPLOYEE_ENABLED', 'Admin', '360d90eb-3b2b-4ab5-8883-7c814169f6c8', '{\"updates\":{\"status\":\"active\"},\"previousRole\":\"employee\",\"previousStatus\":\"disabled\"}', NULL, '2026-08-22 17:06:25')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('b62d3c50-0315-4826-8002-c614989c3191', NULL, 'vicks@balaji.com', 'EMPLOYEE_PASSWORD_RESET', 'Admin', '360d90eb-3b2b-4ab5-8883-7c814169f6c8', '{\"employeeName\":\"Arjun Verma\",\"employeeEmail\":\"test.employee.1787418389245@balaji-interior.com\"}', NULL, '2026-08-22 17:06:25')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('6c9177ea-7a55-4fc7-a0a9-2ffd4b249790', NULL, 'vicks@balaji.com', 'EMPLOYEE_DELETED', 'Admin', '360d90eb-3b2b-4ab5-8883-7c814169f6c8', '{\"deletedName\":\"Arjun Verma\",\"deletedEmail\":\"test.employee.1787418389245@balaji-interior.com\"}', NULL, '2026-08-22 17:06:26')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('959f9889-7700-49f3-9325-99e3e8b2ac5f', NULL, 'vicks@balaji.com', 'PRODUCTION_VERIFICATION_TEST', 'System', 'test-handover-run', '{\"status\":\"SUCCESS\",\"timestamp\":\"2026-08-22T17:06:41.488Z\"}', NULL, '2026-08-22 17:06:34')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('773419ac-18d5-430f-8f56-da4205b78478', '2bd20632-00dd-4f48-84b4-6e526543c8d8', 'vicks@balaji.com', 'ADMIN_LOGIN_SUCCESS', 'Auth', '2bd20632-00dd-4f48-84b4-6e526543c8d8', '{\"role\":\"owner\",\"method\":\"password\",\"mustChangePassword\":false}', NULL, '2026-08-22 17:10:27')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('f8ffacf4-5c98-4bd6-8885-820bce84a772', '2bd20632-00dd-4f48-84b4-6e526543c8d8', 'vicks@balaji.com', 'ADMIN_LOGIN_SUCCESS', 'Auth', '2bd20632-00dd-4f48-84b4-6e526543c8d8', '{\"role\":\"owner\",\"method\":\"password\",\"mustChangePassword\":false}', NULL, '2026-08-22 17:14:42')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('f4610137-331e-4a74-95d1-93d811158c5b', NULL, 'vicks@balaji.com', 'EMPLOYEE_CREATED', 'Admin', '1ac084a2-36ed-42e8-a8dc-bf65601d518a', '{\"name\":\"Arjun Verma\",\"role\":\"employee\",\"email\":\"test.employee.1787481519149@balaji-interior.com\"}', NULL, '2026-08-23 10:38:32')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('519991a6-3e24-4b53-a308-6640153bc5bd', NULL, 'vicks@balaji.com', 'EMPLOYEE_DISABLED', 'Admin', '1ac084a2-36ed-42e8-a8dc-bf65601d518a', '{\"updates\":{\"status\":\"disabled\"},\"previousRole\":\"employee\",\"previousStatus\":\"active\"}', NULL, '2026-08-23 10:38:33')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('9d132f25-d8d6-42f1-962a-85761c3b1f4d', NULL, 'vicks@balaji.com', 'EMPLOYEE_ENABLED', 'Admin', '1ac084a2-36ed-42e8-a8dc-bf65601d518a', '{\"updates\":{\"status\":\"active\"},\"previousRole\":\"employee\",\"previousStatus\":\"disabled\"}', NULL, '2026-08-23 10:38:34')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('294cad39-2106-49d7-ae0d-e45ecd49ac1b', NULL, 'vicks@balaji.com', 'EMPLOYEE_PASSWORD_RESET', 'Admin', '1ac084a2-36ed-42e8-a8dc-bf65601d518a', '{\"employeeName\":\"Arjun Verma\",\"employeeEmail\":\"test.employee.1787481519149@balaji-interior.com\"}', NULL, '2026-08-23 10:38:34')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('4c2dbfc9-7058-42e2-a06a-1ac7c3a3b4ba', NULL, 'vicks@balaji.com', 'EMPLOYEE_DELETED', 'Admin', '1ac084a2-36ed-42e8-a8dc-bf65601d518a', '{\"deletedName\":\"Arjun Verma\",\"deletedEmail\":\"test.employee.1787481519149@balaji-interior.com\"}', NULL, '2026-08-23 10:38:35')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('8a5b6dd0-cd3b-47eb-9a8b-1619263b15fe', NULL, 'vicks@balaji.com', 'PRODUCTION_VERIFICATION_TEST', 'System', 'test-handover-run', '{\"status\":\"SUCCESS\",\"timestamp\":\"2026-08-23T10:38:53.114Z\"}', NULL, '2026-08-23 10:38:45')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('b4a2f12d-93da-4053-a47d-b0fe13cf2d89', '2bd20632-00dd-4f48-84b4-6e526543c8d8', 'vicks@balaji.com', 'ADMIN_LOGIN_SUCCESS', 'Auth', '2bd20632-00dd-4f48-84b4-6e526543c8d8', '{\"role\":\"owner\",\"method\":\"password\",\"mustChangePassword\":false}', NULL, '2026-08-23 10:43:49')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('3702ae73-da6d-47f0-b3a3-c2c63d46ecfc', NULL, 'vicks@balaji.com', 'EMPLOYEE_CREATED', 'Admin', 'cc39cf02-6515-4b20-a66a-af21ee445f14', '{\"name\":\"Arjun Verma\",\"role\":\"employee\",\"email\":\"test.employee.1787482505720@balaji-interior.com\"}', NULL, '2026-08-23 10:54:59')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('b7f687d7-6e0b-4ca8-8630-0942845cd73b', NULL, 'vicks@balaji.com', 'EMPLOYEE_DISABLED', 'Admin', 'cc39cf02-6515-4b20-a66a-af21ee445f14', '{\"updates\":{\"status\":\"disabled\"},\"previousRole\":\"employee\",\"previousStatus\":\"active\"}', NULL, '2026-08-23 10:55:00')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('d831c9c1-3dee-46bc-9596-dee6f5732259', NULL, 'vicks@balaji.com', 'EMPLOYEE_ENABLED', 'Admin', 'cc39cf02-6515-4b20-a66a-af21ee445f14', '{\"updates\":{\"status\":\"active\"},\"previousRole\":\"employee\",\"previousStatus\":\"disabled\"}', NULL, '2026-08-23 10:55:00')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('364846cf-b3e6-44f7-94dc-d06254c40f3c', NULL, 'vicks@balaji.com', 'EMPLOYEE_PASSWORD_RESET', 'Admin', 'cc39cf02-6515-4b20-a66a-af21ee445f14', '{\"employeeName\":\"Arjun Verma\",\"employeeEmail\":\"test.employee.1787482505720@balaji-interior.com\"}', NULL, '2026-08-23 10:55:01')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('913f16a7-f0a1-4694-a625-4464e3ec48e6', NULL, 'vicks@balaji.com', 'EMPLOYEE_DELETED', 'Admin', 'cc39cf02-6515-4b20-a66a-af21ee445f14', '{\"deletedName\":\"Arjun Verma\",\"deletedEmail\":\"test.employee.1787482505720@balaji-interior.com\"}', NULL, '2026-08-23 10:55:02')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('32bf31bc-4bc2-439a-9685-8e7a09ac0bb9', NULL, 'vicks@balaji.com', 'PRODUCTION_VERIFICATION_TEST', 'System', 'test-handover-run', '{\"status\":\"SUCCESS\",\"timestamp\":\"2026-08-23T10:55:20.505Z\"}', NULL, '2026-08-23 10:55:13')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('6323f41d-a274-4114-88a0-cbe94a8a8d63', NULL, 'vicks@balaji.com', 'EMPLOYEE_CREATED', 'Admin', '95e821de-0239-4a0f-9f24-f5238902dfb3', '{\"name\":\"Arjun Verma\",\"role\":\"employee\",\"email\":\"test.employee.1787488858297@balaji-interior.com\"}', NULL, '2026-08-23 12:40:51')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('09a95a81-a711-4f74-be7e-82147378fd06', NULL, 'vicks@balaji.com', 'EMPLOYEE_DISABLED', 'Admin', '95e821de-0239-4a0f-9f24-f5238902dfb3', '{\"updates\":{\"status\":\"disabled\"},\"previousRole\":\"employee\",\"previousStatus\":\"active\"}', NULL, '2026-08-23 12:40:52')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('f9df7b95-1a56-43ad-91a3-d3ff2ec0e0fb', NULL, 'vicks@balaji.com', 'EMPLOYEE_ENABLED', 'Admin', '95e821de-0239-4a0f-9f24-f5238902dfb3', '{\"updates\":{\"status\":\"active\"},\"previousRole\":\"employee\",\"previousStatus\":\"disabled\"}', NULL, '2026-08-23 12:40:53')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('867093c3-800d-4839-b0dc-096467f857a4', NULL, 'vicks@balaji.com', 'EMPLOYEE_PASSWORD_RESET', 'Admin', '95e821de-0239-4a0f-9f24-f5238902dfb3', '{\"employeeName\":\"Arjun Verma\",\"employeeEmail\":\"test.employee.1787488858297@balaji-interior.com\"}', NULL, '2026-08-23 12:40:54')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('9d811c77-e4c0-4f08-ac8d-90f94f375f17', NULL, 'vicks@balaji.com', 'EMPLOYEE_DELETED', 'Admin', '95e821de-0239-4a0f-9f24-f5238902dfb3', '{\"deletedName\":\"Arjun Verma\",\"deletedEmail\":\"test.employee.1787488858297@balaji-interior.com\"}', NULL, '2026-08-23 12:40:55')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('22d4b8c2-c607-41a2-8e7a-df26abaa71cd', NULL, 'vicks@balaji.com', 'PRODUCTION_VERIFICATION_TEST', 'System', 'test-handover-run', '{\"status\":\"SUCCESS\",\"timestamp\":\"2026-08-23T12:41:13.596Z\"}', NULL, '2026-08-23 12:41:06')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('1e63bad1-0b53-40a8-8618-782040b30565', NULL, 'vicks@balaji.com', 'EMPLOYEE_CREATED', 'Admin', '5ba359ab-5356-4417-b365-c0ab7818e07a', '{\"name\":\"Arjun Verma\",\"role\":\"employee\",\"email\":\"test.employee.1787489333405@balaji-interior.com\"}', NULL, '2026-08-23 12:48:46')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('824ebb00-f066-4856-ba88-a0ef1daf0ae5', NULL, 'vicks@balaji.com', 'EMPLOYEE_DISABLED', 'Admin', '5ba359ab-5356-4417-b365-c0ab7818e07a', '{\"updates\":{\"status\":\"disabled\"},\"previousRole\":\"employee\",\"previousStatus\":\"active\"}', NULL, '2026-08-23 12:48:47')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('51a5b1dc-a264-4730-a299-4c31bb0d0d6b', NULL, 'vicks@balaji.com', 'EMPLOYEE_ENABLED', 'Admin', '5ba359ab-5356-4417-b365-c0ab7818e07a', '{\"updates\":{\"status\":\"active\"},\"previousRole\":\"employee\",\"previousStatus\":\"disabled\"}', NULL, '2026-08-23 12:48:48')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('eb7817fb-9e32-49e4-9046-73ab77efc2bf', NULL, 'vicks@balaji.com', 'EMPLOYEE_PASSWORD_RESET', 'Admin', '5ba359ab-5356-4417-b365-c0ab7818e07a', '{\"employeeName\":\"Arjun Verma\",\"employeeEmail\":\"test.employee.1787489333405@balaji-interior.com\"}', NULL, '2026-08-23 12:48:49')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('5a887f30-ee94-4f0e-9de4-c4277d9cfda8', NULL, 'vicks@balaji.com', 'EMPLOYEE_DELETED', 'Admin', '5ba359ab-5356-4417-b365-c0ab7818e07a', '{\"deletedName\":\"Arjun Verma\",\"deletedEmail\":\"test.employee.1787489333405@balaji-interior.com\"}', NULL, '2026-08-23 12:48:49')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('e6d24cbf-f3f7-497f-9967-483a9b3b195e', NULL, 'vicks@balaji.com', 'PRODUCTION_VERIFICATION_TEST', 'System', 'test-handover-run', '{\"status\":\"SUCCESS\",\"timestamp\":\"2026-08-23T12:49:07.932Z\"}', NULL, '2026-08-23 12:49:00')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('016d13e1-aa08-47de-bace-0939be3f0ec6', NULL, 'vicks@balaji.com', 'EMPLOYEE_CREATED', 'Admin', '13e6adaa-b77a-4d67-bd87-aa2524f33851', '{\"name\":\"Arjun Verma\",\"role\":\"employee\",\"email\":\"test.employee.1787490142070@balaji-interior.com\"}', NULL, '2026-08-23 13:02:15')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('46341f85-3312-4205-88aa-89570da25832', NULL, 'vicks@balaji.com', 'EMPLOYEE_DISABLED', 'Admin', '13e6adaa-b77a-4d67-bd87-aa2524f33851', '{\"updates\":{\"status\":\"disabled\"},\"previousRole\":\"employee\",\"previousStatus\":\"active\"}', NULL, '2026-08-23 13:02:16')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('55295a39-8fed-4092-8f75-0ec7c4bca4f5', NULL, 'vicks@balaji.com', 'EMPLOYEE_ENABLED', 'Admin', '13e6adaa-b77a-4d67-bd87-aa2524f33851', '{\"updates\":{\"status\":\"active\"},\"previousRole\":\"employee\",\"previousStatus\":\"disabled\"}', NULL, '2026-08-23 13:02:16')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('5c44eccb-24f8-4ac7-ab42-048fd6d828f4', NULL, 'vicks@balaji.com', 'EMPLOYEE_PASSWORD_RESET', 'Admin', '13e6adaa-b77a-4d67-bd87-aa2524f33851', '{\"employeeName\":\"Arjun Verma\",\"employeeEmail\":\"test.employee.1787490142070@balaji-interior.com\"}', NULL, '2026-08-23 13:02:17')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('27e0d6ed-e029-4888-9f60-2212706d620f', NULL, 'vicks@balaji.com', 'EMPLOYEE_DELETED', 'Admin', '13e6adaa-b77a-4d67-bd87-aa2524f33851', '{\"deletedName\":\"Arjun Verma\",\"deletedEmail\":\"test.employee.1787490142070@balaji-interior.com\"}', NULL, '2026-08-23 13:02:18')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('dfeeade5-f0bc-4f68-9599-e56e1b3cb220', NULL, 'vicks@balaji.com', 'PRODUCTION_VERIFICATION_TEST', 'System', 'test-handover-run', '{\"status\":\"SUCCESS\",\"timestamp\":\"2026-08-23T13:02:35.466Z\"}', NULL, '2026-08-23 13:02:28')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('4da0ddf1-037a-4378-8862-6fbbe54c7aa0', NULL, 'vicks@balaji.com', 'EMPLOYEE_CREATED', 'Admin', '56239003-a75e-4ac1-a3ea-a39a7d0fe588', '{\"name\":\"Arjun Verma\",\"role\":\"employee\",\"email\":\"test.employee.1787490640641@balaji-interior.com\"}', NULL, '2026-08-23 13:10:34')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('9fc7fb81-d764-4200-806b-355ed13758e4', NULL, 'vicks@balaji.com', 'EMPLOYEE_DISABLED', 'Admin', '56239003-a75e-4ac1-a3ea-a39a7d0fe588', '{\"updates\":{\"status\":\"disabled\"},\"previousRole\":\"employee\",\"previousStatus\":\"active\"}', NULL, '2026-08-23 13:10:35')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('b7ec8786-fbcb-40ad-81a5-92ceb275197f', NULL, 'vicks@balaji.com', 'EMPLOYEE_ENABLED', 'Admin', '56239003-a75e-4ac1-a3ea-a39a7d0fe588', '{\"updates\":{\"status\":\"active\"},\"previousRole\":\"employee\",\"previousStatus\":\"disabled\"}', NULL, '2026-08-23 13:10:35')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('cec15165-7469-4491-ad27-7a031775ecf3', NULL, 'vicks@balaji.com', 'EMPLOYEE_PASSWORD_RESET', 'Admin', '56239003-a75e-4ac1-a3ea-a39a7d0fe588', '{\"employeeName\":\"Arjun Verma\",\"employeeEmail\":\"test.employee.1787490640641@balaji-interior.com\"}', NULL, '2026-08-23 13:10:36')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('f2f3c83c-af35-489c-821a-d5d5924bcb01', NULL, 'vicks@balaji.com', 'EMPLOYEE_DELETED', 'Admin', '56239003-a75e-4ac1-a3ea-a39a7d0fe588', '{\"deletedName\":\"Arjun Verma\",\"deletedEmail\":\"test.employee.1787490640641@balaji-interior.com\"}', NULL, '2026-08-23 13:10:37')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('6414e8b4-82a3-4358-b8ef-440b445e2c91', NULL, 'vicks@balaji.com', 'EMPLOYEE_CREATED', 'Admin', '1d157515-cb02-421a-90d2-873c1ffc8584', '{\"name\":\"Arjun Verma\",\"role\":\"employee\",\"email\":\"test.employee.1787490678660@balaji-interior.com\"}', NULL, '2026-08-23 13:11:12')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('ec46539a-8fd6-4dc3-b7bc-a76931fd0ae3', NULL, 'vicks@balaji.com', 'EMPLOYEE_DISABLED', 'Admin', '1d157515-cb02-421a-90d2-873c1ffc8584', '{\"updates\":{\"status\":\"disabled\"},\"previousRole\":\"employee\",\"previousStatus\":\"active\"}', NULL, '2026-08-23 13:11:13')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('793b5b09-fc9b-41db-9cf5-0aca4077b8b2', NULL, 'vicks@balaji.com', 'EMPLOYEE_ENABLED', 'Admin', '1d157515-cb02-421a-90d2-873c1ffc8584', '{\"updates\":{\"status\":\"active\"},\"previousRole\":\"employee\",\"previousStatus\":\"disabled\"}', NULL, '2026-08-23 13:11:14')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('5b5a7f3f-3e86-46a2-b144-da1e99d3360f', NULL, 'vicks@balaji.com', 'EMPLOYEE_PASSWORD_RESET', 'Admin', '1d157515-cb02-421a-90d2-873c1ffc8584', '{\"employeeName\":\"Arjun Verma\",\"employeeEmail\":\"test.employee.1787490678660@balaji-interior.com\"}', NULL, '2026-08-23 13:11:15')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('987385f9-5c35-4f04-9bb7-38bd55831b49', NULL, 'vicks@balaji.com', 'EMPLOYEE_DELETED', 'Admin', '1d157515-cb02-421a-90d2-873c1ffc8584', '{\"deletedName\":\"Arjun Verma\",\"deletedEmail\":\"test.employee.1787490678660@balaji-interior.com\"}', NULL, '2026-08-23 13:11:15')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('74abcefb-e215-4b3b-a4d6-d8ed37d9277c', NULL, 'vicks@balaji.com', 'EMPLOYEE_CREATED', 'Admin', 'b88329da-b18b-4f55-8407-b8b3701c8292', '{\"name\":\"Arjun Verma\",\"role\":\"employee\",\"email\":\"test.employee.1787490705467@balaji-interior.com\"}', NULL, '2026-08-23 13:11:38')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('2cde03ff-18ab-4d59-b715-13d03f654122', NULL, 'vicks@balaji.com', 'EMPLOYEE_DISABLED', 'Admin', 'b88329da-b18b-4f55-8407-b8b3701c8292', '{\"updates\":{\"status\":\"disabled\"},\"previousRole\":\"employee\",\"previousStatus\":\"active\"}', NULL, '2026-08-23 13:11:39')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('4478ccee-6d83-4123-aba8-065a322de5db', NULL, 'vicks@balaji.com', 'EMPLOYEE_ENABLED', 'Admin', 'b88329da-b18b-4f55-8407-b8b3701c8292', '{\"updates\":{\"status\":\"active\"},\"previousRole\":\"employee\",\"previousStatus\":\"disabled\"}', NULL, '2026-08-23 13:11:40')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('1adfcdae-bd69-4f8e-9e09-9f0a6526b2c7', NULL, 'vicks@balaji.com', 'EMPLOYEE_PASSWORD_RESET', 'Admin', 'b88329da-b18b-4f55-8407-b8b3701c8292', '{\"employeeName\":\"Arjun Verma\",\"employeeEmail\":\"test.employee.1787490705467@balaji-interior.com\"}', NULL, '2026-08-23 13:11:41')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('9bec2db7-cb3a-49f3-a46f-668faf39d562', NULL, 'vicks@balaji.com', 'EMPLOYEE_DELETED', 'Admin', 'b88329da-b18b-4f55-8407-b8b3701c8292', '{\"deletedName\":\"Arjun Verma\",\"deletedEmail\":\"test.employee.1787490705467@balaji-interior.com\"}', NULL, '2026-08-23 13:11:41')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('20b049d5-c535-4baa-af82-6c738820cc41', NULL, 'vicks@balaji.com', 'EMPLOYEE_CREATED', 'Admin', '3d82d977-f7dc-4192-9fe5-0af7067c6952', '{\"name\":\"Arjun Verma\",\"role\":\"employee\",\"email\":\"test.employee.1787490780304@balaji-interior.com\"}', NULL, '2026-08-23 13:12:53')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('4c83ae5b-0567-4111-8d56-73035023ba4e', NULL, 'vicks@balaji.com', 'EMPLOYEE_DISABLED', 'Admin', '3d82d977-f7dc-4192-9fe5-0af7067c6952', '{\"updates\":{\"status\":\"disabled\"},\"previousRole\":\"employee\",\"previousStatus\":\"active\"}', NULL, '2026-08-23 13:12:54')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('288e6acd-6be4-4a5a-980c-13c48ab79f27', NULL, 'vicks@balaji.com', 'EMPLOYEE_ENABLED', 'Admin', '3d82d977-f7dc-4192-9fe5-0af7067c6952', '{\"updates\":{\"status\":\"active\"},\"previousRole\":\"employee\",\"previousStatus\":\"disabled\"}', NULL, '2026-08-23 13:12:55')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('2bc6ae35-2fc3-4bf0-8af8-99a398a43bbb', NULL, 'vicks@balaji.com', 'EMPLOYEE_PASSWORD_RESET', 'Admin', '3d82d977-f7dc-4192-9fe5-0af7067c6952', '{\"employeeName\":\"Arjun Verma\",\"employeeEmail\":\"test.employee.1787490780304@balaji-interior.com\"}', NULL, '2026-08-23 13:12:56')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('f85f304e-eaff-4a20-8fb1-b0bd1158bb6a', NULL, 'vicks@balaji.com', 'EMPLOYEE_DELETED', 'Admin', '3d82d977-f7dc-4192-9fe5-0af7067c6952', '{\"deletedName\":\"Arjun Verma\",\"deletedEmail\":\"test.employee.1787490780304@balaji-interior.com\"}', NULL, '2026-08-23 13:12:57')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('43d9f58b-e380-47cc-a335-d2c8db39bb10', NULL, 'vicks@balaji.com', 'PRODUCTION_VERIFICATION_TEST', 'System', 'test-handover-run', '{\"status\":\"SUCCESS\",\"timestamp\":\"2026-08-23T13:13:15.047Z\"}', NULL, '2026-08-23 13:13:07')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('8b280a14-e30c-4325-9606-cc94ad6864b0', NULL, 'vicks@balaji.com', 'EMPLOYEE_CREATED', 'Admin', '632c0796-67e2-44e9-8b72-ba38e4bdd9a4', '{\"name\":\"Security Test Employee\",\"role\":\"employee\",\"email\":\"security.check.1787490816598@balaji.com\"}', NULL, '2026-08-23 13:13:29')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('f28bf0a9-f5f8-4ab9-b9ca-09f948c29e2e', '2bd20632-00dd-4f48-84b4-6e526543c8d8', 'vicks@balaji.com', 'ADMIN_LOGIN_SUCCESS', 'Auth', '2bd20632-00dd-4f48-84b4-6e526543c8d8', '{\"role\":\"owner\",\"method\":\"password\",\"mustChangePassword\":false}', NULL, '2026-08-23 15:03:21')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('f49d91a2-4a8a-4d9b-bff2-38b29f1e4dd7', '2bd20632-00dd-4f48-84b4-6e526543c8d8', 'vicks@balaji.com', 'SITE_SETTINGS_UPDATED', 'SiteSettings', NULL, '{\"brandName\":\"BALAJI\",\"modifiedKeys\":[\"brandName\",\"brandSubtitle\",\"tagline\",\"architectName\",\"establishedYear\",\"googleRating\",\"logoUrl\",\"contactEmail\",\"contactPhone\",\"whatsappNumber\",\"businessHours\",\"studioAddress\",\"city\",\"state\",\"country\",\"pincode\",\"currency\",\"currencySymbol\",\"taxRatePercent\",\"standardShippingFee\",\"freeShippingThreshold\",\"gstinNumber\",\"minOrderValue\",\"socialInstagram\",\"socialPinterest\",\"socialLinkedin\",\"socialFacebook\",\"announcementBanner\",\"homepage\",\"paymentGateway\",\"updatedAt\",\"studioName\",\"supportEmail\",\"supportPhone\"]}', NULL, '2026-08-23 15:03:36')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('5965a6b3-89a2-4ae7-84e2-93d695fd4bac', NULL, 'vicks@balaji.com', 'EMPLOYEE_CREATED', 'Admin', 'd7cd29d8-059f-4371-b376-f1ae9dcaf034', '{\"name\":\"Arjun Verma\",\"role\":\"employee\",\"email\":\"test.employee.1787497720082@balaji-interior.com\"}', NULL, '2026-08-23 15:08:33')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('8c307263-966b-43fb-9dc9-d4eb8ff625e8', NULL, 'vicks@balaji.com', 'EMPLOYEE_DISABLED', 'Admin', 'd7cd29d8-059f-4371-b376-f1ae9dcaf034', '{\"updates\":{\"status\":\"disabled\"},\"previousRole\":\"employee\",\"previousStatus\":\"active\"}', NULL, '2026-08-23 15:08:34')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('6e7db3e2-2968-4cd3-8e1e-17e81063183f', NULL, 'vicks@balaji.com', 'EMPLOYEE_ENABLED', 'Admin', 'd7cd29d8-059f-4371-b376-f1ae9dcaf034', '{\"updates\":{\"status\":\"active\"},\"previousRole\":\"employee\",\"previousStatus\":\"disabled\"}', NULL, '2026-08-23 15:08:35')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('afea5946-75f6-4923-91fa-822fe6f82a26', NULL, 'vicks@balaji.com', 'EMPLOYEE_PASSWORD_RESET', 'Admin', 'd7cd29d8-059f-4371-b376-f1ae9dcaf034', '{\"employeeName\":\"Arjun Verma\",\"employeeEmail\":\"test.employee.1787497720082@balaji-interior.com\"}', NULL, '2026-08-23 15:08:36')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('37d3bf79-df04-4a71-bb35-be55785bf7a1', NULL, 'vicks@balaji.com', 'EMPLOYEE_DELETED', 'Admin', 'd7cd29d8-059f-4371-b376-f1ae9dcaf034', '{\"deletedName\":\"Arjun Verma\",\"deletedEmail\":\"test.employee.1787497720082@balaji-interior.com\"}', NULL, '2026-08-23 15:08:36')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('c52e3619-b5a0-454c-81fd-865f9e2e80df', NULL, 'vicks@balaji.com', 'PRODUCTION_VERIFICATION_TEST', 'System', 'test-handover-run', '{\"status\":\"SUCCESS\",\"timestamp\":\"2026-08-23T15:08:55.771Z\"}', NULL, '2026-08-23 15:08:48')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('e07c82c1-e82c-49af-85be-8fe262ec8f3f', NULL, 'vicks@balaji.com', 'EMPLOYEE_CREATED', 'Admin', 'de52661e-19e7-4d5c-bdb4-ec84adaf5ade', '{\"name\":\"Security Test Employee\",\"role\":\"employee\",\"email\":\"security.check.1787497753159@balaji.com\"}', NULL, '2026-08-23 15:09:06')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('1e364643-7be5-4b46-8781-f47573f837be', '2bd20632-00dd-4f48-84b4-6e526543c8d8', 'vicks@balaji.com', 'ORDER_STATUS_UPDATED', 'Order', 'a578cc11-c056-4eea-baf4-3bcd7a5c72b1', '{\"verifiedBy\":\"vicks@balaji.com\",\"orderStatus\":\"Pending\"}', NULL, '2026-08-23 15:11:59')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('fda123fc-ce0b-43aa-9f47-7f674f954bad', NULL, 'vicks@balaji.com', 'EMPLOYEE_CREATED', 'Admin', 'bd6760c1-9a13-459e-b077-7172a8e2bf9e', '{\"name\":\"Security Test Employee\",\"role\":\"employee\",\"email\":\"security.check.1787499019099@balaji.com\"}', NULL, '2026-08-23 15:30:12')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('5646b306-f5a0-452f-84ed-d3066be747bf', '2bd20632-00dd-4f48-84b4-6e526543c8d8', 'vicks@balaji.com', 'SITE_SETTINGS_UPDATED', 'SiteSettings', NULL, '{\"brandName\":\"BALAJI\",\"modifiedKeys\":[\"brandName\",\"brandSubtitle\",\"tagline\",\"architectName\",\"establishedYear\",\"googleRating\",\"logoUrl\",\"contactEmail\",\"contactPhone\",\"whatsappNumber\",\"businessHours\",\"studioAddress\",\"city\",\"state\",\"country\",\"pincode\",\"currency\",\"currencySymbol\",\"taxRatePercent\",\"standardShippingFee\",\"freeShippingThreshold\",\"gstinNumber\",\"minOrderValue\",\"socialInstagram\",\"socialPinterest\",\"socialLinkedin\",\"socialFacebook\",\"announcementBanner\",\"homepage\",\"paymentGateway\",\"updatedAt\",\"studioName\",\"supportEmail\",\"supportPhone\"]}', NULL, '2026-08-23 15:33:09')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('d46fa103-fa64-452c-b593-715c3ce82e9e', '2bd20632-00dd-4f48-84b4-6e526543c8d8', 'vicks@balaji.com', 'ADMIN_LOGIN_SUCCESS', 'Auth', '2bd20632-00dd-4f48-84b4-6e526543c8d8', '{\"role\":\"owner\",\"method\":\"password\",\"mustChangePassword\":false}', NULL, '2026-08-23 15:36:24')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('c264f2d6-7b99-43ee-9b26-4705c9ef95f3', '2bd20632-00dd-4f48-84b4-6e526543c8d8', 'vicks@balaji.com', 'ADMIN_LOGIN_SUCCESS', 'Auth', '2bd20632-00dd-4f48-84b4-6e526543c8d8', '{\"role\":\"owner\",\"method\":\"password\",\"mustChangePassword\":false}', NULL, '2026-08-23 15:42:16')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('60e01c08-3758-47e9-a890-51eeace4e6af', '2bd20632-00dd-4f48-84b4-6e526543c8d8', 'vicks@balaji.com', 'SITE_SETTINGS_UPDATED', 'SiteSettings', NULL, '{\"brandName\":\"BALAJI\",\"modifiedKeys\":[\"brandName\",\"brandSubtitle\",\"tagline\",\"architectName\",\"establishedYear\",\"googleRating\",\"logoUrl\",\"contactEmail\",\"contactPhone\",\"whatsappNumber\",\"businessHours\",\"studioAddress\",\"city\",\"state\",\"country\",\"pincode\",\"currency\",\"currencySymbol\",\"taxRatePercent\",\"standardShippingFee\",\"freeShippingThreshold\",\"gstinNumber\",\"minOrderValue\",\"socialInstagram\",\"socialPinterest\",\"socialLinkedin\",\"socialFacebook\",\"announcementBanner\",\"homepage\",\"paymentGateway\",\"updatedAt\",\"studioName\",\"supportEmail\",\"supportPhone\"]}', NULL, '2026-08-23 15:42:53')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('ffe9be2f-ca5f-4842-a4a4-5a18f5d5e089', '2bd20632-00dd-4f48-84b4-6e526543c8d8', 'vicks@balaji.com', 'ADMIN_LOGIN_SUCCESS', 'Auth', '2bd20632-00dd-4f48-84b4-6e526543c8d8', '{\"role\":\"owner\",\"method\":\"password\",\"mustChangePassword\":false}', NULL, '2026-08-23 15:53:44')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('aa818521-9a68-4a9b-b544-a8c71d196729', '2bd20632-00dd-4f48-84b4-6e526543c8d8', 'vicks@balaji.com', 'ADMIN_LOGIN_SUCCESS', 'Auth', '2bd20632-00dd-4f48-84b4-6e526543c8d8', '{\"role\":\"owner\",\"method\":\"password\",\"mustChangePassword\":false}', NULL, '2026-08-23 16:32:07')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('6ecaa0e4-b335-4a5d-9b01-5e0cf0d314be', '2bd20632-00dd-4f48-84b4-6e526543c8d8', 'vicks@balaji.com', 'ADMIN_LOGIN_SUCCESS', 'Auth', '2bd20632-00dd-4f48-84b4-6e526543c8d8', '{\"role\":\"owner\",\"method\":\"password\",\"mustChangePassword\":false}', NULL, '2026-08-23 16:32:08')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('72259444-b418-4e67-8c55-817ce2611c6c', '2bd20632-00dd-4f48-84b4-6e526543c8d8', 'vicks@balaji.com', 'ADMIN_LOGIN_SUCCESS', 'Auth', '2bd20632-00dd-4f48-84b4-6e526543c8d8', '{\"role\":\"owner\",\"method\":\"password\",\"mustChangePassword\":false}', NULL, '2026-08-23 16:32:52')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('886fac4d-0019-4a60-bbe1-67e3bdd530b0', '2bd20632-00dd-4f48-84b4-6e526543c8d8', 'vicks@balaji.com', 'ADMIN_LOGIN_SUCCESS', 'Auth', '2bd20632-00dd-4f48-84b4-6e526543c8d8', '{\"ip\":\"106.222.225.62\",\"role\":\"owner\",\"method\":\"password\"}', NULL, '2026-09-09 05:25:38')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('f3a5e1c0-1057-453c-b5b8-ddbf6f3458a2', '2bd20632-00dd-4f48-84b4-6e526543c8d8', 'vicks@balaji.com', 'SITE_SETTINGS_UPDATED', 'SiteSettings', NULL, '{\"brandName\":\"BALAJI\",\"modifiedKeys\":[\"brandName\",\"brandSubtitle\",\"tagline\",\"architectName\",\"establishedYear\",\"googleRating\",\"logoUrl\",\"contactEmail\",\"contactPhone\",\"whatsappNumber\",\"businessHours\",\"studioAddress\",\"city\",\"state\",\"country\",\"pincode\",\"currency\",\"currencySymbol\",\"taxRatePercent\",\"standardShippingFee\",\"freeShippingThreshold\",\"gstinNumber\",\"minOrderValue\",\"socialInstagram\",\"socialPinterest\",\"socialLinkedin\",\"socialFacebook\",\"announcementBanner\",\"homepage\",\"paymentGateway\",\"updatedAt\",\"studioName\",\"supportEmail\",\"supportPhone\"]}', NULL, '2026-09-09 05:27:04')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('22434f92-e4d0-447f-9789-a6d028c65515', '2bd20632-00dd-4f48-84b4-6e526543c8d8', 'vicks@balaji.com', 'ADMIN_LOGIN_SUCCESS', 'Auth', '2bd20632-00dd-4f48-84b4-6e526543c8d8', '{\"ip\":\"49.37.111.245\",\"role\":\"owner\",\"method\":\"password\"}', NULL, '2026-09-09 06:38:28')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('6d5476ee-c3cc-4474-b094-aaaee491728f', '2bd20632-00dd-4f48-84b4-6e526543c8d8', 'vicks@balaji.com', 'ADMIN_LOGIN_SUCCESS', 'Auth', '2bd20632-00dd-4f48-84b4-6e526543c8d8', '{\"ip\":\"2405:201:a807:e8f9:dd06:9b5e:e5f0:7894\",\"role\":\"owner\",\"method\":\"password\"}', NULL, '2026-09-09 07:10:28')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('bcde11a8-b581-4b06-b2c6-4ff55ff9f39f', '2bd20632-00dd-4f48-84b4-6e526543c8d8', 'vicks@balaji.com', 'ADMIN_LOGIN_SUCCESS', 'Auth', '2bd20632-00dd-4f48-84b4-6e526543c8d8', '{\"ip\":\"2405:201:a807:e8f9:dd06:9b5e:e5f0:7894\",\"role\":\"owner\",\"method\":\"password\"}', NULL, '2026-09-09 07:25:14')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('335ddfda-8dca-4a51-bef4-ae003e3c5e11', '2bd20632-00dd-4f48-84b4-6e526543c8d8', 'vicks@balaji.com', 'ADMIN_LOGIN_SUCCESS', 'Auth', '2bd20632-00dd-4f48-84b4-6e526543c8d8', '{\"ip\":\"2401:4900:d088:c65e:7518:4c05:96d3:59f9\",\"role\":\"owner\",\"method\":\"password\"}', NULL, '2026-09-09 07:27:10')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('b2077825-4146-4214-acc6-c251b6c7cb7d', NULL, 'employee@balaji.com', 'ADMIN_LOGIN_SUCCESS', 'Auth', '1aacdd12-833b-4b5a-ad77-91da2537e2da', '{\"role\":\"employee\",\"mustChangePassword\":true}', NULL, '2026-08-22 12:09:36')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('9640eb8a-faaa-427c-a57d-0199fd8d26bb', NULL, 'vicks@balaji.com', 'ADMIN_PASSWORD_CHANGED', 'Admin', '1aacdd12-833b-4b5a-ad77-91da2537e2da', '{\"message\":\"Password updated and verified in Supabase\"}', NULL, '2026-08-22 12:09:47')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('0369de95-3dc1-483f-af6f-ca486981afab', '2bd20632-00dd-4f48-84b4-6e526543c8d8', 'vicks@balaji.com', 'PRODUCT_DELETED', 'Product', '8cf42a06-9f8e-454a-9598-cb6e6dded838', NULL, NULL, '2026-09-09 07:47:12')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('01cecb73-cf30-4afd-b83e-36052a13db09', '2bd20632-00dd-4f48-84b4-6e526543c8d8', 'vicks@balaji.com', 'PRODUCT_DELETED', 'Product', '92711348-f180-4b91-a367-14c33df4e1b4', NULL, NULL, '2026-09-09 07:47:15')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('273aa231-18d3-4cf9-8655-add620e29904', '2bd20632-00dd-4f48-84b4-6e526543c8d8', 'vicks@balaji.com', 'PRODUCT_DELETED', 'Product', 'be4c9761-b5e1-4cd0-adf4-d75a06f6b385', NULL, NULL, '2026-09-09 07:47:17')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('bc053e89-d3b8-4b85-8afb-97689a1cd4fa', '2bd20632-00dd-4f48-84b4-6e526543c8d8', 'vicks@balaji.com', 'PRODUCT_DELETED', 'Product', '11852dc1-cba7-4003-81be-cbd4c44b548e', NULL, NULL, '2026-09-09 07:47:20')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('9c8229bf-ffdd-4363-b109-008d507740ae', '2bd20632-00dd-4f48-84b4-6e526543c8d8', 'vicks@balaji.com', 'PRODUCT_DELETED', 'Product', '1648ed30-7e63-42a1-88e0-68939dc10d4d', NULL, NULL, '2026-09-09 07:47:22')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('35be6e40-5750-4ed2-8753-97ba7d614f98', '2bd20632-00dd-4f48-84b4-6e526543c8d8', 'vicks@balaji.com', 'PRODUCT_DELETED', 'Product', 'eb120439-5e3f-40de-a873-2c0255d49bb9', NULL, NULL, '2026-09-09 07:47:24')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('27a6a544-1b10-4922-8cda-2800cebad87b', '2bd20632-00dd-4f48-84b4-6e526543c8d8', 'vicks@balaji.com', 'PRODUCT_DELETED', 'Product', '3cc5a6ff-f119-4602-9123-624ea395f5ef', NULL, NULL, '2026-09-09 07:47:28')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('ab21416b-9cf4-4ca2-a325-30ace4cd205a', '2bd20632-00dd-4f48-84b4-6e526543c8d8', 'vicks@balaji.com', 'PRODUCT_DELETED', 'Product', '872b094e-71cf-4f24-92d2-bc2885c4e980', NULL, NULL, '2026-09-09 07:47:31')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('e384de24-0644-4b47-afb3-1e7d3b874753', '2bd20632-00dd-4f48-84b4-6e526543c8d8', 'vicks@balaji.com', 'PRODUCT_DELETED', 'Product', '110c87c7-acd7-4e61-ad4f-729bc262593d', NULL, NULL, '2026-09-09 07:47:34')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('75238fcb-c38e-4b39-b6df-2caf33d12dec', '2bd20632-00dd-4f48-84b4-6e526543c8d8', 'vicks@balaji.com', 'PRODUCT_DELETED', 'Product', 'e509a4bf-a5c8-46cc-bad4-dd4b53aa3795', NULL, NULL, '2026-09-09 07:47:37')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('7f4c471c-b0df-442a-8965-afc68f80522c', '2bd20632-00dd-4f48-84b4-6e526543c8d8', 'vicks@balaji.com', 'PRODUCT_DELETED', 'Product', '7eda1836-efe9-490e-9e13-86b9d773617a', NULL, NULL, '2026-09-09 07:47:39')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('b5f09243-8c65-4b16-9afc-94d520b9af82', '2bd20632-00dd-4f48-84b4-6e526543c8d8', 'vicks@balaji.com', 'ADMIN_LOGIN_SUCCESS', 'Auth', '2bd20632-00dd-4f48-84b4-6e526543c8d8', '{\"ip\":\"2401:4900:1c3b:3c35:f48c:b4ef:413d:3a4a\",\"role\":\"owner\",\"method\":\"password\"}', NULL, '2026-09-09 08:46:27')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('266aaa01-be94-4f4f-be4f-e2cac64dec3a', '2bd20632-00dd-4f48-84b4-6e526543c8d8', 'vicks@balaji.com', 'SITE_SETTINGS_UPDATED', 'SiteSettings', NULL, '{\"brandName\":\"BALAJI\",\"modifiedKeys\":[\"brandName\",\"brandSubtitle\",\"tagline\",\"architectName\",\"establishedYear\",\"googleRating\",\"logoUrl\",\"contactEmail\",\"contactPhone\",\"whatsappNumber\",\"businessHours\",\"studioAddress\",\"city\",\"state\",\"country\",\"pincode\",\"currency\",\"currencySymbol\",\"taxRatePercent\",\"standardShippingFee\",\"freeShippingThreshold\",\"gstinNumber\",\"minOrderValue\",\"socialInstagram\",\"socialPinterest\",\"socialLinkedin\",\"socialFacebook\",\"announcementBanner\",\"homepage\",\"paymentGateway\",\"updatedAt\",\"studioName\",\"supportEmail\",\"supportPhone\"]}', NULL, '2026-09-09 08:48:08')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('120bc53d-857b-4bcf-874c-f166d5e4464c', '2bd20632-00dd-4f48-84b4-6e526543c8d8', 'vicks@balaji.com', 'SITE_SETTINGS_UPDATED', 'SiteSettings', NULL, '{\"brandName\":\"BALAJI\",\"modifiedKeys\":[\"brandName\",\"brandSubtitle\",\"tagline\",\"architectName\",\"establishedYear\",\"googleRating\",\"logoUrl\",\"contactEmail\",\"contactPhone\",\"whatsappNumber\",\"businessHours\",\"studioAddress\",\"city\",\"state\",\"country\",\"pincode\",\"currency\",\"currencySymbol\",\"taxRatePercent\",\"standardShippingFee\",\"freeShippingThreshold\",\"gstinNumber\",\"minOrderValue\",\"socialInstagram\",\"socialPinterest\",\"socialLinkedin\",\"socialFacebook\",\"announcementBanner\",\"homepage\",\"paymentGateway\",\"updatedAt\",\"studioName\",\"supportEmail\",\"supportPhone\"]}', NULL, '2026-09-09 08:48:12')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('e84b0a40-0dda-4d55-a3ae-d46f1f530f23', '2bd20632-00dd-4f48-84b4-6e526543c8d8', 'vicks@balaji.com', 'ADMIN_LOGIN_SUCCESS', 'Auth', '2bd20632-00dd-4f48-84b4-6e526543c8d8', '{\"ip\":\"2401:4900:1c3b:3c35:f48c:b4ef:413d:3a4a\",\"role\":\"owner\",\"method\":\"password\"}', NULL, '2026-09-09 09:46:21')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);
INSERT INTO `audit_logs` (`id`, `admin_id`, `admin_email`, `action`, `entity`, `entity_id`, `details`, `ip_address`, `created_at`)
VALUES ('4d5c3f79-c572-4d29-8cd6-a0c501192f37', '2bd20632-00dd-4f48-84b4-6e526543c8d8', 'vicks@balaji.com', 'ADMIN_LOGIN_SUCCESS', 'Auth', '2bd20632-00dd-4f48-84b4-6e526543c8d8', '{\"ip\":\"2401:4900:753f:462c:d544:b5c4:97ab:3787\",\"role\":\"owner\",\"method\":\"password\"}', NULL, '2026-09-09 13:00:16')
ON DUPLICATE KEY UPDATE `action` = VALUES(`action`);

SET FOREIGN_KEY_CHECKS = 1;
-- ============================================================
-- IMPORT COMPLETE
-- ============================================================
