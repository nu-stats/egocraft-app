// EgoCraft offline cache, written by the build. Do not edit.
const CACHE = "egocraft-354cc0d1bbd1";
const FILES = ["./","./apple-touch-icon.png","./assets/index-DhB7Dtkw.css","./assets/index-kh_JvGyF.js","./icon-192.png","./icon-512.png","./icon-maskable-512.png","./icon.svg","./index.html","./manifest.webmanifest"];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES.map((f) => new Request(f, { cache: 'reload' })))).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k.startsWith('egocraft-') && k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  event.respondWith(
    caches.open(CACHE).then(async (cache) => {
      const hit = await cache.match(req, { ignoreSearch: true });
      if (hit) return hit;
      try {
        return await fetch(req);
      } catch (e) {
        // Offline and not stored: pages fall back to the app itself.
        if (req.mode === 'navigate') {
          const app = await cache.match('./index.html');
          if (app) return app;
        }
        throw e;
      }
    }),
  );
});
