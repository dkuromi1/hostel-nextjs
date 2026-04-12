"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { cn } from "@/lib/utils";

type AnimationState =
  | "hidden" | "idle" | "walking-in" | "paused"
  | "crouching" | "jumping" | "walking-further" | "turned-back" | "done";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const WALKING_SPEED = 90;

export function TitoTheCat() {
  const titoRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<AnimationState>("hidden");
  const [jumpY, setJumpY] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [positionMode, setPositionMode] = useState<"fixed" | "absolute">("fixed");
  const [absoluteTop, setAbsoluteTop] = useState<number | undefined>(undefined);
  const [facingRight, setFacingRight] = useState(false);

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getXPos = useCallback((px: number, vw: number) => {
    const vwInPx = (vw / 100) * viewportWidth;
    return Math.max(px, vwInPx);
  }, [viewportWidth]);

  const coords = useMemo(() => ({
    start: 150,
    intro: getXPos(-45, -8),
    jump: getXPos(-120, -20),
    further: getXPos(-320, -45),
  }), [getXPos]);

  const durations = useMemo(() => ({
    in: Math.abs(coords.start - coords.intro) / WALKING_SPEED,
    jumpToFurther: Math.abs(coords.jump - coords.further) / WALKING_SPEED,
    back: Math.abs(coords.further - coords.start) / WALKING_SPEED,
  }), [coords]);

  const calculateAndTriggerJump = useCallback(() => {
    if (!titoRef.current) return;
    const titoRect = titoRef.current.getBoundingClientRect();
    setAbsoluteTop(titoRect.top + window.scrollY);
    setPositionMode("absolute");

    const elements = document.querySelectorAll('.shell-container > div, .media-frame, .glass-panel, [class*="bg-slate-950"], details');
    const feetY = titoRect.bottom;

    const JUMP_THRESHOLD = 60;
    let bestTopEdge = 0;

    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top > window.innerHeight * 0.3 && rect.top < (feetY - JUMP_THRESHOLD)) {
        if (rect.top > bestTopEdge) bestTopEdge = rect.top;
      }
    });

    const finalJumpY = bestTopEdge > 0 ? (bestTopEdge - feetY) : -70;
    setJumpY(finalJumpY);
    setState("jumping");
  }, []);

  useEffect(() => {
    if (viewportWidth === 0) return;
    let isMounted = true;

    setState("hidden");

    const runSequence = async () => {
      setFacingRight(false);
      setPositionMode("fixed");
      setJumpY(0);
      setAbsoluteTop(undefined);

      await sleep(7500);
      if (!isMounted) return;
      setState("idle");

      await sleep(50);
      if (!isMounted) return;
      setState("walking-in");

      await sleep(durations.in * 1000);
      if (!isMounted) return;
      setState("paused");

      await sleep(1500);
      if (!isMounted) return;

      setState("crouching");
      await sleep(450);

      if (!isMounted) return;
      calculateAndTriggerJump();

      await sleep(600);
      if (!isMounted) return;
      setState("walking-further");

      await sleep(durations.jumpToFurther * 1000);
      if (!isMounted) return;

      setFacingRight(true);
      setState("turned-back");

      await sleep(durations.back * 1000);
      if (!isMounted) return;
      setState("done");
    };

    runSequence();
    return () => { isMounted = false; };
  }, [viewportWidth, durations, calculateAndTriggerJump]);

  if (state === "hidden" || state === "done") return null;

  const getAnimationConfig = () => {
    switch (state) {
      case "idle": return { transform: "translateX(150px)", duration: "0s" };
      case "walking-in":
      case "paused":
      case "crouching":
        return { transform: `translateX(${coords.intro}px)`, duration: `${durations.in}s` };
      case "jumping":
        return { transform: `translateX(${coords.jump}px)`, duration: "0.6s" };
      case "walking-further":
        return { transform: `translateX(${coords.further}px)`, duration: `${durations.jumpToFurther}s` };
      case "turned-back":
        return { transform: "translateX(150px)", duration: `${durations.back}s` };
      default: return { transform: "translateX(150px)", duration: "0s" };
    }
  };

  const { transform, duration } = getAnimationConfig();
  const isWalking = ["walking-in", "walking-further", "turned-back"].includes(state);

  return (
    <>
      <style>{`
        @keyframes cat-walk {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-6px) rotate(-4deg); }
          50% { transform: translateY(0) rotate(0deg); }
          75% { transform: translateY(-3px) rotate(4deg); }
        }
        .animate-cat-walk { animation: cat-walk 0.4s infinite ease-in-out; }
      `}</style>

      <div
        ref={titoRef}
        className={cn(
          "pointer-events-none right-0 z-[100] flex flex-col items-center",
          positionMode === "fixed" ? "fixed bottom-[85px] lg:bottom-[29px]" : "absolute"
        )}
        style={{
          transform,
          transition: `transform ${duration} linear`,
          top: positionMode === "absolute" ? `${absoluteTop}px` : undefined,
        }}
        aria-hidden="true"
      >
        <div
          className="flex flex-col items-center"
          style={{
            transform: `translateY(${jumpY}px)`,
            transition: "transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)",
            transformOrigin: "bottom center"
          }}
        >
          <div className={cn(
            "relative mb-3 rounded-2xl rounded-br-sm bg-slate-900 px-4 py-2.5 text-sm font-medium text-white shadow-xl transition-all duration-300",
            state === "paused" ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          )}>
            Hi, I'm Tito! 🐾
            <div className="absolute -bottom-1.5 right-4 size-3 rotate-45 bg-slate-900" />
          </div>

          <div
            className={cn(
              "text-5xl transition-all duration-300 ease-out",
              state === "paused" && "scale-110",
              state === "crouching" && "scale-y-[0.85] scale-x-[1.1]",
              state === "jumping" && "scale-y-[1.15] scale-x-[0.93]"
            )}
            style={{
              transform: facingRight ? "scaleX(-1)" : "scaleX(1)",
              transformOrigin: "bottom center"
            }}
          >
            <div className={cn(isWalking && "animate-cat-walk")}>🐈‍⬛</div>
          </div>
        </div>
      </div>
    </>
  );
}