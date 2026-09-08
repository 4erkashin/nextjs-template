import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { PrimitiveColors } from "./primitive-colors";

const meta = {
  component: PrimitiveColors,
} satisfies Meta<typeof PrimitiveColors>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
