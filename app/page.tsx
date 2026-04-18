import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  BedDouble,
  Bike,
  Check,
  Croissant,
  Luggage,
  MapPinned,
  Mountain,
  ShieldCheck,
  Star,
  Wifi,
  Snowflake,
  Lock,
  LampDesk,
  BatteryCharging,
  Moon, Sparkles, MapPin, Compass,
} from "lucide-react";

import { BookingComLogo, HostelworldLogo } from "@/components/brand-logos";
import { BookingActions } from "@/components/booking-actions";
import { CtaStrip } from "@/components/cta-strip";
import { ThethWeather } from "@/components/theth-weather";
import { FaqList } from "@/components/faq-list";
import { ImageCarousel } from "@/components/image-carousel";
import { Reveal } from "@/components/reveal";
import { AnimatedText } from "@/components/animated-text";
import { SectionHeading } from "@/components/section-heading";
import { StructuredData } from "@/components/structured-data";
import { SwipableRow } from "@/components/swipable-row";
import { TestimonialCarousel } from "@/components/testimonial-carousel";
import { Badge } from "@/components/ui/badge";
import { Eyebrow } from "@/components/ui/eyebrow";
import { buttonVariants } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { HeroBookingBar } from "@/components/hero-booking-bar";
import { GalleryMasonry } from "@/components/gallery-masonry";
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
  fourBedDormImages,
  galleryItems,
  podDormImages,
  quickFacts,
  roomTypes,
  siteConfig,
  testimonials,
} from "@/lib/site-data";
import { cn } from "@/lib/utils";


export const metadata = buildMetadata({
  title: "Hostel In Shkoder With Privacy Pods And Rooftop Views",
  description:
    "Book Scodrinon Hostel direct on WhatsApp for privacy pods, rooftop sunsets, breakfast, and a safe social vibe in the center of Shkoder.",
  path: "/",
  image: "/logo.webp",
});

const roomIcons = [Snowflake, Lock, LampDesk, BatteryCharging];
const reasonIcons = [Moon, Sparkles, MapPin, Compass];

function getQuickFactIcon(fact: string) {
  const normalizedFact = fact.toLowerCase();

  if (
    normalizedFact.includes("privacy pod") ||
    normalizedFact.includes("mixed dorm") ||
    normalizedFact.includes("bedroom feel")
  ) {
    return BedDouble;
  }

  if (
    normalizedFact.includes("4-bed") ||
    normalizedFact.includes("male or female dorm")
  ) {
    return Luggage;
  }

  if (
    normalizedFact.includes("safe") ||
    normalizedFact.includes("sanctuary") ||
    normalizedFact.includes("peaceful")
  ) {
    return ShieldCheck;
  }

  if (
    normalizedFact.includes("breakfast") ||
    normalizedFact.includes("wi-fi") ||
    normalizedFact.includes("wifi") ||
    normalizedFact.includes("luggage storage") ||
    normalizedFact.includes("24h access")
  ) {
    return Croissant;
  }

  if (
    normalizedFact.includes("adventure") ||
    normalizedFact.includes("transportation") ||
    normalizedFact.includes("tour") ||
    normalizedFact.includes("laundry") ||
    normalizedFact.includes("bike")
  ) {
    return Bike;
  }

  return Check;
}

