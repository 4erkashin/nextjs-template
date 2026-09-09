"use client";

import * as stylex from "@stylexjs/stylex";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import { motionTime } from "../../tokens/generated/motion";
import { colors, fonts, spacing } from "../../tokens/generated/tokens.stylex";

const startingItems = [1, 2, 3];

export function CookbookMotion() {
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
    <div {...stylex.props(styles.box)}>
      <button onClick={addRow} type="button">
        Add row
      </button>
      {/* Keeps row layout animation from moving the Add button. */}
      <motion.ul layoutRoot {...stylex.props(styles.list)}>
        <AnimatePresence initial={false} mode="popLayout">
          {items.map((id) => (
            <motion.li
              animate={{ height: "auto", opacity: 1 }}
              exit={{ opacity: 0, y: 8 }}
              initial={{ height: 0, opacity: 0 }}
              key={id}
              layout="position"
              layoutId={`cookbook-motion-${id}`}
              style={{ overflow: "hidden" }}
              transition={{
                height: { type: "spring" },
                layout: { type: "spring" },
                opacity: {
                  duration: motionTime.fade,
                  ease: motionTime.easingStandard,
                },
                y: {
                  duration: motionTime.move,
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
      </motion.ul>
    </div>
  );
}

const styles = stylex.create({
  box: {
    margin: 0,
    padding: spacing.m,
    borderColor: colors.foreground,
    borderStyle: "solid",
    borderWidth: spacing.px,
    gap: spacing.m,
    backgroundColor: colors.background,
    color: colors.foreground,
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
