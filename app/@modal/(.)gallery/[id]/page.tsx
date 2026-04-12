"use client";

import * as React from "react";
import { GalleryLightbox } from "@/components/gallery-lightbox";

export default function PhotoModalPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = React.use(params);
    return <GalleryLightbox currentId={id} />;
}