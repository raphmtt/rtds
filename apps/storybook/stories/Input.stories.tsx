import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button, FormField, Icon, Input, Label } from '@rtds/ui';
import { Mail, Search } from 'lucide-react';

const meta: Meta<typeof Input> = {
  title: 'Foundations/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Field value uses `text-body`. Radius is independent of size. Focus is border/ring color only — no scale. `showClear` / `showPaste` are opt-in and keep their slots so the layout does not shift.',
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
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
    showClear: { control: 'boolean' },
    showPaste: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="max-w-sm space-y-2">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="you@example.com" />
    </div>
  ),
};

export const WithFormField: Story = {
  render: () => (
    <FormField label="Username" htmlFor="username" hint="This will be your public display name.">
      <Input id="username" placeholder="johndoe" />
    </FormField>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex max-w-sm flex-col gap-4">
      <Input size="sm" placeholder="Small" />
      <Input size="default" placeholder="Default" />
      <Input size="lg" placeholder="Large" />
    </div>
  ),
};

export const Radius: Story = {
  render: () => (
    <div className="flex max-w-sm flex-col gap-4">
      <Input radius="none" placeholder="None" />
      <Input radius="sm" placeholder="Small" />
      <Input radius="md" placeholder="Medium" />
      <Input radius="lg" placeholder="Large" />
      <Input radius="full" placeholder="Full" />
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
              <Input
                key={radius}
                size={size}
                radius={radius}
                placeholder={`${size} / ${radius}`}
                className="max-w-40"
              />
            ))}
          </div>
        ))}
      </div>
    );
  },
};

export const Error: Story = {
  render: () => (
    <FormField label="Email" htmlFor="email-error" error="Please enter a valid email address.">
      <Input id="email-error" type="email" error placeholder="you@example.com" />
    </FormField>
  ),
};

export const ErrorShake: Story = {
  render: function ErrorShakeStory() {
    const [error, setError] = useState(false);

    return (
      <div className="max-w-sm space-y-3">
        <FormField
          label="Username"
          htmlFor="shake-user"
          error={error ? 'That name is already taken.' : undefined}
          hint={error ? undefined : 'Click the button to enter the error state.'}
        >
          <Input id="shake-user" error={error} defaultValue="rafa" showClear />
        </FormField>
        <Button type="button" onClick={() => setError((current) => !current)}>
          {error ? 'Clear error' : 'Trigger error'}
        </Button>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Shake plays once when `error` becomes true. Toggle prefers-reduced-motion in the OS / DevTools — movement should stop, destructive border may remain.',
      },
    },
  },
};

export const InvalidOnSubmit: Story = {
  render: () => (
    <form
      className="max-w-sm space-y-3"
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <FormField label="Email" htmlFor="submit-email" required>
        <Input id="submit-email" type="email" required placeholder="you@example.com" />
      </FormField>
      <Button type="submit">Submit</Button>
    </form>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Submit empty to fire native `invalid` and play the shake once.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Disabled input',
    defaultValue: 'Cannot edit',
  },
};

export const ShowClear: Story = {
  args: {
    showClear: true,
    defaultValue: 'Clear me',
    placeholder: 'Type to show clear',
  },
};

export const ShowPaste: Story = {
  args: {
    showPaste: true,
    placeholder: 'Paste from clipboard',
  },
};

export const ClearAndPaste: Story = {
  args: {
    showClear: true,
    showPaste: true,
    defaultValue: 'Replace or clear',
  },
};

export const LeadingIcon: Story = {
  render: () => (
    <div className="flex max-w-sm flex-col gap-4">
      <Input leadingIcon={<Icon icon={Search} />} placeholder="Search" />
      <Input
        leadingIcon={<Icon icon={Mail} />}
        type="email"
        placeholder="you@example.com"
        showClear
        defaultValue="you@example.com"
      />
    </div>
  ),
};

export const TrailingIcon: Story = {
  render: () => (
    <Input
      className="max-w-sm"
      trailingIcon={<Icon icon={Search} />}
      placeholder="Custom trailing slot"
    />
  ),
};

export const Types: Story = {
  render: () => (
    <div className="max-w-sm space-y-4">
      <div className="space-y-2">
        <Label htmlFor="text">Text</Label>
        <Input id="text" type="text" placeholder="Text input" showClear />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email-type">Email</Label>
        <Input id="email-type" type="email" placeholder="Email input" showPaste />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" placeholder="Password input" showClear />
      </div>
      <div className="space-y-2">
        <Label htmlFor="number">Number</Label>
        <Input id="number" type="number" placeholder="Number input" />
      </div>
    </div>
  ),
};
