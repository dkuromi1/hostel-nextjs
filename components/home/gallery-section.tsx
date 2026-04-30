import Link from "next/link";
import { ArrowRight } from "@/lib/icon-registry";
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
    <section className="py-8 sm:py-16">
      <div className="shell-container space-y-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow={copy.eyebrow}
            title={copy.title}
            description={copy.description}
          />
          <Link
            href="/gallery"
            className={cn(
              "group relative inline-flex items-center justify-center gap-4 overflow-hidden rounded-full px-8 py-4",
              "bg-gradient-to-br from-[var(--surface-dark)] via-[var(--surface-dark-secondary)] to-[var(--surface-dark)]",
              "text-sm font-semibold tracking-tight text-[var(--text-on-surface-dark)]",
              "shadow-lg shadow-[var(--surface-dark)]/30 ring-1 ring-white/10",
              "transition-all duration-300 hover:shadow-xl hover:shadow-[var(--surface-dark)]/40 hover:-translate-y-0.5",
              "active:scale-95 active:translate-y-0"
            )}
          >
            <div className="absolute inset-0 z-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-[100%]" />
            <span className="relative z-10">
              {copy.buttonLabel}
            </span>
            <div className="relative z-10 flex size-7 items-center justify-center rounded-full bg-white/15 text-white transition-all duration-300 group-hover:bg-[var(--brand-accent)] group-hover:scale-110">
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={2.5} />
            </div>
          </Link>
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
