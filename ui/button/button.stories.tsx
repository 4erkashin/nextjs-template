import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import * as stylex from "@stylexjs/stylex";
import { useTranslations } from "next-intl";
import { fn } from "storybook/test";

import { colors, spacing } from "@/tokens/generated/tokens.stylex";

import { Button, type ButtonShape, type ButtonSurface } from "./button";

const shapes = ["tab", "slash", "rect"] as const satisfies ButtonShape[];
const surfaces = ["fill", "outline"] as const satisfies ButtonSurface[];

const layout = stylex.create({
  stack: {
    display: "flex",
    flexDirection: "column",
    gap: spacing.lg,
  },
  row: {
    display: "flex",
    flexWrap: "wrap",
    gap: spacing.md,
    alignItems: "flex-end",
  },
  option: {
    display: "flex",
    flexDirection: "column",
    gap: spacing.sm,
  },
  label: {
    margin: 0,
    color: colors.foreground,
  },
  column: {
    display: "flex",
    flexDirection: "column",
    gap: spacing.sm,
  },
});

const meta = {
  component: Button,
  title: "UI/Button",
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

function Surfaces() {
  const t = useTranslations("Error");

  return (
    <div {...stylex.props(layout.stack)}>
      {surfaces.map((surface) => (
        <div key={surface} {...stylex.props(layout.row)}>
          {shapes.map((shape) => (
            <div key={shape} {...stylex.props(layout.option)}>
              <p {...stylex.props(layout.label)}>
                {surface} {shape}
              </p>
              <Button onClick={fn()} shape={shape} surface={surface}>
                {t("tryAgain")}
              </Button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function StretchColumn() {
  const t = useTranslations("Error");

  return (
    <div {...stylex.props(layout.column)}>
      <Button onClick={fn()} surface="fill" width="stretch">
        {t("tryAgain")}
      </Button>
      <Button onClick={fn()} surface="outline" width="stretch">
        {t("tryAgain")}
      </Button>
    </div>
  );
}

export const Default: Story = {
  render: () => <Surfaces />,
};

export const Stretch: Story = {
  render: () => <StretchColumn />,
};
