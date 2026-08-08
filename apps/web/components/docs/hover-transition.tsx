import React from "react";
import { DocsPageLayout } from "@/components/docs-page-layout";
import {
  HoverTransitionPersonalizePanel,
  HoverTransitionPlayground,
} from "@/components/docs/previews/hover-transition-playground";
import { readComponentSource } from "@/lib/source-code";

const usageCode = `import { HoverTransition } from "@/components/ui/hover-transition"

<HoverTransition
  effect="wipe"
  direction="right"
  duration={0.65}
  defaultComponent={<YourDefaultCard />}
  hoverComponent={<YourHoverCard />}
  className="aspect-[4/5] rounded-3xl"
/>`;

export async function HoverTransitionDocs() {
  const sourceCode =
    (await readComponentSource("hover-transition")) ||
    "// Unable to load source code";

  return (
    <DocsPageLayout
      title="Hover Transition"
      description="A flexible hover wrapper with eight polished transitions, per-card direction and color controls, custom default and hover content, adjustable timing, and a built-in fallback card."
      preview={<HoverTransitionPlayground />}
      personalizeContent={<HoverTransitionPersonalizePanel />}
      previewCode=""
      installPackageName="hover-transition"
      installDependencies="clsx tailwind-merge"
      installSourceCode={sourceCode}
      installSourceFilename="components/ui/hover-transition.tsx"
      usageCode={usageCode}
      fullWidthPreview
      unstyledPreview
      props={[
        {
          name: "defaultComponent",
          type: "React.ReactNode",
          default: "fallback card",
          description:
            "Content shown before the pointer or keyboard focus enters.",
        },
        {
          name: "hoverComponent",
          type: "React.ReactNode",
          default: "fallback hover card",
          description: "Content revealed by the selected hover effect.",
        },
        {
          name: "effect",
          type: '"wipe" | "ripple" | "parallax" | "curtain" | "diagonal" | "morph" | "strips" | "slide"',
          default: '"wipe"',
          description: "The transition style used to swap the two components.",
        },
        {
          name: "direction",
          type: '"top" | "right" | "bottom" | "left" | "top-left" | "top-right" | "bottom-right" | "bottom-left" | "center"',
          default: '"right"',
          description:
            "The origin or travel direction used by the active effect.",
        },
        {
          name: "duration",
          type: "number",
          default: "0.65",
          description: "Animation duration in seconds.",
        },
        {
          name: "easing",
          type: "string",
          default: '"cubic-bezier(0.22, 1, 0.36, 1)"',
          description: "Any valid CSS easing value.",
        },
        {
          name: "label",
          type: "string",
          default: '"Interactive hover transition"',
          description: "Accessible label for the focusable transition wrapper.",
        },
        {
          name: "className",
          type: "string",
          description:
            "Sizing, radius, and layout classes for the outer wrapper.",
        },
      ]}
    />
  );
}
