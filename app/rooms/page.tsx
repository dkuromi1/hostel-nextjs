import Image from "next/image";
import dynamic from "next/dynamic";
import {
  Check,
  resolveIcon,
} from "@/lib/icon-registry";

import { CtaStrip } from "@/components/cta-strip";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { StructuredData } from "@/components/structured-data";
import { SectionLabel } from "@/components/ui/section-label";
import { Badge } from "@/components/ui/badge";
import { TestimonialCarousel } from "@/components/testimonial-carousel";

import { cn } from "@/lib/utils";

const SectionHeading = dynamic(() => import("@/components/section-heading").then(mod => mod.SectionHeading), { ssr: true });
const Panel = dynamic(() => import("@/components/ui/panel").then(mod => mod.Panel), { ssr: true });
const ImageCarousel = dynamic(() => import("@/components/image-carousel").then(mod => mod.ImageCarousel), { ssr: true });
import {
  buildBreadcrumbSchema,
  buildBusinessSchema,
  buildMetadata,
} from "@/lib/metadata";
import {
  freeServices,
  paidServices,
  roomTypes,
  roomHeroHighlights,
  siteCopyContent,
  bookingChannels,
  contactChannels
} from "@/lib/site-data";
import { testimonials } from "@/lib/site-data";

const getFreeCardTheme = (index: number) => {
  const themes = [
    {
      // Modern Facilities
      iconColor: "text-sky-600 dark:text-sky-400",
      iconBg: "bg-sky-50 dark:bg-sky-500/10",
      iconRing: "ring-sky-500/10 dark:ring-sky-500/20",
      glowColor: "hover:shadow-sky-500/[0.08] dark:hover:shadow-sky-500/[0.15] hover:border-sky-500/30",
      hoverBg: "group-hover:bg-sky-600",
      backdropBg: "bg-sky-500/10 dark:bg-sky-500/20"
    },
    {
      // Shared Kitchen
      iconColor: "text-emerald-600 dark:text-emerald-400",
      iconBg: "bg-emerald-50 dark:bg-emerald-500/10",
      iconRing: "ring-emerald-500/10 dark:ring-emerald-500/20",
      glowColor: "hover:shadow-emerald-500/[0.08] dark:hover:shadow-emerald-500/[0.15] hover:border-emerald-500/30",
      hoverBg: "group-hover:bg-emerald-600",
      backdropBg: "bg-emerald-500/10 dark:bg-emerald-500/20"
    },
    {
      // Community
      iconColor: "text-rose-600 dark:text-rose-400",
      iconBg: "bg-rose-50 dark:bg-rose-500/10",
      iconRing: "ring-rose-500/10 dark:ring-rose-500/20",
      glowColor: "hover:shadow-rose-500/[0.08] dark:hover:shadow-rose-500/[0.15] hover:border-rose-500/30",
      hoverBg: "group-hover:bg-rose-600",
      backdropBg: "bg-rose-500/10 dark:bg-rose-500/20"
    },
    {
      // Adventure Ready
      iconColor: "text-violet-600 dark:text-violet-400",
      iconBg: "bg-violet-50 dark:bg-violet-500/10",
      iconRing: "ring-violet-500/10 dark:ring-violet-500/20",
      glowColor: "hover:shadow-violet-500/[0.08] dark:hover:shadow-violet-500/[0.15] hover:border-violet-500/30",
      hoverBg: "group-hover:bg-violet-600",
      backdropBg: "bg-violet-500/10 dark:bg-violet-500/20"
    }
  ];
  return themes[index % themes.length];
};

