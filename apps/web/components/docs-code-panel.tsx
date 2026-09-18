"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { CopyButton } from "@/components/copy-button"
import {
  Tabs,
  TabsList,
  TabsTab,
} from "@workspace/ui/components/tabs"

export interface DocsCodePanelTab {
  id: string
  label: string
}

interface DocsCodePanelProps {
  /** Kept for call-site compatibility; chrome icon is no longer rendered. */
  icon?: React.ComponentType<{ className?: string }>
  copyCode: string
  copyEventName?: "content_copied" | "component_install_command_copied"
  tabs?: DocsCodePanelTab[]
  activeTab?: string
  onTabChange?: (id: string) => void
  tabListAriaLabel?: string
  /** Skip the outer surface — for nesting inside a shared usage panel. */
  bare?: boolean
  children: React.ReactNode
  className?: string
}

const surfaceClass =
  "not-prose relative overflow-hidden rounded-xl bg-zinc-100/70 text-sm text-zinc-950 dark:bg-white/[0.035] dark:text-zinc-50"

export function DocsCodePanel({
  copyCode,
  copyEventName,
  tabs,
  activeTab,
  onTabChange,
  tabListAriaLabel = "Options",
  bare = false,
  children,
  className,
}: DocsCodePanelProps) {
  const hasTabs = Boolean(tabs && tabs.length > 0)

  const body = (
    <div
      data-code-block
      data-line-numbers="false"
      className={cn(bare ? "relative" : surfaceClass, !bare && className)}
    >
      <CopyButton
        code={copyCode}
        eventName={copyEventName}
        absolute
        className="top-1 right-1"
      />
      <div className="relative min-w-0">{children}</div>
    </div>
  )

  if (bare) {
    return body
  }

  return (
    <div className={cn(hasTabs && "space-y-3", className)}>
      {hasTabs && (
        <Tabs
          value={activeTab}
          onValueChange={(value) => {
            if (value) onTabChange?.(value)
          }}
        >
          <TabsList
              size="sm"
              aria-label={tabListAriaLabel}
            >
            {tabs!.map((tab) => (
              <TabsTab key={tab.id} value={tab.id}>
                {tab.label}
              </TabsTab>
            ))}
          </TabsList>
        </Tabs>
      )}
      {body}
    </div>
  )
}
