// Balaji Atelier Service Worker - Realtime Order & Quote Notifications
self.addEventListener('push', function (event) {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body || 'New architectural order registered.',
      icon: '/favicon.ico',
      badge: '/favicon.ico',
      data: {
        url: data.url || '/admin/orders',
      },
      vibrate: [200, 100, 200],
    };

    event.waitUntil(self.registration.showNotification(data.title || 'Balaji Atelier Admin', options));
  }
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(function (clientList) {
      const url = event.notification.data?.url || '/admin/orders';
      for (let i = 0; i < clientList.length; i++) {
        const client = clientList[i];
        if (client.url === url && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});
