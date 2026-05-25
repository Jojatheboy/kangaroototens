"use client";

import { useEffect, useRef, type ReactNode } from "react";
import "./button-primary.css";

const ARROW = [
  [0, 0, 0, 1, 0, 0, 0],
  [0, 0, 1, 1, 1, 0, 0],
  [0, 1, 0, 1, 0, 1, 0],
  [0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0],
];
const ROWS = 7;
const COLS = 7;
const AH = ARROW.length;

interface ButtonPrimaryProps {
  children: ReactNode;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  size?: "default" | "lg";
  className?: string;
  ariaLabel?: string;
}

export function ButtonPrimary({
  children,
  href,
  target,
  rel,
  onClick,
  type = "button",
  size = "default",
  className = "",
  ariaLabel,
}: ButtonPrimaryProps) {
  const dotsRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!dotsRef.current) return;
    const dots = dotsRef.current.children;
    let Y = ROWS;

    const render = () => {
      for (let i = 0; i < ROWS * COLS; i++) {
        const r = Math.floor(i / COLS);
        const c = i % COLS;
        const ar = r - Y;
        const on = ar >= 0 && ar < AH && ARROW[ar][c] === 1;
        (dots[i] as HTMLElement).classList.toggle("active", on);
      }
    };

    render();
    const iv = setInterval(() => {
      Y -= 1;
      if (Y < -AH) Y = ROWS;
      render();
    }, 170);

    return () => clearInterval(iv);
  }, []);

  const sizeClass = size === "lg" ? "btn-lg" : "";
  const cls = `btn-principal ${sizeClass} ${className}`.trim();

  const inner = (
    <>
      <span ref={dotsRef} className="bp-dots" aria-hidden="true">
        {Array.from({ length: ROWS * COLS }).map((_, i) => (
          <i key={i} />
        ))}
      </span>
      <span className="bp-label">{children}</span>
    </>
  );

  if (href) {
    return (
      <a
        className={cls}
        href={href}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
      >
        {inner}
      </a>
    );
  }
  return (
    <button
      className={cls}
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {inner}
    </button>
  );
}
