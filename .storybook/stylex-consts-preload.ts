import type { Connect, Plugin, ViteDevServer } from "vite";

import fs from "node:fs";
import path from "node:path";

/**
 * StyleX's Vite plugin injects a stylesheet link to this path.
 * The path is not exported by `@stylexjs/unplugin`; it is copied
 * from that package's consts file.
 */
const STYLE_X_DEV_CSS_PATH = "/virtual:stylex.css";

const generatedDir = path.resolve(import.meta.dirname, "../tokens/generated");

/**
 * Vite URLs for every generated `*.stylex.ts` file.
 * Paths are relative to Vite's root so `transformRequest` hits the
 * same modules StyleX will compile later.
 */
function generatedStylexUrls(root: string): string[] {
  if (!fs.existsSync(generatedDir)) {
    throw new Error(
      "tokens/generated is missing. Run pnpm tokens:build before Storybook.",
    );
  }

  const files = fs
    .readdirSync(generatedDir)
    .filter((name) => name.endsWith(".stylex.ts"))
    .sort();

  if (files.length === 0) {
    throw new Error(
      "tokens/generated has no *.stylex.ts files. Run pnpm tokens:build before Storybook.",
    );
  }

  return files.map((name) => {
    const absolute = path.join(generatedDir, name);
    const relative = path.relative(root, absolute).split(path.sep).join("/");

    return relative.startsWith(".") ? `/@fs/${absolute}` : `/${relative}`;
  });
}

function preloadGeneratedStylex(server: ViteDevServer): Promise<unknown[]> {
  const urls = generatedStylexUrls(server.config.root);

  return Promise.all(urls.map((url) => server.transformRequest(url)));
}

/**
 * Vite can request StyleX's virtual CSS before it has compiled the
 * generated const files. StyleX then writes `var(--hash)` where a
 * media query should be, and lightningcss throws
 * `Invalid empty selector`.
 *
 * This middleware runs first. It compiles every generated
 * `*.stylex.ts` file so the const map is filled, then lets StyleX
 * serve the CSS.
 */
export function stylexConstsPreloadPlugin(): Plugin {
  return {
    configureServer(server) {
      const handle: Connect.NextHandleFunction = (req, _res, next) => {
        if (!req.url?.startsWith(STYLE_X_DEV_CSS_PATH)) {
          next();
          return;
        }

        void preloadGeneratedStylex(server).then(() => {
          next();
        }, next);
      };

      /**
       * StyleX is also `enforce: "pre"` and ends the CSS request.
       * Returning a function runs after every plugin has registered
       * middleware; unshift puts this handle first so consts compile
       * before lightningcss sees the CSS.
       */
      return () => {
        server.middlewares.stack.unshift({
          handle,
          route: "",
        });
      };
    },
    enforce: "pre",
    name: "storybook-stylex-consts-preload",
  };
}
