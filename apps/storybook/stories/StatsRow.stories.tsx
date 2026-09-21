import type { Meta, StoryObj } from '@storybook/react';
import { StatItem, StatsRow } from '@rtds/ui';

const meta: Meta<typeof StatsRow> = {
  title: 'Marketing/StatsRow',
  component: StatsRow,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof StatsRow>;

export const Default: Story = {
  args: {
    children: (
      <>
        <StatItem value="50+" label="Components" />
        <StatItem value="3" label="Niches" />
        <StatItem value="6" label="Theme variants" />
        <StatItem value="AA" label="WCAG Compliant" />
      </>
    ),
  },
};
