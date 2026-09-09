import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { SemanticColors } from "./semantic-colors";

const meta = {
  component: SemanticColors,
  title: "Tokens/Semantic colors",
} satisfies Meta<typeof SemanticColors>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
