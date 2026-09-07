import { CreateOrderInputDTO, UnitType } from '@/types';

// =============================================================
// RUNTIME REQUEST INPUT VALIDATION
// =============================================================

export interface ValidationResult<T> {
  valid: boolean;
  error?: string;
  data?: T;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,15}$/;

export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  return EMAIL_REGEX.test(email.trim());
}

export function isValidPhone(phone: string): boolean {
  if (!phone || typeof phone !== 'string') return false;
  return PHONE_REGEX.test(phone.trim());
}

export function validateOrderInput(body: any): ValidationResult<CreateOrderInputDTO> {
  if (!body || typeof body !== 'object') {
    return { valid: false, error: 'Request body must be a valid JSON object.' };
  }

  const { customerName, customerEmail, customerPhone, shippingAddress, items, paymentMethod } = body;

  if (!customerName || typeof customerName !== 'string' || customerName.trim().length < 2) {
    return { valid: false, error: 'Customer name is required (minimum 2 characters).' };
  }

  if (!customerEmail || !isValidEmail(customerEmail)) {
    return { valid: false, error: 'A valid customer email address is required.' };
  }

  if (!customerPhone || typeof customerPhone !== 'string' || customerPhone.trim().length < 7) {
    return { valid: false, error: 'A valid customer phone number is required.' };
  }

  if (!shippingAddress || typeof shippingAddress !== 'object') {
    return { valid: false, error: 'A valid shipping address object is required.' };
  }

  if (!shippingAddress.addressLine1 || typeof shippingAddress.addressLine1 !== 'string' || shippingAddress.addressLine1.trim().length < 3) {
    return { valid: false, error: 'Shipping address line 1 is required.' };
  }

  if (!Array.isArray(items) || items.length === 0) {
    return { valid: false, error: 'Order must contain at least one product or material lot.' };
  }

  for (let i = 0; i < items.length; i++) {
    const it = items[i];
    if (!it.productId || typeof it.productId !== 'string') {
      return { valid: false, error: `Item ${i + 1} is missing a valid productId.` };
    }
    if (typeof it.quantity !== 'number' || it.quantity <= 0 || isNaN(it.quantity)) {
      return { valid: false, error: `Item ${i + 1} must have a positive quantity.` };
    }
  }

  return {
    valid: true,
    data: {
      customerName: customerName.trim(),
      customerEmail: customerEmail.trim().toLowerCase(),
      customerPhone: customerPhone.trim(),
      shippingAddress: {
        id: shippingAddress.id || '',
        fullName: shippingAddress.fullName || customerName.trim(),
        phone: shippingAddress.phone || customerPhone.trim(),
        addressLine1: shippingAddress.addressLine1.trim(),
        addressLine2: shippingAddress.addressLine2?.trim() || '',
        city: shippingAddress.city?.trim() || '',
        state: shippingAddress.state?.trim() || '',
        pincode: shippingAddress.pincode?.trim() || '',
        country: shippingAddress.country?.trim() || 'India',
      },
      billingAddress: body.billingAddress || undefined,
      items: items.map((it: any) => ({
        productId: it.productId,
        variantId: it.variantId || undefined,
        quantity: Math.floor(it.quantity),
        selectedColor: it.selectedColor || undefined,
        selectedFinish: it.selectedFinish || undefined,
      })),
      paymentMethod: paymentMethod || 'Balaji QR Payment (Balaji PG)',
      notes: body.notes?.trim() || '',
      idempotencyKey: body.idempotencyKey?.trim() || undefined,
    },
  };
}

export function validateProductInput(body: any): ValidationResult<any> {
  if (!body || typeof body !== 'object') {
    return { valid: false, error: 'Invalid product payload.' };
  }

  if (!body.name || typeof body.name !== 'string' || body.name.trim().length === 0) {
    return { valid: false, error: 'Product name is required.' };
  }

  if (body.price === undefined || typeof body.price !== 'number' || body.price < 0 || isNaN(body.price)) {
    return { valid: false, error: 'Product price must be a non-negative number.' };
  }

  if (body.stock !== undefined && (typeof body.stock !== 'number' || body.stock < 0 || isNaN(body.stock))) {
    return { valid: false, error: 'Product stock must be a non-negative number.' };
  }

  return { valid: true, data: body };
}

export function validateCategoryInput(body: any): ValidationResult<any> {
  if (!body || typeof body !== 'object') {
    return { valid: false, error: 'Invalid category payload.' };
  }

  if (!body.name || typeof body.name !== 'string' || body.name.trim().length === 0) {
    return { valid: false, error: 'Category name is required.' };
  }

  return { valid: true, data: body };
}

export function validateQuoteInput(body: any): ValidationResult<any> {
  if (!body || typeof body !== 'object') {
    return { valid: false, error: 'Invalid quote request payload.' };
  }

  if (!body.customerName || typeof body.customerName !== 'string' || body.customerName.trim().length < 2) {
    return { valid: false, error: 'Client name is required (minimum 2 characters).' };
  }

  if (!body.customerEmail || !isValidEmail(body.customerEmail)) {
    return { valid: false, error: 'A valid email address is required.' };
  }

  if (!body.customerPhone || typeof body.customerPhone !== 'string' || body.customerPhone.trim().length < 7) {
    return { valid: false, error: 'A valid phone number is required.' };
  }

  if (!body.projectType || typeof body.projectType !== 'string') {
    return { valid: false, error: 'Project typology selection is required.' };
  }

  return { valid: true, data: body };
}

export function validateEnquiryInput(body: any): ValidationResult<any> {
  if (!body || typeof body !== 'object') {
    return { valid: false, error: 'Invalid enquiry payload.' };
  }

  if (!body.name || typeof body.name !== 'string' || body.name.trim().length < 2) {
    return { valid: false, error: 'Name is required (minimum 2 characters).' };
  }

  if (!body.email || !isValidEmail(body.email)) {
    return { valid: false, error: 'A valid email address is required.' };
  }

  if (!body.message || typeof body.message !== 'string' || body.message.trim().length < 5) {
    return { valid: false, error: 'Message content is required (minimum 5 characters).' };
  }

  return { valid: true, data: body };
}
