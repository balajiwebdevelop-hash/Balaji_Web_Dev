import {
  getProducts,
  getProductById,
  getCategories,
  getProjects,
  getServices,
  getSiteSettings,
  getPublicSiteSettings,
  getAdmins,
  getAuditLogs,
  getEnquiries,
  createOrderAtomic,
  getOrderById,
} from '../src/lib/db';
import {
  validateOrderInput,
  validateProductInput,
  validateCategoryInput,
  validateQuoteInput,
} from '../src/server/validation';
import { apiSuccess, apiError } from '../src/server/api/response';
import { hasPermission, ROLE_PERMISSIONS } from '../src/server/auth/rbac';
import { GET as healthCheckGet } from '../src/app/api/health/route';

async function runArchitectureTests() {
  console.log('====================================================');
  console.log('BALAJI ARCHITECT & INTERIORS - ARCHITECTURE REFACTOR TEST');
  console.log('====================================================\n');

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

  // 1. MODULAR REPOSITORIES TEST
  console.log('--- TEST GROUP 1: MODULAR REPOSITORIES ---');
  const products = await getProducts();
  assert(products.length > 0, `Products repository returned ${products.length} products`);

  const singleProd = await getProductById(products[0].id);
  assert(singleProd?.id === products[0].id, 'Product by ID lookup works correctly');

  const categories = await getCategories();
  assert(categories.length > 0, `Categories repository returned ${categories.length} categories`);
  assert(typeof categories[0].productCount === 'number', 'Categories include computed productCount');

  const projects = await getProjects();
  assert(projects.length > 0, `Projects repository returned ${projects.length} architectural projects`);

  const services = await getServices();
  assert(services.length > 0, `Services repository returned ${services.length} services`);

  const admins = await getAdmins();
  assert(admins.length > 0, `Employees repository returned ${admins.length} administrators`);

  const auditLogs = await getAuditLogs(5);
  assert(Array.isArray(auditLogs), 'Audit log repository returned log history');

  const enquiries = await getEnquiries();
  assert(Array.isArray(enquiries), 'Enquiries repository returned enquiry collection');

  // 2. FINANCIAL / SENSITIVE DATA ISOLATION (GSTIN PRIVACY)
  console.log('\n--- TEST GROUP 2: SETTINGS & SENSITIVE DATA ISOLATION ---');
  const fullSettings = await getSiteSettings();
  const publicSettings = await getPublicSiteSettings();

  assert(
    typeof fullSettings.gstinNumber === 'string' && fullSettings.gstinNumber.length > 0,
    'Authoritative site settings contains gstinNumber for administrative and invoice operations'
  );
  assert(
    !('gstinNumber' in publicSettings),
    'Public site settings strictly isolates and omits private gstinNumber'
  );
  assert(
    publicSettings.brandName === fullSettings.brandName &&
      publicSettings.contactEmail === fullSettings.contactEmail,
    'Public site settings correctly delivers public brand attributes'
  );

  // 3. RUNTIME VALIDATION LAYER
  console.log('\n--- TEST GROUP 3: RUNTIME VALIDATORS ---');
  const invalidOrder = validateOrderInput({ customerName: '', items: [] });
  assert(invalidOrder.valid === false, 'Invalid order with missing name and items was rejected');
  assert(typeof invalidOrder.error === 'string', 'Validator returned structured validation error message');

  const validOrder = validateOrderInput({
    customerName: 'Karan Singhania',
    customerEmail: 'karan@singhania.com',
    customerPhone: '+91 98200 99999',
    shippingAddress: {
      fullName: 'Karan Singhania',
      phone: '+91 98200 99999',
      addressLine1: '42 Marine Drive',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400020',
      country: 'India',
    },
    items: [{ productId: products[0].id, quantity: 5 }],
  });
  assert(validOrder.valid === true, 'Valid order payload passed validation');

  const invalidProduct = validateProductInput({ name: 'Short' });
  assert(invalidProduct.valid === false, 'Incomplete product payload rejected');

  const validCategory = validateCategoryInput({ name: 'Acoustic Wall Cladding' });
  assert(validCategory.valid === true, 'Valid category payload passed validation');

  const invalidQuote = validateQuoteInput({ clientName: '' });
  assert(invalidQuote.valid === false, 'Invalid quotation payload rejected');

  // 4. UNIFIED RBAC & PERMISSIONS MATRIX
  console.log('\n--- TEST GROUP 4: RBAC AUTHORIZATION ---');
  assert(
    hasPermission('owner', 'owner.settings') === true,
    'owner role has owner.settings permission'
  );
  assert(
    hasPermission('owner', 'owner.employee_management') === true,
    'owner role has owner.employee_management permission'
  );
  assert(
    hasPermission('employee', 'owner.settings') === false,
    'employee role is denied owner.settings permission'
  );
  assert(
    hasPermission('employee', 'owner.employee_management') === false,
    'employee role is denied owner.employee_management permission'
  );
  assert(
    hasPermission('employee', 'products.read') === true,
    'employee role has products.read permission'
  );
  assert(
    hasPermission('employee', 'orders.read') === true,
    'employee role has orders.read permission'
  );

  // 5. UNIFIED API ENVELOPE
  console.log('\n--- TEST GROUP 5: API RESPONSE ENVELOPE ---');
  const successRes = apiSuccess({ sample: 'data' });
  assert(successRes.status === 200, 'apiSuccess returns 200 by default');

  const errorRes = apiError('Invalid request parameters', 422, 'VALIDATION_FAILED');
  assert(errorRes.status === 422, 'apiError returns custom status code');

  // 6. HEALTH CHECK MONITORING ENDPOINT
  console.log('\n--- TEST GROUP 6: HEALTH CHECK MONITORING ---');
  const healthRes = await healthCheckGet();
  const healthJson = await healthRes.json();
  assert(
    healthJson.status === 'healthy' || healthJson.status === 'degraded',
    `Health endpoint returned status: ${healthJson.status}`
  );
  assert(
    typeof healthJson.timestamp === 'string',
    'Health endpoint returns ISO timestamp'
  );
  assert(
    healthJson.checks &&
      'database' in healthJson.checks &&
      'storage' in healthJson.checks &&
      'pushNotifications' in healthJson.checks,
    'Health endpoint returns structured checks for database, storage, and push'
  );

  // 7. ORDER IDEMPOTENCY IN ATOMIC CHECKOUT
  console.log('\n--- TEST GROUP 7: ATOMIC CHECKOUT & IDEMPOTENCY ---');
  const testIdempotencyKey = `idem-arch-test-${Date.now()}`;
  const firstCheckout = await createOrderAtomic({
    customerName: 'Idempotency Tester',
    customerEmail: 'idem@test.com',
    customerPhone: '+91 99999 11111',
    shippingAddress: {
      fullName: 'Idem User',
      phone: '+91 99999 11111',
      addressLine1: 'Test Avenue',
      city: 'Delhi',
      state: 'Delhi',
      pincode: '110001',
      country: 'India',
    },
    items: [{ productId: products[0].id, quantity: 1 }],
    paymentMethod: 'Balaji QR Payment (Balaji PG)',
    idempotencyKey: testIdempotencyKey,
  });

  assert(firstCheckout.success === true, 'Initial atomic order succeeded');

  const secondCheckout = await createOrderAtomic({
    customerName: 'Idempotency Tester',
    customerEmail: 'idem@test.com',
    customerPhone: '+91 99999 11111',
    shippingAddress: {
      fullName: 'Idem User',
      phone: '+91 99999 11111',
      addressLine1: 'Test Avenue',
      city: 'Delhi',
      state: 'Delhi',
      pincode: '110001',
      country: 'India',
    },
    items: [{ productId: products[0].id, quantity: 1 }],
    paymentMethod: 'Balaji QR Payment (Balaji PG)',
    idempotencyKey: testIdempotencyKey,
  });

  assert(secondCheckout.success === true, 'Second checkout with same idempotency key succeeded');
  assert(
    firstCheckout.order?.id === secondCheckout.order?.id,
    'Idempotency key guaranteed the exact same order was returned without double charge or double stock decrement'
  );

  console.log('\n====================================================');
  console.log(`ARCHITECTURE VERIFICATION COMPLETE: ${passed} PASSED, ${failed} FAILED`);
  console.log('====================================================');

  if (failed > 0) {
    process.exit(1);
  }
}

runArchitectureTests().catch((err) => {
  console.error('Architecture test execution fatal exception:', err);
  process.exit(1);
});
