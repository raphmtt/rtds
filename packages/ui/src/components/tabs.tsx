'use client';

import * as React from 'react';
import { Tabs as TabsPrimitive } from '@base-ui/react/tabs';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

const tabsListVariants = cva(
  'rtds-tabs-list relative inline-flex h-10 items-center overflow-x-auto bg-muted p-1 text-muted-foreground',
  {
    variants: {
      radius: {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        full: 'rounded-full',
      },
    },
    defaultVariants: {
      radius: 'md',
    },
  }
);

const tabsPillRadiusVariants = cva('', {
  variants: {
    radius: {
      none: 'rounded-none',
      sm: 'rounded-none',
      md: 'rounded-sm',
      lg: 'rounded-md',
      full: 'rounded-full',
    },
  },
  defaultVariants: {
    radius: 'md',
  },
});

const TabsListRadiusContext = React.createContext<
  NonNullable<VariantProps<typeof tabsListVariants>['radius']>
>('md');

export interface TabsListProps
  extends Omit<TabsPrimitive.List.Props, 'className'>,
    VariantProps<typeof tabsListVariants> {
  className?: string;
}

export type TabsListRadius = NonNullable<VariantProps<typeof tabsListVariants>['radius']>;

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, radius, children, ...props }, ref) => (
    <TabsListRadiusContext.Provider value={radius ?? 'md'}>
      <TabsPrimitive.List
        ref={ref}
        className={cn(tabsListVariants({ radius }), className)}
        {...props}
      >
        <TabsPrimitive.Indicator
          className={cn(
            tabsPillRadiusVariants({ radius }),
            'rtds-tabs-indicator bg-background shadow-sm'
          )}
        />
        {children}
      </TabsPrimitive.List>
    </TabsListRadiusContext.Provider>
  )
);
TabsList.displayName = 'TabsList';

const TabsTrigger = React.forwardRef<
  HTMLElement,
  Omit<TabsPrimitive.Tab.Props, 'className'> & { className?: string }
>(({ className, ...props }, ref) => {
  const listRadius = React.useContext(TabsListRadiusContext);

  return (
    <TabsPrimitive.Tab
      ref={ref}
      className={cn(
        tabsPillRadiusVariants({ radius: listRadius }),
        'rtds-tabs-trigger relative z-10 inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5 text-label ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-disabled:pointer-events-none data-disabled:opacity-50 data-active:text-foreground hover:text-foreground',
        className
      )}
      {...props}
    />
  );
});
TabsTrigger.displayName = 'TabsTrigger';

const TabsContent = React.forwardRef<
  HTMLDivElement,
  Omit<TabsPrimitive.Panel.Props, 'className'> & { className?: string }
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Panel
    ref={ref}
    className={cn(
      'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      className
    )}
    {...props}
  />
));
TabsContent.displayName = 'TabsContent';

export { Tabs, TabsList, TabsTrigger, TabsContent };
