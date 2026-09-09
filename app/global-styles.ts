import * as stylex from "@stylexjs/stylex";

import { type ThemeName } from "@/theme/cookie";
import { themes } from "@/tokens/generated/themes";
import { fonts } from "@/tokens/generated/tokens.stylex";

export const globalStyles = stylex.create({
  body: {
    margin: 0,
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
    fontFamily: fonts.family,
    fontSize: fonts.size,
  },
});

/**
 * Class names to spread on `<html>` for one theme.
 * Sets the color tokens, the document font, and `color-scheme`
 * so the browser's own widgets (scrollbars, inputs) match light, dark,
 * or the OS setting.
 */
export function htmlPropsForTheme(theme: ThemeName) {
  return stylex.props(
    themes[theme],
    globalStyles.html,
    theme === "light" && globalStyles.colorLight,
    theme === "dark" && globalStyles.colorDark,
    theme === "system" && globalStyles.colorSystem,
  );
}
