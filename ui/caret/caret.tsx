import * as stylex from "@stylexjs/stylex";

import { queries } from "@/tokens/generated/queries.stylex";

const blink = stylex.keyframes({
  "50%": {
    opacity: 0,
  },
});

const styles = stylex.create({
  root: {
    display: "inline-block",
    flexShrink: 0,
    width: "0.55rem",
    height: "1em",
    backgroundColor: "currentColor",
    animationName: {
      default: blink,
      [queries.reducedMotion]: "none",
    },
    animationDuration: "0.9s",
    animationTimingFunction: "step-end",
    animationIterationCount: "infinite",
  },
});

export function Caret() {
  return <span aria-hidden {...stylex.props(styles.root)} />;
}
