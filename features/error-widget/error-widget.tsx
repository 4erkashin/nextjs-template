"use client";

import * as stylex from "@stylexjs/stylex";

import { queries } from "@/tokens/generated/queries.stylex";
import { colors, fonts, spacing } from "@/tokens/generated/tokens.stylex";

export type ErrorWidgetProps = {
  description: string;
  digest?: string;
  onRetry: () => void;
  title: string;
  tryAgain: string;
};

const blink = stylex.keyframes({
  "50%": {
    opacity: 0,
  },
});

const scroll = stylex.keyframes({
  to: {
    transform: "translateY(-50%)",
  },
});

const glitch = stylex.keyframes({
  "0%": {
    clipPath: "inset(0 0 0 0)",
    transform: "none",
  },
  "86%": {
    clipPath: "inset(0 0 0 0)",
    transform: "none",
  },
  "88%": {
    clipPath: "inset(12% 0 54% 0)",
    transform: "translate(3px, -1px)",
  },
  "92%": {
    clipPath: "inset(40% 0 18% 0)",
    transform: "translate(-4px, 1px)",
  },
  "100%": {
    clipPath: "inset(0 0 0 0)",
    transform: "none",
  },
});

const HEX_LINES = [
  "A0F001 7C12E4 00BADA 91FF0C 3E3E3E F00D1E 0C0C0C DEAD01",
  "B17E22 04CC11 88F0A0 1199EE C0FFEE 0BADF0 55AA55 101010",
  "C2A933 77E100 FACE01 33CC99 010101 FFFF00 0A0A0A 7E7E7E",
  "D3B044 AA00FF 12AB34 998877 667788 445566 223344 001122",
  "E4C155 0F0F0F ABCDEF 13579B 2468AC DEF012 89ABCD EF0123",
  "F5D266 314159 271828 161803 141421 000FFF 111000 DEADC0",
  "06E377 CAFE01 BABE02 FEED03 FACE04 DEED05 BEEF06 F00D07",
  "17F488 090909 121212 1B1B1B 242424 2D2D2D 363636 3F3F3F",
  "280599 4A8F63 7CFFB2 E8FF6A FF3D6E 3DF0FF 16351F 050806",
  "3916AA 80FF80 00FF66 33FF99 66FFCC 99FFFF CCFFEE FFFFF0",
  "4A27BB 101828 203040 304050 405060 506070 607080 708090",
  "5B38CC AAAFFF 555AAA FFF000 000FFF ABC123 DEF456 789ABC",
];

