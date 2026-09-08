# One Tokens Studio file, three sets, themes as color assignments

The Tokens Studio Starter plan can git-sync only one JSON file. Multi-file sync is Pro, not a requirement for layers. We keep `tokens/tokens.json` as that file, with sets `primitive`, `light`, and `dark`. Primitive holds materials and today's theme-invariant scales. Light and dark hold the same semantic color paths with different values. `$themes` lists those two combos for Figma; `tokens/build.js` is what code trusts (primitive plus exactly one of light or dark, matching color paths).
