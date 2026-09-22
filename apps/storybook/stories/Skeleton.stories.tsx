import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from '@rtds/ui';

const meta: Meta<typeof Skeleton> = {
  title: 'Foundations/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  render: () => <Skeleton className="h-4 w-48" />,
};

export const Circle: Story = {
  render: () => <Skeleton className="h-12 w-12 rounded-full" />,
};

export const CardPlaceholder: Story = {
  render: () => (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  ),
};

export const ProfileRow: Story = {
  render: () => (
    <div className="flex w-full max-w-sm items-center gap-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="flex flex-1 flex-col gap-2">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-3 w-1/3" />
      </div>
    </div>
  ),
};
