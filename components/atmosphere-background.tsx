"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * AtmosphereBackground
 * 
 * Replaces the render-blocking body::before CSS with a performant 
 * React component. This moves the heavy gradient and noise SVG logic 
 * out of the critical CSS path.
 */
export function AtmosphereBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // We use an empty div during SSR to avoid hydration mismatch, 
  // though the styles are static enough that we could just render them.
  return (
    <div
      aria-hidden="true"
      className={cn(
        "fixed inset-0 -z-10 pointer-events-none transition-opacity duration-1000",
        mounted ? "opacity-100" : "opacity-0"
      )}
      style={{
        willChange: "transform",
        transform: "translateZ(0)",
        backgroundImage: `
          url("data:image/svg+xml,%3Csvg viewBox='0 0 140 140' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.18'/%3E%3C/svg%3E"),
          linear-gradient(to bottom, transparent 60%, var(--background) 100%),
          radial-gradient(circle at 0% 0%, var(--atmosphere-glow-primary), transparent 50%),
          radial-gradient(circle at 100% 0%, var(--atmosphere-glow-accent), transparent 40%),
          radial-gradient(circle at 100% 50%, var(--atmosphere-glow-secondary), transparent 40%),
          linear-gradient(var(--atmosphere-grid-line) 1px, transparent 1px),
          linear-gradient(90deg, var(--atmosphere-grid-line) 1px, transparent 1px)
        `,
        backgroundSize: "140px 140px, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 140px 140px, 140px 140px",
        backgroundRepeat: "repeat, no-repeat, no-repeat, no-repeat, no-repeat, repeat, repeat",
        backgroundBlendMode: "overlay, normal, normal, normal, normal, normal, normal",
        opacity: mounted ? 0.95 : 0
      }}
    />
  );
}
