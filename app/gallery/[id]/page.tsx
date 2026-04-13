import { GalleryView } from "@/components/gallery-view";
import { GalleryLightbox } from "@/components/gallery-lightbox";

export default async function PhotoPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    return (
        <>
            <GalleryView />
            <GalleryLightbox currentId={id} />
        </>
    );
}