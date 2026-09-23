import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const typeRoles = [
  'text-label',
  'text-label-sm',
  'text-label-lg',
  'text-body',
  'text-body-sm',
  'text-body-lg',
] as const;

/** Treat UI type-scale roles as font-size so they do not clobber `text-{color}`. */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [...typeRoles],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
