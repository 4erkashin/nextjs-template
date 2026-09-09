import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { useTranslations } from "next-intl";

import { Button } from "../button";
import { Caret } from "./caret";

const meta = {
  component: Caret,
  title: "UI/Caret",
} satisfies Meta<typeof Caret>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

function CaretOnButton() {
  const t = useTranslations("Error");

  return (
    <Button>
      {">"}
      {t("tryAgain")}
      <Caret />
    </Button>
  );
}

export const WithButton: Story = {
  render: () => <CaretOnButton />,
};
