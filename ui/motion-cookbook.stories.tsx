import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { MotionCookbook } from "./motion-cookbook";

const meta = {
  component: MotionCookbook,
} satisfies Meta<typeof MotionCookbook>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
