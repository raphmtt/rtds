export const brands = ['atlas', 'folio', 'maison'];
export const modes = ['light', 'dark'];
export const DEFAULT_THEME = 'atlas';
export const brandLabels = {
    atlas: 'Atlas',
    folio: 'Folio',
    maison: 'Maison',
};
const LEGACY_BRANDS = {
    aurora: 'atlas',
    editorial: 'atlas',
};
export function isBrand(value) {
    return value === 'atlas' || value === 'folio' || value === 'maison';
}
/** Map stored ids (including DEV-4 aurora/editorial) to a current niche. */
export function migrateBrand(value) {
    if (isBrand(value))
        return value;
    if (value && value in LEGACY_BRANDS)
        return LEGACY_BRANDS[value];
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
];
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
];
