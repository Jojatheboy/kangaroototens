"use client";

import { type ReactNode } from "react";
import "./shiny-button.css";

interface ShinyButtonProps {
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

export function ShinyButton({
  children,
  href,
  target,
  rel,
  onClick,
  type = "button",
  size = "default",
  className = "",
  ariaLabel,
}: ShinyButtonProps) {
  const sizeClass = size === "lg" ? "shiny-cta-lg" : "";
  const cls = `shiny-cta ${sizeClass} ${className}`.trim();

  if (href) {
    return (
      <a
        className={cls}
        href={href}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
      >
        <span>{children}</span>
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
      <span>{children}</span>
    </button>
  );
}
