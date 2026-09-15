import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import * as stylex from "@stylexjs/stylex";

import { colors, fonts, spacing } from "@/tokens/generated/tokens.stylex";

import { Scanlines } from "./scanlines";

const meta = {
  component: Scanlines,
  title: "UI/Scanlines",
} satisfies Meta<typeof Scanlines>;

export default meta;

type Story = StoryObj<typeof meta>;

const styles = stylex.create({
  stage: {
    position: "relative",
    minHeight: "12rem",
    padding: spacing.lg,
    overflow: "hidden",
    fontFamily: fonts.mono,
    fontSize: "2rem",
    fontWeight: 800,
    color: colors.foreground,
    textTransform: "uppercase",
    letterSpacing: "0.2em",
    backgroundColor: colors.background,
  },
});

export const Default: Story = {
  args: {
    children: "SIGNAL",
  },
  render: (args) => (
    <div {...stylex.props(styles.stage)}>
      <Scanlines {...args} />
    </div>
  ),
};
