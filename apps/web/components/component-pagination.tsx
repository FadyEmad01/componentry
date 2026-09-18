import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { docsConfig } from "@/config/docs"
import { cn } from "@/lib/utils"

interface ComponentPaginationProps {
  currentSlug: string
  className?: string
}

const componentItems = docsConfig.nav.flatMap((group) =>
  group.items.filter((item) => item.href.startsWith("/docs/components/"))
)

export function ComponentPagination({
  currentSlug,
  className,
}: ComponentPaginationProps) {
  const currentHref = `/docs/components/${currentSlug}`
  const currentIndex = componentItems.findIndex(
    (item) => item.href === currentHref
  )

  if (currentIndex === -1) return null

  const previous = componentItems[currentIndex - 1]
  const next = componentItems[currentIndex + 1]

  if (!previous && !next) return null

  return (
    <nav
      aria-label="Component pagination"
      className={cn(
        "flex items-start justify-between gap-6 border-t border-border/50 pt-8",
        className
      )}
    >
      {previous ? (
        <Link
          href={previous.href}
          rel="prev"
          className="group min-w-0 max-w-[50%] space-y-1.5 text-left"
        >
          <span className="flex items-center gap-1 text-[11px] font-medium uppercase tracking-[0.1em] text-zinc-400 transition-colors group-hover:text-zinc-600 dark:text-zinc-500 dark:group-hover:text-zinc-400">
            <ChevronLeft className="size-3.5 shrink-0" strokeWidth={1.75} aria-hidden />
            Previous
          </span>
          <span className="block truncate text-[15px] font-medium tracking-tight text-zinc-800 transition-colors group-hover:text-zinc-600 dark:text-zinc-200 dark:group-hover:text-zinc-300">
            {previous.title}
          </span>
        </Link>
      ) : (
        <span aria-hidden />
      )}

      {next ? (
        <Link
          href={next.href}
          rel="next"
          className="group ml-auto min-w-0 max-w-[50%] space-y-1.5 text-right"
        >
          <span className="flex items-center justify-end gap-1 text-[11px] font-medium uppercase tracking-[0.1em] text-zinc-400 transition-colors group-hover:text-zinc-600 dark:text-zinc-500 dark:group-hover:text-zinc-400">
            Next
            <ChevronRight className="size-3.5 shrink-0" strokeWidth={1.75} aria-hidden />
          </span>
          <span className="block truncate text-[15px] font-medium tracking-tight text-zinc-800 transition-colors group-hover:text-zinc-600 dark:text-zinc-200 dark:group-hover:text-zinc-300">
            {next.title}
          </span>
        </Link>
      ) : null}
    </nav>
  )
}
