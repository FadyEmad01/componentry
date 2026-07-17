import { ScrollTiltedGrid } from "@workspace/ui/components/scroll-tilted-grid";

export default function ScrollTiltedGridDemoPage() {
  return (
    <main className="relative min-h-screen">
      <style>{`
        html, body {
          scrollbar-width: none;
          -ms-overflow-style: none;
          background: transparent !important;
        }
        html::-webkit-scrollbar, body::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <ScrollTiltedGrid />
    </main>
  );
}
