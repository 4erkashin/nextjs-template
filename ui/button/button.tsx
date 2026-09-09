"use client";

import { Button as BaseButton } from "@base-ui/react/button";
import * as stylex from "@stylexjs/stylex";
import { type ComponentProps } from "react";

import { queries } from "../../tokens/generated/queries.stylex";
import { colors, spacing } from "../../tokens/generated/tokens.stylex";

const blink = stylex.keyframes({
  "50%": {
    opacity: 0,
  },
});

const styles = stylex.create({
  root: {
    font: "inherit",
    borderColor: colors.foreground,
    borderStyle: "solid",
    borderWidth: spacing.px,
    gap: "0.65rem",
    outline: {
      ":focus-visible": "none",
      ":hover": "none",
    },
    paddingBlock: "0.55rem",
    paddingInline: "0.85rem",
    alignItems: "center",
    backgroundColor: {
      default: colors.background,
      ":focus-visible": colors.foreground,
      ":hover": colors.foreground,
    },
    boxShadow: `0 0 0 1px ${colors.background}, 0 0 18px ${colors.foreground}`,
    color: {
      default: colors.foreground,
      ":focus-visible": colors.background,
      ":hover": colors.background,
    },
    cursor: "pointer",
    display: "inline-flex",
    letterSpacing: "0.08em",
    textTransform: "lowercase",
    width: "fit-content",
    "::after": {
      animationDuration: "0.9s",
      animationIterationCount: "infinite",
      animationName: {
        default: blink,
        [queries.reducedMotion]: "none",
      },
      animationTimingFunction: "step-end",
      backgroundColor: {
        default: colors.foreground,
        ":focus-visible": colors.background,
        ":hover": colors.background,
      },
      content: '""',
      height: "1em",
      width: "0.55rem",
    },
    "::before": {
      color: {
        default: colors.foreground,
        ":focus-visible": colors.background,
        ":hover": colors.background,
      },
      content: '">"',
    },
  },
});

/**
 * Terminal action control. Look is StyleX; press, focus, and disabled
 * come from Base UI.
 */
export function Button({
  type = "button",
  ...props
}: ComponentProps<typeof BaseButton>) {
  return <BaseButton type={type} {...props} {...stylex.props(styles.root)} />;
}
