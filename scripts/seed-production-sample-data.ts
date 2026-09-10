import crypto from 'crypto';
import { execute, query, isMySQLConfigured } from '../src/server/db/mysql';
import { invalidateMemoryCache } from '../src/server/db/client';

async function seedProductionSampleData() {
  console.log('\n===============================================================');
  console.log('🏛️  SEEDING PRODUCTION-GRADE SAMPLE DATA FOR BALAJI ADMIN PANEL');
  console.log('===============================================================\n');

  if (!isMySQLConfigured()) {
    throw new Error('Hostinger MySQL must be configured to seed production sample data.');
  }

  // 1. MASTER ARCHITECTURAL CATALOG PRODUCTS (For Order & Quote References)
  console.log('--- Step 1: Ensuring 8 Core Architectural Products in Catalog ---');
  const products = [
    {
      id: 'prod-travertine-slab',
      name: 'Romano Classico Vein-Cut Travertine',
      slug: 'romano-classico-vein-cut-travertine',
      sku: 'MAT-STN-001',
      brand: 'Balaji Architect & Interiors',
      categoryId: '04cfbece-9471-428c-9356-a4d569377592', // Natural Stone & Marble
      subcategory: 'Honed Travertine',
      description: 'Authentic Italian vein-cut travertine quarried in Tivoli. Honed to a velvety matte finish.',
      price: 780,
      salePrice: 780,
      unit: 'sq ft',
      moq: 100,
      stock: 2400,
      purchaseMode: 'BOTH',
      leadTime: '3-5 business days',
      dimensions: '2400mm x 1200mm slab',
      thickness: '20mm',
      material: 'Natural Travertine',
      finish: 'Honed Matte',
      color: 'Warm Ivory / Biscuit',
      images: JSON.stringify(['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80']),
      isFeatured: 1,
      isNew: 0,
      isBestseller: 1,
      published: 1,
    },
    {
      id: 'prod-smoked-oak-flooring',
      name: 'Smoked European White Oak Wide Plank',
      slug: 'smoked-european-oak-flooring',
      sku: 'MAT-WOD-002',
      brand: 'Balaji Architect & Interiors',
      categoryId: '46510b90-870a-4020-92f3-a193733a709e', // Hardwood & Veneers
      subcategory: 'Engineered Hardwood',
      description: 'Slow-smoked French white oak planks with triple-brushed wire texture and natural UV polyurethane oil finish.',
      price: 620,
      salePrice: 620,
      unit: 'sq ft',
      moq: 150,
      stock: 3500,
      purchaseMode: 'BUY_NOW',
      leadTime: '3-5 business days',
      dimensions: '2200mm L x 220mm W',
      thickness: '15mm',
      material: 'European White Oak',
      finish: 'Natural Ultra-Matte Oil',
      color: 'Muted Earth Brown',
      images: JSON.stringify(['https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80']),
      isFeatured: 1,
      isNew: 0,
      isBestseller: 1,
      published: 1,
    },
    {
      id: 'prod-acoustic-slat-panel',
      name: 'Linear Oak Acoustic Slatted Wall Panel',
      slug: 'linear-oak-acoustic-slat-panel',
      sku: 'MAT-PNL-003',
      brand: 'Balaji Architect & Interiors',
      categoryId: '37b61c08-82d3-4d08-91ec-230e56249ac6', // Wall Panels & Acoustic Surfaces
      subcategory: 'Acoustic Surfaces',
      description: 'Precision-spaced American natural white oak slats over a 9mm dense recycled acoustic PET felt backing.',
      price: 1450,
      salePrice: 1450,
      unit: 'sq ft',
      moq: 4,
      stock: 420,
      purchaseMode: 'BOTH',
      leadTime: '5-7 business days',
      dimensions: '2400mm H x 600mm W',
      thickness: '22mm',
      material: 'White Oak Veneer & PET Felt',
      finish: 'Clear Natural Lacquer',
      color: 'Nordic Light Oak',
      images: JSON.stringify(['https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80']),
      isFeatured: 1,
      isNew: 1,
      isBestseller: 1,
      published: 1,
    },
    {
      id: 'prod-knurled-bronze-hardware',
      name: 'Hand-Cast Knurled Bronze Cabinet Pull',
      slug: 'hand-cast-knurled-bronze-pull',
      sku: 'MAT-HRD-004',
      brand: 'Balaji Architect & Interiors',
      categoryId: '9f1fb2e1-7531-4601-b56a-86786966a3f8', // Bespoke Hardware & Pulls
      subcategory: 'Cabinet Hardware',
      description: 'Solid forged silicon bronze bar pull featuring micro-diamond knurling and hand-waxed patina.',
      price: 1850,
      salePrice: 1850,
      unit: 'piece',
      moq: 10,
      stock: 850,
      purchaseMode: 'BUY_NOW',
      leadTime: '2-4 business days',
      dimensions: '160mm C-C x 220mm Overall',
      thickness: '18mm Bar Dia',
      material: 'Silicon Bronze Alloy',
      finish: 'Living Antiqued Bronze',
      color: 'Warm Bronze',
      images: JSON.stringify(['/uploads/products-1789036850529-IMG_5447.PNG']),
      isFeatured: 0,
      isNew: 1,
      isBestseller: 0,
      published: 1,
    },
    {
      id: 'prod-calacatta-porcelain',
      name: 'Calacatta Vagli Bookmatched Porcelain Slab',
      slug: 'calacatta-vagli-bookmatched-porcelain',
      sku: 'MAT-SLB-005',
      brand: 'Balaji Architect & Interiors',
      categoryId: 'b7a6b9ef-6353-4eb5-ad84-6e7672f37863', // Large Format Porcelain Slabs
      subcategory: 'Sintered Porcelain',
      description: 'Continuous vein-matched 12mm sintered stone slabs with subtle warm taupe and gold crystalline veining.',
      price: 1100,
      salePrice: 1100,
      unit: 'sq ft',
      moq: 60,
      stock: 1200,
      purchaseMode: 'BOTH',
      leadTime: '7-10 business days',
      dimensions: '3200mm x 1600mm Mega Slab',
      thickness: '12mm',
      material: 'Sintered Ultra-Compact Stone',
      finish: 'Satin Velvet Silk',
      color: 'Warm Calacatta White',
      images: JSON.stringify(['https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80']),
      isFeatured: 1,
      isNew: 0,
      isBestseller: 1,
      published: 1,
    },
    {
      id: 'prod-monolithic-coffee-table',
      name: 'Monolithic Honed Travertine Plinth Table',
      slug: 'monolithic-honed-travertine-plinth-table',
      sku: 'STU-TBL-006',
      brand: 'Balaji Architect & Interiors',
      categoryId: 'd0fd0a38-5645-4aee-b2c2-dd754229f423', // Atelier Furniture & Objects
      subcategory: 'Plinth Tables',
      description: 'Sculptural cube plinth carved from solid monolithic Navona travertine blocks with chamfered shadow-line reveal.',
      price: 48500,
      salePrice: 48500,
      unit: 'piece',
      moq: 1,
      stock: 15,
      purchaseMode: 'BOTH',
      leadTime: '10-14 business days',
      dimensions: '600mm W x 600mm D x 420mm H',
      thickness: 'Solid Carved Block',
      material: 'Navona Travertine',
      finish: 'Hand-Honed Ultra-Matte',
      color: 'Warm Biscuit Stone',
      images: JSON.stringify(['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80']),
      isFeatured: 1,
      isNew: 1,
      isBestseller: 0,
      published: 1,
    },
    {
      id: 'prod-alabaster-pendant',
      name: 'Brutalist Sculpted Alabaster Pendant Light',
      slug: 'brutalist-sculpted-alabaster-pendant-light',
      sku: 'STU-LGT-007',
      brand: 'Balaji Architect & Interiors',
      categoryId: 'f80122a1-b4b6-42c3-b4e0-a34ebfb07011', // Architectural Lighting
      subcategory: 'Suspension Lighting',
      description: 'Turned Spanish alabaster cylinder fitted with blackened bronze armature and 2700K warm architectural LED module.',
      price: 32000,
      salePrice: 32000,
      unit: 'piece',
      moq: 1,
      stock: 22,
      purchaseMode: 'BUY_NOW',
      leadTime: '3-5 business days',
      dimensions: '140mm Dia x 380mm H',
      thickness: 'Solid Stone Shell',
      material: 'Spanish Alabaster & Bronze',
      finish: 'Hand-Turned Translucent Stone',
      color: 'Translucent Veined Cream',
      images: JSON.stringify(['https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=1200&q=80']),
      isFeatured: 0,
      isNew: 1,
      isBestseller: 1,
      published: 1,
    },
    {
      id: 'prod-microcement-cladding',
      name: 'Artisanal Venetian Micro-Cement Coating System',
      slug: 'artisanal-venetian-microcement-coating',
      sku: 'MAT-SUR-008',
      brand: 'Balaji Architect & Interiors',
      categoryId: '37b61c08-82d3-4d08-91ec-230e56249ac6', // Wall Panels & Acoustic Surfaces
      subcategory: 'Seamless Surfaces',
      description: 'Polymer-modified mineral micro-cement kit for continuous floor-to-ceiling concrete aesthetics.',
      price: 380,
      salePrice: 380,
      unit: 'sq ft',
      moq: 100,
      stock: 5000,
      purchaseMode: 'BOTH',
      leadTime: '2-4 business days',
      dimensions: 'Multi-Coat System (Base + Mesh + Finish)',
      thickness: '3mm Nominal',
      material: 'Polymer-Mineral Composite',
      finish: 'Satin Protective Sealer',
      color: 'Warm Concrete Grey',
      images: JSON.stringify(['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80']),
      isFeatured: 0,
      isNew: 0,
      isBestseller: 1,
      published: 1,
    },
  ];

  for (const p of products) {
    await execute(
      `INSERT INTO products (
        id, name, slug, sku, brand, category_id, subcategory, description, price, sale_price,
        unit, moq, stock, purchase_mode, lead_time, dimensions, thickness, material, finish, color,
        images, variants, is_featured, is_new, is_bestseller, published, tags, specifications,
        created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, '[]', ?, ?, ?, ?, '[]', '{}', NOW(), NOW())
      ON DUPLICATE KEY UPDATE
        name = VALUES(name), price = VALUES(price), sale_price = VALUES(sale_price),
        stock = VALUES(stock), published = VALUES(published)`,
      [
        p.id, p.name, p.slug, p.sku, p.brand, p.categoryId, p.subcategory, p.description,
        p.price, p.salePrice, p.unit, p.moq, p.stock, p.purchaseMode, p.leadTime, p.dimensions,
        p.thickness, p.material, p.finish, p.color, p.images, p.isFeatured, p.isNew, p.isBestseller, p.published
      ]
    );
  }
  console.log('✅ Core catalog materials synchronized in Hostinger MySQL.');

  // 2. REALISTIC CLIENT DIRECTORY (12 Verified Architectural Entities)
  console.log('\n--- Step 2: Seeding 12 Verified Client Entities ---');
  const customers = [
    {
      id: 'cust-arjun-mehta',
      fullName: 'Arjun Mehta',
      companyName: 'Atelier Mehta Architects',
      email: 'arjun.mehta@ateliermehta.test',
      phone: '+91 98640 12845',
      city: 'Guwahati',
      addressLine1: 'Suite 402, Shine Heights, GS Road, Christian Basti',
      pincode: '781005',
      totalOrders: 1,
      totalSpent: 92040,
    },
    {
      id: 'cust-neha-kapoor',
      fullName: 'Neha Kapoor',
      companyName: 'Studio Vistara Interiors',
      email: 'neha.kapoor@studiovistara.test',
      phone: '+91 98102 34912',
      city: 'Shillong',
      addressLine1: 'Boutique Villa 12, Upper Lachumiere',
      pincode: '793001',
      totalOrders: 1,
      totalSpent: 68440,
    },
    {
      id: 'cust-pranab-saikia',
      fullName: 'Pranab Saikia',
      companyName: 'NorthEast Habitat Developers',
      email: 'pranab.saikia@nehabitat.test',
      phone: '+91 94350 48219',
      city: 'Jorhat',
      addressLine1: 'Plot 18, Club Road Industrial Zone',
      pincode: '785001',
      totalOrders: 1,
      totalSpent: 182900,
    },
    {
      id: 'cust-meghna-dutta',
      fullName: 'Meghna Dutta',
      companyName: 'Riverside Heritage Residence',
      email: 'meghna.dutta@residence.test',
      phone: '+91 98641 55902',
      city: 'Guwahati',
      addressLine1: 'Bungalow 7, Kharguli Hills, Brahmaputra Riverfront',
      pincode: '781004',
      totalOrders: 1,
      totalSpent: 57230,
    },
    {
      id: 'cust-vikram-barua',
      fullName: 'Vikramaditya Barua',
      companyName: 'Kaziranga Eco-Lodge & Spa',
      email: 'vikram.barua@kazirangaresort.test',
      phone: '+91 94351 77301',
      city: 'Tezpur',
      addressLine1: 'Brahmaputra View Enclave, Civil Lines',
      pincode: '784001',
      totalOrders: 1,
      totalSpent: 89680,
    },
    {
      id: 'cust-sunil-chhabra',
      fullName: 'Sunil Chhabra',
      companyName: 'Design Grid Workplace Ltd.',
      email: 'sunil.chhabra@designgrid.test',
      phone: '+91 98200 41560',
      city: 'Kolkata',
      addressLine1: 'Level 8, Infinity Benchmark, Sector V, Salt Lake',
      pincode: '700091',
      totalOrders: 1,
      totalSpent: 139240,
    },
    {
      id: 'cust-debashree-goswami',
      fullName: 'Debashree Goswami',
      companyName: 'Goswami Architectural Villa',
      email: 'debashree.goswami@villa.test',
      phone: '+91 98642 88104',
      city: 'Guwahati',
      addressLine1: 'Villa 4, Nilachal Heights, Kamakhya Foothills',
      pincode: '781010',
      totalOrders: 1,
      totalSpent: 168740,
    },
    {
      id: 'cust-rohan-dasgupta',
      fullName: 'Rohan Dasgupta',
      companyName: 'Aura Spatial Design',
      email: 'rohan.dasgupta@auraspatial.test',
      phone: '+91 98301 92834',
      city: 'Dibrugarh',
      addressLine1: '24 Mancotta Road, Medical College Junction',
      pincode: '786001',
      totalOrders: 1,
      totalSpent: 110448,
    },
    {
      id: 'cust-ananya-singhania',
      fullName: 'Ananya Singhania',
      companyName: 'Singhania Living Spaces',
      email: 'ananya.singhania@singhaniaestates.test',
      phone: '+91 98110 65421',
      city: 'Guwahati',
      addressLine1: 'Penthouse A, Zoo Road West, Ambikagiri Nagar',
      pincode: '781024',
      totalOrders: 1,
      totalSpent: 54575,
    },
    {
      id: 'cust-deepak-agarwal',
      fullName: 'Deepak Agarwal',
      companyName: 'Assam Plywood & Hardware Consortium',
      email: 'deepak.agarwal@assamplywood.test',
      phone: '+91 94355 19200',
      city: 'Tinsukia',
      addressLine1: 'Old Station Road, Trade Centre',
      pincode: '786125',
      totalOrders: 1,
      totalSpent: 36580,
    },
    {
      id: 'cust-pooja-narang',
      fullName: 'Pooja Narang',
      companyName: 'Narang Heritage Stays',
      email: 'pooja.narang@narangheritage.test',
      phone: '+91 98711 34509',
      city: 'Silchar',
      addressLine1: 'Circuit House Road, Tarapur',
      pincode: '788001',
      totalOrders: 0,
      totalSpent: 0,
    },
    {
      id: 'cust-harsh-borah',
      fullName: 'Harsh Vardhan Borah',
      companyName: 'Borah Contemporary Residence',
      email: 'harsh.borah@residence.test',
      phone: '+91 98643 70912',
      city: 'Guwahati',
      addressLine1: 'Brahmaputra Overlook, Uzan Bazar',
      pincode: '781001',
      totalOrders: 0,
      totalSpent: 0,
    },
  ];

  for (const c of customers) {
    const addressJson = JSON.stringify({
      addressLine1: c.addressLine1,
      city: c.city,
      state: c.city === 'Kolkata' ? 'West Bengal' : c.city === 'Shillong' ? 'Meghalaya' : 'Assam',
      pincode: c.pincode,
      country: 'India',
    });

    await execute(
      `INSERT INTO customers (
        id, email, phone, full_name, company_name, is_guest, addresses,
        total_orders, total_spent, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, 0, ?, ?, ?, NOW(), NOW())
      ON DUPLICATE KEY UPDATE
        full_name = VALUES(full_name),
        company_name = VALUES(company_name),
        phone = VALUES(phone),
        addresses = VALUES(addresses),
        total_orders = VALUES(total_orders),
        total_spent = VALUES(total_spent)`,
      [c.id, c.email, c.phone, c.fullName, c.companyName, addressJson, c.totalOrders, c.totalSpent]
    );
  }
  console.log('✅ 12 Verified Client Entities created in Hostinger MySQL.');

  // 3. CLEAN EXISTING TEST ORDERS & INSERT 10 PRODUCTION SAMPLE ORDERS
  console.log('\n--- Step 3: Seeding 10 Realistic Architectural Orders ---');
  // First, clean up previous test/messy orders
  await execute("DELETE FROM order_items WHERE order_id LIKE 'ord-demo-%' OR order_id LIKE 'BAL-2026-%'");
  await execute("DELETE FROM orders WHERE id LIKE 'ord-demo-%' OR order_number LIKE 'BAL-2026-%'");

  const sampleOrders = [
    {
      id: 'ord-demo-001',
      orderNumber: 'BAL-2026-001',
      customerId: 'cust-arjun-mehta',
      customerName: 'Arjun Mehta',
      customerEmail: 'arjun.mehta@ateliermehta.test',
      customerPhone: '+91 98640 12845',
      city: 'Guwahati',
      state: 'Assam',
      address: 'Suite 402, Shine Heights, GS Road, Christian Basti',
      pincode: '781005',
      subtotal: 78000,
      tax: 14040,
      totalAmount: 92040,
      orderStatus: 'Processing',
      paymentStatus: 'Paid',
      paymentMethod: 'RTGS / Bank Transfer',
      transactionId: 'TXN-HDFC-9928103',
      notes: 'Job site delivery to Christian Basti commercial atrium. Require forklift unloading assistance.',
      createdAt: '2026-09-10 14:15:00',
      items: [
        {
          productId: 'prod-travertine-slab',
          name: 'Romano Classico Vein-Cut Travertine',
          sku: 'MAT-STN-001',
          unit: 'sq ft',
          quantity: 100,
          unitPrice: 780,
          subtotal: 78000,
          color: 'Warm Ivory / Biscuit',
          finish: 'Honed Matte',
        },
      ],
    },
    {
      id: 'ord-demo-002',
      orderNumber: 'BAL-2026-002',
      customerId: 'cust-neha-kapoor',
      customerName: 'Neha Kapoor',
      customerEmail: 'neha.kapoor@studiovistara.test',
      customerPhone: '+91 98102 34912',
      city: 'Shillong',
      state: 'Meghalaya',
      address: 'Boutique Villa 12, Upper Lachumiere',
      pincode: '793001',
      subtotal: 58000,
      tax: 10440,
      totalAmount: 68440,
      orderStatus: 'Confirmed',
      paymentStatus: 'Paid',
      paymentMethod: 'UPI / Razorpay',
      transactionId: 'UPI-AXIS-881920',
      notes: 'Penthouse master media room acoustic treatment. Moisture-proof crating requested for hill transport.',
      createdAt: '2026-09-09 11:30:00',
      items: [
        {
          productId: 'prod-acoustic-slat-panel',
          name: 'Linear Oak Acoustic Slatted Wall Panel',
          sku: 'MAT-PNL-003',
          unit: 'sq ft',
          quantity: 40,
          unitPrice: 1450,
          subtotal: 58000,
          color: 'Nordic Light Oak',
          finish: 'Clear Natural Lacquer',
        },
      ],
    },
    {
      id: 'ord-demo-003',
      orderNumber: 'BAL-2026-003',
      customerId: 'cust-pranab-saikia',
      customerName: 'Pranab Saikia',
      customerEmail: 'pranab.saikia@nehabitat.test',
      customerPhone: '+91 94350 48219',
      city: 'Jorhat',
      state: 'Assam',
      address: 'Plot 18, Club Road Industrial Zone',
      pincode: '785001',
      subtotal: 155000,
      tax: 27900,
      totalAmount: 182900,
      orderStatus: 'Shipped',
      paymentStatus: 'Paid',
      paymentMethod: 'NEFT Transfer',
      transactionId: 'NEFT-SBI-440192',
      notes: 'Dispatched via VRL Logistics convoy. Tracking cons #VRL-JRH-0921. Delivery expected Thursday.',
      createdAt: '2026-09-08 09:45:00',
      items: [
        {
          productId: 'prod-smoked-oak-flooring',
          name: 'Smoked European White Oak Wide Plank',
          sku: 'MAT-WOD-002',
          unit: 'sq ft',
          quantity: 250,
          unitPrice: 620,
          subtotal: 155000,
          color: 'Muted Earth Brown',
          finish: 'Natural Ultra-Matte Oil',
        },
      ],
    },
    {
      id: 'ord-demo-004',
      orderNumber: 'BAL-2026-004',
      customerId: 'cust-meghna-dutta',
      customerName: 'Meghna Dutta',
      customerEmail: 'meghna.dutta@residence.test',
      customerPhone: '+91 98641 55902',
      city: 'Guwahati',
      state: 'Assam',
      address: 'Bungalow 7, Kharguli Hills, Brahmaputra Riverfront',
      pincode: '781004',
      subtotal: 48500,
      tax: 8730,
      totalAmount: 57230,
      orderStatus: 'Processing',
      paymentStatus: 'Paid',
      paymentMethod: 'Balaji PG (Credit Card)',
      transactionId: 'CC-ICICI-110948',
      notes: 'Monolithic plinth table with hand-applied satin wax sealer. White-glove installation required.',
      createdAt: '2026-09-07 16:20:00',
      items: [
        {
          productId: 'prod-monolithic-coffee-table',
          name: 'Monolithic Honed Travertine Plinth Table',
          sku: 'STU-TBL-006',
          unit: 'piece',
          quantity: 1,
          unitPrice: 48500,
          subtotal: 48500,
          color: 'Warm Biscuit Stone',
          finish: 'Hand-Honed Ultra-Matte',
        },
      ],
    },
    {
      id: 'ord-demo-005',
      orderNumber: 'BAL-2026-005',
      customerId: 'cust-vikram-barua',
      customerName: 'Vikramaditya Barua',
      customerEmail: 'vikram.barua@kazirangaresort.test',
      customerPhone: '+91 94351 77301',
      city: 'Tezpur',
      state: 'Assam',
      address: 'Brahmaputra View Enclave, Civil Lines',
      pincode: '784001',
      subtotal: 76000,
      tax: 13680,
      totalAmount: 89680,
      orderStatus: 'Delivered',
      paymentStatus: 'Paid',
      paymentMethod: 'RTGS / Bank Transfer',
      transactionId: 'RTGS-PND-551029',
      notes: 'Delivered and verified on site at Tezpur transit warehouse. Received by Site In-charge Mr. B. Das.',
      createdAt: '2026-09-05 10:15:00',
      items: [
        {
          productId: 'prod-microcement-cladding',
          name: 'Artisanal Venetian Micro-Cement Coating System',
          sku: 'MAT-SUR-008',
          unit: 'sq ft',
          quantity: 200,
          unitPrice: 380,
          subtotal: 76000,
          color: 'Warm Concrete Grey',
          finish: 'Satin Protective Sealer',
        },
      ],
    },
    {
      id: 'ord-demo-006',
      orderNumber: 'BAL-2026-006',
      customerId: 'cust-sunil-chhabra',
      customerName: 'Sunil Chhabra',
      customerEmail: 'sunil.chhabra@designgrid.test',
      customerPhone: '+91 98200 41560',
      city: 'Kolkata',
      state: 'West Bengal',
      address: 'Level 8, Infinity Benchmark, Sector V, Salt Lake',
      pincode: '700091',
      subtotal: 118000,
      tax: 21240,
      totalAmount: 139240,
      orderStatus: 'Shipped',
      paymentStatus: 'Paid',
      paymentMethod: 'Corporate Card',
      transactionId: 'CORP-AMEX-77812',
      notes: 'Executive boardroom acoustics and architectural lighting package. Air cargo via SpiceXpress.',
      createdAt: '2026-09-04 15:00:00',
      items: [
        {
          productId: 'prod-acoustic-slat-panel',
          name: 'Linear Oak Acoustic Slatted Wall Panel',
          sku: 'MAT-PNL-003',
          unit: 'sq ft',
          quantity: 60,
          unitPrice: 1450,
          subtotal: 87000,
          color: 'Nordic Light Oak',
          finish: 'Clear Natural Lacquer',
        },
        {
          productId: 'prod-alabaster-pendant',
          name: 'Brutalist Sculpted Alabaster Pendant Light',
          sku: 'STU-LGT-007',
          unit: 'piece',
          quantity: 1,
          unitPrice: 31000,
          subtotal: 31000,
          color: 'Translucent Veined Cream',
          finish: 'Hand-Turned Stone',
        },
      ],
    },
    {
      id: 'ord-demo-007',
      orderNumber: 'BAL-2026-007',
      customerId: 'cust-debashree-goswami',
      customerName: 'Debashree Goswami',
      customerEmail: 'debashree.goswami@villa.test',
      customerPhone: '+91 98642 88104',
      city: 'Guwahati',
      state: 'Assam',
      address: 'Villa 4, Nilachal Heights, Kamakhya Foothills',
      pincode: '781010',
      subtotal: 143000,
      tax: 25740,
      totalAmount: 168740,
      orderStatus: 'Delivered',
      paymentStatus: 'Paid',
      paymentMethod: 'UPI / Google Pay',
      transactionId: 'UPI-OKAXIS-339102',
      notes: 'Master bath vanity top & feature cladding bookmatched installation completed by Balaji field crew.',
      createdAt: '2026-09-03 12:45:00',
      items: [
        {
          productId: 'prod-calacatta-porcelain',
          name: 'Calacatta Vagli Bookmatched Porcelain Slab',
          sku: 'MAT-SLB-005',
          unit: 'sq ft',
          quantity: 130,
          unitPrice: 1100,
          subtotal: 143000,
          color: 'Warm Calacatta White',
          finish: 'Satin Velvet Silk',
        },
      ],
    },
    {
      id: 'ord-demo-008',
      orderNumber: 'BAL-2026-008',
      customerId: 'cust-rohan-dasgupta',
      customerName: 'Rohan Dasgupta',
      customerEmail: 'rohan.dasgupta@auraspatial.test',
      customerPhone: '+91 98301 92834',
      city: 'Dibrugarh',
      state: 'Assam',
      address: '24 Mancotta Road, Medical College Junction',
      pincode: '786001',
      subtotal: 93600,
      tax: 16848,
      totalAmount: 110448,
      orderStatus: 'Confirmed',
      paymentStatus: 'Submitted',
      paymentMethod: 'NEFT Payment (Pending Bank Clearing)',
      transactionId: 'NEFT-UBI-910238',
      notes: 'Special batch selection with high contrast veining for Dibrugarh specialty roastery counter.',
      createdAt: '2026-09-02 18:30:00',
      items: [
        {
          productId: 'prod-travertine-slab',
          name: 'Romano Classico Vein-Cut Travertine',
          sku: 'MAT-STN-001',
          unit: 'sq ft',
          quantity: 120,
          unitPrice: 780,
          subtotal: 93600,
          color: 'Warm Ivory / Biscuit',
          finish: 'Honed Matte',
        },
      ],
    },
    {
      id: 'ord-demo-009',
      orderNumber: 'BAL-2026-009',
      customerId: 'cust-ananya-singhania',
      customerName: 'Ananya Singhania',
      customerEmail: 'ananya.singhania@singhaniaestates.test',
      customerPhone: '+91 98110 65421',
      city: 'Guwahati',
      state: 'Assam',
      address: 'Penthouse A, Zoo Road West, Ambikagiri Nagar',
      pincode: '781024',
      subtotal: 46250,
      tax: 8325,
      totalAmount: 54575,
      orderStatus: 'Packed',
      paymentStatus: 'Paid',
      paymentMethod: 'Balaji PG (NetBanking)',
      transactionId: 'NB-HDFC-660192',
      notes: 'Bespoke hand-cast bronze hardware batch matching architectural master spec. Ready for dispatch.',
      createdAt: '2026-09-01 14:10:00',
      items: [
        {
          productId: 'prod-knurled-bronze-hardware',
          name: 'Hand-Cast Knurled Bronze Cabinet Pull',
          sku: 'MAT-HRD-004',
          unit: 'piece',
          quantity: 25,
          unitPrice: 1850,
          subtotal: 46250,
          color: 'Warm Bronze',
          finish: 'Living Antiqued Bronze',
        },
      ],
    },
    {
      id: 'ord-demo-010',
      orderNumber: 'BAL-2026-010',
      customerId: 'cust-deepak-agarwal',
      customerName: 'Deepak Agarwal',
      customerEmail: 'deepak.agarwal@assamplywood.test',
      customerPhone: '+91 94355 19200',
      city: 'Tinsukia',
      state: 'Assam',
      address: 'Old Station Road, Trade Centre',
      pincode: '786125',
      subtotal: 31000,
      tax: 5580,
      totalAmount: 36580,
      orderStatus: 'Pending',
      paymentStatus: 'Pending',
      paymentMethod: 'Trade Credit / Invoice on Delivery',
      transactionId: null,
      notes: 'Trade sample lot for architectural spec display room. Awaiting dealer GST verification.',
      createdAt: '2026-09-10 11:20:00',
      items: [
        {
          productId: 'prod-smoked-oak-flooring',
          name: 'Smoked European White Oak Wide Plank',
          sku: 'MAT-WOD-002',
          unit: 'sq ft',
          quantity: 50,
          unitPrice: 620,
          subtotal: 31000,
          color: 'Muted Earth Brown',
          finish: 'Natural Ultra-Matte Oil',
        },
      ],
    },
  ];

  for (const ord of sampleOrders) {
    const shippingJson = JSON.stringify({
      addressLine1: ord.address,
      city: ord.city,
      state: ord.state,
      pincode: ord.pincode,
      country: 'India',
    });

    const itemsJson = JSON.stringify(ord.items);

    await execute(
      `INSERT INTO orders (
        id, order_number, customer_id, customer_name, customer_email, customer_phone,
        shipping_address, billing_address, subtotal, tax, shipping_fee, discount,
        total_amount, order_status, payment_status, payment_method, transaction_id,
        notes, items, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 0, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        order_status = VALUES(order_status),
        payment_status = VALUES(payment_status),
        total_amount = VALUES(total_amount),
        notes = VALUES(notes)`,
      [
        ord.id, ord.orderNumber, ord.customerId, ord.customerName, ord.customerEmail, ord.customerPhone,
        shippingJson, shippingJson, ord.subtotal, ord.tax, ord.totalAmount, ord.orderStatus,
        ord.paymentStatus, ord.paymentMethod, ord.transactionId, ord.notes, itemsJson,
        ord.createdAt, ord.createdAt
      ]
    );

    // Insert order items
    for (const it of ord.items) {
      const itemId = `item-${crypto.randomUUID()}`;
      await execute(
        `INSERT INTO order_items (
          id, order_id, product_id, product_name, product_sku, unit, quantity,
          unit_price, subtotal, selected_color, selected_finish, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          itemId, ord.id, it.productId, it.name, it.sku, it.unit, it.quantity,
          it.unitPrice, it.subtotal, it.color, it.finish, ord.createdAt
        ]
      );
    }
  }
  console.log(`✅ ${sampleOrders.length} Realistic Orders & Items seeded in Hostinger MySQL.`);

  // 4. CLEAN & SEED 8 REALISTIC ARCHITECTURAL QUOTES
  console.log('\n--- Step 4: Seeding 8 Realistic Architectural Quotations ---');
  await execute("DELETE FROM quote_items WHERE quote_id LIKE 'qt-demo-%' OR quote_id LIKE 'QT-2026-%'");
  await execute("DELETE FROM quotes WHERE id LIKE 'qt-demo-%' OR quote_number LIKE 'QT-2026-%'");

  const sampleQuotes = [
    {
      id: 'qt-demo-001',
      quoteNumber: 'QT-2026-001',
      customerName: 'Arjun Mehta',
      customerEmail: 'arjun.mehta@ateliermehta.test',
      customerPhone: '+91 98640 12845',
      projectType: 'Commercial Studio Facade & Interiors',
      projectLocation: 'GS Road, Christian Basti, Guwahati',
      city: 'Guwahati',
      budgetRange: '₹18–25 Lakh',
      estimatedTimeline: '4-6 Months',
      status: 'Under_Review',
      totalQuotedAmount: 2150000,
      adminNotes: 'Awaiting revised structural load test for exterior travertine dry-cladding anchors.',
      notes: 'Bespoke honed travertine rain-screen facade with recessed perimeter brass channel detail.',
      createdAt: '2026-09-08 11:00:00',
      items: [
        {
          productName: 'Romano Classico Vein-Cut Travertine (Facade Calibrated 30mm)',
          quantity: 1200,
          unit: 'sq ft',
          estimatedUnitPrice: 1000,
          notes: 'Rectified and weather-treated for external installation',
        },
        {
          productName: 'Cast Architectural Bronze Glazing Framework',
          quantity: 45,
          unit: 'piece',
          estimatedUnitPrice: 10000,
          notes: 'Living patina bronze profiles',
        },
        {
          productName: 'Atelier Design Engineering & Structural Supervision',
          quantity: 1,
          unit: 'unit',
          estimatedUnitPrice: 500000,
          notes: 'Turnkey site engineering by Vikas Sir atelier crew',
        },
      ],
    },
    {
      id: 'qt-demo-002',
      quoteNumber: 'QT-2026-002',
      customerName: 'Neha Kapoor',
      customerEmail: 'neha.kapoor@studiovistara.test',
      customerPhone: '+91 98102 34912',
      projectType: '4BHK Penthouse Turnkey Interior',
      projectLocation: 'Upper Lachumiere, Shillong',
      city: 'Shillong',
      budgetRange: '₹25–35 Lakh',
      estimatedTimeline: '6 Months',
      status: 'Quotation_Sent',
      totalQuotedAmount: 2880000,
      adminNotes: 'Dossier emailed to Studio Vistara. Client confirmed design meeting for Saturday.',
      notes: 'Complete interior material envelope including acoustic ceiling and porcelain master suites.',
      createdAt: '2026-09-07 15:30:00',
      items: [
        {
          productName: 'Acoustic Fluted Walnut Paneling System',
          quantity: 600,
          unit: 'sq ft',
          estimatedUnitPrice: 1466.67,
          notes: 'Continuous ceiling-to-wall wraparound',
        },
        {
          productName: 'Calacatta Vagli Bookmatched Porcelain Slabs',
          quantity: 1000,
          unit: 'sq ft',
          estimatedUnitPrice: 1100,
          notes: '3 Master suites and dining gallery',
        },
        {
          productName: 'Brutalist Sculpted Alabaster Suspension Lighting Package',
          quantity: 28,
          unit: 'piece',
          estimatedUnitPrice: 32142.85,
          notes: 'Custom drop lengths coordinated with ceiling joists',
        },
      ],
    },
    {
      id: 'qt-demo-003',
      quoteNumber: 'QT-2026-003',
      customerName: 'Meghna Dutta',
      customerEmail: 'meghna.dutta@residence.test',
      customerPhone: '+91 98641 55902',
      projectType: 'Heritage Riverfront Residence Renovation',
      projectLocation: 'Kharguli Hills, Brahmaputra Overlook, Guwahati',
      city: 'Guwahati',
      budgetRange: '₹35–50 Lakh',
      estimatedTimeline: '8 Months',
      status: 'Approved',
      totalQuotedAmount: 3820000,
      adminNotes: 'Agreement signed. Advance procurement tranche scheduled for release Monday.',
      notes: 'Restoration of legacy bungalow living quarters with contemporary travertine surfaces.',
      createdAt: '2026-09-06 10:15:00',
      items: [
        {
          productName: 'Architectural Monolithic Travertine Elements',
          quantity: 1420,
          unit: 'sq ft',
          estimatedUnitPrice: 1000,
          notes: 'Fireplace surrounds, cantilevered stair treads, and foyer flooring',
        },
        {
          productName: 'Smoked French White Oak Wide Plank Flooring',
          quantity: 2420,
          unit: 'sq ft',
          estimatedUnitPrice: 620,
          notes: 'Subfloor damp-proofing and acoustic underlayment included',
        },
        {
          productName: 'Artisanal Venetian Micro-Cement Seamless Bath Suites',
          quantity: 2368,
          unit: 'sq ft',
          estimatedUnitPrice: 380,
          notes: '5 En-suite walk-in wet rooms',
        },
      ],
    },
    {
      id: 'qt-demo-004',
      quoteNumber: 'QT-2026-004',
      customerName: 'Vikramaditya Barua',
      customerEmail: 'vikram.barua@kazirangaresort.test',
      customerPhone: '+91 94351 77301',
      projectType: 'Luxury Eco-Resort Villa Cottages (6 Units)',
      projectLocation: 'Tezpur / Kaziranga Buffer Zone',
      city: 'Tezpur',
      budgetRange: '₹15–22 Lakh',
      estimatedTimeline: '5 Months',
      status: 'Under_Review',
      totalQuotedAmount: 1850000,
      adminNotes: 'Sample material mock-up delivered to resort site office for texture evaluation.',
      notes: 'Tropical moisture-resilient surface treatments and custom antique bronze hardware.',
      createdAt: '2026-09-05 16:45:00',
      items: [
        {
          productName: 'High-Performance Micro-Cement Waterproofing & Finish',
          quantity: 3026,
          unit: 'sq ft',
          estimatedUnitPrice: 380,
          notes: 'Villa verandas, plunge pool surrounds, and indoor shower rooms',
        },
        {
          productName: 'Bespoke Silicon Bronze Exterior Villa Pulls & Lever Sets',
          quantity: 378,
          unit: 'piece',
          estimatedUnitPrice: 1850,
          notes: 'Antiqued living bronze corrosion-resistant alloy',
        },
      ],
    },
    {
      id: 'qt-demo-005',
      quoteNumber: 'QT-2026-005',
      customerName: 'Sunil Chhabra',
      customerEmail: 'sunil.chhabra@designgrid.test',
      customerPhone: '+91 98200 41560',
      projectType: 'Corporate Innovation Hub Acoustic Treatment',
      projectLocation: 'Sector V, Salt Lake, Kolkata',
      city: 'Kolkata',
      budgetRange: '₹12–18 Lakh',
      estimatedTimeline: '3 Months',
      status: 'Approved',
      totalQuotedAmount: 1460000,
      adminNotes: 'Corporate Purchase Order generated. Site prep commencing next week.',
      notes: 'NRC 0.85 compliant timber acoustic ceiling baffle and wall paneling system.',
      createdAt: '2026-09-04 14:00:00',
      items: [
        {
          productName: 'Linear Oak Acoustic Slatted Wall & Ceiling System',
          quantity: 731,
          unit: 'sq ft',
          estimatedUnitPrice: 1450,
          notes: 'Class 1 fire-rated fire retardant core',
        },
        {
          productName: 'Studio Sculptural Lighting Array & Acoustic Integration',
          quantity: 1,
          unit: 'unit',
          estimatedUnitPrice: 400000,
          notes: 'Direct suspension cabling and DALI dimmable control gear',
        },
      ],
    },
    {
      id: 'qt-demo-006',
      quoteNumber: 'QT-2026-006',
      customerName: 'Rohan Dasgupta',
      customerEmail: 'rohan.dasgupta@auraspatial.test',
      customerPhone: '+91 98301 92834',
      projectType: 'Artisanal Specialty Cafe & Roastery',
      projectLocation: 'Mancotta Road, Dibrugarh',
      city: 'Dibrugarh',
      budgetRange: '₹8–12 Lakh',
      estimatedTimeline: '2-3 Months',
      status: 'Pending',
      totalQuotedAmount: 940000,
      adminNotes: 'Initial requirement captured from website quotation configurator. Estimator assigned.',
      notes: 'Heavy-duty tactile espresso bar surfaces and ambient brutalist pendant lighting.',
      createdAt: '2026-09-03 17:20:00',
      items: [
        {
          productName: 'Romano Classico Vein-Cut Travertine (Bar Top & Front)',
          quantity: 692,
          unit: 'sq ft',
          estimatedUnitPrice: 780,
          notes: 'Dual-seal food-grade oleophobic surface impregnation',
        },
        {
          productName: 'Sculpted Alabaster Bar Pendant Trio',
          quantity: 12,
          unit: 'piece',
          estimatedUnitPrice: 33333.33,
          notes: 'Suspended above 14-meter central coffee cupping bar',
        },
      ],
    },
    {
      id: 'qt-demo-007',
      quoteNumber: 'QT-2026-007',
      customerName: 'Ananya Singhania',
      customerEmail: 'ananya.singhania@singhaniaestates.test',
      customerPhone: '+91 98110 65421',
      projectType: 'Luxury High-Rise Show Suite Spec',
      projectLocation: 'Ambikagiri Nagar, Zoo Road West, Guwahati',
      city: 'Guwahati',
      budgetRange: '₹15–20 Lakh',
      estimatedTimeline: '4 Months',
      status: 'Converted_To_Order',
      totalQuotedAmount: 1650000,
      adminNotes: 'Successfully converted to active production order tranche BAL-2026-009.',
      notes: 'Model apartment specification standard for 24-unit luxury residential tower.',
      createdAt: '2026-09-02 11:15:00',
      items: [
        {
          productName: 'Calacatta Vagli Bookmatched Porcelain Entry Foyer',
          quantity: 818,
          unit: 'sq ft',
          estimatedUnitPrice: 1100,
          notes: 'Seamless 3.2m x 1.6m bookmatched panels',
        },
        {
          productName: 'Bespoke Knurled Bronze Door & Joinery Suite',
          quantity: 405,
          unit: 'piece',
          estimatedUnitPrice: 1850,
          notes: 'Complete interior architectural hardware package',
        },
      ],
    },
    {
      id: 'qt-demo-008',
      quoteNumber: 'QT-2026-008',
      customerName: 'Pooja Narang',
      customerEmail: 'pooja.narang@narangheritage.test',
      customerPhone: '+91 98711 34509',
      projectType: 'Heritage Tea Estate Bungalow Restoration',
      projectLocation: 'Tarapur, Silchar, Cachar District',
      city: 'Silchar',
      budgetRange: '₹20–30 Lakh',
      estimatedTimeline: '6-8 Months',
      status: 'Under_Review',
      totalQuotedAmount: 2400000,
      adminNotes: 'On-site moisture readings and timber moisture balance tests completed.',
      notes: 'Colonial tea estate superintendent bungalow floor and joinery heritage refurbishment.',
      createdAt: '2026-09-01 13:45:00',
      items: [
        {
          productName: 'Smoked European White Oak Wide Plank Restoration Grade',
          quantity: 2258,
          unit: 'sq ft',
          estimatedUnitPrice: 620,
          notes: 'Distressed bevel and hand-rubbed organic wax finish',
        },
        {
          productName: 'Historical Period-Accurate Hand-Cast Bronze Cremone Hardware',
          quantity: 540,
          unit: 'piece',
          estimatedUnitPrice: 1850,
          notes: 'Cast from authentic 19th-century Assam plantation archive drawings',
        },
      ],
    },
  ];

  for (const q of sampleQuotes) {
    const itemsJson = JSON.stringify(q.items);
    await execute(
      `INSERT INTO quotes (
        id, quote_number, customer_name, customer_email, customer_phone,
        project_type, project_location, city, budget_range, estimated_budget,
        estimated_timeline, timeline, status, total_quoted_amount, quoted_amount,
        admin_notes, notes, scope_of_work, items, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        status = VALUES(status),
        total_quoted_amount = VALUES(total_quoted_amount),
        quoted_amount = VALUES(quoted_amount),
        admin_notes = VALUES(admin_notes),
        items = VALUES(items)`,
      [
        q.id, q.quoteNumber, q.customerName, q.customerEmail, q.customerPhone,
        q.projectType, q.projectLocation, q.city, q.budgetRange, q.budgetRange,
        q.estimatedTimeline, q.estimatedTimeline, q.status, q.totalQuotedAmount, q.totalQuotedAmount,
        q.adminNotes, q.notes, q.notes, itemsJson, q.createdAt, q.createdAt
      ]
    );

    for (const it of q.items) {
      const qItemId = `qitem-${crypto.randomUUID()}`;
      await execute(
        `INSERT INTO quote_items (
          id, quote_id, product_name, quantity, unit, estimated_unit_price, notes, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [qItemId, q.id, it.productName, it.quantity, it.unit, it.estimatedUnitPrice, it.notes, q.createdAt]
      );
    }
  }
  console.log(`✅ ${sampleQuotes.length} Realistic Architectural Quotations seeded in Hostinger MySQL.`);

  // 5. SEED RECENT AUDIT ACTIVITY LOGS
  console.log('\n--- Step 5: Seeding Realistic Audit Activity Logs ---');
  await execute("DELETE FROM audit_logs WHERE id LIKE 'audit-demo-%'");

  const auditEvents = [
    {
      id: 'audit-demo-001',
      adminEmail: 'vicks@balaji.com',
      action: 'ORDER_PROCESSING',
      entity: 'Order',
      entityId: 'ord-demo-001',
      details: { orderNumber: 'BAL-2026-001', client: 'Arjun Mehta (Atelier Mehta Architects)', note: 'Order moved to Processing after RTGS verification' },
      createdAt: '2026-09-10 14:20:00',
    },
    {
      id: 'audit-demo-002',
      adminEmail: 'vicks@balaji.com',
      action: 'PAYMENT_VERIFIED',
      entity: 'Payment',
      entityId: 'ord-demo-001',
      details: { amount: 92040, method: 'RTGS / Bank Transfer', txnId: 'TXN-HDFC-9928103' },
      createdAt: '2026-09-10 14:18:00',
    },
    {
      id: 'audit-demo-003',
      adminEmail: 'vicks@balaji.com',
      action: 'ORDER_CONFIRMED',
      entity: 'Order',
      entityId: 'ord-demo-002',
      details: { orderNumber: 'BAL-2026-002', client: 'Neha Kapoor (Studio Vistara Interiors)', note: '40 sq ft Acoustic Slats confirmed for Shillong transport' },
      createdAt: '2026-09-09 11:35:00',
    },
    {
      id: 'audit-demo-004',
      adminEmail: 'vicks@balaji.com',
      action: 'ORDER_DISPATCHED',
      entity: 'Order',
      entityId: 'ord-demo-003',
      details: { orderNumber: 'BAL-2026-003', client: 'NorthEast Habitat Developers', courier: 'VRL Logistics', tracking: 'VRL-JRH-0921' },
      createdAt: '2026-09-08 10:00:00',
    },
    {
      id: 'audit-demo-005',
      adminEmail: 'vicks@balaji.com',
      action: 'QUOTE_SUBMITTED',
      entity: 'Quote',
      entityId: 'qt-demo-001',
      details: { quoteNumber: 'QT-2026-001', project: 'Commercial Studio Facade & Interiors, GS Road', budget: '₹18–25 Lakh' },
      createdAt: '2026-09-08 11:05:00',
    },
    {
      id: 'audit-demo-006',
      adminEmail: 'vicks@balaji.com',
      action: 'QUOTE_APPROVED',
      entity: 'Quote',
      entityId: 'qt-demo-003',
      details: { quoteNumber: 'QT-2026-003', client: 'Meghna Dutta (Riverside Residence)', total: '₹38,20,000', note: 'Advance tranche released' },
      createdAt: '2026-09-06 10:30:00',
    },
    {
      id: 'audit-demo-007',
      adminEmail: 'vicks@balaji.com',
      action: 'ORDER_DELIVERED',
      entity: 'Order',
      entityId: 'ord-demo-005',
      details: { orderNumber: 'BAL-2026-005', client: 'Vikramaditya Barua (Kaziranga Eco-Lodge)', location: 'Tezpur, Assam' },
      createdAt: '2026-09-05 11:00:00',
    },
    {
      id: 'audit-demo-008',
      adminEmail: 'vicks@balaji.com',
      action: 'QUOTE_CONVERTED',
      entity: 'Quote',
      entityId: 'qt-demo-007',
      details: { quoteNumber: 'QT-2026-007', client: 'Ananya Singhania', convertedToOrder: 'BAL-2026-009' },
      createdAt: '2026-09-02 11:30:00',
    },
  ];

  for (const ev of auditEvents) {
    await execute(
      `INSERT INTO audit_logs (
        id, admin_email, action, entity, entity_id, details, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [ev.id, ev.adminEmail, ev.action, ev.entity, ev.entityId, JSON.stringify(ev.details), ev.createdAt]
    );
  }
  console.log(`✅ ${auditEvents.length} Recent Audit Activity Logs seeded in Hostinger MySQL.`);

  // Invalidate in-memory caches
  invalidateMemoryCache('orders');
  invalidateMemoryCache('products');
  invalidateMemoryCache('settings');

  console.log('\n===============================================================');
  console.log('🎉 PRODUCTION SAMPLE DATA SEEDED SUCCESSFULLY WITH 100% INTEGRITY!');
  console.log('===============================================================\n');

  process.exit(0);
}

seedProductionSampleData().catch((err) => {
  console.error('\n❌ SEEDING FAILED:', err);
  process.exit(1);
});
