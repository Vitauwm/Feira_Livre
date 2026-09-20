const CACHE_NAME = "feira-livre-v3";
const urlsToCache = [
  "./",
  "./index.html",
  "./style.css",
  "./main.js",
  "./api.js",
  "./products.js",
  "./cart.js",
  "./checkout.js",
  "./logistica.js",
  "./subscription.js",
  "./pwa.js",
  "./manifest.json",
  "./images/logo.png",
  "./components/api-status.js",
  "./components/header.js",
  "./components/subnav.js",
  "./components/cart-drawer.js",
  "./components/footer.js",
  "./components/modal-checkout.js",
  "./components/modal-cancelar.js",
  "./views/home.js",
  "./views/produtos.js",
  "./views/produtores.js",
  "./views/checkout.js",
  "./views/rastreamento.js",
  "./views/feiramais.js",
  "./views/produtor-painel.js",
  "./views/logistica.js",
  "./views/sobre.js"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    }),
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Cache hit - return response
      if (response) {
        return response;
      }
      return fetch(event.request);
    }),
  );
});

self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        }),
      );
    }),
  );
});
