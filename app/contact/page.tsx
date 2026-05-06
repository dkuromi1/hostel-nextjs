import Image from "next/image";
import {
  Clock,
  MapPinned,
  MessageCircleMore,
} from "@/lib/icon-registry";

import dynamic from "next/dynamic";
import { BookingActions } from "@/components/booking-actions";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { SectionLabel } from "@/components/ui/section-label";
import { StructuredData } from "@/components/structured-data";

const LocationMap = dynamic(() => import("@/components/location-map").then(mod => mod.LocationMap), { ssr: true });
const FaqList = dynamic(() => import("@/components/faq-list").then(mod => mod.FaqList), { ssr: true });
const CtaStrip = dynamic(() => import("@/components/cta-strip").then(mod => mod.CtaStrip), { ssr: true });
const Panel = dynamic(() => import("@/components/ui/panel").then(mod => mod.Panel), { ssr: true });
import { buildBreadcrumbSchema, buildFaqSchema, buildMetadata } from "@/lib/metadata";
import {
  faqItems,
  siteConfig,
  siteCopyContent,
  bookingChannels,
  contactChannels,
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
        data={[
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
          buildFaqSchema(),
        ]}
      />

      <PageHero
        eyebrow={siteCopyContent.contact.hero.eyebrow}
        title={siteCopyContent.contact.hero.title}
        description="We prefer WhatsApp because it's the fastest way to answer your questions and secure your bed. Send your dates, room preference, and arrival time. You can also ask about hikes, bikes, lake plans, or the easiest way to move on from Shkoder after your stay."
        bookingChannels={bookingChannels}
        contactChannels={contactChannels}
        backgroundImage="/images/shkoder_pedestrian_street_2.webp"
        backgroundAlt={siteCopyContent.contact.hero.title}
      >
        <div className="grid gap-[var(--layout-grid-gutter)]">
          <Panel className="p-6 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              {/* Item 1: Phone */}
              <div className="flex flex-col">
                <div className="flex items-center gap-2.5 mb-4">
                  <MessageCircleMore className="size-4 text-[var(--brand-primary)]" />
                  <SectionLabel variant="emerald">Direct Contact</SectionLabel>
                </div>
                <div className="flex flex-col">
                  <p className="text-lg font-bold text-[var(--text-heading)]">
                    {siteConfig.phoneDisplay}
                  </p>
                  <a
                    href={siteConfig.whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 text-xs font-bold uppercase tracking-widest text-[var(--brand-primary)] hover:underline"
                  >
                    Message Us →
                  </a>
                </div>
              </div>

              {/* Item 2: Hours */}
              <div className="flex flex-col">
                <div className="flex items-center gap-2.5 mb-4">
                  <Clock className="size-4 text-amber-600 dark:text-amber-400" />
                  <SectionLabel variant="sun">Reception & Check-in</SectionLabel>
                </div>
                <div className="flex flex-col">
                  <p className="text-base font-semibold text-[var(--text-heading)]">
                    Reception: 24-hour access
                  </p>
                  <p className="text-sm text-[var(--text-body-subtle)]">
                    Check-in: {siteConfig.checkInHours}
                  </p>
                </div>
              </div>

              {/* Item 3: Location (Spans bottom row) */}
              <div className="md:col-span-2 flex flex-col">
                <div className="flex items-center gap-2.5 mb-4">
                  <MapPinned className="size-4 text-sky-600 dark:text-sky-400" />
                  <SectionLabel variant="sky">Our Location</SectionLabel>
                </div>
                <div className="flex flex-col">
                  <p className="text-base font-semibold leading-snug text-[var(--text-heading)]">
                    {siteConfig.location}
                  </p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.name + " " + siteConfig.location)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 text-xs font-bold uppercase tracking-widest text-sky-600 dark:text-sky-400 hover:underline"
                  >
                    Open in Maps →
                  </a>
                </div>
              </div>
            </div>
          </Panel>
          <div className="grid gap-[var(--layout-grid-gutter)] sm:grid-cols-2">
            <div className="group media-frame border-none bg-transparent relative min-h-[16rem]">
              <Image
                src="/images/hiking_1.jpg"
                alt={siteCopyContent.contact.heroImages.streetAlt}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 25vw"
              />
            </div>
            <div className="group media-frame border-none bg-transparent relative min-h-[16rem]">
              <Image
                src="/images/scodrinon_play_2.webp"
                alt={siteCopyContent.contact.heroImages.socialAlt}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 25vw"
              />
            </div>
          </div>
        </div>
      </PageHero>

      <section className="py-[var(--layout-section-spacing)]">
        <div className="shell-container sm:px-6 lg:px-8 grid gap-[var(--layout-grid-gutter)] lg:grid-cols-[1.2fr_0.8fr]">
          <div className="flex flex-col gap-6 h-full">

            {siteConfig.features.showLocalExperienceMap ? (
              <Reveal className="flex-1 px-2 sm:px-0" delay={50}>
                <div id="map" className="media-frame relative min-h-[450px] h-full w-full overflow-hidden rounded-3xl scroll-mt-24 sm:scroll-mt-32">
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

      <section className="py-[var(--layout-section-spacing)]">
        <div className="shell-container">
          <CtaStrip
            eyebrow={siteCopyContent.contact.cta.eyebrow}
            title={siteCopyContent.contact.cta.title}
            description={siteCopyContent.contact.cta.description}
            image={siteCopyContent.contact.cta.image}
            alt={siteCopyContent.contact.cta.alt}
            imageClassName="object-[50%_20%]"
            bookingChannels={bookingChannels}
            contactChannels={contactChannels}
          />
        </div>
      </section>
    </>
  );
}
