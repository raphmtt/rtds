import type { Meta, StoryObj } from '@storybook/react';
import { ContactForm } from '@rtds/ui';

const meta: Meta<typeof ContactForm> = {
  title: 'Marketing/ContactForm',
  component: ContactForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof ContactForm>;

export const Default: Story = {
  args: {
    onSubmit: () => undefined,
  },
};

export const CustomCopy: Story = {
  args: {
    title: 'Talk to the team',
    description: 'Tell us what you are building. We usually reply within a day.',
    submitLabel: 'Send',
    onSubmit: () => undefined,
  },
};
