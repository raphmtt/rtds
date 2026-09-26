import type { Meta, StoryObj } from '@storybook/react';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  type DialogContentRadius,
} from '@rtds/ui';

const meta: Meta<typeof DialogContent> = {
  title: 'Foundations/Dialog',
  component: DialogContent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Modal dialog with a theme-aware overlay (`bg-foreground/80`) and a centered popup that enters with opacity + `scale(0.96)` over 200ms `--ease-out` (via the CSS `scale` property so centering `translate` is unaffected). `radius` on `DialogContent` defaults to `lg` (`none` | `sm` | `md` | `lg` | `full`). The corner close is a Lucide X with a 44px hit target, ring-only focus, and no press scale.',
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
type Story = StoryObj<typeof DialogContent>;

function BasicDialog({
  radius,
  triggerLabel = 'Open dialog',
}: {
  radius?: DialogContentRadius;
  triggerLabel?: string;
}) {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>{triggerLabel}</DialogTrigger>
      <DialogContent radius={radius}>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" type="button" />}>Close</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export const Default: Story = {
  render: () => <BasicDialog />,
};

export const Radius: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      {(['none', 'sm', 'md', 'lg', 'full'] as const).map((radius) => (
        <BasicDialog key={radius} radius={radius} triggerLabel={`radius="${radius}"`} />
      ))}
    </div>
  ),
};

export const LongContent: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>Open long dialog</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Terms of service</DialogTitle>
          <DialogDescription>
            Scroll inside the dialog when content exceeds the viewport cap.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 text-body-sm text-muted-foreground">
          {Array.from({ length: 12 }, (_, index) => (
            <p key={index}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          ))}
        </div>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" type="button" />}>Close</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};