const getPaidCardTheme = (index: number) => {
  const themes = [
    {
      // Breakfast - Amber
      iconColor: "text-amber-600 dark:text-amber-400",
      iconBg: "bg-amber-50 dark:bg-amber-500/10",
      iconRing: "ring-amber-500/10 dark:ring-amber-500/20",
      glowColor: "hover:shadow-amber-500/[0.08] dark:hover:shadow-amber-500/[0.15] hover:border-amber-500/30",
      hoverBg: "group-hover:bg-amber-600",
      backdropBg: "bg-amber-500/10 dark:bg-amber-500/20"
    },
    {
      // Tours & Transport - Fuchsia
      iconColor: "text-fuchsia-600 dark:text-fuchsia-400",
      iconBg: "bg-fuchsia-50 dark:bg-fuchsia-500/10",
      iconRing: "ring-fuchsia-500/10 dark:ring-fuchsia-500/20",
      glowColor: "hover:shadow-fuchsia-500/[0.08] dark:hover:shadow-fuchsia-500/[0.15] hover:border-fuchsia-500/30",
      hoverBg: "group-hover:bg-fuchsia-600",
      backdropBg: "bg-fuchsia-500/10 dark:bg-fuchsia-500/20"
    },
    {
      // Laundry - Cyan
      iconColor: "text-cyan-600 dark:text-cyan-400",
      iconBg: "bg-cyan-50 dark:bg-cyan-500/10",
      iconRing: "ring-cyan-500/10 dark:ring-cyan-500/20",
      glowColor: "hover:shadow-cyan-500/[0.08] dark:hover:shadow-cyan-500/[0.15] hover:border-cyan-500/30",
      hoverBg: "group-hover:bg-cyan-600",
      backdropBg: "bg-cyan-500/10 dark:bg-cyan-500/20"
    },
    {
      // Bike Rentals - Lime
      iconColor: "text-lime-600 dark:text-lime-400",
      iconBg: "bg-lime-50 dark:bg-lime-500/10",
      iconRing: "ring-lime-500/10 dark:ring-lime-500/20",
      glowColor: "hover:shadow-lime-500/[0.08] dark:hover:shadow-lime-500/[0.15] hover:border-lime-500/30",
      hoverBg: "group-hover:bg-lime-600",
      backdropBg: "bg-lime-500/10 dark:bg-lime-500/20"
    }
  ];
  return themes[index % themes.length];
};

