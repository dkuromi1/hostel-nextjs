"use client";

import { useSyncExternalStore } from "react";

const listeners: Set<() => void> = new Set();
let rafId: number | null = null;

function handleScroll() {
  if (rafId !== null) return;
  rafId = requestAnimationFrame(() => {
    rafId = null;
    listeners.forEach((cb) => cb());
  });
}

function subscribe(callback: () => void) {
  if (listeners.size === 0 && typeof window !== "undefined") {
    window.addEventListener("scroll", handleScroll, { passive: true });
  }
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
    if (listeners.size === 0 && typeof window !== "undefined") {
      window.removeEventListener("scroll", handleScroll);
    }
  };
}

function getSnapshot() {
  // Always read directly from the DOM — never from a stale module-level cache.
  // This ensures navigating to the homepage never picks up scroll state
  // left over from a previous page.
  return typeof window !== "undefined" ? window.scrollY : 0;
}

function getServerSnapshot() {
  return 0;
}

/**
 * Returns current window.scrollY.
 * Uses a single shared scroll listener across all components.
 * Reads directly from window.scrollY so it is always accurate after navigation.
 */
export function useScrollPosition() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
