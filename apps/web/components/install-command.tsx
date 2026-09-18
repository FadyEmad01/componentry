import { PackageManagerCommand } from "@/components/package-manager-command"
import {
  PACKAGE_MANAGERS,
  getInstallCommand,
  type PackageManager,
} from "@/lib/install-command"
import { highlightCode } from "@/lib/shiki"

interface InstallCommandProps {
  component: string
}

export async function InstallCommand({ component }: InstallCommandProps) {
  const commands = Object.fromEntries(
    await Promise.all(
      PACKAGE_MANAGERS.map(async (pm) => {
        const code = getInstallCommand(component, pm)
        const html = await highlightCode(code, "bash")
        return [pm, { code, html }] as const
      }),
    ),
  ) as Record<PackageManager, { code: string; html: string }>

  return <PackageManagerCommand commands={commands} />
}
