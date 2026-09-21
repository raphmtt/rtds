import type { Meta, StoryObj } from '@storybook/react';
import { Button, FeatureSplit } from '@rtds/ui';

const placeholder = (
  <div className="flex aspect-video items-center justify-center rounded-lg bg-muted text-muted-foreground">
    Media placeholder
  </div>
);

const meta: Meta<typeof FeatureSplit> = {
  title: 'Marketing/FeatureSplit',
  component: FeatureSplit,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof FeatureSplit>;

export const Default: Story = {
  args: {
    eyebrow: 'Tokens first',
    title: 'One theme file, every surface',
    description:
      'Product apps import generated CSS plus @rtds/ui/base.css. Components restyle from semantic tokens — no hex in call sites.',
    media: placeholder,
    actions: (
      <>
        <Button>Read theming docs</Button>
        <Button variant="outline">Open Storybook</Button>
      </>
    ),
  },
};

export const Reversed: Story = {
  args: {
    eyebrow: 'Base UI',
    title: 'Primitives wrap the headless layer 1:1',
    description:
      'Public exports swallow compound parts. Visuals stay on CVA and CSS variables.',
    media: placeholder,
    reverse: true,
    actions: <Button variant="outline">See ADR-001</Button>,
  },
};
