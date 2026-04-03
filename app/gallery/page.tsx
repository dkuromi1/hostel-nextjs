import Image from "next/image";

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

      <PageHero
        eyebrow="Gallery"
        title="Real light, real rooms, real rooftop energy."
        description="The gallery leans on the hostel's own media so you can get a feel for the stay before you arrive: privacy pods, breakfast, city views, social nights, and the small design details that make the place feel current."
        highlights={[
          "No stock placeholders",
          "Real rooms and rooftop views",
          "Short embedded videos from the hostel",
          "A better sense of the vibe before you book",
        ]}
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div className="media-frame relative min-h-[22rem] md:row-span-2">
            <Image
              src="/images/rooftop_panorama.jpg"
              alt="Panoramic rooftop view at Scodrinon Hostel"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>
          <div className="media-frame relative min-h-[15rem]">
            <Image
              src="/images/bar_1.jpg"
              alt="Evening rooftop atmosphere at the hostel"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 25vw"
            />
          </div>
          <div className="media-frame relative min-h-[15rem]">
            <video
              className="h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              aria-label="Short video showing the atmosphere at Scodrinon Hostel"
            >
              <source src="/videos/videoplayback.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </PageHero>

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
                key={`${item.src}-${index}`}
                delay={index * 50}
                className={item.className}
              >
                <div className={cn("media-frame relative", item.aspect)}>
                  {item.type === "image" ? (
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <video
                      className="h-full w-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                      aria-label={item.alt}
                    >
                      <source src={item.src} type="video/mp4" />
                    </video>
                  )}
                </div>
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
                eyebrow="What Comes Through"
                title="Bright, clean, social, and easy to settle into."
                description="That is the thread running through the gallery. The spaces are modern without losing warmth, and the rooftop keeps appearing because it is where the hostel vibe really lands."
              />
            </Panel>
          </Reveal>

          <Reveal delay={120}>
            <Panel className="overflow-hidden">
              <div className="grid gap-0 sm:grid-cols-[1.05fr_0.95fr]">
                <div className="relative min-h-[16rem]">
                  <Image
                    src="/images/booking_award.jpg"
                    alt="Booking award displayed at Scodrinon Hostel"
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 28vw"
                  />
                </div>
                <div className="p-6">
                  <p className="text-xs uppercase tracking-[0.24em] text-amber-700">
                    Trust Signal
                  </p>
                  <h2 className="mt-4 font-heading text-3xl leading-none tracking-[-0.05em] text-slate-950">
                    Real photos do most of the trust-building work here.
                  </h2>
                  <p className="mt-4 text-base leading-8 text-slate-600">
                    The award image helps, but the stronger proof is that the
                    place looks lived-in, current, and coherent across the whole
                    gallery.
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
          />
        </div>
      </section>
    </>
  );
}
