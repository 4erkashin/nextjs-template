"use client";

import { Button as BaseButton } from "@base-ui/react/button";
import * as stylex from "@stylexjs/stylex";
import { type ComponentProps } from "react";

import { colors, fonts, spacing } from "@/tokens/generated/tokens.stylex";

export type ButtonProps = Omit<ComponentProps<typeof BaseButton>, "width"> & {
  shape?: "rect" | "slash" | "tab";
  surface?: "fill" | "outline";
  width?: "hug" | "stretch";
};

/**
 * Same unions as the props, without `undefined`. Stories use these so a
 * `satisfies ButtonShape[]` list is only real shapes, not "shape or missing".
 */
export type ButtonShape = NonNullable<ButtonProps["shape"]>;
export type ButtonSurface = NonNullable<ButtonProps["surface"]>;
export type ButtonWidth = NonNullable<ButtonProps["width"]>;

const styles = stylex.create({
  root: {
    borderStyle: "none",
    gap: spacing.sm,
    outline: {
      ":focus-visible": "none",
      ":hover": "none",
    },
    paddingBlock: spacing.md,
    paddingInline: spacing.lg,
    alignItems: "center",
    boxSizing: "border-box",
    cursor: "pointer",
    display: "inline-flex",
    fontFamily: fonts.mono,
    fontWeight: 800,
    /**
     * Own stacking context so the outline hole can sit at z-index -1
     * (behind the label, in front of the ring) without falling through
     * behind the parent page.
     */
    isolation: "isolate",
    // extract after some system will emerge
    letterSpacing: "0.2em",
    position: "relative",
    textTransform: "uppercase",
    transform: {
      ":active": `translateY(${spacing.px})`,
    },
  },
  /**
   * A filled button stays secondary. Hover and focus snap in a signal rule
   * instead of flooding the whole control with primary.
   */
  fill: {
    backgroundColor: colors.secondary,
    color: {
      default: colors.secondaryForeground,
      ":focus-visible": colors.primary,
      ":hover": colors.primary,
    },
    boxShadow: {
      default: "none",
      ":focus-visible": `inset 0 0 0 ${spacing.px} ${colors.ring}`,
      ":hover": `inset 0 0 0 ${spacing.px} ${colors.primary}`,
    },
  },
  outline: {
    backgroundColor: colors.primary,
    color: colors.primary,
  },
  /**
   * Smaller fill inside the clipped button. Border plus clip-path cannot
   * stroke the cut: the border is a rectangle, the clip just slices it.
   * The gap between this shape and the host is the outline. Hover and
   * Hover and focus move the hole to muted rather than painting it primary,
   * so an outline remains an outline.
   */
  hole: {
    inset: spacing.px,
    backgroundColor: {
      default: colors.background,
      [stylex.when.ancestor(":focus-visible")]: colors.muted,
      [stylex.when.ancestor(":hover")]: colors.muted,
    },
    clipPath: "inherit",
    pointerEvents: "none",
    position: "absolute",
    // extract after some system will emerge
    zIndex: -1,
  },
  hug: {
    width: "fit-content",
  },
  stretch: {
    width: "100%",
  },
  rect: {
    clipPath: "none",
  },
  slash: {
    clipPath: `polygon(0 0, 100% 0, calc(100% - ${spacing.md}) 100%, 0 100%)`,
  },
  tab: {
    clipPath: `polygon(0 0, calc(100% - ${spacing.sm}) 0, 100% ${spacing.sm}, 100% calc(100% - ${spacing.md}), calc(100% - ${spacing.md}) 100%, 0 100%)`,
  },
});

export function Button({
  children,
  shape = "tab",
  surface = "fill",
  type = "button",
  width = "hug",
  ...props
}: ButtonProps) {
  return (
    <BaseButton
      type={type}
      {...props}
      {...stylex.props(
        styles.root,
        styles[surface],
        styles[width],
        styles[shape],
        stylex.defaultMarker(),
      )}
    >
      {surface === "outline" && (
        <span aria-hidden {...stylex.props(styles.hole)} />
      )}

      {children}
    </BaseButton>
  );
}
