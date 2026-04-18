import Image from "next/image";
import Link from "next/link";
import {
  Waves,
  ShieldCheck,
  Sunset,
  UtensilsCrossed,
  Bike,
  Backpack,
  Bus,
  Mountain,
  Sparkles,
  MapPin,
  Navigation,
} from "lucide-react";

import { CtaStrip } from "@/components/cta-strip";
import { LocationMap } from "@/components/location-map";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { StructuredData } from "@/components/structured-data";
import { SwipableRow } from "@/components/swipable-row";
import { ThethWeather } from "@/components/theth-weather";
import { Panel } from "@/components/ui/panel";
import {
  buildBreadcrumbSchema,
  buildMetadata,
  buildHostelSchema,
} from "@/lib/metadata";
import { thingsToDo } from "@/lib/site-data";

export const metadata = buildMetadata({
  title: "Rooftop Events And Adventure Base In Shkoder",
  description:
    "See how Scodrinon Hostel works as a social rooftop hangout and a launch point for Theth, Valbona, Lake Shkoder, river trips, and city culture.",
  path: "/experiences",
  image: "/images/rooftop_social_2.jpg",
});

const icons = [Waves, Bike, UtensilsCrossed];
const THETH_VALBONA_MAP_QUERY = "theth-valbona-midpoint";
const THETH_SIDE_TRAILHEAD_GOOGLE_MAPS = "https://www.google.com/maps/dir/?api=1&destination=42.397171,19.772164";

