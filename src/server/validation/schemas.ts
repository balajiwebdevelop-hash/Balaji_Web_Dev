import { ValidationError } from '../errors';
import { OrderStatus, PaymentStatus, UnitType, PurchaseMode, AdminRole } from '@/types';

export function validateProductInput(data: any, isUpdate = false): void {
  if (!isUpdate || data.name !== undefined) {
    if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 2) {
      throw new ValidationError('Product name must be at least 2 characters long');
    }
  }

  if (!isUpdate || data.sku !== undefined) {
    if (!data.sku || typeof data.sku !== 'string' || !/^[A-Za-z0-9-_]+$/.test(data.sku.trim())) {
      throw new ValidationError('SKU must contain only letters, numbers, hyphens, and underscores');
    }
  }

  if (data.price !== undefined) {
    const p = Number(data.price);
    if (isNaN(p) || p < 0) {
      throw new ValidationError('Product price must be a non-negative number');
    }
  }

  if (data.salePrice !== undefined && data.salePrice !== null) {
    const sp = Number(data.salePrice);
    if (isNaN(sp) || sp < 0) {
      throw new ValidationError('Sale price must be a non-negative number');
    }
  }

  if (data.stock !== undefined) {
    const s = Number(data.stock);
    if (isNaN(s) || s < 0 || !Number.isInteger(s)) {
      throw new ValidationError('Stock quantity must be a non-negative integer');
    }
  }

  if (data.moq !== undefined) {
    const m = Number(data.moq);
    if (isNaN(m) || m < 1 || !Number.isInteger(m)) {
      throw new ValidationError('Minimum order quantity (MOQ) must be at least 1');
    }
  }

  if (data.purchaseMode !== undefined) {
    const validModes: PurchaseMode[] = ['BUY_NOW', 'REQUEST_QUOTE', 'BOTH', 'UNAVAILABLE'];
    if (!validModes.includes(data.purchaseMode)) {
      throw new ValidationError(`Invalid purchase mode. Must be one of: ${validModes.join(', ')}`);
    }
  }
}

export function validateOrderStatusTransition(currentStatus: OrderStatus, newStatus: OrderStatus): void {
  const allowedTransitions: Record<OrderStatus, OrderStatus[]> = {
    Pending: ['Confirmed', 'Cancelled'],
    Confirmed: ['Processing', 'Cancelled'],
    Processing: ['Packed', 'Cancelled'],
    Packed: ['Shipped', 'Cancelled'],
    Shipped: ['Delivered', 'Cancelled'],
    Delivered: [], // Final state
    Cancelled: [], // Final state
  };

  if (currentStatus === newStatus) return;

  const validNext = allowedTransitions[currentStatus] || [];
  if (!validNext.includes(newStatus)) {
    throw new ValidationError(
      `Illegal order status transition: Cannot change status from '${currentStatus}' to '${newStatus}'.`
    );
  }
}

export function validatePaymentSettings(payment: any): void {
  if (!payment || typeof payment !== 'object') return;

  if (payment.upiId && typeof payment.upiId === 'string') {
    const trimmed = payment.upiId.trim();
    if (!/^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/.test(trimmed)) {
      throw new ValidationError('Invalid UPI ID format. Expected format: username@bank');
    }
  }

  if (payment.qrExpiryMinutes !== undefined) {
    const m = Number(payment.qrExpiryMinutes);
    if (isNaN(m) || m < 1 || m > 1440) {
      throw new ValidationError('QR expiry minutes must be between 1 and 1440 (24 hours)');
    }
  }
}

export function validateEmployeeInput(data: any, isUpdate = false): void {
  if (!isUpdate || data.email !== undefined) {
    if (!data.email || typeof data.email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
      throw new ValidationError('A valid email address is required for the employee');
    }
  }

  if (!isUpdate || data.name !== undefined) {
    if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 2) {
      throw new ValidationError('Employee name must be at least 2 characters long');
    }
  }

  if (data.role !== undefined) {
    const validRoles: AdminRole[] = ['employee', 'editor', 'viewer'];
    if (!validRoles.includes(data.role)) {
      throw new ValidationError(`Assigned role must be one of: ${validRoles.join(', ')}`);
    }
  }
}
