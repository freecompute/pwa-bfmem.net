var cname = 'bfmem.net.0.1'
function installcb(e){
	e.waitUntil(caches.open(cname).then(function(cache){
		console.log('open ... and add assets')
		return cache.add('index.html')
	}).catch(err){
		console.log('open err : '+err)
	})
}
self.addEventListener('install',installcb)

function fetchcb(e){
	e.respondWith(caches.match(e.request).then(function(res){
		if(res != undefined){
			return res
		}else{
			return fetch(e.request).then(function(r){
				var rc = r.clone()
				caches.open(cname).then(
					function(c){
						console.log('fetch ... open')
						c.put(e.request , rc)
					}
				)
				return r
			}
			).catch(function(){
				console.log('fetch ...')
			}
			)
		}
		//return res || fetch(e.request)
	}))
}
self.addEventListener('fetch' , fetchcb)
