import * as stylex from "@stylexjs/stylex";
import { clsx } from "clsx";

import { version } from "@/package.json";
import { jetbrainsMonoNumeral } from "@/theme/fonts";
import { queries } from "@/tokens/generated/queries.stylex";

/**
 * Version is a 2-line stack (`v0` / `01`). Type is pane height ÷
 * that stack (1.6em) so the mass meets top and bottom. Width is
 * leftover air, not a second fit: taking the larger of height
 * and width overflows the sheet on any pane shorter than about
 * 1.62× its width.
 *
 * `mobile` packs that stack start (cut the right).
 * `tablet` packs end (cut the left).
 * `desktop` keeps the stack centered in the pane.
 */
const versionLines = 2;
const versionLineHeight = 0.8;
const versionStackEm = versionLines * versionLineHeight;

const styles = stylex.create({
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
  /**
   * Type follows pane height so the stack meets the pane.
   * `mobile` packs start (cut the right); `tablet` packs end
   * (cut the left). `default` matches `desktop` so this object
   * can pass a StyleXStyles prop (query-only maps cannot).
   */
  root: {
    display: "grid",
    placeContent: {
      default: "center",
      [queries.desktop]: "center",
      [queries.mobile]: "center start",
      [queries.tablet]: "center end",
    },
    placeItems: {
      default: "center",
      [queries.desktop]: "center",
      [queries.mobile]: "center start",
      [queries.tablet]: "center end",
    },
    width: "100%",
    minWidth: 0,
    height: "100%",
    minHeight: 0,
    containerType: "size",
    overflow: "hidden",
    pointerEvents: "none",
  },
});

export type VersionPaneProps = Readonly<{
  style?: VersionPaneStyle;
}>;

type VersionPaneStyle = stylex.StyleXStyles<
  Pick<
    stylex.CSSProperties,
    "gridColumnEnd" | "gridColumnStart" | "gridRowStart"
  >
>;

export function VersionPane({ style }: VersionPaneProps) {
  const [major = "0", minor = "0", patch = "0"] = version.split(".");
  const rootProps = stylex.props(styles.root, style);

  return (
    <div
      {...rootProps}
      aria-label={version}
      className={clsx(rootProps.className, jetbrainsMonoNumeral.className)}
      role="img"
    >
      <p aria-hidden {...stylex.props(styles.line)}>
        {`v${major}`}
      </p>
      <p aria-hidden {...stylex.props(styles.line)}>
        {`${minor}${patch}`}
      </p>
    </div>
  );
}
