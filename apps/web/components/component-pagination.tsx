import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { docsConfig } from "@/config/docs"

interface ComponentPaginationProps {
  currentSlug: string
}

const componentItems = docsConfig.nav.flatMap((group) =>
  group.items.filter((item) => item.href.startsWith("/docs/components/"))
)

const paginationLinkClass =
  "group inline-flex size-8 items-center justify-center rounded-[9px] bg-white/70 text-zinc-400 shadow-[0_0_0_1px_rgba(0,0,0,0.05),inset_0_6px_12px_-15px_color-mix(in_oklch,var(--foreground)_45%,transparent),inset_0_-6px_12px_-16px_color-mix(in_oklch,var(--foreground)_38%,transparent)] backdrop-blur-xl transition-[background-color,color,box-shadow] duration-200 hover:bg-white hover:text-zinc-800 hover:shadow-[0_0_0_1px_rgba(0,0,0,0.075),inset_0_6px_12px_-15px_color-mix(in_oklch,var(--foreground)_45%,transparent),inset_0_-6px_12px_-16px_color-mix(in_oklch,var(--foreground)_38%,transparent)] dark:bg-white/[0.045] dark:text-zinc-500 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.075),inset_0_6px_12px_-15px_color-mix(in_oklch,var(--foreground)_45%,transparent),inset_0_-6px_12px_-16px_color-mix(in_oklch,var(--foreground)_38%,transparent)] dark:hover:bg-white/[0.07] dark:hover:text-zinc-200 dark:hover:shadow-[0_0_0_1px_rgba(255,255,255,0.11),inset_0_6px_12px_-15px_color-mix(in_oklch,var(--foreground)_45%,transparent),inset_0_-6px_12px_-16px_color-mix(in_oklch,var(--foreground)_38%,transparent)]"

const paginationDisabledClass =
  "inline-flex size-8 items-center justify-center rounded-[9px] bg-white/35 text-zinc-200 shadow-[0_0_0_1px_rgba(0,0,0,0.025)] dark:bg-white/[0.02] dark:text-zinc-800 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.04)]"

export function ComponentPagination({
  currentSlug,
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
      className="inline-flex shrink-0 items-center gap-1.5"
    >
      {previous ? (
        <Link
          href={previous.href}
          rel="prev"
          aria-label={`Previous component: ${previous.title}`}
          title={`Previous: ${previous.title}`}
          className={paginationLinkClass}
        >
          <ArrowLeft
            className="size-[15px] transition-transform duration-200 group-hover:-translate-x-px"
            strokeWidth={1.6}
            aria-hidden
          />
        </Link>
      ) : (
        <span
          className={paginationDisabledClass}
          aria-hidden
        >
          <ArrowLeft className="size-[15px]" strokeWidth={1.6} />
        </span>
      )}

      {next ? (
        <Link
          href={next.href}
          rel="next"
          aria-label={`Next component: ${next.title}`}
          title={`Next: ${next.title}`}
          className={paginationLinkClass}
        >
          <ArrowRight
            className="size-[15px] transition-transform duration-200 group-hover:translate-x-px"
            strokeWidth={1.6}
            aria-hidden
          />
        </Link>
      ) : (
        <span
          className={paginationDisabledClass}
          aria-hidden
        >
          <ArrowRight className="size-[15px]" strokeWidth={1.6} />
        </span>
      )}
    </nav>
  )
}
