"use client";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DirectBookingCard } from "@/components/direct-booking-card";
import { LazyVideo } from "@/components/lazy-video";
import { useIsLowEndDevice } from "@/lib/use-performance";

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
  const isLowEnd = useIsLowEndDevice();
  const containerRef = useRef<HTMLElement>(null);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Track scroll through the section — from when the top enters the viewport
  // to when it's fully visible. We clamp progress to [0, 0.5] so all motion
  // completes before the section scrolls away (elements lock in place).
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 22,
    restDelta: 0.001,
  });

  // ── Top-left: Rooftop image — slides DOWN into place ──────────────────────
  const rooftopY = useTransform(smoothProgress, [0, 1], [-80, 0]);

  // ── Bottom-left: Direct Booking card — slides RIGHT into place ────────────
  // Final resting position offset is -42px (from the lg:-translate-x-[42px] class).
  // We animate from -80 extra (so -122px total) to 0 extra (-42px final) and lock.
  const directBookingX = useTransform(smoothProgress, [0, 1], [-80, 0]);

  // ── Top-right: Room image — slides LEFT into place ────────────────────────
  const roomImageX = useTransform(smoothProgress, [0, 1], [80, 0]);

  // ── Bottom-right: Video — slides UP into place ────────────────────────────
  const videoY = useTransform(smoothProgress, [0, 1], [80, 0]);

  const disabled = isLowEnd || !isDesktop;

  return (
    <section ref={containerRef} className="relative z-10 mt-[30px] md:mt-[30px] lg:mt-[11px] pt-8 pb-[var(--layout-section-spacing)] lg:pt-12">
      <div className="shell-container max-w-5xl">
        <div className="flex flex-col gap-[var(--layout-grid-gutter)] lg:grid lg:grid-cols-[1.9fr_1.1fr] lg:grid-rows-[1fr_auto] lg:gap-[var(--layout-grid-gutter)]">

          {/* DESKTOP ONLY: Direct Booking card — Bottom-left, slides RIGHT */}
          <Reveal delay={200} className="hidden lg:flex lg:row-start-2 h-full lg:-translate-x-[42px]">
            <motion.div
              style={{ x: disabled ? 0 : directBookingX, willChange: "transform" }}
              className="h-full w-full"
            >
              <DirectBookingCard variant="inline" className="h-full w-full" whatsappUrl={whatsappUrl} content={atmosphere} />
            </motion.div>
          </Reveal>

          {/* Rooftop image — Top-left, slides DOWN */}
          <Reveal delay={0} className="lg:row-start-1 relative group">
            <motion.div
              style={{ y: disabled ? 0 : rooftopY, willChange: "transform" }}
              className="relative h-full"
            >
              <div className="media-frame !border-0 ring-1 ring-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_24px_70px_-42px_rgba(0,0,0,0.5)] relative aspect-[16/10] sm:aspect-[21/9] lg:aspect-auto lg:min-h-[26rem] h-full overflow-hidden">
                <Image
                  src="/images/rooftop_social.webp"
                  alt={atmosphere.rooftopImageAlt}
                  fill
                  className="object-cover"
                  loading="eager"
                  sizes="(max-width: 1024px) 100vw, (max-width: 1400px) 66vw, 924px"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent px-card-premium pb-card-premium pt-32 text-white">
                  <SectionLabel colorScheme="light" className="text-[10px] lg:text-xs">
                    {atmosphere.rooftopEyebrow}
                  </SectionLabel>
                  <p className="mt-2 max-w-sm font-heading text-lg md:text-xl lg:text-2xl leading-tight tracking-tight">
                    {atmosphere.rooftopTitle}
                  </p>
                </div>
              </div>

              {/* Floating Sticker/Badge — inside motion.div so it travels with the image */}
              <div className="absolute -top-6 -right-[14px] lg:-top-12 lg:-right-12 z-30 -rotate-12 group-hover:rotate-0 transition-all duration-700 ease-out scale-100 group-hover:scale-110">
                <div className="relative size-[134px] lg:size-[180px] rounded-full flex items-center justify-center shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)] group/badge">
                  {/* Layered Backgrounds */}
                  <div className="absolute inset-0 rounded-full bg-slate-950/90 backdrop-blur-md border border-white/10" />
                  <div className="absolute inset-1 rounded-full border border-amber-400/20" />

                  {/* Subtle Inner Glow */}
                  <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.08)_0%,transparent_70%)]" />

                  {/* Content */}
                  <div className="relative z-10 flex flex-col items-center">
                    <span className="text-[9.8px] lg:text-[11.2px] font-bold uppercase tracking-[0.4em] text-amber-200/60 mb-1.5">Undisputed</span>

                    <div className="flex flex-col items-center -space-y-1.5 lg:-space-y-3">
                      <span className="font-cormorant text-[28px] lg:text-[42px] italic font-medium text-white leading-none">Best View</span>
                      <span className="font-cormorant text-[28px] lg:text-[42px] italic font-medium text-white leading-none">in Town</span>
                    </div>

                    {/* Decorative element */}
                    <div className="mt-3 flex items-center gap-2">
                      <div className="h-[0.5px] w-6 bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />
                      <div className="size-1.5 rounded-full bg-amber-400/60 shadow-[0_0_8px_rgba(251,191,36,0.4)]" />
                      <div className="h-[0.5px] w-6 bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />
                    </div>
                  </div>

                  {/* Shine Effect on hover */}
                  <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover/badge:translate-x-full transition-transform duration-1000 ease-in-out" />
                  </div>
                </div>
              </div>
            </motion.div>
          </Reveal>

          {/* Right column — top-right and bottom-right are now independent */}
          <div className="flex flex-col gap-[var(--layout-grid-gutter)] lg:col-start-2 lg:row-start-1 lg:row-span-2">
            <div className="grid grid-cols-2 gap-[var(--layout-grid-gutter)] sm:grid-cols-[1.1fr_1fr] lg:grid-cols-1 lg:h-full">

              {/* Room image — Top-right, slides LEFT */}
              <Reveal delay={100} className="flex min-w-0 relative lg:-mt-12 lg:translate-x-8 z-20 w-full">
                <motion.div
                  style={{ x: disabled ? 0 : roomImageX, willChange: "transform" }}
                  className="w-full"
                >
                  <div className="media-frame !border-0 ring-1 ring-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_24px_70px_-42px_rgba(0,0,0,0.5)] relative w-full aspect-[9/16] sm:aspect-[4/3] overflow-hidden">
                    <Image
                      src="/images/rooms_1.webp"
                      alt={atmosphere.roomImageAlt}
                      fill
                      className="object-cover object-[75%_center]"
                      loading="eager"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 60vw, (max-width: 1400px) 33vw, 466px"
                    />
                  </div>
                </motion.div>
              </Reveal>

              {/* Video — Bottom-right, slides UP */}
              <motion.div
                style={{ y: disabled ? 0 : videoY, willChange: "transform" }}
                className="media-frame !border-0 ring-1 ring-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_24px_70px_-42px_rgba(0,0,0,0.5)] relative flex items-start lg:items-center self-start sm:self-auto lg:self-auto overflow-hidden sm:row-span-2 lg:row-span-1 aspect-[9/16] sm:aspect-auto"
              >
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
              </motion.div>

              {/* Mobile-only booking card */}
              <Reveal delay={150} className="col-span-full sm:col-span-1 lg:hidden">
                <DirectBookingCard variant="block" className="h-full" whatsappUrl={whatsappUrl} content={atmosphere} />
              </Reveal>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
