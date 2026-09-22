# ADR-001: 1:1 wrappers over Base UI

- **Status:** Accepted (FINAL)
- **Date:** 2026-09-18
- **Package:** `@rtds/ui`
- **Primitive:** `@base-ui/react` (^1.8)

This decision is **final**. Do not reopen Base UI vs shadcn vs a new kit.

---

## Context

`@rtds/ui` previously mixed Radix primitives, Radix `Slot`, and CVA-styled components. That path looks like a shadcn clone: headless parts leak as public compound APIs (`DialogTrigger`, `AccordionContent`, …), and consumers assemble kits instead of using a designed surface.

We need a locked architecture that:

1. Keeps **behavior/accessibility** in a maintained headless library.
2. Keeps **look** in our CSS tokens (`--primary`, `--ring`, `--radius`, …) and existing niches (`atlas` | `folio` | `maison` × light/dark).
3. Gives product apps **one public component per primitive**, not a tree of Base UI parts.
4. Stays a **design system**, not a product (no BarberPoint or other app coupling).

Base UI (`@base-ui/react`) is unstyled and already used as the headless layer. This ADR records that choice and the wrapper rule. The Button rewrite in this change is the proof, not a full inventory migration.

---

## Decision

**The `@rtds/ui` component library is 1:1 wrappers over Base UI.**

| Rule | Meaning |
| --- | --- |
| 1:1 | One Base UI component → exactly one public export from `@rtds/ui`. |
| Parts only via props | Base UI compound parts (`Root`, `Trigger`, `Portal`, …) are swallowed inside our wrapper. Consumers do not import them. |
| CSS/tokens on top | Base UI stays unstyled. Variants and visuals use existing semantic CSS variables and Tailwind token classes. No new hex. |
| Native Base UI API | Prefer Base UI’s own composition (`render`, `nativeButton`) over Radix `Slot` / `asChild` when they conflict. |

Do **not** re-export `Button.Root` or any other Base UI namespace from `@rtds/ui`.

```txt
Product app
    │  import { Button } from '@rtds/ui'
    ▼
@rtds/ui Button          ← single public export
    │  className from CVA + tokens (--primary, --ring, …)
    ▼
@base-ui/react/button    ← headless behavior / a11y
```

Theming remains one generated theme CSS file + `.dark` on `<html>`. Switching mode remaps CSS variables; wrappers do not branch on brand. Runtime multi-brand switching is demo-only.

---

## PoC scope / Rollout

**PoC (complete):** Button — import from `@base-ui/react/button`. Public exports stay `Button` and `buttonVariants` (the CVA helper for token classes — not a Base UI leak).

**Inventory rollout (RT-12 — complete):** remaining Radix primitives in `@rtds/ui` now wrap Base UI the same way. `rg "@radix-ui" packages/ui/src` is empty; unused `@radix-ui/*` packages were removed from `packages/ui/package.json`.

| Public surface | Headless module |
| --- | --- |
| `Button` | `@base-ui/react/button` |
| `Accordion*` | `@base-ui/react/accordion` |
| `Avatar*` | `@base-ui/react/avatar` |
| `Checkbox` | `@base-ui/react/checkbox` |
| `Dialog*` | `@base-ui/react/dialog` |
| `Label` | native `<label>` (Base UI has no standalone Label) |
| `Select*` | `@base-ui/react/select` |
| `Separator` | `@base-ui/react/separator` |
| `Sheet*` | `@base-ui/react/drawer` (sheet pattern) |
| `Switch` | `@base-ui/react/switch` |
| `Tabs*` | `@base-ui/react/tabs` |
| `Tooltip*` | `@base-ui/react/tooltip` |
| `TextLink` | styled `<a>` (Slot / `asChild` removed) |

Compound export names used by demo/Storybook (`DialogTrigger`, `SelectItem`, …) remain **temporary thin wrappers** owned inside `@rtds/ui`. They do not re-export `@base-ui/react/*` to app code. Prefer fewer leaked parts in later work; do not re-export `*.Root` namespaces.

---

## Public API (Button)

Kept (stable where practical):

- `variant`: `default` \| `destructive` \| `outline` \| `secondary` \| `ghost` \| `link`
- `size`: `default` \| `sm` \| `lg` \| `icon`
- `fullWidth`, `loading`, `disabled`, `className`, standard button attributes
- `buttonVariants()` for token-backed classes (including link-styled `<a>`)

Adopted from Base UI (replaces Radix Slot):

- `render` — polymorphic element replacement
- `nativeButton` — set `false` when `render` is not a native `<button>` (e.g. `<div>`)
- `focusableWhenDisabled` — defaults to `true` while `loading` so focus is not dumped

### Breaking changes

| Before | After |
| --- | --- |
| `asChild` (Radix `Slot`) | **Removed.** Use `render` for non-link polymorphism. |
| `<Button asChild><a href={…}>…</a></Button>` | **Do not** route links through `Button`. Base UI Button always applies button semantics (`role="button"`). Style the `<a>` with `buttonVariants()`. |
| Unspecified `type` on a native `<button>` (HTML default `submit`) | Base UI requires **`type="submit"`** explicitly for form submit buttons. |
| `ref` typed as `HTMLButtonElement` | `ref` is `HTMLElement` (polymorphic `render`). |

Internal DS call sites that used `asChild` for CTAs (`SiteHeader`, `PricingTier`) now apply `buttonVariants()` to the anchor.

### Inventory migration (RT-12)

| Before | After |
| --- | --- |
| `Accordion type="single" collapsible` | **Removed.** Default is one open panel (`multiple` defaults `false`). Pass `multiple` to open several. |
| Trigger `asChild` (Sheet, Dialog, Tooltip, …) | **Removed.** Use Base UI `render`. |
| `TextLink asChild` | **Removed.** `TextLink` is always an `<a>`. |
| Radix `data-[state=…]` selectors | Base UI `data-open` / `data-closed` / `data-checked` / `data-active` / `data-panel-open` |
| Select `onValueChange` always a string | May receive `null` when cleared; call sites must guard. |
| Sheet headless layer (`@radix-ui/react-dialog`) | `@base-ui/react/drawer`. Pass `side` on `Sheet` so swipe direction matches the panel. |

---

## Consequences

**Positive**

- One headless vendor, one public component per primitive.
- Visual system stays in tokens; brand × mode works without component edits.
- Compound-part sprawl is a future-wrapper problem, not a consumer API.

**Negative / follow-up**

- `asChild` consumers must migrate (small, documented).
- Compound public names (`DialogTrigger`, …) are still leaked as owned wrappers; collapsing them to 1:1 surfaces is follow-up, not this rollout.
- Link-looking controls are `<a className={buttonVariants()}>`, not `<Button>`.

**Constraints**

- No shadcn kit clone, no new component kit, no visual redesign.
- No BarberPoint / product-app imports in `@rtds/ui`.
- Do not publish this PoC as a new npm major beyond normal package versioning.

---

## Non-goals

- Cloning shadcn’s file structure, CLI, or compound public API
- Redesigning color, type, radius, or inventing hex
- Penpot / Figma sync work
- Debating Base UI vs shadcn vs another kit
- Publishing to the npm registry (RT-9 / DEV-9)
- Collapsing remaining compound exports (`DialogTrigger`, …) into a single component per primitive (allowed later; not required for RT-12)

---

## Rollout

Completed for the listed `@rtds/ui` primitives (RT-12). Further work may reduce leaked compound parts; it must not reintroduce Radix or re-export Base UI namespaces.
