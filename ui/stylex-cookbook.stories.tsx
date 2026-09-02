import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { StylexCookbook } from "./stylex-cookbook";

const meta = {
  component: StylexCookbook,
} satisfies Meta<typeof StylexCookbook>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
