import * as stylex from "@stylexjs/stylex";

import { queries } from "../tokens/generated/queries.stylex";
import { colors, fonts, spacing } from "../tokens/generated/tokens.stylex";

export const rootStyles = stylex.create({
  body: {
    margin: 0,
  },
  chrome: {
    padding: spacing.m,
    gap: spacing.m,
    display: "flex",
    flexDirection: {
      default: "column",
      [queries.wide]: "row",
    },
  },
  colorDark: {
    colorScheme: "dark",
  },
  colorLight: {
    colorScheme: "light",
  },
  colorSystem: {
    colorScheme: "light dark",
  },
  html: {
    backgroundColor: colors.bg,
    color: colors.text,
    fontFamily: fonts.family,
    fontSize: fonts.size,
  },
});
