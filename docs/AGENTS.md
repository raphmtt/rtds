# Agent Instructions

Instructions for AI agents working with this design system.

---

## Before Making Changes

1. Read `docs/DESIGN.md` and `docs/THEMING.md`
2. Check component inventory in the technical design
3. Review existing Storybook stories for patterns

---

## After UI Edits

A public `@rtds/ui` change is **not done** until Storybook matches it.

| Change | Required follow-up |
| --- | --- |
| New public export | New story file under `apps/storybook/stories/` (or a clearly named story in an existing family file). `Default` + variants/states that exist on the API. |
| Updated props, variants, or behavior | Update the existing story so controls/examples reflect the new API. Do not leave a story that still shows the old pattern (`asChild`, removed props, …). |
| Removed or renamed export | Delete or rename the story in the same change. |
| Compound parts (`DialogTrigger`, …) | Keep them inside the parent story; do not add a story per leaked part. |

Demo (`apps/demo`) is a **composed landing**, not a full catalog. Update it when the change is visible in a landing flow (header/footer, marketing block, form, primitive already on `#primitives`). Layout utilities (`Stack`, `Grid`, `Bleed`) live in Storybook unless the landing needs them.

**Always run these commands:**

```bash
pnpm lint
pnpm typecheck
pnpm build
```

Fix all errors before committing. Spot-check the touched stories (`pnpm --filter storybook dev`).

---

## Key Rules

### Tokens

- ✓ Use semantic tokens (`bg-background`, `text-foreground`, `border-border`)
- ✗ Never use raw color values (`bg-zinc-100`, `text-gray-500`)
- ✗ Never use arbitrary values (`w-[437px]`, `text-[13px]`)
- ✓ Use `<Icon icon={Name} />` for Lucide (size 20 UI / 24 features, stroke 1.5)

### Components

- ✓ Wrap Base UI 1:1 — one public export per primitive; swallow compound parts ([ADR-001](./ADR-001-base-ui-wrappers.md))
- ✓ Use component variants from props (`variant="outline"`, `size="lg"`)
- ✓ Use `cn()` utility for class merging
- ✗ Don't re-export Base UI `Root` / `Trigger` / namespaces from `@rtds/ui`
- ✗ Don't override component internal styles in consumer code
- ✗ Don't modify components in `apps/demo` — only use exports from `@rtds/ui`
- ✗ Don't ship a `@rtds/ui` public API change without a matching Storybook update in the same PR

### Dark Mode

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

## Creating New Components

### 1. Create Component File

```tsx
// packages/ui/src/components/my-component.tsx
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

const myComponentVariants = cva(
  'base-classes-here',
  {
    variants: {
      variant: {
        default: 'default-variant-classes',
        // ...
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
  }
);

export interface MyComponentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof myComponentVariants> {}

export function MyComponent({
  className,
  variant,
  size,
  ...props
}: MyComponentProps) {
  return (
    <div
      className={cn(myComponentVariants({ variant, size }), className)}
      {...props}
    />
  );
}
```

### 2. Export from Index

```tsx
// packages/ui/src/index.ts
export * from './components/my-component';
```

### 3. Create or update Story

Same PR as the component. Titles: `Foundations/…`, `Layout/…`, `Navigation/…`, `Marketing/…`. Import only from `@rtds/ui`.

```tsx
// apps/storybook/stories/MyComponent.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { MyComponent } from '@rtds/ui';

const meta: Meta<typeof MyComponent> = {
  title: 'Components/MyComponent',
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
      {/* ... */}
    </div>
  ),
};
```

### 4. Verify

```bash
pnpm lint
pnpm typecheck
pnpm build
pnpm --filter storybook dev  # Check in Storybook
```

If the component belongs on a landing (nav, marketing block, form, feedback empty/error), add or update a usage example in `apps/demo`.

---

## File Locations

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

## Common Patterns

### Container with Section

```tsx
<Section tone="muted">
  <Container>
    <h2>Section Title</h2>
    {/* content */}
  </Container>
</Section>
```

### Responsive Grid

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map(item => <Card key={item.id} {...item} />)}
</div>
```

### Theme-Aware Styles

```tsx
// These automatically switch between light/dark (and playground themes):
<div className="bg-background text-foreground border-border" />
```

---

## Troubleshooting

### Lint errors about raw colors

Use semantic tokens instead:
- `bg-red-500` → `bg-destructive`
- `text-gray-500` → `text-muted-foreground`
- `border-gray-200` → `border-border`

### TypeScript errors after adding component

1. Check exports in `packages/ui/src/index.ts`
2. Run `pnpm build` in packages/ui
3. Check import paths in consumer

### Styles not applying

1. Verify a generated theme CSS file is imported, plus `@rtds/ui/base.css` (or `@rtds/ui/styles.css` for the DS Atlas preset)
2. Check class names use semantic tokens
3. Run `pnpm tokens:build` (DS) and `pnpm --filter demo tokens:build` (demo-owned themes)
