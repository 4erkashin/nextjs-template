import {
  GLOBALS_UPDATED,
  SET_GLOBALS,
  UPDATE_GLOBALS,
} from "storybook/internal/core-events";
import { addons } from "storybook/manager-api";
import { getPreferredColorScheme } from "storybook/theming";

import { isThemeName, type ThemeName } from "../theme/cookie.ts";
import { type ShellMode, shellTheme } from "./shell-theme.ts";

// Toolbar pick. "system" until Storybook's channel tells us the real value.
let toolbarTheme: ThemeName = "system";

/** "system" follows the OS; otherwise the locked toolbar pick. */
function modeFromToolbar(): ShellMode {
  if (toolbarTheme === "system") {
    return getPreferredColorScheme();
  }

  return toolbarTheme;
}

/**
 * Color the chrome (sidebar, toolbar, panels) to match the toolbar pick.
 *
 * The story iframe is a different app — preview.tsx themes that. Before
 * this existed, chrome followed the OS only: lock the toolbar to light
 * at night and the sidebar stayed dark.
 */
function applyShell() {
  const mode = modeFromToolbar();
  const theme = shellTheme(mode);
  const html = document.documentElement;

  /**
   * main.ts already set <html> background from the OS (inline CSS,
   * before this file ran). Overwrite that so a locked toolbar is not
   * still showing OS colors.
   */
  html.style.backgroundColor = theme.appBg;
  html.style.colorScheme = mode;

  // Storybook's theme object: sidebar, toolbar, and the frame around the iframe.
  addons.setConfig({ theme });
}

/** Pull `theme` out of a Storybook globals payload. Missing or junk → "system". */
function toolbarThemeFrom(globals: unknown): ThemeName {
  if (
    typeof globals !== "object" ||
    globals === null ||
    !("theme" in globals)
  ) {
    return "system";
  }

  const { theme } = globals;

  return typeof theme === "string" && isThemeName(theme) ? theme : "system";
}

function applyShellFromGlobals(globals: unknown) {
  toolbarTheme = toolbarThemeFrom(globals);
  applyShell();
}

/**
 * Toolbar changes arrive as globals events. Subscribe to every name Storybook
 * uses for that so we do not miss one.
 *
 * We may subscribe after the first event, so also replay `last` if it is there.
 */
function listenForToolbarTheme(channel: {
  last: (event: string) => unknown[] | undefined;
  on: (
    event: string,
    listener: (payload: { globals?: unknown }) => void,
  ) => void;
}) {
  const onGlobals = ({ globals }: { globals?: unknown }) => {
    applyShellFromGlobals(globals);
  };

  channel.on(SET_GLOBALS, onGlobals);
  channel.on(UPDATE_GLOBALS, onGlobals);
  channel.on(GLOBALS_UPDATED, onGlobals);

  const last =
    channel.last(SET_GLOBALS)?.[0] ?? channel.last(GLOBALS_UPDATED)?.[0];

  if (last && typeof last === "object" && last !== null && "globals" in last) {
    applyShellFromGlobals(last.globals);
  }
}

// Color from OS now ("system"). A locked toolbar pick arrives once the channel is ready.
applyShell();

/**
 * OS light/dark flipped. Only matters while the toolbar is "system";
 * a locked pick must stay put.
 *
 * Current value is read via getPreferredColorScheme() in modeFromToolbar.
 * This object is only the change listener.
 */
const osDark = window.matchMedia("(prefers-color-scheme: dark)");
osDark.addEventListener("change", () => {
  if (toolbarTheme === "system") {
    applyShell();
  }
});

/**
 * addons.getChannel() at import time is not the real channel yet.
 * addons.setConfig already waits for addons.ready(); wait the same
 * way before reading toolbar globals.
 */
void addons.ready().then(listenForToolbarTheme);
