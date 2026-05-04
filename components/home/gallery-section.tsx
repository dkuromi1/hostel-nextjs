import Link from "next/link";
import { EditorialButton } from "@/components/ui/editorial-button";

import { SectionHeading } from "@/components/section-heading";
import { GalleryMasonry } from "@/components/gallery-masonry";
import { cn } from "@/lib/utils";
import type { GalleryItem } from "@/lib/site-data";

export interface HomeGallerySectionProps {
  items: GalleryItem[];
  copy: {
    eyebrow: string;
    title: string;
    description: string;
    buttonLabel: string;
  };
}

export function HomeGallerySection({ items, copy }: HomeGallerySectionProps) {
  return (
    <section className="py-[var(--layout-section-spacing)]">
      <div className="shell-container space-y-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow={copy.eyebrow}
            title={copy.title}
            description={copy.description}
          />
          <EditorialButton
            href="/gallery"
            label={copy.buttonLabel}
          />

        </div>

        <div className="flow-root">
          <GalleryMasonry
            items={items.slice(0, 10)}
            priorityImageCount={0}
          />
        </div>
      </div>
    </section>
  );
}
