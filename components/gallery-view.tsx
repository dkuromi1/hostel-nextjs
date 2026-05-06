"use client";

import Image from "next/image";
import type { GalleryItem } from "@/lib/site-data";
import { SectionHeading } from "@/components/section-heading";
import { Panel } from "@/components/ui/panel";
import { Reveal } from "@/components/reveal";
import { CtaStrip } from "@/components/cta-strip";
import { SectionLabel } from "@/components/ui/section-label";
import { GalleryMasonry } from "@/components/gallery-masonry";

import { PageHero } from "@/components/page-hero";

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
      <PageHero
        eyebrow={galleryCopy.visualTour.eyebrow}
        title={galleryCopy.visualTour.title}
        description={galleryCopy.visualTour.description}
        backgroundImage="/images/rooftop_panorama.webp"
        backgroundAlt={galleryCopy.visualTour.title}
        hideActions={true}
        className="min-h-[35dvh] sm:min-h-[50dvh] pt-14 pb-8 sm:pt-16 sm:pb-16"
      >
        {null}
      </PageHero>

      <section className="py-[var(--layout-section-spacing)]">
        <div className="shell-container">
          <GalleryMasonry items={galleryItems} />
        </div>
      </section>

      <section className="py-[var(--layout-section-spacing)]">
        <div className="shell-container grid gap-[var(--layout-grid-gutter)] lg:grid-cols-[1.05fr_0.95fr] items-start">
          <Reveal className="lg:sticky lg:top-32">
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

          <Reveal delay={120} className="lg:sticky lg:top-32">
            <Panel className="p-6 sm:p-8">
              <SectionHeading
                variant="simple"
                eyebrow={galleryCopy.vibePanel.eyebrow}
                title={galleryCopy.vibePanel.title}
                description={galleryCopy.vibePanel.description}
                titleClassName="md:text-5xl"
              />
            </Panel>
          </Reveal>
        </div>
      </section>

      <section className="py-[var(--layout-section-spacing)]">
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
