import { addons } from "storybook/manager-api";
import { getPreferredColorScheme, themes } from "storybook/theming";

/**
 * The manager is Storybook's own shell (sidebar, toolbar, addon panels) —
 * a separate React app from the story iframe. Story content already tracks
 * the OS through StyleX `colorSystem` (`prefers-color-scheme`), but the shell
 * has no theme of its own here, so it defaults to light regardless of the OS.
 *
 * `getPreferredColorScheme()` reads that same media query, so the shell picks
 * the OS theme on load. Storybook only reads it once, so we also listen for
 * later OS flips and push the new theme back in.
 */
const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

function applyOsTheme() {
  addons.setConfig({
    theme: getPreferredColorScheme() === "dark" ? themes.dark : themes.light,
  });
}

applyOsTheme();
darkQuery.addEventListener("change", applyOsTheme);
