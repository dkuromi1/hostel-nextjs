"use client";

import Link from "next/link";
import { warmGalleryItemMedia } from "@/lib/gallery-media";
import { useState, useEffect } from "react";
import { type GalleryItem } from "@/lib/site-data";



type GalleryMasonryProps = {
    items: GalleryItem[];
    columns?: {
        mobile?: number;
        tablet?: number;
        desktop?: number;
    };
    category?: string;
    priorityImageCount?: number;
};

const DEFAULT_PRIORITY_IMAGE_COUNT = 2;

function distributeItems(items: GalleryItem[], numColumns: number) {
    const columnData = Array.from({ length: numColumns }, () => ({
        height: 0,
        items: [] as { item: GalleryItem; originalIndex: number }[]
    }));

    items.forEach((item, index) => {
        let shortestCol = 0;
        let minHeight = columnData[0].height;
        for (let i = 1; i < numColumns; i++) {
            if (columnData[i].height < minHeight) {
                minHeight = columnData[i].height;
                shortestCol = i;
            }
        }

        let heightToAdd = 1;
        if (item.aspect) {
            const [w, h] = item.aspect.split('/').map(Number);
            if (w && h) heightToAdd = h / w;
        }

        columnData[shortestCol].items.push({ item, originalIndex: index });
        columnData[shortestCol].height += heightToAdd;
    });

    return columnData.map(col => col.items);
}

export function GalleryMasonry({
    items,
    columns = { mobile: 2, tablet: 3, desktop: 4 },
    priorityImageCount = DEFAULT_PRIORITY_IMAGE_COUNT,
}: GalleryMasonryProps) {
    const [columnCount, setColumnCount] = useState(4); // Default to desktop

    useEffect(() => {
        const updateColumns = () => {
            const width = window.innerWidth;
            if (width < 768) {
                setColumnCount(columns.mobile || 2);
            } else if (width < 1024) {
                setColumnCount(columns.tablet || 3);
            } else {
                setColumnCount(columns.desktop || 4);
            }
        };

        updateColumns();
        window.addEventListener("resize", updateColumns);
        return () => window.removeEventListener("resize", updateColumns);
    }, [columns]);

    const renderItem = (item: GalleryItem, isPriority: boolean) => (
        <Link
            key={item.id}
            href={`/gallery/${item.id}`}
            scroll={false}
            onPointerEnter={() => {
                void warmGalleryItemMedia(item, "high");
            }}
            onPointerDown={() => {
                void warmGalleryItemMedia(item, "high");
            }}
            onFocus={() => {
                void warmGalleryItemMedia(item, "high");
            }}
            className="group block w-full cursor-zoom-in"
        >
            <div className="media-frame relative overflow-hidden">
                {item.type === "image" ? (
                    <img
                        src={item.src}
                        alt={item.alt}
                        loading={isPriority ? "eager" : "lazy"}
                        className="w-full h-auto object-cover will-change-transform transition-transform duration-[400ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                        style={item.aspect ? { aspectRatio: item.aspect } : undefined}
                    />
                ) : (
                    <div className="w-full h-auto bg-slate-100/50" style={item.aspect ? { aspectRatio: item.aspect } : undefined}>
                        <video
                            className="w-full h-full object-cover will-change-transform transition-transform duration-[400ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
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
                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10 pointer-events-none" />
            </div>
        </Link>
    );

    const cols = distributeItems(items, columnCount);

    return (
        <div className="w-full">
            <div className="flex gap-4">
                {cols.map((colItems, colIdx) => (
                    <div key={colIdx} className="flex flex-col gap-4 flex-1">
                        {colItems.map(({ item, originalIndex }) => (
                            <div key={item.id} className="w-full">
                                {renderItem(item, originalIndex < priorityImageCount)}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
