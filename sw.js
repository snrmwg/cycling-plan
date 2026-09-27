// Offline-Cache: erst aus dem Cache liefern, im Hintergrund aktualisieren.
// Eine neue Version ist damit beim übernächsten Start aktiv.
// Geladen wird am HTTP-Cache vorbei: GitHub Pages erlaubt 10 Minuten
// Zwischenspeicher, sonst landet eine veraltete Kopie im Offline-Cache.
const CACHE = 'cycling-plan-v7';
const FILES = ['./', 'index.html', 'musik.html', 'manifest.webmanifest', 'icon.svg', 'icon-192.png', 'icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(FILES.map(f => new Request(f, { cache: 'reload' }))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  // Fremde Adressen wie der YouTube-Player gehen unverändert ans Netz
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(
    caches.open(CACHE).then(async cache => {
      const cached = await cache.match(e.request, { ignoreSearch: true });
      const fresh = fetch(e.request, { cache: 'no-cache' })
        .then(res => { if (res.ok) cache.put(e.request, res.clone()); return res; })
        .catch(() => cached);
      return cached || fresh;
    })
  );
});
