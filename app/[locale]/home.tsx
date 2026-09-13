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
  const spineProps = stylex.props(styles.spine);

  return (
    <main {...stylex.props(styles.main)}>
      <div {...stylex.props(styles.column, styles.catalog)}>
        <h1 {...stylex.props(styles.title)}>{t("title")}</h1>
        <p {...stylex.props(styles.line)}>{t("description")}</p>
        <div {...stylex.props(styles.mast)}>
          <p
            {...spineProps}
            className={clsx(
              spineProps.className,
              jetbrainsMonoNumeral.className,
            )}
          >
            {t("release")}
          </p>
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
    minHeight: "max(100dvh, 45rem)",
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
  mast: {
    gap: "0.04em",
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "column",
    fontSize: "min(25vw, 20rem)",
    pointerEvents: "none",
    position: "absolute",
    bottom: "-0.16em",
    left: "-0.04em",
  },
  spine: {
    margin: 0,
    fontSize: "0.24em",
    fontWeight: 800,
    letterSpacing: "-0.04em",
    lineHeight: 0.8,
    textTransform: "uppercase",
    whiteSpace: "nowrap",
    writingMode: "vertical-rl",
  },
  numeral: {
    margin: 0,
    fontFeatureSettings: '"zero" 1',
    fontSize: "1em",
    fontVariantNumeric: "tabular-nums slashed-zero",
    fontWeight: 800,
    letterSpacing: "-0.08em",
    lineHeight: 0.8,
    marginInlineStart: "-0.08em",
    whiteSpace: "nowrap",
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
