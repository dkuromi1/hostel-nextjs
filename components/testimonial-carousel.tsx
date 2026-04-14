"use client";

import { useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

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

  const next = useCallback(() => {
    setCurrentIndex((current) => (current + 1) % testimonials.length);
  }, [testimonials.length]);

  const prev = useCallback(() => {
    setCurrentIndex((current) =>
      current === 0 ? testimonials.length - 1 : current - 1
    );
  }, [testimonials.length]);

  // Auto-play interval
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [isHovered, next]);

  if (!testimonials?.length) return null;

  return (
    <Panel
      className={cn(
        "relative flex flex-col justify-between bg-slate-700 p-8 text-white sm:p-10 transition-colors",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="grid">
        {testimonials.map((testimonial, index) => {
          const isActive = index === currentIndex;

          return (
            <div
              key={index}
              className={cn(
                "col-start-1 row-start-1 flex flex-col justify-center transition-opacity duration-700 ease-in-out",
                isActive
                  ? "pointer-events-auto z-10 opacity-100"
                  : "pointer-events-none z-0 opacity-0"
              )}
            >
              <div className="flex gap-1 text-amber-500">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="size-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-6 font-heading text-2xl leading-snug tracking-[-0.02em] text-white sm:text-3xl">
                "{testimonial.quote}"
              </blockquote>
              <p className="mt-6 font-medium text-slate-200">
                — {testimonial.author}{" "}
                <span className="opacity-90">({testimonial.source})</span>
              </p>
            </div>
          );
        })}
      </div>

      {/* Navigation Controls */}
      <div className="mt-2 flex items-center justify-between border-t border-slate-700/50 pt-4">
        <div className="flex gap-2">
          {testimonials.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "cursor-pointer relative h-2 rounded-full transition-all duration-300",
                "before:absolute before:left-1/2 before:top-1/2 before:h-11 before:w-[calc(100%+8px)] before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']",
                index === currentIndex
                  ? "w-8 bg-amber-500"
                  : "w-2 bg-slate-600 hover:bg-slate-500"
              )}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="flex size-10 items-center justify-center rounded-full bg-slate-600 text-slate-100 transition-colors hover:bg-slate-700 hover:text-white"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            onClick={next}
            aria-label="Next testimonial"
            className="flex size-10 items-center justify-center rounded-full bg-slate-600 text-slate-100 transition-colors hover:bg-slate-700 hover:text-white"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>
    </Panel>
  );
}