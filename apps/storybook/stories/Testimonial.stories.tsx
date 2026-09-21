import type { Meta, StoryObj } from '@storybook/react';
import { Testimonial, TestimonialGrid } from '@rtds/ui';

const meta: Meta<typeof TestimonialGrid> = {
  title: 'Marketing/Testimonial',
  component: TestimonialGrid,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof TestimonialGrid>;

export const Default: Story = {
  args: {
    title: 'Teams shipping with RTDS',
    description: 'Quotes from product and marketing surfaces using the same tokens.',
    children: (
      <>
        <Testimonial
          quote="We swapped the theme file and the landing restyled without touching components."
          author={{ name: 'Ada Lovelace', title: 'Staff engineer', company: 'Northwind' }}
        />
        <Testimonial
          quote="Storybook and the demo finally show the same primitives. Reviews got shorter."
          author={{ name: 'Grace Hopper', title: 'Design lead', company: 'Helios' }}
        />
        <Testimonial
          quote="Base UI wrappers kept a11y behavior while our CVA styles stayed intact."
          author={{ name: 'Alan Kay', title: 'Frontend', company: 'Kinetic' }}
        />
      </>
    ),
  },
};

export const Single: Story = {
  render: () => (
    <div className="mx-auto max-w-md p-8">
      <Testimonial
        quote="Semantic tokens mean dark mode is a class, not a redesign."
        author={{
          name: 'Ada Lovelace',
          title: 'Staff engineer',
          company: 'Northwind',
          image: 'https://i.pravatar.cc/80?img=5',
        }}
      />
    </div>
  ),
};
