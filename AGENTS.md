# Agent instructions

pnpm/turbo monorepo for a landing/sites design system. Publishable packages: `@rtds/tokens` (OKLCH theme JSON + generated CSS) and `@rtds/ui` (React components: 1:1 Base UI wrappers + CVA/token visuals). Also `@rtds/tw-preset`, `@rtds/create`, apps `demo` and `storybook`.

Long-form docs (do not inline): [docs/DESIGN.md](docs/DESIGN.md), [docs/THEMING.md](docs/THEMING.md), [docs/ADR-001-base-ui-wrappers.md](docs/ADR-001-base-ui-wrappers.md).

This file is the **single source of truth** for coding agents (Cursor, Codex, Claude Code, and other AGENTS.md consumers). Do not add `CLAUDE.md`, `.cursorrules`, or `.cursor/rules/` copies of these instructions.

---

## Setup

```bash
pnpm install
pnpm tokens:build
pnpm --filter demo dev          # landing playground
pnpm --filter storybook dev     # component catalog
pnpm lint
pnpm typecheck
pnpm build
```

Root scripts (`package.json`): `dev`, `build`, `lint`, `typecheck`, `test`, `tokens:build`, `tokens:check`, `format`. Filter packages with `pnpm --filter <name>` (`@rtds/ui`, `@rtds/tokens`, `demo`, `storybook`).

---

## Boundaries

- Do not redesign tokens or visuals unless asked.
- Do not re-export Base UI `Root` / `Trigger` / namespaces from `@rtds/ui`.
- Do not invent product scope (no app-specific coupling).
- Do not fork components in `apps/demo` — import `@rtds/ui` only.
- Do not use raw palette classes or arbitrary sizing (`bg-zinc-100`, `w-[437px]`). Semantic tokens only.

---

## Before making changes

1. Read `docs/DESIGN.md` and `docs/THEMING.md`
2. Check component inventory in the technical design
3. Review existing Storybook stories for patterns

---

## Storybook parity

A public `@rtds/ui` change is incomplete without a Storybook update **in the same PR**.

- **Add** export → add `apps/storybook/stories/<Name>.stories.tsx` (or a story in the family file). Show `Default` plus real variants/states.
- **Change** props/variants/behavior → update the story so it does not demonstrate the old API.
- **Remove/rename** export → remove/rename the story in the same change.
- Compound parts (`DialogTrigger`, `SelectItem`, …) stay inside the parent story. Do not add one story per leaked part.
- Import stories only from `@rtds/ui`, never `@base-ui/react/*` or `packages/ui/src/...`.
- Titles: `Foundations/`, `Layout/`, `Navigation/`, `Marketing/`.
- Demo is a landing, not the catalog. Still update `apps/demo` when the change is visible in header/footer, marketing, forms, or `#primitives`. Layout utilities (`Stack`, `Grid`, `Bleed`) live in Storybook unless the landing needs them.

---

## After UI edits

| Change | Required follow-up |
| --- | --- |
| New public export | New story (or family story). `Default` + variants/states on the API. |
| Updated props, variants, or behavior | Update the existing story. Do not leave the old pattern (`asChild`, removed props, …). |
| Removed or renamed export | Delete or rename the story in the same change. |
| Compound parts | Keep them inside the parent story. |

Always:

```bash
pnpm lint
pnpm typecheck
pnpm build
```

Fix all errors before committing. Spot-check touched stories (`pnpm --filter storybook dev`).

---

## Key rules

### Tokens

- ✓ Use semantic tokens (`bg-background`, `text-foreground`, `border-border`)
- ✓ UI type roles: `text-label` / `text-label-sm` / `text-label-lg` / `text-body` / `text-body-sm` / `text-body-lg`
- ✓ Motion seed: `--ease-out`, `--duration-press`, `--duration-state` (reuse; do not fork inside a component)
- ✗ Never use raw color values (`bg-zinc-100`, `text-gray-500`)
- ✗ Never use arbitrary values (`w-[437px]`, `text-[13px]`)
- ✓ Use `<Icon icon={Name} />` for Lucide (size 20 UI / 24 features, stroke 1.5)

### Components

