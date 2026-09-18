import { cn } from "@/lib/utils";

/** Horizontal inset for page content. */
export const landingGutterClass = "px-[max(1rem,calc((100vw-1440px)/2))]";
export function LandingGutter({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn(landingGutterClass, "w-full min-w-0", className)}>
      {children}
    </div>
  );
}

export function LandingContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full min-w-0 max-w-[1360px]", className)}>
      {children}
    </div>
  );
}
