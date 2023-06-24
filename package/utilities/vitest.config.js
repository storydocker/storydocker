/// <reference types="vitest" />
import { defineConfig } from 'vite'
import {svelte} from '@sveltejs/vite-plugin-svelte'
import vue from '@vitejs/plugin-vue'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths(), svelte({hot: !process.env.VITEST}), vue()],
	test: {
    alias: {
      '@/': new URL('./src/', import.meta.url).pathname,
    },
    environment: 'jsdom',
    setupFiles: ['storydocker-utilities/tests/setup.js'],
    coverage: {
      all: true,
      include: ['src/**/*.jsx', 'src/**/*.tsx', 'src/**/*.vue', 'src/**/*.svelte'],
      exclude: ['src/main.jsx', 'src/main.tsx'],
      provider: 'istanbul',
      reporter: ['text', 'json', 'html'],
    },
	},
});