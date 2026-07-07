"use client";

import Link from "next/link";
import { LayoutGrid } from "lucide-react";

function GitHubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 0C5.373 0 0 5.372 0 12c0 5.303 3.438 9.8 8.207 11.387.6.11.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.388-1.333-1.757-1.333-1.757-1.089-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.834 2.807 1.305 3.493.998.108-.776.418-1.305.762-1.605-2.666-.304-5.467-1.333-5.467-5.93 0-1.312.469-2.382 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.009-.323 3.301 1.23A11.52 11.52 0 0 1 12 5.8c1.02.005 2.047.139 3.006.404 2.291-1.553 3.298-1.23 3.298-1.23.652 1.653.241 2.874.117 3.176.769.839 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.48 5.921.431.371.824 1.103.824 2.222v3.293c0 .319.192.688.802.576C20.566 21.795 24 17.298 24 12 24 5.372 18.627 0 12 0Z" />
    </svg>
  );
}

export function HeroButtons() {
  return (
    <div className="flex w-full min-w-0 flex-col items-stretch justify-center gap-3 pt-6 pb-2 sm:w-auto sm:flex-row sm:items-start">
      <div className="relative z-10 w-full sm:w-fit">
        <Link
          href="/docs"
          className="group flex h-12 w-full cursor-pointer items-center justify-center gap-2.5 whitespace-nowrap rounded-xl bg-gradient-to-b from-zinc-900 to-zinc-950 px-5 font-medium text-zinc-100 shadow-[0_1px_1px_0_rgba(0,0,0,0.2),0_8px_20px_-8px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,255,255,0.08),inset_0_1.5px_0_0_rgba(255,255,255,0.08)] transition-[box-shadow,background-color,color] duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:from-zinc-800 hover:to-zinc-900 hover:shadow-[0_2px_2px_0_rgba(0,0,0,0.24),0_14px_30px_-10px_rgba(0,0,0,0.58),0_0_0_1px_rgba(255,255,255,0.08),inset_0_1.5px_0_0_rgba(255,255,255,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:from-white dark:to-zinc-100 dark:text-zinc-950 dark:shadow-[0_1px_1px_0_rgba(0,0,0,0.06),0_8px_20px_-8px_rgba(0,0,0,0.25),0_0_0_1px_rgba(0,0,0,0.08),inset_0_1.5px_0_0_rgba(255,255,255,1),inset_0_-1px_0_0_rgba(0,0,0,0.03)] dark:hover:from-zinc-50 dark:hover:to-zinc-200 dark:focus-visible:ring-zinc-300/60 dark:focus-visible:ring-offset-[#09090B] sm:w-fit"
        >
          <LayoutGrid className="size-4 transition-transform duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-px" />
          <span className="text-sm font-semibold">Browse components</span>
        </Link>
      </div>

      <div className="relative z-10 w-full sm:w-fit">
        <Link
          href="https://github.com/harshjdhv/componentry"
          target="_blank"
          rel="noreferrer"
          className="group flex h-12 w-full cursor-pointer items-center justify-center gap-2.5 whitespace-nowrap rounded-xl bg-white/75 px-6 font-medium text-zinc-900 shadow-[0_0_0_1px_rgba(0,0,0,0.085),0_8px_20px_-14px_rgba(0,0,0,0.45),inset_0_1px_0_0_rgba(255,255,255,0.82)] backdrop-blur-xl transition-[box-shadow,background-color,color] duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-white hover:text-zinc-950 hover:shadow-[0_0_0_1px_rgba(0,0,0,0.12),0_12px_28px_-16px_rgba(0,0,0,0.52),inset_0_1px_0_0_rgba(255,255,255,0.92)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:bg-white/[0.065] dark:text-zinc-100 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.09),inset_0_1px_0_0_rgba(255,255,255,0.045)] dark:hover:bg-white/[0.085] dark:hover:text-white dark:hover:shadow-[0_0_0_1px_rgba(255,255,255,0.14),inset_0_1px_0_0_rgba(255,255,255,0.065)] dark:focus-visible:ring-zinc-300/60 dark:focus-visible:ring-offset-[#09090B] sm:w-fit"
        >
          <GitHubIcon className="size-[18px] text-zinc-800 transition-[color,transform] duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-px group-hover:text-zinc-950 dark:text-zinc-200 dark:group-hover:text-white" />
          <span className="text-sm font-semibold">View on GitHub</span>
        </Link>
      </div>

    </div>
  );
}
