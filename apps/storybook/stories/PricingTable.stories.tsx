import type { Meta, StoryObj } from '@storybook/react';
import { PricingTable, PricingTier } from '@rtds/ui';

const meta: Meta<typeof PricingTable> = {
  title: 'Marketing/PricingTable',
  component: PricingTable,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof PricingTable>;

const starterFeatures = [
  { text: 'Core primitives', included: true },
  { text: 'Generated theme CSS', included: true },
  { text: 'Email support', included: false },
  { text: 'Custom niches', included: false },
];

const growthFeatures = [
  { text: 'Core primitives', included: true },
  { text: 'Generated theme CSS', included: true },
  { text: 'Email support', included: true },
  { text: 'Custom niches', included: false },
];

const scaleFeatures = [
  { text: 'Core primitives', included: true },
  { text: 'Generated theme CSS', included: true },
  { text: 'Email support', included: true },
  { text: 'Custom niches', included: true },
];

export const Default: Story = {
  args: {
    title: 'Simple pricing',
    description: 'Start with tokens and grow into a full landing kit.',
    children: (
      <>
        <PricingTier
          name="Starter"
          description="For a first product surface."
          price="$0"
          features={starterFeatures}
          cta={{ label: 'Get started', href: '#start' }}
        />
        <PricingTier
          name="Growth"
          description="For teams shipping marketing sites."
          price="$49"
          featured
          features={growthFeatures}
          cta={{ label: 'Start trial', href: '#trial' }}
        />
        <PricingTier
          name="Scale"
          description="For multi-brand playgrounds."
          price="$99"
          features={scaleFeatures}
          cta={{ label: 'Talk to us', href: '#contact' }}
        />
      </>
    ),
  },
};

export const TwoTiers: Story = {
  args: {
    title: 'Choose a plan',
    children: (
      <>
        <PricingTier
          name="Starter"
          price="$0"
          features={starterFeatures}
          cta={{ label: 'Get started', href: '#start' }}
        />
        <PricingTier
          name="Growth"
          price="$49"
          featured
          features={growthFeatures}
          cta={{ label: 'Start trial', href: '#trial' }}
        />
      </>
    ),
  },
};
