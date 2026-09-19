import * as stylex from "@stylexjs/stylex";
import { useTranslations } from "next-intl";

import { LocaleSwitcher } from "@/features/locale-switcher";
import { ThemeSwitcher } from "@/features/theme-switcher";
import { VersionPane } from "@/features/version-pane";
import { queries } from "@/tokens/generated/queries.stylex";
import { fonts, spacing } from "@/tokens/generated/tokens.stylex";
import { pageGridStyles } from "@/ui/page-grid";

/**
 * Chrome is locale, caption, and theme. 1.32vw is about 0.22 of
 * the landscape title’s 6vw slope. Floor matches 0.875rem.
 * Portrait title is φ × chrome.
 */
const phi = 1.618;
const switcherFontSize = "clamp(0.875rem, 1.32vw, 1.75rem)";
const titleFromChrome = `clamp(calc(0.875rem * ${phi}), calc(1.32vw * ${phi}), calc(1.75rem * ${phi}))`;
/**
 * Tall-sheet copy: a short pause under the field (the mass fills
 * that 1fr), pack the theme row.
 */
const copyAir = "clamp(0.75rem, 4dvh, 1.75rem)";
const copyToTheme = "clamp(0.5rem, 2.5dvh, 1.25rem)";

const styles = stylex.create({
  main: {
    position: "relative",
    gridTemplateRows: {
      [queries.desktop]: "minmax(0, 1fr)",
      /**
       * Field (locale + mass), then copy, then the theme row.
       * Padding on the copy is the air: more under the field,
       * less above the theme row.
       */
      [queries.mobile]: "minmax(0, 1fr) max-content max-content",
      [queries.tablet]: "minmax(0, 1fr) max-content max-content",
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
   * rest of the sheet. Tall sheets unwrap this wrapper so locale,
   * copy, and version sit on the three-row canvas.
   */
  contentPane: {
    display: {
      [queries.desktop]: "grid",
      [queries.mobile]: "contents",
      [queries.tablet]: "contents",
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
      [queries.mobile]: "2",
      [queries.tablet]: "2",
    },
    gridColumnStart: {
      [queries.desktop]: "1",
      [queries.mobile]: "2",
      [queries.tablet]: "2",
    },
    gridColumnEnd: {
      [queries.desktop]: "-1",
      [queries.mobile]: "11",
      [queries.tablet]: "11",
    },
    rowGap: "0.1em",
    minWidth: {
      [queries.mobile]: 0,
      [queries.tablet]: 0,
    },
    paddingBlockStart: {
      [queries.mobile]: copyAir,
      [queries.tablet]: copyAir,
    },
    paddingBlockEnd: {
      [queries.mobile]: copyToTheme,
      [queries.tablet]: copyToTheme,
    },
    fontSize: {
      [queries.desktop]: "clamp(1.75rem, 6vw, 8rem)",
      [queries.mobile]: titleFromChrome,
      [queries.tablet]: titleFromChrome,
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
    lineHeight: {
      [queries.mobile]: 1.1,
      [queries.tablet]: 1.1,
    },
    textTransform: "uppercase",
    letterSpacing: "-0.03em",
    textWrap: {
      [queries.mobile]: "balance",
      [queries.tablet]: "balance",
    },
    overflowWrap: "break-word",
  },
  description: {
    gridColumnStart: "1",
    gridColumnEnd: "-1",
    margin: 0,
    fontSize: {
      [queries.desktop]: "0.3em",
      [queries.mobile]: switcherFontSize,
      [queries.tablet]: switcherFontSize,
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
   * Tall sheets stack the codes on the left rail. Desktop stays
   * a row under the copy. `default` matches `desktop` so this
   * object can pass a StyleXStyles prop (query-only maps cannot).
   */
  localeOnPoster: {
    flexDirection: {
      default: "row",
      [queries.desktop]: "row",
      [queries.mobile]: "column",
      [queries.tablet]: "column",
    },
    alignItems: {
      default: "center",
      [queries.desktop]: "center",
      [queries.mobile]: "stretch",
      [queries.tablet]: "stretch",
    },
    fontSize: switcherFontSize,
  },
  /**
   * Tall sheets turn each code 90° clockwise so it reads down.
   * `default` matches `desktop` so this object can pass a
   * StyleXStyles prop (query-only maps cannot).
   */
  localeCodes: {
    writingMode: {
      default: "horizontal-tb",
      [queries.desktop]: "horizontal-tb",
      [queries.mobile]: "vertical-rl",
      [queries.tablet]: "vertical-rl",
    },
    textOrientation: {
      default: "mixed",
      [queries.desktop]: "mixed",
      [queries.mobile]: "sideways",
      [queries.tablet]: "sideways",
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
   * Tall sheets pin a vertical stack to the top-left of the field.
   */
  language: {
    gridRowStart: {
      [queries.mobile]: "1",
      [queries.tablet]: "1",
    },
    gridColumnStart: "1",
    gridColumnEnd: {
      [queries.desktop]: "-1",
      [queries.mobile]: "8",
      [queries.tablet]: "8",
    },
    alignSelf: "start",
    justifySelf: "start",
    width: "max-content",
    maxWidth: "100%",
  },
  /**
   * Desktop: first column, flush to the bottom. The active cut
   * meets the left viewport edge. Tall sheets: a row in the
   * bottom-right; the cut pinches the sheet’s block-end.
   */
  theme: {
    gridRowStart: {
      [queries.desktop]: "1",
      [queries.mobile]: "3",
      [queries.tablet]: "3",
    },
    gridColumnStart: "1",
    gridColumnEnd: {
      [queries.desktop]: "7",
      [queries.mobile]: "13",
      [queries.tablet]: "13",
    },
    alignSelf: "end",
    justifySelf: {
      [queries.desktop]: "start",
      [queries.mobile]: "end",
      [queries.tablet]: "end",
    },
  },
  /**
   * Version takes the tracks the column gave up. Tall sheets start
   * at track 3 so the locale rail keeps track 2. Pair with
   * `canvasLayer`. `default` matches `desktop` so this object
   * can pass a StyleXStyles prop (query-only maps cannot).
   */
  versionOnPoster: {
    gridColumnStart: {
      default: "7",
      [queries.desktop]: "7",
      [queries.mobile]: "3",
      [queries.tablet]: "3",
    },
    gridColumnEnd: "13",
  },
});

export default function HomePage() {
  const t = useTranslations("HomePage");

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

      <VersionPane style={[styles.canvasLayer, styles.versionOnPoster]} />
    </main>
  );
}
