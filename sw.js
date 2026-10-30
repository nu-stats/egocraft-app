// EgoCraft moved to https://nu-stats.github.io/egocraft/. This replaces the
// old offline copy: it clears the old cache, unregisters itself and reloads
// open pages, which then go to the new address. Studies and interviews are
// kept by the browser for the whole site, so they are still there.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => /^egocraft-[0-9a-f]{12}$/.test(k)).map((k) => caches.delete(k))))
      .then(() => self.registration.unregister())
      .then(() => self.clients.matchAll({ type: 'window' }))
      .then((clients) => clients.forEach((c) => c.navigate('https://nu-stats.github.io/egocraft/'))),
  );
});
