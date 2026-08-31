"use client";

import { GrainGradient } from "@paper-design/shaders-react";
import { motion, useReducedMotion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function HeroAtmosphere() {
  const { resolvedTheme } = useTheme();
  const shouldReduceMotion = useReducedMotion();
  const isDark = resolvedTheme === "dark";
  const pageBackground = isDark ? "#0a0a0a" : "#ffffff";
  const [paintedTheme, setPaintedTheme] = useState<string | null>(null);
  const shaderIsVisible = paintedTheme === resolvedTheme;

  useEffect(() => {
    if (!resolvedTheme) return;

    setPaintedTheme(null);
    const timeout = window.setTimeout(() => {
      setPaintedTheme(resolvedTheme);
    }, 1800);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [resolvedTheme]);

  return (
    <motion.div
      aria-hidden="true"
      animate={
        shouldReduceMotion ? undefined : { opacity: [0.97, 1, 0.97] }
      }
      transition={{ duration: 18, ease: "easeInOut", repeat: Infinity }}
      className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[44svh] min-h-[360px] max-h-[520px] overflow-hidden"
    >
      {resolvedTheme && (
        <motion.div
          className="absolute inset-0"
          initial={false}
          animate={{
            opacity: shaderIsVisible ? 1 : 0,
            clipPath:
              shouldReduceMotion || shaderIsVisible
                ? "ellipse(120% 160% at 50% 0%)"
                : "ellipse(55% 0% at 50% 0%)",
          }}
          transition={{
            duration: shouldReduceMotion ? 0.35 : 1.6,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div
            className="absolute inset-y-0 left-0 w-[68%] overflow-hidden opacity-80"
            style={{
              WebkitMaskImage:
                "linear-gradient(to right, black 0%, black 70%, transparent 100%)",
              maskImage:
                "linear-gradient(to right, black 0%, black 70%, transparent 100%)",
            }}
          >
            <GrainGradient
              className="absolute inset-y-0 left-0 w-screen max-w-none"
              colorBack={isDark ? "#181818" : "#eeeeee"}
              colors={
                isDark
                  ? ["#1d1d1d", "#252525", "#34322f"]
                  : ["#e7e7e7", "#f0f0f0", "#dddddd"]
              }
              shape="wave"
              softness={1}
              intensity={isDark ? 0.06 : 0.1}
              noise={isDark ? 0.68 : 0.78}
              speed={shouldReduceMotion ? 0 : 0.22}
              rotation={142}
              scale={1.08}
            />
          </div>

          <div
            className="absolute inset-y-0 right-0 w-[68%] overflow-hidden opacity-80"
            style={{
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, black 30%, black 100%)",
              maskImage:
                "linear-gradient(to right, transparent 0%, black 30%, black 100%)",
            }}
          >
            <GrainGradient
              className="absolute inset-y-0 right-0 w-screen max-w-none -scale-x-100"
              colorBack={isDark ? "#181818" : "#eeeeee"}
              colors={
                isDark
                  ? ["#1d1d1d", "#252525", "#34322f"]
                  : ["#e7e7e7", "#f0f0f0", "#dddddd"]
              }
              shape="wave"
              softness={1}
              intensity={isDark ? 0.06 : 0.1}
              noise={isDark ? 0.68 : 0.78}
              speed={shouldReduceMotion ? 0 : 0.22}
              rotation={142}
              scale={1.08}
            />
          </div>

          <GrainGradient
            className="absolute inset-0 opacity-35"
            colorBack={isDark ? "#181818" : "#eeeeee"}
            colors={
              isDark
                ? ["#1d1d1d", "#242424", "#302e2b"]
                : ["#e8e8e8", "#efefef", "#dfdfdf"]
            }
            shape="wave"
            softness={1}
            intensity={isDark ? 0.04 : 0.08}
            noise={isDark ? 0.52 : 0.64}
            speed={shouldReduceMotion ? 0 : 0.14}
            rotation={164}
            scale={1.34}
            offsetY={0.12}
          />
        </motion.div>
      )}

      {resolvedTheme && (
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 46% 64% at 50% 58%, ${
              isDark
                ? "rgba(10, 10, 10, 0.2)"
                : "rgba(255, 255, 255, 0.18)"
            } 0%, transparent 76%)`,
          }}
        />
      )}

      {resolvedTheme && (
        <div
          className="absolute inset-0"
          style={{
            background: [
              `radial-gradient(ellipse 26% 54% at 50% 100%, ${pageBackground} 28%, transparent 74%)`,
              `radial-gradient(ellipse 24% 32% at 2% 138%, ${pageBackground} 18%, transparent 80%)`,
              `radial-gradient(ellipse 28% 56% at 35% 104%, ${pageBackground} 18%, transparent 78%)`,
              `radial-gradient(ellipse 32% 46% at 67% 98%, ${pageBackground} 14%, transparent 76%)`,
              `radial-gradient(ellipse 27% 35% at 100% 142%, ${pageBackground} 22%, transparent 82%)`,
              `linear-gradient(to bottom, transparent 34%, ${pageBackground} 98%, ${pageBackground} 100%)`,
            ].join(", "),
          }}
        />
      )}
    </motion.div>
  );
}
