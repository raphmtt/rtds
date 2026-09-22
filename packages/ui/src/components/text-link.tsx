import * as React from 'react';
import { cn } from '../lib/utils';

export interface TextLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

const TextLink = React.forwardRef<HTMLAnchorElement, TextLinkProps>(
  ({ className, ...props }, ref) => {
    return (
      <a
        ref={ref}
        className={cn(
          'text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm',
          className
        )}
        {...props}
      />
    );
  }
);
TextLink.displayName = 'TextLink';

export { TextLink };
