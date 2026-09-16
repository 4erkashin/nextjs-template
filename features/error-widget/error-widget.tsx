"use client";

import * as stylex from "@stylexjs/stylex";

import { Link } from "@/i18n/navigation";
import { colors, fonts, spacing } from "@/tokens/generated/tokens.stylex";
import { Button } from "@/ui/button";

export type ErrorWidgetProps = {
  action: ErrorWidgetAction;
  description: string;
  digest?: string;
  title: string;
};

type ErrorWidgetAction =
  | {
      href: string;
      kind: "link";
      label: string;
    }
  | {
      kind: "button";
      label: string;
      onPress: () => void;
    };

const styles = stylex.create({
  actionLink: {
    boxSizing: "border-box",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "2.75rem",
    minHeight: "2.75rem",
    paddingBlock: spacing.sm,
    paddingInline: spacing.sm,
    color: colors.foreground,
    textDecorationLine: {
      default: "none",
      ":hover": "underline",
    },
    textUnderlineOffset: spacing.xs,
    outlineWidth: spacing.px,
    outlineStyle: "solid",
    outlineColor: {
      default: "transparent",
      ":focus-visible": colors.foreground,
    },
    outlineOffset: spacing.xxs,
  },
  copy: {
    display: "flex",
    flexDirection: "column",
    gap: spacing.md,
    alignSelf: "center",
    maxWidth: "56rem",
  },
  description: {
    maxWidth: "38rem",
    margin: 0,
    fontSize: "clamp(1rem, 2vw, 1.5rem)",
    lineHeight: 1.4,
  },
  digest: {
    alignSelf: "flex-end",
    margin: 0,
    fontFamily: fonts.mono,
    fontSize: "0.75rem",
    overflowWrap: "anywhere",
  },
  root: {
    boxSizing: "border-box",
    display: "grid",
    gridTemplateRows: "1fr auto",
    minHeight: "100dvh",
    paddingBlock: "clamp(1.5rem,8vh,5rem)",
    paddingInline: "clamp(1.5rem,8vw,7rem)",
    fontFamily: fonts.sans,
    color: colors.foreground,
    backgroundColor: colors.background,
  },
  title: {
    maxWidth: "12ch",
    margin: 0,
    fontSize: "clamp(3rem, 12vw, 10rem)",
    fontWeight: 600,
    lineHeight: 0.86,
    textTransform: "uppercase",
    letterSpacing: "-0.06em",
  },
});

function ErrorAction({ action }: { action: ErrorWidgetAction }) {
  if (action.kind === "link") {
    return (
      <Link href={action.href} {...stylex.props(styles.actionLink)}>
        {action.label}
      </Link>
    );
  }

  return <Button onClick={action.onPress}>{action.label}</Button>;
}

export function ErrorWidget({
  action,
  description,
  digest,
  title,
}: ErrorWidgetProps) {
  return (
    <main {...stylex.props(styles.root)}>
      <div {...stylex.props(styles.copy)}>
        <h1 {...stylex.props(styles.title)}>{title}</h1>
        <p {...stylex.props(styles.description)}>{description}</p>
        <ErrorAction action={action} />
      </div>

      {digest ? (
        <p {...stylex.props(styles.digest)}>Reference: {digest}</p>
      ) : null}
    </main>
  );
}
