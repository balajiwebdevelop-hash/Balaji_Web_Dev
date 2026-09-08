-- ============================================================
-- BALAJI ATELIER — LUXURY INTERIOR & ARCHITECTURE PLATFORM
-- PRODUCTION DATABASE SCHEMA WITH ROW LEVEL SECURITY (RLS)
-- ============================================================

-- 1. ADMINS TABLE
CREATE TABLE IF NOT EXISTS admins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'super_admin',
    must_change_password BOOLEAN NOT NULL DEFAULT true,
    last_login_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    image_url TEXT,
    parent_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    sort_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    sku TEXT UNIQUE NOT NULL,
    brand TEXT NOT NULL DEFAULT 'Balaji Atelier',
    category_id UUID REFERENCES categories(id) ON DELETE RESTRICT,
    subcategory TEXT,
    description TEXT NOT NULL,
    price NUMERIC(12, 2) NOT NULL CHECK (price >= 0),
    sale_price NUMERIC(12, 2) CHECK (sale_price >= 0),
    unit TEXT NOT NULL DEFAULT 'sq ft',
    moq INT NOT NULL DEFAULT 1 CHECK (moq >= 1),
    stock INT NOT NULL DEFAULT 0 CHECK (stock >= 0),
    purchase_mode TEXT NOT NULL DEFAULT 'BUY_NOW',
    lead_time TEXT NOT NULL DEFAULT '3-5 business days',
    dimensions TEXT,
    thickness TEXT,
    material TEXT,
    finish TEXT,
    color TEXT,
    images JSONB NOT NULL DEFAULT '[]'::jsonb,
    is_featured BOOLEAN NOT NULL DEFAULT false,
    is_new BOOLEAN NOT NULL DEFAULT false,
    is_bestseller BOOLEAN NOT NULL DEFAULT false,
    published BOOLEAN NOT NULL DEFAULT true,
    tags TEXT[] NOT NULL DEFAULT '{}',
    specifications JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. PRODUCT VARIANTS TABLE
CREATE TABLE IF NOT EXISTS product_variants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    sku TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    color TEXT,
    finish TEXT,
    thickness TEXT,
    size TEXT,
    price_modifier NUMERIC(12, 2) NOT NULL DEFAULT 0,
    stock INT NOT NULL DEFAULT 0 CHECK (stock >= 0),
    image_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. COLLECTIONS TABLE
CREATE TABLE IF NOT EXISTS collections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    cover_image TEXT,
    is_published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. INVENTORY TABLE
CREATE TABLE IF NOT EXISTS inventory (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    variant_id UUID REFERENCES product_variants(id) ON DELETE CASCADE,
    stock_on_hand INT NOT NULL DEFAULT 0 CHECK (stock_on_hand >= 0),
    stock_reserved INT NOT NULL DEFAULT 0 CHECK (stock_reserved >= 0),
    stock_available INT NOT NULL DEFAULT 0 CHECK (stock_available >= 0),
    low_stock_threshold INT NOT NULL DEFAULT 5,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (product_id, variant_id)
);

-- 7. PROJECTS (PORTFOLIO) TABLE
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    location TEXT NOT NULL,
    year TEXT NOT NULL,
    project_type TEXT NOT NULL,
    area TEXT NOT NULL,
    short_description TEXT NOT NULL,
    description TEXT NOT NULL,
    hero_image TEXT NOT NULL,
    gallery JSONB NOT NULL DEFAULT '[]'::jsonb,
    design_approach TEXT NOT NULL,
    materials_used JSONB NOT NULL DEFAULT '[]'::jsonb,
    before_after JSONB DEFAULT '{}'::jsonb,
    is_published BOOLEAN NOT NULL DEFAULT true,
    is_featured BOOLEAN NOT NULL DEFAULT false,
    sort_order INT NOT NULL DEFAULT 0,
    tags TEXT[] NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. SERVICES TABLE
