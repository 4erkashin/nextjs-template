import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { MotionCookbook } from "./motion-cookbook";

const meta = {
  component: MotionCookbook,
  parameters: {
    docs: {
      codePanel: true,
      source: {
        code: `<AnimatePresence initial={false} mode="popLayout">
  <motion.li
    layout="position"
    layoutId={\`motion-cookbook-\${id}\`}
    initial={{ height: 0, opacity: 0 }}
    animate={{ height: "auto", opacity: 1 }}
    exit={{ opacity: 0, y: 8 }}
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
  />
</AnimatePresence>`,
        language: "tsx",
        type: "code",
      },
    },
  },
  title: "Cookbooks/Motion",
} satisfies Meta<typeof MotionCookbook>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
