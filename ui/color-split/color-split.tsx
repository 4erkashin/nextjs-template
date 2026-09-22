import * as stylex from "@stylexjs/stylex";
import { type ReactNode } from "react";

import { queries } from "@/tokens/generated/queries.stylex";
import { colors, spacing } from "@/tokens/generated/tokens.stylex";

import { glitchPlay } from "../glitch/glitch-play.stylex";

export type ColorSplitProps = {
  active?: boolean;
  children: ReactNode;
};

export function ColorSplit({ active = false, children }: ColorSplitProps) {
  return (
    <span {...stylex.props(styles.host)}>
      {active && (
        <>
          <span aria-hidden {...stylex.props(styles.ghost, styles.glitch)}>
            {children}
          </span>
          <span aria-hidden {...stylex.props(styles.ghost, styles.glitchPair)}>
            {children}
          </span>
        </>
      )}
      {children}
    </span>
  );
}

const styles = stylex.create({
  glitch: {
    color: colors.cyan,
    transform: {
      default: `translate(${spacing.px}, calc(-1 * ${spacing.px}))`,
      [stylex.when.ancestor(":is(*)", glitchPlay)]:
        `translate(${spacing.xs}, calc(-1 * ${spacing.xs}))`,
    },
  },
  glitchPair: {
    color: colors.flare,
    transform: {
      default: `translate(calc(-1 * ${spacing.px}), ${spacing.px})`,
      [stylex.when.ancestor(":is(*)", glitchPlay)]:
        `translate(calc(-1 * ${spacing.xs}), ${spacing.xs})`,
    },
  },
  ghost: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: -1,
    display: {
      default: "inline-flex",
      [queries.reducedMotion]: "none",
    },
    gap: "inherit",
    alignItems: "center",
    pointerEvents: "none",
    opacity: {
      default: 0,
      [stylex.when.ancestor(":is(*)", glitchPlay)]: 0.8,
    },
  },
  host: {
    position: "relative",
    display: "inline-flex",
    gap: "inherit",
    alignItems: "center",
    isolation: "isolate",
  },
});
