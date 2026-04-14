"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type GalleryItem = {
    id: string;
    type: "image" | "video";
    src: string;
    alt: string;
    aspect: string;
};

type GalleryMasonryProps = {
    items: GalleryItem[];
    columns?: {
        mobile?: number;
        tablet?: number;
        desktop?: number;
    };
    category?: string;
};

export function GalleryMasonry({ items, columns = { mobile: 2, tablet: 3, desktop: 4 } }: GalleryMasonryProps) {
    const columnLayouts = useMemo(() => {
        const distribute = (count: number) => {
            const cols: (GalleryItem & { globalIndex: number })[][] = Array.from({ length: count }, () => []);
            items.forEach((item, index) => {
                cols[index % count].push({ ...item, globalIndex: index });
            });
            return cols;
        };
        return {
            mobile: distribute(columns.mobile || 2),
            tablet: distribute(columns.tablet || 3),
            desktop: distribute(columns.desktop || 4)
        };
    }, [items, columns]);

    const renderItem = (item: GalleryItem & { globalIndex: number }, isPriority: boolean) => (
        <Link
            key={item.id}
            href={`/gallery/${item.id}`}
            scroll={false}
            className="group block w-full cursor-zoom-in"
        >
                <div className={cn("media-frame relative overflow-hidden", item.aspect)}>
                    {item.type === "image" ? (
                        <Image
                            src={item.src}
                            alt={item.alt}
                            fill
                            priority={isPriority}
                            fetchPriority={isPriority ? "high" : "auto"}
                            className="object-cover transition-transform duration-500 will-change-transform group-hover:scale-105"
                            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        />
                    ) : (
                        <div className="h-full w-full">
                            <video
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                autoPlay
                                muted
                                loop
                                playsInline
                                aria-label={item.alt}
                            >
                                <source src={item.src} type="video/mp4" />
                            </video>
                            <div className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors group-hover:bg-black/20">
                                <div className="rounded-full bg-white/20 p-3 backdrop-blur-md">
                                    <div className="size-0 border-y-8 border-l-12 border-y-transparent border-l-white ml-1" />
                                </div>
                            </div>
                        </div>
                    )}
                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
            </div>
        </Link>
    );

    return (
        <div className="flow-root">
            {/* Desktop Masonry */}
            <div className={cn(
                "hidden gap-5",
                columns.desktop === 4 ? "lg:grid lg:grid-cols-4" : "lg:grid lg:grid-cols-3"
            )}>
                {columnLayouts.desktop.map((col, colIdx) => (
                    <div key={`lg-${colIdx}`} className="flex flex-col gap-5">
                        {col.map((item, itemIdx) => renderItem(item, itemIdx < 2))}
                    </div>
                ))}
            </div>

            {/* Tablet Masonry */}
            <div className={cn(
                "hidden md:grid lg:hidden gap-4",
                columns.tablet === 3 ? "md:grid-cols-3" : "md:grid-cols-2"
            )}>
                {columnLayouts.tablet.map((col, colIdx) => (
                    <div key={`md-${colIdx}`} className="flex flex-col gap-4">
                        {col.map((item, itemIdx) => renderItem(item, itemIdx < 2))}
                    </div>
                ))}
            </div>

            {/* Mobile Masonry */}
            <div className="grid grid-cols-2 gap-3 md:hidden">
                {columnLayouts.mobile.map((col, colIdx) => (
                    <div key={`sm-${colIdx}`} className="flex flex-col gap-3">
                        {col.map((item, itemIdx) => renderItem(item, itemIdx < 1))}
                    </div>
                ))}
            </div>
        </div>
    );
}
