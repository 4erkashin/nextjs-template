"use client";

import * as stylex from "@stylexjs/stylex";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import { motionTime } from "../tokens/generated/motion";
import { colors, fonts, spacing } from "../tokens/generated/tokens.stylex";

const startingItems = [1, 2, 3];

export function MotionCookbook() {
  const [items, setItems] = useState(startingItems);
  const [nextId, setNextId] = useState(4);

  function addRow() {
    setItems((current) => [...current, nextId]);
    setNextId((id) => id + 1);
  }

  function removeRow(id: number) {
    setItems((current) => current.filter((item) => item !== id));
  }

  return (
    <section {...stylex.props(styles.box)}>
      <p>
        Motion cookbook: layout projection. Use StyleX for color, hover, and
        opacity. This list is not the CSS cookbook.
      </p>
      <button onClick={addRow} type="button">
        Add row
      </button>
      <ul {...stylex.props(styles.list)}>
        <AnimatePresence>
          {items.map((id) => (
            <motion.li
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              key={id}
              layout
              layoutId={`motion-cookbook-${id}`}
              transition={{
                layout: { type: "spring" },
                opacity: {
                  duration: motionTime.fade,
                  ease: motionTime.easingStandard,
                },
              }}
            >
              <div {...stylex.props(styles.row)}>
                <span>Row {id}</span>
                <button onClick={() => removeRow(id)} type="button">
                  Remove
                </button>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </section>
  );
}

const styles = stylex.create({
  box: {
    padding: spacing.m,
    borderColor: colors.accent,
    borderStyle: "solid",
    borderWidth: spacing.s,
    gap: spacing.m,
    backgroundColor: colors.bg,
    color: colors.text,
    display: "flex",
    flexDirection: "column",
    fontFamily: fonts.family,
    fontSize: fonts.size,
  },
  list: {
    margin: 0,
    padding: 0,
    gap: spacing.s,
    display: "flex",
    flexDirection: "column",
    listStyleType: "none",
  },
  row: {
    padding: spacing.s,
    gap: spacing.s,
    display: "flex",
    justifyContent: "space-between",
  },
});
