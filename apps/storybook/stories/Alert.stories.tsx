import type { Meta, StoryObj } from '@storybook/react';
import { Alert, AlertDescription, AlertTitle, Icon } from '@rtds/ui';
import { AlertCircle, Info } from 'lucide-react';

const meta: Meta<typeof Alert> = {
  title: 'Foundations/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  render: () => (
    <Alert className="max-w-lg">
      <Icon icon={Info} />
      <AlertTitle>Theme updated</AlertTitle>
      <AlertDescription>
        Semantic tokens restyle this alert in light and dark without extra classes.
      </AlertDescription>
    </Alert>
  ),
};

export const Destructive: Story = {
  render: () => (
    <Alert variant="destructive" className="max-w-lg">
      <Icon icon={AlertCircle} />
      <AlertTitle>Could not save</AlertTitle>
      <AlertDescription>Check the form fields and try again.</AlertDescription>
    </Alert>
  ),
};

export const TitleOnly: Story = {
  render: () => (
    <Alert className="max-w-lg">
      <AlertTitle>Maintenance window tonight</AlertTitle>
    </Alert>
  ),
};
