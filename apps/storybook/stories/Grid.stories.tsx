import type { Meta, StoryObj } from '@storybook/react';
import { Grid } from '@rtds/ui';

const meta: Meta<typeof Grid> = {
  title: 'Layout/Grid',
  component: Grid,
  tags: ['autodocs'],
  argTypes: {
    cols: {
      control: 'select',
      options: [1, 2, 3, 4],
    },
    gap: {
      control: 'select',
      options: [4, 6, 8, 10, 12],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Grid>;

function Cell({ label }: { label: string }) {
  return (
    <div className="rounded-md bg-muted px-4 py-8 text-center text-sm text-foreground">
      {label}
    </div>
  );
}

export const Default: Story = {
  args: {
    cols: 3,
    gap: 6,
    className: 'w-full max-w-3xl',
    children: (
      <>
        <Cell label="A" />
        <Cell label="B" />
        <Cell label="C" />
        <Cell label="D" />
        <Cell label="E" />
        <Cell label="F" />
      </>
    ),
  },
};

export const TwoColumns: Story = {
  args: {
    cols: 2,
    gap: 4,
    className: 'w-full max-w-3xl',
    children: (
      <>
        <Cell label="Left" />
        <Cell label="Right" />
        <Cell label="Left" />
        <Cell label="Right" />
      </>
    ),
  },
};

export const FourColumns: Story = {
  args: {
    cols: 4,
    gap: 4,
    className: 'w-full max-w-4xl',
    children: (
      <>
        <Cell label="1" />
        <Cell label="2" />
        <Cell label="3" />
        <Cell label="4" />
      </>
    ),
  },
};
