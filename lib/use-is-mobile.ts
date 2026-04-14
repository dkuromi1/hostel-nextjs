"use client";

import { useSyncExternalStore } from "react";

/**
 * Shared mobile detection — a single resize listener shared across all subscribers.
 * Replaces per-component `window.addEventListener("resize", ...)` patterns that
 * were creating 20+ independent listeners (one per <Reveal /> instance).
 */

let mobileValue = false;
let listeners: Set<() => void> = new Set();
let initialized = false;

function checkMobile() {
  const next = typeof window !== "undefined" && window.innerWidth < 640;
  if (next !== mobileValue) {
    mobileValue = next;
    listeners.forEach((cb) => cb());
  }
}

function subscribe(callback: () => void) {
  if (!initialized && typeof window !== "undefined") {
    initialized = true;
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
  }
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

function getSnapshot() {
  return mobileValue;
}

function getServerSnapshot() {
  return false;
}

/**
 * Returns `true` when viewport width is < 640px (sm breakpoint).
 * Uses a single shared resize listener across all components.
 */
export function useIsMobile() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