CREATE TABLE IF NOT EXISTS services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    short_desc TEXT NOT NULL,
    full_desc TEXT NOT NULL,
    icon_name TEXT NOT NULL,
    image_url TEXT NOT NULL,
    deliverables JSONB NOT NULL DEFAULT '[]'::jsonb,
    sort_order INT NOT NULL DEFAULT 0,
    is_published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. CUSTOMERS TABLE
CREATE TABLE IF NOT EXISTS customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    full_name TEXT NOT NULL,
    is_guest BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 10. ADDRESSES TABLE
CREATE TABLE IF NOT EXISTS addresses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    address_line1 TEXT NOT NULL,
    address_line2 TEXT,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    pincode TEXT NOT NULL,
    country TEXT NOT NULL DEFAULT 'India',
    is_default BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 11. ORDERS TABLE
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number TEXT UNIQUE NOT NULL,
    customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    shipping_address JSONB NOT NULL,
    billing_address JSONB,
    subtotal NUMERIC(12, 2) NOT NULL CHECK (subtotal >= 0),
    tax NUMERIC(12, 2) NOT NULL DEFAULT 0 CHECK (tax >= 0),
    shipping_fee NUMERIC(12, 2) NOT NULL DEFAULT 0 CHECK (shipping_fee >= 0),
    discount NUMERIC(12, 2) NOT NULL DEFAULT 0 CHECK (discount >= 0),
    total_amount NUMERIC(12, 2) NOT NULL CHECK (total_amount >= 0),
    order_status TEXT NOT NULL DEFAULT 'Pending',
    payment_status TEXT NOT NULL DEFAULT 'Pending',
    payment_method TEXT NOT NULL DEFAULT 'Card',
    utr_number TEXT,
    transaction_id TEXT,
    notes TEXT,
    idempotency_key TEXT UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 12. ORDER ITEMS TABLE
CREATE TABLE IF NOT EXISTS order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE SET NULL,
    variant_id UUID REFERENCES product_variants(id) ON DELETE SET NULL,
    product_name TEXT NOT NULL,
    product_sku TEXT NOT NULL,
    unit TEXT NOT NULL,
    unit_price NUMERIC(12, 2) NOT NULL CHECK (unit_price >= 0),
    quantity INT NOT NULL CHECK (quantity > 0),
    subtotal NUMERIC(12, 2) NOT NULL CHECK (subtotal >= 0),
    image_url TEXT,
    selected_color TEXT,
    selected_finish TEXT
);

-- 13. QUOTES TABLE
CREATE TABLE IF NOT EXISTS quotes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quote_number TEXT UNIQUE NOT NULL,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    project_type TEXT NOT NULL,
    project_location TEXT NOT NULL,
    estimated_timeline TEXT NOT NULL,
    budget_range TEXT NOT NULL,
    notes TEXT,
    status TEXT NOT NULL DEFAULT 'Pending',
    total_quoted_amount NUMERIC(12, 2),
    admin_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 14. QUOTE ITEMS TABLE
CREATE TABLE IF NOT EXISTS quote_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quote_id UUID NOT NULL REFERENCES quotes(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE SET NULL,
    product_name TEXT NOT NULL,
    dimensions TEXT,
    quantity INT NOT NULL CHECK (quantity > 0),
    unit TEXT NOT NULL,
    estimated_unit_price NUMERIC(12, 2),
    notes TEXT
);

-- 15. ENQUIRIES TABLE
CREATE TABLE IF NOT EXISTS enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    source TEXT NOT NULL DEFAULT 'Contact Page',
    status TEXT NOT NULL DEFAULT 'New',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 16. SITE SETTINGS TABLE
