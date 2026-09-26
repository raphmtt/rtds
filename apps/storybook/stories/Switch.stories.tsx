import type { Meta, StoryObj } from '@storybook/react';
import { Label, Switch } from '@rtds/ui';

const meta: Meta<typeof Switch> = {
  title: 'Foundations/Switch',
  component: Switch,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Pill track only (`rounded-full`). Sizes: `sm` (20×36), `default` (24×44), `lg` (28×52). Press is fine-pointer `scale(0.98)`; focus is ring-only (no scale). Thumb travel is 200ms with `--ease-in-out`. Pair with `Label` via `flex items-center gap-2` — no FormField wrapper.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
    },
    disabled: { control: 'boolean' },
    defaultChecked: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

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
      <Switch size="sm" defaultChecked aria-label="Small" />
      <Switch size="default" defaultChecked aria-label="Default" />
      <Switch size="lg" defaultChecked aria-label="Large" />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Switch id="story-switch-disabled" disabled />
        <Label htmlFor="story-switch-disabled">Unchecked</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="story-switch-disabled-checked" disabled defaultChecked />
        <Label htmlFor="story-switch-disabled-checked">Checked</Label>
      </div>
    </div>
  ),
};

export const Invalid: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Switch id="story-switch-invalid" aria-invalid />
        <Label htmlFor="story-switch-invalid">Unchecked</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="story-switch-invalid-checked" aria-invalid defaultChecked />
        <Label htmlFor="story-switch-invalid-checked">Checked</Label>
      </div>
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Switch id="story-switch-notifications" />
      <Label htmlFor="story-switch-notifications">Enable notifications</Label>
    </div>
  ),
};
