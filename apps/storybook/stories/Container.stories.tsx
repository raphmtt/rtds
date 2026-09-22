import type { Meta, StoryObj } from '@storybook/react';
import { Container } from '@rtds/ui';

const meta: Meta<typeof Container> = {
  title: 'Layout/Container',
  component: Container,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Container>;

export const Default: Story = {
  render: () => (
    <div className="bg-muted py-12">
      <Container>
        <div className="rounded-lg border bg-background p-6 text-foreground">
          Max-width container with responsive horizontal padding.
        </div>
      </Container>
    </div>
  ),
};
