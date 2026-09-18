import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { type MouseEvent, type ReactNode } from "react";

import { htmlPropsForTheme } from "@/app/global-styles";
import { THEME_NAMES, type ThemeName } from "@/theme/cookie";
import { writeHtmlTheme } from "@/theme/html-theme";
import { type ViewportId } from "@/tokens/generated/viewports";

import HomePage from "./page";

function classesFrom(className: undefined | string): string[] {
  return className?.split(/\s+/).filter(Boolean) ?? [];
}

/**
 * Storybook has no layout re-render after the cookie write.
 * Paint the iframe html so the shipped switcher can show the
 * theme it just asked for.
 */
function paintStoryTheme(theme: ThemeName) {
  const html = document.documentElement;

  for (const name of THEME_NAMES) {
    const { className } = htmlPropsForTheme(name);
    const classes = classesFrom(className);

    if (classes.length > 0) {
      html.classList.remove(...classes);
    }
  }

  const { className, style } = htmlPropsForTheme(theme);
  const next = classesFrom(className);

  if (next.length > 0) {
    html.classList.add(...next);
  }

  if (style) {
    Object.assign(html.style, style);
  }

  writeHtmlTheme(theme);
}

function SyncHtmlTheme({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div
      onClickCapture={(event: MouseEvent<HTMLDivElement>) => {
        const host = event.currentTarget;
        const button = (event.target as HTMLElement).closest("button");

        if (!button || !host.contains(button)) {
          return;
        }

        const index = [...host.querySelectorAll("button")].indexOf(button);
        const name = THEME_NAMES[index];

        if (name) {
          paintStoryTheme(name);
        }
      }}
    >
      {children}
    </div>
  );
}

const meta = {
  component: HomePage,
  decorators: [
    (Story) => (
      <SyncHtmlTheme>
        <Story />
      </SyncHtmlTheme>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: `
Home page as a single 100dvh poster. Portrait uses Monumental Cut:
locale stacked on the left rail, version covering the field, copy
under that field, and theme as a row on the bottom-right with the
cut on the sheet edge. Landscape keeps the wide column-and-version
composition.

These stories are fixed-size viewports of that production page,
not design alternatives.
        `,
      },
    },
    layout: "fullscreen",
  },
  title: "App/Home",
} satisfies Meta<typeof HomePage>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Lock this story to a named viewport from tokens.
 * The toolbar cannot override the lock.
 */
function viewportStory(id: ViewportId): Story {
  return {
    globals: {
      viewport: {
        isRotated: false,
        value: id,
      },
    },
  };
}

export const PhoneSM: Story = viewportStory("phone-small");

export const PhoneMD: Story = viewportStory("phone");

export const TabletPortrait: Story = viewportStory("tablet-portrait");

export const Laptop: Story = viewportStory("laptop");

export const Desktop: Story = viewportStory("desktop");

export const TwoK: Story = {
  ...viewportStory("qhd"),
  name: "2K",
};

export const FourK: Story = {
  ...viewportStory("four-k"),
  name: "4K",
};
