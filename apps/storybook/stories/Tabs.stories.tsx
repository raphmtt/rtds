import type { Meta, StoryObj } from '@storybook/react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  type TabsListRadius,
} from '@rtds/ui';

const meta: Meta<typeof TabsList> = {
  title: 'Navigation/Tabs',
  component: TabsList,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'One size (`h-10`). A shared indicator pill slides and resizes over 200ms on `--ease-in-out` while triggers use `text-label` and ring-only focus — no press scale. Panel content swaps instantly.',
      },
    },
  },
  argTypes: {
    radius: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'full'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof TabsList>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-full max-w-md">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics dashboard</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">Overview panel</TabsContent>
      <TabsContent value="analytics">Analytics panel</TabsContent>
      <TabsContent value="reports">Reports panel</TabsContent>
    </Tabs>
  ),
};

export const Radius: Story = {
  render: () => {
    const radii: TabsListRadius[] = ['none', 'sm', 'md', 'lg', 'full'];

    return (
      <div className="flex flex-col gap-8">
        {radii.map((radius) => (
          <Tabs key={radius} defaultValue="one">
            <p className="mb-2 text-label text-muted-foreground">radius=&quot;{radius}&quot;</p>
            <TabsList radius={radius}>
              <TabsTrigger value="one">One</TabsTrigger>
              <TabsTrigger value="two">Two</TabsTrigger>
            </TabsList>
            <TabsContent value="one">First</TabsContent>
            <TabsContent value="two">Second</TabsContent>
          </Tabs>
        ))}
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <Tabs defaultValue="active">
      <TabsList>
        <TabsTrigger value="active">Active</TabsTrigger>
        <TabsTrigger value="disabled" disabled>
          Disabled
        </TabsTrigger>
        <TabsTrigger value="other">Other</TabsTrigger>
      </TabsList>
      <TabsContent value="active">Active tab panel</TabsContent>
      <TabsContent value="disabled">Disabled tab panel</TabsContent>
      <TabsContent value="other">Other tab panel</TabsContent>
    </Tabs>
  ),
};
