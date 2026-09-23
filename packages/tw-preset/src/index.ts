// Tailwind preset exports
export const rtdsPreset = {
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'ui-serif', 'Georgia', 'serif'],
        heading: ['var(--font-heading)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'label-sm': [
          'var(--text-label-sm)',
          {
            lineHeight: 'var(--text-label-sm--line-height)',
            fontWeight: 'var(--text-label-sm--font-weight)',
          },
        ],
        label: [
          'var(--text-label)',
          {
            lineHeight: 'var(--text-label--line-height)',
            fontWeight: 'var(--text-label--font-weight)',
          },
        ],
        'label-lg': [
          'var(--text-label-lg)',
          {
            lineHeight: 'var(--text-label-lg--line-height)',
            fontWeight: 'var(--text-label-lg--font-weight)',
          },
        ],
        'body-sm': [
          'var(--text-body-sm)',
          {
            lineHeight: 'var(--text-body-sm--line-height)',
            fontWeight: 'var(--text-body-sm--font-weight)',
          },
        ],
        body: [
          'var(--text-body)',
          {
            lineHeight: 'var(--text-body--line-height)',
            fontWeight: 'var(--text-body--font-weight)',
          },
        ],
        'body-lg': [
          'var(--text-body-lg)',
          {
            lineHeight: 'var(--text-body-lg--line-height)',
            fontWeight: 'var(--text-body-lg--font-weight)',
          },
        ],
      },
      fontWeight: {
        regular: 'var(--font-weight-regular)',
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        success: {
          DEFAULT: 'var(--success)',
          foreground: 'var(--success-foreground)',
        },
        warning: {
          DEFAULT: 'var(--warning)',
          foreground: 'var(--warning-foreground)',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      spacing: {
        'section-y': 'var(--space-section-y)',
      },
      transitionDuration: {
        micro: '150ms',
        default: '200ms',
        overlay: '300ms',
      },
      transitionTimingFunction: {
        'rtds-ease': 'cubic-bezier(0.2, 0, 0, 1)',
      },
    },
  },
};
