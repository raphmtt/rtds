import type { Meta, StoryObj } from '@storybook/react';
import { ErrorState } from '@rtds/ui';

const meta: Meta<typeof ErrorState> = {
  title: 'Foundations/ErrorState',
  component: ErrorState,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ErrorState>;

export const Default: Story = {};

export const CustomCopy: Story = {
  args: {
    title: 'Could not load themes',
    description: 'The playground CSS failed to load. Check the generator output and retry.',
  },
};

export const WithRetry: Story = {
  args: {
    title: 'Something went wrong',
    description: 'We could not reach the catalog. Try again in a moment.',
    onRetry: () => undefined,
    retryLabel: 'Try again',
  },
};
