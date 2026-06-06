"use client";

import { useSyncExternalStore } from "react";

const listeners: Set<() => void> = new Set();
let rafId: number | null = null;

// Cached scroll position — updated only through the scroll handler or on
// first subscribe.  getSnapshot() MUST return a value that doesn't change
// between renders unless `subscribe`'s callback has fired; reading
// window.scrollY live violates that contract and causes infinite re-renders
// when hydration layout shifts nudge scrollY between render and commit.
let cachedScrollY = 0;

function syncScrollY() {
  if (typeof window !== "undefined") {
    cachedScrollY = window.scrollY;
  }
}

function handleScroll() {
  if (rafId !== null) return;
  rafId = requestAnimationFrame(() => {
    rafId = null;
    syncScrollY();
    listeners.forEach((cb) => cb());
  });
}

function subscribe(callback: () => void) {
  if (listeners.size === 0 && typeof window !== "undefined") {
    // Seed the cache with the real scroll position on first subscribe so
    // the initial render gets the correct value (e.g. after a back-nav).
    syncScrollY();
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
  return cachedScrollY;
}

function getServerSnapshot() {
  return 0;
}

/**
 * Returns current window.scrollY.
 * Uses a single shared scroll listener across all components.
 * The cached value is seeded on first subscribe and updated on every scroll
 * frame, so it stays accurate after navigation without violating the
 * useSyncExternalStore snapshot-stability contract.
 */
export function useScrollPosition() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/**
 * Returns a boolean indicating whether the page has been scrolled past a
 * threshold, with hysteresis to prevent flickering.
 *
 * Switches to `true` when scrollY exceeds `above` (default 80).
 * Switches back to `false` when scrollY drops below `below` (default 20).
 *
 * Because hysteresis state is maintained inside the external store's
 * snapshot function, this hook uses no useState/useEffect and never calls
 * setState during render, satisfying react-hooks/set-state-in-effect.
 */
export function useIsScrolled(above = 80, below = 20): boolean {
  // Each call site gets its own independent hysteresis state via a closure
  // that is created once per hook instance via the subscribe factory.
  return useSyncExternalStore(
    subscribe,
    // getSnapshot is recreated each render but its *value* is stable between
    // scroll events, which is the contract useSyncExternalStore requires.
    (() => {
      let isScrolled = cachedScrollY > above;
      return () => {
        if (cachedScrollY > above) isScrolled = true;
        else if (cachedScrollY < below) isScrolled = false;
        return isScrolled;
      };
    })(),
    () => false,
  );
}
