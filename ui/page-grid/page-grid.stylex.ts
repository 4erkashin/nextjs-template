import * as stylex from "@stylexjs/stylex";

import { spacing } from "@/tokens/generated/tokens.stylex";

/**
 * Max width of one content column. 4.5rem is 72px at a 16px root.
 * Tune when Home sits on these tracks.
 */
export const pageGrid = stylex.defineVars({
  columnMax: "4.5rem",
  gutter: spacing.md,
});
