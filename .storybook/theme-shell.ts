import { themes, type ThemeVars } from "storybook/theming";

/**
 * Background of Storybook's chrome (sidebar, toolbar) and of the area
 * around the story iframe.
 *
 * Light is Storybook's default gray.
 * Dark is a different gray from the app's dark page, so the chrome and
 * the story do not blend into one block of color.
 */
export const desk = {
  dark: "#2e3136",
  light: themes.light.appBg,
} as const;

export type ShellMode = keyof typeof desk;

/**
 * Inline CSS for <html> before manager.ts runs. Follows the OS only.
 * manager.ts overwrites this once it knows the toolbar pick.
 */
export function shellFirstPaintCss(): string {
  return `html {
  background-color: ${desk.light};
  color-scheme: light;
}

@media (prefers-color-scheme: dark) {
  html {
    background-color: ${desk.dark};
    color-scheme: dark;
  }
}`;
}

export function appendShellFirstPaint(head: undefined | string = ""): string {
  return `${head}<style>${shellFirstPaintCss()}</style>`;
}

/**
 * Storybook theme for the chrome. appBg is sidebar / toolbar.
 * appPreviewBg is the area around the iframe, not the story itself.
 * Same color so that surround matches the rest of the chrome.
 */
export function shellTheme(mode: ShellMode): ThemeVars {
  const base = mode === "dark" ? themes.dark : themes.light;
  const appBg = desk[mode];

  return {
    ...base,
    appBg,
    appPreviewBg: appBg,
  };
}
