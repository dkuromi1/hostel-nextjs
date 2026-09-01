"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type MouseEvent,
} from "react";
import { cn } from "@/lib/utils";

type SwipableRowProps = {
  children: ReactNode;
  itemCount: number;
  className?: string;
  dotsClassName?: string;
};

export function SwipableRow({
  children,
  itemCount,
  className,
  dotsClassName,
}: SwipableRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Update active dot and card states as user swipes
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

        const effectiveCount = itemCount || kids.length;
        const safeIndex = Math.max(0, Math.min(closestIndex, effectiveCount - 1));
        setActiveIndex(safeIndex);
      });
    };

    scrollNode.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();
    return () => {
      scrollNode.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [itemCount]); // intentionally omit activeIndex to avoid re-subscribing

  // Click a dot or card → scroll the container to centre that child
  const goToItem = (index: number) => {
    setActiveIndex(index);
    const scrollNode = scrollRef.current;
    if (!scrollNode) return;

    const kids = Array.from(scrollNode.children) as HTMLElement[];
    const child = kids[index];
    if (!child) return;

    // Disable CSS snap temporarily (Safari/iOS bug fix for smooth scroll)
    const originalSnap = scrollNode.style.scrollSnapType;
    scrollNode.style.scrollSnapType = "none";

    const targetLeft =
      child.offsetLeft - (scrollNode.clientWidth - child.offsetWidth) / 2;

    scrollNode.scrollTo({ left: targetLeft, behavior: "smooth" });

    // Restore snap after approx smooth scroll duration
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.style.scrollSnapType = originalSnap || "";
      }
    }, 600);
  };

  const isSmGrid = Boolean(className?.includes("sm:grid") || className?.includes("sm:flex"));
  const desktopReset = isSmGrid
    ? "sm:scale-100 sm:opacity-100 sm:z-auto"
    : "md:scale-100 md:opacity-100 md:z-auto";
  const hideDotsClass = isSmGrid ? "sm:hidden" : "md:hidden";

  const handleContainerClick = (e: MouseEvent<HTMLDivElement>) => {
    const scrollNode = scrollRef.current;
    if (!scrollNode || scrollNode.scrollWidth <= scrollNode.clientWidth) return;

    const target = e.target as HTMLElement | null;
    if (!target || target.closest("a, button, input, textarea, select")) return;

    const kids = Array.from(scrollNode.children) as HTMLElement[];
    const clickedKid = kids.find((kid) => kid.contains(target));
    if (!clickedKid) return;

    const index = kids.indexOf(clickedKid);
    if (index !== -1 && index !== activeIndex) {
      goToItem(index);
    }
  };

  const renderedChildren = Children.map(children, (child, index) => {
    if (!isValidElement(child)) return child;
    const isActive = index === activeIndex;

    const childProps = child.props as {
      className?: string;
      [key: string]: unknown;
    };

    return cloneElement(child, {
      "data-active": isActive ? "true" : "false",
      "aria-current": isActive ? "true" : undefined,
      className: cn(
        childProps.className,
        "transition-all duration-300 ease-out origin-center transform-gpu",
        isActive
          ? "scale-100 opacity-100 z-10"
          : cn("scale-[0.93] opacity-70 hover:opacity-90 z-0", desktopReset)
      ),
    } as React.Attributes & Record<string, unknown>);
  });

  return (
    <div className="flex flex-col gap-4 w-full min-w-0">
      <div
        ref={scrollRef}
        onClick={handleContainerClick}
        className={cn(
          "relative flex gap-4 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-3 min-w-0 after:content-[''] after:w-px after:shrink-0 sm:after:hidden",
          className
        )}
      >
        {renderedChildren}
      </div>

      {/* Dots – mobile only */}
      {itemCount > 1 && (
        <div
          className={cn(
            "relative z-10 flex justify-center gap-2 pt-1",
            hideDotsClass,
            dotsClassName
          )}
          role="group"
          aria-label="Carousel navigation"
        >
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
