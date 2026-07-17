"use client";

import { cn } from "@workspace/ui/lib/utils";
import {
  cubicBezier,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import ReactLenis from "lenis/react";
import { useEffect, useMemo, useRef, useState } from "react";

export interface ScrollTiltedGridImage {
  src: string;
  alt: string;
}

export const DEFAULT_TILTED_GRID_IMAGES: readonly ScrollTiltedGridImage[] = [
  {
    src: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1200&q=85",
    alt: "Curved concrete facade in soft daylight",
  },
  {
    src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85",
    alt: "Sunlit modern interior with warm timber details",
  },
  {
    src: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1200&q=85",
    alt: "Minimal white house framed by a clear sky",
  },
  {
    src: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=85",
    alt: "Quiet residential facade surrounded by trees",
  },
  {
    src: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=85",
    alt: "Calm apartment interior in a neutral palette",
  },
  {
    src: "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?auto=format&fit=crop&w=1200&q=85",
    alt: "Bright workspace with white walls and natural wood",
  },
  {
    src: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=85",
    alt: "Open studio with long tables and tall windows",
  },
  {
    src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=85",
    alt: "Refined office lounge with dark metal framing",
  },
  {
    src: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=1200&q=85",
    alt: "Modern living room with layered neutral textures",
  },
  {
    src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=85",
    alt: "Geometric concrete architecture viewed from below",
  },
  {
    src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85",
    alt: "Contemporary workspace with glass partitions",
  },
  {
    src: "https://images.unsplash.com/photo-1497366858526-0766cadbe8fa?auto=format&fit=crop&w=1200&q=85",
    alt: "Airy creative studio filled with daylight",
  },
];

interface TileConfig {
  aspectRatio: string;
  perspective: number;
  maxTilt: number;
  maxBlur: number;
  rounded: string;
  reducedMotion: boolean;
  scrollY: MotionValue<number>;
}

const easeIntoFocus = cubicBezier(0.22, 1, 0.36, 1);
const easeOutOfFocus = cubicBezier(0, 0, 0.58, 1);
const focusEase = [easeIntoFocus, easeOutOfFocus];

function ImageTile({
  image,
  index,
  config,
}: {
  image: ScrollTiltedGridImage;
  index: number;
  config: TileConfig;
}) {
  const ref = useRef<HTMLElement>(null);
  const progress = useMotionValue(0);
  const side = index % 2 === 0 ? -1 : 1;

  useEffect(() => {
    const tile = ref.current;
    if (!tile || config.reducedMotion) return;

    let frame = 0;
    const measure = () => {
      frame = 0;
      const rect = tile.getBoundingClientRect();
      const range = window.innerHeight + rect.height;
      const value = range > 0 ? (window.innerHeight - rect.top) / range : 0;
      progress.set(Math.max(0, Math.min(1, value)));
    };
    const scheduleMeasure = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(measure);
    };

    measure();
    const unsubscribe = config.scrollY.on("change", scheduleMeasure);
    const observer = new ResizeObserver(scheduleMeasure);
    observer.observe(tile);
    window.addEventListener("resize", scheduleMeasure);

    return () => {
      unsubscribe();
      observer.disconnect();
      window.removeEventListener("resize", scheduleMeasure);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [config.reducedMotion, config.scrollY, progress]);

  const blur = useTransform(
    progress,
    [0, 0.5, 1],
    [config.maxBlur, 0, config.maxBlur],
    { ease: focusEase },
  );
  const brightness = useTransform(progress, [0, 0.5, 1], [0.5, 1, 0.5], {
    ease: focusEase,
  });
  const contrast = useTransform(progress, [0, 0.5, 1], [1.2, 1, 1.2], {
    ease: focusEase,
  });
  const saturation = useTransform(progress, [0, 0.5, 1], [0.5, 1, 0.5], {
    ease: focusEase,
  });
  const x = useTransform(
    progress,
    [0, 0.5, 1],
    [`${side * 18}%`, "0%", `${side * 18}%`],
    { ease: focusEase },
  );
  const y = useTransform(progress, [0, 0.5, 1], ["24%", "0%", "-24%"], {
    ease: focusEase,
  });
  const z = useTransform(progress, [0, 0.5, 1], [180, 0, 180], {
    ease: focusEase,
  });
  const rotateX = useTransform(
    progress,
    [0, 0.5, 1],
    [config.maxTilt, 0, -config.maxTilt],
    { ease: focusEase },
  );
  const rotateZ = useTransform(
    progress,
    [0, 0.5, 1],
    [-side * 3, 0, side * 3],
    {
      ease: focusEase,
    },
  );
  const skewX = useTransform(progress, [0, 0.5, 1], [side * 7, 0, -side * 7], {
    ease: focusEase,
  });
  const imageScale = useTransform(progress, [0, 0.5, 1], [1.18, 1.03, 1.18], {
    ease: focusEase,
  });
  const filter = useMotionTemplate`blur(${blur}px) brightness(${brightness}) contrast(${contrast}) saturate(${saturation})`;
  const frameStyle = {
    aspectRatio: config.aspectRatio,
    borderRadius: config.rounded,
  };

  if (config.reducedMotion) {
    return (
      <figure ref={ref} className={cn("m-0", side > 0 && "pt-12 sm:pt-24")}>
        <div
          className="relative w-full overflow-hidden border border-black/10 bg-neutral-200 shadow-[0_18px_60px_rgba(20,18,14,0.12)] dark:border-white/10 dark:bg-neutral-900"
          style={frameStyle}
        >
          <img
            src={image.src}
            alt={image.alt}
            className="h-full w-full object-cover"
            loading={index < 4 ? "eager" : "lazy"}
            draggable={false}
          />
        </div>
      </figure>
    );
  }

  return (
    <motion.figure
      ref={ref}
      className={cn("relative z-10 m-0", side > 0 && "pt-12 sm:pt-24")}
      style={{ perspective: config.perspective }}
    >
      <motion.div
        className="relative w-full overflow-hidden border border-black/10 bg-neutral-200 shadow-[0_24px_80px_rgba(20,18,14,0.16)] dark:border-white/10 dark:bg-neutral-900 dark:shadow-[0_24px_90px_rgba(0,0,0,0.45)]"
        style={{
          ...frameStyle,
          filter,
          x,
          y,
          z,
          rotateX,
          rotateZ,
          skewX,
          transformStyle: "preserve-3d",
          willChange: "transform, filter",
        }}
      >
        <motion.img
          src={image.src}
          alt={image.alt}
          className="h-full w-full object-cover"
          style={{ scale: imageScale }}
          loading={index < 4 ? "eager" : "lazy"}
          draggable={false}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-black/10" />
      </motion.div>
    </motion.figure>
  );
}

export interface ScrollTiltedGridProps {
  images?: readonly ScrollTiltedGridImage[];
  loop?: boolean;
  initialCycles?: number;
  maxCycles?: number;
  smoothScroll?: boolean;
  aspectRatio?: string;
  perspective?: number;
  maxTilt?: number;
  maxBlur?: number;
  rounded?: string;
  sectionPadding?: string;
  className?: string;
}

export function ScrollTiltedGrid({
  images = DEFAULT_TILTED_GRID_IMAGES,
  loop = false,
  initialCycles = 2,
  maxCycles = 4,
  smoothScroll = true,
  aspectRatio = "4 / 5",
  perspective = 1000,
  maxTilt = 62,
  maxBlur = 7,
  rounded = "0.25rem",
  sectionPadding = "18vh",
  className,
}: ScrollTiltedGridProps) {
  const reducedMotion = useReducedMotion() ?? false;
  const cycleLimit = Math.max(1, maxCycles);
  const [cycles, setCycles] = useState(() =>
    Math.max(1, Math.min(initialCycles, cycleLimit)),
  );
  const sentinelRef = useRef<HTMLDivElement>(null);
  const scrollY = useMotionValue(0);
  const sourceImages = images.length > 0 ? images : DEFAULT_TILTED_GRID_IMAGES;

  useEffect(() => {
    let frame = 0;
    const update = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        scrollY.set(window.scrollY);
      });
    };

    scrollY.set(window.scrollY);
    window.addEventListener("scroll", update, { passive: true });

    return () => {
      window.removeEventListener("scroll", update);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [scrollY]);

  useEffect(() => {
    if (!loop) return;
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setCycles((current) => Math.min(current + 1, cycleLimit));
        }
      },
      { rootMargin: "1200px 0px" },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [cycleLimit, loop]);

  const renderedImages = useMemo(
    () =>
      Array.from({ length: loop ? cycles : 1 }, (_, cycle) =>
        sourceImages.map((image, index) => ({ image, index, cycle })),
      ).flat(),
    [cycles, loop, sourceImages],
  );

  const config = useMemo<TileConfig>(
    () => ({
      aspectRatio,
      perspective,
      maxTilt,
      maxBlur,
      rounded,
      reducedMotion,
      scrollY,
    }),
    [
      aspectRatio,
      maxBlur,
      maxTilt,
      perspective,
      reducedMotion,
      rounded,
      scrollY,
    ],
  );

  const gallery = (
    <section
      className={cn("relative w-full overflow-hidden", className)}
      aria-label="Scroll-reactive image gallery"
    >
      <div
        className="mx-auto grid w-full max-w-5xl grid-cols-2 items-start gap-x-4 gap-y-16 px-4 sm:gap-x-10 sm:gap-y-28 sm:px-10 lg:gap-x-16"
        style={{
          paddingTop: sectionPadding,
          paddingBottom: sectionPadding,
        }}
      >
        {renderedImages.map(({ image, index, cycle }) => (
          <ImageTile
            key={`${cycle}-${index}-${image.src}`}
            image={image}
            index={index}
            config={config}
          />
        ))}
      </div>
      {loop ? (
        <div ref={sentinelRef} aria-hidden className="h-px w-full" />
      ) : null}
    </section>
  );

  if (!smoothScroll || reducedMotion) return gallery;

  return (
    <ReactLenis
      root
      options={{ autoRaf: true, lerp: 0.075, wheelMultiplier: 0.85 }}
    >
      {gallery}
    </ReactLenis>
  );
}
