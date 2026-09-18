"use client"

import * as React from "react"

// Keep the diagram's coordinate system intact while fitting the docs preview.
export function CircuitBoardPreview({
  children,
  width,
  height,
}: {
  children: React.ReactNode
  width: number
  height: number
}) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [scale, setScale] = React.useState(1)

  React.useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new ResizeObserver(([entry]) => {
      if (entry) setScale(Math.min(1, entry.contentRect.width / width))
    })
    observer.observe(container)
    return () => observer.disconnect()
  }, [width])

  return (
    <div ref={containerRef} className="w-full min-w-0 max-w-full" style={{ maxWidth: width }}>
      <div className="relative mx-auto" style={{ width: width * scale, height: height * scale }}>
        <div className="absolute left-0 top-0 origin-top-left" style={{ width, height, transform: `scale(${scale})` }}>
          {children}
        </div>
      </div>
    </div>
  )
}
