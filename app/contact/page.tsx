import Image from "next/image";
import {
  Clock,
  Mail,
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
const SwipableRow = dynamic(() => import("@/components/swipable-row").then(mod => mod.SwipableRow), { ssr: true });
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
        backgroundPosition="20% center"
      >
        <div className="grid gap-[var(--layout-grid-gutter)] w-full min-w-0 max-w-full">
          <Panel className="relative p-6 sm:p-8 bg-white/95 dark:bg-zinc-900/90 backdrop-blur-lg shadow-2xl border-[var(--border)] overflow-visible !rounded-[var(--radius-3xl)]">
            {/* Offset backdrop sheet for contact panel tactility */}
            <div className="absolute -inset-px rounded-[var(--radius-3xl)] border border-[var(--border)] -z-10 bg-[var(--muted)]/40 opacity-30 translate-x-3 translate-y-3 dark:bg-card/25" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              {/* Item 1: Direct Contact */}
              <div className="group/item relative flex flex-col gap-4 p-5 rounded-2xl border border-[var(--border)] bg-zinc-50/50 dark:bg-zinc-950/20 hover:bg-white dark:hover:bg-zinc-900 hover:border-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/[0.02] transition-all duration-500">
                <div className="flex items-center gap-2.5">
                  <MessageCircleMore className="size-4 text-[var(--brand-primary)] transition-transform duration-300 group-hover/item:scale-110" />
                  <SectionLabel variant="emerald">Direct Contact</SectionLabel>
                </div>
                <div className="flex flex-col gap-1.5">
                  <p className="text-base sm:text-lg font-bold tracking-tight text-[var(--text-heading)]">
                    {siteConfig.phoneDisplay}
                  </p>
                  <a
                    href={siteConfig.whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-fit inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-emerald-500/20 text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-500/[0.03] hover:bg-emerald-600 hover:text-white hover:border-transparent transition-all duration-300"
                  >
                    Message Us &rarr;
                  </a>
                  <div className="w-full h-px bg-[var(--border)] my-2 opacity-60" aria-hidden="true" />
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="w-fit inline-flex items-center gap-1.5 text-xs text-[var(--text-body-subtle)] hover:text-[var(--text-body)] transition-colors duration-200"
                  >
                    <Mail className="size-3 shrink-0 opacity-60" />
                    {siteConfig.email}
                  </a>
                </div>
              </div>

              {/* Item 2: Hours */}
              <div className="group/item relative flex flex-col gap-4 p-5 rounded-2xl border border-[var(--border)] bg-zinc-50/50 dark:bg-zinc-950/20 hover:bg-white dark:hover:bg-zinc-900 hover:border-amber-500/30 hover:shadow-xl hover:shadow-amber-500/[0.02] transition-all duration-500">
                <div className="flex items-center gap-2.5">
                  <Clock className="size-4 text-amber-600 dark:text-amber-400 transition-transform duration-300 group-hover/item:scale-110" />
                  <SectionLabel variant="sun">Reception & Check-in/out</SectionLabel>
                </div>
                <div className="flex flex-col gap-1 py-0.5">
                  <p className="text-sm sm:text-base font-bold text-[var(--text-heading)]">
                    Reception: 24-hour access
                  </p>
                  <div className="w-full h-px bg-[var(--border)] my-2 opacity-60" aria-hidden="true" />
                  <p className="text-xs sm:text-sm text-[var(--text-body-subtle)] font-semibold">
                    Check-in: {siteConfig.checkInHours}
                  </p>
                  <p className="text-xs sm:text-sm text-[var(--text-body-subtle)] font-semibold">
                    Check-out: {siteConfig.checkOutHours}
                  </p>
                </div>
              </div>

              {/* Item 3: Location */}
              <div className="md:col-span-2 group/item relative flex flex-col gap-4 p-5 rounded-2xl border border-[var(--border)] bg-zinc-50/50 dark:bg-zinc-950/20 hover:bg-white dark:hover:bg-zinc-900 hover:border-sky-500/30 hover:shadow-xl hover:shadow-sky-500/[0.02] transition-all duration-500">
                <div className="flex items-center gap-2.5">
                  <MapPinned className="size-4 text-sky-600 dark:text-sky-400 transition-transform duration-300 group-hover/item:scale-110" />
                  <SectionLabel variant="sky">Our Location</SectionLabel>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-sm sm:text-base font-bold leading-relaxed text-[var(--text-heading)]">
                    {siteConfig.location}
                  </p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.name + " " + siteConfig.location)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-fit inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-sky-500/20 text-[10px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 bg-sky-500/[0.03] hover:bg-sky-600 hover:text-white hover:border-transparent transition-all duration-300"
                  >
                    Open in Maps &rarr;
                  </a>
                </div>
              </div>
            </div>
          </Panel>

          {/* Desktop Banner Images (sm+) */}
          <div className="hidden sm:grid gap-[var(--layout-grid-gutter)] sm:grid-cols-2">
            <div className="group media-frame border-none bg-transparent relative min-h-[16rem] overflow-hidden rounded-[var(--radius-3xl)] shadow-2xl">
              <Image
                src="/images/hiking_1.jpg"
                alt={siteCopyContent.contact.heroImages.streetAlt}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                loading="eager"
                sizes="(max-width: 640px) 100vw, 25vw"
              />
            </div>
            <div className="group media-frame border-none bg-transparent relative min-h-[16rem] overflow-hidden rounded-[var(--radius-3xl)] shadow-xl">
              <Image
                src="/images/scodrinon_play_2.webp"
                alt={siteCopyContent.contact.heroImages.socialAlt}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                loading="eager"
                sizes="(max-width: 640px) 100vw, 25vw"
              />
            </div>
          </div>

          {/* Mobile-Only Swipable Row (< sm) */}
          <div className="block sm:hidden w-full min-w-0 max-w-full overflow-hidden">
            <SwipableRow itemCount={2} className="pb-1">
              <div className="media-frame border-none bg-transparent relative w-[80vw] max-w-[340px] shrink-0 snap-center min-h-[17rem] overflow-hidden rounded-[var(--radius-3xl)] shadow-xl">
                <Image
                  src="/images/hiking_1.jpg"
                  alt={siteCopyContent.contact.heroImages.streetAlt}
                  fill
                  className="object-cover"
                  loading="eager"
                  sizes="(max-width: 640px) 80vw, 340px"
                />
              </div>
              <div className="media-frame border-none bg-transparent relative w-[80vw] max-w-[340px] shrink-0 snap-center min-h-[17rem] overflow-hidden rounded-[var(--radius-3xl)] shadow-xl">
                <Image
                  src="/images/scodrinon_play_2.webp"
                  alt={siteCopyContent.contact.heroImages.socialAlt}
                  fill
                  className="object-cover"
                  loading="eager"
                  sizes="(max-width: 640px) 80vw, 340px"
                />
              </div>
            </SwipableRow>
          </div>
        </div>
      </PageHero>

      <section className="section-muted py-[var(--layout-section-spacing)] relative" style={{ overflow: "visible" }}>
        {/* Top section divider */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" aria-hidden="true" />
        
        {/* Subtle decorative elements */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/4 -right-48 w-96 h-96 rounded-full bg-[var(--brand-primary)]/[0.02] blur-3xl" />
          <div className="absolute bottom-1/3 -left-32 w-80 h-80 rounded-full bg-[var(--accent)]/[0.015] blur-3xl" />
        </div>
        
        <div className="shell-container sm:px-6 lg:px-8 grid gap-[var(--layout-grid-gutter)] lg:grid-cols-[1.1fr_0.9fr] lg:items-start relative z-10">
          <div className="flex flex-col gap-6 lg:sticky lg:top-32">

            {siteConfig.features.showLocalExperienceMap ? (
              <Reveal className="px-2 sm:px-0" delay={50}>
                <div id="map" className="media-frame relative h-[500px] w-full overflow-hidden rounded-3xl scroll-mt-24 sm:scroll-mt-32">
                  <LocationMap />
                </div>
              </Reveal>
            ) : null}
          </div>

          <Reveal delay={120}>
            <Panel className="p-card-premium bg-white dark:bg-card shadow-xl border-[var(--border)] h-full">
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

      <section className="py-[var(--layout-section-spacing)] relative">
        {/* Top section divider */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" aria-hidden="true" />
        
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
