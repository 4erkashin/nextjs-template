import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { fn } from "storybook/test";

import { EXAMPLE_ERROR_DIGEST } from "./error-page";
import { ErrorWidget } from "./error-widget";

const meta = {
  args: {
    description: "The page failed before it could render.",
    digest: EXAMPLE_ERROR_DIGEST,
    onRetry: fn(),
    title: "This view could not be loaded.",
    tryAgain: "Try again",
  },
  component: ErrorWidget,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof ErrorWidget>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutDigest: Story = {
  args: {
    digest: undefined,
  },
};
