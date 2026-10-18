const CACHE_NAME = 'devbrezz-portfolio-offline-v1';
const APP_SHELL = ['/', '/index.html', '/favicon.svg'];
const WARDEN_GIF = 'https://i.imgur.com/mptewY7.gif';

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await Promise.all(APP_SHELL.map(async (url) => {
      try { await cache.add(url); } catch { /* A deploy may not expose every shell path yet. */ }
    }));
    // Pre-cache the built JS/CSS entry files referenced by index.html.
    try {
      const page = await fetch('/index.html', { cache: 'no-store' });
      if (page.ok) {
        const html = await page.clone().text();
        await cache.put('/index.html', page);
        const assets = [...html.matchAll(/(?:src|href)=\"([^\"]+\.(?:js|css)(?:\?[^\"]*)?)\"/g)].map((match) => match[1]);
        await Promise.all(assets.map(async (asset) => { try { await cache.add(asset); } catch { /* Keep installation resilient. */ } }));
      }
    } catch { /* Keep installation resilient if the host is temporarily unavailable. */ }
    // Best effort: cache the user-provided GIF while online. Opaque no-cors
    // responses can be cached and replayed by the service worker when offline.
    try {
      const request = new Request(WARDEN_GIF, { mode: 'no-cors', cache: 'reload' });
      const response = await fetch(request);
      if (response) await cache.put(WARDEN_GIF, response);
    } catch { /* If unavailable, the offline screen still works without the GIF. */ }
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((key) => key.startsWith('devbrezz-portfolio-') && key !== CACHE_NAME).map((key) => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);

  if (url.origin === self.location.origin && request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const response = await fetch(request);
        const cache = await caches.open(CACHE_NAME);
        cache.put('/index.html', response.clone()).catch(() => {});
        return response;
      } catch {
        return (await caches.match('/index.html')) || (await caches.match('/')) || Response.error();
      }
    })());
    return;
  }

  if (url.origin === self.location.origin) {
    event.respondWith((async () => {
      const cached = await caches.match(request);
      if (cached) {
        fetch(request).then((response) => { if (response.ok) caches.open(CACHE_NAME).then((cache) => cache.put(request, response)); }).catch(() => {});
        return cached;
      }
      try {
        const response = await fetch(request);
        if (response.ok) { const cache = await caches.open(CACHE_NAME); cache.put(request, response.clone()).catch(() => {}); }
        return response;
      } catch { return Response.error(); }
    })());
    return;
  }

  if (request.url === WARDEN_GIF) {
    event.respondWith((async () => {
      const cached = await caches.match(WARDEN_GIF);
      if (cached) return cached;
      try {
        const response = await fetch(request);
        const cache = await caches.open(CACHE_NAME);
        cache.put(WARDEN_GIF, response.clone()).catch(() => {});
        return response;
      } catch { return Response.error(); }
    })());
  }
});
