"use client";

import { PrismGradient } from "@workspace/ui/components/prism-gradient";

export function PrismGradientPreview() {
  return (
    <div className="relative h-[55vh] min-h-[420px] w-full overflow-hidden bg-background lg:h-full">
      <PrismGradient noise={{ opacity: 0.18, scale: 0.8 }} />
    </div>
  );
}
