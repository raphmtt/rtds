import * as React from 'react';
import { Button as BaseButton } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { Icon } from './icon';

const buttonVariants = cva(
  'rtds-button relative inline-flex items-center justify-center whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground hover:bg-primary/90 fine-hover:shadow-sm fine-hover:brightness-105',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80 fine-hover:shadow-sm fine-hover:brightness-105',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2 text-label',
        sm: 'h-9 px-3 text-label-sm',
        lg: 'h-11 px-8 text-label-lg',
        icon: 'h-10 w-10',
      },
      radius: {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        full: 'rounded-full',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    compoundVariants: [
      {
        variant: ['default', 'destructive', 'outline', 'secondary', 'ghost'],
        class: 'rtds-button-press',
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'default',
      radius: 'md',
    },
  }
);

export interface ButtonProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseButton>, 'className'>,
    VariantProps<typeof buttonVariants> {
  className?: string;
  loading?: boolean;
  /** Optional visual label in the loading overlay. Default: spinner only. */
  loadingText?: string;
}

const Button = React.forwardRef<HTMLElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      radius,
      fullWidth,
      loading = false,
      loadingText,
      children,
      disabled,
      focusableWhenDisabled,
      ...props
    },
    ref
  ) => {
    return (
      <BaseButton
        {...props}
        ref={ref}
        className={cn(buttonVariants({ variant, size, radius, fullWidth }), className)}
        disabled={disabled || loading}
        focusableWhenDisabled={focusableWhenDisabled ?? loading}
        aria-busy={loading || undefined}
        data-loading={loading || undefined}
      >
        <span className="rtds-button-content">{children}</span>
        <span className="rtds-button-spinner" aria-hidden="true">
          <Icon icon={Loader2} className="animate-spin motion-reduce:animate-none" />
          {loadingText ? <span className="text-current">{loadingText}</span> : null}
        </span>
      </BaseButton>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
