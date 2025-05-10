const CACHE_NAME = "acak-kelompok-v1";
const urlsToCache = [
  "index.html",
  "templates/contact.html",
  "templates/content.html",
  "templates/sukses.html",
  "assest/css/style.css",
  "assest/css/contact.css",
  "assest/css/content.css",
  "assest/js/main.js",
  "assest/js/contact.js",
  "assest/js/content.js",
  "assest/icons/icon-192.png",
  "assest/icons/icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
