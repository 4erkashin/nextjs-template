import * as stylex from "@stylexjs/stylex";
import { type ReactNode } from "react";

import { colors, spacing } from "@/tokens/generated/tokens.stylex";

export type ScanlinesProps = {
  children: ReactNode;
};

const gap = `calc(2 * ${spacing.px})`;
const pitch = `calc(3 * ${spacing.px})`;

/**
 * Rest hatch over a positioned ancestor. Not a traveling scan.
 */
export function Scanlines({ children }: ScanlinesProps) {
  return (
    <>
      <span aria-hidden {...stylex.props(styles.hatch)} />
      {children}
    </>
  );
}

const styles = stylex.create({
  hatch: {
    inset: 0,
    backgroundImage: `repeating-linear-gradient(to bottom, transparent 0, transparent ${gap}, ${colors.muted} ${gap}, ${colors.muted} ${pitch})`,
    opacity: 0.1,
    pointerEvents: "none",
    position: "absolute",
    zIndex: 2,
  },
});
