"use client";

import { Button as BaseButton } from "@base-ui/react/button";
import * as stylex from "@stylexjs/stylex";
import { type ComponentProps } from "react";

import { colors, spacing } from "@/tokens/generated/tokens.stylex";

export type ButtonProps = ComponentProps<typeof BaseButton>;

const styles = stylex.create({
  root: {
    boxSizing: "border-box",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "2.75rem",
    minHeight: "2.75rem",
    paddingBlock: spacing.sm,
    paddingInline: spacing.sm,
    font: "inherit",
    color: colors.foreground,
    textDecorationLine: {
      default: "none",
      ":hover": "underline",
    },
    textUnderlineOffset: spacing.xs,
    cursor: {
      default: "pointer",
      ":disabled": "not-allowed",
    },
    outlineWidth: spacing.px,
    outlineStyle: "solid",
    outlineColor: {
      default: "transparent",
      ":focus-visible": colors.foreground,
    },
    outlineOffset: spacing.xxs,
    backgroundColor: "transparent",
    borderStyle: "none",
    opacity: {
      default: 1,
      ":disabled": 0.5,
    },
  },
});

export function Button({ type = "button", ...props }: ButtonProps) {
  return <BaseButton type={type} {...props} {...stylex.props(styles.root)} />;
}
