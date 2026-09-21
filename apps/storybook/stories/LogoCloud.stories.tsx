import type { Meta, StoryObj } from '@storybook/react';
import { LogoCloud } from '@rtds/ui';

const wordmark = (name: string) => (
  <span className="font-heading text-xl font-semibold tracking-tight">{name}</span>
);

const meta: Meta<typeof LogoCloud> = {
  title: 'Marketing/LogoCloud',
  component: LogoCloud,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof LogoCloud>;

export const Default: Story = {
  args: {
    title: 'Trusted by teams shipping landing pages',
    logos: [
      { name: 'Northwind', logo: wordmark('Northwind') },
      { name: 'Helios', logo: wordmark('Helios') },
      { name: 'Kinetic', logo: wordmark('Kinetic') },
      { name: 'Harbor', logo: wordmark('Harbor') },
      { name: 'Lumen', logo: wordmark('Lumen') },
    ],
  },
};

export const WithoutTitle: Story = {
  args: {
    logos: [
      { name: 'Northwind', logo: wordmark('Northwind') },
      { name: 'Helios', logo: wordmark('Helios') },
      { name: 'Kinetic', logo: wordmark('Kinetic') },
    ],
  },
};
