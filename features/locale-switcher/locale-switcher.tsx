"use client";

import * as stylex from "@stylexjs/stylex";
import { useLocale } from "next-intl";

import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { colors, fonts, spacing } from "@/tokens/generated/tokens.stylex";

const labels = {
  en: "EN",
  "pt-BR": "PT-BR",
  ru: "RU",
  uk: "UA",
} as const;

const styles = stylex.create({
  current: {
    color: colors.background,
    backgroundColor: colors.foreground,
  },
  link: {
    boxSizing: "border-box",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    /**
     * Floor 2.75rem; grow with this feature's type. Short codes
     * land square-like. PT-BR is longer and widens on its own.
     */
    minInlineSize: "max(2.75rem, 2.75em)",
    minBlockSize: "max(2.75rem, 2.75em)",
    paddingInline: "0.35em",
    fontFamily: fonts.sans,
    fontSize: "1em",
    fontWeight: 600,
    lineHeight: 1,
    color: colors.foreground,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    whiteSpace: "nowrap",
    textDecorationLine: "none",
    outlineWidth: spacing.px,
    outlineStyle: "solid",
    outlineColor: {
      default: "transparent",
      ":focus-visible": colors.foreground,
    },
    outlineOffset: spacing.xxs,
    backgroundColor: "transparent",
  },
  rest: {
    color: {
      default: colors.foreground,
      ":hover": colors.background,
    },
    backgroundColor: {
      default: "transparent",
      ":hover": colors.foreground,
    },
  },
  root: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    fontSize: "0.875rem",
  },
});

export type LocaleSwitcherProps = Readonly<{
  style?: SwitcherRootStyle;
}>;

type SwitcherRootStyle = stylex.StyleXStyles<
  Pick<stylex.CSSProperties, "fontSize">
>;

export function LocaleSwitcher({ style }: LocaleSwitcherProps) {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <nav {...stylex.props(styles.root, style)}>
      {routing.locales.map((item) => {
        const current = item === locale;

        return (
          <Link
            aria-current={current ? "true" : undefined}
            href={pathname}
            hrefLang={item}
            key={item}
            locale={item}
            {...stylex.props(
              styles.link,
              current ? styles.current : styles.rest,
            )}
          >
            {labels[item]}
          </Link>
        );
      })}
    </nav>
  );
}