CREATE TABLE IF NOT EXISTS site_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 17. NOTIFICATION SUBSCRIPTIONS TABLE
CREATE TABLE IF NOT EXISTS notification_subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    endpoint TEXT UNIQUE NOT NULL,
    keys JSONB NOT NULL,
    user_agent TEXT,
    admin_id UUID REFERENCES admins(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 18. AUDIT LOGS TABLE
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_id UUID REFERENCES admins(id) ON DELETE SET NULL,
    admin_email TEXT NOT NULL,
    action TEXT NOT NULL,
    entity TEXT NOT NULL,
    entity_id TEXT,
    details JSONB,
    ip_address TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 19. ORDER STATUS HISTORY TABLE
CREATE TABLE IF NOT EXISTS order_status_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    from_status TEXT,
    to_status TEXT NOT NULL,
    actor_id UUID REFERENCES admins(id) ON DELETE SET NULL,
    actor_email TEXT,
    note TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 20. PAYMENT HISTORY TABLE
CREATE TABLE IF NOT EXISTS payment_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    status TEXT NOT NULL,
    amount NUMERIC NOT NULL,
    utr_number TEXT,
    payment_method TEXT NOT NULL,
    actor_email TEXT,
    note TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- INDEXES FOR MAXIMUM QUERY PERFORMANCE
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_sku ON products(sku);
CREATE INDEX IF NOT EXISTS idx_products_published ON products(published);
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_published ON projects(is_published);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(order_status);
CREATE INDEX IF NOT EXISTS idx_orders_payment_status ON orders(payment_status);
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quotes_status ON quotes(status);
CREATE INDEX IF NOT EXISTS idx_quotes_customer_email ON quotes(customer_email);
CREATE INDEX IF NOT EXISTS idx_quotes_created_at ON quotes(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_customers_email ON customers(email);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created ON audit_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_order_status_history_order ON order_status_history(order_id);
CREATE INDEX IF NOT EXISTS idx_payment_history_order ON payment_history(order_id);
CREATE INDEX IF NOT EXISTS idx_orders_utr ON orders(utr_number);
CREATE INDEX IF NOT EXISTS idx_orders_idempotency ON orders(idempotency_key);

-- ============================================================
-- ENABLE ROW LEVEL SECURITY (RLS) ON ALL TABLES
-- ============================================================
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE quote_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_history ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- RLS POLICIES (PUBLIC READ & STRICT MUTATION ISOLATION)
-- ============================================================

-- 1. Categories: Public can read active categories
CREATE POLICY "Public categories read" ON categories
    FOR SELECT USING (is_active = true);

-- 2. Products: Public can read published products
CREATE POLICY "Public products read" ON products
    FOR SELECT USING (published = true);

-- 3. Product Variants: Public can read all variants
CREATE POLICY "Public variants read" ON product_variants
    FOR SELECT USING (true);

-- 4. Collections: Public can read published collections
CREATE POLICY "Public collections read" ON collections
    FOR SELECT USING (is_published = true);

-- 5. Projects: Public can read published portfolio projects
CREATE POLICY "Public projects read" ON projects
    FOR SELECT USING (is_published = true);

-- 6. Services: Public can read published services
CREATE POLICY "Public services read" ON services
    FOR SELECT USING (is_published = true);

-- 7. Site Settings: Direct table access restricted to server service role; public reads are served securely via sanitized /api/settings endpoint
CREATE POLICY "Service role site settings read" ON site_settings
    FOR SELECT TO service_role USING (true);

-- 8. Orders: Public can submit new orders
CREATE POLICY "Public can create orders" ON orders
    FOR INSERT WITH CHECK (true);

-- 9. Order Items: Public can insert items during checkout
CREATE POLICY "Public can create order items" ON order_items
    FOR INSERT WITH CHECK (true);

-- 10. Quotes: Public can submit quote requests
CREATE POLICY "Public can create quotes" ON quotes
    FOR INSERT WITH CHECK (true);

-- 11. Quote Items: Public can insert quote items
CREATE POLICY "Public can create quote items" ON quote_items
    FOR INSERT WITH CHECK (true);

-- 12. Enquiries: Public can submit contact messages
CREATE POLICY "Public can create enquiries" ON enquiries
    FOR INSERT WITH CHECK (true);

-- 13. Push Subscriptions: Public/Admin can register endpoints
CREATE POLICY "Public can register push endpoints" ON notification_subscriptions
    FOR INSERT WITH CHECK (true);

-- ============================================================
-- ATOMIC STOCK PROCEDURES
-- ============================================================
CREATE OR REPLACE FUNCTION decrement_stock_atomic(p_product_id UUID, p_quantity INT)
RETURNS BOOLEAN AS $$
DECLARE
    v_rows_affected INT;
BEGIN
    UPDATE products
    SET stock = stock - p_quantity,
        updated_at = NOW()
    WHERE id = p_product_id AND stock >= p_quantity;

    GET DIAGNOSTICS v_rows_affected = ROW_COUNT;
    RETURN v_rows_affected > 0;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION increment_stock_atomic(p_product_id UUID, p_quantity INT)
RETURNS VOID AS $$
BEGIN
    UPDATE products
    SET stock = stock + p_quantity,
        updated_at = NOW()
    WHERE id = p_product_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. ATOMIC ORDER CREATION (Single Database Transaction)
CREATE OR REPLACE FUNCTION create_order_atomic(p_order_data JSONB)
RETURNS JSONB AS $$
DECLARE
    v_idempotency_key TEXT;
    v_existing_order JSONB;
    v_order_id UUID;
    v_order_number TEXT;
    v_subtotal NUMERIC := 0;
    v_tax_rate NUMERIC := 0.18;
    v_tax NUMERIC := 0;
    v_shipping_fee NUMERIC := 1500;
    v_free_shipping_threshold NUMERIC := 50000;
    v_total_amount NUMERIC := 0;
    v_item JSONB;
    v_product RECORD;
    v_variant RECORD;
    v_item_price NUMERIC;
    v_item_subtotal NUMERIC;
    v_created_order JSONB;
BEGIN
    -- 1. Check Idempotency Key
    v_idempotency_key := p_order_data->>'idempotencyKey';
    IF v_idempotency_key IS NOT NULL AND v_idempotency_key <> '' THEN
        SELECT jsonb_build_object(
            'id', o.id,
            'order_number', o.order_number,
            'customer_name', o.customer_name,
            'customer_email', o.customer_email,
            'customer_phone', o.customer_phone,
            'shipping_address', o.shipping_address,
            'billing_address', o.billing_address,
            'subtotal', o.subtotal,
            'tax', o.tax,
            'shipping_fee', o.shipping_fee,
            'discount', o.discount,
            'total_amount', o.total_amount,
            'order_status', o.order_status,
            'payment_status', o.payment_status,
            'payment_method', o.payment_method,
            'notes', o.notes,
            'idempotency_key', o.idempotency_key,
            'created_at', o.created_at,
            'updated_at', o.updated_at,
            'items', COALESCE(jsonb_agg(to_jsonb(oi)), '[]'::jsonb)
        ) INTO v_existing_order
        FROM orders o
        LEFT JOIN order_items oi ON oi.order_id = o.id
        WHERE o.idempotency_key = v_idempotency_key
        GROUP BY o.id;

        IF v_existing_order IS NOT NULL THEN
            RETURN v_existing_order;
        END IF;
    END IF;

    -- 2. Validate Items, Published State, and Reserve Stock Atomically
    FOR v_item IN SELECT * FROM jsonb_array_elements(p_order_data->'items')
    LOOP
        SELECT * INTO v_product
        FROM products
        WHERE id = (v_item->>'productId')::UUID
        FOR UPDATE;

        IF NOT FOUND THEN
            RAISE EXCEPTION 'Product with ID % not found', (v_item->>'productId');
        END IF;

        IF NOT v_product.published THEN
            RAISE EXCEPTION 'Product "%" is currently not available for purchase', v_product.name;
        END IF;

        IF v_product.stock < (v_item->>'quantity')::INT THEN
            RAISE EXCEPTION 'Insufficient stock for "%". Available: %, Requested: %', 
                v_product.name, v_product.stock, (v_item->>'quantity')::INT;
        END IF;

        -- Check Variant if provided
        IF (v_item->>'variantId') IS NOT NULL AND (v_item->>'variantId') <> '' THEN
            SELECT * INTO v_variant
            FROM product_variants
            WHERE id = (v_item->>'variantId')::UUID
            FOR UPDATE;

            IF FOUND THEN
                IF v_variant.stock IS NOT NULL AND v_variant.stock > 0 AND v_variant.stock < (v_item->>'quantity')::INT THEN
                    RAISE EXCEPTION 'Insufficient variant stock for "% - %". Available: %, Requested: %',
                        v_product.name, v_variant.name, v_variant.stock, (v_item->>'quantity')::INT;
                END IF;
                IF v_variant.stock IS NOT NULL AND v_variant.stock >= (v_item->>'quantity')::INT THEN
                    UPDATE product_variants
                    SET stock = stock - (v_item->>'quantity')::INT
                    WHERE id = v_variant.id;
                END IF;
            END IF;
        END IF;

        -- Decrement product stock atomically
        UPDATE products
        SET stock = stock - (v_item->>'quantity')::INT,
            updated_at = NOW()
        WHERE id = v_product.id;

        -- Authoritative price calculation
        v_item_price := COALESCE(v_product.sale_price, v_product.price);
        IF v_variant.id IS NOT NULL AND v_variant.price_modifier IS NOT NULL THEN
            v_item_price := v_item_price + v_variant.price_modifier;
        END IF;
        v_item_subtotal := v_item_price * (v_item->>'quantity')::INT;
        v_subtotal := v_subtotal + v_item_subtotal;
    END LOOP;

    -- 3. Calculate Taxes and Shipping
    v_tax := ROUND(v_subtotal * v_tax_rate);
    IF v_subtotal >= v_free_shipping_threshold THEN
        v_shipping_fee := 0;
    END IF;
    v_total_amount := v_subtotal + v_tax + v_shipping_fee;

    -- 4. Generate Collision-Safe Order Number
    v_order_number := 'BAL-' || UPPER(TO_HEX(EXTRACT(EPOCH FROM NOW())::BIGINT)) || '-' || UPPER(SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 6));

    -- 5. Insert Order Record
    INSERT INTO orders (
        order_number,
        customer_name,
        customer_email,
        customer_phone,
        shipping_address,
        billing_address,
        subtotal,
        tax,
        shipping_fee,
        discount,
        total_amount,
        order_status,
        payment_status,
        payment_method,
        notes,
        utr_number,
        transaction_id,
        idempotency_key,
        created_at,
        updated_at
    ) VALUES (
        v_order_number,
        p_order_data->>'customerName',
        p_order_data->>'customerEmail',
        p_order_data->>'customerPhone',
        p_order_data->'shippingAddress',
        COALESCE(p_order_data->'billingAddress', p_order_data->'shippingAddress'),
        v_subtotal,
        v_tax,
        v_shipping_fee,
        0,
        v_total_amount,
        'Confirmed',
        'Submitted',
        COALESCE(p_order_data->>'paymentMethod', 'Balaji QR Payment (Balaji PG)'),
        COALESCE(p_order_data->>'notes', ''),
        p_order_data->>'utrNumber',
        p_order_data->>'transactionId',
        v_idempotency_key,
        NOW(),
        NOW()
    ) RETURNING id INTO v_order_id;

    -- 6. Insert Order Items
    FOR v_item IN SELECT * FROM jsonb_array_elements(p_order_data->'items')
    LOOP
        SELECT * INTO v_product FROM products WHERE id = (v_item->>'productId')::UUID;
        v_item_price := COALESCE(v_product.sale_price, v_product.price);
        IF (v_item->>'variantId') IS NOT NULL AND (v_item->>'variantId') <> '' THEN
            SELECT * INTO v_variant FROM product_variants WHERE id = (v_item->>'variantId')::UUID;
            IF FOUND AND v_variant.price_modifier IS NOT NULL THEN
                v_item_price := v_item_price + v_variant.price_modifier;
            END IF;
        END IF;
        v_item_subtotal := v_item_price * (v_item->>'quantity')::INT;

        INSERT INTO order_items (
            order_id,
            product_id,
            variant_id,
            product_name,
            product_sku,
            unit,
            unit_price,
            quantity,
            subtotal,
            image_url,
            selected_color,
            selected_finish
        ) VALUES (
            v_order_id,
            v_product.id,
            CASE WHEN (v_item->>'variantId') IS NOT NULL AND (v_item->>'variantId') <> '' THEN (v_item->>'variantId')::UUID ELSE NULL END,
            v_product.name,
            v_product.sku,
            v_product.unit,
            v_item_price,
            (v_item->>'quantity')::INT,
            v_item_subtotal,
            COALESCE(v_product.images->>0, ''),
            COALESCE(v_item->>'selectedColor', v_product.color),
            COALESCE(v_item->>'selectedFinish', v_product.finish)
        );
    END LOOP;

    -- 7. Upsert Customer Record
    INSERT INTO customers (email, full_name, phone, is_guest, created_at, updated_at)
    VALUES (
        LOWER(TRIM(p_order_data->>'customerEmail')),
        p_order_data->>'customerName',
        p_order_data->>'customerPhone',
        FALSE,
        NOW(),
        NOW()
    )
    ON CONFLICT (email) DO UPDATE
    SET full_name = EXCLUDED.full_name,
        phone = COALESCE(customers.phone, EXCLUDED.phone),
        updated_at = NOW();

    -- 8. Return Full Order with Items
    SELECT jsonb_build_object(
        'id', o.id,
        'order_number', o.order_number,
        'customer_name', o.customer_name,
        'customer_email', o.customer_email,
        'customer_phone', o.customer_phone,
        'shipping_address', o.shipping_address,
        'billing_address', o.billing_address,
        'subtotal', o.subtotal,
        'tax', o.tax,
        'shipping_fee', o.shipping_fee,
        'discount', o.discount,
        'total_amount', o.total_amount,
        'order_status', o.order_status,
        'payment_status', o.payment_status,
        'payment_method', o.payment_method,
        'utr_number', o.utr_number,
        'transaction_id', o.transaction_id,
        'notes', o.notes,
        'idempotency_key', o.idempotency_key,
        'created_at', o.created_at,
        'updated_at', o.updated_at,
        'items', COALESCE(jsonb_agg(to_jsonb(oi)), '[]'::jsonb)
    ) INTO v_created_order
    FROM orders o
    LEFT JOIN order_items oi ON oi.order_id = o.id
    WHERE o.id = v_order_id
    GROUP BY o.id;

    RETURN v_created_order;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. ATOMIC ORDER CANCELLATION & INVENTORY RESTORATION
CREATE OR REPLACE FUNCTION cancel_order_atomic(
    p_order_id UUID,
    p_actor_email TEXT DEFAULT 'system',
    p_note TEXT DEFAULT 'Order cancelled'
)
RETURNS JSONB AS $$
DECLARE
    v_order RECORD;
    v_item RECORD;
    v_updated_order JSONB;
BEGIN
    SELECT * INTO v_order
    FROM orders
    WHERE id = p_order_id
    FOR UPDATE;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Order with ID % not found', p_order_id;
    END IF;

    -- If already cancelled, do not restore stock again
    IF v_order.order_status = 'Cancelled' THEN
        SELECT to_jsonb(o) INTO v_updated_order FROM orders o WHERE o.id = p_order_id;
        RETURN v_updated_order;
    END IF;

    -- Only restore stock if cancelling prior to dispatch/delivery
    IF v_order.order_status IN ('Pending', 'Confirmed', 'Processing') THEN
        FOR v_item IN SELECT * FROM order_items WHERE order_id = p_order_id
        LOOP
            IF v_item.product_id IS NOT NULL THEN
                UPDATE products
                SET stock = stock + v_item.quantity,
                    updated_at = NOW()
                WHERE id = v_item.product_id;
            END IF;
        END LOOP;
    END IF;

    -- Update order status
    UPDATE orders
    SET order_status = 'Cancelled',
        updated_at = NOW()
    WHERE id = p_order_id;

    -- Record status history atomically
    INSERT INTO order_status_history (
        order_id,
        from_status,
        to_status,
        actor_email,
        note,
        created_at
    ) VALUES (
        p_order_id,
        v_order.order_status,
        'Cancelled',
        p_actor_email,
        p_note,
        NOW()
    );

    SELECT to_jsonb(o) INTO v_updated_order FROM orders o WHERE o.id = p_order_id;
    RETURN v_updated_order;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
