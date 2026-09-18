"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { CopyButton } from "@/components/copy-button"
import { useSmoothCodeHeight } from "@/hooks/use-smooth-code-height"
import {
  Tabs,
  TabsList,
  TabsTab,
} from "@workspace/ui/components/tabs"

import { PACKAGE_MANAGERS, type PackageManager } from "@/lib/install-command"
export { INSTALL_COMMANDS, PACKAGE_MANAGERS, type PackageManager } from "@/lib/install-command"

export type HighlightedPmCommand = {
  code: string
  html: string
}

interface PackageManagerCommandProps {
  /** Pre-highlighted commands (same Shiki themes as usage). Prefer this. */
  commands?: Record<PackageManager, HighlightedPmCommand>
  /** Fallback when commands aren't precomputed (client highlight via API). */
  getCommand?: (pm: PackageManager) => string
  defaultPm?: PackageManager
}

async function fetchBashHtml(code: string): Promise<string> {
  const response = await fetch("/api/docs/source", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code, lang: "bash" }),
  })
  if (!response.ok) throw new Error("Failed to highlight command")
  const data = (await response.json()) as { html?: string }
  return data.html ?? ""
}

export function PackageManagerCommand({
  commands: commandsProp,
  getCommand,
  defaultPm = "pnpm",
}: PackageManagerCommandProps) {
  const [selected, setSelected] = React.useState<PackageManager>(defaultPm)
  const [fetched, setFetched] = React.useState<
    Partial<Record<PackageManager, HighlightedPmCommand>>
  >({})

  React.useEffect(() => {
    if (commandsProp || !getCommand) return

    let cancelled = false
    void (async () => {
      const entries = await Promise.all(
        PACKAGE_MANAGERS.map(async (pm) => {
          const code = getCommand(pm)
          try {
            const html = await fetchBashHtml(code)
            return [pm, { code, html }] as const
          } catch {
            return [pm, { code, html: "" }] as const
          }
        }),
      )
      if (!cancelled) {
        setFetched(Object.fromEntries(entries))
      }
    })()

    return () => {
      cancelled = true
    }
  }, [commandsProp, getCommand])

  const commands = commandsProp ?? fetched
  const active = commands[selected]
  const code = active?.code ?? getCommand?.(selected) ?? ""
  const html = active?.html ?? ""
  const { contentRef, wrapperProps } = useSmoothCodeHeight([code, selected, html])

  return (
    <div className="space-y-3">
      <Tabs
        value={selected}
        onValueChange={(value) => {
          if (value) setSelected(value as PackageManager)
        }}
      >
        <TabsList aria-label="Package manager">
          {PACKAGE_MANAGERS.map((pm) => (
            <TabsTab key={pm} value={pm}>
              {pm}
            </TabsTab>
          ))}
        </TabsList>
      </Tabs>

      <div
        data-code-block
        data-line-numbers="false"
        className="relative flex items-center gap-3 overflow-hidden rounded-xl bg-zinc-100/70 px-4 py-3.5 dark:bg-white/[0.035]"
      >
        <div {...wrapperProps} className={cn(wrapperProps.className, "min-w-0 flex-1")}>
          <div ref={contentRef} className="overflow-x-auto no-scrollbar">
            {html ? (
              <div
                className="text-[13px] leading-5 sm:text-sm [&_.shiki]:!bg-transparent [&_pre]:!bg-transparent [&_pre]:m-0 [&_pre]:whitespace-pre [&_pre]:p-0 [&_code]:font-mono"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            ) : (
              <pre className="m-0 whitespace-pre font-mono text-[13px] leading-5 text-zinc-700 sm:text-sm dark:text-zinc-300">
                <code>{code}</code>
              </pre>
            )}
          </div>
        </div>

        <CopyButton
          code={code}
          eventName="component_install_command_copied"
          absolute={false}
          className="shrink-0"
        />
      </div>
    </div>
  )
}
