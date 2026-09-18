import { cn } from "@/lib/utils"

interface DocsScrollEdgeFadeProps {
  position: "top" | "bottom"
  className?: string
  /** `fixed` for full-page docs; `absolute` when nested in a scroll column. */
  placement?: "fixed" | "absolute"
  height?: string
  blurAmount?: string
}

/**
 * Progressive scroll-edge blur — backdrop-filter + gradient mask
 * so content softens into the page edge (Skiper / devouringdetails style).
 */
export function DocsScrollEdgeFade({
  position,
  className,
  placement = "fixed",
  height = "110px",
  blurAmount = "3px",
}: DocsScrollEdgeFadeProps) {
  const isTop = position === "top"

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none inset-x-0 z-30 select-none",
        placement === "fixed" ? "fixed" : "absolute",
        isTop ? "top-0" : "bottom-0",
        // Soft page-color wash under the blur
        isTop
          ? "bg-[linear-gradient(to_top,transparent,#ffffff)] dark:bg-[linear-gradient(to_top,transparent,var(--background))]"
          : "bg-[linear-gradient(to_bottom,transparent,#ffffff)] dark:bg-[linear-gradient(to_bottom,transparent,var(--background))]",
        // Mask so blur is strong at the edge and dissolves quickly inward
        isTop
          ? "[mask-image:linear-gradient(to_bottom,#000_35%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,#000_35%,transparent)]"
          : "[mask-image:linear-gradient(to_top,#000_35%,transparent)] [-webkit-mask-image:linear-gradient(to_top,#000_35%,transparent)]",
        className
      )}
      style={{
        height,
        WebkitBackdropFilter: `blur(${blurAmount})`,
        backdropFilter: `blur(${blurAmount})`,
      }}
    />
  )
}
