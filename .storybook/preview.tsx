import type { Preview } from "@storybook/nextjs-vite";

import { withThemeFromJSXProvider } from "@storybook/addon-themes";
import { QueryClientProvider } from "@tanstack/react-query";
import { mswLoader } from "msw-storybook-addon/csf3";
import { type ReactNode, useState } from "react";

import type { ThemeName } from "../theme/cookie";

import { makeQueryClient } from "../lib/query/query-client";
import { themeRootProps } from "../theme/root-props";
import { themes } from "../tokens/generated/themes";
import { mswHandlers } from "./msw-handlers";
import nextIntl from "./next-intl";

import "../app/globals.css";

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

function StylexThemeProvider({
  children,
  theme,
}: Readonly<{
  children?: ReactNode;
  theme?: (typeof themes)[ThemeName];
}>) {
  const name: ThemeName =
    theme === themes.dark
      ? "dark"
      : theme === themes.light
        ? "light"
        : "system";

  return <div {...themeRootProps(name)}>{children}</div>;
}

const preview: Preview = {
  async beforeEach({ msw }) {
    msw.use(...mswHandlers);
  },
  decorators: [
    withThemeFromJSXProvider({
      defaultTheme: "system",
      Provider: StylexThemeProvider,
      themes: {
        dark: themes.dark,
        light: themes.light,
        system: themes.system,
      },
    }),
    (Story, context) => (
      <StoryQueryRoot key={context.id}>
        <Story />
      </StoryQueryRoot>
    ),
  ],
  initialGlobals: {
    locale: "en",
    locales: {
      en: "EN",
      "pt-BR": "PT-BR",
      ru: "RU",
      uk: "UA",
    },
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
