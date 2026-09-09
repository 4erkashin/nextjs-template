import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { fn } from "storybook/test";

import { EXAMPLE_ERROR_DIGEST } from "@/.storybook/error-digest";

import ErrorPage from "./error";

const meta = {
  args: {
    error: Object.assign(new Error("Example error"), {
      digest: EXAMPLE_ERROR_DIGEST,
    }),
    retry: fn(),
  },
  component: ErrorPage,
  tags: ["ai-generated"],
  title: "App/Error",
} satisfies Meta<typeof ErrorPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
