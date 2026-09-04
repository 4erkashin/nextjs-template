import { type ReactNode, useLayoutEffect } from "react";

import { type ThemeName } from "@/theme/cookie";
import { themeRootProps } from "@/theme/root-props";

/**
 * Last theme we put on the iframe <html>.
 * Kept outside React so a new story's ThemeHtml can take over
 * without the old one wiping <html> first.
 */
let lastHtmlTheme: null | {
  classes: string[];
  style: object;
} = null;

function classesFrom(className: undefined | string): string[] {
  return className?.split(/\s+/).filter(Boolean) ?? [];
}

/**
 * Object.assign wrote these as JS names (colorScheme, not color-scheme).
 * Assign an empty string the same way to clear them.
 * Custom properties (--…) need removeProperty.
 */
function undoHtmlInlineStyle(html: HTMLElement, style: object) {
  for (const key of Object.keys(style)) {
    if (key.startsWith("--")) {
      html.style.removeProperty(key);
      continue;
    }

    Object.assign(html.style, { [key]: "" });
  }
}

/**
 * Put this theme on <html>, replacing whatever we put there last.
 * One shot, so the page is never unthemed between stories.
 */
function applyThemeToHtml(theme: ThemeName) {
  const html = document.documentElement;
  const { className, style } = themeRootProps(theme);
  const classes = classesFrom(className);
  const nextStyle = style ?? {};

  if (lastHtmlTheme) {
    if (lastHtmlTheme.classes.length > 0) {
      html.classList.remove(...lastHtmlTheme.classes);
    }

    undoHtmlInlineStyle(html, lastHtmlTheme.style);
  }

  if (classes.length > 0) {
    html.classList.add(...classes);
  }

  Object.assign(html.style, nextStyle);
  lastHtmlTheme = { classes, style: nextStyle };
}

/**
 * The real app sets the theme on <html> in layout.tsx.
 * A wrapper div only colors its own box, so the rest of the iframe
 * stays the browser default — white.
 *
 * Copy the same theme onto this iframe's <html>.
 *
 * When you click another story, React throws this component away and
 * mounts a new one. If we undid the theme in a cleanup, <html> would
 * sit with no color-scheme for a moment, and at night that canvas is
 * white. applyThemeToHtml replaces the last theme in place instead.
 */
export function ThemeHtml({
  children,
  theme,
}: Readonly<{
  children: ReactNode;
  theme: ThemeName;
}>) {
  useLayoutEffect(() => {
    applyThemeToHtml(theme);
  }, [theme]);

  return children;
}
