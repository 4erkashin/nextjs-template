import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { expect, fn } from "storybook/test";

import GlobalError from "./global-error";

const meta = {
  args: {
    error: new Error("Layout failed to render"),
    retry: fn(),
  },
  component: GlobalError,
  tags: ["ai-generated"],
} satisfies Meta<typeof GlobalError>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvas }) => {
    await expect(canvas.getByRole("paragraph")).toHaveTextContent(
      args.error.message,
    );
  },
};

export const TryAgain: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Try again" }));
    await expect(args.retry).toHaveBeenCalledOnce();
  },
};
