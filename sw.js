/* BUSSOLA mobile - cache del solo guscio grafico. I dati riservati e lo stato
   di sincronizzazione non vengono mai memorizzati dal service worker. */
const CACHE = "bussola-v9";
const SHELL = ["./", "index.html", "manifest.webmanifest", "logo.png",
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
  if(e.request.method !== "GET") return;
  if(url.pathname.endsWith("bussola_dati.json") || url.pathname.endsWith("stato-dati.json")) return;
  if(e.request.mode === "navigate"){
    e.respondWith(fetch(e.request).then(res=>{
      if(res.ok) caches.open(CACHE).then(c=>c.put("index.html",res.clone()));
      return res;
    }).catch(()=>caches.match("index.html")));
    return;
  }
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{
    if(res.ok && url.origin===location.origin){
      const cp=res.clone(); caches.open(CACHE).then(c=>c.put(e.request,cp));
    }
    return res;
  })));
});
