/* BUSSOLA mobile - service worker: cache del guscio app per l'uso offline.
   I DATI (bussola_dati.json) non vengono mai messi in cache qui: restano in
   localStorage, gestiti dall'app. */
const CACHE = "bussola-v1";
const SHELL = ["./", "index.html", "manifest.webmanifest",
               "icon-192.png", "icon-512.png", "apple-touch-icon.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks =>
    Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  if (url.pathname.endsWith("bussola_dati.json")) return;   // sempre rete
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).then(res => {
      if (e.request.method === "GET" && res.ok && url.origin === location.origin) {
        const cp = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, cp));
      }
      return res;
    }).catch(() => caches.match("index.html")))
  );
});
