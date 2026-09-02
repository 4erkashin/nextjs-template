import type { StorybookConfig } from "@storybook/nextjs-vite";

import stylex from "@stylexjs/unplugin";
import autoprefixer from "autoprefixer";

import { stylexOptions } from "../babel.config.js";

const config: StorybookConfig = {
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-mcp",
    "@storybook/addon-themes",
    "msw-storybook-addon",
    "storybook-next-intl",
  ],
  framework: "@storybook/nextjs-vite",
  staticDirs: ["../public"],
  stories: [
    "../app/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../ui/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  async viteFinal(viteConfig) {
    const { mergeConfig } = await import("vite");

    return mergeConfig(viteConfig, {
      css: {
        postcss: {
          plugins: [autoprefixer()],
        },
      },
      plugins: [
        stylex.vite({
          ...stylexOptions,
          useCSSLayers: true,
        }),
      ],
    });
  },
};
export default config;
