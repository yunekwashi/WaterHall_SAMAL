const CACHE_NAME = 'waterhall-cache-v4.0.0';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.map((key) => caches.delete(key)));
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // NEVER cache API calls or health checks — always go to network
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(fetch(event.request));
    return;
  }

  // For non-API requests, use network-first with NO cache fallback
  // This prevents stale cached pages from showing when server is off
  event.respondWith(fetch(event.request));
});
