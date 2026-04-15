import { galleryItems } from "@/lib/site-data";

export function getGalleryItemIndex(id: string) {
  return galleryItems.findIndex((item) => item.id === id);
}

export function isGalleryItemId(id: string) {
  return getGalleryItemIndex(id) !== -1;
}

export function getGalleryRouteParams() {
  return galleryItems.map((item) => ({ id: item.id }));
}
