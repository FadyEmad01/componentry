"use client";

import { useEffect } from "react";
import { ArrowUpRight, Instagram, MousePointer2 } from "lucide-react";
import { create } from "zustand";
import {
  HoverTransition,
  hoverTransitionDirections,
  hoverTransitionEffects,
  type HoverTransitionDirection,
  type HoverTransitionEffect,
} from "@workspace/ui/components/hover-transition";
import { usePlaygroundStore } from "@/hooks/use-playground-store";
import {
  PlaygroundColorPicker,
  PlaygroundSectionTitle,
  PlaygroundSlider,
} from "@/components/playground-primitives";
import { cn } from "@/lib/utils";

const PEOPLE = [
  {
    id: "tom",
    name: "Tom Mathews",
    role: "CEO",
    bio: "Leading the agency's mission to blend Indonesian creativity with cutting-edge AI automation that helps businesses work smarter and scale faster.",
    position: "0% 0%",
  },
  {
    id: "andrew",
    name: "Andrew Michel",
    role: "COO",
    bio: "Turning ambitious ideas into focused systems, strong teams, and repeatable operations that keep every project moving forward.",
    position: "33.333% 0%",
  },
  {
    id: "james",
    name: "James Smith",
    role: "CTO",
    bio: "Building reliable AI products that connect thoughtful engineering with simple, human-centered digital experiences.",
    position: "66.667% 0%",
  },
  {
    id: "marlen",
    name: "Marlen",
    role: "CMO",
    bio: "Shaping clear brand stories and campaigns that turn attention into lasting relationships between people and products.",
    position: "100% 0%",
  },
  {
    id: "sophie",
    name: "Sophie Laura",
    role: "Strategy Director",
    bio: "Finding the sharpest path through complex challenges and translating research into confident creative direction.",
    position: "0% 100%",
  },
  {
    id: "daniel",
    name: "Daniel Reed",
    role: "Product Director",
    bio: "Guiding products from first sketch to launch with a practical balance of customer insight, craft, and commercial impact.",
    position: "33.333% 100%",
  },
  {
    id: "amina",
    name: "Amina Yusuf",
    role: "Creative Director",
    bio: "Creating expressive visual systems where culture, technology, and meticulous art direction meet with purpose.",
    position: "66.667% 100%",
  },
  {
    id: "liam",
    name: "Liam Woods",
    role: "Studio Partner",
    bio: "Helping clients turn bold goals into enduring collaborations, measurable growth, and work the whole team is proud to share.",
    position: "100% 100%",
  },
] as const;

type Person = (typeof PEOPLE)[number];
type PersonId = Person["id"];

const EASINGS = {
  smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
  soft: "cubic-bezier(0.4, 0, 0.2, 1)",
  snappy: "cubic-bezier(0.16, 1, 0.3, 1)",
} as const;

type EasingName = keyof typeof EASINGS;

interface CardConfig {
  effect: HoverTransitionEffect;
  direction: HoverTransitionDirection;
  color: string;
}

interface HoverTransitionConfig {
  selectedCard: PersonId;
  cards: Record<PersonId, CardConfig>;
  duration: number;
  easing: EasingName;
}

const DEFAULT_CONFIG: HoverTransitionConfig = {
  selectedCard: "tom",
  cards: {
    tom: { effect: "morph", direction: "center", color: "#dfff5f" },
    andrew: {
      effect: "diagonal",
      direction: "top-left",
      color: "#ff795f",
    },
    james: { effect: "strips", direction: "bottom", color: "#7c8cff" },
    marlen: { effect: "ripple", direction: "center", color: "#ff9bcb" },
    sophie: { effect: "curtain", direction: "top", color: "#56d6b0" },
    daniel: { effect: "slide", direction: "left", color: "#ffc857" },
    amina: {
      effect: "wipe",
      direction: "bottom-right",
      color: "#bba7ff",
    },
    liam: {
      effect: "parallax",
      direction: "top-right",
      color: "#62d6e8",
    },
  },
  duration: 0.65,
  easing: "smooth",
};

interface HoverTransitionStore {
  config: HoverTransitionConfig;
  selectCard: (id: PersonId) => void;
  updateCard: (id: PersonId, updates: Partial<CardConfig>) => void;
  updateTiming: (
    updates: Partial<Pick<HoverTransitionConfig, "duration" | "easing">>,
  ) => void;
  resetConfig: () => void;
}

const useHoverTransitionStore = create<HoverTransitionStore>((set) => ({
  config: DEFAULT_CONFIG,
  selectCard: (selectedCard) =>
    set((state) => ({ config: { ...state.config, selectedCard } })),
  updateCard: (id, updates) =>
    set((state) => ({
      config: {
        ...state.config,
        cards: {
          ...state.config.cards,
          [id]: { ...state.config.cards[id], ...updates },
        },
      },
    })),
  updateTiming: (updates) =>
    set((state) => ({ config: { ...state.config, ...updates } })),
  resetConfig: () => set({ config: DEFAULT_CONFIG }),
}));