- ✓ Wrap Base UI 1:1 — one public export per primitive; swallow compound parts ([ADR-001](docs/ADR-001-base-ui-wrappers.md))
- ✓ Use component variants from props (`variant="outline"`, `size="lg"`)
- ✓ Use `cn()` utility for class merging
- ✗ Don't re-export Base UI namespaces from `@rtds/ui`
- ✗ Don't override component internal styles in consumer code
- ✗ Don't modify components in `apps/demo` — only use exports from `@rtds/ui`
- ✗ Don't ship a `@rtds/ui` public API change without a matching Storybook update in the same PR

### Dark mode

- ✓ Every component must work in dark mode
- ✓ Test with `.dark` class on `<html>`
- ✓ Use semantic tokens that auto-switch

### Accessibility

- ✓ Interactive elements need focus-visible styles
- ✓ Buttons/links need ≥ 44×44px hit area
- ✓ Forms need proper labels and error states
- ✓ Respect `prefers-reduced-motion`

### Responsive

- ✓ Mobile-first approach
- ✓ Test at 375px and 1440px
- ✓ Use Tailwind breakpoint prefixes (`md:`, `lg:`)

---

## Creating new components

### 1. Component file

```tsx
// packages/ui/src/components/my-component.tsx
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

const myComponentVariants = cva('base-classes-here', {
  variants: {
    variant: {
      default: 'default-variant-classes',
    },
    size: {
      sm: 'size-sm-classes',
      md: 'size-md-classes',
      lg: 'size-lg-classes',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

export interface MyComponentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof myComponentVariants> {}

export function MyComponent({ className, variant, size, ...props }: MyComponentProps) {
  return (
    <div className={cn(myComponentVariants({ variant, size }), className)} {...props} />
  );
}
```

### 2. Export from index

```tsx
// packages/ui/src/index.ts
export * from './components/my-component';
```

### 3. Create or update story

Same PR as the component. Titles: `Foundations/…`, `Layout/…`, `Navigation/…`, `Marketing/…`. Import only from `@rtds/ui`.

```tsx
// apps/storybook/stories/MyComponent.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { MyComponent } from '@rtds/ui';

const meta: Meta<typeof MyComponent> = {
  title: 'Foundations/MyComponent',
  component: MyComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MyComponent>;

export const Default: Story = {
  args: {},
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <MyComponent variant="default">Default</MyComponent>
    </div>
  ),
};
```

### 4. Verify

```bash
pnpm lint
pnpm typecheck
pnpm build
pnpm --filter storybook dev
```

If the component belongs on a landing (nav, marketing block, form, feedback empty/error), add or update a usage example in `apps/demo`.

---

## File locations

| What | Where |
|------|-------|
| Components | `packages/ui/src/components/` |
| Utils | `packages/ui/src/lib/` |
| Providers | `packages/ui/src/providers/` |
| Tokens (color SoT) | `packages/tokens/themes/*.theme.rtds.json` (DS presets); `apps/demo/themes/` (demo app) |
| Tokens (primitives) | `design/tokens/primitive.json` |
| Tokens (built) | `packages/tokens/dist/` |
| Stories | `apps/storybook/stories/` |
| Demo app | `apps/demo/src/` |

---

## Common patterns

### Container with Section

```tsx
<Section tone="muted">
  <Container>
    <h2>Section Title</h2>
  </Container>
</Section>
```

### Responsive grid

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map((item) => (
    <Card key={item.id} {...item} />
  ))}
</div>
```

### Theme-aware styles

```tsx
<div className="bg-background text-foreground border-border" />
```

---

## Troubleshooting

### Lint errors about raw colors

Use semantic tokens: `bg-red-500` → `bg-destructive`, `text-gray-500` → `text-muted-foreground`, `border-gray-200` → `border-border`.

### TypeScript errors after adding a component

1. Check exports in `packages/ui/src/index.ts`
2. Run `pnpm build` in `packages/ui`
3. Check import paths in the consumer

### Styles not applying

1. Import a generated theme CSS file plus `@rtds/ui/base.css` (or `@rtds/ui/styles.css` for the DS Atlas preset)
2. Check class names use semantic tokens
3. Run `pnpm tokens:build` (DS) and `pnpm --filter demo tokens:build` (demo-owned themes)

---

## Pull requests

- `pnpm lint`, `pnpm typecheck`, and `pnpm build` green.
- Storybook parity section satisfied for any `@rtds/ui` public API change.
- Demo updated only when the change is visible on a landing flow.
