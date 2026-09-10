USE u603162798_balaji_arc_db;
SET FOREIGN_KEY_CHECKS = 0;

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
