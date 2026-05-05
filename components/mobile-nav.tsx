"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Map as MapIcon, Home, Bed, Camera, Compass, MessageCircleMore } from "@/lib/icon-registry";

const navIcons: Record<string, any> = {
  "home": Home,
  "rooms": Bed,
  "gallery": Camera,
  "experiences": Compass,
  "contact": MessageCircleMore,
};
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import { shouldReduceMotion } from "@/lib/performance";
import type { BusinessChannel } from "@/lib/site-data";
import { BookingComLogo, HostelworldLogo } from "@/components/brand-logos";

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
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const prefersReduced = useReducedMotion();
  
  // Combine Framer's built-in check with our custom low-end device heuristic
  const [shouldReduce, setShouldReduce] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    setShouldReduce(prefersReduced || shouldReduceMotion());
  }, [prefersReduced]);

  const primaryContactChannel =
    contactChannels.find((channel) => channel.stylePriority === "primary") ?? contactChannels[0];

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div className="relative z-50 lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-haspopup="true"
        className={cn(
          "flex size-11 cursor-pointer items-center justify-center rounded-full border text-[var(--text-heading)] shadow-sm",
          shouldReduce 
            ? "border-[var(--border)] bg-white dark:bg-[var(--surface-dark-secondary,#1a0f0a)]"
            : "border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-md"
        )}
      >
        <Menu className="size-5" />
      </button>

      {mounted && createPortal(
        <AnimatePresence>
          {open && (
            <>
              {/* Backdrop Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={cn(
                  "fixed inset-0 z-[60] bg-black/10 lg:hidden transform-gpu",
                  !shouldReduce && "backdrop-blur-[2px]"
                )}
                aria-hidden="true"
                onClick={() => setOpen(false)}
                style={{ viewTransitionName: "mobile-nav-backdrop" } as any}
              />

              {/* Menu Panel */}
              <motion.div
                custom={shouldReduce}
                key="mobile-menu"
                variants={menuVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className={cn(
                  "fixed right-4 top-20 z-[70] w-[min(22rem,calc(100vw-3.5rem))] overflow-hidden rounded-2xl border p-4 shadow-2xl lg:hidden transition-colors duration-500",
                  shouldReduce
                    ? "border-[var(--border)] bg-white dark:bg-[var(--surface-dark-secondary)]"
                    : "border-[var(--glass-border)] bg-white/80 dark:bg-[var(--surface-dark-secondary)]/85 backdrop-blur-2xl transform-gpu"
                )}
                style={{ 
                  originX: 1, 
                  originY: 0, 
                  viewTransitionName: "mobile-nav-menu",
                  willChange: "backdrop-filter, transform"
                } as any}
              >
                <nav className="flex flex-col gap-2">
                  {navLinks.map((item) => {
                    const isActive = pathname === item.href;
                    const isExperiences = item.label.toLowerCase() === "experiences";
                    const Icon = navIcons[item.label.toLowerCase()];

                    return (
                      <motion.div 
                        key={item.href} 
                        variants={itemVariants} 
                        custom={shouldReduce} 
                        className={cn(
                          "relative",
                          isExperiences && mapUrl && "flex items-stretch"
                        )}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className={cn(
                            "group flex items-center gap-3 px-4 py-3 text-base font-medium transition-all duration-200",
                            isExperiences && mapUrl ? "flex-1 rounded-l-2xl" : "rounded-2xl",
                            isActive
                              ? "text-[var(--brand-tertiary)]/75 dark:text-[var(--text-body)] font-semibold ring-1 ring-[var(--brand-tertiary)]/20 dark:ring-white/10 bg-[var(--brand-tertiary)]/5 dark:bg-white/5"
                              : "text-[var(--text-body)] dark:text-[#cbd5e1] hover:bg-[var(--muted)] hover:text-[var(--text-heading)]"
                          )}
                        >
                          {Icon && (
                            <Icon 
                              className={cn(
                                "size-5 transition-transform duration-200 group-hover:scale-110",
                                isActive ? "text-[var(--brand-tertiary)]/60 dark:text-[var(--text-body)]/45" : "text-[var(--text-muted)] group-hover:text-[var(--text-heading)]"
                              )} 
                            />
                          )}
                          <span>{item.label}</span>
                        </Link>
                        {isExperiences && mapUrl ? (
                          <>
                            <div className="w-px bg-[var(--text-muted)]/25 my-2.5" />
                            <Link
                              href={mapUrl}
                              onClick={() => setOpen(false)}
                              aria-label="View on Custom Map"
                              className={cn(
                                "group/map flex items-center justify-center px-4 rounded-r-2xl transition-colors hover:bg-[var(--muted)] text-[var(--text-body)] dark:text-[#cbd5e1] hover:text-[var(--text-heading)]"
                              )}
                            >
                              <MapIcon className="size-5 transition-transform duration-200 group-hover/map:scale-110" />
                            </Link>
                          </>
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
                              "border border-[var(--border)] bg-transparent text-[var(--text-heading)] transition-colors hover:bg-[var(--muted)] flex items-center gap-2 px-3"
                            )}
                          >
                            {channel.id === "booking-com" && <BookingComLogo iconOnly size="sm" />}
                            {channel.id === "hostelworld" && <HostelworldLogo iconOnly size="sm" />}
                            <span className="truncate">{channel.label}</span>
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
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}
