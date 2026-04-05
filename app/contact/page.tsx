import Image from "next/image";
import {
  ArrowUpRight,
  MapPinned,
  MessageCircleMore,
  Ticket,
} from "lucide-react";

import { BookingActions } from "@/components/booking-actions";
import { CtaStrip } from "@/components/cta-strip";
import { InstagramGlyph } from "@/components/instagram-glyph";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { StructuredData } from "@/components/structured-data";
import { buttonVariants } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { buildBreadcrumbSchema, buildMetadata } from "@/lib/metadata";
import {
  contactChecklist,
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
        eyebrow="Contact"
        title="Direct booking should feel as easy as sending one message."
        description="WhatsApp is the most prominent route because it is the fastest and clearest way to speak with the hostel team. If you prefer booking platforms, those links are right here too."
        highlights={[
          "WhatsApp first for the quickest reply",
          "Booking.com and Hostelworld as backup options",
          "Ask about beds, arrival times, and local plans in one message",
          "Instagram for day-to-day hostel atmosphere",
        ]}
      >
        <div className="grid gap-4">
          <Panel className="p-6 sm:p-7">
            <p className="text-xs uppercase tracking-[0.24em] text-emerald-700">
              Best Booking Route
            </p>
            <h2 className="mt-4 font-heading text-4xl leading-none tracking-[-0.05em] text-slate-950">
              Message Scodrinon on WhatsApp first.
            </h2>
            <p className="mt-4 max-w-[44ch] text-base leading-8 text-slate-600">
              Send your dates, room preference, and arrival time. You can also
              ask about hikes, bikes, lake plans, or the easiest way to move on
              from Shkoder after your stay.
            </p>
            <div className="mt-6">
              <BookingActions className="max-w-4xl" />
            </div>
          </Panel>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="media-frame relative min-h-[16rem]">
              <Image
                src="/images/ambiance_2.jpg"
                alt="Street outside Scodrinon Hostel on Kole Idromeno"
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

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="shell-container grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          <Reveal>
            <Panel className="p-6 sm:p-8">
              <SectionHeading
                eyebrow="What To Send"
                title="A quick WhatsApp message works best when it includes the basics."
                description="Keep it short. The team just needs enough detail to steer you into the right room and answer quickly."
              />
              <div className="mt-8 grid gap-3">
                {contactChecklist.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl bg-slate-50 px-4 py-3 text-sm leading-7 text-slate-700"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </Panel>
          </Reveal>

          <Reveal delay={120}>
            <Panel className="p-6 sm:p-8">
              <p className="text-xs uppercase tracking-[0.24em] text-amber-700">
                Contact Details
              </p>
              <div className="mt-6 space-y-4 text-base leading-8 text-slate-700">
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
                  <span>{siteConfig.location}</span>
                </p>
                <p className="flex items-start gap-3">
                  <Ticket
                    className="mt-1 size-5 shrink-0 text-emerald-700"
                    strokeWidth={1.8}
                  />
                  <span>Breakfast, WiFi, luggage storage, and 24h access</span>
                </p>
              </div>
              <div className="mt-8 grid gap-3">
                <a
                  href={siteConfig.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "rounded-full bg-white"
                  )}
                >
                  <InstagramGlyph className="size-4" strokeWidth={1.8} />
                  View Instagram
                </a>
                <a
                  href={siteConfig.bookingUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    buttonVariants({ variant: "secondary", size: "lg" }),
                    "rounded-full bg-sky-900 text-white hover:bg-sky-950"
                  )}
                >
                  Booking.com
                  <ArrowUpRight className="size-4" strokeWidth={1.8} />
                </a>
              </div>
            </Panel>
          </Reveal>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="shell-container grid gap-6 lg:grid-cols-2">
          <Reveal>
            <Panel className="p-6 sm:p-8">
              <SectionHeading
                eyebrow="Included"
                title="Useful things that are already part of the stay."
                description="Good direct booking conversations usually include what is covered and what can be added if you need it."
              />
              <div className="mt-8 grid gap-3">
                {freeServices.map((service) => (
                  <div
                    key={service}
                    className="rounded-2xl bg-slate-50 px-4 py-3 text-sm leading-7 text-slate-700"
                  >
                    {service}
                  </div>
                ))}
              </div>
            </Panel>
          </Reveal>
          <Reveal delay={120}>
            <Panel className="p-6 sm:p-8">
              <p className="text-xs uppercase tracking-[0.24em] text-amber-700">
                Optional Extras
              </p>
              <h2 className="mt-4 font-heading text-4xl leading-none tracking-[-0.05em] text-slate-950">
                Add practical help if you need it.
              </h2>
              <div className="mt-8 grid gap-3">
                {paidServices.map((service) => (
                  <div
                    key={service}
                    className="rounded-2xl bg-amber-50 px-4 py-3 text-sm leading-7 text-slate-700"
                  >
                    {service}
                  </div>
                ))}
              </div>
              <div className="mt-8 media-frame relative min-h-[18rem]">
                <Image
                  src="/images/ambiance_3.jpg"
                  alt="Interior ambiance at Scodrinon Hostel"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 38vw"
                />
              </div>
            </Panel>
          </Reveal>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="shell-container">
          <CtaStrip
            eyebrow="Message The Hostel"
            title="If you have the dates, you have enough to start the booking."
            description="WhatsApp gets top billing because it is the most direct path to a confirmed stay. Booking.com and Hostelworld remain one click behind it."
            image="/images/promo_2.png"
            alt="Promotional image for Scodrinon Hostel"
          />
        </div>
      </section>
    </>
  );
}
