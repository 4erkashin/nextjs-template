import * as stylex from "@stylexjs/stylex";
import { useTranslations } from "next-intl";
import { type ReactNode } from "react";

import { LocaleSwitcher } from "@/features/locale-switcher";
import { ThemeSwitcher } from "@/features/theme-switcher";
import { readEnvironmentVariable } from "@/lib/environment";
import { grid, spacing } from "@/tokens/generated/tokens.stylex";
import { pageGridStyles } from "@/ui/page-grid";

const storybookHref = readEnvironmentVariable("STORYBOOK_URL");

function StorybookMention({ children }: { children: ReactNode }) {
  if (!storybookHref) {
    return children;
  }

  return (
    <a
      href={storybookHref}
      rel="noreferrer"
      target="_blank"
      {...stylex.props(styles.storybookLink)}
    >
      {children}
    </a>
  );
}

/**
 * Measured share of sheet width. The title still fits on the
 * smallest and largest viewports we compose for.
 */
const titleVw = 11.25;

/**
 * Description is the title divided by the golden ratio and 2.5.
 * Switcher labels use that length, slightly smaller.
 */
const descriptionVw = `${titleVw}vw / (${grid.goldenRatio} * 2.5)`;

const descriptionFontSize = `round(
  nearest,
  ${descriptionVw},
  ${spacing.px}
)`;

const switcherFontSize = `max(
  ${grid.module} * 2,
  round(
    nearest,
    ${descriptionVw} / ${grid.goldenRatio},
    ${spacing.px}
  )
)`;

const styles = stylex.create({
  copy: {
    display: "flex",
    flexDirection: "column",
    gridRowStart: "1",
    gridColumnStart: "2",
    gridColumnEnd: "-3",
    gap: descriptionFontSize,
    placeSelf: "center",
    fontSize: `round(nearest, ${titleVw}vw, ${spacing.px})`,
    fontWeight: 800,
    lineHeight: 1.1,
    textTransform: "uppercase",
    letterSpacing: "0.03em",
    textWrap: "balance",
  },
  description: {
    fontSize: descriptionFontSize,
    fontWeight: 500,
  },
  storybookLink: {
    textDecorationLine: "underline",
    textUnderlineOffset: spacing.xs,
  },
  localeSwitcher: {
    gridRowStart: "1",
    gridColumnStart: "-2",
    gridColumnEnd: "-1",
    placeSelf: "start end",
    width: "max-content",
    fontSize: switcherFontSize,
    writingMode: "vertical-rl",
    textOrientation: "sideways",
  },
  themeSwitcher: {
    gridRowStart: "1",
    gridColumnStart: "-2",
    gridColumnEnd: "-1",
    placeSelf: "end end",
    width: "max-content",
    fontSize: switcherFontSize,
  },
});

export default function HomePage() {
  const t = useTranslations("HomePage");

  return (
    <main {...stylex.props(pageGridStyles.root)}>
      <div {...stylex.props(styles.copy)}>
        <h1>{t("title")}</h1>
        <p {...stylex.props(styles.description)}>
          {t.rich("description", {
            storybook: (chunks) => (
              <StorybookMention>{chunks}</StorybookMention>
            ),
          })}
        </p>
      </div>

      <LocaleSwitcher style={styles.localeSwitcher} />
      <ThemeSwitcher style={styles.themeSwitcher} />
    </main>
  );
}
