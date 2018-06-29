export function registerServiceWorker() {
    if (!navigator.serviceWorker) return;

    navigator.serviceWorker
        .register("/serviceWorker.js")
        .then(done => console.log("Service worker registered successfully"))
        .catch(error => console.log("Service worker registration failed"));
}


