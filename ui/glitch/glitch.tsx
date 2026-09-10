"use client";

import * as stylex from "@stylexjs/stylex";
import { type ReactNode, useEffect, useRef, useState } from "react";

import { queries } from "@/tokens/generated/queries.stylex";
import { motion, spacing } from "@/tokens/generated/tokens.stylex";

import { glitchPlay } from "./glitch-play.stylex";

const bandCount = 5;
const gapMin = 40;
const gapSpan = 860;
const throws = ["xs", "sm", "md"] as const;

export type GlitchProps = {
  active?: boolean;
  children: ReactNode;
};

function pickThrow() {
  return throws[Math.floor(Math.random() * throws.length)] ?? "xs";
}

function pickGap() {
  return gapMin + Math.random() * gapSpan;
}

function pickBand(except: number, count: number) {
  if (except < 0) {
    return Math.floor(Math.random() * count);
  }

  let next = except;

  while (next === except) {
    next = Math.floor(Math.random() * count);
  }

  return next;
}

export function Glitch({
  active = false,
  children,
}: GlitchProps) {
  const on = useRef(false);
  const wait = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [burst, setBurst] = useState(0);
  const [band, setBand] = useState(0);
  const [reach, setReach] = useState<(typeof throws)[number]>("xs");
  const playing = active && burst > 0;
  const clips = [
    styles.fifths0,
    styles.fifths1,
    styles.fifths2,
    styles.fifths3,
    styles.fifths4,
  ];

  function clearWait() {
    if (wait.current === null) {
      return;
    }

    clearTimeout(wait.current);
    wait.current = null;
  }

  function fire(except: number) {
    setBand(pickBand(except, bandCount));
    setReach(pickThrow());
    setBurst((count) => count + 1);
  }

  function restThenFire(except: number) {
    setBurst(0);
    clearWait();
    wait.current = setTimeout(() => {
      wait.current = null;

      if (!on.current) {
        return;
      }

      fire(except);
    }, pickGap());
  }

  useEffect(() => {
    on.current = active;

    if (!active) {
      clearWait();
      const stop = window.setTimeout(() => {
        setBurst(0);
      }, 0);

      return () => {
        window.clearTimeout(stop);
      };
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const start = window.setTimeout(() => {
      fire(-1);
    }, 0);

    return () => {
      window.clearTimeout(start);
      clearWait();
    };
  }, [active]);

  return (
    <span {...stylex.props(styles.host)}>
      <span {...stylex.props(styles.sizer)}>{children}</span>
      {clips.map((clip, index) => (
        <span
          aria-hidden
          key={`${burst}-${index}`}
          onAnimationEnd={() => {
            if (!on.current || index !== band) {
              return;
            }

            restThenFire(band);
          }}
          {...stylex.props(
            styles.layer,
            clip,
            playing && band === index && glitchPlay,
            playing &&
              band === index &&
              (index % 2 === 0 ? playRight[reach] : playLeft[reach]),
          )}
        >
          {children}
        </span>
      ))}
    </span>
  );
}

const sliceRightXs = stylex.keyframes({
  "0%": { transform: "translateX(0)" },
  "35%": { transform: `translateX(${spacing.xs})` },
  "70%": { transform: `translateX(${spacing.xs})` },
  "100%": { transform: "translateX(0)" },
});

const sliceRightSm = stylex.keyframes({
  "0%": { transform: "translateX(0)" },
  "35%": { transform: `translateX(${spacing.sm})` },
  "70%": { transform: `translateX(${spacing.sm})` },
  "100%": { transform: "translateX(0)" },
});

const sliceRightMd = stylex.keyframes({
  "0%": { transform: "translateX(0)" },
  "35%": { transform: `translateX(${spacing.md})` },
  "70%": { transform: `translateX(${spacing.md})` },
  "100%": { transform: "translateX(0)" },
});

const sliceLeftXs = stylex.keyframes({
  "0%": { transform: "translateX(0)" },
  "35%": { transform: `translateX(calc(-1 * ${spacing.xs}))` },
  "70%": { transform: `translateX(calc(-1 * ${spacing.xs}))` },
  "100%": { transform: "translateX(0)" },
});

const sliceLeftSm = stylex.keyframes({
  "0%": { transform: "translateX(0)" },
  "35%": { transform: `translateX(calc(-1 * ${spacing.sm}))` },
  "70%": { transform: `translateX(calc(-1 * ${spacing.sm}))` },
  "100%": { transform: "translateX(0)" },
});

const sliceLeftMd = stylex.keyframes({
  "0%": { transform: "translateX(0)" },
  "35%": { transform: `translateX(calc(-1 * ${spacing.md}))` },
  "70%": { transform: `translateX(calc(-1 * ${spacing.md}))` },
  "100%": { transform: "translateX(0)" },
});

const styles = stylex.create({
  fifths0: {
    clipPath: "inset(0 0 80% 0)",
  },
  fifths1: {
    clipPath: "inset(20% 0 60% 0)",
  },
  fifths2: {
    clipPath: "inset(40% 0 40% 0)",
  },
  fifths3: {
    clipPath: "inset(60% 0 20% 0)",
  },
  fifths4: {
    clipPath: "inset(80% 0 0 0)",
  },
  host: {
    gap: "inherit",
    display: "inline-block",
    position: "relative",
  },
  layer: {
    inset: 0,
    gap: "inherit",
    alignItems: "center",
    display: "inline-flex",
    pointerEvents: "none",
    position: "absolute",
  },
  playLeftMd: {
    animationDuration: motion.duration_fade,
    animationIterationCount: 1,
    animationName: {
      default: sliceLeftMd,
      [queries.reducedMotion]: "none",
    },
    animationTimingFunction: "step-end",
  },
  playLeftSm: {
    animationDuration: motion.duration_fade,
    animationIterationCount: 1,
    animationName: {
      default: sliceLeftSm,
      [queries.reducedMotion]: "none",
    },
    animationTimingFunction: "step-end",
  },
  playLeftXs: {
    animationDuration: motion.duration_fade,
    animationIterationCount: 1,
    animationName: {
      default: sliceLeftXs,
      [queries.reducedMotion]: "none",
    },
    animationTimingFunction: "step-end",
  },
  playRightMd: {
    animationDuration: motion.duration_fade,
    animationIterationCount: 1,
    animationName: {
      default: sliceRightMd,
      [queries.reducedMotion]: "none",
    },
    animationTimingFunction: "step-end",
  },
  playRightSm: {
    animationDuration: motion.duration_fade,
    animationIterationCount: 1,
    animationName: {
      default: sliceRightSm,
      [queries.reducedMotion]: "none",
    },
    animationTimingFunction: "step-end",
  },
  playRightXs: {
    animationDuration: motion.duration_fade,
    animationIterationCount: 1,
    animationName: {
      default: sliceRightXs,
      [queries.reducedMotion]: "none",
    },
    animationTimingFunction: "step-end",
  },
  sizer: {
    gap: "inherit",
    alignItems: "center",
    display: "inline-flex",
    opacity: 0,
  },
});

const playLeft = {
  md: styles.playLeftMd,
  sm: styles.playLeftSm,
  xs: styles.playLeftXs,
};

const playRight = {
  md: styles.playRightMd,
  sm: styles.playRightSm,
  xs: styles.playRightXs,
};
