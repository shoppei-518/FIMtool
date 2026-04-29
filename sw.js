var CN="fim-v1";
self.addEventListener("install",function(e){
  e.waitUntil(caches.open(CN).then(function(c){return c.add("./")}));
  self.skipWaiting()
});
self.addEventListener("activate",function(e){
  e.waitUntil(clients.claim())
});
self.addEventListener("fetch",function(e){
  e.respondWith(caches.match(e.request).then(function(r){
    return r||fetch(e.request).then(function(res){
      var rc=res.clone();
      caches.open(CN).then(function(c){c.put(e.request,rc)});
      return res
    }).catch(function(){return caches.match("./")})
  }))
});
