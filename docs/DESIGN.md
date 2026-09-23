# Design System Principles

## Visual Identity

Locked niches: **atlas** · **folio** · **maison**, each with light and dark.

The previous “Clear Signal” look (`aurora` / `editorial`, Plus Jakarta Sans, Newsreader, neon dual-hue, mesh) is gone. No compatibility aliases.

### Core Principles

1. **Clarity over spectacle** — Landings convert; motion is secondary
2. **One accent, many neutrals** — Chromatic accent only for primary CTA / links / focus
3. **Breathing vertical rhythm** — Sections use generous Y padding; avoid cramped SaaS density
4. **Border-first depth** — Elevation via border + soft shadow; dark mode leans on borders
5. **Identical structure light/dark** — Only tokens change
6. **Agent-safe** — Everything expressible in tokens + documented variants

See [THEMING.md](./THEMING.md) for how to author OKLCH colors and [HOW-TO-THEME.md](./HOW-TO-THEME.md) for fonts and icons.

---

## Token Architecture

Color source of truth is **OKLCH** in `packages/tokens/themes/*.theme.rtds.json` (not hex). See [THEMING.md](./THEMING.md).

### Three Layers

```
Primitive  →  Semantic  →  Component
 (raw)         (role)       (optional)
```

1. **Primitive** — Spacing, type families/sizes, radius scale. **Never use color primitives in components.**
2. **Semantic** — Role-based OKLCH tokens (`--background`, `--primary`, `--muted`) emitted as `oklch()`. Components consume these.
3. **Component** — Radius per theme JSON; font roles and section spacing shared across themes.

### Theming Axes

| Axis | Product apps | Demo playground |
|------|----------------|-----------------|
| Theme | One generated CSS file (`:root` + `.dark`) | `apps/demo/themes` generated locally; switcher is playground-only |
| Mode | `.dark` class on `<html>` | same |

Changing theme or mode **only** remaps CSS variables — **no component rewrites**.

Default product theme is **atlas**. Tailwind maps colors with `var(--…)` (no `hsl()` wrapper). Gradients should use `linear-gradient(in oklch, …)`.

---

## Typography

### UI type scale (tokens)

Shared across atlas / folio / maison. Emitted as CSS variables from `@rtds/tokens`; Tailwind utilities live in `@rtds/tw-preset`. All roles use `--font-body`.

| Role | Utility | Size | Weight | Leading | Typical use |
|------|---------|------|--------|---------|-------------|
| `label-sm` | `text-label-sm` | `0.75rem` (`--text-xs`) | 500 | 1.25 | Button `sm`, badge, chips |
| `label` | `text-label` | `0.875rem` (`--text-sm`) | 500 | 1.25 | Button default, compact form labels |
| `label-lg` | `text-label-lg` | `1rem` (`--text-base`) | 500 | 1.25 | Button `lg`, CTAs |
| `body-sm` | `text-body-sm` | `0.875rem` (`--text-sm`) | 400 | 1.5 | Helper text, captions |
| `body` | `text-body` | `1rem` (`--text-base`) | 400 | 1.5 | Running text |
| `body-lg` | `text-body-lg` | `1.125rem` (`--text-lg`) | 400 | 1.5 | Lead / light emphasis |

Primitives: `--text-xs|sm|base|lg`, `--font-weight-regular|medium|semibold`, `--leading-tight|normal`.

Default Tailwind `text-sm` / `font-medium` are unchanged — only opt into the roles above. Headings and display are **not** in this scale.

### Marketing headings (class-based, not yet tokenized)

| Token | Size | Line-height | Use |
|-------|------|-------------|-----|
| `display` | 3rem → 4.5rem | 1.1 | Hero H1 only (`font-display`) |
| `h1` | 2.25rem | 1.2 | Section titles |
| `h2` | 1.875rem | 1.25 | Subsections |
| `h3` | 1.5rem | 1.3 | Card titles |
| `h4` | 1.25rem | 1.35 | Small headings |

### Font Families (all niches)

