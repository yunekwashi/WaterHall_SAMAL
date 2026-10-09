const CACHE_NAME = 'waterhall-shell-v10-index-provisional';
const SHELL = ['/ui-display.js', '/monitoring.css', '/landing.html', '/landing.css', '/push-client.js', '/index.html', '/app.js', '/styles.css', '/mobile.css', '/native-store.js', '/logo.png', '/manifest.json'];
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
  }).catch(async () => (await caches.match(event.request)) || (await caches.match(url.pathname === '/' ? '/landing.html' : url.pathname))));
});

// One durable claim store for browser polling and Web Push. No credentials stored.
const notificationDb = new Promise((resolve, reject) => {
  const request = indexedDB.open('waterhall-notification-checkpoints', 1);
  request.onupgradeneeded = () => request.result.createObjectStore('state');
  request.onsuccess = () => resolve(request.result);
  request.onerror = () => reject(request.error);
});
async function claimAnnouncement(scope, role, latest, fromPush = false, expiresAt = 0) {
  const db = await notificationDb;
  return new Promise((resolve, reject) => {
    const tx = db.transaction('state', 'readwrite'), store = tx.objectStore('state');
    let deliver = false;
    const active = store.get('active');
    active.onsuccess = () => {
      if (fromPush && (!active.result || active.result.scope !== scope || active.result.expiresAt <= Date.now())) return;
      if (!fromPush) {
        if (!Number.isFinite(expiresAt) || expiresAt <= Date.now()) return;
        store.put({scope, role, expiresAt}, 'active');
      }
      const read = store.get(scope);
      read.onsuccess = () => {
        const id = Number.isSafeInteger(latest?.id) ? latest.id : 0;
        if (read.result === undefined) store.put(id, scope); // Silent historical baseline.
        else if (id > read.result) { store.put(id, scope); deliver = true; }
      };
    };
    tx.oncomplete = () => resolve(deliver);
    tx.onerror = () => reject(tx.error);
  });
}
async function displayAnnouncement(latest) {
  const db = await notificationDb;
  const active = await new Promise(resolve => {
    const req = db.transaction('state').objectStore('state').get('active');
    req.onsuccess = () => resolve(req.result);
  });
  if (!active || active.scope !== latest.scope || active.expiresAt <= Date.now()) return;
  return self.registration.showNotification(latest.title || 'WaterHall Announcement', {
    body: latest.message || latest.body || '', icon: '/logo.png', badge: '/logo.png',
    tag: 'waterhall-announcement', renotify: false, data: {url: '/index.html?role=' + active.role}
  });
}
self.addEventListener('message', event => {
  const data = event.data;
  if (data?.type === 'announcements' && typeof data.scope === 'string' && ['resident', 'worker'].includes(data.role)) {
    event.waitUntil(claimAnnouncement(data.scope, data.role, data.latest, false, data.expiresAt).then(claimed => claimed &&
      displayAnnouncement({...data.latest, scope: data.scope})));
  } else if (data?.type === 'notification-logout') {
    event.waitUntil(notificationDb.then(db => new Promise(resolve => {
      const tx = db.transaction('state', 'readwrite'), store = tx.objectStore('state');
      let ended = false;
      const request = store.get('active');
      request.onsuccess = () => {
        if (request.result?.scope === data.scope) { store.delete('active'); ended = true; }
      };
      tx.oncomplete = () => resolve(ended);
    })).then(ended => ended ? self.registration.getNotifications({tag: 'waterhall-announcement'}) : [])
      .then(rows => rows.forEach(row => row.close())));
  }
});
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
  const announcement = /^announcement-(\d+)$/.exec(payload.tag || '');
  if (announcement) {
    event.waitUntil(notificationDb.then(db => new Promise(resolve => {
      const req = db.transaction('state').objectStore('state').get('active'); req.onsuccess = () => resolve(req.result);
    })).then(async active => {
      const recipient = payload.recipient;
      if (!active || active.expiresAt <= Date.now() || !recipient || active.scope !== self.location.origin + '|' + recipient.role + '|' + recipient.owner) return;
      const latest = {id: Number(announcement[1]), title, body: payload.body, scope: active.scope};
      if (await claimAnnouncement(active.scope, active.role, latest, true)) await displayAnnouncement(latest);
    }));
    return;
  }
  const options = {
    body: payload.body || 'New water system notification received.',
    icon: payload.icon || '/logo.png',
    badge: payload.badge || '/logo.png',
    vibrate: [200, 100, 200, 100, 200],
    tag: payload.tag || 'waterhall-service-alert',
    renotify: false,
    requireInteraction: true,
    data: payload.data || { url: '/' }
  };

  event.waitUntil(notificationDb.then(db => new Promise(resolve => {
    const req = db.transaction('state').objectStore('state').get('active'); req.onsuccess = () => resolve(req.result);
  })).then(active => {
    const recipient = payload.recipient;
    if (active && active.expiresAt > Date.now() && recipient && active.scope === self.location.origin + '|' + recipient.role + '|' + recipient.owner) {
      return self.registration.showNotification(title, options);
    }
  }));
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
