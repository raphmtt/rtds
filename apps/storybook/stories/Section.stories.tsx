import type { Meta, StoryObj } from '@storybook/react';
import { Container, Section } from '@rtds/ui';

const meta: Meta<typeof Section> = {
  title: 'Layout/Section',
  component: Section,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    tone: {
      control: 'select',
      options: ['default', 'muted', 'inverse'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Section>;

export const Default: Story = {
  args: {
    tone: 'default',
    children: (
      <Container>
        <h2 className="font-heading text-2xl font-semibold">Default section</h2>
        <p className="mt-2 text-muted-foreground">Vertical rhythm for landing blocks.</p>
      </Container>
    ),
  },
};

export const Muted: Story = {
  args: {
    tone: 'muted',
    children: (
      <Container>
        <h2 className="font-heading text-2xl font-semibold">Muted section</h2>
        <p className="mt-2 text-muted-foreground">Uses the muted surface token.</p>
      </Container>
    ),
  },
};

export const Inverse: Story = {
  args: {
    tone: 'inverse',
    children: (
      <Container>
        <h2 className="font-heading text-2xl font-semibold">Inverse section</h2>
        <p className="mt-2 opacity-80">Foreground background with inverted text.</p>
      </Container>
    ),
  },
};
