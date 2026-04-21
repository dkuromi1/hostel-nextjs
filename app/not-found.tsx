import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { siteCopyContent } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="shell-container py-20">
      <div className="mx-auto max-w-3xl rounded-[34px] border border-white/70 bg-white/85 p-8 shadow-[0_24px_80px_-42px_rgba(15,23,42,0.35)]">
        <p className="text-xs uppercase tracking-[0.28em] text-emerald-700">
          {siteCopyContent.notFoundPage.eyebrow}
        </p>
        <h1 className="mt-4 heading-state text-[var(--text-heading)]">
          {siteCopyContent.notFoundPage.title}
        </h1>
        <p className="mt-4 max-w-[58ch] text-body-lg">
          {siteCopyContent.notFoundPage.description}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className={cn(
              buttonVariants({ size: "lg" }),
              "rounded-full bg-emerald-700 text-white hover:bg-emerald-800"
            )}
          >
            {siteCopyContent.notFoundPage.homeLabel}
          </Link>
          <Link
            href="/contact"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "rounded-full bg-white"
            )}
          >
            {siteCopyContent.notFoundPage.contactLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}
