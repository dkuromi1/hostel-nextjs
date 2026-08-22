"use client";

import { useEffect, useRef, useState } from "react";
import { RefreshCw, X } from "@/lib/icon-registry";
import { useSerwist } from "@serwist/next/react";
import { cn } from "@/lib/utils";

const DISMISSED_KEY = "sw-update-dismissed";
const UPDATE_CHECK_INTERVAL_MS = 15 * 60 * 1000; // 15 minutes throttle for background checks

function isAdminRoute(pathname: string) {
  return pathname === "/admin" || pathname.startsWith("/admin/");
}

/**
 * Returns true if the user has already dismissed the update banner this
 * browser session. We use sessionStorage so the flag is cleared when the
 * tab closes or after the page fully reloads.
 */
function wasDismissedThisSession(): boolean {
  try {
    return sessionStorage.getItem(DISMISSED_KEY) === "1";
  } catch {
    return false;
  }
}

function markDismissed() {
  try {
    sessionStorage.setItem(DISMISSED_KEY, "1");
  } catch {
    // sessionStorage blocked (private browsing restrictions etc.) — ignore.
  }
}

function clearDismissed() {
  try {
    sessionStorage.removeItem(DISMISSED_KEY);
  } catch {
    // ignore
  }
}

interface SwUpdatePromptProps {
  showPrompt?: boolean;
}

export function SwUpdatePrompt({ showPrompt = false }: SwUpdatePromptProps) {
  const { serwist } = useSerwist();
  const [isVisible, setIsVisible] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const isDismissedRef = useRef(false);
  const lastCheckTimeRef = useRef(0);
  const reloadingRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (isAdminRoute(window.location.pathname)) return;
    if (wasDismissedThisSession()) {
      isDismissedRef.current = true;
      return;
    }

    let isMounted = true;

    const showUpdate = () => {
      if (!isMounted) return;
      if (!showPrompt) {
        // Organic / silent refresh mode: automatically tell the waiting service worker to skip waiting
        // so it activates seamlessly in the background without displaying any prompt banner
        try {
          serwist?.messageSkipWaiting();
        } catch {
          // Ignore
        }
        if ("serviceWorker" in navigator) {
          void navigator.serviceWorker.getRegistration().then((reg) => {
            if (reg?.waiting) {
              reg.waiting.postMessage({ type: "SKIP_WAITING" });
            }
          }).catch(() => {
            // Ignore
          });
        }
        return;
      }
      if (isDismissedRef.current || wasDismissedThisSession()) return;
      setIsVisible(true);
    };

    const doReload = () => {
      if (reloadingRef.current) return;
      reloadingRef.current = true;
      window.location.reload();
    };

    const onControlling = () => {
      if (showPrompt && (isUpdating || reloadingRef.current)) {
        doReload();
      }
    };

    const onVisibilityChange = () => {
      if (document.visibilityState !== "visible") return;
      const now = Date.now();
      // Throttle update checks to avoid aggressive polling on iOS tab switches
      if (now - lastCheckTimeRef.current < UPDATE_CHECK_INTERVAL_MS) return;
      lastCheckTimeRef.current = now;

      serwist?.update().catch(() => {
        // Ignore transient update check errors
      });
    };

    if (serwist) {
      serwist.addEventListener("waiting", showUpdate);
      serwist.addEventListener("controlling", onControlling);
    }

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.addEventListener("controllerchange", onControlling);

      // Check if a service worker is already waiting
      void navigator.serviceWorker.getRegistration().then((reg) => {
        if (isMounted && reg?.waiting) {
          showUpdate();
        }
      }).catch(() => {
        // Ignore
      });

      if (serwist) {
        void serwist.register().catch(() => {
          // Ignore registration errors
        });
      }
    }

    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      isMounted = false;
      if (serwist) {
        serwist.removeEventListener("waiting", showUpdate);
        serwist.removeEventListener("controlling", onControlling);
      }
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker.removeEventListener("controllerchange", onControlling);
      }
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [serwist, isUpdating, showPrompt]);

  const refreshToUpdate = async () => {
    if (isUpdating || reloadingRef.current) return;
    setIsUpdating(true);
    clearDismissed();

    const doReload = () => {
      if (reloadingRef.current) return;
      reloadingRef.current = true;
      window.location.reload();
    };

    // 1. Listen for controllerchange on serviceWorker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.addEventListener("controllerchange", doReload, { once: true });
    }

    // 2. Tell serwist to skip waiting
    try {
      serwist?.messageSkipWaiting();
    } catch {
      // Ignore
    }

    // 3. Directly post SKIP_WAITING to waiting or active service worker for maximum compatibility
    if ("serviceWorker" in navigator) {
      try {
        const reg = await navigator.serviceWorker.getRegistration();
        if (reg?.waiting) {
          reg.waiting.postMessage({ type: "SKIP_WAITING" });
        } else if (reg?.installing) {
          reg.installing.postMessage({ type: "SKIP_WAITING" });
        }
      } catch {
        // Ignore
      }
    }

    // 4. Safety fallback: if controllerchange doesn't fire within 800ms, force reload
    setTimeout(() => {
      doReload();
    }, 800);
  };

  const dismiss = () => {
    isDismissedRef.current = true;
    markDismissed();
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      role="alert"
      aria-live="polite"
      className={cn(
        "fixed inset-x-4 z-[100] mx-auto flex w-full max-w-md items-center gap-3",
        "bottom-[calc(4.75rem+env(safe-area-inset-bottom,0px))] lg:bottom-4",
        "rounded-xl border border-border bg-background/95 p-3.5 shadow-2xl backdrop-blur",
        "pointer-events-auto select-none touch-manipulation transition-all duration-200 animate-in fade-in slide-in-from-bottom-3"
      )}
    >
      <RefreshCw
        className={cn("size-4 shrink-0 text-primary", isUpdating && "animate-spin")}
        aria-hidden="true"
      />
      <p className="text-sm font-medium text-foreground">
        {isUpdating ? "Updating to latest version..." : "New version available."}
      </p>
      <div className="ml-auto flex items-center gap-2">
        <button
          type="button"
          onClick={refreshToUpdate}
          disabled={isUpdating}
          className={cn(
            "inline-flex min-h-[36px] min-w-[72px] items-center justify-center rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-sm",
            "transition-all hover:bg-primary/90 active:scale-95 disabled:pointer-events-none disabled:opacity-60",
            "cursor-pointer touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          )}
        >
          {isUpdating ? "Updating..." : "Refresh"}
        </button>
        {!isUpdating && (
          <button
            type="button"
            onClick={dismiss}
            className={cn(
              "inline-flex min-h-[36px] min-w-[36px] items-center justify-center rounded-lg p-2 text-muted-foreground",
              "transition-all hover:bg-muted hover:text-foreground active:scale-95",
              "cursor-pointer touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            )}
            aria-label="Dismiss update prompt"
          >
            <X className="size-4" />
          </button>
        )}
      </div>
    </div>
  );
}
