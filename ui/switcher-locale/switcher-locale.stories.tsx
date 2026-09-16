import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { SwitcherLocale } from "./switcher-locale";

const meta = {
  component: SwitcherLocale,
  title: "UI/Locale switcher",
} satisfies Meta<typeof SwitcherLocale>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
