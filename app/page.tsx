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
  Moon,
  Sparkles,
  MapPin,
  Compass,
  Star,
} from "lucide-react";

import { resolveIcon } from "@/lib/icon-registry";
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
import { SectionLabel } from "@/components/ui/section-label";
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
  type CtaLink,
  eventCards,
  experiencePillars,
  extendReasons,
  faqItems,
  fourBedDormImages,
  galleryItems,
  podDormImages,
  hero,
  quickFacts,
  roomTypes,
  siteConfig,
  siteCopyContent,
  testimonials,
  freeServices,
} from "@/lib/site-data";
import { cn } from "@/lib/utils";


export const metadata = buildMetadata({
  title: siteCopyContent.home.metadata.title,
  description: siteCopyContent.home.metadata.description,
  path: "/",
  image: siteCopyContent.home.metadata.image,
});

const reasonIcons = [Moon, Sparkles, MapPin, Compass];



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
              {siteCopyContent.home.guestRatings.bookingSourceLabel}
            </p>
            <p className="truncate text-sm font-medium text-white/92">
              {siteCopyContent.home.guestRatings.bookingAwardTitle}
            </p>
          </div>
        </div>
        <div className="shrink-0 rounded-2xl bg-white/8 px-3 py-2 text-right ring-1 ring-white/12 shadow-sm">
          <p className="font-heading text-xl leading-none tracking-tight text-white text-center">
            {siteConfig.bookingRating}
          </p>
          <p className="mt-1 text-[8px] uppercase tracking-[0.2em] text-white/100">
            {siteCopyContent.home.guestRatings.bookingScoreSuffix}
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
              {siteCopyContent.home.guestRatings.hostelworldSourceLabel}
            </p>
            <p className="truncate text-sm font-medium text-white/92">
              {siteCopyContent.home.guestRatings.hostelworldTitle}
            </p>
          </div>
        </div>
        <div className="shrink-0 rounded-2xl bg-white/8 px-3 py-2 text-right ring-1 ring-white/12 shadow-sm">
          <p className="font-heading text-xl leading-none tracking-tight text-white text-center">
            {siteConfig.hostelworldRating}
          </p>
          <p className="mt-1 text-[8px] uppercase tracking-[0.2em] text-white/100">
            ({siteConfig.hostelworldReviews} {siteCopyContent.home.guestRatings.hostelworldReviewsSuffix})
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
            <div className="flex items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">
              <span className="faded-line h-px flex-1" />
              {siteCopyContent.home.guestRatings.label}
              <span className="faded-line h-px flex-1" />
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 sm:items-stretch">
              <a
                href={siteConfig.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-[var(--glass-border)] bg-[var(--glass-bg)] px-4 py-5 shadow-[0_20px_55px_-40px_var(--glass-shadow)] transition-all hover:scale-[1.01] hover:shadow-[0_20px_55px_-30px_var(--glass-shadow)]"
              >
                <div className="flex min-h-[3rem] flex-wrap items-center justify-between gap-x-2 gap-y-2">
                  <BookingComLogo className="min-w-0 shrink-0" />
                  <div className="flex shrink-0 items-center gap-1 rounded-full bg-yellow-400/15 px-2 py-1 text-yellow-600 dark:text-yellow-500">
                    <Star className="size-3" fill="currentColor" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">
                      {siteCopyContent.home.guestRatings.topRatedLabel}
                    </span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col justify-center py-1">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex min-w-0 items-center gap-2">
                      <div className="shrink-0 rounded-full bg-blue-500/12 p-1.5 text-blue-700 dark:text-blue-400">
                        <Award className="size-5" strokeWidth={1.8} />
                      </div>
                      <p className="text-sm font-medium leading-6 text-[var(--text-heading)] transition-colors group-hover:text-blue-700 dark:group-hover:text-blue-400">
                        {siteCopyContent.home.guestRatings.bookingAwardTitle}
                      </p>
                    </div>
                    <div className="shrink-0 rounded-tr-sm rounded-tl-sm rounded-br-sm rounded-bl-none bg-blue-700 px-3 py-1 text-center font-semibold text-white shadow-sm">
                      <p className="font-heading text-xl leading-none tracking-tight">
                        {siteConfig.bookingRating}
                      </p>
                      <p className="text-[8px] uppercase tracking-wider text-blue-50">
                        {siteCopyContent.home.guestRatings.bookingScoreSuffix}
                      </p>
                    </div>
                  </div>
                </div>
                <p className="mt-auto pt-2 text-sm leading-6 text-[var(--text-body-subtle)]">
                  {siteCopyContent.home.guestRatings.bookingDescription}
                </p>
              </a>

              <a
                href={siteConfig.hostelworldUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-[var(--glass-border)] bg-[var(--glass-bg)] px-4 py-5 shadow-[0_20px_55px_-40px_var(--glass-shadow)] transition-all hover:scale-[1.01] hover:shadow-[0_20px_55px_-30px_var(--glass-shadow)]"
              >
                <div className="flex min-h-[3rem] flex-wrap items-center justify-between gap-x-2 gap-y-2">
                  <HostelworldLogo className="h-7 w-auto shrink-0" />
                  <div className="flex shrink-0 items-center gap-1 rounded-full bg-yellow-400/15 px-2 py-1 text-yellow-600 dark:text-yellow-500">
                    <Star className="size-3" fill="currentColor" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">
                      {siteCopyContent.home.guestRatings.topRatedLabel}
                    </span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col justify-center py-1">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex min-w-0 items-center gap-2">
                      <div className="shrink-0 rounded-full bg-amber-500/12 p-1.5 text-amber-700 dark:text-amber-500">
                        <Star className="size-5" strokeWidth={1.8} />
                      </div>
                      <p className="text-sm font-medium leading-6 text-[var(--text-heading)] transition-colors group-hover:text-amber-700 dark:group-hover:text-amber-500">
                        {siteCopyContent.home.guestRatings.hostelworldTitle}
                      </p>
                    </div>
                    <div className="relative h-15 w-25 shrink-0 overflow-hidden rounded-md shadow-sm">
                      <Image
                        src="/images/hostelworld_reviews.png"
                        alt={siteCopyContent.home.guestRatings.hostelworldImageAlt}
                        fill
                        className="object-contain"
                        sizes="100px"
                      />
                    </div>
                  </div>
                </div>
                <p className="mt-auto pt-2 text-sm leading-6 text-[var(--text-body-subtle)]" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function Home() {

  const getServiceIcon = resolveIcon;



  const formatText = (text: string) => {
    return text.split(/(\[.*?\]\(.*?\))/g).map((part, i) => {
      const match = part.match(/\[(.*?)\]\((.*?)\)/);
      if (match) {
        return (
          <Link
            key={i}
            href={match[2]}
            className="brand-link"
          >
            {match[1]}
          </Link>
        );
      }
      return part;
    });
  };

  const PillarCta = ({ cta, variant = "light" }: { cta?: CtaLink; variant?: "light" | "dark" }) => {
    if (!cta) return null;
    return (
      <Link
        href={cta.url}
        className={cn(
          buttonVariants({ variant: "outline", size: "sm" }),
          "mt-4 w-fit gap-2 rounded-full transition-all duration-300",
          variant === "light"
            ? "border-emerald-500/20 bg-emerald-50/50 text-emerald-700 hover:border-emerald-500 hover:bg-emerald-600 hover:text-white"
            : "border-white/20 bg-white/10 text-white backdrop-blur-sm hover:bg-white hover:text-emerald-900 shadow-lg"
        )}
      >
        {cta.text}
        <ArrowRight className="size-3.5" strokeWidth={2.5} />
      </Link>
    );
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
            alt={siteCopyContent.home.hero.backgroundAlt}
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
                <h1 className="heading-hero text-white">
                  <AnimatedText
                    text={hero.title1}
                    wordClassName="text-white [text-shadow:0_1px_4px_rgba(0,0,0,0.4)]"
                    delayOffset={0}
                  />
                  {" "}
                  <AnimatedText
                    text={hero.title2}
                    className="text-sky-300"
                    wordClassName="text-sky-300 [text-shadow:0_1px_4px_rgba(0,0,0,0.4)]"
                    delayOffset={200}
                  />
                </h1>
                <p className="max-w-[50ch] text-hero-sub text-slate-300 antialiased [text-shadow:0_1px_4px_rgba(0,0,0,0.4)]">
                  {hero.description}
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
                  const Icon = resolveIcon(fact.icon);
                  return (
                    <div
                      key={index}
                      className="min-w-[85%] snap-center sm:min-w-0"
                    >
                      <div className="group relative overflow-hidden rounded-[24px] border border-white/18 bg-slate-950/42 p-5 backdrop-blur-[3px] transition-all duration-300 hover:border-white/24 hover:bg-slate-950/52">
                        <div className="text-sm leading-7 text-white/95">
                          <div className="float-left mb-1 mr-4 flex size-10 items-center justify-center rounded-xl bg-emerald-500/24 text-emerald-300">
                            <Icon className="size-5" strokeWidth={2} />
                          </div>
                          {fact.text}
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
                  <SectionLabel variant="emerald" className="mb-4">{siteCopyContent.home.atmosphere.directBookingLabel}</SectionLabel>
                  <p className="mt-2 font-heading text-2xl leading-tight tracking-tight text-[var(--text-heading)]">
                    {siteCopyContent.home.atmosphere.directBookingTitle}
                  </p>
                  <p className="mt-2 text-card-body">
                    {siteCopyContent.home.atmosphere.directBookingDescription}
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
                  {siteCopyContent.home.atmosphere.directBookingButton}
                </a>
              </div>
            </Reveal>

            {/* Rooftop image — full width mobile (first visible), row 1 col 1 on desktop */}
            <Reveal delay={0} className="lg:row-start-1">
              <div className="media-frame relative aspect-[16/10] sm:aspect-[21/9] lg:aspect-auto lg:min-h-[22rem] h-full overflow-hidden">
                <Image
                  src="/images/rooftop_social.webp"
                  alt={siteCopyContent.home.atmosphere.rooftopImageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, (max-width: 1400px) 66vw, 924px"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent p-6 pt-32 text-white">
                  <p className="text-xs uppercase tracking-[0.28em] text-sky-200/90">
                    {siteCopyContent.home.atmosphere.rooftopEyebrow}
                  </p>
                  <p className="mt-2 max-w-sm font-heading text-2xl leading-tight tracking-tight">
                    {siteCopyContent.home.atmosphere.rooftopTitle}
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
                      alt={siteCopyContent.home.atmosphere.roomImageAlt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 60vw, (max-width: 1400px) 33vw, 466px"
                    />
                  </div>

                  {/* Mobile-only booking card */}
                  <div className="glass-panel rounded-[28px] p-5 lg:hidden">
                    <SectionLabel variant="emerald" className="mb-4">{siteCopyContent.home.atmosphere.directBookingLabel}</SectionLabel>
                    <p className="mt-2 font-heading text-lg leading-tight tracking-tight text-[var(--text-heading)]">
                      <span className="sm:hidden">{siteCopyContent.home.atmosphere.directBookingTitleMobile}</span>
                      <span className="hidden sm:inline">{siteCopyContent.home.atmosphere.directBookingTitle}</span>
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-[var(--text-body-subtle)]">
                      <span className="sm:hidden">{siteCopyContent.home.atmosphere.directBookingDescriptionMobile}</span>
                      <span className="hidden sm:inline">{siteCopyContent.home.atmosphere.directBookingDescription}</span>
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
                      {siteCopyContent.home.atmosphere.directBookingButton}
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
              eyebrow={`${siteCopyContent.home.roomsSection.titleEyebrowPrefix} ${roomTypes[0].price}`}
              title={siteCopyContent.home.roomsSection.title}
              description={siteCopyContent.home.roomsSection.description}
            />
            <Link
              href="/rooms"
              className={cn(
                "group relative inline-flex items-center justify-center gap-4 overflow-hidden rounded-full px-8 py-4",
                "bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white",
                "text-sm font-bold tracking-tight antialiased",
                "shadow-[0_20px_50px_-12px_rgba(2,6,23,0.5)] ring-1 ring-white/15",
                "transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_-12px_rgba(5,150,105,0.25)] hover:ring-white/25",
                "active:scale-95 active:translate-y-0"
              )}
            >
              {/* Animated Sheen Effect */}
              <div className="absolute inset-0 z-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-[100%]" />

              <span className="relative z-10 transition-colors duration-300 group-hover:text-emerald-50">{siteCopyContent.home.roomsSection.buttonLabel}</span>
              <div className="relative z-10 flex size-7 items-center justify-center rounded-full bg-white/15 text-white transition-all duration-300 group-hover:bg-emerald-500 group-hover:scale-110">
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={2.5} />
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
                      <SectionLabel variant="emerald" className="mb-3">
                        {room.label}
                      </SectionLabel>
                      <h3 className="mt-3 heading-card text-[var(--text-heading)]">
                        {room.name}
                      </h3>
                      <p className="mt-4 text-section-desc">
                        {room.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {room.amenities.map((amenity, idx) => {
                        const AmenityIcon = resolveIcon(amenity.icon);
                        return (
                          <div
                            key={idx}
                            className="flex w-fit items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--muted)]/50 px-3 py-2 text-[var(--text-body)]"
                          >
                            <AmenityIcon className="size-3.5 shrink-0 text-emerald-600" />
                            <span className="whitespace-nowrap text-[11px] font-medium tracking-tight">
                              {amenity.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="space-y-3">
                      <SectionLabel weight="bold" className="mb-4">{siteCopyContent.home.roomsSection.detailsLabel}</SectionLabel>
                      <ul className="grid gap-3">
                        {room.bullets.map((bullet) => (
                          <li
                            key={bullet}
                            className="flex items-start gap-2.5 text-sm leading-6 text-[var(--text-body)]"
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

      {/* Included Services Section */}
      <section className="py-8 sm:py-16">
        <div className="shell-container space-y-12">
          <Reveal>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeading
                eyebrow={siteCopyContent.home.includedStay.eyebrow}
                title={siteCopyContent.home.includedStay.title}
                description={siteCopyContent.home.includedStay.description}
              />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <SwipableRow
              itemCount={freeServices.length}
              className="-mx-8 px-8 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            >
              {freeServices.map((service, idx) => {
                const Icon = getServiceIcon(service.icon);
                return (
                  <div
                    key={idx}
                    className="min-w-[85%] snap-center sm:min-w-0 h-full"
                  >
                    <div
                      className="group flex h-full gap-4 rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-5 transition-all duration-300 hover:border-emerald-500/20 hover:shadow-md"
                    >
                      <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[var(--muted)] text-[var(--text-body)] shadow-sm ring-1 ring-slate-900/5 transition-all duration-300 group-hover:bg-emerald-50 group-hover:text-emerald-600 group-hover:ring-emerald-500/20">
                        <Icon className="size-5" strokeWidth={1.5} />
                      </div>
                      <div className="space-y-1.5 pt-0.5">
                        <h4 className="text-[15px] font-bold tracking-tight text-[var(--text-heading)]">
                          {service.title}
                        </h4>
                        <p className="text-xs leading-relaxed text-[var(--text-body-subtle)] line-clamp-2 transition-colors group-hover:text-[var(--text-body)]">
                          {service.description}
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
      </section>

      {/* Gallery */}
      <section className="py-8 sm:py-16">
        <div className="shell-container space-y-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow={siteCopyContent.home.gallerySection.eyebrow}
              title={siteCopyContent.home.gallerySection.title}
              description={siteCopyContent.home.gallerySection.description}
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
              <span>{siteCopyContent.home.gallerySection.buttonLabel}</span>
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
              eyebrow={siteCopyContent.home.experiencesSection.eyebrow}
              title={siteCopyContent.home.experiencesSection.title}
              description={siteCopyContent.home.experiencesSection.description}
            />
            <Link
              href="/experiences"
              className={cn(
                "group relative inline-flex items-center justify-center gap-4 overflow-hidden rounded-full px-8 py-4",
                "bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white",
                "text-sm font-bold tracking-tight antialiased",
                "shadow-[0_20px_50px_-12px_rgba(2,6,23,0.5)] ring-1 ring-white/15",
                "transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_-12px_rgba(5,150,105,0.25)] hover:ring-white/25",
                "active:scale-95 active:translate-y-0"
              )}
            >
              {/* Animated Sheen Effect */}
              <div className="absolute inset-0 z-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-[100%]" />

              <span className="relative z-10 transition-colors duration-300 group-hover:text-emerald-50">{siteCopyContent.home.experiencesSection.buttonLabel}</span>
              <div className="relative z-10 flex size-7 items-center justify-center rounded-full bg-white/15 text-white transition-all duration-300 group-hover:bg-emerald-500 group-hover:scale-110">
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={2.5} />
              </div>
            </Link>
          </div>

          {/* --- DISCOVER SUBSECTION --- */}
          <div className="relative pt-12 sm:pt-16">
            {/* Ghost Background Label */}
            <div className="absolute left-0 top-3 z-0 select-none opacity-[0.07] sm:top-4">
              <span className="font-heading text-[44px] leading-none tracking-tighter text-slate-950 sm:text-[64px]">
                {siteCopyContent.home.experiencesSection.discoverLabel}
              </span>
            </div>

            <div className="lg:hidden">
              <Reveal delay={120}>
                <SwipableRow itemCount={experiencePillars.length} className="-mx-4 px-4 sm:-mx-8 sm:px-8">
                  {experiencePillars.map((pillar, index) => (
                    <div key={pillar.title} className="min-w-[85vw] sm:min-w-[45vw] snap-center h-full">
                      <Panel className="overflow-hidden flex h-full flex-col">
                        <div className="relative min-h-[16rem] sm:min-h-[22rem]">
                          <Image
                            src={pillar.image}
                            alt={pillar.alt}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 85vw, 50vw"
                          />
                          {index === 0 && (
                            <div className="absolute right-4 top-4 z-20">
                              <ThethWeather variant="small" />
                            </div>
                          )}
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent p-6 pt-24 text-white">
                            <p className="text-sm sm:text-sm uppercase tracking-[0.28em] text-sky-100/90 mb-2">
                              {pillar.title}
                            </p>
                          </div>
                        </div>
                        <div className="p-6 text-sm leading-relaxed text-[var(--text-body-subtle)] bg-[var(--glass-bg)] flex-1 flex flex-col">
                          <p className="flex-1">{formatText(pillar.description)}</p>
                          <PillarCta cta={pillar.cta} />
                        </div>
                      </Panel>
                    </div>
                  ))}
                  <div className="w-8 flex-shrink-0 lg:hidden" aria-hidden="true" />
                </SwipableRow>
              </Reveal>
            </div>

            <div className="hidden lg:grid gap-6 lg:grid-cols-12">
              <Reveal delay={0} className="lg:col-span-7 h-full">
                <Panel className="overflow-hidden h-full">
                  <div className="relative h-full min-h-[30rem]">
                    <Image
                      src={experiencePillars[0].image}
                      alt={experiencePillars[0].alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, (max-width: 1400px) 58vw, 812px"
                    />
                    <div className="absolute right-4 top-4 z-20">
                      <ThethWeather variant="small" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent p-6 pt-32 text-white">
                      <p className="text-sm uppercase tracking-[0.28em] text-sky-100/90">
                        {experiencePillars[0].title}
                      </p>
                      <p className="mt-3 max-w-lg text-base leading-8 text-slate-100">
                        {formatText(experiencePillars[0].description)}
                      </p>
                      <PillarCta cta={experiencePillars[0].cta} variant="dark" />
                    </div>
                  </div>
                </Panel>
              </Reveal>

              <div className="lg:col-span-5 grid gap-6">
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
                              sizes="(max-width: 1024px) 100vw, (max-width: 1400px) 42vw, 588px"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent p-6 pt-32 text-white">
                              <p className="text-sm uppercase tracking-[0.28em] text-sky-100/90">
                                {pillar.title}
                              </p>
                              <p className="mt-3 text-base leading-8 text-slate-100">
                                {formatText(pillar.description)}
                              </p>
                              <PillarCta cta={pillar.cta} variant="dark" />
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
                                sizes="(max-width: 768px) 100vw, (max-width: 1400px) 18vw, 250px"
                              />
                            </div>
                            <div className="space-y-3 p-6">
                              <h3 className="heading-feature text-[var(--text-heading)]">
                                {pillar.title}
                              </h3>
                              <p className="text-section-desc">
                                {formatText(pillar.description)}
                              </p>
                              <PillarCta cta={pillar.cta} />
                            </div>
                          </div>
                        )}
                      </Panel>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </div>

          {/* --- CONNECT SUBSECTION --- */}
          <div className="relative pt-12 sm:pt-16 mt-8 sm:mt-12">
            {/* Ghost Background Label */}
            <div className="absolute left-0 top-3 z-0 select-none opacity-[0.07] sm:top-4">
              <span className="font-heading text-[44px] leading-none tracking-tighter text-slate-950 sm:text-[64px]">
                {siteCopyContent.home.experiencesSection.connectLabel}
              </span>
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
                          <h3 className="font-heading text-2xl leading-none tracking-[-0.04em] text-[var(--text-heading)]">
                            {event.title}
                          </h3>
                          <p className="mt-3 text-card-body">
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
        </div>
      </section>


      {/* why people stay longer & testimonials */}
      <section className="py-8 sm:py-16 bg-[#f0f7ff]/60 dark:bg-transparent">
        <div className="shell-container flex flex-col gap-10 lg:flex-row lg:items-start relative">
          {/* Left Column: Testimonials */}
          <Reveal delay={0} className="lg:w-[40%] flex flex-col lg:sticky lg:top-32">
            <TestimonialCarousel testimonials={testimonials.slice(0, 5)} className="w-full" />
          </Reveal>

          {/* Right Column: Vibe Content */}
          <div className="flex-1 space-y-8 lg:max-w-[60%]">
            <Reveal delay={100}>
              <SectionHeading
                eyebrow={siteCopyContent.home.whyStayLonger.eyebrow}
                title={siteCopyContent.home.whyStayLonger.title}
                description={siteCopyContent.home.whyStayLonger.description}
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
                      <div className="group relative flex h-full flex-col justify-between overflow-hidden border border-[var(--glass-border)] bg-[var(--glass-bg)] p-8 transition-all duration-300 hover:border-emerald-500/20 hover:shadow-md rounded-[28px]">
                        <div>
                          <div className="float-left mb-3 mr-4 flex size-12 items-center justify-center rounded-2xl bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-110 group-hover:bg-[var(--brand-primary)]/20">
                            <Icon className="size-5" strokeWidth={1.8} />
                          </div>
                          <h3 className="mb-2 heading-item text-[var(--text-heading)] pt-1">
                            {reason.title}
                          </h3>
                          <p className="text-card-body">
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
            eyebrow={siteCopyContent.home.cta.eyebrow}
            title={siteCopyContent.home.cta.title}
            description={siteCopyContent.home.cta.description}
            image={siteCopyContent.home.cta.image}
            alt={siteCopyContent.home.cta.alt}
          />
        </div>
      </section>
    </>
  );
}
