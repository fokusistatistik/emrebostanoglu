/**
 * Service Worker
 * Progressive Web App functionality for offline support
 */

// Cache versioning with timestamp for auto-updates
const CACHE_VERSION = '1.0.0';
const CACHE_TIMESTAMP = '20251127';
const CACHE_NAME = `eb-portfolio-v${CACHE_VERSION}-${CACHE_TIMESTAMP}`;

const urlsToCache = [
    '/',
    '/index.html',
    '/about.html',
    '/datascience.html',
    '/photography.html',
    '/writer.html',
    '/director.html',
    '/contact.html',
    '/blog.html',
    '/press.html',
    '/404.html',
    '/css/style.css',
    '/js/components.js',
    '/js/i18n.js',
    '/js/content-manager.js',
    '/js/app.js',
    '/js/chatbot-ui.js',
    '/js/chatbot.js',
    '/js/exit-intent.js',
    '/js/theme-switcher.js',
    '/js/lazy-load.js',
    '/translations/tr.json',
    '/translations/en.json',
    '/content/articles.json'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
    console.log('Service Worker: Installing...');

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Service Worker: Caching files');
                return cache.addAll(urlsToCache.map(url => new Request(url, { cache: 'reload' })));
            })
            .catch((error) => {
                console.error('Service Worker: Cache failed', error);
            })
    );

    self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activating...');

    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log('Service Worker: Clearing old cache', cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );

    return self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') return;

    // Skip webhook requests
    if (event.request.url.includes('n8n.fokusistatistik.com')) return;

    // Skip external static resources to prevent CORS errors
    if (event.request.url.includes('static.fokusistatistik.com')) return;

    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Cache hit - return response
                if (response) {
                    return response;
                }

                // Clone the request
                const fetchRequest = event.request.clone();

                return fetch(fetchRequest).then((response) => {
                    // Check if valid response
                    // Allow both 'basic' (same-origin) and 'cors' (cross-origin) responses
                    if (!response || response.status !== 200) {
                        return response;
                    }

                    // Only cache basic and cors type responses (not opaque)
                    if (response.type === 'basic' || response.type === 'cors') {
                        // Clone the response
                        const responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(event.request, responseToCache);
                            });
                    }

                    return response;
                }).catch(() => {
                    // Network failed, return 404 page if available
                    return caches.match('/404.html');
                });
            })
    );
});

// Background sync for offline form submissions
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-forms') {
        event.waitUntil(syncForms());
    }
});

async function syncForms() {
    // Get pending form submissions from IndexedDB
    // and sync them when online
    console.log('Service Worker: Syncing forms...');
}

// Push notifications (optional future feature)
self.addEventListener('push', (event) => {
    const options = {
        body: event.data ? event.data.text() : 'New update available',
        icon: 'https://static.fokusistatistik.com/resimler/ebfavicon.png',
        badge: 'https://static.fokusistatistik.com/resimler/ebfavicon.png',
        vibrate: [200, 100, 200],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'Görüntüle',
                icon: 'https://static.fokusistatistik.com/resimler/ebfavicon.png'
            },
            {
                action: 'close',
                title: 'Kapat',
                icon: 'https://static.fokusistatistik.com/resimler/ebfavicon.png'
            }
        ]
    };

    event.waitUntil(
        self.registration.showNotification('Emre Bostanoğlu', options)
    );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});
