"use client"

import { useEffect, useRef, useState, type MouseEvent } from "react"
import { Check, Copy } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"
import posthog from "posthog-js"
import { cn } from "@/lib/utils"

interface CopyButtonProps {
  code: string
  className?: string
  absolute?: boolean
  static?: boolean
  eventName?: "content_copied" | "component_install_command_copied"
}

export function CopyButton({
  code,
  className,
  absolute = true,
  static: staticMotion = false,
  eventName = "content_copied",
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false)
  const [failed, setFailed] = useState(false)
  const [keyboard, setKeyboard] = useState(false)
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const mounted = useRef(true)
  const reducedMotion = useReducedMotion()
  const skipMotion = staticMotion || reducedMotion || keyboard

  useEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
      if (resetTimer.current) clearTimeout(resetTimer.current)
    }
  }, [])

  const handleCopy = async (event: MouseEvent<HTMLButtonElement>) => {
    setKeyboard(event.detail === 0)
    try {
      await navigator.clipboard.writeText(code)
    } catch {
      if (mounted.current) {
        if (resetTimer.current) clearTimeout(resetTimer.current)
        setCopied(false)
        setFailed(true)
      }
      return
    }
    if (!mounted.current) return
    if (resetTimer.current) clearTimeout(resetTimer.current)
    setFailed(false)
    setCopied(true)
    resetTimer.current = setTimeout(() => setCopied(false), 2000)
    posthog.capture(eventName)
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      onPointerDown={() => setKeyboard(false)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") setKeyboard(true)
      }}
      className={cn(
        "z-10 flex size-10 shrink-0 items-center justify-center rounded-lg",
        "transition-[color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        !skipMotion && "active:scale-[0.96]",
        "motion-reduce:transform-none motion-reduce:transition-none focus-visible:transform-none",
        absolute && "absolute top-1.5 right-1.5",
        "text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50",
        className
      )}
      aria-label={failed ? "Copy failed. Try again" : copied ? "Copied" : "Copy code"}
    >
      <span className="relative size-4" aria-hidden>
        {skipMotion ? (
          copied ? <Check className="size-4" /> : <Copy className="size-4" />
        ) : [false, true].map((success) => {
          const visible = copied === success
          const Icon = success ? Check : Copy
          return (
            <motion.span
              key={String(success)}
              className="absolute inset-0 flex items-center justify-center"
              initial={false}
              animate={{
                opacity: visible ? 1 : 0,
                scale: skipMotion || visible ? 1 : 0.25,
                filter: skipMotion || visible ? "blur(0px)" : "blur(4px)",
              }}
              transition={skipMotion ? { duration: 0 } : { type: "spring", duration: 0.3, bounce: 0 }}
            >
              <Icon className="size-4" />
            </motion.span>
          )
        })}
      </span>
      <span className="sr-only" role="status">
        {failed ? "Could not copy. Please try again." : copied ? "Copied to clipboard" : ""}
      </span>
    </button>
  )
}
