# StyleX + shadcn: source-backed patterns worth copying

## Reality check

There is not yet a set of popular, battle-tested OSS *applications* that use
upstream shadcn/ui and StyleX together. A source-level search found one active,
direct implementation: **[shadcn-cssinjs](https://github.com/shadcn-labs/shadcn-cssinjs)**.
It is an unofficial, shadcn-like copy/paste registry (not shadcn/ui itself), built
on Base UI rather than Radix. Its README says exactly that, and the project had a
September 2026 commit when inspected. Treat it as the best available component
architecture reference—not social proof that the pairing is mature at scale.

The useful conclusion is still clear: keep shadcn's CSS-variable contract, let
StyleX be the component authoring surface, and use a headless primitive only for
behavior. Do not layer StyleX declarations over an unchanged Tailwind shadcn
component.

| Project | What it actually uses | Wiring pattern | Worth taking |
| --- | --- | --- | --- |
| [shadcn-labs/shadcn-cssinjs](https://github.com/shadcn-labs/shadcn-cssinjs/tree/489698127738a785557619def292f1f2f6e98ffb) | shadcn-compatible CSS tokens + StyleX + Base UI; **not** upstream shadcn/Radix | CSS vars → `defineConsts` → one StyleX recipe per primitive → `stylex.props` composition | The only direct, maintained OSS specimen found. Copy its boundaries, not every implementation detail. |
| [facebook/stylex discussion #224](https://github.com/facebook/stylex/discussions/224) | StyleX + Radix question/answer, not a component library | Spread `stylex.props()` into Radix parts; state needs controlled state or an attribute-selector workaround | Radix is compatible at the `className` boundary, but `data-state` is the sharp edge. |

## The pattern to steal

### 1. Keep shadcn theme variables; wrap them once as typed StyleX tokens

The registry's [token module](https://github.com/shadcn-labs/shadcn-cssinjs/blob/489698127738a785557619def292f1f2f6e98ffb/apps/www/registry/bases/stylex/lib/tokens.stylex.ts#L1-L47)
does not duplicate a palette. It maps the existing `--primary`, `--border`, and
`--radius` values into StyleX constants. Its global stylesheet keeps both
Tailwind's `@theme` mapping and `@stylex`, so either authoring system sees the
same values. [Source](https://github.com/shadcn-labs/shadcn-cssinjs/blob/489698127738a785557619def292f1f2f6e98ffb/apps/www/styles/globals.css#L1-L55)

```ts
// tokens.stylex.ts — one bridge, not two design systems
export const colors = stylex.defineConsts({
  background: 'var(--background)',
  border: 'var(--border)',
  primary: 'var(--primary)',
  primaryForeground: 'var(--primary-foreground)',
  ring: 'var(--ring)',
});
export const radius = stylex.defineConsts({
  md: 'calc(var(--radius) - 2px)',
});
```

**Use this when:** you are keeping shadcn's global theme and progressively
rewriting components. A `.dark`/theme change continues to work because StyleX
resolves the same CSS variables.

### 2. Make one recipe object; expose semantic variant and size maps

Its [Button](https://github.com/shadcn-labs/shadcn-cssinjs/blob/489698127738a785557619def292f1f2f6e98ffb/apps/www/registry/bases/stylex/ui/button.tsx#L12-L260)
puts base, visual variants, sizes, and pseudo-states in one `create` call.
The component then maps public `variant`/`size` names to styles and applies them
in a fixed order. [Composition and public API](https://github.com/shadcn-labs/shadcn-cssinjs/blob/489698127738a785557619def292f1f2f6e98ffb/apps/www/registry/bases/stylex/ui/button.tsx#L263-L315)

```tsx
const styles = stylex.create({
  base: {
    alignItems: 'center', display: 'inline-flex', borderRadius: radius.md,
    cursor: { default: 'pointer', ':disabled': 'not-allowed' },
    opacity: { default: 1, ':disabled': 0.5 },
  },
  primary: {
    backgroundColor: { default: colors.primary, ':hover': 'color-mix(...)' },
    color: colors.primaryForeground,
  },
  outline: { backgroundColor: colors.background, borderColor: colors.border },
  sm: { height: '1.75rem', paddingInline: '0.625rem' },
  md: { height: '2rem', paddingInline: '0.625rem' },
});

const variants = { primary: styles.primary, outline: styles.outline } as const;
const sizes = { sm: styles.sm, md: styles.md } as const;

function Button({ variant = 'primary', size = 'md', style, ...props }: Props) {
  return <button {...props} {...stylex.props(styles.base, variants[variant], sizes[size], style)} />;
}
```

**Terse rule:** `base → variant → size → consumer extension`. Make state that
should beat a variant last. Keep `variant`, `size`, and slots as domain names;
do not recreate Tailwind utilities as `styles.px2`.

### 3. Preserve shadcn's component seam, but make StyleX the visual owner

The Button retains shadcn-friendly `data-slot`, `data-variant`, and `data-size`
attributes while its visual styles live entirely in StyleX.
[Source](https://github.com/shadcn-labs/shadcn-cssinjs/blob/489698127738a785557619def292f1f2f6e98ffb/apps/www/registry/bases/stylex/ui/button.tsx#L284-L309)
That is the clean migration seam: consumers still get a familiar component API;
they do not get a split Tailwind/StyleX visual recipe.

```tsx
return <button
  data-slot="button"
  data-variant={variant}
  data-size={size}
  {...stylex.props(styles.base, variants[variant], sizes[size], style)}
/>;
```

For a primitive, replace `button` with `Dialog.Content`, `Select.Trigger`, etc.
Pass the complete `className` and inline-style result from `stylex.props` to that
part. Radix documents that parts accept `className`; a StyleX maintainer gives
the same spread pattern in [discussion #224](https://github.com/facebook/stylex/discussions/224#discussioncomment-7917405).

### 4. Use headless state as data, not an accidental selector dependency

The direct registry avoids Radix by using Base UI. If you retain Radix, its
`data-state` styling is the awkward bit. The StyleX discussion shows
`:is([data-state=open])`, but labels it a workaround; the follow-up says an API
change may replace that form. [Exact caveat](https://github.com/facebook/stylex/discussions/224#discussioncomment-7917531)

```ts
// Short-term only when a Radix part cannot expose controlled state:
const styles = stylex.create({
  item: {
    borderBottomWidth: { default: 1, ':is([data-state=open])': 2 },
  },
});

// Prefer when the primitive exposes it:
stylex.props(styles.trigger, open && styles.triggerOpen)
```

## Wiring details that matter

The reference project uses the StyleX Babel transform with
`runtimeInjection: false` and property-specific resolution.
[Babel config](https://github.com/shadcn-labs/shadcn-cssinjs/blob/489698127738a785557619def292f1f2f6e98ffb/apps/www/.babelrc#L1-L19)
It runs the StyleX PostCSS plugin **before** Tailwind, with matching compiler
options; the comment explains that this replaces `@stylex` before Tailwind
processes the stylesheet. [PostCSS config](https://github.com/shadcn-labs/shadcn-cssinjs/blob/489698127738a785557619def292f1f2f6e98ffb/apps/www/postcss.config.mjs#L1-L27)

One optional compatibility adapter lets a `className` string pass through
StyleX's `props` pipeline. [Source](https://github.com/shadcn-labs/shadcn-cssinjs/blob/489698127738a785557619def292f1f2f6e98ffb/apps/www/registry/bases/stylex/lib/utils.stylex.ts#L1-L4)
It is handy while preserving a shadcn-like API, but it relies on the `$$css`
shape. Keep it tiny and quarantined; prefer a typed `style?: StyleXStyles` escape
hatch for new components.

## Practical cleanup rule

For each messy component, choose exactly one:

1. **Leave upstream shadcn alone:** Tailwind owns the component; StyleX styles
   only its layout wrapper.
2. **Port the complete recipe:** retain the headless primitive/API and rewrite all
   slots, variants, and states in StyleX as above.
3. **Build a new StyleX primitive:** use the shadcn token names and component API,
   but avoid importing an already-styled shadcn implementation.

The dangerous middle ground is adding a few StyleX properties to a copied
Tailwind component: it creates two precedence systems with no clear owner.

## Sources and method

This note is based on inspected project source at commit
[`489698127738a785557619def292f1f2f6e98ffb`](https://github.com/shadcn-labs/shadcn-cssinjs/tree/489698127738a785557619def292f1f2f6e98ffb),
plus StyleX's own GitHub discussion. I intentionally excluded projects that only
listed both packages in a lockfile or described themselves as StyleX without
source evidence of a shadcn/Radix integration.
