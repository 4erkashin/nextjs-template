import * as stylex from "@stylexjs/stylex";

import { queries } from "@/tokens/generated/queries.stylex";

const blink = stylex.keyframes({
  "50%": {
    opacity: 0,
  },
});

const styles = stylex.create({
  root: {
    animationDuration: "0.9s",
    animationIterationCount: "infinite",
    animationName: {
      default: blink,
      [queries.reducedMotion]: "none",
    },
    animationTimingFunction: "step-end",
    backgroundColor: "currentColor",
    display: "inline-block",
    flexShrink: 0,
    height: "1em",
    width: "0.55rem",
  },
});

export function Caret() {
  return <span aria-hidden {...stylex.props(styles.root)} />;
}
