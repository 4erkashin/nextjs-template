import type { CSSProperties } from "react";

import * as stylex from "@stylexjs/stylex";

import { colors, fonts, spacing } from "../tokens/generated/tokens.stylex";
import tokens from "../tokens/tokens.json";
import { groupPrimitiveColors } from "./primitive-color-groups";

const groups = groupPrimitiveColors(tokens.primitive.color);

export function PrimitiveColors() {
  return (
    <div {...stylex.props(styles.palette)}>
      {groups.map((group) => (
        <ul key={group[0].name} {...stylex.props(styles.group)}>
          {group.map((paint) => (
            <li key={paint.name} {...stylex.props(styles.chip)}>
              {/**
               * Primitive paints are not StyleX vars. The host only
               * passes the OKLCH string and the chip size (280px matches
               * the caption line). stylex.props cannot share an element
               * with `style`.
               */}
              <div
                style={
                  {
                    "--primitive-paint": paint.value,
                    height: 280,
                    width: 280,
                  } as CSSProperties
                }
              >
                <div {...stylex.props(styles.swatch)} />
              </div>
              <div {...stylex.props(styles.caption)}>
                <span>{paint.name}</span>
                <span {...stylex.props(styles.code)}>{paint.value}</span>
              </div>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}

const styles = stylex.create({
  palette: {
    gap: spacing.l,
    display: "flex",
    flexDirection: "column",
    fontFamily: fonts.family,
    fontSize: fonts.size,
  },
  group: {
    margin: 0,
    padding: 0,
    gap: spacing.s,
    display: "flex",
    flexWrap: "wrap",
    listStyleType: "none",
  },
  chip: {
    gap: spacing.s,
    display: "flex",
    flexDirection: "column",
    flexGrow: 0,
    flexShrink: 0,
  },
  swatch: {
    borderColor: colors.foreground,
    borderStyle: "solid",
    borderWidth: spacing.px,
    backgroundColor: "var(--primitive-paint)",
    blockSize: "100%",
    inlineSize: "100%",
  },
  caption: {
    gap: spacing.s,
    color: colors.foreground,
    display: "flex",
    flexDirection: "column",
  },
  code: {
    color: colors.foreground,
    fontFamily: fonts.mono,
    whiteSpace: "nowrap",
  },
});
