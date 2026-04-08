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

  useEffect(() => {
    const scrollNode = scrollRef.current;
    if (!scrollNode) return;

    const handleScroll = () => {
      const { scrollLeft, clientWidth } = scrollNode;
      // Calculate index based on 640px logic
      const index = Math.round(scrollLeft / (clientWidth * 0.8)); // Adjust for peek
      const safeIndex = Math.max(0, Math.min(index, itemCount - 1));
      if (safeIndex !== activeIndex) {
        setActiveIndex(safeIndex);
      }
    };

    scrollNode.addEventListener("scroll", handleScroll, { passive: true });
    return () => scrollNode.removeEventListener("scroll", handleScroll);
  }, [activeIndex, itemCount]);

  return (
    <div className="space-y-6">
      <div
        ref={scrollRef}
        className={cn(
          "flex gap-4 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-4 sm:grid sm:overflow-visible sm:pb-0",
          className
        )}
      >
        {children}
      </div>

      {/* Dots Indicator - Only visible below 640px (sm) */}
      {itemCount > 1 && (
        <div className="flex justify-center gap-2 sm:hidden">
          {Array.from({ length: itemCount }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === activeIndex
                  ? "w-6 bg-emerald-600"
                  : "w-1.5 bg-slate-300"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
