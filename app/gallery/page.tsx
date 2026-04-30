import dynamic from "next/dynamic";
import { StructuredData } from "@/components/structured-data";
import { buildBreadcrumbSchema, buildMetadata } from "@/lib/metadata";
import { siteCopyContent, galleryItems, bookingAwardImage, bookingChannels, contactChannels } from "@/lib/site-data";

const GalleryView = dynamic(() => import("@/components/gallery-view").then(mod => mod.GalleryView), { ssr: true });

export const metadata = buildMetadata({
  title: siteCopyContent.gallery.metadata.title,
  description: siteCopyContent.gallery.metadata.description,
  path: "/gallery",
  image: siteCopyContent.gallery.metadata.image,
});

export default function GalleryPage() {
  return (
    <>
      <StructuredData
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: siteCopyContent.gallery.pageTitle, path: "/gallery" },
        ])}
      />
      <GalleryView 
        galleryItems={galleryItems} 
        bookingAwardImage={bookingAwardImage} 
        galleryCopy={siteCopyContent.gallery}
        bookingChannels={bookingChannels}
        contactChannels={contactChannels}
      />
    </>
  );
}
