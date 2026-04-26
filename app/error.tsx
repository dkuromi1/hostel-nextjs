"use client";

import { useEffect } from "react";
import { RefreshCw } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteConfig, siteCopyContent } from "@/lib/site-data";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="shell-container py-20">
      <div className="mx-auto max-w-3xl rounded-[34px] border border-white/70 bg-white/85 p-8 shadow-[0_24px_80px_-42px_rgba(15,23,42,0.35)]">
        <p className="text-xs uppercase tracking-[0.28em] text-[var(--brand-primary)]">
          {siteCopyContent.errorPage.eyebrow}
        </p>
        <h1 className="mt-4 heading-state text-[var(--text-heading)]">
          {siteCopyContent.errorPage.title}
        </h1>
        <p className="mt-4 max-w-[58ch] text-body-lg">
          {siteCopyContent.errorPage.description}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => reset()}
            className={cn(
              buttonVariants({ size: "lg" }),
              "rounded-full bg-[var(--brand-primary)] text-[var(--primary-foreground)] hover:bg-[var(--brand-primary-dark)]"
            )}
          >
            <RefreshCw className="size-4" strokeWidth={1.8} />
            {siteCopyContent.errorPage.reloadLabel}
          </button>
          <a
            href={siteConfig.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "rounded-full bg-white"
            )}
          >
            {siteCopyContent.errorPage.contactLabel}
          </a>
        </div>
        {error.digest ? (
          <p className="mt-6 text-sm text-[var(--text-muted)]">
            Reference: {error.digest}
          </p>
        ) : null}
      </div>
    </div>
  );
}
