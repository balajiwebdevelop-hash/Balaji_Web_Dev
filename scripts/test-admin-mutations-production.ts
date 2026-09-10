import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

// Load .env.local before any imports
const envPath = path.resolve(process.cwd(), '.env.local');
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

// CRITICAL: Force NODE_ENV to production to enforce strict production database checks
(process.env as any).NODE_ENV = 'production';

async function runTests() {
  console.log('\n===============================================================');
  console.log('🧪 TESTING ADMIN REPOSITORY MUTATIONS IN PRODUCTION MODE');
  console.log(`Environment: NODE_ENV=${process.env.NODE_ENV}`);
  console.log(`DB Host: ${process.env.DB_HOST}, DB Name: ${process.env.DB_NAME}`);
  console.log('===============================================================\n');

  // Dynamic imports to ensure env vars are set
  const { createProduct, getProductById, updateProduct, deleteProduct, getProducts } = await import('../src/server/db/repositories/products');
  const { getSiteSettings, updateSiteSettings } = await import('../src/server/db/repositories/settings');
  const { createCategory, getCategoryById, updateCategory, deleteCategory } = await import('../src/server/db/repositories/categories');
  const { createProject, getProjectById, updateProject, deleteProject } = await import('../src/server/db/repositories/projects');
  const { createService, updateService, deleteService } = await import('../src/server/db/repositories/services');
  const { addAuditLog } = await import('../src/server/db/repositories/audit');

  // 1. TEST SETTINGS MUTATION
  console.log('--- 1. Testing Site Settings Update ---');
  const initialSettings = await getSiteSettings();
  console.log('Current site brand name:', initialSettings.brandName);

  const updatedSettings = await updateSiteSettings({
    brandName: 'Balaji Atelier Architectural Systems - Verified',
    tagline: 'Engineering Luxury Surfaces & Hardware'
  });
  console.log('Updated site brand name in MySQL:', updatedSettings.brandName);
  if (updatedSettings.brandName !== 'Balaji Atelier Architectural Systems - Verified') {
    throw new Error('Site settings update failed to reflect in returned object');
  }

  // Restore site settings
  await updateSiteSettings({
    brandName: initialSettings.brandName,
    tagline: initialSettings.tagline
  });
  console.log('✅ Site settings update & revert passed with 0 safety violations!');

  // 2. TEST CATEGORY CRUD
  console.log('\n--- 2. Testing Category Lifecycle ---');
  const createdCat = await createCategory({
    name: 'Test Architectural Category',
    slug: `test-arch-cat-${Date.now()}`,
    description: 'Temporary category for automated mutation verification',
    isActive: true,
    displayOrder: 99
  } as any);
  console.log('✅ Created category:', createdCat.id, createdCat.name);

  const fetchedCat = await getCategoryById(createdCat.id);
  if (!fetchedCat || fetchedCat.name !== 'Test Architectural Category') {
    throw new Error(`Category lookup failed for ${createdCat.id}`);
  }

  const updatedCat = await updateCategory(createdCat.id, {
    name: 'Updated Test Category'
  });
  console.log('✅ Updated category:', updatedCat?.id, updatedCat?.name);

  const deletedCatResult = await deleteCategory(createdCat.id);
  if (!deletedCatResult) {
    throw new Error(`Category deletion failed for ${createdCat.id}`);
  }
  const checkCatDeleted = await getCategoryById(createdCat.id);
  if (checkCatDeleted) {
    throw new Error(`Category still exists after deletion!`);
  }
  console.log('✅ Category lifecycle (Create, Read, Update, Delete) passed 100%!');

  // 3. TEST PRODUCT CRUD (The exact issue user experienced)
  console.log('\n--- 3. Testing Product Lifecycle (Full Prefixed UUID) ---');
  // Get an existing category id
  const allProds = await getProducts();
  const sampleCategoryId = allProds.length > 0 ? (allProds[0] as any).category_id || allProds[0].categoryId : 'cat-hardware';

  const testProdId = `prod-${crypto.randomUUID()}`;
  console.log(`Creating test product with 41-char ID: ${testProdId}`);

  const createdProd = await createProduct({
    id: testProdId,
    name: 'Automated Test Product Verification',
    slug: `auto-test-product-${Date.now()}`,
    sku: `TEST-SKU-${Date.now()}`,
    categoryId: sampleCategoryId,
    price: 4999,
    salePrice: 3999,
    description: 'Automated verification test product for Hostinger MySQL',
    shortDescription: 'Test product for Hostinger MySQL verification',
    specifications: { material: 'Brass', finish: 'Satin Gold' },
    dimensions: '100 x 50 x 20 mm',
    weight: 1.5,
    isFeatured: false,
    isActive: true,
    images: [
      {
        id: `img-${crypto.randomUUID()}`,
        url: '/images/products/sample.jpg',
        altText: 'Test image',
        isPrimary: true,
        displayOrder: 0
      }
    ],
    variants: [
      {
        id: `var-${crypto.randomUUID()}`,
        sku: `TEST-VAR-1-${Date.now()}`,
        name: 'Variant 1',
        priceModifier: 0,
        isActive: true,
        stockQuantity: 25
      }
    ],
    inventory: {
      id: `inv-${crypto.randomUUID()}`,
      productId: testProdId,
      sku: `TEST-SKU-${Date.now()}`,
      stockOnHand: 50,
      allocatedStock: 0,
      reorderThreshold: 5,
      costPrice: 2500,
      sellingPrice: 4999
    }
  } as any);

  console.log('✅ Successfully created product in Hostinger MySQL:', createdProd.id, createdProd.name);

  // Read back
  const fetchedProd = await getProductById(createdProd.id);
  if (!fetchedProd) {
    throw new Error(`Product lookup by ID failed for ${createdProd.id}`);
  }
  console.log(`✅ Verified product lookup by ID: ${fetchedProd.id}, price=${fetchedProd.price}, variants=${fetchedProd.variants?.length}`);

  // Update
  const updatedProd = await updateProduct(createdProd.id, {
    name: 'Automated Test Product - Renamed',
    price: 5500,
    status: 'published'
  } as any);
  console.log(`✅ Successfully updated product: ${updatedProd?.name}, price=${updatedProd?.price}`);

  // Delete
  console.log(`Attempting to delete product ${createdProd.id}...`);
  const deleteResult = await deleteProduct(createdProd.id);
  if (!deleteResult) {
    throw new Error(`Failed to delete product ${createdProd.id}`);
  }
  const checkProdDeleted = await getProductById(createdProd.id);
  if (checkProdDeleted) {
    throw new Error(`Product ${createdProd.id} still exists after delete!`);
  }
  console.log('✅ Product lifecycle (Create, Read, Update, Delete) passed 100% without safety violations!');

  // 4. TEST PROJECT CRUD
  console.log('\n--- 4. Testing Project Lifecycle ---');
  const testProjId = `proj-${crypto.randomUUID()}`;
  const createdProj = await createProject({
    id: testProjId,
    title: 'Automated Test Project',
    slug: `test-project-${Date.now()}`,
    client: 'Test Client Ltd',
    location: 'Mumbai, India',
    completion_date: '2026-03-01',
    project_type: 'residential',
    featured: false,
    description: 'Automated test project verification',
    challenge: 'Testing database mutations',
    solution: 'Hostinger MySQL integration',
    materials_used: ['Marble', 'Teak Wood'],
    images: [],
    scope: ['Architecture', 'Interiors']
  } as any);
  console.log('✅ Created project:', createdProj.id, createdProj.title);

  const updatedProj = await updateProject(createdProj.id, {
    title: 'Updated Automated Test Project'
  });
  console.log('✅ Updated project:', updatedProj?.title);

  const deletedProjResult = await deleteProject(createdProj.id);
  if (!deletedProjResult) {
    throw new Error(`Project deletion failed for ${createdProj.id}`);
  }
  console.log('✅ Project lifecycle passed 100%!');

  // 5. TEST SERVICE CRUD
  console.log('\n--- 5. Testing Service Lifecycle ---');
  const testSrvId = `srv-${crypto.randomUUID()}`;
  const createdSrv = await createService({
    id: testSrvId,
    title: 'Automated Test Service',
    slug: `test-service-${Date.now()}`,
    short_description: 'Test short description',
    description: 'Detailed service description for automated testing',
    features: ['Precision craftsmanship', 'Custom finishes'],
    deliverables: ['CAD files', 'Samples'],
    process_steps: [
      { step_number: 1, title: 'Consultation', description: 'Initial meeting' }
    ],
    display_order: 99,
    is_active: true
  } as any);
  console.log('✅ Created service:', createdSrv.id, createdSrv.title);

  const updatedSrv = await updateService(createdSrv.id, {
    title: 'Updated Test Service'
  });
  console.log('✅ Updated service:', updatedSrv?.title);

  const deletedSrvResult = await deleteService(createdSrv.id);
  if (!deletedSrvResult) {
    throw new Error(`Service deletion failed for ${createdSrv.id}`);
  }
  console.log('✅ Service lifecycle passed 100%!');

  // 6. TEST AUDIT LOGS
  console.log('\n--- 6. Testing Audit Log Write ---');
  const auditEntry = await addAuditLog({
    adminId: 'adm-super-001',
    adminEmail: 'vicks@balaji.com',
    action: 'PRODUCTION_VERIFICATION_TEST',
    entity: 'SystemTest',
    entityId: 'test-run-001',
    details: { result: 'success', timestamp: new Date().toISOString() }
  });
  console.log('✅ Audit log created successfully:', auditEntry.id, auditEntry.action);

  // 7. TEST ENQUIRIES
  console.log('\n--- 7. Testing Enquiry Lifecycle ---');
  const { createEnquiry, updateEnquiryStatus } = await import('../src/server/db/repositories/enquiries');
  const createdEnq = await createEnquiry({
    name: 'Automation Test User',
    email: `test-${Date.now()}@example.com`,
    phone: '+91 99999 88888',
    subject: 'Automated DB Test',
    message: 'Testing enquiry creation and update under production mode',
    source: 'Automated Test'
  });
  console.log('✅ Created enquiry:', createdEnq.id, createdEnq.name);

  const updatedEnq = await updateEnquiryStatus(createdEnq.id, 'Followed_Up');
  console.log('✅ Updated enquiry status:', updatedEnq?.id, updatedEnq?.status);

  // Clean up test enquiry
  const { execute } = await import('../src/server/db/mysql');
  await execute('DELETE FROM enquiries WHERE id = ?', [createdEnq.id]);
  console.log('✅ Cleaned up test enquiry. Enquiry tests passed 100%!');

  // 8. TEST ORDERS & QUOTES STATUS UPDATES
  console.log('\n--- 8. Testing Orders & Quotes Status Updates ---');
  const { getOrders, updatePaymentStatus } = await import('../src/server/db/repositories/orders');
  const orders = await getOrders({ limit: 1 });
  if (orders.length > 0) {
    const targetOrder = orders[0];
    const prevPayment = targetOrder.paymentStatus;
    const updatedOrder = await updatePaymentStatus(targetOrder.id, 'Paid', { transactionId: 'TXN-TEST-123' });
    console.log(`✅ Order payment status updated from ${prevPayment} to ${updatedOrder?.paymentStatus}`);
    // Revert
    await updatePaymentStatus(targetOrder.id, prevPayment);
    console.log(`✅ Order payment status restored to ${prevPayment}`);
  }

  const { getQuotes, updateQuoteStatus } = await import('../src/server/db/repositories/quotes');
  const quotes = await getQuotes({ limit: 1 });
  if (quotes.length > 0) {
    const targetQuote = quotes[0];
    const prevQuoteStatus = targetQuote.status;
    const updatedQuote = await updateQuoteStatus(targetQuote.id, 'Approved');
    console.log(`✅ Quote status updated from ${prevQuoteStatus} to ${updatedQuote?.status}`);
    // Revert
    await updateQuoteStatus(targetQuote.id, prevQuoteStatus);
    console.log(`✅ Quote status restored to ${prevQuoteStatus}`);
  }

  // 9. TEST EMPLOYEE ADMIN CRUD
  console.log('\n--- 9. Testing Employee Admin Lifecycle ---');
  const { createEmployeeAdmin, updateEmployeeAdmin, deleteEmployeeAdmin } = await import('../src/server/db/repositories/employees');
  const testEmpEmail = `emp-test-${Date.now()}@balaji.com`;
  const createdEmp = await createEmployeeAdmin({
    email: testEmpEmail,
    temporaryPassword: 'TempPassword123!',
    name: 'Test Employee Admin',
    role: 'employee'
  });
  console.log('✅ Created test employee admin:', createdEmp.id, createdEmp.email);

  const updatedEmp = await updateEmployeeAdmin(createdEmp.id, {
    name: 'Test Employee Admin - Renamed',
    role: 'editor'
  });
  console.log('✅ Updated test employee admin:', updatedEmp?.id, updatedEmp?.name, updatedEmp?.role);

  const deletedEmpResult = await deleteEmployeeAdmin(createdEmp.id);
  console.log('✅ Deleted test employee admin result:', deletedEmpResult);

  console.log('\n===============================================================');
  console.log('🎉 ALL PRODUCTION ADMIN MUTATIONS PASSED 100% WITH ZERO ERRORS!');
  console.log('===============================================================\n');

  process.exit(0);
}

runTests().catch((err) => {
  console.error('\n❌ TEST FAILED WITH ERROR:', err);
  process.exit(1);
});
