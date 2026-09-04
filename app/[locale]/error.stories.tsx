import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { expect, fn } from "storybook/test";

import ErrorPage from "./error";

const meta = {
  args: {
    error: Object.assign(new Error("Triggered from the home page"), {
      digest: "abc123",
    }),
    retry: fn(),
  },
  component: ErrorPage,
  tags: ["ai-generated"],
} satisfies Meta<typeof ErrorPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("heading", {
        name: "This view could not be loaded.",
      }),
    ).toBeVisible();
    await expect(
      canvas.getByText("The page failed before it could render."),
    ).toBeVisible();
    await expect(canvas.getByText("Ref abc123")).toBeVisible();
  },
};

export const TryAgain: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Try again" }));
    await expect(args.retry).toHaveBeenCalledOnce();
  },
};
