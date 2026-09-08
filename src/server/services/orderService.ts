import { Order, OrderStatus, PaymentStatus } from '@/types';
import { createOrderAtomic, CreateOrderData } from '../db/transactions/orders';
import { getOrderById, updateOrderStatus } from '../db/repositories/orders';
import { addAuditLog } from '../db/repositories/audit';
import { validateOrderStatusTransition } from '../validation/schemas';
import { ValidationError, NotFoundError } from '../errors';
import { sendNewOrderPush } from '@/lib/push';

export interface ActorContext {
  id: string;
  email: string;
}

export class OrderService {
  /**
   * Domain-level order placement.
   * Validates customer, address, and items, executes atomic reservation/creation,
   * dispatches background push notifications, and records audit if actor is provided.
   */
  static async placeOrder(
    data: CreateOrderData,
    actor?: ActorContext
  ): Promise<Order> {
    if (!data.customerName || !data.customerEmail || !data.customerPhone) {
      throw new ValidationError('Customer name, email, and phone are required.');
    }

    if (!data.shippingAddress || !data.shippingAddress.addressLine1) {
      throw new ValidationError('Valid delivery address is required.');
    }

    if (!Array.isArray(data.items) || data.items.length === 0) {
      throw new ValidationError('Order must contain at least one material/product.');
    }

    const result = await createOrderAtomic(data);

    if (!result.success || !result.order) {
      throw new Error(result.error || 'Failed to generate order.');
    }

    const order = result.order;

    // Trigger realtime push notifications asynchronously
    sendNewOrderPush(order).catch((pushErr) => {
      console.warn('Order push notification dispatch notice:', pushErr);
    });

    if (actor) {
      await addAuditLog({
        adminId: actor.id,
        adminEmail: actor.email,
        action: 'ORDER_CREATED',
        entity: 'Order',
        entityId: order.id,
        details: {
          orderNumber: order.orderNumber,
          totalAmount: order.totalAmount,
          customerEmail: order.customerEmail,
        },
      });
    }

    return order;
  }

  /**
   * Domain-level status transition and payment verification.
   * Enforces transition state machine, persistence, and immutable audit trails.
   */
  static async updateOrderStatusAndPayment(
    orderId: string,
    params: {
      orderStatus?: OrderStatus;
      paymentStatus?: PaymentStatus;
      action?: string;
      utrNumber?: string;
      note?: string;
      actor: ActorContext;
    }
  ): Promise<Order> {
    const existing = await getOrderById(orderId);
    if (!existing) {
      throw new NotFoundError(`Order ${orderId} not found`);
    }

    let targetPaymentStatus = params.paymentStatus || existing.paymentStatus;
    const currentStatus = existing.orderStatus || (existing as any).status;
    let targetOrderStatus = params.orderStatus || currentStatus;

    if (params.action === 'VERIFY_PAYMENT') {
      targetPaymentStatus = 'Paid';
    }

    if (params.orderStatus && params.orderStatus !== currentStatus) {
      validateOrderStatusTransition(currentStatus, params.orderStatus);
    }

    const updated = await updateOrderStatus(orderId, targetOrderStatus, targetPaymentStatus, {
      actorEmail: params.actor.email,
      note: params.note,
      utrNumber: params.utrNumber,
    });

    if (!updated) {
      throw new NotFoundError(`Order ${orderId} could not be updated`);
    }

    const auditAction = params.action === 'VERIFY_PAYMENT' ? 'ORDER_PAYMENT_VERIFIED' : 'ORDER_STATUS_UPDATED';

    await addAuditLog({
      adminId: params.actor.id,
      adminEmail: params.actor.email,
      action: auditAction,
      entity: 'Order',
      entityId: orderId,
      details: {
        orderStatus: targetOrderStatus,
        paymentStatus: targetPaymentStatus,
        utrNumber: params.utrNumber,
        verifiedBy: params.actor.email,
        note: params.note,
      },
    });

    return updated;
  }
}
