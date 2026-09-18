import Link from "next/link"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface DocsFooterNoteProps {
  title?: string
  children: ReactNode
  className?: string
}

function DocsFooterNote({ title, children, className }: DocsFooterNoteProps) {
  return (
    <div className={cn("space-y-2.5", className)}>
      {title && (
        <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-zinc-500 dark:text-zinc-400">
          {title}
        </p>
      )}
      <div className="max-w-xl text-pretty text-[17px] font-normal leading-8 tracking-[-0.015em] text-zinc-700 dark:text-zinc-200">
        {children}
      </div>
    </div>
  )
}

export function DocsFooterSection() {
  return (
    <div className="flex flex-col gap-10">
      <DocsFooterNote title="Keep in mind">
        This component is inspired by various open-source projects and patterns.
        Please verify licenses and implementation details before using in production.
      </DocsFooterNote>

      <div className="flex flex-col gap-4 border-t border-border/50 pt-8 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
        <div className="min-w-0 space-y-2.5">
          <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-zinc-500 dark:text-zinc-400">
            Need a custom component?
          </p>
          <p className="max-w-md text-pretty text-[17px] font-normal leading-8 tracking-[-0.015em] text-zinc-700 dark:text-zinc-200">
            I build bespoke UI components &amp; websites tailored to your brand.
          </p>
        </div>
        <Link
          href="https://x.com/harshjdhv"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-fit shrink-0 items-center gap-2 rounded-lg bg-zinc-900 px-3.5 py-2 text-[13px] font-medium text-white transition-[background-color,transform] hover:bg-zinc-800 active:scale-[0.96] dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          <svg role="img" viewBox="0 0 24 24" fill="currentColor" className="size-3.5" aria-hidden>
            <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
          </svg>
          <span>DM me on X</span>
        </Link>
      </div>
    </div>
  )
}
