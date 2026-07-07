"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, LayoutGrid, Terminal } from "lucide-react";
import { CopyButton } from "@/components/copy-button";

export function HeroButtons() {
  const installCommand = "npx shadcn@latest add @componentry/magnetic-dock";

  return (
    <div className="flex w-full min-w-0 flex-col items-stretch justify-center gap-3 pt-6 pb-2 sm:w-auto sm:flex-row sm:items-start">
      <motion.div
        whileTap={{ scale: 0.96 }}
        className="relative z-10 w-full sm:w-fit"
      >
        <Link
          href="/docs"
          className="flex h-12 w-full cursor-pointer items-center justify-center gap-2.5 whitespace-nowrap rounded-xl bg-gradient-to-b from-zinc-900 to-zinc-950 px-5 font-medium text-zinc-100 shadow-[0_1px_1px_0_rgba(0,0,0,0.2),0_8px_20px_-8px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,255,255,0.08),inset_0_1.5px_0_0_rgba(255,255,255,0.08)] transition-[box-shadow,background-color,transform,gap] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:gap-3 hover:from-zinc-800 hover:to-zinc-900 hover:shadow-[0_2px_2px_0_rgba(0,0,0,0.24),0_14px_30px_-10px_rgba(0,0,0,0.58),0_0_0_1px_rgba(255,255,255,0.08),inset_0_1.5px_0_0_rgba(255,255,255,0.08)] dark:from-white dark:to-zinc-100 dark:text-zinc-950 dark:shadow-[0_1px_1px_0_rgba(0,0,0,0.06),0_8px_20px_-8px_rgba(0,0,0,0.25),0_0_0_1px_rgba(0,0,0,0.08),inset_0_1.5px_0_0_rgba(255,255,255,1),inset_0_-1px_0_0_rgba(0,0,0,0.03)] dark:hover:from-zinc-50 dark:hover:to-zinc-200 sm:w-fit"
        >
          <LayoutGrid className="size-4" />
          <span className="text-sm font-semibold">Browse components</span>
          <ArrowRight className="size-3.5" />
        </Link>
      </motion.div>

      <motion.div
        whileTap={{ scale: 0.96 }}
        className="min-w-0 w-full sm:w-auto"
      >
        <div className="group relative flex h-12 w-full min-w-0 items-center justify-center gap-2 overflow-hidden rounded-xl bg-white/70 px-3 text-sm font-semibold text-zinc-900 shadow-[0_0_0_1px_rgba(0,0,0,0.075),0_8px_20px_-14px_rgba(0,0,0,0.45),inset_0_1px_0_0_rgba(255,255,255,0.8)] backdrop-blur-xl transition-[box-shadow,background-color,gap,padding] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-white hover:shadow-[0_0_0_1px_rgba(0,0,0,0.11),0_12px_28px_-16px_rgba(0,0,0,0.52),inset_0_1px_0_0_rgba(255,255,255,0.9)] dark:bg-white/[0.055] dark:text-zinc-100 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.08),inset_0_1px_0_0_rgba(255,255,255,0.04)] dark:hover:bg-white/[0.075] dark:hover:shadow-[0_0_0_1px_rgba(255,255,255,0.13),inset_0_1px_0_0_rgba(255,255,255,0.06)] sm:inline-flex sm:w-auto sm:gap-3 sm:px-4 sm:hover:px-5">
          <Terminal className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
          <span className="min-w-0 flex-1 truncate font-mono text-xs tracking-tight text-zinc-700 dark:text-zinc-400 sm:text-sm">
            {installCommand}
          </span>
          <CopyButton
            code={installCommand}
            absolute={false}
            className="p-1.5"
          />
        </div>
      </motion.div>

    </div>
  );
}
