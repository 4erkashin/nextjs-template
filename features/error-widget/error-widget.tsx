"use client";

import * as stylex from "@stylexjs/stylex";
import { Share_Tech_Mono } from "next/font/google";

import { colors } from "@/tokens/generated/tokens.stylex";

import styles from "./error-widget.module.css";

export type ErrorWidgetProps = {
  description: string;
  digest?: string;
  onRetry: () => void;
  title: string;
  tryAgain: string;
};

const shareTech = Share_Tech_Mono({
  subsets: ["latin"],
  variable: "--error-widget-mono",
  weight: "400",
});

const colorStyles = stylex.create({
  chrome: {
    borderColor: colors.border,
    color: colors.textSecondary,
  },
  description: {
    color: colors.textSecondary,
  },
  hex: {
    color: colors.textFaint,
    borderRightColor: colors.border,
  },
  live: {
    color: colors.decorativeAccent,
    "::before": {
      backgroundColor: colors.decorativeAccent,
      boxShadow: `0 0 8px ${colors.decorativeAccent}`,
    },
  },
  path: {
    color: colors.textSecondary,
  },
  retry: {
    borderColor: colors.decorativeAccent,
    backgroundColor: {
      default: colors.decorativeAccentSubtle,
      ":focus-visible": colors.decorativeAccent,
      ":hover": colors.decorativeAccent,
    },
    boxShadow: `0 0 0 1px ${colors.surface}, 0 0 18px ${colors.decorativeAccentGlow}`,
    color: {
      default: colors.decorativeAccent,
      ":focus-visible": colors.onDecorativeAccent,
      ":hover": colors.onDecorativeAccent,
    },
    "::after": {
      backgroundColor: {
        default: colors.decorativeAccent,
        ":focus-visible": colors.onDecorativeAccent,
        ":hover": colors.onDecorativeAccent,
      },
    },
    "::before": {
      color: {
        default: colors.highlight,
        ":focus-visible": colors.onDecorativeAccent,
        ":hover": colors.onDecorativeAccent,
      },
    },
  },
  root: {
    backgroundColor: colors.surface,
    color: colors.decorativeAccent,
    "::after": {
      backgroundImage: `radial-gradient(ellipse at center, transparent 50%, ${colors.overlayStrong} 100%)`,
    },
    "::before": {
      backgroundImage: `repeating-linear-gradient(to bottom, transparent 0, transparent 2px, ${colors.overlay} 2px, ${colors.overlay} 3px)`,
    },
  },
  title: {
    color: colors.textHeading,
    textShadow: `-2px 0 ${colors.decorativeShift}, 2px 0 ${colors.decorativeShiftAlt}`,
  },
  trace: {
    color: colors.highlight,
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
    <section
      className={`${styles.root} ${shareTech.variable} ${stylex.props(colorStyles.root).className}`}
    >
      <header
        className={`${styles.status} ${stylex.props(colorStyles.chrome).className}`}
      >
        <span
          className={`${styles.live} ${stylex.props(colorStyles.live).className}`}
        >
          link up
        </span>
        <span
          className={`${styles.trace} ${stylex.props(colorStyles.trace).className}`}
        >
          trace 14%
        </span>
        <span>ice active</span>
      </header>

      <div className={styles.deck}>
        <aside
          aria-hidden="true"
          className={`${styles.hex} ${stylex.props(colorStyles.hex).className}`}
        >
          <pre className={styles.hexInner}>{dump}</pre>
        </aside>

        <div className={styles.main}>
          <p
            className={`${styles.path} ${stylex.props(colorStyles.path).className}`}
          >
            {"//breach/view/render"}
          </p>
          <h1
            className={`${styles.title} ${stylex.props(colorStyles.title).className}`}
          >
            {title}
          </h1>
          <p
            className={`${styles.description} ${stylex.props(colorStyles.description).className}`}
          >
            {description}
          </p>
          <button
            className={`${styles.retry} ${stylex.props(colorStyles.retry).className}`}
            onClick={onRetry}
            type="button"
          >
            {tryAgain}
          </button>
        </div>
      </div>

      <footer
        className={`${styles.foot} ${stylex.props(colorStyles.chrome).className}`}
      >
        <span className={styles.hash}>
          {digest ? `hash ${digest}` : "hash —"}
        </span>
        <span>net::session</span>
      </footer>
    </section>
  );
}
