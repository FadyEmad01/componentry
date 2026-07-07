"use client";

import { useEffect } from "react";
import { create } from "zustand";
import { RippleTransition } from "@workspace/ui/components/ripple-transition";
import { usePlaygroundStore } from "@/hooks/use-playground-store";
import {
  PlaygroundSectionTitle,
  PlaygroundSlider,
  PlaygroundSwitch,
} from "@/components/playground-primitives";

const NATURE_IMAGES = [
  "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&q=85&w=1800",
  "https://images.unsplash.com/photo-1473773508845-188df298d2d1?auto=format&fit=crop&q=85&w=1800",
  "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=85&w=1800",
] as const;

interface RippleTransitionPlaygroundConfig {
  waveSpeed: number;
  sigma: number;
  waveFreq: number;
  pushAmt: number;
  caStrength: number;
  glow: number;
  noiseWarp: number;
  duration: number;
  autoPlay: boolean;
  autoPlayInterval: number;
  pinch: boolean;
  borderRadius: number;
}

const RIPPLE_TRANSITION_DEFAULT_CONFIG: RippleTransitionPlaygroundConfig = {
  waveSpeed: 1.6,
  sigma: 0.15,
  waveFreq: 5,
  pushAmt: 0.145,
  caStrength: 0.02,
  glow: 0.73,
  noiseWarp: 1,
  duration: 1.4,
  autoPlay: true,
  autoPlayInterval: 3200,
  pinch: true,
  borderRadius: 28,
};

interface RippleTransitionPlaygroundStore {
  config: RippleTransitionPlaygroundConfig;
  renderVersion: number;
  updateConfig: (updates: Partial<RippleTransitionPlaygroundConfig>) => void;
  resetConfig: () => void;
}

const useRippleTransitionPlaygroundStore = create<RippleTransitionPlaygroundStore>((set) => ({
  config: RIPPLE_TRANSITION_DEFAULT_CONFIG,
  renderVersion: 0,
  updateConfig: (updates) =>
    set((state) => ({
      config: { ...state.config, ...updates },
    })),
  resetConfig: () =>
    set((state) => ({
      config: RIPPLE_TRANSITION_DEFAULT_CONFIG,
      renderVersion: state.renderVersion + 1,
    })),
}));

function generateCode(config: RippleTransitionPlaygroundConfig) {
  return `import { RippleTransition } from "@/components/ui/ripple-transition"

const images = [
  "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&q=85&w=1800",
  "https://images.unsplash.com/photo-1473773508845-188df298d2d1?auto=format&fit=crop&q=85&w=1800",
  "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=85&w=1800",
]

<RippleTransition
  images={images}
  autoPlay={${config.autoPlay}}
  autoPlayInterval={${config.autoPlayInterval}}
  waveSpeed={${config.waveSpeed}}
  sigma={${config.sigma}}
  waveFreq={${config.waveFreq}}
  pushAmt={${config.pushAmt}}
  caStrength={${config.caStrength}}
  glow={${config.glow}}
  noiseWarp={${config.noiseWarp}}
  duration={${config.duration}}
  pinch={${config.pinch}}
  borderRadius={${config.borderRadius}}
/>`;
}

export function RippleTransitionPlayground() {
  const config = useRippleTransitionPlaygroundStore((state) => state.config);
  const renderVersion = useRippleTransitionPlaygroundStore((state) => state.renderVersion);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      usePlaygroundStore.getState().setCode(generateCode(config));
    }, 250);

    return () => clearTimeout(timeoutId);
  }, [config]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#07110b]">
      <RippleTransition
        key={renderVersion}
        className="h-full min-h-full w-full"
        images={NATURE_IMAGES}
        autoPlay={config.autoPlay}
        autoPlayInterval={config.autoPlayInterval}
        autoPlayOrigin="random"
        waveSpeed={config.waveSpeed}
        sigma={config.sigma}
        waveFreq={config.waveFreq}
        pushAmt={config.pushAmt}
        caStrength={config.caStrength}
        glow={config.glow}
        noiseWarp={config.noiseWarp}
        duration={config.duration}
        pinch={config.pinch}
        borderRadius={config.borderRadius}
        background="#07110b"
      />
    </div>
  );
}

