const CACHE_NAME = 'lsafe-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/src/index.css',
  '/manifest.json',
  '/LSave4.png',
  '/about',
  '/faq',
  '/privacy',
  '/terms',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }));
    })
  );
});
