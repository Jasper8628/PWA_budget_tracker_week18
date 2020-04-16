const cacheName = 'v1';
const cacheAssets =[
    'index.html',
    'index.js',
    'style.css',
    'db.js',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png'
]



self.addEventListener('install',(e)=>{
    console.log("service worker installed");
    e.wailUntil(
        caches.open(cacheName)
        .then(cache=>{
            console.log('Service worker: caching files');
            cache.addAll(cacheAssets);
        })
        .then(()=>{
            self.skipWaitng()
        })
    )

});
self.addEventListener('activate',(e)=>{
    console.log("service worker activated");
    e.wailUntil(
        caches.keys().then(cacheNames =>{
            return Promise.all(
                cacheNames.map(cache =>{
                    if(cache!==cacheName){
                        console.log('service worker clearing old cache');
                        return caches.delete(cache);
                    }
                })
            );
        })
    )
});

self.addEventListener('fetch',e=>{
    console.log('fetching');
    e.respondWith(
        fetch(e.request).catch(()=>caches.match(e.request))
    )
});