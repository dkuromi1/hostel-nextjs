import type { GalleryItem } from "@/lib/site-data";

const warmedImageSrcs = new Set<string>();
const pendingImageWarmups = new Map<string, Promise<void>>();

function warmImageSrc(src: string, fetchPriority: "high" | "auto" = "auto") {
  if (typeof window === "undefined") return Promise.resolve();
  if (warmedImageSrcs.has(src)) return Promise.resolve();

  const existing = pendingImageWarmups.get(src);
  if (existing) return existing;

  const img = new window.Image();
  if ("fetchPriority" in img) {
    img.fetchPriority = fetchPriority;
  }

  const promise = new Promise<void>((resolve) => {
    const finish = () => {
      warmedImageSrcs.add(src);
      pendingImageWarmups.delete(src);
      clearTimeout(safetyTimeout);
      resolve();
    };

    const bail = () => {
      pendingImageWarmups.delete(src);
      clearTimeout(safetyTimeout);
      resolve();
    };

    // Safety valve: if onload/onerror never fires (e.g. navigation cancels
    // the request mid-flight), ensure the promise and the img closure are
    // released after 10 s so they don't leak indefinitely.
    const safetyTimeout = setTimeout(bail, 10_000);

    img.onload = () => {
      if (typeof img.decode === "function") {
        img.decode().catch(() => {}).finally(finish);
        return;
      }

      finish();
    };

    img.onerror = bail;

    img.src = src;

    if (img.complete) {
      if (typeof img.decode === "function") {
        img.decode().catch(() => {}).finally(finish);
        return;
      }

      finish();
    }
  });

  pendingImageWarmups.set(src, promise);
  return promise;
}

export function warmGalleryItemMedia(
  item?: GalleryItem,
  fetchPriority: "high" | "auto" = "auto",
) {
  if (!item) return Promise.resolve();

  if (item.type === "image") {
    return warmImageSrc(item.src, fetchPriority);
  }

  if (item.poster) {
    return warmImageSrc(item.poster, fetchPriority);
  }

  return Promise.resolve();
}
