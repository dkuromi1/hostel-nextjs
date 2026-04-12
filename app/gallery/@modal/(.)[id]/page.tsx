"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { X } from "lucide-react";
import { galleryItems } from "@/lib/site-data";
import { Panel } from "@/components/ui/panel";

export default function PhotoModal({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const router = useRouter();
    const { id } = React.use(params);
    const item = galleryItems.find((p) => p.id === id);

    // Close when pressing Escape key
    React.useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") router.back();
        };
        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [router]);

    if (!item) return null;

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-sm animate-in fade-in duration-300">
            {/* Click backdrop to close */}
            <button
                onClick={() => router.back()}
                className="absolute inset-0 cursor-zoom-out"
                aria-label="Close lightbox"
            />

            <Panel className="relative w-fit max-w-[95vw] overflow-hidden border-white/10 bg-slate-950/80 backdrop-blur-2xl shadow-2xl [transform:translateZ(0)]">
                {item.type === "video" ? (
                    <video
                        src={item.src}
                        autoPlay
                        controls
                        className="block h-[85vh] w-auto max-w-[95vw] object-contain"
                    />
                ) : (
                    <Image
                        src={item.src}
                        alt={item.alt}
                        width={1200}
                        height={800}
                        priority
                        className="block h-[85vh] w-auto max-w-[95vw] object-contain"
                        sizes="(max-height: 85vh) 95vw, 1200px"
                    />
                )}

                {/* Close Button */}
                <button
                    onClick={() => router.back()}
                    className="absolute top-4 right-4 z-10 flex size-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md hover:bg-black/70 transition-colors"
                >
                    <X className="size-5" />
                </button>
            </Panel>
        </div>
    );
}
