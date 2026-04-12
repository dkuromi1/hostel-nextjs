"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { galleryItems } from "@/lib/site-data";
import { Panel } from "@/components/ui/panel";
import { cn } from "@/lib/utils";

interface GalleryLightboxProps {
    currentId: string;
}

export function GalleryLightbox({ currentId }: GalleryLightboxProps) {
    const router = useRouter();
    
    // Use local state for navigation to avoid full route re-renders and flashes
    const [activeIndex, setActiveIndex] = React.useState(() => 
        galleryItems.findIndex((p) => p.id === currentId)
    );

    // Sync active index if the prop changes from the outside
    React.useEffect(() => {
        const index = galleryItems.findIndex((p) => p.id === currentId);
        if (index !== -1) setActiveIndex(index);
    }, [currentId]);

    const item = galleryItems[activeIndex];

    const [touchStart, setTouchStart] = React.useState<number | null>(null);
    const [touchEnd, setTouchEnd] = React.useState<number | null>(null);
    const minSwipeDistance = 50;

    const goToNext = React.useCallback(() => {
        if (activeIndex === -1) return;
        const nextIndex = (activeIndex + 1) % galleryItems.length;
        setActiveIndex(nextIndex);
    }, [activeIndex]);

    const goToPrev = React.useCallback(() => {
        if (activeIndex === -1) return;
        const prevIndex = activeIndex === 0 ? galleryItems.length - 1 : activeIndex - 1;
        setActiveIndex(prevIndex);
    }, [activeIndex]);

    // Keyboard navigation
    React.useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") router.back();
            if (e.key === "ArrowLeft") goToPrev();
            if (e.key === "ArrowRight") goToNext();
        };
        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [router, goToPrev, goToNext]);

    // Touch handlers for swiping
    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            goToNext();
        } else if (isRightSwipe) {
            goToPrev();
        }
    };

    if (!item) return null;

    return (
        <div 
            className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-sm animate-in fade-in duration-300"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {/* Click backdrop to close */}
            <button
                onClick={() => router.back()}
                className="absolute inset-0 cursor-zoom-out"
                aria-label="Close lightbox"
            />

            <Panel className="relative w-fit max-w-[95vw] overflow-hidden border-white/10 bg-slate-950/80 backdrop-blur-2xl shadow-2xl [transform:translateZ(0)] group">
                {item.type === "video" ? (
                    <video
                        src={item.src}
                        autoPlay
                        controls
                        className="block max-h-[85vh] max-w-[95vw] w-auto h-auto"
                    />
                ) : (
                    /* Using standard img for intrinsic sizing inside Panel w-fit.
                       max-h and max-w ensure it stays within viewport while maintaining aspect ratio. */
                    <img
                        src={item.src}
                        alt={item.alt}
                        className="block max-h-[85vh] max-w-[95vw] w-auto h-auto"
                    />
                )}

                {/* Navigation Arrows (Inside Panel like room cards) */}
                {galleryItems.length > 1 && (
                    <>
                        <button
                            onClick={(e) => { e.stopPropagation(); goToPrev(); }}
                            className="absolute left-4 top-1/2 z-20 -translate-y-1/2 flex size-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100 sm:opacity-0 touch-none:opacity-100"
                            aria-label="Previous image"
                        >
                            <ChevronLeft className="size-6" />
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); goToNext(); }}
                            className="absolute right-4 top-1/2 z-20 -translate-y-1/2 flex size-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100 sm:opacity-0 touch-none:opacity-100"
                            aria-label="Next image"
                        >
                            <ChevronRight className="size-6" />
                        </button>

                        {/* Image Counter (Fraction) - Essential for mobile context */}
                        <div className="absolute top-4 left-4 z-20 rounded-full bg-black/50 px-3 py-1.5 text-[10px] font-bold tracking-widest text-white/90 backdrop-blur-md">
                            {activeIndex + 1} / {galleryItems.length}
                        </div>

                        {/* Navigation Dots (Exactly 5 dots as a positional indicator) */}
                        <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2 rounded-full bg-black/30 px-3 py-2 backdrop-blur-md">
                            {Array.from({ length: 5 }).map((_, i) => {
                                const total = galleryItems.length;
                                // Determine if this dot is the "active" one based on proportionally where activeIndex is
                                const dotProgress = (activeIndex / total) * 5;
                                const isActive = i === Math.floor(dotProgress);
                                
                                return (
                                    <div
                                        key={i}
                                        onClick={(e) => { 
                                            e.stopPropagation(); 
                                            // Jump to the start of this 20% segment
                                            const targetIndex = Math.floor((i / 5) * total);
                                            setActiveIndex(targetIndex);
                                        }}
                                        className={cn(
                                            "h-1 rounded-full transition-all duration-300 cursor-pointer",
                                            isActive
                                                ? "w-4 bg-white"
                                                : "w-1.5 bg-white/40"
                                        )}
                                    />
                                );
                            })}
                        </div>
                    </>
                )}

                {/* Close Button */}
                <button
                    onClick={() => router.back()}
                    className="absolute top-4 right-4 z-20 flex size-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md hover:bg-black/70 transition-colors"
                >
                    <X className="size-5" />
                </button>
            </Panel>
        </div>
    );
}
