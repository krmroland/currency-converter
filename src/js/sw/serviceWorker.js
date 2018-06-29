import { createCache, removeOldCache, CACHE_NAME } from "./Cache";
self.addEventListener("install", function(event) {
    createCache(event);
});

self.addEventListener("active", function(event) {
    removeOldCache(event);
});

self.addEventListener("fetch", function(event) {
    const requestUrl = new URL(event.request.url);

    //we will need to trap all conversion requests
    if (requestUrl.pathname.includes("convert")) {
        event.respondWith(
            caches.match(event.request).then(response => {
                //A request is a stream and can only be consumed once.
                //Since we are consuming this once by cache and once by the browser for fetch,
                //we need to clone the response.
                const fetchRequest = event.request.clone();

                const fetchPromise = fetch(fetchRequest)
                    .then(response => {
                        // Check if we received a valid response
                        if (!response || response.status !== 200) {
                            return response;
                        }

                        // just like the request we have to clone it
                        const responseToCache = response.clone();

                        caches.open(CACHE_NAME).then(cache => {
                            cache.put(event.request, responseToCache);
                        });
                        return response;
                    })
                    .catch(error => emptyresponse());

                return response || fetchPromise;
            })
        );
        return;
    }

    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});

const emptyresponse = () => {
    return new Response("Error fetching updates", {
        status: 422,
        "content-type": "application/json"
    });
};
