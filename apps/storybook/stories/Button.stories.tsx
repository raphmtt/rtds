import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button, Icon, buttonVariants } from '@rtds/ui';
import { ArrowRight, Plus, Save } from 'lucide-react';

const meta: Meta<typeof Button> = {
  title: 'Foundations/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Pass leading or trailing icons as children (`<Icon />` + label). Loading keeps children in layout and crossfades a spinner in the same 4×4 box — it does not replace the label with "Loading...".',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
    },
    radius: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'full'],
    },
    loading: { control: 'boolean' },
    loadingText: { control: 'text' },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Destructive',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost',
  },
};

export const Link: Story = {
  args: {
    variant: 'link',
    children: 'Link',
  },
  parameters: {
    docs: {
      description: {
        story: 'Link has no press scale. Click-and-hold vs Default to compare.',
      },
    },
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large Button',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small',
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    children: 'Save changes',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled',
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: 'Full Width',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon" aria-label="Add">
        <Icon icon={Plus} />
      </Button>
    </div>
  ),
};

export const AllRadius: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button radius="none">None</Button>
      <Button radius="sm">Small</Button>
      <Button radius="md">Medium</Button>
      <Button radius="lg">Large</Button>
      <Button radius="full">Full</Button>
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button>
        <Icon icon={Plus} />
        Add item
      </Button>
      <Button variant="outline">
        Continue
        <Icon icon={ArrowRight} />
      </Button>
      <Button size="sm" variant="secondary">
        <Icon icon={Plus} />
        Add
      </Button>
      <Button size="lg">
        Get started
        <Icon icon={ArrowRight} />
      </Button>
      <Button size="icon" aria-label="Add">
        <Icon icon={Plus} />
      </Button>
    </div>
  ),
};

export const LoadingStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-4">
        <Button loading>Save changes</Button>
        <Button loading variant="secondary">
          Save changes
        </Button>
        <Button loading variant="outline">
          Save changes
        </Button>
        <Button loading variant="ghost">
          Save changes
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <Button loading size="sm">
          Save
        </Button>
        <Button loading size="lg">
          Save changes
        </Button>
        <Button loading size="icon" aria-label="Save">
          <Icon icon={Save} />
        </Button>
        <Button loading>
          <Icon icon={Save} />
          Save
        </Button>
        <Button loading loadingText="Saving">
          Save changes
        </Button>
      </div>
    </div>
  ),
};

export const LoadingMorph: Story = {
  render: function LoadingMorphStory() {
    const [loading, setLoading] = useState(false);

    return (
      <div className="flex flex-wrap items-center gap-4">
        <Button
          loading={loading}
          onClick={() => {
            setLoading(true);
            window.setTimeout(() => setLoading(false), 1600);
          }}
        >
          <Icon icon={Save} />
          Save
        </Button>
        <Button
          variant="outline"
          loading={loading}
          onClick={() => {
            setLoading(true);
            window.setTimeout(() => setLoading(false), 1600);
          }}
        >
          Save changes
        </Button>
        <Button
          size="icon"
          loading={loading}
          aria-label="Save"
          onClick={() => {
            setLoading(true);
            window.setTimeout(() => setLoading(false), 1600);
          }}
        >
          <Icon icon={Save} />
        </Button>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Click to toggle loading. Width should stay put; children fade; spinner crossfades in the 4×4 icon box. No "Loading..." flash.',
      },
    },
  },
};

export const VariantsBySize: Story = {
  render: () => {
    const variants = ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'] as const;
    const sizes = ['sm', 'default', 'lg'] as const;

    return (
      <div className="flex flex-col gap-4">
        {variants.map((variant) => (
          <div key={variant} className="flex flex-wrap items-center gap-4">
            {sizes.map((size) => (
              <Button key={size} variant={variant} size={size}>
                {variant} {size}
              </Button>
            ))}
          </div>
        ))}
      </div>
    );
  },
};

export const RadiusByVariant: Story = {
  render: () => {
    const radii = ['none', 'sm', 'md', 'lg', 'full'] as const;

    return (
      <div className="flex flex-col gap-4">
        {radii.map((radius) => (
          <div key={radius} className="flex flex-wrap items-center gap-4">
            <Button radius={radius}>Default {radius}</Button>
            <Button radius={radius} variant="secondary">
              Secondary
            </Button>
            <Button radius={radius} variant="outline">
              Outline
            </Button>
            <Button radius={radius} size="icon" aria-label={`Add ${radius}`}>
              <Icon icon={Plus} />
            </Button>
          </div>
        ))}
      </div>
    );
  },
};

export const LinkStyled: Story = {
  render: () => (
    <a href="#docs" className={buttonVariants()}>
      Documentation
    </a>
  ),
};
