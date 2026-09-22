import type { Meta, StoryObj } from '@storybook/react';
import { Icon, SiteFooter } from '@rtds/ui';
import { Github, Twitter } from 'lucide-react';

const Logo = () => <div className="font-heading text-xl font-bold">RTDS</div>;

const columns = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Changelog', href: '#changelog' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: '#docs' },
      { label: 'Storybook', href: '#storybook' },
      { label: 'GitHub', href: '#github' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#about' },
      { label: 'Blog', href: '#blog' },
      { label: 'Contact', href: '#contact' },
    ],
  },
];

const meta: Meta<typeof SiteFooter> = {
  title: 'Navigation/SiteFooter',
  component: SiteFooter,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof SiteFooter>;

export const Default: Story = {
  args: {
    logo: <Logo />,
    description: 'A modern design system for building accessible landing pages.',
    columns,
    socialLinks: [
      { label: 'GitHub', href: '#github', icon: <Icon icon={Github} /> },
      { label: 'Twitter', href: '#twitter', icon: <Icon icon={Twitter} /> },
    ],
    copyright: '© 2026 RTDS. All rights reserved.',
    legalLinks: [
      { label: 'Privacy', href: '#privacy' },
      { label: 'Terms', href: '#terms' },
    ],
  },
};

export const Minimal: Story = {
  args: {
    logo: <Logo />,
    copyright: '© 2026 RTDS. All rights reserved.',
  },
};
