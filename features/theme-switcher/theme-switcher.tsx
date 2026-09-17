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
    backgroundColor: colors.foreground,
  },
  cut: {
    alignSelf: "stretch",
    inlineSize: "0.5em",
    backgroundColor: "transparent",
  },
  name: {
    fontFamily: fonts.sans,
    fontSize: "1em",
    fontWeight: 600,
    lineHeight: 1,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    whiteSpace: "nowrap",
  },
  option: {
    boxSizing: "border-box",
    display: "grid",
    gridTemplateColumns: "auto minmax(0, 1fr)",
    columnGap: "0.5em",
    alignItems: "center",
    inlineSize: "100%",
    /**
     * Floor 2.75rem; grow with this feature's type. Pending is an
     * inset hairline so the cut can sit on the box's start edge.
     */
    minBlockSize: "max(2.75rem, 2.75em)",
    paddingBlock: 0,
    paddingInlineStart: 0,
    paddingInlineEnd: "0.5em",
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
    /**
     * Inside the option so a flush start edge does not clip the
     * ring on the viewport-facing side.
     */
    outlineOffset: `calc(-1 * ${spacing.px} - ${spacing.xxs})`,
    backgroundColor: {
      default: "transparent",
      ":hover": colors.foreground,
    },
    borderColor: "transparent",
    borderStyle: "solid",
    borderWidth: 0,
    transform: {
      default: "none",
      ":active": `translateX(${spacing.px})`,
    },
  },
  pending: {
    boxShadow: `inset ${spacing.px} 0 0 currentColor`,
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
      {THEME_NAMES.map((item) => {
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
            <span {...stylex.props(styles.name)}>{t(item)}</span>
          </BaseButton>
        );
      })}
    </nav>
  );
}
