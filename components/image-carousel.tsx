"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "@/lib/icon-registry";
import { motion, type PanInfo } from "framer-motion";

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

const SWIPE_THRESHOLD = 50; // px — minimum drag distance to trigger a slide change
const PRELOAD_RADIUS = 1;

function shouldRenderSlide(
    slideIndex: number,
    currentIndex: number,
    totalSlides: number,
) {
    if (totalSlides <= (PRELOAD_RADIUS * 2) + 1) {
        return true;
    }

    const distance = Math.abs(slideIndex - currentIndex);
    const wrappedDistance = totalSlides - distance;

    return Math.min(distance, wrappedDistance) <= PRELOAD_RADIUS;
}

export function ImageCarousel({
    images,
    className,
    autoPlayInterval = 6000,
}: ImageCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerWidth, setContainerWidth] = useState(0);

    // Track container width for precise pixel-based transforms
    useEffect(() => {
        if (!containerRef.current) return;
        const observer = new ResizeObserver((entries) => {
            if (entries[0]) {
                setContainerWidth(entries[0].contentRect.width);
            }
        });
        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    const next = useCallback(() => {
        setCurrentIndex((current) => (current + 1) % images.length);
    }, [images.length]);

    const prev = useCallback(() => {
        setCurrentIndex((current) =>
            current === 0 ? images.length - 1 : current - 1
        );
    }, [images.length]);

    // Resolve swipe direction from Framer Motion's PanInfo
    const handleDragEnd = useCallback(
        (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
            setIsDragging(false);
            const { offset, velocity } = info;

            // If the swipe is fast enough or far enough
            // Increased velocity threshold slightly to avoid accidental triggers
            if (offset.x < -SWIPE_THRESHOLD || velocity.x < -600) {
                next();
            } else if (offset.x > SWIPE_THRESHOLD || velocity.x > 600) {
                prev();
            }
        },
        [next, prev]
    );

    // Auto-play interval
    useEffect(() => {
        if (isHovered || !autoPlayInterval || images.length <= 1) return;
        // Adding currentIndex to deps ensures the timer resets on any manual navigation,
        // preventing "double-moves" where the timer fires right after a swipe.
        const timer = setInterval(next, autoPlayInterval);
        return () => clearInterval(timer);
    }, [isHovered, next, autoPlayInterval, images.length, currentIndex]);

    if (!images?.length) return null;

    return (
        <div
            ref={containerRef}
            className={cn("group relative w-full overflow-hidden rounded-lg", className)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Sliding Track — driven by Framer Motion spring, draggable on all devices */}
            <motion.div
                className="flex h-full w-full"
                animate={{ x: -currentIndex * containerWidth }}
                transition={{ type: "spring", stiffness: 400, damping: 40, mass: 1 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                dragMomentum={false} // Prevent overshoot and conflict with index state
                onDragStart={() => setIsDragging(true)}
                onDragEnd={handleDragEnd}
                style={{ cursor: isDragging ? "grabbing" : "grab" }}
            >
                {images.map((img, index) => (
                    <div key={index} className="relative h-full w-full shrink-0" style={{ minWidth: "100%" }}>
                        {shouldRenderSlide(index, currentIndex, images.length) ? (
                            <Image
                                src={img.src}
                                alt={img.alt}
                                fill
                                draggable={false} // prevent browser native image drag interfering with FM
                                className="pointer-events-none object-cover"
                                sizes="(max-width: 1024px) 100vw, (max-width: 1400px) 50vw, 700px"
                            />
                        ) : (
                            <div
                                aria-hidden="true"
                                className="h-full w-full bg-[var(--muted)]/50"
                            />
                        )}
                    </div>
                ))}
            </motion.div>

            {/* Navigation Arrows (Fade in on hover on desktop) */}
            {images.length > 1 && (
                <>
                    <button
                        type="button"
                        onClick={prev}
                        aria-label="Previous image"
                        className="absolute left-3 top-1/2 z-20 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-slate-900 opacity-0 shadow-sm backdrop-blur transition-all duration-300 hover:scale-105 hover:bg-white focus:opacity-100 group-hover:opacity-100 sm:left-4"
                    >
                        <ChevronLeft className="size-5" />
                    </button>
                    <button
                        type="button"
                        onClick={next}
                        aria-label="Next image"
                        className="absolute right-3 top-1/2 z-20 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-slate-900 opacity-0 shadow-sm backdrop-blur transition-all duration-300 hover:scale-105 hover:bg-white focus:opacity-100 group-hover:opacity-100 sm:right-4"
                    >
                        <ChevronRight className="size-5" />
                    </button>
                </>
            )}

            {/* Navigation Dots */}
            {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2 rounded-full bg-[var(--surface-dark)]/30 px-3 py-2 backdrop-blur-md">
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
