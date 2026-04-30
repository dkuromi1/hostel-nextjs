import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { GalleryView } from "@/components/gallery-view";
import { GalleryLightbox } from "@/components/gallery-lightbox";
import { getGalleryRouteParams, isGalleryItemId } from "@/lib/gallery";
import { buildMetadata } from "@/lib/metadata";
import { galleryItems, bookingAwardImage, siteCopyContent, bookingChannels, contactChannels } from "@/lib/site-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return getGalleryRouteParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const decodedId = decodeURIComponent(id);
  const item = galleryItems.find((galleryItem) => galleryItem.id === decodedId);

  if (!item) {
    return {};
  }

  const shareImage = item.type === "video" ? item.poster ?? item.src : item.src;
  const title = item.alt;

  return buildMetadata({
    title,
    description: `View ${item.alt} in the Scodrinon Hostel gallery.`,
    path: `/gallery/${item.id}`,
    image: shareImage,
    imageAlt: item.alt,
  });
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
      <GalleryView 
        galleryItems={galleryItems} 
        bookingAwardImage={bookingAwardImage} 
        galleryCopy={siteCopyContent.gallery}
        bookingChannels={bookingChannels}
        contactChannels={contactChannels}
      />
      <GalleryLightbox currentId={decodedId} isModal={false} galleryItems={galleryItems} />
    </>
  );
}
