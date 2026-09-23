import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, './src') },
      { find: '@rtds-config', replacement: path.resolve(__dirname, '../../rtds.config.ts') },
      // Helper lives in tooling/playground, outside this package. Resolve Lenis from this app.
      {
        find: /^lenis(\/.*)?$/,
        replacement: `${path.resolve(__dirname, 'node_modules/lenis')}$1`,
      },
    ],
    conditions: ['development', 'import', 'module', 'browser', 'default'],
  },
  server: {
    port: 3000,
  },
});
