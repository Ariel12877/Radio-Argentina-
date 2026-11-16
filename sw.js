// Cada vez que subas cambios a GitHub, subí también este número (v60 → v61, etc.).
// Si no cambia, el botón rojo de "Nueva actualización" no aparece.
// (Ya no hace falta cambiar los "?v=" de los <script> y los <link>.)
const CACHE = "radio-ar-v61";
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./stations.js",
  "./logos.js",
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
  "./fonts/barlow-condensed-latin-500-normal.woff2",
  "./fonts/barlow-condensed-latin-600-normal.woff2",
  "./fonts/barlow-condensed-latin-700-normal.woff2",
  "./fonts/exo-2-latin-700-italic.woff2",
  "./fonts/exo-2-latin-800-italic.woff2",
  "./fonts/open-sans-latin-400-normal.woff2",
  "./fonts/open-sans-latin-600-normal.woff2",
  "./fonts/open-sans-latin-700-normal.woff2",
  "./fonts/open-sans-latin-800-normal.woff2",
  "./fonts/roboto-condensed-latin-400-normal.woff2",
  "./fonts/roboto-condensed-latin-500-normal.woff2",
  "./fonts/roboto-condensed-latin-700-normal.woff2",
  "./fonts/roboto-latin-400-normal.woff2",
  "./fonts/roboto-latin-500-normal.woff2",
  "./fonts/roboto-latin-700-normal.woff2",
  "./fonts/share-tech-mono-latin-400-normal.woff2",
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
  // No se llama a skipWaiting() acá: la versión nueva queda "esperando"
  // hasta que la persona toque el botón "Nueva actualización".
  // Si un archivo falla, el service worker se instala igual (un solo 404 no lo rompe).
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
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  const isNavigation = req.mode === "navigate";
  const isShell = isNavigation || /\.(js|css|html)$/i.test(url.pathname) || url.pathname.endsWith("/");

  // HTML / JS / CSS: primero la red. Con "no-cache" se le pregunta al servidor si el archivo
  // cambió, así nunca se usa la copia vieja que el navegador guarda unos minutos por su cuenta.
  if (isShell) {
    event.respondWith(
      fetch(isNavigation ? req : new Request(req, { cache: "no-cache" }))
        .then((res) => {
          if (res && res.status === 200) {
            const copy = res.clone();
            caches.open(CACHE).then((cache) => cache.put(req, copy));
          }
          return res;
        })
        // Sin internet: lo último que se guardó (sin mirar el "?v=")
        .catch(() => caches.match(req, { ignoreSearch: true }).then((c) => c || caches.match("./index.html")))
    );
    return;
  }

  // Imágenes, fuentes, etc.: primero lo guardado; si no está, red (y se guarda para la próxima)
  event.respondWith(
    caches.match(req, { ignoreSearch: true }).then((cached) => {
      if (cached) return cached;
      return fetch(req).then((res) => {
        if (res && res.status === 200 && res.type === "basic") {
          const copy = res.clone();
          caches.open(CACHE).then((cache) => cache.put(req, copy));
        }
        return res;
      });
    })
  );
});
