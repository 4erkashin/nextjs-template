import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { LocaleSwitcher } from "./locale-switcher";

const meta = {
  component: LocaleSwitcher,
  title: "Features/Locale switcher",
} satisfies Meta<typeof LocaleSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
