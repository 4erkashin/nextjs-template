import * as stylex from "@stylexjs/stylex";

import { fonts } from "@/tokens/generated/tokens.stylex";
import { pageGridStyles } from "@/ui/page-grid";

export default function HomePage() {
  return <main {...stylex.props(pageGridStyles.root, styles.main)} />;
}

const styles = stylex.create({
  main: {
    overflow: "hidden",
    fontFamily: fonts.mono,
    position: "relative",
    minHeight: "max(100dvh, 45rem)",
  },
});
