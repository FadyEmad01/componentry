"use client"

import { DocsSidebarIcon } from "@/components/docs-sidebar-icon"
import { useDocsSidebar } from "@/components/docs-sidebar-context"

export function DocsSidebarTrigger() {
  const { isOpen, setIsOpen, open } = useDocsSidebar()

  return (
    <div className="relative z-[60] shrink-0" data-sidebar-open={isOpen} onMouseEnter={open}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded text-zinc-500 transition-colors duration-200 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        aria-label={isOpen ? "Close Navigation" : "Open Navigation"}
        aria-expanded={isOpen}
      >
        <DocsSidebarIcon isOpen={isOpen} className="size-5" />
      </button>
    </div>
  )
}
