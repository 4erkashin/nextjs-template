import * as stylex from "@stylexjs/stylex";
import { clsx } from "clsx";
import { useTranslations } from "next-intl";

import { version } from "@/package.json";
import { jetbrainsMonoNumeral } from "@/theme/fonts";
import { fonts, spacing } from "@/tokens/generated/tokens.stylex";
import { SwitcherLocale, SwitcherTheme } from "@/ui";
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
 * Shortest canvas we will paint. 64rem is layout.lg (1024px).
 * height 100dvh still fills a taller window. When DevTools
 * shrinks the viewport, min-height wins so the poster (and its
 * empty margin) does not collapse. Scroll the page to see it.
 */
const homeFrameMinHeight = "58rem";

const styles = stylex.create({
  main: {
    gridTemplateRows: "minmax(0, 1fr)",
    height: "100dvh",
    minHeight: homeFrameMinHeight,
    overflow: "hidden",
    fontFamily: fonts.sans,
  },
  contentPane: {
    display: "grid",
    gridTemplateRows: "max-content 1fr",
    gridTemplateColumns: "subgrid",
    gridColumnStart: "2",
    gridColumnEnd: "8",
    rowGap: `clamp(${spacing.xs}, 2dvh, ${spacing.lg})`,
    /**
     * By default a grid item will not get smaller than its content.
     * Zero here means: you may shrink. The stack can fit the columns
     * it occupies, and the viewport height.
     * If we omit this, a long word in the title or a tall block of
     * copy can push the stack out of its tracks.
     */
    minWidth: 0,
    minHeight: 0,
    // Head and foot margin. The version pane stays flush to the viewport.
    paddingBlock: "8dvh",
  },
  textContent: {
    display: "grid",
    gridTemplateColumns: "subgrid",
    gridColumnStart: "1",
    gridColumnEnd: "-1",
    rowGap: "0.1em",
    fontSize: "clamp(1.75rem, 6vw, 8rem)",
  },
  title: {
    gridColumnStart: "1",
    gridColumnEnd: "-2",
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
  switchers: {
    display: "flex",
    flexDirection: "column",
    gridColumnStart: "1",
    gridColumnEnd: "-1",
    gap: spacing.sm,
    alignSelf: "end",
  },
  versionPane: {
    display: "grid",
    gridColumnStart: "8",
    gridColumnEnd: "13",
    placeContent: "center",
    placeItems: "center",
    /**
     * Same shrink rule as the stack. The giant version string does
     * not wrap, so it would otherwise lock these columns to its
     * full character width.
     */
    minWidth: 0,
    minHeight: 0,
    containerType: "inline-size",
    overflow: "hidden",
    pointerEvents: "none",
  },
  line: {
    margin: 0,
    /**
     * Cover: max() of height and width. cqi must live on a
     * descendant; the pane is the container.
     */
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
  const paneProps = stylex.props(styles.versionPane);

  return (
    <main {...stylex.props(pageGridStyles.root, styles.main)}>
      <div {...stylex.props(styles.contentPane)}>
        <div {...stylex.props(styles.textContent)}>
          <h1 {...stylex.props(styles.title)}>{t("title")}</h1>

          <p {...stylex.props(styles.description)}>{t("description")}</p>
        </div>

        <div {...stylex.props(styles.switchers)}>
          <SwitcherLocale />

          <SwitcherTheme />
        </div>
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
