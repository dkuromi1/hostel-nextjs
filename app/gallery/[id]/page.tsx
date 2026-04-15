import { notFound } from "next/navigation";

import { GalleryView } from "@/components/gallery-view";
import { GalleryLightbox } from "@/components/gallery-lightbox";
import { getGalleryRouteParams, isGalleryItemId } from "@/lib/gallery";

export const dynamicParams = false;

export function generateStaticParams() {
  return getGalleryRouteParams();
}

export default async function PhotoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const decodedId = decodeURIComponent(id);

  if (!isGalleryItemId(decodedId)) {
    notFound();
  }

  return (
    <>
      <GalleryView />
      <GalleryLightbox currentId={decodedId} />
    </>
  );
}
