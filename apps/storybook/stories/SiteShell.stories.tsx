import type { Meta, StoryObj } from '@storybook/react';
import { Container, SiteFooter, SiteHeader, SiteShell } from '@rtds/ui';

const Logo = () => <div className="font-heading text-xl font-bold">RTDS</div>;

const meta: Meta<typeof SiteShell> = {
  title: 'Layout/SiteShell',
  component: SiteShell,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof SiteShell>;

export const Default: Story = {
  render: () => (
    <SiteShell>
      <SiteHeader
        logo={<Logo />}
        navItems={[
          { label: 'Features', href: '#features' },
          { label: 'Docs', href: '#docs' },
        ]}
        cta={{ label: 'Get Started', href: '#' }}
      />
      <main id="main-content">
        <Container className="py-16">
          <h1 className="font-heading text-3xl font-bold">Skip link target</h1>
          <p className="mt-2 text-muted-foreground">
            Tab to the skip link, then activate it to land here.
          </p>
        </Container>
      </main>
      <SiteFooter
        logo={<Logo />}
        copyright="© 2026 RTDS. All rights reserved."
      />
    </SiteShell>
  ),
};
