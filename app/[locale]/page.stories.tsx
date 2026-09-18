import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { type MouseEvent, type ReactNode } from "react";

import { htmlPropsForTheme } from "@/app/global-styles";
import { THEME_NAMES, type ThemeName } from "@/theme/cookie";
import { writeHtmlTheme } from "@/theme/html-theme";

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

/**
 * Lock this story to an exact canvas. Storybook 10.5 accepts
 * `{width}-{height}` so the rung does not inherit the toolbar.
 */
function lockedViewport(width: number, height: number) {
  return {
    isRotated: false,
    value: `${width}-${height}`,
  };
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

These stories are fixed-size review rungs of that production page,
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

export const PhoneSmall: Story = {
  globals: {
    viewport: lockedViewport(320, 568),
  },
  name: "01 — Phone Small · 320 × 568",
};

export const Phone: Story = {
  globals: {
    viewport: lockedViewport(390, 844),
  },
  name: "02 — Phone · 390 × 844",
};

export const TabletPortrait: Story = {
  globals: {
    viewport: lockedViewport(768, 1024),
  },
  name: "03 — Tablet Portrait · 768 × 1024",
};

export const Laptop: Story = {
  globals: {
    viewport: lockedViewport(1280, 800),
  },
  name: "04 — Laptop · 1280 × 800",
};

export const Desktop: Story = {
  globals: {
    viewport: lockedViewport(1920, 1080),
  },
  name: "05 — Desktop · 1920 × 1080",
};

export const Qhd: Story = {
  globals: {
    viewport: lockedViewport(2560, 1440),
  },
  name: "06 — QHD · 2560 × 1440",
};

export const FourK: Story = {
  globals: {
    viewport: lockedViewport(3840, 2160),
  },
  name: "07 — 4K · 3840 × 2160",
};
