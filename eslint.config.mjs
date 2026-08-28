import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import perfectionist from "eslint-plugin-perfectionist";
import { defineConfig, globalIgnores } from "eslint/config";
import path from "node:path";

/**
 * Absolute path to a top-level layer directory (`ui`, `features`, `domain`).
 * `import/no-restricted-paths` resolves relative zone paths against the cwd, so
 * `"./ui"` would silently match nothing whenever eslint runs from anywhere but
 * the repo root. Anchoring to this file keeps the zones enforced regardless.
 */
const absoluteLayerPath = (dir) => path.join(import.meta.dirname, dir);

/** Destination ownership stays out of `ui/` (callers pass typed href). */
const uiDestinationOwnershipSyntax = [
  {
    message:
      "ui/ must not hardcode in-app destinations. Accept href from the app/ or features/ caller.",
    selector:
      "JSXAttribute[name.name='href'][value.type='Literal'][value.value=/^\\//]",
  },
  {
    message:
      "ui/ must not hardcode in-app destinations. Accept href from the app/ or features/ caller.",
    selector:
      "JSXAttribute[name.name='href'] > JSXExpressionContainer > Literal[value=/^\\//]",
  },
  {
    message:
      "ui/ must not hardcode in-app destinations. Accept href from the app/ or features/ caller.",
    selector:
      "JSXAttribute[name.name='href'] > JSXExpressionContainer > TemplateLiteral[quasis.0.value.raw=/^\\//]",
  },
];

const adrRules = {
  "@typescript-eslint/consistent-type-imports": [
    "error",
    {
      /**
       * Keeps `typeof import("…")` legal
       * (e.g. naming a module in a type annotation)
       */

      disallowTypeAnnotations: false,
      fixStyle: "inline-type-imports",
    },
  ],
  /**
   * Stops anything under `ui/` importing from `features/` or `domain/`
   * `ui/` is generic chrome; whatever knows about the product is a feature,
   * and `app/` is where the two get composed
   * Every import is followed to the file it actually lands on,
   * so a relative `../features/...` cannot sneak past either
   */
  "import/no-restricted-paths": [
    "error",
    {
      zones: [
        {
          from: absoluteLayerPath("features"),
          message:
            "ui/ must not import features. Compose feature chrome at the app/ call site instead.",
          target: absoluteLayerPath("ui"),
        },
        {
          from: absoluteLayerPath("domain"),
          message:
            "ui/ must not import domain. Keep domain vocabulary out of ui/.",
          target: absoluteLayerPath("ui"),
        },
      ],
    },
  ],
};

const sortingRules = {
  "perfectionist/sort-imports": [
    "error",
    {
      customGroups: [
        {
          elementNamePattern: "\\.svg$",
          groupName: "svg",
        },
      ],
      groups: [
        "type-import",
        ["value-builtin", "value-external"],
        "type-internal",
        "value-internal",
        "svg",
        ["type-parent", "type-sibling", "type-index"],
        ["value-parent", "value-sibling", "value-index"],
        "ts-equals-import",
        "unknown",
        ["side-effect-style", "side-effect"],
      ],
      order: "asc",
      type: "natural",
    },
  ],
  "perfectionist/sort-modules": [
    "error",
    {
      groups: [
        "declare-enum",
        "export-enum",
        "enum",
        ["declare-interface", "declare-type"],
        ["export-interface", "export-type"],
        ["interface", "type"],
        "declare-class",
        "class",
        "export-class",
        { group: "function", type: "unsorted" },
      ],
      order: "asc",
      type: "natural",
    },
  ],
  "perfectionist/sort-union-types": [
    "error",
    {
      groups: ["named", "nullish"],
    },
  ],
};

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  perfectionist.configs["recommended-natural"],
  { rules: { ...adrRules, ...sortingRules } },
  {
    files: ["ui/**/*.{ts,tsx}"],
    ignores: ["ui/**/__tests__/**"],
    rules: {
      "no-restricted-syntax": ["error", ...uiDestinationOwnershipSyntax],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Skill / agent tooling — not app code
    ".agents/**",
  ]),
  eslintConfigPrettier,
]);

export default eslintConfig;
