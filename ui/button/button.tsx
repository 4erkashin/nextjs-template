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
    position: "relative",
    boxSizing: "border-box",
    display: "inline-flex",
    gap: spacing.sm,
    alignItems: "center",
    paddingBlock: spacing.md,
    paddingInline: spacing.lg,
    fontFamily: fonts.mono,
    fontWeight: 800,
    textTransform: "uppercase",
    // extract after some system will emerge
    letterSpacing: "0.2em",
    cursor: "pointer",
    outline: {
      ":focus-visible": "none",
      ":hover": "none",
    },
    borderStyle: "none",
    /**
     * Own stacking context so the outline hole can sit at z-index -1
     * (behind the label, in front of the ring) without falling through
     * behind the parent page.
     */
    isolation: "isolate",
    transform: {
      ":active": `translateY(${spacing.px})`,
    },
  },
  /**
   * A filled button stays inverted from the page. Hover and focus snap
   * in a signal rule instead of flooding the whole control with primary.
   */
  fill: {
    color: {
      default: colors.background,
      ":focus-visible": colors.primary,
      ":hover": colors.primary,
    },
    backgroundColor: colors.foreground,
    boxShadow: {
      default: "none",
      ":focus-visible": `inset 0 0 0 ${spacing.px} ${colors.flare}`,
      ":hover": `inset 0 0 0 ${spacing.px} ${colors.primary}`,
    },
  },
  outline: {
    color: colors.primary,
    backgroundColor: colors.primary,
  },
  /**
   * Smaller fill inside the clipped button. Border plus clip-path cannot
   * stroke the cut: the border is a rectangle, the clip just slices it.
   * The gap between this shape and the host is the outline. The hole
   * stays background so hover does not fill the cut and the outline
   * stays an outline.
   */
  hole: {
    position: "absolute",
    inset: spacing.px,
    // extract after some system will emerge
    zIndex: -1,
    pointerEvents: "none",
    backgroundColor: colors.background,
    clipPath: "inherit",
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
