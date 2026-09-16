"use client";

import { Button as BaseButton } from "@base-ui/react/button";
import * as stylex from "@stylexjs/stylex";
import { useTranslations } from "next-intl";
import { useSyncExternalStore, useTransition } from "react";

import { setTheme } from "@/theme/actions";
import { THEME_NAMES, type ThemeName } from "@/theme/cookie";
import { readHtmlTheme, subscribeHtmlTheme } from "@/theme/html-theme";
import { colors, fonts, spacing } from "@/tokens/generated/tokens.stylex";

const styles = stylex.create({
  currentCut: {
    backgroundColor: "currentColor",
  },
  cut: {
    width: spacing.sm,
    backgroundColor: "transparent",
  },
  index: {
    display: "flex",
    alignItems: "center",
    fontFamily: fonts.mono,
    fontSize: "1.5rem",
    fontWeight: 800,
    letterSpacing: "-0.08em",
  },
  name: {
    display: "flex",
    alignItems: "center",
    fontFamily: fonts.sans,
    fontSize: "0.75rem",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.12em",
  },
  option: {
    boxSizing: "border-box",
    display: "grid",
    gridTemplateColumns: "auto auto minmax(0, 1fr)",
    columnGap: spacing.sm,
    alignItems: "stretch",
    width: "100%",
    minHeight: "2.75rem",
    paddingBlock: 0,
    paddingInline: 0,
    font: "inherit",
    color: {
      default: colors.foreground,
      ":hover": colors.background,
    },
    textAlign: "start",
    cursor: "pointer",
    outlineWidth: spacing.px,
    outlineStyle: "solid",
    outlineColor: {
      default: "transparent",
      ":focus-visible": "currentColor",
    },
    outlineOffset: spacing.xxs,
    backgroundColor: {
      default: "transparent",
      ":hover": colors.foreground,
    },
    borderStyle: "none",
    transform: {
      default: "none",
      ":active": `translateX(${spacing.px})`,
    },
  },
  pending: {
    borderInlineStartColor: "currentColor",
    borderInlineStartStyle: "solid",
    borderInlineStartWidth: spacing.px,
  },
  restIndex: {
    opacity: 0.4,
  },
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    fontSize: "0.875rem",
  },
});

export type ThemeSwitcherProps = Readonly<{
  style?: SwitcherRootStyle;
}>;

type SwitcherRootStyle = stylex.StyleXStyles<
  Pick<stylex.CSSProperties, "fontSize">
>;

export function ThemeSwitcher({ style }: ThemeSwitcherProps) {
  const t = useTranslations("Theme");
  const [isPending, startTransition] = useTransition();
  const theme = useSyncExternalStore(
    subscribeHtmlTheme,
    readHtmlTheme,
    (): ThemeName => "system",
  );

  return (
    <nav aria-label={t("label")} {...stylex.props(styles.root, style)}>
      {THEME_NAMES.map((item, index) => {
        const current = item === theme;
        const pending = isPending && current;

        return (
          <BaseButton
            aria-busy={pending ? true : undefined}
            aria-current={current ? "true" : undefined}
            key={item}
            nativeButton
            onClick={() => {
              startTransition(() => {
                void setTheme(item);
              });
            }}
            type="button"
            {...stylex.props(styles.option, pending && styles.pending)}
          >
            <span
              {...stylex.props(
                styles.cut,
                current && !pending && styles.currentCut,
              )}
            />
            <span {...stylex.props(styles.index, !current && styles.restIndex)}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <span {...stylex.props(styles.name)}>{t(item)}</span>
          </BaseButton>
        );
      })}
    </nav>
  );
}
