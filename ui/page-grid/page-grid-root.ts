import * as stylex from "@stylexjs/stylex";

/**
 * Equal modules on the sheet. Overlay children must use this same
 * count so the painted tracks match the template.
 */
export const PAGE_GRID_COLUMNS = 12;

export const pageGridStyles = stylex.create({
  root: {
    boxSizing: "border-box",
    display: "grid",
    gridTemplateColumns: `repeat(${PAGE_GRID_COLUMNS}, minmax(0, 1fr))`,
    width: "100%",
  },
});
