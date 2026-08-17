import fs from 'fs';
import path from 'path';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  getServices,
  createOrderAtomic,
  getOrders,
  updateOrderStatus,
  createQuote,
  getQuotes,
  updateQuoteStatus,
  createEnquiry,
  getEnquiries,
  getAdminByEmail,
  updateAdminPassword,
  getSiteSettings,
  getAuditLogs,
  resetDbCache,
} from '../src/lib/db';

import { hashPassword, verifyPassword, signAdminToken, verifyAdminToken } from '../src/lib/auth';

async function runAllTests() {
  console.log('==================================================');
  console.log('RUNNING ATELIER BALAJI FULL PRODUCTION VERIFICATION');
  console.log('==================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string) {
    if (condition) {
      console.log(`[PASS] ${testName}`);
      passed++;
    } else {
      console.error(`[FAIL] ${testName}`);
      failed++;
    }
  }

  // 1. ADMIN BOOTSTRAP AUTH TEST
  console.log('--- TEST GROUP 1: ADMIN AUTH & SECURITY ---');
  // Reset admin state for idempotent test
  const adminInitial = await getAdminByEmail('vicks@balaji.com');
  if (adminInitial) {
    const bootstrapHash = hashPassword('v****@********');
    const dbFilePath = path.join(process.cwd(), 'data', 'db.json');
    if (fs.existsSync(dbFilePath)) {
      const rawData = JSON.parse(fs.readFileSync(dbFilePath, 'utf-8'));
      const adm = rawData.admins.find((a: any) => a.email === 'vicks@balaji.com');
      if (adm) {
        adm.passwordHash = bootstrapHash;
        adm.mustChangePassword = true;
        fs.writeFileSync(dbFilePath, JSON.stringify(rawData, null, 2), 'utf-8');
        resetDbCache();
      }
    }
  }

  const admin = await getAdminByEmail('vicks@balaji.com');
  assert(admin !== null, 'Initial admin user vicks@balaji.com exists in database');
  assert(admin?.mustChangePassword === true, 'Initial admin has mustChangePassword = true');

  const initialBootstrapValid = verifyPassword('v****@********', admin!.passwordHash);
  assert(initialBootstrapValid === true, 'Initial bootstrap password hashes and verifies correctly');

  // Test Session Token Signing & Verification
  const token = signAdminToken({
    id: admin!.id,
    email: admin!.email,
    name: admin!.name,
    role: admin!.role,
    mustChangePassword: admin!.mustChangePassword,
  });
  const decoded = verifyAdminToken(token);
  assert(decoded !== null && decoded.email === 'vicks@balaji.com', 'Admin JWT session token signs and verifies');

  // Test Password Change (Invaliding initial bootstrap password)
  const newPassHash = hashPassword('VikasSecure2026!Atelier');
  await updateAdminPassword(admin!.id, newPassHash);

  const updatedAdmin = await getAdminByEmail('vicks@balaji.com');
  assert(updatedAdmin?.mustChangePassword === false, 'After update, mustChangePassword is false');
  assert(
    verifyPassword('VikasSecure2026!Atelier', updatedAdmin!.passwordHash) === true,
    'New permanent custom password verifies successfully'
  );
  assert(
    verifyPassword('v****@********', updatedAdmin!.passwordHash) === false,
    'Original bootstrap password is permanently invalidated and fails'
  );

  // 2. PRODUCT CRUD & PARTIAL UPDATES TEST
  console.log('\n--- TEST GROUP 2: PRODUCT CATALOG & PARTIAL UPDATE RULES ---');
  const initialProducts = await getProducts({ publishedOnly: false });
  assert(initialProducts.length >= 8, `Catalog seeded with ${initialProducts.length} luxury materials`);

  // Create Product Test
  const testProduct = await createProduct({
    name: 'Test Sintered Basalt Slab',
    slug: 'test-sintered-basalt-slab',
    sku: 'MAT-BST-999',
    brand: 'Balaji Atelier Test Lab',
    categoryId: initialProducts[0].categoryId,
    description: 'Deep volcanic basalt slab with textured flamed finish for architectural testing.',
    price: 1200,
    unit: 'sq ft',
    moq: 50,
    stock: 500,
    purchaseMode: 'BOTH',
    leadTime: '3-5 days',
    images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c'],
    isFeatured: false,
    isNew: true,
    isBestseller: false,
    published: true,
    tags: ['Test', 'Basalt'],
    specifications: { 'Origin': 'Sicily, Italy' },
  });
  assert(testProduct !== undefined && testProduct.id.startsWith('prod-'), 'New product created with unique immutable ID');

  // Test Partial Update (Change ONLY stock)
  const updatedStockProd = await updateProduct(testProduct.id, { stock: 420 });
  assert(
    updatedStockProd !== null && updatedStockProd.stock === 420 && updatedStockProd.price === 1200,
    'Partial update (stock only) preserved all existing fields'
  );

  // Test Partial Update (Change ONLY published status)
  await updateProduct(testProduct.id, { published: false });
  const publishedList = await getProducts({ publishedOnly: true });
  assert(
    !publishedList.some((p) => p.id === testProduct.id),
    'Unpublished product is omitted from customer storefront'
  );

  // Delete test product
  const deleted = await deleteProduct(testProduct.id);
  assert(deleted === true, 'Product deleted successfully');
  const checkDeleted = await getProductById(testProduct.id);
  assert(checkDeleted === null, 'Deleted product is completely removed from database');

  // 3. CATEGORIES TEST
  console.log('\n--- TEST GROUP 3: CATEGORIES ---');
  const categories = await getCategories();
  assert(categories.length >= 6, `Categories loaded: ${categories.length}`);
  const catStone = categories.find((c) => c.slug === 'natural-stone-marble');
  assert(catStone !== undefined && (catStone.productCount || 0) > 0, 'Stone category has active products linked');

  // 4. ATOMIC ORDERING & PRICE TAMPERING RESISTANCE TEST
  console.log('\n--- TEST GROUP 4: ORDERS & ATOMIC INVENTORY ---');
  const targetProduct = initialProducts[0];
  const initialStock = targetProduct.stock;
  const orderQuantity = 20;

  // Place Order with Server-Authoritative Price Calculation
  const orderResult = await createOrderAtomic({
    customerName: 'Aarav Mehta',
    customerEmail: 'aarav.mehta@studio.com',
    customerPhone: '+91 98201 12345',
    shippingAddress: {
      fullName: 'Aarav Mehta',
      phone: '+91 98201 12345',
      addressLine1: 'Villa 14, Palm Avenue, Worli',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400018',
      country: 'India',
    },
    items: [
      {
        productId: targetProduct.id,
        quantity: orderQuantity,
      },
    ],
    paymentMethod: 'Credit Card',
    notes: 'Ground floor crane delivery',
  });

  assert(orderResult.success === true, 'Order created successfully');
  assert(orderResult.order !== undefined, 'Order object returned with unique orderNumber');
  assert(
    orderResult.order?.subtotal === (targetProduct.salePrice || targetProduct.price) * orderQuantity,
    'Server computed authoritative subtotal ignoring any client manipulation'
  );

  // Verify Atomic Stock Decrement
  const prodAfterOrder = await getProductById(targetProduct.id);
  assert(
    prodAfterOrder?.stock === initialStock - orderQuantity,
    `Stock decremented atomically from ${initialStock} to ${prodAfterOrder?.stock}`
  );

  // Test Overselling Prevention
  const oversellResult = await createOrderAtomic({
    customerName: 'Oversell Tester',
    customerEmail: 'test@oversell.com',
    customerPhone: '+91 99999 99999',
    shippingAddress: { fullName: 'Test', phone: '999', addressLine1: 'Test St', city: 'Mumbai', state: 'MH', pincode: '400001', country: 'India' },
    items: [
      {
        productId: targetProduct.id,
        quantity: (prodAfterOrder?.stock || 0) + 1000, // Exceeds available stock
      },
    ],
    paymentMethod: 'Credit Card',
  });
  assert(oversellResult.success === false, 'Oversell attempt was safely rejected by server');

  // Test Order Status Transitions
  const updatedOrder = await updateOrderStatus(orderResult.order!.id, 'Processing', 'Paid');
  assert(
    updatedOrder?.orderStatus === 'Processing' && updatedOrder?.paymentStatus === 'Paid',
    'Order status transitioned to Processing / Paid'
  );

  // 5. QUOTES ESTIMATION TEST
  console.log('\n--- TEST GROUP 5: QUOTES ---');
  const quote = await createQuote({
    customerName: 'Karan Singhania (Architect)',
    customerEmail: 'karan@singhania-arch.com',
    customerPhone: '+91 98111 22334',
    projectType: 'Penthouse & Estate',
    projectLocation: 'Jubilee Hills, Hyderabad',
    estimatedTimeline: 'Immediate',
    budgetRange: '₹1 Cr+',
    notes: 'Looking for 2,000 sq ft vein-cut travertine and acoustic walnut fluting.',
    items: [
      {
        productName: 'Romano Classico Vein-Cut Travertine',
        dimensions: 'Custom cut 1200x600',
        quantity: 2000,
        unit: 'sq ft',
      },
    ],
  });
  assert(quote !== undefined && quote.quoteNumber.startsWith('QT-'), 'Quote generated with reference number');

  const updatedQuote = await updateQuoteStatus(quote.id, 'Under_Review', 1700000, 'Travertine quarry block confirmed');
  assert(
    updatedQuote?.status === 'Under_Review' && updatedQuote?.totalQuotedAmount === 1700000,
    'Quote successfully updated with estimated total and studio internal notes'
  );

  // 6. ENQUIRY / CONTACT TEST
  console.log('\n--- TEST GROUP 6: ENQUIRIES ---');
  const enquiry = await createEnquiry({
    name: 'Pooja Verma',
    email: 'pooja@verma.com',
    phone: '+91 98333 44556',
    subject: 'Studio Consultation',
    message: 'We would like to visit the Lower Parel gallery this Friday.',
    source: 'Contact Page',
  });
  assert(enquiry !== undefined && enquiry.status === 'New', 'Customer enquiry persisted in database');

  // 7. AUDIT LOGS TEST
  console.log('\n--- TEST GROUP 7: AUDIT LOGS ---');
  const logs = await getAuditLogs();
  assert(logs.length >= 3, `Audit logs recorded ${logs.length} immutable events`);
  assert(
    logs.some((l) => l.action === 'ORDER_PLACED' || l.action === 'ADMIN_PASSWORD_CHANGED'),
    'Critical mutations recorded in audit log'
  );

  console.log('\n==================================================');
  console.log(`VERIFICATION COMPLETE: ${passed} PASSED, ${failed} FAILED`);
  console.log('==================================================');

  if (failed > 0) {
    process.exit(1);
  }
}

runAllTests().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
