import { GalleryView } from "@/components/gallery-view";
import { StructuredData } from "@/components/structured-data";
import { buildBreadcrumbSchema, buildMetadata } from "@/lib/metadata";
import { siteCopyContent } from "@/lib/site-data";

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
      <GalleryView />
    </>
  );
}
