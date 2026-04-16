"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type GalleryItem = {
    id: string;
    type: "image" | "video";
    src: string;
    alt: string;
    aspect?: string;
    poster?: string;
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

const PRIORITY_IMAGE_COUNT = 2;

export function GalleryMasonry({ items, columns = { mobile: 2, tablet: 3, desktop: 4 } }: GalleryMasonryProps) {
    const renderItem = (item: GalleryItem, isPriority: boolean) => (
        <Link
            key={item.id}
            href={`/gallery/${item.id}`}
            scroll={false}
            className="group block w-full cursor-zoom-in"
        >
            <div className="media-frame relative overflow-hidden">
                {item.type === "image" ? (
                    <img
                        src={item.src}
                        alt={item.alt}
                        loading={isPriority ? "eager" : "lazy"}
                        className="w-full h-auto bg-slate-100/50 object-cover transition-transform duration-500 will-change-transform group-hover:scale-105"
                        style={item.aspect ? { aspectRatio: item.aspect } : undefined}
                    />
                ) : (
                    <div className="w-full h-auto bg-slate-100/50" style={item.aspect ? { aspectRatio: item.aspect } : undefined}>
                        <video
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            muted
                            playsInline
                            preload="metadata"
                            poster={item.poster}
                            aria-label={item.alt}
                            style={item.aspect ? { aspectRatio: item.aspect } : undefined}
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
        <div className={cn(
            "gap-4",
            columns.mobile === 2 ? "columns-2" : "columns-1",
            columns.tablet === 3 ? "md:columns-3" : "md:columns-2",
            columns.desktop === 4 ? "lg:columns-4" : "lg:columns-3"
        )}>
            {items.map((item, itemIdx) => (
                <div key={item.id} className="mb-4 inline-block w-full break-inside-avoid">
                    {renderItem(item, itemIdx < PRIORITY_IMAGE_COUNT)}
                </div>
            ))}
        </div>
    );
}
