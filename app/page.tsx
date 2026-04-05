import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  BedDouble,
  Bike,
  Croissant,
  Luggage,
  MapPinned,
  Mountain,
  ShieldCheck,
  Star,
  Wifi,
} from "lucide-react";

import { BookingComLogo, HostelworldLogo } from "@/components/brand-logos";
import { BookingActions } from "@/components/booking-actions";
import { CtaStrip } from "@/components/cta-strip";
import { FaqList } from "@/components/faq-list";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { StructuredData } from "@/components/structured-data";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import {
  buildFaqSchema,
  buildHostelSchema,
  buildMetadata,
} from "@/lib/metadata";
import {
  eventCards,
  experiencePillars,
  extendReasons,
  faqItems,
  galleryItems,
  quickFacts,
  roomTypes,
  siteConfig,
} from "@/lib/site-data";
import { cn } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Hostel In Shkoder With Privacy Pods And Rooftop Views",
  description:
    "Book Scodrinon Hostel direct on WhatsApp for privacy pods, rooftop sunsets, breakfast, and a safe social vibe in the center of Shkoder.",
  path: "/",
  image: "/images/promo_2.png",
});

const factIcons = [BedDouble, Luggage, Croissant, Bike];

export default function Home() {
  return (
    <>
      <StructuredData data={[buildHostelSchema(), buildFaqSchema()]} />

      <section className="relative overflow-hidden px-4 pb-16 pt-14 sm:px-6 lg:px-8 lg:pt-20">
        <div className="pointer-events-none absolute inset-0 soft-grid opacity-40" />
        <div className="shell-container relative grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">          
          <Reveal className="space-y-8">
            {/* <Badge>Shkoder, Albania</Badge> */}
            <div className="space-y-5">
              <p className="text-xs uppercase tracking-[0.28em] text-emerald-700">
                {siteConfig.tagline}
              </p>
              <h1 className="font-heading text-4xl sm:text-6xl tracking-[-0.04em] text-slate-950">
                Rooftop sunsets, privacy pods,<br className="hidden sm:block" /> 
                <span className="text-blue-600"> and the part of Shkodër you actually want to wake up in.</span>
              </h1>
              <p className="max-w-[64ch] text-lg leading-8 text-slate-600">
                Scodrinon Hostel is a laidback, social, and safe base on lively
                Kole Idromeno Street. Come for a couple of nights, settle into
                the rooftop, and use the city as your launch point for the
                Albanian Alps, Lake Shkoder, and Europe's 'Last Frontier'.
              </p>
            </div>

            <BookingActions />
          </Reveal>

              
          <Reveal delay={120} className="grid gap-4 md:grid-cols-2">
            <div className="media-frame relative min-h-[24rem] md:row-span-2">
              <Image
                src="/images/rooftop_social.jpg"
                alt="Guests enjoying the rooftop at Scodrinon Hostel"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 40vw"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.08),rgba(15,23,42,0.42))]" />
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <p className="text-xs uppercase tracking-[0.28em] text-emerald-100">
                  Rooftop Evenings
                </p>
                <p className="mt-2 max-w-xs font-heading text-2xl leading-none tracking-[-0.05em]">
                  The social center of the hostel, without the party-hostel
                  chaos.
                </p>
              </div>
            </div>

            <div className="media-frame relative min-h-[17rem]">
              <video
                className="h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                aria-label="Short video showing the atmosphere at Scodrinon Hostel"
              >
                <source src="/videos/videoplayback.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.02),rgba(15,23,42,0.34))]" />
            </div>

            <div className="grid gap-4">
              <div className="media-frame relative min-h-[12rem]">
                <Image
                  src="/images/rooms_1.jpg"
                  alt="Privacy pod dorm room at Scodrinon Hostel"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </div>
              <div className="glass-panel rounded-[28px] p-5">
                <p className="text-xs uppercase tracking-[0.24em] text-amber-700">
                  Direct Booking
                </p>
                <p className="mt-3 font-heading text-2xl leading-none tracking-[-0.04em] text-slate-950">
                  Message the hostel first and book direct.
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  WhatsApp is the most direct way to confirm dates, room type,
                  arrival timing, and any Theth or Valbona planning.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-4 pb-6 sm:px-6 lg:px-8">
        <div className="shell-container grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {quickFacts.map((fact, index) => {
            const Icon = factIcons[index];

            return (
              <Reveal key={fact} delay={index * 80}>
                <Panel className="h-full px-5 py-5">
                  <div className="flex items-start gap-4">
                    <div className="rounded-2xl bg-emerald-600/10 p-3 text-emerald-700">
                      <Icon className="size-5" strokeWidth={1.8} />
                    </div>
                    <p className="text-sm leading-7 text-slate-700">{fact}</p>
                  </div>
                </Panel>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="px-4 pb-12 pt-2 sm:px-6 lg:px-8">
        <div className="shell-container">
          <div className="glass-panel rounded-[28px] p-4 sm:p-5">
            <div className="flex items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-slate-500">
              <span className="faded-line h-px flex-1" />
              Guest Ratings
              <span className="faded-line h-px flex-1" />
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 sm:items-stretch">
              {/* Booking.com Card */}
              <a
                href={siteConfig.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-slate-200/80 bg-white/90 px-4 py-5 shadow-[0_20px_55px_-40px_rgba(15,23,42,0.35)] transition-all hover:scale-[1.01] hover:shadow-[0_20px_55px_-30px_rgba(15,23,42,0.4)]"
              >
                <div className="flex min-h-[3rem] flex-wrap items-center justify-between gap-x-2 gap-y-2">
                  <BookingComLogo className="min-w-0 shrink-0" />
                  <div className="flex shrink-0 items-center gap-1 rounded-full bg-yellow-400/15 px-2 py-1 text-yellow-600">
                    <Star className="size-3" fill="currentColor" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">
                      Top Rated
                    </span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col justify-center py-1">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex min-w-0 items-center gap-2">
                      <div className="shrink-0 rounded-full bg-blue-500/12 p-1.5 text-blue-700">
                        <Award className="size-5" strokeWidth={1.8} />
                      </div>
                      <p className="text-sm font-medium leading-6 text-slate-800 transition-colors group-hover:text-blue-700">
                        2025 Traveller Review Award
                      </p>
                    </div>
                    <div className="shrink-0 rounded-tr-sm rounded-tl-sm rounded-br-sm rounded-bl-none bg-blue-600 px-3 py-1 text-center font-semibold text-white shadow-sm">
                      <p className="font-heading text-xl leading-none tracking-tight">
                        9.5
                      </p>
                      <p className="text-[8px] uppercase tracking-wider text-blue-100">
                        out of 10
                      </p>
                    </div>
                  </div>
                </div>
                <p className="mt-auto pt-2 text-sm leading-6 text-slate-500">
                  Awarded for consistent excellence in guest hospitality.
                </p>
              </a>
              {/* Hostelworld Card */}
              <a
                href={siteConfig.hostelworldUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-slate-200/80 bg-white/90 px-4 py-5 shadow-[0_20px_55px_-40px_rgba(15,23,42,0.35)] transition-all hover:scale-[1.01] hover:shadow-[0_20px_55px_-30px_rgba(15,23,42,0.4)]"
              >
                <div className="flex min-h-[3rem] flex-wrap items-center justify-between gap-x-2 gap-y-2">
                  <HostelworldLogo className="h-7 w-auto shrink-0" />
                  <div className="flex shrink-0 items-center gap-1 rounded-full bg-yellow-400/15 px-2 py-1 text-yellow-600">
                    <Star className="size-3" fill="currentColor" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">
                      Top Rated
                    </span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col justify-center py-1">
                  <div className="flex items-end gap-2">
                    <div className="mb-1 rounded-full p-1 text-yellow-500">
                      <Star className="size-5" strokeWidth={2} fill="currentColor" />
                    </div>
                    <span className="font-heading text-3xl leading-none tracking-[-0.05em] text-slate-950">
                      9.7
                    </span>
                    <span className="pb-1 text-sm font-medium uppercase tracking-[0.18em] text-slate-500">
                      Guest Score
                    </span>
                  </div>
                </div>
                <p className="mt-auto pt-2 text-sm leading-6 text-slate-500 transition-colors group-hover:text-amber-700">
                  Rated &apos;Superb&apos; by travelers on Hostelworld.
                </p>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="shell-container grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="space-y-8">
            <SectionHeading
              eyebrow="Why People Stay Longer"
              title="The kind of hostel that makes short plans drift into a week."
              description="The draw is not one dramatic feature. It’s the way the privacy, rooftop, location, and staff all work together so the stay feels easy from the start."
            />
            <div className="media-frame relative min-h-[28rem]">
              <Image
                src="/images/rooftop_social2.png"
                alt="Travelers relaxing on the rooftop of Scodrinon Hostel"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </Reveal>

          <div className="grid gap-4">
            {extendReasons.map((reason, index) => (
              <Reveal key={reason.title} delay={index * 80}>
                <Panel className="p-6">
                  <h3 className="font-heading text-2xl leading-none tracking-[-0.04em] text-slate-950">
                    {reason.title}
                  </h3>
                  <p className="mt-3 text-base leading-8 text-slate-600">
                    {reason.description}
                  </p>
                </Panel>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="shell-container space-y-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Rooms"
              title="Sleep properly, then head back out."
              description="Every room keeps the basics right: air-con, lockers, reading lights, sockets, and fast WiFi. The difference is how much privacy and calm you want around you."
            />
            <Link
              href="/rooms"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "rounded-full bg-white/80"
              )}
            >
              Explore Rooms
              <ArrowRight className="size-4" strokeWidth={1.8} />
            </Link>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {roomTypes.map((room, index) => (
              <Reveal key={room.name} delay={index * 100}>
                <Panel className="overflow-hidden">
                  <div className="relative min-h-[18rem]">
                    <Image
                      src={room.image}
                      alt={room.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                  <div className="space-y-5 p-6">
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] text-emerald-700">
                        {room.label}
                      </p>
                      <h3 className="mt-3 font-heading text-3xl leading-none tracking-[-0.05em] text-slate-950">
                        {room.name}
                      </h3>
                      <p className="mt-3 text-base leading-8 text-slate-600">
                        {room.description}
                      </p>
                    </div>
                    <ul className="grid gap-3">
                      {room.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="rounded-2xl bg-slate-50 px-4 py-3 text-sm leading-7 text-slate-700"
                        >
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Panel>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="shell-container space-y-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Experiences"
              title="Built for slow rooftop nights and fast adventure planning."
              description="The social side here just happens. Join a walking tour, map out your hiking route with someone who’s just finished it, or simply stay up on the terrace until the city lights switch on."
            />
            <Link
              href="/experiences"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "rounded-full bg-white/80"
              )}
            >
              See Experiences
              <ArrowRight className="size-4" strokeWidth={1.8} />
            </Link>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <Reveal>
              <Panel className="overflow-hidden">
                <div className="relative min-h-[30rem]">
                  <Image
                    src={experiencePillars[0].image}
                    alt={experiencePillars[0].alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 55vw"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.04),rgba(15,23,42,0.55))]" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <p className="text-xs uppercase tracking-[0.28em] text-emerald-100">
                      {experiencePillars[0].title}
                    </p>
                    <p className="mt-3 max-w-lg text-base leading-8 text-slate-100">
                      {experiencePillars[0].description}
                    </p>
                  </div>
                </div>
              </Panel>
            </Reveal>

            <div className="grid gap-6">
              {experiencePillars.slice(1).map((pillar, index) => (
                <Reveal key={pillar.title} delay={index * 100}>
                  <Panel className="overflow-hidden">
                    <div className="grid gap-0 md:grid-cols-[0.9fr_1.1fr]">
                      <div className="relative min-h-[16rem]">
                        <Image
                          src={pillar.image}
                          alt={pillar.alt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 24vw"
                        />
                      </div>
                      <div className="space-y-3 p-6">
                        <h3 className="font-heading text-3xl leading-none tracking-[-0.05em] text-slate-950">
                          {pillar.title}
                        </h3>
                        <p className="text-base leading-8 text-slate-600">
                          {pillar.description}
                        </p>
                      </div>
                    </div>
                  </Panel>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {eventCards.map((event, index) => (
              <Reveal key={event.title} delay={index * 60}>
                <Panel className="overflow-hidden">
                  <div className="grid gap-0 sm:grid-cols-[0.92fr_1.08fr]">
                    <div className="relative min-h-[14rem]">
                      <Image
                        src={event.image}
                        alt={event.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 24vw"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="font-heading text-2xl leading-none tracking-[-0.04em] text-slate-950">
                        {event.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-slate-600">
                        {event.description}
                      </p>
                    </div>
                  </div>
                </Panel>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="shell-container space-y-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Gallery"
              title="A better feel for the place than a stock-photo promise."
              description="Every photo and video on the site comes from the real hostel. The look stays bright, relaxed, and honest because that is what guests actually walk into."
            />
            <Link
              href="/gallery"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "rounded-full bg-white/80"
              )}
            >
              Open Gallery
              <ArrowRight className="size-4" strokeWidth={1.8} />
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-12">
            {galleryItems.slice(0, 12).map((item, index) => (
              <Reveal
                key={`${item.src}-${index}`}
                delay={index * 70}
                className={item.className}
              >
                <div className={cn("media-frame relative", item.aspect)}>
                  {item.type === "image" ? (
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <video
                      className="h-full w-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                      aria-label={item.alt}
                    >
                      <source src={item.src} type="video/mp4" />
                    </video>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="shell-container grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="space-y-8">
            <SectionHeading
              eyebrow="Included"
              title="The basics are not treated like extras."
              description="Breakfast, luggage storage, WiFi, and a genuinely usable rooftop make the stay feel generous instead of stripped down."
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="glass-panel rounded-[28px] p-5">
                <ShieldCheck className="size-5 text-emerald-700" strokeWidth={1.8} />
                <p className="mt-4 font-heading text-xl leading-none tracking-[-0.04em] text-slate-950">
                  Safe, welcoming atmosphere
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Designed to feel open and social while still being especially
                  comfortable for solo travelers.
                </p>
              </div>
              <div className="glass-panel rounded-[28px] p-5">
                <Wifi className="size-5 text-emerald-700" strokeWidth={1.8} />
                <p className="mt-4 font-heading text-xl leading-none tracking-[-0.04em] text-slate-950">
                  Good day-to-day comfort
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Fast WiFi, clean bathrooms, lockers, sockets, and air-con are
                  standard rather than upsells.
                </p>
              </div>
              <div className="glass-panel rounded-[28px] p-5">
                <MapPinned className="size-5 text-emerald-700" strokeWidth={1.8} />
                <p className="mt-4 font-heading text-xl leading-none tracking-[-0.04em] text-slate-950">
                  Best-positioned base
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Cafes, restaurants, museums, and nightlife are right outside
                  on the city promenade.
                </p>
              </div>
              <div className="glass-panel rounded-[28px] p-5">
                <Mountain className="size-5 text-emerald-700" strokeWidth={1.8} />
                <p className="mt-4 font-heading text-xl leading-none tracking-[-0.04em] text-slate-950">
                  Ready for northbound plans
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Theth, Valbona, lake days, river excursions, and Montenegro
                  routes are easy to talk through from here.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <Panel className="p-6">
              <SectionHeading
                eyebrow="FAQ"
                title="A few things travelers usually ask before they book."
                description="If you want a quick answer, skip the forms and message on WhatsApp instead."
              />
              <div className="mt-8">
                <FaqList items={faqItems} />
              </div>
            </Panel>
          </Reveal>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="shell-container">
          <CtaStrip
            eyebrow="Direct Booking First"
            title="If the dates work for you, send the message now."
            description="Direct WhatsApp booking stays the fastest route. Then keep Booking.com and Hostelworld as easy backup options if you want to compare."
            image="/images/rooftop_view_day.jpg"
            alt="Daytime rooftop view from Scodrinon Hostel"
          />
        </div>
      </section>
    </>
  );
}
