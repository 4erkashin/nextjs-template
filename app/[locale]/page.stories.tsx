import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { expect } from "storybook/test";

import HomePage from "./page";

const meta = {
  component: HomePage,
  tags: ["ai-generated"],
} satisfies Meta<typeof HomePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("button", { name: "Trigger error" }),
    ).toHaveAttribute("type", "button");
  },
};

export const CssCheck: Story = {
  play: async ({ canvas }) => {
    const heading = canvas.getByRole("heading", { level: 1 });
    await expect(getComputedStyle(heading).fontFamily).toMatch(/system-ui/);
  },
};
