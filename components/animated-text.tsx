import { cn } from "@/lib/utils";

type AnimatedTextProps = {
  text: string;
  className?: string;
  wordClassName?: string;
  delayOffset?: number;
  wordStaggerMs?: number;
  immediate?: boolean;
};

export function AnimatedText({
  text,
  className,
  wordClassName,
  delayOffset = 0,
  wordStaggerMs = 45,
}: AnimatedTextProps) {
  const words = text.split(" ");

  return (
    <span className={cn("inline", className)}>
      {/* Visually hidden full text for screen readers and SEO */}
      <span className="sr-only">{text}</span>

      {/* Animated word spans via pure CSS (instant first-paint execution) */}
      <span aria-hidden="true" className="inline">
        {words.map((word, idx) => (
          <span
            key={idx}
            className={cn("inline-block animate-hero-word", wordClassName)}
            style={{ animationDelay: `${delayOffset + idx * wordStaggerMs}ms` }}
          >
            {word}
            {idx < words.length - 1 && "\u00a0"}
          </span>
        ))}
      </span>
    </span>
  );
}
