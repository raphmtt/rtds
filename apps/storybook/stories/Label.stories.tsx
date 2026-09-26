import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox, Label } from '@rtds/ui';

const meta: Meta<typeof Label> = {
  title: 'Foundations/Label',
  component: Label,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {
  render: () => (
    <Label htmlFor="label-default">Email address</Label>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Label htmlFor="label-sm" size="sm">
        Small label
      </Label>
      <Label htmlFor="label-default-size">Default label</Label>
      <Label htmlFor="label-lg" size="lg">
        Large label
      </Label>
    </div>
  ),
};

export const WithCheckbox: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Checkbox id="label-checkbox" />
        <Label htmlFor="label-checkbox">Accept terms</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="label-checkbox-disabled" disabled />
        <Label htmlFor="label-checkbox-disabled">Disabled control, full-contrast label</Label>
      </div>
    </div>
  ),
};
