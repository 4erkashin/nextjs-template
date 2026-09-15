"use client";

import * as stylex from "@stylexjs/stylex";

import { queries } from "@/tokens/generated/queries.stylex";
import { colors, fonts, spacing } from "@/tokens/generated/tokens.stylex";
import { Scanlines } from "@/ui/scanlines";

import { RetryButton } from "./retry-button";

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

const stripStyles = stylex.create({
  foot: {
    borderTopWidth: spacing.px,
  },
  hash: {
    letterSpacing: "0.14em",
  },
  live: {
    color: colors.foreground,
    "::before": {
      display: "inline-block",
      width: "0.45rem",
      height: "0.45rem",
      marginInlineEnd: "0.45rem",
      content: '""',
      backgroundColor: colors.foreground,
      boxShadow: `0 0 8px ${colors.foreground}`,
      animationName: {
        default: blink,
        [queries.reducedMotion]: "none",
      },
      animationDuration: "1.1s",
      animationTimingFunction: "step-end",
      animationIterationCount: "infinite",
    },
  },
  status: {
    borderBottomWidth: spacing.px,
  },
  strip: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    gap: "1rem",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBlock: "0.65rem",
    paddingInline: "1rem",
    fontSize: "0.7rem",
    color: colors.foreground,
    textTransform: "uppercase",
    letterSpacing: "0.16em",
    borderColor: colors.foreground,
    borderStyle: "solid",
    borderWidth: 0,
  },
  trace: {
    color: colors.foreground,
  },
});

function Strip({
  digest,
  slot,
}: {
  digest?: string;
  slot: "foot" | "status";
}) {
  if (slot === "status") {
    return (
      <header {...stylex.props(stripStyles.strip, stripStyles.status)}>
        <span {...stylex.props(stripStyles.live)}>link up</span>
        <span {...stylex.props(stripStyles.trace)}>trace 14%</span>
        <span>ice active</span>
      </header>
    );
  }

  return (
    <footer {...stylex.props(stripStyles.strip, stripStyles.foot)}>
      <span {...stylex.props(stripStyles.hash)}>
        {digest ? `hash ${digest}` : "hash —"}
      </span>
      <span>net::session</span>
    </footer>
  );
}

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

const hexStyles = stylex.create({
  inner: {
    animationName: {
      default: scroll,
      [queries.reducedMotion]: "none",
    },
    animationDuration: "22s",
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
  },
  rail: {
    display: {
      default: "block",
      "@media (width < 48rem)": "none",
    },
    paddingBlock: "1rem",
    paddingInline: "0.85rem",
    overflow: "hidden",
    fontSize: "0.68rem",
    lineHeight: 1.55,
    color: colors.foreground,
    userSelect: "none",
    borderInlineEndColor: colors.foreground,
    borderInlineEndStyle: "solid",
    borderInlineEndWidth: spacing.px,
  },
});

function HexRail() {
  const dump = [...HEX_LINES, ...HEX_LINES].join("\n");

  return (
    <aside aria-hidden="true" {...stylex.props(hexStyles.rail)}>
      <pre {...stylex.props(hexStyles.inner)}>{dump}</pre>
    </aside>
  );
}

const styles = stylex.create({
  deck: {
    position: "relative",
    zIndex: 1,
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(12rem, 28%) 1fr",
      "@media (width < 48rem)": "1fr",
    },
    minHeight: 0,
  },
  description: {
    margin: 0,
    color: colors.foreground,
    "::before": {
      content: '"# "',
    },
  },
  main: {
    display: "flex",
    flexDirection: "column",
    gap: "1.25rem",
    justifyContent: "center",
    paddingInline: "2rem",
    paddingTop: "2.5rem",
    paddingBottom: "3.5rem",
  },
  path: {
    margin: 0,
    fontSize: "0.75rem",
    color: colors.foreground,
    letterSpacing: "0.08em",
  },
  root: {
    position: "relative",
    display: "grid",
    gridTemplateRows: "auto 1fr auto",
    minHeight: "100dvh",
    overflow: "hidden",
    fontFamily: fonts.mono,
    color: colors.foreground,
    backgroundColor: colors.background,
    isolation: "isolate",
  },
  title: {
    margin: 0,
    fontSize: "clamp(1.75rem, 5vw, 3rem)",
    fontWeight: 800,
    color: colors.foreground,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
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
  return (
    <section {...stylex.props(styles.root)}>
      <Scanlines>
        <Strip slot="status" />

        <div {...stylex.props(styles.deck)}>
          <HexRail />

          <div {...stylex.props(styles.main)}>
            <p {...stylex.props(styles.path)}>{"//breach/view/render"}</p>
            <h1 {...stylex.props(styles.title)}>{title}</h1>
            <p {...stylex.props(styles.description)}>{description}</p>
            <RetryButton onClick={onRetry}>{tryAgain}</RetryButton>
          </div>
        </div>

        <Strip digest={digest} slot="foot" />
      </Scanlines>
    </section>
  );
}
