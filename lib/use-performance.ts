"use client";

import { useSyncExternalStore } from "react";
import { isLowEndDevice } from "./performance";

/**
 * React hook to safely access performance state on the client without hydration mismatches.
 */

function subscribe() {
  // No-op: performance state is static for the life of the session
  return () => {};
}

function getSnapshot() {
  return isLowEndDevice();
}

function getServerSnapshot() {
  return false; // Default to High Power on server
}

export function useIsLowEndDevice() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
