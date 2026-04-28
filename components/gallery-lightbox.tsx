"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { getGalleryItemIndex } from "@/lib/gallery";
import { warmGalleryItemMedia } from "@/lib/gallery-media";
import { galleryItems } from "@/lib/site-data";
import { cn } from "@/lib/utils";
import {
    motion,
    useMotionValue,
    useTransform,
    type PanInfo,
} from "framer-motion";

interface GalleryLightboxProps {
    currentId: string;
    isModal?: boolean;
}

export function GalleryLightbox({ currentId, isModal = false }: GalleryLightboxProps) {
    const router = useRouter();

    const decodedId = decodeURIComponent(currentId);
    const [activeIndex, setActiveIndex] = React.useState(() => getGalleryItemIndex(decodedId));
    const [showControls, setShowControls] = React.useState(true);

    const directionRef = React.useRef(0);
    const videoRef = React.useRef<HTMLVideoElement>(null);

    // Motion value for vertical drag — drives backdrop fade, zero re-renders
    const dragY = useMotionValue(0);
    const backdropOpacity = useTransform(dragY, [-300, 0, 300], [0, 0.9, 0]);
    const backdropBlur = useTransform(dragY, [-300, 0, 300], [0, 8, 0]);
    const backdropBackground = useTransform(backdropOpacity, (v) => `rgba(2,6,23,${v})`);
    const backdropBlurStyle = useTransform(backdropBlur, (v) => `blur(${v}px)`);

    const handleClose = React.useCallback(() => {
        if (isModal) {
            router.back();
        } else {
            router.push("/gallery", { scroll: false });
        }
    }, [isModal, router]);

    const navigate = React.useCallback((newIndex: number, dir: number) => {
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

    const onDragEnd = (_: never, info: PanInfo) => {
        const { offset, velocity } = info;
        const absX = Math.abs(offset.x);
        const absY = Math.abs(offset.y);

        if (absX > absY) {
            // Horizontal — slide navigation
            if (absX > 80 || Math.abs(velocity.x) > 400) {
                offset.x < 0 ? goToNext() : goToPrev();
            }
        } else {
            // Vertical — dismiss
            if (absY > 120 || Math.abs(velocity.y) > 400) {
                handleClose();
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
                .lb-enter { animation: lb-fade-in 0.25s ease-out both; }
            `}</style>

            {/* Backdrop — opacity driven by dragY motion value, zero re-renders */}
            <motion.div
                className="lb-enter fixed inset-0 z-[110] p-4"
                style={{
                    backgroundColor: backdropBackground,
                    backdropFilter: backdropBlurStyle,
                }}
            >
                {/* Backdrop click to close */}
                <div
                    onClick={handleClose}
                    className="absolute inset-0 cursor-zoom-out"
                    aria-label="Close lightbox"
                />

                {/* Media + controls container */}
                <div className="relative w-full h-full max-w-[1400px] mx-auto flex items-center justify-center group">

                    {/* Single draggable layer — Framer picks x or y based on dragDirectionLock */}
                    <motion.div
                        key={activeIndex}
                        drag
                        dragDirectionLock
                        dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
                        dragElastic={0.6}
                        style={{ y: dragY }}
                        onDragEnd={onDragEnd}
                        initial={
                            directionRef.current === 0 
                                ? { scale: 0.95, opacity: 0 } 
                                : { x: directionRef.current > 0 ? 60 : -60, opacity: 0 }
                        }
                        animate={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                        transition={{ 
                            duration: 0.25, 
                            ease: "easeOut",
                            // Ensure x/y are handled by drag once the initial animation finishes
                        }}
                        className="absolute inset-0 flex items-center justify-center touch-none cursor-grab active:cursor-grabbing"
                        onClick={(e) => {
                            if (e.target === e.currentTarget) handleClose();
                        }}
                    >
                        {item.type === "video" ? (
                            <div
                                className="pointer-events-auto"
                                onClick={(e) => { e.stopPropagation(); setShowControls(v => !v); }}
                            >
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
                    </motion.div>

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
            </motion.div>
        </>
    );
}
