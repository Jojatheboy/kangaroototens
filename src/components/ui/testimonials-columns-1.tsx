"use client";

import React from "react";
import { motion } from "framer-motion";

export interface TestimonialItem {
  text: string;
  image: string;
  name: string;
  role: string;
}

interface TestimonialsColumnProps {
  className?: string;
  testimonials: TestimonialItem[];
  duration?: number;
}

export function TestimonialsColumn({
  className,
  testimonials,
  duration = 10,
}: TestimonialsColumnProps) {
  return (
    <div className={className}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[...new Array(2).fill(0)].map((_, index) => (
          <React.Fragment key={index}>
            {testimonials.map(({ text, image, name, role }, i) => (
              <div
                key={i}
                className="p-7 sm:p-8 w-full"
                style={{
                  background: "var(--c-surface)",
                  border: "1px solid var(--c-line)",
                  borderRadius: 16,
                  boxShadow: "0 8px 24px -12px rgba(0, 0, 0, 0.4)",
                  transition:
                    "background-color 0.7s ease, border-color 0.7s ease",
                }}
              >
                <p
                  style={{
                    fontSize: 14.5,
                    lineHeight: 1.55,
                    color: "var(--c-text-primary)",
                    fontFamily: "var(--font-geist)",
                    transition: "color 0.7s ease",
                  }}
                >
                  {text}
                </p>
                <div className="flex items-center gap-3 mt-5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    width={40}
                    height={40}
                    src={image}
                    alt={name}
                    className="h-10 w-10 rounded-full object-cover"
                    style={{ border: "1px solid var(--c-line-strong)" }}
                  />
                  <div className="flex flex-col">
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 600,
                        fontSize: 14,
                        color: "var(--c-text-primary)",
                        letterSpacing: "-0.01em",
                        transition: "color 0.7s ease",
                      }}
                    >
                      {name}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-geist)",
                        fontSize: 12,
                        color: "var(--c-text-mute)",
                        lineHeight: 1.4,
                        transition: "color 0.7s ease",
                      }}
                    >
                      {role}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
}
