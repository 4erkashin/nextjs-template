import type { Preview } from "@storybook/nextjs-vite";

import { DecoratorHelpers } from "@storybook/addon-themes";
import { QueryClientProvider } from "@tanstack/react-query";
import { mswLoader } from "msw-storybook-addon/csf3";
import { type ReactNode, useState } from "react";

import { MotionProvider } from "@/lib/motion/provider";
import { makeQueryClient } from "@/lib/query/query-client";
import { THEME_NAMES, type ThemeName } from "@/theme/cookie";
import { themeRootProps } from "@/theme/root-props";

import { mswHandlers } from "./msw-handlers";
import nextIntl from "./next-intl";

import "@/app/globals.css";

const { initializeThemeState, pluckThemeFromContext } = DecoratorHelpers;

// Puts light / dark / system in the toolbar. Default is "system".
initializeThemeState([...THEME_NAMES], "system");

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
     * Pass that name into themeRootProps — same as the app.
     * Empty (toolbar not ready yet) → "system".
     */
    (Story, context) => {
      const theme = (context.parameters.themes?.themeOverride ||
        pluckThemeFromContext(context) ||
        "system") as ThemeName;

      return (
        <div {...themeRootProps(theme)}>
          <Story />
        </div>
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
