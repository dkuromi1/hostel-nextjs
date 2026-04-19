"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { galleryItems, bookingAwardImage } from "@/lib/site-data";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/section-heading";
import { Panel } from "@/components/ui/panel";
import { Reveal } from "@/components/reveal";
import { CtaStrip } from "@/components/cta-strip";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionLabel } from "@/components/ui/section-label";
import { GalleryMasonry } from "@/components/gallery-masonry";

export function GalleryView() {
  return (
    <>
      <section className="py-8 sm:py-16">
        <div className="shell-container space-y-10">
          <SectionHeading
            eyebrow="Visual Tour"
            title="Scroll through the stay before you step into it."
            description="Get a feel for the hostel in a few swipes: the rooftop, the pods, the breakfast, and the overall vibe of the place."
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
                    alt="Booking award displayed at Scodrinon Hostel"
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 640px) 100vw, 28vw"
                  />
                </div>
                <div className="p-6 flex flex-col justify-center">
                  <SectionLabel variant="sun" className="mb-4">Highly Rated</SectionLabel>
                  <h2 className="mt-4 heading-card text-[var(--text-heading)]">
                    What you see is exactly what you get.
                  </h2>
                  <p className="mt-4 text-section-desc text-[var(--text-body-subtle)]">
                    We’re proud of our 9.5 rating, but our real pride is our space. No heavy filters or staged tricks. Just real, comfortable environments ready for your next adventure.
                  </p>
                </div>
              </div>
            </Panel>
          </Reveal>

          <Reveal delay={120}>
            <Panel className="p-6 sm:p-8">
              <SectionHeading
                variant="simple"
                eyebrow="Our Vibe"
                title="Bright, clean, social, and easy to settle into."
                description="Take a look around. Our spaces blend modern design with welcoming warmth. And that rooftop you keep seeing? That’s where the true hostel magic happens and travelers come together."
              />
            </Panel>
          </Reveal>
        </div>
      </section>

      <section className="py-8 sm:py-16">
        <div className="shell-container">
          <CtaStrip
            eyebrow="Ready To Stay"
            title="If the gallery feels like your kind of hostel, message now."
            description="The fastest move is still the direct one: WhatsApp first, then Booking.com and Hostelworld right behind it."
            image="/images/rooftop_view.jpg"
            alt="Rooftop view from Scodrinon Hostel at sunset"
            imageClassName="object-[50%_50%]"
          />
        </div>
      </section>
    </>
  );
}
