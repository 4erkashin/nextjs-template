import type { StorybookConfig } from "@storybook/nextjs-vite";

import stylex from "@stylexjs/unplugin";
import autoprefixer from "autoprefixer";

// Relative path: Node loads this file, so @/ aliases do not work.
import { stylexOptions } from "../babel.config.js";
import { stylexConstsPreloadPlugin } from "./stylex-consts-preload.ts";
import { appendShellFirstPaint } from "./theme-shell.ts";

const config: StorybookConfig = {
  // Package names, not file paths. Storybook loads them from node_modules.
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
  /**
   * Paints manager <html> from the OS palette before manager.ts runs,
   * so the chrome is not white while JS loads. manager.ts then applies
   * the same OS theme to the chrome and the desk around the iframe.
   */
  managerHead: appendShellFirstPaint,
  staticDirs: ["../public"],
  stories: [
    "../app/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../features/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../ui/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  /**
   * Storybook's last chance to change the Vite config before the bundler starts.
   *
   * Storybook already builds a Vite config from the rest of this file
   * (`framework`, `addons`, `stories`, and so on). Then it calls this hook
   * and passes that config in as `viteConfig`.
   *
   * `async` lets us load Vite only when Storybook calls this hook,
   * instead of importing it at the top of the file.
   *
   * We add PostCSS with Autoprefixer.
   * We add a preload plugin that compiles generated StyleX consts
   * before `/virtual:stylex.css`.
   * We add the StyleX Vite plugin (same options as `babel.config.js`, plus CSS layers).
   * The preload plugin must stay first.
   *
   * Without this hook, Storybook still starts,
   * but StyleX styles and Autoprefixer do not run.
   */
  async viteFinal(viteConfig) {
    const { mergeConfig } = await import("vite");

    return mergeConfig(viteConfig, {
      css: {
        postcss: {
          plugins: [autoprefixer()],
        },
      },
      plugins: [
        stylexConstsPreloadPlugin(),
        stylex.vite({
          ...stylexOptions,
          useCSSLayers: true,
        }),
      ],
    });
  },
};
export default config;
