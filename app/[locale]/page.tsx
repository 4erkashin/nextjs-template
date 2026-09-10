import * as stylex from "@stylexjs/stylex";
import { useTranslations } from "next-intl";

import { spacing } from "@/tokens/generated/tokens.stylex";

const styles = stylex.create({
  main: {
    gap: spacing.md,
    paddingInline: spacing.md,
    display: "flex",
    flexDirection: "column",
    paddingBlockEnd: spacing.md,
  },
});

export default function HomePage() {
  const t = useTranslations("HomePage");

  return (
    <main {...stylex.props(styles.main)}>
      <h1>{t("title")}</h1>

      <p>{t("description")}</p>
    </main>
  );
}
