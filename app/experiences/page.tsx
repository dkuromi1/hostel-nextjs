import Image from "next/image";
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
} from "lucide-react";

import { CtaStrip } from "@/components/cta-strip";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { StructuredData } from "@/components/structured-data";
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
  image: "/images/rooftop_social2.jpg",
});

const icons = [Waves, Bike, UtensilsCrossed];

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
                  description: "Return from the mountains to a guaranteed hot shower, A/C, crisp linens, and a cold drink on the rooftop.",
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

      {/* Local Texture Section */}
      <section className="py-8 sm:py-16">
        <div className="shell-container space-y-12">

          {/* Section Header */}
          <Reveal className="max-w-3xl">
            <SectionHeading
              eyebrow="Connection & Discovery"
              title="Local Texture"
              description="Skip the forced hostel itinerary. We offer a grounded atmosphere where meeting people and discovering the city’s character happens at your own pace."
            />
          </Reveal>

          {/* Premium 3-Column Image Grid */}
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "The Drin River Escape",
                description: "Just outside the city, the Drin river offers a slow, scenic contrast to the Alps. We help arrange simple boat excursions for a quiet, sun-drenched afternoon on the water.",
                icon: Waves,
                image: "/images/drin_swimming_trip2.jpeg",
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
                description: "Shkodër is best explored on two wheels. Grab an on-site rental and navigate the flat streets, historic center, and scenic lake paths exactly how the locals do.",
                icon: Bike,
                image: "/images/biking_in_shkodra.jpeg",
                focus: "50% 40%",
              },
            ].map((item, index) => (
              <Reveal key={item.title} delay={index * 100} className="h-full">
                <Panel
                  className="group relative flex h-full flex-col overflow-hidden border border-slate-200 bg-white transition-all duration-500 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl hover:shadow-emerald-900/5"
                >
                  {/* The Premium Hover Accent Line */}
                  <div className="absolute left-0 top-0 z-20 h-1 w-0 bg-emerald-500 transition-all duration-500 ease-out group-hover:w-full" />

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
                    <div className="relative -mt-6 mb-6 flex size-12 items-center justify-center rounded-2xl bg-white text-slate-600 shadow-lg shadow-slate-200/50 transition-colors duration-500 group-hover:bg-emerald-50 group-hover:text-emerald-600">
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

      {/* Things To Do Section */}
      <section className="py-8 sm:py-16 bg-slate-50/50">
        <div className="shell-container space-y-12">
          <Reveal className="max-w-3xl">
            <SectionHeading
              eyebrow="Beyond the Hostel"
              title="Things to do in Shkodër"
              description="Whether you have an afternoon to kill before your hike or a few days to wander, here’s what makes the city worth sticking around for."
            />
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {thingsToDo.map((item, index) => (
              <Reveal key={item.title} delay={index * 100} className="h-full">
                <Panel className="group relative flex h-full flex-col overflow-hidden border border-slate-200 bg-white transition-all duration-500 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl">
                  <div className="absolute left-0 top-0 z-20 h-1 w-0 bg-sky-500 transition-all duration-500 ease-out group-hover:w-full" />
                  
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
                    <div className="mb-3 flex items-center gap-2 text-sky-700">
                      <MapPin className="size-4" strokeWidth={2} />
                      <span className="text-[10px] font-bold uppercase tracking-widest">
                        Local Spot
                      </span>
                    </div>
                    <h3 className="mb-2 font-heading text-xl leading-tight tracking-tight text-slate-900">
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
        <div className="shell-container grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal className="space-y-8">
            <SectionHeading
              eyebrow="The Vibe"
              title="Social enough to connect, calm enough to actually enjoy it."
              description="The rooftop is the place where conversations start, plans get made, and the whole stay finds its rhythm. It feels welcoming instead of overwhelming."
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Panel className="px-5 py-5">
                <Sunset className="size-5 text-emerald-700" strokeWidth={1.8} />
                <p className="mt-4 font-heading text-xl leading-none tracking-[-0.04em] text-slate-950">
                  Sunset is the real daily event
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Mountain light, city roofs, and the easy transition from day
                  trips to dinner plans make the terrace a natural meeting point.
                </p>
              </Panel>
              <Panel className="px-5 py-5">
                <ShieldCheck
                  className="size-5 text-emerald-700"
                  strokeWidth={1.8}
                />
                <p className="mt-4 font-heading text-xl leading-none tracking-[-0.04em] text-slate-950">
                  Great for solo travelers
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  The social tone is warm and safe, without the pressure to turn
                  every night into a party.
                </p>
              </Panel>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <Panel className="overflow-hidden">
              <div className="relative min-h-[32rem]">
                <Image
                  src="/images/rooftop_view_3.jpg"
                  alt="Rooftop view from terrace at Scodrinon Hostel"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 48vw"
                />
              </div>
            </Panel>
          </Reveal>
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
