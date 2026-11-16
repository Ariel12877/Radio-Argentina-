// Cada vez que subas cambios a GitHub, subí también este número (v37 → v38, etc.).
// Si no cambia, el botón rojo de "Nueva actualización" no aparece.
const CACHE = "radio-ar-v60";
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./update.js",
  "./pc.html",
  "./pc.css",
  "./pc.js",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-maskable-512.png",
  "./logo.webp",
  "./wood-texture.jpg",
  "./pc-skin.webp",
  "./fonts/exo-2-latin-700-italic.woff2",
  "./fonts/exo-2-latin-800-italic.woff2",
  "./fonts/open-sans-latin-400-normal.woff2",
  "./fonts/open-sans-latin-600-normal.woff2",
  "./fonts/open-sans-latin-700-normal.woff2",
  "./fonts/open-sans-latin-800-normal.woff2",
  "./fonts/barlow-condensed-latin-500-normal.woff2",
  "./fonts/barlow-condensed-latin-600-normal.woff2",
  "./fonts/barlow-condensed-latin-700-normal.woff2",
  "./fonts/share-tech-mono-latin-400-normal.woff2",
  "./fonts/roboto-latin-400-normal.woff2",
  "./fonts/roboto-latin-500-normal.woff2",
  "./fonts/roboto-latin-700-normal.woff2",
  "./fonts/roboto-condensed-latin-400-normal.woff2",
  "./fonts/roboto-condensed-latin-500-normal.woff2",
  "./fonts/roboto-condensed-latin-700-normal.woff2",
  "./logos/am750.webp",
  "./logos/aspen.webp",
  "./logos/berlin.webp",
  "./logos/blue.webp",
  "./logos/cadena3.webp",
  "./logos/continental.webp",
  "./logos/convos.webp",
  "./logos/delplata.webp",
  "./logos/delta.webp",
  "./logos/disney.webp",
  "./logos/eldesta.webp",
  "./logos/estaciondelsol.webp",
  "./logos/facundoquiroga.webp",
  "./logos/heat.webp",
  "./logos/la100.webp",
  "./logos/la990.webp",
  "./logos/lared.webp",
  "./logos/latina.webp",
  "./logos/los40.webp",
  "./logos/lt10.webp",
  "./logos/lu19.webp",
  "./logos/mega.webp",
  "./logos/mia.webp",
  "./logos/mitre.webp",
  "./logos/nacional.webp",
  "./logos/nacionalfolklorica.webp",
  "./logos/radio10.webp",
  "./logos/rivadavia.webp",
  "./logos/rockpop.webp",
  "./logos/suquia.webp",
  "./logos/urbana.webp",
  "./logos/vale.webp"
];

self.addEventListener("install", (event) => {
  // Ya no se llama a skipWaiting() acá: la versión nueva queda "esperando"
  // hasta que la persona toque el botón "Nueva actualización".
  // Si un archivo falla, el service worker se instala igual (antes un solo 404 lo rompía y la app no se podía instalar)
  event.waitUntil(
    caches.open(CACHE).then((cache) =>
      Promise.allSettled(ASSETS.map((url) => cache.add(new Request(url, { cache: "reload" }))))
    )
  );
});

// Mensajes desde la página: activar la versión nueva / decir qué versión es
self.addEventListener("message", (event) => {
  const data = event.data || {};
  if (data.type === "SKIP_WAITING") self.skipWaiting();
  if (data.type === "GET_VERSION" && event.source) {
    event.source.postMessage({ type: "VERSION", version: CACHE });
  }
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
