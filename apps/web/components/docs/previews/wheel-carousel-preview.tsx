"use client";

import { create } from "zustand";
import {
  WheelCarousel,
  type WheelCarouselMode,
} from "@workspace/ui/components/wheel-carousel";
import { cn } from "@workspace/ui/lib/utils";

type PaletteMode = Exclude<WheelCarouselMode, "system">;

interface CustomPalette {
  background: string;
  panelColor: string;
  textColor: string;
  selectedColor: string;
  markerColor: string;
}

interface WheelCarouselPreviewStore {
  mode: WheelCarouselMode;
  customPalette: CustomPalette;
  setMode: (mode: PaletteMode) => void;
  updateCustomPalette: (updates: Partial<CustomPalette>) => void;
  resetAppearance: () => void;
}

const defaultCustomPalette: CustomPalette = {
  background: "#fff6ec",
  panelColor: "#f2e6d7",
  textColor: "#b45a14",
  selectedColor: "#b4541e",
  markerColor: "#e8792e",
};

const useWheelCarouselPreview = create<WheelCarouselPreviewStore>((set) => ({
  mode: "system",
  customPalette: defaultCustomPalette,
  setMode: (mode) => set({ mode }),
  updateCustomPalette: (updates) =>
    set((state) => ({
      customPalette: { ...state.customPalette, ...updates },
    })),
  resetAppearance: () =>
    set({ mode: "system", customPalette: defaultCustomPalette }),
}));

const modes: Array<{
  label: string;
  description: string;
  value: PaletteMode;
}> = [
  {
    label: "Light",
    description: "White canvas with dark typography.",
    value: "light",
  },
  {
    label: "Dark",
    description: "Black canvas with light typography.",
    value: "dark",
  },
  {
    label: "Custom",
    description: "Create your own color palette.",
    value: "custom",
  },
];

const colorControls: Array<{
  key: keyof CustomPalette;
  label: string;
}> = [
  { key: "background", label: "Background" },
  { key: "panelColor", label: "Image panel" },
  { key: "textColor", label: "Wheel text" },
  { key: "selectedColor", label: "Selected text" },
  { key: "markerColor", label: "Marker" },
];

function usePreviewAppearance() {
  const mode = useWheelCarouselPreview((state) => state.mode);
  const customPalette = useWheelCarouselPreview((state) => state.customPalette);
  return { mode, customPalette };
}

function sharedCarouselProps(
  mode: WheelCarouselMode,
  customPalette: CustomPalette,
) {
  return {
    mode,
    background: customPalette.background,
    panelColor: customPalette.panelColor,
    textColor: customPalette.textColor,
    selectedColor: customPalette.selectedColor,
    markerColor: customPalette.markerColor,
  };
}

export function WheelCarouselPreview() {
  const { mode, customPalette } = usePreviewAppearance();

  return (
    <div className="h-full min-h-[560px] w-full overflow-hidden">
      <WheelCarousel
        {...sharedCarouselProps(mode, customPalette)}
        className="h-full min-h-0 px-8 sm:px-12"
        contentWidth={760}
        radius={260}
        spacing={13}
        visibleItems={6}
        photoRadius={14}
        edgeFade
        edgeFadeSize={22}
        itemClassName="!text-[clamp(0.95rem,1.9vw,1.4rem)]"
      />
    </div>
  );
}

export function WheelCarouselLandscapePreview() {
  const { mode, customPalette } = usePreviewAppearance();

  return (
    <div className="h-full min-h-[560px] w-full">
      <WheelCarousel
        {...sharedCarouselProps(mode, customPalette)}
        className="h-full min-h-0 px-8 sm:px-12"
        photoSide="right"
        photoAspect="4/3"
        photoWidth={30}
        contentWidth={760}
        gap={24}
        radius={260}
        spacing={13}
        visibleItems={6}
        photoRadius={16}
        edgeFade
        itemClassName="!text-[clamp(0.95rem,1.9vw,1.4rem)]"
      />
    </div>
  );
}

export function WheelCarouselPersonalizePanel() {
  const mode = useWheelCarouselPreview((state) => state.mode);
  const customPalette = useWheelCarouselPreview((state) => state.customPalette);
  const setMode = useWheelCarouselPreview((state) => state.setMode);
  const updateCustomPalette = useWheelCarouselPreview(
    (state) => state.updateCustomPalette,
  );
  const resetAppearance = useWheelCarouselPreview(
    (state) => state.resetAppearance,
  );

  return (
    <div className="h-full overflow-auto bg-background [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <div className="space-y-7 px-4 pb-10 pt-20">
        <header className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tighter text-foreground">
            Personalize
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground/90">
            Choose a carousel palette or build your own.
          </p>
        </header>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={resetAppearance}
            className="rounded-md border border-border/50 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
          >
            Reset
          </button>
        </div>

        <div className="space-y-2">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Appearance
          </p>
          <div className="grid gap-2">
            {modes.map((option) => (
              <button
                key={option.value}
                type="button"
                aria-pressed={mode === option.value}
                onClick={() => setMode(option.value)}
                className={cn(
                  "flex items-center justify-between rounded-lg border px-3 py-3 text-left transition-colors",
                  mode === option.value
                    ? "border-foreground/25 bg-foreground/[0.04] text-foreground"
                    : "border-border/60 text-muted-foreground hover:border-border hover:text-foreground",
                )}
              >
                <span>
                  <span className="block text-sm font-semibold">
                    {option.label}
                  </span>
                  <span className="mt-0.5 block text-xs font-normal opacity-70">
                    {option.description}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "size-2.5 rounded-full border",
                    mode === option.value
                      ? "border-foreground bg-foreground"
                      : "border-muted-foreground/40",
                  )}
                />
              </button>
            ))}
          </div>
        </div>

        {mode === "custom" && (
          <div className="space-y-2 border-t border-border/50 pt-6">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Custom colors
            </p>
            <div className="grid gap-2">
              {colorControls.map((control) => (
                <label
                  key={control.key}
                  className="flex items-center justify-between rounded-lg border border-border/60 px-3 py-2.5"
                >
                  <span>
                    <span className="block text-sm font-medium text-foreground">
                      {control.label}
                    </span>
                    <span className="mt-0.5 block font-mono text-[10px] uppercase text-muted-foreground">
                      {customPalette[control.key]}
                    </span>
                  </span>
                  <input
                    type="color"
                    aria-label={control.label}
                    value={customPalette[control.key]}
                    onChange={(event) =>
                      updateCustomPalette({
                        [control.key]: event.target.value,
                      })
                    }
                    className="h-9 w-12 cursor-pointer rounded-md border border-border bg-transparent p-1"
                  />
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
