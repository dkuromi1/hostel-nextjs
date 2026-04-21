"use client";

import Image from "next/image";
import { galleryItems, bookingAwardImage, siteCopyContent } from "@/lib/site-data";
import { SectionHeading } from "@/components/section-heading";
import { Panel } from "@/components/ui/panel";
import { Reveal } from "@/components/reveal";
import { CtaStrip } from "@/components/cta-strip";
import { SectionLabel } from "@/components/ui/section-label";
import { GalleryMasonry } from "@/components/gallery-masonry";

export function GalleryView() {
  return (
    <>
      <section className="py-8 sm:py-16">
        <div className="shell-container space-y-10">
          <SectionHeading
            eyebrow={siteCopyContent.gallery.visualTour.eyebrow}
            title={siteCopyContent.gallery.visualTour.title}
            description={siteCopyContent.gallery.visualTour.description}
          />
          <GalleryMasonry items={galleryItems} />
        </div>
      </section>

      <section className="py-8 sm:py-16">
        <div className="shell-container grid gap-6 lg:grid-cols-[1.05fr_0.95fr] items-start">
          <Reveal>
            <Panel className="overflow-hidden">
              <div className="grid gap-0 sm:grid-cols-[1.05fr_0.95fr] h-full">
                <div className="relative min-h-[16rem] h-full bg-[#003b95]">
                  <Image
                    src={bookingAwardImage}
                    alt={siteCopyContent.gallery.awardPanel.imageAlt}
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 640px) 100vw, 28vw"
                  />
                </div>
                <div className="p-6 flex flex-col justify-center">
                  <SectionLabel variant="sun" className="mb-4">{siteCopyContent.gallery.awardPanel.label}</SectionLabel>
                  <h2 className="mt-4 heading-card text-[var(--text-heading)]">
                    {siteCopyContent.gallery.awardPanel.title}
                  </h2>
                  <p className="mt-4 text-section-desc text-[var(--text-body-subtle)]">
                    {siteCopyContent.gallery.awardPanel.description}
                  </p>
                </div>
              </div>
            </Panel>
          </Reveal>

          <Reveal delay={120}>
            <Panel className="p-6 sm:p-8">
              <SectionHeading
                variant="simple"
                eyebrow={siteCopyContent.gallery.vibePanel.eyebrow}
                title={siteCopyContent.gallery.vibePanel.title}
                description={siteCopyContent.gallery.vibePanel.description}
              />
            </Panel>
          </Reveal>
        </div>
      </section>

      <section className="py-8 sm:py-16">
        <div className="shell-container">
          <CtaStrip
            eyebrow={siteCopyContent.gallery.cta.eyebrow}
            title={siteCopyContent.gallery.cta.title}
            description={siteCopyContent.gallery.cta.description}
            image={siteCopyContent.gallery.cta.image}
            alt={siteCopyContent.gallery.cta.alt}
            imageClassName="object-[50%_50%]"
          />
        </div>
      </section>
    </>
  );
}
