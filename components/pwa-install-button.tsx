"use client";

import { useEffect, useState } from "react";
import { Download } from "@/lib/icon-registry";

/**
 * Intercepts the browser's automatic "Add to Home Screen" banner
 * and replaces it with a subtle, footer-level install link.
 * Only renders when the app is actually installable.
 */
export function PwaInstallButton() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Suppress the automatic browser install banner
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    // Detect if already installed as standalone
    const mediaQuery = window.matchMedia("(display-mode: standalone)");
    if (mediaQuery.matches) {
      setTimeout(() => setIsInstalled(true), 0);
    }

    window.addEventListener("beforeinstallprompt", handler);
    window.addEventListener("appinstalled", () => setIsInstalled(true));

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  if (isInstalled || !deferredPrompt) return null;

  const handleInstall = async () => {
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
  };

  return (
    <button
      onClick={handleInstall}
      className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]/70 transition-all hover:text-[var(--text-heading)]"
      title="Install as app for offline access"
    >
      <Download className="size-3" />
      <span>Install App</span>
    </button>
  );
}

// TypeScript types for the BeforeInstallPrompt API (not in standard lib)
interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}
