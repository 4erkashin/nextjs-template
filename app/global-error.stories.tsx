import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { fn } from "storybook/test";

import { EXAMPLE_ERROR_DIGEST } from "@/.storybook/error-digest";
import { routing } from "@/i18n/routing";

import GlobalError from "./global-error";

const meta = {
  args: {
    error: Object.assign(new Error("Layout failed to render"), {
      digest: EXAMPLE_ERROR_DIGEST,
    }),
    retry: fn(),
  },
  component: GlobalError,
  render: (args, { globals }) => {
    const localeOverride = routing.locales.find(
      (item) => item === globals.locale,
    );

    return <GlobalError {...args} localeOverride={localeOverride} />;
  },
  tags: ["ai-generated"],
} satisfies Meta<typeof GlobalError>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
