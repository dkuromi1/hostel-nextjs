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
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);

    // Minimum distance for a swipe to be registered
    const minSwipeDistance = 50;

    const next = useCallback(() => {
        setCurrentIndex((current) => (current + 1) % images.length);
    }, [images.length]);

    const prev = useCallback(() => {
        setCurrentIndex((current) =>
            current === 0 ? images.length - 1 : current - 1
        );
    }, [images.length]);

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
        setIsHovered(true);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        setIsHovered(false);
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            next();
        } else if (isRightSwipe) {
            prev();
        }
    };

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
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
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
                            sizes="(max-width: 1024px) 100vw, (max-width: 1400px) 50vw, 700px"
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
                        className="absolute left-3 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-slate-800 opacity-0 shadow-sm backdrop-blur transition-all duration-300 hover:scale-105 hover:bg-white focus:opacity-100 group-hover:opacity-100 sm:left-4"
                    >
                        <ChevronLeft className="size-5" />
                    </button>
                    <button
                        onClick={next}
                        aria-label="Next image"
                        className="absolute right-3 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-slate-800 opacity-0 shadow-sm backdrop-blur transition-all duration-300 hover:scale-105 hover:bg-white focus:opacity-100 group-hover:opacity-100 sm:right-4"
                    >
                        <ChevronRight className="size-5" />
                    </button>
                </>
            )}

            {/* Navigation Dots */}
            {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2 rounded-full bg-slate-900/30 px-3 py-2 backdrop-blur-md">
                    {images.map((_, index) => (
                        <div
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={cn(
                                "cursor-pointer relative h-1.5 rounded-full transition-all duration-300",
                                "before:absolute before:left-1/2 before:top-1/2 before:h-11 before:w-[calc(100%+8px)] before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']",
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