"use client";

import Image from "next/image";
import type { GalleryItem } from "@/lib/site-data";
import { SectionHeading } from "@/components/section-heading";
import { Panel } from "@/components/ui/panel";
import { Reveal } from "@/components/reveal";
import { CtaStrip } from "@/components/cta-strip";
import { SectionLabel } from "@/components/ui/section-label";
import { GalleryMasonry } from "@/components/gallery-masonry";

export interface GalleryViewProps {
  galleryItems: GalleryItem[];
  bookingAwardImage: string;
  galleryCopy: any;
  bookingChannels: any[];
  contactChannels: any[];
}

export function GalleryView({ galleryItems, bookingAwardImage, galleryCopy, bookingChannels, contactChannels }: GalleryViewProps) {
  return (
    <>
      <section className="py-8 sm:py-16">
        <div className="shell-container space-y-10">
          <SectionHeading
            eyebrow={galleryCopy.visualTour.eyebrow}
            title={galleryCopy.visualTour.title}
            description={galleryCopy.visualTour.description}
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
                    alt={galleryCopy.awardPanel.imageAlt}
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 640px) 100vw, 28vw"
                  />
                </div>
                <div className="p-6 flex flex-col justify-center">
                  <SectionLabel variant="sun" className="mb-4">{galleryCopy.awardPanel.label}</SectionLabel>
                  <h2 className="mt-4 heading-card text-[var(--text-heading)]">
                    {galleryCopy.awardPanel.title}
                  </h2>
                  <p className="mt-4 text-section-desc text-[var(--text-body-subtle)]">
                    {galleryCopy.awardPanel.description}
                  </p>
                </div>
              </div>
            </Panel>
          </Reveal>

          <Reveal delay={120}>
            <Panel className="p-6 sm:p-8">
              <SectionHeading
                variant="simple"
                eyebrow={galleryCopy.vibePanel.eyebrow}
                title={galleryCopy.vibePanel.title}
                description={galleryCopy.vibePanel.description}
              />
            </Panel>
          </Reveal>
        </div>
      </section>

      <section className="py-8 sm:py-16">
        <div className="shell-container">
          <CtaStrip
            eyebrow={galleryCopy.cta.eyebrow}
            title={galleryCopy.cta.title}
            description={galleryCopy.cta.description}
            image={galleryCopy.cta.image}
            alt={galleryCopy.cta.alt}
            imageClassName="object-[50%_50%]"
            bookingChannels={bookingChannels}
            contactChannels={contactChannels}
          />
        </div>
      </section>
    </>
  );
}
