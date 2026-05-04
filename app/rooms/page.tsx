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

export const metadata = buildMetadata({
  title: siteCopyContent.rooms.metadata.title,
  description: siteCopyContent.rooms.metadata.description,
  path: "/rooms",
  image: siteCopyContent.rooms.metadata.image,
});

export default function RoomsPage() {
  const primaryPricedRoom = roomTypes.find((room) => room.featured) ?? roomTypes[0];

  return (
    <>
      <StructuredData
        data={[
          buildBusinessSchema(),
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
      >
        <div className="grid gap-[var(--layout-grid-gutter)] md:grid-cols-[1.1fr_0.9fr]">
          <div className="group media-frame relative min-h-[22rem] md:row-span-2">
            <Image
              src="/images/rooms_2.jpg"
              alt={siteCopyContent.rooms.heroImages.fourBedAlt}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
              priority
              fetchPriority="high"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>
          <div className="group media-frame relative min-h-[14rem]">
            <Image
              src="/images/room_18bed2.jpg"
              alt={siteCopyContent.rooms.heroImages.podAlt}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
              priority
              fetchPriority="high"
              sizes="(max-width: 768px) 100vw, 25vw"
            />
          </div>
          <div className="glass-panel rounded-[var(--radius-3xl)] p-6 sm:p-7">
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

      <section className="py-[var(--layout-section-spacing)]">
        <div className="shell-container space-y-10">
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
                  <Panel className="group relative flex h-full flex-col overflow-hidden transition-all duration-300 hover:border-[var(--brand-primary)]/20 hover:shadow-md">

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

                    <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
                      <div className="space-y-4">
                        <div>
                          <SectionLabel variant="emerald" className="mb-2">
                            {room.label}
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
                                className="flex w-fit items-center gap-1.5 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--muted)]/50 px-2.5 py-1.5 text-[var(--text-body-subtle)] transition-all duration-300 hover:border-[var(--brand-primary)]/10 hover:shadow-sm hover:bg-[var(--glass-bg)]"
                              >
                                <AmenityIcon className="size-3 shrink-0 text-[var(--brand-primary)]" />
                                <span className="whitespace-nowrap text-xs font-medium">
                                  {amenity.label}
                                </span>
                              </div>
                            );
                          })}
                        </div>

                        <div className="space-y-2">
                          <SectionLabel weight="bold" className="mb-1 opacity-70">Room Details</SectionLabel>
                          <ul className="grid gap-2 sm:grid-cols-2">
                            {room.bullets.map((bullet) => (
                              <li
                                key={bullet}
                                className="flex items-start gap-2 text-card-body text-[var(--text-body-subtle)]"
                              >
                                <Check
                                  className="mt-0.5 size-3.5 shrink-0 text-[var(--brand-primary)]"
                                  strokeWidth={2}
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

      <section className="py-[var(--layout-section-spacing)]">
        <div className="shell-container grid gap-[var(--layout-grid-gutter)] lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <Reveal className="lg:sticky lg:top-32">
            <Panel className="p-6 sm:p-8">
              <SectionHeading
                eyebrow={siteCopyContent.rooms.includedStay.eyebrow}
                variant="simple"
                title={siteCopyContent.rooms.includedStay.title}
                description={siteCopyContent.rooms.includedStay.description}
              />
              <div className="mt-8 grid gap-[var(--layout-grid-gutter)] sm:grid-cols-2">
                {freeServices.map((service, idx) => {
                  const Icon = resolveIcon(service.icon);
                  return (
                    <div
                      key={idx}
                      className="group flex gap-4 rounded-[var(--radius-2xl)] border border-[var(--border)] bg-[var(--muted)]/30 p-4 transition-all duration-300 hover:border-[var(--brand-primary)]/20 hover:bg-[var(--glass-bg)] hover:shadow-md"
                    >
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-[var(--radius-xl)] bg-[var(--glass-bg)] shadow-sm ring-1 ring-[var(--border)] transition-all duration-300 group-hover:bg-[var(--brand-primary-light)] group-hover:text-[var(--brand-primary)] group-hover:ring-[var(--brand-primary)]/20">
                        <Icon className="size-5" strokeWidth={1.5} />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-base font-bold tracking-tight text-[var(--text-heading)]">
                          {service.title}
                        </h4>
                        <p className="text-card-body">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Panel>
          </Reveal>

          <Reveal delay={120} className="lg:sticky lg:top-32">
            <Panel className="p-6 sm:p-8">
              <SectionLabel className="mb-6">{siteCopyContent.rooms.extraHelp.label}</SectionLabel>
              <h2 className="mt-4 heading-card text-[var(--text-heading)]">
                {siteCopyContent.rooms.extraHelp.title}
              </h2>
              <div className="mt-8 grid gap-[var(--layout-grid-gutter)]">
                {paidServices.map((service, idx) => {
                  const Icon = resolveIcon(service.icon);
                  return (
                    <div
                      key={idx}
                      className="group flex gap-4 rounded-[var(--radius-2xl)] border border-amber-500/10 bg-amber-50/10 p-4 transition-all duration-300 hover:border-amber-500/20 hover:bg-[var(--glass-bg)] hover:shadow-md"
                    >
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-[var(--radius-xl)] bg-[var(--glass-bg)] shadow-sm ring-1 ring-amber-500/10 transition-all duration-300 group-hover:bg-amber-50 dark:group-hover:bg-amber-500/20 group-hover:text-amber-600 dark:group-hover:text-amber-400 group-hover:ring-amber-500/20">
                        <Icon className="size-5" strokeWidth={1.5} />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-base font-bold tracking-tight text-[var(--text-heading)]">
                          {service.title}
                        </h4>
                        <p className="text-card-body">
                          {service.description}
                        </p>
                      </div>
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


      <section className="py-[var(--layout-section-spacing)]">
        <div className="shell-container">
          <Reveal>
            <div className="grid gap-[var(--layout-grid-gutter)] lg:grid-cols-2">
              <div className="flex flex-col">
                <TestimonialCarousel testimonials={testimonials.slice(5, 10)} className="h-full" />
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
