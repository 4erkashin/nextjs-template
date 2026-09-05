import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { fn } from "storybook/test";

import { EXAMPLE_ERROR_DIGEST } from "@/features/error-widget";

import GlobalError from "./global-error";

const meta = {
  args: {
    error: Object.assign(new Error("Layout failed to render"), {
      digest: EXAMPLE_ERROR_DIGEST,
    }),
    retry: fn(),
  },
  component: GlobalError,
  tags: ["ai-generated"],
} satisfies Meta<typeof GlobalError>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
