import * as stylex from "@stylexjs/stylex";

import { dark, light } from "../../tokens/generated/themes";
import { colors, fonts, spacing } from "../../tokens/generated/tokens.stylex";
import tokens from "../../tokens/tokens.json";
import { apcaContrast, apcaContrastCaption } from "./apca-contrast";
import { wcag2ContrastRatio } from "./wcag-contrast";

const lightForeground = semanticPaint("light", "foreground");
const lightBackground = semanticPaint("light", "background");
const darkForeground = semanticPaint("dark", "foreground");
const darkBackground = semanticPaint("dark", "background");
const lightMuted = semanticPaint("light", "muted");
const lightMutedForeground = semanticPaint("light", "mutedForeground");
const darkMuted = semanticPaint("dark", "muted");
const darkMutedForeground = semanticPaint("dark", "mutedForeground");
const foregroundContrast = {
  dark: contrastInfo(darkForeground, darkBackground, "frost", "night"),
  light: contrastInfo(lightForeground, lightBackground, "ink", "frost"),
};
const mutedContrast = {
  dark: contrastInfo(darkMutedForeground, darkMuted, "mist", "fog"),
  light: contrastInfo(lightMutedForeground, lightMuted, "graphite", "line"),
};

type ContrastInfo = { apca: string; pair: string; wcag: string };

export function ColorsSemantic() {
  return (
    <main {...stylex.props(styles.specimen)}>
      <section {...stylex.props(styles.section)}>
        <header {...stylex.props(styles.header)}>
          <p {...stylex.props(styles.kicker)}>Semantic color / 01</p>
          <h1 {...stylex.props(styles.title)}>What is background?</h1>
        </header>
        <div
          aria-label="Background colors by theme"
          {...stylex.props(styles.swatches)}
        >
          <BackgroundColumn primitive="frost" theme={light} themeName="light" />
          <BackgroundColumn primitive="night" theme={dark} themeName="dark" />
        </div>
      </section>
      <section {...stylex.props(styles.section)}>
        <header {...stylex.props(styles.header)}>
          <p {...stylex.props(styles.kicker)}>Semantic color / 02</p>
          <h2 {...stylex.props(styles.title)}>What is foreground?</h2>
        </header>
        <div
          aria-label="Foreground colors and contrast by theme"
          {...stylex.props(styles.swatches)}
        >
          <ForegroundColumn
            contrast={foregroundContrast.light}
            primitive="ink"
            theme={light}
            themeName="light"
          />
          <ForegroundColumn
            contrast={foregroundContrast.dark}
            primitive="frost"
            theme={dark}
            themeName="dark"
          />
        </div>
      </section>
      <section {...stylex.props(styles.section)}>
        <header {...stylex.props(styles.header)}>
          <p {...stylex.props(styles.kicker)}>Semantic color / 03</p>
          <h2 {...stylex.props(styles.title)}>What is muted?</h2>
        </header>
        <div
          aria-label="Muted colors and contrast by theme"
          {...stylex.props(styles.swatches)}
        >
          <MutedColumn
            contrast={mutedContrast.light}
            primitive="line / graphite"
            theme={light}
            themeName="light"
          />
          <MutedColumn
            contrast={mutedContrast.dark}
            primitive="fog / mist"
            theme={dark}
            themeName="dark"
          />
        </div>
      </section>
    </main>
  );
}

function BackgroundColumn({
  primitive,
  theme,
  themeName,
}: {
  primitive: string;
  theme: typeof dark | typeof light;
  themeName: string;
}) {
  return (
    <figure {...stylex.props(styles.swatch)}>
      <div
        aria-label={`${themeName} theme background`}
        role="img"
        {...stylex.props(theme, styles.paint)}
      />
      <figcaption {...stylex.props(styles.label)}>
        <span>Theme / {themeName}</span>
        <span>Primitive / {primitive}</span>
      </figcaption>
    </figure>
  );
}

function ForegroundColumn({
  contrast,
  primitive,
  theme,
  themeName,
}: {
  contrast: ContrastInfo;
  primitive: string;
  theme: typeof dark | typeof light;
  themeName: string;
}) {
  return (
    <figure {...stylex.props(styles.swatch)}>
      <div {...stylex.props(theme, styles.paint, styles.foregroundPaint)} />
      <figcaption {...stylex.props(styles.label)}>
        <span>Theme / {themeName}</span>
        <span>Primitive / {primitive}</span>
      </figcaption>
      <div {...stylex.props(styles.contrastSpecimen)}>
        <div {...stylex.props(theme, styles.paint, styles.contrastPaint)}>
          <span {...stylex.props(styles.sampleText)}>Aa</span>
        </div>
        <div {...stylex.props(styles.contrastReadout)}>
          <span>{contrast.pair}</span>
          <span>WCAG 2 / {contrast.wcag}</span>
          <span>APCA / {contrast.apca}</span>
        </div>
      </div>
    </figure>
  );
}

