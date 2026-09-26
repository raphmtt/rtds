import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button, FormField, Input } from '@rtds/ui';

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
      <Input id="field-email-error" type="email" placeholder="you@example.com" />
    </FormField>
  ),
};

export const ErrorReplacesHint: Story = {
  render: () => (
    <FormField
      label="Email"
      htmlFor="field-email-hint-error"
      hint="We will never share your email."
      error="Please enter a valid email address."
      className="w-full max-w-sm"
    >
      <Input id="field-email-hint-error" type="email" placeholder="you@example.com" />
    </FormField>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <FormField label="Small" htmlFor="field-size-sm" size="sm">
        <Input id="field-size-sm" size="sm" placeholder="Small label" />
      </FormField>
      <FormField label="Default" htmlFor="field-size-default" size="default">
        <Input id="field-size-default" placeholder="Default label" />
      </FormField>
      <FormField label="Large" htmlFor="field-size-lg" size="lg">
        <Input id="field-size-lg" size="lg" placeholder="Large label" />
      </FormField>
    </div>
  ),
};

export const ErrorEnterAnimation: Story = {
  render: function ErrorEnterAnimationStory() {
    const [error, setError] = React.useState<string | undefined>(
      'Please enter a valid email address.'
    );

    return (
      <div className="flex w-full max-w-sm flex-col gap-4">
        <FormField
          label="Email"
          htmlFor="field-error-toggle"
          error={error}
          className="w-full"
        >
          <Input id="field-error-toggle" type="email" placeholder="you@example.com" />
        </FormField>
        <Button type="button" variant="outline" onClick={() => setError(undefined)}>
          Clear error
        </Button>
        <Button
          type="button"
          onClick={() => setError('Please enter a valid email address.')}
        >
          Show error
        </Button>
      </div>
    );
  },
};
