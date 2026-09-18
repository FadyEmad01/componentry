"use client";

import { useEffect } from "react";
import { create } from "zustand";
import { GrainGradient } from "@workspace/ui/components/grain-gradient";
import { usePlaygroundStore } from "@/hooks/use-playground-store";
import {
  PlaygroundColorPicker,
  PlaygroundSectionTitle,
} from "@/components/playground-primitives";

const defaults = {
  colorLight: "#dce5df",
  colorMid: "#83b9ad",
  colorDark: "#031419",
  angle: 0,
  position: 0,
  curve: 0.48,
  softness: 0.13,
  scale: 1,
  grain: 0.32,
  grainSize: 1,
  seed: 1,
  speed: 1,
};
type Config = typeof defaults;
const useConfig = create<{
  config: Config;
  update: (value: Partial<Config>) => void;
  reset: () => void;
}>((set) => ({
  config: defaults,
  update: (value) =>
    set((state) => ({ config: { ...state.config, ...value } })),
  reset: () => set({ config: defaults }),
}));
const palettes = [
  { name: "Sea glass", colors: ["#dce5df", "#83b9ad", "#031419"] },
  { name: "Dusk", colors: ["#e8dce8", "#a594c4", "#191426"] },
  { name: "Sand", colors: ["#f1e4ce", "#c7a780", "#26201d"] },
] as const;

function code(config: Config) {
  return `import { GrainGradient } from "@/components/ui/grain-gradient"\n\n<GrainGradient\n${Object.entries(
    config,
  )
    .map(
      ([key, value]) =>
        `  ${key}=${typeof value === "string" ? JSON.stringify(value) : `{${value}}`}`,
    )
    .join("\n")}\n  className="h-[560px] rounded-2xl"\n/>`;
}

export function GrainGradientPlayground() {
  const config = useConfig((state) => state.config);
  useEffect(() => {
    usePlaygroundStore.getState().setCode(code(config));
  }, [config]);
  return <GrainGradient {...config} className="min-h-[480px] lg:min-h-0" />;
}

const sliders = [
  ["angle", "Rotation", -180, 180, 1],
  ["position", "Position", -0.7, 0.7, 0.01],
  ["curve", "Curve", -1, 1, 0.01],
  ["softness", "Softness", 0.01, 0.6, 0.01],
  ["scale", "Scale", 0.25, 3, 0.05],
  ["grain", "Grain strength", 0, 1, 0.01],
  ["grainSize", "Grain size", 0.5, 4, 0.1],
  ["seed", "Texture seed", 0, 100, 1],
  ["speed", "Breathing speed", 0, 2, 0.05],
] as const;

export function GrainGradientPersonalizePanel() {
  const { config, update, reset } = useConfig();
  return (
    <div className="h-full overflow-auto bg-background">
      <div className="space-y-7 px-4 pb-12 pt-20">
        <header className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tighter">Personalize</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Soft light. Deep shadow. Fine grain.
            </p>
          </div>
          <button
            type="button"
            onClick={reset}
            className="rounded-md border px-3 py-2 text-xs focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Reset
          </button>
        </header>
        <section>
          <PlaygroundSectionTitle>Palette</PlaygroundSectionTitle>
          <div className="mb-4 grid grid-cols-3 gap-2">
            {palettes.map(({ name, colors }) => (
              <button
                key={name}
                type="button"
                aria-pressed={
                  config.colorLight === colors[0] &&
                  config.colorMid === colors[1] &&
                  config.colorDark === colors[2]
                }
                onClick={() =>
                  update({
                    colorLight: colors[0],
                    colorMid: colors[1],
                    colorDark: colors[2],
                  })
                }
                className="rounded-md border p-2 text-left text-xs aria-pressed:border-foreground/60 focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                <span
                  className="mb-2 block h-8 rounded-sm"
                  style={{
                    background: `linear-gradient(120deg, ${colors.join(",")})`,
                  }}
                />
                {name}
              </button>
            ))}
          </div>
          <div className="space-y-2">
            {(
              [
                ["colorLight", "Light"],
                ["colorMid", "Mint / midtone"],
                ["colorDark", "Shadow"],
              ] as const
            ).map(([key, label]) => (
              <PlaygroundColorPicker
                key={key}
                label={label}
                value={config[key]}
                onChange={(value) => {
                  if (value) update({ [key]: value });
                }}
              />
            ))}
          </div>
        </section>
        <section className="space-y-5">
          <PlaygroundSectionTitle>Composition & texture</PlaygroundSectionTitle>
          {sliders.map(([key, label, min, max, step]) => (
            <label key={key} className="block space-y-2">
              <span className="flex justify-between text-xs">
                <span>{label}</span>
                <span className="font-mono tabular-nums text-muted-foreground">
                  {config[key]}
                </span>
              </span>
              <input
                aria-label={label}
                type="range"
                min={min}
                max={max}
                step={step}
                value={config[key]}
                onChange={(event) =>
                  update({ [key]: Number(event.target.value) })
                }
                className="block h-6 w-full cursor-pointer accent-foreground focus-visible:outline-2 focus-visible:outline-offset-4"
              />
            </label>
          ))}
          <p className="text-xs leading-5 text-muted-foreground">
            A breathing speed of zero pauses the image. Reduced motion always
            pauses the motion.
          </p>
        </section>
      </div>
    </div>
  );
}
