import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DirectBookingCard } from "@/components/direct-booking-card";
import { LazyVideo } from "@/components/lazy-video";

export interface AtmosphereSectionProps {
  atmosphere: {
    rooftopImageAlt: string;
    rooftopEyebrow: string;
    rooftopTitle: string;
    roomImageAlt: string;
    directBookingLabel: string;
    directBookingTitle: string;
    directBookingTitleMobile: string;
    directBookingDescription: string;
    directBookingDescriptionMobile: string;
    directBookingButton: string;
  };
  whatsappUrl?: string;
}

export function AtmosphereSection({ atmosphere, whatsappUrl }: AtmosphereSectionProps) {
  return (
    <section className="py-8 sm:py-16">
      <div className="shell-container max-w-5xl">
        <div className="flex flex-col gap-4 lg:grid lg:grid-cols-[2fr_1fr] lg:grid-rows-[1fr_auto] lg:gap-5">

          {/* DESKTOP ONLY: Direct Booking card */}
          <Reveal delay={200} className="hidden lg:flex lg:row-start-2">
            <DirectBookingCard variant="inline" className="h-full" whatsappUrl={whatsappUrl} content={atmosphere} />
          </Reveal>

          {/* Rooftop image */}
          <Reveal delay={0} className="lg:row-start-1">
            <div className="media-frame relative aspect-[16/10] sm:aspect-[21/9] lg:aspect-auto lg:min-h-[22rem] h-full overflow-hidden">
              <Image
                src="/images/rooftop_social.webp"
                alt={atmosphere.rooftopImageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, (max-width: 1400px) 66vw, 924px"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 pt-32 text-white">
                <SectionLabel colorScheme="light">
                  {atmosphere.rooftopEyebrow}
                </SectionLabel>
                <p className="mt-2 max-w-sm font-heading text-2xl leading-tight tracking-tight">
                  {atmosphere.rooftopTitle}
                </p>
              </div>
            </div>
          </Reveal>

          {/* Right column */}
          <div className="flex flex-col gap-4 lg:col-start-2 lg:row-start-1 lg:row-span-2">
            <div className="grid grid-cols-[3fr_2fr] gap-4 lg:grid-cols-1 lg:h-full">
              {/* Room image + mobile booking */}
              <Reveal delay={100} className="flex min-w-0 flex-col gap-4 h-full">
                <div className="media-frame relative aspect-[4/3] h-full lg:h-auto">
                  <Image
                    src="/images/rooms_1_min.webp"
                    alt={atmosphere.roomImageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 60vw, (max-width: 1400px) 33vw, 466px"
                  />
                </div>

                {/* Mobile-only booking card */}
                <DirectBookingCard variant="block" className="lg:hidden" whatsappUrl={whatsappUrl} content={atmosphere} />
              </Reveal>

              {/* Video */}
              <Reveal delay={300} className="media-frame relative flex items-start lg:items-center self-start lg:self-auto overflow-hidden">
                <LazyVideo
                  src="/videos/videoplayback.mp4"
                  poster="/images/video-poster.webp"
                  className="w-full"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="none"
                />
              </Reveal>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