function MutedColumn({
  contrast,
  primitive,
  theme,
  themeName,
}: {
  contrast: ContrastInfo;
  primitive: string;
  theme: typeof dark | typeof light;
  themeName: string;
}) {
  return (
    <figure {...stylex.props(styles.swatch)}>
      <div {...stylex.props(theme, styles.paint, styles.mutedPaint)} />
      <figcaption {...stylex.props(styles.label)}>
        <span>Theme / {themeName}</span>
        <span>Primitive / {primitive}</span>
      </figcaption>
      <div {...stylex.props(styles.contrastSpecimen)}>
        <div
          {...stylex.props(
            theme,
            styles.paint,
            styles.mutedPaint,
            styles.contrastPaint,
          )}
        >
          <span {...stylex.props(styles.mutedSampleText)}>Aa</span>
        </div>
        <div {...stylex.props(styles.contrastReadout)}>
          <span>{contrast.pair}</span>
          <span>WCAG 2 / {contrast.wcag}</span>
          <span>APCA / {contrast.apca}</span>
        </div>
      </div>
    </figure>
  );
}

function contrastInfo(
  foreground: string,
  background: string,
  foregroundName: string,
  backgroundName: string,
): ContrastInfo {
  const wcag = Math.round(wcag2ContrastRatio(foreground, background) * 10) / 10;

  return {
    apca: apcaContrastCaption(apcaContrast(foreground, background)),
    pair: `${foregroundName} on ${backgroundName}`,
    wcag: `${Number.isInteger(wcag) ? wcag : wcag.toFixed(1)}:1`,
  };
}

function semanticPaint(
  theme: "dark" | "light",
  name: "background" | "foreground" | "muted" | "mutedForeground",
): string {
  const value = tokens[theme].color[name].$value;
  const matched = /^\{color\.([^}]+)\}$/.exec(value);
  if (!matched) return value;

  const primitive =
    tokens.primitive.color[matched[1] as keyof typeof tokens.primitive.color];
  if (!primitive) throw new Error(`missing primitive color ${matched[1]}`);
  return primitive.$value;
}

const styles = stylex.create({
  specimen: {
    gap: "clamp(3rem, 9vw, 8rem)",
    marginInline: "auto",
    paddingBlock: "clamp(1.5rem,5vw,4rem)",
    paddingInline: "clamp(1.5rem,5vw,4rem)",
    color: colors.foreground,
    display: "flex",
    flexDirection: "column",
    fontFamily: fonts.sans,
    maxInlineSize: "52rem",
  },
  section: {
    gap: "clamp(2rem, 7vw, 6rem)",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    borderBlockEndColor: colors.border,
    borderBlockEndStyle: "solid",
    borderBlockEndWidth: spacing.px,
    paddingBlockEnd: spacing.sm,
  },
  kicker: {
    margin: 0,
    color: colors.mutedForeground,
    fontFamily: fonts.mono,
    fontSize: "0.75rem",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
  title: {
    marginBlock: spacing.md,
    marginInline: 0,
    fontSize: "clamp(2.5rem, 9vw, 6.5rem)",
    letterSpacing: "-0.075em",
    lineHeight: 0.86,
  },
  swatches: {
    gap: "clamp(0.75rem, 3vw, 2rem)",
    display: "flex",
  },
  swatch: {
    margin: 0,
    gap: "clamp(1.5rem, 4vw, 3rem)",
    display: "flex",
    flexBasis: 0,
    flexDirection: "column",
    flexGrow: 1,
    flexShrink: 1,
  },
  paint: {
    aspectRatio: "1 / 1",
    backgroundColor: colors.background,
    boxShadow: "0 0 0 1px oklch(0.12 0 0), 0 0 0 2px oklch(0.92 0 0)",
    inlineSize: "100%",
  },
  foregroundPaint: {
    backgroundColor: colors.foreground,
  },
  mutedPaint: {
    backgroundColor: colors.muted,
  },
  contrastSpecimen: {
    gap: spacing.sm,
    display: "flex",
    flexDirection: "column",
  },
  contrastPaint: {
    alignItems: "flex-start",
    display: "flex",
    justifyContent: "flex-end",
    padding: spacing.md,
  },
  sampleText: {
    color: colors.foreground,
    fontSize: "clamp(4rem, 14vw, 9rem)",
    fontWeight: 700,
    letterSpacing: "-0.1em",
    lineHeight: 1,
  },
  mutedSampleText: {
    color: colors.mutedForeground,
    fontSize: "clamp(4rem, 14vw, 9rem)",
    fontWeight: 700,
    letterSpacing: "-0.1em",
    lineHeight: 1,
  },
  contrastReadout: {
    color: colors.mutedForeground,
    display: "flex",
    flexDirection: "column",
    fontFamily: fonts.mono,
    fontSize: "0.75rem",
    letterSpacing: "0.08em",
    lineHeight: 1.5,
    textTransform: "uppercase",
  },
  label: {
    color: colors.mutedForeground,
    display: "flex",
    flexDirection: "column",
    fontFamily: fonts.mono,
    fontSize: "0.75rem",
    letterSpacing: "0.08em",
    lineHeight: 1.5,
    textTransform: "uppercase",
  },
});
