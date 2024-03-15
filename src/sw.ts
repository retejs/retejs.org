/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-globals */
import { cacheNames, clientsClaim } from 'workbox-core';
import { registerRoute } from 'workbox-routing';
import { NetworkFirst } from 'workbox-strategies';

declare const self: Window & typeof globalThis & {
  location: string
  __WB_MANIFEST: { url: string, href: string }[]
  skipWaiting(): void;
};

const credentials = 'same-origin' as const;
const manifest = self.__WB_MANIFEST;

const cacheName = cacheNames.runtime;
const cacheEntries: RequestInfo[] = [];

const manifestURLs = manifest.map(
  (entry) => {
    const url = new URL(entry.url, self.location);
    cacheEntries.push(new Request(url.href, {
      credentials,
    }));
    return url.href;
  },
);

self.addEventListener('install', (event) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (event as any).waitUntil(
    caches.open(cacheName).then((cache) => cache.addAll(cacheEntries)),
  );
});

registerRoute(
  ({ url }) => manifestURLs.includes(url.href),
  new NetworkFirst(),
);

self.skipWaiting();
clientsClaim();