export default function ExperiencesPage() {
  return (
    <>
      <StructuredData
        data={[
          buildHostelSchema(),
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Experiences", path: "/experiences" },
          ]),
        ]}
      />

      {/* The Northbound Launchpad */}
      <section className="py-8 sm:py-16">
        <div className="shell-container grid gap-12 lg:grid-cols-12 lg:items-center">

          {/* Left Side: Editorial Context & Logistics */}
          <Reveal className="space-y-10 lg:col-span-5">
            <SectionHeading
              eyebrow="The Northbound Launchpad"
              title="Leave the heavy bags behind and head for the mountains."
              description="We've built Scodrinon to be the ultimate reset point for your Albanian Alps trek. Don't waste a day figuring out schedules—we handle the friction so you can focus on the trail."
            />

            <ThethWeather />

            {/* High-End Feature Rows */}
            <div className="space-y-8">
              {[
                {
                  title: "Free Luggage Storage",
                  description: "Drop your main backpack in our secure storage. Hike the Valbona to Theth trail carrying only what you actually need.",
                  icon: Backpack,
                },
                {
                  title: "Transport & Logistics",
                  description: "We provide honest, up-to-date info on furgon (minibus) schedules, Komani Lake ferries, and Shala River boat trips.",
                  icon: Bus,
                },
                {
                  title: "The Post-Hike Reset",
                  description: "Return from the mountains to a hot shower, A/C, crisp linens, and a cold drink on the rooftop.",
                  icon: Mountain,
                }
              ].map((item, i) => (
                <div
                  key={i}
                  className="group flex items-start gap-5 transition-all duration-300 hover:translate-x-2"
                >
                  {/* Interactive Icon Box */}
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 transition-all duration-300 group-hover:bg-emerald-700 group-hover:text-white group-hover:shadow-lg group-hover:shadow-emerald-600/20">
                    <item.icon className="size-5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="font-heading text-xl tracking-tight text-slate-900">
                      {item.title}
                    </h4>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Right Side: Premium Asymmetrical Image Grid */}
          <div className="grid grid-cols-2 gap-4 lg:col-span-7">

            {/* Left Column: Tall Featured Image */}
            <Reveal className="row-span-2 h-full" delay={100}>
              <div className="media-frame relative h-full min-h-[20rem] md:min-h-[36rem] overflow-hidden rounded-[2rem] shadow-xl shadow-slate-200/50">
                <Image
                  src="/images/hiking_3.jpg"
                  alt="Hiking the Albanian Alps from Shkoder"
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
              <div className="media-frame relative min-h-[10rem] md:min-h-[17.5rem] overflow-hidden rounded-[2rem] shadow-md">
                <Image
                  src="/images/hiking_4.webp"
                  alt="Mountain views in Northern Albania"
                  fill
                  className="object-cover transition-transform duration-1000 hover:scale-105"
                  sizes="(max-width: 1024px) 50vw, 20vw"
                />
              </div>
            </Reveal>

            {/* Right Column: Bottom Square Image */}
            <Reveal delay={300}>
              <div className="media-frame relative min-h-[10rem] md:min-h-[17.5rem] overflow-hidden rounded-[2rem] shadow-md">
                <Image
                  src="/images/hiking_1.jpg"
                  alt="Exploring Lake Shkoder and the rivers"
                  fill
                  className="object-cover transition-transform duration-1000 hover:scale-105"
                  sizes="(max-width: 1024px) 50vw, 20vw"
                />
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* Things To Do Section */}
      <section className="py-8 sm:py-16 bg-slate-50/50">
        <div className="shell-container space-y-12">
          <Reveal className="max-w-3xl">
            <SectionHeading
              eyebrow="Beyond the Hostel"
              title="Things to do in and around Shkodër"
              description="Whether you have an afternoon to kill before your hike or a few days to wander, here’s what makes the city worth sticking around for."
            />
          </Reveal>

          <Reveal className="w-full pt-4 sm:pt-8 w-full max-w-[1400px] mx-auto">
            <div id="map" className="media-frame relative h-[500px] w-full overflow-hidden rounded-[2rem] shadow-xl shadow-slate-200/50 ring-1 ring-slate-200">
              <LocationMap />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <SwipableRow itemCount={thingsToDo.length} className="-mx-8 px-8 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {thingsToDo.map((item, index) => (
                <div key={item.title} className="min-w-[85%] snap-center sm:min-w-0 h-full">
                  <Panel className="group relative flex h-full flex-col overflow-hidden border border-slate-200 bg-white transition-all duration-300 hover:border-sky-500/20 hover:shadow-md">
                    <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                      <Image
                        src={item.image}
                        alt={item.alt}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <div className="mb-3 flex flex-wrap items-center gap-2">
                        <Link
                          href={`?poi=${encodeURIComponent(
                            item.title === "Theth & Valbona Treks"
                              ? THETH_VALBONA_MAP_QUERY
                              : item.title
                          )}#map`}
                          className="group flex w-fit items-center gap-1.5 rounded-full border border-sky-100 bg-sky-50 px-2.5 py-1 text-sky-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-sky-200 hover:bg-sky-100 hover:shadow-sm"
                        >
                          <MapPin className="size-3.5 transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110" strokeWidth={2} />
                          <span className="text-[9px] font-bold uppercase tracking-widest whitespace-nowrap">
                            View on Our Local Map
                          </span>
                        </Link>
                        <a
                          href={
                            item.title === "Theth & Valbona Treks"
                              ? THETH_SIDE_TRAILHEAD_GOOGLE_MAPS
                              : `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(item.title + ' Shkoder')}`
                          }
                          target="_blank"
                          rel="noreferrer"
                          className="group flex w-fit items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-slate-600 transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 hover:shadow-sm"
                        >
                          <Navigation className="size-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.5} />
                          <span className="text-[9px] font-bold uppercase tracking-widest whitespace-nowrap">
                            Directions
                          </span>
                        </a>
                      </div>
                      <h3 className="mb-2 font-heading text-xl leading-tight tracking-tight text-slate-900">
                        {item.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-slate-600">
                        {item.description}
                      </p>
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
      <section className="py-8 sm:py-16">
        <div className="shell-container space-y-12">

          {/* Section Header */}
          <Reveal className="max-w-3xl">
            <SectionHeading
              eyebrow="Local Texture"
              title="Connection & Discovery"
              description="Skip the forced hostel itinerary. We offer a grounded atmosphere where meeting people and discovering the city’s character happens at your own pace."
            />
          </Reveal>

          {/* Premium 3-Column Image Grid */}
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "The Drin River Escape",
                description: "Just outside the city, the Drin river offers a cool, scenic contrast to the Alps. We organize regular group swimming trips to our favorite spots along the water for a perfect, sun-drenched afternoon.",
                icon: Waves,
                image: "/images/drin_swimming_trip2.jpeg",
                focus: "50% 40%",
              },
              {
                title: "Spontaneous Socials",
                description: "Whether it’s rooftop raki or an informal food crawl, we prioritize warm, unscripted moments that make it easy for solo travelers to join. It’s social, but never forced.",
                icon: Sparkles,
                image: "/images/rooftop_social_7.webp",
                focus: "50% 40%",
              },
              {
                title: "Bicycle Capital Access",
                description: "Shkodër is best explored on two wheels. Grab a rental from across the street and navigate the flat streets, historic center, and scenic lake paths exactly how the locals do.",
                icon: Bike,
                image: "/images/biking_in_shkodra.jpeg",
                focus: "50% 40%",
              },
            ].map((item, index) => (
              <Reveal key={item.title} delay={index * 100} className="h-full">
                <Panel
                  className="group relative flex h-full flex-col overflow-hidden border border-slate-200 bg-white transition-all duration-300 hover:border-emerald-500/20 hover:shadow-md"
                >
                  {/* Card Image Header */}
                  <div className="relative h-56 w-full overflow-hidden bg-slate-100">
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
                    {/* Floating Icon Box (Overlaps the image and white background) */}
                    <div className="relative -mt-6 mb-6 flex size-12 items-center justify-center rounded-2xl bg-white text-slate-600 shadow-lg shadow-slate-200/50 transition-all duration-300 group-hover:-rotate-3 group-hover:scale-110 group-hover:bg-emerald-50 group-hover:text-emerald-600">
                      <item.icon className="size-5" strokeWidth={1.5} />
                    </div>

                    <h3 className="mb-3 font-heading text-xl leading-tight tracking-tight text-slate-900">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-600">
                      {item.description}
                    </p>
                  </div>
                </Panel>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-16">
        <div className="shell-container">
          <CtaStrip
            eyebrow="Plan The Stay"
            title="Send your dates and let the hostel help shape the rest."
            description="You can book the bed and ask about hikes, bike rides, river excursions, or the easiest onward route in the same WhatsApp conversation."
            image="/images/rooftop_social_3.webp"
            alt="Guests on the Scodrinon Hostel rooftop"
            imageClassName="object-[60%_100%]"
          />
        </div>
      </section>
    </>
  );
}
