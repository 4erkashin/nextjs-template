import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { SyncHtmlTheme } from "@/lib/storybook/sync-html-theme";
import {
  fullscreenViewportMatrix,
  viewportLocaleStory,
} from "@/lib/storybook/viewport-matrix";

import HomePage from "./page";

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

Each story is one named viewport. Tiles inside it are
English on the left and one other locale on the right, then
scroll — the pane is not locked to the token pixel size.
        `,
      },
    },
    ...fullscreenViewportMatrix,
  },
  title: "App/Home",
} satisfies Meta<typeof HomePage>;

export default meta;
type Story = StoryObj<typeof meta>;

// Names stay literals. The indexer does not run viewportLocaleStory.
export const PhoneSM: Story = {
  ...viewportLocaleStory(HomePage, "phone-small"),
  name: "Phone SM · 320 × 568",
};

export const PhoneMD: Story = {
  ...viewportLocaleStory(HomePage, "phone"),
  name: "Phone MD · 390 × 844",
};

export const TabletPortrait: Story = {
  ...viewportLocaleStory(HomePage, "tablet-portrait"),
  name: "Tablet Portrait · 768 × 1024",
};

export const Laptop: Story = {
  ...viewportLocaleStory(HomePage, "laptop"),
  name: "Laptop · 1280 × 800",
};

export const Desktop: Story = {
  ...viewportLocaleStory(HomePage, "desktop"),
  name: "Desktop · 1920 × 1080",
};

export const TwoK: Story = {
  ...viewportLocaleStory(HomePage, "qhd"),
  name: "2K · 2560 × 1440",
};

export const FourK: Story = {
  ...viewportLocaleStory(HomePage, "four-k"),
  name: "4K · 3840 × 2160",
};
