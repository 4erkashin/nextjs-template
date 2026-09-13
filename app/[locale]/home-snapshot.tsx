import * as stylex from "@stylexjs/stylex";
import { clsx } from "clsx";
import { useTranslations } from "next-intl";

import { version } from "@/package.json";
import { jetbrainsMonoNumeral } from "@/theme/fonts";
import { colors, fonts, spacing } from "@/tokens/generated/tokens.stylex";
import { SwitcherLocale, SwitcherTheme } from "@/ui";
import { pageGridStyles } from "@/ui/page-grid";

/**
 * Home as it was after the 12-column shell. Not a route.
 * Keep this file while the live page is a new try.
 */
export function HomeSnapshot() {
  const t = useTranslations("HomePage");
  const numeral = version.replaceAll(".", "");
  const numeralProps = stylex.props(styles.numeral);
  const spineProps = stylex.props(styles.spine);

  return (
    <main {...stylex.props(pageGridStyles.root, styles.main)}>
      <div {...stylex.props(styles.column, styles.paneStart, styles.catalog)}>
        <div {...stylex.props(styles.point)}>
          <h1 {...stylex.props(styles.title)}>{t("title")}</h1>
          <p {...stylex.props(styles.line)}>{t("description")}</p>
        </div>
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
      <div {...stylex.props(styles.column, styles.paneEnd)}>
        <div {...stylex.props(styles.codes)}>
          <SwitcherLocale />
          <SwitcherTheme />
        </div>
        <div aria-hidden {...stylex.props(styles.mass)} />
      </div>
    </main>
  );
}

/** Giant type on the left. Copy sits just above the numeral in this size. */
const mastSize = "min(25vw, 20rem)";

const styles = stylex.create({
  main: {
    overflow: "hidden",
    paddingBlock: spacing.md,
    fontFamily: fonts.mono,
    position: "relative",
    minHeight: "max(100dvh, 45rem)",
  },
  /**
   * Two halves of the 12-column sheet until items get their own spans.
   * Line 7 is the midpoint.
   */
  paneStart: {
    gridColumnEnd: "7",
    gridColumnStart: "1",
  },
  paneEnd: {
    gridColumnEnd: "13",
    gridColumnStart: "7",
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
    fontSize: mastSize,
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
  point: {
    gap: spacing.xs,
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    zIndex: 1,
    bottom: `calc(${mastSize} * 0.64 + ${spacing.sm})`,
    left: `calc(${mastSize} * 0.28)`,
    maxWidth: "18rem",
  },
  title: {
    margin: 0,
    fontSize: "0.75rem",
    fontWeight: 800,
    letterSpacing: "-0.04em",
    lineHeight: 1.2,
  },
  line: {
    margin: 0,
    fontSize: "0.75rem",
    lineHeight: 1.35,
  },
});
