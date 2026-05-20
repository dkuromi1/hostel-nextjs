"use client";

import React, { useState, useEffect, useRef, useId } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

interface DepthDistortionTriggerProps {
  href: string;
  label: string;
  previewImage?: string;
  previewTitle?: string;
  previewSubtitle?: string;
  className?: string;
  textClassName?: string;
}

export function DepthDistortionTrigger({
  href,
  label,
  previewImage,
  previewTitle,
  previewSubtitle,
  className,
  textClassName,
}: DepthDistortionTriggerProps) {
  const isExternal = href.startsWith("http");
  const uniqueId = useId().replace(/:/g, "-");
  
  const [isHovered, setIsHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [seed, setSeed] = useState(1);
  const triggerRef = useRef<HTMLAnchorElement>(null);

  // Motion values for the floating card's position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for cursor tracking
  const springConfig = { stiffness: 150, damping: 18, mass: 0.6 };
  const cardX = useSpring(mouseX, springConfig);
  const cardY = useSpring(mouseY, springConfig);

  // Parallax offsets for depth map layers
  // Derived from the current cursor position within the target trigger
  const relX = useMotionValue(0); // -0.5 to 0.5
  const relY = useMotionValue(0); // -0.5 to 0.5

  const springParallax = { stiffness: 90, damping: 15 };
  const smoothRelX = useSpring(relX, springParallax);
  const smoothRelY = useSpring(relY, springParallax);

  // Map relative position to displacement translations
  const bgTranslateX = useTransform(smoothRelX, [-0.5, 0.5], ["-8px", "8px"]);
  const bgTranslateY = useTransform(smoothRelY, [-0.5, 0.5], ["-8px", "8px"]);
  
  const fgTranslateX = useTransform(smoothRelX, [-0.5, 0.5], ["8px", "-8px"]);
  const fgTranslateY = useTransform(smoothRelY, [-0.5, 0.5], ["8px", "-8px"]);

  const shineTranslateX = useTransform(smoothRelX, [-0.5, 0.5], ["18px", "-18px"]);
  const shineTranslateY = useTransform(smoothRelY, [-0.5, 0.5], ["18px", "-18px"]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Animate SVG filter seed value while hovering to create a slow-moving liquid drift
  useEffect(() => {
    if (!isHovered) return;
    const interval = setInterval(() => {
      setSeed((s) => (s % 99) + 1);
    }, 120);
    return () => clearInterval(interval);
  }, [isHovered]);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const rect = trigger.getBoundingClientRect();
    
    // Set absolute mouse coordinates for floating card (offset slightly to follow nicely)
    mouseX.set(e.clientX + 20);
    mouseY.set(e.clientY + 20);

    // Compute relative cursor position inside the trigger box (normalized -0.5 to 0.5)
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    relX.set(x);
    relY.set(y);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const linkContent = (
    <span 
      className={cn(
        "relative inline-flex items-center gap-1.5 font-heading text-lg font-bold tracking-tight text-[var(--text-heading)] transition-all duration-300",
        isHovered && "text-[var(--brand-primary)] scale-[1.02]",
        textClassName
      )}
      style={{
        filter: isMounted && isHovered ? `url(#distort-${uniqueId})` : "none",
        willChange: "filter, transform",
      }}
    >
      <span className="relative border-b-2 border-dashed border-[var(--brand-primary)]/40 pb-0.5 hover:border-[var(--brand-primary)] transition-colors">
        {label}
      </span>
      <ArrowUpRight className={cn(
        "size-4 shrink-0 transition-transform duration-300 opacity-60 group-hover:opacity-100",
        isHovered ? "translate-x-0.5 -translate-y-0.5 scale-110 text-[var(--brand-primary)]" : ""
      )} />
    </span>
  );

  return (
    <>
      {/* SVG Liquid Distortion Filter Definition */}
      {isMounted && (
        <svg className="absolute h-0 w-0 pointer-events-none" aria-hidden="true">
          <defs>
            <filter id={`distort-${uniqueId}`}>
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.04 0.08"
                numOctaves="2"
                seed={seed}
                result="noise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale={isHovered ? 8 : 0}
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>
        </svg>
      )}

      {/* Trigger Link */}
      {isExternal ? (
        <a
          ref={triggerRef}
          href={href}
          target="_blank"
          rel="noreferrer"
          className={cn("group relative inline-block cursor-pointer select-none outline-none", className)}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {linkContent}
        </a>
      ) : (
        <Link
          ref={triggerRef}
          href={href}
          className={cn("group relative inline-block cursor-pointer select-none outline-none", className)}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {linkContent}
        </Link>
      )}

      {/* Floating Parallax Hover Card */}
      {isMounted && previewImage && (
        <motion.div
          className="fixed pointer-events-none z-50 overflow-hidden rounded-2xl border border-[var(--glass-border)] bg-[var(--surface-dark)]/90 shadow-2xl backdrop-blur-md w-72 h-44"
          style={{
            x: cardX,
            y: cardY,
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.85,
            willChange: "transform, opacity",
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.85,
          }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
          }}
        >
          {/* Card Layers */}
          <div className="relative h-full w-full overflow-hidden">
            {/* Background Parallax Layer */}
            <motion.div
              className="absolute -inset-4 z-0 scale-110"
              style={{
                x: bgTranslateX,
                y: bgTranslateY,
                willChange: "transform",
              }}
            >
              <Image
                src={previewImage}
                alt={previewTitle || label}
                fill
                className="object-cover opacity-80"
                sizes="288px"
              />
            </motion.div>

            {/* Dark vignette overlay */}
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-[var(--surface-dark)] via-black/20 to-black/10 pointer-events-none" />

            {/* Holographic Gloss/Shine Layer */}
            <motion.div
              className="absolute -inset-10 z-20 pointer-events-none bg-[linear-gradient(135deg,rgba(255,255,255,0.25)_0%,rgba(255,255,255,0)_50%,rgba(255,255,255,0.1)_100%)] mix-blend-overlay"
              style={{
                x: shineTranslateX,
                y: shineTranslateY,
                willChange: "transform",
              }}
            />

            {/* Foreground Text Layer */}
            <motion.div
              className="absolute inset-x-5 bottom-5 z-30 flex flex-col gap-0.5"
              style={{
                x: fgTranslateX,
                y: fgTranslateY,
                willChange: "transform",
              }}
            >
              {previewSubtitle && (
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--brand-accent)] drop-shadow-sm">
                  {previewSubtitle}
                </span>
              )}
              {previewTitle && (
                <h4 className="font-heading text-lg font-bold leading-tight text-white drop-shadow-md">
                  {previewTitle}
                </h4>
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </>
  );
}
