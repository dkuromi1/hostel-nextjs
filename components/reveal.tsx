"use client";

import type { HTMLAttributes } from "react";
import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/lib/use-is-mobile";

import { cn } from "@/lib/utils";

type RevealProps = HTMLAttributes<HTMLDivElement> & {
  delay?: number;
  duration?: number;
};

export function Reveal({
  children,
  className,
  delay = 0,
  duration = 1000,
  ...props
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{ 
        transitionDelay: isMobile ? "0ms" : `${delay}ms`,
        transitionDuration: isMobile ? "0ms" : `${duration}ms`
      }}
      className={cn(
        "transition-all ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-reduce:transform-none motion-reduce:opacity-100",
        "max-sm:translate-y-0 max-sm:opacity-100 max-sm:transition-none",
        (isVisible || isMobile) ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
