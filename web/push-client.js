/* Optional Web Push shares session expiry and bounded network behavior. */
(() => {
  const tokenNow = () => localStorage.getItem('waterhall_jwt');
  const supported = () => 'serviceWorker' in navigator && 'PushManager' in window;
  let generation = 0;
  let writes = Promise.resolve();
  const bounded = promise => new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('Push unavailable')), 15000);
    Promise.resolve(promise).then(resolve, reject).finally(() => clearTimeout(timer));
  });
  async function request(path, token, body) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(path, {method: body ? 'POST' : 'GET', signal: controller.signal,
        headers: {'Content-Type': 'application/json', ...(token ? {Authorization: 'Bearer ' + token} : {})},
        body: body ? JSON.stringify(body) : undefined});
      if (response.status === 401 && token && token === tokenNow()) window.dispatchEvent(new Event('waterhall-session-expired'));
      if (!response.ok) throw new Error('Push unavailable');
      return await response.json();
    } catch (_) {
      if (controller.signal.aborted && token === tokenNow()) window.dispatchEvent(new Event('waterhall-request-unavailable'));
      throw new Error('Push unavailable');
    } finally { clearTimeout(timer); }
  }
  const enqueue = operation => {
    const next = writes.catch(() => {}).then(operation);
    writes = next;
    return next.catch(() => ({success: false, reason: 'unavailable'}));
  };
  window.WaterHallPush = {
    registerSubscription(role) {
      const token = tokenNow();
      const version = ++generation;
      return enqueue(async () => {
        if (!token || !supported()) return {success: false, reason: 'unsupported'};
        let permission = Notification.permission;
        if (permission === 'default') permission = await bounded(Notification.requestPermission());
        if (permission !== 'granted' || version !== generation || token !== tokenNow()) return {success: false};
        const key = await request('/api/push/vapid-public-key', token);
        if (!key.public_key) return {success: false, reason: 'unconfigured'};
        const registration = await bounded(navigator.serviceWorker.ready);
        if (version !== generation || token !== tokenNow()) return {success: false};
        let sub = await registration.pushManager.getSubscription();
        if (!sub) {
          const text = key.public_key.replace(/-/g, '+').replace(/_/g, '/');
          const bytes = Uint8Array.from(atob(text.padEnd(Math.ceil(text.length / 4) * 4, '=')), c => c.charCodeAt(0));
          sub = await bounded(registration.pushManager.subscribe({userVisibleOnly: true, applicationServerKey: bytes}));
        }
        if (version !== generation || token !== tokenNow()) { await sub.unsubscribe(); return {success: false}; }
        await request('/api/push/subscribe', token, {endpoint: sub.endpoint, keys: sub.toJSON().keys, role});
        if (version !== generation || token !== tokenNow()) { await sub.unsubscribe(); return {success: false}; }
        const banner = document.getElementById('push-permission-banner');
        if (banner) banner.style.display = 'none';
        return {success: true};
      });
    },
    unregisterSubscription() {
      // Capture before the first await: logout clears browser authorization immediately.
      const token = tokenNow();
      ++generation;
      return enqueue(async () => {
        if (!supported()) return {success: true};
        const registration = await bounded(navigator.serviceWorker.ready);
        const sub = await registration.pushManager.getSubscription();
        if (sub) {
          const endpoint = sub.endpoint;
          await bounded(sub.unsubscribe());
          if (token) await request('/api/push/unsubscribe', token, {endpoint});
        }
        return {success: true};
      });
    },
    checkPermissionBanner() {
      const banner = document.getElementById('push-permission-banner');
      if (banner && supported() && tokenNow() && Notification.permission === 'default') banner.style.display = 'flex';
    }
  };
  window.addEventListener('waterhall-session-ending', () => { window.WaterHallPush.unregisterSubscription(); });
  if ('serviceWorker' in navigator) window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').catch(() => {});
  });
  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btn-enable-push')?.addEventListener('click', () => {
      window.WaterHallPush.registerSubscription(new URLSearchParams(location.search).get('role') || 'worker');
    });
  });
})();
