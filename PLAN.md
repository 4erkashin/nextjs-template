# Layout breakpoints

Policy is in `CONTEXT.md` and ADR-0006. This file is the agreed brief.

Each section has **ready** (agreed or a fact) and **grilling** (still open).
Empty grilling means that section is settled.

This work has two jobs:

1. How DTCG stores each **layout breakpoint**.
2. How product code uses that name.

## What’s true now

### ready

`CONTEXT.md` defines **layout breakpoint** as `mobile`, `tablet`, or `desktop`.
`tokens/build.js` emits `queries.mobile`, `queries.tablet`, `queries.desktop`.
Product UI picks those names. It does not write the query string.

The home poster and theme switcher key **composition** with those consts.
StyleX `default` holds only facts that do not change with the sheet.

A square sheet counts as tall (CSS portrait).

A **viewport** is a named exact width and height for inspection.
Many viewports can share one **layout breakpoint**.
A viewport is a canvas that you open.
A **layout breakpoint** is the geometry at which **composition** may change.

### grilling

None.

## Glossary

### ready

Keep the term **layout breakpoint**.
Change its meaning in `CONTEXT.md` after this plan is agreed.

Today it is a T-shirt minimum width.
The proposal: a named geometry at which **composition** may change.

Three sheet shapes:

- tall and narrow
- tall, with room
- wider than tall

Do not use these as names of this term: layout state, layout mode, **viewport**.
Do not use `sm` / `md` / `lg` / `xl` as product names.
Do not use portrait / landscape as product names. Those words name orientation.
Do not use “media query” as the token name. `CONTEXT.md` already forbids that.

Width may exist inside the token (the tablet cut).
Width is not the type of the token.

Pointer, hover, and `prefers-reduced-motion` are queries of another family.
They may live in the same `queries.*` file.
They are not **layout breakpoints**.

### grilling

None.

## Names for the first kit

### ready

Product names: `mobile`, `tablet`, `desktop`.
These names are not devices.

- `mobile` — tall and narrow
- `tablet` — tall, with room
- `desktop` — wider than tall

Product code uses only these three words.
The generator gives product `queries.mobile`, `queries.tablet`, and `queries.desktop`.
Product uses those names. Product does not own the query implementation.

The same English word may name a **viewport** and a **layout breakpoint**.
Example: a `desktop` canvas and a `desktop` breakpoint.
The slices stay separate (`layout` / `queries` vs `viewport`).

A square sheet (1×1) counts as tall.
CSS treats that sheet as portrait.

### grilling

None.

## Cascade

### ready

“Mobile-first” is a min-width habit.
Unqualified CSS is the narrow sheet. Then you add width.
That habit belongs to the old T-shirt ladder.

The three **layout breakpoints** are peer **compositions**.
The model has no first **layout breakpoint**.

StyleX `default` holds only facts that do not change with the sheet (canvas height, font family).
Each **composition** that does change uses `queries.mobile`, `queries.tablet`, or `queries.desktop`.
Include `desktop`. Do not leave it on `default`.

Today the poster puts the landscape sheet on `default`. That is the old habit.

### grilling

None.

## How product code uses the tokens

### ready

Product UI uses StyleX consts: `queries.mobile`, `queries.tablet`, `queries.desktop`.
The caller picks a name only.
The caller does not write or inspect the query string.

The seam stays `stylex.defineConsts`.
Do not add a `matchMedia` runtime unless a caller needs JavaScript.

Product UI does not request the **module** directly.
The **module** may appear inside the tablet cut in DTCG.

DTCG recipes and `queriesFile()` in `tokens/build.js` own the implementation.
The generator hides feature lists, `and` / `or`, rem math, and `@media` strings.

### grilling

None.

## How DTCG stores the tokens

### ready

Stop treating `primitive.layout` as a width ladder that auto-emits queries.

Start from the home poster, not from new sizes.
The **viewport** list stays as it is.

Each **layout breakpoint** is a named recipe in DTCG.

Generated queries test:

- rem min-width tells `mobile` from `tablet` (room on a tall sheet)
- CSS orientation tells `desktop` from the tall sheets
- no aspect-ratio test (this kit has no 4/3 or 16/9 bands)

A width test alone is not enough.
A phone on its side is wide in pixels.
That sheet is not a tablet **composition**.

Portrait and landscape may live in the token string.
Product code does not use those words.

The only rem inside a recipe is the `tablet` cut, counted from the **module**: `48rem`.

Drop T-shirt exports (`queries.sm`–`xl`).
Drop cookbook `Wide` / `Container` demos.

### grilling

None.

## Code moves

### ready

Grilling is empty in Glossary, Names, Cascade, and DTCG.

Order (not a schedule):

1. Change the **layout breakpoint** definition in `CONTEXT.md`. Add a short ADR: product names are `mobile` / `tablet` / `desktop`; they name **composition** shape; they are not a min-width ladder and not orientation words; rem min-width plus CSS orientation make the three queries; the **module** still counts rem for space and for the `48rem` tablet cut.
2. Change the token schema and the generator. Drop T-shirt exports and cookbook `Wide` / `Container` demos.
3. Home poster: remove local `@media` strings. Use `queries.*`.

### grilling

None.
