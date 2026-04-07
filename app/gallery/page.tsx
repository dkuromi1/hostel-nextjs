import Image from "next/image";
import Link from "next/link";

import { CtaStrip } from "@/components/cta-strip";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { StructuredData } from "@/components/structured-data";
import { Panel } from "@/components/ui/panel";
import { buildBreadcrumbSchema, buildMetadata } from "@/lib/metadata";
import { galleryItems } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Photo And Video Gallery",
  description:
    "Browse real photos and short videos from Scodrinon Hostel, including the rooftop, rooms, breakfast, events, and the atmosphere around the stay.",
  path: "/gallery",
  image: "/images/rooftop_panorama.jpg",
});

export default function GalleryPage() {
  return (
    <>
      <StructuredData
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Gallery", path: "/gallery" },
        ])}
      />

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="shell-container space-y-10">
          <SectionHeading
            eyebrow="Visual Tour"
            title="Scroll through the stay before you step into it."
            description="The layout stays image-led on purpose. You should be able to understand the hostel in a few swipes: the rooftop, the pods, the breakfast, and the overall pace of the place."
          />
          <div className="grid gap-4 md:grid-cols-12">
            {galleryItems.map((item, index) => (
              <Reveal
                key={item.id}
                delay={index * 50}
                className={item.className}
              >
                <Link
                  href={`/gallery/${item.id}`}
                  scroll={false}
                  className="group block cursor-zoom-in"
                >
                  <div className={cn("media-frame relative overflow-hidden", item.aspect)}>
                    {item.type === "image" ? (
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : (
                      <div className="h-full w-full">
                        <video
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          autoPlay
                          muted
                          loop
                          playsInline
                          aria-label={item.alt}
                        >
                          <source src={item.src} type="video/mp4" />
                        </video>
                        {/* Overlay play icon or indicator for videos */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors group-hover:bg-black/20">
                          <div className="rounded-full bg-white/20 p-3 backdrop-blur-md">
                            <div className="size-0 border-y-8 border-l-12 border-y-transparent border-l-white ml-1" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="shell-container grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal>
            <Panel className="p-6 sm:p-8">
              <SectionHeading
                eyebrow="Our Vibe"
                title="Bright, clean, social, and easy to settle into."
                description="Take a look around. Our spaces blend modern design with welcoming warmth. And that rooftop you keep seeing? That’s where the true hostel magic happens and travelers come together."
              />
            </Panel>
          </Reveal>

          <Reveal delay={120}>
            <Panel className="overflow-hidden">
              <div className="grid gap-0 sm:grid-cols-[1.05fr_0.95fr] h-full">
                <div className="relative min-h-[16rem] h-full bg-[#003b95]">
                  <Image
                    src="/images/booking_award.jpg"
                    alt="Booking award displayed at Scodrinon Hostel"
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 640px) 100vw, 28vw"
                  />
                </div>
                <div className="p-6 flex flex-col justify-center">
                  <p className="text-xs uppercase tracking-[0.24em] text-amber-700">
                    Highly Rated
                  </p>
                  <h2 className="mt-4 font-heading text-3xl leading-none tracking-[-0.05em] text-slate-950">
                    What you see is exactly what you get.
                  </h2>
                  <p className="mt-4 text-base leading-8 text-slate-600">
                    We’re proud of our 9.5 rating, but our real pride is our space. No heavy filters or staged tricks—just real, comfortable environments ready for your next adventure.
                  </p>
                </div>
              </div>
            </Panel>
          </Reveal>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="shell-container">
          <CtaStrip
            eyebrow="Ready To Stay"
            title="If the gallery feels like your kind of hostel, message now."
            description="The fastest move is still the direct one: WhatsApp first, then Booking.com and Hostelworld right behind it."
            image="/images/rooftop_view.jpg"
            alt="Rooftop view from Scodrinon Hostel at sunset"
            imageClassName="object-[50%_50%]"
          />
        </div>
      </section>
    </>
  );
}
