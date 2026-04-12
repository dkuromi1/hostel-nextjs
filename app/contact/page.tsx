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
              <BookingActions className="max-w-4xl" whatsappOnly={true} />
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

      <section className="py-8 sm:py-16">
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
                  <span>Reception: 24 hour access | Check-in: {siteConfig.checkInHours}</span>
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

      <section className="py-8 sm:py-16">
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
                    className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-3 text-sm leading-7 text-slate-700 transition-all duration-500 hover:bg-white hover:border-emerald-200 hover:shadow-sm"
                  >
                    <div className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-emerald-500 transition-transform duration-500 group-hover:scale-x-100" />
                    <span className="relative z-10 transition-colors duration-300 group-hover:text-emerald-950">{service}</span>
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
                    className="group rounded-2xl border border-transparent bg-slate-50 p-5 transition-all duration-300 hover:border-emerald-200/50 hover:bg-white hover:shadow-sm open:border-emerald-200/50 open:bg-white open:shadow-sm"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-heading text-base font-medium text-slate-900 outline-none transition-colors group-hover:text-emerald-900 group-open:text-emerald-950">
                      <span className="pr-4">{faq.question}</span>
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-slate-200/50 text-slate-500 transition-all duration-300 group-hover:bg-emerald-100 group-hover:text-emerald-600 group-open:rotate-180 group-open:bg-emerald-100 group-open:text-emerald-700">
                        <ChevronDown className="size-4" strokeWidth={2.2} />
                      </span>
                    </summary>
                    <div className="mt-3 pr-6 text-sm leading-7 text-slate-600">
                      {faq.answer}
                    </div>
                  </details>
                ))}
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