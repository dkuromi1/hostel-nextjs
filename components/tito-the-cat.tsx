"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type AnimationState =
  | "hidden"
  | "idle"
  | "walking-in"
  | "paused"
  | "jumping"
  | "walking-further"
  | "turned-back"
  | "done";

export function TitoTheCat() {
  const titoRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<AnimationState>("hidden");
  const [jumpY, setJumpY] = useState(0);

  const [positionMode, setPositionMode] = useState<"fixed" | "absolute">("fixed");
  const [absoluteTop, setAbsoluteTop] = useState<number | undefined>(undefined);
  const [facingRight, setFacingRight] = useState(false);

  useEffect(() => {
    const t0 = setTimeout(() => setState("idle"), 9950);
    const t1 = setTimeout(() => setState("walking-in"), 10000);
    const tPause = setTimeout(() => setState("paused"), 12000);

    const tJump = setTimeout(() => {
      if (!titoRef.current) return;

      const titoRect = titoRef.current.getBoundingClientRect();
      const sy = window.scrollY;

      setAbsoluteTop(titoRect.top + sy);
      setPositionMode("absolute");

      const elements = document.querySelectorAll(
        '.shell-container > div, .media-frame, .glass-panel, [class*="bg-slate-950"], details'
      );

      const feetY = titoRect.bottom;
      let bestTopEdge = 0;

      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top > window.innerHeight * 0.3 && rect.top < feetY) {
          if (rect.top > bestTopEdge) bestTopEdge = rect.top;
        }
      });

      if (bestTopEdge > 0) {
        // 👇 ADJUSTED HERE: Changed from + 15 to + 10 to lift him 5px higher
        setJumpY(bestTopEdge - feetY + 5);
      } else {
        setJumpY(-50);
      }

      setState("jumping");
    }, 13500);

    const tFurther = setTimeout(() => setState("walking-further"), 14100);

    const tTurn = setTimeout(() => {
      setFacingRight(true);
      setState("turned-back");
    }, 16500);

    const tDone = setTimeout(() => setState("done"), 22000);

    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(tPause);
      clearTimeout(tJump);
      clearTimeout(tFurther);
      clearTimeout(tTurn);
      clearTimeout(tDone);
    };
  }, []);

  if (state === "hidden" || state === "done") return null;

  const getXTransform = () => {
    if (state === "idle") return "translateX(150px)";
    if (state === "walking-in") return "translateX(-60px)";
    if (state === "paused") return "translateX(-60px)";
    if (state === "jumping") return "translateX(-110px)";
    if (state === "walking-further") return "translateX(-250px)";
    if (state === "turned-back") return "translateX(150px)";
    return "translateX(150px)";
  };

  const getXDuration = () => {
    if (state === "walking-in") return "2s";
    if (state === "jumping") return "0.6s";
    if (state === "walking-further") return "2.4s";
    if (state === "turned-back") return "5.5s";
    return "0s";
  };

  const isWalking =
    state === "walking-in" ||
    state === "walking-further" ||
    state === "turned-back";

  return (
    <>
      <style>{`
        @keyframes cat-walk {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-6px) rotate(-4deg); }
          50% { transform: translateY(0) rotate(0deg); }
          75% { transform: translateY(-3px) rotate(4deg); }
        }
        .animate-cat-walk {
          animation: cat-walk 0.4s infinite ease-in-out;
        }
      `}</style>

      <div
        ref={titoRef}
        className={cn(
          "pointer-events-none right-0 z-[100] flex flex-col items-center",
          positionMode === "fixed" ? "fixed bottom-[85px] lg:bottom-[29px]" : "absolute"
        )}
        style={{
          transform: getXTransform(),
          transitionProperty: "transform",
          transitionTimingFunction: "linear",
          transitionDuration: getXDuration(),
          top: positionMode === "absolute" ? `${absoluteTop}px` : undefined,
        }}
        aria-hidden="true"
      >
        <div
          className="flex flex-col items-center"
          style={{
            transform: `translateY(${jumpY}px)`,
            transition: "transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)",
          }}
        >
          <div
            className={cn(
              "relative mb-3 rounded-2xl rounded-br-sm bg-slate-900 px-4 py-2.5 text-sm font-medium text-white shadow-xl transition-all duration-300",
              state === "paused"
                ? "translate-y-0 opacity-100"
                : "translate-y-2 opacity-0"
            )}
          >
            Hi, I'm Tito! <span style={{
              color: 'transparent',
              textShadow: '0 0 0 yellow'
            }}>
              🐾
            </span>
            <div className="absolute -bottom-1.5 right-4 size-3 rotate-45 bg-slate-900" />
          </div>

          <div
            className={cn(
              "text-5xl transition-transform duration-300",
              state === "paused" ? "scale-110" : "scale-100"
            )}
            style={{ transform: facingRight ? "scaleX(-1)" : "scaleX(1)" }}
          >
            <div className={cn(isWalking && "animate-cat-walk")}>
              🐈‍⬛
            </div>
          </div>
        </div>
      </div>
    </>
  );
}