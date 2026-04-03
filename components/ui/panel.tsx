import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type PanelProps = HTMLAttributes<HTMLDivElement>;

export function Panel({ className, ...props }: PanelProps) {
  return (
    <div
      className={cn(
        "rounded-[30px] border border-white/70 bg-white/90 shadow-[0_24px_80px_-30px_rgba(11,32,29,0.28)] backdrop-blur-sm",
        className
      )}
      {...props}
    />
  );
}
