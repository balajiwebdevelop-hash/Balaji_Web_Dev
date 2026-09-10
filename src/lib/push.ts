import webPush from 'web-push';
import { Order, Quote, Enquiry } from '@/types';
import { urlBase64ToUint8Array, DEFAULT_VAPID_PUBLIC_KEY } from './push-client';

export { urlBase64ToUint8Array, DEFAULT_VAPID_PUBLIC_KEY };

export const DEFAULT_VAPID_PRIVATE_KEY =
  'SmPawdxDpbEkoUP5Wny9uXJ-kqrA8FWeu5052EG-ffE';
export const DEFAULT_VAPID_SUBJECT =
  'mailto:atelier@balaji-interior.com';

// In-memory push subscription store
interface PushSubRecord {
  endpoint: string;
  keys: { p256dh: string; auth: string };
  adminId?: string | null;
  userAgent?: string | null;
  createdAt: string;
}

const inMemoryPushSubs = new Map<string, PushSubRecord>();

// Configure Web Push with VAPID credentials
function ensureVapidConfigured(): boolean {
  const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || process.env.VAPID_PUBLIC_KEY || DEFAULT_VAPID_PUBLIC_KEY;
  const vapidPrivateKey = process.env.VAPID_PRIVATE_KEY || DEFAULT_VAPID_PRIVATE_KEY;
  const vapidSubject = process.env.VAPID_SUBJECT || DEFAULT_VAPID_SUBJECT;

  if (vapidPublicKey && vapidPrivateKey) {
    try {
      webPush.setVapidDetails(vapidSubject, vapidPublicKey, vapidPrivateKey);
      return true;
    } catch (err) {
      console.error('Failed to configure web-push VAPID details:', err);
      return false;
    }
  }
  return false;
}

// Initial setup
ensureVapidConfigured();

/**
 * Persist an active push subscription in memory.
 */
export async function savePushSubscription(sub: {
  endpoint: string;
  keys: { p256dh: string; auth: string };
  adminId?: string;
  userAgent?: string;
}) {
  try {
    const record: PushSubRecord = {
      endpoint: sub.endpoint,
      keys: sub.keys,
      adminId: sub.adminId || null,
      userAgent: sub.userAgent || null,
      createdAt: new Date().toISOString(),
    };
    inMemoryPushSubs.set(sub.endpoint, record);
    return { success: true, data: record };
  } catch (err: any) {
    console.error('Exception saving push subscription:', err);
    return { success: false, error: err.message };
  }
}

/**
 * Remove an invalid/expired push subscription.
 */
export async function removePushSubscription(endpoint: string) {
  inMemoryPushSubs.delete(endpoint);
}

/**
 * Send real Web Push notification for a new customer order to all active admin devices.
 */
export async function sendNewOrderPush(order: Order): Promise<{ sent: number; failed: number }> {
  try {
    ensureVapidConfigured();
    const subscriptions = Array.from(inMemoryPushSubs.values());

    if (!subscriptions || subscriptions.length === 0) {
      return { sent: 0, failed: 0 };
    }

    const payload = JSON.stringify({
      title: 'New Order Placed — Balaji Architect & Interiors',
      body: `Order #${order.orderNumber} • ₹${order.totalAmount.toLocaleString('en-IN')}`,
      icon: '/favicon.ico',
      badge: '/favicon.ico',
      url: `/admin/orders`,
      data: {
        orderId: order.id,
        orderNumber: order.orderNumber,
        url: `/admin/orders`,
      },
    });

    let sent = 0;
    let failed = 0;

    for (const sub of subscriptions) {
      try {
        await webPush.sendNotification(
          {
            endpoint: sub.endpoint,
            keys: sub.keys,
          },
          payload
        );
        sent++;
      } catch (err: any) {
        failed++;
        console.warn(`Web push dispatch failed for endpoint ${sub.endpoint.substring(0, 30)}...:`, err.statusCode || err.message);

        // If subscription expired or gone (HTTP 410 or 404), clean it up from store
        if (err.statusCode === 410 || err.statusCode === 404) {
          await removePushSubscription(sub.endpoint);
        }
      }
    }

    return { sent, failed };
  } catch (err) {
    console.warn('Error in sendNewOrderPush:', err);
    return { sent: 0, failed: 0 };
  }
}

/**
 * Send real Web Push notification for a new architectural quote request.
 */
