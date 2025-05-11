const CACHE_NAME = "acak-kelompok-v1"
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
]

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache)
    })
  )
})

self.addEventListener("activate", event => {
  const cacheWhitelist = [CACHE_NAME]

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).then(networkResponse => {
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, networkResponse.clone())
          return networkResponse
        })
      })
    })
  )
})
