import * as stylex from "@stylexjs/stylex";
import { clsx } from "clsx";
import { useTranslations } from "next-intl";

import { LocaleSwitcher } from "@/features/locale-switcher";
import { ThemeSwitcher } from "@/features/theme-switcher";
import { version } from "@/package.json";
import { jetbrainsMonoNumeral } from "@/theme/fonts";
import { colors, fonts, spacing } from "@/tokens/generated/tokens.stylex";
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

/**
 * Portrait uses Monumental Cut. Square counts as portrait in CSS,
 * so the cut is written to hold there too.
 */
const portrait = "@media (orientation: portrait)";

const styles = stylex.create({
  main: {
    position: "relative",
    gridTemplateRows: {
      default: "minmax(0, 1fr)",
      /**
       * Locale, version with held interval, copy, foot hairline.
       */
      [portrait]: "max-content minmax(0, 1fr) max-content max-content",
    },
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
    "::before": {
      display: {
        default: "none",
        [portrait]: "block",
      },
      gridRowStart: {
        [portrait]: "4",
      },
      gridColumnStart: {
        [portrait]: "2",
      },
      gridColumnEnd: {
        [portrait]: "13",
      },
      alignSelf: {
        [portrait]: "start",
      },
      height: {
        [portrait]: 0,
      },
      pointerEvents: {
        [portrait]: "none",
      },
      content: {
        default: null,
        [portrait]: '""',
      },
      borderBlockStartColor: {
        [portrait]: colors.foreground,
      },
      borderBlockStartStyle: {
        [portrait]: "solid",
      },
      borderBlockStartWidth: {
        [portrait]: spacing.px,
      },
    },
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
   * rest of the sheet. Portrait unwraps this wrapper so locale,
   * copy, and version sit on the four-row canvas.
   */
  contentPane: {
    display: {
      default: "grid",
      [portrait]: "contents",
    },
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
    gridRowStart: {
      [portrait]: "3",
    },
    gridColumnStart: {
      default: "1",
      [portrait]: "2",
    },
    gridColumnEnd: {
      default: "-1",
      [portrait]: "9",
    },
    rowGap: "0.1em",
    minWidth: {
      [portrait]: 0,
    },
    paddingBlockEnd: {
      [portrait]: spacing.sm,
    },
    fontSize: {
      default: "clamp(1.75rem, 6vw, 8rem)",
      [portrait]: "clamp(1.1rem, 5.2vw, 2rem)",
    },
    textWrap: {
      [portrait]: "balance",
    },
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
    overflowWrap: "break-word",
  },
  description: {
    gridColumnStart: "1",
    gridColumnEnd: "-1",
    margin: 0,
    fontSize: "0.3em",
    fontWeight: 300,
    textTransform: "lowercase",
    letterSpacing: "0.03em",
    overflowWrap: "break-word",
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
   * Portrait moves it to the top of the sheet.
   */
  language: {
    gridRowStart: {
      [portrait]: "1",
    },
    gridColumnStart: {
      default: "1",
      [portrait]: "2",
    },
    gridColumnEnd: {
      default: "-1",
      [portrait]: "13",
    },
    alignSelf: "start",
    justifySelf: "start",
    width: "max-content",
    maxWidth: "100%",
    marginBlockStart: {
      [portrait]: canvasInset,
    },
  },
  /**
   * Low anchor of the same column. Separate object, same axis.
   * Portrait sits it on the foot hairline, tracks 2–8.
   */
  theme: {
    gridRowStart: {
      [portrait]: "4",
    },
    gridColumnStart: "2",
    gridColumnEnd: {
      default: "7",
      [portrait]: "8",
    },
    alignSelf: "end",
    justifySelf: "start",
    paddingBlockStart: {
      [portrait]: spacing.xs,
    },
    marginBlockEnd: canvasInset,
  },
  /**
   * Version takes the tracks the column gave up. Portrait shifts
   * it right (8–13) and crops it slightly as the upper form.
   */
  versionPane: {
    display: "grid",
    gridRowStart: {
      [portrait]: "2",
    },
    gridColumnStart: {
      default: "7",
      [portrait]: "8",
    },
    gridColumnEnd: "13",
    placeContent: {
      default: "center",
      [portrait]: "start",
    },
    placeItems: {
      default: "center",
      [portrait]: "start",
    },
    alignSelf: {
      [portrait]: "start",
    },
    width: {
      [portrait]: "100%",
    },
    minWidth: 0,
    minHeight: 0,
    containerType: "inline-size",
    overflow: "hidden",
    pointerEvents: "none",
  },
  line: {
    margin: 0,
    fontSize: {
      default: `max(calc(100dvh / ${versionStackEm}), calc(100cqi / ${versionRowEm}))`,
      [portrait]: `max(calc(32dvh / ${versionStackEm}), min(calc(120cqi / ${versionRowEm}), calc(44dvh / ${versionStackEm})))`,
    },
    fontWeight: 800,
    fontFeatureSettings: '"zero" 1',
    fontVariantNumeric: "tabular-nums slashed-zero",
    lineHeight: versionLineHeight,
    letterSpacing: "-0.14em",
    whiteSpace: "nowrap",
  },
});

export function HomePoster() {
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
