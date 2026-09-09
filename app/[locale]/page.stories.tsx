import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import HomePage from "./page";

const meta = {
  component: HomePage,
  tags: ["ai-generated"],
  title: "App/Home",
} satisfies Meta<typeof HomePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
