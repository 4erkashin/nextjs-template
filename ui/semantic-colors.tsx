import * as stylex from "@stylexjs/stylex";

import { queries } from "../tokens/generated/queries.stylex";
import { dark, light } from "../tokens/generated/themes";
import { colors, fonts, spacing } from "../tokens/generated/tokens.stylex";
import tokens from "../tokens/tokens.json";
import { wcag2ContrastCaption, wcag2ContrastRatio } from "./wcag-contrast";

type PairCaption = {
  rows: { role: string; value: string }[];
};

type SemanticPair = {
  background: { $value: string };
  foreground: { $value: string };
};

const primitiveColors = tokens.primitive.color;
const lightPair = pairCaption(tokens.light.color);
const darkPair = pairCaption(tokens.dark.color);

export function SemanticColors() {
  return (
    <section {...stylex.props(styles.section)}>
      <header {...stylex.props(styles.intro)}>
        <h2 {...stylex.props(styles.title)}>background / foreground</h2>
        <p {...stylex.props(styles.lede)}>
          Fill the page with background. Print type and icons with foreground.
        </p>
      </header>
      <div {...stylex.props(styles.row)}>
        <PairPane
          caption={lightPair}
          scheme={styles.paneLight}
          theme={light}
        />
        <PairPane caption={darkPair} scheme={styles.paneDark} theme={dark} />
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

function pairCaption(semantic: SemanticPair): PairCaption {
  const background = resolvePaint(semantic.background.$value);
  const foreground = resolvePaint(semantic.foreground.$value);

  return {
    rows: [
      { role: "background", value: background.alias },
      { role: "foreground", value: foreground.alias },
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
    gap: spacing.m,
    display: "flex",
    flexDirection: "column",
    fontFamily: fonts.family,
    fontSize: fonts.size,
  },
  intro: {
    gap: spacing.s,
    color: colors.foreground,
    display: "flex",
    flexDirection: "column",
  },
  title: {
    margin: 0,
    fontSize: fonts.sizeLg,
  },
  lede: {
    margin: 0,
  },
  row: {
    gap: spacing.m,
    display: "flex",
    flexDirection: {
      default: "column",
      [queries.wide]: "row",
    },
  },
  chip: {
    gap: spacing.s,
    display: "flex",
    flexBasis: {
      default: "auto",
      [queries.wide]: 0,
    },
    flexDirection: "column",
    flexGrow: 1,
    flexShrink: 1,
  },
  pane: {
    padding: spacing.l,
    backgroundColor: colors.background,
    color: colors.foreground,
    display: "flex",
  },
  paneLight: {
    colorScheme: "light",
  },
  paneDark: {
    colorScheme: "dark",
  },
  job: {
    margin: 0,
    fontSize: fonts.sizeLg,
  },
  caption: {
    gap: spacing.s,
    color: colors.text,
    display: "flex",
    flexDirection: "column",
  },
  captionLine: {
    gap: spacing.s,
    display: "flex",
  },
  code: {
    color: colors.textSecondary,
    fontFamily: fonts.mono,
    whiteSpace: "nowrap",
  },
});
