import type { Meta, StoryObj } from '@storybook/react';
import { Stack } from '@rtds/ui';

const meta: Meta<typeof Stack> = {
  title: 'Layout/Stack',
  component: Stack,
  tags: ['autodocs'],
  argTypes: {
    gap: {
      control: 'select',
      options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12],
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Stack>;

function Box({ label }: { label: string }) {
  return (
    <div className="rounded-md bg-muted px-4 py-3 text-sm text-foreground">{label}</div>
  );
}

export const Default: Story = {
  args: {
    gap: 4,
    children: (
      <>
        <Box label="One" />
        <Box label="Two" />
        <Box label="Three" />
      </>
    ),
  },
};

export const Tight: Story = {
  args: {
    gap: 2,
    children: (
      <>
        <Box label="One" />
        <Box label="Two" />
        <Box label="Three" />
      </>
    ),
  },
};

export const Centered: Story = {
  args: {
    gap: 4,
    align: 'center',
    children: (
      <>
        <Box label="Narrow" />
        <Box label="A wider stack child" />
      </>
    ),
  },
};
