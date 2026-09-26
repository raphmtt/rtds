import * as React from 'react';
import { Select as SelectPrimitive } from '@base-ui/react/select';
import { cva, type VariantProps } from 'class-variance-authority';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '../lib/utils';
import { Icon } from './icon';

const Select = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

const selectTriggerVariants = cva(
  'rtds-select-trigger flex w-full cursor-pointer items-center justify-between gap-2 border border-input bg-background text-body text-foreground shadow-none ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-disabled:cursor-not-allowed data-disabled:opacity-50 data-popup-open:ring-2 data-popup-open:ring-ring data-popup-open:ring-offset-2 data-placeholder:text-muted-foreground aria-invalid:border-destructive aria-invalid:focus-visible:ring-destructive aria-invalid:data-popup-open:ring-destructive data-invalid:border-destructive data-invalid:focus-visible:ring-destructive data-invalid:data-popup-open:ring-destructive [&>span]:line-clamp-1',
  {
    variants: {
      size: {
        sm: 'h-9 min-h-11 px-3 md:min-h-9',
        default: 'h-10 min-h-11 px-3 md:min-h-10',
        lg: 'h-11 px-4',
      },
      radius: {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        full: 'rounded-full',
      },
    },
    defaultVariants: {
      size: 'default',
      radius: 'md',
    },
  }
);

export interface SelectTriggerProps
  extends Omit<SelectPrimitive.Trigger.Props, 'className'>,
    VariantProps<typeof selectTriggerVariants> {
  className?: string;
}

export type SelectTriggerSize = NonNullable<VariantProps<typeof selectTriggerVariants>['size']>;
export type SelectTriggerRadius = NonNullable<VariantProps<typeof selectTriggerVariants>['radius']>;

const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ className, children, size, radius, ...props }, ref) => (
    <SelectPrimitive.Trigger
      ref={ref}
      className={cn(selectTriggerVariants({ size, radius }), className)}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon className="rtds-select-icon flex shrink-0 text-muted-foreground">
        <Icon icon={ChevronDown} size={16} />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
);
SelectTrigger.displayName = 'SelectTrigger';

const SelectScrollUpButton = React.forwardRef<
  HTMLDivElement,
  Omit<SelectPrimitive.ScrollUpArrow.Props, 'className'> & { className?: string }
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpArrow
    ref={ref}
    className={cn(
      'flex cursor-default items-center justify-center py-1 text-muted-foreground',
      className
    )}
    {...props}
  >
    <Icon icon={ChevronUp} size={16} />
  </SelectPrimitive.ScrollUpArrow>
));
SelectScrollUpButton.displayName = 'SelectScrollUpButton';

const SelectScrollDownButton = React.forwardRef<
  HTMLDivElement,
  Omit<SelectPrimitive.ScrollDownArrow.Props, 'className'> & { className?: string }
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownArrow
    ref={ref}
    className={cn(
      'flex cursor-default items-center justify-center py-1 text-muted-foreground',
      className
    )}
    {...props}
  >
    <Icon icon={ChevronDown} size={16} />
  </SelectPrimitive.ScrollDownArrow>
));
SelectScrollDownButton.displayName = 'SelectScrollDownButton';

const SelectContent = React.forwardRef<
  HTMLDivElement,
  Omit<SelectPrimitive.Popup.Props, 'className'> & {
    className?: string;
    position?: 'item-aligned' | 'popper';
    alignItemWithTrigger?: boolean;
    side?: SelectPrimitive.Positioner.Props['side'];
    align?: SelectPrimitive.Positioner.Props['align'];
    sideOffset?: number;
  }
>(
  (
    {
      className,
      children,
      position = 'popper',
      alignItemWithTrigger,
      side,
      align = 'start',
      sideOffset = 4,
      ...props
    },
    ref
  ) => (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        className="z-50 outline-none"
        alignItemWithTrigger={alignItemWithTrigger ?? position === 'item-aligned'}
        side={side}
        align={align}
        sideOffset={sideOffset}
      >
        <SelectPrimitive.Popup
          ref={ref}
          className={cn(
            'rtds-select-content relative max-h-96 min-w-32 overflow-hidden rounded-md border bg-background text-foreground shadow-md',
            className
          )}
          {...props}
        >
          <SelectScrollUpButton />
          <SelectPrimitive.List className="p-1">{children}</SelectPrimitive.List>
          <SelectScrollDownButton />
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  )
);
SelectContent.displayName = 'SelectContent';

const SelectLabel = React.forwardRef<
  HTMLDivElement,
  Omit<SelectPrimitive.GroupLabel.Props, 'className'> & { className?: string }
>(({ className, ...props }, ref) => (
  <SelectPrimitive.GroupLabel
    ref={ref}
    className={cn('px-2 py-1.5 pl-8 text-label-sm text-muted-foreground', className)}
    {...props}
  />
));
SelectLabel.displayName = 'SelectLabel';

const SelectItem = React.forwardRef<
  HTMLElement,
  Omit<SelectPrimitive.Item.Props, 'className'> & { className?: string }
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-body outline-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50',
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex size-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Icon icon={Check} size={16} />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = 'SelectItem';

const SelectSeparator = React.forwardRef<
  HTMLDivElement,
  Omit<SelectPrimitive.Separator.Props, 'className'> & { className?: string }
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-muted', className)}
    {...props}
  />
));
SelectSeparator.displayName = 'SelectSeparator';

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
  selectTriggerVariants,
};
