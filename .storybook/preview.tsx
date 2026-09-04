import type { Preview } from "@storybook/nextjs-vite";

import { DecoratorHelpers } from "@storybook/addon-themes";
import { QueryClientProvider } from "@tanstack/react-query";
import { mswLoader } from "msw-storybook-addon/csf3";
import { type ReactNode, useLayoutEffect, useState } from "react";

import { MotionProvider } from "@/lib/motion/provider";
import { makeQueryClient } from "@/lib/query/query-client";
import { THEME_NAMES, type ThemeName } from "@/theme/cookie";
import { themeRootProps } from "@/theme/root-props";

import { mswHandlers } from "./msw-handlers";
import nextIntl from "./next-intl";

import "@/app/globals.css";

/**
 * App QueryProvider uses a browser singleton — cache would leak across stories.
 * useState keeps one client for this mount; key={context.id} on this component
 * (not on QueryClientProvider) so the owner remounts per story.
 */
function StoryQueryRoot({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const [queryClient] = useState(() => makeQueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

const { initializeThemeState, pluckThemeFromContext } = DecoratorHelpers;

// Puts light / dark / system in the toolbar. Default is "system".
initializeThemeState([...THEME_NAMES], "system");

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
function ThemeHtml({
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

// Toolbar captions only. Locale ids come from `nextIntl`; a missing caption shows the id.
const localeLabels: Record<string, string> = {
  en: "EN",
  "pt-BR": "PT-BR",
  ru: "RU",
  uk: "UA",
};

// Every available locale id mapped to its toolbar caption (id itself when uncaptioned).
const localeCaptions = Object.fromEntries(
  Object.keys(nextIntl.messagesByLocale).map((locale) => [
    locale,
    localeLabels[locale] ?? locale,
  ]),
);

const preview: Preview = {
  async beforeEach({ msw }) {
    msw.use(...mswHandlers);
  },
  decorators: [
    /**
     * Toolbar already stored the picked name. A story can override it.
     * Pass that name into themeRootProps on the iframe <html> — same as the app.
     * Empty (toolbar not ready yet) → "system".
     */
    (Story, context) => {
      const theme = (context.parameters.themes?.themeOverride ||
        pluckThemeFromContext(context) ||
        "system") as ThemeName;

      return (
        <ThemeHtml theme={theme}>
          <Story />
        </ThemeHtml>
      );
    },
    (Story, context) => (
      <StoryQueryRoot key={context.id}>
        <MotionProvider>
          <Story />
        </MotionProvider>
      </StoryQueryRoot>
    ),
  ],
  initialGlobals: {
    locale: nextIntl.defaultLocale,
    locales: localeCaptions,
  },
  loaders: [mswLoader()],
  parameters: {
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },

    /**
     * Built-in light/dark swatches paint .sb-show-main and would override
     * the iframe <html> page color. Theme toolbar is the only picker.
     */
    backgrounds: {
      disable: true,
    },

    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    nextIntl,
    nextjs: {
      appDirectory: true,
    },
  },
};

export default preview;
