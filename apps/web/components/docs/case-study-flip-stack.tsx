import { CaseStudyFlipStackPreview } from "@/components/docs/previews/case-study-flip-stack-preview";
import { DocsPageLayout } from "@/components/docs-page-layout";
import { readComponentSource } from "@/lib/source-code";

const usageCode = `import { CaseStudyFlipStack } from "@/components/ui/case-study-flip-stack"

export default function WorkPage() {
  return (
    <CaseStudyFlipStack
      items={[
        {
          eyebrow: "Fintech",
          title: "Boosted conversion by 42% with a product-led redesign",
          description: "We rebuilt onboarding around the moments that matter.",
          image: "/work/fintech.jpg",
          imageAlt: "Portrait from the fintech campaign",
          background: "#a94808",
          foreground: "#fff7ed",
        },
        {
          eyebrow: "Hospitality",
          title: "A slower digital experience for a faster-growing retreat",
          description: "A cinematic booking journey with a stronger sense of place.",
          image: "/work/retreat.jpg",
          imageAlt: "A mountain retreat at dusk",
          background: "#067b8f",
          foreground: "#ecfeff",
        },
      ]}
    />
  )
}`;

export async function CaseStudyFlipStackDocs() {
  const sourceCode =
    (await readComponentSource("case-study-flip-stack")) ??
    "// Unable to load source code";

  return (
    <DocsPageLayout
      title="Case Study Flip Stack"
      description="An editorial, scroll-driven case study stack where each full-width card folds upward to reveal the next story beneath it."
      preview={<CaseStudyFlipStackPreview />}
      previewCode={usageCode}
      installPackageName="case-study-flip-stack"
      installDependencies="framer-motion"
      installSourceCode={sourceCode}
      installSourceFilename="components/ui/case-study-flip-stack.tsx"
      usageCode={usageCode}
      fullWidthPreview
      props={[
        {
          name: "items",
          type: "CaseStudyFlipItem[]",
          description:
            "Case studies with copy, image, accessible alt text, and card colors.",
        },
        {
          name: "hint",
          type: "string",
          default: '"Scroll Down"',
          description: "The animated opening instruction between the arrows.",
        },
        {
          name: "heading",
          type: "string",
          default: '"Design That Delivers."',
          description: "The large introduction heading shown before the card stack.",
        },
        {
          name: "endLabel",
          type: "string",
          default: '"The End"',
          description: "The closing message revealed after the final card stacks.",
        },
        {
          name: "className",
          type: "string",
          description: "Additional classes for the scroll section container.",
        },
      ]}
    />
  );
}
