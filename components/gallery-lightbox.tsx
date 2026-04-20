"use client";

import * as React from "react";
import { useRouter, usePathname } from "next/navigation";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { getGalleryItemIndex } from "@/lib/gallery";
import { galleryItems } from "@/lib/site-data";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence, useAnimation, usePresence } from "framer-motion";

type GalleryItem = (typeof galleryItems)[number];

function preloadImage(item?: GalleryItem) {
    if (typeof window === "undefined" || !item || item.type !== "image") return;
    const img = new window.Image();
    img.src = item.src;
}

interface GalleryLightboxProps {
    currentId: string;
}

// Sub-component to isolate video logic and prevent ref-collision during AnimatePresence transitions
function GalleryVideo({ src, poster, alt, layoutId }: { src: string; poster?: string; alt: string; layoutId?: string }) {
    const videoRef = React.useRef<HTMLVideoElement>(null);
    const [isPresent] = usePresence();

    React.useEffect(() => {
        const video = videoRef.current;
        if (video) {
            if (isPresent) {
                video.currentTime = 0;
                video.play().catch(() => {});
            } else {
                video.pause();
            }
        }
    }, [isPresent, src]);

    React.useEffect(() => {
        return () => {
            if (videoRef.current) videoRef.current.pause();
        };
    }, []);

    return (
        <motion.video
            ref={videoRef}
            layoutId={layoutId}
            src={src}
            controls
            playsInline
            preload="metadata"
            poster={poster}
            aria-label={alt}
            className="block max-h-[85dvh] max-w-[95vw] w-auto h-auto object-contain rounded-3xl border border-white/10 bg-slate-950/80 backdrop-blur-xl shadow-2xl [transform:translateZ(0)]"
        />
    );
}

