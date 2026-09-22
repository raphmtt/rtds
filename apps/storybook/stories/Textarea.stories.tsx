import type { Meta, StoryObj } from '@storybook/react';
import { FormField, Label, Textarea } from '@rtds/ui';

const meta: Meta<typeof Textarea> = {
  title: 'Foundations/Textarea',
  component: Textarea,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    placeholder: 'Write a short message…',
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="w-full max-w-sm space-y-2">
      <Label htmlFor="bio">Bio</Label>
      <Textarea id="bio" placeholder="Tell us about yourself" rows={4} />
    </div>
  ),
};

export const WithFormField: Story = {
  render: () => (
    <FormField
      label="Message"
      htmlFor="message"
      hint="Keep it under a few paragraphs."
    >
      <Textarea id="message" placeholder="How can we help?" rows={5} />
    </FormField>
  ),
};

export const Error: Story = {
  render: () => (
    <FormField
      label="Feedback"
      htmlFor="feedback-error"
      error="Please add a bit more detail."
    >
      <Textarea id="feedback-error" error placeholder="Your feedback" rows={4} />
    </FormField>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Disabled textarea',
  },
};
