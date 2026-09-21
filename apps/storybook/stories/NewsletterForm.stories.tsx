import type { Meta, StoryObj } from '@storybook/react';
import { NewsletterForm } from '@rtds/ui';

const meta: Meta<typeof NewsletterForm> = {
  title: 'Marketing/NewsletterForm',
  component: NewsletterForm,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof NewsletterForm>;

export const Default: Story = {
  args: {
    onSubmit: () => undefined,
  },
};

export const CustomLabels: Story = {
  args: {
    placeholder: 'you@company.com',
    submitLabel: 'Join the list',
    onSubmit: () => undefined,
  },
};
