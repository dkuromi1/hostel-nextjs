import { serwist } from "@serwist/next/config";

export default serwist({
  swSrc: "app/sw.ts",
  swDest: "public/sw.js",
  globIgnores: [
    "public/admin/**/*",
    "public/offline.html",
  ],
});
