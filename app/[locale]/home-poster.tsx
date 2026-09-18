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
 * Version is a 2-line stack (`v0` / `01`). Type is pane height ÷
 * that stack (1.6em) so the mass meets top and bottom. Width is
 * leftover air, not a second fit: taking the larger of height
 * and width overflows the sheet on any pane shorter than about
 * 1.62× its width.
 *
 * Portrait packs that stack start on phones (cut the right).
 * From 48rem, still-portrait packs end (cut the left).
 * Landscape keeps the stack centered in the right tracks.
 */
const versionLines = 2;
const versionLineHeight = 0.8;
const versionStackEm = versionLines * versionLineHeight;

/**
 * Chrome is locale, caption, and theme. 1.32vw is about 0.22 of
 * the landscape title’s 6vw slope. Floor matches 0.875rem.
 * Portrait title is φ × chrome.
 */
const phi = 1.618;
const switcherFontSize = "clamp(0.875rem, 1.32vw, 1.75rem)";
const titleFromChrome = `clamp(calc(0.875rem * ${phi}), calc(1.32vw * ${phi}), calc(1.75rem * ${phi}))`;
/**
 * Portrait copy: a short pause under the field (the mass fills
 * that 1fr), pack the theme row.
 */
const copyAir = "clamp(0.75rem, 4dvh, 1.75rem)";
const copyToTheme = "clamp(0.5rem, 2.5dvh, 1.25rem)";

/**
 * Portrait uses Monumental Cut. Square counts as portrait in CSS,
 * so the cut is written to hold there too. `portraitWide` is
 * tablet-and-up, still portrait (48rem = 768px at 16px root).
 */
const portrait = "@media (orientation: portrait)";
const portraitWide =
  "@media (orientation: portrait) and (min-width: 48rem)";

const styles = stylex.create({
  main: {
    position: "relative",
    gridTemplateRows: {
      default: "minmax(0, 1fr)",
      /**
       * Field (locale + mass), then copy, then the theme row.
       * Padding on the copy is the air: more under the field,
       * less above the theme row.
       */
      [portrait]: "minmax(0, 1fr) max-content max-content",
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
   * copy, and version sit on the three-row canvas.
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
      [portrait]: "2",
    },
    gridColumnStart: {
      default: "1",
      [portrait]: "2",
    },
    gridColumnEnd: {
      default: "-1",
      [portrait]: "11",
    },
    rowGap: "0.1em",
    minWidth: {
      [portrait]: 0,
    },
    paddingBlockStart: {
      [portrait]: copyAir,
    },
    paddingBlockEnd: {
      [portrait]: copyToTheme,
    },
    fontSize: {
      default: "clamp(1.75rem, 6vw, 8rem)",
      [portrait]: titleFromChrome,
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
    lineHeight: {
      [portrait]: 1.1,
    },
    overflowWrap: "break-word",
    textWrap: {
      [portrait]: "balance",
    },
  },
  description: {
    gridColumnStart: "1",
    gridColumnEnd: "-1",
    margin: 0,
    fontSize: {
      default: "0.3em",
      [portrait]: switcherFontSize,
    },
    fontWeight: 300,
    textTransform: "lowercase",
    letterSpacing: "0.03em",
    overflowWrap: "break-word",
  },
  switcherType: {
    fontSize: switcherFontSize,
  },
  /**
   * Portrait stacks the codes on the left rail. Landscape stays
   * a row under the copy.
   */
  localeOnPoster: {
    flexDirection: {
      default: "row",
      [portrait]: "column",
    },
    alignItems: {
      default: "center",
      [portrait]: "stretch",
    },
    fontSize: switcherFontSize,
  },
  /**
   * Portrait turns each code 90° clockwise so it reads down.
   */
  localeCodes: {
    writingMode: {
      default: "horizontal-tb",
      [portrait]: "vertical-rl",
    },
    textOrientation: {
      default: "mixed",
      [portrait]: "sideways",
    },
  },
  canvasControl: {
    zIndex: 2,
    width: "max-content",
    maxWidth: "100%",
  },
  /**
   * Language stays in the column, packed under the copy.
   * The 1fr row below it is the empty interval down to the foot.
   * Portrait pins a vertical stack to the top-left of the field.
   */
  language: {
    gridRowStart: {
      [portrait]: "1",
    },
    gridColumnStart: "1",
    gridColumnEnd: {
      default: "-1",
      [portrait]: "8",
    },
    alignSelf: "start",
    justifySelf: "start",
    width: "max-content",
    maxWidth: "100%",
  },
  /**
   * Landscape: first column, flush to the bottom. The active cut
   * meets the left viewport edge. Portrait: a row in the
   * bottom-right; the cut pinches the sheet’s block-end.
   */
  theme: {
    gridRowStart: {
      default: "1",
      [portrait]: "3",
    },
    gridColumnStart: "1",
    gridColumnEnd: {
      default: "7",
      [portrait]: "13",
    },
    alignSelf: "end",
    justifySelf: {
      default: "start",
      [portrait]: "end",
    },
  },
  /**
   * Version takes the tracks the column gave up. Portrait starts
   * at track 3 so the locale rail keeps track 2. Type follows
   * pane height so the stack meets the pane. Phones pack start
   * (cut the right); wider portraits pack end (cut the left).
   */
  versionPane: {
    display: "grid",
    gridColumnStart: {
      default: "7",
      [portrait]: "3",
    },
    gridColumnEnd: "13",
    placeContent: {
      default: "center",
      [portrait]: "center start",
      [portraitWide]: "center end",
    },
    placeItems: {
      default: "center",
      [portrait]: "center start",
      [portraitWide]: "center end",
    },
    width: "100%",
    height: "100%",
    minWidth: 0,
    minHeight: 0,
    containerType: "size",
    overflow: "hidden",
    pointerEvents: "none",
  },
  line: {
    margin: 0,
    fontSize: `calc(100cqh / ${versionStackEm})`,
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
          <LocaleSwitcher
            codeStyle={styles.localeCodes}
            style={styles.localeOnPoster}
          />
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
