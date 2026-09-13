import * as stylex from "@stylexjs/stylex";

import { pageGrid } from "./page-grid.stylex";

/**
 * Content columns between the two fluid gutters. Overlay children
 * must use this same count so the painted tracks match the template.
 */
export const PAGE_GRID_CONTENT_COLUMNS = 12;

export const pageGridStyles = stylex.create({
  root: {
    boxSizing: "border-box",
    display: "grid",
    gridTemplateColumns: `minmax(${pageGrid.gutter}, 1fr) repeat(${PAGE_GRID_CONTENT_COLUMNS}, minmax(0, ${pageGrid.columnMax})) minmax(${pageGrid.gutter}, 1fr)`,
    width: "100%",
  },
});
