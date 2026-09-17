import * as stylex from "@stylexjs/stylex";
import { clsx } from "clsx";
import { useTranslations } from "next-intl";

import { LocaleSwitcher } from "@/features/locale-switcher";
import { ThemeSwitcher } from "@/features/theme-switcher";
import { version } from "@/package.json";
import { jetbrainsMonoNumeral } from "@/theme/fonts";
import { fonts, spacing } from "@/tokens/generated/tokens.stylex";
import { pageGridStyles } from "@/ui/page-grid";

/**
 * Version poster is a 2×2 of mono cells (`v0` / `01`).
 * `fit` 1 = that axis of the 2×2 fits in the pane (calm).
 * Lower = larger type, more clip (cut). Try 1, then 0.75, then 0.6.
 */
const versionLines = 2;
const versionCells = 2;
const versionLineHeight = 0.8;
const versionCellEm = 0.55;
const versionFitY = 0.9;
const versionFitX = 0.9;
const versionStackEm = versionLines * versionLineHeight * versionFitY;
const versionRowEm = versionCells * versionCellEm * versionFitX;

/**
 * Homepage type for both switcher features. 1.32vw is about 0.22 of
 * the title’s 6vw fluid slope. Floor matches the features’ own 0.875rem.
 */
const switcherFontSize = "clamp(0.875rem, 1.32vw, 1.75rem)";

/**
 * Outer keep-out so interactive controls stay inside the painted
 * canvas. Compresses on a short Storybook iframe.
 */
const canvasInset = "clamp(0.5rem, 2.5dvh, 1.25rem)";

const styles = stylex.create({
  main: {
    position: "relative",
    gridTemplateRows: "minmax(0, 1fr)",
    /**
     * Fill the visible block (window or Storybook iframe). Do not
     * set a min-height in rem — that paints a second, taller frame
     * and hides the foot of the poster.
     */
    height: "100dvh",
    minHeight: 0,
    maxHeight: "100dvh",
    overflow: "hidden",
    fontFamily: fonts.sans,
  },
  /**
   * Every poster layer shares the one canvas row. Without this,
   * auto-placement opens extra rows and the 1fr track collapses.
   */
  canvasLayer: {
    gridRowStart: "1",
  },
  /**
   * Editorial column: stop one track early so version can own the
   * rest of the sheet.
   */
  contentPane: {
    display: "grid",
    gridTemplateRows: "max-content 1fr",
    gridTemplateColumns: "subgrid",
    gridColumnStart: "2",
    gridColumnEnd: "7",
    rowGap: `clamp(${spacing.sm}, 3dvh, 1.5rem)`,
    minWidth: 0,
    minHeight: 0,
    paddingBlock: `clamp(${spacing.md}, 6dvh, 8dvh)`,
  },
  textContent: {
    display: "grid",
    gridTemplateColumns: "subgrid",
    gridColumnStart: "1",
    gridColumnEnd: "-1",
    rowGap: "0.1em",
    fontSize: "clamp(1.75rem, 6vw, 8rem)",
  },
  /**
   * The column *is* the measure. Use every track.
   */
  title: {
    gridColumnStart: "1",
    gridColumnEnd: "-1",
    margin: 0,
    fontSize: "1em",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "-0.03em",
  },
  description: {
    gridColumnStart: "1",
    gridColumnEnd: "-1",
    margin: 0,
    fontSize: "0.3em",
    fontWeight: 300,
    textTransform: "lowercase",
    letterSpacing: "0.03em",
  },
  switcherType: {
    fontSize: switcherFontSize,
  },
  canvasControl: {
    zIndex: 2,
    width: "max-content",
    maxWidth: "100%",
  },
  /**
   * Language stays in the column, packed under the copy.
   * The 1fr row below it is the empty interval down to the foot.
   */
  language: {
    gridColumnStart: "1",
    gridColumnEnd: "-1",
    alignSelf: "start",
    justifySelf: "start",
    width: "max-content",
    maxWidth: "100%",
  },
  /**
   * Low anchor of the same column. Separate object, same axis.
   */
  theme: {
    gridColumnStart: "2",
    gridColumnEnd: "7",
    alignSelf: "end",
    justifySelf: "start",
    marginBlockEnd: canvasInset,
  },
  /**
   * Version takes the tracks the column gave up.
   */
  versionPane: {
    display: "grid",
    gridColumnStart: "7",
    gridColumnEnd: "13",
    placeContent: "center",
    placeItems: "center",
    minWidth: 0,
    minHeight: 0,
    containerType: "inline-size",
    overflow: "hidden",
    pointerEvents: "none",
  },
  line: {
    margin: 0,
    fontSize: `max(calc(100dvh / ${versionStackEm}), calc(100cqi / ${versionRowEm}))`,
    fontWeight: 800,
    fontFeatureSettings: '"zero" 1',
    fontVariantNumeric: "tabular-nums slashed-zero",
    lineHeight: versionLineHeight,
    letterSpacing: "-0.14em",
    whiteSpace: "nowrap",
  },
});

export default function HomePage() {
  const t = useTranslations("HomePage");
  const [major = "0", minor = "0", patch = "0"] = version.split(".");
  const paneProps = stylex.props(styles.canvasLayer, styles.versionPane);

  return (
    <main {...stylex.props(pageGridStyles.root, styles.main)}>
      <div {...stylex.props(styles.canvasLayer, styles.contentPane)}>
        <div {...stylex.props(styles.textContent)}>
          <h1 {...stylex.props(styles.title)}>{t("title")}</h1>

          <p {...stylex.props(styles.description)}>{t("description")}</p>
        </div>

        <div
          {...stylex.props(
            styles.switcherType,
            styles.language,
            styles.canvasControl,
          )}
        >
          <LocaleSwitcher style={styles.switcherType} />
        </div>
      </div>

      <div
        {...stylex.props(
          styles.switcherType,
          styles.canvasLayer,
          styles.canvasControl,
          styles.theme,
        )}
      >
        <ThemeSwitcher style={styles.switcherType} />
      </div>

      <div
        {...paneProps}
        aria-label={version}
        className={clsx(paneProps.className, jetbrainsMonoNumeral.className)}
        role="img"
      >
        <p aria-hidden {...stylex.props(styles.line)}>
          {`v${major}`}
        </p>
        <p aria-hidden {...stylex.props(styles.line)}>
          {`${minor}${patch}`}
        </p>
      </div>
    </main>
  );
}
