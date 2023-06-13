/* eslint-disable no-undef */

// registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/service-worker.js');
  });
}

// activation
self.addEventListener("activate", event => {
  event.waitUntil(self.registration?.navigationPreload.enable());
});

// installation
self.addEventListener("install", event => {
  event.waitUntil(caches.open("v1").then(cache => cache.addAll(["/", "/index.html", "/style.css", "/app.js", "/image-list.js", "/star-wars-logo.jpg", "/gallery/", "/gallery/bountyHunters.jpg", "/gallery/myLittleVader.jpg", "/gallery/snowTroopers.jpg"])));
});