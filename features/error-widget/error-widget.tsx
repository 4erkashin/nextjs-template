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

const chromeStyles = stylex.create({
  foot: {
    borderTopWidth: spacing.px,
  },
  hash: {
    letterSpacing: "0.14em",
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
  status: {
    borderBottomWidth: spacing.px,
  },
  strip: {
    borderColor: colors.border,
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
  trace: {
    color: colors.foreground,
  },
});

function Chrome({
  digest,
  slot,
}: {
  digest?: string;
  slot: "foot" | "status";
}) {
  if (slot === "status") {
    return (
      <header {...stylex.props(chromeStyles.strip, chromeStyles.status)}>
        <span {...stylex.props(chromeStyles.live)}>link up</span>
        <span {...stylex.props(chromeStyles.trace)}>trace 14%</span>
        <span>ice active</span>
      </header>
    );
  }

  return (
    <footer {...stylex.props(chromeStyles.strip, chromeStyles.foot)}>
      <span {...stylex.props(chromeStyles.hash)}>
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
    animationDuration: "22s",
    animationIterationCount: "infinite",
    animationName: {
      default: scroll,
      [queries.reducedMotion]: "none",
    },
    animationTimingFunction: "linear",
  },
  rail: {
    overflow: "hidden",
    paddingBlock: "1rem",
    paddingInline: "0.85rem",
    borderInlineEndColor: colors.border,
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
  main: {
    gap: "1.25rem",
    paddingInline: "2rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    paddingBottom: "3.5rem",
    paddingTop: "2.5rem",
  },
  path: {
    margin: 0,
    color: colors.foreground,
    fontSize: "0.75rem",
    letterSpacing: "0.08em",
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
  },
  title: {
    margin: 0,
    color: colors.foreground,
    fontSize: "clamp(1.75rem, 5vw, 3rem)",
    fontWeight: 800,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
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
        <Chrome slot="status" />

        <div {...stylex.props(styles.deck)}>
          <HexRail />

          <div {...stylex.props(styles.main)}>
            <p {...stylex.props(styles.path)}>{"//breach/view/render"}</p>
            <h1 {...stylex.props(styles.title)}>{title}</h1>
            <p {...stylex.props(styles.description)}>{description}</p>
            <RetryButton onClick={onRetry}>{tryAgain}</RetryButton>
          </div>
        </div>

        <Chrome digest={digest} slot="foot" />
      </Scanlines>
    </section>
  );
}
