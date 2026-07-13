import { DocsPageLayout } from "@/components/docs-page-layout";
import { PrismGradientPreview } from "@/components/docs/previews/prism-gradient-preview";
import { readComponentSource } from "@/lib/source-code";

const usageCode = `import { PrismGradient } from "@/components/ui/prism-gradient"

<div className="relative min-h-[480px] overflow-hidden rounded-2xl">
  <PrismGradient noise={{ opacity: 0.18, scale: 0.8 }} />
</div>`;

export async function PrismGradientDocs() {
  const sourceCode =
    (await readComponentSource("prism-gradient")) ||
    "// Unable to load source code";

  return (
    <DocsPageLayout
      title="Prism Gradient"
      description="A theme-aware WebGL prism field with liquid checkered motion, electric-blue refraction, and an optional tactile grain layer."
      preview={<PrismGradientPreview />}
      previewCode={usageCode}
      installPackageName="prism-gradient"
      installDependencies="next-themes clsx tailwind-merge"
      installSourceCode={sourceCode}
      usageCode={usageCode}
      fullWidthPreview={true}
      props={[
        {
          name: "speed",
          type: "number",
          default: "1",
          description:
            "Animation speed multiplier. Set to 0 for a still frame.",
        },
        {
          name: "noise",
          type: "PrismGradientNoise",
          description: "Optional grain overlay opacity and scale.",
        },
        {
          name: "radius",
          type: "string",
          default: '"0px"',
          description: "Border radius applied to the gradient container.",
        },
        {
          name: "className",
          type: "string",
          description: "Additional CSS classes for the gradient container.",
        },
        {
          name: "style",
          type: "CSSProperties",
          description: "Additional inline styles for the gradient container.",
        },
      ]}
    />
  );
}
