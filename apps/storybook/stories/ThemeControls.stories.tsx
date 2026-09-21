import type { Meta, StoryObj } from '@storybook/react';
import { BrandProvider, BrandSelect, ModeSelect, ModeToggle, ThemeProvider } from '@rtds/ui';

const meta: Meta = {
  title: 'Foundations/ThemeControls',
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <BrandProvider defaultBrand="atlas">
        <ThemeProvider defaultMode="light">
          <Story />
        </ThemeProvider>
      </BrandProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj;

export const ModeToggleControl: Story = {
  name: 'ModeToggle',
  render: () => <ModeToggle />,
};

export const ModeSelectControl: Story = {
  name: 'ModeSelect',
  render: () => <ModeSelect />,
};

export const BrandSelectControl: Story = {
  name: 'BrandSelect',
  render: () => <BrandSelect />,
};

export const Together: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <BrandSelect />
      <ModeSelect />
      <ModeToggle />
    </div>
  ),
};
