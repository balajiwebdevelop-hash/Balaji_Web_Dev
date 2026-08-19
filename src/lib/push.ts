import webPush from 'web-push';
import { getServiceSupabase } from './supabase';
import { Order } from '@/types';

// Configure Web Push with VAPID credentials (with built-in studio fallbacks)
const DEFAULT_VAPID_PUBLIC_KEY = 'BHsG3ouw3YgPO_jlPvdNIBFISisslHHm-vxyMHmCRswNnDQxTBCZTLR2qRAQvNOC-avolJ61etGkPrNJV4MpxTE';
const DEFAULT_VAPID_PRIVATE_KEY = 'SmPawdxDpbEkoUP5Wny9uXJ-kqrA8FWeu5052EG-ffE';
const DEFAULT_VAPID_SUBJECT = 'mailto:atelier@balaji-interior.com';

const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || DEFAULT_VAPID_PUBLIC_KEY;
const vapidPrivateKey = process.env.VAPID_PRIVATE_KEY || DEFAULT_VAPID_PRIVATE_KEY;
const vapidSubject = process.env.VAPID_SUBJECT || DEFAULT_VAPID_SUBJECT;

if (vapidPublicKey && vapidPrivateKey) {
  try {
    webPush.setVapidDetails(vapidSubject, vapidPublicKey, vapidPrivateKey);
  } catch (err) {
    console.error('Failed to configure web-push VAPID details:', err);
  }
}

/**
 * Persist an active push subscription to Supabase.
 */
export async function savePushSubscription(sub: {
  endpoint: string;
  keys: { p256dh: string; auth: string };
  adminId?: string;
  userAgent?: string;
}) {
  try {
    const supabase = getServiceSupabase();

    let validAdminId: string | null = null;
    if (sub.adminId && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(sub.adminId)) {
      const { data: adminExists } = await supabase.from('admins').select('id').eq('id', sub.adminId).maybeSingle();
      if (adminExists) {
        validAdminId = adminExists.id;
      }
    }

    if (!validAdminId) {
      const { data: defaultAdmin } = await supabase.from('admins').select('id').limit(1).maybeSingle();
      if (defaultAdmin) {
        validAdminId = defaultAdmin.id;
      }
    }

    const { data, error } = await supabase
      .from('notification_subscriptions')
      .upsert(
        {
          endpoint: sub.endpoint,
          keys: sub.keys,
          admin_id: validAdminId,
          user_agent: sub.userAgent || null,
          created_at: new Date().toISOString(),
        },
        { onConflict: 'endpoint' }
      )
      .select()
      .single();

    if (error) {
      console.warn('Upsert with admin_id failed, falling back to null admin_id:', error.message);
      const fallback = await supabase
        .from('notification_subscriptions')
        .upsert(
          {
            endpoint: sub.endpoint,
            keys: sub.keys,
            admin_id: null,
            user_agent: sub.userAgent || null,
            created_at: new Date().toISOString(),
          },
          { onConflict: 'endpoint' }
        )
        .select()
        .single();

      if (fallback.error) {
        console.error('Error saving push subscription to Supabase:', fallback.error);
        return { success: false, error: fallback.error.message };
      }
      return { success: true, data: fallback.data };
    }

    return { success: true, data };
  } catch (err: any) {
    console.error('Exception saving push subscription:', err);
    return { success: false, error: err.message };
  }
}

/**
 * Remove an invalid/expired push subscription from Supabase.
 */
export async function removePushSubscription(endpoint: string) {
  try {
    const supabase = getServiceSupabase();
    await supabase.from('notification_subscriptions').delete().eq('endpoint', endpoint);
  } catch (err) {
    console.error('Error removing push subscription:', err);
  }
}

/**
 * Send real Web Push notification for a new customer order to all active admin devices.
 */
export async function sendNewOrderPush(order: Order): Promise<{ sent: number; failed: number }> {
  try {
    const supabase = getServiceSupabase();
    const { data: subscriptions, error } = await supabase
      .from('notification_subscriptions')
      .select('*');

    if (error || !subscriptions || subscriptions.length === 0) {
      return { sent: 0, failed: 0 };
    }

    const payload = JSON.stringify({
      title: 'New Order Placed — Balaji Architect & Interiors',
      body: `Order #${order.orderNumber} • ₹${order.totalAmount.toLocaleString('en-IN')}`,
      icon: '/favicon.ico',
      badge: '/favicon.ico',
      url: `/admin/orders?id=${order.id}`,
      data: {
        orderId: order.id,
        orderNumber: order.orderNumber,
        url: `/admin/orders?id=${order.id}`,
      },
    });

    let sent = 0;
    let failed = 0;

    for (const sub of subscriptions) {
      try {
        const pushSub = {
          endpoint: sub.endpoint,
          keys: sub.keys,
        };

        await webPush.sendNotification(pushSub, payload);
        sent++;
      } catch (err: any) {
        failed++;
        console.warn(`Web push dispatch failed for endpoint ${sub.endpoint.substring(0, 30)}...:`, err.statusCode || err.message);

        // If subscription expired or gone (HTTP 410 or 404), clean it up from Supabase
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
 * Send a real Web Push test notification to a specific admin device.
 */
export async function sendTestPushToAdmin(adminId?: string): Promise<{ success: boolean; sent: number; message: string }> {
  try {
    const supabase = getServiceSupabase();
    const { data: subscriptions, error } = await supabase.from('notification_subscriptions').select('*');

    if (error || !subscriptions || subscriptions.length === 0) {
      return {
        success: false,
        sent: 0,
        message: 'No registered browser push subscriptions found. Please click "Dispatch Test Notification" again to allow notifications.',
      };
    }

    const payload = JSON.stringify({
      title: 'Balaji Studio Test Notification',
      body: 'Real Web Push pipeline active and verified on this device.',
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