function generateCode(config: HoverTransitionConfig) {
  const card = config.cards[config.selectedCard];
  return `import { HoverTransition } from "@/components/ui/hover-transition"

<HoverTransition
  effect="${card.effect}"
  direction="${card.direction}"
  duration={${config.duration}}
  easing="${EASINGS[config.easing]}"
  defaultComponent={<YourDefaultCard />}
  hoverComponent={<div style={{ backgroundColor: "${card.color}" }}><YourDetails /></div>}
  className="aspect-[4/5] rounded-3xl"
/>`;
}

function PortraitCard({
  person,
  index,
  accent,
  effect,
}: {
  person: Person;
  index: number;
  accent: string;
  effect: HoverTransitionEffect;
}) {
  return (
    <article
      className="relative h-full w-full overflow-hidden bg-[#f8f8f5] bg-[length:400%_200%] bg-no-repeat"
      style={{
        backgroundImage: "url('/images/hover-transition-team.jpg')",
        backgroundPosition: person.position,
      }}
    >
      <div className="absolute inset-x-0 bottom-0 px-[clamp(10px,5cqw,18px)] pb-[clamp(10px,5cqw,18px)] text-[#151515]">
        <p className="text-[clamp(14px,7cqw,24px)] font-medium leading-none tracking-[-0.04em]">
          {person.name}
        </p>
        <p className="mt-1 text-[clamp(9px,3.2cqw,12px)] uppercase leading-none tracking-[-0.02em] text-black/60">
          {person.role}
        </p>
      </div>
      <div className="absolute inset-x-[clamp(10px,5cqw,18px)] top-[clamp(10px,5cqw,18px)] flex items-center justify-between font-mono text-[clamp(8px,3cqw,10px)] uppercase tracking-[0.08em] text-black/55">
        <span className="flex items-center gap-2">
          <span className="size-2" style={{ backgroundColor: accent }} />
          {String(index + 1).padStart(2, "0")}
        </span>
        <span>{effect}</span>
      </div>
    </article>
  );
}

function PersonDetails({
  person,
  index,
  color,
  effect,
}: {
  person: Person;
  index: number;
  color: string;
  effect: HoverTransitionEffect;
}) {
  return (
    <article
      className="flex h-full w-full flex-col justify-between p-[clamp(12px,5cqw,22px)] text-[#111]"
      style={{
        backgroundColor: color,
        backgroundImage:
          "radial-gradient(circle at 85% 5%, rgba(255,255,255,.42), transparent 34%), linear-gradient(145deg, rgba(255,255,255,.12), transparent 58%)",
      }}
    >
      <div>
        <div className="flex items-center justify-between font-mono text-[clamp(8px,3cqw,10px)] uppercase tracking-[0.1em] text-black/55">
          <span>{String(index + 1).padStart(2, "0")}</span>
          <span>{effect}</span>
        </div>
        <p className="mt-[clamp(14px,6cqw,28px)] max-w-[29ch] text-[clamp(12px,5.2cqw,19px)] font-medium leading-[1.18] tracking-[-0.035em]">
          {person.bio}
        </p>
      </div>
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-[clamp(12px,5cqw,17px)] font-semibold leading-none tracking-[-0.035em]">
            {person.name}
          </p>
          <p className="mt-1 text-[clamp(8px,3cqw,10px)] uppercase tracking-[0.08em] text-black/55">
            {person.role}
          </p>
        </div>
        <div className="flex items-center gap-1.5" aria-hidden="true">
          {[MousePointer2, Instagram, ArrowUpRight].map((Icon, iconIndex) => (
            <span
              key={iconIndex}
              className="grid size-[clamp(22px,8cqw,28px)] place-items-center rounded-[6px] bg-black text-white"
            >
              <Icon className="size-[55%]" strokeWidth={2.4} />
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

export function HoverTransitionPlayground() {
  const config = useHoverTransitionStore((state) => state.config);
  const selectCard = useHoverTransitionStore((state) => state.selectCard);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      usePlaygroundStore.getState().setCode(generateCode(config));
    }, 150);
    return () => window.clearTimeout(timeout);
  }, [config]);

  return (
    <div className="flex h-full min-h-[520px] w-full items-center justify-center bg-[radial-gradient(circle_at_16%_12%,#ffffff_0%,#eeece5_52%,#dfdcd2_100%)] p-2 [container-type:size] sm:p-4 dark:bg-[radial-gradient(circle_at_18%_10%,#252525_0%,#111_50%,#080808_100%)] lg:p-6">
      <div className="grid aspect-[.3975] w-full grid-cols-2 grid-rows-4 gap-[3px] overflow-hidden rounded-[clamp(20px,2.4cqw,34px)] bg-[#151515] shadow-[0_30px_90px_rgba(35,30,18,.2)] ring-1 ring-black/10 md:aspect-[1.59] md:w-[min(100cqw,calc(100cqh*1.59))] md:grid-cols-4 md:grid-rows-2 dark:shadow-[0_30px_100px_rgba(0,0,0,.5)] dark:ring-white/10">
        {PEOPLE.map((person, index) => {
          const card = config.cards[person.id];
          return (
            <HoverTransition
              key={person.id}
              effect={card.effect}
              direction={card.direction}
              duration={config.duration}
              easing={EASINGS[config.easing]}
              label={`${person.name}, ${person.role}`}
              onClick={() => selectCard(person.id)}
              defaultComponent={
                <PortraitCard
                  person={person}
                  index={index}
                  accent={card.color}
                  effect={card.effect}
                />
              }
              hoverComponent={
                <PersonDetails
                  person={person}
                  index={index}
                  color={card.color}
                  effect={card.effect}
                />
              }
              className="min-h-0 aspect-[.795] bg-[#f8f8f5] [container-type:inline-size] md:aspect-auto"
            />
          );
        })}
      </div>
    </div>
  );
}

function OptionGrid<T extends string>({
  value,
  options,
  onChange,
  columns = 2,
}: {
  value: T;
  options: readonly T[];
  onChange: (value: T) => void;
  columns?: 2 | 3;
}) {
  return (
    <div
      className={cn(
        "grid gap-1.5",
        columns === 3 ? "grid-cols-3" : "grid-cols-2",
      )}
    >
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          className={cn(
            "rounded-md border px-2 py-2 text-[11px] font-medium capitalize transition-colors",
            value === option
              ? "border-foreground bg-foreground text-background"
              : "border-border/70 text-muted-foreground hover:text-foreground",
          )}
        >
          {option.replace("-", " ")}
        </button>
      ))}
    </div>
  );
}

