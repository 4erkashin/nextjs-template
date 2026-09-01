import type { StorybookConfig } from "@storybook/nextjs-vite";

const config: StorybookConfig = {
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-mcp",
    "msw-storybook-addon",
  ],
  framework: "@storybook/nextjs-vite",
  staticDirs: ["../public"],
  stories: ["../app/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
};
export default config;
