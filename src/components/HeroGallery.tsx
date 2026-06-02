"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

import { cn } from "@/lib/utils";

/**
 * Parede de mídia do hero (estilo Framer): colunas de fotos e vídeos da empresa
 * que sobem em velocidades diferentes no scroll (parallax). Os vídeos tocam em
 * loop mudo, sem controles, só quando entram na tela. Full-bleed.
 */

type MediaItem = string | { video: string; poster: string };

const img = (n: number) =>
  `/images/hero-wall/wall-${String(n).padStart(2, "0")}.webp`;
const vid = (n: number) => ({
  video: `/videos/hero/hero-v${n}.mp4`,
  poster: `/videos/hero/hero-v${n}-poster.webp`,
});

const columns: MediaItem[][] = [
  [vid(1), img(1), img(7), img(2), img(8)],
  [img(3), vid(2), img(9), img(4), img(10)],
  [img(5), img(11), vid(3), img(6), img(12)],
  [img(13), img(2), img(8), vid(4), img(3)],
  [img(9), img(4), img(10), img(5), img(11)],
  [img(12), img(6), img(1), img(7), img(13)],
];

// deslocamento inicial (stagger tipo masonry) e velocidade do parallax por coluna
const offsets = [0, -90, -40, -120, -20, -70];
const speeds = [-150, -320, -210, -380, -180, -260];

function VideoTile({ src, poster }: { src: string; poster: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.muted = true;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <video
      ref={ref}
      className="absolute inset-0 w-full h-full object-cover"
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      disablePictureInPicture
      aria-hidden="true"
    />
  );
}

function Tile({ item }: { item: MediaItem }) {
  return (
    <div
      className="relative w-full overflow-hidden rounded-lg"
      style={{ aspectRatio: "1 / 1", background: "var(--c-surface)" }}
    >
      {typeof item === "string" ? (
        <Image
          src={item}
          alt=""
          fill
          sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover"
        />
      ) : (
        <VideoTile src={item.video} poster={item.poster} />
      )}
    </div>
  );
}

function GalleryColumn({
  items,
  scrollY,
  offset,
  speed,
  className,
}: {
  items: MediaItem[];
  scrollY: MotionValue<number>;
  offset: number;
  speed: number;
  className?: string;
}) {
  const y = useTransform(scrollY, [0, 1200], [offset, offset + speed]);

  return (
    <motion.div
      style={{ y }}
      className={cn("flex-col gap-2 will-change-transform", className)}
    >
      {items.map((item, i) => (
        <Tile key={i} item={item} />
      ))}
    </motion.div>
  );
}

export function HeroGallery() {
  const { scrollY } = useScroll();

  const colClass = [
    "flex-1 flex",
    "flex-1 flex",
    "flex-1 hidden sm:flex",
    "flex-1 hidden lg:flex",
    "flex-1 hidden lg:flex",
    "flex-1 hidden lg:flex",
  ];

  return (
    <div
      aria-hidden="true"
      className="absolute inset-x-0 bottom-0 top-[62%] sm:top-[50%] z-0 overflow-hidden pointer-events-none"
    >
      <div className="flex gap-2 w-full">
        {columns.map((items, i) => (
          <GalleryColumn
            key={i}
            items={items}
            scrollY={scrollY}
            offset={offsets[i]}
            speed={speeds[i]}
            className={colClass[i]}
          />
        ))}
      </div>
    </div>
  );
}
