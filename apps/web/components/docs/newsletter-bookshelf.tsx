import { NewsletterBookshelf } from "@workspace/ui/components/newsletter-bookshelf";
import { DocsPageLayout } from "@/components/docs-page-layout";
import { readComponentSource } from "@/lib/source-code";

const defaultCode = `import { NewsletterBookshelf } from "@/components/ui/newsletter-bookshelf"

<NewsletterBookshelf />`;

const usageCode = `"use client"

import {
  NewsletterBookshelf,
  type NewsletterBookshelfItem,
} from "@/components/ui/newsletter-bookshelf"

const editions: NewsletterBookshelfItem[] = [
  {
    id: "edition-04",
    title: "The useful systems issue",
    date: "JUL 24, 2026",
    href: "/posts/useful-systems",
  },
  {
    id: "edition-03",
    title: "A better creative workflow",
    date: "JUL 17, 2026",
    href: "/posts/creative-workflow",
  },
  {
    id: "edition-02",
    title: "Notes on building in public",
    date: "JUL 10, 2026",
    href: "/posts/building-in-public",
    color: "#efe8d4",
  },
  {
    id: "edition-01",
    title: "The small team advantage",
    date: "JUL 3, 2026",
    href: "/posts/small-team-advantage",
    color: "#16277a",
  },
]

export default function Archive() {
  return (
    <NewsletterBookshelf
      items={editions}
      brand="Studio Notes"
      onSelect={(edition) => console.log("Selected", edition.id)}
    />
  )
}`;

export async function NewsletterBookshelfDocs() {
  const sourceCode =
    (await readComponentSource("newsletter-bookshelf")) ||
    "// Unable to load source code";

  return (
    <DocsPageLayout
      title="Newsletter Bookshelf"
      description="A tactile WebGL archive with cloth-bound book textures, horizontal camera navigation, hover lift, centered cover inspection, and automatic drag-adjustable orbiting."
      preview={<NewsletterBookshelf height="100%" />}
      previewCode={defaultCode}
      installPackageName="newsletter-bookshelf"
      installDependencies="three @react-three/fiber clsx tailwind-merge"
      installSourceCode={sourceCode}
      installSourceFilename="components/ui/newsletter-bookshelf.tsx"
      importCode={`import { NewsletterBookshelf } from "@/components/ui/newsletter-bookshelf"`}
      usageCode={usageCode}
      fullWidthPreview
      props={[
        {
          name: "items",
          type: "NewsletterBookshelfItem[]",
          description:
            "Archive entries with title, date, optional href, and optional cover colors. Activate a focused book again to open its href.",
        },
        {
          name: "height",
          type: "number | string",
          default: "620",
          description: "Height of the WebGL stage.",
        },
        {
          name: "brand",
          type: "string",
          default: '"The Brief"',
          description: "Wordmark printed on every generated cover.",
        },
        {
          name: "onSelect",
          type: "(item, index) => void",
          description: "Called when a book enters the focused view.",
        },
        {
          name: "className",
          type: "string",
          description: "Additional classes for the outer shelf stage.",
        },
      ]}
    />
  );
}
