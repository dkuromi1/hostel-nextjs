"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, Star } from "@/lib/icon-registry";
import { AnimatePresence, motion } from "framer-motion";

import { Panel } from "@/components/ui/panel";
import { cn } from "@/lib/utils";
import { useIsLowEndDevice } from "@/lib/use-performance";
import { BookingComLogo, HostelworldLogo, GoogleLogo } from "@/components/brand-logos";

export type Testimonial = {
  quote: string;
  author: string;
  source: string;
  rating: number;
};

/**
 * Returns a CSS font-size value that shrinks as the quote grows longer,
 * keeping the text comfortable inside a fixed-height container.
 */
function getQuoteFontSize(quote: string): string {
  const len = quote.length;
  if (len <= 100) return "clamp(2rem, 7vw, 3rem)";
  if (len <= 160) return "clamp(1.75rem, 5.8vw, 2.25rem)";
  if (len <= 240) return "clamp(1.5rem, 4.8vw, 1.875rem)";
  if (len <= 340) return "clamp(1.25rem, 4vw, 1.5rem)";
  if (len <= 460) return "clamp(1.125rem, 3.5vw, 1.25rem)";
  return "clamp(1rem, 3.2vw, 1.125rem)";
}

type TestimonialCarouselProps = {
  testimonials: readonly Testimonial[];
  className?: string;
  variant?: "default" | "dark";
};

export function TestimonialCarousel({
  testimonials,
  className,
  variant = "default",
}: TestimonialCarouselProps) {
  const isLowEnd = useIsLowEndDevice();
  const isDark = variant === "dark";
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  // Use a ref for direction so rapid clicks always read the latest value
  // without triggering extra re-renders.
  const directionRef = useRef(1);
  const [direction, setDirection] = useState(1);

  const next = useCallback(() => {
    directionRef.current = 1;
    setDirection(1);
    setCurrentIndex((c) => (c + 1) % testimonials.length);
  }, [testimonials.length]);

  const prev = useCallback(() => {
    directionRef.current = -1;
    setDirection(-1);
    setCurrentIndex((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  }, [testimonials.length]);

  const goTo = useCallback((index: number) => {
    setCurrentIndex((c) => {
      if (c === index) return c;
      const d = index > c ? 1 : -1;
      directionRef.current = d;
      setDirection(d);
      return index;
    });
  }, []);

  // Auto-play interval
  useEffect(() => {
    if (isHovered || testimonials.length <= 1) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [isHovered, next, currentIndex, testimonials.length]);

  if (!testimonials?.length) return null;

  const testimonial = testimonials[currentIndex];

  const variants = isLowEnd ? {
    enter: { opacity: 0 },
    center: { opacity: 1, transition: { duration: 0.15 } },
    exit: { opacity: 0, transition: { duration: 0.1 } }
  } : {
    enter: (d: number) => ({ x: d > 0 ? 56 : -56, opacity: 0 }),
    center: {
      x: 0,
      opacity: 1,
      transition: { type: "spring" as const, damping: 24, stiffness: 180 },
    },
    exit: (d: number) => ({
      x: d > 0 ? -40 : 40,
      opacity: 0,
      transition: { duration: 0.18, ease: [0.4, 0, 1, 1] as [number, number, number, number] },
    }),
  };

  return (
    <Panel
      className={cn(
        "relative flex flex-col justify-between p-card-premium shadow-2xl transition-all duration-300",
        isDark 
          ? "border-white/20 bg-[#0d1b2e]/90 text-white ring-1 ring-white/[0.06] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.05),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl bg-gradient-to-br from-white/[0.04] to-transparent" 
          : "border-white/10 bg-[var(--brand-tertiary)] dark:bg-[var(--brand-tertiary-dark)] text-white shadow-slate-900/15",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Elegant, static background double-quote mark - positioned relative to Panel to guarantee zero clipping */}
      <div 
        className="absolute left-6 top-4 select-none font-serif text-white/[0.035] pointer-events-none z-0" 
        style={{ fontSize: "14rem", lineHeight: 1 }}
        aria-hidden="true"
      >
        &ldquo;
      </div>

      {/* Clip horizontal overflow from slide animation without clipping shadows */}
      <div className="overflow-hidden">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              const swipeThreshold = 50;
              if (info.offset.x < -swipeThreshold) {
                next();
              } else if (info.offset.x > swipeThreshold) {
                prev();
              }
            }}
            className="relative cursor-grab active:cursor-grabbing pt-4"
          >
            <div className="flex gap-1 text-[#f59e0b] relative z-10">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="size-4 fill-current" />
              ))}
            </div>
            <div className="mt-6 flex items-start" style={{ minHeight: "10rem" }}>
              <blockquote
                className="font-heading leading-[1.4] text-white dark:text-[var(--text-heading)] relative z-10"
                style={{
                  fontSize: getQuoteFontSize(testimonial.quote),
                  letterSpacing: "var(--heading-spacing)",
                  transition: "font-size 0.3s ease",
                }}
              >
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-2 font-medium text-[var(--text-on-surface-dark)] dark:text-[var(--text-body)] relative z-10">
              <span>— {testimonial.author}</span>
              {(() => {
                const src = testimonial.source.trim();
                const normalized = src.toLowerCase();
                const isBooking = normalized.includes("booking");
                const isHostelworld = normalized.includes("hostelworld");
                const isGoogle = normalized.includes("google");
                return (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-[13px] font-medium text-white/80 backdrop-blur-sm shadow-sm transition-all duration-300 hover:bg-white/[0.08] hover:border-white/[0.12]">
                    {isBooking && <BookingComLogo size="sm" iconOnly className="!size-4 !rounded-[3px]" />}
                    {isHostelworld && <HostelworldLogo size="sm" iconOnly className="!size-4 !rounded-[3px]" />}
                    {isGoogle && <GoogleLogo size="sm" iconOnly className="!size-4 !rounded-[3px]" />}
                    <span>{src}</span>
                  </span>
                );
              })()}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-4">
        <div className="flex gap-2">
          {testimonials.map((_, index) => (
            <div
              key={index}
              className={cn(
                "relative h-2 shrink-0",
                index === currentIndex ? "w-8" : "w-2"
              )}
            >
              <button
                type="button"
                onClick={() => goTo(index)}
                tabIndex={-1}
                aria-hidden="true"
                className={cn(
                  "absolute left-1/2 top-1/2 z-10 flex size-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-all duration-300",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f59e0b]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--brand-tertiary)]"
                )}
              >
                <span
                  className={cn(
                    "block h-2 rounded-full transition-all duration-300",
                    index === currentIndex
                      ? "w-8 bg-[#f59e0b]"
                      : "w-2 bg-white/20 hover:bg-white/30"
                  )}
                />
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="flex size-8 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white transition-all hover:bg-white/20 hover:scale-110 active:scale-95 dark:border-[var(--border)] dark:bg-[var(--muted)] dark:text-[var(--text-heading)] dark:hover:bg-[var(--brand-primary)] dark:hover:text-white"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            onClick={next}
            aria-label="Next testimonial"
            className="flex size-8 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white transition-all hover:bg-white/20 hover:scale-110 active:scale-95 dark:border-[var(--border)] dark:bg-[var(--muted)] dark:text-[var(--text-heading)] dark:hover:bg-[var(--brand-primary)] dark:hover:text-white"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>
    </Panel>
  );
}
