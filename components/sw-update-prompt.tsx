"use client";

import { useEffect, useRef, useState } from "react";
import { RefreshCw, X } from "@/lib/icon-registry";
import { useSerwist } from "@serwist/next/react";

function isAdminRoute(pathname: string) {
  return pathname === "/admin" || pathname.startsWith("/admin/");
}

export function SwUpdatePrompt() {
  const { serwist } = useSerwist();
  const [isVisible, setIsVisible] = useState(false);
  const shouldReloadOnControllerChangeRef = useRef(false);

  useEffect(() => {
    if (!serwist) return;
    if (isAdminRoute(window.location.pathname)) return;

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

    shouldReloadOnControllerChangeRef.current = true;
    setIsVisible(false);
    serwist.messageSkipWaiting();
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
          onClick={() => setIsVisible(false)}
          className="rounded-md p-1 text-muted-foreground transition hover:bg-muted hover:text-foreground"
          aria-label="Dismiss update prompt"
        >
          <X className="size-4" />
        </button>
      </div>
    </div>
  );
}
