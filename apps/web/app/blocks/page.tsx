import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";

import { LandingShaderBand } from "@/components/landing/landing-frame";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Componentry Pro Blocks | Componentry",
  description:
    "A new library of production-ready blocks is coming soon to Componentry Pro.",
};

export default function BlocksPage() {
  return (
    <section className="relative flex min-h-[calc(100vh-3.5rem)] flex-col overflow-hidden">
      <LandingShaderBand className="h-12 opacity-55 sm:h-16" />

      <div className="relative flex flex-1 items-center justify-center px-4 py-20 sm:px-8 sm:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.035] dark:opacity-[0.075]"
          style={{
            backgroundImage:
              "radial-gradient(circle, currentColor 0.7px, transparent 0.8px)",
            backgroundSize: "8px 8px",
          }}
        />

        <div className="relative mx-auto flex max-w-2xl flex-col items-center text-center">
          <p className="mb-5 text-sm font-medium tracking-tight text-muted-foreground">
            Componentry Pro
          </p>
          <h1 className="text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-foreground sm:text-5xl md:text-6xl">
            A new home for Componentry blocks.
          </h1>
          <p className="mt-5 max-w-xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
            A focused library of polished, production-ready blocks is coming
            soon to Componentry Pro.
          </p>

          <a
            href="https://pro.componentry.dev"
            className="mt-8 inline-flex h-10 items-center justify-center gap-1.5 rounded-lg bg-foreground px-4 text-sm font-medium text-background transition-opacity duration-150 hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Visit Componentry Pro
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </a>
        </div>
      </div>

      <LandingShaderBand className="h-12 opacity-55 sm:h-16" />
    </section>
  );
}
