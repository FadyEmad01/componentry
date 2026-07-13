import { cn } from "@/lib/utils"

export interface DocsPropItem {
  name: string
  type: string
  default?: string
  description: string
}

interface DocsPropsTableProps {
  props: DocsPropItem[]
  className?: string
}

export function DocsPropsTable({ props, className }: DocsPropsTableProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border border-neutral-200 bg-neutral-200/40 dark:border-neutral-800 dark:bg-[#222222]",
        className
      )}
    >
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[520px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-neutral-200 dark:border-neutral-800">
              <th className="px-4 py-3 text-left text-[13px] font-medium text-neutral-600 dark:text-neutral-400">
                Property
              </th>
              <th className="w-[28%] px-4 py-3 text-left text-[13px] font-medium text-neutral-600 dark:text-neutral-400">
                Type
              </th>
              <th className="w-[22%] px-4 py-3 text-left text-[13px] font-medium text-neutral-600 dark:text-neutral-400">
                Default
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200 bg-white dark:divide-neutral-800 dark:bg-[#121212]">
            {props.map((prop) => (
              <tr
                key={prop.name}
                className="transition-colors hover:bg-zinc-100/70 dark:hover:bg-white/[0.035]"
              >
                <td className="px-4 py-4 align-top">
                  <div className="space-y-1.5">
                    <code className="font-mono text-[13px] font-medium text-zinc-900 dark:text-zinc-100">
                      {prop.name}
                    </code>
                    {prop.description && (
                      <p className="max-w-md text-[13px] leading-relaxed text-muted-foreground">
                        {prop.description}
                      </p>
                    )}
                  </div>
                </td>
                <td className="px-4 py-4 align-top">
                  <code className="inline-block rounded-md bg-zinc-200/70 px-2 py-1 font-mono text-[12px] text-zinc-700 dark:bg-zinc-800/70 dark:text-zinc-300">
                    {prop.type}
                  </code>
                </td>
                <td className="px-4 py-4 align-top">
                  {prop.default ? (
                    <code className="inline-block rounded-md bg-zinc-200/40 px-2 py-1 font-mono text-[12px] text-muted-foreground dark:bg-zinc-800/40">
                      {prop.default}
                    </code>
                  ) : (
                    <span className="text-[13px] text-muted-foreground/35">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
