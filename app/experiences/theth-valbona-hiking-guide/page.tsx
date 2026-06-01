import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
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

function isHikingGuideEnabled() {
  return Boolean(siteConfig.features.showRegionalTrails && hikingGuide?.metadata && hikingGuide?.hero);
}

export function generateMetadata() {
  if (!isHikingGuideEnabled()) {
    return {};
  }

  return buildMetadata({
    title: hikingGuide.metadata.title,
    description: hikingGuide.metadata.description,
    path: "/experiences/theth-valbona-hiking-guide",
    image: hikingGuide.metadata.image,
  });
}

export default function HikingGuidePage() {
  if (!isHikingGuideEnabled()) {
    notFound();
  }

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
          <div className="grid grid-cols-2 gap-[var(--layout-grid-gutter)] md:grid-cols-4">
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

      {/* Seasonal Safety Warning */}
      <section className="pb-8 sm:pb-16">
        <div className="shell-container">
          <Reveal>
            <Panel className="border-rose-200 bg-rose-50/50 p-6 dark:border-rose-900/50 dark:bg-rose-900/20">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-6">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-400">
                  {/* We use AlertTriangle if available, otherwise fallback to Info style with Rose color */}
                  <div className="text-2xl font-bold">!</div>
                </div>
                <div>
                  <SectionLabel variant="rose" className="mb-2">Seasonal Safety Warning</SectionLabel>
                  <h2 className="heading-item font-bold text-rose-950 dark:text-rose-100">Dangerous Conditions Outside Summer</h2>
                  <div className="mt-3 space-y-3 text-body-lg leading-relaxed text-rose-900/90 dark:text-rose-300/90">
                    <p>
                      Between <strong>October and June</strong>, the Valbona Pass (1,800m) is frequently covered in deep snow and ice. Outside the peak summer window, the standard trail markings often become invisible and the terrain becomes extremely hazardous.
                    </p>
                    <p>
                      The descent toward Valbona involves crossing steep, exposed slopes where a slip can be fatal without specialized winter equipment and expertise.
                    </p>
                    <p className="font-bold text-rose-950 dark:text-rose-50">
                      If you are visiting in the shoulder season, you MUST check current pass conditions (our hostel staff can provide info), or hire a local mountain guide before attempting the trek.
                    </p>
                  </div>
                </div>
              </div>
            </Panel>
          </Reveal>
        </div>
      </section>

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
        <section className="py-[var(--layout-section-spacing)] bg-[var(--muted)]/20">
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
      <section className="py-[var(--layout-section-spacing)] bg-[var(--muted)]/30">
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
                  <div className="flex flex-col gap-4 sm:flex-row mt-2">
                    <a
                      href={`https://wa.me/${siteConfig.phoneRaw}?text=${encodeURIComponent(hikingGuide.labels.whatsAppMessage)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 rounded-xl bg-[var(--brand-whatsapp)] px-8 py-4 font-bold text-white shadow-whatsapp transition-all duration-300 hover:scale-[1.02] hover:bg-[var(--brand-whatsapp-dark)]"
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
