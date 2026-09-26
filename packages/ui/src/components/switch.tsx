import * as React from 'react';
import { Switch as SwitchPrimitive } from '@base-ui/react/switch';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

const switchVariants = cva(
  'rtds-switch peer relative inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent ring-offset-background select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-disabled:cursor-not-allowed data-disabled:opacity-50 data-checked:bg-primary data-unchecked:bg-input aria-invalid:border-destructive aria-invalid:focus-visible:ring-destructive data-invalid:border-destructive data-invalid:focus-visible:ring-destructive',
  {
    variants: {
      size: {
        sm: 'h-5 w-9',
        default: 'h-6 w-11',
        lg: 'h-7 w-13',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

const switchThumbVariants = cva(
  'rtds-switch-thumb pointer-events-none block rounded-full bg-background shadow-lg ring-0 data-unchecked:translate-x-0',
  {
    variants: {
      size: {
        sm: 'size-4 data-checked:translate-x-4',
        default: 'size-5 data-checked:translate-x-5',
        lg: 'size-6 data-checked:translate-x-6',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

export interface SwitchProps
  extends Omit<SwitchPrimitive.Root.Props, 'className'>,
    VariantProps<typeof switchVariants> {
  className?: string;
}

export type SwitchSize = NonNullable<VariantProps<typeof switchVariants>['size']>;

const Switch = React.forwardRef<HTMLElement, SwitchProps>(
  ({ className, size, ...props }, ref) => (
    <SwitchPrimitive.Root
      {...props}
      ref={ref}
      className={cn(switchVariants({ size }), className)}
    >
      <SwitchPrimitive.Thumb className={cn(switchThumbVariants({ size }))} />
    </SwitchPrimitive.Root>
  )
);
Switch.displayName = 'Switch';

export { Switch, switchVariants };
