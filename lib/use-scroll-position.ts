"use client";

import { useSyncExternalStore } from "react";

let scrollY = 0;
const listeners: Set<() => void> = new Set();
let initialized = false;

function handleScroll() {
  const next = typeof window !== "undefined" ? window.scrollY : 0;
  if (next !== scrollY) {
    scrollY = next;
    listeners.forEach((cb) => cb());
  }
}

function subscribe(callback: () => void) {
  if (!initialized && typeof window !== "undefined") {
    initialized = true;
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
  }
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

function getSnapshot() {
  return scrollY;
}

function getServerSnapshot() {
  return 0;
}

/**
 * Returns current window.scrollY.
 * Uses a single shared scroll listener across all components.
 */
export function useScrollPosition() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
