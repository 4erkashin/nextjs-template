"use client";

import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import * as stylex from "@stylexjs/stylex";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { colors, fonts } from "@/tokens/generated/tokens.stylex";

import { Button } from "../button";
import { Caret } from "../caret";
import { Glitch } from "./glitch";

const meta = {
  component: Glitch,
  title: "UI/Glitch",
} satisfies Meta<typeof Glitch>;

export default meta;

type Story = StoryObj<typeof meta>;

function HoverGlitch() {
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
      <Glitch active={active}>SIGNAL</Glitch>
    </span>
  );
}

export const Default: Story = {
  render: () => <HoverGlitch />,
};

function GlitchOnButton() {
  const t = useTranslations("Error");
  const [active, setActive] = useState(false);

  return (
    <Button
      onMouseEnter={() => {
        setActive(true);
      }}
      onMouseLeave={() => {
        setActive(false);
      }}
    >
      <Glitch active={active}>
        {">"}
        {t("tryAgain")}
        <Caret />
      </Glitch>
    </Button>
  );
}

export const WithButton: Story = {
  render: () => <GlitchOnButton />,
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
