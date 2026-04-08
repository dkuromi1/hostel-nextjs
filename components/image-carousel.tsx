"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

export type CarouselImage = {
    src: string;
    alt: string;
};

type ImageCarouselProps = {
    images: readonly CarouselImage[];
    className?: string;
    autoPlayInterval?: number; // Set to 0 to disable autoplay
};

export function ImageCarousel({
    images,
    className,
    autoPlayInterval = 6000,
}: ImageCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const next = useCallback(() => {
        setCurrentIndex((current) => (current + 1) % images.length);
    }, [images.length]);

    const prev = useCallback(() => {
        setCurrentIndex((current) =>
            current === 0 ? images.length - 1 : current - 1
        );
    }, [images.length]);

    // Auto-play interval
    useEffect(() => {
        if (isHovered || !autoPlayInterval || images.length <= 1) return;
        const timer = setInterval(next, autoPlayInterval);
        return () => clearInterval(timer);
    }, [isHovered, next, autoPlayInterval, images.length]);

    if (!images?.length) return null;

    return (
        <div
            className={cn("group relative w-full overflow-hidden rounded-[24px]", className)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            // Add touch support pauses
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={() => setIsHovered(false)}
        >
            {/* Sliding Track */}
            <div
                className="flex h-full w-full transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {images.map((img, index) => (
                    <div key={index} className="relative h-full w-full shrink-0">
                        <Image
                            src={img.src}
                            alt={img.alt}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                    </div>
                ))}
            </div>

            {/* Navigation Arrows (Fade in on hover on desktop) */}
            {images.length > 1 && (
                <>
                    <button
                        onClick={prev}
                        aria-label="Previous image"
                        className="absolute left-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-slate-800 opacity-40 shadow-sm backdrop-blur transition-all duration-300 hover:scale-105 hover:bg-white focus:opacity-100 group-hover:opacity-100 sm:left-4"
                    >
                        <ChevronLeft className="size-5" />
                    </button>
                    <button
                        onClick={next}
                        aria-label="Next image"
                        className="absolute right-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-slate-800 opacity-40 shadow-sm backdrop-blur transition-all duration-300 hover:scale-105 hover:bg-white focus:opacity-100 group-hover:opacity-100 sm:right-4"
                    >
                        <ChevronRight className="size-5" />
                    </button>
                </>
            )}

            {/* Navigation Dots */}
            {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-slate-900/30 px-3 py-2 backdrop-blur-md">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            aria-label={`Go to slide ${index + 1}`}
                            className={cn(
                                "h-1.5 rounded-full transition-all duration-300",
                                index === currentIndex
                                    ? "w-6 bg-white"
                                    : "w-1.5 bg-white/60 hover:bg-white/90"
                            )}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}