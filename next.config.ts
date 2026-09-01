import type { NextConfig } from "next";

import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  turbopack: {
    root: import.meta.dirname,
    rules: {
      "*.svg": {
        as: "*.js",
        loaders: [
          {
            // Do not set SVGR `icon: true` — it forces 1em×1em.
            loader: "@svgr/webpack",
          },
        ],
      },
    },
  },
};

const withNextIntl = createNextIntlPlugin({
  experimental: {
    createMessagesDeclaration: "./messages/en.json",
  },
});

export default withNextIntl(nextConfig);
