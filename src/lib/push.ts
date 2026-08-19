import webPush from 'web-push';
import { getServiceSupabase } from './supabase';
import { Order } from '@/types';

// Configure Web Push with VAPID credentials
const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
const vapidPrivateKey = process.env.VAPID_PRIVATE_KEY;
const vapidSubject = process.env.VAPID_SUBJECT || 'mailto:atelier@balaji-interior.com';

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
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return { success: false, error: 'Database environment unconfigured' };
  }

  try {
    const supabase = getServiceSupabase();
    const { data, error } = await supabase
      .from('notification_subscriptions')
      .upsert(
        {
          endpoint: sub.endpoint,
          keys: sub.keys,
          admin_id: sub.adminId || null,
          user_agent: sub.userAgent || null,
          created_at: new Date().toISOString(),
        },
        { onConflict: 'endpoint' }
      )
      .select()
      .single();

    if (error) {
      console.error('Error saving push subscription to Supabase:', error);
      return { success: false, error: error.message };
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
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return;
  }

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
  if (!vapidPublicKey || !vapidPrivateKey) {
    console.warn('VAPID keys not configured, skipping web push dispatch.');
    return { sent: 0, failed: 0 };
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return { sent: 0, failed: 0 };
  }

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
}

/**
 * Send a real Web Push test notification to a specific admin device.
 */
export async function sendTestPushToAdmin(adminId?: string): Promise<{ success: boolean; sent: number; message: string }> {
  if (!vapidPublicKey || !vapidPrivateKey) {
    return { success: false, sent: 0, message: 'VAPID credentials not configured in production environment.' };
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return { success: false, sent: 0, message: 'Supabase database not configured.' };
  }

  const supabase = getServiceSupabase();
  let query = supabase.from('notification_subscriptions').select('*');
  if (adminId) {
    query = query.eq('admin_id', adminId);
  }

  const { data: subscriptions, error } = await query;

  if (error || !subscriptions || subscriptions.length === 0) {
    // If no specific admin subscription found, try all active subscriptions
    const { data: allSubs } = await supabase.from('notification_subscriptions').select('*');
    if (!allSubs || allSubs.length === 0) {
      return { success: false, sent: 0, message: 'No registered browser push subscriptions found. Please click "Enable Push Notifications" in your browser first.' };
    }
  }

  const targetSubs = (subscriptions && subscriptions.length > 0) ? subscriptions : [];
  if (targetSubs.length === 0) {
    const { data: fallbackSubs } = await supabase.from('notification_subscriptions').select('*');
    if (fallbackSubs) targetSubs.push(...fallbackSubs);
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
  for (const sub of targetSubs) {
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
    message: sentCount > 0 ? `Successfully dispatched Web Push to ${sentCount} device(s).` : 'Failed to deliver push to registered endpoints.',
  };
}
