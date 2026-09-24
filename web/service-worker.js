const CACHE_NAME = 'waterhall-shell-v5';
const SHELL = ['/index.html', '/app.js', '/styles.css', '/native-store.js', '/logo.png', '/manifest.json'];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('waterhall-') && key !== CACHE_NAME).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (event.request.method !== 'GET' || url.origin !== self.location.origin || url.pathname.startsWith('/api/') || url.pathname.startsWith('/admin')) return;
  if (!SHELL.includes(url.pathname) && url.pathname !== '/') return;
  event.respondWith(fetch(event.request).then(response => {
    if (response.ok) {
      const copy = response.clone();
      event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy)));
    }
    return response;
  }).catch(async () => (await caches.match(event.request)) || (await caches.match(url.pathname === '/' ? '/index.html' : url.pathname))));
});

// ==============================================================================
// Background Web Push Notification Handler
// ==============================================================================
self.addEventListener('push', (event) => {
  if (!event.data) return;

  let payload = {};
  try {
    payload = event.data.json();
  } catch (e) {
    payload = {
      title: 'WaterHall System Alert',
      body: event.data.text()
    };
  }

  const title = payload.title || 'WaterHall Notification';
  const options = {
    body: payload.body || 'New water system notification received.',
    icon: payload.icon || '/logo.png',
    badge: payload.badge || '/logo.png',
    vibrate: [200, 100, 200, 100, 200],
    tag: payload.tag || ('waterhall-' + Date.now()),
    renotify: true,
    requireInteraction: true,
    data: payload.data || { url: '/' }
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const requested = new URL((event.notification.data && event.notification.data.url) || '/', self.location.origin);
  const targetUrl = requested.origin === self.location.origin ? requested.href : '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ('focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});
