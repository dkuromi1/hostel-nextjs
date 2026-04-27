import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { GalleryMasonry } from "@/components/gallery-masonry";
import { cn } from "@/lib/utils";
import { galleryItems, siteCopyContent } from "@/lib/site-data";

export function HomeGallerySection() {
  return (
    <section className="py-8 sm:py-16">
      <div className="shell-container space-y-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow={siteCopyContent.home.gallerySection.eyebrow}
            title={siteCopyContent.home.gallerySection.title}
            description={siteCopyContent.home.gallerySection.description}
          />
          <Link
            href="/gallery"
            className={cn(
              "group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full px-7 py-3.5",
              "bg-gradient-to-br from-[var(--surface-dark)] via-[var(--surface-dark-secondary)] to-[var(--surface-dark)]",
              "text-sm font-semibold tracking-tight text-[var(--text-on-surface-dark)]",
              "shadow-lg shadow-[var(--surface-dark)]/30 ring-1 ring-white/10",
              "transition-all duration-300 hover:shadow-xl hover:shadow-[var(--surface-dark)]/40 hover:-translate-y-0.5",
              "active:scale-95 active:translate-y-0.5"
            )}
          >
            <span>{siteCopyContent.home.gallerySection.buttonLabel}</span>
            <div className="relative flex size-6 items-center justify-center rounded-full bg-white/20 text-white transition-all duration-300 group-hover:bg-[var(--brand-accent)] group-hover:scale-110">
              <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={2.5} />
            </div>
          </Link>
        </div>

        <div className="flow-root">
          <GalleryMasonry
            items={galleryItems.slice(0, 10)}
            priorityImageCount={0}
          />
        </div>
      </div>
    </section>
  );
}
