"use client";

import type { HTMLAttributes } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";
import { shouldReduceMotion } from "@/lib/performance";

type RevealProps = HTMLAttributes<HTMLDivElement> & {
  delay?: number;
  duration?: number;
};

export function Reveal({
  children,
  className,
  delay = 0,
  // duration is kept in the API for backwards-compatibility but spring physics
  // dictate the actual feel — damping/stiffness are the real controls.
  duration: _duration,
  ...props
}: RevealProps) {
  void _duration;
  const prefersReduced = useReducedMotion();
  const shouldReduce = prefersReduced || shouldReduceMotion();

  return (
    <motion.div
      // Keep initial constant (same on server and client) to avoid SSR hydration
      // mismatches. useReducedMotion() returns null on the server and can differ
      // from the client value, so we must never use it to change `initial`.
      // Instead, we only vary the transition: duration:0 for reduced motion gives
      // an instant snap to the visible state without any layout shift.
      initial={{ opacity: 0.1, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={
        shouldReduce
          ? { duration: 0 }
          : {
              type: "spring",
              damping: 18, // Lower damping for more bounce
              stiffness: 160, // Higher stiffness for faster snap
              delay: delay / 1000, // convert ms → seconds for Framer
              velocity: 2, // Add some initial velocity for more "life"
            }
      }
      className={cn(className)}
      {...(props as React.ComponentPropsWithoutRef<typeof motion.div>)}
    >
      {children}
    </motion.div>
  );
}
