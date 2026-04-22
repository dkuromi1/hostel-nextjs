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
              "bg-slate-900 text-white shadow-lg shadow-slate-900/20",
              "text-sm font-semibold tracking-tight",
              "transition-all duration-300 hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-900/30 hover:-translate-y-0.5",
              "active:scale-95 active:translate-y-0.5"
            )}
          >
            <span>{siteCopyContent.home.gallerySection.buttonLabel}</span>
            <div className="relative flex size-6 items-center justify-center rounded-full bg-white/20 text-white transition-all duration-300 group-hover:bg-emerald-500 group-hover:scale-110">
              <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={2.5} />
            </div>
          </Link>
        </div>

        <div className="flow-root">
          <GalleryMasonry
            items={galleryItems.slice(0, 12)}
            priorityImageCount={0}
          />
        </div>
      </div>
    </section>
  );
}
