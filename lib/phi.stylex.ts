import * as stylex from "@stylexjs/stylex";

/**
 * The golden ratio, often written φ. In graphic design it is a
 * usual way to pair two sizes so they feel related, not random:
 * the larger size is about 1.618 times the smaller one (a poster
 * title next to smaller type, a wide block next to a narrow one).
 */
export const PHI = stylex.defineConsts({
  ratio: 1.618,
});
