import * as stylex from "@stylexjs/stylex";

import { queries } from "../../tokens/generated/queries.stylex";
import { dark, light } from "../../tokens/generated/themes";
import { colors, fonts, spacing } from "../../tokens/generated/tokens.stylex";
import tokens from "../../tokens/tokens.json";
import { wcag2ContrastCaption, wcag2ContrastRatio } from "./wcag-contrast";

type PairCaption = {
  rows: { role: string; value: string }[];
};

type SemanticColors = {
  background: { $value: string };
  foreground: { $value: string };
  split: { $value: string };
  splitPair: { $value: string };
};

const primitiveColors = tokens.primitive.color;
const lightCaption = semanticCaption(tokens.light.color);
const darkCaption = semanticCaption(tokens.dark.color);

export function ColorsSemantic() {
  return (
    <section {...stylex.props(styles.section)}>
      <header {...stylex.props(styles.intro)}>
        <h2 {...stylex.props(styles.title)}>
          background / foreground / split
        </h2>
        <p {...stylex.props(styles.lede)}>
          Fill the page with background. Print type and icons with foreground.
          Offset a color split with split and split pair.
        </p>
      </header>
      <div {...stylex.props(styles.row)}>
        <PairPane
          caption={lightCaption}
          scheme={styles.paneLight}
          theme={light}
        />
        <PairPane
          caption={darkCaption}
          scheme={styles.paneDark}
          theme={dark}
        />
      </div>
    </section>
  );
}

function PairPane({
  caption,
  scheme,
  theme,
}: {
  caption: PairCaption;
  scheme: typeof styles.paneDark | typeof styles.paneLight;
  theme: typeof dark | typeof light;
}) {
  return (
    <div {...stylex.props(styles.chip)}>
      <article {...stylex.props(theme, styles.pane, scheme)}>
        <p {...stylex.props(styles.job)}>Ink on this surface.</p>
        <div {...stylex.props(styles.splitRow)}>
          <div {...stylex.props(styles.tile, styles.splitPaint)} />
          <div {...stylex.props(styles.tile, styles.splitPairPaint)} />
        </div>
      </article>
      <div {...stylex.props(styles.caption)}>
        {caption.rows.map((row) => (
          <div key={row.role} {...stylex.props(styles.captionLine)}>
            <span>{row.role}</span>
            <span {...stylex.props(styles.code)}>{row.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function semanticCaption(semantic: SemanticColors): PairCaption {
  const background = resolvePaint(semantic.background.$value);
  const foreground = resolvePaint(semantic.foreground.$value);
  const split = resolvePaint(semantic.split.$value);
  const splitPair = resolvePaint(semantic.splitPair.$value);

  return {
    rows: [
      { role: "background", value: background.alias },
      { role: "foreground", value: foreground.alias },
      { role: "split", value: split.alias },
      { role: "split pair", value: splitPair.alias },
      {
        role: "contrast",
        value: wcag2ContrastCaption(
          wcag2ContrastRatio(foreground.oklch, background.oklch),
        ),
      },
    ],
  };
}

function resolvePaint(tokenValue: string): { alias: string; oklch: string } {
  const reference = /^\{color\.([^}]+)\}$/.exec(tokenValue);
  if (!reference) {
    return { alias: tokenValue, oklch: tokenValue };
  }

  const alias = reference[1];
  const primitive = primitiveColors[alias as keyof typeof primitiveColors];
  if (!primitive) {
    throw new Error(`semantic color references missing primitive ${alias}`);
  }

  return { alias, oklch: primitive.$value };
}

const styles = stylex.create({
  section: {
    gap: spacing.md,
    display: "flex",
    flexDirection: "column",
    fontFamily: fonts.sans,
    fontSize: "1rem",
  },
  intro: {
    gap: spacing.sm,
    color: colors.foreground,
    display: "flex",
    flexDirection: "column",
  },
  title: {
    margin: 0,
    fontSize: "1.25rem",
  },
  lede: {
    margin: 0,
  },
  row: {
    gap: spacing.md,
    display: "flex",
    flexDirection: {
      default: "column",
      [queries.sm]: "row",
    },
  },
  chip: {
    gap: spacing.sm,
    display: "flex",
    flexBasis: {
      default: "auto",
      [queries.sm]: 0,
    },
    flexDirection: "column",
    flexGrow: 1,
    flexShrink: 1,
  },
  pane: {
    padding: spacing.lg,
    gap: spacing.md,
    backgroundColor: colors.background,
    color: colors.foreground,
    display: "flex",
    flexDirection: "column",
  },
  splitRow: {
    gap: spacing.sm,
    display: "flex",
  },
  tile: {
    borderColor: colors.foreground,
    borderStyle: "solid",
    borderWidth: spacing.px,
    flexGrow: 1,
    minBlockSize: "5rem",
  },
  splitPaint: {
    backgroundColor: colors.split,
  },
  splitPairPaint: {
    backgroundColor: colors.splitPair,
  },
  paneLight: {
    colorScheme: "light",
  },
  paneDark: {
    colorScheme: "dark",
  },
  job: {
    margin: 0,
    fontSize: "1.25rem",
  },
  caption: {
    gap: spacing.sm,
    color: colors.foreground,
    display: "flex",
    flexDirection: "column",
  },
  captionLine: {
    gap: spacing.sm,
    display: "flex",
  },
  code: {
    color: colors.foreground,
    fontFamily: fonts.mono,
    whiteSpace: "nowrap",
  },
});
