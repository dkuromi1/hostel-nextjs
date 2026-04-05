import Image from "next/image";
import {
  Snowflake,
  BatteryCharging,
  LampDesk,
  Lock,
  Wifi,
  ShowerHead
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
import {
  freeServices,
  paidServices,
  roomTypes,
  sharedAmenities,
} from "@/lib/site-data";

export const metadata = buildMetadata({
  title: "Rooms And Privacy Pods In Shkoder",
  description:
    "See the privacy pod dorm and four-bed dorm options at Scodrinon Hostel, plus breakfast, WiFi, lockers, air-con, and other included amenities.",
  path: "/rooms",
  image: "/images/room_18bed2.jpg",
});

const roomIcons = [Snowflake, Lock, LampDesk, BatteryCharging, Wifi, ShowerHead];

export default function RoomsPage() {
  return (
    <>
      <StructuredData
        data={[
          buildHostelSchema(),
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Rooms", path: "/rooms" },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Rooms"
        title="Sleep like you booked a thoughtful hostel, not a compromise."
        description="Scodrinon keeps the comfort side of the stay strong: privacy pods, smaller dorm options, clean shared bathrooms, breakfast, and the essentials that matter when you are traveling for real."
        highlights={[
          "Curtained privacy pods in the mixed dorm",
          "Four-bed dorms with male and female options",
          "Air-con, lockers, reading lights, sockets, and WiFi",
          "Breakfast included every morning",
        ]}
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div className="media-frame relative min-h-[22rem] md:row-span-2">
            <Image
              src="/images/room_18bed2.jpg"
              alt="18-bed privacy pod dorm at Scodrinon Hostel, Shkoder"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>
          <div className="media-frame relative min-h-[14rem]">
            <Image
              src="/images/room_4bed_m.jpg"
              alt="Four-bed dorm room at Scodrinon Hostel, Shkoder"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 25vw"
            />
          </div>
          <div className="glass-panel rounded-[28px] p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-emerald-700">
              Hotel Privacy, Hostel Price
            </p>
            <p className="mt-3 font-heading text-2xl leading-none tracking-[-0.04em] text-slate-950">
              The great dorms are one of the reasons so many people start with two nights
              and extend.
            </p>
          </div>
        </div>
      </PageHero>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="shell-container space-y-10">
          <SectionHeading
            eyebrow="Choose Your Setup"
            title="Two room styles, both built around a better night's sleep."
            description="You can stay social without giving up your own space. The pod dorm leans into privacy; the four-bed rooms lean into calm."
          />
          <div className="grid gap-6 lg:grid-cols-2">
            {roomTypes.map((room, index) => (
              <Reveal key={room.name} delay={index * 100}>
                <Panel className="overflow-hidden">
                  <div className="relative min-h-[19rem]">
                    <Image
                      src={room.image}
                      alt={room.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                  <div className="space-y-5 p-6">
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] text-emerald-700">
                        {room.label}
                      </p>
                      <h2 className="mt-3 font-heading text-3xl leading-none tracking-[-0.05em] text-slate-950">
                        {room.name}
                      </h2>
                      <p className="mt-3 text-base leading-8 text-slate-600">
                        {room.description}
                      </p>
                    </div>
                    <ul className="grid gap-3">
                      {room.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="rounded-2xl bg-slate-50 px-4 py-3 text-sm leading-7 text-slate-700"
                        >
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Panel>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="shell-container grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal className="space-y-8">
            <SectionHeading
              eyebrow="Privacy Pod Details"
              title="The pod dorm works because it feels more personal than a standard shared room."
              description="Curtains cut down the visual noise. Reading lights let you stay on your own rhythm. Power sockets and lockers stay within reach. The result is more rest and less compromise."
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {sharedAmenities.slice(0, 6).map((item, index) => {
                const Icon = roomIcons[index];

                return (
                  <Panel key={item} className="px-5 py-5">
                    <Icon className="size-5 text-emerald-700" strokeWidth={1.8} />
                    <p className="mt-4 text-sm leading-7 text-slate-700">{item}</p>
                  </Panel>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="grid gap-4">
              <div className="media-frame relative min-h-[20rem]">
                <Image
                  src="/images/indoor_common_1.jpg"
                  alt="Indoor common area and lounge at Scodrinon Hostel"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 38vw"
                />
              </div>
              <div className="media-frame relative min-h-[18rem]">
                <Image
                  src="/images/indoor_common_2.jpg"
                  alt="Hostel interior seating and common space at Scodrinon"
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
        <div className="shell-container grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <Panel className="p-6 sm:p-8">
              <SectionHeading
                eyebrow="Included In Your Stay"
                title="The daily setup is simple, useful, and traveler-friendly."
                description="The site stays honest about what you get. No padded feature list, just the things that make the stay smoother."
              />
              <div className="mt-8 grid gap-3">
                {freeServices.map((service) => (
                  <div
                    key={service}
                    className="rounded-2xl bg-slate-50 px-4 py-3 text-sm leading-7 text-slate-700"
                  >
                    {service}
                  </div>
                ))}
              </div>
            </Panel>
          </Reveal>

          <Reveal delay={120}>
            <Panel className="p-6 sm:p-8">
              <p className="text-xs uppercase tracking-[0.24em] text-amber-700">
                Extra Help When You Want It
              </p>
              <h2 className="mt-4 font-heading text-4xl leading-none tracking-[-0.05em] text-slate-950">
                Add bikes, tours, or laundry without overcomplicating your stay.
              </h2>
              <div className="mt-8 grid gap-3">
                {paidServices.map((service) => (
                  <div
                    key={service}
                    className="rounded-2xl bg-amber-50 px-4 py-3 text-sm leading-7 text-slate-700"
                  >
                    {service}
                  </div>
                ))}
              </div>
              <div className="mt-8 media-frame relative min-h-[18rem]">
                <Image
                  src="/images/breakfast_1.jpg"
                  alt="Breakfast included at Scodrinon Hostel, Shkoder"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 38vw"
                />
              </div>
            </Panel>
          </Reveal>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="shell-container">
          <CtaStrip
            eyebrow="Book Your Bed"
            title="Tell the team what kind of room you want and lock it in directly."
            description="If you already know your dates, message on WhatsApp and ask for the pod dorm or a four-bed option. Booking.com and Hostelworld stay there if you prefer those platforms."
            image="/images/room_4bed_m.jpg"
            alt="Four-bed dorm room at Scodrinon Hostel, Shkoder"
          />
        </div>
      </section>
    </>
  );
}
