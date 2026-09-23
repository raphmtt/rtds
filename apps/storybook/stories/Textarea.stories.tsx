import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button, FormField, Icon, Label, Textarea } from '@rtds/ui';
import { MessageSquare } from 'lucide-react';

const meta: Meta<typeof Textarea> = {
  title: 'Foundations/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Shares field CVA with Input (`text-body`, radius, size padding, error/focus). Native `<textarea>` — no auto-resize. Clear and paste are opt-in.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
    },
    radius: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'full'],
    },
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
    showClear: { control: 'boolean' },
    showPaste: { control: 'boolean' },
  },
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
    <FormField label="Message" htmlFor="message" hint="Keep it under a few paragraphs.">
      <Textarea id="message" placeholder="How can we help?" rows={5} />
    </FormField>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex max-w-sm flex-col gap-4">
      <Textarea size="sm" rows={3} placeholder="Small" />
      <Textarea size="default" rows={3} placeholder="Default" />
      <Textarea size="lg" rows={3} placeholder="Large" />
    </div>
  ),
};

export const Radius: Story = {
  render: () => (
    <div className="flex max-w-sm flex-col gap-4">
      <Textarea radius="none" rows={3} placeholder="None" />
      <Textarea radius="sm" rows={3} placeholder="Small" />
      <Textarea radius="md" rows={3} placeholder="Medium" />
      <Textarea radius="lg" rows={3} placeholder="Large" />
      <Textarea radius="full" rows={3} placeholder="Full" />
    </div>
  ),
};

export const Error: Story = {
  render: () => (
    <FormField label="Feedback" htmlFor="feedback-error" error="Please add a bit more detail.">
      <Textarea id="feedback-error" error placeholder="Your feedback" rows={4} />
    </FormField>
  ),
};

export const ErrorShake: Story = {
  render: function ErrorShakeStory() {
    const [error, setError] = useState(false);

    return (
      <div className="max-w-sm space-y-3">
        <FormField
          label="Notes"
          htmlFor="shake-notes"
          error={error ? 'Please add a bit more detail.' : undefined}
        >
          <Textarea id="shake-notes" error={error} rows={4} defaultValue="Too short" showClear />
        </FormField>
        <Button type="button" onClick={() => setError((current) => !current)}>
          {error ? 'Clear error' : 'Trigger error'}
        </Button>
      </div>
    );
  },
};

export const InvalidOnSubmit: Story = {
  render: () => (
    <form
      className="max-w-sm space-y-3"
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <FormField label="Message" htmlFor="submit-message" required>
        <Textarea id="submit-message" required rows={4} placeholder="How can we help?" />
      </FormField>
      <Button type="submit">Submit</Button>
    </form>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Disabled textarea',
  },
};

export const ShowClear: Story = {
  args: {
    showClear: true,
    defaultValue: 'Clear this note',
    rows: 4,
  },
};

export const ShowPaste: Story = {
  args: {
    showPaste: true,
    placeholder: 'Paste from clipboard',
    rows: 4,
  },
};

export const ClearAndPaste: Story = {
  args: {
    showClear: true,
    showPaste: true,
    defaultValue: 'Replace or clear',
    rows: 4,
  },
};

export const LeadingIcon: Story = {
  render: () => (
    <Textarea
      className="max-w-sm"
      leadingIcon={<Icon icon={MessageSquare} />}
      placeholder="With a leading icon"
      rows={4}
    />
  ),
};