function CompactGuestRatingsStrip() {
  return (
    <div className="grid w-full gap-3 sm:grid-cols-2">
      <a
        href={siteConfig.bookingUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center justify-between gap-3 rounded-[22px] border border-white/16 bg-slate-950/42 px-4 py-3 text-white shadow-[0_18px_45px_-30px_rgba(2,6,23,0.7)] backdrop-blur-[5px] transition-all duration-300 hover:border-white/24 hover:bg-slate-950/52"
      >
        <div className="flex min-w-0 items-center gap-3">
          <BookingComLogo iconOnly className="size-9" />
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/65">
              Booking.com
            </p>
            <p className="truncate text-sm font-medium text-white/92">
              2025 Traveller Review Award
            </p>
          </div>
        </div>
        <div className="shrink-0 rounded-2xl bg-white/8 px-3 py-2 text-right ring-1 ring-white/12 shadow-sm">
          <p className="font-heading text-xl leading-none tracking-tight text-white text-center">
            {siteConfig.bookingRating}
          </p>
          <p className="mt-1 text-[8px] uppercase tracking-[0.2em] text-white/100">
            out of 10
          </p>
        </div>
      </a>

      <a
        href={siteConfig.hostelworldUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center justify-between gap-3 rounded-[22px] border border-white/16 bg-slate-950/42 px-4 py-3 text-white shadow-[0_18px_45px_-30px_rgba(2,6,23,0.7)] backdrop-blur-[5px] transition-all duration-300 hover:border-white/24 hover:bg-slate-950/52"
      >
        <div className="flex min-w-0 items-center gap-3">
          <HostelworldLogo iconOnly className="size-9" />
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/65">
              Hostelworld
            </p>
            <p className="truncate text-sm font-medium text-white/92">
              Superb guest rating
            </p>
          </div>
        </div>
        <div className="shrink-0 rounded-2xl bg-white/8 px-3 py-2 text-right ring-1 ring-white/12 shadow-sm">
          <p className="font-heading text-xl leading-none tracking-tight text-white text-center">
            {siteConfig.hostelworldRating}
          </p>
          <p className="mt-1 text-[8px] uppercase tracking-[0.2em] text-white/100">
            ({siteConfig.hostelworldReviews} Reviews)
          </p>
        </div>
      </a>
    </div>
  );
}

function GuestRatingsSection() {
  return (
    <section className="pb-8 sm:pb-16">
      <div className="shell-container">
        <Reveal>
          <div className="glass-panel rounded-[28px] p-4 sm:p-5">
            <div className="flex items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-slate-500">
              <span className="faded-line h-px flex-1" />
              Guest Ratings
              <span className="faded-line h-px flex-1" />
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 sm:items-stretch">
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
                    <div className="shrink-0 rounded-tr-sm rounded-tl-sm rounded-br-sm rounded-bl-none bg-blue-700 px-3 py-1 text-center font-semibold text-white shadow-sm">
                      <p className="font-heading text-xl leading-none tracking-tight">
                        {siteConfig.bookingRating}
                      </p>
                      <p className="text-[8px] uppercase tracking-wider text-blue-50">
                        out of 10
                      </p>
                    </div>
                  </div>
                </div>
                <p className="mt-auto pt-2 text-sm leading-6 text-slate-500">
                  Awarded for consistent excellence in guest hospitality.
                </p>
              </a>

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
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex min-w-0 items-center gap-2">
                      <div className="shrink-0 rounded-full bg-amber-500/12 p-1.5 text-amber-700">
                        <Star className="size-5" strokeWidth={1.8} />
                      </div>
                      <p className="text-sm font-medium leading-6 text-slate-800 transition-colors group-hover:text-amber-700">
                        &apos;Superb&apos; Guest Rating
                      </p>
                    </div>
                    <div className="relative h-15 w-25 shrink-0 overflow-hidden rounded-md shadow-sm">
                      <Image
                        src="/images/hostelworld_reviews.png"
                        alt="10 score on Hostelworld"
                        fill
                        className="object-contain"
                        sizes="100px"
                      />
                    </div>
                  </div>
                </div>
                <p className="mt-auto pt-2 text-sm leading-6 text-slate-500 transition-colors group-hover:text-amber-700" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function Home() {
  const getRoomFeatures = (roomName: string) => {
    if (roomName.includes("18-Bed")) {
      return [
        { icon: Snowflake, label: "A/C & Heat" },
        { icon: Lock, label: "Secure Lockers" },
        { icon: BatteryCharging, label: "2 Power Sockets" },
        { icon: Wifi, label: "High-speed WiFi" },
        { icon: LampDesk, label: "Reading Light" }
      ];
    }
    return [
      { icon: Snowflake, label: "A/C & Heat" },
      { icon: Lock, label: "Secure Lockers" },
      { icon: BatteryCharging, label: "Socket" },
      { icon: Wifi, label: "High-speed WiFi" }
    ];
  };

  return (
    <>
      <StructuredData data={[buildHostelSchema(), buildFaqSchema()]} />

      {/* Immersive Hero Banner */}
      <section className="relative min-h-[90dvh] flex flex-col justify-center overflow-hidden pb-12 pt-24 sm:pb-20 sm:pt-32">
        {/* Background Image with Overlays */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hiking_2.jpg"
            alt="Hiking in the Accursed Mountains near Shkoder"
            fill
            priority
            fetchPriority="high"
            className="object-cover"
            style={{ objectPosition: "60% center" }}
            sizes="100vw"
          />
          {/* Using absolute Z-indexing and an explicit CSS gradient string bypassing Tailwind stop opacity bugs known in Vercel+Tailwind v4 deployments */}
          <div className="absolute inset-0 z-10 pointer-events-none bg-[linear-gradient(to_bottom,rgba(2,6,23,0.6)_0%,rgba(2,6,23,0.3)_50%,rgba(2,6,23,0.75)_100%)]" />

        </div>

        <div className="shell-container relative z-10 w-full">
          <div className="max-w-4xl space-y-8 sm:space-y-10">
            <div className="flex flex-col items-start gap-6">
              <div className="flex flex-col gap-5">
                <p className="text-xs font-medium uppercase tracking-[0.28em] text-white/90 antialiased">
                  {siteConfig.tagline}
                </p>
                <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl tracking-[-0.05em] leading-[0.95] text-white">
                  <AnimatedText
                    text="Rooftop sunsets, privacy pods,"
                    wordClassName="text-white [text-shadow:0_1px_4px_rgba(0,0,0,0.4)]"
                    delayOffset={0}
                  />
                  {" "}
                  <AnimatedText
                    text="and the part of Shkodër you actually want to wake up in."
                    className="text-sky-300"
                    wordClassName="text-sky-300 [text-shadow:0_1px_4px_rgba(0,0,0,0.4)]"
                    delayOffset={200}
                  />
                </h1>
                <p className="max-w-[50ch] text-lg leading-relaxed text-slate-300 antialiased [text-shadow:0_1px_4px_rgba(0,0,0,0.4)] sm:text-xl lg:text-2xl">
                  Ideally placed on Shkodër’s vibrant pedestrian street. A social
                  gateway to legendary rooftop sunsets, the Theth-Valbona trek, and
                  the raw beauty of Europe&apos;s &apos;last frontier&apos;.
                </p>
              </div>

              <Reveal delay={280} className="w-full max-w-3xl">
                <CompactGuestRatingsStrip />
              </Reveal>
            </div>

            <Reveal delay={500}>
              <SwipableRow
                itemCount={quickFacts.length}
                className="-mx-8 px-8 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
              >
                {quickFacts.map((fact, index) => {
                  const Icon = getQuickFactIcon(fact);
                  return (
                    <div
                      key={fact}
                      className="min-w-[85%] snap-center sm:min-w-0"
                    >
                      <div className="group relative overflow-hidden rounded-[24px] border border-white/18 bg-slate-950/42 p-5 backdrop-blur-[3px] transition-all duration-300 hover:border-white/24 hover:bg-slate-950/52">
                        <div className="text-sm leading-7 text-white/95">
                          <div className="float-left mb-1 mr-4 flex size-10 items-center justify-center rounded-xl bg-emerald-500/24 text-emerald-300">
                            <Icon className="size-5" strokeWidth={2} />
                          </div>
                          {fact}
                        </div>
                      </div>
                    </div>
                  );
                })}
                {/* Trailing Spacer for mobile snapping */}
                <div className="w-12 flex-shrink-0 sm:hidden" aria-hidden="true" />
              </SwipableRow>
            </Reveal>

            {/* 
              FUTURE EDITORS: Do not remove the HeroBookingBar component code. 
              It is currently commented out but should remain available for future use.
            */}
            {/* <Reveal delay={200}>
              <HeroBookingBar />
            </Reveal> */}
          </div>
        </div>
      </section>


      {/* Repurposed Media Section - "The Atmosphere" */}
      <section className="py-8 sm:py-16">
        <div className="shell-container max-w-5xl">
          <div className="flex flex-col gap-4 lg:grid lg:grid-cols-[2fr_1fr] lg:grid-rows-[1fr_auto] lg:gap-5">

            {/* DESKTOP ONLY: Direct Booking card — row 2, col 1 */}
            <Reveal delay={200} className="hidden lg:flex lg:row-start-2">
              <div className="h-full flex items-center justify-between glass-panel rounded-[28px] p-6 gap-6 w-full">
                <div>
                  <Eyebrow className="mb-2">Direct Booking</Eyebrow>
                  <p className="mt-2 font-heading text-2xl leading-tight tracking-tight text-slate-950">
                    Message the hostel and book direct
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    WhatsApp is the most direct way to confirm dates, room type, arrival time, and any trip planning.
                  </p>
                </div>
                <a
                  href={siteConfig.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "shrink-0 rounded-full bg-emerald-700 px-7 font-semibold text-white transition-all duration-300 hover:bg-emerald-800 active:scale-95"
                  )}
                >
                  Book on WhatsApp
                </a>
              </div>
            </Reveal>

            {/* Rooftop image — full width mobile (first visible), row 1 col 1 on desktop */}
            <Reveal delay={0} className="lg:row-start-1">
              <div className="media-frame relative aspect-[16/10] sm:aspect-[21/9] lg:aspect-auto lg:min-h-[22rem] h-full overflow-hidden">
                <Image
                  src="/images/rooftop_social.webp"
                  alt="Guests enjoying the rooftop at Scodrinon Hostel"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, (max-width: 1400px) 66vw, 924px"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent p-6 pt-32 text-white">
                  <p className="text-xs uppercase tracking-[0.28em] text-sky-200/90">
                    Rooftop Socials
                  </p>
                  <p className="mt-2 max-w-sm font-heading text-2xl leading-tight tracking-tight">
                    The social center of the hostel, without the party-hostel chaos.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Right column — row-span-2 col-2 on desktop; second on mobile */}
            <div className="flex flex-col gap-4 lg:col-start-2 lg:row-start-1 lg:row-span-2">

              {/* 2-col on mobile: [Room+Booking | Video]; 1-col stacked on desktop: Room then Video */}
              <div className="grid grid-cols-[3fr_2fr] gap-4 lg:grid-cols-1 lg:h-full">

                {/* Room image + mobile booking (left on mobile, top on desktop) */}
                <Reveal delay={100} className="flex min-w-0 flex-col gap-4 h-full">
                  <div className="media-frame relative aspect-[4/3] h-full lg:h-auto">
                    <Image
                      src="/images/rooms_1.jpg"
                      alt="Privacy pod dorm room at Scodrinon Hostel"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 60vw, (max-width: 1400px) 33vw, 466px"
                    />
                  </div>

                  {/* Mobile-only booking card */}
                  <div className="glass-panel rounded-[28px] p-5 lg:hidden">
                    <Eyebrow className="mb-2">Direct Booking</Eyebrow>
                    <p className="mt-2 font-heading text-lg leading-tight tracking-tight text-slate-950">
                      <span className="sm:hidden">Message us to book direct</span>
                      <span className="hidden sm:inline">Message the hostel and book direct</span>
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-slate-600">
                      <span className="sm:hidden">Just send us the dates, room type, arrival time.</span>
                      <span className="hidden sm:inline">WhatsApp is the most direct way to confirm dates, room type, arrival time, and any trip planning.</span>
                    </p>
                    <a
                      href={siteConfig.whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className={cn(
                        buttonVariants({ size: "sm" }),
                        "mt-4 w-full rounded-full bg-emerald-700 font-semibold text-white transition-all duration-300 hover:bg-emerald-800 active:scale-95"
                      )}
                    >
                      Book on WhatsApp
                    </a>
                  </div>
                </Reveal>

                {/* Video (right on mobile, bottom on desktop) */}
                <Reveal delay={300} className="media-frame relative flex items-start lg:items-center self-start lg:self-auto">
                  <video
                    className="w-full h-auto"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="none"
                    poster="/images/video-poster.webp"
                  >
                    <source src="/videos/videoplayback.mp4" type="video/mp4" />
                  </video>
                </Reveal>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Rooms */}
      <section className="py-8 sm:py-16">
        <div className="shell-container space-y-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow={`Rooms from ${roomTypes[0].price}`}
              title="Sleep properly, then head back out."
              description="Every room keeps the basics right: heat and A/C, secure lockers, reading lights, sockets, and fast WiFi. The difference is how much privacy and calm you want around you."
            />
            <Link
              href="/rooms"
              className={cn(
                "group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full px-7 py-3.5",
                "bg-slate-900 text-white shadow-lg shadow-slate-900/20",
                "text-sm font-semibold tracking-tight",
                "transition-all duration-300 hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-900/30 hover:-translate-y-0.5",
                "active:scale-95 active:translate-y-0.5"
              )}
            >
              <span>Explore Rooms</span>
              <div className="relative flex size-6 items-center justify-center rounded-full bg-white/20 text-white transition-all duration-300 group-hover:bg-emerald-500 group-hover:scale-110">
                <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={2.5} />
              </div>
            </Link>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {roomTypes.map((room, index) => (
              <Reveal key={room.name} delay={index * 100}>
                <Panel className="flex h-full flex-col overflow-hidden">
                  <div className="relative min-h-[18rem]">
                    <ImageCarousel
                      images={room.name.includes("18-Bed") ? podDormImages : fourBedDormImages}
                      className="absolute inset-0 h-full rounded-none"
                      autoPlayInterval={0}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent z-10 flex p-5 sm:px-6 sm:py-4 items-start sm:items-end">
                      <Badge className="bg-white/20 text-white shadow-sm backdrop-blur-md pointer-events-auto">
                        {room.price}/night
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-6 p-6 sm:p-8">
                    <div>
                      <Eyebrow className="mb-3">{room.label}</Eyebrow>
                      <h3 className="mt-3 font-heading text-4xl leading-none tracking-[-0.05em] text-slate-950">
                        {room.name}
                      </h3>
                      <p className="mt-4 text-base leading-8 text-slate-600">
                        {room.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {getRoomFeatures(room.name).map((feature, idx) => (
                        <div
                          key={idx}
                          /* Added w-fit and adjusted padding/gap to make them tighter "pills" */
                          className="flex w-fit items-center gap-2 rounded-xl border border-slate-100 bg-slate-50/50 px-3 py-2 text-slate-600"
                        >
                          <feature.icon className="size-3.5 shrink-0 text-emerald-600" />
                          {/* Added whitespace-nowrap to prevent labels like "High-speed WiFi" from breaking internally */}
                          <span className="whitespace-nowrap text-[11px] font-medium tracking-tight">
                            {feature.label}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-3">
                      <Eyebrow className="mb-4 text-[10px]" variant="default">Room Details</Eyebrow>
                      <ul className="grid gap-3">
                        {room.bullets.map((bullet) => (
                          <li
                            key={bullet}
                            className="flex items-start gap-2.5 text-sm leading-6 text-slate-700"
                          >
                            <Check
                              className="mt-1 size-4 shrink-0 text-emerald-600"
                              strokeWidth={2}
                            />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Panel>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-8 sm:py-16">
        <div className="shell-container space-y-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Gallery"
              title="A real feel for the place before you arrive."
              description="Every photo and video is from the hostel itself—so what you see here is exactly what you’ll walk into: bright, relaxed, and honest."
            />
            <Link
              href="/gallery"
              className={cn(
                "group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full px-7 py-3.5",
                "bg-slate-900 text-white shadow-lg shadow-slate-900/20",
                "text-sm font-semibold tracking-tight",
                "transition-all duration-300 hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-900/30 hover:-translate-y-0.5",
                "active:scale-95 active:translate-y-0.5"
              )}
            >
              <span>Open Gallery</span>
              <div className="relative flex size-6 items-center justify-center rounded-full bg-white/20 text-white transition-all duration-300 group-hover:bg-emerald-500 group-hover:scale-110">
                <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={2.5} />
              </div>
            </Link>
          </div>

          <div className="flow-root">
            <GalleryMasonry
              items={galleryItems.slice(0, 12)}
            />
          </div>
        </div>
      </section>
      {/* Experiences */}
      <section className="py-8 sm:py-16">
        <div className="shell-container space-y-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Discover & Connect at Scodrinon Hostel"
              title="Built for slow rooftop nights and fast adventure planning."
              description="The social side here just happens. Join a walking tour, map out your hiking route with someone who’s just finished it, or simply stay up on the terrace until the city lights switch on."
            />
            <Link
              href="/experiences"
              className={cn(
                "group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full px-7 py-3.5",
                "bg-slate-900 text-white shadow-lg shadow-slate-900/20",
                "text-sm font-semibold tracking-tight",
                "transition-all duration-300 hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-900/30 hover:-translate-y-0.5",
                "active:scale-95 active:translate-y-0.5"
              )}
            >
              <span>See Experiences</span>
              <div className="relative flex size-6 items-center justify-center rounded-full bg-white/20 text-white transition-all duration-300 group-hover:bg-emerald-500 group-hover:scale-110">
                <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={2.5} />
              </div>
            </Link>
          </div>

          <div className="grid gap-6 lg:grid-cols-12">
            <Reveal delay={0} className="lg:col-span-5 h-full">
              <Panel className="overflow-hidden h-full">
                <div className="relative h-full min-h-[30rem]">
                  <Image
                    src={experiencePillars[0].image}
                    alt={experiencePillars[0].alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, (max-width: 1400px) 42vw, 588px"
                  />
                  <div className="absolute right-4 top-4 z-20">
                    <ThethWeather variant="small" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent p-6 pt-32 text-white">
                    <p className="text-sm uppercase tracking-[0.28em] text-sky-100/90">
                      {experiencePillars[0].title}
                    </p>
                    <p className="mt-3 max-w-lg text-base leading-8 text-slate-100">
                      {experiencePillars[0].description}
                    </p>
                  </div>
                </div>
              </Panel>
            </Reveal>

            <div className="lg:col-span-7 grid gap-6">
              {experiencePillars.slice(1).map((pillar, index) => {
                const isSecondElement = index === 0;
                const Icon = reasonIcons[index + 1] || ArrowRight;

                return (
                  <Reveal key={pillar.title} delay={150 + index * 100}>
                    <Panel className="overflow-hidden h-full">
                      {isSecondElement ? (
                        <div className="relative h-full min-h-[22rem]">
                          <Image
                            src={pillar.image}
                            alt={pillar.alt}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, (max-width: 1400px) 58vw, 812px"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent p-6 pt-32 text-white">
                            <p className="text-sm uppercase tracking-[0.28em] text-sky-100/90">
                              {pillar.title}
                            </p>
                            <p className="mt-3 text-base leading-8 text-slate-100">
                              {pillar.description}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="grid gap-0 md:grid-cols-[0.9fr_1.1fr]">
                          <div className="relative min-h-[16rem]">
                            <Image
                              src={pillar.image}
                              alt={pillar.alt}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, (max-width: 1400px) 26vw, 364px"
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
                      )}
                    </Panel>
                  </Reveal>
                );
              })}
            </div>
          </div>

          <Reveal delay={120}>
            <SwipableRow itemCount={eventCards.length} className="-mx-8 px-8 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 sm:gap-4 lg:grid-cols-2">
              {eventCards.map((event, index) => (
                <div key={event.title} className="min-w-[82vw] snap-center sm:min-w-0">
                  <Panel className="overflow-hidden">
                    <div className="grid gap-0 md:grid-cols-[0.92fr_1.08fr]">
                      <div className="relative min-h-[14rem]">
                        <Image
                          src={event.image}
                          alt={event.alt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1400px) 23vw, 322px"
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
                </div>
              ))}
              {/* Trailing Spacer for mobile snapping */}
              <div className="w-12 flex-shrink-0 sm:hidden" aria-hidden="true" />
            </SwipableRow>
          </Reveal>
        </div>
      </section>

      {/* why people stay longer & testimonials */}
      <section className="py-8 sm:py-16">
        <div className="shell-container flex flex-col gap-10 lg:flex-row lg:items-start relative">
          {/* Left Column: Testimonials */}
          <Reveal delay={0} className="lg:w-[40%] flex flex-col lg:sticky lg:top-32">
            <TestimonialCarousel testimonials={testimonials} className="w-full" />
          </Reveal>

          {/* Right Column: Vibe Content */}
          <div className="flex-1 space-y-8 lg:max-w-[60%]">
            <Reveal delay={100}>
              <SectionHeading
                eyebrow="Why People Stay Longer"
                title="The kind of hostel that makes short plans drift into a week."
                description="The draw is not one dramatic feature. It's the way the privacy, rooftop, location, and staff all work together so the stay feels easy from the start."
              />
            </Reveal>

            <Reveal delay={300}>
              <SwipableRow
                itemCount={extendReasons.length}
                className="-mx-8 px-8 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 sm:gap-4"
              >
                {extendReasons.map((reason, index) => {
                  const Icon = reasonIcons[index] || ArrowRight;
                  return (
                    <div key={reason.title} className="min-w-[82vw] snap-center sm:min-w-0">
                      <div className="group relative flex h-full flex-col justify-between overflow-hidden border border-slate-200 bg-white p-8 transition-all duration-300 hover:border-emerald-500/20 hover:shadow-md rounded-[28px]">
                        <div>
                          <div className="float-left mb-3 mr-4 flex size-12 items-center justify-center rounded-2xl bg-emerald-700/10 text-emerald-700 transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-110 group-hover:bg-emerald-700/20">
                            <Icon className="size-5" strokeWidth={1.8} />
                          </div>
                          <h3 className="mb-2 font-heading text-xl leading-tight tracking-tight text-slate-900 pt-1">
                            {reason.title}
                          </h3>
                          <p className="text-sm leading-relaxed text-slate-600">
                            {reason.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {/* Trailing Spacer for mobile snapping */}
                <div className="w-12 flex-shrink-0 sm:hidden" aria-hidden="true" />
              </SwipableRow>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Guest Ratings */}
      <GuestRatingsSection />

      {/* Final CTA */}

      <section className="py-8 sm:py-16">
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
