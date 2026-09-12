import * as stylex from "@stylexjs/stylex";
import { type ReactNode } from "react";

import { queries } from "../../tokens/generated/queries.stylex";
import { dark, light } from "../../tokens/generated/themes";
import { colors, fonts, spacing } from "../../tokens/generated/tokens.stylex";
import tokens from "../../tokens/tokens.json";
import { Button } from "../button";
import { ColorSplit } from "../color-split";
import { wcag2ContrastCaption, wcag2ContrastRatio } from "./wcag-contrast";

type ColorToken = {
  $value: string;
};

type ResolvedPaints = {
  background: string;
  foreground: string;
  foregroundContrast: string;
  glitch: string;
  glitchContrast: string;
  glitchPair: string;
  glitchPairContrast: string;
  primary: string;
  primaryContrast: string;
  primaryForeground: string;
  secondary: string;
  secondaryContrast: string;
  secondaryForeground: string;
};

type ThemeScheme = typeof styles.paneDark | typeof styles.paneLight;

const primitiveColors = tokens.primitive.color;
const lightPaints = resolveSemantic(tokens.light.color);
const darkPaints = resolveSemantic(tokens.dark.color);

export function ColorsSemantic() {
  return (
    <div {...stylex.props(styles.section)}>
      <JobRow
        lede="Fill the page with background. Print type and icons with foreground."
        title="background / foreground"
      >
        <InkPane
          caption={inkCaption(lightPaints)}
          scheme={styles.paneLight}
          theme={light}
        />
        <InkPane
          caption={inkCaption(darkPaints)}
          scheme={styles.paneDark}
          theme={dark}
        />
      </JobRow>
      <JobRow
        lede="Secondary fills neutral controls. Primary marks the main action. Each solid owns its foreground."
        title="secondary / primary / foregrounds"
      >
        <PrimaryPane
          caption={primaryCaption(lightPaints)}
          scheme={styles.paneLight}
          theme={light}
        />
        <PrimaryPane
          caption={primaryCaption(darkPaints)}
          scheme={styles.paneDark}
          theme={dark}
        />
      </JobRow>
      <JobRow
        lede="Offset a color split with glitch and glitch pair."
        title="glitch / glitch pair"
      >
        <SplitPane
          caption={splitCaption(lightPaints)}
          scheme={styles.paneLight}
          theme={light}
        />
        <SplitPane
          caption={splitCaption(darkPaints)}
          scheme={styles.paneDark}
          theme={dark}
        />
      </JobRow>
    </div>
  );
}

function JobRow({
  children,
  lede,
  title,
}: {
  children: ReactNode;
  lede: string;
  title: string;
}) {
  return (
    <section {...stylex.props(styles.jobRow)}>
      <header {...stylex.props(styles.intro)}>
        <h2 {...stylex.props(styles.title)}>{title}</h2>
        <p {...stylex.props(styles.lede)}>{lede}</p>
      </header>
      <div {...stylex.props(styles.row)}>{children}</div>
    </section>
  );
}

function InkPane({
  caption,
  scheme,
  theme,
}: {
  caption: ReactNode;
  scheme: ThemeScheme;
  theme: typeof dark | typeof light;
}) {
  return (
    <div {...stylex.props(styles.chip)}>
      <article {...stylex.props(theme, styles.pane, scheme)}>
        <p {...stylex.props(styles.job)}>Ink on this surface.</p>
      </article>
      <p {...stylex.props(styles.caption)}>{caption}</p>
    </div>
  );
}

function PrimaryPane({
  caption,
  scheme,
  theme,
}: {
  caption: ReactNode;
  scheme: ThemeScheme;
  theme: typeof dark | typeof light;
}) {
  return (
    <div {...stylex.props(styles.chip)}>
      <article {...stylex.props(theme, styles.pane, scheme)}>
        <div {...stylex.props(styles.splitRow)}>
          <Button>Fill</Button>
          <Button surface="outline">Line</Button>
        </div>
      </article>
      <p {...stylex.props(styles.caption)}>{caption}</p>
    </div>
  );
}

function SplitPane({
  caption,
  scheme,
  theme,
}: {
  caption: ReactNode;
  scheme: ThemeScheme;
  theme: typeof dark | typeof light;
}) {
  return (
    <div {...stylex.props(styles.chip)}>
      <article {...stylex.props(theme, styles.pane, scheme)}>
        <p {...stylex.props(styles.job)}>
          <ColorSplit active>Offset</ColorSplit>
        </p>
        <div {...stylex.props(styles.splitRow)}>
          <div {...stylex.props(styles.tile, styles.splitPaint)} />
          <div {...stylex.props(styles.tile, styles.splitPairPaint)} />
        </div>
      </article>
      <p {...stylex.props(styles.caption)}>{caption}</p>
    </div>
  );
}

