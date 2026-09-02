import * as stylex from "@stylexjs/stylex";

import { themes } from "@/tokens/generated/themes";

import type { ThemeName } from "./cookie";

import { rootStyles } from "./root-style";

export function themeRootProps(theme: ThemeName) {
  return stylex.props(
    themes[theme],
    rootStyles.html,
    theme === "light" && rootStyles.colorLight,
    theme === "dark" && rootStyles.colorDark,
    theme === "system" && rootStyles.colorSystem,
  );
}
