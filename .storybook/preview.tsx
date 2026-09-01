import type { Preview } from "@storybook/nextjs-vite";

import { QueryClientProvider } from "@tanstack/react-query";
import { mswLoader } from "msw-storybook-addon/csf3";
import { type ReactNode, useState } from "react";

import { makeQueryClient } from "../lib/query/query-client";
import { mswHandlers } from "./msw-handlers";

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

const preview: Preview = {
  async beforeEach({ msw }) {
    msw.use(...mswHandlers);
  },
  decorators: [
    (Story, context) => (
      <StoryQueryRoot key={context.id}>
        <Story />
      </StoryQueryRoot>
    ),
  ],
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

    nextjs: {
      appDirectory: true,
    },
  },
};

export default preview;
