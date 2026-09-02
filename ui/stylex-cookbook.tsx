import * as stylex from "@stylexjs/stylex";

import { queries } from "../tokens/generated/queries.stylex";
import { colors, fonts, spacing } from "../tokens/generated/tokens.stylex";

const pulse = stylex.keyframes({
  from: { opacity: 1 },
  to: { opacity: 0.5 },
});

const styles = stylex.create({
  box: {
    padding: {
      default: spacing.s,
      [queries.wide]: spacing.m,
    },
    borderColor: colors.accent,
    borderStyle: "solid",
    borderWidth: spacing.s,
    animationDuration: "1s",
    animationIterationCount: "infinite",
    animationName: pulse,
    animationTimingFunction: "ease-in-out",
    backgroundColor: colors.bg,
    color: {
      default: colors.text,
      ":hover": colors.accent,
    },
    containerType: "inline-size",
    display: {
      default: "block",
      "@supports (display: grid)": "grid",
    },
    fontFamily: fonts.family,
    fontSize: {
      default: fonts.size,
      [queries.container]: fonts.sizeLg,
    },
  },
  marker: {
    "::before": {
      color: colors.accent,
      content: '"→ "',
    },
  },
});

export function StylexCookbook() {
  return (
    <section {...stylex.props(styles.box)}>
      <p {...stylex.props(styles.marker)}>
        StyleX cookbook: hover, ::before, keyframes, @media, @supports,
        @container.
      </p>
    </section>
  );
}
