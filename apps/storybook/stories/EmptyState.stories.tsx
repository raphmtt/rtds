import type { Meta, StoryObj } from '@storybook/react';
import { Button, EmptyState, Icon } from '@rtds/ui';
import { Inbox } from 'lucide-react';

const meta: Meta<typeof EmptyState> = {
  title: 'Foundations/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
  args: {
    title: 'No projects yet',
    description: 'Create a project to start composing landing pages with RTDS.',
  },
};

export const WithIcon: Story = {
  args: {
    icon: <Icon icon={Inbox} />,
    title: 'Inbox is empty',
    description: 'New messages will show up here.',
  },
};

export const WithActions: Story = {
  args: {
    icon: <Icon icon={Inbox} />,
    title: 'No results',
    description: 'Try a different filter or create something new.',
    actions: (
      <div className="flex flex-wrap justify-center gap-3">
        <Button>Create project</Button>
        <Button variant="outline">Clear filters</Button>
      </div>
    ),
  },
};
