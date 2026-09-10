import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { useTranslations } from "next-intl";
import { fn } from "storybook/test";

import { RetryButton } from "./retry-button";

const meta = {
  component: RetryButton,
  title: "Features/Error widget/Retry button",
} satisfies Meta<typeof RetryButton>;

export default meta;

type Story = StoryObj<typeof meta>;

function Play() {
  const t = useTranslations("Error");

  return <RetryButton onClick={fn()}>{t("tryAgain")}</RetryButton>;
}

export const Default: Story = {
  render: () => <Play />,
};
