import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="shell-container py-20">
      <div className="mx-auto max-w-3xl rounded-[34px] border border-white/70 bg-white/85 p-8 shadow-[0_24px_80px_-42px_rgba(15,23,42,0.35)]">
        <p className="text-xs uppercase tracking-[0.28em] text-emerald-700">
          Page Not Found
        </p>
        <h1 className="mt-4 font-heading text-4xl leading-none tracking-[-0.06em] text-slate-950">
          That page is not part of the hostel map.
        </h1>
        <p className="mt-4 max-w-[58ch] text-base leading-8 text-slate-600">
          Head back to the main site and keep planning your stay in Shkoder.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className={cn(
              buttonVariants({ size: "lg" }),
              "rounded-full bg-emerald-600 text-white hover:bg-emerald-700"
            )}
          >
            Go Home
          </Link>
          <Link
            href="/contact"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "rounded-full bg-white"
            )}
          >
            Contact The Hostel
          </Link>
        </div>
      </div>
    </div>
  );
}
