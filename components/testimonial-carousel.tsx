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
        "relative flex flex-col justify-between bg-emerald-900 p-8 text-white sm:p-10 transition-colors",
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
              <div className="flex gap-1 text-emerald-400">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="size-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-6 font-heading text-2xl leading-snug tracking-[-0.02em] text-white sm:text-3xl">
                "{testimonial.quote}"
              </blockquote>
              <p className="mt-6 font-medium text-emerald-200">
                — {testimonial.author}{" "}
                <span className="opacity-70">({testimonial.source})</span>
              </p>
            </div>
          );
        })}
      </div>

      {/* Navigation Controls */}
      <div className="mt-2 flex items-center justify-between border-t border-emerald-800/50 pt-4">
        <div className="flex gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                index === currentIndex
                  ? "w-8 bg-emerald-400"
                  : "w-2 bg-emerald-700 hover:bg-emerald-500"
              )}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="flex size-10 items-center justify-center rounded-full bg-emerald-800 text-emerald-100 transition-colors hover:bg-emerald-700 hover:text-white"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            onClick={next}
            aria-label="Next testimonial"
            className="flex size-10 items-center justify-center rounded-full bg-emerald-800 text-emerald-100 transition-colors hover:bg-emerald-700 hover:text-white"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>
    </Panel>
  );
}