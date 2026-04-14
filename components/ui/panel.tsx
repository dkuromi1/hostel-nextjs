import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type PanelProps = HTMLAttributes<HTMLDivElement>;

export function Panel({ className, ...props }: PanelProps) {
  return (
    <div
      className={cn(
        "rounded-[30px] border border-slate-200/60 bg-white/95 shadow-[0_24px_80px_-30px_rgba(11,32,29,0.22)] backdrop-blur-sm",
        className
      )}
      {...props}
    />
  );
}
