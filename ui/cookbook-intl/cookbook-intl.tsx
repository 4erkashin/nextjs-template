"use client";

import * as stylex from "@stylexjs/stylex";
import { useFormatter, useTranslations } from "next-intl";
import { useState } from "react";

import { colors, fonts, spacing } from "../../tokens/generated/tokens.stylex";

// Same instant every render. Switch the locale toolbar, not the clock.
const EXAMPLE_INSTANT = new Date("2026-09-09T16:00:00.000Z");

const styles = stylex.create({
  box: {
    margin: 0,
    padding: spacing.m,
    borderColor: colors.foreground,
    borderStyle: "solid",
    borderWidth: spacing.px,
    gap: spacing.m,
    backgroundColor: colors.background,
    color: colors.foreground,
    display: "flex",
    flexDirection: "column",
    fontFamily: fonts.family,
    fontSize: fonts.size,
  },
});

export function DateTime() {
  const format = useFormatter();

  return (
    <p {...stylex.props(styles.box)}>
      {format.dateTime(EXAMPLE_INSTANT, {
        dateStyle: "long",
        timeStyle: "short",
      })}
    </p>
  );
}

export function Plural() {
  const t = useTranslations("CookbookIntl");
  const [count, setCount] = useState(0);

  return (
    <div {...stylex.props(styles.box)}>
      <p>{t("itemCount", { count })}</p>
      <button onClick={() => setCount((value) => value + 1)} type="button">
        {t("addItem")}
      </button>
    </div>
  );
}
