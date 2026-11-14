const CACHE = "radio-ar-v36";
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./pc.html",
  "./pc.css",
  "./pc.js",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-maskable-512.png",
  "./logo.webp",
  "./wood-texture.jpg",
  "./fonts/exo-2-latin-700-italic.woff2",
  "./fonts/exo-2-latin-800-italic.woff2",
  "./fonts/open-sans-latin-400-normal.woff2",
  "./fonts/open-sans-latin-600-normal.woff2",
  "./fonts/open-sans-latin-700-normal.woff2",
  "./fonts/open-sans-latin-800-normal.woff2",
  "./fonts/barlow-condensed-latin-500-normal.woff2",
  "./fonts/barlow-condensed-latin-600-normal.woff2",
  "./fonts/barlow-condensed-latin-700-normal.woff2",
  "./fonts/share-tech-mono-latin-400-normal.woff2"
];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  // Si un archivo falla, el service worker se instala igual (antes un solo 404 lo rompía y la app no se podía instalar)
  event.waitUntil(
    caches.open(CACHE).then((cache) =>
      Promise.allSettled(ASSETS.map((url) => cache.add(url)))
    )
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (event.request.method !== "GET") return;
  if (url.origin !== self.location.origin) return;

  // JS/CSS/HTML: primero la red (para que se vean las actualizaciones)
  const isShell = /\.(js|css|html)(\?|$)/i.test(url.pathname) || url.pathname.endsWith("/") || url.pathname.endsWith("/index.html");

  if (isShell) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response && response.ok) {
            const clone = response.clone();
            caches.open(CACHE).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => caches.match(event.request).then((c) => c || caches.match("./index.html")))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
