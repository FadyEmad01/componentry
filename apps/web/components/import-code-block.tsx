interface ImportCodeBlockProps {
  html: string
}

export function ImportCodeBlock({ html }: ImportCodeBlockProps) {
  return (
    <div
      data-code-block
      data-line-numbers="false"
      className="overflow-hidden rounded-lg border border-neutral-200 bg-white text-sm dark:border-[#333333] dark:!bg-[#121212] [&_.shiki]:!bg-transparent [&_pre]:!bg-transparent [&_pre]:whitespace-pre-wrap [&_pre]:break-words [&_pre]:px-4 [&_pre]:py-3.5"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
