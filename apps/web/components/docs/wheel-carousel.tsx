import React from "react";
import { DocsPageLayout } from "@/components/docs-page-layout";
import {
  WheelCarouselCustomItemsPreview,
  WheelCarouselLandscapePreview,
  WheelCarouselPersonalizePanel,
  WheelCarouselPreview,
} from "@/components/docs/previews/wheel-carousel-preview";
import { readComponentSource } from "@/lib/source-code";

const defaultCode = `import { WheelCarousel } from "@/components/ui/wheel-carousel"

<div className="h-[680px] w-full">
  <WheelCarousel />
</div>`;

const rightSideCode = `import { WheelCarousel } from "@/components/ui/wheel-carousel"

<div className="h-[680px] w-full">
  <WheelCarousel
    photoSide="right"
    photoAspect="4/3"
    photoWidth={30}
    contentWidth={760}
    gap={24}
    radius={260}
    spacing={13}
    visibleItems={6}
    photoRadius={16}
    edgeFade
  />
</div>`;

const customItemsCode = `import {
  WheelCarousel,
  type WheelCarouselItem,
} from "@/components/ui/wheel-carousel"

const projects: WheelCarouselItem[] = [
  {
    label: "Canyon House",
    image: "/images/projects/canyon-house.jpg",
    imageAlt: "Modern concrete home built into a desert canyon",
  },
  {
    label: "Harbor Loft",
    image: "/images/projects/harbor-loft.jpg",
    imageAlt: "Bright coastal loft with large windows",
  },
  {
    label: "Glass Pavilion",
    image: "/images/projects/glass-pavilion.jpg",
    imageAlt: "Minimal glass pavilion surrounded by trees",
  },
  {
    label: "Stone Atelier",
    image: "/images/projects/stone-atelier.jpg",
    imageAlt: "Stone house exterior with warm evening light",
  },
  {
    label: "Palm Residence",
    image: "/images/projects/palm-residence.jpg",
    imageAlt: "Contemporary residence with palm trees",
  },
]

<div className="h-[680px] w-full">
  <WheelCarousel
    items={projects}
    initialIndex={2}
    photoAspect="1/1"
    photoWidth={28}
    radius={255}
    visibleItems={5}
  />
</div>`;

export async function WheelCarouselDocs() {
  const sourceCode =
    (await readComponentSource("wheel-carousel")) ||
    "// Unable to load source code";

  return (
    <DocsPageLayout
      title="Wheel Carousel"
      description="A cinematic, rotating-wheel picker with inertial drag and scroll controls, curved fading labels, and a crossfading image for the active item."
      preview={<WheelCarouselPreview />}
      personalizeContent={<WheelCarouselPersonalizePanel />}
      previewCode={defaultCode}
      installPackageName="wheel-carousel"
      installDependencies="framer-motion next-themes clsx tailwind-merge"
      installSourceCode={sourceCode}
      installSourceFilename="components/ui/wheel-carousel.tsx"
      usageCode={defaultCode}
      fullWidthPreview
      examples={[
        {
          title: "Custom photos and names",
          preview: <WheelCarouselCustomItemsPreview />,
          code: customItemsCode,
        },
        {
          title: "Right-side landscape image",
          preview: <WheelCarouselLandscapePreview />,
          code: rightSideCode,
        },
      ]}
      props={[
        {
          name: "items",
          type: "WheelCarouselItem[]",
          description:
            "Custom scrolling names and their matching active photo URLs.",
        },
        {
          name: "mode",
          type: '"system" | "light" | "dark" | "custom"',
          default: '"system"',
          description: "Use automatic, fixed, or custom color behavior.",
        },
        {
          name: "photoSide",
          type: '"left" | "right"',
          default: '"left"',
          description: "Side of the wheel used for the active image.",
        },
        {
          name: "photoWidth",
          type: "number",
          default: "24",
          description: "Image column width as a percentage.",
        },
        {
          name: "photoAspect",
          type: '"3/4" | "1/1" | "4/3" | "3/2"',
          default: '"3/4"',
          description: "Aspect ratio of the active image.",
        },
        {
          name: "photoRadius",
          type: "number",
          default: "14",
          description: "Corner radius of the active image in pixels.",
        },
        {
          name: "contentWidth",
          type: "number",
          default: "900",
          description: "Maximum inner content width in pixels.",
        },
        {
          name: "radius",
          type: "number",
          default: "320",
          description: "Radius of the label wheel in pixels.",
        },
        {
          name: "spacing",
          type: "number",
          default: "14",
          description: "Angular spacing between labels in degrees.",
        },
        {
          name: "visibleItems",
          type: "number",
          default: "7",
          description:
            "Number of labels visible on either side of the selection.",
        },
        {
          name: "apexInset",
          type: "number",
          default: "34",
          description: "Horizontal position of the wheel's selection point.",
        },
        {
          name: "snap",
          type: "boolean",
          default: "true",
          description: "Settles the wheel on the nearest whole item.",
        },
        {
          name: "momentum",
          type: "boolean",
          default: "true",
          description: "Preserves drag and wheel velocity after input ends.",
        },
        {
          name: "activeIndex",
          type: "number",
          description: "Controlled active item index.",
        },
        {
          name: "initialIndex",
          type: "number",
          default: "0",
          description: "Initially selected item in uncontrolled usage.",
        },
        {
          name: "onActiveChange",
          type: "(item: WheelCarouselItem, index: number) => void",
          description: "Runs whenever the active item changes.",
        },
        {
          name: "className",
          type: "string",
          description: "Additional classes for the outer carousel.",
        },
      ]}
    />
  );
}
