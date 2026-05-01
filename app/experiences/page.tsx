import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Navigation,
  resolveIcon,
} from "@/lib/icon-registry";

import dynamic from "next/dynamic";
const LocationMap = dynamic(() => import("@/components/location-map").then(mod => mod.LocationMap), { ssr: true });
const SwipableRow = dynamic(() => import("@/components/swipable-row").then(mod => mod.SwipableRow), { ssr: true });
const Panel = dynamic(() => import("@/components/ui/panel").then(mod => mod.Panel), { ssr: true });
const CtaStrip = dynamic(() => import("@/components/cta-strip").then(mod => mod.CtaStrip), { ssr: true });
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { cn } from "@/lib/utils";
import { StructuredData } from "@/components/structured-data";
import { ThethWeather } from "@/components/theth-weather";
import {
  buildBreadcrumbSchema,
  buildBusinessSchema,
  buildMetadata,
} from "@/lib/metadata";
import {
  experienceLogisticsFeatures,
  socialConnectionFeatures,
  siteConfig,
  siteCopyContent,
  thingsToDo,
  bookingChannels,
  contactChannels
} from "@/lib/site-data";
// resolveIcon now imported from registry above

export const metadata = buildMetadata({
  title: siteCopyContent.experiences.metadata.title,
  description: siteCopyContent.experiences.metadata.description,
  path: "/experiences",
  image: siteCopyContent.experiences.metadata.image,
});

const THETH_SIDE_TRAILHEAD_GOOGLE_MAPS = "https://www.google.com/maps/dir/?api=1&destination=42.397171,19.772164";