function inkCaption(paints: ResolvedPaints): ReactNode {
  return (
    <>
      {onSurface(paints.foreground, paints.background)}
      {` · ${paints.foregroundContrast}`}
    </>
  );
}

function paintName(paint: string) {
  return <span {...stylex.props(styles.name)}>{paint}</span>;
}

function onSurface(paint: string, surface: string) {
  return (
    <>
      {paintName(paint)}
      {" on "}
      {paintName(surface)}
    </>
  );
}

function primaryCaption(paints: ResolvedPaints): ReactNode {
  return (
    <>
      {onSurface(paints.secondaryForeground, paints.secondary)}
      {` · ${paints.secondaryContrast} · `}
      {onSurface(paints.primaryForeground, paints.primary)}
      {` · ${paints.primaryContrast}`}
    </>
  );
}

function paintValue(
  semantic: Record<string, ColorToken>,
  name: string,
): string {
  const token = semantic[name];
  if (!token) {
    throw new Error(`semantic color missing ${name}`);
  }
  return token.$value;
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

function resolveSemantic(semantic: Record<string, ColorToken>): ResolvedPaints {
  const background = resolvePaint(paintValue(semantic, "background"));
  const secondary = resolvePaint(paintValue(semantic, "secondary"));
  const secondaryForeground = resolvePaint(
    paintValue(semantic, "secondaryForeground"),
  );
  const foreground = resolvePaint(paintValue(semantic, "foreground"));
  const primary = resolvePaint(paintValue(semantic, "primary"));
  const primaryForeground = resolvePaint(
    paintValue(semantic, "primaryForeground"),
  );
  const glitch = resolvePaint(paintValue(semantic, "glitch"));
  const glitchPair = resolvePaint(paintValue(semantic, "glitchPair"));

  return {
    background: background.alias,
    secondary: secondary.alias,
    secondaryContrast: wcag2ContrastCaption(
      wcag2ContrastRatio(secondaryForeground.oklch, secondary.oklch),
    ),
    secondaryForeground: secondaryForeground.alias,
    foreground: foreground.alias,
    foregroundContrast: wcag2ContrastCaption(
      wcag2ContrastRatio(foreground.oklch, background.oklch),
    ),
    primary: primary.alias,
    primaryContrast: wcag2ContrastCaption(
      wcag2ContrastRatio(primaryForeground.oklch, primary.oklch),
    ),
    primaryForeground: primaryForeground.alias,
    glitch: glitch.alias,
    glitchContrast: wcag2ContrastCaption(
      wcag2ContrastRatio(glitch.oklch, background.oklch),
    ),
    glitchPair: glitchPair.alias,
    glitchPairContrast: wcag2ContrastCaption(
      wcag2ContrastRatio(glitchPair.oklch, background.oklch),
    ),
  };
}

function splitCaption(paints: ResolvedPaints): ReactNode {
  return (
    <>
      {onSurface(paints.glitch, paints.background)}
      {` ${paints.glitchContrast} · `}
      {onSurface(paints.glitchPair, paints.background)}
      {` ${paints.glitchPairContrast}`}
    </>
  );
}

const styles = stylex.create({
  section: {
    gap: spacing.lg,
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
  jobRow: {
    gap: spacing.md,
    display: "flex",
    flexDirection: "column",
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
    borderColor: colors.border,
    borderStyle: "solid",
    borderWidth: spacing.px,
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
    borderColor: colors.border,
    borderStyle: "solid",
    borderWidth: spacing.px,
    flexGrow: 1,
    minBlockSize: "5rem",
  },
  splitPaint: {
    backgroundColor: colors.glitch,
  },
  splitPairPaint: {
    backgroundColor: colors.glitchPair,
  },
  paneLight: {
    colorScheme: "light",
  },
  paneDark: {
    colorScheme: "dark",
  },
  job: {
    margin: 0,
    gap: spacing.sm,
    alignItems: "center",
    display: "flex",
    flexWrap: "wrap",
    fontSize: "1.25rem",
  },
  caption: {
    margin: 0,
    color: colors.foreground,
    fontFamily: fonts.mono,
  },
  name: {
    fontWeight: 600,
  },
});
