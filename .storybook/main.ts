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
   * Colors <html> from the OS before manager.ts runs, so the chrome
   * is not white while JS loads. Colors come from theme-shell.ts —
   * not a second palette. manager.ts overwrites this once it knows
   * the toolbar pick.
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
   * `async` lets us `await import("vite")` instead of importing Vite at the
   * top of the file, so Vite is only loaded when Storybook actually needs
   * this hook.
   *
   * We merge in PostCSS + Autoprefixer, as a preload plugin,
   * so generated StyleX consts compile before `/virtual:stylex.css`,
   * and the StyleX Vite plugin (same options as `babel.config.js`, plus CSS layers).
   * The preload plugin must stay first.
   * Without this hook, Storybook would still start,
   * but StyleX styles and Autoprefixer would not be wired into its Vite pipeline.
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
