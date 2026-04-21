import Image from "next/image";
import {
  Clock,
  MapPinned,
  MessageCircleMore,
} from "lucide-react";

import { BookingActions } from "@/components/booking-actions";
import { CtaStrip } from "@/components/cta-strip";
import { FaqList } from "@/components/faq-list";
import { LocationMap } from "@/components/location-map";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { SectionLabel } from "@/components/ui/section-label";
import { StructuredData } from "@/components/structured-data";
import { Panel } from "@/components/ui/panel";
import { buildBreadcrumbSchema, buildMetadata } from "@/lib/metadata";
import {
  faqItems,
  siteConfig,
  siteCopyContent,
} from "@/lib/site-data";

export const metadata = buildMetadata({
  title: siteCopyContent.contact.metadata.title,
  description: siteCopyContent.contact.metadata.description,
  path: "/contact",
  image: siteCopyContent.contact.metadata.image,
});

export default function ContactPage() {
  return (
    <>
      <StructuredData
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />

      <PageHero
        eyebrow={siteCopyContent.contact.hero.eyebrow}
        title={siteCopyContent.contact.hero.title}
        description={siteCopyContent.contact.hero.description}
      >
        <div className="grid gap-4">
          <Panel className="p-6 sm:p-7">
            <SectionLabel variant="emerald" className="mb-4">{siteCopyContent.contact.bestBookingRoute.label}</SectionLabel>
            <h2 className="mt-4 heading-card text-[var(--text-heading)]">
              {siteCopyContent.contact.bestBookingRoute.title}
            </h2>
            <p className="mt-4 max-w-[44ch] text-section-desc text-[var(--text-body-subtle)]">
              {siteCopyContent.contact.bestBookingRoute.description}
            </p>
            <div className="mt-6">
              <BookingActions className="max-w-4xl" whatsappOnly={true} />
            </div>
          </Panel>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="media-frame relative min-h-[16rem]">
              <Image
                src="/images/ambiance_2.jpg"
                alt={siteCopyContent.contact.heroImages.streetAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
            </div>
            <div className="media-frame relative min-h-[16rem]">
              <Image
                src="/images/bar_2.jpg"
                alt={siteCopyContent.contact.heroImages.socialAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
            </div>
          </div>
        </div>
      </PageHero>

      <section className="py-8 sm:py-16">
        <div className="shell-container grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="flex flex-col gap-6 h-full">
            <Reveal>
              <Panel className="p-6 sm:p-8">
                <SectionLabel variant="sun" className="mb-4">{siteCopyContent.contact.contactDetails.label}</SectionLabel>
                <div className="mt-6 space-y-4 text-base leading-8 text-[var(--text-body-subtle)]">
                  <p className="flex items-start gap-3">
                    <MessageCircleMore
                      className="mt-1 size-5 shrink-0 text-emerald-700"
                      strokeWidth={1.8}
                    />
                    <span>{siteConfig.phoneDisplay}</span>
                  </p>
                  <p className="flex items-start gap-3">
                    <MapPinned
                      className="mt-1 size-5 shrink-0 text-emerald-700"
                      strokeWidth={1.8}
                    />
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        siteConfig.name + " " + siteConfig.location
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="underline decoration-slate-300 underline-offset-4 hover:text-emerald-700 transition-colors"
                    >
                      {siteConfig.location}
                    </a>
                  </p>
                  <p className="flex items-start gap-3">
                    <Clock
                      className="mt-1 size-5 shrink-0 text-emerald-700"
                      strokeWidth={1.8}
                    />
                    <span>{siteCopyContent.contact.contactDetails.reception.replace("{checkInHours}", siteConfig.checkInHours)}</span>
                  </p>
                </div>
              </Panel>
            </Reveal>

            {siteConfig.features.showLocalExperienceMap ? (
              <Reveal className="flex-1" delay={50}>
                <div id="map" className="media-frame relative min-h-[400px] h-full w-full overflow-hidden rounded-3xl">
                  <LocationMap />
                </div>
              </Reveal>
            ) : null}
          </div>

          <Reveal delay={120}>
            <Panel className="p-6 sm:p-8 h-full">
              <SectionHeading
                variant="simple"
                eyebrow={siteCopyContent.contact.faq.eyebrow}
                title={siteCopyContent.contact.faq.title}
                description={siteCopyContent.contact.faq.description}
              />
              <div className="mt-8">
                <FaqList items={faqItems} />
              </div>
            </Panel>
          </Reveal>
        </div>
      </section>

      <section className="py-8 sm:py-16">
        <div className="shell-container">
          <CtaStrip
            eyebrow={siteCopyContent.contact.cta.eyebrow}
            title={siteCopyContent.contact.cta.title}
            description={siteCopyContent.contact.cta.description}
            image={siteCopyContent.contact.cta.image}
            alt={siteCopyContent.contact.cta.alt}
            imageClassName="object-[50%_20%]"
          />
        </div>
      </section>
    </>
  );
}
