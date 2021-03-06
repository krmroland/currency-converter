export const CACHE_NAME = "CURRENCY-CONVERTER-STATIC-V2";

const urlsToCache = [
    "index.html",
    "app.js",
    "app.css",
    "favicon.png",
    "https://fonts.googleapis.com/css?family=Roboto+Slab",
    "https://free.currencyconverterapi.com/api/v5/currencies"
];

export function createCache(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
    );
}

export function removeOldCache(event) {
    return event.waitUntill(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames
                    .filter(
                        cacheName =>
                            cacheName.startsWith("CURRENCY-CONVERTER-STATIC") &&
                            cacheName !== CACHE_NAME
                    )
                    .map(cacheName => caches.delete(cacheName))
            );
        })
    );
}
