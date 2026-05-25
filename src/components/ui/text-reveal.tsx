"use client";

import { motion } from "framer-motion";
import type { CSSProperties } from "react";

interface TextRevealProps {
  text: string;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  stagger?: number;
  /** Trigger só uma vez ou sempre que entrar na viewport */
  once?: boolean;
  /** Componente HTML — default span. Use "h1"/"h2" pra semântica */
  as?: "span" | "h1" | "h2" | "h3" | "h4" | "p";
}

export function TextReveal({
  text,
  className,
  style,
  delay = 0,
  stagger = 0.045,
  once = true,
  as = "span",
}: TextRevealProps) {
  const words = text.split(" ");

  const Wrapper = motion[as] as typeof motion.span;

  return (
    <Wrapper
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-15%" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren: delay,
          },
        },
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block"
          style={{ whiteSpace: "pre" }}
          variants={{
            hidden: { opacity: 0, y: 18, filter: "blur(8px)" },
            visible: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: {
                duration: 0.55,
                ease: [0.16, 1, 0.3, 1],
              },
            },
          }}
        >
          {word}
          {i < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </Wrapper>
  );
}