const styles = stylex.create({
  chrome: {
    borderColor: colors.foreground,
    borderStyle: "solid",
    borderWidth: 0,
    gap: "1rem",
    paddingBlock: "0.65rem",
    paddingInline: "1rem",
    alignItems: "center",
    color: colors.foreground,
    display: "flex",
    fontSize: "0.7rem",
    justifyContent: "space-between",
    letterSpacing: "0.16em",
    position: "relative",
    textTransform: "uppercase",
    zIndex: 1,
  },
  deck: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(12rem, 28%) 1fr",
      "@media (width < 48rem)": "1fr",
    },
    position: "relative",
    zIndex: 1,
    minHeight: 0,
  },
  description: {
    margin: 0,
    color: colors.foreground,
    "::before": {
      content: '"# "',
    },
  },
  foot: {
    borderTopWidth: spacing.px,
  },
  hash: {
    letterSpacing: "0.14em",
  },
  hex: {
    overflow: "hidden",
    paddingBlock: "1rem",
    paddingInline: "0.85rem",
    borderInlineEndColor: colors.foreground,
    borderInlineEndStyle: "solid",
    borderInlineEndWidth: spacing.px,
    color: colors.foreground,
    display: {
      default: "block",
      "@media (width < 48rem)": "none",
    },
    fontSize: "0.68rem",
    lineHeight: 1.55,
    userSelect: "none",
  },
  hexInner: {
    animationDuration: "22s",
    animationIterationCount: "infinite",
    animationName: {
      default: scroll,
      [queries.reducedMotion]: "none",
    },
    animationTimingFunction: "linear",
  },
  live: {
    color: colors.foreground,
    "::before": {
      animationDuration: "1.1s",
      animationIterationCount: "infinite",
      animationName: {
        default: blink,
        [queries.reducedMotion]: "none",
      },
      animationTimingFunction: "step-end",
      backgroundColor: colors.foreground,
      boxShadow: `0 0 8px ${colors.foreground}`,
      content: '""',
      display: "inline-block",
      marginInlineEnd: "0.45rem",
      height: "0.45rem",
      width: "0.45rem",
    },
  },
  main: {
    gap: "1.25rem",
    paddingInline: "2rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    maxWidth: "42rem",
    paddingBottom: "3.5rem",
    paddingTop: "2.5rem",
  },
  path: {
    margin: 0,
    color: colors.foreground,
    fontSize: "0.75rem",
    letterSpacing: "0.08em",
  },
  retry: {
    font: "inherit",
    borderColor: colors.foreground,
    borderStyle: "solid",
    borderWidth: spacing.px,
    gap: "0.65rem",
    outline: {
      ":focus-visible": "none",
      ":hover": "none",
    },
    paddingBlock: "0.55rem",
    paddingInline: "0.85rem",
    alignItems: "center",
    backgroundColor: {
      default: colors.background,
      ":focus-visible": colors.foreground,
      ":hover": colors.foreground,
    },
    boxShadow: `0 0 0 1px ${colors.background}, 0 0 18px ${colors.foreground}`,
    color: {
      default: colors.foreground,
      ":focus-visible": colors.background,
      ":hover": colors.background,
    },
    cursor: "pointer",
    display: "inline-flex",
    letterSpacing: "0.08em",
    textTransform: "lowercase",
    width: "fit-content",
    "::after": {
      animationDuration: "0.9s",
      animationIterationCount: "infinite",
      animationName: {
        default: blink,
        [queries.reducedMotion]: "none",
      },
      animationTimingFunction: "step-end",
      backgroundColor: {
        default: colors.foreground,
        ":focus-visible": colors.background,
        ":hover": colors.background,
      },
      content: '""',
      height: "1em",
      width: "0.55rem",
    },
    "::before": {
      color: {
        default: colors.foreground,
        ":focus-visible": colors.background,
        ":hover": colors.background,
      },
      content: '">"',
    },
  },
  root: {
    overflow: "hidden",
    backgroundColor: colors.background,
    color: colors.foreground,
    display: "grid",
    fontFamily: fonts.mono,
    gridTemplateRows: "auto 1fr auto",
    isolation: "isolate",
    position: "relative",
    minHeight: "100dvh",
    "::after": {
      inset: 0,
      backgroundImage: `radial-gradient(ellipse at center, transparent 50%, ${colors.foreground} 100%)`,
      content: '""',
      pointerEvents: "none",
      position: "absolute",
      zIndex: 3,
    },
    "::before": {
      inset: 0,
      backgroundImage: `repeating-linear-gradient(to bottom, transparent 0, transparent 2px, ${colors.foreground} 2px, ${colors.foreground} 3px)`,
      content: '""',
      pointerEvents: "none",
      position: "absolute",
      zIndex: 2,
    },
  },
  status: {
    borderBottomWidth: spacing.px,
  },
  title: {
    margin: 0,
    animationDuration: "3.6s",
    animationIterationCount: "infinite",
    animationName: {
      default: glitch,
      [queries.reducedMotion]: "none",
    },
    animationTimingFunction: "steps(2, end)",
    color: colors.foreground,
    fontSize: "clamp(1.4rem, 3.2vw, 2.15rem)",
    fontWeight: 400,
    lineHeight: 1.2,
    position: "relative",
    textShadow: `-2px 0 ${colors.foreground}, 2px 0 ${colors.foreground}`,
  },
  trace: {
    color: colors.foreground,
  },
});

/**
 * Failure lockup for `error.tsx` and `global-error.tsx`.
 * Callers pass copy and retry; this file owns the look.
 */
export function ErrorWidget({
  description,
  digest,
  onRetry,
  title,
  tryAgain,
}: ErrorWidgetProps) {
  const dump = [...HEX_LINES, ...HEX_LINES].join("\n");

  return (
    <section {...stylex.props(styles.root)}>
      <header {...stylex.props(styles.chrome, styles.status)}>
        <span {...stylex.props(styles.live)}>link up</span>
        <span {...stylex.props(styles.trace)}>trace 14%</span>
        <span>ice active</span>
      </header>

      <div {...stylex.props(styles.deck)}>
        <aside aria-hidden="true" {...stylex.props(styles.hex)}>
          <pre {...stylex.props(styles.hexInner)}>{dump}</pre>
        </aside>

        <div {...stylex.props(styles.main)}>
          <p {...stylex.props(styles.path)}>{"//breach/view/render"}</p>
          <h1 {...stylex.props(styles.title)}>{title}</h1>
          <p {...stylex.props(styles.description)}>{description}</p>
          <button
            onClick={onRetry}
            type="button"
            {...stylex.props(styles.retry)}
          >
            {tryAgain}
          </button>
        </div>
      </div>

      <footer {...stylex.props(styles.chrome, styles.foot)}>
        <span {...stylex.props(styles.hash)}>
          {digest ? `hash ${digest}` : "hash —"}
        </span>
        <span>net::session</span>
      </footer>
    </section>
  );
}
