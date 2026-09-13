import * as stylex from "@stylexjs/stylex";
import { clsx } from "clsx";
import { useTranslations } from "next-intl";

import { version } from "@/package.json";
import { type ThemeName } from "@/theme/cookie";
import { jetbrainsMonoNumeral } from "@/theme/fonts";
import { colors, fonts, spacing } from "@/tokens/generated/tokens.stylex";
import { SwitcherLocale, SwitcherTheme } from "@/ui";

/**
 * Home cover. The route fills `theme` from the cookie. Stories pass
 * the toolbar theme so the switcher matches the iframe.
 */
export function Home({ theme }: Readonly<{ theme: ThemeName }>) {
  const t = useTranslations("HomePage");
  const numeral = version.replaceAll(".", "");
  const numeralProps = stylex.props(styles.numeral);

  return (
    <main {...stylex.props(styles.main)}>
      <div {...stylex.props(styles.column, styles.catalog)}>
        <h1 {...stylex.props(styles.title)}>{t("title")}</h1>
        <p {...stylex.props(styles.line)}>{t("description")}</p>
        <p
          {...numeralProps}
          aria-label={version}
          className={clsx(
            numeralProps.className,
            jetbrainsMonoNumeral.className,
          )}
        >
          {numeral}
        </p>
      </div>
      <div {...stylex.props(styles.column)}>
        <div {...stylex.props(styles.codes)}>
          <SwitcherLocale />
          <SwitcherTheme theme={theme} />
        </div>
        <div aria-hidden {...stylex.props(styles.mass)} />
      </div>
    </main>
  );
}

const styles = stylex.create({
  main: {
    gap: spacing.md,
    overflow: "hidden",
    paddingBlock: spacing.md,
    paddingInline: spacing.md,
    boxSizing: "border-box",
    display: "grid",
    fontFamily: fonts.mono,
    gridTemplateColumns: "1fr 1fr",
    position: "relative",
    minHeight: "100dvh",
  },
  column: {
    gap: spacing.md,
    display: "flex",
    flexDirection: "column",
    minHeight: 0,
  },
  catalog: {
    overflow: "hidden",
    position: "relative",
    marginBottom: `calc(-1 * ${spacing.md})`,
    marginLeft: `calc(-1 * ${spacing.md})`,
    paddingLeft: spacing.md,
  },
  codes: {
    gap: spacing.md,
    display: "flex",
    justifyContent: "space-between",
  },
  mass: {
    backgroundColor: colors.foreground,
    flexBasis: "auto",
    flexGrow: "1",
    flexShrink: "1",
    minHeight: "8rem",
  },
  /**
   * Catalog number on the reference: heavy type bled off the left
   * and bottom edges. Dots drop out so 0.0.1 reads as 001.
   * `zero` is JetBrains Mono's slashed 0 (the default 0 is dotted).
   */
  numeral: {
    margin: 0,
    fontFeatureSettings: '"zero" 1',
    fontSize: "min(44vh, 36vw)",
    fontVariantNumeric: "tabular-nums slashed-zero",
    fontWeight: 800,
    letterSpacing: "-0.08em",
    lineHeight: 0.62,
    pointerEvents: "none",
    position: "absolute",
    whiteSpace: "nowrap",
    bottom: "-0.1em",
    left: "-0.15em",
  },
  title: {
    margin: 0,
    fontSize: "1.5rem",
    fontWeight: 800,
    letterSpacing: "-0.04em",
    lineHeight: 1.1,
  },
  line: {
    margin: 0,
    fontSize: "0.875rem",
    lineHeight: 1.4,
  },
});
