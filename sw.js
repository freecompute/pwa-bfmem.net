function installcb(e){
	e.waitUtil(caches.open('bfmem.net.0.1.0').then(function(cache){
		return cache.add('index.html')
	}))
}
self.addEventListener('install',installcb)
function fetchcb(e){
	e.respondWith(caches.match(e.request).then(function(res){
		return res || fetch(e.request)
	}))
}
