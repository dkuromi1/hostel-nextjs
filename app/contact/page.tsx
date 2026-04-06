import Image from "next/image";
import {
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  Clock,
  MapPinned,
  MessageCircleMore,
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
              <BookingActions className="max-w-4xl" whatsappOnly={true}/>
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
            <Panel className="p-6 sm:p-8 h-full">
              <SectionHeading
                eyebrow="Quick Booking"
                title="What to include in your message."
                description="Keep it short. Just send us a quick note with these details, and our team will get your stay sorted in no time."
              />
              <div className="mt-8 grid gap-3">
                {contactChecklist.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm leading-7 text-slate-700"
                  >
                    <CheckCircle2 className="size-5 shrink-0 text-emerald-600" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </Panel>
          </Reveal>

          <Reveal delay={120}>
            <Panel className="p-6 sm:p-8 h-full">
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
                  <span>Reception: 24 hour access | Check-in: 2pm</span>
                </p>
              </div>
              <div className="mt-8 media-frame relative min-h-[18rem]">
                <Image
                  src="/images/outdoor_common_2.jpg"
                  alt="Outdoor ambiance at Scodrinon Hostel"
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
        <div className="shell-container grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
          <Reveal>
            <Panel className="p-6 sm:p-8 h-full">
              <SectionHeading
                eyebrow="Always Included"
                title="Everything you need for a comfortable stay."
                description="We don't believe in nickel-and-diming our guests. Here are some things you get for free when you book a bed with us."
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
            <Panel className="p-6 sm:p-8 h-full">
              <SectionHeading
                eyebrow="FAQs"
                title="Common questions."
                description="Here are a few things people usually ask before they arrive."
              />
              <div className="mt-8 flex flex-col gap-4">
                {faqItems.map((faq, i) => (
                  <details
                    key={i}
                    className="group rounded-2xl bg-slate-50 p-5 open:bg-slate-100 transition-colors"
                  >
                    <summary className="font-heading text-lg font-medium text-slate-900 cursor-pointer list-none flex justify-between items-center gap-4">
                      {faq.question}
                      <span className="transition-transform duration-300 group-open:rotate-180 shrink-0">
                        <ChevronDown className="size-5 text-slate-500" />
                      </span>
                    </summary>
                    <p className="mt-3 text-base leading-7 text-slate-600 pr-6">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </Panel>
          </Reveal>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="shell-container">
          <CtaStrip
            eyebrow="Ready to visit?"
            title="Got your dates? Let's get you booked."
            description="Drop us a message on WhatsApp and we'll confirm your bed right away. We can't wait to welcome you to Shkoder."
            image="/images/promo_2.png"
            alt="Promotional image for Scodrinon Hostel"
          />
        </div>
      </section>
    </>
  );
}