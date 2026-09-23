'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import type { LucideIcon } from 'lucide-react';
import { ClipboardPaste, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { Icon } from './icon';

const fieldVariants = cva(
  'rtds-field-control w-full border border-input bg-background text-body text-foreground shadow-none placeholder:text-muted-foreground ring-offset-background file:border-0 file:bg-transparent file:text-body file:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-disabled:cursor-not-allowed data-disabled:opacity-50 aria-invalid:border-destructive aria-invalid:focus-visible:ring-destructive user-invalid:border-destructive user-invalid:focus-visible:ring-destructive',
  {
    variants: {
      size: {
        sm: 'px-3',
        default: 'px-3',
        lg: 'px-4',
      },
      radius: {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        full: 'rounded-full',
      },
      multiline: {
        false: '',
        true: 'h-auto',
      },
    },
    compoundVariants: [
      { multiline: false, size: 'sm', class: 'h-9 min-h-11 md:min-h-9' },
      { multiline: false, size: 'default', class: 'h-10 min-h-11 md:min-h-10' },
      { multiline: false, size: 'lg', class: 'h-11' },
      { multiline: true, size: 'sm', class: 'min-h-16 py-2' },
      { multiline: true, size: 'default', class: 'min-h-20 py-2' },
      { multiline: true, size: 'lg', class: 'min-h-24 py-3' },
    ],
    defaultVariants: {
      size: 'default',
      radius: 'md',
      multiline: false,
    },
  }
);

type FieldVariantProps = Omit<VariantProps<typeof fieldVariants>, 'multiline'>;

const TRAILING_PAD = ['', 'pe-9', 'pe-20', 'pe-28'] as const;

function trailingPadClass(count: number) {
  return TRAILING_PAD[Math.min(Math.max(count, 0), 3)];
}

function composeRefs<T>(...refs: Array<React.Ref<T> | undefined>) {
  return (node: T) => {
    for (const ref of refs) {
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<T | null>).current = node;
      }
    }
  };
}

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

function playShake(el: HTMLElement | null) {
  if (!el || prefersReducedMotion()) return;
  el.removeAttribute('data-shake');
  void el.offsetWidth;
  el.setAttribute('data-shake', '');
}

function setNativeValue(el: HTMLInputElement | HTMLTextAreaElement, next: string) {
  const proto =
    el instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
  const previous = el.value;
  Object.getOwnPropertyDescriptor(proto, 'value')?.set?.call(el, next);
  const tracker = (el as unknown as { _valueTracker?: { setValue: (value: string) => void } })
    ._valueTracker;
  tracker?.setValue(previous);
  // One native `input` event — same path as typing. React `onChange` and Base UI
  // `onValueChange` each fire once; do not also invoke them from clear/paste.
  el.dispatchEvent(new Event('input', { bubbles: true }));
}

function commitFieldValue(
  el: HTMLInputElement | HTMLTextAreaElement,
  next: string,
  setUncontrolled: (value: string) => void
) {
  setNativeValue(el, next);
  setUncontrolled(next);
  el.focus();
}

function insertAtCaret(el: HTMLInputElement | HTMLTextAreaElement, text: string) {
  const start = el.selectionStart;
  const end = el.selectionEnd;
  const current = el.value;
  const next =
    start == null || end == null
      ? `${current}${text}`
      : `${current.slice(0, start)}${text}${current.slice(end)}`;
  setNativeValue(el, next);
  const caret = (start ?? current.length) + text.length;
  try {
    el.setSelectionRange(caret, caret);
  } catch {
    // Some input types (number, email on WebKit) do not support selection.
  }
}

const NON_TEXT_TYPES = new Set([
  'button',
  'checkbox',
  'color',
  'file',
  'hidden',
  'image',
  'radio',
  'range',
  'reset',
  'submit',
]);

function allowsFieldActions(type: React.HTMLInputTypeAttribute | undefined) {
  return !type || !NON_TEXT_TYPES.has(type);
}

