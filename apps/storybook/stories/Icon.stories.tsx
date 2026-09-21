import type { Meta, StoryObj } from '@storybook/react';
import { ICON_SIZE_FEATURE, ICON_SIZE_UI, Icon } from '@rtds/ui';
import { Palette, Shield, Zap } from 'lucide-react';

const meta: Meta<typeof Icon> = {
  title: 'Foundations/Icon',
  component: Icon,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {
    icon: Zap,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-6 text-foreground">
      <div className="flex flex-col items-center gap-2">
        <Icon icon={Zap} size={ICON_SIZE_UI} />
        <span className="text-xs text-muted-foreground">UI {ICON_SIZE_UI}</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon icon={Shield} size={ICON_SIZE_FEATURE} />
        <span className="text-xs text-muted-foreground">Feature {ICON_SIZE_FEATURE}</span>
      </div>
    </div>
  ),
};

export const Set: Story = {
  render: () => (
    <div className="flex gap-4 text-foreground">
      <Icon icon={Zap} />
      <Icon icon={Shield} />
      <Icon icon={Palette} />
    </div>
  ),
};
