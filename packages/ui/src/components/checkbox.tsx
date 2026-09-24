import * as React from 'react';
import { Checkbox as CheckboxPrimitive } from '@base-ui/react/checkbox';
import { cva, type VariantProps } from 'class-variance-authority';
import { Check, Minus } from 'lucide-react';
import { cn } from '../lib/utils';
import { Icon } from './icon';

const checkboxVariants = cva(
  'rtds-checkbox peer relative inline-flex shrink-0 cursor-pointer items-center justify-center border border-primary bg-background text-primary-foreground select-none ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-disabled:cursor-not-allowed data-disabled:opacity-50 data-checked:bg-primary data-indeterminate:bg-primary aria-invalid:border-destructive aria-invalid:focus-visible:ring-destructive data-invalid:border-destructive data-invalid:focus-visible:ring-destructive',
  {
    variants: {
      size: {
        sm: 'size-3.5',
        default: 'size-4',
        lg: 'size-4.5',
      },
      radius: {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md',
      },
    },
    defaultVariants: {
      size: 'default',
      radius: 'sm',
    },
  }
);

const checkboxIconSize = {
  sm: 12,
  default: 14,
  lg: 16,
} as const;

export interface CheckboxProps
  extends Omit<CheckboxPrimitive.Root.Props, 'className'>,
    VariantProps<typeof checkboxVariants> {
  className?: string;
}

export type CheckboxSize = NonNullable<VariantProps<typeof checkboxVariants>['size']>;
export type CheckboxRadius = NonNullable<VariantProps<typeof checkboxVariants>['radius']>;

const Checkbox = React.forwardRef<HTMLElement, CheckboxProps>(
  ({ className, size, radius, indeterminate = false, ...props }, ref) => {
    const iconSize = checkboxIconSize[size ?? 'default'];

    return (
      <CheckboxPrimitive.Root
        {...props}
        ref={ref}
        className={cn(checkboxVariants({ size, radius }), className)}
        indeterminate={indeterminate}
      >
        <CheckboxPrimitive.Indicator className="rtds-checkbox-indicator flex items-center justify-center text-current">
          <Icon icon={indeterminate ? Minus : Check} size={iconSize} />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    );
  }
);
Checkbox.displayName = 'Checkbox';

export { Checkbox, checkboxVariants };
