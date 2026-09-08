import { Quote, QuoteStatus, Order } from '@/types';
import { getQuoteById, updateQuoteStatus } from '../db/repositories/quotes';
import { createOrderAtomic } from '../db/transactions/orders';
import { addAuditLog } from '../db/repositories/audit';
import { NotFoundError, ConflictError, ValidationError } from '../errors';

import { ActorContext } from './orderService';

export class QuoteService {
  /**
   * Converts an existing quotation into an atelier-grade order atomically.
   */
  static async convertQuoteToOrder(
    quoteId: string,
    actor: ActorContext
  ): Promise<{ order: Order; quote: Quote }> {
    const quote = await getQuoteById(quoteId);
    if (!quote) {
      throw new NotFoundError(`Quote ${quoteId} not found`);
    }

    if (quote.status === 'Converted_To_Order') {
      throw new ConflictError('This quote has already been converted to an order.');
    }

    const orderItems = (quote.items || []).map((it) => ({
      productId: it.productId || 'custom-material',
      quantity: it.quantity || 1,
      selectedColor: 'Custom Specification',
      selectedFinish: 'Bespoke',
    }));

    if (orderItems.length === 0) {
      throw new ValidationError('Cannot convert a quote with no specified material items.');
    }

    const orderResult = await createOrderAtomic({
      customerName: quote.customerName,
      customerEmail: quote.customerEmail,
      customerPhone: quote.customerPhone,
      shippingAddress: {
        fullName: quote.customerName,
        phone: quote.customerPhone,
        addressLine1: quote.projectLocation || 'Assam, India',
        city: 'Guwahati',
        state: 'Assam',
        pincode: '781040',
        country: 'India',
      },
      items: orderItems,
      paymentMethod: 'Architectural Contract / Wire Transfer',
      notes: `Converted from Quotation Dossier #${quote.quoteNumber}. Project Type: ${quote.projectType}.`,
      idempotencyKey: `quote-conv-${quote.id}`,
    });

    if (!orderResult.success || !orderResult.order) {
      throw new Error(orderResult.error || 'Failed to generate order from quotation.');
    }

    const updatedQuote = await updateQuoteStatus(
      quote.id,
      'Converted_To_Order',
      quote.totalQuotedAmount,
      `Converted to Order #${orderResult.order.orderNumber} by ${actor.email}`
    );

    await addAuditLog({
      adminId: actor.id,
      adminEmail: actor.email,
      action: 'QUOTE_CONVERTED_TO_ORDER',
      entity: 'Quote',
      entityId: quote.id,
      details: {
        quoteNumber: quote.quoteNumber,
        orderId: orderResult.order.id,
        orderNumber: orderResult.order.orderNumber,
        totalAmount: orderResult.order.totalAmount,
      },
    });

    return {
      order: orderResult.order,
      quote: updatedQuote || quote,
    };
  }

  /**
   * Reviews or updates pricing estimation for a quotation.
   */
  static async updateEstimation(
    quoteId: string,
    params: {
      status: QuoteStatus;
      totalQuotedAmount?: number;
      adminNotes?: string;
      actor: ActorContext;
    }
  ): Promise<Quote> {
    const existing = await getQuoteById(quoteId);
    if (!existing) {
      throw new NotFoundError(`Quote ${quoteId} not found`);
    }

    const updated = await updateQuoteStatus(
      quoteId,
      params.status,
      params.totalQuotedAmount,
      params.adminNotes
    );

    if (!updated) {
      throw new NotFoundError(`Quote ${quoteId} could not be updated`);
    }

    await addAuditLog({
      adminId: params.actor.id,
      adminEmail: params.actor.email,
      action: 'QUOTE_STATUS_UPDATED',
      entity: 'Quote',
      entityId: quoteId,
      details: {
        quoteNumber: updated.quoteNumber,
        status: params.status,
        totalQuotedAmount: params.totalQuotedAmount,
        adminNotes: params.adminNotes,
      },
    });

    return updated;
  }
}
