import type { StorybookConfig } from '@storybook/react-vite';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { mergeConfig } from 'vite';

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-viewport',
    '@storybook/addon-themes',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  viteFinal: async (config) =>
    mergeConfig(config, {
      plugins: [tailwindcss()],
      // Same as apps/demo: resolve @rtds/* from source so stories match a real Vite app.
      resolve: {
        conditions: ['development', 'import', 'module', 'browser', 'default'],
        alias: [
          {
            // .storybook is three levels below the repo root (apps/storybook/.storybook).
            find: '@rtds-config',
            replacement: path.resolve(__dirname, '../../../rtds.config.ts'),
          },
          {
            find: /^lenis(\/.*)?$/,
            replacement: `${path.resolve(__dirname, '../node_modules/lenis')}$1`,
          },
        ],
      },
    }),
};

export default config;
