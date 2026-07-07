import { nextJsConfig } from "@workspace/eslint-config/next-js"

/** @type {import("eslint").Linter.Config} */
export default [
  {
    ignores: [
      ".next/**",
      "next-env.d.ts",
      "public/r/**",
      "registry/generated/**",
    ],
  },
  ...nextJsConfig,
  {
    rules: {
      "@next/next/no-img-element": "off",
      "react/no-unescaped-entities": "off",
    },
  },
]
