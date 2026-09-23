import type { Meta, StoryObj } from '@storybook/react';

const ROLES = [
  {
    role: 'label-sm',
    className: 'text-label-sm',
    spec: '0.75rem / medium / tight',
    sample: 'Button sm · badge · chip',
  },
  {
    role: 'label',
    className: 'text-label',
    spec: '0.875rem / medium / tight',
    sample: 'Button default · compact label',
  },
  {
    role: 'label-lg',
    className: 'text-label-lg',
    spec: '1rem / medium / tight',
    sample: 'Button lg · CTA label',
  },
  {
    role: 'body-sm',
    className: 'text-body-sm',
    spec: '0.875rem / regular / normal',
    sample: 'Helper text and captions sit on this role.',
  },
  {
    role: 'body',
    className: 'text-body',
    spec: '1rem / regular / normal',
    sample: 'Running UI copy. Same scale on atlas, folio, and maison.',
  },
  {
    role: 'body-lg',
    className: 'text-body-lg',
    spec: '1.125rem / regular / normal',
    sample: 'Lead sentence or light emphasis without a heading token.',
  },
] as const;

function Typography() {
  return (
    <div className="flex w-full max-w-2xl flex-col gap-8 text-foreground">
      <div>
        <h1 className="font-heading text-2xl font-semibold">UI type scale</h1>
        <p className="text-body-sm mt-2 text-muted-foreground">
          Tokens from <code className="font-mono text-xs">@rtds/tokens</code>. Utilities from{' '}
          <code className="font-mono text-xs">@rtds/tw-preset</code>. Headings and display are not
          in this set. Button still uses <code className="font-mono text-xs">text-sm font-medium</code>{' '}
          until its own PR.
        </p>
      </div>
      <ul className="flex flex-col gap-6">
        {ROLES.map((item) => (
          <li key={item.role} className="border-b border-border pb-6 last:border-b-0 last:pb-0">
            <div className="text-body-sm mb-2 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-muted-foreground">
              <code className="font-mono text-xs text-foreground">{item.className}</code>
              <span>{item.spec}</span>
            </div>
            <p className={item.className}>{item.sample}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

const meta: Meta<typeof Typography> = {
  title: 'Foundations/Typography',
  component: Typography,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const Scale: Story = {};
