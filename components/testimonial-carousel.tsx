"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { Panel } from "@/components/ui/panel";
import { cn } from "@/lib/utils";

type Testimonial = {
  quote: string;
  author: string;
  source: string;
  rating: number;
};

type TestimonialCarouselProps = {
  testimonials: readonly Testimonial[];
  className?: string;
};

export function TestimonialCarousel({
  testimonials,
  className,
}: TestimonialCarouselProps) {
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
    if (isHovered) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [isHovered, next]);

  if (!testimonials?.length) return null;

  const testimonial = testimonials[currentIndex];

  const variants = {
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
        "relative flex flex-col justify-between bg-slate-700 p-8 text-white sm:p-10",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
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
          >
            <div className="flex gap-1 text-amber-500">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="size-4 fill-current" />
              ))}
            </div>
            <blockquote className="mt-6 font-heading text-2xl leading-snug tracking-[-0.02em] text-white sm:text-3xl">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>
            <p className="mt-6 font-medium text-slate-200">
              — {testimonial.author}{" "}
              <span className="opacity-90">({testimonial.source})</span>
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="mt-6 flex items-center justify-between border-t border-slate-700/50 pt-4">
        <div className="flex gap-2">
          {testimonials.map((_, index) => (
            <div
              key={index}
              onClick={() => goTo(index)}
              aria-label={`Go to testimonial ${index + 1}`}
              className={cn(
                "relative h-2 cursor-pointer rounded-full transition-all duration-300",
                "before:absolute before:left-1/2 before:top-1/2 before:h-11 before:w-[calc(100%+8px)] before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']",
                index === currentIndex
                  ? "w-8 bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.4)]"
                  : "w-2 bg-white/20 hover:bg-white/30"
              )}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20 hover:scale-110 active:scale-95"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            onClick={next}
            aria-label="Next testimonial"
            className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20 hover:scale-110 active:scale-95"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>
    </Panel>
  );
}