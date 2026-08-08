"use client";

import { cn } from "@workspace/ui/lib/utils";
import * as React from "react";

export const hoverTransitionEffects = [
  "wipe",
  "ripple",
  "parallax",
  "curtain",
  "diagonal",
  "morph",
  "strips",
  "slide",
] as const;

export const hoverTransitionDirections = [
  "top",
  "right",
  "bottom",
  "left",
  "top-left",
  "top-right",
  "bottom-right",
  "bottom-left",
  "center",
] as const;

export type HoverTransitionEffect = (typeof hoverTransitionEffects)[number];
export type HoverTransitionDirection =
  (typeof hoverTransitionDirections)[number];

export interface HoverTransitionProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "children"
> {
  defaultComponent?: React.ReactNode;
  hoverComponent?: React.ReactNode;
  effect?: HoverTransitionEffect;
  direction?: HoverTransitionDirection;
  duration?: number;
  easing?: string;
  label?: string;
}

type Vector = { x: number; y: number };

const directionVectors: Record<HoverTransitionDirection, Vector> = {
  top: { x: 0, y: -1 },
  right: { x: 1, y: 0 },
  bottom: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  "top-left": { x: -1, y: -1 },
  "top-right": { x: 1, y: -1 },
  "bottom-right": { x: 1, y: 1 },
  "bottom-left": { x: -1, y: 1 },
  center: { x: 0, y: 0 },
};

const rippleOrigins: Record<HoverTransitionDirection, string> = {
  top: "50% 0%",
  right: "100% 50%",
  bottom: "50% 100%",
  left: "0% 50%",
  "top-left": "0% 0%",
  "top-right": "100% 0%",
  "bottom-right": "100% 100%",
  "bottom-left": "0% 100%",
  center: "50% 50%",
};

function hiddenInset(direction: HoverTransitionDirection) {
  switch (direction) {
    case "top":
      return "inset(0 0 100% 0)";
    case "right":
      return "inset(0 0 0 100%)";
    case "bottom":
      return "inset(100% 0 0 0)";
    case "left":
      return "inset(0 100% 0 0)";
    case "top-left":
      return "inset(0 100% 100% 0)";
    case "top-right":
      return "inset(0 0 100% 100%)";
    case "bottom-right":
      return "inset(100% 0 0 100%)";
    case "bottom-left":
      return "inset(100% 100% 0 0)";
    default:
      return "inset(50%)";
  }
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false);

  React.useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reduced;
}

function FallbackCard({ hover = false }: { hover?: boolean }) {
  return (
    <div
      className={cn(
        "relative flex h-full min-h-64 w-full flex-col justify-between overflow-hidden p-5 text-white",
        hover
          ? "bg-[radial-gradient(circle_at_75%_20%,#dfff63_0,transparent_26%),linear-gradient(145deg,#292929,#080808)]"
          : "bg-[radial-gradient(circle_at_20%_15%,#4f5dff_0,transparent_30%),linear-gradient(145deg,#1d2230,#07080b)]",
      )}
    >
      <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-white/70">
        <span className="size-2 bg-[#dfff63]" />
        {hover ? "Hover" : "Default"}
      </div>
      <div>
        <p className="text-3xl font-medium tracking-[-0.04em]">
          {hover ? "New perspective" : "Hover this card"}
        </p>
        <p className="mt-1 text-sm text-white/60">Hover Transition</p>
      </div>
    </div>
  );
}

function Layer({
  children,
  style,
  className,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0", className)}
      style={style}
    >
      {children}
    </div>
  );
}

