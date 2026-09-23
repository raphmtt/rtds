'use client';

import * as React from 'react';
import { Input as BaseInput } from '@base-ui/react/input';
import { cn } from '../lib/utils';
import {
  FieldFrame,
  allowsFieldActions,
  composeRefs,
  fieldVariants,
  insertAtCaret,
  setNativeValue,
  trailingPadClass,
  useFieldValue,
  type FieldVariantProps,
} from './field';

export interface InputProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseInput>, 'className' | 'size'>,
    FieldVariantProps {
  className?: string;
  error?: boolean;
  showClear?: boolean;
  showPaste?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLElement, InputProps>(
  (
    {
      className,
      size,
      radius,
      error,
      showClear = false,
      showPaste = false,
      leadingIcon,
      trailingIcon,
      disabled,
      value,
      defaultValue,
      onChange,
      onValueChange,
      type,
      ...props
    },
    ref
  ) => {
    const inputRef = React.useRef<HTMLElement | null>(null);
    const actionsAllowed = allowsFieldActions(type);
    const clearEnabled = showClear && actionsAllowed;
    const pasteEnabled = showPaste && actionsAllowed;
    const { current, setUncontrolled } = useFieldValue(value, defaultValue);
    const trailingCount =
      Number(Boolean(trailingIcon)) + Number(Boolean(pasteEnabled)) + Number(Boolean(clearEnabled));

    const control = () => {
      const node = inputRef.current;
      return node instanceof HTMLInputElement ? node : null;
    };

    const handleChange: InputProps['onChange'] = (event) => {
      setUncontrolled(event.target.value);
      onChange?.(event);
    };

    const handleValueChange: InputProps['onValueChange'] = (next, eventDetails) => {
      setUncontrolled(next);
      onValueChange?.(next, eventDetails);
    };

    const handleClear = () => {
      const el = control();
      if (!el) return;
      setNativeValue(el, '');
      setUncontrolled('');
      el.focus();
    };

    const handlePaste = async () => {
      const el = control();
      if (!el) return;
      try {
        const text = await navigator.clipboard.readText();
        if (!text) return;
        insertAtCaret(el, text);
        setUncontrolled(el.value);
        el.focus();
      } catch {
        el.focus();
      }
    };

    return (
      <FieldFrame
        className={className}
        error={error}
        disabled={disabled}
        leadingIcon={leadingIcon}
        trailingIcon={trailingIcon}
        showClear={clearEnabled}
        showPaste={pasteEnabled}
        hasValue={current.length > 0}
        onClear={handleClear}
        onPaste={() => {
          void handlePaste();
        }}
      >
        <BaseInput
          {...props}
          ref={composeRefs(ref, inputRef)}
          type={type}
          {...(value !== undefined ? { value } : { defaultValue })}
          disabled={disabled}
          aria-invalid={error ? true : props['aria-invalid']}
          onChange={handleChange}
          onValueChange={handleValueChange}
          className={cn(
            fieldVariants({ size, radius, multiline: false }),
            leadingIcon && 'ps-9',
            trailingPadClass(trailingCount),
            className
          )}
        />
      </FieldFrame>
    );
  }
);
Input.displayName = 'Input';

export { Input, fieldVariants };
export type { FieldVariantProps };
