import type { Meta, StoryObj } from '@storybook/react';
import { FormField, Input, Textarea } from '@rtds/ui';

const meta: Meta<typeof FormField> = {
  title: 'Foundations/FormField',
  component: FormField,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FormField>;

export const Default: Story = {
  render: () => (
    <FormField label="Email" htmlFor="field-email" className="w-full max-w-sm">
      <Input id="field-email" type="email" placeholder="you@example.com" />
    </FormField>
  ),
};

export const WithHint: Story = {
  render: () => (
    <FormField
      label="Username"
      htmlFor="field-username"
      hint="This is your public display name."
      className="w-full max-w-sm"
    >
      <Input id="field-username" placeholder="johndoe" />
    </FormField>
  ),
};

export const Required: Story = {
  render: () => (
    <FormField
      label="Company"
      htmlFor="field-company"
      required
      className="w-full max-w-sm"
    >
      <Input id="field-company" placeholder="Acme Inc." />
    </FormField>
  ),
};

export const Error: Story = {
  render: () => (
    <FormField
      label="Email"
      htmlFor="field-email-error"
      error="Please enter a valid email address."
      className="w-full max-w-sm"
    >
      <Input id="field-email-error" type="email" error placeholder="you@example.com" />
    </FormField>
  ),
};

export const TextareaField: Story = {
  render: () => (
    <FormField
      label="Notes"
      htmlFor="field-notes"
      hint="Optional context for the team."
      className="w-full max-w-sm"
    >
      <Textarea id="field-notes" rows={4} placeholder="Anything we should know?" />
    </FormField>
  ),
};