export function HoverTransitionPersonalizePanel() {
  const config = useHoverTransitionStore((state) => state.config);
  const selectCard = useHoverTransitionStore((state) => state.selectCard);
  const updateCard = useHoverTransitionStore((state) => state.updateCard);
  const updateTiming = useHoverTransitionStore((state) => state.updateTiming);
  const resetConfig = useHoverTransitionStore((state) => state.resetConfig);
  const selectedPerson = PEOPLE.find(
    (person) => person.id === config.selectedCard,
  )!;
  const selectedCard = config.cards[config.selectedCard];

  return (
    <div className="h-full overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <div className="space-y-6 px-4 pb-10 pt-20">
        <header className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tighter text-foreground">
            Personalize
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground/90">
            Select a card, then shape its animation and hover color
            independently.
          </p>
        </header>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={resetConfig}
            className="rounded-md border border-border/40 bg-white/50 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground dark:bg-white/[0.03]"
          >
            Reset
          </button>
        </div>

        <section>
          <PlaygroundSectionTitle>Card</PlaygroundSectionTitle>
          <div className="grid grid-cols-2 gap-1.5">
            {PEOPLE.map((person) => {
              const card = config.cards[person.id];
              const selected = config.selectedCard === person.id;
              return (
                <button
                  key={person.id}
                  type="button"
                  onClick={() => selectCard(person.id)}
                  className={cn(
                    "flex min-w-0 items-center gap-2 rounded-md border p-2 text-left transition-colors",
                    selected
                      ? "border-foreground bg-foreground text-background"
                      : "border-border/70 text-foreground hover:border-foreground/40",
                  )}
                >
                  <span
                    className="size-3 shrink-0 rounded-full border border-black/10"
                    style={{ backgroundColor: card.color }}
                  />
                  <span className="min-w-0">
                    <span className="block truncate text-[11px] font-semibold">
                      {person.name}
                    </span>
                    <span
                      className={cn(
                        "block truncate font-mono text-[9px] uppercase",
                        selected
                          ? "text-background/60"
                          : "text-muted-foreground",
                      )}
                    >
                      {card.effect}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <section>
          <PlaygroundSectionTitle>
            {selectedPerson.name} · Hover color
          </PlaygroundSectionTitle>
          <PlaygroundColorPicker
            label="Background"
            value={selectedCard.color}
            defaultColor="#dfff5f"
            onChange={(color) => updateCard(config.selectedCard, { color })}
          />
        </section>

        <section>
          <PlaygroundSectionTitle>Effect</PlaygroundSectionTitle>
          <OptionGrid
            value={selectedCard.effect}
            options={hoverTransitionEffects}
            onChange={(effect) => updateCard(config.selectedCard, { effect })}
          />
        </section>

        <section>
          <PlaygroundSectionTitle>Direction</PlaygroundSectionTitle>
          <OptionGrid
            value={selectedCard.direction}
            options={hoverTransitionDirections}
            columns={3}
            onChange={(direction) =>
              updateCard(config.selectedCard, { direction })
            }
          />
        </section>

        <section className="space-y-3">
          <PlaygroundSectionTitle>Timing</PlaygroundSectionTitle>
          <PlaygroundSlider
            label="Duration"
            min={0.15}
            max={1.8}
            step={0.05}
            value={config.duration}
            unit="s"
            onChange={(duration) => updateTiming({ duration })}
          />
          <OptionGrid
            value={config.easing}
            options={Object.keys(EASINGS) as EasingName[]}
            columns={3}
            onChange={(easing) => updateTiming({ easing })}
          />
        </section>
      </div>
    </div>
  );
}
