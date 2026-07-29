import type { BlockCategoryItem, BlockRegistryItem } from "@/lib/blocks/types";

export const blockCategories = [
  {
    name: "header",
    title: "Header",
    description:
      "Navigation headers with branding, links, menus, and focused product actions.",
  },
  {
    name: "hero-section",
    title: "Hero Section",
    description:
      "High-impact introductions that pair product messaging with clear primary actions.",
  },
  {
    name: "logo-cloud",
    title: "Logo Cloud",
    description:
      "Customer, partner, and integration logo groups designed to establish trust quickly.",
  },
  {
    name: "feature",
    title: "Feature",
    description:
      "Flexible feature sections for explaining product value, workflows, and capabilities.",
  },
  {
    name: "pricing",
    title: "Pricing",
    description:
      "Pricing layouts for comparing plans, benefits, and purchase options clearly.",
  },
  {
    name: "faq",
    title: "FAQ",
    description:
      "Question and answer sections that resolve common concerns without adding clutter.",
  },
  {
    name: "testimonial",
    title: "Testimonial",
    description:
      "Customer stories, quotes, and proof sections that give products real-world credibility.",
  },
  {
    name: "call-to-action",
    title: "Call to Action",
    description:
      "Focused conversion sections that guide visitors toward the next meaningful step.",
  },
  {
    name: "footer",
    title: "Footer",
    description:
      "Structured footers for navigation, product resources, company details, and legal links.",
  },
  {
    name: "not-found",
    title: "Not Found",
    description:
      "Polished not-found screens that help visitors recover and continue exploring.",
  },
] satisfies BlockCategoryItem[];

export const blocks = [
  {
    name: "gradient-hero-01",
    title: "Gradient Hero 01",
    description:
      "A simple centered hero with a warm cinematic gradient, compact badge, short copy, and two actions.",
    type: "registry:block",
    categories: ["hero-section"],
    files: [
      {
        path: "blocks/gradient-hero-01/gradient-hero-01.tsx",
        target: "@components/gradient-hero-01.tsx",
        type: "registry:component",
      },
    ],
    meta: {
      createdAt: "2026-06-30",
      iframeHeight: 760,
      previewClassName: "min-h-screen",
    },
  },
  {
    name: "pricing-01",
    title: "Pricing 01",
    description:
      "Three tactile pricing cards with revealed hover notes, clear feature lists, and a highlighted popular plan.",
    type: "registry:block",
    categories: ["pricing"],
    files: [
      {
        path: "blocks/pricing-01/pricing-01.tsx",
        target: "@components/pricing-01.tsx",
        type: "registry:component",
      },
    ],
    dependencies: ["lucide-react"],
    meta: {
      createdAt: "2026-07-29",
      iframeHeight: 850,
      previewClassName: "min-h-[850px]",
    },
  },
  {
    name: "pricing-02",
    title: "Pricing 02",
    description:
      "A compact pricing table with separated plan summaries, detailed feature lists, and an animated billing-cycle switch.",
    type: "registry:block",
    categories: ["pricing"],
    files: [
      {
        path: "blocks/pricing-02/pricing-02.tsx",
        target: "@components/pricing-02.tsx",
        type: "registry:component",
      },
    ],
    dependencies: ["lucide-react"],
    meta: {
      createdAt: "2026-07-29",
      iframeHeight: 1100,
      previewClassName: "min-h-[1100px]",
    },
  },
] satisfies BlockRegistryItem[];
