"use client";
import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { useIsLowEndDevice } from "@/lib/use-performance";
import { cn } from "@/lib/utils";

export function CinematicBreak() {
  const isLowEnd = useIsLowEndDevice();

  return (
    <section className="relative h-[45vh] md:h-[65vh] lg:h-[80vh] min-h-[400px] w-full overflow-hidden flex items-center justify-center bg-black parallax-parent">
      {/* Full-bleed background with native hardware-accelerated CSS parallax */}
      <div
        className={cn(
          "absolute -inset-y-1/4 inset-x-0 z-0 w-full h-[150%]",
          !isLowEnd && "parallax-child"
        )}
      >
        <Image
          src="/images/lake_shkoder.webp"
          alt="Lake Shkoder"
          fill
          className="object-cover editorial-image"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 shell-container text-center text-white px-4">
        <Reveal delay={200} className="flex flex-col items-center gap-6 sm:gap-8">
          <div className="h-12 md:h-24 w-px bg-gradient-to-b from-transparent to-white/60 mb-2 sm:mb-4" />
          <h2 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-cormorant leading-[1.2] sm:leading-[1.1] tracking-tight max-w-5xl mx-auto italic px-2">
            &ldquo;Life is a mystery to be lived, not a problem to be solved.&rdquo;
          </h2>
          <div className="flex items-center gap-4 mt-6">
            <div className="h-px w-8 bg-white/40" />
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-white/80">
              The Scodrinon Philosophy
            </span>
            <div className="h-px w-8 bg-white/40" />
          </div>
        </Reveal>
      </div>

      {/* Top and Bottom Fade-out Gradients */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/20 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

      {/* Location Label */}
      <div className="absolute bottom-4 right-6 sm:bottom-6 sm:right-10 z-10">
        <Reveal delay={600}>
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.4em] text-white/50 font-medium">
            Shkodra Lake
          </span>
        </Reveal>
      </div>
    </section>
  );
}
