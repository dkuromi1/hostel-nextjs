"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

import { siteConfig } from "@/lib/site-data";

/**
 * AtmosphereBackground
 * 
 * Replaces the render-blocking body::before CSS with a performant 
 * React component. This moves the heavy gradient and noise SVG logic 
 * out of the critical CSS path.
 */
export function AtmosphereBackground() {
  const [mounted, setMounted] = useState(false);
  const [isLowEnd, setIsLowEnd] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsLowEnd(document.documentElement.classList.contains("low-end-device"));
  }, []);

  const pattern = siteConfig.branding.design?.atmosphere.pattern ?? "none";
  const noiseUrl = `url("data:image/svg+xml,%3Csvg viewBox='0 0 140 140' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='var(--atmosphere-noise-opacity, 0.25)'/%3E%3C/svg%3E")`;

  const glowGradients = [
    "linear-gradient(to bottom, transparent 60%, var(--background) 100%)",
    "radial-gradient(circle at 0% 0%, var(--atmosphere-glow-primary), transparent 50%)",
    "radial-gradient(circle at 100% 0%, var(--atmosphere-glow-accent), transparent 40%)",
    "radial-gradient(circle at 100% 50%, var(--atmosphere-glow-secondary), transparent 40%)",
  ];

  const patternGradients: string[] = [];
  if (pattern === "grid") {
    patternGradients.push(
      "linear-gradient(var(--atmosphere-grid-line) 1px, transparent 1px)",
      "linear-gradient(90deg, var(--atmosphere-grid-line) 1px, transparent 1px)"
    );
  } else if (pattern === "dots") {
    patternGradients.push(
      "radial-gradient(var(--atmosphere-dots-line) 1.2px, transparent 0)"
    );
  }

  const patternSize = pattern === "dots" ? "24px 24px" : "140px 140px";
  
  // Combine layers: [Noise] -> [Pattern] -> [Glows]
  const finalGradients = [...patternGradients, ...glowGradients];

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
        backgroundImage: isLowEnd ? finalGradients.join(",") : `${noiseUrl}, ${finalGradients.join(",")}`,
        backgroundSize: isLowEnd
          ? `${patternGradients.map(() => patternSize).join(", ")}, 100% 100%, 100% 100%, 100% 100%, 100% 100%`
          : `140px 140px, ${patternGradients.map(() => patternSize).join(", ")}, 100% 100%, 100% 100%, 100% 100%, 100% 100%`,
        backgroundRepeat: isLowEnd
          ? `${patternGradients.map(() => "repeat").join(", ")}, no-repeat, no-repeat, no-repeat, no-repeat`
          : `repeat, ${patternGradients.map(() => "repeat").join(", ")}, no-repeat, no-repeat, no-repeat, no-repeat`,
        backgroundBlendMode: isLowEnd ? "normal" : `overlay, ${patternGradients.map(() => "normal").join(", ")}, normal, normal, normal, normal`,
        opacity: mounted ? (isLowEnd ? 1 : 0.95) : 0
      }}
    />
  );
}
