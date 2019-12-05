
const cacheName = 'RESTAURANT-REVIEWS-V1';


self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(cacheName)
        .then(function (cache) {
             cache.addAll([
                'index.html',
                'restaurant.html',
                'css/styles.css',
                'js/dbhelper.js',
                'js/main.js',
                'js/restaurant_info.js',
                'data/restaurants.json',
                'img/1.jpg',
                'img/2.jpg',
                'img/3.jpg',
                'img/4.jpg',
                'img/5.jpg',
                'img/6.jpg',
                'img/7.jpg',
                'img/8.jpg',
                'img/9.jpg',
                'img/10.jpg'
            ]).then( function () {
                self.skipWaiting();
            });
        })
    );
});


self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys()
        .then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cache) {
                    if (cache !== cacheName) {
                         return caches.delete(cache);
                    }
                })
            );
        })
    );
});


self.addEventListener('fetch', event => {

    event.respondWith(

        fetch(event.request)
        .then( res => {
            const clone = res.clone();

            caches.open(cacheName)
            .then(cache => {
                cache.put(event.request , clone);
            });
            return res;
        }).catch(e => caches.match(event.request).then(res => res))
    );
});