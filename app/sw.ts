import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import {
  CacheFirst,
  ExpirationPlugin,
  RangeRequestsPlugin,
  Serwist,
  StaleWhileRevalidate,
} from "serwist";

// This declares the value of `injectionPoint` to TypeScript.
// `injectionPoint` is the string that will be replaced by the
// actual precache manifest. By default, this string is set to
// `"self.__SW_MANIFEST"`.
declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

const ADMIN_PATH_PREFIX = "/admin";
const OFFLINE_PAGE_URL = "/offline.html";
const MEDIA_CACHE_MAX_AGE_SECONDS = 30 * 24 * 60 * 60;
const DOCUMENT_CACHE_MAX_AGE_SECONDS = 7 * 24 * 60 * 60;
const APP_SHELL_CACHE_MAX_AGE_SECONDS = 30 * 24 * 60 * 60;
const MAPBOX_CACHE_MAX_AGE_SECONDS = 7 * 24 * 60 * 60;

const IMAGE_PATH_PATTERN = /^\/images\/.+\.(?:avif|gif|jpe?g|png|svg|webp)$/i;
const VIDEO_PATH_PATTERN = /^\/videos\/.+\.(?:mp4|webm)$/i;
const FONT_PATH_PATTERN = /\.(?:woff2?|ttf|otf)$/i;
const ICON_PATH_PATTERN = /^\/(?:favicon\.ico|apple-icon(?:-\d+x\d+)?\.png|icon(?:-\d+)?\.png|icon\.png|logo\.(?:png|webp)|site\.webmanifest|manifest\.webmanifest|.*\.svg)$/i;
const NEXT_STATIC_PATH_PATTERN = /^\/_next\/static\/.+/i;
const NEXT_IMAGE_PATH_PATTERN = /^\/_next\/image$/i;
const MAPBOX_HOST_PATTERN = /(?:^|\.)mapbox\.com$/i;
const MAPBOX_PATH_PATTERN = /^\/(?:styles|fonts|sprites|v4|raster\/v1|tiles\/v1|map-sessions\/v1)\//i;

function isAdminPath(pathname: string) {
  return pathname === ADMIN_PATH_PREFIX || pathname.startsWith(`${ADMIN_PATH_PREFIX}/`);
}

function getEntryPathname(entry: PrecacheEntry | string) {
  const rawUrl = typeof entry === "string" ? entry : entry.url;
  return new URL(rawUrl, self.location.origin).pathname;
}

function isAdminPrecacheEntry(entry: PrecacheEntry | string) {
  return isAdminPath(getEntryPathname(entry));
}

function isLargeMediaPrecacheEntry(entry: PrecacheEntry | string) {
  const pathname = getEntryPathname(entry);
  return IMAGE_PATH_PATTERN.test(pathname) || VIDEO_PATH_PATTERN.test(pathname);
}

function isDocumentRequest(request: Request) {
  return request.mode === "navigate" || request.destination === "document";
}

function isMapboxRequest(url: URL) {
  return MAPBOX_HOST_PATTERN.test(url.hostname) && MAPBOX_PATH_PATTERN.test(url.pathname);
}

const runtimeCaching = [
  {
    matcher: ({ request, sameOrigin, url }: { request: Request; sameOrigin: boolean; url: URL }) =>
      sameOrigin && isDocumentRequest(request) && !isAdminPath(url.pathname),
    handler: new StaleWhileRevalidate({
      cacheName: "pages",
      plugins: [
        new ExpirationPlugin({
          maxEntries: 32,
          maxAgeSeconds: DOCUMENT_CACHE_MAX_AGE_SECONDS,
          maxAgeFrom: "last-used",
        }),
      ],
    }),
  },
  {
    matcher: ({ sameOrigin, url }: { sameOrigin: boolean; url: URL }) =>
      sameOrigin && NEXT_STATIC_PATH_PATTERN.test(url.pathname),
    handler: new CacheFirst({
      cacheName: "next-static-assets",
      plugins: [
        new ExpirationPlugin({
          maxEntries: 96,
          maxAgeSeconds: APP_SHELL_CACHE_MAX_AGE_SECONDS,
          maxAgeFrom: "last-used",
        }),
      ],
    }),
  },
  {
    matcher: ({ sameOrigin, url }: { sameOrigin: boolean; url: URL }) =>
      sameOrigin && NEXT_IMAGE_PATH_PATTERN.test(url.pathname),
    handler: new StaleWhileRevalidate({
      cacheName: "next-image",
      plugins: [
        new ExpirationPlugin({
          maxEntries: 64,
          maxAgeSeconds: APP_SHELL_CACHE_MAX_AGE_SECONDS,
          maxAgeFrom: "last-used",
        }),
      ],
    }),
  },
  {
    matcher: ({ sameOrigin, url }: { sameOrigin: boolean; url: URL }) =>
      sameOrigin && IMAGE_PATH_PATTERN.test(url.pathname),
    handler: new StaleWhileRevalidate({
      cacheName: "site-images",
      plugins: [
        new ExpirationPlugin({
          maxEntries: 128,
          maxAgeSeconds: MEDIA_CACHE_MAX_AGE_SECONDS,
          maxAgeFrom: "last-used",
        }),
      ],
    }),
  },
  {
    matcher: ({ sameOrigin, url }: { sameOrigin: boolean; url: URL }) =>
      sameOrigin && VIDEO_PATH_PATTERN.test(url.pathname),
    handler: new CacheFirst({
      cacheName: "site-videos",
      plugins: [
        new RangeRequestsPlugin(),
        new ExpirationPlugin({
          maxEntries: 16,
          maxAgeSeconds: MEDIA_CACHE_MAX_AGE_SECONDS,
          maxAgeFrom: "last-used",
        }),
      ],
    }),
  },
  {
    matcher: ({ sameOrigin, url }: { sameOrigin: boolean; url: URL }) =>
      sameOrigin && (FONT_PATH_PATTERN.test(url.pathname) || ICON_PATH_PATTERN.test(url.pathname)),
    handler: new StaleWhileRevalidate({
      cacheName: "app-shell-assets",
      plugins: [
        new ExpirationPlugin({
          maxEntries: 48,
          maxAgeSeconds: APP_SHELL_CACHE_MAX_AGE_SECONDS,
          maxAgeFrom: "last-used",
        }),
      ],
    }),
  },
  {
    matcher: ({ url }: { url: URL }) => isMapboxRequest(url),
    handler: new StaleWhileRevalidate({
      cacheName: "mapbox-runtime",
      plugins: [
        new ExpirationPlugin({
          maxEntries: 96,
          maxAgeSeconds: MAPBOX_CACHE_MAX_AGE_SECONDS,
          maxAgeFrom: "last-used",
        }),
      ],
    }),
  },
];

const precacheEntries = [
  ...(self.__SW_MANIFEST?.filter(
    (entry) =>
      !isAdminPrecacheEntry(entry) &&
      !isLargeMediaPrecacheEntry(entry) &&
      getEntryPathname(entry) !== OFFLINE_PAGE_URL,
  ) ?? []),
  { url: OFFLINE_PAGE_URL, revision: "1" },
];

const serwist = new Serwist({
  precacheEntries,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching,
});

serwist.setCatchHandler(async ({ request }) => {
  if (request.destination === "document") {
    return (await serwist.matchPrecache(OFFLINE_PAGE_URL)) ?? Response.error();
  }

  return Response.error();
});

serwist.addEventListeners();
