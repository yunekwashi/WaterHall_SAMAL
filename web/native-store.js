/* Native requests acknowledge only after the worker's SQLite transaction commits. */
(() => {
  const pending = new Map();
  let sequence = 0;
  window.waterhallNativeReply = (id, result) => {
    const entry = pending.get(id);
    if (!entry) return;
    pending.delete(id);
    clearTimeout(entry.timer);
    result.ok ? entry.resolve(result.data) : entry.reject(new Error('Local storage failed'));
  };
  window.waterhallNativeCall = (method, data) => {
    if (!window.WaterHallStorage) return Promise.resolve(null);
    return new Promise((resolve, reject) => {
      const id = String(++sequence);
      const timer = setTimeout(() => {
        pending.delete(id);
        reject(new Error('Local storage did not acknowledge the operation'));
      }, 15000);
      pending.set(id, {resolve, reject, timer});
      window.WaterHallStorage.postMessage(JSON.stringify({id, method, data}));
    });
  };
  window.waterhallSetNativeSession = async token => {
    await window.waterhallNativeCall('auth', {token});
    if (window.WaterHallAuth) window.WaterHallAuth.postMessage(JSON.stringify({token}));
  };
})();
