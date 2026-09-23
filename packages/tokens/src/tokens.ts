export interface ColorTokens {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  destructiveForeground: string;
  border: string;
  input: string;
  ring: string;
  success: string;
  successForeground: string;
  warning: string;
  warningForeground: string;
}

export interface SpacingTokens {
  sectionY: string;
  containerPx: string;
}

export interface RadiusTokens {
  base: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  full: string;
}

/** Playground theme id. Product apps ship exactly one theme CSS file. */
export type Brand = 'atlas' | 'folio' | 'maison';
export type Mode = 'light' | 'dark';

export const brands: Brand[] = ['atlas', 'folio', 'maison'];
export const modes: Mode[] = ['light', 'dark'];

export const DEFAULT_THEME: Brand = 'atlas';

export const brandLabels: Record<Brand, string> = {
  atlas: 'Atlas',
  folio: 'Folio',
  maison: 'Maison',
};

const LEGACY_BRANDS: Record<string, Brand> = {
  aurora: 'atlas',
  editorial: 'atlas',
};

export function isBrand(value: string | null | undefined): value is Brand {
  return value === 'atlas' || value === 'folio' || value === 'maison';
}

/** Map stored ids (including DEV-4 aurora/editorial) to a current niche. */
export function migrateBrand(value: string | null | undefined): Brand {
  if (isBrand(value)) return value;
  if (value && value in LEGACY_BRANDS) return LEGACY_BRANDS[value]!;
  return 'atlas';
}

/** Semantic UI type roles. Tailwind utilities are `text-${role}`. */
export const typeRoles = [
  'label-sm',
  'label',
  'label-lg',
  'body-sm',
  'body',
  'body-lg',
] as const;

export type TypeRole = (typeof typeRoles)[number];

export const tokenNames = [
  'background',
  'foreground',
  'card',
  'card-foreground',
  'primary',
  'primary-foreground',
  'secondary',
  'secondary-foreground',
  'muted',
  'muted-foreground',
  'accent',
  'accent-foreground',
  'destructive',
  'destructive-foreground',
  'border',
  'input',
  'ring',
  'success',
  'success-foreground',
  'warning',
  'warning-foreground',
  'radius',
  'font-display',
  'font-heading',
  'font-body',
  'font-mono',
  'space-section-y',
  'text-xs',
  'text-sm',
  'text-base',
  'text-lg',
  'font-weight-regular',
  'font-weight-medium',
  'font-weight-semibold',
  'leading-tight',
  'leading-normal',
  'text-label-sm',
  'text-label-sm--line-height',
  'text-label-sm--font-weight',
  'text-label-sm--font-family',
  'text-label',
  'text-label--line-height',
  'text-label--font-weight',
  'text-label--font-family',
  'text-label-lg',
  'text-label-lg--line-height',
  'text-label-lg--font-weight',
  'text-label-lg--font-family',
  'text-body-sm',
  'text-body-sm--line-height',
  'text-body-sm--font-weight',
  'text-body-sm--font-family',
  'text-body',
  'text-body--line-height',
  'text-body--font-weight',
  'text-body--font-family',
  'text-body-lg',
  'text-body-lg--line-height',
  'text-body-lg--font-weight',
  'text-body-lg--font-family',
] as const;

export type TokenName = (typeof tokenNames)[number];
