"use client";

import { useState, useRef, useEffect, type VideoHTMLAttributes } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LazyVideoProps extends VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  poster?: string;
  className?: string;
  loadOnInteraction?: boolean;
}

export function LazyVideo({ src, poster, className, loadOnInteraction = false, ...props }: LazyVideoProps) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (loadOnInteraction) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "200px", // Start loading 200px before it comes into view
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [loadOnInteraction]);

  return (
    <div ref={containerRef} className={cn("relative overflow-hidden", className)}>
      {shouldLoad ? (
        <video
          src={src}
          poster={poster}
          {...props}
          className="absolute inset-0 size-full object-cover"
        >
          Your browser does not support the video tag.
        </video>
      ) : (
        poster && (
          <Image
            src={poster}
            alt="Video poster"
            fill
            className="object-cover"
            sizes="100vw"
            loading="lazy"
          />
        )
      )}
      {loadOnInteraction && !shouldLoad ? (
        <button
          type="button"
          onClick={() => setShouldLoad(true)}
          className="absolute inset-0 z-10 flex items-center justify-center"
          aria-label="Play video"
        >
          <span className="flex size-14 items-center justify-center rounded-full border border-white/40 bg-black/45 pl-1 text-xl text-white shadow-lg backdrop-blur-sm transition-transform duration-200 hover:scale-105 focus-visible:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
            <span aria-hidden="true">▶</span>
          </span>
        </button>
      ) : null}
    </div>
  );
}
