import { AnnotatedText } from "@workspace/ui/components/annotated-text";

import { DocsPageLayout } from "@/components/docs-page-layout";
import { LiveCodeBlock } from "@/components/live-code-block";
import { readComponentSource } from "@/lib/source-code";

const usageCode = `import { AnnotatedText } from "@/components/ui/annotated-text"

<div className="grid grid-cols-2 items-center justify-items-center gap-x-8 gap-y-7 text-base sm:gap-x-16 sm:gap-y-12 sm:text-xl">
  <AnnotatedText variant="wavy" delay={0.0}>wavy</AnnotatedText>
  <AnnotatedText variant="underline" delay={0.08}>underline</AnnotatedText>
  <AnnotatedText variant="doubleUnderline" delay={0.16}>doubleUnderline</AnnotatedText>
  <AnnotatedText variant="dottedUnderline" delay={0.24}>dottedUnderline</AnnotatedText>
  <AnnotatedText variant="line" delay={0.32}>line</AnnotatedText>
  <AnnotatedText variant="arrow" delay={0.4}>arrow</AnnotatedText>
  <AnnotatedText variant="highlight" delay={0.48}>highlight</AnnotatedText>
  <AnnotatedText variant="circle" delay={0.56}>circle</AnnotatedText>
  <AnnotatedText variant="box" delay={0.64}>box</AnnotatedText>
  <AnnotatedText variant="bracket" delay={0.72}>bracket</AnnotatedText>
  <AnnotatedText variant="strikethrough" delay={0.8}>strikethrough</AnnotatedText>
  <AnnotatedText variant="crossOut" delay={0.88}>crossOut</AnnotatedText>
</div>`;

function Preview() {
  return (
    <div className="flex min-h-full w-full items-center justify-center px-6 py-16">
      <div className="grid grid-cols-2 items-center justify-items-center gap-x-8 gap-y-7 text-base sm:gap-x-16 sm:gap-y-12 sm:text-xl">
        <AnnotatedText variant="wavy" delay={0.0}>
          wavy
        </AnnotatedText>
        <AnnotatedText variant="underline" delay={0.08}>
          underline
        </AnnotatedText>
        <AnnotatedText variant="doubleUnderline" delay={0.16}>
          doubleUnderline
        </AnnotatedText>
        <AnnotatedText variant="dottedUnderline" delay={0.24}>
          dottedUnderline
        </AnnotatedText>
        <AnnotatedText variant="line" delay={0.32}>
          line
        </AnnotatedText>
        <AnnotatedText variant="arrow" delay={0.4}>
          arrow
        </AnnotatedText>
        <AnnotatedText variant="highlight" delay={0.48}>
          highlight
        </AnnotatedText>
        <AnnotatedText variant="circle" delay={0.56}>
          circle
        </AnnotatedText>
        <AnnotatedText variant="box" delay={0.64}>
          box
        </AnnotatedText>
        <AnnotatedText variant="bracket" delay={0.72}>
          bracket
        </AnnotatedText>
        <AnnotatedText variant="strikethrough" delay={0.8}>
          strikethrough
        </AnnotatedText>
        <AnnotatedText variant="crossOut" delay={0.88}>
          crossOut
        </AnnotatedText>
      </div>
    </div>
  );
}

export async function AnnotatedTextDocs() {
  const sourceCode =
    (await readComponentSource("annotated-text")) ||
    "// Unable to load source code";

  return (
    <DocsPageLayout
      title="Annotated Text"
      description="Inline text marked up by hand: circles, highlighter, underlines, brackets and cross-outs, with gently irregular strokes that draw themselves as they enter view."
      preview={<Preview />}
      previewCode={usageCode}
      installPackageName="annotated-text"
      installDependencies="clsx tailwind-merge"
      installSourceCode={sourceCode}
      installSourceFilename="components/ui/annotated-text.tsx"
      usageCode={<LiveCodeBlock defaultCode={usageCode} />}
      fullWidthPreview
      props={[
        {
          name: "animate",
          type: "boolean",
          default: "true",
          description:
            "Draw once when entering view. Respects reduced-motion preferences.",
        },
        {
          name: "delay",
          type: "number",
          default: "0",
          description: "Delay before drawing, in seconds.",
        },
        {
          name: "duration",
          type: "number",
          default: "0.65",
          description: "Duration of each stroke, in seconds.",
        },
        {
          name: "children",
          type: "ReactNode",
          description: "The words to annotate. Keep it to a short phrase.",
        },
        {
          name: "variant",
          type: '"wavy" | "underline" | "doubleUnderline" | "dottedUnderline" | "line" | "arrow" | "highlight" | "circle" | "box" | "bracket" | "strikethrough" | "crossOut"',
          default: '"wavy"',
          description: "Which hand-drawn mark to draw around the text.",
        },
        {
          name: "color",
          type: "string",
          description:
            'Tailwind text color class for the mark, e.g. "text-rose-400". Defaults per variant.',
        },
        {
          name: "className",
          type: "string",
          description: "Additional classes applied to the wrapper span.",
        },
      ]}
    />
  );
}
