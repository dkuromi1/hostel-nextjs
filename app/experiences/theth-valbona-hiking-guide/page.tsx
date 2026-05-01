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
          { name: "Theth to Valbona Hiking Guide", path: "/experiences/theth-valbona-hiking-guide" },
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
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {hikingGuide.quickStats.map((stat, i) => {
              const Icon = resolveIcon(stat.icon);
              return (
                <Reveal key={stat.label} delay={i * 100}>
                  <Panel className="flex flex-col items-center gap-3 p-5 text-center shadow-lg backdrop-blur-xl dark:border-white/10">
                    <div className="flex size-10 items-center justify-center rounded-full bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] dark:bg-[var(--brand-primary)]/20">
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-body-subtle)] dark:text-slate-400">
                        {stat.label}
                      </p>
                      <p className="mt-1 font-heading text-xl font-bold text-[var(--text-heading)]">
                        {stat.value}
                      </p>
                    </div>
                  </Panel>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Logistics Section */}
      <section className="py-8 sm:py-16">
        <div className="shell-container">
          <div className="grid gap-12 lg:grid-cols-[0.45fr_0.55fr] lg:items-start">
            <Reveal className="space-y-6">
              <SectionLabel variant="sky">TRANSPORT</SectionLabel>
              <h2 className="heading-section text-[var(--text-heading)]">
                {hikingGuide.logistics.title}
              </h2>
              <p className="text-section-desc">
                {hikingGuide.logistics.description}
              </p>
            </Reveal>
            <LogisticsSteps steps={hikingGuide.logistics.steps} />
          </div>
        </div>
      </section>

      {/* Itinerary Section */}
      {hikingGuide.itinerary && (
        <section className="py-8 sm:py-16 bg-[var(--muted)]/20">
          <div className="shell-container">
            <Reveal className="mb-12">
              <SectionLabel variant="emerald" className="mb-6">ROUTE PLAN</SectionLabel>
              <h2 className="heading-section text-[var(--text-heading)]">{hikingGuide.itinerary.title}</h2>
              <p className="mt-4 max-w-2xl text-lg text-[var(--text-body-subtle)]">
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
      <section className="py-8 sm:py-16 bg-[var(--muted)]/30">
        <div className="shell-container sm:px-6 lg:px-8">
          <Reveal className="mb-12">
            <SectionLabel variant="sky" className="mb-6">INTERACTIVE MAP</SectionLabel>
            <h2 className="heading-section text-[var(--text-heading)]">{hikingGuide.labels.trailTitle}</h2>
            <p className="text-section-desc mt-4 max-w-2xl">
              {hikingGuide.labels.trailDescription}
            </p>
          </Reveal>
          <Reveal className="px-2 sm:px-0">
            <Panel className="h-[500px] w-full overflow-hidden p-0 rounded-3xl">
              <LocationMap defaultPoi="theth-valbona-midpoint" variant="regional" />
            </Panel>
          </Reveal>
        </div>
      </section>

      {/* Packing List */}
      {hikingGuide.packingList && (
        <section className="py-8 sm:py-16">
          <div className="shell-container">
            <Reveal className="mb-12">
              <SectionLabel variant="sky" className="mb-6">GEAR</SectionLabel>
              <h2 className="heading-section text-[var(--text-heading)]">{hikingGuide.packingList.title}</h2>
              <p className="mt-4 max-w-2xl text-lg text-[var(--text-body-subtle)]">
                {hikingGuide.packingList.description}
              </p>
            </Reveal>
            <PackingList categories={hikingGuide.packingList.categories} />
          </div>
        </section>
      )}

      {/* Luggage Feature */}
      <section className="py-8 sm:py-16">
        <div className="shell-container">
          <Reveal>
            <Panel className="overflow-hidden bg-[var(--surface-dark)] p-0 text-white">
              <div className="grid md:grid-cols-[1fr_0.8fr]">
                <div className="flex flex-col justify-center gap-6 p-10 sm:p-16">
                  <SectionLabel colorScheme="light" className="text-sky-400">Logistics Priority</SectionLabel>
                  <h2 className="heading-section text-white">
                    {hikingGuide.luggage.title}
                  </h2>
                  <p className="text-lg leading-relaxed text-white/80">
                    {hikingGuide.luggage.description}
                  </p>
                  <div className="flex flex-col gap-4 sm:flex-row mt-2">
                    <a
                      href={`https://wa.me/${siteConfig.phoneRaw}?text=${encodeURIComponent(hikingGuide.labels.whatsAppMessage)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 rounded-xl bg-[var(--brand-primary)] px-8 py-4 font-bold text-white shadow-lg transition-transform hover:scale-102"
                    >
                      Book via WhatsApp
                    </a>
                    <Link
                      href="/experiences"
                      className="flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-8 py-4 font-bold text-white backdrop-blur-sm transition-transform hover:scale-102 hover:bg-white/20"
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
