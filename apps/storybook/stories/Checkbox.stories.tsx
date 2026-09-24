import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Checkbox, Label } from '@rtds/ui';

const meta: Meta<typeof Checkbox> = {
  title: 'Foundations/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Base UI Checkbox with size (`sm` 14px / `default` 16px / `lg` 18px) and radius (`none` | `sm` | `md`, default `sm`). Pair with `Label` via `flex items-center gap-2` — no FormField wrapper. Press is a fine-pointer `scale(0.98)`; focus is ring-only.',
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
      options: ['none', 'sm', 'md'],
    },
    disabled: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    defaultChecked: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {},
};

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Checkbox size="sm" defaultChecked aria-label="Small" />
      <Checkbox size="default" defaultChecked aria-label="Default" />
      <Checkbox size="lg" defaultChecked aria-label="Large" />
    </div>
  ),
};

export const Radius: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Checkbox radius="none" defaultChecked aria-label="None" />
      <Checkbox radius="sm" defaultChecked aria-label="Small" />
      <Checkbox radius="md" defaultChecked aria-label="Medium" />
    </div>
  ),
};

export const SizesByRadius: Story = {
  render: () => {
    const sizes = ['sm', 'default', 'lg'] as const;
    const radii = ['none', 'sm', 'md'] as const;

    return (
      <div className="flex flex-col gap-4">
        {sizes.map((size) => (
          <div key={size} className="flex items-center gap-4">
            {radii.map((radius) => (
              <Checkbox
                key={radius}
                size={size}
                radius={radius}
                defaultChecked
                aria-label={`${size} / ${radius}`}
              />
            ))}
          </div>
        ))}
      </div>
    );
  },
};

export const Indeterminate: Story = {
  render: function IndeterminateStory() {
    const [checked, setChecked] = useState(false);
    const [indeterminate, setIndeterminate] = useState(true);

    return (
      <div className="flex items-center gap-2">
        <Checkbox
          id="story-checkbox-indeterminate"
          checked={checked}
          indeterminate={indeterminate}
          onCheckedChange={(next) => {
            setIndeterminate(false);
            setChecked(next);
          }}
        />
        <Label htmlFor="story-checkbox-indeterminate">Select all</Label>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Checkbox id="story-checkbox-disabled" disabled />
        <Label htmlFor="story-checkbox-disabled">Unchecked</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="story-checkbox-disabled-checked" disabled defaultChecked />
        <Label htmlFor="story-checkbox-disabled-checked">Checked</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="story-checkbox-disabled-indeterminate" disabled indeterminate />
        <Label htmlFor="story-checkbox-disabled-indeterminate">Indeterminate</Label>
      </div>
    </div>
  ),
};

export const Invalid: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Checkbox id="story-checkbox-invalid" aria-invalid />
        <Label htmlFor="story-checkbox-invalid">Unchecked</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="story-checkbox-invalid-checked" aria-invalid defaultChecked />
        <Label htmlFor="story-checkbox-invalid-checked">Checked</Label>
      </div>
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="story-checkbox-terms" />
      <Label htmlFor="story-checkbox-terms">Accept terms and conditions</Label>
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Checkbox id="story-checkbox-unchecked" />
        <Label htmlFor="story-checkbox-unchecked">Unchecked</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="story-checkbox-checked" defaultChecked />
        <Label htmlFor="story-checkbox-checked">Checked</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="story-checkbox-mixed" indeterminate />
        <Label htmlFor="story-checkbox-mixed">Indeterminate</Label>
      </div>
    </div>
  ),
};
