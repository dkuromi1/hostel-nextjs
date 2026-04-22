"use client";

import { useEffect, useRef, useState } from "react";
import { RefreshCw, X } from "lucide-react";

function isServiceWorkerSupported() {
  return typeof window !== "undefined" && "serviceWorker" in navigator;
}

function isAdminRoute(pathname: string) {
  return pathname === "/admin" || pathname.startsWith("/admin/");
}

export function SwUpdatePrompt() {
  const [isVisible, setIsVisible] = useState(false);
  const waitingWorkerRef = useRef<ServiceWorker | null>(null);
  const shouldReloadOnControllerChangeRef = useRef(false);

  useEffect(() => {
    if (!isServiceWorkerSupported()) return;
    if (isAdminRoute(window.location.pathname)) return;

    let isMounted = true;

    const showUpdate = (registration: ServiceWorkerRegistration) => {
      if (!isMounted || !registration.waiting) return;
      waitingWorkerRef.current = registration.waiting;
      setIsVisible(true);
    };

    const onControllerChange = () => {
      if (!shouldReloadOnControllerChangeRef.current) return;
      window.location.reload();
    };

    const onVisibilityChange = () => {
      if (document.visibilityState !== "visible") return;
      navigator.serviceWorker.ready
        .then((registration) => registration.update())
        .catch(() => {
          // Ignore transient update checks failure.
        });
    };

    const setupRegistration = async () => {
      try {
        const registration = await navigator.serviceWorker.register("/sw.js");
        showUpdate(registration);

        registration.addEventListener("updatefound", () => {
          const installing = registration.installing;
          if (!installing) return;

          installing.addEventListener("statechange", () => {
            if (installing.state !== "installed") return;
            if (!navigator.serviceWorker.controller) return;
            showUpdate(registration);
          });
        });
      } catch {
        // Ignore registration errors to avoid breaking the app shell.
      }
    };

    setupRegistration();
    navigator.serviceWorker.addEventListener("controllerchange", onControllerChange);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      isMounted = false;
      navigator.serviceWorker.removeEventListener("controllerchange", onControllerChange);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  const refreshToUpdate = () => {
    const waitingWorker = waitingWorkerRef.current;
    if (!waitingWorker) return;

    shouldReloadOnControllerChangeRef.current = true;
    waitingWorker.postMessage({ type: "SKIP_WAITING" });
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