export default function ExperiencesPage() {
  return (
    <>
      <StructuredData
        data={[
          buildBusinessSchema(),
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: siteCopyContent.experiences.pageTitle, path: "/experiences" },
          ]),
        ]}
      />

      {/* The Northbound Launchpad */}
      <section className="py-8 sm:py-16">
        <div className="shell-container grid gap-12 lg:grid-cols-12 lg:items-center">

          {/* Left Side: Editorial Context & Logistics */}
          <Reveal className="space-y-10 lg:col-span-5">
            <SectionHeading
              eyebrow={siteCopyContent.experiences.launchpad.eyebrow}
              title={siteCopyContent.experiences.launchpad.title}
              description={siteCopyContent.experiences.launchpad.description}
              headingLevel="h1"
            />

            {siteConfig.features.showRegionalWeather ? (
              <div className="lg:hidden">
                <ThethWeather />
              </div>
            ) : null}

            {/* High-End Feature Rows */}
            <div className="space-y-8">
              {experienceLogisticsFeatures.map((item, i) => {
                const Icon = resolveIcon(item.icon);
                return (
                  <div
                    key={i}
                    className="group flex items-start gap-5 transition-all duration-300 hover:translate-x-2"
                  >
                    {/* Interactive Icon Box */}
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--muted)] text-[var(--brand-primary)] transition-all duration-300 group-hover:bg-[var(--brand-primary)] group-hover:text-[var(--primary-foreground)] group-hover:shadow-lg group-hover:shadow-[var(--brand-primary)]/20">
                      <Icon className="size-5" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="heading-item text-[var(--text-heading)]">
                        {item.title}
                      </h4>
                      <p className="mt-2 text-card-body text-[var(--text-body)]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </Reveal>

          {/* Right Side: Premium Asymmetrical Image Grid */}
          <div className="relative lg:col-span-7">
            {siteConfig.features.showRegionalWeather ? (
              <div className="hidden lg:block absolute -top-24 right-0 z-20">
                <ThethWeather />
              </div>
            ) : null}
            <div className="grid grid-cols-2 gap-4 h-full">

              {/* Left Column: Tall Featured Image */}
              <Reveal className="row-span-2 h-full" delay={100}>
                <div className="media-frame relative h-full min-h-[20rem] md:min-h-[36rem] overflow-hidden rounded-3xl shadow-xl shadow-[var(--glass-shadow)]/10">
                  <Image
                    src="/images/hiking_3.jpg"
                    alt={siteCopyContent.experiences.metadata.title}
                    fill
                    priority
                    fetchPriority="high"
                    className="object-cover object-[30%_center] transition-transform duration-1000 hover:scale-105"
                    sizes="(max-width: 1024px) 50vw, 30vw"
                  />
                </div>
              </Reveal>

              {/* Right Column: Top Square Image */}
              <Reveal delay={200}>
                <div className="media-frame relative min-h-[10rem] md:min-h-[17.5rem] overflow-hidden rounded-3xl shadow-md">
                  <Image
                    src="/images/hiking_4.webp"
                    alt={siteCopyContent.experiences.metadata.title}
                    fill
                    className="object-cover transition-transform duration-1000 hover:scale-105"
                    sizes="(max-width: 1024px) 50vw, 20vw"
                  />
                </div>
              </Reveal>

              {/* Right Column: Bottom Square Image */}
              <Reveal delay={300}>
                <div className="media-frame relative min-h-[10rem] md:min-h-[17.5rem] overflow-hidden rounded-3xl shadow-md">
                  <Image
                    src="/images/hiking_1.jpg"
                    alt={siteCopyContent.experiences.metadata.title}
                    fill
                    className="object-cover transition-transform duration-1000 hover:scale-105"
                    sizes="(max-width: 1024px) 50vw, 20vw"
                  />
                </div>
              </Reveal>

            </div>
          </div>
        </div>
      </section>

      {/* Things To Do Section */}
      <section id="things-to-do" className="py-8 sm:py-16">
        <div className="shell-container space-y-12">
          <Reveal className="max-w-3xl">
            <SectionHeading
              eyebrow={siteCopyContent.experiences.thingsToDo.eyebrow}
              title={siteCopyContent.experiences.thingsToDo.title}
              description={siteCopyContent.experiences.thingsToDo.description}
            />
          </Reveal>

          {siteConfig.features.showLocalExperienceMap ? (
            <Reveal className="pt-4 sm:pt-8">
              <div className="mx-auto max-w-[1400px] px-2 sm:px-0">
                <div id="map" className="media-frame relative h-[500px] w-full overflow-hidden rounded-3xl shadow-xl shadow-[var(--glass-shadow)]/10 ring-1 ring-[var(--glass-border)]">
                  <LocationMap />
                </div>
              </div>
            </Reveal>
          ) : null}

          <Reveal delay={100}>
            <SwipableRow itemCount={thingsToDo.length} className="-mx-8 px-8 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {thingsToDo.map((item) => (
                <div key={item.title} className="min-w-[85%] snap-center sm:min-w-0 h-full">
                  <Panel className="group relative flex h-full flex-col overflow-hidden border border-[var(--glass-border)] bg-[var(--glass-bg)] transition-all duration-300 hover:border-[var(--brand-primary)]/20 hover:shadow-md">
                    <div className="relative h-48 w-full overflow-hidden bg-[var(--muted)]">
                      <Image
                        src={item.image}
                        alt={item.alt}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />

                      {/* Floating Price Badge */}
                      {item.price && (
                        <div className="absolute top-4 right-4 z-10 flex flex-col items-end gap-1.5">
                          <div className="flex items-center gap-2 rounded-full bg-[var(--surface-dark)]/80 px-3 py-1.5 shadow-lg backdrop-blur-md ring-1 ring-white/20">
                            {item.regularPrice && (
                              <span className="text-[10px] font-medium text-white/40 line-through decoration-white/40">
                                {item.regularPrice}
                              </span>
                            )}
                            <span className="text-xs font-bold tracking-tight text-white">
                              {item.price}
                            </span>
                          </div>
                          {item.priceNote && (
                            <div className="rounded-full bg-[var(--brand-primary)]/90 px-2 py-0.5 text-[8px] font-extrabold uppercase tracking-[0.12em] text-white shadow-sm ring-1 ring-black/5">
                              {item.priceNote}
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <div className="mb-3 flex flex-wrap items-center gap-2">
                        {siteConfig.features.showLocalExperienceMap ? (
                          <Link
                            href={`?poi=${encodeURIComponent(item.mapQuery ?? item.title)}#map`}
                            className="group flex w-fit items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--muted)]/50 px-3 py-1.5 text-[var(--brand-primary)] shadow-sm ring-1 ring-[var(--brand-primary)]/5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--brand-primary)]/20 hover:bg-[var(--brand-primary)] hover:text-white hover:shadow-md"
                          >
                            <MapPin className="size-3.5 transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110" strokeWidth={2} />
                            <span className="text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">
                              View on Our Local Map
                            </span>
                          </Link>
                        ) : null}
                        {item.showDirections !== false && (
                          <a
                            href={
                              item.title === "Theth to Valbona Trek"
                                ? (siteConfig.maps?.thethTrailheadUrl || "")
                                : `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(item.title + ' Shkoder')}`
                            }
                            target="_blank"
                            rel="noreferrer"
                            className="group ml-auto flex size-8 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--muted)]/50 text-[var(--text-muted)] transition-all duration-300 hover:border-[var(--brand-primary)]/30 hover:bg-[var(--brand-primary-light)] hover:text-[var(--brand-primary)] hover:shadow-sm"
                            title="Open in Google Maps"
                          >
                            <Navigation className="size-4" strokeWidth={2.5} />
                          </a>
                        )}
                      </div>
                      <h3 className="mb-2 heading-item text-[var(--text-heading)]">
                        {item.title}
                      </h3>
                      <p 
                        className="text-card-body text-[var(--text-body-subtle)]"
                        dangerouslySetInnerHTML={{ __html: item.description }}
                      />
                      {item.ctaUrl && (
                        <div className="mt-auto pt-6">
                          <Link
                            href={item.ctaUrl}
                            className={cn(
                              "group/btn flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-[13px] font-bold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]",
                              "bg-[var(--brand-primary)] shadow-[var(--brand-primary)]/20 hover:bg-[var(--brand-primary-dark)]"
                            )}
                          >
                            <span>{item.ctaLabel || "Learn More"}</span>
                            <Navigation className="size-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                          </Link>
                        </div>
                      )}
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

      {/* Local Texture Section */}
      <section id="social-connection" className="py-8 sm:py-16">
        <div className="shell-container space-y-12">

          {/* Section Header */}
          <Reveal className="max-w-3xl">
            <SectionHeading
              eyebrow={siteCopyContent.experiences.socialConnection.eyebrow}
              title={siteCopyContent.experiences.socialConnection.title}
              description={siteCopyContent.experiences.socialConnection.description}
            />
          </Reveal>

          <Reveal delay={100}>
            <SwipableRow
              itemCount={3}
              className="-mx-8 px-8 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {socialConnectionFeatures.map((item) => {
                const Icon = resolveIcon(item.icon);
                return (
                  <div key={item.title} className="min-w-[85%] snap-center sm:min-w-0 h-full" >
                    <Panel
                      className="group relative flex h-full flex-col overflow-hidden border border-[var(--glass-border)] bg-[var(--glass-bg)] transition-all duration-300 hover:border-[var(--brand-primary)]/20 hover:shadow-md"
                    >
                      {/* Card Image Header */}
                      <div className="relative h-56 w-full overflow-hidden bg-[var(--muted)]">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          style={{ objectPosition: item.focus || "center" }}
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>

                      {/* Card Content Area */}
                      <div className="flex flex-1 flex-col px-8 pb-8">
                        {/* Floating Icon Box (Overlaps the image and background) */}
                        <div className="relative -mt-6 mb-6 flex size-12 items-center justify-center rounded-2xl bg-[var(--glass-bg)] text-[var(--text-body)] shadow-lg shadow-[var(--glass-shadow)]/10 transition-all duration-300 group-hover:-rotate-3 group-hover:scale-110 group-hover:bg-[var(--brand-primary-light)] group-hover:text-[var(--brand-primary)]">
                          <Icon className="size-5" strokeWidth={1.5} />
                        </div>

                        <h3 className="mb-3 heading-item text-[var(--text-heading)]">
                          {item.title}
                        </h3>
                        <p className="text-card-body text-[var(--text-body-subtle)]">
                          {item.description}
                        </p>
                      </div>
                    </Panel>
                  </div>
                )
              })}
              {/* Trailing Spacer for mobile snapping */}
              <div className="w-12 flex-shrink-0 sm:hidden" aria-hidden="true" />
            </SwipableRow>
          </Reveal>
        </div>
      </section>

      <section className="py-8 sm:py-16">
        <div className="shell-container">
          <CtaStrip
            eyebrow={siteCopyContent.experiences.planStay.eyebrow}
            title={siteCopyContent.experiences.planStay.title}
            description={siteCopyContent.experiences.planStay.description}
            image="/images/rooftop_social_3.webp"
            alt={siteConfig.name}
            imageClassName="object-[60%_100%]"
            bookingChannels={bookingChannels}
            contactChannels={contactChannels}
          />
        </div>
      </section>
    </>
  );
}
