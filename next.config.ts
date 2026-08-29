import type { NextConfig } from "next";

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

export default nextConfig;
