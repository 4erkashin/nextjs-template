import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { expect, fn } from "storybook/test";

import GlobalError from "./global-error";

/**
 * Storybook's catalog entry for this file.
 * `export default meta` is how Storybook finds the component
 * and the defaults every story inherits.
 *
 * `args` are the props GlobalError receives unless a story overrides them.
 * `fn()` is a mock — TryAgain's play function asserts the button called it.
 * `tags` are Storybook labels (filters, badges); they are not React props.
 *
 * `satisfies Meta<typeof GlobalError>` is a TypeScript check, not Storybook runtime.
 * `typeof GlobalError` means "the type of this component" (its props).
 *
 * `Meta<…>` is Storybook's shape for a catalog entry of that component:
 * `component`, `args`, `tags`, and so on.
 *
 * `satisfies` means: fail the compile if this object is not a valid Meta,
 * but keep `meta`'s type as what we actually wrote (these exact args),
 * not as the wider Meta type.
 *
 * Writing `const meta: Meta<…> = { … }` would still check,
 * then forget that `error` and `retry` are always present.
 * `StoryObj<typeof meta>` below needs that narrower type
 * so `args.error` and `args.retry` stay known in the play functions.
 */
const meta = {
  args: {
    error: Object.assign(new Error("Layout failed to render"), {
      digest: "abc123",
    }),
    retry: fn(),
  },
  component: GlobalError,
  tags: ["ai-generated"],
} satisfies Meta<typeof GlobalError>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("heading", {
        name: "This view could not be loaded.",
      }),
    ).toBeVisible();
    await expect(
      canvas.getByText("The page failed before it could render."),
    ).toBeVisible();
    await expect(canvas.getByText("Ref abc123")).toBeVisible();
  },
};

export const TryAgain: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Try again" }));
    await expect(args.retry).toHaveBeenCalledOnce();
  },
};
