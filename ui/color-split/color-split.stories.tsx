"use client";

import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import * as stylex from "@stylexjs/stylex";
import { useState } from "react";

import { colors, fonts } from "@/tokens/generated/tokens.stylex";

import { Glitch } from "../glitch";
import { ColorSplit } from "./color-split";

const meta = {
  component: ColorSplit,
  title: "UI/Color split",
} satisfies Meta<typeof ColorSplit>;

export default meta;

type Story = StoryObj<typeof meta>;

function HoverSplit() {
  const [active, setActive] = useState(false);

  return (
    <span
      onMouseEnter={() => {
        setActive(true);
      }}
      onMouseLeave={() => {
        setActive(false);
      }}
      {...stylex.props(styles.solo)}
    >
      <Glitch active={active}>
        <ColorSplit active={active}>SIGNAL</ColorSplit>
      </Glitch>
    </span>
  );
}

export const Default: Story = {
  render: () => <HoverSplit />,
};

const styles = stylex.create({
  solo: {
    color: colors.foreground,
    cursor: "pointer",
    fontFamily: fonts.mono,
    fontSize: "2rem",
    fontWeight: 800,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
  },
});
