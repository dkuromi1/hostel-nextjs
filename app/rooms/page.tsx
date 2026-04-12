import Image from "next/image";
import {
  Snowflake,
  BatteryCharging,
  LampDesk,
  Lock,
  Wifi,
  ShowerHead,
  Check,
  Blinds,
  Bed,
  Coffee,
} from "lucide-react";

import { CtaStrip } from "@/components/cta-strip";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { StructuredData } from "@/components/structured-data";
import { Badge } from "@/components/ui/badge";
import { Panel } from "@/components/ui/panel";
import { TestimonialCarousel } from "@/components/testimonial-carousel";
import { ImageCarousel } from "@/components/image-carousel";
import {
  buildBreadcrumbSchema,
  buildMetadata,
  buildHostelSchema,
} from "@/lib/metadata";
import {
  freeServices,
  paidServices,
  roomTypes,
  siteConfig,
  podDormImages,
  fourBedDormImages,
} from "@/lib/site-data";
import { testimonials } from "@/lib/site-data";

export const metadata = buildMetadata({
  title: "Rooms And Privacy Pods In Shkoder",
  description:
    "See the privacy pod dorm and four-bed dorm options at Scodrinon Hostel, plus breakfast, WiFi, lockers, air-con, and other included amenities.",
  path: "/rooms",
  image: "/images/room_18bed2.jpg",
});

