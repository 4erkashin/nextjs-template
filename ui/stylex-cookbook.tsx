import * as stylex from "@stylexjs/stylex";
import { type ReactNode } from "react";

import { queries } from "../tokens/generated/queries.stylex";
import {
  colors,
  fonts,
  motion,
  spacing,
} from "../tokens/generated/tokens.stylex";

const pulse = stylex.keyframes({
  from: { opacity: 1 },
  to: { opacity: 0.5 },
});

const styles = stylex.create({
  box: {
    margin: 0,
    padding: spacing.m,
    borderColor: colors.foreground,
    borderStyle: "solid",
    borderWidth: spacing.px,
    backgroundColor: colors.background,
    color: colors.foreground,
    fontFamily: fonts.family,
    fontSize: fonts.size,
  },
  hover: {
    backgroundColor: {
      default: colors.background,
      ":hover": colors.foreground,
    },
    color: {
      default: colors.foreground,
      ":hover": colors.background,
    },
  },
  before: {
    "::before": {
      color: colors.foreground,
      content: '"→ "',
    },
  },
  pulseOnHover: {
    animationDuration: motion.duration_move,
    animationIterationCount: "infinite",
    animationName: {
      default: "none",
      ":hover": pulse,
      [queries.reducedMotion]: "none",
    },
    animationTimingFunction: motion.easing_standard,
  },
  wide: {
    padding: {
      default: spacing.s,
      [queries.wide]: spacing.m,
    },
  },
  supportsGrid: {
    gap: spacing.s,
    display: {
      default: "block",
      "@supports (display: grid)": "grid",
    },
    gridTemplateColumns: "1fr 1fr",
  },
  container: {
    containerType: "inline-size",
    fontSize: {
      default: fonts.size,
      [queries.container]: fonts.sizeLg,
    },
  },
});

function Demo({
  children,
  extra,
}: Readonly<{
  children: ReactNode;
  extra?: Parameters<typeof stylex.props>[0];
}>) {
  return <div {...stylex.props(styles.box, extra)}>{children}</div>;
}

export function Before() {
  return <Demo extra={styles.before}>Generated marker.</Demo>;
}

export function Container() {
  return (
    <Demo extra={styles.container}>
      Type steps up when this box is at least 40rem wide.
    </Demo>
  );
}

export function Hover() {
  return <Demo extra={styles.hover}>Inverts under the pointer.</Demo>;
}

export function Keyframes() {
  return <Demo extra={styles.pulseOnHover}>Fades while hovered.</Demo>;
}

export function ReducedMotion() {
  return (
    <Demo extra={styles.pulseOnHover}>
      Same pulse. OS reduce-motion turns it off.
    </Demo>
  );
}

export function Supports() {
  return (
    <Demo extra={styles.supportsGrid}>
      <span>A</span>
      <span>B</span>
    </Demo>
  );
}

export function Wide() {
  return <Demo extra={styles.wide}>Padding grows at a 40rem viewport.</Demo>;
}