function FieldAction({
  label,
  icon,
  onClick,
  disabled,
  hidden,
}: {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  disabled?: boolean;
  hidden?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled || hidden}
      tabIndex={hidden ? -1 : undefined}
      aria-hidden={hidden || undefined}
      onClick={onClick}
      className={cn(
        'rtds-field-action inline-flex size-8 shrink-0 items-center justify-center rounded-md text-muted-foreground [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
        hidden ? 'pointer-events-none opacity-0' : 'fine-hover:bg-accent fine-hover:text-foreground'
      )}
    >
      <Icon icon={icon} size={16} />
    </button>
  );
}

function useFieldValue(
  value: string | number | readonly string[] | undefined,
  defaultValue: string | number | readonly string[] | undefined
) {
  const [uncontrolled, setUncontrolled] = React.useState(() => String(defaultValue ?? ''));
  const current = value !== undefined ? String(value ?? '') : uncontrolled;
  return { current, setUncontrolled };
}

function useFieldShake(error: boolean | undefined) {
  const frameRef = React.useRef<HTMLDivElement>(null);
  const wasError = React.useRef(Boolean(error));

  const triggerShake = React.useCallback(() => {
    playShake(frameRef.current);
  }, []);

  React.useEffect(() => {
    if (error && !wasError.current) {
      triggerShake();
    }
    wasError.current = Boolean(error);
  }, [error, triggerShake]);

  const onAnimationEnd = React.useCallback((event: React.AnimationEvent<HTMLDivElement>) => {
    if (event.animationName === 'rtds-field-shake') {
      event.currentTarget.removeAttribute('data-shake');
    }
  }, []);

  return { frameRef, triggerShake, onAnimationEnd };
}

function FieldFrame({
  className,
  error,
  disabled,
  leadingIcon,
  trailingIcon,
  showClear,
  showPaste,
  hasValue,
  multiline,
  onClear,
  onPaste,
  children,
}: {
  className?: string;
  error?: boolean;
  disabled?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  showClear?: boolean;
  showPaste?: boolean;
  hasValue: boolean;
  multiline?: boolean;
  onClear: () => void;
  onPaste: () => void;
  children: React.ReactNode;
}) {
  const { frameRef, triggerShake, onAnimationEnd } = useFieldShake(error);
  const trailingCount =
    Number(Boolean(trailingIcon)) + Number(Boolean(showPaste)) + Number(Boolean(showClear));

  return (
    <div
      ref={frameRef}
      data-invalid={error || undefined}
      className={cn('rtds-field relative w-full min-w-0', className)}
      onAnimationEnd={onAnimationEnd}
      onInvalidCapture={() => triggerShake()}
    >
      {leadingIcon ? (
        <span
          className={cn(
            'pointer-events-none absolute start-0 flex items-center justify-center ps-3 text-muted-foreground [&_svg]:size-4',
            multiline ? 'top-2.5' : 'inset-y-0'
          )}
          aria-hidden="true"
        >
          {leadingIcon}
        </span>
      ) : null}
      {children}
      {trailingCount > 0 ? (
        <div
          className={cn(
            'absolute end-0 flex items-center pe-1',
            multiline ? 'top-1' : 'inset-y-0'
          )}
        >
          {trailingIcon ? (
            <span
              className="pointer-events-none inline-flex size-8 items-center justify-center text-muted-foreground [&_svg]:size-4"
              aria-hidden="true"
            >
              {trailingIcon}
            </span>
          ) : null}
          {showPaste ? (
            <FieldAction label="Paste" icon={ClipboardPaste} disabled={disabled} onClick={onPaste} />
          ) : null}
          {showClear ? (
            <FieldAction
              label="Clear"
              icon={X}
              disabled={disabled}
              hidden={!hasValue}
              onClick={onClear}
            />
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export {
  FieldFrame,
  allowsFieldActions,
  commitFieldValue,
  composeRefs,
  fieldVariants,
  insertAtCaret,
  trailingPadClass,
  useFieldValue,
};
export type { FieldVariantProps };
