import { addons } from "storybook/manager-api";
import { getPreferredColorScheme } from "storybook/theming";

import { shellTheme } from "./theme-shell.ts";

/**
 * Paint the sidebar, toolbar, panels, and the area around the story
 * to match the operating system's light/dark setting. The story itself
 * lives in a separate page; preview.tsx colors that from the toolbar.
 *
 * Storybook does not always update when the operating system switches
 * light/dark, and the area around the story stays white by default.
 * This file sets those colors and listens for the switch.
 */
function applyShell() {
  const mode = getPreferredColorScheme();
  const theme = shellTheme(mode);
  const html = document.documentElement;

  /**
   * main.ts already set <html> background from the OS (inline CSS,
   * before this file ran). Keep the inline color in lockstep when
   * the OS flips without a reload.
   */
  html.style.backgroundColor = theme.appBg;
  html.style.colorScheme = mode;

  addons.setConfig({ theme });
}

applyShell();

const osDark = window.matchMedia("(prefers-color-scheme: dark)");
osDark.addEventListener("change", applyShell);
