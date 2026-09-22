import type { Meta, StoryObj } from '@storybook/react';
import { AnnouncementBar } from '@rtds/ui';

const meta: Meta<typeof AnnouncementBar> = {
  title: 'Navigation/AnnouncementBar',
  component: AnnouncementBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof AnnouncementBar>;

export const Default: Story = {
  args: {
    message: 'RTDS primitives now wrap Base UI.',
    dismissible: false,
    action: { label: 'Read the notes', href: '#notes' },
  },
};

export const Dismissible: Story = {
  args: {
    message: 'Dismiss me — the choice is stored in localStorage.',
    dismissible: true,
    storageKey: 'storybook-announcement-dismissed',
  },
};

export const MessageOnly: Story = {
  args: {
    message: 'Ship one generated theme file per product app.',
    dismissible: false,
  },
};
