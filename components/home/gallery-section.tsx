import Link from "next/link";
import { EditorialButton } from "@/components/ui/editorial-button";

import { SectionHeading } from "@/components/section-heading";
import { GalleryMasonry } from "@/components/gallery-masonry";
import { Reveal } from "@/components/reveal";
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
    <section className="py-[var(--layout-section-spacing)] relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03] soft-grid" />
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[var(--brand-primary)]/[0.03] blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[var(--accent)]/[0.02] blur-3xl" />
      </div>
      
      <div className="shell-container space-y-12 relative z-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow={copy.eyebrow}
            title={copy.title}
            description={copy.description}
          />
          <div className="mt-auto">
            <EditorialButton
              href="/gallery"
              label={copy.buttonLabel}
              variant="ghost"
            />
          </div>

        </div>

        <Reveal className="flow-root">
          <GalleryMasonry
            items={items.slice(0, 10)}
            priorityImageCount={0}
          />
        </Reveal>
      </div>
    </section>
  );
}

