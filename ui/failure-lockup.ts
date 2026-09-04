import * as stylex from "@stylexjs/stylex";

import { colors, fonts, spacing } from "../tokens/generated/tokens.stylex";

/**
 * Shared failure dialect: type, stack, and the text action.
 * Atmosphere (field, grain, title ghost) stays on global-error.
 */
export const failureLockupStyles = stylex.create({
  action: {
    padding: 0,
    borderStyle: "none",
    appearance: "none",
    backgroundColor: "transparent",
    color: {
      default: colors.text,
      ":focus-visible": colors.accent,
      ":hover": colors.accent,
    },
    cursor: "pointer",
    fontFamily: fonts.family,
    fontSize: fonts.size,
    outlineColor: colors.accent,
    outlineOffset: spacing.px,
    outlineStyle: {
      default: "none",
      ":focus-visible": "solid",
    },
    outlineWidth: spacing.px,
    textDecorationLine: {
      default: "none",
      ":focus-visible": "underline",
      ":hover": "underline",
    },
    textUnderlineOffset: spacing.s,
  },
  description: {
    margin: 0,
    color: colors.text,
    fontSize: fonts.size,
  },
  digest: {
    margin: 0,
    color: colors.muted,
    fontSize: fonts.size,
  },
  root: {
    gap: spacing.m,
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "column",
  },
  title: {
    margin: 0,
    fontFamily: fonts.family,
    fontSize: fonts.sizeDisplay,
    fontWeight: 500,
    lineHeight: 1.15,
  },
});
