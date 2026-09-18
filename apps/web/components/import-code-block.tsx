import { cn } from "@/lib/utils"

interface ImportCodeBlockProps {
  html: string
  /** Nest inside a shared usage surface without its own card chrome. */
  bare?: boolean
  className?: string
}

export function ImportCodeBlock({ html, bare = false, className }: ImportCodeBlockProps) {
  return (
    <div
      data-code-block
      data-line-numbers="false"
      className={cn(
        "overflow-hidden text-sm [&_.shiki]:!bg-transparent [&_pre]:!bg-transparent [&_pre]:whitespace-pre-wrap [&_pre]:break-words [&_pre]:px-4 [&_pre]:py-3.5",
        bare
          ? className
          : "rounded-xl bg-zinc-100/70 dark:bg-white/[0.035]",
        className
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
