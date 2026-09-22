import type { Meta, StoryObj } from '@storybook/react';
import { Bleed, Container } from '@rtds/ui';

const meta: Meta<typeof Bleed> = {
  title: 'Layout/Bleed',
  component: Bleed,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Bleed>;

export const Default: Story = {
  render: () => (
    <Container className="py-12">
      <p className="mb-6 text-muted-foreground">
        Content stays in the container. The band below breaks out to the viewport edge.
      </p>
      <Bleed>
        <div className="bg-muted py-10 text-center text-foreground">Full-bleed band</div>
      </Bleed>
      <p className="mt-6 text-muted-foreground">Back inside the container.</p>
    </Container>
  ),
};
