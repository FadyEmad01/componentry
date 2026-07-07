export const siteConfig = {
  name: "Componentry",
  url: "https://componentry.dev",
  title: "Componentry — Beautiful Animated UI Components for React",
  description:
    "Beautiful, animated React UI components with styling and motion already handled. Built with Tailwind CSS, TypeScript, and Framer Motion.",
  author: {
    name: "Harsh Jadhav",
    twitter: "https://twitter.com/harshjdhv",
    github: "https://github.com/harshjdhv",
    handle: "@harshjdhv",
  },
  repository: "https://github.com/harshjdhv/componentry",
} as const;

export function absoluteUrl(path = "") {
  if (!path) return siteConfig.url;
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}
