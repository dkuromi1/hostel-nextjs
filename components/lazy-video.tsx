"use client";

import { useState, useRef, useEffect, type VideoHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface LazyVideoProps extends VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  poster?: string;
  className?: string;
}

export function LazyVideo({ src, poster, className, ...props }: LazyVideoProps) {
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
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
  }, []);

  return (
    <div ref={containerRef} className={cn("relative overflow-hidden", className)}>
      {isInView ? (
        <video
          src={src}
          poster={poster}
          {...props}
          className="size-full object-cover"
        >
          Your browser does not support the video tag.
        </video>
      ) : (
        poster && (
          <img
            src={poster}
            alt="Video poster"
            className="size-full object-cover"
          />
        )
      )}
    </div>
  );
}
