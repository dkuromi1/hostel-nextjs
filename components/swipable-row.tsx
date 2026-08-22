"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type SwipableRowProps = {
  children: ReactNode;
  itemCount: number;
  className?: string;
};

export function SwipableRow({
  children,
  itemCount,
  className,
}: SwipableRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Update active dot as user swipes
  useEffect(() => {
    const scrollNode = scrollRef.current;
    if (!scrollNode) return;

    let scrollThrottleId: ReturnType<typeof requestAnimationFrame> | null = null;
    const handleScroll = () => {
      if (scrollThrottleId !== null) return;
      scrollThrottleId = requestAnimationFrame(() => {
        scrollThrottleId = null;
        const { scrollLeft, clientWidth } = scrollNode;
        const kids = Array.from(scrollNode.children) as HTMLElement[];
        if (kids.length === 0) return;

        const containerCenter = scrollLeft + clientWidth / 2;
        let closestIndex = 0;
        let minDistance = Infinity;

        kids.forEach((child, i) => {
          const childCenter = child.offsetLeft + child.clientWidth / 2;
          const distance = Math.abs(containerCenter - childCenter);
          if (distance < minDistance) {
            minDistance = distance;
            closestIndex = i;
          }
        });

        const safeIndex = Math.min(closestIndex, itemCount - 1);
        setActiveIndex(safeIndex);
      });
    };

    scrollNode.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => scrollNode.removeEventListener("scroll", handleScroll);
  }, [itemCount]); // intentionally omit activeIndex to avoid re-subscribing

  // Click a dot → scroll the container to centre that child
  const goToItem = (index: number) => {
    setActiveIndex(index);
    const scrollNode = scrollRef.current;
    if (!scrollNode) return;
    
    const kids = Array.from(scrollNode.children) as HTMLElement[];
    const child = kids[index];
    if (!child) return;
    
    // Disable CSS snap temporarily (Safari/iOS bug fix for smooth scroll)
    const originalSnap = scrollNode.style.scrollSnapType;
    scrollNode.style.scrollSnapType = 'none';

    const targetLeft =
      child.offsetLeft - (scrollNode.clientWidth - child.offsetWidth) / 2;
      
    scrollNode.scrollTo({ left: targetLeft, behavior: "smooth" });
    
    // Restore snap after approx smooth scroll duration
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.style.scrollSnapType = originalSnap || '';
      }
    }, 600);
  };

  return (
    <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
      <div
        ref={scrollRef}
        className={cn(
          "relative flex gap-4 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-3 touch-pan-x w-full min-w-0",
          className
        )}
      >
        {children}
      </div>

      {/* Dots */}
      {itemCount > 1 && (
        <div className="relative z-10 flex justify-center gap-2 pt-1" role="group" aria-label="Carousel navigation">
          {Array.from({ length: itemCount }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goToItem(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={cn(
                "relative cursor-pointer h-1.5 rounded-full transition-all duration-300 ring-1 ring-black/10 shadow-sm focus:outline-none",
                i === activeIndex
                  ? "w-6 bg-[var(--brand-primary)]"
                  : "w-1.5 bg-white/40 hover:bg-white/70 dark:bg-zinc-600"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
