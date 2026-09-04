import { addons } from "storybook/manager-api";
import { getPreferredColorScheme, themes } from "storybook/theming";

/**
 * The manager is Storybook's own shell (sidebar, toolbar, addon panels) —
 * a separate React app from the story iframe.
 * Story content already tracks the OS through StyleX `colorSystem` (`prefers-color-scheme`),
 * but the shell has no theme of its own here, so it defaults to light regardless of the OS.
 *
 * `getPreferredColorScheme()` reads that same media query, so the shell picks
 * the OS theme on load. Storybook only reads it once, so we also listen for
 * later OS flips and push the new theme back in.
 *
 * Storybook's dark theme still paints the iframe element white (`appPreviewBg`).
 * That is the letterbox around the story page, not the story tokens.
 * At night that white shows through while the iframe is empty or scaled.
 * Reuse the shell's own background for that letterbox; leave light as-is.
 */
const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

function applyOsTheme() {
  const prefersDark = getPreferredColorScheme() === "dark";

  addons.setConfig({
    theme: prefersDark
      ? { ...themes.dark, appPreviewBg: themes.dark.appBg }
      : themes.light,
  });
}

applyOsTheme();
darkQuery.addEventListener("change", applyOsTheme);
