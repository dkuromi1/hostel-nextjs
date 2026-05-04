"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Map as MapIcon } from "@/lib/icon-registry";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import { shouldReduceMotion } from "@/lib/performance";
import type { BusinessChannel } from "@/lib/site-data";

const menuVariants = {
  hidden: { opacity: 0, scale: 0.95, y: -8 },
  visible: (shouldReduce: boolean) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: shouldReduce
      ? { duration: 0 }
      : {
          type: "spring" as const,
          damping: 24,
          stiffness: 200,
          staggerChildren: 0.04,
          delayChildren: 0.05,
        },
  }),
  exit: (shouldReduce: boolean) => ({
    opacity: 0,
    scale: 0.97,
    y: -6,
    transition: shouldReduce
      ? { duration: 0 }
      : { duration: 0.18, ease: [0.4, 0, 1, 1] as const },
  }),
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: (shouldReduce: boolean) => ({
    opacity: 1,
    x: 0,
    transition: shouldReduce
      ? { duration: 0 }
      : { type: "spring" as const, damping: 22, stiffness: 160 },
  }),
  exit: (shouldReduce: boolean) => ({
    opacity: 0,
    x: -6,
    transition: shouldReduce ? { duration: 0 } : { duration: 0.1 },
  }),
};

export interface MobileNavProps {
  navLinks: { href: string; label: string }[];
  contactChannels: BusinessChannel[];
  bookingChannels: BusinessChannel[];
  mapUrl?: string;
}

export function MobileNav({ navLinks, contactChannels, bookingChannels, mapUrl }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const prefersReduced = useReducedMotion();
  
  // Combine Framer's built-in check with our custom low-end device heuristic
  const [shouldReduce, setShouldReduce] = useState(false);
  
  // We compute shouldReduceMotion() on mount to avoid hydration mismatch 
  // since it uses window.matchMedia and navigator properties.
  useEffect(() => {
    setShouldReduce(prefersReduced || shouldReduceMotion());
  }, [prefersReduced]);

  const primaryContactChannel =
    contactChannels.find((channel) => channel.stylePriority === "primary") ?? contactChannels[0];

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: PointerEvent) {
      const el = containerRef.current;
      if (el && !el.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-haspopup="true"
        className={cn(
          "flex size-11 cursor-pointer items-center justify-center rounded-full border border-[var(--glass-border)] text-[var(--text-heading)] shadow-sm",
          shouldReduce 
            ? "bg-white dark:bg-[var(--surface-dark-secondary,#1a0f0a)]"
            : "bg-[var(--glass-bg)] backdrop-blur-md"
        )}
      >
        <Menu className="size-5" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            custom={shouldReduce}
            key="mobile-menu"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={cn(
              "absolute right-0 top-full z-50 mt-3 w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-[var(--glass-border)] p-4 shadow-2xl",
              shouldReduce
                ? "bg-white dark:bg-[var(--surface-dark-secondary,#1a0f0a)]"
                : "bg-white/98 dark:bg-[var(--surface-dark-secondary,#1a0f0a)]/95 backdrop-blur-xl"
            )}
            style={{ originX: 1, originY: 0 }}
          >
            <nav className="flex flex-col gap-2">
              {navLinks.map((item) => {
                const isActive = pathname === item.href;
                const isExperiences = item.label.toLowerCase() === "experiences";

                return (
                  <motion.div key={item.href} variants={itemVariants} custom={shouldReduce} className={cn(isExperiences && "flex items-center gap-2")}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "block rounded-2xl px-4 py-3 text-base font-medium transition-colors",
                        isExperiences && "flex-1",
                        isActive
                          ? "text-[var(--brand-tertiary)]/75 dark:text-[var(--text-body)] font-semibold ring-1 ring-[var(--brand-tertiary)]/20 dark:ring-0 bg-[var(--brand-tertiary)]/5 dark:bg-transparent"
                          : "text-[var(--text-body)] dark:text-[#cbd5e1] hover:bg-[var(--muted)] hover:text-[var(--text-heading)]"
                      )}
                    >
                      {item.label}
                    </Link>
                    {isExperiences && mapUrl ? (
                      <Link
                        href={mapUrl}
                        onClick={() => setOpen(false)}
                        aria-label="View on Custom Map"
                        className={cn(
                          "flex items-center justify-center shrink-0 size-12 rounded-2xl transition-colors border border-transparent hover:border-[var(--glass-border)] -ml-2",
                          "text-[var(--text-body)] dark:text-[#cbd5e1] hover:bg-[var(--muted)] hover:text-[var(--text-heading)]"
                        )}
                      >
                        <MapIcon className="size-5" />
                      </Link>
                    ) : null}
                  </motion.div>
                );
              })}

              <motion.div
                variants={itemVariants}
                custom={shouldReduce}
                className="mt-3 grid gap-3 border-t border-[var(--border)] pt-4"
              >
                {primaryContactChannel ? (
                  <a
                    href={primaryContactChannel.url}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setOpen(false)}
                    className={cn(
                      buttonVariants({ 
                        variant: primaryContactChannel.icon === "whatsapp" ? "whatsapp" : "default",
                        size: "lg" 
                      }),
                      "h-10 rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-95",
                      primaryContactChannel.icon !== "whatsapp" && "shadow-md"
                    )}
                  >
                    {primaryContactChannel.label}
                  </a>
                ) : null}
                {bookingChannels.length > 0 ? (
                  <div className={cn("grid gap-3", bookingChannels.length === 1 ? "grid-cols-1" : "grid-cols-2")}>
                    {bookingChannels.map((channel) => (
                      <a
                        key={channel.id}
                        href={channel.url}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => setOpen(false)}
                        className={cn(
                          buttonVariants({ variant: "ghost", size: "lg" }),
                          "border border-[var(--border)] bg-transparent text-[var(--text-heading)] transition-colors hover:bg-[var(--muted)]"
                        )}
                      >
                        {channel.label}
                      </a>
                    ))}
                  </div>
                ) : null}
                <div className="mt-1 flex justify-end">
                  <ThemeToggle variant="switch" />
                </div>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
