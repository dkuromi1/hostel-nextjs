"use client";

import * as React from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { getGalleryItemIndex } from "@/lib/gallery";
import { galleryItems } from "@/lib/site-data";
import { Panel } from "@/components/ui/panel";
import { cn } from "@/lib/utils";

function preloadImage(item: any) {
    if (typeof window === "undefined" || !item || item.type !== "image") return;
    const img = new window.Image();
    img.src = item.src;
}



interface GalleryLightboxProps {
    currentId: string;
}

export function GalleryLightbox({ currentId }: GalleryLightboxProps) {
    const router = useRouter();
    const pathname = usePathname();

    // Decode in case of deep links with special chars
    const decodedId = decodeURIComponent(currentId);

    const [activeIndex, setActiveIndex] = React.useState(() =>
        getGalleryItemIndex(decodedId)
    );

    // Sync from URL changes (like when the user clicks 'Back' or 'Forward')
    React.useEffect(() => {
        const match = pathname.match(/\/gallery\/([^/]+)/);
        if (match && match[1]) {
            const urlId = decodeURIComponent(match[1]);
            const index = getGalleryItemIndex(urlId);
            if (index !== -1 && index !== activeIndex) {
                setActiveIndex(index);
            }
        }
    }, [pathname, activeIndex]);

    // NOTE: There is intentionally NO useEffect that syncs currentId → activeIndex.
    // router.replace() is replaced by window.history.replaceState() below which
    // updates the address bar without triggering any Next.js navigation or RSC
    // re-render. The initial mount value above is the only time currentId is read.

    const item = galleryItems[activeIndex];

    const [touchStart, setTouchStart] = React.useState<number | null>(null);
    const [touchEnd, setTouchEnd] = React.useState<number | null>(null);
    const minSwipeDistance = 50;

    const navigate = React.useCallback((newIndex: number) => {
        setActiveIndex(newIndex);
        
        // Replace state silently updates the URL bar for sharing and deep-linking,
        // without adding garbage to the browser's history stack. This ensures the 
        // hardware Back button cleanly exits the modal.
        window.history.replaceState(null, "", `/gallery/${galleryItems[newIndex].id}`);

        const after = (newIndex + 1) % galleryItems.length;
        const before = newIndex === 0 ? galleryItems.length - 1 : newIndex - 1;
        preloadImage(galleryItems[after]);
        preloadImage(galleryItems[before]);
    }, []);

    const goToNext = React.useCallback(() => {
        if (activeIndex === -1) return;
        navigate((activeIndex + 1) % galleryItems.length);
    }, [activeIndex, navigate]);

    const goToPrev = React.useCallback(() => {
        if (activeIndex === -1) return;
        navigate(activeIndex === 0 ? galleryItems.length - 1 : activeIndex - 1);
    }, [activeIndex, navigate]);

    // Preload both neighbours on first open so the very first navigation is instant.
    React.useEffect(() => {
        if (activeIndex === -1) return;
        const next = (activeIndex + 1) % galleryItems.length;
        const prev = activeIndex === 0 ? galleryItems.length - 1 : activeIndex - 1;
        preloadImage(galleryItems[next]);
        preloadImage(galleryItems[prev]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // intentionally runs once on mount only

    // Keyboard navigation
    React.useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") handleClose();
            if (e.key === "ArrowLeft") goToPrev();
            if (e.key === "ArrowRight") goToNext();
        };
        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [goToPrev, goToNext]); // handleClose dynamically references router which is stable

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
        if (distance > minSwipeDistance) goToNext();
        else if (distance < -minSwipeDistance) goToPrev();
    };

    const handleClose = React.useCallback(() => {
        // If they landed directly via a deep link, the history stack is empty.
        // router.back() would do nothing, trapping them in the modal. We push them to the gallery cleanly.
        // Otherwise, router.back() cleanly pops the Next.js intercept route.
        if (typeof window !== "undefined" && window.history.length <= 2) {
            router.push("/gallery");
        } else {
            router.back();
        }
    }, [router]);

    if (!item) return null;

    const videoRef = React.useRef<HTMLVideoElement>(null);

    React.useEffect(() => {
        const video = videoRef.current;
        if (item && item.type === "video" && video) {
            video.currentTime = 0;
            video.play().catch(() => {});
        }
        return () => {
            if (video) {
                video.pause();
                video.removeAttribute('src');
            }
        };
    }, [item]);

    return (
        <div
            className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-sm animate-in fade-in duration-300"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {/* Click backdrop to close */}
            <button
                onClick={handleClose}
                className="absolute inset-0 cursor-zoom-out"
                aria-label="Close lightbox"
            />

            <Panel className="relative w-fit max-w-[95vw] overflow-hidden border-white/10 bg-slate-950/80 backdrop-blur-2xl shadow-2xl [transform:translateZ(0)] group">
                {item.type === "video" ? (
                    <video
                        ref={videoRef}
                        key={item.id}
                        src={item.src}
                        controls
                        playsInline
                        className="block max-h-[85vh] max-w-[95vw] w-auto h-auto min-w-[30vw] min-h-[30vh]"
                    />
                ) : (
                    <img
                        src={item.src}
                        alt={item.alt}
                        className="block max-h-[85vh] max-w-[95vw] w-auto h-auto min-w-[30vw] min-h-[30vh]"
                    />
                )}

                {/* Navigation Arrows */}
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

                        {/* Image Counter */}
                        <div className="absolute top-4 left-4 z-20 rounded-full bg-black/50 px-3 py-1.5 text-[10px] font-bold tracking-widest text-white/90 backdrop-blur-md">
                            {activeIndex + 1} / {galleryItems.length}
                        </div>

                        {/* Navigation Dots (5-dot positional indicator) */}
                        <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2 rounded-full bg-black/30 px-3 py-2 backdrop-blur-md">
                            {Array.from({ length: 5 }).map((_, i) => {
                                const total = galleryItems.length;
                                const dotProgress = (activeIndex / total) * 5;
                                const isActive = i === Math.floor(dotProgress);
                                return (
                                    <div
                                        key={i}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigate(Math.floor((i / 5) * total));
                                        }}
                                        className={cn(
                                            "h-1 rounded-full transition-all duration-300 cursor-pointer",
                                            isActive ? "w-4 bg-white" : "w-1.5 bg-white/40"
                                        )}
                                    />
                                );
                            })}
                        </div>
                    </>
                )}

                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 z-20 flex size-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md hover:bg-black/70 transition-colors"
                >
                    <X className="size-5" />
                </button>
            </Panel>
        </div>
    );
}
