import { notFound } from "next/navigation";

import { GalleryLightbox } from "@/components/gallery-lightbox";
import { getGalleryRouteParams, isGalleryItemId } from "@/lib/gallery";

export const dynamicParams = false;

export function generateStaticParams() {
  return getGalleryRouteParams();
}

export default async function PhotoModalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const decodedId = decodeURIComponent(id);

  if (!isGalleryItemId(decodedId)) {
    notFound();
  }

  return <GalleryLightbox currentId={decodedId} />;
}
