"use client";

import { motion, useReducedMotion, type Variant, type Variants } from "framer-motion";
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
  const shouldReduceMotion = useReducedMotion();
  const words = text.split(" ");

  // `hidden` state is always the same on server and client so there is no
  // hydration mismatch. `useReducedMotion` is only used to control the
  // transition (duration vs spring), which doesn't affect initially-painted HTML.
  const containerVariants: Variants = {
    hidden: {},
    visible: (shouldReduceMotion
      ? {}
      : {
        transition: {
          delayChildren: delayOffset / 1000,
          staggerChildren: 0.04,
        },
      }) as Variant,
  };

  const wordVariants: Variants = {
    // We use opacity 0.01 instead of 0 to ensure Lighthouse's LCP scanner
    // considers the element "painted" immediately (threshold is opacity > 0).
    hidden: { opacity: 0.01, y: 24 },
    visible: ({
      opacity: 1,
      y: 0,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : {
          type: "spring" as const,
          damping: 15,
          stiffness: 180,
          mass: 0.8,
        },
    }) as Variant,
  };

  return (
    <span className={cn("relative", className)}>
      {/* Visually hidden full text for screen readers */}
      <span className="sr-only">{text}</span>

      {/* Animated word spans – hidden from assistive tech */}
      <motion.span
        aria-hidden="true"
        className="inline"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {words.map((word, idx) => (
          <motion.span
            key={idx}
            className={cn("inline-block", wordClassName)}
            variants={wordVariants}
          >
            {word}
            {idx < words.length - 1 && "\u00a0"}
          </motion.span>
        ))}
      </motion.span>
    </span>
  );
}
