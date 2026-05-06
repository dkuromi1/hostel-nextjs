import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import {
  CacheFirst,
  ExpirationPlugin,
  RangeRequestsPlugin,
  Serwist,
  StaleWhileRevalidate,
} from "serwist";

// This declares the precache injection point for TypeScript.
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
const MAPBOX_ASSET_CACHE_MAX_AGE_SECONDS = 30 * 24 * 60 * 60;
const MAPBOX_TILE_CACHE_MAX_AGE_SECONDS = 30 * 24 * 60 * 60;

const IMAGE_PATH_PATTERN = /^\/images\/.+\.(?:avif|gif|jpe?g|png|svg|webp)$/i;
const VIDEO_PATH_PATTERN = /^\/videos\/.+\.(?:mp4|webm)$/i;
const FONT_PATH_PATTERN = /\.(?:woff2?|ttf|otf)$/i;
const ICON_PATH_PATTERN = /^\/(?:favicon\.ico|apple-icon(?:-\d+x\d+)?\.png|icon(?:-\d+)?\.png|icon\.png|logo\.(?:png|webp)|.*\.svg)$/i;
const MANIFEST_PATH_PATTERN = /\.(?:webmanifest|manifest\.json)$/i;
const NEXT_STATIC_PATH_PATTERN = /^\/_next\/static\/.+/i;
const NEXT_IMAGE_PATH_PATTERN = /^\/_next\/image$/i;
const MAPBOX_HOST_PATTERN = /(?:^|\.)mapbox\.com$/i;
const MAPBOX_ASSET_PATH_PATTERN = /^\/(?:styles|fonts|sprites)\//i;
const MAPBOX_TILE_PATH_PATTERN = /^\/(?:v4|raster\/v1|tiles\/v1)\//i;

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

function isMapboxAssetRequest(url: URL) {
  return MAPBOX_HOST_PATTERN.test(url.hostname) && MAPBOX_ASSET_PATH_PATTERN.test(url.pathname);
}

function isMapboxTileRequest(url: URL) {
  return MAPBOX_HOST_PATTERN.test(url.hostname) && MAPBOX_TILE_PATH_PATTERN.test(url.pathname);
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
    // Fonts served from same origin (e.g. via next/font output under /_next/static)
    // are content-hashed, so CacheFirst is safe: a cache miss always gets a fresh file.
    matcher: ({ sameOrigin, url }: { sameOrigin: boolean; url: URL }) =>
      sameOrigin && FONT_PATH_PATTERN.test(url.pathname),
    handler: new CacheFirst({
      cacheName: "app-shell-fonts",
      plugins: [
        new ExpirationPlugin({
          maxEntries: 32,
          maxAgeSeconds: APP_SHELL_CACHE_MAX_AGE_SECONDS,
          maxAgeFrom: "last-used",
        }),
      ],
    }),
  },
  {
    // Icons and brand assets (favicons, logos, SVGs). Not content-hashed, so use
    // StaleWhileRevalidate with a short 7-day TTL so design changes propagate quickly.
    matcher: ({ sameOrigin, url }: { sameOrigin: boolean; url: URL }) =>
      sameOrigin && ICON_PATH_PATTERN.test(url.pathname),
    handler: new StaleWhileRevalidate({
      cacheName: "app-shell-icons",
      plugins: [
        new ExpirationPlugin({
          maxEntries: 48,
          maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days — not content-hashed
          maxAgeFrom: "last-used",
        }),
      ],
    }),
  },
  {
    // Web manifests (.webmanifest) must stay fresh so PWA installs pick up name,
    // theme_color, and start_url changes. NetworkFirst with a short cache fallback.
    matcher: ({ sameOrigin, url }: { sameOrigin: boolean; url: URL }) =>
      sameOrigin && MANIFEST_PATH_PATTERN.test(url.pathname),
    handler: new StaleWhileRevalidate({
      cacheName: "app-shell-manifests",
      plugins: [
        new ExpirationPlugin({
          maxEntries: 4,
          maxAgeSeconds: 24 * 60 * 60, // 1 day — must stay up-to-date for PWA
          maxAgeFrom: "last-used",
        }),
      ],
    }),
  },
  {
    matcher: ({ url }: { url: URL }) => isMapboxAssetRequest(url),
    handler: new CacheFirst({
      cacheName: "mapbox-assets",
      plugins: [
        new ExpirationPlugin({
          maxEntries: 128,
          maxAgeSeconds: MAPBOX_ASSET_CACHE_MAX_AGE_SECONDS,
          maxAgeFrom: "last-used",
        }),
      ],
    }),
  },
  {
    matcher: ({ url }: { url: URL }) => isMapboxTileRequest(url),
    handler: new CacheFirst({
      cacheName: "mapbox-tiles",
      plugins: [
        new ExpirationPlugin({
          maxEntries: 256,
          maxAgeSeconds: MAPBOX_TILE_CACHE_MAX_AGE_SECONDS,
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

// Add error handling for precaching failures
self.addEventListener('unhandledrejection', (event) => {
  if (event.reason && event.reason.message && event.reason.message.includes('bad-precaching-response')) {
    console.warn('Precaching error handled:', event.reason);
    event.preventDefault();
  }
});

serwist.addEventListeners();
