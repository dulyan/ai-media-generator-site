/* AI MEDIA GENERATOR service worker, generated at build time. */
const CACHE = 'aimg-ib7yzn';
const PRECACHE = ["./","assets/CharacterTab-C0xcdUvd.js","assets/ImageGrid-BN-g_rQe.js","assets/LibrarySection-CXujkXmy.js","assets/ModelBlock-DLQB-iI7.js","assets/Pill-Can6SUb0.js","assets/PlotTab-DRs56mrd.js","assets/SceneTab-D5q9M8bJ.js","assets/SettingsTab-eOh3sa-y.js","assets/StatCard-C-g0WHad.js","assets/SurroundingTab-DTfVGKI-.js","assets/TagInput-DDlIn_lR.js","assets/VideoTab-BScd60tQ.js","assets/character-hooks-suz8eoNr.js","assets/index-B8JxMPH4.css","assets/index-CW85Yi-7.js","assets/minus-r5_nRvGW.js","assets/plot-hooks-DrKT3Ki1.js","assets/poppins-devanagari-400-normal-CJDn6rn8.woff2","assets/poppins-devanagari-400-normal-CqVvlrh5.woff","assets/poppins-devanagari-500-normal-BIdkeU1p.woff2","assets/poppins-devanagari-500-normal-DMPDjHtT.woff","assets/poppins-devanagari-600-normal-ClASKHrr.woff","assets/poppins-devanagari-600-normal-STEjXBNN.woff2","assets/poppins-latin-400-normal-BOb3E3N0.woff","assets/poppins-latin-400-normal-cpxAROuN.woff2","assets/poppins-latin-500-normal-C8OXljZJ.woff2","assets/poppins-latin-500-normal-DGXqpDMm.woff","assets/poppins-latin-600-normal-BJdTmd5m.woff","assets/poppins-latin-600-normal-zEkxB9Mr.woff2","assets/poppins-latin-ext-400-normal-DaBSavcJ.woff","assets/poppins-latin-ext-400-normal-by3JarPu.woff2","assets/poppins-latin-ext-500-normal-CK-6C4Hw.woff2","assets/poppins-latin-ext-500-normal-CgAe2rWW.woff","assets/poppins-latin-ext-600-normal-CAhIAdZj.woff2","assets/poppins-latin-ext-600-normal-Df5ffKXP.woff","assets/render-client-DtDEbe7A.js","assets/render.worker-BqKGkdLh.js","assets/scenes-BgPb39su.js","assets/surrounding-hooks-B17kLoRj.js","assets/surroundings-D2t6HyUe.js","assets/tags-repo-5Q_3Q5KN.js","logo.svg","manifest.webmanifest","icons/icon-192.png","icons/icon-512.png","icons/icon-maskable-512.png"];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(PRECACHE)).then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('aimg-') && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin || !url.pathname.startsWith(new URL(self.registration.scope).pathname)) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE).then((cache) => cache.put('./', copy));
          return response;
        })
        .catch(() => caches.match('./', { ignoreSearch: true })),
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(
      (hit) =>
        hit ||
        fetch(request).then((response) => {
          if (response.ok && url.pathname.includes('/assets/')) {
            const copy = response.clone();
            caches.open(CACHE).then((cache) => cache.put(request, copy));
          }
          return response;
        }),
    ),
  );
});