export function GalleryLightbox({ currentId }: GalleryLightboxProps) {
    const router = useRouter();
    const pathname = usePathname();
    const controls = useAnimation();
    const [isInitialMount, setIsInitialMount] = React.useState(true);

    const decodedId = decodeURIComponent(currentId);
    
    // Store our intended index in a Ref to safely track it outside of the async render cycle
    const targetIndexRef = React.useRef(getGalleryItemIndex(decodedId));

    const [activeIndex, setActiveIndex] = React.useState(targetIndexRef.current);
    const [direction, setDirection] = React.useState(0);
    const [showControls, setShowControls] = React.useState(true);

    // Sync BROWSER navigation (Back/Forward) without colliding with local state updates
    React.useEffect(() => {
        const match = pathname.match(/\/gallery\/([^/]+)/);
        if (match && match[1]) {
            const urlId = decodeURIComponent(match[1]);
            const index = getGalleryItemIndex(urlId);
            // ONLY update if the URL changed externally from BROWSER navigation, 
            // bypassing the race condition of async React renders.
            if (index !== -1 && index !== targetIndexRef.current) {
                targetIndexRef.current = index;
                setActiveIndex(index);
                // If the user navigates via browser buttons, we've definitely finished our 'initial' masonry entry
                setIsInitialMount(false); 
            }
        }
    }, [pathname]);

    const navigate = React.useCallback((newIndex: number, forcedDirection?: number) => {
        setIsInitialMount(false); 

        // If forced direction is omitted, calculate intuitively (especially for wrapping)
        let newDirection = forcedDirection;
        if (newDirection === undefined) {
            const diff = newIndex - activeIndex;
            const total = galleryItems.length;
            if (Math.abs(diff) > total / 2) {
                // We wrapped!
                newDirection = diff > 0 ? -1 : 1;
            } else {
                newDirection = diff > 0 ? 1 : -1;
            }
        }

        setDirection(newDirection);
        targetIndexRef.current = newIndex;
        setActiveIndex(newIndex);
        
        window.history.replaceState(null, "", `/gallery/${galleryItems[newIndex].id}`);

        const after = (newIndex + 1) % galleryItems.length;
        const before = newIndex === 0 ? galleryItems.length - 1 : newIndex - 1;
        preloadImage(galleryItems[after]);
        preloadImage(galleryItems[before]);
    }, [activeIndex]);

    const goToNext = React.useCallback(() => {
        if (activeIndex === -1) return;
        navigate((activeIndex + 1) % galleryItems.length, 1);
    }, [activeIndex, navigate]);

    const goToPrev = React.useCallback(() => {
        if (activeIndex === -1) return;
        navigate(activeIndex === 0 ? galleryItems.length - 1 : activeIndex - 1, -1);
    }, [activeIndex, navigate]);

    React.useEffect(() => {
        if (activeIndex === -1) return;
        const next = (activeIndex + 1) % galleryItems.length;
        const prev = activeIndex === 0 ? galleryItems.length - 1 : activeIndex - 1;
        preloadImage(galleryItems[next]);
        preloadImage(galleryItems[prev]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); 

    React.useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") handleClose();
            if (e.key === "ArrowLeft") goToPrev();
            if (e.key === "ArrowRight") goToNext();
        };
        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [goToPrev, goToNext]); 

    const handleClose = React.useCallback(() => {
        if (typeof window !== "undefined" && window.history.length <= 2) {
            router.push("/gallery");
        } else {
            router.back();
        }
    }, [router]);

    const item = galleryItems[activeIndex];

    if (!item) return null;

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
        })
    };

    return (
        <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-950/90 p-4"
        >
            {/* Click backdrop to close */}
            <div
                onClick={handleClose}
                className="absolute inset-0 cursor-zoom-out"
                aria-label="Close lightbox"
            />

            <motion.div 
                className="relative w-full h-[90dvh] max-w-[1400px] flex items-center justify-center group"
                drag="y"
                dragConstraints={{ top: 0, bottom: 0 }}
                dragElastic={0.8}
                onDragEnd={(e, { offset }) => {
                    const dragDistance = offset.y;
                    if (Math.abs(dragDistance) > 100) {
                        handleClose();
                    } else {
                        controls.start({ y: 0 });
                    }
                }}
                animate={controls}
            >
                <AnimatePresence custom={direction}>
                    <motion.div
                        key={activeIndex}
                        custom={direction}
                        variants={variants}
                        initial={isInitialMount ? "center" : "enter"}
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "tween", ease: "easeInOut", duration: 0.2 },
                            opacity: { duration: 0.2 }
                        }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={(e, { offset }) => {
                            if (offset.x < -60) {
                                goToNext();
                            } else if (offset.x > 60) {
                                goToPrev();
                            }
                        }}
                        onClick={(e) => {
                            // If user clicks the transparent empty space around the image, close the lightbox
                            if (e.target === e.currentTarget) handleClose();
                        }}
                        className="absolute inset-0 flex justify-center items-center"
                    >
                        <div className="relative flex justify-center items-center h-full w-full pointer-events-none">
                            {item.type === "video" ? (
                                <div className="pointer-events-auto" onClick={(e) => { e.stopPropagation(); setShowControls(v => !v); }}>
                                    <GalleryVideo 
                                        src={item.src} 
                                        poster={item.poster} 
                                        alt={item.alt}
                                        layoutId={isInitialMount ? `gallery-media-${item.id}` : undefined}
                                    />
                                </div>
                            ) : (
                                <motion.img
                                    layoutId={isInitialMount ? `gallery-media-${item.id}` : undefined}
                                    src={item.src}
                                    alt={item.alt}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowControls(v => !v);
                                    }}
                                    className="block max-h-[85dvh] max-w-[95vw] w-auto h-auto object-contain rounded-3xl border border-white/10 bg-slate-950/80 backdrop-blur-xl shadow-2xl [transform:translateZ(0)] pointer-events-auto"
                                />
                            )}
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows */}
                {galleryItems.length > 1 && (
                    <>
                        {/* Invisible enlarged hit target for Prev Arrow */}
                        <div 
                            onPointerDown={(e) => e.stopPropagation()}
                            onClick={(e) => { e.stopPropagation(); goToPrev(); }}
                            className={cn(
                                "absolute left-2 top-1/2 z-20 h-[80px] w-[80px] -translate-y-1/2 cursor-pointer flex items-center justify-center group/btn transition-opacity duration-300",
                                showControls ? "opacity-100" : "opacity-0 pointer-events-none sm:group-hover:opacity-100 sm:group-hover:pointer-events-auto"
                            )}
                        >
                            <button
                                className="flex size-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/20 active:scale-95"
                                aria-label="Previous image"
                            >
                                <ChevronLeft className="size-8" />
                            </button>
                        </div>
                        
                        {/* Invisible enlarged hit target for Next Arrow */}
                        <div 
                            onPointerDown={(e) => e.stopPropagation()}
                            onClick={(e) => { e.stopPropagation(); goToNext(); }}
                            className={cn(
                                "absolute right-2 top-1/2 z-20 h-[80px] w-[80px] -translate-y-1/2 cursor-pointer flex items-center justify-center group/btn transition-opacity duration-300",
                                showControls ? "opacity-100" : "opacity-0 pointer-events-none sm:group-hover:opacity-100 sm:group-hover:pointer-events-auto"
                            )}
                        >
                            <button
                                className="flex size-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/20 active:scale-95"
                                aria-label="Next image"
                            >
                                <ChevronRight className="size-8" />
                            </button>
                        </div>

                        <div className={cn(
                            "absolute top-4 left-4 z-20 rounded-full bg-black/50 px-3 py-1.5 text-[10px] font-bold tracking-widest text-white/90 backdrop-blur-md transition-opacity duration-300",
                            showControls ? "opacity-100" : "opacity-0 pointer-events-none sm:group-hover:opacity-100"
                        )}>
                            {activeIndex + 1} / {galleryItems.length}
                        </div>

                        <div 
                            onPointerDown={(e) => e.stopPropagation()}
                            className={cn(
                                "absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2 rounded-full bg-black/30 px-3 py-2 backdrop-blur-md transition-opacity duration-300",
                                showControls ? "opacity-100" : "opacity-0 pointer-events-none sm:group-hover:opacity-100"
                            )}
                        >
                            {Array.from({ length: 5 }).map((_, i) => {
                                const totalItems = galleryItems.length;
                                const maxDotIndex = 4;
                                const activeDot = Math.round((activeIndex / (totalItems - 1)) * maxDotIndex);
                                const isActive = i === activeDot;
                                const targetIndex = Math.round((i / maxDotIndex) * (totalItems - 1));

                                return (
                                    <div
                                        key={i}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigate(targetIndex);
                                        }}
                                        className="relative flex items-center justify-center py-[10px] px-[6px] -mx-[6px] -my-[8px] cursor-pointer"
                                    >
                                        <div
                                            className={cn(
                                                "h-1 rounded-full transition-all duration-300",
                                                isActive ? "w-4 bg-white" : "w-1.5 bg-white/40 hover:bg-white/60"
                                            )}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}

                <button
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={handleClose}
                    className={cn(
                        "absolute top-4 right-4 z-20 flex size-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md hover:bg-black/70 transition-all duration-300",
                        showControls ? "opacity-100" : "opacity-0 pointer-events-none sm:group-hover:opacity-100"
                    )}
                >
                    <X className="size-5" />
                </button>
            </motion.div>
        </motion.div>
    );
}