export default function RoomsPage() {
  const primaryPricedRoom = roomTypes.find((room) => room.featured) ?? roomTypes[0];

  return (
    <>
      <StructuredData
        data={[
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: siteCopyContent.rooms.pageTitle, path: "/rooms" },
          ]),
        ]}
      />

      <PageHero
        eyebrow={siteCopyContent.rooms.hero.eyebrow}
        title={siteCopyContent.rooms.hero.title}
        description={siteCopyContent.rooms.hero.description}
        hideActions={true}
        highlights={roomHeroHighlights}
        backgroundImage="/images/rooms_3.jpg"
        backgroundAlt={siteCopyContent.rooms.hero.title}
      >
        <div className="grid gap-[var(--layout-grid-gutter)] md:grid-cols-[1.1fr_0.9fr]">
          <div className="group media-frame border-none bg-transparent relative min-h-[18rem] md:min-h-[22rem] order-1 md:order-1 md:row-span-2">
            <Image
              src="/images/rooms_2.webp"
              alt={siteCopyContent.rooms.heroImages.fourBedAlt}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105 shadow-2xl"
              loading="eager"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>
          <div className="group media-frame border-none bg-transparent relative min-h-[18rem] md:min-h-[14rem] order-3 md:order-2">
            <Image
              src="/images/room_18bed2.jpg"
              alt={siteCopyContent.rooms.heroImages.podAlt}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105 shadow-xl"
              loading="eager"
              sizes="(max-width: 768px) 100vw, 25vw"
            />
          </div>
          <div className="glass-panel rounded-[var(--radius-3xl)] p-card-premium order-2 md:order-3">
            <SectionLabel variant="emerald" className="mb-4">
              {siteCopyContent.rooms.heroPriceBlurb.labelPrefix}{" "}
              <strong>{primaryPricedRoom?.price ? `${primaryPricedRoom.price} / Night` : siteCopyContent.rooms.heroPriceBlurb.contactForRatesLabel}</strong>
            </SectionLabel>
            <div className="space-y-3">
              <h2 className="heading-card text-[var(--text-heading)]">
                {siteCopyContent.rooms.heroPriceBlurb.title}
              </h2>
              <p className="text-card-body">
                {siteCopyContent.rooms.heroPriceBlurb.description}
              </p>
            </div>
          </div>
        </div>
      </PageHero>

      <section className="section-muted py-[var(--layout-section-spacing)] relative overflow-hidden">
        {/* Subtle decorative elements */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/4 -right-48 w-96 h-96 rounded-full bg-[var(--brand-primary)]/[0.02] blur-3xl" />
          <div className="absolute bottom-1/3 -left-32 w-80 h-80 rounded-full bg-[var(--accent)]/[0.015] blur-3xl" />
        </div>

        <div className="shell-container space-y-10 relative z-10">
          <SectionHeading
            eyebrow={siteCopyContent.rooms.chooseSetup.eyebrow}
            title={siteCopyContent.rooms.chooseSetup.title}
            description={siteCopyContent.rooms.chooseSetup.description}
          />
          <div className="grid gap-[var(--layout-grid-gutter)] lg:grid-cols-2">
            {roomTypes.map((room, index) => {
              const carouselImages = room.images ?? [];

              return (
                <Reveal key={room.name} delay={index * 100}>
                  <Panel className="group relative flex h-full flex-col overflow-hidden transition-all duration-300 hover:shadow-md">

                    {/* Updated Image Carousel Section */}
                    <div className="relative min-h-[var(--room-image-height)]">
                      <ImageCarousel
                        images={carouselImages}
                        className="absolute inset-0 h-full w-full !rounded-none"
                        autoPlayInterval={0}
                      />


                      {/* Price Badge - pointer-events-none to prevent blocking dots/arrows */}
                      <div className="pointer-events-none absolute left-0 top-0 z-10 p-5 sm:inset-x-0 sm:bottom-0 sm:top-auto sm:px-6 sm:py-4">
                        <Badge className="bg-white/20 text-white shadow-sm backdrop-blur-md pointer-events-auto">
                          {room.price}/night
                        </Badge>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col justify-between p-card-premium bg-white dark:bg-card">
                      <div className="space-y-4">
                        <div>
                          <SectionLabel variant="emerald" className="mb-2">
                            {(() => {
                              const parts = room.label.split(":");
                              if (parts.length > 1) {
                                  return (
                                    <>
                                      <span className="font-extrabold">{parts[0]}:</span>
                                      {parts.slice(1).join(":")}
                                    </>
                                  );
                                }
                                return room.label;
                              })()}
                            </SectionLabel>
                            <h2 className="mt-2 heading-card text-[var(--text-heading)]">
                              {room.name}
                            </h2>
                            <p className="mt-3 text-section-desc text-[var(--text-body-subtle)] line-clamp-3">
                              {room.description}
                            </p>
                          </div>
  
                          <div className="flex flex-wrap gap-2 mt-2">
                            {room.amenities.map((amenity, idx) => {
                              const AmenityIcon = resolveIcon(amenity.icon);
                              return (
                                <div
                                  key={idx}
                                  className="flex w-fit items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--muted)]/50 px-2 py-1 text-[var(--text-body-subtle)] transition-all duration-300 hover:border-[var(--brand-primary)]/10 hover:shadow-sm hover:bg-[var(--glass-bg)]"
                                >
                                  <AmenityIcon className="size-3 shrink-0 text-[var(--brand-primary)]" />
                                  <span className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-wider">
                                    {amenity.label}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
  
                          <div className="space-y-3 pt-4">
                            <SectionLabel weight="bold" className="opacity-70 text-[10px] uppercase tracking-widest">Room Details</SectionLabel>
                            <ul className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
                              {room.bullets.map((bullet) => (
                                <li
                                  key={bullet}
                                  className="flex items-start gap-2 text-card-body text-[var(--text-body-subtle)]"
                                >
                                  <Check
                                    className="mt-0.5 size-3.5 shrink-0 text-[var(--brand-primary)]"
  
                                  />
                                  <span>{bullet}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </Panel>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
  
        <section className="py-[var(--layout-section-spacing)] relative">
          {/* Top section divider */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" aria-hidden="true" />
  
          <div className="shell-container grid gap-[var(--layout-grid-gutter)] lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <Reveal className="lg:sticky lg:top-32">
              <Panel className="p-card-premium">
                <SectionHeading
                  eyebrow={siteCopyContent.rooms.includedStay.eyebrow}
                  variant="simple"
                  title={siteCopyContent.rooms.includedStay.title}
                  description={siteCopyContent.rooms.includedStay.description}
                />
                <div className="mt-8 grid gap-[var(--layout-grid-gutter)] sm:grid-cols-2">
                  {freeServices.map((service, idx) => {
                    const Icon = resolveIcon(service.icon);
                    const theme = getFreeCardTheme(idx);
                    return (
                      <div
                        key={idx}
                        className={cn(
                          "group relative flex flex-col gap-5 rounded-[var(--radius-2xl)] border border-[var(--border)] bg-white/70 dark:bg-zinc-950/60 backdrop-blur-md p-6 transition-all duration-500 hover:shadow-2xl",
                          theme.glowColor
                        )}
                      >
                        {/* Offset layered background sheet for tactile visual depth */}
                        <div className={cn(
                          "absolute -inset-px rounded-[var(--radius-2xl)] border border-[var(--border)] -z-10 opacity-30 transition-all duration-500 translate-x-2 translate-y-2 group-hover:translate-x-3.5 group-hover:translate-y-3.5 dark:bg-card/25",
                          theme.backdropBg
                        )} />

                        {/* Horizontal Header: Icon + Title/Subheading side-by-side */}
                        <div className="flex items-center gap-4">
                          <div className={cn(
                            "relative flex size-12 shrink-0 items-center justify-center rounded-[var(--radius-xl)] shadow-sm ring-1 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:shadow-lg group-hover:ring-transparent",
                            theme.iconBg,
                            theme.iconRing,
                            theme.hoverBg
                          )}>
                            <div className="absolute inset-0 rounded-[var(--radius-xl)] bg-current opacity-[0.03] blur-[4px] transition-all duration-500 group-hover:opacity-0" />
                            <Icon className={cn("size-5.5 transition-colors duration-500", theme.iconColor, "group-hover:text-white")} />
                          </div>
                          <div className="flex flex-col gap-0.5 min-w-0">
                            {service.subheading && (
                              <span className={cn("text-[9px] font-bold uppercase tracking-[0.2em]", theme.iconColor)}>
                                {service.subheading}
                              </span>
                            )}
                            <h3 className="heading-item text-[1.05rem] leading-tight tracking-tight text-[var(--text-heading)]">
                              {service.title}
                            </h3>
                          </div>
                        </div>

                        {/* Description spanning full width below the header */}
                        <p className="text-[14.5px] leading-relaxed text-[var(--text-body-subtle)] transition-colors group-hover:text-[var(--text-body)]">
                          {service.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </Panel>
            </Reveal>
  
            <Reveal delay={120} className="lg:sticky lg:top-32">
              <Panel className="p-card-premium">
                <SectionLabel className="mb-6">{siteCopyContent.rooms.extraHelp.label}</SectionLabel>
                <h2 className="mt-4 heading-card text-[var(--text-heading)]">
                  {siteCopyContent.rooms.extraHelp.title}
                </h2>
                <div className="mt-8 grid gap-[var(--layout-grid-gutter)]">
                  {paidServices.map((service, idx) => {
                    const Icon = resolveIcon(service.icon);
                    const theme = getPaidCardTheme(idx);
                    const subheadings: Record<string, string> = {
                      "Breakfast": "Morning Fuel",
                      "Tours & Transport": "Discovery",
                      "Guest Laundry": "Laundry Services",
                      "Bike Rentals": "City Exploration"
                    };
                    const subheading = service.subheading || subheadings[service.title] || "Add-on Service";

                    return (
                      <div
                        key={idx}
                        className={cn(
                          "group relative flex flex-col gap-5 rounded-[var(--radius-2xl)] border border-[var(--border)] bg-white/70 dark:bg-zinc-950/60 backdrop-blur-md p-6 transition-all duration-500 hover:shadow-2xl",
                          theme.glowColor
                        )}
                      >
                        {/* Offset layered background sheet for tactile visual depth */}
                        <div className={cn(
                          "absolute -inset-px rounded-[var(--radius-2xl)] border border-[var(--border)] -z-10 opacity-30 transition-all duration-500 translate-x-2 translate-y-2 group-hover:translate-x-3.5 group-hover:translate-y-3.5 dark:bg-card/25",
                          theme.backdropBg
                        )} />

                        {/* Horizontal Header: Icon + Title/Subheading side-by-side */}
                        <div className="flex items-center gap-4">
                          <div className={cn(
                            "relative flex size-12 shrink-0 items-center justify-center rounded-[var(--radius-xl)] shadow-sm ring-1 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:shadow-lg group-hover:ring-transparent",
                            theme.iconBg,
                            theme.iconRing,
                            theme.hoverBg
                          )}>
                            <div className="absolute inset-0 rounded-[var(--radius-xl)] bg-current opacity-[0.03] blur-[4px] transition-all duration-500 group-hover:opacity-0" />
                            <Icon className={cn("size-5.5 transition-colors duration-500", theme.iconColor, "group-hover:text-white")} />
                          </div>
                          <div className="flex flex-col gap-0.5 min-w-0">
                            {subheading && (
                              <span className={cn("text-[9px] font-bold uppercase tracking-[0.2em]", theme.iconColor)}>
                                {subheading}
                              </span>
                            )}
                            <h3 className="heading-item text-[1.05rem] leading-tight tracking-tight text-[var(--text-heading)]">
                              {service.title}
                            </h3>
                          </div>
                        </div>

                        {/* Description spanning full width below the header */}
                        <p className="text-[14.5px] leading-relaxed text-[var(--text-body-subtle)] transition-colors group-hover:text-[var(--text-body)]">
                          {service.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-8 media-frame relative w-full aspect-[4/3] sm:aspect-[16/9]">
                  <Image
                    src="/images/rooftop_social_2.jpg"
                    alt={siteCopyContent.rooms.extraHelp.imageAlt}
                    fill
                    className="object-cover object-[50%_30%]"
                    sizes="(max-width: 1024px) 100vw, 38vw"
                  />
                </div>
              </Panel>
            </Reveal>
          </div>
        </section>


      <section className="section-slate py-[var(--layout-section-spacing)] relative overflow-hidden">
        {/* Subtle background texture */}
        <div className="absolute inset-0 opacity-[0.03]" aria-hidden="true">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(110,231,183,0.08),transparent_40%)]" />
        </div>

        <div className="shell-container relative z-10">
          <Reveal>
            <div className="grid gap-[var(--layout-grid-gutter)] lg:grid-cols-2">
              <div className="flex flex-col">
                <TestimonialCarousel testimonials={testimonials.slice(5, 10)} className="h-full" variant="dark" />
              </div>
              <div className="grid grid-cols-2 gap-[var(--layout-grid-gutter)] lg:grid-cols-1">
                <div className="media-frame relative min-h-[12rem] lg:min-h-[15rem]">
                  <Image
                    src="/images/indoor_common_1.webp"
                    alt={siteCopyContent.rooms.testimonialsImages.socialAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 45vw"
                  />
                </div>
                <div className="media-frame relative min-h-[12rem] lg:min-h-[15rem]">
                  <Image
                    src="/images/ambiance_3.jpg"
                    alt={siteCopyContent.rooms.testimonialsImages.breakfastAlt}
                    fill
                    className="object-cover object-[50%_40%]"
                    sizes="(max-width: 1024px) 50vw, 45vw"
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-[var(--layout-section-spacing)]">
        <div className="shell-container">
          <CtaStrip
            eyebrow={siteCopyContent.rooms.cta.eyebrow}
            title={siteCopyContent.rooms.cta.title}
            description={siteCopyContent.rooms.cta.description}
            image={siteCopyContent.rooms.cta.image}
            alt={siteCopyContent.rooms.cta.alt}
            imageClassName="object-[50%_80%]"
            bookingChannels={bookingChannels}
            contactChannels={contactChannels}
          />
        </div>
      </section>
    </>
  );
}
