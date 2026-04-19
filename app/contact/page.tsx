import Image from "next/image";
import {
  CheckCircle2,
  ChevronDown,
  Clock,
  MapPinned,
  MessageCircleMore,
} from "lucide-react";

import { BookingActions } from "@/components/booking-actions";
import { CtaStrip } from "@/components/cta-strip";
import { FaqList } from "@/components/faq-list";
import { InstagramGlyph } from "@/components/instagram-glyph";
import { LocationMap } from "@/components/location-map";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionLabel } from "@/components/ui/section-label";
import { StructuredData } from "@/components/structured-data";
import { buttonVariants } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { buildBreadcrumbSchema, buildMetadata } from "@/lib/metadata";
import {
  contactChecklist,
  faqItems,
  freeServices,
  paidServices,
  siteConfig,
} from "@/lib/site-data";
import { cn } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Contact And Book Direct",
  description:
    "Book Scodrinon Hostel directly on WhatsApp or use Booking.com and Hostelworld. Find the hostel links, booking checklist, and arrival details here.",
  path: "/contact",
  image: "/images/shkoder_pedestrian_street.jpg",
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
        eyebrow="Contact & Book"
        title="Skip the fees. Book directly with a simple message."
        description="We prefer WhatsApp because it's the fastest way to answer your questions and secure your bed. (But if you prefer the booking apps, you'll find those links here too)."
      >
        <div className="grid gap-4">
          <Panel className="p-6 sm:p-7">
            <SectionLabel variant="emerald" className="mb-4">Best Booking Route</SectionLabel>
            <h2 className="mt-4 heading-card text-[var(--text-heading)]">
              Message Scodrinon on WhatsApp first.
            </h2>
            <p className="mt-4 max-w-[44ch] text-section-desc text-[var(--text-body-subtle)]">
              Send your dates, room preference, and arrival time. You can also
              ask about hikes, bikes, lake plans, or the easiest way to move on
              from Shkoder after your stay.
            </p>
            <div className="mt-6">
              <BookingActions className="max-w-4xl" whatsappOnly={true} />
            </div>
          </Panel>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="media-frame relative min-h-[16rem]">
              <Image
                src="/images/ambiance_2.jpg"
                alt="Street outside Scodrinon Hostel on Kolë Idromeno"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
            </div>
            <div className="media-frame relative min-h-[16rem]">
              <Image
                src="/images/bar_2.jpg"
                alt="Social atmosphere at Scodrinon Hostel"
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
                <SectionLabel variant="sun" className="mb-4">Contact Details</SectionLabel>
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
                    <span>Reception: 24 hour access | Check-in: {siteConfig.checkInHours}</span>
                  </p>
                </div>
              </Panel>
            </Reveal>

            <Reveal className="flex-1" delay={50}>
              <div id="map" className="media-frame relative min-h-[400px] h-full w-full overflow-hidden rounded-3xl">
                <LocationMap />
              </div>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <Panel className="p-6 sm:p-8 h-full">
              <SectionHeading
                variant="simple"
                eyebrow="FAQs"
                title="Common questions."
                description="Here are a few things people usually ask before they arrive."
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
            eyebrow="Ready to visit?"
            title="Got your dates? Let's get you booked."
            description="Drop us a message on WhatsApp and we'll confirm your bed right away. We can't wait to welcome you to Shkoder."
            image="/images/promo_2.jpg"
            alt="Promotional image for Scodrinon Hostel"
            imageClassName="object-[50%_20%]"
          />
        </div>
      </section>
    </>
  );
}