"use client";

import { useEffect } from "react";
import { RefreshCw } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-data";

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
        <p className="text-xs uppercase tracking-[0.28em] text-emerald-700">
          Something Interrupted The Page
        </p>
        <h1 className="mt-4 font-heading text-4xl leading-none tracking-[-0.06em] text-slate-950">
          The site hit an error before it finished loading.
        </h1>
        <p className="mt-4 max-w-[58ch] text-base leading-8 text-slate-600">
          Try the page again. If it keeps happening, message Scodrinon directly
          on WhatsApp so you can still book without waiting on the website.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => reset()}
            className={cn(
              buttonVariants({ size: "lg" }),
              "rounded-full bg-emerald-700 text-white hover:bg-emerald-800"
            )}
          >
            <RefreshCw className="size-4" strokeWidth={1.8} />
            Reload The Page
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
            WhatsApp Booking
          </a>
        </div>
        {error.digest ? (
          <p className="mt-6 text-sm text-slate-500">
            Reference: {error.digest}
          </p>
        ) : null}
      </div>
    </div>
  );
}
