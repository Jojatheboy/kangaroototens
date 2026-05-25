"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  pauseOnHover?: boolean;
  reverse?: boolean;
  /** Seconds for a full loop. Default 40s. */
  duration?: number;
  /** Gap entre items em px. Default 48. */
  gap?: number;
}

export function Marquee({
  children,
  className,
  pauseOnHover = true,
  reverse = false,
  duration = 40,
  gap = 48,
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "group relative flex w-full overflow-hidden",
        "[mask-image:linear-gradient(to_right,transparent_0%,black_8%,black_92%,transparent_100%)]",
        "[-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_8%,black_92%,transparent_100%)]",
        className
      )}
    >
      <MarqueeTrack
        gap={gap}
        duration={duration}
        reverse={reverse}
        pauseOnHover={pauseOnHover}
      >
        {children}
      </MarqueeTrack>
      <MarqueeTrack
        gap={gap}
        duration={duration}
        reverse={reverse}
        pauseOnHover={pauseOnHover}
        aria-hidden="true"
      >
        {children}
      </MarqueeTrack>
    </div>
  );
}

function MarqueeTrack({
  children,
  gap,
  duration,
  reverse,
  pauseOnHover,
  ...rest
}: {
  children: React.ReactNode;
  gap: number;
  duration: number;
  reverse: boolean;
  pauseOnHover: boolean;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center",
        pauseOnHover && "group-hover:[animation-play-state:paused]",
        "motion-reduce:animate-none"
      )}
      style={{
        gap,
        paddingInlineEnd: gap,
        animation: `marquee-x ${duration}s linear infinite`,
        animationDirection: reverse ? "reverse" : "normal",
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
