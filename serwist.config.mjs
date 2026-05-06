import { serwist } from "@serwist/next/config";

export default serwist({
  swSrc: "app/sw.ts",
  swDest: "public/sw.js",
  globIgnores: [
    // Admin routes are excluded from precache entirely
    "public/admin/**/*",
    "public/offline.html",
    // Images and videos are handled by runtime caching (StaleWhileRevalidate /
    // CacheFirst). Precaching them bloats the install manifest and risks quota
    // exhaustion on low-storage devices — especially logo.png which is 543 KB.
    "public/images/**/*",
    "public/videos/**/*",
    "public/logo.png",
    "public/branding/logo.png",
  ],
});