export async function sendNewQuotePush(quote: Quote): Promise<{ sent: number; failed: number }> {
  try {
    ensureVapidConfigured();
    const subscriptions = Array.from(inMemoryPushSubs.values());

    if (!subscriptions || subscriptions.length === 0) {
      return { sent: 0, failed: 0 };
    }

    const payload = JSON.stringify({
      title: `New Architectural Quote — ${quote.customerName}`,
      body: `${quote.projectType || 'Custom Commission'} • Location: ${quote.projectLocation || 'Unspecified'}`,
      icon: '/favicon.ico',
      badge: '/favicon.ico',
      url: `/admin/quotes`,
      data: {
        quoteId: quote.id,
        quoteNumber: quote.quoteNumber,
        url: `/admin/quotes`,
      },
    });

    let sent = 0;
    let failed = 0;

    for (const sub of subscriptions) {
      try {
        await webPush.sendNotification(
          {
            endpoint: sub.endpoint,
            keys: sub.keys,
          },
          payload
        );
        sent++;
      } catch (err: any) {
        failed++;
        if (err.statusCode === 410 || err.statusCode === 404) {
          await removePushSubscription(sub.endpoint);
        }
      }
    }

    return { sent, failed };
  } catch (err) {
    console.warn('Error in sendNewQuotePush:', err);
    return { sent: 0, failed: 0 };
  }
}

/**
 * Send real Web Push notification for a new studio enquiry.
 */
export async function sendNewEnquiryPush(enquiry: Enquiry): Promise<{ sent: number; failed: number }> {
  try {
    ensureVapidConfigured();
    const subscriptions = Array.from(inMemoryPushSubs.values());

    if (!subscriptions || subscriptions.length === 0) {
      return { sent: 0, failed: 0 };
    }

    const payload = JSON.stringify({
      title: `New Consultation Inquiry — ${enquiry.name}`,
      body: `${enquiry.subject || 'Commission Inquiry'}: ${enquiry.message ? enquiry.message.substring(0, 60) + '...' : ''}`,
      icon: '/favicon.ico',
      badge: '/favicon.ico',
      url: `/admin/quotes`,
      data: {
        enquiryId: enquiry.id,
        url: `/admin/quotes`,
      },
    });

    let sent = 0;
    let failed = 0;

    for (const sub of subscriptions) {
      try {
        await webPush.sendNotification(
          {
            endpoint: sub.endpoint,
            keys: sub.keys,
          },
          payload
        );
        sent++;
      } catch (err: any) {
        failed++;
        if (err.statusCode === 410 || err.statusCode === 404) {
          await removePushSubscription(sub.endpoint);
        }
      }
    }

    return { sent, failed };
  } catch (err) {
    console.warn('Error in sendNewEnquiryPush:', err);
    return { sent: 0, failed: 0 };
  }
}

/**
 * Send a real Web Push test notification to all registered admin devices.
 */
export async function sendTestPushToAdmin(adminId?: string): Promise<{ success: boolean; sent: number; message: string }> {
  try {
    ensureVapidConfigured();
    const subscriptions = Array.from(inMemoryPushSubs.values());

    if (!subscriptions || subscriptions.length === 0) {
      return {
        success: false,
        sent: 0,
        message: 'No registered browser push subscriptions found. Please enable browser notifications on this device first.',
      };
    }

    const payload = JSON.stringify({
      title: 'Balaji Studio Test Notification',
      body: 'Realtime Web Push pipeline is active and verified on this device.',
      icon: '/favicon.ico',
      badge: '/favicon.ico',
      url: '/admin/orders',
      data: { url: '/admin/orders' },
    });

    let sentCount = 0;
    for (const sub of subscriptions) {
      try {
        await webPush.sendNotification({ endpoint: sub.endpoint, keys: sub.keys }, payload);
        sentCount++;
      } catch (err: any) {
        if (err.statusCode === 410 || err.statusCode === 404) {
          await removePushSubscription(sub.endpoint);
        }
      }
    }

    return {
      success: sentCount > 0,
      sent: sentCount,
      message: sentCount > 0 ? `Successfully dispatched Web Push to ${sentCount} device(s).` : 'Push notification dispatched.',
    };
  } catch (err: any) {
    return { success: false, sent: 0, message: err.message || 'Error triggering test push notification.' };
  }
}
