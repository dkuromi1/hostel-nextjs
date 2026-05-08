"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
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
    directBookingDescription: string;
    directBookingButton: string;
  };
  whatsappUrl?: string;
}

export function AtmosphereSection({ atmosphere, whatsappUrl }: AtmosphereSectionProps) {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax shift for the entire right column to create depth
  const rightColumnY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={containerRef} className="relative z-10 -mt-[40px] md:-mt-[48px] lg:-mt-[44px] pt-8 pb-[var(--layout-section-spacing)] lg:pt-12">
      <div className="shell-container max-w-5xl">
        <div className="flex flex-col gap-[var(--layout-grid-gutter)] lg:grid lg:grid-cols-[1.8fr_1.2fr] lg:grid-rows-[1fr_auto] lg:gap-[var(--layout-grid-gutter)]">

          {/* DESKTOP ONLY: Direct Booking card */}
          <Reveal delay={200} className="hidden lg:flex lg:row-start-2 h-full lg:-translate-x-8">
            <DirectBookingCard variant="inline" className="h-full w-full" whatsappUrl={whatsappUrl} content={atmosphere} />
          </Reveal>

          {/* Rooftop image */}
          <Reveal delay={0} className="lg:row-start-1 relative group">
            <div className="media-frame !border-[var(--border)] relative aspect-[16/10] sm:aspect-[21/9] lg:aspect-auto lg:min-h-[26rem] h-full overflow-hidden shadow-2xl">
              <Image
                src="/images/rooftop_social.webp"
                alt={atmosphere.rooftopImageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, (max-width: 1400px) 66vw, 924px"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent px-card-premium pb-card-premium pt-32 text-white">
                <SectionLabel colorScheme="light">
                  {atmosphere.rooftopEyebrow}
                </SectionLabel>
                <p className="mt-2 max-w-sm font-heading text-xl sm:text-2xl leading-tight tracking-tight">
                  {atmosphere.rooftopTitle}
                </p>
              </div>
            </div>
            
            {/* Floating Sticker/Badge */}
            <div className="absolute -top-4 -right-4 lg:-top-6 lg:-right-6 z-30 rotate-12 group-hover:rotate-0 transition-transform duration-500">
              <div className="size-20 lg:size-24 rounded-full bg-[var(--brand-primary)] text-white flex flex-col items-center justify-center text-center p-2 shadow-2xl ring-1 ring-white/20">
                <span className="text-[10px] lg:text-[12px] font-black uppercase tracking-tighter leading-none">Best View</span>
                <span className="text-lg lg:text-xl font-black leading-none mt-1">In Town</span>
              </div>
            </div>
          </Reveal>

          {/* Right column */}
          <motion.div 
            style={{ y: rightColumnY }}
            className="flex flex-col gap-[var(--layout-grid-gutter)] lg:col-start-2 lg:row-start-1 lg:row-span-2"
          >
            <div className="grid grid-cols-[1.1fr_1fr] gap-[var(--layout-grid-gutter)] lg:grid-cols-1 lg:h-full">
              {/* Room image */}
              <Reveal delay={100} className="flex min-w-0 relative lg:-mt-12 lg:translate-x-8 z-20 w-full">
                <div className="media-frame !border-[var(--border)] relative w-full aspect-[4/5] sm:aspect-[4/3]">
                  <Image
                    src="/images/rooms_1.jpg"
                    alt={atmosphere.roomImageAlt}
                    fill
                    className="object-cover object-[75%_center]"
                    sizes="(max-width: 1024px) 60vw, (max-width: 1400px) 33vw, 466px"
                  />
                </div>
              </Reveal>

              {/* Video */}
              <Reveal delay={300} className="media-frame !border-[var(--border)] relative flex items-start lg:items-center self-start lg:self-auto overflow-hidden min-[500px]:row-span-2 lg:row-span-1 aspect-[9/16] min-[500px]:aspect-auto">
                <LazyVideo
                  src="/videos/videoplayback.mp4"
                  poster="/images/video-poster.webp"
                  className="w-full h-full"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="none"
                />
              </Reveal>

              {/* Mobile-only booking card */}
              <Reveal delay={150} className="max-[499px]:col-span-full lg:hidden">
                <DirectBookingCard variant="block" className="h-full" whatsappUrl={whatsappUrl} content={atmosphere} />
              </Reveal>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
