import { NextRequest, NextResponse } from 'next/server';
import { getQuoteById, updateQuoteStatus, createOrderAtomic, addAuditLog } from '@/lib/db';
import { requirePermission } from '@/lib/auth';
import { formatErrorResponse } from '@/server/errors';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requirePermission(req, 'quotes.convert');
  if ('response' in auth) return auth.response;

  try {
    const quote = await getQuoteById(params.id);
    if (!quote) {
      return NextResponse.json({ success: false, error: 'Quote not found' }, { status: 404 });
    }

    if (quote.status === 'Converted_To_Order') {
      return NextResponse.json(
        { success: false, error: 'This quote has already been converted to an order.' },
        { status: 409 }
      );
    }

    // Map quote items to order items format
    const orderItems = (quote.items || []).map((it) => ({
      productId: it.productId || 'custom-material',
      quantity: it.quantity || 1,
      selectedColor: 'Custom Specification',
      selectedFinish: 'Bespoke',
    }));

    if (orderItems.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Cannot convert a quote with no specified material items.' },
        { status: 400 }
      );
    }

    // Create the order idempotently using quote reference
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
      return NextResponse.json(
        { success: false, error: orderResult.error || 'Failed to generate order from quotation.' },
        { status: 500 }
      );
    }

    // Update Quote status to Converted_To_Order
    await updateQuoteStatus(
      quote.id,
      'Converted_To_Order',
      quote.totalQuotedAmount,
      `Converted to Order #${orderResult.order.orderNumber} by ${auth.admin.email}`
    );

    // Audit the conversion
    await addAuditLog({
      adminId: auth.admin.id,
      adminEmail: auth.admin.email,
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

    return NextResponse.json({
      success: true,
      order: orderResult.order,
      message: `Quote #${quote.quoteNumber} successfully converted to Order #${orderResult.order.orderNumber}`,
    });
  } catch (err: any) {
    console.error('Quote conversion error:', err);
    return formatErrorResponse(err);
  }
}
