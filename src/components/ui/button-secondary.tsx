"use client";

import { type ReactNode } from "react";
import "./button-secondary.css";

const DEFAULT_ARROW = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 12 H19 M13 6 L19 12 L13 18" />
  </svg>
);

interface ButtonSecondaryProps {
  children: ReactNode;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  size?: "default" | "lg";
  className?: string;
  icon?: ReactNode;
  ariaLabel?: string;
}

export function ButtonSecondary({
  children,
  href,
  target,
  rel,
  onClick,
  type = "button",
  size = "default",
  className = "",
  icon = DEFAULT_ARROW,
  ariaLabel,
}: ButtonSecondaryProps) {
  const sizeClass = size === "lg" ? "btn-lg" : "";
  const cls = `btn-secundario ${sizeClass} ${className}`.trim();

  const inner = (
    <>
      <span className="bs-label">{children}</span>
      <span className="bs-ico" aria-hidden="true">
        {icon}
      </span>
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
