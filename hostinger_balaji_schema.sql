-- ============================================================
-- BALAJI ARCHITECT & INTERIORS — HOSTINGER PHPMYADMIN MYSQL SCHEMA
-- Target Database: u603162798_balaji_arc_db
-- Target User:     u603162798_balaji_arc_db
-- Engine / Dialect: MySQL 5.7+ / 8.0+ / MariaDB 10.3+
-- Generated for Hostinger hPanel & phpMyAdmin Import
-- ============================================================

SET FOREIGN_KEY_CHECKS = 0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";
SET NAMES utf8mb4;

-- ------------------------------------------------------------
-- 1. ADMINS TABLE (Authentication & Role-Based Access)
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
-- 3. PRODUCTS TABLE (Curated Luxury Catalog)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `products` (
  `id` VARCHAR(36) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL UNIQUE,
  `sku` VARCHAR(100) NOT NULL UNIQUE,
  `brand` VARCHAR(255) NOT NULL DEFAULT 'Balaji Atelier',
  `category_id` VARCHAR(36) NULL,
  `subcategory` VARCHAR(255) NULL,
  `description` LONGTEXT NOT NULL,
  `price` DECIMAL(12, 2) NOT NULL,
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
  `images` JSON NOT NULL,
  `variants` JSON NULL,
  `is_featured` TINYINT(1) NOT NULL DEFAULT 0,
  `is_new` TINYINT(1) NOT NULL DEFAULT 0,
  `is_bestseller` TINYINT(1) NOT NULL DEFAULT 0,
  `published` TINYINT(1) NOT NULL DEFAULT 1,
  `tags` JSON NOT NULL,
  `specifications` JSON NOT NULL,
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
  `product_id` VARCHAR(36) NOT NULL,
  `sku` VARCHAR(100) NOT NULL UNIQUE,
  `name` VARCHAR(255) NOT NULL,
  `color` VARCHAR(100) NULL,
  `finish` VARCHAR(100) NULL,
  `thickness` VARCHAR(100) NULL,
  `size` VARCHAR(100) NULL,
  `price_modifier` DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
  `stock` INT NOT NULL DEFAULT 0,
  `image_url` TEXT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_variants_product` (`product_id`),
  KEY `idx_variants_sku` (`sku`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 5. COLLECTIONS TABLE
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `collections` (
  `id` VARCHAR(36) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL UNIQUE,
  `description` TEXT NULL,
  `cover_image` TEXT NULL,
  `is_published` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_collections_slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 6. INVENTORY TABLE
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `inventory` (
  `id` VARCHAR(36) NOT NULL,
  `product_id` VARCHAR(36) NOT NULL,
  `variant_id` VARCHAR(36) NULL,
  `stock_on_hand` INT NOT NULL DEFAULT 0,
  `stock_reserved` INT NOT NULL DEFAULT 0,
  `stock_available` INT NOT NULL DEFAULT 0,
  `low_stock_threshold` INT NOT NULL DEFAULT 5,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_prod_variant` (`product_id`, `variant_id`),
  KEY `idx_inventory_product` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 7. PROJECTS TABLE (Architecture & Interior Portfolio)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `projects` (
  `id` VARCHAR(36) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL UNIQUE,
  `location` VARCHAR(255) NOT NULL,
  `year` VARCHAR(10) NOT NULL,
  `project_type` VARCHAR(100) NOT NULL,
  `area` VARCHAR(100) NOT NULL,
  `short_description` TEXT NOT NULL,
  `description` LONGTEXT NOT NULL,
  `hero_image` TEXT NOT NULL,
  `gallery` JSON NOT NULL,
  `design_approach` LONGTEXT NOT NULL,
  `materials_used` JSON NOT NULL,
  `before_after` JSON NULL,
  `is_published` TINYINT(1) NOT NULL DEFAULT 1,
  `is_featured` TINYINT(1) NOT NULL DEFAULT 0,
  `sort_order` INT NOT NULL DEFAULT 0,
  `tags` JSON NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_projects_slug` (`slug`),
  KEY `idx_projects_featured` (`is_featured`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 8. SERVICES TABLE (Studio Offerings)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `services` (
  `id` VARCHAR(36) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL UNIQUE,
  `short_desc` TEXT NOT NULL,
  `full_desc` LONGTEXT NOT NULL,
  `icon_name` VARCHAR(100) NOT NULL,
  `image_url` TEXT NOT NULL,
  `deliverables` JSON NOT NULL,
  `sort_order` INT NOT NULL DEFAULT 0,
  `is_published` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_services_slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 9. CUSTOMERS TABLE (Client Accounts)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `customers` (
  `id` VARCHAR(36) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `phone` VARCHAR(50) NULL,
  `full_name` VARCHAR(255) NOT NULL,
  `company_name` VARCHAR(255) NULL,
  `gstin` VARCHAR(50) NULL,
  `addresses` JSON NOT NULL,
  `total_orders` INT NOT NULL DEFAULT 0,
  `total_spent` DECIMAL(14, 2) NOT NULL DEFAULT 0.00,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_customers_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 10. ORDERS TABLE (Orders & Payment Tracking)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `orders` (
  `id` VARCHAR(36) NOT NULL,
  `order_number` VARCHAR(50) NOT NULL UNIQUE,
  `customer_id` VARCHAR(36) NULL,
  `customer_name` VARCHAR(255) NOT NULL,
  `customer_email` VARCHAR(255) NOT NULL,
  `customer_phone` VARCHAR(50) NOT NULL,
  `shipping_address` JSON NOT NULL,
  `billing_address` JSON NULL,
  `subtotal` DECIMAL(12, 2) NOT NULL,
  `tax` DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
  `shipping_fee` DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
  `discount` DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
  `total_amount` DECIMAL(12, 2) NOT NULL,
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
-- 11. ORDER ITEMS TABLE
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `order_items` (
  `id` VARCHAR(36) NOT NULL,
  `order_id` VARCHAR(36) NOT NULL,
  `product_id` VARCHAR(36) NOT NULL,
  `variant_id` VARCHAR(36) NULL,
  `product_name` VARCHAR(255) NOT NULL,
  `sku` VARCHAR(100) NOT NULL,
  `quantity` INT NOT NULL,
  `unit_price` DECIMAL(12, 2) NOT NULL,
  `subtotal` DECIMAL(12, 2) NOT NULL,
  `image_url` TEXT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_items_order` (`order_id`),
  KEY `idx_items_product` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 12. QUOTES (RFQs) TABLE
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `quotes` (
  `id` VARCHAR(36) NOT NULL,
  `quote_number` VARCHAR(50) NOT NULL UNIQUE,
  `customer_name` VARCHAR(255) NOT NULL,
  `customer_email` VARCHAR(255) NOT NULL,
  `customer_phone` VARCHAR(50) NOT NULL,
  `project_type` VARCHAR(100) NOT NULL,
  `city` VARCHAR(100) NOT NULL,
  `scope_of_work` TEXT NOT NULL,
  `estimated_budget` VARCHAR(100) NULL,
  `timeline` VARCHAR(100) NULL,
  `status` VARCHAR(50) NOT NULL DEFAULT 'Submitted',
  `admin_notes` TEXT NULL,
  `quoted_amount` DECIMAL(14, 2) NULL,
  `items` JSON NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_quotes_num` (`quote_number`),
  KEY `idx_quotes_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 13. ENQUIRIES TABLE
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `enquiries` (
  `id` VARCHAR(36) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(50) NULL,
  `subject` VARCHAR(255) NOT NULL,
  `message` LONGTEXT NOT NULL,
  `status` VARCHAR(50) NOT NULL DEFAULT 'unread',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_enquiries_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 14. SITE SETTINGS TABLE
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `site_settings` (
  `id` VARCHAR(50) NOT NULL DEFAULT 'global',
  `brand_name` VARCHAR(255) NOT NULL DEFAULT 'BALAJI ARCHITECT & INTERIORS',
  `tagline` TEXT NULL,
  `contact_email` VARCHAR(255) NOT NULL DEFAULT 'atelier@balaji-interior.com',
  `contact_phone` VARCHAR(50) NOT NULL DEFAULT '+91 70029 48484',
  `whatsapp_number` VARCHAR(50) NOT NULL DEFAULT '+91 70029 48484',
  `studio_address` TEXT NOT NULL,
  `gstin_number` VARCHAR(50) NULL,
  `currency` VARCHAR(10) NOT NULL DEFAULT 'INR',
  `currency_symbol` VARCHAR(10) NOT NULL DEFAULT '₹',
  `tax_rate_percent` DECIMAL(5, 2) NOT NULL DEFAULT 18.00,
  `standard_shipping_fee` DECIMAL(10, 2) NOT NULL DEFAULT 1500.00,
  `free_shipping_threshold` DECIMAL(12, 2) NOT NULL DEFAULT 50000.00,
  `homepage` JSON NOT NULL,
  `payment_gateway` JSON NOT NULL,
  `raw_json` JSON NOT NULL,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 15. AUDIT LOGS TABLE
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `audit_logs` (
  `id` VARCHAR(36) NOT NULL,
  `admin_id` VARCHAR(36) NOT NULL,
  `admin_email` VARCHAR(255) NOT NULL,
  `action` VARCHAR(100) NOT NULL,
  `entity` VARCHAR(100) NOT NULL,
  `entity_id` VARCHAR(255) NOT NULL,
  `details` JSON NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_audit_admin` (`admin_id`),
  KEY `idx_audit_action` (`action`),
  KEY `idx_audit_created` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 16. PUSH SUBSCRIPTIONS TABLE
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `push_subscriptions` (
  `id` VARCHAR(36) NOT NULL,
  `endpoint` TEXT NOT NULL,
  `p256dh` TEXT NOT NULL,
  `auth` TEXT NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 17. SITE SETTINGS TABLE (Atelier Branding, Portfolio Motion & WhatsApp)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `site_settings` (
  `id` VARCHAR(36) NOT NULL,
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
  `raw_json` JSON NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- INITIAL SEED DATA FOR HOSTINGER PHPMYADMIN
-- ============================================================

INSERT INTO `admins` (`id`, `email`, `password_hash`, `name`, `role`, `status`, `must_change_password`)
VALUES ('2bd20632-00dd-4f48-84b4-6e526543c8d8', 'vicks@balaji.com', '3903a96046ec99bc94100f812cfee1b2:e72fa457ba6ab3be8353defbdf61b4c243714f27acb2cbc20fd2232dc36e184bd6564345d66103f433154a166821c36b5e0a0b162aeddf378182678a830c7f5b', 'Vikas Sir (Principal Architect)', 'super_admin', 'active', 0)
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `password_hash` = VALUES(`password_hash`), `role` = VALUES(`role`);

INSERT INTO `categories` (`id`, `name`, `slug`, `description`, `image_url`, `parent_id`, `sort_order`, `is_active`)
VALUES ('cat-stone', 'Natural Stone & Marble', 'natural-stone-marble', 'Quarried Italian marbles, honed travertines, and architectural granites with bespoke cut-to-size options.', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80', NULL, 1, 1)
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `description` = VALUES(`description`), `image_url` = VALUES(`image_url`);

INSERT INTO `categories` (`id`, `name`, `slug`, `description`, `image_url`, `parent_id`, `sort_order`, `is_active`)
VALUES ('cat-wood', 'Hardwood & Architectural Veneers', 'hardwood-veneers', 'Sustainably harvested smoked oaks, European walnuts, and natural fluted timber panels.', 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80', NULL, 2, 1)
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `description` = VALUES(`description`), `image_url` = VALUES(`image_url`);

INSERT INTO `categories` (`id`, `name`, `slug`, `description`, `image_url`, `parent_id`, `sort_order`, `is_active`)
VALUES ('cat-panels', 'Wall Panels & Acoustic Surfaces', 'wall-panels-acoustic', 'Linear slatted wall systems, architectural micro-cement claddings, and acoustic linen textures.', 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80', NULL, 3, 1)
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `description` = VALUES(`description`), `image_url` = VALUES(`image_url`);

INSERT INTO `categories` (`id`, `name`, `slug`, `description`, `image_url`, `parent_id`, `sort_order`, `is_active`)
VALUES ('cat-porcelain', 'Large Format Porcelain Slabs', 'porcelain-slabs', 'Monolithic sintered stone slabs for luxury countertops, bookmatched feature walls, and seamless floors.', 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80', NULL, 4, 1)
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `description` = VALUES(`description`), `image_url` = VALUES(`image_url`);

INSERT INTO `categories` (`id`, `name`, `slug`, `description`, `image_url`, `parent_id`, `sort_order`, `is_active`)
VALUES ('cat-lighting', 'Architectural Lighting', 'architectural-lighting', 'Sculptural unlacquered brass pendants, minimal linear sconces, and recessed gallery luminescence.', 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=80', NULL, 5, 1)
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `description` = VALUES(`description`), `image_url` = VALUES(`image_url`);

INSERT INTO `categories` (`id`, `name`, `slug`, `description`, `image_url`, `parent_id`, `sort_order`, `is_active`)
VALUES ('cat-hardware', 'Bespoke Hardware & Pulls', 'bespoke-hardware', 'Solid forged bronze handles, knurled cabinet pulls, and precision-engineered architectural pivots.', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80', NULL, 6, 1)
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `description` = VALUES(`description`), `image_url` = VALUES(`image_url`);

INSERT INTO `categories` (`id`, `name`, `slug`, `description`, `image_url`, `parent_id`, `sort_order`, `is_active`)
VALUES ('cat-furniture', 'Atelier Furniture & Objects', 'atelier-furniture', 'Limited edition travertine monoliths, solid oak dining tables, and tailored bouclé seating.', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80', NULL, 7, 1)
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `description` = VALUES(`description`), `image_url` = VALUES(`image_url`);

INSERT INTO `products` (`id`, `name`, `slug`, `sku`, `brand`, `category_id`, `subcategory`, `description`, `price`, `sale_price`, `unit`, `moq`, `stock`, `purchase_mode`, `lead_time`, `dimensions`, `thickness`, `material`, `finish`, `color`, `images`, `variants`, `is_featured`, `is_new`, `is_bestseller`, `published`, `tags`, `specifications`)
VALUES ('prod-travertine-slab', 'Romano Classico Vein-Cut Travertine', 'romano-classico-travertine', 'MAT-STN-001', 'Balaji Architect & Interiors', 'cat-stone', 'Honed Travertine', 'Authentic Italian vein-cut travertine quarried in Tivoli. Honed to a velvety matte tactile finish with natural open pores lightly filled for lasting resilience in high-end living spaces and bath suites.', 850, 780, 'sq ft', 100, 2377, 'BOTH', '5-7 business days', '2400mm x 1200mm slab / custom tile sizes', '20mm', 'Natural Travertine', 'Honed Matte', 'Warm Ivory / Biscuit', '["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"]', '[{"id":"var-trav-20mm","productId":"prod-travertine-slab","sku":"MAT-STN-001-20","name":"20mm Slab - Honed","finish":"Honed","thickness":"20mm","priceModifier":0,"stock":1800},{"id":"var-trav-30mm","productId":"prod-travertine-slab","sku":"MAT-STN-001-30","name":"30mm Slab - Polished Matte","finish":"Polished Matte","thickness":"30mm","priceModifier":190,"stock":600}]', 1, 0, 1, 1, '["Stone","Travertine","Flooring","Wall Cladding","Luxury Bath"]', '{"Origin":"Tivoli, Italy","Compressive Strength":"112 MPa","Water Absorption":"< 0.8%","Application":"Indoor flooring, feature walls, bathroom surrounds","Edge Detail":"Straight rectified / custom bullnose on request"}')
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `price` = VALUES(`price`), `stock` = VALUES(`stock`);

INSERT INTO `inventory` (`id`, `product_id`, `variant_id`, `stock_on_hand`, `stock_reserved`, `stock_available`, `low_stock_threshold`)
VALUES ('inv-prod-travertine-slab', 'prod-travertine-slab', NULL, 2377, 0, 2377, 5)
ON DUPLICATE KEY UPDATE `stock_on_hand` = VALUES(`stock_on_hand`), `stock_available` = VALUES(`stock_available`);

INSERT INTO `products` (`id`, `name`, `slug`, `sku`, `brand`, `category_id`, `subcategory`, `description`, `price`, `sale_price`, `unit`, `moq`, `stock`, `purchase_mode`, `lead_time`, `dimensions`, `thickness`, `material`, `finish`, `color`, `images`, `variants`, `is_featured`, `is_new`, `is_bestseller`, `published`, `tags`, `specifications`)
VALUES ('prod-smoked-oak-flooring', 'Smoked European White Oak Wide Plank', 'smoked-european-oak-flooring', 'MAT-WOD-002', 'Balaji Architect & Interiors', 'cat-wood', 'Engineered Hardwood', 'Slow-smoked French white oak planks with a triple-brushed wire texture and invisible natural UV polyurethane oil finish. Engineered with a multi-layer birch ply core for dimensional stability in humid climates.', 620, NULL, 'sq ft', 150, 3500, 'BUY_NOW', '3-5 business days', '2200mm L x 220mm W', '15mm (4mm top wear layer)', 'European White Oak & Baltic Birch', 'Natural Ultra-Matte Oil', 'Muted Earth Brown', '["https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=1200&q=80"]', '[{"id":"var-oak-smoked","productId":"prod-smoked-oak-flooring","sku":"MAT-WOD-002-SMK","name":"Smoked Natural","color":"Warm Umber","finish":"Wire Brushed","priceModifier":0,"stock":2200},{"id":"var-oak-raw","productId":"prod-smoked-oak-flooring","sku":"MAT-WOD-002-RAW","name":"Raw Nordic Sand","color":"Light Biscuit","finish":"Smooth Matte","priceModifier":40,"stock":1300}]', 1, 1, 1, 1, '["Wood","Flooring","Oak","Wide Plank","Living Room"]', '{"Grade":"Select Architectural ABC","Core":"11-ply Cross-Grain Baltic Birch","Bevel":"Micro-bevel on 4 sides","Installation":"Tongue & Groove / Glue-down or Floating","Underfloor Heating Compatible":"Yes, up to 27°C"}')
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `price` = VALUES(`price`), `stock` = VALUES(`stock`);

INSERT INTO `inventory` (`id`, `product_id`, `variant_id`, `stock_on_hand`, `stock_reserved`, `stock_available`, `low_stock_threshold`)
VALUES ('inv-prod-smoked-oak-flooring', 'prod-smoked-oak-flooring', NULL, 3500, 0, 3500, 5)
ON DUPLICATE KEY UPDATE `stock_on_hand` = VALUES(`stock_on_hand`), `stock_available` = VALUES(`stock_available`);

INSERT INTO `products` (`id`, `name`, `slug`, `sku`, `brand`, `category_id`, `subcategory`, `description`, `price`, `sale_price`, `unit`, `moq`, `stock`, `purchase_mode`, `lead_time`, `dimensions`, `thickness`, `material`, `finish`, `color`, `images`, `variants`, `is_featured`, `is_new`, `is_bestseller`, `published`, `tags`, `specifications`)
VALUES ('prod-fluted-acoustic-panel', 'Acoustic Fluted Walnut Wall Panel', 'acoustic-fluted-walnut-panel', 'MAT-PNL-003', 'Balaji Architect & Interiors', 'cat-panels', 'Acoustic Cladding', 'Precision-milled American walnut slats affixed to a recycled high-density acoustic PET felt backing. Elevates room acoustics while introducing warm architectural rhythm to master bedrooms and private cinema suites.', 14500, 13200, 'sheet', 2, 85, 'BUY_NOW', '3-4 business days', '2400mm H x 600mm W x 22mm D', '22mm', 'Natural American Walnut & Recycled Felt', 'Silky Natural Wax Oil', 'Deep Espresso Walnut', '["https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80"]', '[]', 1, 1, 0, 1, '["Acoustic","Wall Panels","Walnut","Fluted","Bedrooms"]', '{"NRC Rating":"0.85 Sound Absorption","Fire Rating":"Class B-s1, d0 (Flame Retardant)","Mounting":"Concealed screw or polyurethane construction adhesive","Slat Spacing":"13mm width with 14mm felt reveals"}')
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `price` = VALUES(`price`), `stock` = VALUES(`stock`);

INSERT INTO `inventory` (`id`, `product_id`, `variant_id`, `stock_on_hand`, `stock_reserved`, `stock_available`, `low_stock_threshold`)
VALUES ('inv-prod-fluted-acoustic-panel', 'prod-fluted-acoustic-panel', NULL, 85, 0, 85, 5)
ON DUPLICATE KEY UPDATE `stock_on_hand` = VALUES(`stock_on_hand`), `stock_available` = VALUES(`stock_available`);

INSERT INTO `products` (`id`, `name`, `slug`, `sku`, `brand`, `category_id`, `subcategory`, `description`, `price`, `sale_price`, `unit`, `moq`, `stock`, `purchase_mode`, `lead_time`, `dimensions`, `thickness`, `material`, `finish`, `color`, `images`, `variants`, `is_featured`, `is_new`, `is_bestseller`, `published`, `tags`, `specifications`)
VALUES ('prod-calacatta-porcelain', 'Calacatta Vagli Sintered Porcelain Slab', 'calacatta-vagli-porcelain-slab', 'MAT-POR-004', 'Balaji Architect & Interiors', 'cat-porcelain', 'Continuous Bookmatched Slabs', 'Continuous vein-matched sintered ceramic slab with deep golden and slate veins on an ultra-clean warm white background. 100% stain, heat, and scratch proof for demanding culinary islands and master vanities.', 1100, NULL, 'sq ft', 50, 1200, 'BOTH', '7-10 business days', '3200mm x 1600mm', '12mm / 20mm', 'Sintered Ceramic Porcelain', 'Silk Touch Satin', 'Pure White with Gold & Charcoal Veining', '["https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"]', '[]', 0, 0, 1, 1, '["Kitchen Countertop","Porcelain Slab","Bookmatched","Island Counter"]', '{"Porosity":"0.01% (Zero Porosity)","Thermal Shock":"Resistant to direct pans up to 400°C","UV Stability":"Fade proof for indoor and outdoor loggias"}')
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `price` = VALUES(`price`), `stock` = VALUES(`stock`);

INSERT INTO `inventory` (`id`, `product_id`, `variant_id`, `stock_on_hand`, `stock_reserved`, `stock_available`, `low_stock_threshold`)
VALUES ('inv-prod-calacatta-porcelain', 'prod-calacatta-porcelain', NULL, 1200, 0, 1200, 5)
ON DUPLICATE KEY UPDATE `stock_on_hand` = VALUES(`stock_on_hand`), `stock_available` = VALUES(`stock_available`);

INSERT INTO `products` (`id`, `name`, `slug`, `sku`, `brand`, `category_id`, `subcategory`, `description`, `price`, `sale_price`, `unit`, `moq`, `stock`, `purchase_mode`, `lead_time`, `dimensions`, `thickness`, `material`, `finish`, `color`, `images`, `variants`, `is_featured`, `is_new`, `is_bestseller`, `published`, `tags`, `specifications`)
VALUES ('prod-monolith-coffee-table', 'Brutalist Travertine Monolith Coffee Table', 'brutalist-travertine-coffee-table', 'FUR-TBL-005', 'Balaji Architect & Interiors', 'cat-furniture', 'Sculptural Tables', 'Sculpted from a single block of Tuscan Romano travertine. Defined by raw chiseled edges contrasting with a silky hand-honed flat surface. Each table is an individual architectural sculpture numbered by the studio.', 185000, NULL, 'piece', 1, 4, 'BUY_NOW', 'Made to order (2-3 weeks)', '1400mm L x 800mm W x 360mm H', '120mm solid block perimeter', 'Solid Honed Travertine Stone', 'Natural Matte Wax Sealed', 'Ivory Travertine', '["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"]', '[]', 1, 1, 0, 1, '["Furniture","Coffee Table","Travertine","Sculptural","Living Room"]', '{"Weight":"115 kg","Craftsmanship":"Hand-chiseled perimeter with CNC planar accuracy","Care":"Wipe with damp cloth and pH neutral stone cleanser"}')
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `price` = VALUES(`price`), `stock` = VALUES(`stock`);

INSERT INTO `inventory` (`id`, `product_id`, `variant_id`, `stock_on_hand`, `stock_reserved`, `stock_available`, `low_stock_threshold`)
VALUES ('inv-prod-monolith-coffee-table', 'prod-monolith-coffee-table', NULL, 4, 0, 4, 5)
ON DUPLICATE KEY UPDATE `stock_on_hand` = VALUES(`stock_on_hand`), `stock_available` = VALUES(`stock_available`);

INSERT INTO `products` (`id`, `name`, `slug`, `sku`, `brand`, `category_id`, `subcategory`, `description`, `price`, `sale_price`, `unit`, `moq`, `stock`, `purchase_mode`, `lead_time`, `dimensions`, `thickness`, `material`, `finish`, `color`, `images`, `variants`, `is_featured`, `is_new`, `is_bestseller`, `published`, `tags`, `specifications`)
VALUES ('prod-linear-bronze-pendant', 'Kanso Linear Brushed Bronze Chandelier', 'kanso-linear-bronze-chandelier', 'LGT-PEN-006', 'Balaji Architect & Interiors', 'cat-lighting', 'Suspension Lighting', 'A monolithic 1.8-meter solid extruded bronze fixture housing warm 2700K museum-grade CRI 97+ LED arrays diffused through frosted Japanese alabaster glass. Dimmable via DALI and TRIAC protocols.', 88000, NULL, 'set', 1, 12, 'BUY_NOW', '5-7 business days', '1800mm L x 60mm W x 80mm H (Suspension up to 2500mm)', NULL, 'Solid Extruded Bronze & Cast Alabaster', 'Hand-Rubbed Aged Bronze', 'Antique Bronze', '["https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80"]', '[]', 1, 0, 1, 1, '["Lighting","Bronze","Dining Table Chandelier","Minimalist"]', '{"Luminous Flux":"4,200 Lumens","Color Temperature":"2700K Warm Architectural Glow","Color Rendering Index":"CRI 98","Voltage":"220-240V AC 50/60Hz"}')
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `price` = VALUES(`price`), `stock` = VALUES(`stock`);

INSERT INTO `inventory` (`id`, `product_id`, `variant_id`, `stock_on_hand`, `stock_reserved`, `stock_available`, `low_stock_threshold`)
VALUES ('inv-prod-linear-bronze-pendant', 'prod-linear-bronze-pendant', NULL, 12, 0, 12, 5)
ON DUPLICATE KEY UPDATE `stock_on_hand` = VALUES(`stock_on_hand`), `stock_available` = VALUES(`stock_available`);

INSERT INTO `products` (`id`, `name`, `slug`, `sku`, `brand`, `category_id`, `subcategory`, `description`, `price`, `sale_price`, `unit`, `moq`, `stock`, `purchase_mode`, `lead_time`, `dimensions`, `thickness`, `material`, `finish`, `color`, `images`, `variants`, `is_featured`, `is_new`, `is_bestseller`, `published`, `tags`, `specifications`)
VALUES ('prod-knurled-bronze-hardware', 'Bespoke Knurled Bronze Door Lever & Escutcheon Set', 'bespoke-knurled-bronze-door-lever', 'HRD-LVR-007', 'Balaji Architect & Interiors', 'cat-hardware', 'Architectural Door Hardware', 'Machined from solid naval brass billets and finished with a dark antique bronze patina that deepens with use. Features a precision cross-hatch diamond knurled barrel for a reassuring tactile grip on heavy entrance doors.', 9500, 8600, 'set', 2, 65, 'BUY_NOW', '2-3 business days', '150mm Lever x 52mm Rose', NULL, 'Solid Forged Naval Brass', 'Unlacquered Living Bronze Patina', 'Dark Antique Bronze', '["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80"]', '[]', 0, 1, 1, 1, '["Door Hardware","Bronze Handles","Knurled Brass","Luxury Entrance"]', '{"Mechanism":"Heavy duty sprung return rose with ball-bearing hub","Spindle":"8mm solid steel standard","Door Thickness Fit":"38mm to 55mm solid timber doors"}')
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `price` = VALUES(`price`), `stock` = VALUES(`stock`);

INSERT INTO `inventory` (`id`, `product_id`, `variant_id`, `stock_on_hand`, `stock_reserved`, `stock_available`, `low_stock_threshold`)
VALUES ('inv-prod-knurled-bronze-hardware', 'prod-knurled-bronze-hardware', NULL, 65, 0, 65, 5)
ON DUPLICATE KEY UPDATE `stock_on_hand` = VALUES(`stock_on_hand`), `stock_available` = VALUES(`stock_available`);

INSERT INTO `products` (`id`, `name`, `slug`, `sku`, `brand`, `category_id`, `subcategory`, `description`, `price`, `sale_price`, `unit`, `moq`, `stock`, `purchase_mode`, `lead_time`, `dimensions`, `thickness`, `material`, `finish`, `color`, `images`, `variants`, `is_featured`, `is_new`, `is_bestseller`, `published`, `tags`, `specifications`)
VALUES ('prod-custom-millwork-veneer', 'Smoked Santos Rosewood Architectural Veneer', 'smoked-santos-rosewood-veneer', 'MAT-VNR-008', 'Balaji Architect & Interiors', 'cat-wood', 'Natural Wood Veneer', 'Sequenced architectural flitch veneer with rich espresso cathedrals and bronze undertones. Backed with non-woven fleece for seamless pressing onto curved cabinetry and bespoke wardrobes.', 320, NULL, 'sq ft', 200, 4200, 'REQUEST_QUOTE', '7-10 business days', '3050mm L x 1250mm W', '0.6mm', 'Natural Santos Rosewood', 'Raw Unfinished (Ready for matte polyurethane or hardwax)', 'Rich Espresso & Bronze Striations', '["https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=1200&q=80"]', '[]', 0, 0, 0, 1, '["Veneer","Rosewood","Wardrobes","Wall Paneling","Joinery"]', '{"Cut":"Crown Cut & Quarter Cut Bookmatched","Moisture Content":"8-12%","Sustainably Certified":"FSC 100% Controlled Harvest"}')
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `price` = VALUES(`price`), `stock` = VALUES(`stock`);

INSERT INTO `inventory` (`id`, `product_id`, `variant_id`, `stock_on_hand`, `stock_reserved`, `stock_available`, `low_stock_threshold`)
VALUES ('inv-prod-custom-millwork-veneer', 'prod-custom-millwork-veneer', NULL, 4200, 0, 4200, 5)
ON DUPLICATE KEY UPDATE `stock_on_hand` = VALUES(`stock_on_hand`), `stock_available` = VALUES(`stock_available`);

INSERT INTO `projects` (`id`, `title`, `slug`, `location`, `year`, `project_type`, `area`, `short_description`, `description`, `hero_image`, `gallery`, `design_approach`, `materials_used`, `before_after`, `is_published`, `is_featured`, `sort_order`, `tags`)
VALUES ('proj-sanctuary-alibaug', 'The Sanctuary at Alibaug', 'the-sanctuary-at-alibaug', 'Awas Coast, Alibaug', '2025', 'Architecture & Villa', '8,200 sq ft', 'A monolithic coastal retreat grounded in honed Tivoli travertine, smoked French oak, and frameless pocketing glass walls connecting lush banyan groves.', 'Designed as a timeless multi-generational weekend villa, The Sanctuary is configured around a central reflecting pool framed by board-formed concrete and warm Italian travertine. Every interior element was custom designed and fabricated by Balaji Architect & Interiors, ensuring unbroken harmony between raw architectural mass and delicate tactile finishes.', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85', '["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80","https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1400&q=80","https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80","https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=80"]', 'Our approach balanced heavy thermal mass walls with delicate bronze joinery and natural woven linens, allowing sea breezes to filter through while maintaining deep shade and thermal comfort.', '[{"materialId":"prod-travertine-slab","materialName":"Romano Classico Vein-Cut Travertine","category":"Natural Stone","imageUrl":"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80"},{"materialId":"prod-smoked-oak-flooring","materialName":"Smoked European White Oak Wide Plank","category":"Timber","imageUrl":"https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=400&q=80"},{"materialId":"prod-linear-bronze-pendant","materialName":"Kanso Linear Brushed Bronze Chandelier","category":"Lighting","imageUrl":"https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=400&q=80"}]', NULL, 1, 1, 1, '["Villa","Coastal","Travertine","Minimalist Luxury","Turnkey Execution"]')
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `hero_image` = VALUES(`hero_image`);

INSERT INTO `projects` (`id`, `title`, `slug`, `location`, `year`, `project_type`, `area`, `short_description`, `description`, `hero_image`, `gallery`, `design_approach`, `materials_used`, `before_after`, `is_published`, `is_featured`, `sort_order`, `tags`)
VALUES ('proj-pavilion-worli', 'Pavilion of Light', 'pavilion-of-light-worli', 'Worli Seaface, Mumbai', '2024', 'Penthouse & Estate', '5,400 sq ft', 'An expansive sea-facing sky penthouse wrapped in acoustic fluted walnut paneling, Calacatta Vagli porcelain, and custom patinated bronze millwork.', 'Perched high above the Arabian Sea, this sky residence explores how sunlight behaves across contrasting textures. The public salon flows seamlessly from honed stone floors to floor-to-ceiling smoked walnut millwork housing a curated collection of modern sculpture.', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85', '["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80","https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=80","https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1400&q=80"]', 'We eradicated unnecessary visual clutter, replacing drywall partitions with sliding fluted acoustic timber screens that allow the living space to transform dynamically from open gallery to private entertaining salon.', '[{"materialId":"prod-fluted-acoustic-panel","materialName":"Acoustic Fluted Walnut Wall Panel","category":"Acoustic Cladding","imageUrl":"https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=400&q=80"},{"materialId":"prod-calacatta-porcelain","materialName":"Calacatta Vagli Sintered Porcelain Slab","category":"Sintered Stone","imageUrl":"https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=400&q=80"}]', NULL, 1, 1, 2, '["Penthouse","Mumbai","Walnut","Sea View","Interior Design"]')
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `hero_image` = VALUES(`hero_image`);

INSERT INTO `projects` (`id`, `title`, `slug`, `location`, `year`, `project_type`, `area`, `short_description`, `description`, `hero_image`, `gallery`, `design_approach`, `materials_used`, `before_after`, `is_published`, `is_featured`, `sort_order`, `tags`)
VALUES ('proj-maison-brutaliste', 'Maison Brutaliste', 'maison-brutaliste-delhi', 'Chhatarpur Farms, New Delhi', '2025', 'Residential Interiors', '11,000 sq ft', 'A bold sculptural private residence contrasting raw architectural board-formed concrete with refined brushed bronze and lush interior courtyard gardens.', 'Conceived as an inward-looking sanctuary shielded from urban noise, Maison Brutaliste features soaring 6-meter ceilings and rhythmic colonnades that capture changing light across the seasons.', 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85', '["https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=80","https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1400&q=80"]', 'The project demonstrates our philosophy of material honesty—every concrete pour, timber grain, and bronze joint is left exposed to celebrate true construction craftsmanship.', '[{"materialId":"prod-travertine-slab","materialName":"Romano Classico Vein-Cut Travertine","category":"Stone"},{"materialId":"prod-knurled-bronze-hardware","materialName":"Bespoke Knurled Bronze Door Lever","category":"Hardware"}]', NULL, 1, 1, 3, '["Brutalist","Private Residence","Delhi","Concrete & Bronze"]')
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `hero_image` = VALUES(`hero_image`);

INSERT INTO `projects` (`id`, `title`, `slug`, `location`, `year`, `project_type`, `area`, `short_description`, `description`, `hero_image`, `gallery`, `design_approach`, `materials_used`, `before_after`, `is_published`, `is_featured`, `sort_order`, `tags`)
VALUES ('proj-monolith-studio', 'The Monolith Design Headquarters', 'the-monolith-design-headquarters', 'Indiranagar, Bengaluru', '2024', 'Commercial & Studio', '4,200 sq ft', 'A serene creative studio for an international fashion house featuring modular walnut workstations and monolithic stone meeting pods.', 'Balaji Architect & Interiors was commissioned to rethink modern creative workspace architecture. We crafted quiet acoustic alcoves and an open library of tactile material specimens to inspire daily design exploration.', 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85', '["https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80"]', 'Focus on high acoustic performance and calm ambient illumination to support deep creative focus.', '[{"materialId":"prod-fluted-acoustic-panel","materialName":"Acoustic Fluted Walnut Wall Panel","category":"Acoustics"}]', NULL, 1, 0, 4, '["Studio","Workplace","Bengaluru","Commercial"]')
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `hero_image` = VALUES(`hero_image`);

INSERT INTO `projects` (`id`, `title`, `slug`, `location`, `year`, `project_type`, `area`, `short_description`, `description`, `hero_image`, `gallery`, `design_approach`, `materials_used`, `before_after`, `is_published`, `is_featured`, `sort_order`, `tags`)
VALUES ('proj-aura-hyderabad', 'Aura Residence', 'aura-residence-hyderabad', 'Jubilee Hills, Hyderabad', '2025', 'Residential Interiors', '6,800 sq ft', 'An understated private residence balancing traditional Deccan courtyard typologies with razor-sharp modern detailing.', 'Every room in Aura Residence is composed around intimate landscaped lightwells. Custom unlacquered bronze partitions and vein-matched marble floors foster a feeling of continuous calm.', 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85', '["https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=80"]', 'Integration of passive ventilation, natural daylight, and enduring local granite masonry.', '[]', NULL, 1, 1, 5, '["Courtyard House","Hyderabad","Luxury Interior"]')
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `hero_image` = VALUES(`hero_image`);

INSERT INTO `projects` (`id`, `title`, `slug`, `location`, `year`, `project_type`, `area`, `short_description`, `description`, `hero_image`, `gallery`, `design_approach`, `materials_used`, `before_after`, `is_published`, `is_featured`, `sort_order`, `tags`)
VALUES ('proj-kyoto-tea-dine', 'Kyoto Tea & Dine Atelier', 'kyoto-tea-dine-atelier', 'Pali Hill, Bandra West, Mumbai', '2024', 'Hospitality & Luxury Dining', '3,900 sq ft', 'An intimate omakase and artisanal tea lounge celebrated for its charred Shou Sugi Ban cedar walls and monolithic travertine bar.', 'Designed as a multisensory journey, guests transition through a tranquil rock garden into an ambient dining room anchored by an 8-meter solid stone counter illuminated by custom linear bronze fixtures.', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=85', '["https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80"]', 'Minimalist Japanese wabi-sabi principles interpreted through contemporary Indian stone craftsmanship.', '[{"materialId":"prod-linear-bronze-pendant","materialName":"Kanso Linear Brushed Bronze Chandelier","category":"Lighting"}]', NULL, 1, 0, 6, '["Hospitality","Restaurant","Bandra","Dining"]')
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `hero_image` = VALUES(`hero_image`);

INSERT INTO `services` (`id`, `title`, `slug`, `short_desc`, `full_desc`, `icon_name`, `image_url`, `deliverables`, `sort_order`, `is_published`)
VALUES ('srv-interior-architecture', 'Interior Architecture & Space Planning', 'interior-architecture-space-planning', 'Comprehensive spatial reconfiguration, structural alignment, and architectural interior detailing for luxury residences and estates.', 'We re-engineer spatial flows from first principles, taking into account natural daylight vectors, sightlines, acoustics, and structural integration. Our drawings cover full architectural CAD & BIM sets, reflected ceiling plans, MEP coordination, and micro-detailed millwork joinery.', 'Compass', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80', '["Concept spatial diagrams & 3D volumetric studies","Full architectural interior blueprint packages","Reflected ceiling & architectural lighting plans","Custom door, window, and wall assembly details","Statutory & structural consultant coordination"]', 1, 1)
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `image_url` = VALUES(`image_url`);

INSERT INTO `services` (`id`, `title`, `slug`, `short_desc`, `full_desc`, `icon_name`, `image_url`, `deliverables`, `sort_order`, `is_published`)
VALUES ('srv-turnkey-execution', 'Turnkey Luxury Execution', 'turnkey-luxury-execution', 'End-to-end master project management, artisan craftsmanship, and on-site engineering from bare shell to final handover.', 'Our dedicated site engineering and project management division oversees every phase of construction. We ensure absolute adherence to millimeter tolerances, material integrity, and promised delivery timelines.', 'ShieldCheck', 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80', '["Dedicated on-site architectural project manager","Daily photographic progress tracking & Gantt charts","Master artisan supervision (masonry, carpentry, stone finishing)","Rigorous multi-stage QA and snag resolution","Comprehensive maintenance manuals & warranty portfolio"]', 2, 1)
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `image_url` = VALUES(`image_url`);

INSERT INTO `services` (`id`, `title`, `slug`, `short_desc`, `full_desc`, `icon_name`, `image_url`, `deliverables`, `sort_order`, `is_published`)
VALUES ('srv-material-consultation', 'Material Curation & Sourcing Advisory', 'material-curation-sourcing', 'Global stone quarry selection, certified timber procurement, and bespoke surface formulation tailored to project climate.', 'Leveraging our direct relationships with European quarries and master timber mills, we curate bespoke material palettes that age gracefully. We conduct rigorous laboratory testing for water absorption, hardness, and thermal behavior.', 'Layers', 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80', '["Physical tactile sample trays & curated finish moodboards","Direct quarry inspection and slab block selection","Full technical specification sheets & maintenance protocols","Contractor procurement schedules and MOQ optimization"]', 3, 1)
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `image_url` = VALUES(`image_url`);

INSERT INTO `services` (`id`, `title`, `slug`, `short_desc`, `full_desc`, `icon_name`, `image_url`, `deliverables`, `sort_order`, `is_published`)
VALUES ('srv-custom-furniture', 'Bespoke Furniture & Custom Millwork', 'bespoke-furniture-custom-millwork', 'Limited edition furniture, sculptural stone monoliths, and precision-engineered architectural cabinetry handcrafted in our studio.', 'Every piece is drafted specifically for its designated space, utilizing select hardwoods, hand-poured bronze castings, and monolithic natural stones.', 'Armchair', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80', '["1:1 scale ergonomic prototypes and timber mockups","Hand-selected natural flitch veneer matching","Integrated soft-close concealed hardware engineering","Numbered certificate of atelier authenticity"]', 4, 1)
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `image_url` = VALUES(`image_url`);

INSERT INTO `site_settings` (`id`, `brand_name`, `tagline`, `contact_email`, `contact_phone`, `whatsapp_number`, `studio_address`, `gstin_number`, `currency`, `currency_symbol`, `tax_rate_percent`, `standard_shipping_fee`, `free_shipping_threshold`, `homepage`, `payment_gateway`, `raw_json`)
VALUES ('global', 'Balaji Architect & Interior', 'Crafted spaces, luxury architecture, and considered materials for timeless living.', 'atelier@balaji-interior.com', '+91 70029 48484', '+91 70029 48484', 'Door No. 306, DN TOWER, Floor No. 03, Beltola Tiniali', '18AAECB4848F1ZX', 'INR', '₹', 18, 1500, 50000, '{"heroEyebrow":"Architecture • Interior Studio • Material Curation","heroHeadingLine1":"BESPOKE ARCHITECTURE.","heroHeadingLine2":"ARCHITECTURE.","heroHeadingLine3":"MATERIALS.","heroDescription":"Crafted spaces and considered materials for timeless living. Uniting spatial architecture with a curated marketplace of authentic stones, woods, and architectural accents.","heroImageUrl":"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=90","heroPrimaryBtnText":"Explore Projects","heroPrimaryBtnLink":"/projects","heroSecondaryBtnText":"Explore Materials","heroSecondaryBtnLink":"/materials","trustBadge1":"★ 5.0 (22 Google Reviews)","trustBadge2":"Guwahati Studio Office","trustBadge3":"Turnkey Architecture","trustBadge4":"Pan-India Material Logistics","introEyebrow":"The Atelier Philosophy","introHeading":"Restraint is the ultimate form of luxury.","introParagraph1":"Founded on the belief that genuine luxury emerges from architectural precision, raw material integrity, and spatial calm, Balaji Architect & Interiors crafts environments that elevate the human experience.","introParagraph2":"Beyond architectural commissions, we maintain direct partnerships with heritage European quarries and timber ateliers, making authentic vein-cut travertines, smoked French oaks, and acoustic wall systems directly available to discerning architects and homeowners.","introImageUrl":"https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80","stat1Value":"14+","stat1Label":"Years of Practice","stat2Value":"180+","stat2Label":"Projects Handed Over","stat3Value":"22+","stat3Label":"Global Quarry Partners","ctaHeading":"Commission an Architectural Dialogue","ctaDescription":"Whether envisioning a private residential estate, bespoke commercial headquarters, or seeking curated architectural materials, our studio welcomes your consultation.","ctaBtnText":"Request Consultation & Quote","ctaBtnLink":"/quote","heroTitle":"Updated Test Title"}', '{"enabled":true,"gatewayName":"Balaji PG","methodName":"Balaji QR Payment","upiId":"6000149918@fam","merchantName":"Balaji Architect & Interiors","instructions":"1. Open any UPI app (GPay, PhonePe, Paytm, BHIM, Cred, Amazon Pay).\\n2. Scan the dynamic Balaji QR code or select your preferred app below.\\n3. Verify payee \\"Balaji Architect & Interiors\\" and exact amount.\\n4. Complete payment and enter the 12-digit UPI Reference / UTR Number to confirm your order.","qrExpiryMinutes":10,"enableGPay":true,"enablePhonePe":true,"enablePaytm":true,"enableBhim":true,"enableCred":true,"enableAmazonPay":true,"requireUtr":true}', '{"brandName":"Balaji Architect & Interior","brandSubtitle":"ARCHITECTURE • INTERIORS • MATERIALS","tagline":"Crafted spaces, luxury architecture, and considered materials for timeless living.","architectName":"Vikas Sir (Principal Architect)","establishedYear":"2014","googleRating":"★ 5.0 (22 Google Reviews)","logoUrl":"","contactEmail":"atelier@balaji-interior.com","contactPhone":"+91 70029 48484","whatsappNumber":"+91 70029 48484","businessHours":"Mon - Sat: 10:00 AM - 7:00 PM (IST)","studioAddress":"Door No. 306, DN TOWER, Floor No. 03, Beltola Tiniali","city":"Guwahati","state":"Assam","country":"India","pincode":"781040","currency":"INR","currencySymbol":"₹","taxRatePercent":18,"standardShippingFee":1500,"freeShippingThreshold":50000,"gstinNumber":"18AAECB4848F1ZX","minOrderValue":0,"socialInstagram":"https://instagram.com/balajiatelier","socialPinterest":"https://pinterest.com/balajiatelier","socialLinkedin":"https://linkedin.com/company/balaji-atelier","socialFacebook":"https://facebook.com/balajiarchitects","announcementBanner":{"enabled":true,"text":"Complimentary Material Advisory Sessions Available for Q3/Q4 Architectural Commissions","linkUrl":"/quote"},"homepage":{"heroEyebrow":"Architecture • Interior Studio • Material Curation","heroHeadingLine1":"BESPOKE ARCHITECTURE.","heroHeadingLine2":"ARCHITECTURE.","heroHeadingLine3":"MATERIALS.","heroDescription":"Crafted spaces and considered materials for timeless living. Uniting spatial architecture with a curated marketplace of authentic stones, woods, and architectural accents.","heroImageUrl":"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=90","heroPrimaryBtnText":"Explore Projects","heroPrimaryBtnLink":"/projects","heroSecondaryBtnText":"Explore Materials","heroSecondaryBtnLink":"/materials","trustBadge1":"★ 5.0 (22 Google Reviews)","trustBadge2":"Guwahati Studio Office","trustBadge3":"Turnkey Architecture","trustBadge4":"Pan-India Material Logistics","introEyebrow":"The Atelier Philosophy","introHeading":"Restraint is the ultimate form of luxury.","introParagraph1":"Founded on the belief that genuine luxury emerges from architectural precision, raw material integrity, and spatial calm, Balaji Architect & Interiors crafts environments that elevate the human experience.","introParagraph2":"Beyond architectural commissions, we maintain direct partnerships with heritage European quarries and timber ateliers, making authentic vein-cut travertines, smoked French oaks, and acoustic wall systems directly available to discerning architects and homeowners.","introImageUrl":"https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80","stat1Value":"14+","stat1Label":"Years of Practice","stat2Value":"180+","stat2Label":"Projects Handed Over","stat3Value":"22+","stat3Label":"Global Quarry Partners","ctaHeading":"Commission an Architectural Dialogue","ctaDescription":"Whether envisioning a private residential estate, bespoke commercial headquarters, or seeking curated architectural materials, our studio welcomes your consultation.","ctaBtnText":"Request Consultation & Quote","ctaBtnLink":"/quote","heroTitle":"Updated Test Title"},"paymentGateway":{"enabled":true,"gatewayName":"Balaji PG","methodName":"Balaji QR Payment","upiId":"6000149918@fam","merchantName":"Balaji Architect & Interiors","instructions":"1. Open any UPI app (GPay, PhonePe, Paytm, BHIM, Cred, Amazon Pay).\\n2. Scan the dynamic Balaji QR code or select your preferred app below.\\n3. Verify payee \\"Balaji Architect & Interiors\\" and exact amount.\\n4. Complete payment and enter the 12-digit UPI Reference / UTR Number to confirm your order.","qrExpiryMinutes":10,"enableGPay":true,"enablePhonePe":true,"enablePaytm":true,"enableBhim":true,"enableCred":true,"enableAmazonPay":true,"requireUtr":true}}')
ON DUPLICATE KEY UPDATE `brand_name` = VALUES(`brand_name`), `payment_gateway` = VALUES(`payment_gateway`), `raw_json` = VALUES(`raw_json`);

SET FOREIGN_KEY_CHECKS = 1;
