import type { CSSProperties, HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type RevealProps = HTMLAttributes<HTMLDivElement> & {
  delay?: number;
  duration?: number;
};

export function Reveal({
  children,
  className,
  delay = 0,
  duration: _duration,
  style,
  ...props
}: RevealProps) {
  return (
    <div
      className={cn(className)}
      style={
        {
          "--reveal-delay": `${delay}ms`,
          ...style,
        } as CSSProperties
      }
      {...props}
    >
      <div className="motion-safe-reveal">{children}</div>
    </div>
  );
}