export function HoverTransition({
  defaultComponent,
  hoverComponent,
  effect = "wipe",
  direction = "right",
  duration = 0.65,
  easing = "cubic-bezier(0.22, 1, 0.36, 1)",
  label = "Interactive hover transition",
  className,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  tabIndex,
  ...props
}: HoverTransitionProps) {
  const [active, setActive] = React.useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const vector = directionVectors[direction];
  const seconds = reducedMotion ? 0.01 : Math.max(0, duration);
  const transition = `all ${seconds}s ${easing}`;
  const before = defaultComponent ?? <FallbackCard />;
  const after = hoverComponent ?? <FallbackCard hover />;
  const distanceX = vector.x * 100;
  const distanceY = vector.y * 100;

  const activate = (event: React.MouseEvent<HTMLDivElement>) => {
    setActive(true);
    onMouseEnter?.(event);
  };
  const deactivate = (event: React.MouseEvent<HTMLDivElement>) => {
    setActive(false);
    onMouseLeave?.(event);
  };

  const hoverLayer = (style: React.CSSProperties) => (
    <Layer style={{ transition, ...style }}>{after}</Layer>
  );

  let animatedLayers: React.ReactNode;

  switch (effect) {
    case "ripple":
      animatedLayers = hoverLayer({
        clipPath: active
          ? `circle(150% at ${rippleOrigins[direction]})`
          : `circle(0% at ${rippleOrigins[direction]})`,
      });
      break;
    case "parallax":
      animatedLayers = (
        <>
          <Layer
            style={{
              transform: active
                ? `translate3d(${-distanceX * 0.18}%, ${-distanceY * 0.18}%, 0) scale(1.06)`
                : "translate3d(0, 0, 0) scale(1)",
              transition,
            }}
          >
            {before}
          </Layer>
          <Layer
            style={{
              clipPath: active ? "inset(0)" : hiddenInset(direction),
              transition,
            }}
          >
            <div
              className="h-full w-full"
              style={{
                transform: active
                  ? "translate3d(0, 0, 0) scale(1)"
                  : `translate3d(${distanceX * 0.42}%, ${distanceY * 0.42}%, 0) scale(1.1)`,
                transition,
              }}
            >
              {after}
            </div>
          </Layer>
        </>
      );
      break;
    case "curtain": {
      const verticalMotion = vector.y !== 0 || direction === "center";
      animatedLayers = (
        <>
          {hoverLayer({
            opacity: active ? 1 : 0,
            transform: active ? "scale(1)" : "scale(.9)",
          })}
          <Layer
            style={{
              clipPath: verticalMotion
                ? "inset(0 0 50% 0)"
                : "inset(0 50% 0 0)",
              transform: active
                ? verticalMotion
                  ? "translate3d(0, -100%, 0)"
                  : "translate3d(-100%, 0, 0)"
                : "translate3d(0, 0, 0)",
              transition,
            }}
          >
            {before}
          </Layer>
          <Layer
            style={{
              clipPath: verticalMotion
                ? "inset(50% 0 0 0)"
                : "inset(0 0 0 50%)",
              transform: active
                ? verticalMotion
                  ? "translate3d(0, 100%, 0)"
                  : "translate3d(100%, 0, 0)"
                : "translate3d(0, 0, 0)",
              transition,
            }}
          >
            {before}
          </Layer>
        </>
      );
      break;
    }
    case "diagonal": {
      const fromLeft = direction.includes("left") || direction === "left";
      const firstClip = fromLeft
        ? "polygon(0 0, 100% 0, 100% 100%)"
        : "polygon(0 0, 100% 0, 0 100%)";
      const secondClip = fromLeft
        ? "polygon(0 0, 100% 100%, 0 100%)"
        : "polygon(100% 0, 100% 100%, 0 100%)";
      animatedLayers = (
        <>
          {hoverLayer({ opacity: active ? 1 : 0 })}
          <Layer
            style={{
              clipPath: firstClip,
              transform: active
                ? fromLeft
                  ? "translate3d(100%, -100%, 0)"
                  : "translate3d(-100%, -100%, 0)"
                : "translate3d(0, 0, 0)",
              transition,
            }}
          >
            {before}
          </Layer>
          <Layer
            style={{
              clipPath: secondClip,
              transform: active
                ? fromLeft
                  ? "translate3d(-100%, 100%, 0)"
                  : "translate3d(100%, 100%, 0)"
                : "translate3d(0, 0, 0)",
              transition,
            }}
          >
            {before}
          </Layer>
        </>
      );
      break;
    }
    case "morph":
      animatedLayers = hoverLayer({
        borderRadius: active ? "0%" : "50%",
        clipPath: active ? "inset(0% round 0%)" : "inset(38% round 50%)",
        opacity: active ? 1 : 0,
        transform: active
          ? "translate3d(0, 0, 0) scale(1) rotate(0deg)"
          : `translate3d(${distanceX * 0.08}%, ${distanceY * 0.08}%, 0) scale(.72) rotate(${vector.x < 0 ? -4 : 4}deg)`,
        transformOrigin: rippleOrigins[direction],
      });
      break;
    case "strips": {
      const vertical = Math.abs(vector.x) >= Math.abs(vector.y);
      animatedLayers = Array.from({ length: 6 }, (_, index) => {
        const start = (index / 6) * 100;
        const end = ((index + 1) / 6) * 100;
        const clipPath = vertical
          ? `inset(0 ${100 - end}% 0 ${start}%)`
          : `inset(${start}% 0 ${100 - end}% 0)`;
        const offsetX = (vector.x || (vector.y === 0 ? 1 : 0)) * 105;
        const offsetY = vector.y * 105;
        return (
          <Layer
            key={index}
            style={{
              clipPath,
              opacity: active ? 1 : 0,
              transform: active
                ? "translate3d(0, 0, 0)"
                : `translate3d(${offsetX}%, ${offsetY}%, 0)`,
              transition: `all ${seconds}s ${easing} ${index * 0.035}s`,
            }}
          >
            {after}
          </Layer>
        );
      });
      break;
    }
    case "slide":
      animatedLayers = (
        <>
          <Layer
            style={{
              transform: active
                ? direction === "center"
                  ? "scale(1.08)"
                  : `translate3d(${-distanceX}%, ${-distanceY}%, 0)`
                : "translate3d(0, 0, 0)",
              opacity: active && direction === "center" ? 0 : 1,
              transition,
            }}
          >
            {before}
          </Layer>
          {hoverLayer({
            opacity: active ? 1 : direction === "center" ? 0 : 1,
            transform: active
              ? "translate3d(0, 0, 0)"
              : direction === "center"
                ? "scale(.84)"
                : `translate3d(${distanceX}%, ${distanceY}%, 0)`,
          })}
        </>
      );
      break;
    case "wipe":
    default:
      animatedLayers = hoverLayer({
        clipPath: active ? "inset(0)" : hiddenInset(direction),
      });
      break;
  }

  const duplicatesDefault =
    effect === "parallax" ||
    effect === "curtain" ||
    effect === "diagonal" ||
    effect === "slide";

  return (
    <div
      {...props}
      role="group"
      aria-label={label}
      tabIndex={tabIndex ?? 0}
      data-active={active ? "true" : "false"}
      data-effect={effect}
      className={cn(
        "relative isolate min-h-64 overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 dark:focus-visible:ring-white",
        className,
      )}
      onMouseEnter={activate}
      onMouseLeave={deactivate}
      onFocus={(event) => {
        setActive(true);
        onFocus?.(event);
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setActive(false);
        onBlur?.(event);
      }}
    >
      <div className={cn("h-full w-full", duplicatesDefault && "invisible")}>
        {before}
      </div>
      {animatedLayers}
    </div>
  );
}
