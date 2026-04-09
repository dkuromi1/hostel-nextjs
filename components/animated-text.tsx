"use client";

import { useEffect, useRef, useState, Fragment } from "react";
import { cn } from "@/lib/utils";

type AnimatedTextProps = {
  text: string;
  className?: string;
  wordClassName?: string;
  delayOffset?: number;
};

export function AnimatedText({ text, className, wordClassName, delayOffset = 0 }: AnimatedTextProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  const words = text.split(" ");
  
  return (
    <span ref={ref} className={className}>
      {words.map((word, idx) => (
        <Fragment key={idx}>
          <span
            className={cn(
              "inline-block transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transform-none motion-reduce:opacity-100",
              isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
              wordClassName
            )}
            style={{ transitionDelay: `${delayOffset + idx * 40}ms` }}
          >
            {word}
          </span>
          {idx < words.length - 1 && " "}
        </Fragment>
      ))}
    </span>
  );
}
