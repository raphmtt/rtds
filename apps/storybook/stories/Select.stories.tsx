import type { Meta, StoryObj } from '@storybook/react';
import {
  Label,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  type SelectTriggerRadius,
  type SelectTriggerSize,
} from '@rtds/ui';

const meta: Meta<typeof SelectTrigger> = {
  title: 'Foundations/Select',
  component: SelectTrigger,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Base UI Select with trigger `size` (`sm` 36px / `default` 40px / `lg` 44px, same heights as Input) and `radius` (`none` | `sm` | `md` | `lg` | `full`, default `md`). Pair with `Label` via `flex flex-col gap-2` — no FormField wrapper. Focus is ring-only; press is a fine-pointer `scale(0.98)`. Chevron rotates 180° when open. Popup uses opacity + light scale from the trigger origin.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
    },
    radius: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'full'],
    },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof SelectTrigger>;

const niches = [
  { value: 'atlas', label: 'Atlas' },
  { value: 'folio', label: 'Folio' },
  { value: 'maison', label: 'Maison' },
] as const;

const nicheItems = {
  atlas: 'Atlas',
  folio: 'Folio',
  maison: 'Maison',
} as const;

const groupedItems = {
  ...nicheItems,
  studio: 'Studio',
  archive: 'Archive (disabled)',
} as const;

const longListItems = Object.fromEntries(
  Array.from({ length: 30 }, (_, index) => [`item-${index + 1}`, `Option ${index + 1}`])
);

function NicheSelect({
  size,
  radius,
  disabled,
  invalid,
  placeholder,
  defaultOpen,
  className = 'w-56',
}: {
  size?: SelectTriggerSize;
  radius?: SelectTriggerRadius;
  disabled?: boolean;
  invalid?: boolean;
  placeholder?: boolean;
  defaultOpen?: boolean;
  className?: string;
}) {
  return (
    <Select
      items={nicheItems}
      defaultValue={placeholder ? undefined : 'atlas'}
      disabled={disabled}
      defaultOpen={defaultOpen}
    >
      <SelectTrigger
        size={size}
        radius={radius}
        className={className}
        aria-label="Niche"
        aria-invalid={invalid || undefined}
      >
        <SelectValue placeholder="Choose a niche" />
      </SelectTrigger>
      <SelectContent>
        {niches.map((niche) => (
          <SelectItem key={niche.value} value={niche.value}>
            {niche.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export const Default: Story = {
  render: () => <NicheSelect />,
};

export const Placeholder: Story = {
  render: () => <NicheSelect placeholder />,
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <NicheSelect size="sm" />
      <NicheSelect size="default" />
      <NicheSelect size="lg" />
    </div>
  ),
};

export const Radius: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <NicheSelect radius="none" />
      <NicheSelect radius="sm" />
      <NicheSelect radius="md" />
      <NicheSelect radius="lg" />
      <NicheSelect radius="full" />
    </div>
  ),
};

export const SizesByRadius: Story = {
  render: () => {
    const sizes = ['sm', 'default', 'lg'] as const;
    const radii = ['none', 'sm', 'md', 'lg', 'full'] as const;

    return (
      <div className="flex flex-col gap-4">
        {sizes.map((size) => (
          <div key={size} className="flex flex-wrap items-center gap-3">
            {radii.map((radius) => (
              <NicheSelect
                key={radius}
                size={size}
                radius={radius}
                className="w-36"
              />
            ))}
          </div>
        ))}
      </div>
    );
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex w-56 flex-col gap-2">
      <Label htmlFor="story-select-niche">Niche</Label>
      <Select items={nicheItems} defaultValue="atlas">
        <SelectTrigger id="story-select-niche">
          <SelectValue placeholder="Choose a niche" />
        </SelectTrigger>
        <SelectContent>
          {niches.map((niche) => (
            <SelectItem key={niche.value} value={niche.value}>
              {niche.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  ),
};

export const Grouped: Story = {
  render: () => (
    <Select items={groupedItems} defaultValue="atlas">
      <SelectTrigger className="w-56" aria-label="Grouped niches">
        <SelectValue placeholder="Choose a niche" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Presets</SelectLabel>
          <SelectItem value="atlas">Atlas</SelectItem>
          <SelectItem value="folio">Folio</SelectItem>
          <SelectItem value="maison">Maison</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Custom</SelectLabel>
          <SelectItem value="studio">Studio</SelectItem>
          <SelectItem value="archive" disabled>
            Archive (disabled)
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <NicheSelect disabled placeholder />
      <NicheSelect disabled />
    </div>
  ),
};

export const Invalid: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <NicheSelect invalid placeholder />
      <NicheSelect invalid />
    </div>
  ),
};

export const Open: Story = {
  render: () => <NicheSelect defaultOpen />,
  parameters: {
    docs: {
      description: {
        story: 'Starts open so chevron rotation, trigger ring, and popup motion can be inspected.',
      },
    },
  },
};

export const LongList: Story = {
  render: () => (
    <Select items={longListItems} defaultValue="item-8">
      <SelectTrigger className="w-56" aria-label="Long list">
        <SelectValue placeholder="Choose an option" />
      </SelectTrigger>
      <SelectContent>
        {Array.from({ length: 30 }, (_, index) => {
          const value = `item-${index + 1}`;
          return (
            <SelectItem key={value} value={value}>
              Option {index + 1}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Open the list to reach overflow. Scroll arrows appear when the list exceeds `max-h-96`.',
      },
    },
  },
};

export const Dark: Story = {
  render: () => (
    <div className="dark min-w-56 rounded-lg bg-background p-6 text-foreground">
      <div className="flex flex-col gap-4">
        <NicheSelect />
        <NicheSelect invalid />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Same chrome in `.dark`. Semantic tokens restyle border, ring, and popup without extra classes.',
      },
    },
  },
};
