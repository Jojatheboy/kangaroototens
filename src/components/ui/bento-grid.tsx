"use client";

import { cn } from "@/lib/utils";
import { RadialBackdrop } from "@/components/ui/radial-backdrop";

export interface BentoItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  status?: string;
  tags?: string[];
  meta?: string;
  cta?: string;
  colSpan?: number;
  hasPersistentHover?: boolean;
  accent?: string;
}

interface BentoGridProps {
  items: BentoItem[];
}

export function BentoGrid({ items }: BentoGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-7xl mx-auto auto-rows-fr items-stretch">
      {items.map((item, index) => (
        <div
          key={index}
          className={cn(
            "group relative p-6 sm:p-7 rounded-2xl overflow-hidden transition-all duration-300 will-change-transform h-full flex flex-col",
            item.colSpan === 2 ? "md:col-span-2" : "md:col-span-1"
          )}
          style={{
            background: "var(--c-surface)",
            border: "1px solid var(--c-line)",
          }}
        >
          {/* Degrade laranja sutil — alterna top/bottom por index */}
          <RadialBackdrop
            color="#FF5A2A"
            highlight="#FFB48E"
            opacity={0.22}
            position={index % 2 === 0 ? "top" : "bottom"}
            fitParent
          />

          {/* Dot grid hover overlay — bem sutil */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
              backgroundSize: "8px 8px",
            }}
          />

          <div className="relative flex flex-col gap-3 h-full z-10">
            <div className="flex items-center justify-between">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors duration-300"
                style={{
                  background: "var(--c-surface-2)",
                  color: "#FFFFFF",
                }}
              >
                {item.icon}
              </div>
              {item.status && (
                <span
                  className="text-[10px] font-medium px-2.5 py-1 rounded-md uppercase tracking-wider"
                  style={{
                    fontFamily: "var(--font-geist-mono)",
                    background: "var(--c-canvas)",
                    color: "var(--c-text-mute)",
                    border: "1px solid var(--c-line)",
                  }}
                >
                  {item.status}
                </span>
              )}
            </div>

            <div className="space-y-1.5">
              <h3
                className="tracking-tight"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: 16,
                  color: "var(--c-text-primary)",
                  letterSpacing: "-0.015em",
                }}
              >
                {item.title}
                {item.meta && (
                  <span
                    className="ml-2 font-normal"
                    style={{
                      fontSize: 12,
                      color: "var(--c-text-mute)",
                      fontFamily: "var(--font-geist-mono)",
                    }}
                  >
                    {item.meta}
                  </span>
                )}
              </h3>
              <p
                style={{
                  fontSize: 13.5,
                  lineHeight: 1.55,
                  color: "var(--c-text-secondary)",
                }}
              >
                {item.description}
              </p>
            </div>

            {item.tags && item.tags.length > 0 && (
              <div className="flex items-center flex-wrap gap-1.5 mt-1">
                {item.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 rounded-md transition-colors duration-200"
                    style={{
                      fontFamily: "var(--font-geist-mono)",
                      fontSize: 10.5,
                      color: "var(--c-text-mute)",
                      background: "var(--c-canvas)",
                      border: "1px solid var(--c-line)",
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
