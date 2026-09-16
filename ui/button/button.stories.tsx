import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { useTranslations } from "next-intl";
import { fn } from "storybook/test";

import { Button } from "./button";

const meta = {
  component: Button,
  title: "UI/Button",
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

function NeutralButton() {
  const t = useTranslations("Error");

  return <Button onClick={fn()}>{t("tryAgain")}</Button>;
}

export const Default: Story = {
  render: () => <NeutralButton />,
};
