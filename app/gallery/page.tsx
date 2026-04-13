import { GalleryView } from "@/components/gallery-view";
import { StructuredData } from "@/components/structured-data";
import { buildBreadcrumbSchema, buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Photo And Video Gallery",
  description:
    "Browse real photos and short videos from Scodrinon Hostel, including the rooftop, rooms, breakfast, events, and the atmosphere around the stay.",
  path: "/gallery",
  image: "/images/rooftop_panorama.jpg",
});

export default function GalleryPage() {
  return (
    <>
      <StructuredData
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Gallery", path: "/gallery" },
        ])}
      />
      <GalleryView />
    </>
  );
}
