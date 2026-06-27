import Link from "next/link";
import Image from "next/image";
import { resolveIcon } from "@/lib/icon-registry";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { Panel } from "@/components/ui/panel";
import { SectionLabel } from "@/components/ui/section-label";
import { StructuredData } from "@/components/structured-data";
import { LocationMap } from "@/components/location-map";
import { LogisticsSteps } from "@/components/hiking/logistics-steps";
import { ItineraryDays } from "@/components/hiking/itinerary-days";
import { PackingList } from "@/components/hiking/packing-list";
import { buildBreadcrumbSchema, buildMetadata } from "@/lib/metadata";
import { hikingGuide, siteConfig } from "@/lib/site-data";
import { SeasonalSafetyWarning } from "./seasonal-warning";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export const metadata = buildMetadata({
  title: hikingGuide.metadata.title,
  description: hikingGuide.metadata.description,
  path: "/experiences/theth-valbona-hiking-guide",
  image: hikingGuide.metadata.image,
});

export default function HikingGuidePage() {
  return (
    <>
      <StructuredData
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Experiences", path: "/experiences" },
          { name: "Valbona to Theth Hiking Guide", path: "/experiences/theth-valbona-hiking-guide" },
        ])}
      />

      <PageHero
        eyebrow={hikingGuide.hero.eyebrow}
        title={hikingGuide.hero.title}
        description={hikingGuide.hero.description}
        hideActions={true}
      >
        <div className="media-frame relative aspect-[3/2] w-full overflow-hidden rounded-3xl shadow-xl">
          <Image
            src={hikingGuide.metadata.image}
            alt={hikingGuide.metadata.title}
            fill
            priority
            fetchPriority="high"
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 45vw"
          />
        </div>
      </PageHero>

      {/* Quick Stats Bar */}
      <section className="relative z-20 pb-8 sm:pb-16">
        <div className="shell-container">
          {(() => {
            const STAT_PALETTE = [
              { icon: "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400", hover: "group-hover:bg-emerald-500 group-hover:text-white group-hover:shadow-emerald-400/30", line: "via-emerald-500/50" },
              { icon: "bg-sky-50 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400",                hover: "group-hover:bg-sky-500 group-hover:text-white group-hover:shadow-sky-400/30",       line: "via-sky-500/50" },
              { icon: "bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",        hover: "group-hover:bg-amber-500 group-hover:text-white group-hover:shadow-amber-400/30",   line: "via-amber-500/50" },
              { icon: "bg-rose-50 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400",            hover: "group-hover:bg-rose-500 group-hover:text-white group-hover:shadow-rose-400/30",     line: "via-rose-500/50" },
            ];
            return (
              <div className="grid grid-cols-2 gap-[var(--layout-grid-gutter)] md:grid-cols-4">
                {hikingGuide.quickStats.map((stat, i) => {
                  const Icon = resolveIcon(stat.icon);
                  const c = STAT_PALETTE[i % STAT_PALETTE.length];
                  return (
                    <Reveal key={stat.label} delay={i * 100}>
                      <Panel className="group relative flex flex-col items-center gap-4 overflow-hidden p-4 text-center transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl">
                        <div className={`absolute inset-x-0 top-0 h-0.5 rounded-t-2xl bg-gradient-to-r from-transparent ${c.line} to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />
                        <div className={`flex size-14 items-center justify-center rounded-2xl shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg ${c.icon} ${c.hover}`}>
                          <Icon className="size-6" />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                            {stat.label}
                          </p>
                          <p className="mt-1.5 font-heading text-2xl font-extrabold tracking-tight text-[var(--text-heading)]">
                            {stat.value}
                          </p>
                        </div>
                      </Panel>
                    </Reveal>
                  );
                })}
              </div>
            );
          })()}
        </div>
      </section>


      {/* Seasonal Safety Warning */}
      <SeasonalSafetyWarning />

      {/* Logistics Section */}
      <section className="py-[var(--layout-section-spacing)]">
        <div className="shell-container">
          <div className="grid gap-12 lg:grid-cols-[0.45fr_0.55fr] lg:items-start">
            <Reveal className="space-y-6 lg:sticky lg:top-32">
              <SectionLabel variant="sky">TRANSPORT</SectionLabel>
              <h2 className="heading-section text-[var(--text-heading)]">
                {hikingGuide.logistics.title}
              </h2>
              <p className="text-section-desc">
                {hikingGuide.logistics.description}
              </p>
            </Reveal>
            <div className="lg:sticky lg:top-32">
              <LogisticsSteps steps={hikingGuide.logistics.steps} />
            </div>
          </div>
        </div>
      </section>

      {/* Itinerary Section */}
      {hikingGuide.itinerary && (
        <section className="section-muted py-[var(--layout-section-spacing)]">
          <div className="shell-container">
            <Reveal className="mb-12">
              <SectionLabel variant="emerald" className="mb-6">ROUTE PLAN</SectionLabel>
              <h2 className="heading-section text-[var(--text-heading)]">{hikingGuide.itinerary.title}</h2>
              <p className="mt-4 max-w-2xl text-section-desc text-[var(--text-body-subtle)]">
                {hikingGuide.itinerary.description}
              </p>
            </Reveal>
            <div className="max-w-4xl">
              <ItineraryDays days={hikingGuide.itinerary.days} />
            </div>
          </div>
        </section>
      )}

      {/* Map Section */}
      <section className="py-[var(--layout-section-spacing)]">
        <div className="shell-container">
          <Reveal className="mb-12">
            <SectionLabel variant="sky" className="mb-6">INTERACTIVE MAP</SectionLabel>
            <h2 className="heading-section text-[var(--text-heading)]">{hikingGuide.labels.trailTitle}</h2>
            <p className="text-section-desc mt-4 max-w-2xl">
              {hikingGuide.labels.trailDescription}
            </p>
          </Reveal>
          <Reveal className="px-2 sm:px-0">
            <Panel className="h-[500px] w-full overflow-hidden p-0 rounded-3xl">
              <LocationMap defaultPoi="valbona-theth-midpoint" variant="regional" />
            </Panel>
          </Reveal>
        </div>
      </section>

      {/* Packing List */}
      {hikingGuide.packingList && (
        <section className="py-[var(--layout-section-spacing)]">
          <div className="shell-container">
            <Reveal className="mb-12">
              <SectionLabel variant="sky" className="mb-6">GEAR</SectionLabel>
              <h2 className="heading-section text-[var(--text-heading)]">{hikingGuide.packingList.title}</h2>
              <p className="mt-4 max-w-2xl text-section-desc text-[var(--text-body-subtle)]">
                {hikingGuide.packingList.description}
              </p>
            </Reveal>
            <PackingList categories={hikingGuide.packingList.categories} />
          </div>
        </section>
      )}

      {/* Luggage Feature */}
      <section className="py-[var(--layout-section-spacing)]">
        <div className="shell-container">
          <Reveal>
            <Panel className="overflow-hidden bg-[var(--surface-dark)] p-0 text-white">
              <div className="grid md:grid-cols-[1fr_0.8fr]">
                <div className="flex flex-col justify-center gap-6 p-10 sm:p-16">
                  <SectionLabel colorScheme="light" className="text-sky-400">Logistics Priority</SectionLabel>
                  <h2 className="heading-section text-white">
                    {hikingGuide.luggage.title}
                  </h2>
                  <p className="text-section-desc leading-relaxed text-white/80">
                    {hikingGuide.luggage.description}
                  </p>
                  <div className="flex flex-col gap-3 sm:flex-row mt-2">
                    <a
                      href={`https://wa.me/${siteConfig.phoneRaw}?text=${encodeURIComponent(hikingGuide.labels.whatsAppMessage)}`}
                      target="_blank"
                      rel="noreferrer"
                      className={cn(
                        buttonVariants({ variant: "whatsapp", size: "lg" }),
                        "h-auto min-h-12 rounded-full px-5 py-3 text-sm font-bold transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-whatsapp flex items-center justify-center gap-2"
                      )}
                    >
                      Book via WhatsApp
                    </a>
                    <Link
                      href="/experiences"
                      className={cn(
                        buttonVariants({ variant: "ghost", size: "lg" }),
                        "h-auto min-h-12 rounded-full px-5 py-3 text-sm font-bold transition-all duration-300 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 border border-white/20 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 hover:border-white/50"
                      )}
                    >
                      All Experiences
                    </Link>
                  </div>
                </div>
                <div className="relative min-h-[300px]">
                  <Image
                    src="/images/room_18bed2.jpg"
                    alt="Luggage storage at Scodrinon Hostel"
                    fill
                    className="object-cover opacity-80"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent" />
                </div>
              </div>
            </Panel>
          </Reveal>
        </div>
      </section>


    </>
  );
}