export default function RoomsPage() {
  const getRoomFeatures = (roomName: string) => {
    if (roomName.includes("18-Bed")) {
      return [
        { icon: Snowflake, label: "A/C & Heat" },
        { icon: Lock, label: "Secure Lockers" },
        { icon: BatteryCharging, label: "2 Power Sockets" },
        { icon: Wifi, label: "High-speed WiFi" },
        { icon: LampDesk, label: "Reading Light" }
      ];
    }
    return [
      { icon: Snowflake, label: "A/C & Heat" },
      { icon: Lock, label: "Secure Lockers" },
      { icon: BatteryCharging, label: "Socket" },
      { icon: Wifi, label: "High-speed WiFi" }
    ];
  };

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
        hideActions={true}
        highlights={[
          { text: "Curtained privacy pods in the mixed dorm", icon: Blinds },
          { text: "Four-bed dorms with male and female options", icon: Bed },
          { text: "A/C and heat, secure lockers, power sockets, and WiFi", icon: Snowflake },
          { text: "All rooms include breakfast every morning", icon: Coffee },
        ]}
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div className="media-frame relative min-h-[22rem] md:row-span-2">
            <Image
              src="/images/rooms_2.jpg"
              alt="Four-bed dorm room at Scodrinon Hostel, Shkoder"
              fill
              className="object-cover"
              priority
              fetchPriority="high"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>
          <div className="media-frame relative min-h-[14rem]">
            <Image
              src="/images/room_18bed2.jpg"
              alt="18-bed privacy pod dorm at Scodrinon Hostel, Shkoder"
              fill
              className="object-cover"
              priority
              fetchPriority="high"
              sizes="(max-width: 768px) 100vw, 25vw"
            />
          </div>
          <div className="glass-panel rounded-[28px] p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-emerald-700">
              Beds From <strong>{roomTypes[0].price} / Night</strong>
            </p>
            <p className="mt-3 font-heading text-2xl leading-none tracking-[-0.04em] text-slate-950">
              Hotel privacy at a hostel price. It's why so many guests book two nights and end up extending.
            </p>
          </div>
        </div>
      </PageHero>

      <section className="py-8 sm:py-16">
        <div className="shell-container space-y-10">
          <SectionHeading
            eyebrow="Choose Your Setup"
            title="Two room styles, both built around a better night's sleep."
            description="You can stay social without giving up your own space. The pod dorm leans into privacy; the four-bed rooms lean into calm."
          />
          <div className="grid gap-8 lg:grid-cols-2">
            {roomTypes.map((room, index) => {
              // Determine which image array to use based on the room name
              const isPodDorm = room.name.includes("18-Bed");
              const carouselImages = isPodDorm ? podDormImages : fourBedDormImages;

              return (
                <Reveal key={room.name} delay={index * 100}>
                  <Panel className="flex h-full flex-col overflow-hidden">

                    {/* Updated Image Carousel Section */}
                    <div className="relative min-h-[22rem]">
                      <ImageCarousel
                        images={carouselImages}
                        className="absolute inset-0 h-full w-full !rounded-none"
                        autoPlayInterval={0}
                      />

                      {/* Gradient overlay - pointer-events-none is crucial here so arrows are clickable! */}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                      {/* Price Badge - pointer-events-none to prevent blocking dots/arrows */}
                      <div className="pointer-events-none absolute left-0 top-0 z-10 p-5 sm:inset-x-0 sm:bottom-0 sm:top-auto sm:px-6 sm:py-4">
                        <Badge className="bg-white/20 text-white shadow-sm backdrop-blur-md pointer-events-auto">
                          {room.price}/night
                        </Badge>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col justify-between p-7 lg:p-9">
                      <div className="space-y-6">
                        <div>
                          <p className="text-xs uppercase tracking-[0.24em] text-emerald-700">
                            {room.label}
                          </p>
                          <h2 className="mt-3 font-heading text-4xl leading-none tracking-[-0.05em] text-slate-950">
                            {room.name}
                          </h2>
                          <p className="mt-4 text-lg leading-8 text-slate-600">
                            {room.description}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {getRoomFeatures(room.name).map((feature, idx) => (
                            <div
                              key={idx}
                              /* Added w-fit and adjusted padding/gap to make them tighter "pills" */
                              className="flex w-fit items-center gap-2 rounded-xl border border-slate-100 bg-slate-50/50 px-3 py-2 text-slate-600"
                            >
                              <feature.icon className="size-3.5 shrink-0 text-emerald-600" />
                              {/* Added whitespace-nowrap to prevent labels like "High-speed WiFi" from breaking internally */}
                              <span className="whitespace-nowrap text-[11px] font-medium tracking-tight">
                                {feature.label}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="space-y-3">
                          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-400">
                            Room Details
                          </p>
                          <ul className="grid gap-3 sm:grid-cols-2">
                            {room.bullets.map((bullet) => (
                              <li
                                key={bullet}
                                className="flex items-start gap-2.5 text-sm leading-6 text-slate-600"
                              >
                                <Check
                                  className="mt-1 size-4 shrink-0 text-emerald-600"
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

      <section className="py-8 sm:py-16">
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
                    className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-3 text-sm leading-7 text-slate-700 transition-all duration-500 hover:bg-white hover:border-emerald-200 hover:shadow-sm"
                  >
                    <div className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-emerald-500 transition-transform duration-500 group-hover:scale-x-100" />
                    <span className="relative z-10 transition-colors duration-300 group-hover:text-emerald-950">{service}</span>
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
                    className="group relative overflow-hidden rounded-2xl border border-amber-100/30 bg-amber-50/50 px-4 py-3 text-sm leading-7 text-slate-700 transition-all duration-500 hover:bg-white hover:border-amber-200 hover:shadow-sm"
                  >
                    <div className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-amber-500 transition-transform duration-500 group-hover:scale-x-100" />
                    <span className="relative z-10 transition-colors duration-300 group-hover:text-amber-950">{service}</span>
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

      <section className="py-8 sm:py-16">
        <div className="shell-container">
          <Reveal>
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-1">
                <div className="media-frame relative min-h-[12rem] lg:min-h-[15rem]">
                  <Image
                    src="/images/indoor_common_1.jpg"
                    alt="Social common area at Scodrinon Hostel"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 45vw"
                  />
                </div>
                <div className="media-frame relative min-h-[12rem] lg:min-h-[15rem]">
                  <Image
                    src="/images/ambiance_3.jpg"
                    alt="Fresh breakfast served at Scodrinon Hostel"
                    fill
                    className="object-cover object-[50%_40%]"
                    sizes="(max-width: 1024px) 50vw, 45vw"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <TestimonialCarousel testimonials={testimonials} className="h-full" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-8 sm:py-16">
        <div className="shell-container">
          <CtaStrip
            eyebrow="Book Your Bed"
            title="Tell the team what kind of room you want and lock it in directly."
            description="If you already know your dates, message on WhatsApp and ask for the pod dorm or a four-bed option. Booking.com and Hostelworld stay there if you prefer those platforms."
            image="/images/ambiance2.jpg"
            alt="evening ambiance at Scodrinon Hostel, Shkoder"
            imageClassName="object-[50%_80%]"
          />
        </div>
      </section>
    </>
  );
}