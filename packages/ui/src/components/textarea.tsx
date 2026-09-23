'use client';

import * as React from 'react';
import { cn } from '../lib/utils';
import {
  FieldFrame,
  commitFieldValue,
  composeRefs,
  fieldVariants,
  insertAtCaret,
  trailingPadClass,
  useFieldValue,
  type FieldVariantProps,
} from './field';

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'>,
    FieldVariantProps {
  error?: boolean;
  showClear?: boolean;
  showPaste?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
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
      ...props
    },
    ref
  ) => {
    const areaRef = React.useRef<HTMLTextAreaElement | null>(null);
    const { current, setUncontrolled } = useFieldValue(value, defaultValue);
    const trailingCount =
      Number(Boolean(trailingIcon)) + Number(Boolean(showPaste)) + Number(Boolean(showClear));

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setUncontrolled(event.target.value);
      onChange?.(event);
    };

    const handleClear = () => {
      const el = areaRef.current;
      if (!el) return;
      commitFieldValue(el, '', setUncontrolled);
    };

    const handlePaste = async () => {
      const el = areaRef.current;
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
        showClear={showClear}
        showPaste={showPaste}
        hasValue={current.length > 0}
        multiline
        onClear={handleClear}
        onPaste={() => {
          void handlePaste();
        }}
      >
        <textarea
          {...props}
          ref={composeRefs(ref, areaRef)}
          {...(value !== undefined ? { value } : { defaultValue })}
          disabled={disabled}
          aria-invalid={error ? true : props['aria-invalid']}
          onChange={handleChange}
          className={cn(
            fieldVariants({ size, radius, multiline: true }),
            leadingIcon && 'ps-9',
            trailingPadClass(trailingCount)
          )}
        />
      </FieldFrame>
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };
