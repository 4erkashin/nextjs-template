import * as stylex from "@stylexjs/stylex";
import { type ReactNode } from "react";

import { queries } from "@/tokens/generated/queries.stylex";
import { colors, spacing } from "@/tokens/generated/tokens.stylex";

import { glitchPlay } from "../glitch/glitch-play.stylex";

export type ColorSplitProps = {
  active?: boolean;
  children: ReactNode;
};

export function ColorSplit({
  active = false,
  children,
}: ColorSplitProps) {
  return (
    <span {...stylex.props(styles.host)}>
      {active && (
        <>
          <span aria-hidden {...stylex.props(styles.ghost, styles.split)}>
            {children}
          </span>
          <span aria-hidden {...stylex.props(styles.ghost, styles.splitPair)}>
            {children}
          </span>
        </>
      )}
      {children}
    </span>
  );
}

const styles = stylex.create({
  split: {
    color: colors.split,
    transform: {
      default: `translate(${spacing.px}, calc(-1 * ${spacing.px}))`,
      [stylex.when.ancestor(":is(*)", glitchPlay)]: `translate(${spacing.xs}, calc(-1 * ${spacing.xs}))`,
    },
  },
  splitPair: {
    color: colors.splitPair,
    transform: {
      default: `translate(calc(-1 * ${spacing.px}), ${spacing.px})`,
      [stylex.when.ancestor(":is(*)", glitchPlay)]: `translate(calc(-1 * ${spacing.xs}), ${spacing.xs})`,
    },
  },
  ghost: {
    gap: "inherit",
    alignItems: "center",
    display: {
      default: "inline-flex",
      [queries.reducedMotion]: "none",
    },
    opacity: 0.8,
    pointerEvents: "none",
    position: "absolute",
    zIndex: -1,
    left: 0,
    top: 0,
  },
  host: {
    gap: "inherit",
    alignItems: "center",
    display: "inline-flex",
    isolation: "isolate",
    position: "relative",
  },
});
