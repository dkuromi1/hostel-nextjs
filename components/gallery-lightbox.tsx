"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { getGalleryItemIndex } from "@/lib/gallery";
import { warmGalleryItemMedia } from "@/lib/gallery-media";
import { galleryItems } from "@/lib/site-data";
import { cn } from "@/lib/utils";

interface GalleryLightboxProps {
    currentId: string;
}

export function GalleryLightbox({ currentId }: GalleryLightboxProps) {
    const router = useRouter();

    const decodedId = decodeURIComponent(currentId);
    const [activeIndex, setActiveIndex] = React.useState(() => getGalleryItemIndex(decodedId));
    const [showControls, setShowControls] = React.useState(true);

    const directionRef = React.useRef(0);
    const videoRef = React.useRef<HTMLVideoElement>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const mediaRef = React.useRef<HTMLDivElement>(null);
    const pointerRef = React.useRef<{ x: number; y: number; isDragging: boolean } | null>(null);

    const handleClose = React.useCallback(() => {
        if (window.history.length > 1) {
            router.back();
        } else {
            router.replace("/gallery");
        }
    }, [router]);

    const navigate = React.useCallback((newIndex: number, dir: number) => {
        if (mediaRef.current) mediaRef.current.style.transform = "";
        videoRef.current?.pause();
        directionRef.current = dir;
        setActiveIndex(newIndex);
        window.history.replaceState(null, "", `/gallery/${galleryItems[newIndex].id}`);
    }, []);

    const goToNext = React.useCallback(() => {
        if (activeIndex === -1) return;
        navigate((activeIndex + 1) % galleryItems.length, 1);
    }, [activeIndex, navigate]);

    const goToPrev = React.useCallback(() => {
        if (activeIndex === -1) return;
        navigate(activeIndex === 0 ? galleryItems.length - 1 : activeIndex - 1, -1);
    }, [activeIndex, navigate]);

    // Keyboard navigation
    React.useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") handleClose();
            if (e.key === "ArrowLeft") goToPrev();
            if (e.key === "ArrowRight") goToNext();
        };
        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [handleClose, goToPrev, goToNext]);

    // Preload adjacent media
    React.useEffect(() => {
        if (activeIndex === -1) return;
        warmGalleryItemMedia(galleryItems[activeIndex], "high");
        const next = (activeIndex + 1) % galleryItems.length;
        const prev = activeIndex === 0 ? galleryItems.length - 1 : activeIndex - 1;
        warmGalleryItemMedia(galleryItems[next]);
        warmGalleryItemMedia(galleryItems[prev]);
    }, [activeIndex]);

    // Auto-play video when active item is a video
    React.useEffect(() => {
        const video = videoRef.current;
        if (video) {
            video.currentTime = 0;
            video.play().catch(() => {});
        }
        return () => { video?.pause(); };
    }, [activeIndex]);

    // Swipe detection via pointer events
    const onPointerDown = (e: React.PointerEvent) => {
        if ((e.target as HTMLElement).closest("button, video")) return;
        pointerRef.current = { x: e.clientX, y: e.clientY, isDragging: false };
        if (mediaRef.current) mediaRef.current.style.transition = "none";
        if (containerRef.current) containerRef.current.style.transition = "none";
    };

    const onPointerMove = (e: React.PointerEvent) => {
        if (!pointerRef.current) return;
        const dx = e.clientX - pointerRef.current.x;
        const dy = e.clientY - pointerRef.current.y;

        if (!pointerRef.current.isDragging && (Math.abs(dx) > 5 || Math.abs(dy) > 5)) {
            pointerRef.current.isDragging = true;
        }

        if (pointerRef.current.isDragging) {
            if (Math.abs(dx) > Math.abs(dy)) {
                // Horizontal drag (slide)
                if (mediaRef.current) mediaRef.current.style.transform = `translateX(${dx}px)`;
            } else {
                // Vertical drag (dismiss)
                const opacity = Math.max(0, 1 - Math.abs(dy) / 400);
                if (mediaRef.current) mediaRef.current.style.transform = `translateY(${dy}px)`;
                if (containerRef.current) {
                    // Using theme's surface-dark RGB (2, 6, 23)
                    containerRef.current.style.backgroundColor = `rgba(2, 6, 23, ${opacity * 0.9})`;
                    containerRef.current.style.backdropFilter = `blur(${opacity * 8}px)`;
                }
            }
        }
    };

    const onPointerUp = (e: React.PointerEvent) => {
        if (!pointerRef.current) return;
        const dx = e.clientX - pointerRef.current.x;
        const dy = e.clientY - pointerRef.current.y;
        const isDragging = pointerRef.current.isDragging;
        pointerRef.current = null;

        if (!isDragging) {
            return;
        }

        if (mediaRef.current) mediaRef.current.style.transition = "transform 0.3s cubic-bezier(0.2, 0, 0, 1)";
        if (containerRef.current) containerRef.current.style.transition = "all 0.3s cubic-bezier(0.2, 0, 0, 1)";

        if (Math.abs(dx) > 100 && Math.abs(dx) > Math.abs(dy)) {
            dx < 0 ? goToNext() : goToPrev();
        } else if (Math.abs(dy) > 150) {
            handleClose();
        } else {
            // Snap back
            if (mediaRef.current) mediaRef.current.style.transform = "";
            if (containerRef.current) {
                containerRef.current.style.backgroundColor = "";
                containerRef.current.style.backdropFilter = "";
            }
        }
    };

    const item = galleryItems[activeIndex];
    if (!item) return null;

    const mediaClass = "block max-h-[85dvh] max-w-[95vw] w-auto h-auto object-contain rounded-3xl border border-white/10 bg-[var(--surface-dark)]/80 shadow-2xl";

    return (
        <>
            <style>{`
                @keyframes lb-fade-in { from { opacity: 0; } to { opacity: 1; } }
                @keyframes lb-slide-right { from { transform: translateX(60px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
                @keyframes lb-slide-left { from { transform: translateX(-60px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
                @keyframes lb-scale-in { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
                .lb-enter { animation: lb-fade-in 0.25s ease-out both; }
                .lb-slide-right { animation: lb-slide-right 0.2s ease-out both; }
                .lb-slide-left { animation: lb-slide-left 0.2s ease-out both; }
                .lb-scale-in { animation: lb-scale-in 0.25s ease-out both; }
            `}</style>

            <div
                ref={containerRef}
                className="lb-enter fixed inset-0 z-[110] flex items-center justify-center bg-[var(--surface-dark)]/90 backdrop-blur-sm p-4"
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
            >
                {/* Backdrop click to close */}
                <div
                    onClick={handleClose}
                    className="absolute inset-0 cursor-zoom-out"
                    aria-label="Close lightbox"
                />

                {/* Media + controls container */}
                <div className="relative w-full h-[90dvh] max-w-[1400px] flex items-center justify-center group">
                    <div
                        ref={mediaRef}
                        key={activeIndex}
                        className={cn(
                            "absolute inset-0 flex items-center justify-center touch-none cursor-zoom-out",
                            directionRef.current > 0 ? "lb-slide-right" :
                            directionRef.current < 0 ? "lb-slide-left" :
                            "lb-scale-in"
                        )}
                        onClick={(e) => {
                            if (e.target === e.currentTarget) handleClose();
                        }}
                    >
                        {item.type === "video" ? (
                            <div onClick={() => setShowControls(v => !v)}>
                                <video
                                    ref={videoRef}
                                    src={item.src}
                                    controls
                                    playsInline
                                    preload="metadata"
                                    poster={item.poster}
                                    aria-label={item.alt}
                                    className={mediaClass}
                                />
                            </div>
                        ) : (
                            <img
                                src={item.src}
                                alt={item.alt}
                                loading="eager"
                                fetchPriority="high"
                                decoding="sync"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowControls(v => !v);
                                }}
                                className={cn(mediaClass, "pointer-events-auto")}
                            />
                        )}
                    </div>

                    {/* Navigation arrows */}
                    {galleryItems.length > 1 && (
                        <>
                            <button
                                onClick={(e) => { e.stopPropagation(); goToPrev(); }}
                                className={cn(
                                    "absolute left-2 top-1/2 z-20 -translate-y-1/2 flex size-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/20 active:scale-95 cursor-pointer",
                                    showControls ? "opacity-100" : "opacity-0 pointer-events-none sm:group-hover:opacity-100 sm:group-hover:pointer-events-auto"
                                )}
                                aria-label="Previous image"
                            >
                                <ChevronLeft className="size-8" />
                            </button>

                            <button
                                onClick={(e) => { e.stopPropagation(); goToNext(); }}
                                className={cn(
                                    "absolute right-2 top-1/2 z-20 -translate-y-1/2 flex size-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/20 active:scale-95 cursor-pointer",
                                    showControls ? "opacity-100" : "opacity-0 pointer-events-none sm:group-hover:opacity-100 sm:group-hover:pointer-events-auto"
                                )}
                                aria-label="Next image"
                            >
                                <ChevronRight className="size-8" />
                            </button>

                            <div className={cn(
                                "absolute top-4 left-4 z-20 rounded-full bg-black/50 px-3 py-1.5 text-[10px] font-bold tracking-widest text-white/90 backdrop-blur-md transition-opacity duration-300",
                                showControls ? "opacity-100" : "opacity-0 pointer-events-none sm:group-hover:opacity-100"
                            )}>
                                {activeIndex + 1} / {galleryItems.length}
                            </div>
                        </>
                    )}

                    <button
                        onClick={handleClose}
                        className={cn(
                            "absolute top-4 right-4 z-20 flex size-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md hover:bg-black/70 transition-all duration-300 cursor-pointer",
                            showControls ? "opacity-100" : "opacity-0 pointer-events-none sm:group-hover:opacity-100"
                        )}
                    >
                        <X className="size-5" />
                    </button>
                </div>
            </div>
        </>
    );
}