| Role | Family |
|------|--------|
| Display | Instrument Serif |
| Heading / body | Inter |
| Mono | JetBrains Mono |

Hero H1 uses `font-display`. Headings use Inter. Do not swap families per niche.

---

## Spacing

- **Base unit:** 4px
- **Major rhythm:** 8px
- **Scale:** 0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32 (Tailwind-compatible)
- **Section Y:** `4rem` mobile → `6rem` md → `8rem` lg
- **Container:** `max-w-6xl` (72rem) with `px-4 md:px-6 lg:px-8`

---

## Radius

| Niche | Base radius |
|-------|-------------|
| atlas | `0.5rem` |
| folio | `0.375rem` |
| maison | `0.75rem` |

Derive sm/md/lg/xl as: `calc(var(--radius) ± n px)`

---

## Elevation

| Token | Light | Dark |
|-------|-------|------|
| `shadow-xs` | 0 1px 2px rgb(0 0 0/0.05) | none / border only |
| `shadow-sm` | 0 1px 3px rgb(0 0 0/0.08) | 0 0 0 1px var(--border) |
| `shadow-md` | soft mid for dropdowns | border + faint glow |

**Prefer `border-border` on cards in dark mode.**

---

## Motion

Shared CSS variables in `@rtds/tw-preset/styles.css` (`:root`). Primitives should reuse these — do not fork timings inside a component.

| Token | Value | Use |
|-------|-------|-----|
| `--ease-out` | `cubic-bezier(0.23, 1, 0.32, 1)` | Press and other UI movement |
| `--duration-press` | `150ms` | Button press scale (zeroed under reduced motion) |
| `--duration-state` | `200ms` | Color, opacity, loading morph (kept under reduced motion) |
| `--scale-press` | `0.97` | `:active` scale (not `link`) |

Legacy overlay budget remains 300ms. Older `cubic-bezier(0.2, 0, 0, 1)` (`rtds-ease`) is still in the JS preset for non-Button surfaces until those primitives are reformed.

- **Hover:** color/border by default; `default` / `secondary` Button may add gated brightness + shadow
- **Hover motion gate:** `@media (hover: hover) and (pointer: fine)` (`fine-hover:` variant)
- **Reduced motion:** drop transform/scale and blur; keep color and opacity. Do not use `transition: all`.

### Forbidden in v1

- Autoplay video backgrounds
- Parallax scroll
- Infinite marquee
- Neon dual-hue / mesh backgrounds
- Mixed icon packs

---

## Color Direction

Semantic OKLCH lives in `packages/tokens/themes/*.theme.rtds.json`. Rebuild with `pnpm tokens:build`. Design tools may still speak hex; convert at ingest — JSON SoT after that is OKLCH.

| Niche | Character |
|-------|-----------|
| atlas | Ink zinc + indigo (Vercel-like) |
| folio | Copper CTA on paper |
| maison | Sage on cream |

### Contrast Requirements

- **Body text:** 4.5:1 (WCAG AA)
- **Large text:** 3:1
- Test all **6** niche × mode combinations

---

## Icons

Lucide only, via `<Icon>` (`strokeWidth` 1.5, `currentColor`, outline). Size **20** (UI) / **24** (features).

---

## Do / Don't

### Do

- ✓ Use semantic tokens (`bg-background`, `text-foreground`)
- ✓ Use `<Icon icon={…} />` for Lucide
- ✓ Use component variants from props
- ✓ Test the product theme in both modes (and playground niches when changing tokens)
- ✓ Use `cn()` for class merging
- ✓ Keep hit targets ≥ 44×44px
- ✓ Add focus-visible styles

### Don't

- ✗ Use raw color values (`bg-zinc-100`, `#1E3A5F` in components)
- ✗ Use arbitrary Tailwind values (`w-[437px]`)
- ✗ Override component internal styles in consumer code
- ✗ Add animations without reduced-motion support
- ✗ Skip dark mode testing
- ✗ Reintroduce aurora / editorial / Jakarta / Newsreader aliases

---

## Component Naming

All components use PascalCase. Path: `@rtds/ui/components/{ComponentName}`
