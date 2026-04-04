import Image from "next/image";
import {
  Compass,
  Film,
  Mountain,
  ShieldCheck,
  Sunset,
  UtensilsCrossed,
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
import { eventCards, experiencePillars } from "@/lib/site-data";

export const metadata = buildMetadata({
  title: "Rooftop Events And Adventure Base In Shkoder",
  description:
    "See how Scodrinon Hostel works as a social rooftop hangout and a launch point for Theth, Valbona, Lake Shkoder, river trips, and city culture.",
  path: "/experiences",
  image: "/images/rooftop_social2.png",
});

const icons = [Compass, Mountain, UtensilsCrossed, Film];

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

      <PageHero
        eyebrow="Experiences"
        title="A hostel stay that sits comfortably between rooftop calm and full-day adventure."
        description="Shkoder already has the right mix of city energy and access to nature. Scodrinon makes that even easier with a rooftop social hub, local events, and practical help for northbound plans."
        highlights={[
          "Rooftop movie nights and relaxed social energy",
          "Bike tours, walking tours, and traditional food events",
          "Easy planning for Theth, Valbona, lakes, and rivers",
          "A safe base on the city's main pedestrian street",
        ]}
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div className="media-frame relative min-h-[24rem] md:row-span-2">
            <Image
              src="/images/rooftop_social2.png"
              alt="Guests socializing on the Scodrinon Hostel rooftop"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>
          <div className="media-frame relative min-h-[15rem]">
            <video
              className="h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              aria-label="Short video of the hostel atmosphere"
            >
              <source src="/videos/videoplayback2.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="media-frame relative min-h-[15rem]">
            <Image
              src="/images/rooftop_view_day2.jpg"
              alt="View over Shkoder from the rooftop"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 25vw"
            />
          </div>
        </div>
      </PageHero>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
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
                  Good for solo travelers
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
                  src="/images/rooftop_2.jpg"
                  alt="Rooftop terrace at Scodrinon Hostel"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 48vw"
                />
              </div>
            </Panel>
          </Reveal>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="shell-container space-y-10">
          <SectionHeading
            eyebrow="Hostel Events"
            title="Low-pressure ways to meet people and understand the city."
            description="The event mix keeps things social and grounded in the place: more local texture, less forced entertainment."
          />
          <div className="grid gap-4 md:grid-cols-2">
            {eventCards.map((event, index) => {
              const Icon = icons[index];

              return (
                <Reveal key={event.title} delay={index * 70}>
                  <Panel className="overflow-hidden">
                    <div className="grid gap-0 sm:grid-cols-[0.95fr_1.05fr]">
                      <div className="relative min-h-[16rem]">
                        <Image
                          src={event.image}
                          alt={event.alt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, 25vw"
                        />
                      </div>
                      <div className="p-5">
                        <Icon className="size-5 text-emerald-700" strokeWidth={1.8} />
                        <h2 className="mt-4 font-heading text-2xl leading-none tracking-[-0.04em] text-slate-950">
                          {event.title}
                        </h2>
                        <p className="mt-3 text-sm leading-7 text-slate-600">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  </Panel>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="shell-container grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <Panel className="p-6 sm:p-8">
              <SectionHeading
                eyebrow="Adventure Basecamp"
                title="Use Shkoder as the smart start for northbound travel."
                description="Scodrinon sits in exactly the right place for travelers who want a city base before a hike, a lake day, or a longer move through the region."
              />
              <div className="mt-8 grid gap-3">
                {experiencePillars.map((pillar) => (
                  <div
                    key={pillar.title}
                    className="rounded-2xl bg-slate-50 px-4 py-4 text-sm leading-7 text-slate-700"
                  >
                    <p className="font-heading text-lg leading-none tracking-[-0.03em] text-slate-950">
                      {pillar.title}
                    </p>
                    <p className="mt-2">{pillar.description}</p>
                  </div>
                ))}
              </div>
            </Panel>
          </Reveal>

          <Reveal delay={120}>
            <div className="grid gap-4">
              <div className="media-frame relative min-h-[18rem]">
                <Image
                  src="/images/rooftop_view_day.jpg"
                  alt="Day view from the rooftop at Scodrinon Hostel"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 38vw"
                />
              </div>
              <div className="media-frame relative min-h-[18rem]">
                <Image
                  src="/images/street.jpg"
                  alt="Street life outside Scodrinon Hostel on Kole Idromeno"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 38vw"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="shell-container">
          <CtaStrip
            eyebrow="Plan The Stay"
            title="Send your dates and let the hostel help shape the rest."
            description="You can book the bed and ask about hikes, bike rides, river excursions, or the easiest onward route in the same WhatsApp conversation."
            image="/images/rooftop_social.jpg"
            alt="Guests on the Scodrinon Hostel rooftop"
          />
        </div>
      </section>
    </>
  );
}
