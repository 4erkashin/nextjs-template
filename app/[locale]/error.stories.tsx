import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { expect, fn } from "storybook/test";

import ErrorPage from "./error";

const meta = {
  args: {
    error: new Error("Triggered from the home page"),
    retry: fn(),
  },
  component: ErrorPage,
  tags: ["ai-generated"],
} satisfies Meta<typeof ErrorPage>;

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
