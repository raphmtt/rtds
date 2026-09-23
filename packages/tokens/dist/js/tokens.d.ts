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
export declare const brands: Brand[];
export declare const modes: Mode[];
export declare const DEFAULT_THEME: Brand;
export declare const brandLabels: Record<Brand, string>;
export declare function isBrand(value: string | null | undefined): value is Brand;
/** Map stored ids (including DEV-4 aurora/editorial) to a current niche. */
export declare function migrateBrand(value: string | null | undefined): Brand;
/** Semantic UI type roles. Tailwind utilities are `text-${role}`. */
export declare const typeRoles: readonly ["label-sm", "label", "label-lg", "body-sm", "body", "body-lg"];
export type TypeRole = (typeof typeRoles)[number];
export declare const tokenNames: readonly ["background", "foreground", "card", "card-foreground", "primary", "primary-foreground", "secondary", "secondary-foreground", "muted", "muted-foreground", "accent", "accent-foreground", "destructive", "destructive-foreground", "border", "input", "ring", "success", "success-foreground", "warning", "warning-foreground", "radius", "font-display", "font-heading", "font-body", "font-mono", "space-section-y", "text-xs", "text-sm", "text-base", "text-lg", "font-weight-regular", "font-weight-medium", "font-weight-semibold", "leading-tight", "leading-normal", "text-label-sm", "text-label-sm--line-height", "text-label-sm--font-weight", "text-label-sm--font-family", "text-label", "text-label--line-height", "text-label--font-weight", "text-label--font-family", "text-label-lg", "text-label-lg--line-height", "text-label-lg--font-weight", "text-label-lg--font-family", "text-body-sm", "text-body-sm--line-height", "text-body-sm--font-weight", "text-body-sm--font-family", "text-body", "text-body--line-height", "text-body--font-weight", "text-body--font-family", "text-body-lg", "text-body-lg--line-height", "text-body-lg--font-weight", "text-body-lg--font-family"];
export type TokenName = (typeof tokenNames)[number];
