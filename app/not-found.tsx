import Link from "next/link";

import { Eyebrow } from "@/components/ui/eyebrow";
import { buttonVariants } from "@/components/ui/button";
import { siteCopyContent } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="shell-container py-20">
      <div className="glass-panel mx-auto max-w-3xl rounded-3xl p-8 shadow-[0_24px_80px_-42px_rgba(15,23,42,0.35)]">
        <Eyebrow>
          {siteCopyContent.notFoundPage.eyebrow}
        </Eyebrow>
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
              "rounded-full bg-[var(--brand-primary)] text-[var(--primary-foreground)] hover:bg-[var(--brand-primary-dark)]"
            )}
          >
            {siteCopyContent.notFoundPage.homeLabel}
          </Link>
          <Link
            href="/contact"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "rounded-full"
            )}
          >
            {siteCopyContent.notFoundPage.contactLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}
