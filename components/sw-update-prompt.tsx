"use client";

import { useEffect, useRef, useState } from "react";
import { RefreshCw, X } from "@/lib/icon-registry";
import { useSerwist } from "@serwist/next/react";

const DISMISSED_KEY = "sw-update-dismissed";

function isAdminRoute(pathname: string) {
  return pathname === "/admin" || pathname.startsWith("/admin/");
}

/**
 * Returns true if the user has already dismissed the update banner this
 * browser session.  We use sessionStorage so the flag is cleared when the
 * tab closes (or after the page fully reloads on accept).
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

export function SwUpdatePrompt() {
  const { serwist } = useSerwist();
  const [isVisible, setIsVisible] = useState(false);
  const shouldReloadOnControllerChangeRef = useRef(false);

  useEffect(() => {
    if (!serwist) return;
    if (isAdminRoute(window.location.pathname)) return;
    // Don't re-show the banner if the user already dismissed it this session.
    if (wasDismissedThisSession()) return;

    let isMounted = true;

    const showUpdate = () => {
      if (!isMounted) return;
      setIsVisible(true);
    };

    const onControlling = () => {
      if (!shouldReloadOnControllerChangeRef.current) return;
      window.location.reload();
    };

    const onVisibilityChange = () => {
      if (document.visibilityState !== "visible") return;
      serwist
        .update()
        .catch(() => {
          // Ignore transient update checks failure.
        });
    };

    serwist.addEventListener("waiting", showUpdate);
    serwist.addEventListener("controlling", onControlling);
    document.addEventListener("visibilitychange", onVisibilityChange);

    // Detect a service worker that was already in the `waiting` state before
    // our listener was attached (e.g. the SW updated while the component was
    // unmounted and remounted during a soft Next.js navigation).
    void navigator.serviceWorker
      .getRegistration()
      .then((reg) => {
        if (isMounted && reg?.waiting) {
          showUpdate();
        }
      })
      .catch(() => {
        // Ignore — SW may not be supported or registered yet.
      });

    void serwist.register().catch(() => {
      // Ignore registration errors to avoid breaking the app shell.
    });

    return () => {
      isMounted = false;
      serwist.removeEventListener("waiting", showUpdate);
      serwist.removeEventListener("controlling", onControlling);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [serwist]);

  const refreshToUpdate = () => {
    if (!serwist) return;

    // Clear the dismissed flag — the page will fully reload anyway, which
    // clears sessionStorage, but being explicit makes the intent obvious.
    clearDismissed();
    shouldReloadOnControllerChangeRef.current = true;
    setIsVisible(false);
    serwist.messageSkipWaiting();
  };

  const dismiss = () => {
    // Persist the dismissal for this session so the prompt doesn't re-appear
    // on the next soft navigation / component remount.
    markDismissed();
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-x-4 bottom-4 z-[100] mx-auto flex w-full max-w-md items-center gap-3 rounded-xl border border-border bg-background/95 p-3 shadow-xl backdrop-blur">
      <RefreshCw className="size-4 shrink-0 text-primary" aria-hidden="true" />
      <p className="text-sm text-foreground">New version available. Refresh to update.</p>
      <div className="ml-auto flex items-center gap-2">
        <button
          type="button"
          onClick={refreshToUpdate}
          className="rounded-md bg-primary px-2.5 py-1 text-xs font-semibold text-primary-foreground transition hover:bg-primary/90"
        >
          Refresh
        </button>
        <button
          type="button"
          onClick={dismiss}
          className="rounded-md p-1 text-muted-foreground transition hover:bg-muted hover:text-foreground"
          aria-label="Dismiss update prompt"
        >
          <X className="size-4" />
        </button>
      </div>
    </div>
  );
}
