import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

type AnimatedTextProps = {
  text: string;
  className?: string;
  wordClassName?: string;
  delayOffset?: number;
};

export function AnimatedText({
  text,
  className,
  wordClassName,
  delayOffset = 0,
}: AnimatedTextProps) {
  const words = text.split(" ");

  return (
    <span className={cn("relative", className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="inline">
        {words.map((word, idx) => (
          <span
            key={idx}
            className={cn("inline-block motion-safe-word-reveal", wordClassName)}
            style={
              {
                "--word-delay": `${delayOffset + (idx * 40)}ms`,
              } as CSSProperties
            }
          >
            {word}
            {idx < words.length - 1 && "\u00a0"}
          </span>
        ))}
      </span>
    </span>
  );
}