export function RippleTransitionPersonalizePanel() {
  const config = useRippleTransitionPlaygroundStore((state) => state.config);
  const updateConfig = useRippleTransitionPlaygroundStore((state) => state.updateConfig);
  const resetConfig = useRippleTransitionPlaygroundStore((state) => state.resetConfig);

  const handleChange = <K extends keyof RippleTransitionPlaygroundConfig>(
    key: K,
    value: RippleTransitionPlaygroundConfig[K],
  ) => {
    updateConfig({ [key]: value } as Partial<RippleTransitionPlaygroundConfig>);
  };

  return (
    <div className="h-full overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <div className="space-y-6 px-4 pb-10 pt-20">
        <header className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tighter text-foreground">Personalize</h2>
          <p className="text-sm leading-relaxed text-muted-foreground/90">
            Shape the wave, chromatic edge, and transition timing in real time.
          </p>
        </header>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={resetConfig}
            className="rounded-md border border-border/40 bg-white/50 px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground dark:bg-white/[0.03]"
          >
            Reset
          </button>
        </div>

        <div className="space-y-3">
          <PlaygroundSectionTitle>Playback</PlaygroundSectionTitle>
          <PlaygroundSwitch
            label="Autoplay"
            checked={config.autoPlay}
            onChange={(value) => handleChange("autoPlay", value)}
          />
          <PlaygroundSwitch
            label="Pinch Origin"
            checked={config.pinch}
            onChange={(value) => handleChange("pinch", value)}
          />
          <PlaygroundSlider
            label="Interval"
            min={1600}
            max={6000}
            step={100}
            value={config.autoPlayInterval}
            unit="ms"
            onChange={(value) => handleChange("autoPlayInterval", value)}
          />
          <PlaygroundSlider
            label="Duration"
            min={0.6}
            max={2.6}
            step={0.05}
            value={config.duration}
            unit="s"
            onChange={(value) => handleChange("duration", value)}
          />
        </div>

        <div className="space-y-3">
          <PlaygroundSectionTitle>Wave</PlaygroundSectionTitle>
          <PlaygroundSlider
            label="Wave Speed"
            min={0.7}
            max={3}
            step={0.05}
            value={config.waveSpeed}
            onChange={(value) => handleChange("waveSpeed", value)}
          />
          <PlaygroundSlider
            label="Wave Thickness"
            min={0.04}
            max={0.3}
            step={0.005}
            value={config.sigma}
            onChange={(value) => handleChange("sigma", value)}
          />
          <PlaygroundSlider
            label="Ripple Frequency"
            min={1}
            max={14}
            step={0.25}
            value={config.waveFreq}
            onChange={(value) => handleChange("waveFreq", value)}
          />
          <PlaygroundSlider
            label="Push Amount"
            min={0}
            max={0.28}
            step={0.005}
            value={config.pushAmt}
            onChange={(value) => handleChange("pushAmt", value)}
          />
        </div>

        <div className="space-y-3">
          <PlaygroundSectionTitle>Image</PlaygroundSectionTitle>
          <PlaygroundSlider
            label="Chromatic Edge"
            min={0}
            max={0.07}
            step={0.001}
            value={config.caStrength}
            onChange={(value) => handleChange("caStrength", value)}
          />
          <PlaygroundSlider
            label="Glow"
            min={0}
            max={1.2}
            step={0.01}
            value={config.glow}
            onChange={(value) => handleChange("glow", value)}
          />
          <PlaygroundSlider
            label="Noise Warp"
            min={0}
            max={2}
            step={0.05}
            value={config.noiseWarp}
            onChange={(value) => handleChange("noiseWarp", value)}
          />
          <PlaygroundSlider
            label="Radius"
            min={0}
            max={44}
            step={1}
            value={config.borderRadius}
            onChange={(value) => handleChange("borderRadius", value)}
          />
        </div>
      </div>
    </div>
  );
}
