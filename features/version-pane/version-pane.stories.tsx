import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { type ViewportId } from "@/tokens/generated/viewports";

import { VersionPane } from "./version-pane";

const meta = {
  component: VersionPane,
  decorators: [
    (Story) => (
      <div style={{ height: "100dvh", width: "100%" }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "fullscreen",
  },
  title: "Features/Version pane",
} satisfies Meta<typeof VersionPane>;

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
