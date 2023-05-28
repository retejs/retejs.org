import { cacheNames, clientsClaim } from 'workbox-core';
import { registerRoute } from 'workbox-routing';
import { NetworkFirst } from 'workbox-strategies';

const credentials = 'same-origin';
const manifest = self.__WB_MANIFEST as Array<ManifestEntry>;

const cacheName = cacheNames.runtime;
const cacheEntries: RequestInfo[] = [];

const manifestURLs = manifest.map(
  (entry) => {
    const url = new URL(entry.url, self.location);
    cacheEntries.push(new Request(url.href, {
      credentials: credentials as any,
    }));
    return url.href;
  },
);

self.addEventListener('install', (event: ExtendableEvent) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => cache.addAll(cacheEntries)),
  );
});

registerRoute(
  ({ url }) => manifestURLs.includes(url.href),
  new NetworkFirst(),
);

self.skipWaiting();
clientsClaim();
