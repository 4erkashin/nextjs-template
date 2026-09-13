import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { DecoratorHelpers } from "@storybook/addon-themes";

import { type ThemeName } from "@/theme/cookie";

import { Home } from "./home";

const { pluckThemeFromContext } = DecoratorHelpers;

const meta = {
  args: {
    theme: "system",
  },
  component: Home,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["ai-generated"],
  title: "App/Home",
} satisfies Meta<typeof Home>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (_args, context) => {
    const theme = (pluckThemeFromContext(context) || "system") as ThemeName;

    return <Home theme={theme} />;
  },
};
