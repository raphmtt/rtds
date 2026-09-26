import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

const labelVariants = cva('text-foreground', {
  variants: {
    size: {
      sm: 'text-label-sm',
      default: 'text-label',
      lg: 'text-label-lg',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

export interface LabelProps
  extends React.ComponentPropsWithoutRef<'label'>,
    VariantProps<typeof labelVariants> {}

export type LabelSize = NonNullable<VariantProps<typeof labelVariants>['size']>;

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, size, ...props }, ref) => (
    <label ref={ref} className={cn(labelVariants({ size }), className)} {...props} />
  )
);
Label.displayName = 'Label';

export { Label, labelVariants };
