import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';
import { Label, labelVariants } from './label';

export interface FormFieldProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>,
    VariantProps<typeof labelVariants> {
  label?: string;
  htmlFor?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

function mergeDescribedBy(existing: string | undefined, messageId: string): string {
  if (!existing) {
    return messageId;
  }
  const ids = new Set(existing.split(/\s+/).filter(Boolean));
  ids.add(messageId);
  return Array.from(ids).join(' ');
}

function enhanceControlChild(
  children: React.ReactNode,
  options: {
    messageId: string | undefined;
    error: string | undefined;
    required: boolean | undefined;
  }
): React.ReactNode {
  const childArray = React.Children.toArray(children);
  if (childArray.length !== 1) {
    return children;
  }

  const child = childArray[0];
  if (!React.isValidElement(child) || child.type === React.Fragment) {
    return children;
  }

  const childProps = child.props as {
    'aria-describedby'?: string;
    'aria-invalid'?: boolean;
    'aria-required'?: boolean;
  };

  const ariaProps: Record<string, string | boolean> = {};

  if (options.messageId) {
    ariaProps['aria-describedby'] = mergeDescribedBy(
      childProps['aria-describedby'],
      options.messageId
    );
  }

  if (options.error && childProps['aria-invalid'] === undefined) {
    ariaProps['aria-invalid'] = true;
  }

  if (options.required && childProps['aria-required'] === undefined) {
    ariaProps['aria-required'] = true;
  }

  if (Object.keys(ariaProps).length === 0) {
    return children;
  }

  return React.cloneElement(child, ariaProps);
}

const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  (
    { className, label, htmlFor, hint, error, required, size, children, ...props },
    ref
  ) => {
    const generatedId = React.useId();
    const idBase = htmlFor ?? generatedId;
    const showHint = Boolean(hint && !error);
    const hintId = showHint ? `${idBase}-hint` : undefined;
    const errorId = error ? `${idBase}-error` : undefined;
    const messageId = error ? errorId : hintId;

    const control = enhanceControlChild(children, { messageId, error, required });

    return (
      <div ref={ref} className={cn('space-y-2', className)} {...props}>
        {label ? (
          <Label htmlFor={htmlFor} size={size}>
            {label}
            {required ? (
              <span className="ml-1 text-muted-foreground" aria-hidden="true">
                *
              </span>
            ) : null}
          </Label>
        ) : null}
        {control}
        {showHint ? (
          <p id={hintId} className="text-body-sm text-muted-foreground">
            {hint}
          </p>
        ) : null}
        {error ? (
          <p id={errorId} className="rtds-form-error text-body-sm text-destructive">
            {error}
          </p>
        ) : null}
      </div>
    );
  }
);
FormField.displayName = 'FormField';

export { FormField };
